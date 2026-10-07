#!/usr/bin/env python3
"""Gera o HTML único da apresentação a partir de src/ (logos embutidos em base64).

Ordem de montagem:
  CSS  : src/styles.css + src/css/*.css (ordem alfabética)
  HTML : src/slides/*.html (um arquivo por slide, ordem alfabética)
  JS   : engine.js, data.js, core.js, slides.js + src/js/*.js (ordem alfabética; 99-boot.js inicia)
Uso: python3 build.py [--out caminho.html]
"""
import base64, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "DTS_Portfolio_Estrategico_2027.html"
if "--out" in sys.argv:
    OUT = pathlib.Path(sys.argv[sys.argv.index("--out") + 1]).resolve()

def b64(name):
    return "data:image/png;base64," + base64.b64encode((SRC / "assets" / name).read_bytes()).decode()

def read_all(paths):
    return "\n".join(p.read_text(encoding="utf-8") for p in paths)

css = read_all([SRC / "styles.css"] + sorted((SRC / "css").glob("*.css")))
slides = read_all(sorted((SRC / "slides").glob("*.html")))
logos = (
    f'const LOGO_DTS="{b64("dts-logo-white.png")}";\n'
    f'const LOGO_DTS_NAVY="{b64("dts-logo-navy.png")}";\n'
)
am = b64("am-performance-white.png")
js = read_all([SRC / f for f in ["engine.js", "data.js", "core.js", "slides.js"]] + sorted((SRC / "js").glob("*.js")))

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DTS · Portfólio Estratégico 2027</title>
<meta name="description" content="Alvarez &amp; Marsal · Digital &amp; Technology Services: revisão estratégica do portfólio de produtos DTS com pesquisa de mercado, benchmark e novos produtos com IA.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{{--am-logo:url({am})}}
{css}
</style>
</head>
<body>
<div id="viewport"><div id="stage">
{slides}
<div id="wipe"><i></i><i></i><i></i></div>
</div></div>
<script>
{logos}
{js}
</script>
</body>
</html>
"""
OUT.write_text(html, encoding="utf-8")
print(f"ok · {OUT.name} · {len(html)/1024:.0f} KB")
