#!/usr/bin/env python3
"""Gera o HTML único da apresentação a partir de src/ (logos embutidos em base64)."""
import base64, pathlib
ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "DTS_Portfolio_Estrategico_2027.html"

def b64(name):
    return "data:image/png;base64," + base64.b64encode((SRC / "assets" / name).read_bytes()).decode()

css = (SRC / "styles.css").read_text(encoding="utf-8")
slides = (SRC / "slides.html").read_text(encoding="utf-8")
logos = (
    f'const LOGO_DTS="{b64("dts-logo-white.png")}";\n'
    f'const LOGO_DTS_NAVY="{b64("dts-logo-navy.png")}";\n'
)
am = b64("am-performance-white.png")
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ["engine.js", "data.js", "core.js", "slides.js"])

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DTS · Portfólio Estratégico 2027</title>
<meta name="description" content="Alvarez &amp; Marsal · Digital &amp; Technology Services: revisão estratégica do portfólio de produtos DTS com pesquisa de mercado, benchmark e novos produtos com IA.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
