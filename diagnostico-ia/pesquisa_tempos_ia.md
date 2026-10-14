# Pesquisa: tempo com e sem IA por entregável (casos verificados)

Casos encontrados: 109 · verificados na fonte: 37

# Horas por entregável com e sem IA (Claude): análise baseada em casos verificados

**Conclusão:** do zero, a IA corta cerca de **−40% a −55%** do tempo. Com uma base reaproveitada dentro da IA (Skill, Método, proposta anterior), o corte sobe para **−72% a −85%** em relação ao trabalho sem IA feito do zero. A faixa anterior (−25% a −56%) é o que os RCTs mediram com ferramentas de 2022–2024. Ela é correta para tarefa isolada do zero, mas fica abaixo do ganho de um fluxo com base reutilizável.

**Como ler a tabela:**
- **Horas-base são premissas** de uma consultoria típica. Não foram medidas e precisam ser calibradas com o timesheet da equipe.
- **Os percentuais são ancorados** nos casos verificados.
- **"Derivado"** marca as linhas sem medição direta do entregável.

---

## 1) Tabela por entregável

| Entregável (escopo da premissa) | Sem IA, do zero (h) | Com IA, do zero (h) | Sem IA, com base (h) | Com IA + base/Skill (h) | % redução: zero / base / total | Fontes (âncora) | Confiança |
|---|---|---|---|---|---|---|---|
| **Proposta comercial** (10–15 p., escopo, cronograma, preço) | 16 | 9 | 8 | 3 | −44% / −63% / **−81%** | Piso RCT: carta persuasiva 111→82/72 min (−26%/−35%), Schwarcz 2025. Contrato do zero 70→48 min (−32%), Choi 2024. Rascunho 13:48→8:12 (−41%), MS WorkLab. Com base: TRY −40%, Novo Nordisk −90% na escrita a partir de templates, Quantium "até −90%", KANE "semanas→minutos" (todos de fornecedor). **Contra:** NDA com template −6%/−14%, não significativo. | Média (do zero); baixa (com Skill) |
| **Apresentação PPT com indicadores** (~12 slides, 6–8 gráficos, dados prontos) | 10 | 5 | 4 | 1,5 | −50% / −63% / **−85%** | **Derivado** (não há RCT verificado de PPT). Rascunho −41% (MS). Parlan 1/8 do tempo, a partir de material existente (fornecedor). Presidio: Word→PPT de "horas para minutos" (fornecedor). "Compilar info de relatórios" −95% (estimativa de modelo da Anthropic, teto). **Contra (não verificado):** DBT/UK PPT −42% de tempo, mas pior em qualidade e precisão. | Baixa |
| **Dashboard de indicadores** (8–10 KPIs, 2–3 fontes) | 24 | 12 | 10 | 4 | −50% / −60% / **−83%** | **Derivado** de evidência de código. Peng: 161→71 min (−56%, RCT). Google: 114→96 min (−16% bruto, −21% ajustado, RCT). Software 3,3 h→15 min (Anthropic Econ Index, modelo, 61% de sucesso). Recorrente: relatório de 2 h/mês→10 s depois de automatizado (HireEffect, fornecedor; exclui o tempo de construção). | Baixa-média |
| **Sistema simples** (app interno CRUD/protótipo, 3–5 telas) | 40 | 18 | 28 | 6 | −55% / −79% / **−85%** | Peng −56% (RCT, servidor HTTP greenfield). Google −16%/−21% (RCT, código corporativo). Pictet: protótipo em "2 h em vez de 2 semanas" (fornecedor). Rakuten: 24→5 dias (fornecedor, com processo redesenhado). Anthropic: 3,3 h→15 min (modelo). **Contra:** METR −19% em base de código madura (não verificado); estudo Anthropic com lib nova, ~0%. **Se for produção** (segurança, integração, testes), usar −20% a −40% (Google). | Média (protótipo do zero); baixa (com Skill) |
| **Análise de redução de custos** (spend de 12 meses, alavancas, cenários) | 32 | 20 | 20 | 9 | −38% / −55% / **−72%** | **Derivado**. Burke: 30–40 h→4–6 h (fornecedor, teto). Analista financeiro −80% (modelo Anthropic, sem revisão). **Contra (não verificados):** BCG fora da fronteira com −19 p.p. de acerto; DBT Excel mais lento e pior. o1 com 11 alucinações contra 4 sem IA (Schwarcz). Há validação obrigatória dos números. | Baixa |
| **Gestão de projetos: status report semanal** (por semana) | 3 | 1,5 | 2 | 0,5 | −50% / −75% / **−83%** | Resumo de reunião 42:34→11:13 (−74%), com leve perda de completude (11 contra 12 de 15 itens; MS, n=60, não randomizado). Tarefas comuns −29% (MS, RCT n=147). Campo: e-mail −25% (Dillon, RCT com 6 mil pessoas; reuniões sem mudança). XP: governança −7%, auditoria +30% de eficiência (fornecedor). | Média |
| **Total da carteira (1 de cada)** | **125** | **65,5** | **72** | **24** | **−48% / −67% / −81%** | Soma | — |

