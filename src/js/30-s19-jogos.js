/* =====================================================================
   SLIDE 19 · Jogos de entrada (propostas lúdicas) · dono: slide 19
   PLACEHOLDER DA FUNDAÇÃO: desenha as quatro cartas a partir de JOGOS (src/data/30-jogos.js, do time de
   conteúdo) quando o arquivo existir; sem ele, mostra os nomes do SPEC com "em construção".
   Clique (ou Enter) vira a carta: frente = nome, pilar e promessa; verso = como funciona e produtos que abre.
   O time do slide 19 reescreve este módulo e o CSS (cartas que viram no estilo do slide 3 da APODI).
   ===================================================================== */
(function(){const sec=SL("19"),host=$("jgGrid");if(!sec||!host)return;
  const FALL=[["mesa-do-conselho","Mesa do Conselho",1,["1.1","1.5","1.7"]],["pre-mortem-2027","Pré-mortem 2027",2,["2.2","2.3","2.4"]],["jogo-do-dia-1","Jogo do Dia 1",3,["3.1","3.2","3.3"]],["exercicio-de-crise","Exercício de Crise",4,["4.5","4.6","4.3"]]];
  const J=typeof JOGOS!=="undefined"&&JOGOS?JOGOS:null;
  const cards=FALL.map(([id,nome,pilar,prods])=>{const g=J&&J[id]?J[id]:{nome,pilar,produtos:prods};const pl=typeof PILLARS!=="undefined"?PILLARS[(g.pilar||pilar)-1]:null;
    const c=H("div",{class:"jg-card","data-a":"up",style:`--d:${2+pilar}`,role:"button",tabindex:"0","aria-pressed":"false"},host);
    c.innerHTML=`<div class="jg-face jg-front"><span class="jg-pl">Pilar ${g.pilar||pilar}</span><b class="jg-nm">${g.nome||nome}</b><p class="jg-pr">${g.promessa||"Promessa em construção."}</p><span class="jg-hint">clique para virar</span></div>
      <div class="jg-face jg-back"><span class="jg-pl">Como funciona</span>${g.passos?`<ol>${g.passos.map(x=>`<li>${x}</li>`).join("")}</ol>`:"<p>Passos em construção.</p>"}<span class="jg-pl">Produtos que abre</span><div class="jg-ps">${(g.produtos||prods).map(c2=>pcode(c2,"sm")).join("")}</div></div>`;
    const flip=e=>{if(e&&e.target.closest("a"))return;c.classList.toggle("on");c.setAttribute("aria-pressed",String(c.classList.contains("on")))};
    c.addEventListener("click",flip);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip(e)}});return c});
  ENTER["19"]=()=>cards.forEach(c=>{c.classList.remove("on");c.setAttribute("aria-pressed","false")});
})();
