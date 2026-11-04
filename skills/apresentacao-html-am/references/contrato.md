# Contrato do molde: configuração, personalização, comportamentos e medidas

## Sumário
1. Configuração do deck (`deck.js`)
2. Arquivos do pacote de conteúdo
3. Personalização: cores, logos, língua, capa
4. Comportamentos e atalhos
5. Medidas do quadro
6. Testes
7. Desvios conhecidos em relação à referência

## 1. Configuração do deck (`content/<deck>/deck.js`)

```js
window.DECK = {
  brandSub: "Cliente · Projeto",          // cabeçalho: linha abaixo de "Alvarez & Marsal"
  rightLabel: "Proposta · Tema",          // cabeçalho: rótulo à direita (HTML: use &amp;)
  client: { name: "Cliente" },            // marca do cliente em texto, ou { logo: "cliente", alt: "Cliente" }
  footLabel: "CLIENTE · PROJETO · TEMA",  // rodapé: rótulo fixo (texto puro: & e não &amp;)
  ui: { … },                              // textos da interface (abaixo)
  parts: [                                // seções: trilha, índice, agenda e capítulos
    ["Capa", "Capa", "", "", "▸"],
    ["Diagnóstico", "1 · Diagnóstico", "O que encontramos.", "#002B49", "1"],
    //  rótulo     chave = data-p      descrição (agenda)  cor (agenda)  rótulo curto (trilha estreita)
  ],
  chapters: { "1 · Diagnóstico": ["01", "Diagnóstico", "Uma ou duas frases."] },  // cartão ao entrar na seção
  zoom: ["graficoCustos"],                // ids ampliáveis (também dá para usar DECK.zoom.push("id") nas cenas)
  descDefault: "Página da apresentação.", // “Sobre este slide” quando falta data-desc
  desc: {},                               // alternativa a data-desc: { "<data-t>": "texto" }
};
```

- **`parts`**
  - A ordem define a trilha.
  - A chave tem que ser idêntica ao `data-p` das páginas. Use o formato “N · Nome”: o cabeçalho mostra “Parte N · Nome” e o índice agrupa por ela.
  - Só as seções com **cor** (4º campo) entram na agenda automática. Para ativá-la, ponha um elemento `id="agenda"` numa página: o motor cria um botão por seção, com número, telas e descrição.
  - O **rótulo curto** (5º campo) é usado quando a trilha não cabe na largura. Com mais de 7 seções, preencha-o em todas.
- **`chapters`**: o cartão de capítulo (número grande, título, texto) aparece ao entrar numa seção avançando. Seções sem entrada não têm cartão, como capa e encerramento.
- **`ui`**: os valores omitidos usam os padrões em português.

  | Chave | Português (padrão) | Inglês |
  |---|---|---|
  | `part` / `partCaps` | Parte / PARTE | Part / PART |
  | `pages` / `page` | telas / tela | pages / page |
  | `chapterSkip` | clique ou → para continuar | click or → to continue |
  | `zoomHint` | ⤢ amplia gráficos | ⤢ zoom charts |
  | `zoomBtn` | Ampliar (duplo clique também amplia) | Zoom (double-click also zooms) |
  | `close` / `closeHint` | Fechar / Esc ou clique fora para fechar | Close / Esc or click outside to close |
  | `about` / `aboutKey` | Sobre este slide / Sobre este slide (tecla I) | About this slide / About this slide (key I) |
  | `index` / `indexKey` | Índice / Índice · escolha a página (tecla G) | Index / Index · choose a page (key G) |
  | `prev` / `next` | Voltar / Avançar | Back / Next |
  | `defaultPart` | Capa | Cover |
  | `brand` | Alvarez &amp; Marsal | Alvarez &amp; Marsal |

## 2. Arquivos do pacote de conteúdo

