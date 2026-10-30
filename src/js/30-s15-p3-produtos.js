/* =====================================================================
   SLIDE 15 · Pilar 3 · Tech M&A · Produtos · dono: pilar-3
   Só registra o conteúdo em PCFG[3].produtos; quem desenha é src/js/25-pilares.js (no boot), como no slide 11:
   · vista 1 (.pp): os 8 serviços de hoje → as 5 cartas de produto (Hoje · Produtos · Com IA), com → passo a passo
   · vista 2 (.bap): antes e depois, linha a linha (divisor no meio: Hoje à esquerda, Proposta à direita)
   Textos sem número; os motivos substituem os textos antigos de OLD[].w (com siglas) nas dicas e no antes e depois.
   A lógica de cada mudança está no verso (src/versos/15-p3-produtos.html).
   ===================================================================== */
(function(){
PCFG[3].produtos={
  /* antes e depois, por produto: [hoje · por que muda, proposta · o que muda] (≤ 95 caracteres cada) */
  ba:{
    "3.1":["Diligência de compra e de venda vendidas em separado, com o mesmo método e sem IA no trabalho","Uma só diligência, de compra ou de venda: a IA lê data room e código e cada risco ganha custo"],
    "3.2":["Planejar a integração e desenhar a separação são o mesmo desenho, vendido duas vezes","Um desenho para juntar ou separar: destino, custo e dono de cada sistema antes da assinatura"],
    "3.3":["Escritório de integração e de separação: a mesma disciplina, com dois nomes e dois contratos","Um escritório comanda o Dia 1 e a saída da transição, com parte do honorário ligada aos marcos"],
    "3.4":["A economia de tecnologia prometida na transação fica na planilha, sem dono nem meta","Cada alavanca de tecnologia com dono, meta e data, medida no resultado até a venda"],
    "3.5":["O Playbook é método interno: pouco vendável sozinho e parado entre uma transação e outra","Assinatura para fundos: nota de saúde de tecnologia de cada investida, movida pelo Playbook"]
  },
  /* motivo de cada serviço, na dica do grafo (Decisão · Vira · Por quê) */
  why:{
    c1:"Pouco vendável sozinho: vira o método que move o 3.5 e alimenta os outros produtos do pilar.",
    c2:"Concorrentes já fazem diligência com IA (a PwC com a ToltIQ); sem IA, a nossa fica mais lenta e mais cara.",
    c3:"Mesmo método do desenho de separação: um só desenho serve às duas direções (3.2).",
    c4:"Integração e separação pedem a mesma disciplina de escritório, em sentidos opostos (3.3).",
    c5:"Vira a edição para quem vende do mesmo produto de diligência (3.1).",
    c6:"Separações nascem de reestruturações, terreno da A&amp;M; junta-se ao desenho de integração (3.2).",
    c7:"Junta-se ao escritório de integração: uma só governança para o Dia 1 e a saída da transição (3.3).",
    c8:"Mantém a essência e vira plano de captura com dono, meta e data, acompanhado até a venda (3.4)."
  }
};
})();
