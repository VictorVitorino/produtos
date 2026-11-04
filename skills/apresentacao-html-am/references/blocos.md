# Catálogo de blocos

As classes `ex-*` estão em `content/<deck>/css/01-blocos.css`, copiado pelo `new_deck.py`. As demais vêm da base: `.stmt2`, `.lbl`, `.eye`, `.small`, `.mini`, `data-a`, `data-count`. As telas completas estão em `assets/molde/content/exemplo/slides/02-conteudo.html`. Copie, troque os textos e ajuste a grade.

## Sumário
1. Peças de texto (base)
2. Tela A · Texto e números
3. Tela B · Painel e cartões
4. Tela C · Fases e tabela
5. Grades prontas
6. Corpo escuro
7. Gráfico SVG ampliável
8. Agenda automática
9. Capa e fecho
10. Como encher a altura sem espremer

## 1. Peças de texto (base)

```html
<div class="lbl">Rótulo do bloco <small>complemento em minúsculas</small></div>   <!-- 12,5 px, caixa alta -->
<div class="eye">Sobrancelha</div>                                               <!-- 11 px, espaçada; laranja dentro de .ex-pnl -->
<p class="small">Nota de 11 px</p>   <p class="mini">Nota de 11 px</p>
<span data-count="1506">0</span>                                                  <!-- número que conta ao entrar -->
<div data-a="up" style="--d:3">…</div>                                            <!-- entrada animada, atraso 3 -->
```

## 2. Tela A · Texto e números (leitura + painel escuro)

Use para contexto, diagnóstico ou situação atual. Grade `1fr | 640px`.

```html
<div class="gr" style="display:grid;grid-template-columns:1fr 640px;gap:28px;min-height:0">
  <div class="ex-col">
    <div class="lbl">Contexto <small>o que está acontecendo</small></div>
    <p class="ex-p" data-a="up" style="--d:1">Parágrafo de 2–3 linhas, com <b>termo-chave</b>.</p>
    <ul class="ex-list">                                         <!-- os itens dividem a altura entre si -->
      <li data-a="up" style="--d:2"><i>1</i><b>Ponto · título curto</b><span>Explicação em 1–2 linhas.</span></li>
      <li data-a="up" style="--d:3"><i>2</i><b>…</b><span>…</span></li>
      <li data-a="up" style="--d:4"><i>3</i><b>…</b><span>…</span></li>
    </ul>
    <div class="ex-note" data-a="up" style="--d:6"><div class="eye">Leitura</div><p>Conclusão numa frase.</p></div>
  </div>
  <div id="painelNumeros" class="ex-pnl ex-num" data-a="zoom" style="--d:2">   <!-- id em DECK.zoom -->
    <div class="eye">Em números</div>
    <div class="ex-kpis">
      <div class="ex-kpi"><b><span data-count="123">0</span><em>M</em></b><span>Indicador</span><small>unidade · fonte</small></div>
      <!-- 3 indicadores por linha -->
    </div>
    <div class="ex-bars">                                        <!-- barras se distribuem na altura -->
      <div class="lbl" style="color:#fff">Comparação <small style="color:#9DB7CE">quatro categorias</small></div>
      <div class="ex-bar hi"><span>Categoria A</span><div><i data-a="grow" style="--d:4;width:82%"></i></div><b>82%</b></div>
      <div class="ex-bar"><span>Categoria B</span><div><i data-a="grow" style="--d:5;width:61%"></i></div><b>61%</b></div>
    </div>
    <div class="mini" style="color:#9DB7CE;margin-top:auto">Nota sobre os dados.</div>
  </div>
</div>
```

Capacidade: de 3 a 4 pontos de 1–2 linhas; de 3 a 6 indicadores; até 6 barras.

## 3. Tela B · Painel e cartões (um conceito, um método, uma oferta)

Grade `470px | 1fr`, com colunas empilhadas e intervalo de 12 px. O último bloco de cada coluna leva `flex:1` (ou a classe `ex-fill`) para ocupar a sobra.

