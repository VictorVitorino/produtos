# Registro de fontes e fatos · DTS V6

Índice legível de `src/data/05-fontes.js` (objetos `FONTES` e `FATOS`), a fonte única de todo número de mercado do deck (SPEC V6, seções 4 e 10.1). Este arquivo é gerado a partir do registro; se os dois divergirem, vale o `.js`.

## Como usar

- **No slide:** use o `txt` do fato (ou uma versão mais curta com o mesmo sentido) e o `num`. Nas fichas, `kpis:[[num, texto, idFato]]`.
- **No verso:** cite as fontes do fato (`FONTES[id]`: organização, título, data, tipo, link). A `nota` pode ir para o verso; a `obs` é interna e **nunca** vai para slide nem verso.
- **Status:** só use como número de destaque fatos `verificado`. `fraco`: pode aparecer no texto, com ressalva, nunca como destaque. `a verificar` e `divergente`: não usar até conferir ou corrigir.
- **Tipo da fonte:** `primária` (quem produziu o dado) · `oficial` (governo, lei, regulador) · `empresa` (a própria empresa falando de si; inclui dado de fornecedor) · `imprensa` · `documento interno`.
- **Método desta revisão (29/10/2026):** cada fato foi reconferido por busca na web, que lê a página da fonte. A leitura direta dos sites estava bloqueada na sessão e o Firecrawl estava sem créditos; onde a fonte tem acesso pago (Bloomberg, Financial Times), a nota diz como o fato foi conferido.
- **Fatos que o usuário mandou tirar do slide de forças** (mercado de TI de US$ 67,8 bi, gasto com IA de US$ 3,4 bi, 1.581 transações de M&A, 17% das empresas usando IA) continuam no registro com `obs` "Não usar no slide de forças (pedido do usuário)".

## Correções em relação ao V5 (o que muda no texto)

| Fato (id) | No V5 | Correto |
|---|---|---|
| `escala-pilotos-br-23` | ~25% das empresas no Brasil escalam ≥40% dos pilotos | Brasil 23%; o 25% é mundial (Deloitte) |
| `talento-transformacao-53` | 53% sem talento para IA | 53% sem talento para os planos de **transformação digital** (KPMG, mundial) |
| `governanca-agentes-br-27` | 27% com governança de IA madura | 27% com governança madura para **agentes de IA** (21% no mundo) |
| `ti-lidera-ma-1s25-274` | 274 deals de TI no 1S26 | 274 é do **1º semestre de 2025**; em 2026, TTR Data: 104 transações de tecnologia no 1º semestre |
| `mbrf-sinergias-805` | Sinergias da MBRF de R$ 485 mi/ano | Sinergias mapeadas de **R$ 805 mi/ano** (R$ 485 mi era só uma parcela) |
| `pwc-toltiq-2026` | PwC é a "única"/"exclusiva" da ToltIQ | Comunicado fala em **relação estratégica**; exclusividade só em manchete de imprensa |
| `bain-replica-software-alvo` | Bain replica o alvo com Claude Code | Reportagem confirma o uso de IA, **não** a ferramenta Claude Code |
| `servicos-ia-fundos-anthropic` | Ode with Anthropic em jul/2026 | Anunciada em **04/05/2026**; lançada como Ode em jul/2026 |
| `diligencia-comercial-voz` | DD de tecnologia com agentes por ~US$ 50 mil | DiligenceSquared faz **diligência comercial**; o valor de ~US$ 50 mil é fraco |
| `kpmg-iso-42001` | 1ª Big Four com ISO 42001 | 1ª **entidade internacional** das quatro; KPMG Austrália foi a primeira organização (out/2024) |
| `mckinsey-legacyx-90` | SAS→Python com ~90% de precisão e cronograma −80% | ~90% confirmado; **−80% não confirmado** (McKinsey fala em 40–50% mais rápido) |
| `deloitte-agentes-assinatura` | Zora AI: −25% de custo, +40% de produtividade | Assinatura confirmada; os ganhos **não** foram encontrados |
| `icms-iss-transicao-2033` | Fonte: Congresso em Foco | Usar a Agência Senado: a matéria do Congresso em Foco tem percentuais errados para 2029 |
| `raizen-separacao-2027` | Fonte: Forbes (mai/2026) | Fato confirmado por outra fonte (Cenário Energia, ago/2026) |
| `deloitte-recife-800` | Deloitte Recife com ~600 pessoas | ~800 no Porto Digital e mais de mil no Nordeste (jun/2026) |
| `lei-do-bem-2024` / `lei-do-bem-2025` | 4,2 mil empresas (AB2024) | 4.252 (AB2024) e, mais recente, **4.598 (AB2025, preliminar)** |
| `lc224-corte-10` | −10% na Lei do Bem (60%→54%, 80%→72%) | **Divergente**: fontes discordam se a Lei do Bem foi cortada; 54%/72% não confirmados |
| `reforma-impacto-imediato-83` | 83% esperam impacto alto e imediato | **Divergente**: 83% apontam a área tributária como a mais afetada; não há "imediato" |
| `ecc-2027-junta-reforma` | 95% dos clientes SAP já iniciaram adequação | **Não encontrado**: não usar |
| `falconi-ia-100-mi` | Falconi: vendas de tech +90% | R$ 100 mi e 80% dos projetos com agentes confirmados; o período dos 90% não foi confirmado |
| `preco-resultado-risco` | Gartner: preço por resultado é "ouro de tolo" | Não encontrado no Gartner; usar como leitura nossa ou trocar por `clawback-contratos-60` |

## Números do registro

| | Total | Detalhe |
|---|---|---|
| Fontes | 145 | documento interno 3 · primária 35 · imprensa 51 · empresa 49 · oficial 7 |
| Fatos | 175 | verificado 151 · a verificar 15 · divergente 4 · fraco 5 |
| Fatos com número de destaque | 125 | |
| Fatos com observação interna (`obs`) | 54 | |

## Fatos por tema

Colunas: id do fato · texto para o slide · número · status · fontes (ids) · onde serve no V6 (sNN = slide; pX.Y = ficha).

### IA e valor (27)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `ceo-sem-retorno-ia-56` | 56% dos CEOs no mundo ainda não viram a IA aumentar a receita nem reduzir custos | 56% | verificado | `pwc-ceo-survey-2026` | s05 s10 p1.1 p1.7 |
| `ceo-ia-receita-30` | 30% dos CEOs viram a IA aumentar a receita nos últimos 12 meses e 26% viram custos caírem | 30% | verificado | `pwc-ceo-survey-2026` | s10 |
| `ceos-br-ia-expectativa-94` | 94% dos CEOs no Brasil dizem que a IA atende ou supera o retorno esperado | 94% | verificado | `ey-ceo-outlook-br-2026` | s10 |
| `ceos-br-ia-impacto-86` | 86% dos CEOs no Brasil esperam impacto significativo ou transformador da IA no modelo de negócio em dois anos | 86% | verificado | `ey-ceo-outlook-br-2026-pagina` | s10 |
| `governanca-agentes-br-27` | Só 27% das empresas no Brasil dizem ter governança madura para agentes de IA; no mundo, 21% | 27% | verificado | `deloitte-state-ai-2026-br` | s05 s10 p1.7 |
| `agentes-planejam-br-95` | 95% das empresas no Brasil planejam adotar agentes de IA em até dois anos | 95% | verificado | `deloitte-state-ai-2026-br` | s10 |
| `escala-pilotos-br-23` | Só 23% das empresas no Brasil levaram 40% ou mais dos seus pilotos de IA para a operação | 23% | verificado | `deloitte-state-ai-2026-br` | s05 s10 p1.2 |
| `escala-pilotos-mundo-25` | No mundo, só 25% das empresas levaram 40% ou mais dos seus pilotos de IA para a operação | 25% | verificado | `deloitte-state-ai-2026-br` | p1.2 |
| `kpmg-ia-valor-roi-24` | 74% das empresas dizem que seus casos de IA geram valor, mas só 24% têm retorno em vários casos de uso | 24% | verificado | `kpmg-tech-report-2026-release` | s10 |
| `kpmg-agentes-investem-88` | 88% das empresas já investem para embutir agentes de IA em seus sistemas | 88% | verificado | `kpmg-global-tech-report-2026` | s10 |
| `talento-transformacao-53` | 53% das empresas ainda não têm o talento necessário para tirar do papel seus planos de transformação digital | 53% | verificado | `kpmg-global-tech-report-2026` | s05 p1.4 |
| `ia-ligada-resultado-um-terco` | Menos de um terço das empresas consegue ligar os benefícios da IA a mudanças no resultado | 1/3 | verificado | `forrester-blog-2026` | s10 |
| `gasto-ia-adiado-25` | As empresas vão adiar para 2027 um quarto do gasto que planejavam fazer com IA em 2026 | 25% | verificado | `forrester-predictions-2026` | s05 s20 |
| `agentic-cancelados-40` | Mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027 | 40% | verificado | `gartner-agentic-2025` | s05 s20 p1.7 |
| `agentes-fornecedores-reais-130` | Dos milhares de fornecedores que dizem vender agentes de IA, só cerca de 130 são reais, estima o Gartner | 130 | verificado | `gartner-agentic-2025` | p1.7 |
| `agentes-fornecedor-abandono-70` | 70% das empresas vão abandonar, até 2028, agentes de IA construídos por engenheiros do próprio fornecedor, prevê o Gartner | 70% | verificado | `gartner-agentic-fde-2026` | s06 s16 |
| `genai-sem-impacto-95` | 95% das organizações não viram impacto mensurável no resultado com IA generativa, segundo estudo ligado ao MIT | 95% | fraco | `mit-nanda-vr-2025` | p1.7 |
| `comprar-vs-construir-67` | Soluções de IA compradas de fornecedores deram certo em 67% dos casos; as construídas em casa, em cerca de um terço | 67% | fraco | `fortune-mit-nanda-2025` | s18 |
| `gasto-ia-mundo-2026` | O gasto mundial com IA deve chegar a US$ 2,7 tri em 2026, alta de 49,5% | US$ 2,7 tri | verificado | `gartner-gasto-ia-2026` | – |
| `ia-prioridade-br-53` | Para 53% dos executivos no Brasil, IA generativa e agentes são a prioridade de investimento em tecnologia em 2026 | 53% | verificado | `abes-idc-2026` | s10 |
| `agentes-investem-br-40` | 40% das empresas no Brasil já investem em agentes de IA e outras 33% pretendem começar em 12 meses | 40% | verificado | `abes-idc-2026` | s10 |
| `agentes-producao-11` | Só 11% das organizações têm agentes de IA em produção; 38% ainda estão em piloto | 11% | verificado | `deloitte-tech-trends-2026` | p2.6 |
| `empresas-usam-ia-17` | 17% das empresas brasileiras com 10 ou mais empregados usaram IA em 2025 | 17% | verificado | `cetic-tic-empresas-2025`, `convergencia-cetic-2026` | – |
| `grandes-usam-ia-50` | Metade das grandes empresas brasileiras usa IA | 50% | divergente | `cetic-tic-empresas-2025` | – |
| `barreira-conhecimento-44` | 44% das empresas que tentaram implantar IA citam falta de conhecimento da equipe como obstáculo | 44% | a verificar | `tiinside-barreiras-ia-2026` | p2.5 |
| `gasto-ia-brasil-2026` | O gasto das empresas com IA no Brasil deve chegar a US$ 3,4 bi em 2026, alta de mais de 30% | US$ 3,4 bi | divergente | `idc-gasto-ia-br-2026` | – |
| `tic-vagas-33-mil` | O setor de tecnologia projeta 33 mil novas vagas com carteira assinada no Brasil até dezembro de 2026 | 33 mil | verificado | `brasscom-mercado-trabalho-2026` | – |

