# DTS · Planejamento Estratégico 2027 (V6)

Apresentação executiva da área **DTS (Digital & Technology Services) da Alvarez & Marsal Brasil**:
"Planejamento Estratégico · Produtos, Serviços e Inteligência Artificial".

O deck parte dos **29 serviços atuais, em 4 pilares**, e propõe **24 produtos**: 5 manter · 15 aprimorar com IA · 4 criar com IA.
Para chegar lá, passa pelas seis forças do mercado, pelo benchmark das consultorias em 2026 e pelo raio-X dos 29 serviços.
Termina na fábrica de produtos, nos jogos de entrada e no roadmap com as decisões que o comitê precisa tomar.
Cada slide tem um verso, aberto pelo botão "Virar a página", com o contexto escrito e as fontes com link.
Cada um dos 24 produtos tem sua ficha.

A **V6** refaz a V5 no layout do modelo APODI e reescreve os 20 slides, os 20 versos, as 24 fichas e as 9 capas de capítulo.
Ela também traz a capa com o monograma A&M em constelação e o mascote AM.

## Arquivos

| Arquivo | O que é |
|---|---|
| `DTS_Portfolio_Estrategico_2027.html` | Apresentação interativa em um arquivo único (cerca de 1,3 MB): 20 slides, 20 versos, 9 capas de capítulo e 24 fichas de produto. |
| `DTS_Portfolio_Estrategico_2027.pdf` | Versão estática para envio, com 84 páginas (cerca de 16 MB). Ver "Impressão e PDF". |
| `src/` | Fontes da apresentação: slides, versos, estilos, scripts e dados. Ver "Estrutura de `src/`". |
| `build.py` | Monta o HTML único a partir de `src/`, com logos e a fonte Barlow Condensed embutidos. |
| `docs/handoff-v6/` | Passagem de bastão (`HANDOFF.md`), especificação (`SPEC.md`), contrato de montagem (`CONTRACT.md`), registro de fatos e fontes, pedidos do usuário e ferramentas de teste (`tools/`). |
| `pesquisa/` | Os 4 relatórios de pesquisa de mercado, com URLs e datas. |
| `prototipo-ciclo-agentico/` | Protótipo em Python, com dados sintéticos, de um ciclo de automação agêntica de processos (32 testes). Não faz parte do deck. |

## Como abrir

- Dê dois cliques em `DTS_Portfolio_Estrategico_2027.html` para abrir no Chrome ou no Edge. Não precisa de servidor nem de instalação.
- O palco tem 1600 × 900 e se ajusta à janela, de 1280 × 720 a 2560 × 1440, sem rolagem.
- Sem internet, a apresentação funciona igual: a Barlow Condensed dos títulos vai embutida e a Inter do texto cai para Helvetica ou Arial, como no modelo APODI.
- Os links de produto abrem a ficha. O endereço também funciona direto: `#7` abre o slide 7 e `#p=ai-value-governance-office` abre a ficha 1.7.

## Roteiro: 20 slides em 5 partes

As capas de capítulo e as fichas não contam como slide.
Cada capa abre uma parte ou um pilar, com um efeito do guia de design DTS, e não vai para o PDF.

| Parte (capa e efeito) | Slides |
|---|---|
| Abertura | 01 Capa (monograma A&M em constelação, Particle System que repele e atrai, digitação animada) · 02 Sumário (trilha de cinco paradas e estreia do mascote AM) |
| 1 · O ponto de partida (Floating Elements) | 03 DTS hoje (Shimmer e escudo DTS) · 04 Portfólio atual (Spotlight por pilar) |
| 2 · O que o mercado vive (Animated Shader e Pulse) | 05 Seis forças (rede de nós) · 06 Benchmark 2026 (Timeline Motion) |
| 3 · Nossa posição (Heatmap) | 07 Raio-X dos 29 serviços e Três caminhos (matriz qualitativa, sem escores; duas vistas) |
| 4 · O novo portfólio (Hologram 3D Cards e contador) | 08 De serviços a produtos (antes e depois, 29 → 24) · 09 One-page dos 24 produtos (conectores, spotlight, "Nome de hoje") |
| Pilares 1 a 4 (Motion Graphics, Icon Motion e contador) | 10–17: para cada pilar, "Cliente e mercado" e "Produtos", cada um com duas vistas (grafo que muda de forma; antes e depois) |
| 5 · Como fazer acontecer (BPMN Flow) | 18 Fábrica de produtos (sete portões, Card Stack) · 19 Jogos de entrada (cartas que viram) · 20 Roadmap e decisões (trilha de quatro ondas e "O chamado": as quatro decisões do comitê) |

