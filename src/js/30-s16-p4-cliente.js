/* =====================================================================
   SLIDE 16 · Pilar 4 · Modernization · Cliente e mercado · dono: pilar-4
   Só registra o conteúdo em PCFG[4].cliente; quem desenha é src/js/25-pilares.js (no boot):
   · vista 1 (.quem): quem decide · a pergunta · o gatilho · a prova (fato verificado) · quem responde; → acende um decisor por vez
   · vista 2 (table.mk + .ws): o que o mercado já faz com IA (só fatos com fonte; dado de fornecedor dito como tal) e onde a DTS ganha
   Números só por data-fato (FATOS "verificado"; os do pilar em src/data/06-fatos-pilar-4.js); fontes completas no verso
   (src/versos/16-p4-cliente.html).
   ===================================================================== */
(function(){
PCFG[4].cliente={
  /* vista 1 · quem decide: papel, o que decide, pergunta (a dor), gatilho, fato que prova a dor, produtos que respondem */
  quem:[
    {r:"CIO e CTO",d:"escolhem a rota",q:"Por onde começo a modernizar o legado sem parar a operação?",
     g:"Fim de suporte, legado sem dono ou IA que esbarra nos dados antigos",
     f:"pilar4-bancos-nuvem-30",ft:"de alta no gasto dos bancos no Brasil com migração para a nuvem em 2026",p:["4.6","4.1"]},
    {r:"CFO",d:"paga a conta",q:"Quanto pago em nuvem, licenças e sistemas sem uso — e o que dá para desligar?",
     g:"Renovação da VMware ou conta de nuvem que cresce sem dono",
     f:"pilar4-vmware-europa-1500",fq:"até",ft:"de aumento no preço da VMware após a compra pela Broadcom, segundo provedores europeus",p:["4.3","4.2"]},
    {r:"Riscos e operações",d:"respondem pela continuidade",q:"Se um fornecedor de TI for atacado, em quanto tempo a operação volta?",
     g:"Ataque a um terceiro de TI ou regra nova do Conselho Monetário Nacional",
     f:"pilar4-sinqia-710",ft:"em transações não autorizadas no Pix da Sinqia, com acessos de fornecedores de TI",p:["4.5"]},
    {r:"Conselho",d:"aprova a virada",q:"A migração vai entregar o prometido — e quem, sem conflito, diz se dá para virar?",
     g:"Migração de ERP, de núcleo bancário ou de dados com data marcada",
     f:"pilar2-erp-caso-negocio-70",fq:"mais de",ft:"das iniciativas recentes de ERP não devem cumprir todo o caso de negócio até 2027 (previsão)",p:["4.4","4.6"]}
  ],
  /* vista 2 · o que o mercado faz: quem, o que já faz com IA (fato), o que isso muda para a DTS (leitura nossa), produtos em disputa */
  mk:[
    {f:"AWS",ia:"Oferece sem custo os agentes de IA que migram VMware, mainframe e aplicações .NET (dado do fornecedor)",
     l:"A ferramenta de migração ficou de graça: quem a oferece ganha com a nuvem de destino",p:["4.3","4.6"]},
    {f:"Microsoft",ia:"O GitHub Copilot passou a atualizar e modernizar aplicações Java e .NET para a nuvem",
     l:"Modernizar aplicação vira recurso da ferramenta do programador: a execução perde preço",p:["4.2","4.6"]},
    {f:"McKinsey",ia:"Tem plataforma própria, o LegacyX, com equipes de agentes de IA que documentam e reescrevem código antigo",
     l:"A consultoria de estratégia chega com plataforma: disputa o raio-X do legado",p:["4.6","4.1"]},
    {f:"Accenture",ia:"Criou um grupo de negócios com a Anthropic e vai treinar cerca de <span data-fato=\"pilar4-accenture-claude-30-mil\"></span> profissionais no Claude",
     l:"Escala de fábrica com IA: vende a rota e a execução no mesmo contrato",p:["4.6","4.4"]},
    {f:"IBM",ia:"Vende um assistente de IA que traduz programas em COBOL do mainframe para Java",
     l:"O dono da plataforma também vende a saída dela: a escolha da rota tem conflito",p:["4.6"]},
    {f:"Anthropic",ia:"Diz que o Claude Code automatiza a análise de sistemas em COBOL; no dia, a ação da IBM caiu <span data-fato=\"pilar4-cobol-ibm-13\"></span>",
     l:"O fabricante do modelo de IA fala direto com o CIO: ler código antigo deixa de ser o gargalo",p:["4.6","4.1"]}
  ],
  /* onde a DTS ganha (título, texto, produto) e a ameaça a monitorar */
  ws:{it:[
      ["Rota antes do gasto","A IA lê o código e mede o risco de cada módulo; a DTS recomenda manter, reescrever ou trocar, sem revender ferramenta.","4.6"],
      ["Revisão sem conflito","Quem executa a migração não deve atestar o próprio trabalho: a DTS revisa e o conselho decide seguir ou adiar a virada.","4.4"],
      ["Custo total, não destino","Provedor de nuvem e integrador ganham com a migração; a DTS compara nuvem, data center e VMware pelo custo total.","4.3"],
      ["Crise ensaiada","Os ataques de 2025 à cadeia do Pix entraram por acessos de terceiros de TI; a A&amp;M já atua em crises e leva o ensaio à TI.","4.5"]
    ],
    th:"Sem plataforma própria, a DTS não disputa execução: se o cliente comprar a rota e a migração no mesmo contrato, decide quem vende o destino."}
};
})();