### Preço por resultado (7)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `mckinsey-honorarios-resultado-25` | Cerca de 25% dos honorários globais da McKinsey já estão atrelados a resultados | 25% | verificado | `bi-mckinsey-honorarios-2025` | s06 s07 |
| `deloitte-agentes-assinatura` | A Deloitte vende seus agentes de IA, a plataforma Zora AI, por assinatura em nuvem | – | verificado | `deloitte-zora-2025` | s06 |
| `ibm-consultoria-ativos` | A IBM chama de “consultoria baseada em ativos” o modelo que reaproveita ferramentas, modelos, dados e agentes próprios em vários projetos | – | verificado | `ibm-asset-based`, `ibm-enterprise-advantage-2026` | s06 s07 s18 |
| `compradores-saem-da-hora` | Compradores de serviços trocam o preço por pessoa alocada pelo preço por entrega ou por resultado | – | verificado | `everest-precos-ia` | s07 s18 |
| `clawback-contratos-60` | Até 2027, 60% dos grandes contratos de serviços de TI terão cláusulas que devolvem ao cliente parte dos ganhos com IA | 60% | verificado | `arn-gartner-clawback` | s07 s18 |
| `servicos-como-software-15-tri` | Serviços entregues por software podem virar um mercado de mais de US$ 1,5 tri até 2035, absorvendo receita de serviços de TI e de software | US$ 1,5 tri | verificado | `hfs-services-as-software-2026` | s07 |
| `preco-resultado-risco` | Preço puramente por resultado transfere o risco de entrega para o fornecedor e atrasa o reconhecimento da receita | – | a verificar | `pesquisa-dts-2026` | s07 |

### Consultorias em 2026 (34)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `mckinsey-agentes-25-mil` | A McKinsey opera com cerca de 25 mil agentes de IA ao lado de cerca de 40 mil pessoas | 25 mil | verificado | `bi-mckinsey-agentes-2026`, `itforum-mckinsey-agentes-2026` | s06 p2.6 |
| `frontier-alliance-2026` | A OpenAI fechou parcerias com McKinsey, BCG, Accenture e Capgemini para levar agentes de IA às empresas | – | verificado | `fortune-frontier-alliance-2026` | s06 |
| `bcg-tech-ia-40` | Tecnologia e IA já passam de 40% da receita do BCG, que faturou US$ 14,4 bi em 2025 | 40% | verificado | `bcg-receita-2026` | s06 |
| `am-conselho-global-ia` | A Alvarez & Marsal global criou um Conselho Global de IA para coordenar o uso de IA na entrega aos clientes | – | verificado | `am-ai-board-2026` | s06 s20 |
| `am-meta-ia-50-2028` | A Alvarez & Marsal global quer que metade da receita venha de trabalho com IA até 2028, até US$ 3,5 bi | 50% | verificado | `bloomberg-am-ia-2026`, `am-ai-board-2026` | s06 s20 p1.7 |
| `big4-plataformas-agentes` | Deloitte, PwC, EY e KPMG lançaram plataformas próprias de agentes de IA: Zora AI, agent OS, EY.ai e Workbench | – | verificado | `deloitte-zora-2025`, `pwc-agent-os-2025`, `ey-ai-agentic-2025`, `kpmg-workbench-2025` | s06 |
| `pwc-agent-os` | O agent OS da PwC coordena agentes de vários fornecedores num mesmo fluxo de trabalho | – | verificado | `pwc-agent-os-2025` | s06 |
| `ey-agentes-tributos-150` | A EY pôs 150 agentes de IA para apoiar 80 mil profissionais de tributos | 150 | verificado | `ey-ai-agentic-2025` | s12 |
| `kpmg-workbench-50` | A KPMG Workbench reúne 50 agentes e assistentes de IA, com cerca de mil em desenvolvimento, e sustenta as plataformas de entrega da firma | 50 | verificado | `kpmg-workbench-2025` | s06 |
| `kpmg-iso-42001` | A KPMG International foi a primeira entidade internacional entre Deloitte, PwC, EY e KPMG certificada na norma ISO 42001 de gestão de IA | – | verificado | `kpmg-iso42001-2025` | s10 p1.7 |
| `deloitte-claude-470-mil` | A Deloitte vai levar o Claude, da Anthropic, a 470 mil profissionais e certificar 15 mil | 470 mil | verificado | `anthropic-deloitte-2025` | s10 |
| `ey-ai-14-bi-2023` | A EY lançou a plataforma EY.ai em 2023, com US$ 1,4 bi investidos em IA | US$ 1,4 bi | verificado | `ey-ai-2023` | s10 |
| `pwc-google-250-agentes` | A PwC já construiu mais de 250 agentes de IA com o Google Cloud | 250 | verificado | `pwc-google-agentes-2025` | s10 |
| `pwc-espaco-ia-piracicaba` | A PwC abriu em Piracicaba (SP) o primeiro espaço do Brasil para empresas testarem a IA do Google Cloud | – | verificado | `pwc-ai-experience-zone-2025` | s10 |
| `accenture-claude-30-mil` | A Accenture criou um grupo de negócios com a Anthropic e vai treinar cerca de 30 mil profissionais em Claude | 30 mil | verificado | `accenture-anthropic-2025` | s16 |
| `pwc-toltiq-2026` | A PwC e a ToltIQ, plataforma de IA para diligência em transações, firmaram uma relação estratégica | – | verificado | `pwc-toltiq-2026` | s06 s14 p3.1 |
| `servicos-ia-fundos-anthropic` | Anthropic, Blackstone, Hellman & Friedman e Goldman Sachs criaram uma empresa para implantar IA nas empresas da rede desses investidores | – | verificado | `blackstone-anthropic-2026`, `cxo-ode-2026` | s06 s14 |
| `bain-replica-software-alvo` | A Bain usa IA para construir réplicas do software do alvo durante a diligência e testar se o produto é fácil de copiar | – | verificado | `decoder-bain-vibecoding-2026` | s06 s14 p3.1 |
| `bain-parceira-openai` | A Bain passou ao nível mais alto de parceria da OpenAI | – | verificado | `bain-openai-elite-2026` | s06 |
| `bain-parceria-anthropic` | A Bain anunciou parceria global com a Anthropic | – | verificado | `bain-anthropic-2026` | s06 |
| `alixpartners-compra-artium` | A AlixPartners, par mais comparável à A&M, comprou a Artium, consultoria de engenharia com agentes de IA | – | verificado | `alixpartners-artium-2026` | s06 s07 |
| `ibm-enterprise-advantage` | A IBM lançou um serviço de consultoria baseado em ativos para o cliente montar e operar a própria plataforma de agentes de IA | – | verificado | `ibm-enterprise-advantage-2026` | s06 s12 |
| `falconi-ia-100-mi` | A Falconi investiu R$ 100 mi em IA; 80% dos seus projetos em andamento automatizam processos com agentes de IA | R$ 100 mi | verificado | `jc-falconi-2026` | s06 s12 |
| `cit-flow-receita` | A CI&T faturou US$ 489,6 mi em 2025, alta de 11,5%, e tem plataforma própria de IA, a CI&T Flow | US$ 489,6 mi | verificado | `itforum-cit-2026` | s06 s12 |
| `deloitte-recife-800` | A Deloitte tem cerca de 800 profissionais no Porto Digital, no Recife, e mais de mil no Nordeste | 800 | verificado | `me-deloitte-nordeste-2026` | s12 |
| `ey-recife-150-projetos` | O centro de entrega da EY no Recife atendeu mais de 40 clientes em mais de 150 projetos no primeiro ano | 150 | verificado | `me-ey-recife-2026` | s12 |
| `capgemini-recife-1000` | A Capgemini planeja passar de cerca de 250 para mil profissionais no Recife até o fim de 2026 | 1.000 | verificado | `baguete-capgemini-2025` | s12 |
| `deloitte-aws-2031` | A Deloitte tem acordo de colaboração estratégica com a AWS até 2031 | 2031 | a verificar | `deloitte-aws-br` | s12 |
| `accenture-compra-tenbu` | A Accenture comprou a Tenbu, consultoria paulista de dados e IA | – | a verificar | `convergencia-accenture-tenbu` | s12 |
| `big4-cio-interino-nao-encontrado` | Não encontramos oferta de CIO interino em Deloitte, PwC, EY e KPMG | – | a verificar | `pesquisa-dts-2026` | s07 s10 p1.3 |
| `alixpartners-cio-interino` | A AlixPartners oferece CIO interino e redução de custo de TI para fundos de private equity | – | fraco | `peievents-alixpartners` | s10 p1.3 |
| `kpmg-cio-advisory` | A KPMG vende “CIO Advisory” e serviços de gestão de custos de TI com a Apptio | – | verificado | `kpmg-cio-advisory`, `kpmg-tbm-apptio` | s10 p1.5 |
| `ey-oferta-cio` | A EY organiza a oferta para CIOs em “Technology Strategy & Transformation”, com modelo operacional e finanças de TI | – | a verificar | `ey-tst-vaga` | s10 |
| `deloitte-oferta-cio` | A Deloitte oferece “Technology Strategy & Transformation” e “Technology Strategy & Architecture” a líderes de tecnologia | – | a verificar | `deloitte-tst-cy` | s10 |

