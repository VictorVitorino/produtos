
/* ---------- TIMELINE · 2026, IA nas consultorias (dono: benchmark, slide 06) ----------
   Só eventos de 2026, um por mês (jan–out), cada um com fato verificado no registro (05-fontes.js / 06-fatos-benchmark.js).
   d = mês · s = organização (rótulo curto da linha) · t = título · x = texto (números só por data-fato) ·
   tag = assunto · sig = sinal do slide 06 (1 plataforma · 2 preço · 3 diligência · 4 pares; 0 = Alvarez & Marsal global) ·
   src = fonte curta (as completas no verso) · f = ids de FONTES. Sem siglas fora da SPEC 5 e sem pessoas da A&M. */
const TL_2026=[
 {d:"Jan 2026",s:"McKinsey",sig:1,tag:"IA vira plataforma",t:"McKinsey passa a contar agentes de IA na força de trabalho",
  x:"A firma diz operar com cerca de <span data-fato=\"mckinsey-agentes-25-mil\">25 mil</span> agentes de IA ao lado das pessoas. Quem vende horas de consultor passa a concorrer com horas de agente.",
  src:"IT Forum e Business Insider, jan/2026",f:["itforum-mckinsey-agentes-2026","bi-mckinsey-agentes-2026"]},
 {d:"Fev 2026",s:"OpenAI",sig:1,tag:"IA vira plataforma",t:"OpenAI se alia a McKinsey, BCG, Accenture e Capgemini",
  x:"Parcerias de vários anos para levar às empresas os agentes da plataforma Frontier: as firmas de estratégia desenham o uso e os integradores implantam.",
  src:"Fortune, 23/02/2026",f:["fortune-frontier-alliance-2026"]},
 {d:"Mar 2026",s:"Startup",sig:3,tag:"Diligência",t:"Agentes de voz fazem a diligência comercial dos fundos",
  x:"A DiligenceSquared, startup americana, entrevista clientes da empresa-alvo com agentes de voz de IA, no lugar de consultores: a entrevista com clientes, base da diligência comercial, passa a ser feita por software.",
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
 {d:"Set 2026",s:"Falconi",sig:4,tag:"Brasil",t:"Falconi põe agentes de IA na maior parte dos projetos de tecnologia",
  x:"A consultoria investiu <span data-fato=\"benchmark-falconi-ia-100\">R$ 100 milhões</span> em infraestrutura própria de IA desde 2022; <span data-fato=\"pilar2-falconi-agentes-80\">80%</span> dos projetos de tecnologia em andamento automatizam processos com agentes.",
  src:"Jornal do Comércio, 29/09/2026 (dados da Falconi)",f:["jc-falconi-2026"]},
 {d:"Out 2026",s:"Accenture",sig:2,tag:"Preço",t:"Accenture registra preço menor em várias áreas do negócio",
  x:"No balanço do ano fiscal, a firma informa preços menores no trimestre de junho a agosto e diz que as oportunidades da IA superam o efeito da eficiência da IA sobre o próprio negócio.",
  src:"Accenture, relatório anual e teleconferência de 01/10/2026",f:["benchmark-accenture-10k-2026","benchmark-fool-accenture-q4-2026"]}
];

/* ---------- ROADMAP · quatro ondas de lançamento (dono: roadmap, slide 20) ----------
   Proposta DTS (fato proposta-4-ondas), sem trimestres, prazos nem metas numéricas: a ordem é de sequência, e cada onda
   só abre quando a anterior cumpre a condição "av". Prazo, preço e meta de cada produto saem dos pilotos (slide 18).
   n = número da onda · s = nome · q = quando, em palavras (sequência, não data) · t = o que a onda faz (uma linha) ·
   it = o que entra (código de produto vira link para a ficha; texto livre aceita códigos) · av = avança quando
   (na última onda, a chegada; aceita códigos) · m = como medir (nome do indicador; a meta é calibrada nos pilotos). */
const TL_LAUNCH=[
 {n:0,s:"Fundação",q:"começa agora",t:"Liga a fábrica e responde às janelas de 2027",
  it:["Donos, fichas e a Plataforma de Dados e AI","2.2","1.5"],
  av:"o 2.2 e o 1.5 já são vendidos no formato de produto, com ficha e dono",
  m:"conversão de diagnóstico em execução"},
 {n:1,s:"Núcleo Signature",q:"em seguida",t:"Leva IA ao kit do que a A&M já vence",
  it:["3.1","2.4","1.3"],
  av:"o 3.1 sai com IA no método, o 2.4 e o 1.3 com IA de apoio, e outra equipe repete a entrega",
  m:"tempo de entrega de diagnósticos e diligências"},
 {n:2,s:"Novos produtos com IA",q:"com pilotos",t:"Testa as apostas com clientes selecionados",
  it:["1.7","2.6","4.6"],
  av:"o piloto mostra ganho medido e define o prazo e o preço de cada produto",
  m:"receita de produtos com IA no método"},
 {n:3,s:"Recorrência",q:"com escala",t:"Vende acompanhamento contínuo, não só projetos",
  it:["3.5","Radar do 1.5 e escritório do 1.7 por assinatura","Plataforma alimentada por cada projeto"],
  av:"as assinaturas renovam e a base de comparação melhora a cada projeto",
  m:"receita recorrente, por assinatura"}
];
