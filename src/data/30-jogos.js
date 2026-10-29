/* =====================================================================
   JOGOS DE ENTRADA (V6) · conteúdo-base · SPEC V6 §2 (slide 19) e §10.3
   Quatro experiências lúdicas, uma por pilar, que o cliente joga antes de comprar. Cada jogo põe na mesa
   o problema do próprio cliente (o orçamento, o programa, a transação, o sistema crítico dele), termina
   numa decisão e abre a porta para produtos do pilar.
   Quem lê: o slide 19 (cartas que viram: frente = nome, pilar e promessa; verso da carta = passos, quem
   joga, o que leva e produtos), a caixa "Jogo de entrada" das fichas (nome + promessa, via `jogo` de cada
   produto) e o verso do slide 19 (método com fonte, ponte para cada produto, o que validar).

   JOGOS[id] · obrigatórios (SPEC 10.3 e tarefa):
     nome      nome do jogo, numa linha
     pilar     1 a 4
     promessa  uma frase: o que o cliente ganha ao jogar (até 100 caracteres)
     passos    exatamente três passos curtos (até 66 cada)
     quem      quem joga (até 90)
     leva      o que o cliente leva da mesa, concreto (até 120)
     produtos  códigos dos produtos que o jogo abre, na ordem do roteiro (SPEC §2, slide 19)
     fontes    ids de FONTES (05-fontes.js) com o método do jogo
     regra     a regra que faz o jogo funcionar (até 95)
     material  o que está na mesa (até 120)
   Opcionais (para a carta e para o verso do slide 19):
     id        igual à chave
     tipo      categoria da carta, em palavras
     duracao   duração em palavras, nunca em número ("uma manhã", "meio período")
     pergunta  a pergunta do cliente que o jogo responde (até 80)
     quando    o momento certo de oferecer o jogo (até 100)
     ia        o papel da IA no jogo (até 125)
     ponte     {código: como o resultado do jogo leva àquele produto} (até 95 cada); percorrer por `produtos`
     metodo    de onde vem o método, em palavras, com a organização e o ano da fonte (até 230)
     fatos     ids de FATOS que dão peso ao jogo (método e "por que agora"); mostrar só os "verificado"
     validar   o que observar nos primeiros jogos com clientes (até 140)

   Regras de texto: português formal e frases curtas; nenhum número além dos estruturais (pilar, códigos de
   produto, "Dia 1", o ano 2027 do cenário e o ano das fontes em `metodo`); duração só em palavras; sem siglas
   fora da lista da SPEC §5; nenhuma pessoa da A&M (SPEC §0) e, de outras organizações, cita-se a
   organização, não o autor. Os jogos são proposta da DTS, a validar com clientes; prazo e preço dos
   produtos que eles abrem são calibrados na Fábrica (slide 18).
   Tipografia (preferência do usuário: nenhuma palavra sozinha na última linha): no fim do arquivo, cada
   texto ganha um espaço não separável entre as duas últimas palavras, e nome, tipo e duração não quebram.
   Ids, códigos de produto e listas de fontes e fatos não mudam.
   ===================================================================== */
