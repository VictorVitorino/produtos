"""Testes do protótipo. Rodar da pasta do protótipo: python3 -m unittest discover -s testes -v"""
import json
import os
import shutil
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from unittest import mock

from email.message import EmailMessage

from ciclo_agentico import coletor, explicador, gateway, operacoes as op
from ciclo_agentico.comparacao import bloqueia, classificar
from ciclo_agentico.gateway import ConteudoExcessivo, Gateway
from ciclo_agentico.util import D

RAIZ = Path(__file__).resolve().parent.parent
PII = ["Mariana", "Teixeira", "Rodrigo", "Batista", "123.456.789-09", "12.345.678/0001-95", "99876-5432", "3456-7890", "@carregador", "@fornecedora"]
try:
    import anthropic  # noqa: F401
    TEM_SDK = True
except ImportError:
    TEM_SDK = False


class Base(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.env = mock.patch.dict(os.environ, {"CICLO_MODO": "offline"})
        self.env.start()
        self.abertos = []

    def tearDown(self):
        self.env.stop()
        for c in self.abertos:
            c.reg.db.close()
        shutil.rmtree(self.tmp)

    def ctx(self, nome="saida", dados=RAIZ / "dados"):
        self.abertos.append(op.Contexto(dados=dados, saida=self.tmp / nome))
        return self.abertos[-1]

    def preparar(self, ctx, aceitar=True, modo=None, explicar=True):
        if modo:
            ctx.faixas["modo"] = modo
        op.coletar(ctx)
        if aceitar:
            op.decidir_parametros(ctx, [p["id"] for p in ctx.reg.parametros(ctx.ciclo, "pendente")], (), "Teste")
        op.calcular(ctx)
        if explicar:
            op.explicar(ctx)
        return ctx.reg.ultima_execucao(ctx.ciclo)

    def aprovar_tudo_acima(self, ctx, ex):
        for d in ex["diferencas"]:
            if d["faixa"] in op.ACIMA:
                op.aprovar(ctx, d["id"], "Fulano", "Controladoria", "conferido para o teste", "2026-10-07")

    def copiar_dados(self):
        destino = self.tmp / "dados"
        shutil.copytree(RAIZ / "dados", destino)
        return destino


class TestDeterminismo(Base):
    def test_mesmas_entradas_mesmas_saidas(self):
        a, b = self.preparar(self.ctx("a")), self.preparar(self.ctx("b"))
        self.assertEqual(a["versao"], b["versao"])
        self.assertEqual(a["hash_saidas"], b["hash_saidas"])
        self.assertEqual(json.dumps(a["resultado"], sort_keys=True), json.dumps(b["resultado"], sort_keys=True))

    def test_parametro_aceito_muda_versao_e_saidas(self):
        com, sem = self.preparar(self.ctx("a")), self.preparar(self.ctx("b"), aceitar=False)
        self.assertNotEqual(com["versao"], sem["versao"])
        self.assertNotEqual(com["hash_saidas"], sem["hash_saidas"])

    def test_historico_entra_na_versao_e_fechar_detecta_mudanca(self):
        dados = self.copiar_dados()
        ctx = self.ctx(dados=dados)
        antes = self.preparar(ctx)
        hist = dados / "historico_diferencas.csv"
        hist.write_text(hist.read_text(encoding="utf-8").replace("residuo,2026-06", "residuo,2025-01"), encoding="utf-8")
        with self.assertRaisesRegex(op.ErroCiclo, "rode 'calcular'"):
            op.fechar(ctx, "Teste")
        depois = op.calcular(ctx)
        self.assertNotEqual(antes["versao"], depois["versao"])
        self.assertEqual(next(d["idade"] for d in depois["diferencas"] if d["chave"] == "ALFA|capacidade|residuo"), 20)

    def test_diferencas_com_erp_somam_a_diferenca_liquida(self):
        ex = self.preparar(self.ctx())
        res = ex["resultado"]
        liquido = sum(D(t["total"]) for t in res["totais"].values()) - sum(D(v) for v in res["erp_totais"].values())
        soma = sum(D(d["valor"]) for d in ex["diferencas"] if d["classe"] != "preço acima do esperado")
        self.assertEqual(liquido, soma)


class TestFaixas(Base):
    def test_classificacao(self):
        f = self.ctx().faixas
        casos = [("diferença de cálculo", "-0.37", "dentro da faixa"), ("diferença de cálculo", "500.00", "dentro da faixa"),
                 ("diferença de cálculo", "500.01", "acima da faixa"), ("diferença de cálculo", "150000.01", "acima da materialidade"),
                 ("preço acima do esperado", "82049.31", "acima da faixa"), ("fonte faltante", "0.01", "acima da faixa"),
                 ("ajuste provisória→final", "9999999", "classe própria")]
        for classe, valor, esperado in casos:
            self.assertEqual(classificar(classe, valor, f), esperado, (classe, valor))

    def test_ciclo_demo_classifica_como_esperado(self):
        ex = self.preparar(self.ctx())
        faixa = {d["chave"]: d["faixa"] for d in ex["diferencas"]}
        self.assertEqual(faixa["BETA|movimentacao|tarifa"], "acima da materialidade")
        self.assertEqual(faixa["GAMA|capacidade_extraordinaria|fonte"], "acima da faixa")
        self.assertEqual(faixa["ALFA|capacidade|residuo"], "dentro da faixa")
        idade = {d["chave"]: d["idade"] for d in ex["diferencas"]}
        self.assertEqual((idade["ALFA|capacidade|residuo"], idade["GAMA|capacidade_extraordinaria|fonte"]), (3, 1))


    def test_ajuste_anomalo_sinaliza_sem_bloquear(self):
        dados = self.copiar_dados()
        med = dados / "2026-09" / "medicao_final.csv"
        med.write_text(med.read_text(encoding="utf-8").replace("ALFA,PE-01,2660.496", "ALFA,PE-01,26604.960"), encoding="utf-8")
        ctx = self.ctx(dados=dados)
        ex = self.preparar(ctx, modo="estrito")
        d = next(d for d in ex["diferencas"] if d["chave"] == "ALFA|movimentacao|quantidade")
        self.assertEqual((d["classe"], d["faixa"]), ("ajuste provisória→final", "classe própria"))
        self.assertIn("acima do alerta", d["alerta"])
        self.assertTrue(explicador.numeros_conferem(explicador.texto_offline(d["evidencia"]), d["evidencia"]))
        normais = [x for x in self.preparar(self.ctx("b"))["diferencas"] if x["classe"] == "ajuste provisória→final"]
        self.assertFalse(any(x["alerta"] for x in normais))  # ajustes reais do cenário (< 0,3%) não alertam
        self.aprovar_tudo_acima(ctx, ex)
        self.assertIn(d["id"], op.fechar(ctx, "Teste")["anomalias_sinalizadas"])  # sinaliza, não bloqueia


class TestFechamento(Base):
    def test_bloqueado_sem_permissao_e_liberado_com_permissao(self):
        ctx = self.ctx()
        ex = self.preparar(ctx)
        d01 = next(d for d in ex["diferencas"] if d["faixa"] == "acima da materialidade")
        with self.assertRaisesRegex(op.ErroCiclo, "Fechamento recusado"):
            op.fechar(ctx, "Teste")
        with self.assertRaisesRegex(op.ErroCiclo, "não pode decidir"):
            op.aprovar(ctx, d01["id"], "Fulano", "Analista sênior", "motivo suficiente aqui", "2026-10-07")
        op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "devolvido para conferir", "2026-10-07", devolver=True)
        with self.assertRaisesRegex(op.ErroCiclo, "Fechamento recusado"):
            op.fechar(ctx, "Teste")  # devolver não libera
        op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "aditivo conferido e anexado", "2026-10-07")
        resumo = op.fechar(ctx, "Teste")  # release 1: o resto acima da faixa segue sinalizado
        self.assertTrue(resumo["seguem_ao_proximo_ciclo"])
        with self.assertRaisesRegex(op.ErroCiclo, "já está fechado"):
            op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "depois de fechado", "2026-10-08")

    def test_parametro_pendente_impede_fechar(self):
        ctx = self.ctx()
        self.preparar(ctx, aceitar=False)
        with self.assertRaisesRegex(op.ErroCiclo, "sem decisão"):
            op.fechar(ctx, "Teste")
        op.decidir_parametros(ctx, (), [p["id"] for p in ctx.reg.parametros(ctx.ciclo, "pendente")], "Teste")
        op.calcular(ctx)
        with self.assertRaisesRegex(op.ErroCiclo, "rode 'explicar'"):
            op.fechar(ctx, "Teste")  # o novo cálculo ainda não foi explicado
        op.explicar(ctx)
        self.assertEqual(op.fechar(ctx, "Teste")["parametros_rejeitados"], 2)  # sem o aditivo, nada passa a materialidade

    def test_data_da_decisao_validada(self):
        ctx = self.ctx()
        d01 = next(d for d in self.preparar(ctx)["diferencas"] if d["faixa"] == "acima da materialidade")
        for data, erro in (("2099-13-45", "Data inválida"), ("2099-01-01", "futuro")):
            with self.assertRaisesRegex(op.ErroCiclo, erro):
                op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "aditivo conferido e anexado", data)

    def test_modo_estrito_bloqueia_acima_da_faixa(self):
        ctx = self.ctx()
        ex = self.preparar(ctx, modo="estrito")
        d01 = next(d for d in ex["diferencas"] if d["faixa"] == "acima da materialidade")
        op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "aditivo conferido e anexado", "2026-10-07")
        with self.assertRaisesRegex(op.ErroCiclo, "acima da faixa"):
            op.fechar(ctx, "Teste")

    def test_entrada_alterada_depois_do_calculo_exige_coleta_e_recalculo(self):
        ctx = self.ctx(dados=self.copiar_dados())
        self.preparar(ctx)
        with open(ctx.dir_ciclo / "pre_fatura_erp.csv", "a", encoding="utf-8") as f:
            f.write("PF-X,DELTA,capacidade_extraordinaria,1,mil m³/dia,1.00,1.00\n")
        for passo in (lambda: op.fechar(ctx, "Teste"), lambda: op.calcular(ctx)):
            with self.assertRaisesRegex(op.ErroCiclo, "pre_fatura_erp.csv. Rode 'coletar'"):
                passo()
        op.coletar(ctx)
        with self.assertRaisesRegex(op.ErroCiclo, "rode 'calcular'"):
            op.fechar(ctx, "Teste")

    def test_sem_coleta_calcular_e_fechar_recusam(self):
        ctx = self.ctx()
        for passo in (lambda: op.calcular(ctx), lambda: op.fechar(ctx, "Teste")):
            with self.assertRaisesRegex(op.ErroCiclo, "Nenhuma coleta registrada.*rode 'coletar'"):
                passo()
        self.assertEqual(ctx.reg.status(ctx.ciclo)["status"], "aberto")
        self.assertEqual([e["tipo"] for e in ctx.reg.eventos(ctx.ciclo)], ["calculo recusado", "fechamento recusado"])

    def test_email_novo_depois_do_calculo_exige_coleta_e_decisao(self):
        ctx = self.ctx(dados=self.copiar_dados())
        ex = self.preparar(ctx)
        self.aprovar_tudo_acima(ctx, ex)
        m = EmailMessage()
        m["From"], m["Subject"] = "Ana <ana@carregador-gama.example>", "Reajuste"
        m.set_content("A tarifa de capacidade passa de R$ 1.180,00 para R$ 1.250,00 a partir de 01/09/2026.")
        (ctx.dir_ciclo / "emails" / "zz_novo.eml").write_bytes(bytes(m))
        for passo in (lambda: op.fechar(ctx, "Teste"), lambda: op.calcular(ctx)):
            with self.assertRaisesRegex(op.ErroCiclo, "emails/zz_novo.eml. Rode 'coletar' \\(o agente precisa ler os e-mails"):
                passo()
        nova = [p for p in op.coletar(ctx)["propostas"] if p["status"] == "pendente"]
        self.assertEqual([(p["carregador"], p["parametro"], p["valor"]) for p in nova], [("GAMA", "tarifa_capacidade", "1250.00")])
        op.calcular(ctx)
        op.explicar(ctx)
        with self.assertRaisesRegex(op.ErroCiclo, "sem decisão"):
            op.fechar(ctx, "Teste")
        op.decidir_parametros(ctx, [nova[0]["id"]], (), "Teste")
        ex = self.preparar(ctx, aceitar=False)
        d = next(d for d in ex["diferencas"] if d["chave"] == "GAMA|capacidade|tarifa")
        self.assertEqual((d["valor"], d["faixa"]), ("168000.00", "acima da materialidade"))  # 70 × 2.400
        with self.assertRaisesRegex(op.ErroCiclo, f"{d['id']} \\(acima da materialidade\\)"):
            op.fechar(ctx, "Teste")
        op.aprovar(ctx, d["id"], "Fulano", "Controladoria", "reajuste conferido com o carregador", "2026-10-07")
        self.assertEqual(op.fechar(ctx, "Teste")["versao"], ex["versao"])

    def test_explicacao_antes_de_aprovar_e_de_fechar_sem_sobrescrever(self):
        ctx = self.ctx()
        ex = self.preparar(ctx, explicar=False)
        d01 = next(d for d in ex["diferencas"] if d["faixa"] == "acima da materialidade")
        with self.assertRaisesRegex(op.ErroCiclo, "rode 'explicar' antes"):
            op.aprovar(ctx, d01["id"], "Fulano", "Controladoria", "aditivo conferido e anexado", "2026-10-07")
        with self.assertRaisesRegex(op.ErroCiclo, "sem explicação no último cálculo"):
            op.fechar(ctx, "Teste")
        op.explicar(ctx)
        op.explicar(ctx)  # de novo: linha nova, a anterior fica
        n = ctx.reg.db.execute("SELECT COUNT(*) FROM explicacoes WHERE id=?", (d01["id"],)).fetchone()[0]
        self.assertEqual(n, 2)
        self.aprovar_tudo_acima(ctx, ctx.reg.ultima_execucao(ctx.ciclo))
        op.fechar(ctx, "Teste")

    def test_ciclo_fechado_lista_parametros_e_recusa_mudancas(self):
        ctx = self.ctx()
        self.aprovar_tudo_acima(ctx, self.preparar(ctx))
        op.fechar(ctx, "Teste")
        self.assertEqual(len(op.decidir_parametros(ctx)), 2)  # listar continua possível
        for passo in (lambda: op.explicar(ctx), lambda: op.coletar(ctx), lambda: op.calcular(ctx),
                      lambda: op.decidir_parametros(ctx, [1], (), "Teste")):
            with self.assertRaisesRegex(op.ErroCiclo, "já está fechado"):
                passo()
        self.assertEqual(ctx.reg.eventos(ctx.ciclo)[-1]["tipo"], "fechamento")

    def test_ciclo_invalido_recusado(self):
        for ciclo in ("xx", "2026-13", "2026-9", "2026-00"):
            with self.assertRaisesRegex(op.ErroCiclo, "Ciclo inválido"):
                op.Contexto(saida=self.tmp / "s", ciclo=ciclo)
        self.assertFalse((self.tmp / "s").exists())

    def test_provisoria_para_final_nunca_bloqueia(self):
        ex = self.preparar(self.ctx())
        ajustes = [d for d in ex["diferencas"] if d["classe"] == "ajuste provisória→final"]
        self.assertGreaterEqual(len(ajustes), 5)
        for d in ajustes:
            self.assertEqual(d["faixa"], "classe própria")
            self.assertFalse(bloqueia(d["faixa"], False, "estrito"))


