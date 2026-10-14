"""Os passos do ciclo, usados pela CLI e pelos testes: coletar, parâmetros, calcular, explicar, aprovar, fechar."""
import json
import re
from datetime import date
from pathlib import Path

from . import calculo, coletor, comparacao, explicador
from .comparacao import NOMES
from .gateway import Gateway
from .registro import Registro
from .util import D, agora, canon, ler_csv, q2, sha256_arquivo, sha256_texto

RAIZ = Path(__file__).resolve().parent.parent
REFERENCIAS = ("historico_diferencas.csv", "manifesto_fontes.json", "contatos_conhecidos.json")
ACIMA = ("acima da faixa", "acima da materialidade")


class ErroCiclo(Exception):
    pass


class Contexto:
    def __init__(self, dados=RAIZ / "dados", saida=RAIZ / "saida", ciclo="2026-09", regras=RAIZ / "regras"):
        if not re.fullmatch(r"\d{4}-(0[1-9]|1[0-2])", str(ciclo)):
            raise ErroCiclo(f"Ciclo inválido: '{ciclo}'. Use AAAA-MM (ex.: 2026-09).")
        self.dados, self.saida, self.ciclo = Path(dados), Path(saida), ciclo
        self.dir_ciclo = self.dados / ciclo
        self.faixas = json.loads((Path(regras) / "faixas.json").read_text(encoding="utf-8"))
        self.manifesto = json.loads((self.dados / "manifesto_fontes.json").read_text(encoding="utf-8"))
        self.contatos = json.loads((self.dados / "contatos_conhecidos.json").read_text(encoding="utf-8"))
        self.reg = Registro(self.saida / "ciclo.sqlite")
        protegidos = {p for n in NOMES.values() for p in n.split()} | set(self.contatos["dominios"].values())
        self.gw = Gateway(self.saida / "gateway_log.jsonl", self.contatos["nomes"], protegidos)

    def carregadores(self):
        """Quem deveria aparecer na medição: da provisória; se ela faltar, da final, dos contratos ou do cadastro."""
        for nome in ("medicao_provisoria.csv", "medicao_final.csv"):
            if (self.dir_ciclo / nome).exists():
                return list(dict.fromkeys(l["carregador"] for l in ler_csv(self.dir_ciclo / nome)))
        if (self.dir_ciclo / "contratos.xlsx").exists():
            return list(dict.fromkeys(c["carregador"] for c in calculo.ler_contratos(self.dir_ciclo / "contratos.xlsx")))
        return [v for v in self.contatos["dominios"].values() if v != "SISTEMA"]

    def fontes(self):
        return coletor.verificar_fontes(self.dir_ciclo, self.manifesto, self.carregadores())

    def referencias(self):
        """Arquivos fora do mês que mudam as saídas (idade, status das fontes, redação): entram na versão."""
        return {n: sha256_arquivo(self.dados / n) if (self.dados / n).exists() else "ausente" for n in REFERENCIAS}

    def exigir_aberto(self):
        if self.reg.status(self.ciclo)["status"] == "fechado":
            raise ErroCiclo(f"O ciclo {self.ciclo} já está fechado.")


def exigir_coleta_atual(ctx: Contexto, fontes, acao: str) -> None:
    """O cálculo e o fechamento só valem sobre o que o agente coletor viu: tem de haver coleta no ciclo,
    e nenhum arquivo (e-mail novo, inclusive) pode ter chegado, mudado ou sumido desde ela."""
    coletadas = ctx.reg.fontes(ctx.ciclo)
    if not coletadas:
        ctx.reg.evento(ctx.ciclo, f"{acao} recusado", "nenhuma coleta registrada no ciclo")
        raise ErroCiclo("Nenhuma coleta registrada neste ciclo: rode 'coletar' primeiro "
                        "(confere as fontes e lê os e-mails, que podem trazer parâmetros novos).")
    antes = {k: v for f in coletadas for k, v in f["hashes"].items()}
    atuais = {k: v for f in fontes for k, v in f["hashes"].items()}
    mudaram = sorted(k for k in antes.keys() | atuais.keys() if antes.get(k) != atuais.get(k))
    if mudaram:
        emails = [k for k in mudaram if k.startswith("emails/")]
        ctx.reg.evento(ctx.ciclo, f"{acao} recusado", f"arquivos novos, alterados ou removidos desde a coleta: {', '.join(mudaram)}")
        raise ErroCiclo(f"Arquivos novos, alterados ou removidos desde a última coleta: {', '.join(mudaram)}. Rode 'coletar' "
                        + ("(o agente precisa ler os e-mails e propor os parâmetros) " if emails else "")
                        + "e depois 'calcular' e 'explicar'.")