Todo slide segue o mesmo padrão: título que afirma a conclusão, subtítulo, prova e a barra "E daí?".

## Novo portfólio · resumo

| Pilar (serviços → produtos) | Manter | Aprimorar com IA | Criar com IA |
|---|---|---|---|
| **1 · IT Advisory** (10 → 7) | 1.3 Interim & Embedded Tech Leadership ★ | 1.1 Tech & AI Value Diagnostic · 1.2 Tech & AI Strategy Roadmap · 1.4 AI-Era Tech Operating Model · 1.5 Tech Spend Optimization & Spend Radar ★ · 1.6 Tech Tax & Innovation Incentives | 1.7 AI Value & Governance Office |
| **2 · Technology Transformation** (7 → 6) | 2.4 Tech Project Rescue ★ | 2.1 AI-Accelerated Sourcing & Vendor Selection · 2.2 ERP & Tax Reform Readiness · 2.3 Predictive Transformation Office · 2.5 AI Adoption & Change | 2.6 AI-Native IT Productivity (com o módulo de automação agêntica de processos) |
| **3 · Tech M&A** (8 → 5) | 3.3 Integration & Separation Office · 3.4 Tech Value Creation Plan | 3.1 AI-Powered Tech Due Diligence ★ · 3.2 Integration & Separation Blueprint | 3.5 Private Equity Tech Value Radar |
| **4 · Modernization** (4 → 6) | 4.4 Complex Migration Assurance | 4.1 AI-Ready Enterprise Architecture · 4.2 Application Portfolio Rationalization · 4.3 Cloud & AI Infrastructure Economics · 4.5 IT Resilience & Recovery | 4.6 Legacy X-Ray & AI Modernization |

★ = A&M Signature, os 4 produtos em que o direito de vencer da A&M é maior.
A base comum dos 24 é a **Plataforma de Dados e AI**.

O que muda em relação aos 29 serviços:
- 13 serviços que se sobrepunham viram 6 produtos.
- 2 deixam de ser vendidos sozinhos: o IT Business Partner entra no 1.3 e o IT M&A Playbook vira o motor do 3.5.
- A resiliência passa do Pilar 1 para o Pilar 4 (4.5).

**Nomes propostos dos pilares.** São proposta da V5 e aparecem no deck como "nome proposto, a aprovar":
- IT Advisory · Strategy, Leadership & Value
- Technology Transformation
- Tech M&A & Value Creation
- Modernization & AI-Ready Technology

## Como navegar

| Ação | Como fazer |
|---|---|
| Avançar e voltar | `→` / `←` (também `Espaço`, `PageDown` e `PageUp`), os botões **Avançar** e **Voltar**, ou deslizar o dedo na tela. Nos slides com passos ou duas vistas, `→` percorre os passos antes de trocar de slide; `←` volta ao slide anterior na última vista. Ao entrar numa parte, a capa aparece e o próximo `→` a fecha. |
| Primeiro e último slide | `Home` / `End` |
| Virar a página (verso) | botão **Virar a página** ou tecla `V`. O verso traz o contexto escrito em quatro blocos ("O que esta página afirma", "Por que isso pesa", "Como chegamos aqui", "O que ainda vamos validar"), a leitura do AM e as fontes com link. `V`, `Esc` ou o botão **Desvirar** voltam à frente; trocar de slide também desvira. |
| Fichas de produto | botão **Fichas de produto** ou tecla `P`. Com uma ficha aberta, os botões passam a **Ficha anterior** e **Próxima ficha** (também `←` e `→`), e `Esc` volta à apresentação. Na one-page, nas telas de produtos e nas capas dos pilares, clicar num produto abre a ficha dele. |
| Índice | botão `nn / 20` ou tecla `G` |
| Partes | abas da barra inferior: Abertura, Partida, Mercado, Posição, Portfólio, Pilares e Execução |
| Tela cheia | tecla `F` |
| Movimento reduzido | com a opção ligada no sistema, as animações mostram direto o estado final |

## Impressão e PDF

A impressão monta páginas estáticas, no estado final de cada slide, nesta ordem:
1. Para cada slide, a frente e, quando houver, a segunda vista.
2. Logo depois, o verso com o contexto e as fontes.
3. Depois, as páginas de detalhe:
   - o portfólio atual pilar a pilar;
   - as seis forças;
   - os eventos de 2026;
   - o raio-X por pilar;
   - a ponte 29 → 24 pilar a pilar;
   - a one-page com o nome de hoje e pilar a pilar;
   - os sete portões;
   - os quatro jogos.
