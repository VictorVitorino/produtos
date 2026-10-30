# Contrato de autoria · DTS V6 (fundação, partes 1 e 2 · conferido na parte 3)

Este documento diz **como escrever um slide** na V6: atributos da moldura, esqueleto do corpo, componentes, vistas, passos,
ganchos, CSS com escopo, pilares, mascote, verso, impressão, build e ferramentas. Vale junto com `SPEC.md` (o que dizer);
aqui está o **como montar**. O slide de referência, já convertido por inteiro, é o **04 · Portfólio atual**
(`src/slides/04-portfolio-atual.html`, `src/css/30-s04-portfolio-atual.css`, `src/js/30-s04-portfolio-atual.js`).

Repositório: `/home/user/produtos` · scratchpad: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad`
(abaixo, `$V` = `<scratchpad>/v6`).

---

## 1. Build, ferramentas e regras do trabalho em paralelo

```bash
cd /home/user/produtos
python3 build.py --out $V/build/<agente>.html     # cada agente gera a própria saída
python3 build.py --final                          # SÓ na integração: escreve DTS_Portfolio_Estrategico_2027.html
```
- Sem `--out` e sem `--final`, o build **recusa** (protege o arquivo principal durante o trabalho em paralelo).
- Montagem: fontes Barlow Condensed embutidas (`@font-face "Barlow Condensed Embed"`) → CSS (`src/styles.css` + `src/css/*.css`, ordem alfabética)
  → slides (`src/slides/*.html`) → versos (`src/versos/*.html`, dentro de `<div id="versos" hidden>`) → **um `<script>` por arquivo JS**, nesta ordem:
  ativos (`const ASSET`), `src/engine.js`, `src/data/*.js`, `src/core.js`, `src/js/*.js` (o `99-boot.js` inicia).
  Um erro de sintaxe num módulo não derruba os outros; cada script termina com `//# sourceURL=src/...`, então o console mostra o arquivo e a linha.
- **Todos os scripts dividem o mesmo escopo global**: `const/let` de topo com nome repetido derruba o segundo arquivo.
  Escreva o JS do slide **dentro de uma IIFE** `(function(){ … })();` e não declare nomes globais (ver seção 9 para os nomes da fundação).
- Ninguém faz `git commit`/`push`. Ninguém edita arquivo de outro dono (seção 2); pedido de mudança vai como nota no resultado.

Ferramentas (`$V/tools/`, Node + Playwright; viewport 1600×900):

| Comando | O que faz |
|---|---|
| `node $V/tools/shot.js <html> <prefixo> "<itens>" [espera_ms]` | capturas. Itens separados por `;`: `N` · `N:pane=2` · `N:step=K` · `N:verso` · `ficha:<id>` · `chap:N` · `js:<código>` · `all` (1–20). Saída `<prefixo>NN.png`, `NN_pane2`, `NN_step3`, `NN_verso`, `ficha_<id>`, `chap_NN`. Imprime erros de console (sai com código 2 se houver). |
| `node $V/tools/audit.js <html> <pasta> [fichas] [sem-versos] [offline]` | auditoria por slide e por vista: conteúdo que passa do `.body`, texto cortado, reticências, rótulos curtos quebrados em 2+ linhas, vazio > 60 px no fim do corpo, rodapé truncado, fontes carregadas, erros **e avisos** de console. **Verso de cada slide** (vira a página): palavras do contexto (meta 250–450), fontes listadas, frase do AM, letra usada (15 px = padrão), texto que não cabe, fonte/fato fora do registro (vermelho) e marcas [n] sem fonte. **Também (parte 3):** letra abaixo de 11 px (SPEC 3; inclui texto SVG escalado) e texto laranja sobre fundo claro (marca A&M) contam como apontamento; siglas fora da lista da SPEC 5 e números com unidade (%, R$, prazo, faixa, ≥, ×) fora de `data-fato` aparecem como `? … a conferir`, assim como texto corrido abaixo de 13 px (heurística: confira e decida; não contam como apontamento). `offline` bloqueia o Google Fonts (como numa máquina sem internet: a Barlow embutida assume; Inter cai para Helvetica/Arial, como na APODI). Gera `audit.json` e `audit.txt`. Com `fichas`, audita também as 24 fichas. Roda com movimento reduzido (mede o estado final). |
| `node $V/tools/pdf.js <html> <saida.pdf> [--ordem]` | PDF pelo caminho de impressão (`DECK.print()` = `buildPrint`): frente → verso → páginas de detalhe, por slide; no fim, as 24 fichas. Mostra o total de páginas, a contagem por tipo, confere se cada verso vem logo depois da sua frente (`--ordem` imprime a sequência) e lista erros e avisos. Confere ainda as **fontes embutidas** (`pdffonts`) e **páginas em branco** (`pdfcheck.py`, que gera `<saida>_check/folha.png`). Injeta Inter/JetBrains Mono estáticas para um PDF menor. |
| `python3 -I $V/tools/sheet.py <saida.png> <colunas> <img…>` | folha de contato das capturas (miniaturas 800×450). |

Verificação da fundação (parte 3; úteis na integração e na revisão final, não no dia a dia do slide):

| Comando | O que confere |
|---|---|
| `node $V/tools/nav.js <html> <saida.txt> [pasta]` | navegação inteira: → do 1 ao 20 (divisórias, passos, vistas) e ← de volta, índice (G), abas, fichas (P, ← →, Esc, One-page, Voltar), endereços `#N` e `#p=<id>` (carga e hashchange), virar a página (V) em 5 slides e navegação que desvira, movimento reduzido. ~3 min |
| `node $V/tools/resp.js <html> <saida.txt> [pasta] [LxA …]` | 1280×720 … 2560×1440: escala do palco, barra inferior sem encostar no palco nem se sobrepor (também com ficha aberta), sem rolagem, painéis dentro da janela, verso no lugar do palco |
| `node $V/tools/fichas.js <html> <saida.txt> [pasta]` | as 24 fichas (abrem, mesmo degrau, sem corte nem rolagem) e a tolerância aos formatos novo (SPEC 10.2) e antigo (V5) |
| `node $V/tools/apodi_cmp.js <apodi.html> <html> <pasta>` | medidas da moldura contra o modelo APODI (palco, cabeçalho, faixa, corpo, rodapé, barra, fontes) e capturas lado a lado |
| `python3 -I $V/tools/buildcheck.py <repo> <html>` | build: um `<script>` por arquivo e na ordem, versos em `#versos[hidden]`, ativos embutidos (só o Google Fonts fica externo), Barlow embutida, sem fotos de pessoas, tamanho |
| `python3 -I $V/tools/pdfcheck.py <pdf> <pasta> [sequência]` | páginas, tamanho, fontes embutidas, páginas em branco e folha de contato (o `pdf.js` já chama) |

Exemplo de rotina de um agente de slide:
```bash
python3 build.py --out $V/build/s05.html
node $V/tools/shot.js $V/build/s05.html $V/s05/ "5;5:step=3;5:verso;chap:5"
node $V/tools/audit.js $V/build/s05.html $V/s05/audit
```

---

## 2. Arquivos e donos

| Dono | Arquivos |
|---|---|
| **Fundação** | `build.py`, `src/styles.css` (tokens, palco, moldura, barra inferior, divisória, impressão), `src/engine.js`, `src/core.js`, `src/css/02-componentes.css`, `src/css/05-icons.css`, `src/js/02-helpers.js`, `src/js/05-icons.js`, `src/js/07-verso.js` + `src/css/07-verso.css` (virar a página), `src/css/25-pilares.css` + `src/js/25-pilares.js` (motor compartilhado dos pilares), `src/css/40-fichas.css` + `src/js/40-fichas.js`, `src/js/99-boot.js`, `src/data/00-base.js`, `src/data/01-capitulos.js`, `src/data/02-equipe.js`, `src/data/20-timelines.js`, `src/assets/` |
| **Conteúdo-base** | `src/data/05-fontes.js` (FONTES, FATOS), `src/data/1N-produtos-pN.js` (PRODUCTS), `src/data/30-jogos.js` (JOGOS), `src/js/06-mascote.js`, `src/css/06-mascote.css` |
| **Slide NN** | `src/slides/NN-*.html`, `src/versos/NN-*.html`, `src/css/30-sNN-*.css`, `src/js/30-sNN-*.js` (nos pilares: também o registro `PCFG[n]` no próprio módulo) |

Os arquivos `30-sNN-*` já existem para os 20 slides (vazios ou com o código e o CSS herdados da V5, marcados como tal).

---

## 3. Slide com moldura

```html
<!-- ===================================================== 05 · Seis forças (Parte 2) -->
<section class="slide" data-s="05" data-t="Seis forças" data-p="2 · O que o mercado vive"
  data-band="O QUE MUDOU NO MERCADO" data-c="c-blue" data-bs="Passe o cursor numa força ou use →"
  data-src="PwC CEO Survey (jan/2026) · Deloitte State of AI 2026 · LC 214/2025">
  <div class="body">
    … (seção 4) …
  </div>
</section>
```

| Atributo | Uso |
|---|---|
| `data-s="NN"` | **obrigatório**. Número do slide com dois dígitos. Chave dos ganchos (`ENTER["05"]`), do escopo de CSS e das ferramentas. |
| `data-t` | título da seção no cabeçalho (vai em CAIXA ALTA pelo CSS) e no índice (G). Curto. |
| `data-p` | `"N · Nome da parte"` → cabeçalho mostra "Parte N · Nome" e o índice agrupa por parte. Sem `data-p` = Abertura. |
| `data-band` | texto da faixa (`› TEXTO`), CAIXA ALTA, curto (até ~60 caracteres; acima de 95 a fonte diminui). |
| `data-c` | tom da faixa: `c-navy` (padrão) · `c-blue` · `c-steel` · `c-gold` (com parcimônia: um destaque por parte). |
| `data-bs` | pílula de dica à direita da faixa ("Clique num pilar para focar"). Some na impressão. |
| `data-src` | fonte curta no rodapé, **uma linha** (≤ ~170 caracteres; o `audit.js` acusa se truncar). As fontes completas vão no verso. |
| `data-panes="Vista 1\|Vista 2"` | duas vistas (seção 7). O seletor ocupa o lugar da pílula de dica. |
| `data-nofoot` | sem rodapé. |
| `data-bare` | sem moldura (capa, sumário; seção 5). |

O núcleo injeta: `.sr-dec` (régua laranja), `.sr-top` (cabeçalho 80 px: logos A&M e DTS, "Planejamento Estratégico · DTS / Produtos,
Serviços e Inteligência Artificial", título da seção, linha da parte, "● Outubro de 2026"), `.sr-band` (faixa 50 px) e `.foot`
("DTS · PLANEJAMENTO ESTRATÉGICO 2027 · fonte · n / 20"). **Não escreva nada disso à mão.**

Medidas: palco 1600×900. `.body` = `left:12 right:12 top:156 bottom:40`, padding 12/16, `display:flex; flex-direction:column; gap:12px`.
**Área útil do corpo: 1542 × 679 px.** Com título + subtítulo (≈ 59 px + 12 de vão) sobram ≈ 608 px; com a barra "E daí?" (≈ 64 px + 12) sobram ≈ 532 px.
Fundo escuro: `<div class="body dk">` (radial navy; o contexto `.dk` liga as variantes escuras dos componentes).

---

## 4. Esqueleto do corpo

```html
<div class="body">
  <header class="head" data-a="fade">
    <div>
      <h2 class="tc">Título-conclusão em uma linha, que afirma a ideia do slide</h2>
      <p class="sub">Subtítulo em uma linha: o que sustenta a afirmação e por que pesa</p>
    </div>
    <div class="head-r"><!-- opcional: seletor, legenda, botão --></div>
  </header>

  <div class="sNN-main">…conteúdo (flex:1; min-height:0)…</div>

  <div class="sowhat"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/></svg>
    <span class="k">E daí?</span><p>Consequência concreta para o cliente e para a DTS, <b>com o ponto que pesa</b>.</p></div>
</div>
```
- `.tc` título-conclusão: Barlow Condensed 700 28 px, navy, uma linha (`white-space:nowrap`), ≤ 110 caracteres. Grifo: `<em>` vira fio laranja embaixo (no claro) e texto laranja-claro (no escuro).
- `.sub` subtítulo: Inter 500 19 px, `--steel`, uma linha, ≤ 130 caracteres. `<b>` em navy.
- `.head-r`: controles alinhados à direita do título (ex.: seletor do spotlight e legenda, como no slide 04).
- O conteúdo principal ocupa o resto: dê `flex:1; min-height:0` ao contêiner.
- **Cabeçalho antigo (V5)**: `.hd` com `.eyebrow` + `.h2` + `.lead` ainda funciona (o eyebrow some e o h2 vira título no estilo novo), mas é só compatibilidade. Slide reescrito usa `.head/.tc/.sub`.

---

## 5. Slide sem moldura (`data-bare`)

Capa, sumário (e quem precisar de palco cheio). O slide ocupa 1600×900; você desenha tudo. Modelos: `01-capa.html` (capa APODI:
título Barlow 800 112 px, fio laranja 72×4, subtítulo Inter 700 34 px, logos embaixo à esquerda em `left:120px; bottom:52px`,
mascote à direita) e `02-sumario.html` (painel navy em diagonal, partes numeradas em laranja com `data-go`, ilustração à direita).
```html
<section class="slide" data-s="02" data-t="Sumário" data-bare data-nofoot> … </section>
```
- `data-go="N"` em qualquer elemento leva ao slide N (1–20). `data-ui` marca o que é só da tela (some na impressão).
- Logos: `amLogo(altura)` e `dtsLogo(altura)` (imagens brancas; `amLogo(h,false)` e `dtsLogo(h,false)` = navy) ou `ASSET["am-performance-white"]`, `ASSET["dts-logo-white"]`.

---

## 6. Componentes (copiar e colar)

Tokens (`styles.css`): `--navy #002B49` (texto) · `--navy-d #122143` · `--navy-dd #0E1C39` · `--indigo #1F3263` · `--steel #5E8AB4` · `--slate #33556D`
· `--orange #F78C16` · `--orange-l #F9A64A` · `--orange-d #C96A05` · `--ice #DFE8F0` · `--ice2 #EEF3F8` · `--ink2 #35516A` · `--muted #6B7B8C`
· `--line #D6DEE6` · `--line2 #E8EDF2` · `--canvas #F5F8FB`. Fontes: `--fh` (Barlow Condensed, títulos) · `--fb` (Inter, texto) · `--fm` (JetBrains Mono, com parcimônia).
Os nomes da V5 (`--navy-800`, `--steel-300`, `--orange-500`…) continuam valendo, remapeados para esta paleta.

**Marca:** navy carrega, cinza estrutura, azul apoia, **laranja só como detalhe** (fio, ponto, marcador, botão Avançar). **Nunca texto laranja sobre fundo branco** (no escuro, `--orange-l` pode).
Corpo de texto ≥ 13 px; notas ≥ 11 px.

```html
<!-- card (APODI: branco, borda fina, canto 3 px; .r14 = canto 14; .fl = coluna) -->
<div class="card r14 fl"><h3>Título do card</h3><p>Texto curto de apoio.</p></div>
<div class="card soft">…</div>                       <!-- fundo gelo -->
<div class="card nv"><h3>…</h3><p>…</p></div>        <!-- card navy -->

<!-- painel navy (APODI .pnl) e vidro (sobre fundo escuro) -->
<div class="pnl"><div class="eye">Rótulo</div><h3>Título</h3><p>Texto.</p></div>
<div class="glass"><h3>Título</h3><p>Texto.</p></div>

<!-- KPI (APODI .kt): ícone + rótulo + número (só números permitidos pela SPEC 4) -->
<div class="kt"><span class="ic"><svg viewBox="0 0 24 24"><path d="M4 12h16"/></svg></span>
  <div><span class="tt2">Serviços no portfólio</span><div class="v">29<small>em 4 pilares</small></div></div></div>

<!-- tabela (APODI .tbl: cabeçalho navy) -->
<table class="tbl"><thead><tr><th>Firma</th><th>O que oferece</th></tr></thead>
  <tbody><tr><td><b>Deloitte</b></td><td>Texto.</td></tr></tbody></table>

<!-- chips e etiquetas -->
<div class="chips"><span class="chip"><i></i>Rótulo curto</span><span class="chip">Outro</span></div>
<span class="chip-dim">DIMENSÃO</span>
<span class="pill">Gatilho</span>
<span class="st keep">Manter</span> <span class="st ai">Aprimorar com IA</span> <span class="st new">Criar com IA</span>   <!-- ou stTag("ai") -->

<!-- legenda -->
<div class="legend"><span><i style="background:var(--navy-d)"></i>Manter</span><span><i style="background:var(--steel)"></i>Aprimorar com IA</span></div>

<!-- rótulos e textos -->
<div class="eye">Rótulo em caixa alta</div>  <div class="lbl">Rótulo Barlow</div>
<p class="stmt2">Afirmação forte</p>  <p class="stmt3">Apoio</p>  <p class="src-note">Fonte: Org (mm/aaaa)</p>

<!-- produto: link para a ficha -->
${plink("1.1")}   ${pcode("1.1","sm")}   <a href="#p=tech-ai-value-diagnostic" data-pd="tech-ai-value-diagnostic">…</a>

<!-- dica flutuante em qualquer elemento -->
<span data-tv="Título da dica" data-tl="Texto simples">…</span>   <!-- ou data-th="<span class='tl'><b>Rótulo</b>texto</span>" -->

<!-- barra "E daí?" -->
<div class="sowhat"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16"/></svg><span class="k">E daí?</span><p>Uma frase de consequência.</p></div>
```
Entradas animadas: `data-a` (= `up`) · `"fade"` · `"left"` · `"right"` · `"zoom"` · `"pop"` · `"blur"` · `"stack"` · `"mask"`, com atraso `style="--d:3"`
(passos de 80 ms). Traço SVG que se desenha: `class="dr"` + `pathLength="1"`. Fio que corre: `class="flow"`. Card que sobe no hover: `class="lift"`.
Tudo isso fica estático com movimento reduzido e na impressão.

Efeitos prontos (engine.js): `Spotlight(host, passos, seletorHost, {capW, onSet})` · `BeforeAfter(caixa, {l, r, rest, onMove})` · `CardStack(cena, htmlDosCards, pontos)` ·
`Timeline(host, itens, {y, cardY, x0, x1, dwell})` · `Morpher` / `MorphScene` · `count(el, de, até, sufixo)` · `segSync(el)` (o elemento `.seg` do seletor: reposiciona o fundo do botão ativo) · `kin(el)` (palavras que sobem).
Ícones de linha: `icoSvg("chart", atraso)` + `fixPaths(raiz)`; ícone do produto: `picoSvg("1.1")`.

---

## 7. Duas vistas no mesmo slide (`data-panes`)

```html
<section class="slide" data-s="07" … data-panes="Raio-X|Três caminhos">
  <div class="body pane on" data-pane-src="Fonte curta da vista 1"> … </div>
  <div class="body pane" data-pane-src="Fonte curta da vista 2"> … </div>
</section>
```
- O seletor "1 · Raio-X / 2 · Três caminhos" fica na ponta direita da faixa. → percorre os passos da vista (STEP) e depois troca de vista; ← volta.
  Entrando pelo ← (vindo do slide seguinte), o slide abre na última vista.
- O rodapé troca para o `data-pane-src` da vista ativa. Vista escura: `class="body pane dk"`.
- Na impressão, cada vista vira uma página (clone automático, classe `pane-print`).
- **Vista ativa no JS do slide:** `paneOf(sec).k` (0 = primeira). Num slide de duas vistas o `STEP` recebe todos os → / ←: devolva `false` quando a vista
  ativa não for a dos seus passos, senão a troca de vista não acontece (ex.: `STEP["19"]=d=>{if(paneOf(sec).k!==0)return false; …}`).

---

## 8. Ganchos, passos e eventos

Registre pelo `data-s` (string de dois dígitos):
```js
(function(){const sec=SL("05");if(!sec)return;          // SL("NN") devolve o <section>
  ENTER["05"]=()=>{ /* ao entrar: reinicia animações; goLast===true quando veio pelo ← */ };
  STEP["05"]=d=>{ /* d = +1 (→) ou -1 (←); devolva true se consumiu o passo, false para seguir */ return false };
  PRINT.push(()=>{ /* antes de imprimir: estado final estático; pode criar páginas extras */ });
  BOOT.push(()=>{ /* depois de todos os módulos carregarem (ex.: ler PCFG, JOGOS, FATOS) */ });
})();
```
- `ENTER` roda depois da ativação (60 ms; 0 se instantâneo). Se o slide abre uma parte, roda **depois** que a divisória fecha.
- `STEP` roda antes da troca de vista e de slide. Exceções são capturadas (não travam a navegação), mas aparecem no console.
- `goLast` (global) = o slide foi aberto pelo ←: abra no último passo/estado.
- Eventos no `document`: `deck:activate` {i, from, key, slide} · `deck:pane` {key, k} · `deck:chapter` {key} · `deck:ficha` {id}.
- `window.DECK` (ferramentas e testes): `slide(n)` (1–20, instantâneo), `go(i)` (índice 0–19), `next()`, `prev()`, `pane(k)` (0 = primeira vista), `step(k)` (dá k passos internos sem sair do slide; devolve quantos deu), `chap(n)` (mostra a divisória do slide n), `ficha(id)`, `flip()` (alterna; `flip(true)` vira, `flip(false)` desvira), `flipped` (estado), `print()`, `cur`, `slides`, `keyOf`.
- Teclas: ←/→/espaço/PageUp/PageDown · Home/End · **G** índice · **P** fichas · **F** tela cheia · **V** vira/desvira a página · **Esc** (fecha divisória, painel, verso, ficha).
- Com a página virada, ← / → vão direto ao slide vizinho (já de frente). Qualquer navegação (setas, abas, índice, links, ficha, `#N` no endereço) desvira antes.
- Barra inferior: em janelas estreitas (ex.: 1280 px) ou com ficha aberta (rótulos mais longos) ela se compacta sozinha (`barFit`, classe `bar-tight` no `<body>`);
  se nem assim couber, as abas de capítulo saem (o índice **G** continua). Abaixo de 1180 px as abas não aparecem, como na APODI.

