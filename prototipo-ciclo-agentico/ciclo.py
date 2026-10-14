#!/usr/bin/env python3
"""CLI do protótipo: agente reúne e parametriza, código calcula, agente explica, pessoa aprova.

Exemplos:
  python3 ciclo.py demo                       (ciclo inteiro em saida/demo; atualiza exemplo/)
  python3 ciclo.py coletar
  python3 ciclo.py parametros --aceitar 1 2 --por "Bruno Costa"
  python3 ciclo.py calcular && python3 ciclo.py explicar
  python3 ciclo.py aprovar D01 --por "Paula Ramos" --papel Controladoria --motivo "Aditivo confere com a tarifa"
  python3 ciclo.py fechar --por "Paula Ramos" && python3 ciclo.py relatorio
"""
import argparse
import json
import re
import shutil
import sys
from datetime import date, datetime
from pathlib import Path

from ciclo_agentico import operacoes as op
from ciclo_agentico import relatorio
from ciclo_agentico.comparacao import NOMES
from ciclo_agentico.util import D, brl, fixar_relogio

RAIZ = Path(__file__).resolve().parent
SAIDA_TEXTO = []
TRADUCAO = {  # textos do argparse em pt-BR
    "usage: ": "uso: ", "positional arguments": "argumentos posicionais", "options": "opções",
    "show this help message and exit": "mostra esta ajuda e sai",
    "the following arguments are required: %s": "faltam os argumentos obrigatórios: %s",
    "%(prog)s: error: %(message)s\n": "%(prog)s: erro: %(message)s\n",
    "invalid choice: %(value)r (choose from %(choices)s)": "opção inválida: %(value)r (escolha entre %(choices)s)",
    "unrecognized arguments: %s": "argumentos não reconhecidos: %s",
    "invalid %(type)s value: %(value)r": "valor inválido (%(type)s): %(value)r",
    "expected one argument": "falta o valor do argumento", "argument %(argument_name)s: %(message)s": "argumento %(argument_name)s: %(message)s",
    "ambiguous option: %(option)s could match %(matches)s": "opção ambígua: %(option)s pode ser %(matches)s",
}
argparse._ = lambda texto: TRADUCAO.get(texto, texto)


def say(texto=""):
    print(texto)
    SAIDA_TEXTO.append(texto)


def mostrar_fontes(fontes):
    for f in fontes:
        marca = {"recebida": "OK ", "parcial": "~~ ", "faltante": "-- "}[f["status"]]
        say(f"  {marca}{f['nome']:<42} {f['status']:<9} {f['responsavel']:<28} {f['obs']}")
    cobrar = {}
    for f in op.faltantes(fontes):
        cobrar.setdefault(f["responsavel"], []).append(f["arquivo"] + (" (bloqueia o cálculo)" if f.get("bloqueia_calculo") else ""))
    for resp, arqs in cobrar.items():
        say(f"  Cobrar de {resp}: {', '.join(arqs)}")


def mostrar_parametros(params):
    for p in params:
        say(f"  P{p['id']} {NOMES.get(p['carregador'], p['carregador']):<18} {p['parametro']:<22} "
            f"{brl(p['valor_anterior']) if p['valor_anterior'] else '—':>12} -> {brl(p['valor']):<12} desde {p['vigencia_inicio']} "
            f"[{p['status']}; agente {p['modo']}; valor e vigência no texto: {'sim' if p['verificado'] else 'NÃO'}]")


def mostrar_calculo(ctx, ex):
    res = ex["resultado"]
    say(f"  versão {ex['versao']} · saídas {ex['hash_saidas']}")
    for car, t in res["totais"].items():
        erp = D(res["erp_totais"].get(car, 0))
        base = "" if res["volumes"][car]["final"] else "  (base PROVISÓRIA)"
        comp = "ERP: pré-fatura não chegou" if res.get("erp_ausente") else f"ERP {brl(erp):>18}  dif {brl(D(t['total']) - erp):>14}"
        say(f"  {NOMES[car]:<18} ferramenta {brl(t['total']):>18}  {comp}{base}")
    for d in ex["diferencas"]:
        say(f"  {d['id']} {d['faixa']:<23} {d['classe']:<24} {brl(d['valor']):>14}  idade {d['idade']}  {d['chave']}"
            + ("  [ANOMALIA: conferir]" if d.get("alerta") else ""))
    pendentes = ctx.reg.parametros(ctx.ciclo, "pendente")
    if pendentes:
        say(f"  ATENÇÃO: {len(pendentes)} parâmetro(s) pendente(s) ({', '.join(f'P{p['id']}' for p in pendentes)}) não entraram "
            "no cálculo, e o ciclo não fecha enquanto não forem aceitos ou rejeitados.")


