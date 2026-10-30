/* =====================================================================
   DADOS · novo portfólio DTS (24 produtos) + portfólio atual (29 serviços)
   Convenção: [E] evidência com fonte · [H] hipótese/proposta a validar
   ===================================================================== */
const E=t=>`<span class="ev">${t?"E · "+t:"Evidência"}</span>`;
const Hy=t=>`<span class="hy">${t||"Hipótese"}</span>`;

/* PILLARS · name (como o deck chama o pilar) · official (nome no portfólio oficial) · to (nome na proposta: igual ao de hoje,
   sem renomear pilares, pedido do usuário) · short (o pilar em poucas palavras) · def (a proposta do pilar em uma frase, sem
   promessa nem sigla: divisórias, one-page) · def_as e when (textos do portfólio oficial) · was/now/nnew (contagens estruturais) */
const PILLARS=[
  {n:1,name:"IT Advisory",official:"IT Advisory",to:"IT Advisory",short:"Estratégia, liderança e valor de tecnologia",
   def:"Ajudamos conselho e diretoria a decidir onde a tecnologia e a IA devolvem resultado: diagnóstico, plano, liderança interina, modelo operacional e custo.",
   def_as:"Apoiamos líderes na tomada de decisões estratégicas por meio de soluções de TI que integram diagnóstico, transformação e governança, acelerando resultados, mitigando riscos e gerando valor.",
   when:"Empresas que enfrentam desafios na transformação da área de TI, custos elevados com tecnologia ou necessidade de redefinir sua direção tecnológica.",
   was:10,now:7,nnew:1},
  {n:2,name:"Technology Transformation",official:"Technology Transformation",to:"Technology Transformation",short:"Execução de transformações complexas",
   def:"Conduzimos programas críticos de tecnologia até a entrega: escolha de fornecedor, ERP e Reforma Tributária, escritório que prevê atraso, resgate e adoção.",
   def_as:"Apoiamos na execução de projetos estratégicos complexos, garantindo implementações bem-sucedidas e alinhamento entre tecnologia e objetivos de negócio.",
   when:"Empresas que executam projetos estratégicos e transformacionais de TI, com alto risco e impacto para o negócio.",
   was:7,now:6,nnew:1},
  {n:3,name:"Tech M&A",official:"Technology M&A Advisory & Transformation",to:"Tech M&A",short:"Tecnologia em toda a transação",
   def:"Cuidamos da tecnologia da assinatura à saída: diligência com IA, primeiro dia, integração e separação, sinergias e acompanhamento das empresas dos fundos.",
   def_as:"Oferecemos suporte estratégico e especializado em todo o ciclo de M&A, com foco em tecnologia, garantindo excelência na execução e aproveitamento de sinergias para maximizar o valor da transação.",
   when:"Fundos de investimento e empresas em processos de aquisição ou venda, da definição da estratégia à execução da transição.",
   was:8,now:5,nnew:1},
  {n:4,name:"Modernization",official:"Technological Modernization & Digital Evolution",to:"Modernization",short:"Arquitetura, legado, infraestrutura e resiliência",
   def:"Modernizamos arquitetura, aplicações e infraestrutura para a era da IA, com custo sob controle, migração revisada e resiliência testada em simulação.",
   def_as:"Entregamos soluções em arquitetura de TI e governança, modernizando sistemas e infraestruturas para garantir alinhamento estratégico e sustentabilidade a longo prazo.",
   when:"Empresas que precisam avaliar e modernizar suas arquiteturas e infraestruturas de TI, otimizando custos e aumentando a eficiência operacional.",
   was:4,now:6,nnew:1}
];