---

## 9. JS do slide: regras e o que já existe

- Tudo dentro de IIFE; `id` novos com prefixo do slide (`s05Map`, `s05-…`) para não colidir.
- Ordem de carga: `src/data/*.js` (PRODUCTS, FONTES/FATOS, JOGOS…) carrega **antes** dos módulos dos slides — pode ler na carga, sempre com `typeof X!=="undefined"` (o arquivo pode faltar). `PCFG` é preenchido pelos módulos 30-s10…s17, que carregam depois: leia só no `BOOT.push` ou no `ENTER`.
- Dados disponíveis: `PILLARS` (4 pilares: n, name, official, to, short, def, def_as, when, was, now), `OLD` (29 serviços: id, p, n, d, to, w),
  `NEWPOS`, `PRODUCTS` (24 produtos, por pilar), `TL_2026`, `TL_LAUNCH` (linhas do tempo), `EQUIPE` (**vazio de propósito**: SPEC §0 proíbe pessoas da A&M; o build não embute fotos),
  `PARTES`, `ABAS`, `CAPITULOS`, `ASSET`, e quando existirem `FONTES`/`FATOS` (use `FATO(id)`, `FONTE(id)`, `fatoSrc(id)`) e `JOGOS`.
- Ajudantes: `$`, `H(tag,attrs,pai,texto)`, `S`, `T` (SVG), `PBY(código)`, `plink`, `pcode`, `strip`, `codeLink`, `ico`, `stTag`, `STATUS`, `clamp`, `REDMO`, `ease`, `rel(el, caixa)`.
- **Nomes globais da fundação (não redeclare):** `$ H S T NS REDMO ease clamp STATUS SPARK stTag ev hy tip amLogo dtsLogo kin count fmt Morpher morphTo SHAPES toD resample densify startTop polyFromVerts MORPH_N Spotlight segSync BeforeAfter CardStack Timeline`
  · `stage flipEl fitT deckMasc slides N cur busy pad keyOf ENTER STEP PRINT CHAPX BOOT hook SL safe hlx esc CFG ASSETS IMG DECO IC PANE CAP TABS chapEl tipEl idxP pdxP panels ctr dotsEl pdOpen pdFrom openPD closePD pdStep setPane paneStep paneOf showChapter hideChapter activate go next prev goLast stepHook fit boot buildPrint plainBadges badgeText partLine frameTopHTML bandHTML footHTML logosHTML navIdx ctlMode fillIdx fillPdx closePanels togglePanel isFlipped flipSync idxOf DECK_EV tilt tx DECK chapOn _AS barFit barQ barRaf`
  · verso: `VERSO refFill` (e `window.flipPage`, `window.unflipPage`) · mascote (conteúdo-base): `AMMasc` (`window.AMMasc`)
  · `ONEPAGE PBY strip plink pcode codeLink ICO ico PCFG BAS FATO FONTE fatoSrc MorphScene ICONS PICO icoSvg picoSvg fixPaths rel`
  · `pcfgC pcfgP pillarNotes ovlOf BAPX PPG HEATL renderBAP renderPP renderCliente ppCapAI` · fichas: `pd PDX pdHTML renderPD pdMeasureAll pdOverflow pdInOver pdHolo pdIco pdKw PDKW DEF_GET`
  · dados: `E Hy PILLARS OLD NEWPOS PRODUCTS PARTES ABAS CAPITULOS EQUIPE TL_MARKET TL_2026 TL_LAUNCH NM_MARKET NM_PRODS FONTES FATOS JOGOS ASSET LOGO_DTS LOGO_DTS_NAVY` · slide 09: `ORG ORGT pillarFlow`.