**Faixas de evidência** (piso medido → central recomendado → teto de fornecedor ou modelo):

| Entregável | Piso medido (RCT) | Central (tabela, total com Skill) | Teto (fornecedor/modelo) |
|---|---|---|---|
| Proposta | −26% a −35% (com template, ~0%) | −81% | −90% / −99% |
| PPT indicadores | −41% (rascunho) | −85% | −87,5% / −95% |
| Dashboard | −16% a −56% | −83% | −92% / −99,9% (recorrente) |
| Sistema simples | −16% a −56% | −85% | −92% / −97,5% |
| Redução de custos | sem RCT verificado (sinais negativos) | −72% | −80% / −86% |
| Status report | −25% a −29% (campo/lab) | −83% | −74% (componente de resumo) |

**Ganho anual no status report:** 46 semanas × (3 h − 0,5 h) ≈ **115 h economizadas por projeto por ano** (138 h → 23 h). É uma estimativa derivada.

---

## 2) Concordo ou discordo que −25% a −56% subestimava o ganho?

**Concordo em parte.**

**Onde você tem razão:**
- **Ferramentas antigas e tarefas isoladas.** −25% a −56% é exatamente a faixa dos RCTs. Eles usaram ferramentas de 2022–2024 (autocomplete do Copilot, GPT-4 em chat, o1-preview), tarefas curtas e isoladas, participantes sem treino e sem base própria dentro da IA. Medem uma tarefa média, não um entregável de consultoria montado por um Claude agêntico que gera o PPT, o dashboard ou o protótipo inteiro.
- **A base reutilizável é o grande multiplicador, desde que esteja dentro da IA.** Os casos com maior ganho são justamente os que têm base: Novo Nordisk (templates + texto aprovado, −90% na escrita), KANE (preço a partir de projetos passados), Quantium (sistema próprio de propostas). São de fornecedor e têm confiabilidade baixa.
- **Montagem ganha mais do que julgamento.** Em tarefas de montagem (PPT, dashboard, protótipo, status report), o teto medido ou estimado fica em 74–95%.

**Onde a evidência não acompanha:**
1. **Nenhuma medição independente verificada passa de −56% de ponta a ponta.** Todo número acima disso vem de fornecedor (sem método e, muitas vezes, em tempo de calendário, não de esforço) ou de estimativa de modelo que exclui revisão. A própria Anthropic avisa que os RCTs acham menos.
2. **A percepção infla o ganho.** No estudo da Microsoft, os usuários estimaram 36 min economizados quando o medido foi 12 min (3x). No METR (não verificado), desenvolvedores se sentiram +20% mais rápidos e estavam −19% mais lentos.
3. **O template sozinho já captura boa parte do ganho.** Com template, o NDA não teve ganho significativo de IA. Por isso a tabela compara "IA + Skill" também contra "sem IA com base": o ganho atribuível à IA ali é −55% a −79%, não −80%+.
4. **Qualidade e precisão.** o1 quase triplicou as alucinações. O resumo de reunião saiu menos completo. Análise de dados em Excel e tarefas fora da fronteira tiveram sinais negativos (não verificados). Em análise de custos, a revisão não diminui.
5. **O ganho no dia é bem menor que o ganho na tarefa.** No campo, os números caem: −25% em e-mail com reuniões sem mudança (Dillon), −7% em governança (XP) e ~3% da jornada na Dinamarca (não verificado).

**Síntese:** a faixa antiga estava certa para "tarefa do zero com IA genérica". Para "entregável com base/Skill e Claude atual", −70% a −85% é defensável **como estimativa derivada**, não como dado medido. Do zero e com julgamento pesado (proposta, análise de custos), o honesto é −40% a −55%.

