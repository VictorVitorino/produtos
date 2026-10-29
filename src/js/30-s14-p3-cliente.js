/* =====================================================================
   SLIDE 14 · Pilar 3 · Tech M&A · Cliente e mercado · dono: slide 14
   Registra o conteúdo do pilar em PCFG[3].cliente; quem desenha é src/js/25-pilares.js (no boot).
   Conteúdo herdado da V5: será revisto pelo time de conteúdo (siglas, números e fontes — ver SPEC 4 e 5).
   ===================================================================== */
PCFG[3].cliente={
  /* quem compra e o que pergunta: [papel, pergunta, [produtos]] */
  pers:[
    ["Sócio de PE","Quais riscos de tecnologia mudam o preço? E depois do closing?",["3.1","3.5"]],
    ["Corporate development","Como integramos sem parar a operação?",["3.2","3.3"]],
    ["CFO do vendedor","Como separamos a TI e saímos da TSA no prazo?",["3.2","3.3"]],
    ["CEO pós-deal","Onde estão as sinergias de TI prometidas no deal?",["3.4"]]
  ],
  /* o que o mercado faz: [firma, como chamam a oferta, o que fazem com IA, leitura para a DTS, "E"] */
  mk:[
    ["Deloitte","M&A Technology: Tech DD, Software/Data Diligence, Sell-side & Exit Readiness, Separation & Carve-out (ACDC)","Plataforma de agentes Zora AI","Ciclo completo do deal","E"],
    ["EY-Parthenon","Transaction Strategy & Execution · Technology (DD, PMI, carve-out, TSA, Dia 1)","CAST Highlight reduziu >75% do tempo de avaliação de código em DD","DD + TSA + Dia 1","E"],
    ["PwC","AI technology diligence; Digital deals","‘Harvey, powered by PwC’ licenciado a clientes; exclusividade com a ToltIQ (jun/2026)","IA vendida como produto","E"],
    ["Bain","Tech Due Diligence","Replica o software do alvo com Claude Code para testar defensabilidade","DD testa o risco de disrupção por IA","E"],
    ["Entrantes","DiligenceSquared; Ode with Anthropic","DD com agentes por ~US$ 50 mil; engenheiros de IA dentro das investidas dos fundos","Pressão de preço no canal de PE","E"],
    ["A&M (hoje)","Tech & product DD, PMI, carve-out, 100 dias; PEPI","A&M Assist (abr/2025); DiligenceGPT","Ativos existem; falta produtizar no Brasil","E"]
  ],
  /* sobreposição por linha de mk: A alta · M média · B baixa · X ativo A&M */
  heat:["A","A","A","M","A","X"],
  /* onde a DTS ganha: it = [título, texto, produto, "E"|"H"]; th = [ameaça, "E"|"H"] */
  ws:{it:[
      ["DD + 100 dias + execução","Um contrato do signing ao Dia 100: a DD vira porta de entrada.","3.1","H"],
      ["Assinatura do portfólio","Radar trimestral de tecnologia e IA para fundos: não encontrado no Brasil.","3.5","H"],
      ["Ativos de IA nas TSAs","Licenças de LLM, dados e agentes compartilhados entram na separação.","3.2","H"],
      ["Ativos A&M existentes","A&M Assist e DiligenceGPT podem ser localizados para o Brasil.","3.1","E"]
    ],
    th:["DD com agentes a ~US$ 50 mil e laboratórios de IA dentro dos fundos (Ode) pressionam preço no canal de PE.","E"]},
  /* jornada comercial: [etapa, título, [produtos], nota] */
  jr:[
    ["Gatilho","Mandato de compra ou venda · carve-out anunciado",[],"relógio do deal"],
    ["Entrada · sprint","Red flag em 1 semana",["3.1"],"DD com IA, 3 níveis"],
    ["Expansão · execução","Dia 1, TSA e sinergias",["3.2","3.3","3.4"],"do signing ao Dia 100"],
    ["Recorrência","Radar do portfólio do fundo",["3.5"],"assinatura anual · leitura trimestral por investida"]
  ],
  /* posicionamento proposto (HTML curto) */
  pos:"Para <b>fundos de PE e compradores estratégicos</b>, o DTS é <em>o operador de tecnologia do signing à saída</em>: DD com IA em 1–3 semanas, Dia 1 sem susto e sinergias que viram EBITDA. Diferente de quem só diligencia, <b>executamos o que recomendamos</b>."
};

/* casos públicos que exigem integração ou separação de TI (imprensa 2025–26) */
(function(){const host=$("p3cases");if(!host)return;
[["MBRF","Marfrig + BRF, concluída em set/2025; sinergias anunciadas de R$&nbsp;485&nbsp;mi/ano","Integração"],["Petz + Cobasi","Cade aprovou em dez/2025, com venda de 26 lojas","Integração"],["Braskem","Controle passa à IG4 (abr/2026)","Troca de controle"],["Raízen","Separação em Energia e Combustíveis até o fim de 2027","Carve-out"],["Motiva","Venda de participações em aeroportos por R$&nbsp;5,2&nbsp;bi","Desinvestimento"]].forEach(([n,x,t])=>{const d=H("div",{class:"kpi-t"},host);d.innerHTML=`<span class="st ${t==="Carve-out"?"new":t==="Integração"?"ai":"keep"}">${t}</span><div class="nm">${n}</div><div class="l">${x}</div>`});})();
