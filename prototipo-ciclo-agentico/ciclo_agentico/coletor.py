"""Agente coletor: confere as fontes do mês contra o manifesto e lê e-mails não estruturados,
PROPONDO parâmetros (nunca aplicando): cada proposta fica pendente até uma pessoa aceitar."""
import re
from email import policy
from email.parser import BytesParser
from email.utils import parseaddr, parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path

from .gateway import ConteudoExcessivo
from .util import D, ler_csv, sha256_arquivo

PARAMETROS = ["tarifa_movimentacao", "tarifa_capacidade", "preco_gas_uso_sistema"]
ESQUEMA = {
    "type": "object",
    "properties": {"propostas": {"type": "array", "items": {
        "type": "object",
        "properties": {
            "parametro": {"type": "string", "enum": PARAMETROS},
            "valor": {"type": "number"},
            "vigencia_inicio": {"type": "string", "description": "AAAA-MM-DD"},
            "trecho": {"type": "string", "description": "frase do e-mail que sustenta o valor"},
        },
        "required": ["parametro", "valor", "vigencia_inicio", "trecho"],
        "additionalProperties": False}}},
    "required": ["propostas"],
    "additionalProperties": False,
}
SISTEMA = ("Você é o agente coletor do ciclo mensal de custos de transporte de gás. Leia o e-mail e "
           "extraia apenas parâmetros explicitamente informados (tarifa de movimentação, tarifa de "
           "capacidade ou preço do gás de uso do sistema), com o valor exatamente como escrito e a data "
           "de início de vigência. Não calcule nem estime nada. Se não houver parâmetro, devolva lista vazia.")


def verificar_fontes(dir_ciclo: Path, manifesto: list[dict], carregadores: list[str]) -> list[dict]:
    """Status de cada fonte do manifesto: recebida, parcial (com o que falta) ou faltante, e de quem."""
    saida = []
    for fonte in manifesto:
        arquivos = sorted(dir_ciclo.glob(fonte["arquivo"]))
        item = {**fonte, "status": "recebida" if arquivos else "faltante", "obs": "",
                "hashes": {str(a.relative_to(dir_ciclo)): sha256_arquivo(a) for a in arquivos}}
        if not arquivos:
            item["obs"] = "obrigatória: cobrar o responsável" if fonte["obrigatoria"] else "opcional"
        elif fonte.get("cobre_carregadores"):
            presentes = {l["carregador"] for l in ler_csv(arquivos[0])}
            faltam = [c for c in carregadores if c not in presentes]
            if faltam:
                item["status"], item["obs"] = "parcial", "falta: " + ", ".join(faltam) + " (usa a provisória)"
        saida.append(item)
    return saida


class _HtmlParaTexto(HTMLParser):
    BLOCOS = {"br", "p", "div", "tr", "li", "h1", "h2", "h3", "h4", "table"}

    def __init__(self):
        super().__init__()
        self.partes, self.ignorar = [], 0

    def handle_starttag(self, tag, attrs):
        self.ignorar += tag in ("script", "style")
        if tag in self.BLOCOS:
            self.partes.append("\n")

    def handle_endtag(self, tag):
        self.ignorar -= tag in ("script", "style")
        if tag in self.BLOCOS:
            self.partes.append("\n")

    def handle_data(self, dado):
        if not self.ignorar:
            self.partes.append(dado)


def html_para_texto(html: str) -> str:
    p = _HtmlParaTexto()
    p.feed(html)
    linhas = (" ".join(l.replace("\u00a0", " ").split()) for l in "".join(p.partes).splitlines())
    return re.sub(r"\n{3,}", "\n\n", "\n".join(linhas)).strip() + "\n"


CITACAO = re.compile(r"^(?:-{2,}\s*(?:original message|mensagem original)\s*-{2,}|em .{5,200} escreveu:|on .{5,200} wrote:"
                     r"|(?:de|from): .+\n(?:enviad[oa]|sent|data|date): .+)", re.IGNORECASE | re.MULTILINE)


def sem_citacoes(corpo: str) -> str:
    """Corta a conversa citada (resposta/encaminhamento): só a mensagem nova vai ao gateway."""
    m = CITACAO.search(corpo)
    corpo = corpo[:m.start()] if m else corpo
    return "\n".join(l for l in corpo.splitlines() if not l.lstrip().startswith(">")).strip() + "\n"