def cmd_coletar(ctx, a):
    r = op.coletar(ctx)
    say("Fontes do mês (agente coletor):")
    mostrar_fontes(r["fontes"])
    for n in r["nao_processados"]:
        say(f"  E-mail não processado: {n['arquivo']} ({n['motivo']})")
    say("Parâmetros propostos (pendentes até uma pessoa aceitar):")
    mostrar_parametros(r["propostas"])


def cmd_parametros(ctx, a):
    mostrar_parametros(op.decidir_parametros(ctx, a.aceitar, a.rejeitar, a.por))


def cmd_calcular(ctx, a):
    mostrar_calculo(ctx, op.calcular(ctx))


def cmd_explicar(ctx, a):
    for d in op.explicar(ctx):
        say(f"  {d['id']} ({d['explicacao_modo']}): {d['explicacao']}")


def cmd_aprovar(ctx, a):
    d = op.aprovar(ctx, a.diferenca, a.por, a.papel, a.motivo, a.data, a.devolver)
    say(f"  {d['id']} {d['decisao']} por {a.por} ({a.papel}) em {d['data']}: {brl(d['valor'])}")


def cmd_fechar(ctx, a):
    r = op.fechar(ctx, a.por)
    say(f"  Ciclo {ctx.ciclo} FECHADO por {a.por} · versão {r['versao']}")
    say(f"  Seguem ao próximo ciclo sem permissão (sinalizados): {', '.join(r['seguem_ao_proximo_ciclo']) or 'nenhum'}")
    if r["anomalias_sinalizadas"]:
        say(f"  Anomalias de medição sinalizadas (não bloqueiam): {', '.join(r['anomalias_sinalizadas'])}")


def cmd_relatorio(ctx, a):
    h, x = relatorio.gerar(ctx)
    say(f"  Relatório: {h}\n  Planilha:  {x}")


def cmd_demo(a):
    """Roda o ciclo inteiro em <saida>/demo (separado do passo a passo manual), com relógio fixo:
    o snapshot em exemplo/ sai idêntico a cada execução."""
    saida = Path(a.saida) / "demo"
    for arq in [saida / "ciclo.sqlite", saida / "gateway_log.jsonl", *saida.glob("relatorio_*.html"), *saida.glob("ciclo_*.xlsx")]:
        arq.unlink(missing_ok=True)
    fixar_relogio(datetime(2026, 10, 7, 9, 0, 0))
    ctx = op.Contexto(a.dados, saida, a.ciclo)
    passo = lambda n, t: say(f"\n=== {n}. {t} ===")
    passo(1, "O agente reúne: fontes do mês e e-mails")
    cmd_coletar(ctx, a)
    linha = json.loads((ctx.saida / "gateway_log.jsonl").read_text(encoding="utf-8").splitlines()[0])
    say(f"  Gateway: modo {linha['modo']} ({linha['motivo']}); cortes {linha['cortes']}")
    say("  Trechos do que sairia para o modelo (já redigidos):")
    for trecho in [t for t in linha["conteudo_redigido"].splitlines() if "REMOVIDO" in t]:
        say(f"    | {trecho}")
    passo(2, "A pessoa aceita os parâmetros")
    ids = [p["id"] for p in ctx.reg.parametros(ctx.ciclo, "pendente")]
    mostrar_parametros(op.decidir_parametros(ctx, ids, (), "Bruno Costa (Operações Comerciais)"))
    passo(3, "O código calcula e compara")
    ex = op.calcular(ctx)
    mostrar_calculo(ctx, ex)
    passo(4, "O agente explica o que está acima da faixa")
    cmd_explicar(ctx, a)
    passo(5, "A pessoa aprova: primeiro pedido de fechamento")
    try:
        op.fechar(ctx, "Paula Ramos (Controladoria)")
    except op.ErroCiclo as erro:
        say(f"  {erro}")
    por_chave = {d["chave"]: d["id"] for d in ex["diferencas"]}
    roteiro = [
        ("BETA|movimentacao|tarifa", "Paula Ramos", "Controladoria", False,
         "Aditivo nº 3 confere com a tarifa aceita; ERP emite cobrança complementar"),
        ("SISTEMA|gas_uso_sistema|preco", "Paula Ramos", "Controladoria", False,
         "Preço confere com a fatura do fornecedor; repasse previsto no contrato de suprimento"),
        ("GAMA|capacidade_extraordinaria|fonte", "Carlos Mendes", "Analista sênior", True,
         "Devolvida ao Comercial: anexar o arquivo do portal de capacidade antes de cobrar"),
    ]
    for chave, por, papel, devolver, motivo in roteiro:
        d = op.aprovar(ctx, por_chave[chave], por, papel, motivo, "2026-10-07", devolver)
        say(f"  {d['id']} {d['decisao']} por {por} ({papel}): {brl(d['valor'])} · {motivo}")
    say("  (Delta, capacidade: fica sem decisão de propósito, para mostrar o que o release 1 sinaliza)")
    passo(6, "Fechamento")
    cmd_fechar(ctx, argparse.Namespace(por="Paula Ramos (Controladoria)"))
    passo(7, "Relatório")
    h, x = relatorio.gerar(ctx)
    exemplo = RAIZ / "exemplo"
    exemplo.mkdir(exist_ok=True)
    for origem in (h, x, ctx.saida / "gateway_log.jsonl"):
        shutil.copy(origem, exemplo / origem.name)
    say(f"  {h.name}, {x.name} e gateway_log.jsonl copiados para exemplo/")
    (exemplo / "demo_console.txt").write_text("\n".join(SAIDA_TEXTO) + "\n", encoding="utf-8")
    ctx.reg.db.close()
    fixar_relogio(None)


