/* =====================================================================
   SLIDE 19 · Jogos de entrada (as propostas lúdicas) · dono: fabrica-jogos
   Quatro cartas que viram (fx Flip Card, como os cartões do slide 3 da APODI). Conteúdo: JOGOS (src/data/30-jogos.js).
   - Frente: emblema, pilar, nome, tipo e duração (em palavras), a pergunta do cliente, a promessa, a regra do jogo
     e o método com a fonte (organização e ano, sem nome de pessoa).
   - Verso da carta: como se joga (três passos), quem joga, o que o cliente leva e os produtos que o jogo abre
     (links para as fichas; a dica de cada link diz como o resultado do jogo leva àquele produto).
   - Interação: clique, Enter ou Espaço vira e desvira uma carta; "virar todas" encadeia as quatro (e o mascote
     comemora); → vira a próxima carta e, com as quatro viradas, segue para o slide 20; ← desvira a última.
     Entrando pelo ← (vindo do slide 20), as quatro abrem viradas. Uma sugestão de giro na primeira carta.
   - Repouso = uma face só, sem camadas 3D (texto nítido); .is-turning liga o 3D só durante o giro.
   - Impressão: a página do slide mostra as frentes; uma página extra (.s19-print) mostra o verso das quatro cartas.
   Ganchos: ENTER["19"], STEP["19"], PRINT. Tudo dentro desta IIFE (sem nomes globais novos).
   ===================================================================== */
