# Produtização de serviços de tecnologia com IA: evidências para A&M DTS Brasil
*Pesquisa de 06/10/2026*

**Legenda:**
- **[E#]**: evidência verificada nesta sessão. O número remete à lista de fontes, com URL e data.
- **[E\*]**: fonte primária conhecida, mas não verificada de novo nesta sessão, porque o limite de buscas acabou.
- **[H]**: hipótese ou inferência, com a lógica em uma linha.

**Limitação de método:** o limite de buscas web foi atingido e o WebFetch e o Firecrawl estavam bloqueados ou sem créditos. Por isso, a maior parte dos números vem de trechos de resultados de busca e de fontes secundárias. Confira cada número no original antes de usá-lo em material para cliente.

---

## Tabela-resumo: caso de uso, ferramentas e evidência de resultado

| Caso de uso | Ferramentas (fornecedor) | Evidência de resultado |
|---|---|---|
| **Tech DD e análise de código** | CAST Highlight/Imaging (CAST); CodeScene; Sema; BlueOptima; Black Duck Audit; SonarQube | EY reduziu em mais de 75% o tempo de avaliação em DD de M&A com o CAST Highlight [E21]. Código de baixa qualidade tem 15x mais defeitos e leva 124% mais tempo para resolver problemas [E22]. 86% das aplicações auditadas têm vulnerabilidades de código aberto (81% delas de risco alto ou crítico) [E23] |
| **VDR e gestão de deals/PMI** | Datasite (que comprou a Ansarada em ago/2024); Intralinks; Midaxo (agente "Madi"); DealRoom | Na Bain, a DD é a etapa de M&A em que mais se usa GenAI (58%) [E26]. A Midaxo diz reduzir atrasos de integração "em até 40%" (alegação do fornecedor) [E25] |
| **Modernização de legado** | AWS Transform; GitHub Copilot app modernization; IBM watsonx Code Assistant for Z; Claude Code (Anthropic); Kyndryl | AWS: .NET para Linux até 4x mais rápido e configuração de rede VMware até 80x mais rápida [E28]. Windows full-stack até 5x mais rápido, com até 70% menos custo de manutenção e licença; 1,1 bi de linhas de código analisadas e 810 mil horas poupadas [E29]. Copilot: o time do Xbox cortou 88% do esforço [E31]. Kyndryl: ROI de 288% a 362% em modernização [E34] |
| **Tech spend, FinOps e SaaS** | IBM Apptio (Cloudability, Kubecost); Flexera; Zylo; Vertice; ServiceNow SPM | 29% do gasto em cloud é desperdiçado [E36]. O agente "Ana", da Vertice, obteve 18% de economia média em mais de 4.000 negociações [E39]. 98% das equipes de FinOps já gerem gasto com IA [E35] |
| **Arquitetura corporativa, APM e process mining** | SAP LeanIX (AI Agent Hub); Ardoq; Bizzdesign Unify; Celonis; SAP Signavio | Ardoq: agentes automatizariam cerca de 40% do trabalho rotineiro de arquitetura (alegação do fornecedor) [E41]. Florida Crystals liberou milhões em capital de giro em menos de 1 ano usando Celonis na migração para S/4 [E43] |
| **PMO/TMO** | Planview Anvi; ServiceNow SPM (Now Assist e agentes); Atlassian Rovo e Monday (não verificados) | Anvi passou de 60% de adoção em 3 meses [E45]. Gartner prevê que 80% das tarefas de gestão de projetos serão eliminadas até 2030 [E47] |
| **Gestão da mudança e adoção digital** | WalkMe (SAP), Whatfix, Prosci | Não há evidência quantitativa verificada nesta sessão |
| **Governança de IA** | ServiceNow AI Control Tower, IBM watsonx.governance, OneTrust, Credo AI [E\*]; SAP LeanIX AI Agent Hub [E40] | Gartner: mais de 40% dos projetos agênticos serão cancelados até 2027, entre outras causas por controles de risco inadequados [E2] |
| **Seleção de software e RFP** | Vertice (do pedido à compra); ferramentas de RFP não verificadas | Vertice: ciclos de compra 15 dias mais curtos [E39] e posição de líder no relatório Lionfish 2026 [E53] |

---

## 1. Tendências do negócio de consultoria com IA

### 1.1 A pirâmide vira "obelisco"
- A McKinsey opera hoje com cerca de 25 mil agentes de IA e cerca de 40 mil pessoas [E7]:
  - adota o modelo "25 squared": +25% de funções voltadas ao cliente e −25% de funções internas, com +10% de produção nessas funções internas;
  - poupou 1,5 milhão de horas em um ano.
- A base da pirâmide (pesquisa, síntese, análise de dados e documentos) é a camada mais automatizável. A alavancagem deixa de vir da proporção entre juniores e sócios e passa a vir da proporção entre agentes e consultores sêniores [H: inferência dos dados da McKinsey].

### 1.2 Precificação: da hora para o resultado e o ativo
- **Outcome-based.** Cerca de 25% dos honorários globais da McKinsey já estão atrelados a resultados (nov/2025) [E8]. Segundo fonte secundária, a BCG projeta que a receita ligada a IA sairá de ~20% (2024) para ~40% (2026), e a Bain estima esse tipo de trabalho em ~30% do negócio [E9].
- **Abandono do modelo FTE/T&M.** A Everest Group observa compradores deixando o modelo de alocação por tempo e material e adotando:
  - modelos baseados em plataforma e atrelados a valor;
  - uma escada de maturidade que vai de "AI-augmented" a "supervised full autonomy";
  - gainshare e incentivos por resultado [E14].
- **Forrester.** Prevê adoção crescente de precificação por resultado à medida que a IA "industrializa" os serviços [E6].
- **Cautelas do Gartner** (vieram de resumo de busca; confirmar no original):
  - "precificação puramente por resultado é ouro de tolo", porque transfere risco de entrega e atrasa o reconhecimento de receita;
  - até 2027, 60% dos grandes contratos de TI terão cláusulas de clawback de ganhos com GenAI [E18].
- **Service-as-software.** A HFS projeta um mercado de "Services-as-Software" de US$ 1,5 tri até 2035, absorvendo receita de serviços de TI e de SaaS [E13].
- **Asset-based consulting.** A IBM define o conceito como ferramentas, modelos, dados de benchmark e agentes proprietários reutilizados em vários projetos [E17].

### 1.3 Mercado e movimentos dos concorrentes
- A Source Global Research projetou para 2025 um crescimento de 6% no mercado de consultoria dos EUA, para quase US$ 110 bi, puxado por GenAI. Mais de 70% das empresas pretendem ampliar a contratação de consultoria [E15].
- O Gartner estima que serviços de consultoria e implementação de GenAI vão de US$ 7,4 bi (2024) para US$ 127,5 bi (2028) [E16].
- Accenture no ano fiscal de 2025: US$ 2,7 bi de receita com GenAI e IA agêntica (o triplo do ano anterior) e US$ 5,9 bi em contratos fechados [E10].
- Produtos lançados por consultorias [E11]:
  - Deloitte **Zora AI**: agentes vendidos por assinatura em cloud (mar/2025);
  - PwC **Agent OS** (mar/2025);
  - KPMG **Workbench** (jun/2025, com a Microsoft);
  - **EY.ai**: cerca de 150 agentes para 80 mil profissionais de tributos.
- No Forrester Wave de consultoria em IA (2º tri/2026), os líderes são PwC, Accenture, EY e IBM [E6].
- **A própria A&M (05/05/2026)** [E12]:
  - criou um Global AI Board;
  - cerca de 20% da receita já vem de IA, e a meta é chegar a 50% (até US$ 3,5 bi) em 2028;
  - planeja contratar até 200 profissionais de IA.
  - Isso dá à DTS Brasil um mandato corporativo para criar produtos de IA [H].

### 1.4 Implicações para o desenho de produtos
- **Comprar ou fazer parceria em vez de construir do zero.** O MIT NANDA relata que soluções compradas ou feitas com parceiros dão certo em cerca de 67% dos casos, contra cerca de 1/3 dos desenvolvimentos internos [E\*, Fortune, 18/08/2025]. Logo, os produtos da A&M devem combinar plataformas de terceiros com o IP da A&M (benchmarks, playbooks, operadores interinos) [H].
- **Arquitetura comercial em 3 camadas** [H: combina o que a Everest e a McKinsey observam]:
  1. **Sprint** de diagnóstico com preço fixo;
  2. **Assinatura** de monitoramento contínuo;
  3. **Execução** com success fee ou gestão interina.

---

## 2. Ferramentas por caso de uso (o que não está na tabela-resumo)

### a) Tech/IT Due Diligence
- **CAST Highlight:** avalia mais de 1 milhão de linhas de código em menos de uma semana, com acesso limitado aos sistemas [E21].
- **Sema:** avaliou código de empresas com valor somado acima de US$ 1 tri, atendeu 7 dos 9 maiores investidores globais (2023) e criou o "GBOM", inventário do código gerado por IA [E19].
- **BlueOptima:** detecta código escrito por IA, com base de mais de 16 bi de observações de métricas [E20].
- **Black Duck (relatório de M&A):** 85% das transações com conflitos de licença e 96% com vulnerabilidades não corrigidas (confirmar no PDF) [E23].
- **VDR e integração:** a Datasite comprou a Ansarada (28/08/2024, cerca de A$ 236 mi) e tem redação com IA e ISO 42001 [E24]. A Midaxo é líder no IDC MarketScape 2025 [E25].
- **Adoção:** 21% dos profissionais de M&A usam GenAI (Bain) [E26]; 86% das corporações e gestoras de PE (Deloitte, 1.000 executivos) [E27].

### b) Modernização de legado com IA agêntica
- **AWS Transform:** disponível desde 15/05/2025; mainframe decomposto "em minutos em vez de meses"; a Experian cortou cerca de 40% do esforço [E28]. Números atualizados: 1,8 bi de linhas e 1,009 mi de horas poupadas [E30].
- **GitHub Copilot app modernization:** até 70% menos esforço de migração e 50% menos de upgrade [E31].
- **Claude Code e COBOL:** em 23/02/2026 a Anthropic prometeu modernização em "trimestres, não anos" [E32]. É sinal de que o modelo de "exércitos de consultores" está sendo questionado [H].
- **IBM watsonx Code Assistant for Z:** versão 2.6 (27/06/2025), baseada no Granite; não há resultados quantitativos de clientes publicados [E33].
- **Kyndryl:** ROI de 288% (no mainframe), 297% (integrado à nuvem) e 362% (fora do mainframe); 88% usam ou planejam GenAI no mainframe [E34].
- **Google, Accenture, Infosys e mLogica:** não verificados nesta sessão.

### c) Tech spend, FinOps e SaaS
- **State of FinOps 2026:** 90% das equipes gerem SaaS, 64% licenças, 57% nuvem privada e 48% data center; a missão mudou para "valor da tecnologia" [E35].
- **Zylo 2026 (secundária):** US$ 55,7 mi por empresa; 46% das licenças ociosas em 30 dias; 305 aplicativos em média [E37].
- **IBM Apptio (nov/2025):** Cloudability Governance (custo antes do deploy) e Kubecost 3.0 (monitoramento de GPU) [E38].
- **Vertice:** US$ 75 bi em gastos processados; captou US$ 50 mi em jan/2025 [E39].

### d) Arquitetura corporativa e process mining
- **Bizzdesign Unify:** lançado em 16/04/2026 como plataforma nativa de IA [E42].
- **SAP Signavio:** modelagem a partir de texto (mar/2025) e "Transformation Advisory" com IA (nov/2025) [E44].
- **Celonis:** a ZEISS usa a ferramenta na migração para S/4HANA [E43].

### e) PMO e gestão da mudança
- **ServiceNow Now Assist for SPM:** aceita Claude via AWS como modelo [E46].
- **WalkMe, Whatfix e Prosci:** não verificados.

### f) Governança de IA
- **Marcos regulatórios e normas:**
  - EU AI Act (Reg. 2024/1689): proibições desde 02/02/2025, IA de propósito geral desde 02/08/2025, alto risco do Anexo III em 02/08/2026 e do Anexo I em 02/08/2027 [E\*]. O "Digital Omnibus" (nov/2025) propôs adiar as regras de alto risco; status a verificar [H].
  - ISO/IEC 42001:2023 [E\*]; NIST AI RMF 1.0 (jan/2023) e NIST AI 600-1 (jul/2024) [E\*].
  - Brasil: PL 2338/2023 aprovado no Senado em dez/2024 [E\*].
- **Plataformas:** ServiceNow AI Control Tower (mai/2025), IBM watsonx.governance, OneTrust e Credo AI [E\*].
- **Maturidade de IA:** o modelo do Gartner não foi verificado.

### g) Seleção de fornecedores e continuidade de negócios
- Ferramentas de RFP e de BCP com IA não foram verificadas.

---

## 3. Dados de mercado

- **GenAI sem retorno: MIT NANDA, jul/2025** [E1]
  - 95% das organizações não têm impacto mensurável em P&L.
  - Cerca de 80% avaliaram ferramentas, 20% chegaram a piloto e 5% a produção.
  - Investimento de US$ 30 a 40 bi.
- **Projetos agênticos (Gartner, 25/06/2025)** [E2]
  - Mais de 40% serão cancelados até o fim de 2027.
  - Só cerca de 130 dos milhares de fornecedores "agênticos" são reais ("agent washing").
- **Gasto com IA (Gartner)** [E3]
  - US$ 2,52 tri em 2026 (+44%) na previsão de jan/2026.
  - US$ 2,59 tri (+47%) na revisão de 19/05/2026, sendo cerca de US$ 1,37 tri em infraestrutura.
- **Software de agentes (Gartner, via fonte secundária)** [E5]
  - US$ 86,4 bi em 2025, US$ 206,5 bi em 2026 e US$ 376,3 bi em 2027.
- **Gasto com TI (Gartner, 22/04/2026)** [E4]
  - US$ 6,31 tri em 2026 (+13,5%).
  - Software cresce 15,1%, para US$ 1,44 tri.
- **Adiamento de gasto com IA (Forrester, Predictions 2026)**: as empresas vão empurrar 25% do gasto planejado em IA para 2027 [E6].
- **Adoção de IA**
  - Stanford AI Index 2025: 78% das organizações usaram IA em 2024, contra 55% em 2023 [E\*].
  - McKinsey State of AI (nov/2025): 88% usam IA em pelo menos uma função, 23% escalam agentes e 39% relatam impacto no EBIT [E\*].
- **ERP (Gartner)** [E50]
  - Mais de 70% das iniciativas recentes não vão atingir plenamente o business case até 2027.
  - Até 25% vão falhar de forma catastrófica.
- **Projetos de TI**
  - McKinsey/Oxford, 5.400 projetos: grandes projetos de TI estouram o orçamento em 45%, atrasam 7% e entregam 56% menos valor [E48].
  - Standish 2020: 31% de sucesso, 50% "desafiados" e 19% de falha [E49].
- **M&A**
  - McKinsey: 50% a 60% das iniciativas de sinergia dependem fortemente de TI [E51].
  - Cerca de 70% das fusões não capturam o valor esperado (fonte secundária; confirmar) [E52].
  - Bain: superestimar sinergias é a 2ª maior causa de deals decepcionantes [E52].
- **Mainframe (Kyndryl)**: IA deve gerar US$ 12,7 bi de economia e US$ 19,5 bi de receita em 3 anos [E34].

---

## 4. Dez ideias de produtos com IA para a A&M DTS Brasil

### 1. Tech & AI DD Sprint (10 dias úteis)
- **Problema:** a DD de TI é qualitativa e lenta, e não precifica riscos de código, de código aberto e de código gerado por IA.
- **Público:** gestoras de PE (compra e vendor DD), corporate development e credores.
- **Ferramentas:** CAST Highlight, CodeScene e Black Duck ou Sema; LLM sobre o VDR (Datasite ou Intralinks); benchmarks de custo de TI da A&M.
- **Dados:** repositórios Git, documentos do VDR, contratos e faturas de cloud.
- **Papel da IA:** ler o VDR, responder perguntas, levantar alertas e fazer o primeiro rascunho do relatório; estimar o capex de remediação.
- **Receita:** preço fixo em 3 níveis (Lite, Standard, Deep), mais uma assinatura anual de "Portfolio Scan" por fundo e venda adicional do plano de 100 dias.
- **Demanda:** a DD é a etapa mais usada de GenAI em M&A [E26]; 86% usam GenAI em M&A [E27]; a EY reduziu o tempo em 75% [E21]; TI está por trás de 50% a 60% das sinergias [E51].

### 2. Carve-out & TSA Exit Accelerator
- **Problema:** separações e reestruturações ficam presas a TSAs (contratos de serviço transitório entre vendedor e comprador). Mapear aplicações, dados e contratos por entidade é trabalho manual.
- **Público:** vendedores corporativos, PE que compra carve-outs e empresas em reestruturação (o núcleo da A&M).
- **Ferramentas:** LeanIX ou Ardoq para o grafo de aplicações [E40][E41]; Midaxo para playbooks e sinergias [E25]; LLM para cláusulas de cessão e mudança de controle.
- **Papel da IA:** mapear automaticamente aplicação, capacidade e entidade; rascunhar os anexos de TSA; alertar sobre dependências.
- **Receita:** honorário fixo por fase, mais success fee por mês de TSA economizado [H].
- **Demanda:** TI pesa 50% a 60% nas sinergias [E51]. Não há dado de custo de TSA verificado [H].

### 3. Agentic Tech Spend Radar (assinatura)
- **Problema:** 29% de desperdício em cloud [E36], licenças SaaS ociosas [E37] e custo de tokens de IA sem controle.
- **Público:** CFOs e CIOs do mid-market, portfólio de PE e empresas em turnaround.
- **Ferramentas:** dados de cobrança de cloud, Cloudability ou CloudZero, gestão de SaaS, dados de contas a pagar e ERP; LLM para contratos; agente de negociação no modelo da Vertice.
- **Papel da IA:** classificar gastos na taxonomia TBM, detectar anomalias, comparar com benchmarks e preparar roteiros de renegociação.
- **Receita:** assinatura por faixa de gasto, mais gainshare sobre a economia comprovada.
- **Demanda:** 98% das equipes de FinOps gerem IA e 90% gerem SaaS [E35]; a Vertice obtém 18% de economia [E39]; o software cresce 15,1% [E4].

### 4. AI Value Office (ROI de IA como serviço)
- **Problema:** 95% sem retorno [E1]; mais de 40% de projetos agênticos cancelados [E2]; 25% do gasto adiado [E6].
- **Público:** CEOs, CFOs, conselhos e operating partners de PE.
- **Ferramentas:** inventário de agentes (LeanIX Agent Hub ou AI Control Tower); SPM (ServiceNow ou Planview Anvi) [E45][E46]; telemetria de FinOps para IA.
- **Papel da IA:** inventariar iniciativas, padronizar business cases, acompanhar KPIs e sinalizar o que encerrar e o que escalar.
- **Receita:** diagnóstico de 6 semanas com preço fixo, mais assinatura trimestral de acompanhamento de valor e success fee sobre o EBITDA validado.
- **Demanda:** gasto de US$ 2,59 tri [E3]; só 39% relatam impacto no EBIT [E\*].

### 5. Legacy-to-Cloud AI Factory
- **Problema:** mainframe, .NET e Java legados, custo de licenças e escassez de profissionais de COBOL.
- **Público:** bancos, seguradoras, varejo e governo.
- **Ferramentas:**
  - AWS Transform [E28][E29];
  - Copilot app modernization [E31];
  - Claude Code para descoberta e documentação de COBOL [E32];
  - watsonx Code Assistant for Z quando a carga continua no mainframe [E33];
  - CAST Imaging para o mapa de dependências.
- **Papel da IA:** descoberta, documentação, decomposição, conversão de código e testes.
- **Receita:** assessment de 4 a 6 semanas com preço fixo, mais preço por aplicação modernizada e honorário por redução do custo de operação.
- **Demanda:** ROI de 288% a 362% [E34]; 810 mil horas poupadas [E29]; queda da IBM [E32]. O diferencial da A&M é ser independente de fornecedor [H].

### 6. AI Governance as a Service
- **Problema:** falta de controles de risco [E2], proliferação de agentes [E40], prazos do EU AI Act e do PL 2338 [E\*] e certificação ISO 42001 [E\*].
- **Público:** setor financeiro, saúde, exportadoras para a União Europeia e portfólio de PE.
- **Ferramentas:** AI Control Tower, watsonx.governance, OneTrust ou Credo AI [E\*]; LeanIX Agent Hub; NIST AI RMF.
- **Papel da IA:** descobrir modelos e agentes, classificar riscos, reunir evidências para auditoria e monitorar continuamente.
- **Receita:** implantação, mais assinatura por sistema ou agente; preparação para ISO 42001 com preço fixo.
- **Demanda:** a Datasite usa a ISO 42001 como argumento de venda [E24]; a Ardoq trata "arquitetura para IA" e o EU AI Act no roadmap [E41].

### 7. Agentic Operating Model / Digital Workforce Design
- **Problema:** redesenhar TI e áreas administrativas com agentes, e definir quem gere a "força de trabalho digital".
- **Público:** CIOs, COOs e portfólio de PE em busca de EBITDA.
- **Ferramentas:** Celonis ou Signavio para mapear tarefas [E43][E44]; plataformas de agentes [H]; LeanIX Agent Hub para o registro dos agentes.
- **Papel da IA:** analisar tarefas por função, simular capacidade e desenhar a passagem de trabalho entre pessoas e agentes.
- **Receita:** honorário de desenho, mais um "Head of Digital Workforce" interino e assinatura de operação.
- **Demanda:** o modelo "25 squared" da McKinsey [E7]; US$ 206,5 bi em software de agentes [E5].

### 8. AI-enabled PMO Rescue ("Program Health Index")
- **Problema:** estouro de 45% no orçamento e 56% menos valor [E48]; mais de 70% dos ERPs abaixo do business case [E50].
- **Público:** conselhos, CFOs, bancos credores e PE com programas em crise.
- **Ferramentas:** conectores para Jira, ServiceNow SPM e Planview; LLM sobre status reports e atas; modelo preditivo de atraso.
- **Papel da IA:** detectar sinais precoces, prever data e custo e montar o material do comitê de direção.
- **Receita:** health check de 3 semanas com preço fixo, mais diretor de programa interino, success fee por marco entregue e licença do índice.
- **Demanda:** Gartner prevê 80% das tarefas de gestão de projetos automatizadas até 2030 [E47]; a Planview Anvi passou de 60% de adoção [E45].

### 9. Reforma Tributária + S/4 Readiness Scan
- **Problema:**
  - A transição para IBS e CBS (LC 214/2025) dura de 2026 a 2033 e mexe no ERP, no fiscal, nos preços e no caixa [E\*].
  - Ela coincide com o fim da manutenção principal do SAP ECC em 2027 [E\*].
- **Público:** médias e grandes empresas no Brasil e PE com portfólio brasileiro.
- **Ferramentas:** LLM para analisar código ABAP e customizações [H]; Celonis ou Signavio para avaliar a aderência dos processos ao padrão [E43][E44]; LeanIX para mapear interfaces fiscais.
- **Papel da IA:** mapear todos os pontos de cálculo de tributo, gerar a lista de mudanças e simular o impacto em preço e caixa.
- **Receita:** scan com preço fixo, mais assinatura de acompanhamento regulatório até 2033 e implementação.
- **Demanda:** é uma obrigação legal com calendário fixo, o que torna a demanda pouco sensível a preço [H]; risco de ERP [E50].

### 10. Vendor Selection & Contract Copilot
- **Problema:** RFPs lentas e enviesadas, e cláusulas novas de IA e dados nos contratos.
- **Público:** CIOs e CPOs, e carve-outs que precisam montar a infraestrutura do Day-1.
- **Ferramentas:** biblioteca de requisitos da A&M; LLM para gerar a RFP e pontuar respostas; dados de preço de mercado [E39].
- **Papel da IA:** gerar a RFP a partir do mapa de capacidades, pontuar propostas, comparar contratos e apoiar a negociação.
- **Receita:** preço fixo por seleção, mais percentual da economia negociada.
- **Demanda:** software cresce 15,1%, para US$ 1,44 tri [E4]; a Vertice obtém 18% de economia e ciclos 15 dias mais curtos [E39]. Um módulo de BCP com IA pode ser acrescentado [H].

---

## 10 estatísticas-chave para slides

| # | Valor | Fonte | Data |
|---|---|---|---|
| 1 | 95% das organizações sem impacto mensurável em P&L com GenAI | MIT NANDA, "GenAI Divide" [E1] | jul–ago/2025 |
| 2 | Mais de 40% dos projetos de IA agêntica cancelados até o fim de 2027 | Gartner [E2] | 25/06/2025 |
| 3 | US$ 2,59 tri de gasto mundial com IA em 2026 (+47%) | Gartner [E3] | 19/05/2026 |
| 4 | US$ 206,5 bi em software de agentes de IA em 2026 (eram US$ 86,4 bi em 2025) | Gartner, via fonte secundária [E5] | mai–jun/2026 |
| 5 | Cerca de 25% dos honorários globais da McKinsey já atrelados a resultado | McKinsey, via Hunt Scanlon e Yahoo/BI [E8] | nov/2025 |
| 6 | Cerca de 25 mil agentes de IA ao lado de cerca de 40 mil pessoas na McKinsey | Bob Sternfels, CES/HBR [E7] | jan/2026 |
| 7 | A&M: ~20% da receita já ligada a IA; meta de 50% (~US$ 3,5 bi) até 2028 | A&M e Bloomberg [E12] | 05/05/2026 |
| 8 | Mais de 70% das iniciativas ERP recentes não vão atingir o business case até 2027 | Gartner [E50] | citado em 13/11/2025 |
| 9 | 50% a 60% das iniciativas de sinergia em M&A dependem fortemente de TI | McKinsey [E51] | 2011 (referência clássica) |
| 10 | 29% do gasto em IaaS/PaaS desperdiçado, primeira alta em 5 anos, puxada por IA | Flexera, State of the Cloud [E36] | 2026 |

---

## Fontes

| # | Fonte | URL | Data |
|---|---|---|---|
| E1 | MIT NANDA, via Virtualization Review | https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx | 19/08/2025 |
| E2 | Gartner | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 | 25/06/2025 |
| E3 | Gartner (revisão de maio) | https://gartner.com/en/newsroom/press-releases/2026-05-19-gartner-forecasts-worldwide-ai-spending-to-grow-47-percent-in-2026 | 19/05/2026 |
| E3 | Gartner (previsão de janeiro) | https://www.gartner.com/en/newsroom/press-releases/2026-1-15-gartner-says-worldwide-ai-spending-will-total-2-point-5-trillion-dollars-in-2026 | 15/01/2026 |
| E4 | Gartner | https://gartner.com/en/newsroom/press-releases/2026-04-22-gartner-forecasts-worldwide-it-spending-to-grow-13-point-5-percent-in-2026-totaling-6-point-31-trillion-dollars | 22/04/2026 |
| E5 | The Agent Report (secundária) | https://the-agent-report.com/2026/06/ai-agent-market-spending-2026-gartner/ | jun/2026 |
| E6 | Forrester Predictions 2026 | https://itwire.com/it-industry-news/strategy/forrester-unveils-2026-predictions-for-ai-and-tech-leadership | out/2025 |
| E6 | Forrester Wave de consultoria em IA | https://letsdatascience.com/news/forrester-evaluates-ten-major-ai-consulting-providers-8c638ab2 | 2º tri/2026 |
| E7 | IT Forum | https://itforum.com.br/noticias/mckinsey-25-mil-agentes-ia-funcionarios/ | jan/2026 |
| E7 | Let's Data Science | https://letsdatascience.com/news/mckinsey-deploys-25000-ai-agents-firmwide-f9cfb097 | jan/2026 |
| E8 | Hunt Scanlon | https://huntscanlon.com/mckinsey-continues-to-deliver-value-it-just-charges-differently-for-it-now/ | nov–dez/2025 |
| E8 | Yahoo Finance | https://finance.yahoo.com/news/ai-reshaping-mckinsey-makes-money-195132745.html | nov/2025 |
| E9 | Let's Data Science (secundária) | https://letsdatascience.com/news/consulting-firms-shift-toward-outcome-based-ai-fees-d0707ad1 | 2025–26 |
| E10 | Accenture | https://www.accenture.com/ca-en/about/company/integrated-reporting-financial | ano fiscal 2025 |
| E11 | AI Business (Zora AI) | https://aibusiness.com/generative-ai/deloitte-unveils-agentic-ai-platform-zora-ai-nvidia-gtc-2025 | mar/2025 |
| E11 | Unity Connect (Big Four) | https://unity-connect.com/our-resources/blog/big-4-ai-agents/ | 2025 |
| E12 | A&M | https://www.alvarezandmarsal.com/press-release/alvarez-marsal-announces-expansion-of-ai-capabilities | 05/05/2026 |
| E12 | Bloomberg Government | https://news.bgov.com/financial-accounting/alvarez-marsal-wants-to-make-3-5-billion-from-ai-work-by-2028 | mai/2026 |
| E13 | HFS Research | https://www.hfsresearch.com/wp-content/uploads/pdf/HFS-India-Summit-Feb-2026-Agents-of-Disruption-Session.pdf | fev/2026 |
| E14 | Everest Group | https://www.everestgrp.com/report/egr-2026-43-v-8121/ | 2026 |
| E15 | Source Global Research, via Bloomberg Law | https://news.bloomberglaw.com/bloomberg-government-news/consulting-growth-to-double-after-sluggish-2024-research-finds | 2025 |
| E16 | IT Channel Oxygen | https://itchanneloxygen.com/who-got-the-nod-for-gartners-first-genai-consulting-quadrant | 2025 |
| E17 | IBM | https://www.ibm.com/think/topics/asset-based-consulting | 2025 |
| E18 | Gartner (resumo de busca; confirmar no original) | https://www.gartner.com/en/documents/7767521 | 2025–26 |
| E19 | Tech Lead Journal (Sema) | https://techleadjournal.dev/episodes/205/ | 2024–25 |
| E20 | BlueOptima | https://www.blueoptima.com/post/how-to-detect-ai-generated-source-code-state-of-2024 | 2024 |
| E21 | CAST (caso EY) | https://learn.castsoftware.com/case-studies/ey-reduces-ma-due-diligence-assessment-time-by-more-than-75-percent-with-cast-highlight | s/d |
| E22 | arXiv, estudo "Code Red" | https://arxiv.org/pdf/2203.04374 | mar/2022 |
| E23 | Black Duck, OSSRA | https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html | 2025/2026 |
| E23 | Black Duck, M&A | https://synopsys.com/software-integrity/resources/white-papers/ma-open-source-audits.html | 2025 |
| E24 | Peony | https://www.peony.ink/blog/datasite-vs-ansarada | 2026 |
| E25 | Midaxo | https://www.midaxo.com/platform/post-merger-integration | 2025–26 |
| E26 | Bain | https://www.bain.com/insights/generative-ai-m-and-a-report-2025/ | jan/2025 |
| E27 | Deloitte | https://www.deloitte.com/us/en/about/press-room/deloitte-survey-genai-in-mna.html | out/2025 |
| E28 | SiliconANGLE | https://siliconangle.com/2025/05/15/aws-ai-powered-workload-modernization-service-is-now-generally-available/ | 15/05/2025 |
| E29 | Business Wire (AWS) | https://www.businesswire.com/news/home/20251201884679/en/ | 01/12/2025 |
| E30 | AWS | https://aws.amazon.com/blogs/aws-insights/aws-why-agentic-ai-marks-an-inflection-point-for-enterprise-modernization | 2026 |
| E31 | The Letter Two | https://thelettertwo.com/2025/09/23/github-copilot-java-dotnet-app-modernization/ | 23/09/2025 |
| E31 | ADTmag | https://adtmag.com/articles/2025/11/04/github-copilot-powered-modernization-now-available.aspx | 04/11/2025 |
| E32 | Gigazine | https://www.gigazine.net/gsc_news/en/20260224-ibm-ai-casualty-anthropic-claude-code-cobol | 24/02/2026 |
| E32 | Malay Mail | https://www.malaymail.com/amp/news/money/2026/02/24/ibm-shares-hit-25-year-low-as-ai-promises-to-update-ageing-mainframe-code/210190 | 24/02/2026 |
| E33 | IBM | https://www.ibm.com/mx-es/new/announcements/ibm-watsonx-code-assistant-for-z-adds-ai-code-generation-and-assembler-support | 2025 |
| E34 | CRN India | https://www.crn.in/?p=72982 | set/2025 |
| E34 | IT Brief | https://itbrief.com.au/story/ai-drives-mainframe-modernisation-with-usd-33-billion-impact | set/2025 |
| E35 | SD Times | https://sdtimes.com/softwaredev/report-finops-priorities-are-shifting-left-and-expanding/ | 2026 |
| E35 | Finout | https://finout.io/blog/state-of-finops-2026-report-key-trends-insights-and-what-comes-next | 2026 |
| E36 | Flexera | https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows | 2026 |
| E37 | Voxbooster (secundária, dados Zylo) | https://voxbooster.com/blog/saas-spending-statistics-2026/ | 2026 |
| E38 | IT Brief | https://itbrief.co.uk/story/apptio-unveils-finops-tools-to-tackle-soaring-ai-cloud-costs | nov/2025 |
| E39 | Procurement Magazine | https://procurementmag.com/news/vertice-launches-ana-ai-negotiation-agent-for-software | 2025–26 |
| E39 | TechCrunch | https://techcrunch.com/2025/01/21/vertice-raises-50m-for-its-ai-powered-saas-spend-platform/ | 21/01/2025 |
| E40 | SAP LeanIX | https://www.leanix.net/en/blog/sap-leanix-2026-building-on-momentum | 2026 |
| E40 | Inclusion Cloud | https://inclusioncloud.com/insights/blog/sap-leanix-ai-sprawl-problem/ | 2026 |
| E41 | Business Wire (Ardoq) | https://www.businesswire.com/news/home/20260528712753/en/ | 28/05/2026 |
| E42 | AAP (Bizzdesign) | https://www.aap.com.au/aapreleases/cision20260416ae34942/ | 16/04/2026 |
| E43 | Celonis | https://celonis.com/solutions/stories/florida-crystals-accounts-payable | s/d |
| E44 | SAP News | https://news.sap.com/2025/03/sap-signavio-launches-ai-process-modeler-text-to-process/ | mar/2025 |
| E44 | SAP Signavio | https://www.signavio.com/post/november-2025-product-release-update | nov/2025 |
| E45 | Business Wire (Planview, lançamento) | https://www.businesswire.com/news/home/20251014125443/en/ | 14/10/2025 |
| E45 | Business Wire (Planview, 2026) | https://www.businesswire.com/news/home/20260121689091/en/ | 21/01/2026 |
| E46 | ServiceNow Docs | https://www.servicenow.com/docs/r/4Pll~Vzr5Rr79UNYLnUdJw/jZN4xOXV4Hag6Y0ERD95lQ | 2025–26 |
| E47 | Gartner | https://www.gartner.com/en/newsroom/press-releases/2019-03-20-gartner-says-80-percent-of-today-s-project-management | 20/03/2019 |
| E48 | McKinsey | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value | 2012 |
| E49 | Rockstar Developer University (Standish 2020, secundária) | https://rockstardeveloperuniversity.com/software-project-failure-statistics/ | s/d |
| E50 | Gartner | https://www.gartner.com/en/information-technology/insights/what-it-leaders-must-do-to-avoid-disappointing-erp-initiatives | s/d |
| E50 | The Register | https://www.theregister.com/2025/11/13/erp_disaster_gartner/ | 13/11/2025 |
| E51 | McKinsey | https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/understanding-the-strategic-value-of-it-in-m-and-38a | 2011 |
| E52 | Aranca (secundária) | https://www.aranca.com/knowledge-library/articles/business-research/why-do-mergers-and-acquisitions-fail | 2025–26 |
| E52 | Bain | https://www.bain.com/insights/why-some-merging-companies-become-synergy-overachievers/ | s/d |
| E53 | PR Newswire (Vertice) | https://tools.prnewswire.com/en-us/live/20813/release/20260331EN23519 | 31/03/2026 |

**Fontes [E\*], não verificadas de novo nesta sessão:**

| Fonte | Referência | Data |
|---|---|---|
| EU AI Act, Reg. (UE) 2024/1689 | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | 12/07/2024 |
| ISO/IEC 42001:2023 | https://www.iso.org/standard/81230.html | dez/2023 |
| NIST AI RMF | https://www.nist.gov/itl/ai-risk-management-framework | 26/01/2023 |
| NIST AI 600-1 (perfil de GenAI) | NIST | 26/07/2024 |
| LC 214/2025 | https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm | 16/01/2025 |
| Manutenção do SAP ECC até 2027/2030 | SAP News | 04/02/2020 |
| PL 2338/2023 aprovado no Senado | Agência Senado | 10/12/2024 |
| Stanford AI Index 2025 | https://hai.stanford.edu/ai-index/2025-ai-index-report | abr/2025 |
| McKinsey State of AI | McKinsey | nov/2025 |
| MIT NANDA: compra ou parceria com ~67% de sucesso | Fortune | 18/08/2025 |
| ServiceNow AI Control Tower | Knowledge 2025 | mai/2025 |

**O que falta verificar:**
- modernização com Google, Accenture, Infosys e mLogica;
- Atlassian Rovo e Monday;
- Prosci, WalkMe e Whatfix;
- detalhes das plataformas de governança de IA;
- ferramentas de RFP e BCP;
- ServiceNow APM, Productiv e CloudZero;
- status do Digital Omnibus da UE e do PL 2338;
- modelo de maturidade de IA do Gartner;
- Menlo Ventures.
