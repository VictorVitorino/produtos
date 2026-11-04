"""Validação estática de uma apresentação montada com o molde (não precisa de navegador).

uso: python3 scripts/check_deck.py <apresentacao.html> [--molde <pasta assets/molde da skill>]

Erros (exit 1): página sem data-t ou com data-t repetido; página de conteúdo sem .body, sem data-p ou com data-p
fora de DECK.parts; id em DECK.zoom que não existe; tags HTML desbalanceadas dentro das páginas; restos de
marcação ({{ }}, TODO); JS com erro de sintaxe (se houver node); camadas fixas alteradas (com --molde).
Avisos: faixa longa demais para uma linha, fonte do rodapé longa (vira reticências), página sem data-desc,
frase-chave longa (mais de 2 linhas), blocos de wireframe (.wf) esquecidos, fonte menor que 11 px em estilo
inline, seção com muitas páginas, muitas seções sem rótulo curto para a trilha.
"""
import html as H, os, re, shutil, subprocess, sys, tempfile
from html.parser import HTMLParser

args = [a for a in sys.argv[1:]]
if not args or args[0].startswith("--"):
    sys.exit(__doc__)
path = args[0]
molde = args[args.index("--molde") + 1] if "--molde" in args else None
src = open(path, encoding="utf8").read()
errors, warns = [], []
E = lambda m: errors.append(m)
W = lambda m: warns.append(m)

# ------------------------------------------------------------------ configuração (window.DECK)
m = re.search(r"window\.DECK\s*=\s*\{", src)
deck_txt = ""
if not m:
    E("window.DECK não encontrado (o deck.js não entrou no HTML?)")
else:
    i, d = m.end() - 1, 0
    for j in range(i, len(src)):
        if src[j] == "{": d += 1
        elif src[j] == "}":
            d -= 1
            if d == 0: deck_txt = src[i:j + 1]; break
pm = re.search(r"parts\s*:\s*\[(.*?)\]\s*,\s*\n?\s*(/\*|chapters|zoom|descDefault|desc|\})", deck_txt, re.S)
parts = re.findall(r'\[\s*"([^"]*)"\s*,\s*"([^"]*)"(?:\s*,\s*"([^"]*)")?(?:\s*,\s*"([^"]*)")?(?:\s*,\s*"([^"]*)")?\s*\]', pm.group(1) if pm else "")
part_keys = {p[1] for p in parts}
zm = re.search(r"zoom\s*:\s*\[([^\]]*)\]", re.sub(r"//[^\n]*", "", deck_txt))
zoom = re.findall(r'"([^"]+)"', zm.group(1)) if zm else []
_code = re.sub(r"//[^\n]*", "", re.sub(r"/\*.*?\*/", "", src, flags=re.S))  # sem comentários
zoom += re.findall(r'DECK\.zoom\.push\(\s*["\']([^"\']+)["\']', _code)
if not parts: E("DECK.parts vazio ou ilegível")

# ------------------------------------------------------------------ páginas
secs = list(re.finditer(r'<section\b([^>]*\bclass="[^"]*\bslide\b[^"]*"[^>]*)>(.*?)</section>', src, re.S))
if not secs: E("nenhuma <section class=\"slide\"> encontrada")

class Attrs(HTMLParser):
    def __init__(s): super().__init__(); s.a = {}
    def handle_starttag(s, t, a): s.a = dict(a)

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr", "path", "rect", "circle", "line", "polyline", "polygon", "ellipse", "stop", "use"}
class Balance(HTMLParser):
    def __init__(s): super().__init__(); s.st = []; s.bad = []
    def handle_starttag(s, t, a):
        if t not in VOID: s.st.append(t)
    def handle_startendtag(s, t, a): pass
    def handle_endtag(s, t):
        if t in VOID: return
        if t in s.st:
            while s.st and s.st[-1] != t: s.bad.append("<" + s.st.pop() + "> sem fechamento")
            s.st.pop()
        else: s.bad.append("</" + t + "> sem abertura")