/* ---------- PORTFÓLIO ATUAL (29) · raio-X qualitativo DTS (V6: sem escores; leitura nossa, a calibrar com os sócios) ----------
   n  = nome oficial do serviço · p = pilar de hoje
   dm = demanda em 2026 e 2027: "A" alta · "M" média · "B" baixa
        alta  = há gatilho datado ou pressão de custo documentada (Reforma Tributária, fim da manutenção do ERP antigo
                da SAP, regra nova do Conselho Monetário Nacional, fundos nas transações, custo de TI)
        média = procura estável, sem gatilho datado · baixa = o cliente quase não compra o serviço sozinho
   dv = direito de vencer da A&M: "A" alto · "M" médio · "B" baixo
        alto  = usa o que a A&M faz de diferente (assumir o cargo, resgatar o que saiu do trilho, reestruturar,
                trabalhar com fundos de private equity, sem conflito de auditoria)
        médio = disputa de igual para igual · baixo = outros têm vantagem clara (integradores, especialistas)
   d  = decisão: keep (manter) | ai (aprimorar com IA) | merge (fundir) | cut (sair como produto isolado) · to = produto de destino
   w  = por que muda, em uma frase (≤ 90 caracteres, sem número nem sigla): aparece na dica do raio-X (slide 07)
        e, quando o pilar não define a sua, no grafo e no "Antes e depois" dos slides de produtos (motor 25-pilares).
   As justificativas de cada nível ficam no módulo do slide 07 (src/js/30-s07-raio-x.js) e o critério no verso.     */
