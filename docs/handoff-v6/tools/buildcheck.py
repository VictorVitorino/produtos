"""buildcheck.py · confere o HTML gerado pelo build.py
uso: python3 -I buildcheck.py <repo> <deck.html>
- um <script> por arquivo JS, na ordem do build (ativos, engine, data, core, js) e com sourceURL
- versos dentro de <div id="versos" hidden> (um article por slide)
- ativos embutidos: nenhuma referência externa além do Google Fonts; imagens em data:
- fontes Barlow Condensed embutidas (@font-face "Barlow Condensed Embed")
- tamanho do HTML
"""
import re, sys, pathlib, json
repo, deck = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
html = deck.read_text(encoding="utf-8")
src = repo / "src"
exp = ["build/ativos.js", "src/engine.js"] + [f"src/data/{p.name}" for p in sorted((src / "data").glob("*.js"))] + ["src/core.js"] + [f"src/js/{p.name}" for p in sorted((src / "js").glob("*.js"))]
scripts = re.findall(r"<script\b[^>]*>(.*?)</script>", html, flags=re.S)
names = [ (re.search(r"//# sourceURL=(\S+)\s*$", s.strip()) or [None, None])[1] for s in scripts ]
res = {}
res["scripts"] = len(scripts); res["arquivos_js"] = len(exp)
res["um_script_por_arquivo_na_ordem"] = names == exp
res["scripts_sem_sourceURL"] = [i for i, n in enumerate(names) if not n]
res["fora_de_ordem_ou_faltando"] = [e for e in exp if e not in names] + [n for n in names if n not in exp]
m = re.search(r'<div id="versos" hidden>(.*?)</div>\s*<script', html, flags=re.S)
res["versos_hidden"] = bool(m)
arts = re.findall(r'<article class="verso" data-for="(\d+)"', m.group(1) if m else "")
res["versos_artigos"] = len(arts); res["versos_ids"] = arts
nojs = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
res["versos_fora_do_container"] = len(re.findall(r'<article class="verso"', nojs)) - len(arts)
ext = sorted(set(re.findall(r'(?:src|href)\s*=\s*"(https?://[^"]+)"', html)) | set(re.findall(r'url\((?:["\']?)(https?://[^)"\']+)', html)))
res["referencias_externas"] = ext
res["externas_fora_google_fonts"] = [u for u in ext if not re.match(r"https://fonts\.(googleapis|gstatic)\.com", u)]
# links de fontes de pesquisa (FONTES) são dados, não carregamento; conte só src/href de tags e url() de CSS
imgs = re.findall(r'<img\b[^>]*\bsrc="([^"]*)"', html)
res["img_tags_no_html"] = len(imgs); res["img_src_nao_data"] = [s[:60] for s in imgs if s and not s.startswith("data:") and "${" not in s]
res["ASSET_chaves"] = re.findall(r'"([\w/-]+)": "data:image', html)
res["barlow_embutida_faces"] = len(re.findall(r'font-family:"Barlow Condensed Embed"', html))
res["tamanho_bytes"] = len(html.encode("utf-8")); res["tamanho_KB"] = round(res["tamanho_bytes"] / 1024)
res["contem_fotos_equipe"] = bool(re.search(r'equipe/|equipe-web/', html))
ok = res["um_script_por_arquivo_na_ordem"] and not res["scripts_sem_sourceURL"] and res["versos_hidden"] and res["versos_fora_do_container"] == 0 and not res["externas_fora_google_fonts"] and not res["img_src_nao_data"] and res["barlow_embutida_faces"] >= 4 and not res["contem_fotos_equipe"]
print(json.dumps(res, ensure_ascii=False, indent=1)); print("RESULTADO:", "ok" if ok else "FALHA")
