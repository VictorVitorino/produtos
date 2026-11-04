# Molde reutilizável de apresentação HTML (A&M)

O molde traz o **layout, a arquitetura e os comportamentos** da apresentação de referência (Axon v0), **sem o conteúdo e sem os componentes dela**. Ele não tem cenas, matrizes, gráficos nem a marca AXON. Você entra com o conteúdo; o molde garante o quadro, a escala, o enquadramento, a navegação e as interações.

- **Pronto para preencher:** `dist/molde.html`, um arquivo único e autocontido com 9 páginas-modelo em wireframe.
- **Fonte modular:** as pastas abaixo, montadas com `python3 -I build.py <pacote>`.

## 1. Três camadas

| Camada | Arquivos | Conteúdo | Editar? |
|---|---|---|---|
| 1 · Estrutura fixa | `shell/shell.html`, `shell/frame.css` | quadro 1600×900 (16:9, raio 14, `overflow:hidden`), cabeçalho, faixa do título, corpo, rodapé, capítulo, transição, impressão | não |
| 2 · Navegação e interação | `shell/nav.js`, `shell/nav.css` | `fit()`, Voltar/Avançar, contador → índice, trilha de seções, “Sobre este slide”, ampliação, progresso, `#n`, atalhos, toque, movimento reduzido | não |
| Base | `base/base.css`, `base/base.js` | reset, hierarquia tipográfica da página (`.stmt2`, `.lbl`, `.eye`, `.small`, `.mini`), entradas animadas `[data-a]`, frase-chave animada, peças usadas pelo motor e layout da capa | não |
| 3 · Conteúdo | `content/<pacote>/` | `deck.js` (configuração), `slides/*.html` (páginas), `theme.css` e `css/*.css` (cores e estilos), `assets.js` (marcas e imagens), `scenes/*.js` (scripts por página), `brand.js` | **sim** |

## 2. Dois jeitos de usar

**A. Direto no arquivo único.** Abra `dist/molde.html`. As zonas editáveis estão marcadas com comentários `CAMADA 3 · CONTEÚDO`:

| Zona | Onde fica no arquivo |
|---|---|
| Configuração | bloco `window.DECK = {...}`, dentro do `<script>` |
| Páginas | uma `<section class="slide">` por página, entre o início do `#stage` e o `#wipe` |
| Estilos do conteúdo | final do `<style>` |

**B. Pela fonte (recomendado para decks maiores).**
1. Copie `content/exemplo` para `content/<seu-deck>`.
2. Edite `deck.js` e os arquivos em `slides/` (um por seção, em ordem alfabética).
3. Apague `css/00-wireframe.css`.
4. Rode `python3 -I build.py <seu-deck>`. O resultado é `dist/<seu-deck>.html`.

## 3. Contrato de uma página

```html
<section class="slide" data-p="2 · Seção" data-t="Nome da página"
  data-band="Tema · mensagem da página" data-c="c-navy" data-bs="Dica curta à direita da faixa"
  data-src="Fonte: uma linha no rodapé."
  data-desc="Texto do painel “Sobre este slide”: o que a página mostra, como ler e como interagir.">
  <div class="body sp fill">
    <div class="stmt2" data-fx-type="word" style="font-size:23px">Frase-chave com <span data-fx-hl>destaque</span>.</div>
    <div class="gr" style="display:grid;grid-template-columns:1fr 452px;gap:20px;min-height:0"> … seu conteúdo … </div>
  </div>
</section>
```

| Atributo | Uso |
|---|---|
| `data-p` | Seção (“Parte”) da página. Igual à chave em `DECK.parts`. Gera a trilha, os grupos do índice, o capítulo e o rótulo “Parte X · Nome” no cabeçalho. |
| `data-t` | Nome curto e **único** da página. Aparece no cabeçalho, no índice e em “Sobre este slide”. |
| `data-band` | Texto da faixa do título (caixa alta, uma linha). |
| `data-bs` | Opcional: texto pequeno à direita da faixa. |
| `data-c` | Cor da faixa: `c-navy`, `c-blue`, `c-green`, `c-purple` ou `c-red`. |
| `data-src` | Fonte no rodapé. Acima de ~150 caracteres é cortada com reticências e aparece inteira na dica. |
| `data-desc` | Explicação específica da página no painel “Sobre este slide”. |
| `data-nofoot` | Só na capa e no fecho, que têm composição própria (sem `data-band` não há cabeçalho nem faixa). |
| `class="body … dk"` | Corpo em fundo escuro. |

