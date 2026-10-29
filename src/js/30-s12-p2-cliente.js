/* =====================================================================
   SLIDE 12 · Pilar 2 · Technology Transformation · Cliente e mercado · dono: slide 12
   Registra o conteúdo do pilar em PCFG[2].cliente; quem desenha é src/js/25-pilares.js (no boot).
   Conteúdo herdado da V5: será revisto pelo time de conteúdo (siglas, números e fontes — ver SPEC 4 e 5).
   ===================================================================== */
PCFG[2].cliente={
  /* quem compra e o que pergunta: [papel, pergunta, [produtos]] */
  pers:[
    ["CFO · Head Tax","Meu ERP estará pronto para a CBS em 01/01/2027?",["2.2"]],
    ["CIO · Compras","Qual fornecedor escolher e como contratar sem lock-in?",["2.1"]],
    ["Sponsor · Conselho","Por que o programa atrasou e quanto custa terminar?",["2.3","2.4"]],
    ["CHRO · CIO","Por que ninguém usa a IA que compramos?",["2.5","2.6"]]
  ],
  /* o que o mercado faz: [firma, como chamam a oferta, o que fazem com IA, leitura para a DTS, "E"] */
  mk:[
    ["Deloitte","Alianças de implementação (AWS até 2031; Google); Technology Center em Recife (~600 pessoas)","Zora AI integrada aos agentes SAP Joule","Escala de entrega e alianças","E"],
    ["EY","Service Delivery Center em Recife (SAP, ServiceNow, IA, RPA)","EY Beyond Tax Analytics para a Reforma","Reforma entra pelo Tax","E"],
    ["KPMG","Powered Enterprise; Consultoria Reforma Tributária","Thomson Reuters ONESOURCE; Workbench","Fiscal + tecnologia","E"],
    ["CI&T · Falconi","Entrega AI-native; hiperautomação","CI&T Flow; Falconi: R$&nbsp;100&nbsp;mi em IA, 80% dos projetos com agentes","Comprimem preço de PMO e entrega","E"],
    ["TOTVS · SAP","Jornada da Reforma Tributária; RISE / S/4HANA","Chatbot especialista em Reforma (TOTVS)","O fornecedor também ‘aconselha’: falta voz independente","E"],
    ["Capgemini · Accenture · IBM","Recife: de 250 para 1.000 pessoas até o fim de 2026 (Capgemini); Accenture compra Tenbu","IBM Enterprise Advantage: consultoria baseada em ativos","Escala e ativos proprietários","E"]
  ],
  /* sobreposição por linha de mk: A alta · M média · B baixa · X ativo A&M */
  heat:["M","M","A","A","M","B"],
  /* onde a DTS ganha: it = [título, texto, produto, "E"|"H"]; th = [ameaça, "E"|"H"] */
  ws:{it:[
      ["Independência","Sem revenda de software nem de horas de fábrica.","2.1","H"],
      ["Lado sistêmico da Reforma","Big Four entram pelo Tax; ERP, dados e cutover ficam descobertos.","2.2","H"],
      ["Turnaround de programas","DNA A&M; >70% dos ERPs abaixo do business case (Gartner).","2.4","E"],
      ["Adoção medida por uso","IA comprada e não usada vira custo.","2.5","H"]
    ],
    th:["Concorrentes nativos em IA (CI&T, Falconi) e centros de entrega no Recife comprimem o preço de PMO e implementação.","E"]},
  /* jornada comercial: [etapa, título, [produtos], nota] */
  jr:[
    ["Gatilho","CBS em 01/01/2027 · go-live em risco · IA ociosa",[],"prazo fixo e risco alto"],
    ["Entrada · sprint","Prontidão ou diagnóstico forense",["2.2","2.4"],"2–8 semanas, preço fixo"],
    ["Expansão · execução","Governar, recuperar, contratar",["2.3","2.1"],"entrega garantida"],
    ["Recorrência","IA na própria TI, em ondas",["2.6","2.5"],"ganho medido trimestre a trimestre"]
  ],
  /* posicionamento proposto (HTML curto) */
  pos:"Para <b>CFOs, CIOs e sponsors</b> de programas obrigatórios e críticos, o DTS é <em>a voz independente que garante a entrega</em> (Reforma, ERP, IA). Diferente de integradores e fornecedores, <b>não vendemos software nem horas de fábrica</b>: respondemos por prazo e valor."
};

/* linha do tempo regulatória e de plataforma (Reforma Tributária e SAP ECC) */
(function(){const st=[["2026","Alíquota-teste de 1% (CBS 0,9% + IBS 0,1%)"],["01/01/2027","CBS plena; PIS/Cofins extintos"],["2027","Fim da manutenção padrão do SAP ECC (extensível a 2030)"],["2029–32","ICMS/ISS recolhidos a 90% → 60% da alíquota atual"],["2033","ICMS e ISS extintos"]];const h=$("p2time");if(!h)return;h.innerHTML=`<div class="rt">${st.map(([d,t],i)=>`<div class="rt-i${i===1?" hot":""}"><i></i><b>${d}</b><span>${t}</span></div>`).join("")}</div>`})();