4. No fim, as 24 fichas.

O PDF entregue tem 84 páginas: 20 frentes, 9 segundas vistas, 20 versos, 11 páginas de detalhe e 24 fichas.
Todas as fontes vão embutidas e não há página em branco. Nas páginas, os links de produto levam à ficha e as marcas [n] do verso levam à fonte.

- **Pelo navegador:** `Ctrl+P` (`Cmd+P` no Mac) → Salvar como PDF. O tamanho da página (1600 × 900) e as margens zero já vêm definidos. Deixe ligados os gráficos de plano de fundo.
- **Pela linha de comando:** `node docs/handoff-v6/tools/pdf.js DTS_Portfolio_Estrategico_2027.html DTS_Portfolio_Estrategico_2027.pdf --ordem`
  - Gera o mesmo PDF pelo caminho preparado.
  - Confere a ordem, as fontes embutidas, as páginas em branco e as páginas com corpo vazio.
  - Monta uma folha de contato em `DTS_Portfolio_Estrategico_2027_check/`, que não deve ir para o repositório.
- **Por que tem cerca de 16 MB:** a Inter vai embutida como Type 3. Para um PDF menor, versione `docs/fonts/pdf-fonts.css` com Inter e JetBrains Mono estáticas; o `pdf.js` usa o arquivo se ele existir.

## Estrutura de `src/`

| Pasta ou arquivo | Conteúdo |
|---|---|
| `slides/NN-*.html` | Um arquivo por slide (01 a 20). A ordem alfabética é a ordem dos slides. |
| `versos/NN-*.html` | O verso de cada slide: contexto (300 a 380 palavras, em quatro blocos), a frase do AM e as fontes `<li data-f="id">`. |
| `css/30-sNN-*.css`, `js/30-sNN-*.js` | Estilo e comportamento de cada slide. Todo o JS fica dentro de uma IIFE, sem nome global novo. |
| `css/02-componentes.css`, `css/05-icons.css`, `js/02-helpers.js`, `js/05-icons.js` | Componentes e ícones comuns. |
| `css/07-verso.css`, `js/07-verso.js` | "Virar a página" e o verso. |
| `css/06-mascote.css`, `js/06-mascote.js` | Mascote AM (`window.AMMasc`, 10 poses). |
| `css/07-monograma.css`, `js/07-monograma.js` | Monograma A&M em constelação da capa (`window.AMMono`). |
| `css/25-pilares.css`, `js/25-pilares.js` | Motor compartilhado dos slides de pilar (10 a 17). |
| `css/28-capas.css`, `js/28-capas.js` | As 9 capas de capítulo e o efeito de cada uma. |
| `css/40-fichas.css`, `js/40-fichas.js` | As 24 fichas de produto. |
| `styles.css`, `engine.js`, `core.js`, `js/99-boot.js` | Moldura APODI, navegação, índice, abas, impressão e partida. |
| `data/00-base.js` | Os 4 pilares (nomes de hoje e propostos), os 29 serviços (`OLD`) e a ponte para os produtos. |
| `data/01-capitulos.js` | As cinco partes, as abas e as capas de capítulo. |
| `data/05-fontes.js`, `data/06-fatos-<dono>.js` | O registro de fontes e fatos: 199 fontes e 229 fatos, dos quais 128 verificados (30/10/2026). |
| `data/11…14-produtos-pN.js` | As 24 fichas, por pilar. |
| `data/20-timelines.js`, `data/30-jogos.js` | A linha do tempo de 2026, as ondas do roadmap e os 4 jogos de entrada. |
| `assets/` | Logos A&M e DTS e a fonte Barlow Condensed. A pasta `equipe/` existe, mas o build não a usa: o deck não mostra pessoas. |

## Build e verificação

```bash
python3 build.py --out /caminho/deck.html   # trabalho e testes (não toca no arquivo principal)
python3 build.py --final                    # escreve DTS_Portfolio_Estrategico_2027.html
```

O build recusa rodar sem `--out` ou `--final`.
As ferramentas de teste ficam em `docs/handoff-v6/tools/` e usam Node e Playwright. O `CONTRACT.md` explica o uso de cada uma.