```html
<div class="gr" style="display:grid;grid-template-columns:470px 1fr;gap:18px;min-height:0">
  <div style="display:flex;flex-direction:column;gap:12px;min-height:0">
    <div class="ex-pnl"><div class="eye">O que é</div><h3>Nome do conceito</h3><p>Definição em 2–3 linhas.</p></div>
    <div class="ex-card"><div class="lbl">Por que agora <small>quatro razões</small></div>
      <div class="ex-2x2"><div><b>Razão 1</b><span>uma linha</span></div> … (4) </div></div>
    <div class="ex-card ex-fill" style="flex:1"><div class="lbl">Três níveis</div>
      <div class="ex-lv">
        <div><u style="background:#002B49">Nível 1</u><div><b>cadência</b><span>o que decide</span></div></div>
        <div><u style="background:#1F3263;margin:0 14px">Nível 2</u><div><b>…</b><span>…</span></div></div>
        <div><u style="background:#5E8AB4;margin:0 28px">Nível 3</u><div><b>…</b><span>…</span></div></div>
      </div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px;min-height:0">
    <div class="ex-card"><div class="lbl">Como funciona <small>seis etapas</small></div>
      <div class="ex-acts"><div><i>1</i><b>Etapa</b><span>o que acontece</span></div> … (6) </div></div>
    <div class="ex-fill" style="flex:1"><div class="lbl">Os quatro pilares</div>
      <div class="ex-pils">
        <div class="ex-pil" style="--c:#002B49"><div class="h"><i>A</i><b>Pilar A</b></div><p>Descrição.</p><small><b>Indicador</b> · como medimos</small></div>
        … (4; cores #002B49 #1F3263 #5E8AB4 #F78C16)
      </div></div>
    <div class="ex-card"><div class="lbl">Princípios</div>
      <div class="ex-chips"><span>Princípio</span> … <span class="on">Em destaque</span></div></div>
  </div>
</div>
```

`ex-acts` aceita de 4 a 6 etapas: troque `repeat(6,1fr)` no CSS da página se usar outro número.

## 4. Tela C · Fases e tabela (plano, cronograma, entregas)

```html
<div id="regua" class="ex-ph">                                      <!-- fica entre .stmt2 e .gr; id em DECK.zoom -->
  <div style="--c:#002B49"><small>Fase 1</small><b>Nome da fase</b><span>semanas 1–2</span></div>
  <div style="--c:#1F3263"><small>Fase 2</small><b>…</b><span>…</span></div>
  <div style="--c:#33556D"><small>Fase 3</small><b>…</b><span>…</span></div>
  <div style="--c:#5E8AB4"><small>Fase 4 · opcional</small><b>…</b><span>…</span></div>
</div>
<div class="gr" style="display:grid;grid-template-columns:1fr 420px;gap:18px;min-height:0">
  <div class="ex-card ex-fill" style="padding:12px 14px"><div class="lbl" style="margin-bottom:8px">Entregas</div>
    <table class="ex-tb">                                             <!-- as linhas se distribuem na altura -->
      <thead><tr><th>Frente</th><th>Entrega</th><th>Responsável</th><th>Quando</th></tr></thead>
      <tbody><tr><td><b>Frente 1</b></td><td>Entrega</td><td>Cliente</td><td><span class="ex-tag">Sem. 2</span></td></tr>
             <tr>… <td><span class="ex-tag o">Sem. 6 · marco</span></td></tr></tbody>
    </table></div>
  <div class="ex-card" style="display:flex;flex-direction:column"><div class="lbl">Marcos</div>
    <ul class="ex-tl"><li><b>Semana 1</b><span>Início</span></li><li class="o"><b>Semana 6 · decisão</b><span>Marco</span></li></ul>
    <div class="ex-note" style="margin-top:auto"><div class="eye">Atenção</div><p>Datas a confirmar.</p></div></div>
</div>
```

Capacidade: de 3 a 5 fases; tabela com até ~7 linhas de uma linha cada; de 3 a 6 marcos.

