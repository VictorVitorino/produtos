/* =====================================================================
   SLIDE 17 · Pilar 4 · Modernization · Produtos · dono: pilar-4
   Só registra o conteúdo em PCFG[4].produtos; quem desenha é src/js/25-pilares.js (no boot):
   · vista 1 (.pp): os 4 serviços de hoje → as 6 cartas de produto (Hoje · Produtos · Com IA), com → passo a passo;
     a resiliência (IT Resilience & Business Continuity Planning) chega do Pilar 1 em "Produtos" e o 4.6 nasce sem serviço de origem
   · vista 2 (.bap): antes e depois, linha a linha (divisor no meio: Hoje à esquerda, Proposta à direita)
   Textos sem número; a lógica de cada mudança está no verso (src/versos/17-p4-produtos.html).
   ===================================================================== */
(function(){
PCFG[4].produtos={
  /* antes e depois, por produto: [hoje · por que muda, proposta · o que muda] (≤ 95 caracteres cada) */
  ba:{
    "4.1":["Arquitetura desenhada sem preço: o nome não diz o que entrega e a dívida técnica fica invisível","Arquitetura para a IA sair do piloto, com a dívida técnica em reais e a ordem de pagar"],
    "4.2":["Revisa aplicações sem ligar a decisão ao custo: o orçamento segue preso em manutenção","Manter, investir, migrar ou desligar cada aplicação, com a economia em reais"],
    "4.3":["Soa como operar infraestrutura, terreno de integradores e de provedores de nuvem","Onde roda cada sistema e cada IA, decidido pelo custo total, inclusive sair da VMware"],
    "4.4":["Apoio à migração que se confunde com execução, quando o valor está em revisar sem conflito","Revisão independente do integrador: o conselho decide seguir ou adiar a virada"],
    "4.5":["Plano de continuidade no Pilar 1, escrito e quase nunca ensaiado com a diretoria","Chega como arquitetura: tempo de recuperação aceito e crise ensaiada com a diretoria"],
    "4.6":["Sistemas antigos que ninguém mais entende ficam sem dono e sem mapa","A IA lê o código antigo e mostra a rota por módulo antes do primeiro gasto"]
  },
  /* motivo de cada serviço, na dica do grafo (Decisão · Vira · Por quê); a7 é a resiliência, que chega do Pilar 1 */
  why:{
    d1:"Nome pouco claro e sem preço: vira arquitetura pronta para a IA, com a dívida técnica em reais (4.1).",
    d2:"Racionalizar aplicações libera orçamento: ganha dados de uso e economia em reais (4.2).",
    d3:"Operar infraestrutura é terreno de integradores: passa a decidir a rota e o custo total (4.3).",
    d4:"Revisar sem executar é o que o integrador não oferece: mantém a essência, com IA de apoio (4.4).",
    a7:"Resiliência é decisão de arquitetura: chega do Pilar 1 e ganha simulação de crise com a diretoria (4.5)."
  }
};
})();
