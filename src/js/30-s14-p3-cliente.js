/* =====================================================================
   SLIDE 14 · Pilar 3 · Tech M&A · Cliente e mercado · dono: pilar-3
   Só registra o conteúdo em PCFG[3].cliente; quem desenha é src/js/25-pilares.js (no boot), como nos slides 10 e 12:
   · vista 1 (.quem): quem decide · a pergunta · o gatilho · a prova (fato verificado) · quem responde; → acende um decisor por vez
   · vista 2 (table.mk + .ws): o que o mercado já faz com IA em transações (só fatos com fonte) e onde a DTS ganha
   Números só por data-fato (FATOS "verificado"; os do pilar estão em src/data/06-fatos-pilar-3.js);
   fontes completas no verso (src/versos/14-p3-cliente.html). Casos públicos (MBRF, Raízen, Braskem) são exemplos de
   mercado, não clientes da A&M.
   ===================================================================== */
(function(){
PCFG[3].cliente={
  /* vista 1 · quem decide: papel, o que decide, pergunta (a dor), gatilho, fato que prova a dor, produtos que respondem */
  quem:[
    {r:"Fundos de private equity",d:"compram e vendem empresas",q:"Que risco de tecnologia muda o preço, e o que eu herdo depois de assinar?",
     g:"Exclusividade assinada e data room aberto, com prazo curto para a oferta final",
     f:"pilar3-pe-vc-metade-2025",ft:"das fusões e aquisições no Brasil em 2025 tiveram fundos de private equity ou de venture capital",p:["3.1","3.5"]},
    {r:"Conselho do comprador",d:"aprova o preço e o risco",q:"O negócio ficou maior e mais caro: o que a tecnologia pode esconder até o fechamento?",
     g:"Transação grande, com conselho, credores e órgão de concorrência olhando cada número",
     f:"pilar3-ma-1s26-menos-negocios",ft:"no número de fusões e aquisições no 1º semestre de 2026, com valor maior: negócios maiores e mais escrutinados",p:["3.1","3.2"]},
    {r:"CEO do comprador",d:"integra e entrega a economia",q:"Como juntamos as duas empresas sem parar a operação e entregamos a economia prometida?",
     g:"Fusão aprovada, com o Dia 1 marcado e a economia já anunciada ao mercado",
     f:"pilar3-mbrf-sinergias-805",ft:"por ano de sinergias mapeadas na fusão de Marfrig e BRF; parte vem de unificar estruturas e sistemas",p:["3.3","3.4"]},
    {r:"Grupo vendedor",d:"separa um negócio para vender",q:"Como separamos a TI sem parar a operação nem ficar preso ao antigo dono na transição?",
     g:"Cisão ou venda de controle dentro de uma reestruturação, como Raízen e Braskem",
     f:"pilar3-raizen-duas-empresas",ft:"empresas nascem da divisão da Raízen no plano de reestruturação homologado em 2026, até o fim de 2027",p:["3.2","3.3"]}
  ],
  /* vista 2 · o que o mercado faz: quem, o que já faz com IA (fato), o que isso muda para a DTS (leitura nossa), produtos em disputa */
  mk:[
    {f:"PwC",ia:"Firmou relação estratégica com a ToltIQ, plataforma de IA para diligência em transações (jun/2026)",
     l:"Diligência com IA vira ferramenta de prateleira: o preço da diligência avulsa cai",p:["3.1"]},
    {f:"Bain",ia:"Recria com IA partes do software do alvo, durante a diligência, para testar se o produto é fácil de copiar",
     l:"A diligência passa a medir se a IA ameaça o negócio comprado, não só a dívida técnica",p:["3.1","3.5"]},
    {f:"Deloitte",ia:"Vende agentes de IA por assinatura (Zora AI) e, em transações, preparação do Dia 1, serviços de transição e separação",
     l:"Ciclo completo com plataforma própria: disputa o desenho e o comando da separação",p:["3.2","3.3"]},
    {f:"DiligenceSquared",ia:"Faz diligência comercial para fundos com agentes de voz que entrevistam os clientes da empresa-alvo (mar/2026)",
     l:"A diligência comercial já sai por agentes; a de tecnologia tende a seguir o mesmo caminho",p:["3.1"]},
    {f:"Ode with Anthropic",ia:"Empresa de IA criada pela Anthropic com Blackstone, Hellman &amp; Friedman e Goldman Sachs; os primeiros clientes incluem investidas desses fundos",
     l:"Os fundos levam a IA para dentro das investidas: disputa o acompanhamento do portfólio",p:["3.5","3.4"]}
  ],
  /* onde a DTS ganha (título, texto, produto) e a ameaça a monitorar */
  ws:{it:[
      ["Diligência com IA da A&amp;M global","Se liberado no Brasil, o A&amp;M Assist, agente de IA da A&amp;M global para diligência, entra no método da DTS: baixa o custo e libera o time para pôr preço no risco.","3.1"],
      ["Separação dentro da reestruturação","Cisões e vendas de controle nascem de reestruturações, como Raízen e Braskem: terreno conhecido da A&amp;M, em que a TI decide se o Dia 1 acontece.","3.2"],
      ["Do Dia 1 à economia, a mesma equipe","Quem diagnosticou comanda o Dia 1 e a saída da transição e responde pela economia, com parte do honorário ligada aos marcos.","3.3"],
      ["Leitura contínua do portfólio","A pesquisa não achou no Brasil quem acompanhe a tecnologia de todas as investidas de um fundo: o Playbook vira assinatura.","3.5"]
    ],
    th:"A diligência comercial já sai por agentes e os fundos criaram a própria empresa de IA: quem vender só diligência vai disputar preço."}
};
})();
