/* =====================================================================
   DADOS · novo portfólio DTS (24 produtos) + portfólio atual (29 serviços)
   Convenção: [E] evidência com fonte · [H] hipótese/proposta a validar
   ===================================================================== */
const E=t=>`<span class="ev">${t?"E · "+t:"Evidência"}</span>`;
const Hy=t=>`<span class="hy">${t||"Hipótese"}</span>`;

const PILLARS=[
  {n:1,name:"IT Advisory",official:"IT Advisory",to:"IT Advisory · Strategy, Leadership & Value",short:"Estratégia, liderança e valor de tecnologia",
   def:"Apoiamos líderes nas decisões de tecnologia e IA que movem o resultado: diagnóstico, estratégia investível, liderança interina, modelo operacional e custo.",
   def_as:"Apoiamos líderes na tomada de decisões estratégicas por meio de soluções de TI que integram diagnóstico, transformação e governança, acelerando resultados, mitigando riscos e gerando valor.",
   when:"Empresas que enfrentam desafios na transformação da área de TI, custos elevados com tecnologia ou necessidade de redefinir sua direção tecnológica.",
   was:10,now:7,nnew:1},
  {n:2,name:"Technology Transformation",official:"Technology Transformation",to:"Technology Transformation",short:"Execução de transformações complexas",
   def:"Garantimos que programas críticos de tecnologia entreguem: escolha de fornecedores, ERP e Reforma Tributária, governança preditiva, resgate de projetos e adoção.",
   def_as:"Apoiamos na execução de projetos estratégicos complexos, garantindo implementações bem-sucedidas e alinhamento entre tecnologia e objetivos de negócio.",
   when:"Empresas que executam projetos estratégicos e transformacionais de TI, com alto risco e impacto para o negócio.",
   was:7,now:6,nnew:1},
  {n:3,name:"Tech M&A",official:"Technology M&A Advisory & Transformation",to:"Tech M&A & Value Creation",short:"Tecnologia em todo o ciclo do deal",
   def:"Protegemos e criamos valor de tecnologia do signing à saída: due diligence com IA, Dia 1, integração e separação, sinergias e monitoramento de portfólio.",
   def_as:"Oferecemos suporte estratégico e especializado em todo o ciclo de M&A, com foco em tecnologia, garantindo excelência na execução e aproveitamento de sinergias para maximizar o valor da transação.",
   when:"Fundos de investimento e empresas em processos de aquisição ou venda, da definição da estratégia à execução da transição.",
   was:8,now:5,nnew:1},
  {n:4,name:"Modernization",official:"Technological Modernization & Digital Evolution",to:"Modernization & AI-Ready Technology",short:"Arquitetura, legado, infraestrutura e resiliência",
   def:"Modernizamos arquitetura, aplicações e infraestrutura para a era da IA, com custo sob controle, migrações garantidas e operação resiliente.",
   def_as:"Entregamos soluções em arquitetura de TI e governança, modernizando sistemas e infraestruturas para garantir alinhamento estratégico e sustentabilidade a longo prazo.",
   when:"Empresas que precisam avaliar e modernizar suas arquiteturas e infraestruturas de TI, otimizando custos e aumentando a eficiência operacional.",
   was:4,now:6,nnew:1}
];

/* ---------- PORTFÓLIO ATUAL (29) · avaliação qualitativa DTS [H] ----------
   x = atratividade de mercado Brasil 2026–27 (1–5) · y = direito de vencer A&M (1–5)
   d = decisão: keep | ai | merge | cut · to = produto de destino               */