---

## 3) Top 6 fontes mais fortes

| # | Fonte | Tipo / confiança | Resumo |
|---|---|---|---|
| 1 | Schwarcz et al. 2025, *AI-Powered Lawyering* | RCT, alta | Carta persuasiva caiu de 111 para 72–82 min (−26% a −35%). Com template, a IA não trouxe ganho significativo. |
| 2 | Peng et al. 2023, GitHub Copilot (arXiv 2302.06590) | RCT, média-alta | Sistema simples do zero: de 161 para 71 min (−56%). É o melhor caso, numa tarefa greenfield bem especificada. |
| 3 | Choi, Monahan & Schwarcz 2024, Minn. L. Rev. | RCT, alta | Contrato do zero caiu de 70 para 48 min (−32%) e petição de 161 para 122 min (−24%). A qualidade praticamente não mudou. |
| 4 | Microsoft WorkLab 2023 (Copilot early users) | Lab controlado (n=147 e n=60), média | Rascunho −41% e resumo de reunião de 43 para 11 min (−74%), com leve perda de completude. Os usuários acham que economizam 3x mais do que o medido. |
| 5 | Paradis et al. 2024, Google (ICSE 2025) | RCT, alta | Em tarefa complexa no código da empresa, de 114 para 96 min (−16% bruto, −21% ajustado). Em ambiente real, o ganho é moderado. |
| 6 | Dillon et al. 2025, *Shifting Work Patterns* (MSR/NBER) | RCT de campo com 6 mil pessoas, alta | No mundo real, −25% no tempo de e-mail, documentos só "moderadamente" mais rápidos e reuniões sem mudança. |

**Referências de teto** (não usar como típico):
- Anthropic, *Estimating productivity gains*: −80% em média, só o tempo dentro do chat, estimado pelo próprio modelo.
- Anthropic Economic Index (jan/2026): software de 3,3 h para 15 min, com 61% de sucesso.
- Casos de fornecedor: Quantium, Novo Nordisk, Pictet, Parlan, Burke (−85% a −97%).

---

## 4) Ressalvas

1. **As horas-base são premissas.** Antes de levar ao cliente, cronometre 2–3 entregas reais de cada tipo, antes e depois.
2. **Não há RCT independente verificado com Claude agêntico de 2025–2026** para estes entregáveis. Os RCTs usam modelos de 2022–2024. O ganho atual provavelmente é maior, mas a tabela marca como "derivado" o que não foi medido.
3. **Casos de fornecedor** misturam tempo de calendário com tempo de esforço, incluem redesenho de processo (Rakuten) e mostram o melhor cliente.
4. **Estimativas de modelo** (Anthropic) excluem revisão e retrabalho. Em software, só 61% das tarefas foram julgadas bem-sucedidas.
5. **As horas com IA na tabela já incluem revisão humana.** Sem revisão, o risco é de alucinação (11 contra 4 casos) e de números errados em análise e indicadores.
6. **O custo de montar a Skill não está na tabela.** Estimativa derivada: 8–16 h por Skill, que se pagam em 2–4 usos.
7. **O ganho na tarefa não vira ganho na jornada.** Em campo, os estudos mostram de 3% a 25% no total. A tabela vale por entregável.
8. **O ganho é maior para quem tem menos experiência** (Peng, Choi). Seniores tendem a ganhar menos em velocidade.
9. **Análise de redução de custos é a linha mais frágil.** Há sinais negativos para análise de dados com IA genérica, então valide sempre os números com a base original.
10. **Vários estudos citados não foram verificados** (DBT/UK, METR, BCG/Harvard, Merali). Aparecem só como contraponto e não sustentam nenhum número central.

---

## 5) Como mostrar no slide