**Área útil (px do quadro, antes da escala):**

| Elemento | Medidas |
|---|---|
| Cabeçalho | laterais 12, topo 16, altura 80, raio 14 |
| Faixa | laterais 12, topo 106, altura 50, raio 14 só em cima |
| Corpo | laterais 12, topo 156, 40 da base, padding 12/16, raio 14 só embaixo |
| Rodapé interno | laterais 32, 11 da base |

O corpo útil tem 1544 × 680 px. Abaixo da frase-chave em 2 linhas, sobram cerca de **1542 × 620 px**; as páginas-modelo mostram o tamanho de cada bloco ao vivo.

## 4. Configuração (`deck.js`)

| Campo | Para quê |
|---|---|
| `brandSub`, `rightLabel`, `client` | Cabeçalho: subtítulo da marca, rótulo à direita e marca do cliente (`{name}` em texto ou `{logo, alt}` com `ASSET.<logo>` em `assets.js`). |
| `footLabel` | Rótulo fixo do rodapé (texto puro). |
| `ui` | Textos da interface. Use português ou inglês; o que for omitido usa o padrão da referência. |
| `parts` | `[rótulo, chave data-p, descrição, cor, rótulo curto]`: trilha, índice e agenda automática. Um elemento `id="agenda"` gera um botão por seção que tenha cor. |
| `chapters` | `{chave: [número, título, texto]}`: cartão de capítulo ao entrar numa seção avançando. |
| `zoom` | Ids dos gráficos e blocos ampliáveis. Ao passar o mouse aparece o ⤢; duplo clique também amplia. |
| `descDefault` | Texto de “Sobre este slide” quando a página não tem `data-desc`. |

## 5. Regras para inserir conteúdo

- Preserve a hierarquia tipográfica da base: `.stmt2` com 23–25 px; `.lbl` com 12,5 px em caixa alta; `.eye` com 11 px; corpo entre 12,5 e 14 px; `.small` e `.mini` com 11 px.
- Monte o conteúdo dentro de `.gr` com grids e espaçamentos consistentes (`gap` de 12 a 20 px).
- Nada pode sair do corpo, encostar no rodapé ou ser cortado.
- **Se não couber, divida em mais páginas:** mesmo `data-p`, `data-t` diferente, faixa com “(1/2)” e “(2/2)”. O índice, o contador, a trilha e o progresso se atualizam sozinhos.
- Texto explicativo longo vai para `data-desc`, que é o painel “Sobre este slide”.
- Registre em `DECK.zoom` todo gráfico que deva ser ampliável.
- Animações: use `data-a="up|zoom|grow|fade|left|right|pop"` com `style="--d:N"` para escalonar. Elas respeitam o movimento reduzido. Para scripts por página, use `ENTER["<data-t>"] = () => {...}` e `FXR.add(SL("<data-t>"), {play(){…}, stop(){…}})`.

## 6. Comportamentos (iguais aos da referência)

**Trilha de seções:**
- abre a primeira página da seção e mostra o progresso;
- fica oculta abaixo de 1100 px de largura.

**Navegação e contador:**
- Voltar e Avançar ficam desabilitados nos limites;
- o contador mostra “atual / total” e abre o índice, agrupado por seção, com a página atual destacada.

**Painéis:**
- “Sobre este slide” (tecla I) mostra o título e a explicação da página;
- a ampliação abre pelo ícone ou por duplo clique e fecha com ×, Esc ou clique fora.

**Página, endereço e transições:**
- a barra de progresso fica no topo;
- o endereço `#n` abre a página n diretamente;
- a transição entre páginas é animada e mostra o cartão de capítulo ao entrar numa seção.

