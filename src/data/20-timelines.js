
/* ---------- TIMELINE · IA nas consultorias (benchmark) ---------- */
const TL_MARKET=[
 {d:"Set 2023",s:"EY.ai",t:"EY lança EY.ai após investir US$ 1,4 bi",x:"Plataforma e assistente interno (EYQ). Começa a corrida das Big Four por plataformas próprias de IA.",src:"ICMIF, set/2023",tag:"Big Four"},
 {d:"Mar 2025",s:"Zora · agent OS",t:"Deloitte Zora AI, PwC agent OS e EY.ai Agentic",x:"Agentes por função vendidos por <b>assinatura</b> (Deloitte), orquestração multi-fornecedor (PwC) e 150 agentes de tributos (EY).",src:"SiliconANGLE 18/03/2025; PwC e EY, mar/2025",tag:"Big Four"},
 {d:"Mai 2025",s:"AWS Transform",t:"Modernização agêntica chega ao mercado",x:"AWS Transform (mainframe, VMware, .NET) em disponibilidade geral. Hoje: migração sem custo e US$ 0,035 por minuto de agente em transformações customizadas.",src:"SiliconANGLE 15/05/2025; preços set/2026",tag:"Hyperscaler"},
 {d:"Jun 2025",s:"KPMG Workbench",t:"KPMG Workbench: plataforma multiagente",x:"Base das plataformas de entrega Velocity (Advisory), Digital Gateway (Tax) e Clara (auditoria).",src:"KPMG International, 17/06/2025",tag:"Big Four"},
 {d:"Jan 2026",s:"McKinsey 25k",t:"McKinsey: 25 mil agentes e honorários por resultado",x:"~25 mil agentes ao lado de ~40 mil pessoas; ~25% dos honorários globais atrelados a resultado (nov/2025).",src:"BI/HBR jan/2026; Yahoo/BI nov/2025",tag:"Estratégia"},
 {d:"Mai 2026",s:"A&M AI Board",t:"A&M cria o Global AI Board",x:"Meta de <b>50% da receita ligada a IA até 2028</b> (até US$ 3,5 bi) e até 200 contratações. Ferramentas: A&M Assist e DiligenceGPT.",src:"A&M press release 05/05/2026; Bloomberg 04/05/2026",tag:"A&M"},
 {d:"Jun 2026",s:"PwC × ToltIQ",t:"Due diligence com IA vira disputa por exclusividade",x:"PwC passa a ser a única firma de serviços profissionais da ToltIQ; já havia lançado ‘Harvey, powered by PwC’ para deals.",src:"PwC US, jun/2026; PwC Global, jul/2025",tag:"M&A"},
 {d:"Jul 2026",s:"Ode · Bain",t:"Laboratórios de IA entram no canal de PE",x:"Ode with Anthropic (Blackstone, H&F) leva engenheiros às investidas; Bain replica o software do alvo com Claude Code na DD.",src:"BusinessWire jul/2026; FT jul/2026",tag:"PE"},
 {d:"Ago 2026",s:"AlixPartners",t:"AlixPartners compra a Artium (engenharia agêntica)",x:"O par mais comparável à A&M compra capacidade de IA pronta: 80+ pessoas, parceira de OpenAI e Anthropic.",src:"AlixPartners, 04/08/2026",tag:"Par direto"},
 {d:"Set 2026",s:"Falconi · CI&T",t:"Consultorias brasileiras viram ‘AI-native’",x:"Falconi investe R$&nbsp;100&nbsp;mi em IA (80% dos projetos com agentes); CI&T monetiza IA pela plataforma Flow.",src:"Jornal do Comércio set/2026; IT Forum 2026",tag:"Brasil"}
];

/* ---------- TIMELINE · 2026, IA nas consultorias (dono: benchmark, slide 06) ----------
   Só eventos de 2026, um por mês (jan–out), cada um com fato verificado no registro (05-fontes.js / 06-fatos-benchmark.js).
   d = mês · s = organização (rótulo curto da linha) · t = título · x = texto (números só por data-fato) ·
   tag = assunto · sig = sinal do slide 06 (1 plataforma · 2 preço · 3 diligência · 4 pares; 0 = Alvarez & Marsal global) ·
   src = fonte curta (as completas no verso) · f = ids de FONTES. Sem siglas fora da SPEC 5 e sem pessoas da A&M. */
