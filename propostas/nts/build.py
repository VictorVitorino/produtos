#!/usr/bin/env python3
"""Gera o HTML único da proposta Enjourney · NTS a partir de src/.

Embute fontes (Montserrat e Inter, woff2), o logo da NTS e os pássaros
vetorizados do logo da Enjourney; o arquivo final abre offline.
Uso: python3 build.py [--out caminho.html]
"""
import base64, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "Enjourney_NTS_Proposta_Agentes_IA.html"
if "--out" in sys.argv:
    OUT = pathlib.Path(sys.argv[sys.argv.index("--out") + 1]).resolve()

def data_uri(name, mime):
    return f"data:{mime};base64," + base64.b64encode((SRC / "assets" / name).read_bytes()).decode()

birds = json.loads((SRC / "assets" / "birds.json").read_text())
birds = json.dumps([{"d": b["d"]} for b in birds], ensure_ascii=False)
css = (SRC / "deck.css").read_text(encoding="utf-8")
css = css.replace("__FONT_MONTSERRAT__", data_uri("montserrat.woff2", "font/woff2"))
css = css.replace("__FONT_INTER__", data_uri("inter.woff2", "font/woff2"))
for w in (500, 600, 700):
    css = css.replace(f"__FONT_BARLOW{w}__", data_uri(f"barlow-{w}.woff2", "font/woff2"))
html_body = (SRC / "deck.html").read_text(encoding="utf-8")
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ["core.js", "diagrams.js", "cover.js", "slides.js", "boot.js"])
nts = data_uri("nts-logo.png", "image/png")
js = js.replace("__BIRDS__", birds).replace("__NTS_LOGO__", nts)
html_body = html_body.replace("__NTS_LOGO__", nts)

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Enjourney · NTS: do mapeamento à ferramenta</title>
<meta name="description" content="Proposta Enjourney para a NTS: automação agêntica do ciclo de custos de transporte, em duas modalidades.">
<style>
{css}
</style>
</head>
<body>
{html_body}
<script>
{js}
</script>
</body>
</html>
"""
OUT.write_text(html, encoding="utf-8")
print(f"ok · {OUT.name} · {len(html) / 1024:.0f} KB")
