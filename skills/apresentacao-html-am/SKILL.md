---
name: apresentacao-html-am
description: Cria apresentações HTML interativas no padrão Alvarez & Marsal a partir de um molde fixo de 16:9 (quadro 1600×900 que escala com a janela, cabeçalho com marca, faixa de título, rodapé com fonte, trilha de seções, índice, painel "Sobre este slide", ampliação de gráficos, atalhos de teclado, capítulos animados). O resultado é um único arquivo .html autocontido. Use esta skill sempre que o usuário pedir uma apresentação, deck, proposta, relatório executivo, kickoff ou conjunto de slides em HTML ou "para abrir no navegador", citar o molde, o padrão A&M ou a apresentação Axon, quiser transformar um texto, documento, roteiro ou PPTX em páginas desse molde, ou pedir para acrescentar ou alterar páginas num deck feito com ele. Prefira esta skill a gerar PPTX quando o pedido for de apresentação interativa ou em HTML.
---

# Apresentação HTML no molde A&M

Esta skill monta apresentações sobre um molde já validado. O molde define o quadro, a escala, o enquadramento, a navegação e as interações. **O seu trabalho é só o conteúdo**: decidir as páginas, escrever cada uma dentro da área útil e configurar o deck. Não redesenhe a estrutura: ela já passou por testes de geometria e comportamento em 1366×768, 1600×900 e 1920×1080, e qualquer mudança nela quebra essa garantia.

## O que vem no molde (`assets/molde/`)

| Camada | Arquivos | Quem mexe |
|---|---|---|
| 1 · Estrutura fixa | `shell/shell.html`, `shell/frame.css`: quadro 1600×900, `fit()`, cabeçalho, faixa, corpo, rodapé, capítulo, transição | ninguém |
| 2 · Navegação | `shell/nav.js`, `shell/nav.css`: Voltar/Avançar, contador → índice, trilha, “Sobre este slide”, ampliação, `#n`, atalhos, toque, movimento reduzido | ninguém |
| Base | `base/base.css`, `base/base.js`: tipografia da página, entradas animadas, frase-chave animada, layout da capa | ninguém |
| 3 · Conteúdo | `content/<deck>/`: `deck.js`, `slides/*.html`, `theme.css`, `css/*.css`, `assets.js`, `scenes/*.js`, `brand.js`, `meta.json` | você |

`build.py` junta tudo num HTML único. `content/exemplo/` é um deck de referência com 12 páginas, entre elas 3 telas de conteúdo preenchidas com texto-modelo. Abra-o quando precisar ver um bloco funcionando.

## Fluxo de trabalho

1. **Entenda o conteúdo e o público.** Leia o que o usuário mandou (texto, documento, PPTX, anotações). Identifique a mensagem central, o público, a língua e os dados disponíveis. Se faltar algo essencial, como o cliente, o objetivo ou o tamanho aproximado, pergunte uma vez; caso contrário, siga com hipóteses explícitas.

2. **Planeje o deck antes de escrever HTML.** Monte a lista de seções e de páginas. Para cada página defina:
   - `data-t`: nome curto e único;
   - a mensagem (uma frase);
   - o bloco visual que a sustenta (veja `references/blocos.md`);
   - a fonte dos dados.

   Uma mensagem por página. Lidos em sequência, os títulos devem contar a história. Decks de 8 a 20 páginas costumam ter de 3 a 6 seções. Mostre o plano ao usuário quando o deck for longo ou o pedido for ambíguo.

3. **Crie a pasta de trabalho** num diretório gravável:
   ```bash
   python3 <skill>/scripts/new_deck.py <pasta> <nome>          # pacote inicial: capa, 1 página, encerramento
   python3 <skill>/scripts/new_deck.py <pasta> <nome> --exemplo   # parte do exemplo completo de 12 páginas
   ```
   O `<skill>` é a pasta desta skill. Em ambientes onde ela é somente leitura (como no claude.ai), o script copia tudo para `<pasta>`, que pode ser, por exemplo, `/tmp/deck` ou `/home/claude/deck`.

4. **Configure `content/<nome>/deck.js`.** Os campos estão comentados no arquivo:
   - **cabeçalho:** `brandSub`, `rightLabel`, `client`;
   - **rodapé:** `footLabel`;
   - **textos da interface:** `ui` (português por padrão; para deck em inglês, use os valores do comentário);
   - **seções:** `parts`, com a chave igual ao `data-p` das páginas, uma cor para a agenda e um rótulo curto;
   - **cartões de capítulo:** `chapters`;
   - **ampliação:** `zoom`.

   Detalhes em `references/contrato.md`.

