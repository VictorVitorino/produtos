"""Monta uma apresentação HTML autocontida a partir do molde: casca (layout + navegação) + base + pacote de conteúdo.

uso: python3 -I build.py <pacote> [saida.html]          ex.: python3 -I build.py exemplo  →  dist/exemplo.html
     python3 -I build.py <pacote> [saida.html] --sections 01,02   (só essas seções; útil para testar uma parte)

Camadas e ordem de montagem (a mesma ordem do arquivo de referência):
  CSS  shell/frame.css (1 · estrutura fixa) → shell/nav.css (2 · navegação) → base/base.css
       → content/<p>/theme.css → content/<p>/css/*.css                                   (3 · conteúdo)
  JS   content/<p>/assets.js → base/base.js → content/<p>/deck.js → content/<p>/scenes/*.js
       → shell/nav.js (2 · motor) → content/<p>/brand.js
  HTML shell/shell.html com content/<p>/slides/*.html (ordem alfabética dos arquivos)
"""
import glob, json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
argv = sys.argv[1:]
SECT = None
if "--sections" in argv:
    i = argv.index("--sections"); SECT = argv[i + 1].split(","); del argv[i:i + 2]
pack = argv[0]
P = os.path.join(ROOT, "content", pack)
out = argv[1] if len(argv) > 1 else os.path.join(ROOT, "dist", pack + ".html")

def rd(*parts, opt=False):
    p = os.path.join(*parts)
    if opt and not os.path.exists(p): return ""
    return open(p, encoding="utf8").read()

def many(pattern):
    fs = sorted(glob.glob(os.path.join(P, pattern)))
    if SECT: fs = [f for f in fs if os.path.basename(f)[:2] in SECT]
    return [(os.path.relpath(f, P), rd(f)) for f in fs]

def banner(txt, kind):
    return {"css": f"/* ===== {txt} ===== */", "js": f"/* ===== {txt} ===== */", "html": f"<!-- ===== {txt} ===== -->"}[kind]

meta = json.loads(rd(P, "meta.json"))
css = [banner("CAMADA 1 · ESTRUTURA FIXA (shell/frame.css) — não editar", "css"), rd(ROOT, "shell", "frame.css"),
       banner("CAMADA 2 · NAVEGAÇÃO E INTERAÇÃO (shell/nav.css) — não editar", "css"), rd(ROOT, "shell", "nav.css"),
       banner("BASE (base/base.css) — não editar", "css"), rd(ROOT, "base", "base.css"),
       banner("CAMADA 3 · CONTEÚDO: tema (content/" + pack + "/theme.css)", "css"), rd(P, "theme.css", opt=True)]
for f, t in many("css/*.css"): css += [banner("CAMADA 3 · CONTEÚDO: " + f, "css"), t]
js = [banner("CAMADA 3 · CONTEÚDO: marcas e imagens (assets.js)", "js"), rd(P, "assets.js"),
      banner("BASE (base/base.js) — não editar", "js"), rd(ROOT, "base", "base.js"),
      banner("CAMADA 3 · CONTEÚDO: CONFIGURAÇÃO DO DECK (deck.js)", "js"), rd(P, "deck.js")]
for f, t in many("scenes/*.js"): js += [banner("CAMADA 3 · CONTEÚDO: " + f, "js"), t]
js += [banner("CAMADA 2 · MOTOR DE NAVEGAÇÃO (shell/nav.js) — não editar", "js"), rd(ROOT, "shell", "nav.js")]
if rd(P, "brand.js", opt=True): js += [banner("CAMADA 3 · CONTEÚDO: comportamentos do deck (brand.js)", "js"), rd(P, "brand.js")]
slides = [banner("CAMADA 3 · CONTEÚDO: PÁGINAS — cada section.slide é uma página", "html")]
for f, t in many("slides/*.html"): slides += [banner(f, "html"), t.strip("\n")]

html = rd(ROOT, "shell", "shell.html")
for k, v in {"{{LANG}}": meta["lang"], "{{TITLE}}": meta["title"], "{{DESC}}": meta["desc"]}.items():
    html = html.replace(k, v)
html = html.replace("{{CSS}}", "\n".join(c.strip("\n") for c in css if c.strip()))
html = html.replace("{{SLIDES}}", "\n".join(slides))
html = html.replace("{{JS}}", "\n".join(j.strip("\n") for j in js if j.strip()))
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, "w", encoding="utf8").write(html)
print("ok", out, round(len(html) / 1024), "KB")
