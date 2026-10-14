"""Gera os dados SINTÉTICOS do ciclo 2026-09 da "Transportadora Exemplo".

Tudo aqui é inventado: empresas, pessoas, volumes, tarifas e preços.
O script simula o "mundo lá fora" (exportações de OT, planilha de contratos,
pré-fatura do ERP, índice público e e-mails) com algumas falhas plantadas:
  - Carregador Beta: aditivo muda a tarifa de movimentação, avisado só por e-mail;
    o ERP ainda usa a tarifa antiga.
  - Carregador Delta: capacidade reduzida no contrato a partir de setembro; o ERP
    ainda cobra a antiga. Medição final de Delta ainda não chegou.
  - Carregador Gama: o ERP cobra capacidade extraordinária cujo arquivo do portal
    não foi baixado (fonte faltante).
  - Carregador Alfa: erro de R$ 0,37 na aritmética do ERP (recorrente).
  - Preço do gás de uso do sistema do fornecedor acima do índice público.
Uso: python3 gerar_dados.py [pasta_dados]
"""
import json
import random
import sys
from datetime import date, timedelta
from email.message import EmailMessage
from html import escape
from pathlib import Path

from openpyxl import Workbook

from ciclo_agentico.util import D, q2, q3, escrever_csv

CICLO = "2026-09"
DIAS = [date(2026, 9, 1) + timedelta(days=i) for i in range(30)]
# carregador: (pontos e participação, volume base mil m³/dia, ajuste provisória->final)
VOLUMES = {
    "ALFA": ({"PE-01": "0.6", "PE-02": "0.4"}, 4500, "-0.0018"),
    "BETA": ({"PE-01": "1"}, 3200, "0.0012"),
    "GAMA": ({"PE-03": "1"}, 2100, "-0.0025"),
    "DELTA": ({"PE-02": "1"}, 900, None),  # medição final ainda não chegou
}
CONTRATOS = [  # contrato, carregador, capacidade, tarifa capacidade, tarifa movimentação, vigência
    ("TR-ALFA-001", "ALFA", 5000, "1150.00", "41.20", "2025-01-01", "2027-12-31"),
    ("TR-BETA-002", "BETA", 3500, "1150.00", "41.20", "2025-07-01", "2027-06-30"),
    ("TR-GAMA-001", "GAMA", 2400, "1180.00", "42.10", "2025-01-01", "2027-12-31"),
    ("TR-DELTA-001", "DELTA", 1000, "1210.00", "43.00", "2025-01-01", "2026-08-31"),
    ("TR-DELTA-001-A2", "DELTA", 950, "1210.00", "43.00", "2026-09-01", "2027-12-31"),
]
INDICE = [("2026-04", "1965.40"), ("2026-05", "1988.10"), ("2026-06", "2012.75"),
          ("2026-07", "2031.20"), ("2026-08", "2041.90"), ("2026-09", "2050.00")]
PRECO_FORNECEDOR = D("2082.00")

