/* =====================================================================
   SLIDE 17 · Pilar 4 · Modernization · Produtos · dono: slide 17
   Registra o conteúdo do pilar em PCFG[4].produtos; o grafo, as cartas e o antes e depois
   são desenhados por src/js/25-pilares.js (no boot).
   ===================================================================== */
PCFG[4].produtos={
  /* frase do grafo nos estados Hoje e Produtos (o estado Com IA é calculado dos dados) */
  cap:[
    "3 dos 4 serviços têm nomes que não dizem o que entregam, e a resiliência ainda está no Pilar 1.",
    "Cada serviço vira o produto com o nome do que entrega (4.1 a 4.4); a resiliência chega do Pilar 1 como 4.5 e o 4.6 nasce no lugar tracejado."
  ],
  /* "O que muda": 4 frases curtas; códigos de produto viram link para a ficha */
  notes:[
    "4 serviços renomeados pelo que entregam",
    "Infra vira advisory de decisão e custo (4.3)",
    "Resiliência chega do Pilar 1 (4.5)",
    "Novo: Legacy X-Ray & AI Modernization"
  ],
  /* motivo da sobreposição, por produto de destino */
  ovl:{}
};
