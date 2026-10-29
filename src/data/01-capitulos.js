/* =====================================================================
   ESTRUTURA DA HISTÓRIA (V6) · fundação
   PARTES   : nomes das cinco partes (o data-p de cada slide é "N · Nome")
   ABAS     : abas da barra inferior (#dots): [rótulo, primeiro slide, último slide]
   CAPITULOS: divisórias que aparecem ao entrar (para a frente) no slide indicado
              eye · t (título; *texto* = grifo) · d (frase) · chips [[slide, rótulo]] · pose do mascote (SPEC 7)
              pilar: n → título e frase vêm de PILLARS; o morphing com os números vem de 25-pilares.js
              Poses: Parte 1 aceno · Partes 2 e 3 lupa · Parte 4 comemora · aberturas de pilar aponta · Parte 5 capacete
   Chaves = data-s do slide ("NN").
   ===================================================================== */
const PARTES={1:"O ponto de partida",2:"O que o mercado vive",3:"Nossa posição",4:"O novo portfólio",5:"Como fazer acontecer"};
const ABAS=[["Abertura","01","02"],["Partida","03","04"],["Mercado","05","06"],["Posição","07","07"],["Portfólio","08","09"],["Pilares","10","17"],["Execução","18","20"]];
const CAPITULOS={
  "03":{eye:"Parte 1",t:"O ponto de partida",d:"O que a DTS oferece hoje: 4 pilares e 29 serviços, e nenhum deles com IA no método.",chips:[["03","DTS hoje"],["04","Portfólio atual"]],pose:"aceno"},
  "05":{eye:"Parte 2",t:"O que o mercado vive",d:"O cliente mudou a pergunta. As consultorias mudaram a oferta.",chips:[["05","Seis forças"],["06","Benchmark 2026"]],pose:"lupa"},
  "07":{eye:"Parte 3",t:"Nossa posição",d:"Onde a A&amp;M tem direito de vencer e o que precisa mudar no portfólio.",chips:[["07","Raio-X e caminhos"]],pose:"lupa"},
  "08":{eye:"Parte 4",t:"O novo portfólio",d:"De 29 serviços a 24 produtos, com IA no método.",chips:[["08","De serviços a produtos"],["09","One-page"]],pose:"comemora"},
  "10":{eye:"Parte 4 · Pilar 1 de 4",pilar:1,pose:"aponta"},
  "12":{eye:"Parte 4 · Pilar 2 de 4",pilar:2,pose:"aponta"},
  "14":{eye:"Parte 4 · Pilar 3 de 4",pilar:3,pose:"aponta"},
  "16":{eye:"Parte 4 · Pilar 4 de 4",pilar:4,pose:"aponta"},
  "18":{eye:"Parte 5",t:"Como fazer acontecer",d:"A fábrica de produtos, os jogos de entrada e o roadmap com as decisões para o comitê.",chips:[["18","Fábrica de produtos"],["19","Jogos de entrada"],["20","Roadmap e decisões"]],pose:"capacete"}
};