MANIFESTO = [
    {"id": "medicao_provisoria", "nome": "Medição provisória diária", "fonte": "Medição e centro de controle (exportação OT)",
     "responsavel": "Área de Medição", "arquivo": "medicao_provisoria.csv", "obrigatoria": True, "bloqueia_calculo": True},
    {"id": "medicao_final", "nome": "Medição final certificada", "fonte": "Medição e centro de controle (exportação OT)",
     "responsavel": "Área de Medição", "arquivo": "medicao_final.csv", "obrigatoria": False, "cobre_carregadores": True},
    {"id": "consumo_gus", "nome": "Consumo de gás de uso do sistema", "fonte": "Medição e centro de controle (exportação OT)",
     "responsavel": "Área de Medição", "arquivo": "consumo_gas_sistema.csv", "obrigatoria": True, "bloqueia_calculo": True},
    {"id": "contratos", "nome": "Contratos de transporte vigentes", "fonte": "Planilha da área comercial",
     "responsavel": "Operações Comerciais", "arquivo": "contratos.xlsx", "obrigatoria": True, "bloqueia_calculo": True},
    {"id": "capacidade_extra", "nome": "Capacidade extraordinária do mês", "fonte": "Portal de capacidade (login pessoal: a pessoa baixa)",
     "responsavel": "Operações Comerciais", "arquivo": "capacidade_extraordinaria.csv", "obrigatoria": True},
    {"id": "indice_preco", "nome": "Índice público de preço do gás", "fonte": "Fonte pública de índices",
     "responsavel": "Suprimento de Gás e Energia", "arquivo": "indice_preco_gas.csv", "obrigatoria": True, "bloqueia_calculo": True},
    {"id": "pre_fatura_erp", "nome": "Pré-faturamento do mês", "fonte": "ERP (exportação, só leitura)",
     "responsavel": "Faturamento e Controladoria", "arquivo": "pre_fatura_erp.csv", "obrigatoria": True},
    {"id": "emails", "nome": "E-mails de carregadores e fornecedor", "fonte": "Caixa de e-mail nomeada",
     "responsavel": "Operações Comerciais", "arquivo": "emails/*.eml", "obrigatoria": False},
]
CONTATOS = {  # dados pessoais FICTÍCIOS, usados para exercitar a redação do gateway
    "dominios": {"carregador-alfa.example": "ALFA", "carregador-beta.example": "BETA",
                 "carregador-gama.example": "GAMA", "carregador-delta.example": "DELTA",
                 "fornecedora-exemplo.example": "SISTEMA"},
    "nomes": ["Mariana Teixeira Lopes", "Rodrigo Nunes Batista"],
}
HISTORICO = [  # diferenças em aberto de ciclos anteriores
    ("ALFA|capacidade|residuo", "2026-06", "-0.41", "aberta", "arredondamento no ERP; passou sem decisão"),
    ("GAMA|capacidade_extraordinaria|fonte", "2026-08", "-36200.00", "aberta", "arquivo do portal não anexado"),
    ("BETA|movimentacao|quantidade", "2026-08", "3120.55", "resolvida", "nota de crédito emitida"),
]
EMAILS = {
    "aditivo_tarifa_beta.eml": (
        "Mariana Teixeira Lopes", "mariana.lopes@carregador-beta.example", "Wed, 02 Sep 2026 10:14:00 -0300",
        "Aditivo nº 3: nova tarifa de movimentação a partir de setembro",
        "Prezados,\n\nConforme o Aditivo nº 3 ao contrato TR-BETA-002, assinado em 28/08/2026, a tarifa de "
        "movimentação passa de R$ 41,20 para R$ 43,85 por mil m³, com vigência a partir de 01/09/2026.\n\n"
        "Pedimos que a pré-fatura de setembro já reflita o novo valor. Para o cadastro do signatário do "
        "aditivo: Mariana Teixeira Lopes, CPF 123.456.789-09.\n\nQualquer dúvida, falar comigo no "
        "(21) 99876-5432 ou em mariana.lopes@carregador-beta.example.\n\nAtenciosamente,\n"
        "Mariana Teixeira Lopes\nGerência Comercial, Carregador Beta\n"),
    "preco_gus_fornecedor.eml": (
        "Rodrigo Nunes Batista", "rodrigo.batista@fornecedora-exemplo.example", "Fri, 04 Sep 2026 09:02:00 -0300",
        "Preço do gás de uso do sistema: competência setembro/2026",
        "Bom dia,\n\nInformamos que o preço do gás de uso do sistema para a competência setembro/2026 é de "
        "R$ 2.082,00 por mil m³, válido a partir de 01/09/2026, conforme a fatura nº 9-2026 da Fornecedora "
        "Exemplo de Gás (CNPJ 12.345.678/0001-95).\n\nContato para conferência: Rodrigo Nunes Batista, "
        "telefone +55 21 3456-7890, rodrigo.batista@fornecedora-exemplo.example.\n\nAtt.,\nRodrigo Nunes Batista\n"),
}


