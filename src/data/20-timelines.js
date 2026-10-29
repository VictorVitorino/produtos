
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

/* ---------- TIMELINE · 2026, IA nas consultorias (benchmark) ---------- */
const TL_2026=[
 {d:"Jan 2026",s:"McKinsey",t:"McKinsey opera com 25 mil agentes de IA",x:"Cerca de 25 mil agentes trabalham ao lado de ~40 mil pessoas; perto de 25% dos honorários globais já são cobrados por resultado.",src:"Business Insider / HBR, jan/2026; Yahoo Finance, nov/2025",tag:"Estratégia"},
 {d:"Fev 2026",s:"Frontier Alliance",t:"OpenAI reúne McKinsey, BCG, Accenture e Capgemini",x:"Aliança para levar agentes a clientes: estratégia desenha o modelo operacional, integradores implementam.",src:"Fortune, 23/02/2026",tag:"Ecossistema"},
 {d:"Mai 2026",s:"A&M AI Board",t:"Alvarez & Marsal cria o Global AI Board",x:"A firma global anuncia o conselho de IA e, segundo a Bloomberg, mira 50% da receita vinda de trabalho com IA até 2028, com até 200 contratações. Já usa A&M Assist e DiligenceGPT.",src:"A&M press release, 05/05/2026; Bloomberg, 04/05/2026",tag:"Alvarez & Marsal"},
 {d:"Jun 2026",s:"PwC × ToltIQ",t:"Due diligence com IA vira disputa por exclusividade",x:"PwC passa a ser a única firma de serviços profissionais da ToltIQ, plataforma de diligência com IA; já vendia a clientes a ‘Harvey, powered by PwC’.",src:"PwC US, jun/2026; PwC Global, jul/2025",tag:"M&A"},
 {d:"Jul 2026",s:"Ode · Bain",t:"Laboratórios de IA entram no canal de private equity",x:"Ode with Anthropic (Blackstone, Hellman & Friedman) coloca engenheiros dentro das investidas; a Bain replica o software do alvo com Claude Code durante a diligência.",src:"BusinessWire, jul/2026; Financial Times, jul/2026",tag:"Private equity"},
 {d:"Ago 2026",s:"AlixPartners",t:"AlixPartners compra a Artium",x:"O par mais comparável à A&M adquire uma consultoria de engenharia agêntica com mais de 80 pessoas, parceira de OpenAI e Anthropic.",src:"AlixPartners, 04/08/2026",tag:"Par direto"},
 {d:"Set 2026",s:"Falconi · CI&T",t:"Consultorias brasileiras viram ‘AI-native’",x:"Falconi investe R$&nbsp;100&nbsp;milhões em IA, com 80% dos projetos usando agentes; a CI&T monetiza IA pela plataforma Flow.",src:"Jornal do Comércio, set/2026; IT Forum, 2026",tag:"Brasil"}
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
