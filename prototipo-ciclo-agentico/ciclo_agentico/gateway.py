"""Gateway de IA: o ÚNICO caminho até o modelo.

1. Recebe conteúdo mínimo (só o corpo do e-mail ou a evidência de uma diferença).
2. Corta dado pessoal antes de qualquer envio: e-mail, CNPJ, CPF (com pontos, espaços ou sem
   separador), telefone (com ou sem parênteses, DDD com ou sem 0, +55, celular com "9 " separado,
   espaço ou hífen), nomes conhecidos (sem diferenciar maiúsculas nem acentos) e o nome na linha de
   assinatura logo após o fecho. Uma parte de nome que seja termo de negócio protegido (ex.: "Gama",
   de "Carregador Gama") só é cortada dentro do nome completo. Texto montado pelo próprio código (a
   evidência do explicador) passa só pelos padrões, sem a lista de nomes.
   Isso cobre os formatos testados, não qualquer texto: em produção, DLP dedicado.
3. Chama o Claude (modo online) ou um substituto determinístico (modo OFFLINE), sempre
   sobre o texto já redigido: o substituto vê exatamente o que o modelo veria.
4. Registra cada chamada em JSONL: data e hora, finalidade, modo, modelo, tamanho e hash do
   conteúdo redigido, contagem de cortes e o próprio conteúdo redigido (o que sairia do perímetro).

Modo online exige o SDK `anthropic` e uma credencial que o SDK encontre (mesma ordem do SDK):
ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_PROFILE, variáveis de federação de identidade (WIF)
ou perfil gravado por `ant auth login`. Variáveis: CICLO_MODO=auto|online|offline,
CICLO_MODELO (padrão claude-opus-5-5), CICLO_ESFORCO (padrão low).
"""
import json
import os
import re
import unicodedata
from pathlib import Path

from .util import agora_iso, sha256_texto

MODELO_PADRAO = "claude-opus-5-5"
LIMITE_CARACTERES = 6000  # conteúdo mínimo: acima disso o gateway recusa