**Atalhos:**

| Tecla | Ação |
|---|---|
| → · PgDn · Espaço | avança |
| ← · PgUp | volta |
| Home · End | primeira e última página |
| F | tela cheia |
| I | “Sobre este slide” |
| G | índice |
| Esc | fecha painéis |

Também funciona o toque com deslizar.

**Movimento reduzido:** sem transições nem animações. **Abaixo de 760 px:** controles compactos.

## 7. Testes de aceite

```bash
python3 -I build.py exemplo dist/molde.html
node tools/accept.js dist/molde.html dist/accept --shots     # geometria + conteúdo + comportamentos (PNG por página)
node tools/framing.js <referencia.html> dist/molde.html dist/framing 2 3   # mesmo enquadramento que a referência
node tools/pages.js dist/molde.html                          # número → seção → data-t
```

| Verificação | Resultado no molde |
|---|---|
| Geometria em 1366×768, 1600×900, 1920×1080, 1000×700 e 700×560 | escala igual à da `fit()`; 16:9; quadro centralizado acima da navegação; raio 14 e `overflow:hidden`; cabeçalho, faixa, corpo e rodapé nas medidas da especificação; controles com 40 px (36 px abaixo de 760), 8 px entre si, a 22/12 px; trilha a 22/12 px e oculta abaixo de 1100; sem rolagem; nada invade a navegação |
| Conteúdo | nada fora do corpo nem cortado nas 9 páginas |
| Comportamentos | Voltar/Avançar e limites, contador e índice (400 px, raio 12, navegação direta), “Sobre este slide” (440 px, raio 12, acompanha a página), ampliação (até 1540 × 850, raio 16; fecha com ×, Esc e clique fora), atalhos, trilha, `#n`, progresso, transições sem erros |
| Enquadramento × referência, mesma janela | quadro, cabeçalho, faixa, corpo e rodapé idênticos em 1366×768, 1600×900 e 1920×1080 (diferença ≤ 0,5 px); sobreposições em `dist/framing/` |

## 8. Desvios em relação à referência (explícitos)

1. **Sem os componentes e cenas da Axon.** Saíram dois futuros, curvas, antes/depois, matriz, vale, modelo, camadas 3D, checklist, TMO, rede de neurônios da capa e a marca roxa AXON. A base guarda só o que o layout e o motor usam.
2. **Textos da interface e marca do cliente configuráveis** (`DECK.ui`, `DECK.client`). Na referência eram fixos em português e com o logo do cliente da Axon. Os textos padrão reproduzem a referência; sem `DECK.client`, o cabeçalho fica sem marca do cliente.
3. **Rótulo “⤢ amplia gráficos” com 36 px abaixo de 760 px.** Na referência ele tinha 40 px fixos em linha, contra a regra dos controles compactos.
4. **Trilha com muitas seções:** se os rótulos não couberem, a trilha usa o rótulo curto (5º campo de `parts`). Com poucas seções, nada muda.
5. **Entrada da capa:** título e logos aparecem com a classe `.play` da casca. Na referência dependiam do efeito de neurônios; com movimento reduzido, aparecem direto.
6. A cor da trilha passou para o tema do conteúdo (`theme.css`). Na referência era o roxo AXON na camada de navegação.

A arquitetura foi validada antes de remover o conteúdo: a Axon remontada a partir destas camadas ficou idêntica ao original pixel a pixel em 9 das 11 páginas. As outras 2 variam dentro da diferença que o próprio original tem entre duas execuções, por causa da animação.

## 9. Pastas

```
molde/
  README.md            este guia
  build.py             montagem do HTML único
  shell/               camadas 1 e 2 (não editar)
  base/                base mínima (não editar)
  content/exemplo/     camada 3 de exemplo: deck.js, slides/, css/, scenes/, theme.css, assets.js, brand.js, meta.json
  tools/               accept.js · framing.js · pages.js
  dist/molde.html      molde pronto (9 páginas-modelo)
```
