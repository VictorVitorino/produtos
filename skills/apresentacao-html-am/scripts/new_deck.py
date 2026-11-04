"""Cria uma pasta de trabalho com o molde pronto para um deck novo.

uso: python3 scripts/new_deck.py <pasta_destino> [nome_do_deck] [--exemplo]

  <pasta_destino>/            casca (shell/), base (base/) e build.py copiados do molde — não editar
  <pasta_destino>/content/<nome_do_deck>/
                              pacote de conteúdo inicial (capa, uma página, encerramento, deck.js comentado,
                              theme.css, assets.js com a marca A&M, css/01-blocos.css com os blocos de exemplo)
  --exemplo                   em vez do pacote inicial, copia o exemplo completo (12 páginas: telas de conteúdo
                              preenchidas com texto-modelo + páginas de layout em wireframe) para servir de base

Depois: edite content/<nome>/deck.js e content/<nome>/slides/*.html e rode
  python3 <pasta_destino>/build.py <nome_do_deck>   →  <pasta_destino>/dist/<nome_do_deck>.html
"""
import os, shutil, sys

here = os.path.dirname(os.path.abspath(__file__))
molde = os.path.normpath(os.path.join(here, "..", "assets", "molde"))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
if not args:
    sys.exit(__doc__)
dest = os.path.abspath(args[0])
nome = args[1] if len(args) > 1 else "deck"
exemplo = "--exemplo" in sys.argv

os.makedirs(dest, exist_ok=True)
for part in ("shell", "base"):
    if os.path.exists(os.path.join(dest, part)):
        shutil.rmtree(os.path.join(dest, part))
    shutil.copytree(os.path.join(molde, part), os.path.join(dest, part))
shutil.copy2(os.path.join(molde, "build.py"), os.path.join(dest, "build.py"))
target = os.path.join(dest, "content", nome)
if os.path.exists(target):
    sys.exit(f"já existe: {target} (escolha outro nome ou edite o existente)")
shutil.copytree(os.path.join(molde, "content", "exemplo" if exemplo else "_novo"), target)
os.makedirs(os.path.join(dest, "dist"), exist_ok=True)
print(f"ok · molde em {dest}")
print(f"conteúdo: {target}  ({'exemplo completo' if exemplo else 'pacote inicial'})")
print(f"montar:   python3 {os.path.join(dest, 'build.py')} {nome}")
print(f"validar:  python3 {os.path.join(here, 'check_deck.py')} {os.path.join(dest, 'dist', nome + '.html')} --molde {molde}")