| Ferramenta | O que confere |
|---|---|
| `audit.js` | Cada slide, vista, verso e ficha: texto que passa do corpo ou é cortado, quebra de linha em rótulos, vazio no fim do corpo, letra pequena, laranja sobre claro, palavras e fontes do verso, fato fora do registro, erros de console. Também lista siglas e números para conferir. |
| `nav.js`, `resp.js` | A navegação inteira e a escala de 1280 × 720 a 2560 × 1440. |
| `fichas.js` | As 24 fichas. |
| `buildcheck.py` | A montagem: um script por arquivo, ativos embutidos, nada de fotos de pessoas. |
| `pdf.js` | Gera o PDF pelos dois caminhos: `--ordem` (o preparado) e `--ctrlp` (o do Ctrl+P real). Confere a ordem, as fontes embutidas, as páginas em branco e as páginas com corpo vazio. |
| `shot.js`, `sheet.py` | Capturas e folhas de contato. |

Resultado na entrega da V6 (30/10/2026):
- `audit.js` com fichas e sem rede: 0 apontamentos.
- `nav.js`: 70 de 70.
- `resp.js`: 87 de 87.
- `fichas.js`: 17 de 17.
- `buildcheck.py`: ok.
- `pdf.js`, nos dois caminhos: 84 páginas, sem página em branco nem com corpo vazio.

## Regras da casa

- **Fatos verificados.** Número de mercado só aparece se vier de um fato com status "verificado" no registro (`<span data-fato="id">`), com a fonte no verso. Fora isso, só contagens do próprio portfólio (4 pilares, 29 serviços, 24 produtos, 5 · 15 · 4, 4 · 13 · 10 · 2). Prazos, preços, metas, escores e tamanhos de amostra aparecem em palavras.
- **Fatos fracos, divergentes ou a verificar.** Os fracos aparecem só em texto, com a ressalva; os divergentes e os "a verificar" não entram.
- **Siglas.** Só TI, IA, A&M, DTS, CEO, CFO, CIO, CTO, ERP, M&A, RH, SAP e LGPD. As demais vão por extenso ou explicadas na primeira menção, como CBS e IBS ("novos tributos sobre consumo") e ECC ("versão antiga do ERP da SAP"). Nomes de produto em inglês ficam, sem sigla entre parênteses.
- **No máximo 20 slides.** Capas de capítulo e fichas não contam.
- **Uma linha** por título, subtítulo, rótulo, chip e nome: nada cortado, sem reticências e sem vazio grande. O corpo do texto tem no mínimo 13 px e as notas, 11 px.
- **Layout no modelo APODI.** O laranja é só detalhe, nunca texto sobre fundo claro.
- **Nenhuma pessoa da A&M** (nome, foto, cargo ou perfil) em lugar nenhum. Concorrentes e organizações aparecem como instituição.

## Decisões tomadas

- **2.7 Agentic Process Automation é módulo do 2.6** (AI-Native IT Productivity), e não um 25º produto. Os 24 produtos e a divisão 5 · 15 · 4 continuam. A one-page, o slide 13 e a ficha 2.6 mostram o módulo.
- Os nomes propostos dos pilares continuam como proposta da V5, a aprovar.
- O raio-X é qualitativo e não usa escores.
- A capa usa o monograma A&M redesenhado em constelação. A reconstrução 3D fiel foi reprovada.

## O que fica para o comitê ou para validar

- **As quatro decisões do slide 20 ("O chamado"):**
  1. Aprovar os 24 produtos (5 · 15 · 4, com os 4 Signature à frente) e os nomes propostos dos pilares.
  2. Dar um dono para cada produto.
  3. Abrir a Onda 0, com 2.2 e 1.5 a tempo da primeira apuração da CBS e do orçamento de IA de 2027.
  4. Investir na Plataforma de Dados e AI em etapas, com o custo de cada etapa voltando ao comitê.
- **A calibrar nos pilotos e com os sócios:**
  - Prazo, preço, metas e indicadores de cada produto. São proposta DTS e aparecem em palavras.
  - Os níveis de demanda e de direito de vencer do raio-X. São leitura nossa.
  - O uso do A&M Assist no Brasil (3.1 e one-page), que ainda precisa ser confirmado.
- **A conferir nas fontes:**
  - 42 dos fatos acrescentados em 30/10/2026 foram conferidos só por trechos de busca, porque a rede bloqueava a leitura da página. Quando a rede liberar, abra cada página e confirme o trecho. A lista está em `docs/handoff-v6/HANDOFF.md` §11, começando pelos 18 que mostram número no deck.
  - Os 94 fatos "a verificar" ficam fora do deck até alguém conferir.
- **Limpeza do registro:** fundir as duplicatas listadas no `HANDOFF.md` §9. Isso não muda o que o deck mostra.