ts, per_part, ids = {}, {}, set(re.findall(r'\bid="([^"]+)"', src))
for n, s in enumerate(secs, 1):
    p = Attrs(); p.feed("<section" + s.group(1) + ">"); a = p.a
    body = s.group(2)
    t = a.get("data-t", "")
    tag = f"p{n} «{t or '?'}»"
    if not t: E(f"{tag}: sem data-t")
    elif t in ts: E(f"{tag}: data-t repetido (também na p{ts[t]}); o índice e “Sobre este slide” dependem dele ser único")
    else: ts[t] = n
    dp = a.get("data-p", "")
    per_part[dp] = per_part.get(dp, 0) + 1
    content = "data-band" in a
    if content:
        if not dp: E(f"{tag}: página de conteúdo sem data-p")
        elif part_keys and dp not in part_keys: E(f"{tag}: data-p «{dp}» não está em DECK.parts")
        if 'class="body' not in body: E(f"{tag}: página de conteúdo sem <div class=\"body …\">")
        band, bs = a.get("data-band", ""), a.get("data-bs", "")
        if len(band) > 64 or len(band) + len(bs) * 0.55 > 92:
            W(f"{tag}: faixa com {len(band)} caracteres (+ {len(bs)} do data-bs) pode não caber em uma linha; encurte")
        if len(a.get("data-src", "")) > 150: W(f"{tag}: fonte do rodapé com {len(a['data-src'])} caracteres (acima de ~150 vira reticências); leve o detalhe para data-desc")
        st = re.search(r'class="stmt2"[^>]*>(.*?)</div>', body, re.S)
        if not st: W(f"{tag}: sem frase-chave .stmt2")
        else:
            txt = re.sub(r"<[^>]+>", "", st.group(1)).strip()
            if len(txt) > 175: W(f"{tag}: frase-chave com {len(txt)} caracteres (passa de 2 linhas a 23 px); encurte")
    else:
        if "data-nofoot" not in a: W(f"{tag}: página sem data-band (capa/fecho) deveria ter data-nofoot")
    if not a.get("data-desc") and t not in ("Capa",): W(f"{tag}: sem data-desc (o painel “Sobre este slide” mostrará o texto padrão)")
    if re.search(r'class="[^"]*\bwf\b', body): W(f"{tag}: ainda tem blocos de wireframe (.wf)")
    for fs in re.findall(r"font(?:-size)?\s*:\s*(?:\d{3}\s+)?(\d+(?:\.\d+)?)px", body):
        if float(fs) < 10: W(f"{tag}: fonte de {fs}px em estilo inline (mínimo 11 px para texto, 10 px para rótulos)"); break
    if "{{" in body or re.search(r"\bTODO\b", body): E(f"{tag}: restos de marcação ({{{{ }}}} ou TODO)")
    b = Balance(); b.feed(body); b.close()
    rest = [x for x in b.st]
    if b.bad or rest: E(f"{tag}: HTML desbalanceado: " + "; ".join((b.bad + ["<" + x + "> sem fechamento" for x in rest])[:4]))

for z in zoom:
    if z not in ids: E(f"DECK.zoom tem «{z}», mas não há elemento com esse id")
for k, v in per_part.items():
    if v > 6: W(f"seção «{k}» com {v} páginas: considere dividir em duas seções")
if len(parts) > 7 and any(not p[4] for p in parts):
    W("mais de 7 seções: dê um rótulo curto (5º campo de DECK.parts) a todas, para a trilha caber em telas menores")

# ------------------------------------------------------------------ camadas fixas intactas
if molde:
    import hashlib, json
    vfile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "versoes_molde.json")
    known = json.load(open(vfile, encoding="utf8")) if os.path.exists(vfile) else {"versoes": {}}
    marks = {"shell/frame.css": "CAMADA 1 · ESTRUTURA FIXA (shell/frame.css)", "shell/nav.css": "CAMADA 2 · NAVEGAÇÃO E INTERAÇÃO (shell/nav.css)",
             "base/base.css": "BASE (base/base.css)", "base/base.js": "BASE (base/base.js)", "shell/nav.js": "CAMADA 2 · MOTOR DE NAVEGAÇÃO (shell/nav.js)"}
    def layer_text(rel):  # texto da camada no deck, entre o marcador dela e o próximo marcador do build
        i = src.find("/* ===== " + marks[rel])
        if i < 0: return None
        start = src.index("*/", i) + 3
        mm = re.compile(r"/\* ===== (?:CAMADA [123] ·|BASE \()").search(src, start)
        stops = [x for x in (mm.start() if mm else -1, src.find("</style>", start), src.find("</script>", start)) if x >= 0]
        return src[start:min(stops)].strip("\n")
    old = []
    for rel in ("shell/frame.css", "shell/nav.css", "shell/nav.js", "base/base.css", "base/base.js"):
        txt = open(os.path.join(molde, rel), encoding="utf8").read().strip("\n")
        if txt in src: continue
        lt = layer_text(rel)
        hv = hashlib.sha1(lt.encode()).hexdigest() if lt is not None else None
        ver = next((v for v, fs in known["versoes"].items() if fs.get(rel) == hv), None)
        if ver: old.append(f"{rel} (v{ver})")
        else: E(f"camada fixa alterada ou ausente: {rel} (o conteúdo vai só em content/<deck>; reconstrua com build.py)")
    if old: W("deck montado com versão anterior do molde: " + ", ".join(old) + f"; para levar à versão {known.get('atual','atual')}, rode scripts/atualiza_camadas.py <deck.html> --molde <skill>/assets/molde (não mexe no conteúdo)")

# ------------------------------------------------------------------ sintaxe do JS
js = re.findall(r"<script>(.*?)</script>", src, re.S)
if shutil.which("node") and js:
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf8") as f:
        f.write(js[-1]); tmp = f.name
    r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
    os.unlink(tmp)
    if r.returncode: E("JS com erro de sintaxe: " + (r.stderr.strip().splitlines() or ["?"])[-1])

print(f"{len(secs)} páginas · {len(parts)} seções · {len(set(zoom))} alvos de ampliação")
for e in errors: print("ERRO  " + e)
for w in warns: print("aviso " + w)
print("OK" if not errors else f"{len(errors)} erro(s)")
sys.exit(1 if errors else 0)
