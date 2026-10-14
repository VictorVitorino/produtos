"""Agente explicador: texto curto em pt-BR para cada diferença acima da faixa (e cada anomalia sinalizada).

Envia ao gateway só a evidência determinística (JSON), montada pelo código: o gateway aplica os padrões
de dado pessoal, mas não a lista de nomes, para não cortar o nome do carregador. O modelo não calcula: todo número citado no
texto (com separadores, %, "mil", "milhão") precisa aparecer literalmente na evidência; se não aparecer,
o texto é descartado e entra o modelo de texto offline. Números por extenso ("duzentos mil") não são
conferidos. No modo offline o texto vem de modelos fixos e leva a marca [offline]."""
import json
import re

SISTEMA = ("Você é o agente explicador do fechamento mensal de custos de transporte de gás. Recebe a evidência "
           "de UMA diferença em JSON. Escreva em português do Brasil, em 2 ou 3 frases curtas: a causa provável e "
           "o que a pessoa deve conferir antes de permitir ou devolver. Use apenas os números da evidência, "
           "copiados exatamente como estão (sem abreviar para 'mil' ou 'milhão' e sem escrever por extenso); "
           "não calcule, não arredonde e não invente fatos.")

MODELOS = {
    "tarifa_divergente": "{carregador}, {componente}: a tarifa do ERP ({tarifa_erp}) difere da usada no cálculo "
                         "({tarifa_ferramenta}; origem: {origem_tarifa}), o que gera {valor}. Conferir o documento que "
                         "sustenta a tarifa e o cadastro de tarifas do ERP antes de emitir a cobrança.",
    "quantidade_divergente": "{carregador}, {componente}: a quantidade no ERP ({qtd_erp}) difere da ferramenta "
                             "({qtd_ferramenta}; origem: {origem_tarifa}), efeito de {valor}. Conferir o contrato "
                             "vigente no mês e o cadastro do ERP.",
    "fonte_faltante": "{carregador}, {componente}: o ERP cobra {valor_erp} sem a fonte que sustenta a cobrança "
                      "({arquivo}; responsável: {responsavel}). Pedir o arquivo ao responsável, ou anexar o termo "
                      "assinado, antes de permitir.",
    "erp_faltante": "{carregador}: a pré-fatura do ERP não chegou ({arquivo}; responsável: {responsavel}). A ferramenta "
                    "apurou {valor}, mas não há com o que comparar. Pedir a exportação ao responsável e recalcular "
                    "antes de fechar.",
    "preco_acima": "Gás de uso do sistema: preço usado de {preco_usado}/mil m³, {variacao_pct}% acima do índice "
                   "público ({preco_esperado}); impacto de {valor} no mês, rateado entre os carregadores. Conferir a "
                   "fatura do fornecedor e a cláusula de preço do contrato de suprimento.",
    "arredondamento": "{carregador}, {componente}: {valor} de aritmética ou arredondamento no ERP (recalculado "
                      "{recalculado}; ERP {valor_erp}). Conferir a regra de arredondamento do ERP.",
    "ajuste_medicao": "{carregador}, {componente}: ajuste de {valor} entre a medição provisória ({qtd_erp}) e a "
                      "final ({qtd_ferramenta}). Esperado; entra por nota de ajuste.",
    "ajuste_anomalo": "{carregador}, {componente}: ajuste de {valor} entre a provisória ({qtd_erp}) e a final "
                      "({qtd_ferramenta}), variação de {variacao_pct}%, acima do alerta de {alerta_pct}%. Não bloqueia, "
                      "mas conferir a medição final certificada (digitação ou unidade) antes de emitir a nota de ajuste.",
    "linha_sem_par": "{carregador}, {componente}: linha de {valor} sem correspondente entre ERP e ferramenta. "
                     "Conferir o cadastro do componente no ERP.",
}
NUMERO = re.compile(r"\d+(?:[.,]\d+)*")
GRANDEZA = re.compile(r"\s*(mil|milh[ãa]o|milh[õo]es|bilh[ãa]o|bilh[õo]es|mi|bi|k)\b", re.IGNORECASE)
POR_EXTENSO = re.compile(r"\b(milh[ãa]o|milh[õo]es|bilh[ãa]o|bilh[õo]es)\b", re.IGNORECASE)


def texto_offline(evidencia: dict) -> str:
    texto = MODELOS[evidencia["codigo"]].format(**evidencia)
    if evidencia.get("idade_ciclos"):
        texto += f" Em aberto há {evidencia['idade_ciclos']} ciclo(s)."
    return "[offline] " + texto


def numeros_conferem(texto: str, evidencia: dict) -> bool:
    """Todo número do texto precisa existir, inteiro, na evidência: '254' ou '254 mil' não valem por '254.469,13'."""
    normal = lambda s: re.sub(r"\s+", " ", s.replace(" ", " ").replace(" ", " "))
    fonte, texto = normal(json.dumps(evidencia, ensure_ascii=False)), normal(texto)
    permitidos = set(NUMERO.findall(fonte))
    for m in NUMERO.finditer(texto):
        if m.group() not in permitidos:
            return False
        g = GRANDEZA.match(texto, m.end())
        if g and f"{m.group()} {g.group(1)}".lower() not in fonte.lower():
            return False
    return not (POR_EXTENSO.search(texto) and not POR_EXTENSO.search(fonte))


def explicar(gateway, dif: dict) -> tuple[str, str]:
    ev = dif["evidencia"]
    r = gateway.chamar("explicador: explicar diferença " + dif["chave"], SISTEMA, json.dumps(ev, ensure_ascii=False),
                       lambda redigido: texto_offline(json.loads(redigido)),
                       validar=lambda texto: numeros_conferem(texto, ev),
                       redigir_nomes=False)  # evidência montada pelo código: sem texto livre nem contato
    return r["resultado"], r["modo"]