(function(){const sec=SL("19"),grid=$("s19Grid");if(!sec||!grid)return;
  const J=typeof JOGOS!=="undefined"&&JOGOS?JOGOS:{};
  const ORDER=["mesa-do-conselho","pre-mortem-2027","jogo-do-dia-1","exercicio-de-crise"];
  const FALL={"mesa-do-conselho":["Mesa do Conselho",1],"pre-mortem-2027":["Pré-mortem 2027",2],"jogo-do-dia-1":["Jogo do Dia 1",3],"exercicio-de-crise":["Exercício de Crise",4]};
  /* emblema de cada jogo (traço que se desenha na entrada): orçamento · ampulheta · o Dia 1 no calendário · sirene */
  const IC={
    "mesa-do-conselho":'<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>',
    "pre-mortem-2027":'<path d="M7 3h10"/><path d="M7 21h10"/><path d="M8 3v2.5c0 2.6 4 4.4 4 6.5s-4 3.9-4 6.5V21"/><path d="M16 3v2.5c0 2.6-4 4.4-4 6.5s4 3.9 4 6.5V21"/><path d="M10 18.6h4"/>',
    "jogo-do-dia-1":'<rect x="3.5" y="5" width="17" height="15" rx="2"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3" x2="8" y2="6.5"/><line x1="16" y1="3" x2="16" y2="6.5"/><path d="M10.6 13.3l1.9-1.4v5.8"/>',
    "exercicio-de-crise":'<path d="M7 17v-4.5a5 5 0 0 1 10 0V17"/><rect x="5" y="17" width="14" height="3.5" rx="1"/><path d="M12 3.5v2M4.6 6.4l1.5 1.4M19.4 6.4l-1.5 1.4"/><path d="M10 13a2 2 0 0 1 2-2"/>'};
  const icon=(id,d)=>`<svg class="ico" viewBox="0 0 24 24" style="--d:${d||0}" aria-hidden="true">${IC[id]||""}</svg>`;
  const ROT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20.5 4v4.5H16"/></svg>';
  const pName=n=>typeof PILLARS!=="undefined"&&PILLARS[n-1]?PILLARS[n-1].name:"";
  const at=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/"/g,"&quot;");
  const plain=s=>strip(s).replace(/\u00a0/g," ");
  /* fonte do selo sem quebra no meio do nome: as três últimas palavras ficam juntas */
  const keep=f=>String(f||"").replace(/ (\S+) (\S+) (\S+)$/,"\u00a0$1\u00a0$2\u00a0$3");
  /* produto que o jogo abre: código + nome (abre a ficha); a dica diz como o resultado do jogo leva ao produto */
  const prod=(c,g)=>{const p=PBY(c);if(!p)return "";const pt=g.ponte&&g.ponte[c]?plain(g.ponte[c]):"Clique para abrir a ficha.";
    return `<a href="#p=${p.id}" data-pd="${p.id}" class="plink sm ${p.st}" data-tv="${at(p.code+" · "+p.name)}" data-tl="${at(pt)}">${p.code} ${p.name}</a>`};

  const cards=ORDER.map((id,i)=>{const g=J[id]||{},[nome0,pil0]=FALL[id],n=g.pilar||pil0,nome=g.nome||nome0,selo=g.selo||{};
    const c=H("div",{class:"s19-card","data-j":id,"data-a":"up",style:`--d:${2+i}`,role:"button",tabindex:"0","aria-pressed":"false","aria-label":`${plain(nome)}: virar a carta`},grid);
    c.innerHTML=`<div class="s19-lift"><div class="s19-in">
      <div class="s19-face s19-front">
        <span class="s19-hint" data-ui aria-hidden="true">${ROT}virar</span>
        <div class="s19-top"><span class="s19-ic">${icon(id,i)}</span><span class="s19-pl"><b>Pilar ${n}</b><i>${pName(n)}</i></span></div>
        <b class="s19-nm">${nome}</b>
        <div class="s19-tags">${g.tipo?`<span class="s19-tag">${g.tipo}</span>`:""}${g.duracao?`<span class="s19-tag s19-dur">${g.duracao}</span>`:""}</div>
        ${g.pergunta?`<p class="s19-q">${g.pergunta}</p>`:""}
        <p class="s19-pr">${g.promessa||"Promessa em preparação."}</p>
        ${g.regra?`<div class="s19-rule"><span>Regra do jogo</span><p>${g.regra}</p></div>`:""}
        ${selo.m?`<div class="s19-seal"><span>Método</span><p><b>${selo.m}</b><i>${keep(selo.f)}</i></p></div>`:""}
      </div>
      <div class="s19-face s19-back dk">
        <span class="s19-hint" data-ui aria-hidden="true">${ROT}voltar</span>
        <div class="s19-bh"><span class="s19-bic">${icon(id)}</span><span class="s19-bn"><b class="s19-bt">${nome}</b><i>Pilar ${n} · ${g.tipo||""}</i></span></div>
        <span class="s19-bl">Como se joga</span>
        <ol class="s19-steps">${(g.passos||[]).map(x=>`<li>${x}</li>`).join("")}</ol>
        ${g.quem?`<div class="s19-kv"><span class="s19-bl">Quem joga</span><p>${g.quem}</p></div>`:""}
        ${g.leva?`<div class="s19-kv"><span class="s19-bl">O cliente leva</span><p>${g.leva}</p></div>`:""}
        <div class="s19-kv s19-kp"><span class="s19-bl">Abre os produtos</span><div class="s19-ps">${(g.produtos||[]).map(x=>prod(x,g)).join("")}</div></div>
      </div></div></div>`;
    return c});
  if(typeof fixPaths==="function")fixPaths(grid);

  /* ---------- virar ---------- */
  const mq=matchMedia("(prefers-reduced-motion: reduce)");
  const btn=$("s19All"),lab=btn&&btn.querySelector("span"),masc=sec.querySelector(".s19-dealer .am-masc");
  const tm=new Map(),TT=[];
  const later=(c,fn,ms)=>{clearTimeout(tm.get(c));tm.set(c,setTimeout(fn,ms))};
  const flipped=c=>c.classList.contains("is-flipped");
  const sync=()=>{const all=cards.every(flipped);if(lab)lab.textContent=all?"desvirar todas":"virar todas";if(btn)btn.setAttribute("aria-label",all?"Desvirar todas as cartas":"Virar todas as cartas")};
  function flip(c,to,quiet){const nx=to==null?!flipped(c):!!to;if(nx===flipped(c))return false;
    c.classList.remove("nudge","is-lifting");
    if(quiet||REDMO||mq.matches){c.classList.remove("is-turning","no-tr");c.classList.toggle("is-flipped",nx);c.setAttribute("aria-pressed",String(nx));sync();return true}
    c.classList.add("is-turning","no-tr");void c.offsetWidth;
    c.classList.remove("no-tr");c.classList.add("is-lifting");c.classList.toggle("is-flipped",nx);c.setAttribute("aria-pressed",String(nx));
    later(c,()=>c.classList.remove("is-lifting","is-turning"),820);sync();return true}
  const clearT=()=>{TT.splice(0).forEach(clearTimeout);tm.forEach(clearTimeout);tm.clear();cards.forEach(c=>c.classList.remove("nudge","is-lifting","is-turning","no-tr"))};
  cards.forEach(c=>{
    c.addEventListener("click",e=>{if(e.target.closest("a,button"))return;e.stopPropagation();flip(c)});
    c.addEventListener("keydown",e=>{if(e.target!==c)return;if(e.key==="Enter"||e.key===" "){e.preventDefault();e.stopPropagation();flip(c)}})});
  if(btn)btn.addEventListener("click",e=>{e.stopPropagation();const to=!cards.every(flipped);
    cards.forEach((c,i)=>TT.push(setTimeout(()=>flip(c,to),i*110)));
    if(to&&masc&&window.AMMasc)TT.push(setTimeout(()=>{try{window.AMMasc.play(masc)}catch(x){}},cards.length*110+380))});

  /* ---------- ganchos ---------- */
  ENTER["19"]=()=>{clearT();cards.forEach(c=>flip(c,!!goLast,true));sync();
    if(!goLast&&!REDMO&&!mq.matches)TT.push(setTimeout(()=>{const c0=cards[0];if(c0&&!cards.some(flipped)){c0.classList.add("nudge");TT.push(setTimeout(()=>c0.classList.remove("nudge"),1100))}},1800))};
  /* → vira a próxima carta; com as quatro viradas, segue para o slide 20 · ← desvira a última virada */
  STEP["19"]=d=>{if(d>0){const c=cards.find(x=>!flipped(x));if(c){flip(c,true);return true}return false}
    const r=cards.slice().reverse().find(flipped);if(r){flip(r,false);return true}return false};
  /* impressão: frentes na página do slide; página extra com o verso das quatro cartas */
  PRINT.push(()=>{clearT();cards.forEach(c=>flip(c,false,true));sync();
    if(stage.querySelector(".s19-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s19-print","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    c.querySelectorAll(".s19-card").forEach(x=>{x.classList.add("is-flipped");x.setAttribute("aria-pressed","true")});
    const sub=c.querySelector(".sub");if(sub)sub.textContent="O verso das quatro cartas: como se joga, quem joga, o que o cliente leva e os produtos que cada jogo abre";
    sec.after(c)});
})();