---

## 10. CSS do slide

```css
/* src/css/30-s05-forcas.css */
.slide[data-s="05"] .s05-map{display:grid;grid-template-columns:…;gap:14px;flex:1;min-height:0}
.slide[data-s="05"] .s05-node:hover{…}
@keyframes s05-pulse{…}
@media print{.slide[data-s="05"] .s05-node{…}}
@media (prefers-reduced-motion:reduce){.slide[data-s="05"] .s05-node{animation:none!important}}
```
- **Toda regra nova começa com `.slide[data-s="NN"]`.** Sem seletor global, sem mexer na moldura (`.sr-top`, `.sr-band`, `.foot`, `.body` posição).
- Keyframes com prefixo `sNN-`. `!important` só em impressão e movimento reduzido.
- As regras herdadas da V5 vieram para o arquivo do slide **sem escopo** (marcadas no topo). Ao refazer o slide, reescreva com escopo e apague as herdadas.
- Fundo escuro: estilize as variantes com `.slide[data-s="NN"] .dk .x` (ou só use `.body dk` e os componentes, que já têm a variante escura).

---

## 11. Pilares (slides 10–17): registro de conteúdo em `PCFG`

O motor `src/js/25-pilares.js` desenha tudo **no boot**, lendo `PCFG[n]`. Cada módulo de pilar só registra o conteúdo:
```js
/* src/js/30-s10-p1-cliente.js */
PCFG[1].cliente={
  pers:[["CEO · Conselho","A IA está gerando resultado ou só custo?",["1.3","1.7"]], …],   // quem compra: papel, pergunta, produtos
  mk:[["Deloitte","Como chamam a oferta","O que fazem com IA","Leitura para a DTS","E"], …], // mercado
  heat:["M","A",…],                                    // sobreposição por linha de mk: A alta · M média · B baixa · X ativo A&M
  ws:{it:[["Título","Texto","1.3","E"], …],th:["Ameaça a monitorar","E"]},              // onde a DTS ganha + ameaça
  jr:[["Gatilho","Título",[],"nota"],["Entrada · sprint","…",["1.1"],"…"], …],          // jornada comercial
  pos:"Posicionamento proposto (HTML curto)"
};
/* src/js/30-s11-p1-produtos.js */
PCFG[1].produtos={
  cap:["frase do grafo no estado Hoje","frase no estado Produtos"],   // o estado Com IA é calculado
  notes:["3 ofertas de liderança viram o 1.3", …],                   // "O que muda" (códigos viram link)
  ovl:{"1.3":"motivo da sobreposição", …}                            // por produto de destino
};
```
- Marcação que o motor procura (já nos slides): `.persona[data-pillar]`, `table.mk[data-mk]`, `.ws[data-pillar]`, `.jr-wrap[data-pillar]`, `.pos[data-pos]`,
  `.main.pp[data-pillar]` (grafo + cartas) e `.main.bap[data-pillar]` (antes e depois). Remova a marcação se o slide não usar a peça.
