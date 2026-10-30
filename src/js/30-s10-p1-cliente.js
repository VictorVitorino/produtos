/* =====================================================================
   SLIDE 10 · Pilar 1 · IT Advisory · Cliente e mercado · dono: pilar-1
   Só registra o conteúdo em PCFG[1].cliente; quem desenha é src/js/25-pilares.js (no boot):
   · vista 1 (.quem): quem decide · a pergunta · o gatilho · a prova (fato verificado) · quem responde; → acende um decisor por vez
   · vista 2 (table.mk + .ws): o que o mercado já faz com IA (só fatos com fonte) e onde a DTS ganha
   Números só por data-fato (FATOS "verificado"); fontes completas no verso (src/versos/10-p1-cliente.html).
   ===================================================================== */
(function(){
PCFG[1].cliente={
  /* vista 1 · quem decide: papel, o que decide, pergunta (a dor), gatilho, fato que prova a dor, produtos que respondem */
  quem:[
    {r:"CEO e conselho",d:"aprovam o investimento",q:"A IA está gerando resultado ou só custo — e quem responde por isso?",
     g:"O conselho cobra o retorno da IA na aprovação do orçamento de 2027",
     f:"ceo-sem-retorno-ia-56",ft:"dos CEOs no mundo ainda não viram a IA aumentar a receita nem reduzir custos",p:["1.1","1.7"]},
    {r:"CFO",d:"paga a conta",q:"Quanto a tecnologia custa, quanto devolve e o que dá para cortar sem risco?",
     g:"Contratos de TI que renovam no automático, com reajuste e câmbio",
     f:"gasto-ia-adiado-25",ft:"do gasto planejado com IA em 2026 deve ficar para 2027, com o CFO cobrando retorno (previsão)",p:["1.5","1.6"]},
    {r:"CIO",d:"organiza a área",q:"Como organizo a TI para trabalhar com agentes de IA sem perder o controle?",
     g:"Um CIO recém-chegado ou a área de TI em reestruturação",
     f:"governanca-agentes-br-27",ft:"das empresas no Brasil dizem ter governança madura para agentes de IA",p:["1.4","1.2"]},
    {r:"Fundos de private equity",d:"compram e transformam",q:"Quem assume a tecnologia agora, e quanto ela pesa no resultado da empresa comprada?",
     g:"Compra concluída, crise ou saída do CIO no meio da transformação",
     f:"ia-ligada-resultado-um-terco",fq:"menos de",ft:"dos executivos que decidem sobre IA conseguem ligar o valor dela ao resultado financeiro",p:["1.3","1.5"]}
  ],
  /* vista 2 · o que o mercado faz: quem, o que já faz com IA (fato), o que isso muda para a DTS (leitura nossa), produtos em disputa */
  mk:[
    {f:"Deloitte",ia:"Leva o Claude, da Anthropic, a <span data-fato=\"deloitte-claude-470-mil\"></span> profissionais, com um centro para levar pilotos de IA à produção",
     l:"Escala de plataforma: disputa com o CIO o plano de tecnologia e IA",p:["1.2","1.4"]},
    {f:"PwC",ia:"Já construiu mais de <span data-fato=\"pwc-google-250-agentes\"></span> agentes de IA com o Google Cloud",
     l:"Vende a plataforma junto com a consultoria: disputa o plano e a governança da IA",p:["1.2","1.7"]},
    {f:"EY",ia:"Lançou uma plataforma própria de agentes de IA e pôs <span data-fato=\"ey-agentes-tributos-150\"></span> agentes para apoiar a área de tributos",
     l:"Usa agentes de IA nos impostos: disputa incentivos fiscais e o redesenho da área de TI",p:["1.6","1.4"]},
    {f:"KPMG",ia:"Primeira entidade internacional das quatro grandes certificada na norma internacional de gestão de IA",
     l:"Governança de IA vira credencial: disputa governança e custo de TI",p:["1.5","1.7"]},
    {f:"McKinsey · BCG",ia:"A McKinsey já liga cerca de <span data-fato=\"mckinsey-honorarios-resultado-25\"></span> dos honorários a resultados; no BCG, tecnologia e IA passam de <span data-fato=\"bcg-tech-ia-40\"></span> da receita",
     l:"Levam a estratégia de IA ao CEO, com preço alto e parte do honorário ligada ao resultado",p:["1.2"]},
    {f:"AlixPartners",ia:"Comprou a Artium, consultoria de engenharia com agentes de IA (ago/2026)",
     l:"O par mais próximo da A&amp;M compra capacidade de IA em vez de construir",p:["1.5"]}
  ],
  /* onde a DTS ganha (título, texto, produto) e a ameaça a monitorar */
  ws:{it:[
      ["Assumir o cargo","Nas empresas que auditam, as quatro grandes não podem assumir a gestão. A A&amp;M, sem os conflitos de quem audita, pode, e responde pelo resultado.","1.3"],
      ["Custo com risco compartilhado","O mercado já cobra por resultado; a DTS liga o honorário à economia validada por Finanças e vigia as renovações com IA.","1.5"],
      ["Valor, risco e custo da IA num só lugar","Só <span data-fato=\"governanca-agentes-br-27\"></span> das empresas no Brasil têm governança madura para agentes de IA; falta quem responda pelos três.","1.7"],
      ["Incentivo com leitura técnica","A IA lê projetos e código e sustenta o dossiê da Lei do Bem; a área tributária da A&amp;M responde pelo enquadramento.","1.6"]
    ],
    th:"Diagnóstico e estratégia padrão ficam baratos quando a concorrência reaproveita ferramentas e agentes: só vendem se terminarem em decisão com valor em reais."}
};
})();