### Reforma Tributária e ERP (20)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `cbs-plena-2027` | Em 01/01/2027 a CBS, novo tributo federal sobre consumo, passa a ser cobrada por inteiro, e PIS e Cofins deixam de existir | 01/01/2027 | verificado | `lc-214-2025`, `senado-reforma-2024` | s05 s12 s20 p2.2 |
| `reforma-teste-2026` | Em 2026 a Reforma Tributária roda em teste: 0,9% de CBS e 0,1% de IBS na nota fiscal, compensados com PIS e Cofins | 1% | verificado | `lc-214-2025`, `senado-reforma-2024` | s12 |
| `icms-iss-transicao-2033` | De 2029 a 2032 os tributos estaduais e municipais sobre consumo (ICMS e ISS) caem 10 pontos por ano; em 2033 deixam de existir | 2033 | verificado | `senado-reforma-2024` | s12 |
| `cbs-regulamentada-2026` | O decreto que regulamenta a CBS foi publicado em 30/04/2026 | 30/04/2026 | verificado | `decreto-12955-2026` | s12 |
| `nfe-rejeicao-suspensa` | A rejeição de notas fiscais eletrônicas sem os campos de IBS e CBS, prevista para 03/08/2026, foi suspensa; a obrigação de informar continua | 03/08/2026 | verificado | `sefin-ro-nfe-2026` | s12 |
| `sap-ecc-manutencao-2027` | A manutenção padrão da versão antiga do ERP da SAP (ECC) termina no fim de 2027; a estendida, paga à parte, vai até 2030 | 2027 | verificado | `sap-ecc-2020`, `sap-pos-2030-2026` | s05 s12 s20 p2.2 |
| `ecc-2027-junta-reforma` | Para quem ainda roda o ECC, 2027 junta a migração do ERP com a adaptação à Reforma Tributária | – | verificado | `baguete-ecc-2027` | s12 |
| `ecc-adiamento-2030` | Mais da metade das empresas que usam o ECC deve adiar a migração para o fim de 2030 | 50% | verificado | `baguete-ecc-2030` | s12 |
| `reforma-avaliacao-inicial-37` | 37% das empresas ainda estão na fase inicial de avaliação dos impactos da Reforma Tributária | 37% | verificado | `pwc-tributos-centro-2025` | s05 s12 p2.2 |
| `reforma-diagnostico-sistemas-70` | Quase 70% das empresas já começaram a diagnosticar ERP e sistemas fiscais para a Reforma: 37% no início e 32% em estágio avançado | 70% | verificado | `pwc-tributos-centro-2025` | s12 |
| `reforma-impacto-imediato-83` | 83% das empresas esperam impacto alto e imediato da Reforma Tributária | 83% | divergente | `pwc-tributos-centro-2025` | – |
| `erp-business-case-70` | Mais de 70% das iniciativas recentes de ERP não vão cumprir plenamente o objetivo original até 2027; até 25% vão falhar de forma grave | 70% | verificado | `gartner-erp`, `register-erp-2025` | s05 s12 p2.4 |
| `projetos-ti-estouro-45` | Grandes projetos de TI estouram o orçamento em 45%, atrasam 7% e entregam 56% menos valor que o previsto | 45% | verificado | `mckinsey-oxford-2012` | s12 p2.3 |
| `projetos-ti-estouro-75` | Em mais de 6 mil projetos de TI de 2001 a 2017, o estouro médio foi de 75% no orçamento e 46% no prazo, com 39% menos valor | 75% | verificado | `mckinsey-ti-setor-publico` | p2.3 |
| `erp-apuracao-no-erp-53` | 53,5% das empresas pretendem manter a apuração dos tributos dentro do ERP | 53,5% | fraco | `monitor-omnitax-2025` | p2.2 |
| `erp-trocas-reforma` | Requim, Vedacit e Ademicon trocaram de ERP para se adaptar à Reforma Tributária | – | verificado | `rt-trocas-erp` | s12 |
| `totvs-assistente-reforma` | A TOTVS criou um assistente de IA especialista em Reforma Tributária para seus clientes | – | verificado | `rt-totvs-chatbot` | s12 |
| `ey-software-notas-reforma` | A EY oferece software que lê notas fiscais e mostra os itens que mudam de alíquota com a Reforma | – | verificado | `ey-beyondtax-2025` | s12 |
| `kpmg-premio-fiscal-2025` | A KPMG Brasil foi premiada pela Thomson Reuters por implantar tecnologias fiscais complementares ao ERP | – | verificado | `kpmg-juntos25-2025` | s12 |
| `big4-reforma-pelo-tributario` | Deloitte, PwC, EY e KPMG entram na Reforma pela área tributária, com pesquisas, ferramentas fiscais e alianças, e não pela TI | – | a verificar | `pesquisa-dts-2026`, `pwc-tributos-centro-2025`, `ey-beyondtax-2025`, `kpmg-juntos25-2025` | s12 |

### M&A e private equity (23)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `pe-vc-metade-deals-2025` | Fundos de private equity e venture capital participaram de 50% das fusões e aquisições no Brasil em 2025, contra 43% em 2024 | 50% | verificado | `kpmg-ma-2025` | s05 s14 p3.1 p3.5 |
| `ma-transacoes-2025` | O Brasil teve 1.581 fusões e aquisições em 2025, praticamente o mesmo número de 2024 | 1.581 | verificado | `kpmg-ma-2025` | – |
| `tecnologia-lidera-ma-2025` | Tecnologia foi o setor com mais fusões e aquisições no Brasil em 2025, com cerca de 40% das transações | 40% | verificado | `kpmg-ma-2025` | s05 s14 |
| `ma-1s26-menos-negocios` | No 1º semestre de 2026 houve 35% menos fusões e aquisições, mas o valor subiu 22,3%, para R$ 195 bi | −35% | verificado | `kpmg-ma-1s26` | s05 s14 |
| `ti-lidera-ma-1s25-274` | Tecnologia da informação liderou as fusões e aquisições do 1º semestre de 2025, com 274 operações | 274 | verificado | `itforum-ma-1s25` | p3.1 |
| `tecnologia-lidera-ma-1s26` | Tecnologia e serviços digitais lideraram as fusões e aquisições do 1º semestre de 2026, com 104 transações | 104 | verificado | `economicnews-ttr-1s26` | s14 |
| `sinergias-dependem-ti-50-60` | De 50% a 60% das iniciativas de sinergia em fusões dependem fortemente de TI | 50 a 60% | verificado | `mckinsey-ti-ma-2011` | s14 p3.2 |
| `mbrf-sinergias-805` | Na fusão de Marfrig e BRF, que criou a MBRF, as sinergias mapeadas somam R$ 805 mi por ano | R$ 805 mi | verificado | `infomoney-mbrf-2025`, `suno-cade-mbrf-2025` | s14 p3.4 |
| `petz-cobasi-26-lojas` | O órgão de defesa da concorrência (Cade) aprovou a fusão de Petz e Cobasi com a venda de 26 lojas | 26 | verificado | `moneytimes-petz-cobasi-2025` | s14 |
| `braskem-controle-ig4` | A Novonor assinou a venda do controle da Braskem para um fundo assessorado pela IG4 | – | verificado | `istoe-braskem-2026` | s14 |
| `raizen-separacao-2027` | A Raízen vai se dividir em duas empresas, uma de energia e outra de distribuição de combustíveis, até o fim de 2027 | 2027 | verificado | `cenario-raizen-2026` | s14 p3.2 |
| `motiva-venda-aeroportos` | A Motiva concluiu a venda de seus aeroportos para a mexicana ASUR, com R$ 5,2 bi pelo capital | R$ 5,2 bi | verificado | `agenciainfra-motiva-2026` | s14 |
| `dd-codigo-75` | Com análise automatizada de código, a EY reduziu em mais de 75% o tempo de avaliação de software numa diligência | 75% | verificado | `cast-ey-dd` | s14 p3.1 |
| `ma-uso-ia-45` | O uso de IA em fusões e aquisições mais que dobrou em um ano: 45% dos profissionais já usam | 45% | verificado | `bain-ma-2026`, `bain-ma-genai-2025` | s14 |
| `ma-ia-generativa-86` | 86% das empresas e fundos pesquisados nos EUA já usam IA generativa em fusões e aquisições | 86% | verificado | `deloitte-genai-ma-2025` | s14 |
| `diligencia-comercial-voz` | Uma startup faz diligência comercial com agentes de voz que entrevistam clientes do alvo, a uma fração do custo de uma consultoria | – | verificado | `techcrunch-diligencesquared-2026` | s06 s14 |
| `diligencia-50-mil` | Diligência com agentes por cerca de US$ 50 mil, contra US$ 500 mil a US$ 1 mi | US$ 50 mil | fraco | `techcrunch-diligencesquared-2026` | – |
| `am-assist` | A Alvarez & Marsal global usa o A&M Assist, agente de IA que lê e resume milhares de páginas em diligências | – | verificado | `am-assist-2025` | s14 p3.1 |
| `am-diligencegpt` | A área de private equity da Alvarez & Marsal criou o DiligenceGPT, plataforma de IA generativa para diligência | – | verificado | `am-diligencegpt` | s14 p3.1 |
| `pwc-diligencia-ia` | A PwC vende “AI technology diligence” como oferta própria em transações | – | verificado | `pwc-ai-tech-diligence` | s14 |
| `pwc-harvey-10-mil` | A PwC licencia a clientes uma plataforma de IA para transações; um fluxo de diligência já rodou mais de 10 mil vezes | 10 mil | verificado | `pwc-harvey-2025` | s14 p3.1 |
| `deloitte-ma-tecnologia` | A Deloitte cobre o ciclo de tecnologia em transações: diligência, preparação para venda, separação e carve-out | – | a verificar | `deloitte-ma-tech-uk` | s14 |
| `ey-parthenon-tecnologia` | A EY-Parthenon atua em diligência de TI, integração, separação, custos de operação independente e preparação do Dia 1 | – | a verificar | `ey-parthenon-vaga` | s14 |

### Custo de TI e nuvem (13)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `vmware-8-15x` | Licenças VMware ficaram de 8 a 15 vezes mais caras depois da compra pela Broadcom | 8 a 15× | verificado | `baguete-vmware-2025` | s05 s16 p1.5 p4.3 |
| `ti-brasil-cresce-5-3` | O mercado de TI no Brasil deve crescer 5,3% em 2026, depois de 18,5% em 2025 | 5,3% | verificado | `abes-idc-2026` | s05 |
| `mercado-ti-brasil-2025` | O mercado de TI no Brasil somou US$ 67,8 bi em 2025, o 10º do mundo | US$ 67,8 bi | verificado | `abes-idc-2026` | – |
| `insumos-ti-importados-40` | Até 40% dos insumos da tecnologia usada pelas empresas no Brasil são importados | 40% | verificado | `tiinside-dolar-2025` | s05 s16 p1.5 |
| `nuvem-desperdicio-29` | 29% do gasto com infraestrutura e plataformas em nuvem é desperdiçado; é a primeira alta em cinco anos, puxada pela IA | 29% | verificado | `flexera-cloud-2026` | s05 s16 p1.5 |
| `custo-nuvem-economia-20-30` | Gestão madura do custo de nuvem economiza de 20% a 30% do gasto | 20 a 30% | a verificar | `itforum-finops` | p1.5 p4.3 |
| `negociacao-software-18` | Um agente de IA de negociação de software obteve 18% de economia média em mais de 4 mil negociações | 18% | verificado | `vertice-ana` | p1.5 p2.1 |
| `compra-software-15-dias` | Com um agente de IA de negociação, o ciclo de renovação de software ficou 15 dias mais curto | 15 dias | verificado | `vertice-ana` | p2.1 |
| `bancos-tecnologia-50-bi` | Os bancos no Brasil devem investir R$ 50,4 bi em tecnologia em 2026, alta de 8% | R$ 50,4 bi | verificado | `febraban-2026`, `forbes-febraban-2026` | s16 p4.6 |
| `bancos-nuvem-3-9-bi` | Os bancos devem gastar R$ 3,9 bi em migração para a nuvem em 2026, alta de 30% | R$ 3,9 bi | verificado | `febraban-2026` | s16 p4.3 |
| `bancos-ia-dados-3-bi` | Os bancos devem investir cerca de R$ 3 bi em IA e análise de dados em 2026 | R$ 3 bi | verificado | `febraban-2026` | s16 |
| `gasto-ti-mundo-2026` | O gasto mundial com TI deve chegar a US$ 6,37 tri em 2026, alta de 14,2% | US$ 6,37 tri | verificado | `gartner-gasto-ti-2026` | – |
| `aws-migracao-sem-custo` | A AWS não cobra pelos agentes de migração de mainframe, VMware e Windows e cobra US$ 0,035 por minuto de agente em transformações sob medida | US$ 0,035 | verificado | `aws-transform-precos` | s16 p4.3 |

