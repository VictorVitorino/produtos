/* =====================================================================
   SLIDE 16 · Pilar 4 · Modernization · Cliente e mercado · dono: slide 16
   Registra o conteúdo do pilar em PCFG[4].cliente; quem desenha é src/js/25-pilares.js (no boot).
   Conteúdo herdado da V5: será revisto pelo time de conteúdo (siglas, números e fontes — ver SPEC 4 e 5).
   ===================================================================== */
PCFG[4].cliente={
  /* quem compra e o que pergunta: [papel, pergunta, [produtos]] */
  pers:[
    ["CIO · CTO","Por onde começo a modernizar o legado e quanto custa?",["4.1","4.6"]],
    ["CFO","Quanto pago em virtualização, nuvem e sistemas redundantes?",["4.2","4.3"]],
    ["CRO · COO","Aguentamos um ataque ou a falha de um terceiro?",["4.5"]],
    ["Conselho","A migração vai dar certo? Quem garante?",["4.4"]]
  ],
  /* o que o mercado faz: [firma, como chamam a oferta, o que fazem com IA, leitura para a DTS, "E"] */
  mk:[
    ["McKinsey","LegacyX (QuantumBlack)","SAS → Python com squads de agentes: ~90% de precisão, cronograma −80%","Plataforma própria de modernização","E"],
    ["Accenture","GenWizard; Anthropic Business Group","Gemini para mainframe; 30 mil pessoas treinadas em Claude","Escala de fábrica","E"],
    ["IBM","watsonx Code Assistant for Z; Bob; Enterprise Advantage","~45% de ganho interno com Bob (dado do fornecedor)","Dona do mainframe","E"],
    ["AWS · Microsoft · Google","AWS Transform; GitHub Copilot app modernization; Mainframe Rewrite","Migração sem custo (AWS); até 4× mais rápido em .NET","A ferramenta vira commodity","E"],
    ["Deloitte · EY","Technology Strategy & Architecture; arquitetura corporativa","Agentes em ferramentas de EA (SAP LeanIX, Ardoq)","EA tradicional ganha automação","E"],
    ["Anthropic","Claude Code","COBOL ‘em trimestres, não anos’ (fev/2026); ação da IBM caiu no anúncio","Laboratórios vão direto ao cliente","E"]
  ],
  /* sobreposição por linha de mk: A alta · M média · B baixa · X ativo A&M */
  heat:["M","M","M","A","M","A"],
  /* onde a DTS ganha: it = [título, texto, produto, "E"|"H"]; th = [ameaça, "E"|"H"] */
  ws:{it:[
      ["Raio-X neutro + business case","A&M seleciona e garante; não revende ferramenta nem fábrica.","4.6","H"],
      ["Assurance independente","O integrador não deve avaliar o próprio trabalho.","4.4","H"],
      ["Economia de infraestrutura","VMware, nuvem e GPU com TCO e FinOps.","4.3","E"],
      ["Resiliência pós-incidente","Cadeia do Pix e CMN 5.274.","4.5","E"]
    ],
    th:["Sem plataforma própria comparável a LegacyX ou GenWizard, vender horas de modernização é perder para ferramentas cobradas por minuto.","H"]},
  /* jornada comercial: [etapa, título, [produtos], nota] */
  jr:[
    ["Gatilho","Renovação VMware · incidente · legado sem dono",[],"custo ou risco explícito"],
    ["Entrada · sprint","Raio-X do legado ou TCO",["4.6","4.3"],"4–10 semanas, fixo ou fixo + % de economia"],
    ["Expansão · execução","Arquitetura, racionalização, assurance",["4.1","4.2","4.4"],"rota e garantia"],
    ["Recorrência","Resiliência e arquitetura vivas",["4.5","4.1"],"exercícios anuais e repositório"]
  ],
  /* posicionamento proposto (HTML curto) */
  pos:"Para <b>CIOs e CFOs</b> presos a legado caro e arriscado, o DTS é <em>quem escolhe a rota e garante a modernização</em>, usando IA para ler o legado, neutro em fornecedor. Diferente de hyperscalers e fábricas, <b>não revendemos ferramenta</b>: respondemos pelo business case."
};
