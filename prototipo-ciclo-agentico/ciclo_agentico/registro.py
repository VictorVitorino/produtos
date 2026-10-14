"""Registro do ciclo em SQLite: entradas, versão, parâmetros, saídas, explicações, aprovações e eventos.

Nada é apagado nem sobrescrito: cada cálculo é uma execução nova; cada explicação e cada decisão é uma
linha nova (vale a mais recente).
Uma permissão vale para a chave da diferença E para o valor permitido: se o valor mudar, a
permissão antiga deixa de valer."""
import json
import sqlite3
from pathlib import Path

from .util import agora_iso as agora

ESQUEMA = """
CREATE TABLE IF NOT EXISTS ciclos (ciclo TEXT PRIMARY KEY, status TEXT, fechado_em TEXT, fechado_por TEXT, resumo TEXT);
CREATE TABLE IF NOT EXISTS fontes (ciclo TEXT, registrado_em TEXT, dados TEXT);
CREATE TABLE IF NOT EXISTS parametros (id INTEGER PRIMARY KEY, ciclo TEXT, carregador TEXT, parametro TEXT, valor TEXT,
  valor_anterior TEXT, vigencia_inicio TEXT, origem TEXT, trecho TEXT, verificado INTEGER, modo TEXT,
  status TEXT DEFAULT 'pendente', decidido_por TEXT, decidido_em TEXT,
  UNIQUE (ciclo, carregador, parametro, valor, origem));
CREATE TABLE IF NOT EXISTS execucoes (id INTEGER PRIMARY KEY, ciclo TEXT, criado_em TEXT, versao TEXT, versao_partes TEXT,
  hash_saidas TEXT, resultado TEXT);
CREATE TABLE IF NOT EXISTS diferencas (execucao INTEGER, id TEXT, chave TEXT, valor TEXT, faixa TEXT, dados TEXT,
  PRIMARY KEY (execucao, id));
CREATE TABLE IF NOT EXISTS explicacoes (seq INTEGER PRIMARY KEY, execucao INTEGER, id TEXT, texto TEXT, modo TEXT,
  registrado_em TEXT);
CREATE TABLE IF NOT EXISTS aprovacoes (id INTEGER PRIMARY KEY, ciclo TEXT, chave TEXT, valor TEXT, decisao TEXT,
  por TEXT, papel TEXT, motivo TEXT, data TEXT, registrado_em TEXT);
CREATE TABLE IF NOT EXISTS eventos (id INTEGER PRIMARY KEY, ciclo TEXT, ts TEXT, tipo TEXT, detalhe TEXT);
"""


