"""pdfcheck.py · confere o PDF do deck: páginas, tamanho, fontes embutidas, páginas em branco (ou quase), páginas com o corpo vazio
(a moldura saiu, o miolo não) e folha de contato (folha.png; corpo vazio com o rótulo em vermelho).
Chamado sozinho pelo pdf.js no fim (fundação, parte 3); também roda à parte.
uso: python3 -I pdfcheck.py <arquivo.pdf> <pasta_saida> [sequencia]
  sequencia (opcional): a linha "sequência:" do pdf.js --ordem, para rotular as páginas (F01 V01 x04 v07 f …)
"""
import subprocess, sys, pathlib, re, json
from PIL import Image, ImageDraw, ImageStat

pdf, out = sys.argv[1], pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
seq = sys.argv[3].split() if len(sys.argv) > 3 else []
info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
pages = int(re.search(r"Pages:\s+(\d+)", info).group(1))
size = re.search(r"Page size:\s+([\d.]+) x ([\d.]+)", info).groups()
fonts = subprocess.run(["pdffonts", pdf], capture_output=True, text=True).stdout.splitlines()[2:]
notemb = [l for l in fonts if l.split() and l.split()[-5] != "yes"]
fams = sorted({re.sub(r"^[A-Z]{6}\+", "", l.split()[0]) for l in fonts if l.split()})
# render baixo (≈ 330 px de largura) para medir conteúdo; o corpo vazio só se separa bem do corpo cheio a partir de 20 dpi
tmp = out / "pg"; tmp.mkdir(exist_ok=True)
subprocess.run(["pdftoppm", "-r", "20", "-png", pdf, str(tmp / "p")], check=True)
files = sorted(tmp.glob("p-*.png"), key=lambda p: int(re.search(r"-(\d+)\.png", p.name).group(1)))
rows, blank, empty = [], [], []
for i, f in enumerate(files):
    im = Image.open(f).convert("L"); st = ImageStat.Stat(im)
    hist = im.histogram(); dom = max(range(256), key=lambda k: hist[k]); share = hist[dom] / (im.size[0] * im.size[1])
    # quase vazio: a cor dominante cobre > 97 % da página ou desvio padrão muito baixo
    lab = seq[i] if i < len(seq) else str(i + 1)
    # corpo vazio: a moldura (cabeçalho, faixa e rodapé) sempre passa do teste da página inteira; por isso mede também o miolo
    # (3–97 % da largura, 30–83 % da altura). Miolo com texto ou desenho dá desvio padrão ≥ 30; miolo vazio fica perto de 10.
    w, h = im.size; body = ImageStat.Stat(im.crop((int(w * .03), int(h * .30), int(w * .97), int(h * .83)))).stddev[0]
    r = {"pag": i + 1, "tipo": lab, "dp": round(st.stddev[0], 1), "dominante": round(share, 3), "dp_corpo": round(body, 1)}
    rows.append(r)
    if share > 0.97 or st.stddev[0] < 6: blank.append(r)
    if body < 12: empty.append(r)
# folha de contato (miniaturas 200×113)
W, H, C = 200, 113, 10
sheet = Image.new("RGB", (C * W, ((len(files) + C - 1) // C) * (H + 16)), (235, 239, 244)); d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((W, H)); x, y = (i % C) * W, (i // C) * (H + 16)
    sheet.paste(im, (x, y + 16)); d.text((x + 4, y + 2), f"{i+1} {rows[i]['tipo']}" + (" · corpo vazio" if rows[i] in empty else ""), fill=(190, 0, 0) if rows[i] in empty else (0, 43, 73))
sheet.save(out / "folha.png")
res = {"paginas": pages, "tamanho_pt": size, "fontes": fams, "fontes_nao_embutidas": notemb, "quase_vazias": blank, "corpo_vazio": empty}
(out / "pdf_check.json").write_text(json.dumps({**res, "por_pagina": rows}, ensure_ascii=False, indent=1))
print(f"páginas {pages} · tamanho {size[0]}×{size[1]} pt · fontes: {', '.join(fams)}")
print("fontes não embutidas: " + (", ".join(notemb) if notemb else "nenhuma"))
print("páginas em branco ou quase: " + (json.dumps(blank, ensure_ascii=False) if blank else "nenhuma"))
print("páginas com corpo vazio: " + (" ".join(f"{r['pag']}:{r['tipo']}({r['dp_corpo']:.0f})" for r in empty) if empty else "nenhuma"))
print("menor desvio padrão: " + json.dumps(sorted(rows, key=lambda r: r["dp"])[:4], ensure_ascii=False))
