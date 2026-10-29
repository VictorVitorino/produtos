#!/usr/bin/env python3
"""Gera o HTML único da apresentação a partir de src/ (V6 · moldura do modelo APODI).

Ordem de montagem:
  FONTES : src/assets/fonts/barlow-condensed-*.woff2 embutidas como @font-face "Barlow Condensed Embed"
           (o link do Google Fonts continua no <head>; a embutida é o reserva sem rede)
  CSS    : src/styles.css + src/css/*.css (ordem alfabética)
  SLIDES : src/slides/*.html (ordem alfabética = ordem dos slides)
  VERSOS : src/versos/*.html dentro de <div id="versos" hidden>
  JS     : um <script> por arquivo, nesta ordem: ativos (const ASSET), src/engine.js, src/data/*.js,
           src/core.js, src/js/*.js (99-boot.js inicia). Um erro de sintaxe num módulo não derruba os outros.
  ATIVOS : const ASSET={...} em base64: logos (src/assets/*.png) e outras imagens em subpastas ("pasta/<nome>").
           Fotos de pessoas NÃO entram (SPEC V6 §0: nada de pessoas da A&M): as pastas equipe/ e equipe-web/ são ignoradas.
  PALCO  : <div id="viewport"><div id="flip"><div id="stage">…</div></div></div> (#flip gira no "Virar a página")
Uso: python3 build.py --out caminho.html   (trabalho em paralelo)
     python3 build.py --final              (gera DTS_Portfolio_Estrategico_2027.html)
"""
import base64, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "DTS_Portfolio_Estrategico_2027.html"
if "--out" in sys.argv:
    OUT = pathlib.Path(sys.argv[sys.argv.index("--out") + 1]).resolve()
elif "--final" not in sys.argv:
    # proteção do trabalho em paralelo (SPEC V6 · 11): o arquivo principal só é escrito com --final
    sys.exit("build.py: use --out <arquivo.html> (cada agente gera a própria saída) "
             "ou --final para escrever DTS_Portfolio_Estrategico_2027.html")

MIME = {".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml", ".gif": "image/gif", ".woff2": "font/woff2"}


def data_uri(p: pathlib.Path) -> str:
    return f"data:{MIME[p.suffix.lower()]};base64," + base64.b64encode(p.read_bytes()).decode()


def read_all(paths):
    return "\n".join(p.read_text(encoding="utf-8") for p in paths)


# ---------- ativos: logos e imagens em subpastas (sem fotos de pessoas) ----------
def collect_assets():
    assets = {}
    base = SRC / "assets"
    for p in sorted(base.rglob("*")):
        if not p.is_file() or p.suffix.lower() not in MIME or p.suffix.lower() == ".woff2":
            continue
        rel = p.relative_to(base)
        top = rel.parts[0] if len(rel.parts) > 1 else ""
        if top in ("equipe", "equipe-web", "fonts"):   # fotos de pessoas (regra do usuário) e fontes ficam de fora
            continue
        if top:
            key = "/".join(rel.parts[:-1]) + "/" + p.stem
        else:
            key = p.stem
        assets[key] = data_uri(p)
    return assets


# ---------- Barlow Condensed embutida ----------
def font_faces():
    fdir = SRC / "assets" / "fonts"
    ranges = json.loads((fdir / "unicode-ranges.json").read_text()) if (fdir / "unicode-ranges.json").exists() else {}
    out = []
    for f in sorted(fdir.glob("barlow-condensed-*.woff2")):
        m = re.match(r"barlow-condensed-(\d+)-(latin(?:-ext)?)\.woff2", f.name)
        if not m:
            continue
        w, sub = m.groups()
        ur = f";unicode-range:{ranges[sub]}" if sub in ranges else ""
        out.append('@font-face{font-family:"Barlow Condensed Embed";font-style:normal;'
                   f'font-weight:{w};font-display:swap;src:url({data_uri(f)}) format("woff2"){ur}}}')
    return "\n".join(out)


def script(code: str, name: str) -> str:
    code = re.sub(r"</(script)", r"<\\/\1", code, flags=re.I)
    return f"<script>\n{code}\n//# sourceURL={name}\n</script>"


css = read_all([SRC / "styles.css"] + sorted((SRC / "css").glob("*.css")))
slides = read_all(sorted((SRC / "slides").glob("*.html")))
vdir = SRC / "versos"
versos = read_all(sorted(vdir.glob("*.html"))) if vdir.exists() else ""

assets = collect_assets()
asset_js = ("/* ativos embutidos pelo build.py (base64) */\n"
            "const ASSET=" + json.dumps(assets, ensure_ascii=False, indent=0) + ";\n"
            "/* nomes antigos, mantidos para o código legado */\n"
            'const LOGO_DTS=ASSET["dts-logo-white"],LOGO_DTS_NAVY=ASSET["dts-logo-navy"];')

js_files = [SRC / "engine.js"] + sorted((SRC / "data").glob("*.js")) + [SRC / "core.js"] + sorted((SRC / "js").glob("*.js"))
scripts = [script(asset_js, "build/ativos.js")]
scripts += [script(p.read_text(encoding="utf-8"), str(p.relative_to(ROOT))) for p in js_files if p.exists()]

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DTS · Planejamento Estratégico 2027</title>
<meta name="description" content="Alvarez &amp; Marsal · Digital &amp; Technology Services: planejamento estratégico do portfólio DTS (produtos, serviços e inteligência artificial), com pesquisa de mercado, benchmark e o novo portfólio de produtos.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
/* Barlow Condensed embutida (latin + latin-ext): reserva para uso sem rede */
{font_faces()}
{css}
</style>
</head>
<body>
<div id="viewport"><div id="flip"><div id="stage">
{slides}
<div id="wipe"><i></i><i></i><i></i></div>
</div></div></div>
<div id="versos" hidden>
{versos}
</div>
{chr(10).join(scripts)}
</body>
</html>
"""
OUT.write_text(html, encoding="utf-8")
print(f"ok · {OUT.name} · {len(html)/1024:.0f} KB · {len(js_files)} scripts · {len(assets)} ativos")
