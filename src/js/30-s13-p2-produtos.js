/* =====================================================================
   SLIDE 13 · Pilar 2 · Technology Transformation · Produtos · dono: slide 13
   Registra o conteúdo do pilar em PCFG[2].produtos; o grafo, as cartas e o antes e depois
   são desenhados por src/js/25-pilares.js (no boot).
   ===================================================================== */
PCFG[2].produtos={
  /* frase do grafo nos estados Hoje e Produtos (o estado Com IA é calculado dos dados) */
  cap:[
    "7 serviços: TMO e Modelo de Implantação e Governança têm o mesmo comprador e o mesmo método, e o IT Business Partner tem baixa diferenciação.",
    "TMO e Modelo de Implantação se fundem no 2.3; o IT Business Partner sai para a liderança embarcada (1.3, Pilar 1) e o 2.6 nasce no lugar tracejado."
  ],
  /* "O que muda": 4 frases curtas; códigos de produto viram link para a ficha */
  notes:[
    "TMO e Modelo de Implantação e Governança → 2.3",
    "ERP Readiness & Gap Analysis incorpora a Reforma",
    "IT Business Partner sai para o 1.3 (Pilar 1)",
    "Novo: AI-Native IT Productivity"
  ],
  /* motivo da sobreposição, por produto de destino */
  ovl:{"2.3":"mesmo comprador e mesmo método"}
};
