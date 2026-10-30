/* =====================================================================
   ESTRUTURA DA HISTÓRIA (V6) · PARTES e ABAS: fundação · CAPITULOS: dono "capas"
   PARTES   : nomes das cinco partes (o data-p de cada slide é "N · Nome")
   ABAS     : abas da barra inferior (#dots): [rótulo, primeiro slide, último slide]
   CAPITULOS: divisórias que aparecem ao entrar (para a frente) no slide indicado (SPEC §2.1, CONTRACT §14)
              eye · t (título; *texto* = grifo) · d (subtítulo de UMA linha) · chips [[slide, rótulo]] · dica (pé direito)
              pilar: n → o título vem de PILLARS (nome do pilar); a frase é a d daqui
              O efeito de cada capa mora em src/js/28-capas.js (CHAPX[nn]). Sem mascote nas capas (pedido do usuário:
              "no máximo pequeno e só se ajudar"; o aro laranja saiu), por isso não há pose.
              Só contagens estruturais do portfólio (4 pilares · 29 serviços · 24 produtos · 10 → 7 …).
   Chaves = data-s do slide ("NN").
   ===================================================================== */
const PARTES={1:"O ponto de partida",2:"O que o mercado vive",3:"Nossa posição",4:"O novo portfólio",5:"Como fazer acontecer"};
const ABAS=[["Abertura","01","02"],["Partida","03","04"],["Mercado","05","06"],["Posição","07","07"],["Portfólio","08","09"],["Pilares","10","17"],["Execução","18","20"]];
const CAPITULOS={
  "03":{eye:"Parte 1",t:"O ponto de partida",d:"4 pilares e 29 serviços, e nenhum descreve IA no método",chips:[["03","DTS hoje"],["04","Portfólio atual"]],dica:"Passe o cursor num pilar"},
  "05":{eye:"Parte 2",t:"O que o mercado vive",d:"O cliente mudou a pergunta; as consultorias, a oferta",chips:[["05","Seis forças"],["06","Benchmark 2026"]],dica:"Passe o cursor numa força"},
  "07":{eye:"Parte 3",t:"Nossa posição",d:"Uma decisão para cada um dos 29 serviços",chips:[["07","Raio-X e três caminhos"]],dica:"Passe o cursor num serviço"},
  "08":{eye:"Parte 4",t:"O novo portfólio",d:"De 29 serviços a 24 produtos, todos com IA",chips:[["08","De serviços a produtos"],["09","One-page"]],dica:"Passe o cursor nas cartas"},
  "10":{eye:"Parte 4 · Pilar 1 de 4",pilar:1,d:"Decidir: quando a direção ou o custo da TI estão em xeque",chips:[["10","Cliente e mercado"],["11","Produtos"]],dica:"Clique num produto para abrir a ficha"},
  "12":{eye:"Parte 4 · Pilar 2 de 4",pilar:2,d:"Executar: quando um programa crítico não pode falhar",chips:[["12","Cliente e mercado"],["13","Produtos"]],dica:"Clique num produto para abrir a ficha"},
  "14":{eye:"Parte 4 · Pilar 3 de 4",pilar:3,d:"Transacionar: compra, venda ou separação de empresas",chips:[["14","Cliente e mercado"],["15","Produtos"]],dica:"Clique num produto para abrir a ficha"},
  "16":{eye:"Parte 4 · Pilar 4 de 4",pilar:4,d:"Modernizar: legado e infraestrutura sem parar a operação",chips:[["16","Cliente e mercado"],["17","Produtos"]],dica:"Clique num produto para abrir a ficha"},
  "18":{eye:"Parte 5",t:"Como fazer acontecer",d:"Da fábrica de produtos à decisão do comitê",chips:[["18","Fábrica de produtos"],["19","Jogos de entrada"],["20","Roadmap e decisões"]],dica:"Clique numa etapa para abrir"}
};