class Registro:
    def __init__(self, caminho: Path):
        Path(caminho).parent.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(caminho)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(ESQUEMA)

    def _q(self, sql, *args):
        return [dict(r) for r in self.db.execute(sql, args).fetchall()]

    def evento(self, ciclo, tipo, detalhe):
        self.db.execute("INSERT INTO eventos (ciclo, ts, tipo, detalhe) VALUES (?,?,?,?)", (ciclo, agora(), tipo, detalhe))
        self.db.commit()

    def eventos(self, ciclo):
        return self._q("SELECT * FROM eventos WHERE ciclo=? ORDER BY id", ciclo)

    def status(self, ciclo):
        r = self._q("SELECT * FROM ciclos WHERE ciclo=?", ciclo)
        return r[0] if r else {"ciclo": ciclo, "status": "aberto"}

    def salvar_fontes(self, ciclo, fontes):
        self.db.execute("INSERT INTO fontes VALUES (?,?,?)", (ciclo, agora(), json.dumps(fontes, ensure_ascii=False)))
        self.db.commit()

    def fontes(self, ciclo):
        r = self._q("SELECT dados FROM fontes WHERE ciclo=? ORDER BY rowid DESC LIMIT 1", ciclo)
        return json.loads(r[0]["dados"]) if r else []

    def salvar_propostas(self, ciclo, propostas):
        for p in propostas:
            self.db.execute("INSERT OR IGNORE INTO parametros (ciclo, carregador, parametro, valor, valor_anterior, "
                            "vigencia_inicio, origem, trecho, verificado, modo) VALUES (?,?,?,?,?,?,?,?,?,?)",
                            (ciclo, p["carregador"], p["parametro"], p["valor"], p["valor_anterior"], p["vigencia_inicio"],
                             p["origem"], p["trecho"], int(p["verificado_no_texto"]), p["modo"]))
        self.db.commit()

    def parametros(self, ciclo, status=None):
        sql = "SELECT * FROM parametros WHERE ciclo=?" + (" AND status=?" if status else "") + " ORDER BY id"
        return self._q(sql, *([ciclo, status] if status else [ciclo]))

    def decidir_parametro(self, ciclo, pid, status, por):
        n = self.db.execute("UPDATE parametros SET status=?, decidido_por=?, decidido_em=? WHERE ciclo=? AND id=? AND status='pendente'",
                            (status, por, agora(), ciclo, pid)).rowcount
        self.db.commit()
        return n

    def salvar_execucao(self, ciclo, versao, resultado, difs, hash_saidas):
        cur = self.db.execute("INSERT INTO execucoes (ciclo, criado_em, versao, versao_partes, hash_saidas, resultado) VALUES (?,?,?,?,?,?)",
                              (ciclo, agora(), versao["hash"], json.dumps(versao["partes"], ensure_ascii=False), hash_saidas,
                               json.dumps(resultado, ensure_ascii=False)))
        for d in difs:
            self.db.execute("INSERT INTO diferencas (execucao, id, chave, valor, faixa, dados) VALUES (?,?,?,?,?,?)",
                            (cur.lastrowid, d["id"], d["chave"], d["valor"], d["faixa"], json.dumps(d, ensure_ascii=False)))
        self.db.commit()
        return cur.lastrowid

    def ultima_execucao(self, ciclo):
        r = self._q("SELECT * FROM execucoes WHERE ciclo=? ORDER BY id DESC LIMIT 1", ciclo)
        if not r:
            return None
        ex = r[0]
        ex["resultado"], ex["versao_partes"] = json.loads(ex["resultado"]), json.loads(ex["versao_partes"])
        ex["diferencas"] = []
        for row in self._q("SELECT * FROM diferencas WHERE execucao=? ORDER BY id", ex["id"]):
            d = json.loads(row["dados"])
            exp = self._q("SELECT texto, modo FROM explicacoes WHERE execucao=? AND id=? ORDER BY seq DESC LIMIT 1", ex["id"], d["id"])
            d["explicacao"], d["explicacao_modo"] = (exp[0]["texto"], exp[0]["modo"]) if exp else (None, None)
            d["decisao"] = self.decisao(ciclo, d["chave"], d["valor"])
            ex["diferencas"].append(d)
        return ex

    def salvar_explicacao(self, execucao, did, texto, modo):
        self.db.execute("INSERT INTO explicacoes (execucao, id, texto, modo, registrado_em) VALUES (?,?,?,?,?)",
                        (execucao, did, texto, modo, agora()))
        self.db.commit()

    def decidir(self, ciclo, chave, valor, decisao, por, papel, motivo, data):
        self.db.execute("INSERT INTO aprovacoes (ciclo, chave, valor, decisao, por, papel, motivo, data, registrado_em) "
                        "VALUES (?,?,?,?,?,?,?,?,?)", (ciclo, chave, valor, decisao, por, papel, motivo, data, agora()))
        self.db.commit()

    def decisao(self, ciclo, chave, valor):
        r = self._q("SELECT * FROM aprovacoes WHERE ciclo=? AND chave=? AND valor=? ORDER BY id DESC LIMIT 1", ciclo, chave, valor)
        return r[0] if r else None

    def aprovacoes(self, ciclo):
        return self._q("SELECT * FROM aprovacoes WHERE ciclo=? ORDER BY id", ciclo)

    def fechar(self, ciclo, por, resumo):
        self.db.execute("INSERT OR REPLACE INTO ciclos VALUES (?,?,?,?,?)", (ciclo, "fechado", agora(), por, json.dumps(resumo, ensure_ascii=False)))
        self.db.commit()