- Os ganchos `ENTER`/`STEP` dos slides de produtos (11, 13, 15, 17) são do motor (Hoje → Produtos → Com IA, depois a vista 2).
  Para acrescentar comportamento, embrulhe: `const base=ENTER["11"];ENTER["11"]=()=>{base&&base(); …}` (no `BOOT` ou no fim do módulo).
- Conteúdo específico de um pilar (casos do 14, linha regulatória do 12) mora no módulo do slide.
- Mudança no motor ou em `25-pilares.css`: peça à fundação.

---

## 12. Mascote "AM"

```html
<div class="am-masc" data-pose="aponta" style="--s:160px"></div>   <!-- --s = largura; altura proporcional -->
<div class="am-fala">Fala curta do mascote.</div>                   <!-- balão branco, texto navy, fio laranja à esquerda -->
```
- Poses: `aceno · aponta · pensa · lupa · lanterna · capacete · apresentador · bandeira · livro · comemora`.
- `src/js/06-mascote.js` (conteúdo-base) monta o SVG (`window.AMMasc.mount(raiz)`) e `src/css/06-mascote.css` dá o estilo final.
- **A fundação chama `AMMasc.mount` sozinha** (função `deckMasc(raiz)` em `core.js`, só se `window.AMMasc` existir): ao ativar cada slide,
  ao mostrar uma divisória, ao desenhar o verso, ao abrir uma ficha e ao montar a impressão. Sem o módulo, a `div` fica vazia e nada quebra.
  Conteúdo desenhado depois (no `ENTER`, por exemplo) com `.am-masc` novo: chame `deckMasc(el)`.