const TL_2026=[
 {d:"Jan 2026",s:"McKinsey",sig:1,tag:"IA vira plataforma",t:"McKinsey passa a contar agentes de IA na força de trabalho",
  x:"A firma diz operar com cerca de <span data-fato=\"mckinsey-agentes-25-mil\">25 mil</span> agentes de IA ao lado das pessoas: a IA deixa de ser ferramenta e vira capacidade de entrega.",
  src:"Business Insider e IT Forum, jan/2026",f:["bi-mckinsey-agentes-2026","itforum-mckinsey-agentes-2026"]},
 {d:"Fev 2026",s:"OpenAI",sig:1,tag:"IA vira plataforma",t:"OpenAI se alia a McKinsey, BCG, Accenture e Capgemini",
  x:"Parcerias de vários anos para levar às empresas os agentes da plataforma Frontier: as firmas de estratégia desenham o uso e os integradores implantam.",
  src:"Fortune, 23/02/2026",f:["fortune-frontier-alliance-2026"]},
 {d:"Mar 2026",s:"Startup",sig:3,tag:"Diligência",t:"Agentes de voz fazem a diligência comercial dos fundos",
  x:"A DiligenceSquared, startup americana, entrevista clientes da empresa-alvo com agentes de voz de IA, no lugar de consultores: a pesquisa de mercado da diligência passa a ser feita por software.",
  src:"TechCrunch, 05/03/2026",f:["techcrunch-diligencesquared-2026"]},
 {d:"Abr 2026",s:"BCG",sig:1,tag:"IA vira receita",t:"Tecnologia e IA passam de <span data-fato=\"bcg-tech-ia-40\">40%</span> da receita do BCG",
  x:"No resultado de 2025, divulgado pela própria firma, a IA deixa de ser piloto e vira linha de receita de uma das três grandes firmas de estratégia.",
  src:"BCG, 23/04/2026",f:["bcg-receita-2026"]},
 {d:"Mai 2026",s:"A&M global",sig:0,tag:"Alvarez & Marsal global",t:"A Alvarez & Marsal global cria um Conselho Global de IA",
  x:"O conselho coordena a IA nas linhas de serviço e entre regiões. Segundo a Bloomberg, a firma quer <span data-fato=\"am-meta-ia-50-2028\">50%</span> da receita vinda de trabalho com IA até 2028 e planeja até <span data-fato=\"benchmark-am-contratacoes-200\">200</span> contratações em IA.",
  src:"Alvarez & Marsal, 05/05/2026; Bloomberg, 04/05/2026",f:["am-ai-board-2026","bloomberg-am-ia-2026"]},
 {d:"Jun 2026",s:"PwC",sig:3,tag:"Diligência",t:"PwC leva IA de diligência à área de transações",
  x:"A PwC e a ToltIQ, plataforma de IA para diligência em transações, firmaram uma relação estratégica; a ferramenta já é usada pelos profissionais de transações da firma.",
  src:"PwC, 15/06/2026",f:["pwc-toltiq-2026"]},
 {d:"Jul 2026",s:"Bain",sig:3,tag:"Diligência",t:"Bain replica o software do alvo durante a diligência",
  x:"Com ferramentas de IA de programação, a Bain recria partes do produto do alvo para testar se ele é fácil de copiar; um fundo disse que uma réplica pesou na decisão de sair de uma disputa.",
  src:"Financial Times, via The Decoder, jul/2026",f:["decoder-bain-vibecoding-2026"]},
 {d:"Ago 2026",s:"AlixPartners",sig:4,tag:"Pares compram capacidade",t:"AlixPartners compra a Artium, de engenharia com agentes",
  x:"A consultoria americana constrói agentes de IA sob medida para empresas e é parceira da OpenAI e da Anthropic; segue como unidade própria, com equipe e método mantidos.",
  src:"AlixPartners, 04/08/2026",f:["alixpartners-artium-2026"]},
 {d:"Set 2026",s:"Falconi",sig:4,tag:"Brasil",t:"No Brasil, a Falconi põe agentes de IA na maior parte dos projetos",
  x:"A consultoria investiu <span data-fato=\"benchmark-falconi-ia-100\">R$ 100 milhões</span> em infraestrutura própria de IA desde 2022; <span data-fato=\"benchmark-falconi-agentes-80\">80%</span> dos projetos em andamento automatizam processos com agentes.",
  src:"Jornal do Comércio, 29/09/2026 (dados da Falconi)",f:["jc-falconi-2026"]},
 {d:"Out 2026",s:"Accenture",sig:2,tag:"Preço",t:"Accenture registra preço menor em várias áreas do negócio",
  x:"No balanço do ano fiscal, a firma informa preços menores no trimestre de junho a agosto e diz que as oportunidades da IA superam o efeito da eficiência da IA sobre o próprio negócio.",
  src:"Accenture, relatório anual e teleconferência de 01/10/2026",f:["benchmark-accenture-10k-2026","benchmark-fool-accenture-q4-2026"]}
];