5. **Escreva as páginas** em `content/<nome>/slides/NN-secao.html`, um arquivo por seção. Os arquivos entram em ordem alfabética, por isso use os prefixos `00-`, `01-` e assim por diante. Siga o contrato de página abaixo e use os blocos de `references/blocos.md`. Se `css/01-blocos.css` não tiver o que você precisa, crie estilos em `content/<nome>/css/` com um prefixo próprio. Escreva seletores específicos (`.at-risco .barra`), nunca amplos como `.tabela div>span`: todo o CSS fica num arquivo só, e um seletor amplo alcança blocos de outras páginas. Atualize `meta.json` (língua, título, descrição) e, se houver logo do cliente, acrescente a imagem em `assets.js` como data URI.

6. **Monte e valide:**
   ```bash
   python3 <pasta>/build.py <nome>                         # → <pasta>/dist/<nome>.html
   python3 <skill>/scripts/check_deck.py <pasta>/dist/<nome>.html --molde <skill>/assets/molde
   ```
   Corrija **todos os erros** e leia os avisos. Se o ambiente tiver Node e Playwright, rode também o teste no navegador:
   ```bash
   node <skill>/scripts/accept.js <pasta>/dist/<nome>.html <pasta>/dist/accept --shots
   ```
   Ele mede a geometria, acusa texto cortado ou fora do corpo, testa navegação, índice, painel, ampliação e atalhos, e grava um PNG por página. **Abra todos os PNGs e olhe página a página.** O teste não vê quebras visuais causadas por CSS, como barras sumindo, cores trocadas, blocos desalinhados ou espaço vazio no meio do corpo. Nas execuções de teste da skill, uma quebra assim só foi pega olhando o print. Sem navegador, revise com cuidado as alturas estimadas (próxima seção).

7. **Entregue o arquivo** `dist/<nome>.html`. No claude.ai, copie-o para `/mnt/user-data/outputs/`. Diga ao usuário:
   - quantas páginas e seções o deck tem;
   - o que ficou como placeholder ou hipótese;
   - os atalhos principais (→ ←, G índice, I “Sobre este slide”, duplo clique amplia).

**Pedido de alteração num deck pronto (um `.html` único):** edite direto no arquivo. As zonas editáveis estão marcadas com comentários `CAMADA 3 · CONTEÚDO`:
- o bloco `window.DECK`, que é a configuração;
- as `<section class="slide">`, que são as páginas;
- o CSS que fica depois de `CAMADA 3 · CONTEÚDO: tema`.

Não toque nos trechos marcados “não editar”. Antes e depois de editar, rode `check_deck.py` no arquivo. Se ele avisar que o deck usa uma versão anterior do molde, atualize as camadas fixas para receber as correções do motor; o conteúdo não muda:
```bash
python3 <skill>/scripts/atualiza_camadas.py deck.html deck_atualizado.html --molde <skill>/assets/molde
```
Avise o usuário que o deck passou para a versão atual do molde.

## Contrato de uma página

```html
<section class="slide" data-p="2 · Diagnóstico" data-t="Custos por área"
  data-band="Diagnóstico · 60% do gasto está em três contratos" data-c="c-navy" data-bs="Passe o mouse nas barras"
  data-src="Fonte: base de contratos de TI, jan–set 2026."
  data-desc="O que a página mostra, como ler, como interagir; o texto que não coube vai aqui.">
  <div class="body sp fill">
    <div class="stmt2" data-fx-type="word" style="font-size:23px">Frase-chave com <span data-fx-hl>um destaque</span> e, se preciso, <span data-fx-hl>um segundo</span>.</div>
    <div class="gr" style="display:grid;grid-template-columns:1fr 640px;gap:28px;min-height:0"> … blocos … </div>
  </div>
</section>
```

| Atributo | Regra |
|---|---|
| `data-p` | Chave da seção, idêntica à de `DECK.parts`. Gera a trilha, os grupos do índice, o capítulo e “Parte X · Nome” no cabeçalho. |
| `data-t` | Nome único e curto, de até ~28 caracteres. Aparece no cabeçalho, no índice e no painel. |
| `data-band` | Faixa em caixa alta, numa linha, com até ~64 caracteres (menos se houver `data-bs`). Formato “Tema · mensagem”. |
| `data-bs` | Opcional, à direita da faixa: dica de interação ou qualificador curto. |
| `data-c` | Cor da faixa: `c-navy`, `c-blue`, `c-green`, `c-purple` ou `c-red`. |
| `data-src` | Fonte no rodapé, até ~150 caracteres. Acima disso, vira reticências. |
| `data-desc` | Texto de “Sobre este slide”: explicação, leitura, fontes completas e instruções de interação. |
| `data-nofoot` | Só na capa e no fecho. Sem `data-band` também não há cabeçalho nem faixa. |

