/* =====================================================================
   SLIDE 13 · Pilar 2 · Technology Transformation · Produtos · dono: pilar-2
   Registra o conteúdo em PCFG[2].produtos; quem desenha é src/js/25-pilares.js (no boot):
   · vista 1 (.pp): os 7 serviços de hoje → as 6 cartas de produto (Hoje · Produtos · Com IA), com → passo a passo
   · vista 2 (.bap): antes e depois, linha a linha (divisor no meio: Hoje à esquerda, Proposta à direita)
   Acréscimos deste slide, no BOOT (depois do motor):
   · o serviço oficial "TMO" aparece por extenso, "Transformation Management Office" (SPEC §5: sigla fora da lista);
   · a carta do 2.6 ganha a etiqueta do módulo "Automação agêntica de processos" (decisão do usuário em 30/10/2026:
     a automação agêntica entra como módulo do 2.6, não como 25º produto).
   Textos sem número; a lógica de cada mudança está no verso (src/versos/13-p2-produtos.html).
   ===================================================================== */
(function(){
PCFG[2].produtos={
  /* antes e depois, por produto: [hoje · por que muda, proposta · o que muda]; "1.3" = linha do IT Business Partner, que sai do pilar */
  ba:{
    "2.1":["Seleção conduzida à mão: concorrência longa e decisão difícil de auditar","Requisitos e propostas lidos com IA, decisão defensável e contrato protegido em preço e saída"],
    "2.2":["Prontidão do ERP vendida como análise de lacunas, sem dono para a virada","Virada da CBS estabilizada, primeira apuração conferida e a decisão do ERP tomada"],
    "2.3":["Dois serviços para o mesmo comprador: o escritório que reporta e o modelo de implantação","Um só escritório que lê o andamento com IA, avisa antes do atraso e acompanha o valor"],
    "2.4":["Resgate de projetos em crise, vendido caso a caso","Diagnóstico forense curto, decisão do conselho com cenários e comando até a operação"],
    "2.5":["Gestão de mudança medida pelo treinamento dado, não pelo uso","Adoção de sistemas e de IA medida pelo uso real, com apoio por perfil de usuário"],
    "2.6":["A TI compra assistentes e agentes de IA sem método e sem medir o ganho","IA na própria TI com ganho medido, e o módulo de automação agêntica de processos"],
    "1.3":["Alocação de um profissional na TI do cliente, com pouca diferenciação","Deixa de ser vendido sozinho: o papel passa à liderança embarcada do 1.3"]
  },
  /* motivo de cada serviço, na dica do grafo (Decisão · Vira · Por quê) */
  why:{
    b1:"A IA encurta requisitos, concorrência e avaliação; o valor passa a ser a independência na escolha e na negociação (2.1).",
    b2:"A CBS passa a ser cobrada em 2027 e a manutenção padrão da versão antiga do ERP da SAP acaba no fim do ano: vira o 2.2.",
    b3:"Escritório que só reporta andamento perde valor; com IA, avisa antes do atraso e acompanha o valor prometido (2.3).",
    b4:"A mudança passa a ser medida pelo uso real de sistemas e de IA, e não pelo treinamento dado (2.5).",
    b5:"Mesmo comprador e mesmo método do escritório de transformação: os dois viram o 2.3.",
    b6:"O resgate segue o método de turnaround da A&M e mantém a essência, com IA de apoio (2.4).",
    b7:"Alocação de perfil, com pouca diferenciação: o papel passa para a liderança embarcada (1.3)."
  }
};

const sec=SL("13");if(!sec)return;
const TMO="Transformation Management Office";
/* troca o texto "TMO" (nome oficial do serviço) pela forma por extenso, só neste slide: textos e dicas */
function porExtenso(root){
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const hit=[];let n;
  while((n=tw.nextNode()))if(/\bTMO\b/.test(n.textContent))hit.push(n);
  hit.forEach(t=>t.textContent=t.textContent.replace(/\bTMO\b/g,TMO));
  root.querySelectorAll("[data-tv],[data-th],[aria-label]").forEach(el=>["data-tv","data-th","aria-label"].forEach(a=>{const v=el.getAttribute(a);if(v&&/\bTMO\b/.test(v))el.setAttribute(a,v.replace(/\bTMO\b/g,TMO))}));
}
/* etiqueta do módulo na carta do 2.6 (só na face do produto; a dica explica o módulo) */
function modulo(){
  const h=sec.querySelector('.pl-card[data-code="2.6"] .pl-h');if(!h||h.querySelector(".s13-mod"))return;
  const m=H("span",{class:"s13-mod","data-tv":"Módulo do 2.6 · Automação agêntica de processos",
    "data-tl":"Um agente executa um ciclo de processo de ponta a ponta, com regras, aprovação humana e trilha de auditoria. Provado em protótipo interno, com dados sintéticos."},h);
  m.innerHTML='<i aria-hidden="true">+</i>Módulo: automação agêntica de processos';
}
BOOT.push(()=>{safe(()=>porExtenso(sec));safe(modulo)});
})();