### Resiliência e regulação (9)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `ataque-cm-800-mi` | O ataque à C&M Software, que conecta instituições ao Pix, desviou ao menos R$ 800 mi em julho de 2025 | R$ 800 mi | verificado | `infomoney-cm-2025` | s05 s16 p4.5 |
| `ataque-sinqia-710-mi` | O ataque ao ambiente de Pix da Sinqia desviou R$ 710 mi em agosto de 2025 | R$ 710 mi | verificado | `tecnoblog-sinqia-2025` | s05 s16 p4.5 |
| `cmn-5274-ciber-nuvem` | O Conselho Monetário Nacional endureceu as regras de cibersegurança e de contratação de nuvem do sistema financeiro, com prazo em 01/03/2026 | 01/03/2026 | verificado | `cmn-5274-2025` | s05 s16 p4.5 |
| `pl-ia-pos-eleicoes` | A votação do projeto de lei de IA (PL 2338) na Câmara ficou para depois das eleições de outubro de 2026 | – | verificado | `mobiletime-pl2338-2026` | s10 p1.7 |
| `anpd-agencia-200-cargos` | A Autoridade Nacional de Proteção de Dados virou agência reguladora, com 200 novos cargos | 200 | verificado | `teletime-anpd-2026` | s10 p1.7 |
| `lei-do-bem-2024` | 4.252 empresas usaram a Lei do Bem no ano-base 2024, com R$ 51,6 bi investidos em pesquisa, desenvolvimento e inovação | 4.252 | verificado | `mcti-lei-do-bem-2026`, `convergencia-lei-do-bem-2026` | s10 p1.6 |
| `lei-do-bem-2025` | No ano-base 2025, 4.598 empresas usaram a Lei do Bem, com renúncia fiscal estimada de R$ 15,8 bi | 4.598 | verificado | `mcti-lei-do-bem-2026`, `convergencia-lei-do-bem-2026` | s10 p1.6 |
| `lc224-corte-10` | A Lei Complementar 224/2025 cortou 10% dos benefícios fiscais federais a partir de 2026 | 10% | divergente | `correio-lc224-2026`, `tagd-lc224` | p1.6 |
| `redata-senado` | O Senado aprovou em 01/09/2026 o Redata, regime com R$ 5,2 bi em incentivos para data centers | R$ 5,2 bi | verificado | `mobiletime-redata-2026` | p1.6 p4.3 |

### Modernização (15)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `aws-modernizacao-4x` | A AWS diz modernizar sistemas até 4 vezes mais rápido com agentes de IA | 4× | verificado | `aws-transform-ga-2025`, `siliconangle-aws-transform-2025` | s16 p4.6 |
| `mckinsey-legacyx-90` | Num banco, agentes de IA da McKinsey converteram mais de 100 modelos de risco para nova linguagem com cerca de 90% de precisão | 90% | verificado | `mckinsey-legacyx` | s16 p4.6 |
| `modernizacao-ia-prazo-40-50` | A McKinsey diz que agentes de IA encurtam a modernização de sistemas legados em 40% a 50% | 40 a 50% | verificado | `mckinsey-ia-modernizacao` | s16 |
| `cobol-trimestres-ibm-13` | A Anthropic disse que a IA moderniza sistemas em COBOL “em trimestres, não anos”; as ações da IBM caíram 13% no dia | 13% | verificado | `anthropic-cobol-2026`, `malaymail-ibm-2026` | s06 s16 p4.6 |
| `accenture-gemini-mainframe` | A Accenture levou o Gemini, do Google, para sua plataforma de modernização de mainframe | – | verificado | `accenture-genwizard-2025` | s16 |
| `ibm-bob-45` | A IBM lançou o Bob, parceiro de desenvolvimento com IA; 80 mil usuários internos relatam 45% de ganho de produtividade | 45% | verificado | `ibm-bob-2026` | s16 |
| `copilot-modernizacao` | O GitHub Copilot passou a modernizar aplicações Java e .NET, com atualização de versões e preparação para a nuvem | – | verificado | `github-copilot-modernizacao-2025` | s16 |
| `copilot-xbox-88` | O time do Xbox relatou 88% menos esforço numa migração de .NET com o GitHub Copilot | 88% | a verificar | `thelettertwo-copilot-2025` | – |
| `bradesco-caixa-mainframe` | Bradesco e Caixa mantêm o mainframe no centro e o modernizam de forma contínua, sem substituí-lo | – | verificado | `convergencia-bradesco-caixa` | s16 p4.6 |
| `mainframe-roi-288-362` | Empresas relatam retorno de 288% a 362% em projetos de modernização de mainframe | 288 a 362% | verificado | `kyndryl-mainframe-2025` | s16 |
| `mainframe-talento-terceiros` | Para modernizar o mainframe, 70% das empresas têm dificuldade de achar profissionais e 74% dependem muito de terceiros | 74% | verificado | `kyndryl-mainframe-2025` | s16 p4.4 |
| `arquitetura-agentes-40` | Uma ferramenta de arquitetura corporativa promete automatizar cerca de 40% do trabalho rotineiro de arquitetura com agentes | 40% | verificado | `ardoq-2026` | s16 p4.1 |
| `ibm-assistente-mainframe` | A IBM oferece um assistente de IA para modernizar código no mainframe (watsonx Code Assistant for Z) | – | a verificar | `ibm-wcaz-2025` | s16 |
| `google-mainframe-ia` | O Google Cloud oferece ferramentas de avaliação e reescrita de mainframe com IA | – | a verificar | `google-mainframe` | s16 |
| `leanix-agentes` | O SAP LeanIX ganhou um hub para inventariar agentes de IA dentro da arquitetura da empresa | – | a verificar | `sap-leanix-2026` | p4.1 |

### Métodos lúdicos (7)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `premortem-metodo` | No pré-mortem, o time imagina que o projeto já fracassou e lista os motivos antes de começar | – | verificado | `hbr-premortem-2007` | s19 |
| `premortem-retrospectiva-30` | Imaginar que um evento já aconteceu aumenta em 30% a capacidade de apontar as razões de um resultado futuro | 30% | verificado | `hbr-premortem-2007` | s19 |
| `exercicio-mesa-nist` | Exercício de mesa é uma discussão guiada por um cenário, em que quem tem papel no plano de TI testa se o plano funciona | – | verificado | `nist-sp-800-84` | s19 p4.5 |
| `jogos-de-guerra-executivos` | Jogos de guerra ajudam executivos a testar decisões contra a reação de concorrentes quando a incerteza é moderada | – | verificado | `mckinsey-war-games-2011` | s19 |
| `dia-1-simulacoes` | Na preparação do Dia 1 de uma fusão, as equipes fazem sessões de prontidão e simulações nas semanas antes do fechamento | – | verificado | `ey-integracao-nove-passos` | s19 p3.3 |
| `dia-1-pontos-de-prontidao` | A Deloitte recomenda “pontos de prontidão” que testam sob pressão o plano do Dia 1 antes do fechamento | – | verificado | `deloitte-day-one` | s19 p3.2 |
| `jogos-simulacao-aprendizado` | Treinamentos com jogos de simulação elevaram a confiança em 20% e o conhecimento prático em 14% frente a outros métodos | 20% | verificado | `sitzmann-2011` | s19 |

### Estrutura do portfólio (20)

| id | Texto | Nº | Status | Fontes | Uso |
|---|---|---|---|---|---|
| `portfolio-4-pilares-29-servicos` | A DTS tem 4 pilares e 29 serviços no portfólio oficial | 29 | verificado | `portfolio-dts` | s03 s04 |
| `portfolio-servicos-por-pilar` | Serviços por pilar: IT Advisory 10 · Technology Transformation 7 · Tech M&A 8 · Modernization 4 | 10 · 7 · 8 · 4 | verificado | `portfolio-dts` | s03 s04 |
| `portfolio-p1-servicos` | IT Advisory (10): Tech Maturity & Value Assessment; C-Level Tech Enablement; Embedded Tech Leadership; Interim CIO / CTO Leadership; Digital Strategy & Roadmapping; Operating Model Design & Tech Org Restructuring; IT Resilience & Business Continuity Planning; Tech Spend Optimization; Strategic Tech Tax / Accounting Planning; Innovation Tax Incentives Advisory | 10 | verificado | `portfolio-dts` | s04 |
| `portfolio-p2-servicos` | Technology Transformation (7): IT Sourcing (Software & Vendor) Selection; ERP Readiness & Gap Analysis; TMO; Gestão de Mudanças Tech; Modelo de Implantação e Governança; Project Remediation; IT Business Partner | 7 | verificado | `portfolio-dts` | s04 |
| `portfolio-p3-servicos` | Tech M&A (8): IT M&A Playbook; IT Due Diligence (Buy Side); IT Integration & Separation Planning; IT Integration Management Office; IT Due Diligence (Sell Side); IT Separation Strategy & Design; IT Separation Management Office; IT Synergies & Value Creation | 8 | verificado | `portfolio-dts` | s04 |
| `portfolio-p4-servicos` | Modernization (4): Strategy Architecture; Strategy Application; Infrastructure Management; Complex Migrations Support | 4 | verificado | `portfolio-dts` | s04 |
| `portfolio-sem-ia-no-metodo` | Nenhum dos 29 serviços descreve IA no método | 0 | verificado | `portfolio-dts` | s03 |
| `portfolio-cadeia-valor-am` | A DTS se conecta à cadeia de valor da A&M ao lado de Transformação, Turnaround, Estratégia & M&A e Data & IA | – | verificado | `portfolio-dts` | s03 s04 |
| `proposta-24-produtos` | A proposta reorganiza os 29 serviços em 24 produtos: 7 · 6 · 5 · 6 por pilar | 24 | verificado | `proposta-dts-2027` | s08 s09 |
| `proposta-5-15-4` | Dos 24 produtos, 5 mantêm a essência, 15 ganham IA no método e 4 são novos, criados com IA | 5 · 15 · 4 | verificado | `proposta-dts-2027` | s08 s09 |
| `proposta-raio-x-4-13-10-2` | No raio-X dos 29 serviços: manter 4, aprimorar com IA 13, fundir 10 e deixar de vender sozinhos 2 | 4 · 13 · 10 · 2 | verificado | `proposta-dts-2027` | s07 |
| `proposta-fusoes-13-em-6` | 13 serviços que se sobrepõem viram 6 produtos | 13 → 6 | verificado | `proposta-dts-2027` | s08 |
| `proposta-2-saem-isolados` | IT Business Partner e IT M&A Playbook deixam de ser vendidos sozinhos | 2 | verificado | `proposta-dts-2027` | s07 s08 |
| `proposta-4-novos` | Quatro produtos novos com IA: AI Value & Governance Office, AI-Native IT Productivity, PE Tech Value Radar e Legacy X-Ray & AI Modernization | 4 | verificado | `proposta-dts-2027` | s08 s09 |
| `proposta-4-signature` | Quatro produtos A&M Signature, onde o direito de vencer é maior: 1.3, 1.5, 2.4 e 3.1 | 4 | verificado | `proposta-dts-2027` | s09 |
| `proposta-resiliencia-muda-pilar` | IT Resilience & Business Continuity Planning sai de IT Advisory e vai para Modernization (4.5) | – | verificado | `proposta-dts-2027` | s08 s11 |
| `proposta-7-portoes` | Um serviço só vira produto depois de passar por sete portões, da dor do cliente ao piloto | 7 | verificado | `proposta-dts-2027` | s18 |
| `proposta-4-jogos` | Quatro jogos de entrada, um por pilar: Mesa do Conselho, Pré-mortem 2027, Jogo do Dia 1 e Exercício de Crise | 4 | verificado | `proposta-dts-2027` | s19 |
| `proposta-4-ondas` | Quatro ondas de lançamento: Fundação, Núcleo Signature, Novos produtos com IA e Recorrência | 4 | verificado | `proposta-dts-2027` | s20 |
| `pesquisa-4-frentes` | A pesquisa de mercado foi feita em 06/10/2026, em quatro frentes: grandes firmas de auditoria e consultoria; estratégia, integradores e pares; mercado Brasil e regulação; ferramentas de IA | 4 | verificado | `pesquisa-dts-2026` | s02 |

## Tabela de fontes (145)