class TestColetor(Base):
    def test_fonte_obrigatoria_faltante_coletar_lista_e_calcular_recusa(self):
        responsavel = {"medicao_provisoria.csv": "Área de Medição", "consumo_gas_sistema.csv": "Área de Medição",
                       "contratos.xlsx": "Operações Comerciais", "indice_preco_gas.csv": "Suprimento de Gás e Energia"}
        for i, (arquivo, resp) in enumerate(responsavel.items()):
            with self.subTest(arquivo=arquivo):
                dados = self.tmp / f"dados{i}"
                shutil.copytree(RAIZ / "dados", dados)
                (dados / "2026-09" / arquivo).unlink()
                ctx = self.ctx(f"saida{i}", dados=dados)
                st = {f["arquivo"]: f for f in op.coletar(ctx)["fontes"]}  # ponta a ponta: não pode quebrar
                self.assertEqual((st[arquivo]["status"], st[arquivo]["responsavel"]), ("faltante", resp))
                self.assertEqual(st["capacidade_extraordinaria.csv"]["status"], "faltante")
                self.assertEqual(len(ctx.reg.parametros(ctx.ciclo)), 2)  # os e-mails são lidos mesmo assim
                self.assertEqual(ctx.reg.fontes(ctx.ciclo), list(st.values()))
                with self.assertRaisesRegex(op.ErroCiclo, f"{arquivo} \\(responsável: {resp}\\)"):
                    op.calcular(ctx)

    def test_medicao_final_parcial_lista_quem_falta(self):
        st = {f["id"]: f for f in op.coletar(self.ctx())["fontes"]}
        self.assertEqual(st["medicao_final"]["status"], "parcial")
        self.assertIn("DELTA", st["medicao_final"]["obs"])

    def test_sem_pre_fatura_um_unico_item_fonte_faltante(self):
        dados = self.copiar_dados()
        (dados / "2026-09" / "pre_fatura_erp.csv").unlink()
        ex = self.preparar(self.ctx(dados=dados))
        sem_erp = [d for d in ex["diferencas"] if d["classe"] != "preço acima do esperado"]
        self.assertEqual([(d["chave"], d["classe"], d["faixa"]) for d in sem_erp],
                         [("TODOS|pre_fatura|fonte", "fonte faltante", "acima da materialidade")])
        self.assertTrue(ex["resultado"]["erp_ausente"])
        self.assertTrue(explicador.numeros_conferem(explicador.texto_offline(sem_erp[0]["evidencia"]), sem_erp[0]["evidencia"]))

    def test_email_multipart_so_html_e_sem_data(self):
        dados = self.copiar_dados()
        m = EmailMessage()
        m["From"], m["Subject"] = "Ana <ana@carregador-gama.example>", "Tarifa"
        m.set_content("Texto antigo sem números.")
        m.add_alternative("<p>A tarifa de capacidade passa de R$ 1.180,00 para R$ 1.195,00 a partir de 01/09/2026.</p>", subtype="html")
        (dados / "2026-09" / "emails" / "multipart.eml").write_bytes(bytes(m))
        h = EmailMessage()
        h["From"], h["Subject"] = "Ana <ana@carregador-gama.example>", "Tarifa"
        h.set_content("<html><body><p>A tarifa de capacidade passa de R$ 1.180,00 para R$ 1.190,00 a partir de "
                      "01/09/2026.</p><style>p{}</style></body></html>", subtype="html")
        (dados / "2026-09" / "emails" / "so_html.eml").write_bytes(bytes(h))
        emails = {e["arquivo"]: e for e in coletor.ler_emails(dados / "2026-09", {"carregador-gama.example": "GAMA"})}
        self.assertEqual(emails["multipart.eml"]["corpo"], "Texto antigo sem números.\n")  # prefere o texto puro
        self.assertEqual(emails["so_html.eml"]["data"], "sem data")
        self.assertNotIn("<p>", emails["so_html.eml"]["corpo"])
        props = op.coletar(self.ctx(dados=dados))["propostas"]
        self.assertIn(("GAMA", "tarifa_capacidade", "1190.00"), {(p["carregador"], p["parametro"], p["valor"]) for p in props})

    def test_email_longo_nao_para_a_coleta_e_citacao_e_cortada(self):
        dados = self.copiar_dados()
        m = EmailMessage()
        m["From"], m["Subject"] = "Zé <ze@carregador-alfa.example>", "Longo"
        m.set_content("Texto novo e longo. " * 400)
        (dados / "2026-09" / "emails" / "a_longo.eml").write_bytes(bytes(m))
        r = op.coletar(self.ctx(dados=dados))
        self.assertEqual([n["arquivo"] for n in r["nao_processados"]], ["a_longo.eml"])
        self.assertEqual(len(r["propostas"]), 2)  # os demais e-mails seguem
        self.assertEqual(next(f for f in r["fontes"] if f["id"] == "emails")["status"], "parcial")
        corpo = "Resposta curta.\n\nEm 02/09/2026 10:14, Fulano <f@x.example> escreveu:\n> " + "antigo " * 2000
        self.assertEqual(coletor.sem_citacoes(corpo), "Resposta curta.\n")

    def test_propostas_ficam_pendentes_e_valor_confere_no_texto(self):
        ctx = self.ctx()
        props = op.coletar(ctx)["propostas"]
        self.assertEqual({(p["carregador"], p["parametro"], p["valor"]) for p in props},
                         {("BETA", "tarifa_movimentacao", "43.85"), ("SISTEMA", "preco_gas_uso_sistema", "2082.00")})
        self.assertTrue(all(p["status"] == "pendente" and p["verificado"] for p in props))
        self.assertFalse(coletor.confere({"valor": 43.85, "vigencia_inicio": "2026-10-01"}, "R$ 43,85 a partir de 01/09/2026"))
        self.assertEqual(op.calcular(ctx)["resultado"]["gus"]["preco_usado"], "2050.00")  # pendente não entra no cálculo