def ciclo_valido(texto: str) -> str:
    if not re.fullmatch(r"\d{4}-(0[1-9]|1[0-2])", texto):
        raise argparse.ArgumentTypeError(f"'{texto}' não é um mês AAAA-MM (ex.: 2026-09)")
    return texto


def main(argv=None):
    p = argparse.ArgumentParser(description="Protótipo do ciclo agêntico de custos de transporte (dados sintéticos)")
    p.add_argument("--dados", default=RAIZ / "dados", help="pasta de dados (padrão: dados/)")
    p.add_argument("--saida", default=RAIZ / "saida", help="pasta do estado e dos relatórios (padrão: saida/)")
    p.add_argument("--ciclo", default="2026-09", type=ciclo_valido, help="mês do ciclo, AAAA-MM (padrão: 2026-09)")
    sub = p.add_subparsers(dest="cmd", required=True, title="comandos", metavar="COMANDO")
    for nome, ajuda in (("coletar", "confere as fontes do mês e lê os e-mails (propõe parâmetros)"),
                        ("calcular", "calcula, compara com o ERP e classifica pelas faixas"),
                        ("explicar", "explica as diferenças acima da faixa e as anomalias"),
                        ("relatorio", "gera o relatório HTML e a planilha XLSX"),
                        ("demo", "roda o ciclo inteiro em saida/demo e atualiza exemplo/")):
        sub.add_parser(nome, help=ajuda, description=ajuda)
    s = sub.add_parser("parametros", help="lista, aceita ou rejeita parâmetros propostos")
    s.add_argument("--aceitar", nargs="*", type=int, default=[], help="IDs a aceitar (ex.: 1 2)")
    s.add_argument("--rejeitar", nargs="*", type=int, default=[], help="IDs a rejeitar")
    s.add_argument("--por", default="", help="quem decide")
    s = sub.add_parser("aprovar", help="permite (ou devolve) uma diferença acima da faixa")
    s.add_argument("diferenca", help="ID da diferença (ex.: D01)")
    s.add_argument("--por", required=True, help="nome de quem decide")
    s.add_argument("--papel", required=True, help="papel (ex.: Controladoria, 'Analista sênior')")
    s.add_argument("--motivo", required=True, help="motivo por escrito (mínimo de 10 caracteres)")
    s.add_argument("--data", default=date.today().isoformat(), help="data da decisão, AAAA-MM-DD (padrão: hoje)")
    s.add_argument("--devolver", action="store_true", help="devolve em vez de permitir")
    s = sub.add_parser("fechar", help="fecha o ciclo (recusa se houver bloqueio ou parâmetro pendente)")
    s.add_argument("--por", required=True, help="quem fecha")
    a = p.parse_args(argv)
    ctx = None
    try:
        if a.cmd == "demo":
            cmd_demo(a)
        else:
            ctx = op.Contexto(a.dados, a.saida, a.ciclo)
            globals()[f"cmd_{a.cmd}"](ctx, a)
    except (op.ErroCiclo, ValueError) as erro:
        print(f"ERRO: {erro}", file=sys.stderr)
        return 2
    finally:
        if ctx:
            ctx.reg.db.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