def faltantes(fontes, so_calculo=False) -> list[dict]:
    return [f for f in fontes if f["status"] == "faltante" and (f.get("bloqueia_calculo") if so_calculo else f["obrigatoria"])]


def _lista(fontes) -> str:
    return "; ".join(f"{f['arquivo']} (responsável: {f['responsavel']})" for f in fontes)


def coletar(ctx: Contexto) -> dict:
    ctx.exigir_aberto()
    fontes = ctx.fontes()
    ctx.reg.salvar_fontes(ctx.ciclo, fontes)  # o status das fontes fica gravado antes de qualquer leitura
    ctx.reg.evento(ctx.ciclo, "coleta", f"{sum(f['status'] == 'recebida' for f in fontes)} de {len(fontes)} fontes completas; "
                                        f"obrigatórias faltantes: {_lista(faltantes(fontes)) or 'nenhuma'}")
    atuais = {}  # valores vigentes, só para mostrar "de → para"; sem contratos ou índice, a proposta sai sem eles
    if (ctx.dir_ciclo / "contratos.xlsx").exists():
        atuais = {(c["carregador"], n): q2(str(c[f"{n}_brl"])) for c in calculo.ler_contratos(ctx.dir_ciclo / "contratos.xlsx")
                  if str(c["vigencia_inicio"]) <= f"{ctx.ciclo}-01" <= str(c["vigencia_fim"])
                  for n in ("tarifa_capacidade", "tarifa_movimentacao")}
    if (ctx.dir_ciclo / "indice_preco_gas.csv").exists():
        indice = calculo.ler_indice(ctx.dir_ciclo / "indice_preco_gas.csv")
        if ctx.ciclo in indice:
            atuais[("SISTEMA", "preco_gas_uso_sistema")] = indice[ctx.ciclo]
    propostas, nao_proc = coletor.propor_parametros(ctx.gw, coletor.ler_emails(ctx.dir_ciclo, ctx.contatos["dominios"]), atuais)
    ctx.reg.salvar_propostas(ctx.ciclo, propostas)
    ctx.reg.evento(ctx.ciclo, "parametros", f"{len(propostas)} parâmetro(s) proposto(s) pelo agente coletor; pendentes de aceite")
    if nao_proc:
        for f in fontes:
            if f["id"] == "emails":
                f["status"], f["obs"] = "parcial", "não processado: " + "; ".join(f"{n['arquivo']} ({n['motivo']})" for n in nao_proc)
        ctx.reg.salvar_fontes(ctx.ciclo, fontes)
        ctx.reg.evento(ctx.ciclo, "coleta", f"{len(nao_proc)} e-mail(s) não processado(s): " +
                       "; ".join(f"{n['arquivo']}: {n['motivo']}" for n in nao_proc))
    return {"fontes": fontes, "propostas": ctx.reg.parametros(ctx.ciclo), "nao_processados": nao_proc}


def decidir_parametros(ctx: Contexto, aceitar=(), rejeitar=(), por=""):
    if not (aceitar or rejeitar):
        return ctx.reg.parametros(ctx.ciclo)  # só listar: vale também com o ciclo fechado
    ctx.exigir_aberto()
    if not por.strip():
        raise ErroCiclo("Informe quem decide (--por).")
    for ids, status in ((aceitar, "aceito"), (rejeitar, "rejeitado")):
        for pid in ids:
            if not ctx.reg.decidir_parametro(ctx.ciclo, int(pid), status, por):
                raise ErroCiclo(f"Parâmetro P{pid} não existe ou já foi decidido.")
            ctx.reg.evento(ctx.ciclo, "parametro", f"P{pid} {status} por {por}")
    return ctx.reg.parametros(ctx.ciclo)


def _versao(ctx, fontes):
    params = ctx.reg.parametros(ctx.ciclo, "aceito")
    hashes = {k: v for f in fontes for k, v in f["hashes"].items()}
    return calculo.versao(hashes, ctx.referencias(), ctx.faixas, params), params