const JOGOS={
  "mesa-do-conselho":{
    id:"mesa-do-conselho",
    nome:"Mesa do Conselho",
    pilar:1,
    tipo:"Jogo de decisão",
    duracao:"uma manhã",
    pergunta:"Onde o próximo real de tecnologia devolve mais, e quem responde por ele?",
    promessa:"Orçamento curto, apostas demais: a diretoria decide o que fica e quem responde pelo retorno.",
    passos:[
      "Cartas na mesa: os investimentos de TI e IA da própria empresa",
      "O orçamento não paga todas: a diretoria negocia o que fica",
      "Cada carta escolhida ganha dono e medida de retorno"
    ],
    regra:"Carta sem dono não sai da mesa: quem defende a aposta assina o retorno que promete.",
    quem:"CEO, CFO, CIO e os líderes de negócio que disputam o mesmo orçamento",
    material:"Cartas de investimento, fichas de orçamento, cartas-surpresa (corte de verba, reajuste em dólar) e o quadro de donos",
    leva:"A carteira de apostas priorizada, com dono e medida de retorno, e a lista do que ninguém soube medir",
    produtos:["1.1","1.5","1.7"],
    ponte:{
      "1.1":"O que ninguém soube medir na mesa vira o escopo do diagnóstico de valor",
      "1.5":"O dinheiro que faltou na mesa se busca nos contratos e licenças que não se pagam",
      "1.7":"As apostas de IA sem dono pedem quem decida o que escala, o que para e quanto custa"
    },
    quando:"Antes de fechar o orçamento do ano ou quando o conselho cobra o retorno da IA",
    ia:"A IA prepara as cartas com o orçamento e os contratos que o cliente compartilha e resume a mesa em decisões com dono.",
    metodo:"Jogo de decisão para executivos, como os jogos de guerra de negócios (McKinsey Quarterly, 2011). Jogos de simulação ensinam mais quando fazem parte de um programa maior (Personnel Psychology, 2011): aqui, o produto.",
    fontes:["mckinsey-war-games-2011","sitzmann-2011"],
    fatos:["ceo-sem-retorno-ia-56","ia-ligada-resultado-um-terco","jogos-de-guerra-executivos","jogos-simulacao-aprendizado"],
    validar:"Se a diretoria aceita levar os próprios números para a mesa e se a lista do que ninguém soube medir vira pedido de diagnóstico."
  },
  "pre-mortem-2027":{
    id:"pre-mortem-2027",
    nome:"Pré-mortem 2027",
    pilar:2,
    tipo:"Jogo de antecipação",
    duracao:"uma manhã",
    pergunta:"Se o programa fracassar em 2027, por que terá sido?",
    promessa:"Imaginar hoje o fracasso de 2027, enquanto ainda dá tempo de evitá-lo.",
    passos:[
      "A manchete chega: é o fim de 2027 e o programa fracassou",
      "Cada um escreve as causas em silêncio; depois, a mesa lê uma a uma",
      "As causas mais fortes viram riscos com dono e ação no plano"
    ],
    regra:"O fracasso é certo: ninguém defende o plano, só explica por que ele falhou.",
    quem:"Patrocinador, time do programa, donos de processo, área tributária e integrador",
    material:"A manchete fictícia do fracasso, datada do fim de 2027, cartões de causa, quadro de riscos e cronômetro",
    leva:"A lista das causas prováveis de fracasso, cada uma com sinal de alerta, dono e ação no plano",
    produtos:["2.2","2.3","2.4"],
    ponte:{
      "2.2":"Causas ligadas ao ERP e à Reforma Tributária viram o diagnóstico de prontidão",
      "2.3":"Os sinais de alerta do jogo viram o painel do escritório de transformação",
      "2.4":"Se o jogo mostra que o fracasso já começou, o resgate entra antes de a crise chegar ao conselho"
    },
    quando:"No início de um programa de ERP ou da Reforma Tributária, ou com o semáforo ainda verde",
    ia:"A IA também joga: lê o plano e as atas do programa e traz as causas que ninguém escreveu.",
    metodo:"Pré-mortem, método publicado na Harvard Business Review (2007): dar o fracasso como certo ajuda o time a ver riscos que o otimismo esconde e dá voz a quem discorda.",
    fontes:["hbr-premortem-2007"],
    fatos:["premortem-metodo","premortem-retrospectiva-30","cbs-plena-2027","sap-ecc-manutencao-2027","erp-business-case-70"],
    validar:"Se surgem causas que não estavam no mapa de riscos do programa e se elas viram ações com dono logo depois da sessão."
  },
  "jogo-do-dia-1":{
    id:"jogo-do-dia-1",
    nome:"Jogo do Dia 1",
    pilar:3,
    tipo:"Simulação de virada",
    duracao:"meio período",
    pergunta:"No primeiro dia sob o novo dono, o que para e quem decide?",
    promessa:"O primeiro dia sob o novo dono, ensaiado antes: o que para, quem decide e quanto custa.",
    passos:[
      "O relógio marca o Dia 1: a empresa acaba de mudar de dono",
      "Caem as cartas: e-mail, folha de pagamento, acessos, notas fiscais",
      "Cada carta exige decisão: quem resolve, como e a que custo"
    ],
    regra:"O relógio não para: carta sem decisão na rodada vira falha do Dia 1 no placar.",
    quem:"Comprador ou fundo, vendedor, CFO, CIO, RH, jurídico e donos dos sistemas críticos",
    material:"O relógio do Dia 1, cartas de incidente, o mapa dos sistemas das duas empresas e o placar de falhas",
    leva:"A lista do que para no Dia 1, com dono e custo, e o que entra no contrato de serviços de transição e no preço",
    produtos:["3.1","3.2","3.3"],
    ponte:{
      "3.1":"O que só aparece no jogo vira pergunta da diligência, a tempo de mudar o preço",
      "3.2":"Cada sistema sem destino ganha destino, custo e dono no desenho do Dia 1",
      "3.3":"O ensaio vira o roteiro da virada que o escritório de integração comanda"
    },
    quando:"Na diligência, para testar a tese e o preço, ou entre a assinatura e o fechamento",
    ia:"A IA lê os contratos e o inventário do alvo e transforma o que acha em cartas, como uma cláusula de mudança de controle.",
    metodo:"Ensaio do Dia 1: testar sob pressão o plano da virada antes do fechamento, como recomendam guias de integração da EY e da Deloitte, com a mecânica dos jogos de guerra de negócios (McKinsey Quarterly, 2011).",
    fontes:["deloitte-day-one","ey-integracao-nove-passos","mckinsey-war-games-2011"],
    fatos:["dia-1-simulacoes","dia-1-pontos-de-prontidao","jogos-de-guerra-executivos","sinergias-dependem-ti-50-60"],
    validar:"Se as cartas refletem os sistemas e os contratos reais do alvo e se as lacunas chegam ao contrato de transição e ao preço."
  },
  "exercicio-de-crise":{
    id:"exercicio-de-crise",
    nome:"Exercício de Crise",
    pilar:4,
    tipo:"Exercício de mesa",
    duracao:"uma manhã",
    pergunta:"Se um sistema crítico parar hoje, quem decide e quando a operação volta?",
    promessa:"Ensaiar a crise na mesa para não improvisar quando ela chegar.",
    passos:[
      "O cenário abre: um ataque ou uma queda para um sistema crítico",
      "A cada rodada, uma notícia nova piora o quadro e pede decisão",
      "No fim, o grupo vê o que travou e quando a operação voltaria"
    ],
    regra:"Só vale o que está escrito: o que não está no plano nem no contrato não existe na crise.",
    quem:"CEO, CIO e os diretores de segurança, riscos, operações, jurídico e comunicação",
    material:"O cenário em capítulos, cartas de notícia que pioram o quadro, o plano de continuidade impresso e um cronômetro",
    leva:"O mapa de quem decide o quê na crise, quanto tempo cada serviço pode parar e as lacunas do plano, com dono",
    produtos:["4.5","4.6","4.3"],
    ponte:{
      "4.5":"As lacunas de decisão e de recuperação viram o plano de resiliência e os próximos exercícios",
      "4.6":"Se a volta depende de um sistema antigo que poucos entendem, o raio-X do legado entra",
      "4.3":"Onde cada sistema roda e onde se recupera passa a ser decidido pelo custo total e pelo risco"
    },
    quando:"Depois de um incidente no setor, antes de uma migração grande ou com o plano nunca testado",
    ia:"A IA monta o cenário e as surpresas a partir das dependências reais e registra cada decisão tomada.",
    metodo:"Exercício de mesa: discussão guiada por um cenário, em que quem tem papel no plano testa se ele funciona, como descreve o guia de exercícios do instituto de padrões dos Estados Unidos (2006).",
    fontes:["nist-sp-800-84"],
    fatos:["exercicio-mesa-nist","ataque-cm-800-mi","ataque-sinqia-710-mi","cmn-5274-ciber-nuvem"],
    validar:"Se a diretoria aceita jogar com o próprio plano e se o tempo de parada aceito vira exigência a fornecedores e investimento."
  }
};
/* sem palavra sozinha na última linha: espaço não separável antes da última palavra; rótulos curtos não quebram */
(function(){const NB="\u00a0",cola=s=>s.replace(/ (\S+)$/,NB+"$1"),fixo=s=>s.replace(/ /g,NB);
  for(const g of Object.values(JOGOS)){
    ["nome","tipo","duracao"].forEach(k=>{if(typeof g[k]==="string")g[k]=fixo(g[k])});
    ["pergunta","promessa","regra","quem","material","leva","quando","ia","metodo","validar"].forEach(k=>{if(typeof g[k]==="string")g[k]=cola(g[k])});
    if(Array.isArray(g.passos))g.passos=g.passos.map(s=>typeof s==="string"?cola(s):s);
    if(g.ponte)Object.keys(g.ponte).forEach(c=>{if(typeof g.ponte[c]==="string")g.ponte[c]=cola(g.ponte[c])});
  }})();
