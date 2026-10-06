# DTS · Portfólio Estratégico 2027

Revisão do portfólio de produtos da área **Digital & Technology Services (DTS)** da Alvarez & Marsal Brasil, para o planejamento estratégico.

A apresentação reúne pesquisa de mercado (Brasil e principais consultorias), um diagnóstico dos 29 serviços atuais e a proposta de um novo portfólio de **24 produtos**. Cada produto tem uma ficha de detalhamento própria.

## Arquivos

| Arquivo | O que é |
|---|---|
| `DTS_Portfolio_Estrategico_2027.html` | Apresentação interativa: 26 slides + 24 fichas de produto em um único arquivo. Abra no navegador. |
| `DTS_Portfolio_Estrategico_2027.pdf` | Versão estática para envio: 50 páginas (slides + fichas). |
| `pesquisa/` | Os 4 relatórios de pesquisa completos, com URLs, datas e marcação evidência × hipótese. |
| `src/` | Fontes da apresentação: estilos, motor, dados dos produtos e slides. |
| `build.py` | Gera o HTML único a partir de `src/`, com os logos embutidos. |

## Roteiro da apresentação

1. **Abertura:** capa, resumo executivo, one-page do novo portfólio, seis forças de mercado, benchmark de IA nas consultorias (timeline), raio-X dos 29 serviços e três caminhos estratégicos.
2. **Pilares 1 a 4**, cada um com quatro telas:
   - capa;
   - contexto: compradores, gatilhos de compra e jornada comercial;
   - mercado: o nome que cada concorrente dá à oferta, o que faz com IA, a sobreposição com o DTS e o posicionamento proposto;
   - produtos: antes e depois.
3. **Fechamento:** fábrica de produtos (como produtizar), roadmap de lançamento e decisões para o comitê, além do anexo de fontes.

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
| Abrir o índice | botão `n / 26` |
| Ver as fichas de produto | botão **Fichas de produto** (tecla `P`) |
| Ver fontes e notas do slide | botão **Sobre este slide** (tecla `I`) |
| Tela cheia | tecla `F` |

**Atalhos para as fichas:**
- Na one-page e nas telas de produtos, cada produto é um hiperlink para a sua ficha (`#p=<id>`).
- O link direto também funciona, por exemplo `DTS_Portfolio_Estrategico_2027.html#p=ai-value-governance-office`.

**Efeitos de apresentação:**
- **Spotlight / Focus:** one-page; a tecla `→` percorre os pilares.
- **Morphing Shapes:** capa e capas de pilar.
- **Shimmer / Holographic Sweep:** logo da A&M e produtos novos.
- **Before / After Slider:** telas de produtos.
- **Card Stack:** fábrica de produtos.
- **Timeline Motion:** benchmark e roadmap.

## Evidência × hipótese

- **EVIDÊNCIA:** dado público, com fonte e data.
- **HIPÓTESE:** inferência ou proposta do DTS, a validar.

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
