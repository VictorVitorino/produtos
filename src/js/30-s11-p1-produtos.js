/* =====================================================================
   SLIDE 11 · Pilar 1 · IT Advisory · Produtos · dono: slide 11
   Registra o conteúdo do pilar em PCFG[1].produtos; o grafo, as cartas e o antes e depois
   são desenhados por src/js/25-pilares.js (no boot).
   ===================================================================== */
PCFG[1].produtos={
  /* frase do grafo nos estados Hoje e Produtos (o estado Com IA é calculado dos dados) */
  cap:[
    "10 serviços e 2 sobreposições: 3 ofertas de liderança (<span class='nw'>Interim CIO / CTO Leadership</span>, <span class='nw'>Embedded Tech Leadership</span> e <span class='nw'>C-Level Tech Enablement</span>) e 2 de impostos e incentivos.",
    "As 3 ofertas de liderança e o IT Business Partner (Pilar 2) formam o 1.3, os 2 serviços de impostos formam o 1.6 e a resiliência sai para o 4.5, no Pilar 4."
  ],
  /* "O que muda": 4 frases curtas; códigos de produto viram link para a ficha */
  notes:[
    "3 ofertas de liderança viram o 1.3",
    "Tax e incentivos viram o 1.6, com A&M Tax",
    "Resiliência muda para o Pilar 4 (4.5)",
    "Novo: AI Value & Governance Office"
  ],
  /* motivo da sobreposição, por produto de destino */
  ovl:{"1.3":"3 ofertas de liderança para o mesmo comprador","1.6":"2 serviços de impostos e incentivos"}
};