def calcular(ctx: Contexto) -> dict:
    ctx.exigir_aberto()
    fontes = ctx.fontes()
    exigir_coleta_atual(ctx, fontes, "calculo")
    falta = faltantes(fontes, so_calculo=True)
    if falta:
        ctx.reg.evento(ctx.ciclo, "calculo recusado", f"fonte obrigatória faltante: {_lista(falta)}")
        raise ErroCiclo(f"Fonte obrigatória faltante para o cálculo: {_lista(falta)}. Rode 'coletar' de novo quando chegar.")
    versao, params = _versao(ctx, fontes)
    ent = calculo.carregar_entradas(ctx.dir_ciclo)
    if ctx.ciclo not in ent["indice"]:
        f = next(f for f in fontes if f["id"] == "indice_preco")
        raise ErroCiclo(f"O índice público não tem o mês {ctx.ciclo} em {f['arquivo']} (responsável: {f['responsavel']}).")
    res = calculo.calcular(ent, params, ctx.ciclo)
    res["erp_ausente"] = any(f["id"] == "pre_fatura_erp" and f["status"] == "faltante" for f in fontes)
    res["erp_totais"] = {}
    for l in ent["erp"]:
        res["erp_totais"][l["carregador"]] = str(D(res["erp_totais"].get(l["carregador"], 0)) + D(l["valor"]))
    historico = ler_csv(ctx.dados / "historico_diferencas.csv") if (ctx.dados / "historico_diferencas.csv").exists() else []
    difs = comparacao.comparar(res, ent["erp"], fontes, historico, ctx.faixas)
    hash_saidas = sha256_texto(canon({"resultado": res, "diferencas": difs}))[:16]
    ctx.reg.salvar_execucao(ctx.ciclo, versao, res, difs, hash_saidas)
    por_faixa = {f: sum(d["faixa"] == f for d in difs) for f in comparacao.FAIXAS}
    alertas = [d["chave"] for d in difs if d.get("alerta")]
    ctx.reg.evento(ctx.ciclo, "calculo", f"versão {versao['hash']}, saídas {hash_saidas}; " +
                   ", ".join(f"{n} {f}" for f, n in por_faixa.items() if n) +
                   (f"; anomalias sinalizadas: {', '.join(alertas)}" if alertas else ""))
    return ctx.reg.ultima_execucao(ctx.ciclo)


def _execucao(ctx):
    ex = ctx.reg.ultima_execucao(ctx.ciclo)
    if not ex:
        raise ErroCiclo("Nenhum cálculo registrado: rode 'calcular' primeiro.")
    return ex


def _precisa_explicar(d) -> bool:
    return d["faixa"] in ACIMA or bool(d.get("alerta"))


def explicar(ctx: Contexto) -> list[dict]:
    ctx.exigir_aberto()
    ex = _execucao(ctx)
    feitas = []
    for d in ex["diferencas"]:
        if _precisa_explicar(d):
            texto, modo = explicador.explicar(ctx.gw, d)
            ctx.reg.salvar_explicacao(ex["id"], d["id"], texto, modo)
            feitas.append({**d, "explicacao": texto, "explicacao_modo": modo})
    ctx.reg.evento(ctx.ciclo, "explicacao", f"{len(feitas)} diferença(s) acima da faixa ou com anomalia explicadas pelo agente")
    return feitas


def validar_data(data: str) -> str:
    try:
        dia = date.fromisoformat(str(data))
    except ValueError:
        raise ErroCiclo(f"Data inválida: '{data}'. Use AAAA-MM-DD.") from None
    if dia > agora().date():
        raise ErroCiclo(f"Data no futuro: {dia.isoformat()}. A decisão registra o dia em que foi tomada.")
    return dia.isoformat()


