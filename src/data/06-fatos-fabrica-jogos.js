/* =====================================================================
   FATOS E FONTES VERIFICADOS · dono: fabrica-jogos (slides 18 e 19) · 29/10/2026
   Carrega depois de 05-fontes.js (ordem alfabética de src/data) e antes de 30-jogos.js.
   - Fontes novas, sem nome de pessoa no campo org (SPEC §0: cita-se a organização ou a publicação):
     fj-hbr-premortem · fj-nist-800-84 · fj-personnel-psych-2011 · fj-innovation-games-2006 (revisão de 30/10/2026).
     As fontes antigas equivalentes (hbr-premortem-2007, nist-sp-800-84, sitzmann-2011) continuam no registro,
     mas trazem nomes de autores no org; os fatos abaixo passam a apontar para as fontes novas.
   - Fatos de método do slide 19 conferidos na fonte nesta data (antes "a verificar"): o mesmo id, agora "verificado",
     com o que foi visto na obs. O número de 30% atribuído ao artigo do pré-mortem NÃO foi visto (texto só para
     assinantes; a leitura do número é contestada): premortem-retrospectiva-30 continua "a verificar" e não é usado.
   ===================================================================== */
Object.assign(FONTES,{
  "fj-hbr-premortem":{org:"Harvard Business Review",titulo:"Performing a Project Premortem",data:"09/2007",
    url:"https://hbr.org/2007/09/performing-a-project-premortem",tipo:"primária"},
  "fj-nist-800-84":{org:"Instituto Nacional de Padrões e Tecnologia dos Estados Unidos",titulo:"Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities (SP 800-84)",data:"09/2006",
    url:"https://csrc.nist.gov/pubs/sp/800/84/final",tipo:"oficial"},
  "fj-personnel-psych-2011":{org:"Personnel Psychology (revista científica)",titulo:"A meta-analytic examination of the instructional effectiveness of computer-based simulation games",data:"06/2011",
    url:"https://onlinelibrary.wiley.com/doi/10.1111/j.1744-6570.2011.01190.x",tipo:"primária"},
  /* revisão rev-execucao (30/10/2026): o método da Mesa do Conselho é a compra com orçamento limitado (Buy a Feature), não o jogo de guerra */
  "fj-innovation-games-2006":{org:"Addison-Wesley (livro Innovation Games)",titulo:"Innovation Games: Creating Breakthrough Products Through Collaborative Play",data:"2006",
    url:"https://www.informit.com/store/innovation-games-creating-breakthrough-products-through-9780321437297",tipo:"primária"}
});
Object.assign(FATOS,{
  "premortem-metodo":{txt:"No pré-mortem, o time imagina que o projeto já fracassou e lista os motivos antes de começar",num:"",
    fontes:["fj-hbr-premortem"],status:"verificado",tema:"metodos-ludicos",uso:["s19"],
    nota:"Harvard Business Review (set/2007): quem tem reservas fala logo no início, e o plano é corrigido antes de virar autópsia.",
    obs:"Verificado por fabrica-jogos em 29/10/2026: resumo do artigo na página da Harvard Business Review (edição de setembro de 2007): “team members assume that the project they are planning has just failed — as so many do — and then generate plausible reasons for its demise. Those with reservations may speak freely at the outset, so that the project can be improved rather than autopsied.” O texto completo é só para assinantes; o número de 30% atribuído ao artigo não foi visto e não é usado."},
  "exercicio-mesa-nist":{txt:"Exercício de mesa é uma discussão guiada por um cenário, em que quem tem papel no plano de TI testa se o plano funciona",num:"",
    fontes:["fj-nist-800-84"],status:"verificado",tema:"metodos-ludicos",uso:["s19","p4.5"],
    nota:"Guia SP 800-84 do instituto de padrões dos Estados Unidos (set/2006): um facilitador apresenta o cenário e faz perguntas; o grupo discute papéis, responsabilidades, coordenação e decisões. É um meio de baixo custo para validar planos de continuidade e de resposta a incidentes.",
    obs:"Verificado por fabrica-jogos em 29/10/2026 no PDF do guia (publicado em 21/09/2006): “Tabletop exercises are discussion-based exercises where personnel meet in a classroom setting or in breakout groups to discuss their roles during an emergency … A facilitator presents a scenario and asks the exercise participants questions related to the scenario” e “Tabletop exercises are cost-effective tools to validate the content of IT plans, such as contingency plans and incident response plans”."},
  "jogos-de-guerra-executivos":{txt:"Jogos de guerra ajudam executivos a testar decisões contra a reação de concorrentes quando a incerteza é moderada",num:"",
    fontes:["mckinsey-war-games-2011"],status:"verificado",tema:"metodos-ludicos",uso:["s19"],
    nota:"McKinsey Quarterly (mar/2011): o jogo vale mais quando há poucas escolhas a testar e poucas reações possíveis dos concorrentes; o desenho e a escolha de quem joga decidem o resultado.",
    obs:"Verificado por fabrica-jogos em 29/10/2026 na página da McKinsey (01/03/2011): “They can be a powerful business tool — but only if you get the design right.”; “The sweet spot for games is some moderate level of uncertainty.”; “most valuable when a company has very few but discrete choices to test, as well as a similarly small set of possible responses by competitors”; “The selection of players is also critical.”"},
  "jogos-simulacao-aprendizado":{txt:"Em treinamentos, jogos de simulação por computador elevaram a autoconfiança em 20% e o conhecimento prático em 14% frente aos grupos de comparação",num:"20%",
    fontes:["fj-personnel-psych-2011"],status:"verificado",tema:"metodos-ludicos",uso:["s19"],
    nota:"Meta-análise publicada na Personnel Psychology (2011) sobre jogos de simulação por computador em treinamento: o efeito foi maior quando o jogo era ativo e complementava outros métodos, em vez de ensinar sozinho. É evidência de aprendizado, não de vendas.",
    obs:"Verificado por fabrica-jogos em 29/10/2026 no resumo da Wiley (Personnel Psychology, v. 64, p. 489–528): “posttraining self-efficacy was 20% higher, declarative knowledge was 11% higher, procedural knowledge was 14% higher, and retention was 9% higher for trainees taught with simulation games, relative to a comparison group” e “the simulation game was a supplement to other instructional methods rather than stand-alone instruction”."},
  "jogos-simulacao-pratica-14":{txt:"Em treinamentos, jogos de simulação por computador elevaram em 14% o conhecimento prático frente aos grupos de comparação",num:"14%",
    fontes:["fj-personnel-psych-2011"],status:"verificado",tema:"metodos-ludicos",uso:["s19"],
    nota:"Mesma meta-análise do dado de 20% (Personnel Psychology, 2011): conhecimento prático (procedural knowledge).",
    obs:"Verificado por fabrica-jogos em 29/10/2026 no resumo da Wiley: “procedural knowledge was 14% higher … relative to a comparison group”."},
  "dia-1-simulacoes":{txt:"Na preparação do Dia 1 de uma fusão, as equipes fazem sessões de prontidão e simulações nas semanas antes do fechamento",num:"",
    fontes:["ey-integracao-nove-passos"],status:"verificado",tema:"metodos-ludicos",uso:["s19","p3.3"],
    nota:"Guia da EY sobre programas de integração em fusões e aquisições.",
    obs:"Verificado por fabrica-jogos em 29/10/2026 na página da EY (Nine steps to setting up an M&A integration program): “Day One readiness sessions and simulations are performed in the weeks leading up to the close of the transaction.”"},
  "dia-1-pontos-de-prontidao":{txt:"A Deloitte recomenda “pontos de prontidão” que testam sob pressão o plano do Dia 1 antes do fechamento",num:"",
    fontes:["deloitte-day-one"],status:"verificado",tema:"metodos-ludicos",uso:["s19","p3.2"],
    nota:"Recomendação da própria Deloitte. No caso citado no documento, o teste revelou o plano de clonar sistemas sem limpar dados críticos de clientes, com risco regulatório.",
    obs:"Verificado por fabrica-jogos em 29/10/2026 no PDF da Deloitte (Day One readiness; o endereço registrado redireciona para a versão em deloitte.com de 2024): “readiness certifications or Ready Checkpoints (RCPs)” que testam sob pressão (“pressure-testing”) atividades operacionais antes do fechamento; “Through pressure testing in RCPs, the corporation uncovered plans to not scrub critical customer data”."},
  "compra-orcamento-limitado-metodo":{txt:"No jogo de compra com orçamento limitado (Buy a Feature), cada participante recebe uma parte do dinheiro para comprar itens com preço; ninguém compra tudo sozinho, e o grupo junta recursos e negocia o que fica",num:"",
    fontes:["fj-innovation-games-2006"],status:"verificado",tema:"metodos-ludicos",uso:["s19"],
    nota:"Jogo descrito no livro Innovation Games (Addison-Wesley, 2006), na parte dos jogos de priorização. É a mecânica da Mesa do Conselho: o orçamento não paga todas as apostas, e a negociação revela o que a diretoria valoriza. É método de priorização, não evidência de resultado.",
    obs:"Verificado por rev-execucao em 30/10/2026 por busca na web (a leitura direta das páginas está bloqueada nesta sessão): registro de biblioteca (Universidade Técnica de Munique) do livro, Addison-Wesley, 2006, com “Buy a Feature” na Parte 2 (p. 76); verbete “Innovation game” da Wikipedia: “participants may also pool resources to buy features too expensive to be purchased with individual funds”; modelo da Lucidspark: “players can’t buy whatever features they want unilaterally, the players must discuss and haggle over what they want to buy”; página da InformIT (ISBN 9780321437297). Sem número: só método."}
});