- `--s` pode vir de um ancestral (variável CSS herdada): as divisórias definem `--s` no `.ch-m` (390 px; 212 px nas aberturas de pilar)
  e o verso no `.v-amb .am-masc` (84 px). Não ponha `style="--s"` no `.am-masc` dessas peças.
- Em JS: `AMMasc.pose(el,"comemora")`, `AMMasc.play(el)`, `AMMasc.stop(el)` — sempre com `if(window.AMMasc)`.
- Onde aparece (SPEC 7): capa (aceno, grande), sumário (aponta), divisórias (seção 14), raio-X (lupa, pequeno), fábrica (capacete),
  jogos (apresentador), roadmap (bandeira), verso de todas as páginas (livro, automático). Não em todo slide.
- Posicione o mascote num contêiner seu (`position:absolute` no corpo ou no palco) com espaço reservado; ele não pode cobrir texto.

---

## 13. Verso ("Virar a página") · como escrever

**O que acontece na tela.** O botão **Virar a página** (ou **V**) gira o palco inteiro em 3D (rotateY 180°, perspectiva, ~0,7 s;
instantâneo com movimento reduzido) e mostra o verso do slide atual; **V**, **Esc** ou **Desvirar** voltam à frente; navegar desvira.
Funciona em todos os slides, inclusive capa e sumário (o verso sempre tem moldura). Com uma ficha aberta o botão fica desligado.
O verso tem a moldura dos slides: cabeçalho com o título da seção e a parte, faixa **› VERSO · CONTEXTO E FONTES** (tom `c-steel`,
dica "V ou Esc para voltar"), corpo branco em duas colunas e rodapé **"Verso · n / 20"**:

| Coluna | Conteúdo | Tipografia |
|---|---|---|
| esquerda (~60 %) | **contexto em prosa**, com subtítulos curtos (`<h4>`) | Inter 15 px / 1,55, navy 80 %; `h4` Barlow Condensed 700 18 px navy com marcador laranja |
| direita (~40 %) | **Fontes** numeradas; no pé, a caixa **"Leitura do AM"** com o mascote (pose livro) e uma frase de síntese | Inter 13 px |

**Arquivo:** `src/versos/NN-slug.html` (um por slide; dono = dono do slide). O build guarda todos em `<div id="versos" hidden>`;
`src/js/07-verso.js` clona o `article` na hora de virar (e na impressão). Estrutura:

```html
<article class="verso" data-for="04">
  <div class="v-ctx">
    <h4>O que esta página afirma</h4>
    <p>Cada pilar da DTS entra num momento diferente da vida do cliente: decidir, executar, transacionar e modernizar.
       O portfólio oficial descreve 29 serviços em quatro pilares [1], mas a oferta fala a língua de serviços, não de resultados.</p>
    <h4>Por que isso pesa</h4>
    <p>O comprador mudou a pergunta: <span data-fato="ceo-sem-retorno-ia-56"></span> dos CEOs ainda não viram a IA aumentar a receita
       nem reduzir custos [2]. Quem vende horas disputa preço; quem vende resultado entra na decisão.</p>
    <h4>Como chegamos aqui</h4>
    <p>Contamos os serviços no documento oficial e marcamos como sobreposição dois serviços com o mesmo comprador e o mesmo método [1].
       A leitura por pilar segue quatro perguntas: quando o cliente nos chama, o que entregamos, onde somos fortes e onde há sobreposição.</p>
    <h4>O que ainda vamos validar</h4>
    <p>A força de cada pilar é leitura nossa, a calibrar com os sócios, junto com os casos que provam o direito de vencer.</p>
  </div>
  <ol class="v-src">
    <li data-f="portfolio-dts"></li>          <!-- vazio: preenchido a partir de FONTES -->
    <li data-f="pwc-ceo-survey-2026"></li>
  </ol>
  <div class="v-am">Quatro pilares cobrem o ciclo inteiro; falta falar a língua do resultado.</div>
</article>
```

**Regras de conteúdo (SPEC 6):**
- Quatro subtítulos, nesta ordem: *O que esta página afirma* · *Por que isso pesa* · *Como chegamos aqui* · *O que ainda vamos validar*.
  Um a três parágrafos curtos por subtítulo; pode usar `<ul>`/`<ol>` simples, `<b>` (navy) e `<em>`.
- **250 a 450 palavras** no contexto (o `audit.js` conta). Meta prática: **300–380 palavras** para ficar na letra padrão de 15 px.
  Se o texto não couber, o módulo desce a letra em degraus (14,5 → 14 → 13,5 → 13 px); se nem a 13 px couber, `console.warn("[verso] …")`
  e o `audit.js` aponta "não cabe". Nunca há rolagem.
- **Referências** `[1]`, `[2, 3]` ou `[1–3]` no texto viram marcas ligadas à lista: passar o cursor numa marca acende a fonte;
  o número é a posição do item em `ol.v-src`. Marca sem fonte correspondente é apontada pelo `audit.js`.
- **Fontes** (`ol.v-src`, em ordem de citação):
  - `<li data-f="id"></li>` **vazio** é preenchido do registro: **Organização** — Título (data) · tipo · `abrir fonte ↗` (link com a URL completa,
    abre em nova aba). Tipos: primária → "fonte primária", oficial → "fonte oficial", empresa → "fonte da empresa", imprensa → "imprensa",
    documento interno → "dado nosso" (sem link).
  - id que não existe em `FONTES` aparece **em vermelho** ("fonte não encontrada: id") e gera `console.warn("[fontes] …")`.
  - `<li>` com texto escrito à mão fica como está (use só para algo que não está no registro; prefira registrar a fonte em `05-fontes.js`).
  - Fatos estruturais do portfólio citam `portfolio-dts`; propostas nossas, `proposta-dts-2027`; a pesquisa, `pesquisa-dts-2026`.
- **Frase do AM** (`.v-am`): uma frase de síntese, até ~110 caracteres, sem número novo. Sem `.v-am`, a caixa não aparece.
- Sem siglas fora da lista (SPEC 5), sem números fora do registro (SPEC 4), sem pessoas da A&M (SPEC 0). Números de mercado: `data-fato`.

**Fatos do registro em qualquer lugar** (slides, versos e textos das fichas):
```html
<span data-fato="ceo-sem-retorno-ia-56"></span>                  <!-- mostra FATOS[id].num  → "56%" -->
<span data-fato="ceo-sem-retorno-ia-56" data-modo="txt"></span>  <!-- mostra FATOS[id].txt  → a frase inteira -->
```
- O texto vem sempre do registro (o que estiver escrito dentro é trocado); a dica (`title`) mostra a fonte ("Fonte: PwC (01/2026)").
- id desconhecido → vermelho ("fato não encontrado: id") + `console.warn("[fatos] …")`; fato com status diferente de "verificado" → `console.warn`.
- O preenchimento roda no boot (slides e versos), ao entrar em cada slide (~160 ms depois do `ENTER`), ao virar a página, ao abrir uma ficha e na
  impressão. Conteúdo desenhado por JS depois disso: chame `refFill(elemento)`.

**Testar:** `node $V/tools/shot.js <html> <pasta>/x_ "4:verso"` (captura) e `node $V/tools/audit.js <html> <pasta>` (palavras, fontes, letra, cabe/não cabe).
`DECK.flip(true)` / `DECK.flip(false)` no console. **Impressão:** o verso sai como página própria logo depois da frente do slide (seção 15).

---

## 14. Capítulos (divisórias)