_SEM_VIZINHO = r"(?<![\w/])", r"(?![\w/])"
PADROES = [  # ordem importa: e-mail antes de tudo, CNPJ antes de CPF, CPF antes de telefone
    ("email", re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")),
    ("cnpj", re.compile(r"{0}\d{{2}}[\s.]?\d{{3}}[\s.]?\d{{3}}[\s/]?\d{{4}}[\s-]?\d{{2}}{1}".format(*_SEM_VIZINHO))),
    ("cpf", re.compile(r"{0}\d{{3}}[\s.]?\d{{3}}[\s.]?\d{{3}}[\s.-]?\d{{2}}{1}".format(*_SEM_VIZINHO))),
    ("telefone", re.compile(r"{0}(?:\+?55[\s.-]?)?(?:\(0?\d{{2}}\)|0?\d{{2}})[\s.-]?(?:9[\s.-]?)?\d{{4}}[\s.-]?\d{{4}}{1}"
                            .format(*_SEM_VIZINHO))),  # DDD com ou sem 0; celular com "9 " separado
]
FECHO = re.compile(r"^\s*(atenciosamente|att|abs|abraços?|cordialmente|saudações|obrigad[oa])\s*[.,!]*\s*$", re.IGNORECASE)
CONECTORES = {"da", "de", "do", "das", "dos", "e"}
ACENTOS = {"a": "aáàâãä", "e": "eéèêë", "i": "iíìîï", "o": "oóòôõö", "u": "uúùûü", "c": "cç", "n": "nñ"}


class ConteudoExcessivo(ValueError):
    pass


def _sem_acento(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def _padrao_nome(nome: str) -> re.Pattern:
    """'José Silva' casa com 'JOSE SILVA', 'jose  silva', 'José Sílva'."""
    partes = []
    for c in _sem_acento(nome).lower():
        partes.append(r"\s+" if c.isspace() else f"[{ACENTOS[c]}]" if c in ACENTOS else re.escape(c))
    return re.compile(r"\b" + re.sub(r"(\\s\+)+", r"\\s+", "".join(partes)) + r"\b", re.IGNORECASE)


def _parece_nome(linha: str) -> bool:
    t = linha.split()
    return 2 <= len(t) <= 5 and all(p.lower() in CONECTORES or (p[0].isupper() and p.replace("-", "").replace("'", "").isalpha())
                                    for p in t)


def credencial() -> str | None:
    """De onde o SDK tiraria a credencial, na mesma ordem dele; None se não houver nenhuma."""
    for var in ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_PROFILE"):
        if os.environ.get(var):
            return var
    wif = ("ANTHROPIC_FEDERATION_RULE_ID", "ANTHROPIC_ORGANIZATION_ID", "ANTHROPIC_SERVICE_ACCOUNT_ID")
    if all(os.environ.get(v) for v in wif) and (os.environ.get("ANTHROPIC_IDENTITY_TOKEN_FILE") or os.environ.get("ANTHROPIC_IDENTITY_TOKEN")):
        return "federação de identidade (WIF)"
    padrao = Path(os.environ["APPDATA"]) / "Anthropic" if os.name == "nt" and os.environ.get("APPDATA") else Path.home() / ".config" / "anthropic"
    pasta = Path(os.environ.get("ANTHROPIC_CONFIG_DIR") or padrao) / "credentials"
    return "perfil de 'ant auth login'" if pasta.is_dir() and any(pasta.glob("*.json")) else None


class Gateway:
    def __init__(self, log_path: Path, nomes_conhecidos=(), termos_protegidos=()):
        self.log_path = Path(log_path)
        self.nomes = set(nomes_conhecidos)
        self.protegidos = {_sem_acento(t).lower() for t in termos_protegidos}
        self.modelo = os.environ.get("CICLO_MODELO", MODELO_PADRAO)
        self.esforco = os.environ.get("CICLO_ESFORCO", "low")

    # ---------- redação ----------
    def redigir(self, texto: str, nomes_extras=(), com_nomes=True) -> tuple[str, dict]:
        """com_nomes=False: só os padrões (e-mail, CPF, CNPJ, telefone), para texto montado pelo código."""
        cortes = {}

        def contar(rotulo, n):
            if n:
                cortes[rotulo] = cortes.get(rotulo, 0) + n

        for rotulo, padrao in PADROES:
            texto, n = padrao.subn(f"[{rotulo.upper()} REMOVIDO]", texto)
            contar(rotulo, n)
        if not com_nomes:
            return texto, cortes
        nomes = sorted({n for n in self.nomes | set(nomes_extras) if n.strip()}, key=len, reverse=True)
        partes = {p for nome in nomes for p in nome.split() if len(p) >= 4 and _sem_acento(p).lower() not in self.protegidos}
        for alvo in nomes + sorted(partes, key=len, reverse=True):
            texto, n = _padrao_nome(alvo).subn("[NOME REMOVIDO]", texto)
            contar("nome", n)
        linhas, depois_do_fecho = texto.split("\n"), False
        for i, linha in enumerate(linhas):  # assinatura: 1ª linha não vazia depois de "Atenciosamente," etc.
            if depois_do_fecho and linha.strip():
                if _parece_nome(linha.strip()):
                    linhas[i] = "[NOME REMOVIDO]"
                    contar("nome", 1)
                depois_do_fecho = False
            if FECHO.match(linha):
                depois_do_fecho = True
        return "\n".join(linhas), cortes

    # ---------- modo ----------
    def modo(self) -> tuple[str, str]:
        pedido = os.environ.get("CICLO_MODO", "auto").lower()
        if pedido == "offline":
            return "offline", "forçado por CICLO_MODO=offline"
        try:
            import anthropic  # noqa: F401  (import opcional)
        except ImportError:
            return "offline", "SDK 'anthropic' não instalado"
        fonte = credencial()
        if pedido != "online" and not fonte:
            return "offline", "sem credencial (chave, token, perfil ou WIF)"
        return "online", f"modelo {self.modelo}; credencial: {fonte or 'a cargo do SDK (CICLO_MODO=online)'}"

    # ---------- chamada ----------
    def chamar(self, finalidade: str, sistema: str, conteudo: str, offline, esquema=None,
               nomes_extras=(), validar=None, redigir_nomes=True):
        """Devolve dict(resultado, modo, modelo, motivo). `offline(texto_redigido)` é o substituto
        determinístico; `validar(resultado)` pode rejeitar a resposta do modelo (volta ao offline).
        redigir_nomes=False só para conteúdo montado pelo código, sem texto livre de terceiros."""
        redacao = "padrões + nomes" if redigir_nomes else "só padrões (conteúdo montado pelo código)"
        if len(conteudo) > LIMITE_CARACTERES:
            self._registrar(finalidade, "recusado", f"conteúdo de {len(conteudo)} caracteres, acima do limite de "
                                                    f"{LIMITE_CARACTERES}; nada foi enviado", "", {}, redacao)
            raise ConteudoExcessivo(f"Conteúdo acima do limite do gateway ({len(conteudo)} > {LIMITE_CARACTERES} caracteres)")
        redigido, cortes = self.redigir(conteudo, nomes_extras, com_nomes=redigir_nomes)
        modo, motivo = self.modo()
        resultado = None
        if modo == "online":
            try:
                resultado = self._claude(sistema, redigido, esquema)
                if validar and not validar(resultado):
                    resultado, motivo = None, "resposta do modelo reprovada na verificação determinística"
            except Exception as erro:  # qualquer falha online cai no substituto, com registro
                motivo = f"falha online: {type(erro).__name__}: {str(erro)[:120]}"
            if resultado is None:
                modo = "offline"
        if resultado is None:
            resultado = offline(redigido)
        self._registrar(finalidade, modo, motivo, redigido, cortes, redacao)
        return {"resultado": resultado, "modo": modo, "modelo": self.modelo if modo == "online" else "offline", "motivo": motivo}

    def _claude(self, sistema: str, texto: str, esquema):
        import anthropic
        cliente = anthropic.Anthropic()
        saida = {"effort": self.esforco}
        if esquema:
            saida["format"] = {"type": "json_schema", "schema": esquema}
        try:
            resposta = cliente.beta.messages.create(
                model=self.modelo,
                max_tokens=16000,
                system=sistema,
                messages=[{"role": "user", "content": texto}],
                output_config=saida,
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
            )
        except anthropic.RateLimitError as e:
            raise RuntimeError("limite de taxa da API (429)") from e
        except anthropic.APIStatusError as e:
            raise RuntimeError(f"erro da API ({e.status_code})") from e
        except anthropic.APIConnectionError as e:
            raise RuntimeError("sem conexão com a API") from e
        if resposta.stop_reason in ("refusal", "max_tokens"):
            raise RuntimeError(f"resposta interrompida: {resposta.stop_reason}")
        texto_resposta = next(b.text for b in resposta.content if b.type == "text")
        return json.loads(texto_resposta) if esquema else texto_resposta.strip()

    def _registrar(self, finalidade, modo, motivo, redigido, cortes, redacao):
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        linha = {
            "ts": agora_iso(),
            "finalidade": finalidade, "modo": modo, "motivo": motivo,
            "modelo": self.modelo if modo == "online" else "offline",
            "bytes": len(redigido.encode("utf-8")), "sha256": sha256_texto(redigido),
            "redacao": redacao, "cortes": cortes, "conteudo_redigido": redigido,  # exatamente o que sairia do perímetro
        }
        with open(self.log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(linha, ensure_ascii=False) + "\n")