/* ---------- NOMENCLATURA · possível configuração ---------- */
const NM_MARKET=[["Technology Strategy & Transformation · CIO Advisory","IT Advisory · Strategy, Leadership & Value",null],["Office of the CIO · IT Finance · TBM","Tech Spend Optimization & Spend Radar","1.5"],["Tech Due Diligence · Transaction Technology","AI-Powered Tech Due Diligence","3.1"],["Separation & Carve-out · TSA · Dia 1","Integration & Separation Blueprint","3.2"],["Trusted AI · Trustworthy AI · AI governance","AI Value & Governance Office","1.7"],["LegacyX · GenWizard · AWS Transform","Legacy X-Ray & AI Modernization","4.6"]];
const NM_PRODS=[["Tech Maturity & Value Assessment","1.1"],["Digital Strategy & Roadmapping","1.2"],["Interim CIO / CTO Leadership + Embedded Tech Leadership + C-Level Tech Enablement","1.3"],["Strategic Tech Tax + Innovation Tax Incentives","1.6"],["ERP Readiness & Gap Analysis","2.2"],["TMO + Modelo de Implantação e Governança","2.3"],["IT Due Diligence (Buy Side) + (Sell Side)","3.1"],["IT Integration Management Office + IT Separation Management Office","3.3"],["Strategy Architecture","4.1"],["Strategy Application","4.2"],["Infrastructure Management","4.3"],["Complex Migrations Support","4.4"]];

/* ---------- ROADMAP de lançamento (closing) ---------- */
const TL_LAUNCH=[
 {d:"4T 2026",s:"Onda 0 · Fundação",t:"Fábrica de produtos e quick wins",x:"Nomear donos de produto, padronizar fichas, ativar o LLM corporativo seguro. Lançar <b>ERP & Tax Reform Readiness</b> (janela da CBS em 01/01/2027) e <b>Tech Spend Optimization & Spend Radar</b> (orçamento 2027).",tag:"0–90 dias"},
 {d:"1T 2027",s:"Onda 1 · Signature",t:"Produtos A&M Signature com IA",x:"<b>AI-Powered Tech Due Diligence</b> (3 níveis), <b>Tech Project Rescue</b> com kit forense, <b>Interim & Embedded Tech Leadership</b> com bancada e copiloto.",tag:"Proteger o núcleo"},
 {d:"2T 2027",s:"Onda 2 · Novos IA",t:"Primeiros produtos novos",x:"<b>AI Value & Governance Office</b> (assinatura), <b>AI-Native IT Productivity</b> (piloto de 10 semanas) e <b>Legacy X-Ray & AI Modernization</b>, com 3–5 clientes-piloto cada e preço de lançamento.",tag:"Criar com IA"},
 {d:"3T 2027",s:"Onda 3 · Recorrência",t:"Plataformas e assinaturas",x:"<b>PE Tech Value Radar</b> com 1–2 fundos-âncora; <b>Spend Radar</b> como assinatura; benchmark DTS Brasil como ativo de dados.",tag:"Receita recorrente"},
 {d:"4T 2027",s:"Revisão",t:"Revisão do portfólio",x:"O comitê trimestral acompanha receita por produto, margem, recorrência e conversão; a revisão anual decide escalar, ajustar ou aposentar.",tag:"Ciclo anual"}
];