`src/data/01-capitulos.js` (fundação): `CAPITULOS["03"]={eye:"Parte 1",t:"O ponto de partida",d:"frase",chips:[["03","DTS hoje"],…],pose:"aceno"}`.
A divisória aparece ao entrar **para a frente** no slide (03, 05, 07, 08, 10, 12, 14, 16, 18), no modelo "Parte N" da APODI (fundo navy, grade de pontos,
faixa diagonal, rótulo "PARTE N", título Barlow Condensed 800 de 120 px, fio laranja, uma frase de contexto, pílulas numeradas que levam aos slides,
logos A&M e DTS, mascote em pé sobre a linha do chão, chegando como na APODI). Poses: **Parte 1 aceno · Parte 2 lupa · Parte 3 lupa · Parte 4 comemora ·
aberturas de pilar aponta · Parte 5 capacete**. Pilares (`pilar:n`) usam o nome e a definição de `PILLARS`, o morphing com os números do pilar
(10 → 7, 7 → 6, 8 → 5, 4 → 6; `CHAPX`, em `25-pilares.js`) e o mascote menor ao pé do morphing. Textos das divisórias: pedido à fundação.
`DECK.chap(n)` mostra a divisória do slide n (ferramentas: `shot.js "chap:10"`).
**Atenção (SPEC §2.1, pedido novo do usuário):** as capas serão refeitas pela frente "capas" (briefing em `W3_BRIEFS.md`: sem a "bola" do morphing,
um efeito do Guia DTS por capa, em `src/js/28-capas.js` e `src/css/28-capas.css`). O que está descrito acima é a base atual; a interface que os
outros usam continua a mesma: `CAPITULOS` (textos e pose), `DECK.chap(n)`, o evento `deck:chapter`, `CHAPX[nn]` (efeito da capa, recebe `#chap` e
devolve a limpeza) e `deckMasc(chapEl)` para o mascote.

---

## 15. Impressão (PDF)

Ordem das páginas (`buildPrint` em `core.js`, também no evento `beforeprint`):
1. **para cada slide:** a frente (vista 1) → as demais vistas (`data-panes`, clonadas com a classe `pane-view`) → o **verso** (página estática,
   sem giro, mesma moldura, `section.slide.vpage`) → as páginas extras de detalhe que o slide criou no `PRINT`;
2. **no fim:** as 24 fichas de produto (`section.pd-print`).

- Antes de montar: desvira, fecha divisória e ficha, roda todos os `PRINT.push(f)` dos slides, preenche fatos/fontes e monta o mascote (estático).
- `[data-ui]`, `.hint`, `.btn-play`, a pílula da faixa, os controles e as dicas somem; o seletor de vistas fica com a vista impressa marcada.
- **Toda informação que só aparece na interação precisa estar visível no papel.** Use `PRINT.push(f)` para deixar o estado final estático
  (spotlight desligado, linha do tempo acesa, cartas abertas…) e, se a informação não couber no estado final, **crie uma página extra**: clone o
  `<section>`, `classList.add("pane-print","sNN-print","play")`, troque o miolo e `sec.after(clone)` (ela sai depois do verso). Exemplo completo:
  o `PRINT` do slide 04. O gancho roda a cada impressão: proteja a página extra contra duplicata (`if(stage.querySelector(".sNN-print"))return`).
- Teste: `node $V/tools/pdf.js $V/build/<agente>.html $V/<agente>.pdf --ordem` (mostra páginas por tipo e confere a ordem frente → verso).

---

## 16. Fichas de produto (renderizador V6)

As 24 fichas abrem por `[data-pd]`, `#p=<id>`, painel P e `DECK.ficha(id)`; ← → navegam entre fichas; Esc volta ao slide de origem.
Moldura igual à dos slides: cabeçalho "FICHA DE PRODUTO 1.1 · Pilar 1 · IT Advisory", faixa **› FICHA 1.1 · NOME** com a dica
"← → navega entre fichas · Esc volta" e os botões **One-page** e **✕ Voltar**, corpo branco, rodapé com os outros produtos do pilar e "Ficha n / 24".
O botão "Virar a página" fica desligado com a ficha aberta.

| Onde | Campo (SPEC 10.2) | Como aparece |
|---|---|---|
| carta (navy, fio laranja) | `st`, `sig` | etiqueta Manter / Aprimorar com IA / Criar com IA; **★ A&M Signature** quando `sig:true` |
| carta | `code`, `name`, `tagline`, `pitch` | código + ícone do produto; nome **numa linha** (Barlow 800 28 px); proposta (laranja-claro); frase |
| carta | `who` | "Para quem é" (lista; em duas colunas se os itens forem curtos) |
| carta | `meta` (`"Chave: valor"`) | linhas Formato / Comprador / Modelo comercial / Encaixe (item sem chave entra em "Formato") |
| carta | `from` | "Origem: Evolui de **…**" (ou "Produto novo com IA"); no espaço livre da carta, o ícone do produto como ilustração |
| esquerda, abaixo da carta | `bench` | caixa "Por que A&M" |
| direita, topo | `pain` · `deliv` | "O problema" (1ª frase em negrito) · "O que o cliente recebe" (lista com ícones, duas colunas) |
| direita, topo à direita | `kpis` | "O que pesa · fatos com fonte": valor + texto + fonte (`fatoSrc` do 3º elemento); a coluna tem 300 / 340 / 380 px com 1 / 2 / 3 fatos |
| direita | `steps` | "Como funciona · etapas": trilha com pontos; número da etapa + título + o que acontece |
| direita | `ai` · `prodz` · `tools` + `data` | três caixas: Papel da IA · Como vira produto · Ferramentas e dados |
| direita, pé | `skills` | "Skills" em texto corrido (cada skill inteira numa linha, separadas por ·) |
| direita, pé | `jogo` | "Jogo de entrada": nome + promessa de `JOGOS[jogo]` e, no fim do texto, o link "ver os jogos ›" (slide 19) |
| direita, pé | `fontes` (+ fontes dos fatos de `kpis`) · `ev` | "Fontes" em texto corrido: Organização data ↗ · … (link); `ev` como nota |

A última linha (Skills · Jogo · Fontes) é flex com base no conteúdo: cada caixa ganha largura na proporção do próprio texto e nunca fica abaixo
do seu item mais largo (assim nenhuma fica alta e apertada ao lado de outra vazia). As letras não mudam com isso; só os degraus abaixo mudam letras.

**Tolerância ao formato antigo (V5):** spans `E()`/`Hy()` e marcas `[E · …]` viram "(fonte: …)" ou somem; `kpis` de 2 elementos só aparecem se
tiverem marca de fonte `[E · …]` — **número sem fato do registro é omitido** (com `console.warn("[ficha] …")`), assim como fato com status diferente de
"verificado"; rótulos de etapa com prazo ("S1–2", "M1", "D30–100") somem (o número da etapa é a posição); sem `sig`/`jogo`/`fontes`, a ficha usa o
jogo do pilar; sem `fontes` e sem fato nos `kpis`, a caixa Fontes mostra a nota `ev` (se houver) ou, sem `ev`, as fontes internas
(`portfolio-dts`, `proposta-dts-2027`). Rótulos da ficha têm no mínimo 11 px (SPEC 3).

