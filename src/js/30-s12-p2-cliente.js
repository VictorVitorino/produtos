/* =====================================================================
   SLIDE 12 · Pilar 2 · Technology Transformation · Cliente e mercado · dono: pilar-2
   Registra o conteúdo em PCFG[2].cliente; quem desenha a matriz, a tabela e "onde a DTS ganha" é src/js/25-pilares.js (no boot):
   · vista 1: linha do tempo regulatória e de plataforma (.s12-tl, HTML no slide; Timeline Motion no CSS deste slide)
              + matriz "quem decide" (.quem): quem decide · a pergunta · o gatilho · a prova (fato verificado) · quem responde;
              → acende um decisor por vez (passos do motor)
   · vista 2 (table.mk + .ws): o que o mercado já faz (só fatos com fonte) e onde a DTS ganha
   Números só por data-fato (FATOS "verificado"); fontes completas no verso (src/versos/12-p2-cliente.html).
   ===================================================================== */
(function(){
PCFG[2].cliente={
  /* vista 1 · quem decide: papel, o que decide, pergunta (a dor), gatilho, fato que prova a dor, produtos que respondem */
  quem:[
    {r:"CFO e diretor tributário",d:"respondem pelo imposto",q:"A primeira apuração da CBS fecha certo e o ERP aguenta dois sistemas?",
     g:"Cobrança da CBS em 2027 e saldo da apuração assistida para conferir",
     f:"pilar2-kpmg-orcamento-72",ft:"das empresas não tinham orçamento formalizado para a transição até 2033",p:["2.2","2.3"]},
    {r:"CIO e Compras",d:"escolhem a plataforma",q:"Que ERP, que motor fiscal, que agente: quem escolhe sem vender a licença?",
     g:"Fim da manutenção padrão do SAP ECC e excesso de ofertas de agentes de IA",
     f:"agentes-fornecedores-reais-130",fq:"só cerca de",ft:"dos milhares que dizem vender agentes de IA são fornecedores reais",p:["2.1","2.2"]},
    {r:"Patrocinador e conselho",d:"cobram a entrega",q:"O programa chega no prazo e no valor, e eu sei antes de ficar vermelho?",
     g:"Marcos atrasados, custo subindo e disputa com o integrador",
     f:"pilar2-erp-caso-negocio-70",fq:"mais de",ft:"das iniciativas recentes de ERP não vão cumprir todo o caso de negócio até 2027",p:["2.3","2.4"]},
    {r:"CIO e diretor de RH",d:"levam a IA ao trabalho",q:"A IA que pagamos é usada, e algum processo já roda com agente?",
     g:"Licenças de IA renovando sem medida de uso e pilotos parados",
     f:"agentic-cancelados-40",fq:"mais de",ft:"dos projetos de IA agêntica serão cancelados até o fim de 2027 (previsão)",p:["2.5","2.6"]}
  ],
  /* vista 2 · o que o mercado faz: quem, o que já faz (fato), o que isso muda para a DTS (leitura nossa), produtos em disputa */
  mk:[
    {f:"EY",ia:"Software que lê as notas fiscais e mostra os itens que mudam de alíquota com a Reforma",
     l:"Entra pelo imposto: o cálculo tem dono; o ERP, os dados e a virada, não",p:["2.2"]},
    {f:"TOTVS",ia:"Assistente de IA especialista na Reforma Tributária para os clientes do seu ERP",
     l:"O fornecedor do ERP orienta a adequação: falta quem compare as saídas sem vender licença",p:["2.1","2.2"]},
    {f:"Deloitte",ia:"Vende agentes de IA prontos, a plataforma Zora AI, por assinatura, para finanças, compras e atendimento",
     l:"Agente como produto de prateleira: disputa a automação de processos e a adoção",p:["2.6","2.5"]},
    {f:"Falconi",ia:"Diz que <span data-fato=\"pilar2-falconi-agentes-80\"></span> dos projetos de tecnologia em andamento automatizam processos com agentes de IA",
     l:"Leva agentes aos processos das empresas brasileiras: disputa a automação agêntica",p:["2.6"]},
    {f:"CI&amp;T",ia:"Plataforma própria, a CI&amp;T Flow, liga modelos e agentes de IA ao desenvolvimento de software",
     l:"Software feito com agentes baixa o preço de construir e de implantar",p:["2.6","2.3"]},
    {f:"Accenture · Capgemini",ia:"Fecharam acordos com a OpenAI para levar a plataforma de agentes de IA às empresas",
     l:"Implantação vendida junto com a plataforma do parceiro: a escolha perde neutralidade",p:["2.1","2.3"]}
  ],
  /* onde a DTS ganha (título, texto, produto) e a ameaça a monitorar */
  ws:{it:[
      ["Escolha sem conflito","Quem implanta ou licencia também recomenda. A DTS não revende software nem horas de implantação, e a escolha fica defensável no conselho.","2.1"],
      ["Primeira apuração conferida","O cálculo do imposto já tem ferramenta; falta quem responda pelo ERP, pelos dados e pelo saldo, com a área tributária da A&amp;M.","2.2"],
      ["Resgate com comando","Mais de <span data-fato=\"pilar2-erp-caso-negocio-70\"></span> das iniciativas recentes de ERP não devem cumprir todo o caso de negócio; turnaround é parte da A&amp;M.","2.4"],
      ["Agente com controle","Um agente executa o ciclo do processo com regras, aprovação humana e trilha de auditoria, e o ganho é medido.","2.6"]
    ],
    th:"Até 2027, <span data-fato=\"clawback-contratos-60\"></span> dos grandes contratos de serviços de TI terão cláusula que devolve ao cliente parte do ganho com IA, prevê o Gartner: implantação e acompanhamento por hora perdem preço."}
};
})();
