/* =====================================================================
   SLIDE 15 · Pilar 3 · Tech M&A · Produtos · dono: slide 15
   Registra o conteúdo do pilar em PCFG[3].produtos; o grafo, as cartas e o antes e depois
   são desenhados por src/js/25-pilares.js (no boot).
   ===================================================================== */
PCFG[3].produtos={
  /* frase do grafo nos estados Hoje e Produtos (o estado Com IA é calculado dos dados) */
  cap:[
    "8 serviços que são fases de um mesmo ciclo, em pares que se sobrepõem: DD buy e sell, integração e separação, IMO e SMO.",
    "Os pares se fundem: DD buy e sell no 3.1, planejamento e desenho de separação no 3.2, IMO e SMO no 3.3; o Playbook deixa de ser vendido isolado e alimenta o 3.5."
  ],
  /* "O que muda": 4 frases curtas; códigos de produto viram link para a ficha */
  notes:[
    "8 fases viram 4 produtos + 1 assinatura",
    "DD de compra e venda: 1 produto (3.1)",
    "IMO e SMO: 1 escritório (3.3)",
    "IT M&A Playbook vira o motor do 3.5"
  ],
  /* motivo da sobreposição, por produto de destino */
  ovl:{"3.1":"mesmo método em direções opostas (compra × venda)","3.2":"mesmo método em direções opostas (integração × separação)","3.3":"mesma disciplina em sentidos opostos (IMO × SMO)"}
};
