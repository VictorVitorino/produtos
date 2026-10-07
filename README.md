# DTS · Portfólio Estratégico 2027

Revisão do portfólio de produtos da área **Digital & Technology Services (DTS)** da Alvarez & Marsal Brasil, para o planejamento estratégico.

A apresentação reúne pesquisa de mercado (Brasil e principais consultorias), um diagnóstico dos 29 serviços atuais e a proposta de um novo portfólio de **24 produtos**. Cada produto tem uma ficha de detalhamento própria.

## Arquivos

| Arquivo | O que é |
|---|---|
| `DTS_Portfolio_Estrategico_2027.html` | Apresentação interativa: 20 slides + 24 fichas de produto em um único arquivo. Abra no navegador. |
| `DTS_Portfolio_Estrategico_2027.pdf` | Versão estática para envio, gerada pela impressão do HTML: 56 páginas (20 slides, a segunda vista de cada slide de pilar em página própria, 4 páginas de detalhe e as 24 fichas). As páginas de detalhe trazem as seis forças, a one-page com o nome de hoje, os sete eventos da linha do tempo de 2026 e os sete passos da fábrica. Nas páginas do PDF, os links de produto levam à ficha correspondente. |
| `pesquisa/` | Os 4 relatórios de pesquisa completos, com URLs, datas e marcação evidência × hipótese. |
| `src/` | Fontes da apresentação: estilos, motor, dados dos produtos e slides. |
| `build.py` | Gera o HTML único a partir de `src/`, com os logos embutidos. |

## Roteiro da apresentação (20 slides em 9 capítulos)

A história segue cinco movimentos: o que temos, o que o mercado vive, nossa posição, o que melhorar e os novos produtos. Cada capítulo abre com uma transição própria, sem ocupar slide.

| Capítulo | Slides |
|---|---|
| Capa | Campo de partículas (repelir, atrair, pulso, densidade) |
| 01 · O ponto de partida | DTS hoje (4 pilares, 29 serviços, nenhum com IA no método) · portfólio atual com spotlight por pilar |
| 02 · O que o mercado vive | Seis forças que redesenham a demanda · benchmark de IA nas consultorias (linha do tempo de 2026) |
| 03 · Nossa posição | Raio-X dos 29 serviços em matriz interativa · três caminhos estratégicos |
| 04 · O novo portfólio | Antes e depois de serviços para produtos, com a ponte 29 → 24 (5 manter · 15 aprimorar · 4 criar) · one-page com os 24 produtos e o botão "Nome de hoje" |
| 05 a 08 · Pilares 1 a 4 | Para cada pilar: transição com morphing e os números do pilar; "Cliente e mercado" com duas vistas (o que o cliente vive / o que o mercado faz, alternadas no seletor do topo ou com →); "Produtos" com duas vistas: o grafo que muda de forma (Hoje → Produtos → Com IA) com os cards dos produtos, e o antes e depois linha a linha |
| 09 · Como fazer acontecer | Fábrica de produtos (card stack) · roadmap e decisões para o comitê · fontes e método |

## Sistema visual

Segue a mesma linguagem da apresentação DTS Tech M&A, a partir do Guia de Design DTS:

- **Tokens do guia:** navy 950–500, steel e laranja #F26B21.
- **Tipografia:** Inter 800 nos títulos e JetBrains Mono em rótulos, etiquetas e números de capítulo.
- **Duas superfícies:**
  - *paper*, claro com grade fina, para contexto e mercado;
  - *stage*, navy profundo, para one-page, produtos, roadmap e fichas.
- **Cabeçalho de cada slide:** topo leve com logos A&M e DTS, capítulo e página; rótulo mono, título de uma linha com destaque laranja sublinhado e texto de apoio à direita.
- **Rodapé:** fonte do slide e o efeito do guia usado (número, nome e dose).
- **Fichas de produto (modelo Playbook):** card hologram com status, nome, proposta, público, formato e encaixe, origem e "Por que A&M"; à direita, o problema, o que o cliente recebe, como funciona, o produto em números, papel da IA, como vira produto, ferramentas e dados, skills e fontes. As letras têm o mesmo tamanho em todas as fichas (dois degraus); o ajuste ao palco fica nos espaçamentos.

## Modelos da apresentação DTS Tech M&A

Quatro telas da apresentação de referência serviram de modelo:

| Modelo de referência | Onde está no portfólio |
|---|---|
| "Todo risco de TI vira preço, multa ou valor perdido" (rede de nós) | Slide 4 · Forças de mercado. Cada força acende as exigências do cliente que puxa, e o painel mostra número, fonte, leitura DTS e os produtos que respondem. No PDF, uma página extra traz as seis forças completas. |
| "Um sistema, não um catálogo" (colunas ligadas a um fio) | Slide 9 · One-page. Colunas por pilar com cards de produto, conectores até o fio laranja e a base "Plataforma de Dados e AI". O spotlight e o modo "Nome de hoje" continuam. |
| "Tech M&A Playbook" (página de produto) | As 24 fichas de produto. |
| "Separar sem parar" (grafo que muda de forma e cards) | Slides 11, 13, 15 e 17 · Produtos por pilar. Na 1ª vista, o grafo em três estados (Hoje → Produtos → Com IA) e os cards com "Evolui de". Na 2ª vista, o antes e depois linha a linha. |