- **Título:** "O ganho real da IA vem da base reutilizável (Skill), não só do prompt".
- **Gráfico:** barras horizontais agrupadas por entregável, com três barras em horas: Sem IA (cinza), IA do zero (cor média) e IA + Skill (cor forte). O rótulo da última barra mostra o % total (ex.: "16 h → 3 h, −81%").
- **Faixa de evidência:** uma linha discreta por entregável, no formato "medido em RCT: −26% a −35% | fornecedores: até −90%". Assim o número central aparece entre piso e teto.
- **Confiança por linha:** marcador de 1 a 3 pontos (●●○). Proposta e status report ficam em média; PPT, dashboard e análise de custos em baixa ou baixa-média.
- **Número de impacto:** carteira de 125 h → 65 h (do zero com IA) → 24 h (com Skill). E o status report: 138 h → 23 h por projeto por ano.
- **Rodapé obrigatório:** "Horas = premissa da equipe; % ancorados em RCTs (Schwarcz 2025, Choi 2024, Peng 2023, Google 2024, Microsoft 2023/2025) e casos de fornecedor. Inclui tempo de revisão humana."
- **O que não fazer:** colocar 90%+ como número típico, ou omitir a coluna "sem IA com base". Sem ela, o ganho do template é atribuído à IA.
- **Próximo passo:** um piloto de medição de 4 semanas, com timesheet de 2 propostas, 2 decks e 1 protótipo, para trocar as premissas por dados próprios.

---

## Casos verificados (fonte aberta e números conferidos)

