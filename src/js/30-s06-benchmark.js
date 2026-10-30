/* =====================================================================
   SLIDE 06 · Benchmark 2026 · dono: benchmark (V6)
   Timeline Motion (fx 38, adaptado do Guia DTS à marca A&M): trilho com um marco por mês de 2026 (TL_2026,
   src/data/20-timelines.js), progresso que se desenha, ponta laranja, marcos numerados pelo sinal a que pertencem e
   cartão do mês com seta para o marco. Abaixo, os quatro sinais ("O que vimos" · "O que isso significa para nós"),
   ligados aos marcos: o mês aceso acende o sinal; passar o cursor num sinal destaca os meses dele; clicar abre o 1º.
   Ganchos: ENTER["06"] (reproduz; pelo ← abre no último mês), STEP["06"] (→ / ← mês a mês), PRINT (estado final e
   página extra com os dez fatos completos). Números só por data-fato (registro); sem siglas fora da SPEC 5.
   ===================================================================== */
(function(){const sec=SL("06");if(!sec)return;
  const tl=$("s06Tl"),sigHost=$("s06Sig"),rd=$("s06Rd"),amBox=$("s06Am"),btn=$("s06Play");if(!tl||!sigHost)return;
  const EV=(typeof TL_2026!=="undefined"&&Array.isArray(TL_2026))?TL_2026:[],N=EV.length;
  /* os quatro sinais: o que vimos (fatos do registro) e o que isso significa para nós (leitura DTS, sem nomes de produtos) */
  const SIG=[
    {n:1,t:"A IA virou plataforma e receita",
     v:"A McKinsey conta <span data-fato=\"mckinsey-agentes-25-mil\">25 mil</span> agentes de IA na força de trabalho; tecnologia e IA já passam de <span data-fato=\"bcg-tech-ia-40\">40%</span> da receita do BCG.",
     p:"Não vamos disputar plataforma: o espaço é escolher e combinar ferramentas, sem vender licença, e responder pelo resultado."},
    {n:2,t:"O preço começa a sair da hora",
     v:"A McKinsey liga cerca de <span data-fato=\"mckinsey-honorarios-resultado-25\">25%</span> dos honorários a resultado, a Deloitte vende agentes por assinatura e a Accenture já vê preço menor.",
     p:"Vendendo hora, damos a eficiência da IA de graça. Cobrar pelo resultado exige método repetível e uma medida combinada com o cliente."},
    {n:3,t:"A diligência ficou mais barata",
     v:"Agentes de voz entrevistam clientes do alvo, a PwC adota uma plataforma de IA de diligência e a Bain replica o software do alvo.",
     p:"O valor migra para depois da assinatura: o primeiro dia, a separação dos sistemas e as sinergias, perto do trabalho da A&amp;M com fundos."},
    {n:4,t:"Os pares compram capacidade pronta",
     v:"A AlixPartners comprou a Artium, de engenharia com agentes de IA; no Brasil, a Falconi investiu <span data-fato=\"benchmark-falconi-ia-100\">R$ 100 milhões</span> em IA desde 2022.",
     p:"Quem esperar vai concorrer com método já testado em clientes. A decisão é agora: o que construir, com quem se aliar e por onde começar."}];
  /* ---------- sinais ---------- */
  const cards=SIG.map((s,j)=>{const c=H("div",{class:"s06-s","data-n":s.n,"data-a":"up",style:`--d:${6+j}`,role:"button",tabindex:"0","aria-label":`Sinal ${s.n}: ${s.t}`},sigHost);
    c.innerHTML=`<div class="s06-sh"><i>${s.n}</i><b>${s.t}</b></div><span class="s06-sl">O que vimos</span><p class="s06-sv">${s.v}</p>
      <span class="s06-sl">O que isso significa para nós</span><p class="s06-sp">${s.p}</p>`;return c});
  /* ---------- linha do tempo ---------- */
  const rail=H("div",{class:"s06-rail"},tl),track=H("div",{class:"s06-track"},rail),prog=H("div",{class:"s06-prog"},rail),tip=H("div",{class:"s06-tip"},rail);
  const fr=i=>N<2?0:i/(N-1);
  const ms=EV.map((e,i)=>{const m=H("button",{class:"s06-ms"+(e.sig===0?" am":""),style:`left:${(fr(i)*100).toFixed(4)}%`,"data-sig":e.sig,type:"button","aria-label":`${e.d}: ${strip(e.t)}`},rail);
    m.innerHTML=`<span class="s06-dot">${e.sig?e.sig:""}</span><span class="s06-ring" aria-hidden="true"></span><span class="s06-lb"><b>${e.d.split(" ")[0]}</b><span>${e.s}</span></span>`;
    m.addEventListener("click",ev=>{ev.stopPropagation();stopAuto();show(i)});return m});
  const card=H("div",{class:"s06-card","aria-live":"polite"},tl),cin=H("div",{class:"s06-cin"},card);
  let cur=-1,auto=0,t0=0;
  /* posição do marco i em px dentro de .s06-tl (o trilho tem margem fixa; largura medida ou a de projeto) */
  const RM=52,CW=600;
  function dotX(i){const W=tl.clientWidth||1104;return RM+(W-2*RM)*fr(i)}
  function place(i){const W=tl.clientWidth||1104,x=dotX(i),cw=card.offsetWidth||CW,l=clamp(x-cw/2,0,W-cw);card.style.left=l+"px";card.style.setProperty("--px",(x-l)+"px")}
  function show(i,inst){cur=clamp(i,-1,N-1);const pct=cur<0?0:fr(cur)*100;prog.style.width=pct+"%";tip.style.left=pct+"%";tip.classList.toggle("on",cur>=0);
    ms.forEach((m,k)=>{m.classList.toggle("done",k<cur);m.classList.toggle("cur",k===cur);m.setAttribute("aria-pressed",String(k===cur))});
    const sg=cur<0?-1:EV[cur].sig;cards.forEach(c=>c.classList.toggle("on",+c.dataset.n===sg));if(amBox)amBox.classList.toggle("on",sg===0);
    if(rd)rd.textContent=cur<0?"Clique num mês":`${cur+1} / ${N}`;
    if(cur<0){card.classList.remove("on");return}
    const e=EV[cur];cin.innerHTML=`<div class="s06-cd"><span>${e.d}</span><span>${e.tag}</span>${e.sig?`<span class="s06-cn">Sinal ${e.sig}</span>`:""}</div><h4>${e.t}</h4><p>${e.x}</p><div class="s06-cs src-note">Fonte: ${e.src}</div>`;
    card.classList.toggle("am",e.sig===0);if(typeof refFill==="function")refFill(cin);place(cur);card.classList.add("on");
    if(!inst&&!REDMO&&cin.animate)cin.animate([{opacity:0,transform:"translateY(5px)"},{opacity:1,transform:"none"}],{duration:300,easing:"cubic-bezier(.22,.61,.36,1)"})}
  function stopAuto(){clearInterval(auto);clearTimeout(t0);auto=0;t0=0;tl.classList.remove("auto")}
  function play(){stopAuto();show(-1,true);tl.classList.add("auto");let k=-1;const step=()=>{k++;if(k>=N){stopAuto();return}show(k)};t0=setTimeout(()=>{step();auto=setInterval(step,1900)},450)}
  /* sinal: o cursor destaca os meses do sinal; o clique abre o primeiro mês dele */
  const hl=n=>{const on=n!=null;tl.classList.toggle("hl",on);ms.forEach(m=>m.classList.toggle("hl",on&&+m.dataset.sig===n))};
  cards.forEach(c=>{const n=+c.dataset.n,pick=e=>{e.stopPropagation();stopAuto();const i=EV.findIndex(x=>x.sig===n);if(i>=0)show(i)};
    c.addEventListener("mouseenter",()=>hl(n));c.addEventListener("mouseleave",()=>hl(null));c.addEventListener("focus",()=>hl(n));c.addEventListener("blur",()=>hl(null));
    c.addEventListener("click",pick);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}})});
  /* o quadro da Alvarez & Marsal global faz o mesmo com o marco de maio */
  if(amBox){amBox.addEventListener("mouseenter",()=>hl(0));amBox.addEventListener("mouseleave",()=>hl(null));
    amBox.addEventListener("click",e=>{e.stopPropagation();stopAuto();const i=EV.findIndex(x=>x.sig===0);if(i>=0)show(i)})}
  if(btn)btn.addEventListener("click",e=>{e.stopPropagation();play()});
  show(-1,true);
  ENTER["06"]=()=>{if(goLast||REDMO){stopAuto();show(N-1,true)}else play()};
  STEP["06"]=d=>{if(d>0){if(cur<N-1){stopAuto();show(cur+1);return true}stopAuto();return false}
    if(cur>0){stopAuto();show(cur-1);return true}stopAuto();return false};
  document.addEventListener("deck:activate",e=>{if(!e.detail||e.detail.key!=="06")stopAuto()});
  addEventListener("resize",()=>{if(cur>=0)place(cur)});
  /* impressão: estado final (todos os meses acesos, cartão do último) e uma página extra com os dez fatos completos */
  PRINT.push(()=>{stopAuto();hl(null);show(N-1,true);
    if(stage.querySelector(".s06-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s06-print","play");c.querySelectorAll("[id]").forEach(x=>x.removeAttribute("id"));
    const sub=c.querySelector(".sub");if(sub)sub.textContent="Os dez fatos de 2026 em detalhe, mês a mês, com a fonte de cada um e o sinal a que pertencem";
    const r=c.querySelector(".head-r");if(r){r.querySelectorAll("[data-ui]").forEach(x=>x.remove())}
    const g=H("div",{class:"s06-pgrid"});EV.forEach(e=>H("div",{class:"s06-pc"+(e.sig===0?" am":""),html:`<div class="s06-pd"><i>${e.sig||""}</i><span>${e.d}</span><span>${e.tag}</span></div><h4>${e.t}</h4><p>${e.x}</p><div class="s06-ps">Fonte: ${e.src}</div>`},g));
    const m=c.querySelector(".s06-main");if(m)m.replaceWith(g);sec.after(c)});
})();