def aprovar(ctx: Contexto, did, por, papel, motivo, data, devolver=False) -> dict:
    ctx.exigir_aberto()
    data = validar_data(data)
    d = next((x for x in _execucao(ctx)["diferencas"] if x["id"] == did.upper()), None)
    if d is None:
        raise ErroCiclo(f"Diferença {did} não existe no último cálculo.")
    if d["faixa"] not in ctx.faixas["quem_pode_permitir"]:
        raise ErroCiclo(f"{d['id']} está '{d['faixa']}': passa com regra registrada, não exige permissão.")
    if not d.get("explicacao"):
        raise ErroCiclo(f"{d['id']} ainda não tem explicação neste cálculo: rode 'explicar' antes "
                        "(quem decide precisa ver a causa provável e o que conferir).")
    if papel not in ctx.faixas["quem_pode_permitir"][d["faixa"]]:
        raise ErroCiclo(f"O papel '{papel}' não pode decidir itens '{d['faixa']}' "
                        f"(podem: {', '.join(ctx.faixas['quem_pode_permitir'][d['faixa']])}).")
    if not por.strip() or len(motivo.strip()) < 10:
        raise ErroCiclo("Permissão exige nome de quem decide e motivo por escrito (mínimo de 10 caracteres).")
    decisao = "devolvida" if devolver else "permitida"
    ctx.reg.decidir(ctx.ciclo, d["chave"], d["valor"], decisao, por, papel, motivo, data)
    ctx.reg.evento(ctx.ciclo, "decisao", f"{d['id']} ({d['chave']}) {decisao} por {por} ({papel}) em {data}")
    return {**d, "decisao": decisao, "data": data}


def fechar(ctx: Contexto, por: str) -> dict:
    ctx.exigir_aberto()
    fontes = ctx.fontes()
    exigir_coleta_atual(ctx, fontes, "fechamento")
    ex = _execucao(ctx)
    pendentes = ctx.reg.parametros(ctx.ciclo, "pendente")
    if pendentes:
        ids = ", ".join(f"P{p['id']}" for p in pendentes)
        ctx.reg.evento(ctx.ciclo, "fechamento recusado", f"pedido por {por}; parâmetros pendentes de decisão: {ids}")
        raise ErroCiclo(f"Fechamento recusado: {len(pendentes)} parâmetro(s) proposto(s) sem decisão ({ids}). "
                        "Aceite ou rejeite com 'parametros --aceitar/--rejeitar' e rode 'calcular' de novo.")
    versao, _ = _versao(ctx, fontes)
    if versao["hash"] != ex["versao"]:
        raise ErroCiclo("Entradas, referências, regras, código ou parâmetros mudaram desde o último cálculo: rode 'calcular' de novo.")
    sem_texto = [d["id"] for d in ex["diferencas"] if _precisa_explicar(d) and not d.get("explicacao")]
    if sem_texto:
        ctx.reg.evento(ctx.ciclo, "fechamento recusado", f"pedido por {por}; sem explicação no último cálculo: {', '.join(sem_texto)}")
        raise ErroCiclo(f"Fechamento recusado: {', '.join(sem_texto)} acima da faixa ou com anomalia, sem explicação no "
                        "último cálculo: rode 'explicar'.")
    modo = ctx.faixas["modo"]
    permitida = lambda d: bool(d["decisao"]) and d["decisao"]["decisao"] == "permitida"
    bloqueios = [d for d in ex["diferencas"] if comparacao.bloqueia(d["faixa"], permitida(d), modo)]
    if bloqueios:
        ids = ", ".join(f"{d['id']} ({d['faixa']})" for d in bloqueios)
        ctx.reg.evento(ctx.ciclo, "fechamento recusado", f"pedido por {por}; sem permissão: {ids}")
        raise ErroCiclo(f"Fechamento recusado: {len(bloqueios)} item(ns) bloqueante(s) sem permissão: {ids}")
    seguem = [d["id"] for d in ex["diferencas"] if d["faixa"] in ACIMA and not permitida(d)]
    anomalias = [d["id"] for d in ex["diferencas"] if d.get("alerta")]
    resumo = {"versao": ex["versao"], "hash_saidas": ex["hash_saidas"], "modo_regras": modo,
              "seguem_ao_proximo_ciclo": seguem, "anomalias_sinalizadas": anomalias,
              "parametros_rejeitados": len(ctx.reg.parametros(ctx.ciclo, "rejeitado"))}
    ctx.reg.fechar(ctx.ciclo, por, resumo)
    ctx.reg.evento(ctx.ciclo, "fechamento", f"fechado por {por}; versão {ex['versao']}; "
                                            f"seguem ao próximo ciclo sem permissão (sinalizados): {', '.join(seguem) or 'nenhum'}; "
                                            f"anomalias sinalizadas: {', '.join(anomalias) or 'nenhuma'}")
    return resumo