| Entregável | Caso | Fonte | Tipo | Sem IA | Com IA | Redução | Confiabilidade |
|---|---|---|---|---|---|---|---|
| analise_dados_custos | Burke uses Microsoft 365 Copilot for research and data analysis | [Microsoft customer story (Burke, market-research consultancy), May 2025](https://www.microsoft.com/en/customers/story/23946-burke-microsoft-365-copilot) | vendor_case_study | 30–40 hours | 4–6 hours | 85.7% | low |
| analise_dados_custos | Estimating AI productivity gains from Claude conversations | [Anthropic Economic Research, Nov 2025](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | ~90 min (about 1.4-1.5 h) average without AI, as Claude estimated it; this is a conversati | Not reported as an absolute number. Implied at roughly 18 min (90 min x 20%), counting onl | 80% | medium |
| analise_dados_custos | Estimating AI productivity gains from Claude conversations: financial analysis | [Anthropic, Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | Not reported for financial analyst tasks specifically (overall average about 90 min / 1.4  | Not reported for financial analyst tasks | 80% | low |
| apresentacao_ppt | Parlan cuts presentation creation time to one-eighth with Copilot in PowerPoint | [Microsoft customer story (Parlan, Dutch nonprofit), Sep 2025](https://www.microsoft.com/en/customers/story/25113-parlan-microsoft-365-copilot) | vendor_case_study | 'hours'. About 4 h is implied by 'an eighth' (8 x 30 min), but no number is stated. | about 30 minutes ('about a half-hour'), described as ready-to-present | 87.5% | low |
| dashboard_indicadores | Estimating AI productivity gains from Claude conversations: compiling information from rep | [Anthropic, Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | Not given for this task. The page-wide average is about 90 minutes without AI. | Not given for this task. | 95% | low |
| dashboard_indicadores | Claude for Small Business launches new workflows, integrations, and training programs (Hir | [Anthropic / Claude resources article](https://claude.com/resources/articles/claude-for-small-business-launches-new-workflows-integrations-and-training-programs) | vendor_case_study | 2 hours (monthly recurring reporting task) | 10 seconds (after the dashboard was built) | 99.86% | low |
| escrita_documentos | Early LLM-based Tools for Enterprise Information Workers Likely Provide Meaningful Boosts  | [Microsoft Research (MSR-TR-2023-43)](https://www.microsoft.com/en-us/research/wp-content/uploads/2023/12/AI-and-Productivity-Report-First-Edition.pdf) | RCT | 100% (normalised control time; the report gives no absolute baseline minutes) | 26% to 73% of the control time, depending on study/task. Common Tasks Study: 12 min actual | 27% | medium |
| escrita_documentos | Lawyering in the Age of Artificial Intelligence (109 Minn. L. Rev. 147) — tarefa: redação  | [Minnesota Law Review — Choi, Monahan & Schwarcz](https://minnesotalawreview.org/wp-content/uploads/2024/11/3-ChoiMonahanSchwarcz.pdf) | RCT | 69,72 min (DP 32,00) | 47,59 min (DP 31,09) | 32.1% | high |
| escrita_documentos | Lawyering in the Age of Artificial Intelligence — tarefa: redação de petição inicial (comp | [Minnesota Law Review — Choi, Monahan & Schwarcz](https://minnesotalawreview.org/wp-content/uploads/2024/11/3-ChoiMonahanSchwarcz.pdf) | RCT | 160,69 min (DP 72,38) | 122,00 min (DP 66,80) | 24.1% | high |
| escrita_documentos | What Can Copilot's Earliest Users Teach Us About Generative AI at Work? | [Microsoft Work Trend Index (special report)](https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work) | vendor_case_study | 42 min 06 s (search + writing + summarizing, all three tasks); writing alone: 13 min 48 s | 29 min 42 s (all three tasks); writing alone: 8 min 12 s | 29% | low |
| escrita_documentos | Estimating AI productivity gains from Claude conversations: document writing | [Anthropic, Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate |  |  | 87% | low |
| escrita_documentos | Estimating AI productivity gains from Claude conversations: curriculum development | [Anthropic, Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | 4.5 hours (270 min), as estimated by Claude | 11 minutes, as estimated by Claude (conversation time only) | 95.9% | low |
| escrita_documentos | Novo Nordisk accelerates clinical documentation and drug development with Claude | [Anthropic / Claude customer story](https://claude.com/customers/novo-nordisk) | vendor_case_study | 10+ weeks | 10 minutes (draft generation); 90% cut in CSR writing time per client quote | 90% | low |
| escrita_documentos | What Can Copilot's Earliest Users Teach Us About Generative AI at Work? Combined search, w | [Microsoft WorkLab / Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work) | other | 42 min 6 s for the 3-task set (search, meeting summary, blog post). Writing task alone: 13 | 29 min 42 s for the 3-task set. Writing task alone: 8 min 12 s | 29.4% | low |
| geral_consultoria | Estimating AI productivity gains from Claude conversations | [Anthropic Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | ~90 minutes average without AI (Claude-estimated); management ~2.0 h, legal ~1.8 h | ~80% less time on average (about 18 min for a 90-min task); median savings 84% in the text | 80% | medium |
| geral_consultoria | Estimating AI productivity gains from Claude conversations | [Anthropic Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | about 90 minutes (model-estimated average; elsewhere in the same text, 1.4 hours / 84 min) | about 18 minutes (implied by the ~80% speedup; not stated directly) | 80% | medium |
| geral_consultoria | What Can Copilot's Earliest Users Teach Us About Generative AI at Work? (Work Trend Index  | [Microsoft WorkLab, Nov 2023](https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work) | RCT | 42:06 for the three tasks (13:48 for the blog first draft) | 29:42 for the three tasks (8:12 for the blog first draft) | 29.5% | medium |
| geral_consultoria | Shifting Work Patterns with Generative AI (Dillon, Jaffe, Immorlica, Stanton) | [Microsoft Research / NBER w33795, 2025](https://www.microsoft.com/en-us/research/publication/shifting-work-patterns-with-generative-ai/) | RCT | ~12 h/week on email (implied by 3 h = 25%) | ~9 h/week on email (3 h less, for active users) | 25% | high |
| geral_consultoria | Estimating AI productivity gains from Claude conversations | [Anthropic (Tamkin & McCrory), Economic Research](https://www.anthropic.com/research/estimating-productivity-gains) | model_estimate | about 90 min (1.4 h); the page gives both figures | about 18 min implied (90 min x 0.2). The page does not state this number; it is derived fr | 80% | low |
| geral_consultoria | Anthropic Economic Index report: Economic primitives (January 2026), speedup by task compl | [Anthropic Economic Index](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report) | model_estimate | not reported (ratio only; human-alone time is estimated by Claude for each task) | not reported (ratio only) | 91.7% | low |
| gestao_projetos_status | What Can Copilot's Earliest Users Teach Us About Generative AI at Work? (Work Trend Index  | [Microsoft WorkLab / Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work) | other | 42 min 34 s (about 42.6 min), not 43 min | 11 min 13 s (about 11.2 min) | 73.6% | low |
| gestao_projetos_status | XP Inc. economiza mais de 9 mil horas e aumenta produtividade com o Copilot para Microsoft | [Microsoft Brasil (customer story), with Avanade](https://www.microsoft.com/en/customers/story/20560-xp-microsoft-365) | vendor_case_study | Not reported. No baseline hours, headcount or license count is given for the 9,000 hours. | Not reported as a task time. The story gives only "over 9,000 hours" saved in total, mainl | 7% | low |
| proposta_comercial | AI-Powered Lawyering: AI Reasoning Models, RAG, and the Future of Legal Practice - Draft P | [Schwarcz, Manning, Barry, Cleveland, Prescott & Rich (Univ. of Minnesota / Michigan)](https://www.law.berkeley.edu/wp-content/uploads/archive/2025/12/AI-Powered-Lawyering.pdf) | RCT | 110.95 minutes (control mean, Draft Persuasive Letter) | 81.8 min with o1-preview (110.95 - 29.14); 72.3 min with Vincent AI (110.95 - 38.68) | 26.3% | high |
| proposta_comercial | AI-Powered Lawyering - Draft NDA WITH a template provided (analog to building a proposal f | [Schwarcz et al., 'AI-Powered Lawyering'](https://www.law.berkeley.edu/wp-content/uploads/archive/2025/12/AI-Powered-Lawyering.pdf) | RCT | 96.30 min (control mean, Draft NDA) | ~83.0 min with o1-preview (-13.30 min, SE 9.30, not significant); ~90.8 min with Vincent A | 13.8% | high |
| proposta_comercial | Quantium drives company-wide AI adoption with Claude | [Anthropic / claude.com (customer story)](https://claude.com/customers/quantium) | vendor_case_study | semanas (propostas complexas), sem número exato | horas, sem número exato | 90% | low |
| proposta_comercial | TRY accelerates creative excellence with Claude | [Anthropic / claude.com (customer story)](https://claude.com/customers/try) | vendor_case_study | not reported | not reported | 40% | low |
| proposta_comercial | Presidio's adoption of Copilot streamlines operations, saving employees about 1,200 hours  | [Microsoft Customer Stories](https://www.microsoft.com/en/customers/story/19401-presidio-network-solutions-microsoft-365-copilot) | vendor_case_study | não informado (RFP); "hours" (doc Word → apresentação) | não informado (RFP); "minutes" (doc Word → apresentação) | 90% | low |
| proposta_comercial | TRY Claude Enterprise case study | [Anthropic / Claude customer story](https://claude.com/customers/try) | vendor_case_study | not reported | not reported | 40% | low |
| proposta_comercial | Claude for Small Business launches new workflows, integrations, and training programs (KAN | [Anthropic / Claude resources article](https://claude.com/resources/articles/claude-for-small-business-launches-new-workflows-integrations-and-training-programs) | vendor_case_study | weeks (not quantified) | "a few minutes in a day" (not quantified, and the wording is ambiguous) | 99% | low |
| sistema_simples | The Impact of AI on Developer Productivity: Evidence from GitHub Copilot | [Peng, Kalliamvakou, Cihon & Demirer (Microsoft Research, GitHub, MIT Sloan), arXiv 2302.06](https://arxiv.org/abs/2302.06590) | RCT | 160.89 minutes (control, conditional on completing) | 71.17 minutes (treated) | 55.8% | high |
| sistema_simples | The Impact of AI on Developer Productivity: Evidence from GitHub Copilot (Peng, Kalliamvak | [arXiv / Microsoft Research, GitHub, MIT Sloan](https://arxiv.org/abs/2302.06590) | RCT | 160.89 minutes | 71.17 minutes | 55.8% | medium |
| sistema_simples | Pictet Claude Code case study | [Anthropic / Claude customer story](https://claude.com/customers/pictet) | vendor_case_study | two weeks (the body says 'one to two weeks' for a traditional prototype cycle) | two hours (the body says 'minutes') | 97.5% | low |
| software_geral | How much does AI impact development speed? An enterprise-based randomized controlled trial | [arXiv / ICSE 2025 SEIP (Google)](https://arxiv.org/abs/2410.12944) | RCT | 114 min | 96 min | 15.8% | high |
| software_geral | How AI assistance impacts the formation of coding skills | [Anthropic Research](https://www.anthropic.com/research/AI-assistance-coding-skills) | RCT | not reported | about 2 minutes faster than control on average (not statistically significant); absolute t | 0% | high |
| software_geral | Rakuten accelerates development with Claude Code | [Anthropic / Claude customer story](https://claude.com/customers/rakuten) | vendor_case_study | 24 working days (average time to market for new features) | 5 days | 79% | low |
| software_geral | Anthropic Economic Index report: Economic primitives (January 2026), software development  | [Anthropic Economic Index](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report) | model_estimate | ~3.3 hours (software development cluster, Claude.ai); global average 3.1 h; API 1.7 h | ~15 minutes of human-AI collaboration time (Claude.ai); ~5 minutes on API | 92.4% | medium |
| software_geral | How AI is transforming work at Anthropic | [Anthropic, Societal Impacts](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) | self_report_survey |  |  | 33.3% | low |