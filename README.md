# DTS · Portfólio Estratégico 2027

Revisão do portfólio de produtos da área **Digital & Technology Services (DTS)** da Alvarez & Marsal Brasil, para o planejamento estratégico.

A apresentação reúne pesquisa de mercado (Brasil e principais consultorias), um diagnóstico dos 29 serviços atuais e a proposta de um novo portfólio de **24 produtos**. Cada produto tem uma ficha de detalhamento própria.

## Arquivos

| Arquivo | O que é |
|---|---|
| `DTS_Portfolio_Estrategico_2027.html` | Apresentação interativa: 20 slides + 24 fichas de produto em um único arquivo. Abra no navegador. |
| `DTS_Portfolio_Estrategico_2027.pdf` | Versão estática para envio: 48 páginas (20 slides, as 4 vistas de mercado dos pilares em página própria e as 24 fichas). |
| `pesquisa/` | Os 4 relatórios de pesquisa completos, com URLs, datas e marcação evidência × hipótese. |
| `src/` | Fontes da apresentação: estilos, motor, dados dos produtos e slides. |
| `build.py` | Gera o HTML único a partir de `src/`, com os logos embutidos. |

## Roteiro da apresentação (20 slides em 9 capítulos)

A história segue quatro movimentos: o que temos, o que o mercado vive, nossa posição e os novos produtos. Cada capítulo abre com uma transição própria, sem ocupar slide.

| Capítulo | Slides |
|---|---|
| Capa | Campo de partículas (repelir, atrair, pulso, densidade) |
| 01 · O ponto de partida | DTS hoje (4 pilares, 29 serviços, nenhum com IA no método) · portfólio atual com spotlight por pilar |
| 02 · O que o mercado vive | Seis forças que redesenham a demanda · benchmark de IA nas consultorias (linha do tempo de 2026) |
| 03 · Nossa posição | Raio-X dos 29 serviços em matriz interativa · três caminhos estratégicos |
| 04 · O novo portfólio | Antes e depois de serviços para produtos · one-page com os 24 produtos e o botão "Nome de hoje" |
| 05 a 08 · Pilares 1 a 4 | Para cada pilar: transição com morphing e os números do pilar; "Cliente e mercado" com duas vistas (o que o cliente vive / o que o mercado faz, alternadas no seletor do topo ou com →); "Produtos" em antes e depois |
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
- **Fichas de produto:** card hologram com nome, proposta, números e outros produtos do pilar; à direita, os sete blocos da ficha.

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
| Avançar e voltar | `→` / `←` ou os botões no canto inferior direito |
| Abrir o índice | botão `nn / 20` ou tecla `G` |
| Ver as fichas de produto | botão **Fichas de produto** (tecla `P`) |
| Ver fontes e notas do slide | botão **Sobre este slide** (tecla `I`) |
| Tela cheia | tecla `F` |

**Atalhos para as fichas:**
- Na one-page e nas telas de produtos, cada produto é um hiperlink para a sua ficha (`#p=<id>`).
- O link direto também funciona, por exemplo `DTS_Portfolio_Estrategico_2027.html#p=ai-value-governance-office`.

**Efeitos de apresentação (numeração do Guia de Design DTS):**
- **fx 30 · Particle System:** capa.
- **fx 31 · Shimmer / Holographic Sweep:** DTS hoje (painel que carrega e selo DTS com reflexo).
- **fx 24 · Spotlight / Focus:** portfólio atual e one-page; a tecla `→` percorre os pilares.
- **fx 10 · Reveal / Mask Reveal:** seis forças.
- **fx 38 · Timeline Motion:** benchmark 2026 e roadmap.
- **fx 35 · Interactive Matrix:** raio-X.
- **fx 37 · Before / After Slider:** de serviços a produtos e produtos por pilar.
- **fx 26 · Microinteractions:** duas vistas de cliente e mercado.
- **fx 29 · Morphing Shapes:** capítulo de cada pilar.
- **fx 33 · Card Stack:** fábrica de produtos.
- **fx 03 · Hologram 3D Cards:** fichas de produto.

## Fonte × proposta DTS

- **Fonte:** dado público, com fonte e data (indicada no próprio slide e no rodapé).
- **Proposta DTS:** inferência ou proposta nossa, a validar com os sócios.

São hipóteses:
- os escores do raio-X;
- durações, preços e metas;
- os produtos novos.

**Limitação da pesquisa:** a leitura direta de várias páginas estava bloqueada. Por isso, muitos números vieram de imprensa e associações que citam o estudo primário. Confirme cada número no original antes de qualquer uso externo. As lacunas estão listadas no último slide e em `pesquisa/`.

## Editar e regenerar

Os conteúdos ficam em `src/`:
- `src/data.js`: produtos, serviços atuais e timelines;
- `src/slides.html`: estrutura dos slides;
- `src/slides.js`: tabelas, personas e posicionamento.

Depois de editar, gere o HTML de novo:

```bash
python3 build.py
```