| Arquivo | Para quê |
|---|---|
| `meta.json` | `lang` (pt-BR, en…), `title` (aba do navegador), `desc` (meta description) |
| `deck.js` | configuração (acima) |
| `slides/NN-*.html` | páginas; um arquivo por seção, em ordem alfabética |
| `theme.css` | tokens de cor e marca (trilha, palavra-marca do cliente) |
| `css/*.css` | estilos do conteúdo; `01-blocos.css` traz os blocos de exemplo (`ex-`) |
| `assets.js` | `const ASSET={...}` com imagens em data URI; `am_mark` e `am_mark_white` já vêm |
| `scenes/*.js` | scripts por página (`ENTER`, `FXR`, `DECK.zoom.push`) |
| `brand.js` | roda depois do motor; preenche `<img data-asset="chave">` com `ASSET[chave]` |

A montagem segue esta ordem, a mesma da referência:
- **CSS:** frame → nav → base → `theme.css` → `css/*.css`
- **JS:** `assets.js` → base → `deck.js` → `scenes/*.js` → `nav.js` → `brand.js`

O resultado é um `.html` único, sem dependências além das fontes do Google, que caem em fontes do sistema se estiverem offline.

## 3. Personalização

- **Cores.** Para trocar a paleta, edite `theme.css`. A paleta A&M é:

  | Uso | Cores |
  |---|---|
  | Navy | `#002B49`, `#122143`, `#1F3263` |
  | Ardósia | `#33556D` |
  | Aço | `#5E8AB4` |
  | Gelo | `#DFE8F0` |
  | Acento | laranja `#F78C16` |
  | Texto laranja | `#B35F00` |
  | Risco | `#BC0404` |

  As cores da faixa (`c-navy`…) são da camada 1. Para outra cor de faixa, crie `.c-minhacor{background:linear-gradient(...)!important}` no CSS do conteúdo e use `data-c="c-minhacor"`.
- **Logo do cliente.**
  1. Converta a imagem em base64: `python3 -c "import base64;print(base64.b64encode(open('logo.png','rb').read()).decode())"`.
  2. Acrescente-a em `assets.js` como `ASSET.cliente="data:image/png;base64,..."`.
  3. Use `client:{logo:"cliente",alt:"Nome"}`.

  O logo aparece branco sobre navy, então prefira a versão branca. Na capa, use `<img data-asset="cliente">`.
- **Língua.** Defina `meta.json` → `lang` e `DECK.ui`, e escreva o conteúdo na mesma língua.
- **Capa e fecho.** Use a classe `.cv4`, com as posições da capa de referência:

  | Elemento | Posição |
  |---|---|
  | Sobrancelha, título (`.cv4-h`, com `.cv4-big` para 128 px) e subtítulo | à esquerda, centralizados na vertical |
  | Logos (`.cv4-logos`) | embaixo, à esquerda |
  | Selo (`.cv4-tag`) | embaixo, à direita |

  A metade direita fica livre para uma arte opcional (imagem, SVG ou canvas). Use `position:absolute` dentro do quadro de 1600×900 e respeite o movimento reduzido.

## 4. Comportamentos e atalhos (vêm prontos; não reimplemente)

| Comportamento | Como funciona |
|---|---|
| Trilha de seções | Fica embaixo, à esquerda. Abre a primeira página da seção e mostra o progresso. Some abaixo de 1100 px de largura. |
| Voltar / Avançar | Desabilitados nos limites. |
| Contador | Mostra “atual / total” e abre o índice, agrupado por seção, com a página atual destacada. |
| Sobre este slide | Botão ou tecla I. Mostra o `data-t` e o `data-desc` da página atual. |
| Ampliação | Ícone ⤢ ao passar o mouse ou duplo clique. Fecha com ×, Esc ou clique na área escurecida. Até 1540 × 850 px, dentro do quadro. |
| Barra de progresso no topo | Avança a cada página. |
| Endereço `#n` | Abre a página n diretamente. |
| Transição | Animada entre páginas, com o cartão de capítulo ao entrar numa seção. |

Atalhos de teclado:

| Tecla | Ação |
|---|---|
| → · PgDn · Espaço | avança |
| ← · PgUp | volta |
| Home · End | primeira e última página |
| F | tela cheia |
| G | índice |
| I | “Sobre este slide” |
| Esc | fecha painéis |

Também funciona o toque com deslizar. Com movimento reduzido não há transições nem animações. Abaixo de 760 px, os controles ficam compactos (36 px).

## 5. Medidas do quadro (px do quadro, antes da escala)

| Elemento | Medidas |
|---|---|
| Quadro | 1600 × 900, raio 14, `overflow:hidden`, centralizado acima da navegação |
| Escala | `min((largura − 2·pad) / 1600, (altura − pad − barra) / 900)`, com pad 10 e barra 62 (6 e 54 abaixo de 760 px) |
| Cabeçalho | laterais 12, topo 16, altura 80, raio 14 |
| Faixa | laterais 12, topo 106, altura 50, raio 14 só em cima |
| Corpo | laterais 12, topo 156, 40 da base, padding 12 × 16, raio 14 só embaixo |
| Rodapé interno | laterais 32, 11 da base |
| Controles | 40 px de altura, 8 px entre si, a 22 px da lateral e 12 px da base |
| Painéis | “Sobre” com 440 px de largura; índice com 400 px; raio 12 |

## 6. Testes

**`scripts/check_deck.py <html> --molde <skill>/assets/molde`** não precisa de navegador.

Ele acusa como **erro**:
- `data-t` vazio ou repetido;
- `data-p` fora de `parts`;
- página de conteúdo sem `.body`;
- id em `zoom` que não existe;
- HTML desbalanceado;
- restos de `{{ }}` ou TODO;
- JS com erro de sintaxe (quando há `node`);
- camadas fixas alteradas.

E dá **aviso** para:
- faixa ou fonte longas demais;
- falta de `data-desc`;
- frase-chave com mais de 2 linhas;
- wireframe esquecido;
- fonte inline abaixo de 10 px;
- seções muito longas.

**`scripts/accept.js <html> <pasta> --shots [--only 3,4]`** precisa de Node e Playwright, e mede no navegador:
- a geometria em 1366×768, 1600×900, 1920×1080, 1000×700 e 700×560;
- o conteúdo fora do corpo ou cortado;
- Voltar e Avançar, teclas, índice, painel, ampliação, trilha e `#n`.

Ele grava `accept.json` e um PNG por página.

**`scripts/pages.js <html>`** lista número → seção → `data-t`.

**`scripts/atualiza_camadas.py <deck.html> [saida.html] --molde <skill>/assets/molde`** troca as camadas fixas de um deck pronto pela versão atual do molde e mantém configuração, páginas e estilos. `check_deck.py` reconhece as versões anteriores pelas impressões digitais em `scripts/versoes_molde.json`: um deck antigo gera aviso, uma camada alterada à mão gera erro.

## 7. Desvios conhecidos em relação à referência (Axon v0)

1. Os componentes e cenas da Axon (matrizes, curvas, camadas 3D, rede de neurônios) não fazem parte do molde.
2. Os textos da interface e a marca do cliente passaram a ser configuráveis (`DECK.ui`, `DECK.client`).
3. O rótulo “⤢ amplia gráficos” fica com 36 px abaixo de 760 px, como os demais controles.
4. A trilha usa os rótulos curtos quando os longos não cabem.
5. A capa revela título e logos com a classe `.play`. Com movimento reduzido, mostra tudo direto.
6. A cor da trilha vem do `theme.css` do conteúdo.
7. A ampliação também remove a animação de entrada (`data-a`) do próprio elemento ampliado. Na referência, um alvo com `data-a` aparecia em branco no modal.
8. A agenda e a trilha mostram “tela 12” para uma seção de uma página só, e não “telas 12–12” (`DECK.ui.page`).
9. Os contadores (`data-count`) seguem a língua do deck (`<html lang>`). Na referência, eram sempre pt-BR.