## Novo portfólio · resumo

| Pilar | Manter | Aprimorar com IA | Criar com IA |
|---|---|---|---|
| **1 · IT Advisory** (10 → 7) | 1.3 Interim & Embedded Tech Leadership ★ | 1.1 Tech & AI Value Diagnostic · 1.2 Tech & AI Strategy Roadmap · 1.4 AI-Era Tech Operating Model · 1.5 Tech Spend Optimization & Spend Radar ★ · 1.6 Tech Tax & Innovation Incentives | 1.7 AI Value & Governance Office |
| **2 · Technology Transformation** (7 → 6) | 2.4 Tech Project Rescue ★ | 2.1 AI-Accelerated Sourcing & Vendor Selection · 2.2 ERP & Tax Reform Readiness · 2.3 Predictive Transformation Office · 2.5 AI Adoption & Change | 2.6 AI-Native IT Productivity |
| **3 · Tech M&A** (8 → 5) | 3.3 Integration & Separation Office (IMO/SMO) · 3.4 Tech Value Creation Plan | 3.1 AI-Powered Tech Due Diligence ★ · 3.2 Integration & Separation Blueprint | 3.5 PE Tech Value Radar |
| **4 · Modernization** (4 → 6) | 4.4 Complex Migration Assurance | 4.1 AI-Ready Enterprise Architecture · 4.2 Application Portfolio Rationalization · 4.3 Cloud & AI Infrastructure Economics · 4.5 IT Resilience & Recovery | 4.6 Legacy X-Ray & AI Modernization |

★ = A&M Signature, onde o direito de vencer é maior.

**Mudanças no portfólio atual:**
- **Saem como produto isolado:** IT Business Partner (absorvido pelo 1.3) e IT M&A Playbook (passa a ser o motor do 3.5).
- **Fusões:** 13 serviços que se sobrepunham viram 6 produtos.

## Como navegar

| Ação | Como fazer |
|---|---|
| Avançar e voltar | `→` / `←` ou os botões no canto inferior direito. Nos slides com passos internos (spotlight, seis forças, grafo dos produtos, cards da fábrica, ondas do roadmap), `→` percorre os passos antes de trocar de slide; `←` abre o slide anterior na última vista ou passo |
| Abrir o índice | botão `nn / 20` ou tecla `G` |
| Ver as fichas de produto | botão **Fichas de produto** (tecla `P`). Com uma ficha aberta, os botões de baixo viram **Ficha anterior** e **Próxima ficha**, e `Esc` volta à apresentação |
| Ver fontes e notas do slide | botão **Sobre este slide** (tecla `I`) |
| Tela cheia | tecla `F` |

**Atalhos para as fichas:**
- Na one-page e nas telas de produtos, cada produto é um hiperlink para a sua ficha (`#p=<id>`).
- O link direto também funciona, por exemplo `DTS_Portfolio_Estrategico_2027.html#p=ai-value-governance-office`.

**Efeitos de apresentação (numeração do Guia de Design DTS):**
- **fx 30 · Particle System:** capa.
- **fx 31 · Shimmer / Holographic Sweep:** DTS hoje (painel que carrega e selo DTS com reflexo).
- **fx 24 · Spotlight / Focus:** portfólio atual e one-page; a tecla `→` percorre os pilares.
- **fx 39 · Node Network Motion:** seis forças.
- **fx 18 · Connector / Flow Line:** one-page.
- **fx 38 · Timeline Motion:** benchmark 2026 e roadmap.
- **fx 35 · Interactive Matrix:** raio-X.
- **fx 37 · Before / After Slider:** de serviços a produtos e produtos por pilar.
- **fx 26 · Microinteractions:** duas vistas de cliente e mercado.
- **fx 29 · Morphing Shapes:** capítulo de cada pilar e grafo dos produtos.
- **fx 33 · Card Stack:** fábrica de produtos.
- **fx 03 · Hologram 3D Cards:** fichas de produto.

## Fonte × proposta DTS

- **Fonte:** dado público, com fonte e data (indicada no próprio slide e no rodapé).
- **Proposta DTS:** inferência ou proposta nossa, a validar com os sócios. Nas fichas, os números sem fonte (metas e desenho do produto) levam essa marca.
- **Não verificado:** leitura de mercado sem fonte primária confirmada.
- **A alinhar:** parceria interna da A&M ainda a combinar com a outra área.

São hipóteses:
- os escores do raio-X;
- durações, preços e metas;
- os produtos novos.

**Limitação da pesquisa:** a leitura direta de várias páginas estava bloqueada. Por isso, muitos números vieram de imprensa e associações que citam o estudo primário. Confirme cada número no original antes de qualquer uso externo. As lacunas estão listadas no último slide e em `pesquisa/`.

## Editar e regenerar

Os conteúdos ficam em `src/`:
- `src/data.js`: produtos, serviços atuais e timelines;
- `src/slides/NN-*.html`: estrutura de cada slide;
- `src/slides.js` e `src/js/*.js`: tabelas, personas, posicionamento e os módulos de forças, one-page, produtos por pilar e fichas;
- `src/styles.css` e `src/css/*.css`: estilos (o `90-revisao.css` e o `91-revisao-2.css` reúnem os ajustes das duas rodadas de revisão e a impressão).

Depois de editar, gere o HTML de novo:

```bash
python3 build.py
```