const OLD=[
 {id:"a1",p:1,n:"Tech Maturity & Value Assessment",dm:"A",dv:"M",d:"ai",to:"1.1",w:"O retrato de maturidade acaba em relatório; tem de acabar em decisões com valor em reais"},
 {id:"a2",p:1,n:"C-Level Tech Enablement",dm:"B",dv:"M",d:"merge",to:"1.3",w:"Sozinho, o cliente não vê a entrega; vira o programa de IA para conselho e diretoria"},
 {id:"a3",p:1,n:"Embedded Tech Leadership",dm:"M",dv:"A",d:"merge",to:"1.3",w:"Mesmo comprador e mesma rede de executivos da liderança interina: vira um só produto"},
 {id:"a4",p:1,n:"Interim CIO / CTO Leadership",dm:"M",dv:"A",d:"keep",to:"1.3",w:"Assumir o cargo e responder pelo resultado é o que a A&M faz: mantém a essência"},
 {id:"a5",p:1,n:"Digital Strategy & Roadmapping",dm:"A",dv:"B",d:"ai",to:"1.2",w:"Plano digital sem caso de negócio; vira plano de tecnologia e IA que o conselho aprova"},
 {id:"a6",p:1,n:"Operating Model Design & Tech Org Restructuring",dm:"M",dv:"A",d:"ai",to:"1.4",w:"Desenha a área sem prever agentes de IA; passa a desenhar pessoas e agentes juntos"},
 {id:"a7",p:1,n:"IT Resilience & Business Continuity Planning",dm:"A",dv:"B",d:"ai",to:"4.5",w:"Resiliência é decisão de arquitetura: muda para Modernization e ganha simulação de crise"},
 {id:"a8",p:1,n:"Tech Spend Optimization",dm:"A",dv:"A",d:"ai",to:"1.5",w:"O corte pontual volta na renovação seguinte; ganha um radar com IA que vigia o custo"},
 {id:"a9",p:1,n:"Strategic Tech Tax / Accounting Planning",dm:"B",dv:"B",d:"merge",to:"1.6",w:"Nicho fiscal que fica mais forte junto com os incentivos à inovação: vira um só produto"},
 {id:"a10",p:1,n:"Innovation Tax Incentives Advisory",dm:"M",dv:"B",d:"merge",to:"1.6",w:"Mesmo comprador do planejamento fiscal; a IA passa a ler projetos e código para o dossiê"},
 {id:"b1",p:2,n:"IT Sourcing (Software & Vendor) Selection",dm:"M",dv:"M",d:"ai",to:"2.1",w:"A IA encurta a escolha de fornecedor; o diferencial vira independência e negociação"},
 {id:"b2",p:2,n:"ERP Readiness & Gap Analysis",dm:"A",dv:"M",d:"ai",to:"2.2",w:"A janela de 2027 junta ERP e Reforma Tributária: a prontidão passa a cobrir as duas"},
 {id:"b3",p:2,n:"TMO",dm:"A",dv:"M",d:"ai",to:"2.3",w:"Escritório que só acompanha vira commodity; passa a prever atraso e custo com IA"},
 {id:"b4",p:2,n:"Gestão de Mudanças Tech",dm:"M",dv:"B",d:"ai",to:"2.5",w:"Mudança genérica vira adoção de IA, medida pelo uso real das ferramentas"},
 {id:"b5",p:2,n:"Modelo de Implantação e Governança",dm:"B",dv:"M",d:"merge",to:"2.3",w:"Mesmo comprador e mesmo método do escritório de transformação: os dois viram um"},
 {id:"b6",p:2,n:"Project Remediation",dm:"A",dv:"A",d:"keep",to:"2.4",w:"Resgatar o que saiu do trilho é a lógica do turnaround aplicada à TI: mantém a essência"},
 {id:"b7",p:2,n:"IT Business Partner",dm:"B",dv:"B",d:"cut",to:"1.3",w:"Alocação de perfil com pouca diferenciação: o papel passa para a liderança embarcada"},
 {id:"c1",p:3,n:"IT M&A Playbook",dm:"B",dv:"M",d:"cut",to:"3.5",w:"Pouco vendável sozinho: vira ativo interno que alimenta os produtos de transação"},
 {id:"c2",p:3,n:"IT Due Diligence (Buy Side)",dm:"A",dv:"A",d:"ai",to:"3.1",w:"Concorrentes já usam IA na diligência: a nossa precisa ficar mais rápida e mais funda"},
 {id:"c3",p:3,n:"IT Integration & Separation Planning",dm:"M",dv:"M",d:"merge",to:"3.2",w:"Mesmo método do desenho de separação: um só plano para integrar ou separar"},
 {id:"c4",p:3,n:"IT Integration Management Office",dm:"M",dv:"A",d:"merge",to:"3.3",w:"Integrar e separar são a mesma disciplina em sentidos opostos: um só escritório"},
 {id:"c5",p:3,n:"IT Due Diligence (Sell Side)",dm:"M",dv:"M",d:"merge",to:"3.1",w:"Vira a edição do vendedor do mesmo produto de diligência, com preparação para a venda"},
 {id:"c6",p:3,n:"IT Separation Strategy & Design",dm:"M",dv:"A",d:"merge",to:"3.2",w:"Separação é força da A&M; junta-se ao plano de integração num só desenho"},
 {id:"c7",p:3,n:"IT Separation Management Office",dm:"M",dv:"A",d:"merge",to:"3.3",w:"Junta-se ao escritório de integração: uma só governança do primeiro dia ao fim da transição"},
 {id:"c8",p:3,n:"IT Synergies & Value Creation",dm:"A",dv:"A",d:"keep",to:"3.4",w:"Perto do trabalho da A&M com fundos: mantém o plano de valor depois do fechamento"},
 {id:"d1",p:4,n:"Strategy Architecture",dm:"M",dv:"B",d:"ai",to:"4.1",w:"Nome pouco claro ao mercado; vira arquitetura pronta para IA, com dívida técnica em reais"},
 {id:"d2",p:4,n:"Strategy Application",dm:"M",dv:"M",d:"ai",to:"4.2",w:"Vira racionalização do portfólio de aplicações, ligada a custo e a risco"},
 {id:"d3",p:4,n:"Infrastructure Management",dm:"A",dv:"B",d:"ai",to:"4.3",w:"Soa como serviço gerenciado; passa a decidir a rota e o custo de nuvem, licenças e IA"},
 {id:"d4",p:4,n:"Complex Migrations Support",dm:"A",dv:"M",d:"keep",to:"4.4",w:"Mantém a essência como revisão independente do trabalho do integrador"}
];
/* Os 4 produtos novos não entram no raio-X dos serviços (auditoria V5, T03/T07): NEWPOS fica vazio, só por compatibilidade. */
const NEWPOS=[];


/* ---------- NOVO PORTFÓLIO (24) · um arquivo por pilar em src/data/1N-produtos-pN.js ---------- */
const PRODUCTS=[];