def ler_emails(dir_ciclo: Path, dominios: dict) -> list[dict]:
    """Aceita text/plain, multipart/alternative (Outlook, Gmail) e só HTML; e-mail sem data não derruba a coleta."""
    emails = []
    for arq in sorted((dir_ciclo / "emails").glob("*.eml")):
        msg = BytesParser(policy=policy.default).parsebytes(arq.read_bytes())
        nome, endereco = parseaddr(str(msg["From"] or ""))
        corpo_msg = msg.get_body(preferencelist=("plain", "html"))
        corpo = corpo_msg.get_content() if corpo_msg else ""
        if corpo_msg and corpo_msg.get_content_subtype() == "html":
            corpo = html_para_texto(corpo)
        try:
            data = parsedate_to_datetime(str(msg["Date"])).date().isoformat() if msg["Date"] else "sem data"
        except (TypeError, ValueError):
            data = "data ilegível"
        emails.append({"arquivo": arq.name, "remetente_nome": nome, "entidade": dominios.get(endereco.split("@")[-1].lower(), "DESCONHECIDO"),
                       "data": data, "assunto": str(msg["Subject"] or ""), "corpo": sem_citacoes(corpo)})
    return emails


def _valor_br(s: str) -> float:
    return float(s.replace(".", "").replace(",", "."))


def extrair_offline(texto: str) -> dict:
    """Substituto determinístico do modelo: expressões regulares sobre o texto já redigido."""
    propostas = []
    for frase in re.split(r"(?<=[.!?])\s+|\n+", texto):
        baixa = frase.lower()
        if "tarifa de movimenta" in baixa:
            parametro = "tarifa_movimentacao"
        elif "tarifa de capacidade" in baixa:
            parametro = "tarifa_capacidade"
        elif "gás de uso do sistema" in baixa or "gas de uso do sistema" in baixa:
            parametro = "preco_gas_uso_sistema"
        else:
            continue
        valores = re.findall(r"R\$\s?([\d.]+,\d{2})", frase)
        data = re.search(r"a partir de (\d{2})/(\d{2})/(\d{4})", frase)
        if valores and data:
            propostas.append({"parametro": parametro, "valor": _valor_br(valores[-1]),
                              "vigencia_inicio": f"{data[3]}-{data[2]}-{data[1]}", "trecho": frase.strip()})
    return {"propostas": propostas}


def valor_no_texto(valor: float, texto: str) -> bool:
    """Verificação determinística: o valor proposto aparece literalmente no texto de origem?"""
    alvo = f"{valor:,.2f}".replace(",", "_").replace(".", ",").replace("_", ".")
    return alvo in texto


def vigencia_no_texto(iso: str, texto: str) -> bool:
    """A data de vigência (AAAA-MM-DD) aparece no texto como dd/mm/aaaa, d/m/aaaa ou AAAA-MM-DD?"""
    m = re.fullmatch(r"(\d{4})-(\d{2})-(\d{2})", str(iso))
    if not m:
        return False
    a, me, d = m.groups()
    formas = {f"{d}/{me}/{a}", f"{int(d)}/{int(me)}/{a}", f"{d}.{me}.{a}", iso}
    return any(re.search(rf"(?<!\d){re.escape(f)}(?!\d)", texto) for f in formas)


def confere(p: dict, texto: str) -> bool:
    return valor_no_texto(p["valor"], texto) and vigencia_no_texto(p["vigencia_inicio"], texto)


def propor_parametros(gateway, emails: list[dict], valores_atuais: dict) -> tuple[list[dict], list[dict]]:
    """Devolve (propostas, e-mails não processados). Um e-mail recusado pelo gateway não para os demais."""
    propostas, nao_processados = [], []
    for em in emails:
        if not em["corpo"].strip():
            nao_processados.append({"arquivo": em["arquivo"], "motivo": "sem corpo de texto"})
            continue
        conteudo = f"Remetente: {em['entidade']} (identificado pelo domínio)\nAssunto: {em['assunto']}\n\n{em['corpo']}"
        try:
            r = gateway.chamar(
                "coletor: propor parâmetros a partir de e-mail", SISTEMA, conteudo, extrair_offline, ESQUEMA,
                nomes_extras=[em["remetente_nome"]],
                validar=lambda res, c=em["corpo"]: all(confere(p, c) for p in res.get("propostas", [])))
        except ConteudoExcessivo as erro:
            nao_processados.append({"arquivo": em["arquivo"], "motivo": f"{erro}; ler e lançar à mão"})
            continue
        for p in r["resultado"]["propostas"]:
            atual = valores_atuais.get((em["entidade"], p["parametro"]))
            propostas.append({
                "carregador": em["entidade"], "parametro": p["parametro"], "valor": str(D(str(p["valor"])).quantize(D("0.01"))),
                "valor_anterior": str(atual) if atual is not None else "", "vigencia_inicio": p["vigencia_inicio"],
                "origem": f"e-mail {em['arquivo']}" + (f" de {em['data']}" if em["data"][:1].isdigit() else f" ({em['data']})"),
                "trecho": p["trecho"][:300],
                "verificado_no_texto": confere(p, em["corpo"]), "modo": r["modo"]})
    return propostas, nao_processados