def gerar(pasta: Path) -> None:
    rnd = random.Random(202609)
    dc = pasta / CICLO
    (dc / "emails").mkdir(parents=True, exist_ok=True)
    prov, final, vol_prov = [], [], {}
    for car, (pontos, base, ajuste) in VOLUMES.items():
        for dia in DIAS:
            for ponto, part in pontos.items():
                v = q3(D(base) * D(part) * D(str(1 + rnd.uniform(-0.03, 0.03))))
                prov.append([dia.isoformat(), car, ponto, v])
                vol_prov[car] = vol_prov.get(car, D(0)) + v
                if ajuste:
                    final.append([dia.isoformat(), car, ponto, q3(v * (1 + D(ajuste) + D(str(rnd.uniform(-0.0004, 0.0004)))))])
    cab = ["data", "carregador", "ponto", "volume_mil_m3"]
    escrever_csv(dc / "medicao_provisoria.csv", cab, prov)
    escrever_csv(dc / "medicao_final.csv", cab, final)
    gus = [[d.isoformat(), est, q3(D(base) * D(str(1 + rnd.uniform(-0.05, 0.05))))]
           for d in DIAS for est, base in (("EC-01", 51), ("EC-02", 34.6))]
    escrever_csv(dc / "consumo_gas_sistema.csv", ["data", "estacao", "consumo_mil_m3"], gus)
    escrever_csv(dc / "indice_preco_gas.csv", ["mes", "preco_referencia_brl_mil_m3", "fonte"],
                 [[m, p, "Índice Público Exemplo (fictício)"] for m, p in INDICE])

    wb = Workbook()
    ws = wb.active
    ws.title = "Contratos"
    ws.append(["contrato", "carregador", "capacidade_mil_m3_dia", "tarifa_capacidade_brl",
               "tarifa_movimentacao_brl", "vigencia_inicio", "vigencia_fim"])
    for c in CONTRATOS:
        ws.append([c[0], c[1], c[2], float(c[3]), float(c[4]), c[5], c[6]])
    wb.save(dc / "contratos.xlsx")

    # Pré-fatura do ERP: emitida antes da certificação (usa a provisória) e com as falhas plantadas.
    erp, total_prov = [], sum(vol_prov.values())
    gus_total = sum(D(g[2]) for g in gus)
    erp_cap = {"ALFA": (5000, "1150.00"), "BETA": (3500, "1150.00"), "GAMA": (2400, "1180.00"), "DELTA": (1000, "1210.00")}
    erp_mov = {"ALFA": "41.20", "BETA": "41.20", "GAMA": "42.10", "DELTA": "43.00"}
    for i, car in enumerate(VOLUMES, start=1):
        doc = f"PF-2026-09-{i:03d}"
        qc, tc = erp_cap[car]
        vc = q2(D(qc) * D(tc)) + (D("0.37") if car == "ALFA" else 0)
        erp.append([doc, car, "capacidade", qc, "mil m³/dia", tc, vc])
        erp.append([doc, car, "movimentacao", vol_prov[car], "mil m³", erp_mov[car], q2(vol_prov[car] * D(erp_mov[car]))])
        qg = q3(gus_total * vol_prov[car] / total_prov)
        erp.append([doc, car, "gas_uso_sistema", qg, "mil m³", PRECO_FORNECEDOR, q2(qg * PRECO_FORNECEDOR)])
        if car == "GAMA":
            erp.append([doc, car, "capacidade_extraordinaria", 50, "mil m³/dia", "770.00", "38500.00"])
    escrever_csv(dc / "pre_fatura_erp.csv", ["documento", "carregador", "componente", "quantidade", "unidade", "tarifa", "valor"], erp)

    for nome, (pessoa, end, data, assunto, corpo) in EMAILS.items():
        m = EmailMessage()
        m["From"], m["To"], m["Date"], m["Subject"] = f"{pessoa} <{end}>", "fechamento@transportadora-exemplo.example", data, assunto
        m.set_content(corpo, cte="8bit")
        if nome == "preco_gus_fornecedor.eml":  # como sai do Outlook: texto + HTML (multipart/alternative)
            html = "".join(f"<p>{escape(p).replace(chr(10), '<br>')}</p>" for p in corpo.split("\n\n"))
            m.add_alternative(f"<html><body>{html}</body></html>", subtype="html", cte="8bit")
            m.set_boundary("==fronteira-exemplo-2026-09==")  # fixa: o gerador é determinístico
        (dc / "emails" / nome).write_bytes(bytes(m))

    (pasta / "manifesto_fontes.json").write_text(json.dumps(MANIFESTO, ensure_ascii=False, indent=2), encoding="utf-8")
    (pasta / "contatos_conhecidos.json").write_text(json.dumps(CONTATOS, ensure_ascii=False, indent=2), encoding="utf-8")
    escrever_csv(pasta / "historico_diferencas.csv", ["chave", "ciclo_origem", "valor", "situacao", "observacao"], HISTORICO)


if __name__ == "__main__":
    destino = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "dados"
    gerar(destino)
    print(f"Dados sintéticos gerados em {destino}")
