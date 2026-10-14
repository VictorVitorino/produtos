"""Comparação determinística: ferramenta × pré-fatura do ERP e ferramenta × esperado.

Cada diferença de linha é decomposta em efeitos que somam exatamente o total:
  quantidade  = (qtd ferramenta - qtd ERP) × tarifa ERP
  tarifa      = (tarifa ferramenta - tarifa ERP) × qtd ferramenta
  resíduo     = o que sobra (aritmética ou arredondamento no ERP)
  (o arredondamento de centavos fica dentro do efeito real, para não gerar item falso)
Sinal: valor > 0 quer dizer que a ferramenta apura mais do que o ERP cobra.
Sem a pré-fatura do ERP, sai um único item "fonte faltante" (nunca uma lista de linhas sem par).
O ajuste provisória→final nunca bloqueia, mas acima de `alerta_pct` sai sinalizado como anomalia.
"""
from .util import D, brl, mes_indice, num, q2

CLASSES = ["ajuste provisória→final", "preço acima do esperado", "diferença de cálculo", "fonte faltante"]
FAIXAS = ["acima da materialidade", "acima da faixa", "dentro da faixa", "classe própria"]
NOMES = {"ALFA": "Carregador Alfa", "BETA": "Carregador Beta", "GAMA": "Carregador Gama",
         "DELTA": "Carregador Delta", "SISTEMA": "Sistema (rateado)", "TODOS": "Todos os carregadores"}
COMPONENTES = {"capacidade": "Capacidade", "movimentacao": "Movimentação", "gas_uso_sistema": "Gás de uso do sistema",
               "capacidade_extraordinaria": "Capacidade extraordinária", "pre_fatura": "Pré-fatura do ERP"}
FONTE_DO_COMPONENTE = {"capacidade_extraordinaria": "capacidade_extra"}


def qtd(x) -> str:
    return num(x, 3).removesuffix(",000")


def classificar(classe: str, valor, faixas: dict) -> str:
    limite = faixas["classes"][classe]["faixa_brl"]
    if limite is None:
        return "classe própria"
    v, limite = abs(D(valor)), D(limite)
    if limite > 0 and v <= limite:
        return "dentro da faixa"
    return "acima da materialidade" if v > D(faixas["materialidade_brl"]) else "acima da faixa"


def bloqueia(faixa: str, aprovada: bool, modo: str) -> bool:
    if aprovada:
        return False
    return faixa == "acima da materialidade" or (modo == "estrito" and faixa == "acima da faixa")