class TestGateway(Base):
    def test_redacao_antes_de_sair_e_no_log(self):
        ctx = self.ctx()
        visto = []
        for em in coletor.ler_emails(ctx.dir_ciclo, ctx.contatos["dominios"]):
            ctx.gw.chamar("teste", "s", em["corpo"], lambda t: visto.append(t) or {"propostas": []}, nomes_extras=[em["remetente_nome"]])
        log = ctx.gw.log_path.read_text(encoding="utf-8")
        for texto in visto + [log]:
            for p in PII:
                self.assertNotIn(p, texto)
        self.assertIn("[CPF REMOVIDO]", visto[0])
        self.assertIn("[CNPJ REMOVIDO]", visto[1])
        linha = json.loads(log.splitlines()[0])
        self.assertEqual(set(linha), {"ts", "finalidade", "modo", "motivo", "modelo", "bytes", "sha256", "redacao", "cortes",
                                      "conteudo_redigido"})

    def test_redacao_de_formatos_variados_sem_cortar_valores(self):
        gw = Gateway(self.tmp / "log.jsonl", ["Mariana Teixeira Lopes", "José Ávila"])
        for texto in ("ligue 21 91234-5678", "tel (21) 3456 7890", "+55 (21) 99876-5432", "(21) 9 9876-5432", "21 9 8765-4321",
                      "+55 21 9 8765 4321", "+55 (21) 9 9876-5432", "(021) 3456-7890", "021 3456-7890", "CPF 123 456 789 09",
                      "CPF 12345678909", "CNPJ 12 345 678 0001 95", "assinado por MARIANA TEIXEIRA", "falar com jose avila",
                      "Atenciosamente,\n\nJoão da Silva\nGerência"):
            redigido, cortes = gw.redigir(texto)
            self.assertIn("REMOVIDO", redigido, texto)
            self.assertFalse(any(c.isdigit() for c in redigido) or "MARIANA" in redigido or "João" in redigido, redigido)
        valores = ("R$ 254.469,13 e R$ 5.750.000,37 em 2026-09-01, vigência 01/09/2026, 134828.377 mil m³, "
                   "TR-BETA-002, R$ 41,20 para R$ 43,85, PF-2026-09-001, 13.549.866,82\nAtt.,\nCarregador Beta Ltda.")
        self.assertEqual(gw.redigir(valores), (valores, {}))

    def test_nome_de_carregador_nao_e_cortado_e_contato_e(self):
        dados = self.copiar_dados()
        contatos = json.loads((dados / "contatos_conhecidos.json").read_text(encoding="utf-8"))
        contatos["nomes"].append("Luísa da Gama")
        (dados / "contatos_conhecidos.json").write_text(json.dumps(contatos, ensure_ascii=False), encoding="utf-8")
        ctx = self.ctx(dados=dados)
        for d in self.preparar(ctx)["diferencas"]:
            if d.get("explicacao"):
                self.assertNotIn("REMOVIDO", d["explicacao"], d["id"])
        d04 = next(d for d in ctx.reg.ultima_execucao(ctx.ciclo)["diferencas"] if d["chave"].startswith("GAMA|capacidade_extra"))
        self.assertIn("Carregador Gama", d04["explicacao"])
        self.assertEqual(ctx.gw.redigir("Carregador Gama: falar com Luísa da Gama ou com a Luísa.")[0],
                         "Carregador Gama: falar com [NOME REMOVIDO] ou com a [NOME REMOVIDO].")
        for linha in ctx.gw.log_path.read_text(encoding="utf-8").splitlines():
            g = json.loads(linha)
            self.assertEqual(g["redacao"].startswith("só padrões"), g["finalidade"].startswith("explicador"))

    def test_conteudo_acima_do_limite_e_recusado_e_registrado(self):
        ctx = self.ctx()
        with self.assertRaises(ConteudoExcessivo):
            ctx.gw.chamar("teste", "s", "x" * 7000, lambda t: t)
        self.assertEqual(json.loads(ctx.gw.log_path.read_text(encoding="utf-8"))["modo"], "recusado")

    def test_credencial_como_o_sdk(self):
        limpo = {k: v for k, v in os.environ.items() if not k.startswith("ANTHROPIC_")}
        with mock.patch.dict(os.environ, {**limpo, "ANTHROPIC_CONFIG_DIR": str(self.tmp / "cfg")}, clear=True):
            self.assertIsNone(gateway.credencial())
            (self.tmp / "cfg" / "credentials").mkdir(parents=True)
            (self.tmp / "cfg" / "credentials" / "default.json").write_text("{}")
            self.assertIn("ant auth login", gateway.credencial())
            os.environ.update(ANTHROPIC_FEDERATION_RULE_ID="r", ANTHROPIC_ORGANIZATION_ID="o",
                              ANTHROPIC_SERVICE_ACCOUNT_ID="s", ANTHROPIC_IDENTITY_TOKEN_FILE="/x")
            self.assertIn("WIF", gateway.credencial())

    def test_guarda_de_numeros(self):
        ev = {"valor": "R$ 254.469,13", "qtd_erp": "1.000 mil m³/dia", "variacao_pct": "1,56", "idade_ciclos": 1}
        for texto in ("Impacto de R$ 1,2 milhão.", "Cerca de R$ 254 mil.", "999.999,99 reais", "254.469,13 mil", "um milhão"):
            self.assertFalse(explicador.numeros_conferem(texto, ev), texto)
        self.assertTrue(explicador.numeros_conferem("R$ 254.469,13; 1.000 mil m³/dia; 1,56%; há 1 ciclo.", ev))
        ctx = self.ctx()
        for d in self.preparar(ctx)["diferencas"]:  # todo texto offline passaria pela mesma guarda
            self.assertTrue(explicador.numeros_conferem(explicador.texto_offline(d["evidencia"]), d["evidencia"]), d["id"])

    def test_texto_do_modelo_com_valor_inventado_e_descartado(self):
        ctx = self.ctx()
        d = next(d for d in self.preparar(ctx)["diferencas"] if d["faixa"] == "acima da materialidade")
        with mock.patch.object(Gateway, "modo", return_value=("online", "teste")), \
             mock.patch.object(Gateway, "_claude", return_value="Diferença de R$ 999.999,99 por erro de tarifa."):
            texto, modo = explicador.explicar(ctx.gw, d)
        self.assertEqual(modo, "offline")
        self.assertTrue(texto.startswith("[offline]"))
        self.assertIn("reprovada", ctx.gw.log_path.read_text(encoding="utf-8"))


