/* =====================================================================
   SLIDE 11 · Pilar 1 · IT Advisory · Produtos · dono: pilar-1
   Só registra o conteúdo em PCFG[1].produtos; quem desenha é src/js/25-pilares.js (no boot):
   · vista 1 (.pp): os 10 serviços de hoje → as 7 cartas de produto (Hoje · Produtos · Com IA), com → passo a passo
   · vista 2 (.bap): antes e depois, linha a linha (divisor no meio: Hoje à esquerda, Proposta à direita)
   Textos sem número; a lógica de cada mudança está no verso (src/versos/11-p1-produtos.html).
   ===================================================================== */
(function(){
PCFG[1].produtos={
  /* antes e depois, por produto: [hoje · por que muda, proposta · o que muda]; "4.5" = linha da resiliência, que vai para o Pilar 4 */
  ba:{
    "1.1":["O retrato de maturidade termina em relatório, e a IA já produz esse retrato mais barato","Termina numa lista curta de decisões, com valor em reais e um dono para cada uma"],
    "1.2":["Plano digital sem caso de negócio: diz o que fazer, mas não quanto custa nem quanto devolve","Plano que o conselho aprova: casos de uso priorizados, ordem de execução e retorno previsto"],
    "1.3":["Quatro ofertas de liderança disputam o mesmo comprador e a mesma rede de executivos","Um só produto: o executivo assume o cargo e responde pelo resultado, com a IA de apoio"],
    "1.4":["Desenha a área por projeto ou por torre, sem prever o trabalho dividido com agentes de IA","Estrutura, papéis e custo da TI com pessoas e agentes, e um plano de transição com dono"],
    "1.5":["Corte pontual: sem vigilância, o custo volta na renovação seguinte","Economia validada por Finanças e um radar com IA que avisa antes de o custo voltar"],
    "1.6":["Dois serviços fiscais para o mesmo comprador, vendidos em separado","Um ciclo anual: Lei do Bem, capitalização de software e dossiê técnico lido com IA"],
    "1.7":["Ninguém responde pelo valor, pelo risco e pelo custo da IA da empresa","Escritório que decide que IA escala, que IA para e quanto custa, e presta contas ao conselho"],
    "4.5":["Resiliência é decisão de arquitetura e de infraestrutura, não de estratégia","Muda para o Pilar 4 e ganha simulação de crise e plano de recuperação testado"]
  },
  /* motivo de cada serviço, na dica do grafo (Decisão · Vira · Por quê) */
  why:{
    a1:"O retrato de maturidade termina em relatório; o 1.1 termina em decisões com dono e valor em reais.",
    a2:"Pouco tangível sozinho: vira o programa de IA para conselho e diretoria, dentro do 1.3.",
    a3:"Mesmo comprador e mesma rede de executivos da liderança interina: entra no 1.3.",
    a4:"A liderança interina já está no portfólio e é o núcleo do 1.3, que mantém a essência.",
    a5:"Estratégia digital é oferta comum: vira plano de tecnologia e IA com caso de negócio (1.2).",
    a6:"Reestruturação é força da A&M: passa a desenhar a área com pessoas e agentes de IA (1.4).",
    a7:"Resiliência é decisão de arquitetura: muda para o Pilar 4, como 4.5.",
    a8:"Custo de TI é onde a A&M mais pesa: ganha um radar com IA contra a volta do custo (1.5).",
    a9:"Nicho fiscal: fica mais forte junto com os incentivos e com a área tributária da A&M (1.6).",
    a10:"A Lei do Bem pede dossiê técnico sólido: a IA lê projetos e código (1.6).",
    b7:"Alocação de perfil, com pouca diferenciação: o papel passa para a liderança embarcada (1.3)."
  }
};
})();
