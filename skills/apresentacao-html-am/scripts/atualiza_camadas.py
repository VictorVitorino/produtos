"""Atualiza as camadas fixas (estrutura, navegação e base) de um deck .html pronto para a versão atual do molde,
sem tocar no conteúdo (configuração, páginas, tema e estilos do deck).

uso: python3 scripts/atualiza_camadas.py <deck.html> [saida.html] --molde <skill>/assets/molde

Funciona com decks montados por build.py, que marca cada camada com um comentário
"CAMADA 1 · …", "CAMADA 2 · …", "BASE (…)". O texto entre um marcador fixo e o marcador seguinte
é substituído pelo arquivo correspondente do molde. Sem saida.html, grava <deck>.atualizado.html.
"""
import os, re, sys

args = [a for a in sys.argv[1:] if not a.startswith("--")]
if "--molde" not in sys.argv or not args:
    sys.exit(__doc__)
molde = sys.argv[sys.argv.index("--molde") + 1]
args = [a for a in args if a != molde]
src_path = args[0]
out_path = args[1] if len(args) > 1 else re.sub(r"\.html$", "", src_path) + ".atualizado.html"
src = open(src_path, encoding="utf8").read()

LAYERS = [  # (marcador, arquivo do molde, tipo)
    ("CAMADA 1 · ESTRUTURA FIXA (shell/frame.css) — não editar", "shell/frame.css", "css"),
    ("CAMADA 2 · NAVEGAÇÃO E INTERAÇÃO (shell/nav.css) — não editar", "shell/nav.css", "css"),
    ("BASE (base/base.css) — não editar", "base/base.css", "css"),
    ("BASE (base/base.js) — não editar", "base/base.js", "js"),
    ("CAMADA 2 · MOTOR DE NAVEGAÇÃO (shell/nav.js) — não editar", "shell/nav.js", "js"),
]
changed = []
for mark, rel, kind in LAYERS:
    open_tag = f"/* ===== {mark} ===== */"
    i = src.find(open_tag)
    if i < 0:
        sys.exit(f"marcador ausente: {mark} (o deck não foi montado com build.py do molde)")
    start = i + len(open_tag) + 1
    m = re.compile(r"/\* ===== (?:CAMADA [123] ·|BASE \()").search(src, start)  # só os marcadores do build.py
    nxt = m.start() if m else -1
    end_tag = "</style>" if kind == "css" else "</script>"
    stop = src.find(end_tag, start)
    end = min(x for x in (nxt, stop) if x >= 0)
    new = open(os.path.join(molde, rel), encoding="utf8").read().strip("\n") + "\n"
    if src[start:end] != new:
        changed.append(rel)
        src = src[:start] + new + src[end:]
open(out_path, "w", encoding="utf8").write(src)
print("atualizadas: " + (", ".join(changed) if changed else "nenhuma (já estava na versão atual)"))
print("ok", out_path)