## 5. Grades prontas

| Necessidade | `grid-template-columns` | `gap` |
|---|---|---|
| Texto + painel lateral | `1fr 640px` | 28 px |
| História + leitura de apoio | `1fr 452px` | 20 px |
| Conceito + detalhamento | `470px 1fr` | 18 px |
| Comparação de 2 | `1fr 1fr` | 20 px |
| Comparação de 3 | `repeat(3,1fr)` | 18 px |
| 4 cartões | `repeat(4,1fr)` | 16 px |

Sempre com `min-height:0` na `.gr`. Para empilhar dentro de uma coluna: `display:flex;flex-direction:column;gap:12px;min-height:0`.

## 6. Corpo escuro

Acrescente `dk` ao corpo: `<div class="body sp fill dk">`. Nele, a frase-chave fica branca (use `style="color:#fff"`) e os destaques ficam laranja-claro. Use em momentos de virada da narrativa, uma ou duas vezes por deck.

## 7. Gráfico SVG ampliável

```html
<svg id="graficoX" viewBox="0 0 480 420" width="480" height="420" style="display:block;width:100%;height:auto">
  <rect x="50" y="250" width="60" height="120" rx="6" fill="#BFD0E1"/> …
  <text x="240" y="40" text-anchor="middle" style="font:600 13px var(--fb);fill:#35516A">Título</text>
</svg>
```

Inclua `"graficoX"` em `DECK.zoom`. O SVG é ampliado como vetor. Escreva os números reais e rotule os eixos. `data-a="grow"` cresce na **horizontal** (barras deitadas, como `.ex-bar`). Para colunas verticais, use `data-a="up"` com `style="--d:N"`.

## 8. Agenda automática

`<div id="agenda" class="gr" style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;align-content:start;min-height:0"></div>`. O motor preenche um botão por seção que tenha cor em `DECK.parts`, com número, nome, telas e descrição. Cada botão leva à primeira página da seção.

## 9. Capa e fecho

```html
<section class="slide dark cv4" data-p="Capa" data-t="Capa" data-nofoot data-desc="…">
  <div class="cv4-bg"></div><div class="cv4-shade"></div>
  <div class="cv4-title">
    <span class="cv4-eye">Alvarez &amp; Marsal · Cliente · Mês AAAA</span>
    <b class="cv4-h cv4-big">Título</b>                         <!-- cv4-big = 128 px; sem ela, 96 px (títulos longos) -->
    <span class="cv4-sub cv4-bigsub">Subtítulo</span>
  </div>
  <div class="cv4-logos"><span class="am"><img data-asset="am_mark_white" alt="A&amp;M" style="height:54px"><span><b>Alvarez &amp; Marsal</b><span>Área ou prática</span></span></span><i></i><span class="cl-wm" style="font-size:28px">Cliente</span></div>
  <div class="cv4-tag">Documento para discussão</div>
</section>
```

Título longo: com `.cv4-big` cabem cerca de 12 caracteres por linha em 820 px de largura. Para títulos com mais de ~24 caracteres, tire a classe `cv4-big` ou quebre em 2 linhas com `<br>`. O fecho segue a mesma estrutura, com `data-p` da última seção, e pode trazer contatos num bloco à direita: `position:absolute;left:900px;top:250px;width:600px`.

## 10. Como encher a altura sem espremer

| Situação | O que fazer |
|---|---|
| Coluna empilhada | Último bloco com `flex:1`. Dentro dele, listas com `flex:1;justify-content:space-evenly`, como `.ex-list`, `.ex-lv`, `.ex-bars` e `.ex-tl`. |
| Tabelas | `.ex-tb` dentro de `.ex-card.ex-fill`, para as linhas dividirem a altura. |
| Sobra grande mesmo assim | Falta conteúdo útil: acrescente uma leitura (`.ex-note`), um indicador ou um exemplo. Não aumente fonte nem padding só para ocupar espaço. |
| Falta espaço | Divida a página em (1/2) e (2/2), ou leve a explicação para `data-desc`. |