**Tamanhos iguais em todas as fichas:** há quatro degraus de densidade (`lv0` folgado … `lv3` compacto; o corpo nunca fica abaixo de 13 px).
`pdMeasureAll()` mede as 24 fichas fora da tela (depois das fontes, em momento ocioso, e de novo na impressão) e aplica a **todas** o degrau mais folgado
em que **todas** cabem — a ficha mais longa define o degrau. Se alguma não couber nem no `lv3`: `console.warn("[ficha] não cabem …")`.
Para o deck ficar num degrau folgado, escreva dentro destes **orçamentos** (caracteres, aproximados). Conferidos na parte 3 com uma ficha
sintética no limite de todos ao mesmo tempo: cabe no `lv2`; com 3 fatos ou 6 skills, no `lv3`. Os orçamentos da parte 2 (texto de etapa 70,
`ai`/`prodz` 260, `bench` 300, 6 skills de 24, 6 entregas de 55) **não cabiam** juntos nem no `lv3`.

| Campo | Orçamento | Campo | Orçamento |
|---|---|---|---|
| `name` | ≤ 40 (uma linha) | `steps` | 4–5 etapas; título ≤ 22; texto ≤ 60 |
| `tagline` | ≤ 90 | `ai` / `prodz` | 3–4 itens; ≤ 220 no total (cada lista) |
| `pitch` | ≤ 200 | `tools` + `data` | ≤ 220 somados |
| `who` | 3–4 itens, ≤ 170 no total | `bench` | ≤ 260 |
| `meta` | 3–4 "Chave: valor", valor ≤ 45 | `skills` | 4–5 de ≤ 20 |
| `pain` | 2–3 frases, ≤ 160 no total | `kpis` | 0–2 (3 só com textos ≤ 80); texto ≤ 90; só ids de `FATOS` "verificado" |
| `deliv` | 4–5 itens de ≤ 50 | `fontes` · `ev` | até 4 ids de `FONTES` (as demais no verso do slide do pilar) · `ev` ≤ 80 |

Verificar: `node $V/tools/audit.js <html> <pasta> fichas` (cada ficha: passa do corpo, texto cortado, quebra de rótulo), `node $V/tools/fichas.js <html> <saida.txt>`
(as 24 no mesmo degrau, sem corte, tolerância de formato) e `shot.js "ficha:<id>"`. `PDX.st.level` diz o degrau escolhido e `PDX.st.over` as fichas que não cabem.

---

## 17. Definição de pronto (SPEC 9) e como verificar

| Item | Como verificar |
|---|---|
| Moldura APODI correta; título-conclusão e subtítulo numa linha cada | `.head/.tc/.sub`; `audit.js` (quebra de linha) e captura |
| Nada cortado; nenhuma quebra em rótulos, chips, nomes e títulos curtos | `audit.js`: "texto cortado", "reticências", "quebra de linha" = 0 |
| Sem vazio > ~60 px no fim do corpo | `audit.js`: "vazio no fim do corpo" |
| Nenhum número fora da política (SPEC 4) e nenhuma sigla fora da lista (SPEC 5) | `audit.js`: linhas `? … a conferir` (siglas e números com unidade fora de `data-fato`) + leitura; números de mercado só de `FATOS` (`data-fato` ou `FATO(id)`), com a fonte no verso |
| Letra ≥ 11 px no palco (notas; corpo ≥ 13 px) e nada de laranja como texto sobre fundo claro | `audit.js`: "letra abaixo de 11 px" e "texto laranja sobre fundo claro" |
| Responde "E daí?"; liga com o slide anterior e o seguinte | barra `.sowhat` ou frase equivalente |
| Verso escrito (250–450 palavras), fontes completas com link, frase do AM, cabe sem rolagem | `audit.js` (linha `NN/verso`) e `shot.js "N:verso"` |
| Interações (passos, vistas, spotlight, cartas, links para fichas) sem erro no console | `shot.js` (sem erros) e teste manual com → / ← |
| Impressão com todas as informações (frente e verso) | `pdf.js --ordem` e conferência das páginas |
| Rodapé numa linha | `audit.js`: "fonte do rodapé truncada" |
| Nenhum aviso `[fontes]`, `[fatos]`, `[verso]` ou `[ficha]` do seu slide | `audit.js`: "Avisos de console" |

Estado conferido na parte 3 (verificação independente da fundação, 29/10/2026): moldura igual à da APODI nas medidas (palco, cabeçalho, faixa, corpo,
rodapé, barra), navegação inteira, responsividade de 1280×720 a 2560×1440, impressão (78 páginas no build real: 20 frentes, 9 vistas, 20 versos,
5 de detalhe e 24 fichas; fontes embutidas; nenhuma página em branco), 24 fichas e build conferidos com as ferramentas acima; um slide de teste escrito
só com este contrato (duas vistas, passos, PRINT, BOOT, verso, `data-fato`, mascote, links) funcionou numa cópia do repositório.
Ajustes da fundação na parte 3: barra inferior compacta quando falta largura (1280 px; ficha aberta); giro do verso em 700 ms; letras dos componentes,
do motor dos pilares e das fichas com no mínimo 11 px; rótulos "Insight" do motor sem laranja sobre fundo claro; transições de deslocamento desligadas
com movimento reduzido; ficha com larguras pelo conteúdo (fatos e última linha) e skills/fontes em texto corrido; motor dos pilares tolerante à falta
dos dados de produto (aviso discreto, sem erro). O `audit.js` passou a apontar letra < 11 px e laranja sobre claro: hoje os casos estão no código
herdado da V5 dos slides 03–09 e 18 (donos dos slides). Os módulos herdados 30-s07, 30-s09 e 30-s18 quebram na carga se `PRODUCTS` vier vazio
(arquivo de produtos ausente ou em edição): ao reescrever, proteja com `typeof`/lista vazia (seção 9).

Estado na entrega da fundação (parte 2): **zero erros de console**; virar a página, divisórias, fichas e impressão (frente → verso → detalhe; fichas no
fim) funcionando; as 24 fichas cabem no mesmo degrau; os apontamentos restantes são conteúdo dos donos: versos "em construção" e as fontes longas
no rodapé das vistas dos slides 10, 12, 14 e 16.
