/* =====================================================================
   SLIDE 10 · Pilar 1 · IT Advisory · Cliente e mercado · dono: slide 10
   Registra o conteúdo do pilar em PCFG[1].cliente; quem desenha é src/js/25-pilares.js (no boot).
   Conteúdo herdado da V5: será revisto pelo time de conteúdo (siglas, números e fontes — ver SPEC 4 e 5).
   ===================================================================== */
PCFG[1].cliente={
  /* quem compra e o que pergunta: [papel, pergunta, [produtos]] */
  pers:[
    ["CEO · Conselho","A IA está gerando resultado ou só custo? Quem lidera isso?",["1.3","1.7"]],
    ["CFO","Quanto gastamos em tecnologia e o que dá para cortar sem risco?",["1.5","1.6"]],
    ["CIO","Como reorganizo a área para a era dos agentes e provo valor?",["1.1","1.4"]],
    ["Sócio de PE","Qual é a alavanca de tecnologia no EBITDA nos próximos 100 dias?",["1.3","1.5"]]
  ],
  /* o que o mercado faz: [firma, como chamam a oferta, o que fazem com IA, leitura para a DTS, "E"] */
  mk:[
    ["Deloitte","Technology Strategy & Transformation; Technology Strategy & Architecture","Zora AI (agentes por assinatura); aliança Anthropic (470 mil profissionais); Trustworthy AI","Forte em estratégia e plataforma; CIO interino não encontrado","E"],
    ["EY","Technology Strategy & Transformation · Office of the CIO (IT Finance, Sourcing, PPM)","EY.ai Agentic Platform com NVIDIA; investimento de US$ 1,4 bi","Op model e finanças de TI robustos","E"],
    ["KPMG","CIO Advisory (TBM/Apptio); KPMG Trusted AI","Workbench multiagente; 1ª Big Four com ISO/IEC 42001","Concorrente direto em custo de TI e governança de IA","E"],
    ["PwC","Consultoria de Negócios (estratégia, digital, cloud)","agent OS; 250+ agentes com Google; AI Experience Zone em Piracicaba","Pauta via CEO Survey; IA como acelerador","E"],
    ["McKinsey · BCG · Bain","McKinsey Technology (Rewired); BCG X; Bain Vector","~25 mil agentes na McKinsey; tech e IA >40% da receita do BCG; Bain Elite Partner da OpenAI","Estratégia de IA top-down, preço premium","E"],
    ["AlixPartners","Technology Practice; CIO interino; IT cost","Comprou a Artium (engenharia agêntica, ago/2026)","Par direto no DNA de operador","E"]
  ],
  /* sobreposição por linha de mk: A alta · M média · B baixa · X ativo A&M */
  heat:["M","A","A","M","M","A"],
  /* onde a DTS ganha: it = [título, texto, produto, "E"|"H"]; th = [ameaça, "E"|"H"] */
  ws:{it:[
      ["CIO / CAIO interino","Não encontrado nas Big Four; DNA histórico da A&M.","1.3","E"],
      ["Custo com risco compartilhado","Success fee + Spend Radar contínuo.","1.5","H"],
      ["Valor + governança de IA","Big Four focam risco; falta quem una ROI, custo e governança com accountability.","1.7","H"],
      ["Lei do Bem com leitura técnica por IA","Corte de 10% exige dossiê técnico melhor.","1.6","H"]
    ],
    th:["Diagnósticos e estratégias são os serviços mais comoditizáveis por IA: precisam virar sprint com valor em R$.","H"]},
  /* jornada comercial: [etapa, título, [produtos], nota] */
  jr:[
    ["Gatilho","Troca de CIO · orçamento 2027 · conselho cobra IA",[],"evento que abre a conversa"],
    ["Entrada · sprint","Diagnóstico em 3 semanas",["1.1"],"valor em jogo em R$ e 10 decisões"],
    ["Expansão · execução","Assumir, redesenhar e cortar",["1.3","1.4","1.5"],"a A&M entra no comando"],
    ["Recorrência","Radar e escritório contínuos",["1.5","1.7"],"assinatura que sustenta o resultado"]
  ],
  /* posicionamento proposto (HTML curto) */
  pos:"Para <b>CEOs, CFOs, conselhos e fundos</b> que precisam de resultado de tecnologia agora, o DTS é <em>a liderança que assume o cargo e entrega valor em R$, com IA no método</em>. Diferente de Big Four e estratégia, <b>assinamos o resultado</b> e não vendemos plataforma."
};