def comparar(res: dict, erp_linhas: list[dict], fontes: list[dict], historico: list[dict], faixas: dict) -> list[dict]:
    ciclo = res["ciclo"]
    abertas = {h["chave"]: h["ciclo_origem"] for h in historico if h["situacao"] == "aberta"}
    status = {f["id"]: f for f in fontes}
    erp_arquivo = "pre_fatura_erp.csv"
    difs = []

    def add(car, comp, efeito, classe, valor, causa, fonte, ev, alerta=""):
        valor = q2(valor)
        if valor == 0:
            return
        chave = f"{car}|{comp}|{efeito}"
        idade = mes_indice(ciclo) - mes_indice(abertas[chave]) if chave in abertas else 0
        difs.append({"chave": chave, "carregador": car, "componente": comp, "efeito": efeito, "classe": classe,
                     "valor": str(valor), "causa": causa, "fonte": fonte, "idade": idade, "alerta": alerta,
                     "faixa": classificar(classe, valor, faixas), "regra": faixas["classes"][classe]["regra"],
                     "evidencia": {**ev, "valor": brl(valor), "carregador": NOMES.get(car, car),
                                   "componente": COMPONENTES.get(comp, comp), "idade_ciclos": idade}})

    tool = {(l["carregador"], l["componente"]): l for l in res["linhas"]}
    erp = {(l["carregador"], l["componente"]): l for l in erp_linhas}
    f_erp = status.get("pre_fatura_erp", {})
    if f_erp.get("status") == "faltante":  # sem a pré-fatura não há comparação: um item só, nunca "linhas sem par"
        total = sum(D(l["valor"]) for l in res["linhas"])
        add("TODOS", "pre_fatura", "fonte", "fonte faltante", total,
            f"A pré-fatura do ERP não chegou (responsável: {f_erp['responsavel']}); a comparação ferramenta × ERP não foi "
            f"feita. Valor = total apurado pela ferramenta ({brl(total)}), sem conferência.",
            f"manifesto: {f_erp['arquivo']} ausente",
            {"codigo": "erp_faltante", "responsavel": f_erp["responsavel"], "arquivo": f_erp["arquivo"]})
        tool = {}
    alerta_pct = D(faixas["classes"]["ajuste provisória→final"].get("alerta_pct") or "100")
    for k in list(tool) + [k for k in erp if k not in tool]:
        car, comp = k
        t, e = tool.get(k), erp.get(k)
        if t is None:
            f = status.get(FONTE_DO_COMPONENTE.get(comp, ""), {})
            if f.get("status") == "faltante":
                add(car, comp, "fonte", "fonte faltante", -D(e["valor"]),
                    f"O ERP cobra {brl(e['valor'])} de {COMPONENTES[comp].lower()}, mas a fonte '{f['nome']}' não chegou "
                    f"(responsável: {f['responsavel']}); a ferramenta não consegue conferir.",
                    f"manifesto: {f['arquivo']} ausente", {"codigo": "fonte_faltante", "valor_erp": brl(e["valor"]),
                                                            "responsavel": f["responsavel"], "arquivo": f["arquivo"]})
            else:
                add(car, comp, "linha", "diferença de cálculo", -D(e["valor"]), "Linha do ERP sem correspondente na ferramenta.",
                    erp_arquivo, {"codigo": "linha_sem_par", "valor_erp": brl(e["valor"])})
            continue
        if e is None:
            add(car, comp, "linha", "diferença de cálculo", D(t["valor"]), "Linha calculada pela ferramenta não está no ERP.",
                erp_arquivo, {"codigo": "linha_sem_par", "valor_ferramenta": brl(t["valor"])})
            continue
        qt, tt, vt = D(t["quantidade"]), D(t["tarifa"]), D(t["valor"])
        qe, te, ve = D(e["quantidade"]), D(e["tarifa"]), D(e["valor"])
        d_r = q2(qe * te) - ve  # erro da própria linha do ERP (não fecha quantidade × tarifa)
        sobra = vt - q2(qe * te)  # o que a ferramenta apura a mais sobre a linha do ERP recalculada
        d_q = sobra if tt == te else (D(0) if qt == qe else q2((qt - qe) * te))
        d_t = sobra - d_q  # o arredondamento fica dentro de um efeito real, nunca vira item próprio
        u = t["unidade"]
        ev = {"qtd_ferramenta": f"{qtd(qt)} {u}", "qtd_erp": f"{qtd(qe)} {u}", "tarifa_ferramenta": brl(tt), "tarifa_erp": brl(te),
              "origem_tarifa": t["origem_tarifa"], "base_medicao": t["base_medicao"]}
        if d_q and abs(qe - D(t["quantidade_provisoria"])) <= D("0.001"):
            if t["base_medicao"] != "final":
                causa = "Rateio refeito com a medição final dos demais carregadores; a base deste carregador segue provisória."
            elif comp == "gas_uso_sistema":
                causa = f"O ERP rateou pela medição provisória ({qtd(qe)} {u}); a ferramenta rateia pela final certificada ({qtd(qt)} {u})."
            else:
                causa = f"O ERP usou a medição provisória ({qtd(qe)} {u}); a ferramenta usa a final certificada ({qtd(qt)} {u})."
            var = q2(abs(qt - qe) / qe * 100) if qe else D(0)
            alerta = ""
            if var > alerta_pct:
                alerta = (f"Ajuste de {num(var)}% sobre a provisória, acima do alerta de {num(alerta_pct)}%: conferir a medição "
                          "final certificada (possível erro de digitação ou de unidade). Não bloqueia.")
            add(car, comp, "quantidade", "ajuste provisória→final", d_q, causa, f"{erp_arquivo} × medicao_final.csv",
                {**ev, "codigo": "ajuste_anomalo" if alerta else "ajuste_medicao", "variacao_pct": num(var),
                 "alerta_pct": num(alerta_pct)}, alerta)
        elif d_q:
            add(car, comp, "quantidade", "diferença de cálculo", d_q,
                f"Quantidade no ERP ({qtd(qe)} {u}) difere da ferramenta ({qtd(qt)} {u}; origem: {t['origem_tarifa']}).",
                f"{erp_arquivo} × contratos.xlsx", {**ev, "codigo": "quantidade_divergente"})
        if d_t:
            add(car, comp, "tarifa", "diferença de cálculo", d_t,
                f"Tarifa no ERP ({brl(te)}) difere da usada pela ferramenta ({brl(tt)}; origem: {t['origem_tarifa']}).",
                f"{erp_arquivo} × {t['origem_tarifa']}", {**ev, "codigo": "tarifa_divergente"})
        if d_r:
            add(car, comp, "residuo", "diferença de cálculo", d_r,
                f"No ERP, quantidade × tarifa ({brl(q2(qe * te))}) não fecha com o valor da linha ({brl(ve)}).",
                erp_arquivo, {**ev, "codigo": "arredondamento", "valor_erp": brl(ve), "recalculado": brl(q2(qe * te))})

    g = res["gus"]
    usado, esperado = D(g["preco_usado"]), D(g["preco_esperado"])
    if usado > esperado:
        var = q2((usado / esperado - 1) * 100)
        add("SISTEMA", "gas_uso_sistema", "preco", "preço acima do esperado", (usado - esperado) * D(g["consumo_mil_m3"]),
            f"Preço usado ({brl(usado)}/mil m³) está {num(var)}% acima do índice público do mês ({brl(esperado)}); "
            f"no mês anterior o índice era {brl(g['preco_mes_anterior'])}.",
            f"{g['origem_preco']} × indice_preco_gas.csv",
            {"codigo": "preco_acima", "preco_usado": brl(usado), "preco_esperado": brl(esperado), "variacao_pct": num(var),
             "consumo": f"{qtd(g['consumo_mil_m3'])} mil m³", "preco_mes_anterior": brl(g["preco_mes_anterior"])})

    difs.sort(key=lambda d: (FAIXAS.index(d["faixa"]), -abs(D(d["valor"])), d["chave"]))
    for i, d in enumerate(difs, start=1):
        d["id"] = f"D{i:02d}"
    return difs