@unittest.skipUnless(TEM_SDK, "SDK 'anthropic' não instalado: caminho online não testado")
class TestCaminhoOnline(Base):
    def test_requisicao_ao_claude_por_servidor_local(self):
        pedidos = []

        class Falso(BaseHTTPRequestHandler):
            def do_POST(self):
                corpo = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
                pedidos.append((self.path, dict(self.headers), corpo))
                texto = json.dumps({"propostas": [{"parametro": "tarifa_movimentacao", "valor": 43.85,
                                                   "vigencia_inicio": "2026-09-01", "trecho": "passa para R$ 43,85"}]})
                saida = json.dumps({"id": "msg_teste", "type": "message", "role": "assistant", "model": corpo["model"],
                                    "content": [{"type": "text", "text": texto}], "stop_reason": "end_turn",
                                    "stop_sequence": None, "usage": {"input_tokens": 1, "output_tokens": 1}}).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(saida)))
                self.end_headers()
                self.wfile.write(saida)

            def log_message(self, *a):
                pass

        srv = HTTPServer(("127.0.0.1", 0), Falso)
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        env = {"CICLO_MODO": "online", "ANTHROPIC_API_KEY": "chave-de-teste", "ANTHROPIC_BASE_URL": f"http://127.0.0.1:{srv.server_port}",
               "NO_PROXY": "127.0.0.1,localhost", "no_proxy": "127.0.0.1,localhost"}
        with mock.patch.dict(os.environ, env):
            ctx = self.ctx()
            props, _ = coletor.propor_parametros(ctx.gw, coletor.ler_emails(ctx.dir_ciclo, ctx.contatos["dominios"])[:1], {})
        srv.shutdown()
        srv.server_close()
        self.assertEqual((props[0]["modo"], props[0]["valor"]), ("online", "43.85"))
        caminho, cabecalhos, corpo = pedidos[0]
        self.assertTrue(caminho.startswith("/v1/messages"))
        self.assertEqual((corpo["model"], corpo["fallbacks"]), ("claude-opus-5-5", "default"))
        self.assertEqual(corpo["output_config"]["format"]["type"], "json_schema")
        self.assertIn("server-side-fallback-2026-07-01", {k.lower(): v for k, v in cabecalhos.items()}["anthropic-beta"])
        for p in PII:
            self.assertNotIn(p, json.dumps(corpo, ensure_ascii=False))


if __name__ == "__main__":
    unittest.main()