const OLD=[
 {id:"a1",p:1,n:"Tech Maturity & Value Assessment",x:3.6,y:3.2,d:"ai",to:"1.1",w:"Demanda alta, mas diagnósticos de maturidade se comoditizam com IA: precisa virar valor em R$ e prontidão para IA."},
 {id:"a2",p:1,n:"C-Level Tech Enablement",x:2.6,y:2.4,d:"merge",to:"1.3",w:"Pouco tangível isolado; vira módulo 'Board & C-Level AI Fluency' dentro da liderança interina."},
 {id:"a3",p:1,n:"Embedded Tech Leadership",x:3.0,y:3.8,d:"merge",to:"1.3",w:"Sobrepõe Interim CIO/CTO: mesmo comprador, mesma bancada de executivos."},
 {id:"a4",p:1,n:"Interim CIO / CTO Leadership",x:3.6,y:4.7,d:"keep",to:"1.3",w:"DNA A&M (interim management). Não foi encontrada oferta equivalente nas Big Four."},
 {id:"a5",p:1,n:"Digital Strategy & Roadmapping",x:3.4,y:2.6,d:"ai",to:"1.2",w:"Mercado saturado (estratégia, Big Four, integradores). Reposicionar para roadmap investível de tecnologia e IA."},
 {id:"a6",p:1,n:"Operating Model Design & Tech Org Restructuring",x:3.8,y:4.0,d:"ai",to:"1.4",w:"Reestruturação é DNA A&M; precisa incorporar força de trabalho humano + agentes."},
 {id:"a7",p:1,n:"IT Resilience & Business Continuity Planning",x:3.7,y:2.8,d:"ai",to:"4.5",w:"Demanda sobe (CMN 5.274, ataques C&M/Sinqia). Move para Modernização: resiliência é arquitetura."},
 {id:"a8",p:1,n:"Tech Spend Optimization",x:4.6,y:4.6,d:"ai",to:"1.5",w:"Câmbio, VMware e TI crescendo só 5,3% em 2026: carro-chefe. Ganha radar contínuo com IA."},
 {id:"a9",p:1,n:"Strategic Tech Tax / Accounting Planning",x:2.8,y:2.6,d:"merge",to:"1.6",w:"Nicho; mais forte combinado a incentivos e em parceria com A&M Tax."},
 {id:"a10",p:1,n:"Innovation Tax Incentives Advisory",x:3.2,y:2.4,d:"merge",to:"1.6",w:"Lei do Bem: 4,2 mil empresas, corte de 10% pela LC 224. Diferencia com leitura técnica por IA."},
 {id:"b1",p:2,n:"IT Sourcing (Software & Vendor) Selection",x:3.4,y:3.2,d:"ai",to:"2.1",w:"IA comprime RFP e avaliação; diferencial é independência e negociação."},
 {id:"b2",p:2,n:"ERP Readiness & Gap Analysis",x:4.6,y:3.4,d:"ai",to:"2.2",w:"Janela única: Reforma Tributária (CBS 2027) + fim da manutenção padrão do SAP ECC em 2027."},
 {id:"b3",p:2,n:"TMO",x:3.6,y:3.6,d:"ai",to:"2.3",w:"PMO sem accountability se comoditiza; TMO preditivo com IA e foco em valor."},
 {id:"b4",p:2,n:"Gestão de Mudanças Tech",x:3.4,y:2.6,d:"ai",to:"2.5",w:"Reposicionar para adoção de IA (Copilots, agentes), medida por dados de uso."},
 {id:"b5",p:2,n:"Modelo de Implantação e Governança",x:2.4,y:2.8,d:"merge",to:"2.3",w:"Mesmo comprador e método do TMO: fundir."},
 {id:"b6",p:2,n:"Project Remediation",x:4.0,y:4.6,d:"keep",to:"2.4",w:"Turnaround de projetos é DNA A&M; Reforma e ERPs atrasados aumentam a demanda."},
 {id:"b7",p:2,n:"IT Business Partner",x:2.0,y:2.2,d:"cut",to:"1.3",w:"Alocação de perfil, baixa diferenciação e margem; absorvido pela liderança embarcada."},
 {id:"c1",p:3,n:"IT M&A Playbook",x:2.2,y:3.0,d:"cut",to:"3.5",w:"Pouco vendável isolado; vira ativo interno que alimenta todos os produtos de M&A."},
 {id:"c2",p:3,n:"IT Due Diligence (Buy Side)",x:4.4,y:4.0,d:"ai",to:"3.1",w:"PE em 50% dos deals; concorrentes já usam IA (PwC Harvey/ToltIQ). Acelerar é obrigatório."},
 {id:"c3",p:3,n:"IT Integration & Separation Planning",x:3.8,y:3.8,d:"merge",to:"3.2",w:"Mesmo método do desenho de separação: um blueprint para as duas direções."},
 {id:"c4",p:3,n:"IT Integration Management Office",x:3.6,y:4.0,d:"merge",to:"3.3",w:"IMO e SMO são a mesma disciplina em sentidos opostos."},
 {id:"c5",p:3,n:"IT Due Diligence (Sell Side)",x:3.4,y:3.4,d:"merge",to:"3.1",w:"Vira a edição sell-side / vendor readiness do mesmo produto de DD."},
 {id:"c6",p:3,n:"IT Separation Strategy & Design",x:3.6,y:4.2,d:"merge",to:"3.2",w:"Carve-outs são força A&M; unificado ao blueprint de integração."},
 {id:"c7",p:3,n:"IT Separation Management Office",x:3.4,y:4.2,d:"merge",to:"3.3",w:"Unificado ao IMO: governança única para Dia 1 e saída de TSA."},
 {id:"c8",p:3,n:"IT Synergies & Value Creation",x:4.0,y:4.0,d:"keep",to:"3.4",w:"Alinhado à prática de PE da A&M; manter como plano de 100 dias."},
 {id:"d1",p:4,n:"Strategy Architecture",x:3.4,y:2.6,d:"ai",to:"4.1",w:"Nome pouco claro ao mercado; reposicionar para arquitetura pronta para IA e dívida técnica em R$."},
 {id:"d2",p:4,n:"Strategy Application",x:3.2,y:2.8,d:"ai",to:"4.2",w:"Renomear para racionalização de portfólio de aplicações, ligada a custo."},
 {id:"d3",p:4,n:"Infrastructure Management",x:3.8,y:2.4,d:"ai",to:"4.3",w:"Soa como serviço gerenciado (onde integradores dominam); virar advisory de decisão e custo: nuvem, VMware, GPU."},
 {id:"d4",p:4,n:"Complex Migrations Support",x:3.6,y:3.4,d:"keep",to:"4.4",w:"Reposicionar como assurance independente do integrador."}
];
const NEWPOS=[{c:"1.7",x:4.4,y:3.6},{c:"2.6",x:3.9,y:3.1},{c:"3.5",x:3.8,y:4.3},{c:"4.6",x:4.2,y:3.3}];


/* ---------- NOVO PORTFÓLIO (24) · um arquivo por pilar em src/data/1N-produtos-pN.js ---------- */
const PRODUCTS=[];