### Área útil e densidade

- O corpo vai de y 156 a 860 no quadro, com padding de 12 px no topo e 16 px nas laterais. A área útil tem **1544 × 680 px**. Abaixo de uma frase-chave de 2 linhas, sobram cerca de **1542 × 620 px** para a grade `.gr`.
- Tipografia:

  | Elemento | Tamanho |
  |---|---|
  | Frase-chave `.stmt2` | 23–25 px, até 2 linhas (~175 caracteres) |
  | Rótulos `.lbl` | 12,5 px |
  | Sobrancelhas `.eye` | 11 px |
  | Corpo | 12,5–14 px |
  | Notas | 11 px |

  O mínimo é **11 px** para texto e **10 px** para rótulos. Abaixo disso a página não se lê projetada.
- Para estimar sem navegador: uma linha de corpo a 13 px ocupa ~20 px de altura e cabe ~11 caracteres a cada 100 px de largura. Some as alturas dos blocos com os `gap`s e compare com os ~620 px.
- **Se não couber, divida.** Use mais páginas na mesma seção: mesmo `data-p`, `data-t` diferente e faixa com “(1/2)” e “(2/2)”. Explicações longas vão para `data-desc`. O índice, o contador e a trilha se ajustam sozinhos. Nunca reduza a fonte abaixo do mínimo nem crie rolagem.
- Encha a altura com intenção. Um bloco que sobra no meio do corpo parece inacabado. Use `flex:1` no último bloco da coluna, linhas que se distribuem, ou mais conteúdo útil. Veja `references/blocos.md`.
- Cada página precisa de um dispositivo visual (painel, cartões, fases, tabela, gráfico, linha do tempo), não de um muro de texto.

### Interação e ampliação

- Registre todo gráfico ou bloco que valha ampliar: inclua o `id` em `DECK.zoom`. Com isso aparecem o ícone ⤢ e a ampliação por duplo clique.
- Entradas animadas: `data-a="up|zoom|grow|fade|left|right|pop"` com `style="--d:N"` para escalonar. Elas respeitam o movimento reduzido.
- Contadores: use `<span data-count="1230">0</span>`, com a unidade fora do span. O número é formatado conforme o `lang` de `meta.json`: 1,230 em inglês e 1.230 em português.
- Script por página: `ENTER["<data-t>"] = () => {...}` em `scenes/*.js`. Para efeitos com início e fim: `FXR.add(SL("<data-t>"), {play(){…}, stop(){…}})`.

## Conteúdo: o que garante uma boa apresentação

- **Fidelidade.** Use os números, nomes e datas que o usuário forneceu. Não invente dados. O que faltar fica visível como placeholder (por exemplo `[xx]` ou `[a confirmar]`) e entra na lista que você entrega ao usuário.
- **Mensagem antes de forma.** A frase-chave diz o que concluir; a faixa diz o tema; o corpo prova. Se a frase-chave só descreve (“Visão geral dos custos”), reescreva como conclusão (“Três contratos concentram 60% do gasto”).
- **Destaques com parcimônia.** Use um ou dois `data-fx-hl` por frase. O laranja é acento: texto laranja sobre branco usa `#B35F00`.
- **Língua consistente.** Conteúdo e `DECK.ui` na mesma língua.
- **Capa e fecho** têm composição própria (`.cv4`). Troque os textos e mantenha as posições.

## O que não fazer (e por quê)

- **Editar `shell/` ou `base/`, ou sobrescrever as classes delas no CSS do conteúdo** (`.sr-top`, `.sr-band`, `.body`, `.foot`, `#stage`, `#controls`, `#rail`…). Isso desmonta as medidas e o enquadramento que o molde garante. `check_deck.py --molde` acusa camadas alteradas.
- **Usar posição absoluta para empurrar conteúdo** para fora da `.gr`, ou `overflow:auto`/rolagem. Na projeção, o que não aparece não existe.
- **Repetir `data-t`.** O índice, o painel e as cenas encontram a página por ele.
- **Pôr texto longo na página** quando ele explica em vez de mostrar. O painel “Sobre este slide” existe para isso.

## Referências

- `references/contrato.md`: configuração do deck (todos os campos de `DECK`), personalização de cores, logos e língua, comportamentos e atalhos, medidas do quadro, como os testes de aceite funcionam.
- `references/blocos.md`: catálogo de blocos prontos com HTML (texto e números, painel e cartões, fases e tabela, grades de 2 e 3 colunas, corpo escuro, capa e fecho, gráfico SVG ampliável). Comece por aqui ao escrever uma página.
- `assets/molde/content/exemplo/`: o deck de referência completo.