| id | Organização | Título original | Data | Tipo | Link |
|---|---|---|---|---|---|
| `portfolio-dts` | Alvarez & Marsal Brasil | Portfólio Digital & Tech Services (documento interno) | 2026 | documento interno | – |
| `pesquisa-dts-2026` | Alvarez & Marsal Brasil · DTS | Pesquisa de mercado DTS 2027: quatro relatórios (pasta pesquisa/ do repositório) | 06/10/2026 | documento interno | – |
| `proposta-dts-2027` | Alvarez & Marsal Brasil · DTS | Planejamento Estratégico DTS 2027: proposta de portfólio (este documento) | 10/2026 | documento interno | – |
| `pwc-ceo-survey-2026` | PwC | PwC 2026 Global CEO Survey (29th Annual Global CEO Survey) | 01/2026 | primária | [abrir](https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-global-ceo-survey.html) |
| `deloitte-state-ai-2026-br` | Deloitte Brasil | IA entra em fase de escala enquanto papel estratégico avança nas empresas; mercado brasileiro se destaca, aponta Deloitte (State of AI in the Enterprise 2026) | 2026 | primária | [abrir](https://www.deloitte.com/br/pt/about/press-room/state-of-ai-2026.html) |
| `kpmg-global-tech-report-2026` | KPMG International | KPMG Global tech report 2026 | 01/2026 | primária | [abrir](https://kpmg.com/xx/en/our-insights/ai-and-technology/global-tech-report.html) |
| `kpmg-tech-report-2026-release` | KPMG | Press Statement: KPMG's Global Tech Report 2026 | 01/2026 | primária | [abrir](https://kpmg.com/za/en/newsroom/press-releases/2026/01/global-tech-report-2026.html) |
| `ey-ceo-outlook-br-2026` | EY Brasil | CEOs no Brasil consideram que IA atende ou excede expectativas, diz estudo da EY-Parthenon | 04/2026 | primária | [abrir](https://www.ey.com/pt_br/newsroom/2026/04/ceos-brasil-consideram-ia-atende-excede-expectativas-estudo-ey-pathernon) |
| `ey-ceo-outlook-br-2026-pagina` | EY Brasil | CEO Outlook Survey 2026: líderes no Brasil priorizam IA e parcerias estratégicas | 04/2026 | primária | [abrir](https://www.ey.com/pt_br/ceo/ceo-outlook-abril-2026-lideres-no-brasil-priorizam-ia-e-parcerias-estrategicas) |
| `forrester-predictions-2026` | Forrester | Forrester's 2026 Technology & Security Predictions: As AI's Hype Fades, Enterprises Will Defer 25% Of Planned AI Spend To 2027 | 28/10/2025 | primária | [abrir](https://www.businesswire.com/news/home/20251028226928/en/Forrester%E2%80%99s-2026-Technology-Security-Predictions-As-AI%E2%80%99s-Hype-Fades-Enterprises-Will-Defer-25-Of-Planned-AI-Spend-To-2027) |
| `forrester-blog-2026` | Forrester | Predictions 2026: AI Moves From Hype To Hard Hat Work | 10/2025 | primária | [abrir](https://www.forrester.com/blogs/predictions-2026-ai-moves-from-hype-to-hard-hat-work) |
| `gartner-agentic-2025` | Gartner | Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027 | 25/06/2025 | primária | [abrir](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) |
| `gartner-agentic-fde-2026` | Gartner | Gartner Predicts 70% of Enterprises Will Abandon Agentic AI Built by Vendor Forward-Deployed Engineering by 2028 | 29/09/2026 | primária | [abrir](https://www.gartner.com/en/newsroom/press-releases/2026-09-29-gartner-predicts-70-percent-of-enterprises-will-abandon-agentic-ai-built-by-vendor-forward-deployed-engineering-by-2028) |
| `gartner-gasto-ia-2026` | Gartner | Gartner Forecasts Worldwide AI Spending to Grow 49.5% in 2026 | 16/09/2026 | primária | [abrir](https://www.gartner.com/en/newsroom/press-releases/2026-09-16-gartner-forecasts-worldwide-ai-spending-to-grow-49-point-5-percent-in-2026) |
| `mit-nanda-vr-2025` | Virtualization Review (relatório da iniciativa NANDA, ligada ao MIT) | MIT Report Finds Most AI Business Investments Fail, Reveals 'GenAI Divide' | 19/08/2025 | imprensa | [abrir](https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx) |
| `fortune-mit-nanda-2025` | Fortune | An MIT report that 95% of AI pilots fail spooked investors. But the reason why those pilots failed is what should make the C-suite anxious | 21/08/2025 | imprensa | [abrir](https://fortune.com/2025/08/21/an-mit-report-that-95-of-ai-pilots-fail-spooked-investors-but-the-reason-why-those-pilots-failed-is-what-should-make-the-c-suite-anxious/) |
| `abes-idc-2026` | ABES (com IDC) | Brasil mantém liderança em TI na América Latina, cresce acima da expectativa em 2025, mas desacelera ritmo de crescimento neste ano e consolida nova fase do mercado, aponta estudo da ABES | 2026 | primária | [abrir](https://abes.org.br/brasil-mantem-lideranca-em-ti-na-america-latina-cresce-acima-da-expectativa-em-2025-mas-desacelera-ritmo-de-crescimento-neste-ano-e-consolida-nova-fase-do-mercado-aponta-estudo-da-abes-2/) |
| `deloitte-tech-trends-2026` | Deloitte | Tech Trends 2026 | 2025 | primária | [abrir](https://www.deloitte.com/nl/en/Industries/technology/perspectives/technology-trends.html) |
| `cetic-tic-empresas-2025` | Cetic.br / NIC.br | TIC Empresas 2025 (apresentação de lançamento) | 2026 | primária | [abrir](https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf) |
| `convergencia-cetic-2026` | Convergência Digital | Quase 100 mil empresas brasileiras fizeram uso de alguma inteligência artificial | 2026 | imprensa | [abrir](https://convergenciadigital.com.br/mercado/quase-100-mil-empresas-brasileiras-fizeram-uso-de-alguma-inteligencia-artificial/) |
| `tiinside-barreiras-ia-2026` | TI Inside | A IA já entrou nas empresas brasileiras, mas ainda de forma concentrada e padronizada | 25/06/2026 | imprensa | [abrir](https://tiinside.com.br/25/06/2026/a-ia-ja-entrou-nas-empresas-brasileiras-mas-ainda-de-forma-concentrada-e-padronizada/) |
| `idc-gasto-ia-br-2026` | EuQueroInvestir (dados IDC) | Brasil lidera investimentos em IA na América Latina em 2026, diz IDC | 2026 | imprensa | [abrir](https://euqueroinvestir.com/economia/brasil-lidera-investimentos-em-ia-na-america-latina-em-2026-diz-idc) |
| `brasscom-mercado-trabalho-2026` | Brasscom | Relatório Perspectivas do Mercado de Trabalho do Macrossetor TIC | 2026 | primária | [abrir](https://brasscom.org.br/wp-content/uploads/2026/07/Relatorio-Pespectivas-do-Mercado-de-Trabalho-Apresentacao-v9.pdf) |
| `bi-mckinsey-honorarios-2025` | Business Insider (via Yahoo Finance) | AI is reshaping how McKinsey makes money | 11/2025 | imprensa | [abrir](https://finance.yahoo.com/news/ai-reshaping-mckinsey-makes-money-195132745.html) |
| `ibm-asset-based` | IBM | What is asset-based consulting? | 2025 | empresa | [abrir](https://www.ibm.com/think/topics/asset-based-consulting) |
| `everest-precos-ia` | Everest Group | AI agent-based pricing: will it become a reality? | s/d | primária | [abrir](https://www.everestgrp.com/blogs/ai-agent-based-pricing-will-it-become-a-reality) |
| `arn-gartner-clawback` | ARN (citando o Gartner) | AI services require transparent and modern pricing models from MSPs | 2025 | imprensa | [abrir](https://www.arnnet.com.au/article/4102083/ai-services-require-transparent-and-modern-pricing-models-from-msps.html) |
| `hfs-services-as-software-2026` | HFS Research | HFS India Summit Feb 2026: Agents of Disruption Session | 02/2026 | primária | [abrir](https://www.hfsresearch.com/wp-content/uploads/pdf/HFS-India-Summit-Feb-2026-Agents-of-Disruption-Session.pdf) |
| `bi-mckinsey-agentes-2026` | Business Insider (via AOL) | McKinsey CEO Bob Sternfels says the firm now has 60,000 employees: 25,000 of them are AI agents | 01/2026 | imprensa | [abrir](https://www.aol.com/articles/ceo-bob-sternfels-says-mckinsey-104101693.html) |
| `itforum-mckinsey-agentes-2026` | IT Forum | McKinsey soma 25 mil agentes de IA ao quadro de funcionários | 01/2026 | imprensa | [abrir](https://itforum.com.br/noticias/mckinsey-25-mil-agentes-ia-funcionarios/) |
| `fortune-frontier-alliance-2026` | Fortune | OpenAI partners with McKinsey, BCG, Accenture and Capgemini to push its Frontier AI agent platform | 23/02/2026 | imprensa | [abrir](https://fortune.com/2026/02/23/openai-partners-with-mckinsey-bcg-accenture-and-capgemini-to-push-its-frontier-ai-agent-platform/) |
| `bcg-receita-2026` | BCG | BCG Reports $14.4 Billion in Revenue, Marking 22nd Consecutive Year of Growth | 23/04/2026 | empresa | [abrir](https://www.bcg.com/press/23april2026-bcg-revenue-22nd-consecutive-year-growth) |
| `am-ai-board-2026` | Alvarez & Marsal | Alvarez & Marsal Announces Expansion of AI Capabilities | 05/05/2026 | empresa | [abrir](https://www.alvarezandmarsal.com/press-release/alvarez-marsal-announces-expansion-of-ai-capabilities) |
| `bloomberg-am-ia-2026` | Bloomberg | Alvarez & Marsal Wants to Make $3.5 Billion From AI Work by 2028 | 04/05/2026 | imprensa | [abrir](https://www.bloomberg.com/news/articles/2026-05-04/alvarez-marsal-wants-to-make-3-5-billion-from-ai-work-by-2028) |
| `deloitte-zora-2025` | Deloitte | Deloitte Unveils Zora AI, Agentic AI for Tomorrow's Workforce | 18/03/2025 | empresa | [abrir](https://www2.deloitte.com/us/en/pages/about-deloitte/articles/press-releases/deloitte-unveils-zora-ai-agentic-ai-for-tomorrows-workforce.html) |
| `pwc-agent-os-2025` | PwC | PwC launches AI agent operating system to revolutionize AI workflows for enterprises | 27/03/2025 | empresa | [abrir](https://www.pwc.com/us/en/about-us/newsroom/press-releases/pwc-launches-ai-agent-operating-system-enterprises.html) |
| `ey-ai-agentic-2025` | EY | EY launching EY.ai Agentic Platform, created with NVIDIA AI, to drive multi-sector transformation starting with tax, risk and finance domains | 18/03/2025 | empresa | [abrir](https://www.ey.com/en_gl/newsroom/2025/03/ey-launching-ey-ai-agentic-platform-created-with-nvidia-ai-to-drive-multi-sector-transformation-starting-with-tax-risk-and-finance-domains) |
| `kpmg-workbench-2025` | KPMG International | KPMG launches KPMG Workbench: a multi-agent AI platform, transforming client delivery and ways of working across the global organization | 17/06/2025 | empresa | [abrir](https://kpmg.com/xx/en/media/press-releases/2025/06/kpmg-launches-a-multi-agent-ai-platform-transforming-client-delivery-and-ways-of-working-across-the-global-organization.html) |
| `kpmg-iso42001-2025` | KPMG International | KPMG International becomes first Big Four international entity to attain ISO 42001 certification for AI Management Systems | 12/2025 | empresa | [abrir](https://kpmg.com/xx/en/media/press-releases/2025/12/kpmg-international-first-to-attain-iso-certification-for-ai-management-systems.html) |
| `anthropic-deloitte-2025` | Anthropic | Deloitte brings Claude to 470,000 people | 10/2025 | empresa | [abrir](https://www.anthropic.com/news/deloitte-anthropic-partnership) |
| `ey-ai-2023` | EY | EY launches artificial intelligence platform EY.ai and invests US$1.4 billion | 09/2023 | empresa | [abrir](https://www.ey.com/en_ch/newsroom/2023/09/ey-launches-artificial-intelligence-platform-ey-ai) |
| `pwc-google-agentes-2025` | PwC | PwC scales global AI agent ecosystem with Google Cloud, building more than 100 in EMEA for over 250 agents worldwide | 15/10/2025 | empresa | [abrir](https://www.pwc.com/gx/en/news-room/press-releases/2025/scales-global-ai-agent-ecosystem.html) |
| `pwc-ai-experience-zone-2025` | PwC Brasil | PwC anuncia lançamento da Google Cloud AI Experience Zone no Brasil | 10/09/2025 | empresa | [abrir](https://www.pwc.com.br/pt/sala-de-imprensa/release/pwc-anuncia-lancamento-da-google-cloud-ai-experience-zone-no-brasil.html) |
| `accenture-anthropic-2025` | Accenture | Accenture and Anthropic Launch Multi-Year Partnership to Drive Enterprise AI Innovation and Value Across Industries | 09/12/2025 | empresa | [abrir](https://newsroom.accenture.com/news/2025/accenture-and-anthropic-launch-multi-year-partnership-to-drive-enterprise-ai-innovation-and-value-across-industries) |
| `pwc-toltiq-2026` | PwC | Reimagining deals for the Age of AI: PwC and ToltIQ enter strategic relationship | 15/06/2026 | empresa | [abrir](https://www.pwc.com/us/en/about-us/newsroom/press-releases/reimagining-deals-for-the-age-of-ai.html) |
| `blackstone-anthropic-2026` | Blackstone | Anthropic Partners with Blackstone, Hellman & Friedman, and Goldman Sachs to Launch Enterprise AI Services Firm | 04/05/2026 | empresa | [abrir](https://blackstone.com/news/press/anthropic-partners-with-blackstone-hellman-friedman-and-goldman-sachs-to-launch-enterprise-ai-services-firm) |
| `cxo-ode-2026` | CXO Digital Pulse | Anthropic, Blackstone and Hellman & Friedman Launch Enterprise AI Services Firm Ode | 07/2026 | imprensa | [abrir](https://www.cxodigitalpulse.com/anthropic-blackstone-and-hellman-friedman-launch-enterprise-ai-services-firm-ode/) |
| `decoder-bain-vibecoding-2026` | The Decoder (citando o Financial Times) | Vibecoding is becoming a deal-breaker test for software acquisitions | 07/2026 | imprensa | [abrir](https://the-decoder.com/vibecoding-is-becoming-a-deal-breaker-test-for-software-acquisitions/) |
| `bain-openai-elite-2026` | Bain & Company | Bain & Company named an OpenAI Elite Partner | 20/07/2026 | empresa | [abrir](https://www.bain.com/about/media-center/press-releases/2026/bain-company-named-an-openai-elite-partner/) |
| `bain-anthropic-2026` | Bain & Company | Bain & Company announces partnership with Anthropic to accelerate clients' enterprise AI transformations | 25/08/2026 | empresa | [abrir](https://www.bain.com/about/media-center/press-releases/2026/bain-company-announces-partnership-with-anthropic-to-accelerate-clients-enterprise-ai-transformations/) |
| `alixpartners-artium-2026` | AlixPartners | AlixPartners acquires leading agentic AI consulting firm, Artium | 04/08/2026 | empresa | [abrir](https://www.alixpartners.com/newsroom/alixpartners-acquires-leading-agentic-ai-consulting-firm-artium/) |
| `ibm-enterprise-advantage-2026` | IBM | IBM Launches Enterprise Advantage Service to Help Businesses Scale Agentic AI | 19/01/2026 | empresa | [abrir](https://newsroom.ibm.com/2026-01-19-ibm-launches-enterprise-advantage-service-to-help-businesses-scale-agentic-ai) |
| `jc-falconi-2026` | Jornal do Comércio | Falconi investe R$ 100 milhões em IA e cresce 90% em vendas em tech | 29/09/2026 | imprensa | [abrir](https://www.jornaldocomercio.com/colunas/mercado-digital/2026/09/1264872-falconi-investe-rs-100-milhoes-em-ia-cresce-90-vendas-em-tech.html) |
| `itforum-cit-2026` | IT Forum | CI&T termina ano fiscal de 2025 com quase US$ 500 mi em receita | 03/2026 | imprensa | [abrir](https://itforum.com.br/?p=9619441) |
| `me-deloitte-nordeste-2026` | Movimento Econômico | José Luiz Sampaio vai comandar expansão da Deloitte no Nordeste | 11/06/2026 | imprensa | [abrir](https://movimentoeconomico.com.br/economia/negocios/2026/06/11/jose-luiz-sampaio-vai-comandar-expansao-da-deloitte-no-nordeste/) |
| `me-ey-recife-2026` | Movimento Econômico | Mais de 40 clientes e 150 projetos: EY fecha 1º ano no Porto Digital com expansão | 20/07/2026 | imprensa | [abrir](https://movimentoeconomico.com.br/tecnologia/2026/07/20/mais-de-40-clientes-e-150-projetos-ey-fecha-1o-ano-no-porto-digital-com-expansao/) |
| `baguete-capgemini-2025` | Baguete | Capgemini vai quadruplicar em Recife | 15/10/2025 | imprensa | [abrir](https://www.baguete.com.br/noticias/capgemini-vai-quadruplicar-em-recife) |
| `deloitte-aws-br` | Deloitte Brasil | Deloitte e AWS: acordo de colaboração estratégica (sala de imprensa) | s/d | empresa | [abrir](https://www.deloitte.com/br/pt/about/press-room/deloitte-aws.html) |
| `convergencia-accenture-tenbu` | Convergência Digital | Accenture compra paulista Tenbu para avançar em IA e analytics | s/d | imprensa | [abrir](https://convergenciadigital.com.br/especial/cloud/accenture-compra-paulista-tenbu-para-avanar-em-ia-e-analytics/) |
| `peievents-alixpartners` | PEI Events (Operating Partners Forum) | AlixPartners: página de patrocinador | s/d | imprensa | [abrir](https://live.peievents.com/operating-partners/sponsors/alixpartners) |
| `kpmg-cio-advisory` | KPMG Hungria | CIO Advisory | s/d | empresa | [abrir](https://kpmg.com/hu/en/home/services/advisory/management/it/cio-advisory.html) |
| `kpmg-tbm-apptio` | KPMG (EUA) | Empowering your TBM program | s/d | empresa | [abrir](https://kpmg.com/kpmg-us/content/dam/kpmg/alliance/pdf/apptio-empowering-tbm-program.pdf) |
| `ey-tst-vaga` | EY (vaga publicada) | Manager – Consulting – Technology Strategy and Transformation | s/d | empresa | [abrir](https://jobs.anitab.org/companies/ey-2/jobs/77700919-manager-consulting-technology-strategy-and-transformation) |
| `deloitte-tst-cy` | Deloitte Chipre | Technology Strategy & Transformation | s/d | empresa | [abrir](https://www2.deloitte.com/cy/en/pages/technology/solutions/technology-strategy-and-transformation.html) |
| `lc-214-2025` | Presidência da República | Lei Complementar nº 214, de 16 de janeiro de 2025 (institui o IBS, a CBS e o Imposto Seletivo) | 16/01/2025 | oficial | [abrir](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm) |
| `senado-reforma-2024` | Agência Senado | Novos tributos começam a ser testados em 2026 e transição vai até 2033 | 16/12/2024 | oficial | [abrir](https://www12.senado.leg.br/noticias/materias/2024/12/16/novos-tributos-comecam-a-ser-testados-em-2026-e-transicao-vai-ate-2033) |
| `decreto-12955-2026` | Presidência da República | Decreto nº 12.955, de 30 de abril de 2026 (regulamenta a CBS) | 30/04/2026 | oficial | [abrir](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12955.htm) |
| `sefin-ro-nfe-2026` | Secretaria de Finanças de Rondônia · Portal da Reforma Tributária | Comitê Gestor do IBS e Receita Federal do Brasil decidem não rejeitar NF-e sem as informações da CBS e IBS | 04/08/2026 | oficial | [abrir](https://reformatributaria.sefin.ro.gov.br/2026/08/04/comite-gestor-do-ibs-e-receita-federal-do-brasil-decidem-nao-rejeitar-nfe-sem-as-informacoes-da-cbs-e-ibs/) |
| `sap-ecc-2020` | SAP | SAP Extends Its Innovation Commitment for SAP S/4HANA, Provides Clarity and Choice on SAP Business Suite 7 | 02/2020 | empresa | [abrir](https://news.sap.com/africa/2020/02/sap-extends-its-innovation-commitment-for-sap-s-4hana-provides-clarity-and-choice-on-sap-business-suite-7/) |
| `sap-pos-2030-2026` | SAP | Planning Beyond 2030: What SAP Business Suite 7 and SAP NetWeaver Customers Using Third-Party Databases or Java Need to Know | 10/2026 | empresa | [abrir](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/) |
| `baguete-ecc-2027` | Baguete | 2027 é um ultimato para quem ainda roda SAP ECC | s/d | imprensa | [abrir](https://www.baguete.com.br/noticias/2027-e-um-ultimato-para-quem-ainda-roda-sap-ecc) |
| `baguete-ecc-2030` | Baguete | SAP ECC: metade dos clientes vão ficar até 2030 | s/d | imprensa | [abrir](https://www.baguete.com.br/noticias/sap-ecc-metade-dos-clientes-vao-ficar-ate-2030) |
| `pwc-tributos-centro-2025` | PwC Brasil | Tributos no centro: caminhos para reinvenção das empresas brasileiras | 2025 | primária | [abrir](https://www.pwc.com.br/pt/estudos/servicos/assessoria-tributaria-societaria/2025/reforma-tributaria-sobre-consumo.pdf) |
| `gartner-erp` | Gartner | What IT Leaders Must Do to Avoid Disappointing ERP Initiatives | 2024 | primária | [abrir](https://www.gartner.com/en/information-technology/insights/what-it-leaders-must-do-to-avoid-disappointing-erp-initiatives) |
| `register-erp-2025` | The Register | ERP carnage continues as orgs jump in unprepared | 13/11/2025 | imprensa | [abrir](https://www.theregister.com/2025/11/13/erp_disaster_gartner/) |
| `mckinsey-oxford-2012` | McKinsey & Company (com a Universidade de Oxford) | Delivering large-scale IT projects on time, on budget, and on value | 2012 | primária | [abrir](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value) |
| `mckinsey-ti-setor-publico` | McKinsey & Company | Unlocking the potential of public-sector IT projects | s/d | primária | [abrir](https://www.mckinsey.com/industries/public-sector/our-insights/unlocking-the-potential-of-public-sector-it-projects) |
| `monitor-omnitax-2025` | Monitor Mercantil (pesquisa Omnitax) | Grandes empresas aceleram busca por soluções tecnológicas para enfrentar a reforma tributária | 2025 | imprensa | [abrir](https://monitormercantil.com.br/grandes-empresas-aceleram-busca-por-solucoes-tecnologicas-para-enfrentar-a-reforma-tributaria/) |
| `rt-trocas-erp` | Portal Reforma Tributária | Requim, Vedacit e Ademicon trocam de ERP para se adaptar às novas exigências da reforma tributária | s/d | imprensa | [abrir](https://www.reformatributaria.com/tecnologia/requim-vedacit-e-ademicon-trocam-de-erp-para-se-adaptar-as-novas-exigencias-da-reforma-tributaria/) |
| `rt-totvs-chatbot` | Portal Reforma Tributária | TOTVS cria Chatbot Especialista para apoiar empresas na transição da reforma tributária | s/d | imprensa | [abrir](https://www.reformatributaria.com/brasil/totvs-lanca-chatbot-especialista-para-apoiar-empresas-na-transicao-da-reforma-tributaria/) |
| `ey-beyondtax-2025` | EY Brasil | Tecnologia já permite calcular os impactos da reforma tributária para as empresas | 01/2025 | empresa | [abrir](https://www.ey.com/pt_br/newsroom/2025/01/tecnologia-permite-calcular-impactos-reforma-tributaria) |
| `kpmg-juntos25-2025` | KPMG Brasil | KPMG em premiação da Thomson Reuters | 11/2025 | empresa | [abrir](https://kpmg.com/br/pt/home/insights/2025/11/kpmg-em-premiacao-da-thomson-reuters.html) |
| `kpmg-ma-2025` | KPMG Brasil | Pesquisa de Fusões e Aquisições 2025 (4º trimestre) | 03/2026 | primária | [abrir](https://kpmg.com/br/pt/insights/2026/03/pesquisa-fusoes-aquisicoes-2025-4-trimestre.html) |
| `kpmg-ma-1s26` | KPMG Brasil | Pesquisa Trimestral de M&A (2º trimestre de 2026) | 08/2026 | primária | [abrir](https://kpmg.com/br/pt/insights/2026/08/pesquisa-trimestral-m-a-2-trimestre-2026.html) |
| `itforum-ma-1s25` | IT Forum (dados KPMG) | M&As caem 5% no 1º semestre, e participação estrangeira aumenta | 2025 | imprensa | [abrir](https://itforum.com.br/noticias/mas-caem-5-no-1o-semestre/) |
| `economicnews-ttr-1s26` | Economic News Brasil (dados TTR Data) | Mercado de fusões e aquisições movimenta R$ 166,8 bi em 2026, mesmo com 35% menos operações | 17/07/2026 | imprensa | [abrir](https://economicnewsbrasil.com.br/2026/07/17/mercado-de-fusoes-e-aquisicoes-operacoes-maior-porte/) |
| `mckinsey-ti-ma-2011` | McKinsey & Company | Understanding the strategic value of IT in M&A | 01/2011 | primária | [abrir](https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/understanding-the-strategic-value-of-it-in-m-and-38a) |
| `infomoney-mbrf-2025` | InfoMoney | “MBRF”: Marfrig e BRF anunciam fusão de operações e projetam sinergias de R$ 805 mi | 05/2025 | imprensa | [abrir](https://www.infomoney.com.br/?p=2869572) |
| `suno-cade-mbrf-2025` | Suno Notícias | Cade aprova fusão entre BRF e Marfrig | 09/2025 | imprensa | [abrir](https://www.suno.com.br/noticias/cade-aprova-fusao-brf-brfs3-marfrig-go/amp/) |
| `moneytimes-petz-cobasi-2025` | Money Times | Cade aprova fusão de Petz (PETZ3) e Cobasi com acordo que prevê desinvestimento | 12/2025 | imprensa | [abrir](https://www.moneytimes.com.br/cade-aprova-fusao-de-petz-petz3-e-cobasi-com-acordo-que-preve-desinvestimento-entenda-o-remedio-lmrs/) |
| `istoe-braskem-2026` | IstoÉ Dinheiro | Novonor passa controle da Braskem para IG4 e acordo de acionistas será fechado com Petrobras | 20/04/2026 | imprensa | [abrir](https://istoedinheiro.com.br/novonor-passa-controle-da-braskem-para-ig4-e-acordo-de-acionistas-sera-fechado-com-petrobras-2) |
| `cenario-raizen-2026` | Cenário Energia | Raízen avança na cisão de ativos após reestruturação de R$ 65 bilhões | 14/08/2026 | imprensa | [abrir](https://cenarioenergia.com.br/2026/08/14/raizen-avanca-na-cisao-de-ativos-apos-reestruturacao-de-r-65-bilhoes/) |
| `agenciainfra-motiva-2026` | Agência iNFRA | Motiva vende seus 20 aeroportos a grupo mexicano por R$ 12,2 bi | 01/09/2026 | imprensa | [abrir](https://agenciainfra.com/blog/motiva-vende-seus-20-aeroportos-a-grupo-mexicano-por-r-122-bi/) |
| `cast-ey-dd` | CAST | EY reduces M&A due diligence assessment time by more than 75 percent with CAST Highlight | s/d | empresa | [abrir](https://learn.castsoftware.com/case-studies/ey-reduces-ma-due-diligence-assessment-time-by-more-than-75-percent-with-cast-highlight) |
| `am-assist-2025` | Alvarez & Marsal | A&M Assist (artigo da Alvarez & Marsal sobre o agente de IA para M&A) | 09/04/2025 | empresa | [abrir](https://www.alvarezandmarsal.com/node/80551) |
| `am-diligencegpt` | Alvarez & Marsal | Pioneering Generative AI for Private Equity | s/d | empresa | [abrir](https://www.alvarezandmarsal.com/expertise/private-equity-performance-improvement/generative-ai) |
| `bain-ma-genai-2025` | Bain & Company | Generative AI in M&A: You're Not Behind—Yet (M&A Report 2025) | 2025 | primária | [abrir](https://www.bain.com/insights/generative-ai-m-and-a-report-2025/) |
| `bain-ma-2026` | Bain & Company | M&A Capability for a New Era: Five Ways AI Is Creating More Value in M&A Right Now (M&A Report 2026) | 2026 | primária | [abrir](https://www.bain.com/insights/capability-for-a-new-era-m-and-a-report-2026/) |
| `deloitte-genai-ma-2025` | Deloitte (EUA) | Deloitte Survey: 86% of Corporate and Private Equity Leaders Now Use Generative AI, with Plans to Boost Spending in 2025 | 2025 | primária | [abrir](https://www.deloitte.com/us/en/about/press-room/deloitte-survey-genai-in-mna.html) |
| `techcrunch-diligencesquared-2026` | TechCrunch | DiligenceSquared uses AI, voice agents to make M&A research affordable | 05/03/2026 | imprensa | [abrir](https://techcrunch.com/2026/03/05/diligencesquared-uses-ai-voice-agents-to-make-ma-research-affordable/) |
| `pwc-harvey-2025` | PwC | AI-powered deals: PwC's latest M&A technology platform reimagines the way clients do deals | 31/07/2025 | empresa | [abrir](https://www.pwc.com/gx/en/news-room/press-releases/2025/aipowered-deals-pwcs-latest-mna-technology-platform-reimagines-the-way-clients-do-deals.html) |
| `pwc-ai-tech-diligence` | PwC (EUA) | AI technology diligence | s/d | empresa | [abrir](https://www.pwc.com/us/en/services/consulting/deals/strategy-value-creation/ai-technology-diligence.html) |
| `deloitte-ma-tech-uk` | Deloitte Reino Unido | M&A Technology | s/d | empresa | [abrir](https://www2.deloitte.com/uk/en/pages/financial-advisory/articles/m-and-a-technology.html) |
| `ey-parthenon-vaga` | EY (vaga publicada) | EY-Parthenon Senior Manager Transactional Technology | s/d | empresa | [abrir](https://careers.ey.com/ey/job/Amsterdam-EY-Parthenon-Senior-Manager-Transactional-Technology-1083-HP/1275193701) |
| `baguete-vmware-2025` | Baguete | Preço do VMware aumentou até 15x | 2025 | imprensa | [abrir](https://www.baguete.com.br/noticias/preco-do-vmware-aumentou-ate-15x) |
| `tiinside-dolar-2025` | TI Inside | Como o dólar está impactando o caixa das empresas na compra de tecnologia | 11/02/2025 | imprensa | [abrir](https://tiinside.com.br/11/02/2025/como-o-dolar-esta-impactando-o-caixa-das-empresas-na-compra-de-tecnologia/) |
| `flexera-cloud-2026` | Flexera | Flexera Finds Cloud Value is Rising While AI Waste Grows (2026 State of the Cloud Report) | 03/2026 | primária | [abrir](https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows) |
| `itforum-finops` | IT Forum | Matéria sobre práticas de gestão do custo de nuvem (FinOps) citada na pesquisa DTS | s/d | imprensa | [abrir](https://itforum.com.br/?p=9556536) |
| `vertice-ana` | Vertice | Introducing Ana – the AI negotiation agent for software purchases | s/d | empresa | [abrir](https://www.vertice.one/blog/introducing-ana-the-ai-negotiation-agent-for-software-purchases) |
| `febraban-2026` | Febraban (com a Deloitte) | Bancos estimam investir R$ 3 bi em IA e soluções de dados neste ano, revela pesquisa (Pesquisa Febraban de Tecnologia Bancária 2026) | 2026 | primária | [abrir](https://portal.febraban.org.br/noticia/4490/pt-br/) |
| `forbes-febraban-2026` | Forbes Brasil | Bancos viram empresas de tecnologia e vão investir R$ 50 bi em 2026 | 06/2026 | imprensa | [abrir](https://forbes.com.br/forbes-money/2026/06/bancos-investimento-tecnologia-febraban-2026/) |
| `gartner-gasto-ti-2026` | Gartner | Gartner Forecasts Worldwide IT Spending to Grow 14.2% in 2026, Totaling $6.37 Trillion | 27/07/2026 | primária | [abrir](https://www.gartner.com/en/newsroom/press-releases/2026-07-27-gartner-forecasts-worldwide-it-spending-to-grow-14-point-2-percent-in-2026-totaling-6-point-37-trillion) |
| `aws-transform-precos` | AWS | AWS Transform pricing | 2026 | empresa | [abrir](https://aws.amazon.com/transform/pricing) |
| `infomoney-cm-2025` | InfoMoney | Fraude no Pix: entenda golpe que desviou R$ 800 milhões da C&M | 07/2025 | imprensa | [abrir](https://www.infomoney.com.br/brasil/fraude-no-pix-entenda-golpe-que-desviou-r-800-milhoes-da-cm/) |
| `tecnoblog-sinqia-2025` | Tecnoblog | Ataque hacker a empresa que opera o Pix desviou R$ 710 milhões | 2025 | imprensa | [abrir](https://tecnoblog.net/noticias/ataque-hacker-a-empresa-que-opera-o-pix-desviou-r-710-milhoes/) |
| `cmn-5274-2025` | Conselho Monetário Nacional (texto reproduzido pela Legisweb) | Resolução CMN nº 5.274, de 18 de dezembro de 2025 | 18/12/2025 | oficial | [abrir](https://www.legisweb.com.br/legislacao/?id=488277) |
| `mobiletime-pl2338-2026` | MobileTime | Marco da IA: votação fica para o fim do ano | 24/08/2026 | imprensa | [abrir](https://www.mobiletime.com.br/noticias/24/08/2026/marco-ia-voto-fim-do-ano/) |
| `teletime-anpd-2026` | Teletime | Lei que torna ANPD agência e fixa vigência do ECA Digital é sancionada | 26/02/2026 | imprensa | [abrir](https://teletime.com.br/26/02/2026/lei-que-torna-anpd-agencia-e-fixa-vigencia-do-eca-digital-e-sancionada/) |
| `mobiletime-redata-2026` | MobileTime | Senado aprova Redata | 01/09/2026 | imprensa | [abrir](https://www.mobiletime.com.br/noticias/01/09/2026/senado-aprova-redata/) |
| `mcti-lei-do-bem-2026` | Ministério da Ciência, Tecnologia e Inovação | MCTI registra R$ 65,7 bilhões em investimentos empresariais pela Lei do Bem em 2025 | 2026 | oficial | [abrir](https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/noticias-julho-outubro-2026/mcti-registra-r-65-7-bilhoes-em-investimentos-empresariais-pela-lei-do-bem-em-2025) |
| `convergencia-lei-do-bem-2026` | Convergência Digital | Lei do Bem: 4598 empresas foram beneficiadas e renúncia fiscal ficou em R$ 15,8 bilhões em 2025 | 2026 | imprensa | [abrir](https://convergenciadigital.com.br/governo/lei-do-bem-4598-empresas-foram-beneficiadas-e-renuncia-fiscal-ficou-em-r-158-bilhoes-em-2025/) |
| `correio-lc224-2026` | Correio Braziliense (blog Jus Braziliense) | LC 224/2025: o corte de 10% nos benefícios fiscais que sua empresa talvez nem percebeu | 12/08/2026 | imprensa | [abrir](https://blogs.correiobraziliense.com.br/jusbraziliense/2026/08/12/lc-224-2025-o-corte-de-10-nos-beneficios-fiscais-que-sua-empresa-talvez-nem-percebeu/amp/) |
| `tagd-lc224` | TAGD Advogados | Desafios trazidos pela LC 224 e a Lei do Bem como alternativa para frear aumento da carga tributária | 2026 | imprensa | [abrir](https://tagdlaw.com.br/desafios-trazidos-pela-lc-224-e-a-lei-do-bem-como-alternativa-para-frear-aumento-da-carga-tributaria/) |
| `aws-transform-ga-2025` | AWS | Transform Enterprise Workloads up to 4x Faster with Agentic AI (AWS Transform generally available) | 15/05/2025 | empresa | [abrir](https://aws.amazon.com/blogs/migration-and-modernization/aws-transform-generally-available/) |
| `siliconangle-aws-transform-2025` | SiliconANGLE | AWS' AI-powered workload modernization service is now generally available | 15/05/2025 | imprensa | [abrir](https://siliconangle.com/2025/05/15/aws-ai-powered-workload-modernization-service-is-now-generally-available/) |
| `mckinsey-legacyx` | McKinsey & Company | McKinsey's LegacyX: Rejuvenating legacy infrastructure with agentic AI | 2025 | empresa | [abrir](https://www.mckinsey.com/about-us/new-at-mckinsey-blog/mckinseys-legacyx-rejuvenating-legacy-infrastructure-with-agentic-ai) |
| `mckinsey-ia-modernizacao` | McKinsey & Company (QuantumBlack) | AI for IT modernization: Faster, cheaper, and better | 2025 | empresa | [abrir](https://www.mckinsey.com/capabilities/quantumblack/our-insights/ai-for-it-modernization-faster-cheaper-and-better) |
| `anthropic-cobol-2026` | Anthropic (blog Claude) | How AI helps break the cost barrier to COBOL modernization | 23/02/2026 | empresa | [abrir](https://claude.com/blog/how-ai-helps-break-cost-barrier-cobol-modernization) |
| `malaymail-ibm-2026` | Malay Mail | IBM shares hit 25-year low as AI promises to update ageing mainframe code | 24/02/2026 | imprensa | [abrir](https://www.malaymail.com/news/money/2026/02/24/ibm-shares-hit-25-year-low-as-ai-promises-to-update-ageing-mainframe-code/210190) |
| `accenture-genwizard-2025` | Accenture | Accenture Helps Organizations Adopt and Scale the Latest Technologies from Google Cloud to Drive Continuous Reinvention | 09/04/2025 | empresa | [abrir](https://newsroom.accenture.com/news/2025/accenture-helps-organizations-adopt-and-scale-the-latest-technologies-from-google-cloud-to-drive-continuous-reinvention) |
| `ibm-bob-2026` | IBM | Introducing IBM Bob: AI Development Partner that Takes Enterprises from AI-Assisted Coding to Production-Ready Software | 28/04/2026 | empresa | [abrir](https://uk.newsroom.ibm.com/Introducing-IBM-Bob-AI-Development-Partner) |
| `github-copilot-modernizacao-2025` | GitHub | GitHub Copilot app modernization is now generally available for Java and .NET | 23/09/2025 | empresa | [abrir](https://github.blog/changelog/2025-09-23-github-copilot-app-modernization-is-now-generally-available-for-java-and-net) |
| `thelettertwo-copilot-2025` | The Letter Two | GitHub Copilot Now Automates Java and .NET App Modernization | 23/09/2025 | imprensa | [abrir](https://thelettertwo.com/2025/09/23/github-copilot-java-dotnet-app-modernization/) |
| `convergencia-bradesco-caixa` | Convergência Digital | Bradesco e Caixa transformam o mainframe em plataforma orientada a dados e inteligência | s/d | imprensa | [abrir](https://convergenciadigital.com.br/mercado/bradesco-e-caixa-transformam-o-mainframe-em-plataforma-orientada-a-dados-e-inteligencia/) |
| `kyndryl-mainframe-2025` | Kyndryl | Pesquisa da Kyndryl: modernização do mainframe gera retorno de 2 a 3 vezes o investimento (State of Mainframe Modernization 2025) | 09/09/2025 | empresa | [abrir](https://www.kyndryl.com/br/pt/about-us/news/2025/09/mainframe-modernization-delivers-big-roi) |
| `ardoq-2026` | Ardoq (Business Wire) | Ardoq Launches AI-First Enterprise Architecture Platform | 28/05/2026 | empresa | [abrir](https://www.businesswire.com/news/home/20260528712753/en/) |
| `ibm-wcaz-2025` | IBM Community | IBM watsonx Code Assistant for Z 2.5 brings enhancements | 30/04/2025 | empresa | [abrir](https://community.ibm.com/community/user/blogs/kelly-paesano/2025/04/30/ibm-watsonx-code-assistant-for-z-25-brings-enhance) |
| `google-mainframe` | Google Cloud | Mainframe modernization | s/d | empresa | [abrir](https://cloud.google.com/solutions/mainframe-modernization) |
| `sap-leanix-2026` | SAP LeanIX | SAP LeanIX 2026: building on momentum | 2026 | empresa | [abrir](https://www.leanix.net/en/blog/sap-leanix-2026-building-on-momentum) |
| `hbr-premortem-2007` | Harvard Business Review (Gary Klein) | Performing a Project Premortem | 09/2007 | primária | [abrir](https://hbr.org/2007/09/performing-a-project-premortem) |
| `nist-sp-800-84` | NIST, instituto de padrões dos EUA (Grance, Nolan, Burke, Dudley, White e Good) | Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities (SP 800-84) | 09/2006 | oficial | [abrir](https://csrc.nist.gov/pubs/sp/800/84/final) |
| `mckinsey-war-games-2011` | McKinsey Quarterly (John Horn) | Playing war games to win | 03/2011 | primária | [abrir](https://www.mckinsey.com/business-functions/strategy-and-corporate-finance/our-insights/playing-war-games-to-win) |
| `ey-integracao-nove-passos` | EY | Nine steps to setting up an M&A integration program | s/d | primária | [abrir](https://www.ey.com/en_uk/insights/mergers-acquisitions/nine-steps-to-setting-up-an-m-a-integration-program) |
| `deloitte-day-one` | Deloitte (EUA) | Day One readiness: Enabling business continuity through effective transaction execution (PDF) | s/d | primária | [abrir](https://www2.deloitte.com/content/dam/Deloitte/us/Documents/process-and-operations/us-m-and-a-day-one-readiness.pdf) |
| `sitzmann-2011` | Personnel Psychology (Traci Sitzmann) | A meta-analytic examination of the instructional effectiveness of computer-based simulation games | 2011 | primária | [abrir](https://onlinelibrary.wiley.com/doi/10.1111/j.1744-6570.2011.01190.x) |

## Lacunas (o que não conseguimos sustentar)

**Não confirmados (status `a verificar`)**
- `custo-nuvem-economia-20-30`: "gestão madura do custo de nuvem economiza 20% a 30%" (fichas 1.5 e 4.3 do V5). A matéria do IT Forum não foi localizada; só há casos isolados de ~30%.
- `barreira-conhecimento-44`: "44% citam falta de conhecimento da equipe" (ficha 2.5 do V5). A matéria da TI Inside não foi localizada.
- `deloitte-aws-2031`: prazo de 2031 do acordo Deloitte–AWS.
- `accenture-compra-tenbu`: data da compra da Tenbu.
- `copilot-xbox-88`: 88% menos esforço no Xbox (visto só em resumo de imprensa).
- `big4-cio-interino-nao-encontrado` e `big4-reforma-pelo-tributario`: leituras da nossa pesquisa ("não encontrado" não prova inexistência).
- Ofertas por nome de Deloitte, EY e EY-Parthenon (`deloitte-oferta-cio`, `ey-oferta-cio`, `deloitte-ma-tecnologia`, `ey-parthenon-tecnologia`) e ferramentas (`ibm-assistente-mainframe`, `google-mainframe-ia`, `leanix-agentes`): vêm de páginas e vagas não reverificadas.

**Divergentes (não usar até corrigir)**
- `grandes-usam-ia-50` (Cetic.br cita 37% em outro recorte) · `gasto-ia-brasil-2026` (US$ 3,4 bi × US$ 4,2 bi) · `lc224-corte-10` · `reforma-impacto-imediato-83`.

**Fracos (só no texto, com ressalva)**
- `genai-sem-impacto-95` e `comprar-vs-construir-67` (estudo preliminar ligado ao MIT) · `diligencia-50-mil` · `erp-apuracao-no-erp-53` (pesquisa de fornecedor) · `alixpartners-cio-interino`.

**Procurados e não encontrados (ficaram fora do registro)**
- AlixPartners–Artium com "mais de 80 pessoas"; CI&T com US$ 136,6 mi no 1º trimestre de 2026; Brasscom com 110.960 formandos em 2024; SAP com "95% dos clientes em adequação"; Gartner "preço por resultado é ouro de tolo"; ganhos de −25%/+40% do Zora AI; aporte de US$ 1,5 bi na empresa da Anthropic com fundos (fonte única).
- Dado público confiável sobre rotatividade de CIOs no Brasil (já era lacuna da pesquisa).

**Números do V5 que não são fatos de mercado (não entram no registro; sair dos slides e fichas, seção 4 da SPEC)**
- Prazos, durações e metas de desenho: "3 sem.", "6–8 sem.", "10 sem.", "< 2 sem.", "100 dias", "7 lentes", "3 cláusulas", "0 interrupções", "100% dos dados reconciliados", "10–15 entrevistas", "3–5 clientes-piloto", "≥30% / ≥10% / −30% / ≥40%" do roadmap, escores do raio-X (3,6 · 4,2…), barras de investimento e "tempo até impacto". Trocar por palavras (SPEC, seção 4).

## Fontes dos "Jogos de entrada" (slide 19)

| Jogo | Método | Fontes |
|---|---|---|
| Mesa do Conselho (IT Advisory) | jogo de decisão para executivos; aprendizado com simulação | `mckinsey-war-games-2011`, `sitzmann-2011` |
| Pré-mortem 2027 (Technology Transformation) | pré-mortem de Gary Klein | `hbr-premortem-2007` |
| Jogo do Dia 1 (Tech M&A) | simulação e pontos de prontidão antes do fechamento | `ey-integracao-nove-passos`, `deloitte-day-one`, `mckinsey-war-games-2011` |
| Exercício de Crise (Modernization) | exercício de mesa | `nist-sp-800-84` |
