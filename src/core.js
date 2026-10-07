/* =====================================================================
   NÚCLEO · chrome, navegação cinematográfica, capítulos, painéis, fichas
   (depende de engine.js e data.js)
   ===================================================================== */
const stage=$("stage");
const slides=[...stage.querySelectorAll(":scope > .slide")],N=slides.length;let cur=0,busy=false;
const ENTER={};          // hooks por data-t
const pad=n=>String(n).padStart(2,"0");
const DOSE={sutil:1,moderada:2,intensa:3};
const brand=dark=>`<div class="brand">${amLogo(22)}<span class="brand-div"></span>${dark?dtsLogo(24):dtsLogo(24,false)}</div>`;
const hlx=t=>t.replace(/\*(.+?)\*/g,'<span class="hl">$1</span>');

/* --- capítulos: um por ato (data-chapter="NN|Título|Descrição" no primeiro slide do ato) --- */
const CHMETA={};slides.forEach(s=>{if(s.dataset.chapter){const [n,t,d]=s.dataset.chapter.split("|");CHMETA[s.dataset.p]={n,t,d}}});
const chapLabel=s=>{const m=CHMETA[s.dataset.p];return m?`Capítulo ${m.n} · ${s.dataset.p}`:(s.dataset.p||"Abertura")};

/* --- chrome: topo leve, rodapé com fonte e efeito --- */
slides.forEach((s,i)=>{
  if(s.hasAttribute("data-bare"))return;
  const dark=s.classList.contains("stage");
  const top=H("div",{class:"top"});
  top.innerHTML=`${brand(dark)}<div class="top-title"><span>${chapLabel(s)}</span><b>${s.dataset.t}</b></div><div class="top-right"><span class="pg"><b>${pad(i+1)}</b> / ${pad(N)}</span></div>`;
  s.prepend(top);
  const f=H("div",{class:"foot"},s);const src=H("span",{class:"src"},f);
  const st=(s.dataset.src||"").replace(/^Fontes?:\s*/,"");src.innerHTML=st?`<b>FONTE</b>`:`<b>A&amp;M · DTS</b>Portfólio estratégico 2027`;if(st)src.append(st);src.title=st;
  if(s.dataset.fx){const [num,name,dose]=s.dataset.fx.split("|");const d=DOSE[dose]||1;const c=H("span",{class:"fxchip",title:`Efeito do Guia de Design DTS: ${name} · dose ${dose}`},f);c.innerHTML=`<span>fx ${num} · ${name}</span><span class="dose"><i class="${d>=1?"on":""}"></i><i class="${d>=2?"on":""}"></i><i class="${d>=3?"on":""}"></i></span>`}
});
document.querySelectorAll("#stage .kin").forEach(kin);

/* --- duas vistas no mesmo slide (ex.: cliente | mercado): seletor no topo --- */
const PANE={};
slides.forEach(s=>{if(!s.dataset.panes)return;const panes=[...s.querySelectorAll(":scope > .body.pane")];
  const sg=H("div",{class:"seg pseg"});s.querySelector(".top-right").prepend(sg);
  const btns=s.dataset.panes.split("|").map((l,k)=>{const b=H("button",{class:k?"":"on"},sg,`${k+1} · ${l}`);b.addEventListener("click",e=>{e.stopPropagation();setPane(s,k)});return b});
  PANE[s.dataset.t]={s,panes,btns,sg,k:0}});
function setPane(s,k){const P=PANE[s.dataset.t];if(!P)return;P.k=k;P.panes.forEach((p,j)=>p.classList.toggle("on",j===k));P.btns.forEach((b,j)=>b.classList.toggle("on",j===k));segSync(P.sg);
  const pn=P.panes[k],fs=s.querySelector(".foot .src");if(fs&&pn.dataset.paneSrc){fs.innerHTML="<b>FONTE</b>";fs.append(pn.dataset.paneSrc.replace(/^Fontes?:\s*/,""));fs.title=pn.dataset.paneSrc}
  tipEl.classList.remove("on");if(infoP.classList.contains("on"))fillInfo()}
function paneStep(d){const P=PANE[slides[cur].dataset.t];if(!P)return false;if(d>0&&P.k<P.panes.length-1){setPane(P.s,P.k+1);return true}if(d<0&&P.k>0){setPane(P.s,P.k-1);return true}return false}

/* --- transição de capítulo (fx 08 · orbs) · pilares ganham morphing (CHAPX) --- */
const CHAPX={};const chapEl=H("div",{id:"chap"},stage);let chapOn=null;
function showChapter(p,done){const m=CHMETA[p];chapEl.className="";
  chapEl.innerHTML=`<div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div><div class="cv-top">${brand(true)}<span class="cv-conf">Planejamento estratégico · DTS 2027</span></div><div class="cn">${m.n}</div><div class="chap-l"><div class="cey">CAPÍTULO ${m.n}</div><h1>${hlx(m.t)}</h1><p>${m.d}</p><div class="cln"></div></div><div class="csk">→ ou clique para continuar ›</div>`;
  kin(chapEl.querySelector("h1"));chapEl.classList.add("on");void chapEl.offsetWidth;chapEl.classList.add("play");
  if(!REDMO)chapEl.querySelector(".cln").animate([{width:"0px"},{width:"420px"}],{duration:900,delay:250,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"});else chapEl.querySelector(".cln").style.width="420px";
  const cleanup=CHAPX[p]?CHAPX[p](chapEl):null;chapOn={done,cleanup:cleanup||(()=>{})}}
function hideChapter(run){if(!chapOn)return;const c=chapOn;chapOn=null;const a=chapEl.animate([{opacity:1},{opacity:0}],{duration:REDMO?1:380});a.onfinish=()=>{if(chapOn)return;chapEl.className="";chapEl.innerHTML="";c.cleanup()};if(run)c.done();else c.cleanup()}
chapEl.addEventListener("click",e=>{if(e.target.closest("button,a"))return;hideChapter(true)});

/* --- controles --- */
const ctr=H("div",{id:"controls"},document.body);
ctr.innerHTML=`<button class="k" id="bProd" title="Fichas de produto (P)">▦ <span class="lb">Fichas de produto</span></button><button class="g" id="bInfo" title="Sobre este slide (I)"><span style="display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;border:2px solid currentColor;font:800 10px/1 var(--fb)">i</span> <span class="lb">Sobre este slide</span></button><button class="g" id="bPrev">← <span class="lb">Voltar</span></button><span class="c" id="cnt" title="Índice (G)"></span><button class="p" id="bNext"><span class="lb">Avançar</span> →</button>`;
H("div",{id:"progress"},document.body);
const tipEl=H("div",{id:"tip",html:"<b></b><span></span>"},document.body);
const infoP=H("div",{class:"panel",id:"infoP",html:`<button class="px" aria-label="Fechar">×</button><div class="ie">Sobre este slide</div><div class="it"></div><div class="id"></div><div class="ifx"></div><div class="isrc"></div>`},document.body);
const idxP=H("div",{class:"panel",id:"idxP",html:`<div class="xh">Roteiro da apresentação<button class="px" style="position:static" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const pdxP=H("div",{class:"panel",id:"pdxP",html:`<div class="xh">Fichas de produto · novo portfólio<button class="px" style="position:static" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const panels=[infoP,idxP,pdxP];
function closePanels(except){panels.forEach(p=>{if(p!==except)p.classList.remove("on")});$("bInfo").classList.toggle("on",except===infoP&&infoP.classList.contains("on"));$("cnt").classList.toggle("on",except===idxP&&idxP.classList.contains("on"));$("bProd").classList.toggle("on",except===pdxP&&pdxP.classList.contains("on"))}
function togglePanel(p){p.classList.toggle("on");closePanels(p)}
panels.forEach(p=>p.querySelector(".px").onclick=()=>{p.classList.remove("on");closePanels(null)});
$("bInfo").onclick=()=>{fillInfo();togglePanel(infoP)};$("cnt").onclick=()=>{fillIdx();togglePanel(idxP)};$("bProd").onclick=()=>{fillPdx();togglePanel(pdxP)};
function fillInfo(){const s=pdOpen?null:slides[cur];const P=pdOpen?PRODUCTS.find(x=>x.id===pdOpen):null;
  infoP.querySelector(".it").textContent=P?`${P.code} · ${P.name}`:s.dataset.t;
  infoP.querySelector(".id").innerHTML=P?`<p>Ficha de produto do novo portfólio DTS. Status: <b>${STATUS[P.st][0]}</b>. Origem: ${P.from}.</p><p>Layout do modelo Playbook: no card, público, formato e encaixe, origem e por que A&amp;M; à direita, o problema, o que o cliente recebe, como funciona (método e etapas), o produto em números, o papel da IA, como vira produto, ferramentas e dados, skills e fontes.</p>`:(s.querySelector("template.info")?s.querySelector("template.info").innerHTML:"");
  const fx=P?["03","Hologram 3D Cards","moderada"]:(s.dataset.fx?s.dataset.fx.split("|"):null);
  infoP.querySelector(".ifx").innerHTML=fx?`<b>Efeito (Guia DTS):</b> fx ${fx[0]} · ${fx[1]} · dose ${fx[2]}.`:"";
  const PV=!P&&PANE[s.dataset.t],vs=PV&&PV.panes[PV.k].dataset.paneSrc||s.dataset.src;
  infoP.querySelector(".isrc").textContent=P?"":(vs?"Fonte: "+vs.replace(/^Fontes?:\s*/,""):"")}
function fillIdx(){const xl=idxP.querySelector(".xl");xl.innerHTML="";let last="";slides.forEach((s,i)=>{const g=s.dataset.p||"Abertura";if(g!==last){H("div",{class:"xg"},xl,CHMETA[g]?`${CHMETA[g].n} · ${g}`:g);last=g}const b=H("button",{class:"xi"+(i===cur&&!pdOpen?" cur":"")},xl);H("b",null,b,pad(i+1));H("span",null,b,s.dataset.t);b.onclick=()=>{idxP.classList.remove("on");closePanels(null);closePD(true);go(i,true)}});
  requestAnimationFrame(()=>{const c=xl.querySelector(".xi.cur");if(c)c.scrollIntoView({block:"nearest"})})}
function fillPdx(){const xl=pdxP.querySelector(".xl");xl.innerHTML="";PILLARS.forEach(pl=>{H("div",{class:"xg"},xl,`Pilar ${pl.n} · ${pl.name}`);PRODUCTS.filter(p=>p.pillar===pl.n).forEach(p=>{const b=H("button",{class:"xi"+(pdOpen===p.id?" cur":"")},xl);H("b",null,b,p.code);H("span",null,b,p.name);H("span",{html:stTag(p.st)},b);b.onclick=()=>{pdxP.classList.remove("on");closePanels(null);openPD(p.id)}})})}

/* --- trilha narrativa (atos) --- */
const PARTS=[...new Set(slides.map(s=>s.dataset.p||"Abertura"))];
const RLBL=n=>n==="Abertura"?"Capa":n.replace(/^Pilar (\d).*/,"Pilar $1").replace("Ponto de partida","Partida").replace("Nossa posição","Posição").replace("Novo portfólio","Portfólio");
const rail=H("div",{id:"rail"},document.body);
const RAIL=PARTS.map(n=>{const idx=slides.map((s,i)=>(s.dataset.p||"Abertura")===n?i:-1).filter(i=>i>=0);const d=H("div",{class:"seg2",style:`min-width:${Math.max(46,idx.length*24)}px`},rail);H("span",null,d,RLBL(n));const bar=H("i",null,d);const b=H("b",null,bar);d.onclick=()=>{closePD(true);go(idx[0])};d.title=n;return{n,idx,d,b}});
/* i = slide ativo; pil = pilar da ficha aberta (acende o capítulo do pilar, com a barra cheia) */
function railSync(i,pil){RAIL.forEach(r=>{if(pil){const on=r.n.startsWith(`Pilar ${pil} `);r.d.classList.toggle("on",on);r.b.style.width=on?"100%":"0";return}
  const k=r.idx.indexOf(i),on=k>=0;r.d.classList.toggle("on",on);r.b.style.width=on?((k+1)/r.idx.length*100)+"%":(r.idx[0]<i?"100%":"0")})}
/* controles no modo ficha: os botões de baixo navegam entre fichas e dizem isso; o "i" fala da ficha */
function ctlMode(pdm){$("bPrev").querySelector(".lb").textContent=pdm?"Ficha anterior":"Voltar";$("bNext").querySelector(".lb").textContent=pdm?"Próxima ficha":"Avançar";
  $("bInfo").querySelector(".lb").textContent=pdm?"Sobre esta ficha":"Sobre este slide";$("bInfo").title=pdm?"Sobre esta ficha (I)":"Sobre este slide (I)";infoP.querySelector(".ie").textContent=pdm?"Sobre esta ficha":"Sobre este slide"}

/* --- escala do palco --- */
function fit(){const vw=innerWidth,vh=innerHeight,sm=vw<760,padx=sm?6:18,bar=sm?56:66,sc=Math.min((vw-padx*2)/1600,(vh-padx-bar)/900);stage.style.left=vw/2+"px";stage.style.top=(padx+(vh-padx-bar)/2)+"px";stage.style.transform=`translate(-50%,-50%) scale(${sc})`}
addEventListener("resize",fit);

/* --- ativação --- */
function activate(i,inst,back,noEnter,last){tipEl.classList.remove("on");const n=slides[i];if(PANE[n.dataset.t])setPane(n,last?PANE[n.dataset.t].panes.length-1:0);slides.forEach((s,k)=>{if(k!==i)s.classList.remove("active","entering","play","back")});n.classList.remove("play","entering","back");void n.offsetWidth;n.classList.add("active","play");if(!inst){n.classList.add("entering");if(back)n.classList.add("back")}cur=i;
  $("cnt").textContent=`${pad(i+1)} / ${pad(N)}`;$("progress").style.width=((i+1)/N*100)+"%";$("bPrev").disabled=i===0;$("bNext").disabled=i===N-1;
  if(!pdOpen)history.replaceState(null,"","#"+(i+1));
  railSync(i);
  if(PANE[n.dataset.t])segSync(PANE[n.dataset.t].sg);
  n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));
  if(infoP.classList.contains("on"))fillInfo();
  if(noEnter)return;const fn=ENTER[n.dataset.t];if(fn)setTimeout(fn,inst?0:60)}
/* goLast: o slide foi aberto pelo ← (prev): abre na última vista ou passo. Trilha, índice, Home e links abrem no início */
let goLast=false;
function go(i,inst,opt){i=clamp(i,0,N-1);if(i===cur&&!inst)return;if(busy)return;const back=i<cur,last=!!(opt&&opt.last)&&back;goLast=last;if(chapOn)hideChapter(false);
  const np=slides[i].dataset.p,chap=!back&&np!==slides[cur].dataset.p&&CHMETA[np];
  if(inst||REDMO){activate(i,true,back,false,last);if(chap&&!inst)showChapter(np,()=>{});return}
  busy=true;const w=$("wipe");w.style.visibility="visible";const bars=[...w.querySelectorAll("i")],dir=back?-1:1;
  bars.forEach((b,k)=>b.animate([{transform:`translateX(${-110*dir}%) skewX(-10deg)`},{transform:"translateX(0) skewX(-10deg)"}],{duration:380,delay:k*60,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));
  setTimeout(()=>{if(chap){activate(i,true,back,true);const n=slides[i];n.classList.remove("play");showChapter(np,()=>{void n.offsetWidth;n.classList.add("play");if(PANE[n.dataset.t])segSync(PANE[n.dataset.t].sg);n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));const fn=ENTER[n.dataset.t];if(fn)setTimeout(fn,60)})}else activate(i,false,back,false,last);
    bars.forEach((b,k)=>b.animate([{transform:"translateX(0) skewX(-10deg)"},{transform:`translateX(${110*dir}%) skewX(-10deg)`}],{duration:420,delay:(2-k)*60,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));setTimeout(()=>{w.style.visibility="hidden";busy=false},600)},500)}
/* passos internos: slides podem consumir o "avançar" (ex.: spotlight, timeline) */
const STEP={};
function next(){tipEl.classList.remove("on");if(pdOpen){pdStep(1);return}if(chapOn){hideChapter(true);return}const f=STEP[slides[cur].dataset.t];if(f&&f(1))return;if(paneStep(1))return;go(cur+1)}
function prev(){tipEl.classList.remove("on");if(pdOpen){pdStep(-1);return}if(chapOn){hideChapter(false);slides[cur].classList.add("play");go(cur-1,false,{last:true});return}const f=STEP[slides[cur].dataset.t];if(f&&f(-1))return;if(paneStep(-1))return;go(cur-1,false,{last:true})}
$("bNext").onclick=next;$("bPrev").onclick=prev;
addEventListener("keydown",e=>{if(e.target.tagName==="INPUT"||e.defaultPrevented)return;
  if(e.key==="Escape"&&chapOn){hideChapter(true);return}
  if(e.key==="Escape"){if(panels.some(p=>p.classList.contains("on"))){panels.forEach(p=>p.classList.remove("on"));closePanels(null)}else if(pdOpen)closePD();return}
  if(["ArrowRight","PageDown"," "].includes(e.key)){e.preventDefault();next()}else if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();prev()}
  else if(e.key==="Home"){closePD(true);go(0)}else if(e.key==="End"){closePD(true);go(N-1)}
  else if(e.key==="f"||e.key==="F"){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}
  else if(e.key==="i"||e.key==="I"){$("bInfo").click()}else if(e.key==="p"||e.key==="P"){$("bProd").click()}else if(e.key==="g"||e.key==="G"){$("cnt").click()}});
let tx=null;addEventListener("touchstart",e=>{tx=e.target.closest&&e.target.closest(".ba-handle,.cs-scene")?null:e.touches[0].clientX},{passive:true});addEventListener("touchend",e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60)dx<0?next():prev();tx=null},{passive:true});
addEventListener("pointermove",e=>{const el=e.target.closest&&e.target.closest("[data-tv]");if(el){tipEl.querySelector("b").textContent=el.dataset.tv;if(el.dataset.th)tipEl.querySelector("span").innerHTML=el.dataset.th;else tipEl.querySelector("span").textContent=el.dataset.tl||"";tipEl.classList.add("on");tipEl.style.left=Math.min(e.clientX+14,innerWidth-360)+"px";tipEl.style.top=Math.max(8,Math.min(e.clientY+14,innerHeight-tipEl.offsetHeight-8))+"px"}else tipEl.classList.remove("on")});
/* ripple */
document.addEventListener("pointerdown",e=>{if(REDMO)return;const el=e.target.closest(".prod,.clk,#controls button");if(!el)return;if(getComputedStyle(el).position==="static")el.style.position="relative";const r=el.getBoundingClientRect(),sc=stage.contains(el)?stage.getBoundingClientRect().width/1600:1,x=(e.clientX-r.left)/sc,y=(e.clientY-r.top)/sc,size=Math.max(r.width,r.height)/sc*1.1;const sp=H("span",{class:"rp",style:`width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`},el);setTimeout(()=>sp.remove(),650)});
/* links internos para fichas: qualquer [data-pd] */
stage.addEventListener("click",e=>{const a=e.target.closest("[data-pd]");if(!a)return;e.preventDefault();if(chapOn)hideChapter(true);openPD(a.dataset.pd)});
stage.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();closePD(true);go(+a.dataset.go-1)});

/* versão de impressão: vistas extras e fichas como páginas */
const PRINT=[];
function buildPrint(){PRINT.forEach(f=>{try{f()}catch(e){}});
  stage.querySelectorAll(":scope > .slide:not(.pd-print) a[data-pd]").forEach(a=>{if(a.dataset.h0==null)a.dataset.h0=a.getAttribute("href")||"";a.setAttribute("href","#pdp-"+a.dataset.pd)});
  if(stage.querySelector(".pd-print"))return;
  Object.values(PANE).forEach(P=>{for(let k=P.panes.length-1;k>=1;k--){const c=P.s.cloneNode(true);c.classList.add("pane-print");c.classList.remove("active");[...c.querySelectorAll(":scope > .body.pane")].forEach((x,j)=>{if(j!==k)x.remove();else x.classList.add("on")});const pn=P.panes[k];const fs=c.querySelector(".foot .src");if(fs&&pn.dataset.paneSrc){fs.innerHTML="<b>FONTE</b>";fs.append(pn.dataset.paneSrc)}c.querySelectorAll(".pseg button").forEach((b,j)=>b.classList.toggle("on",j===k));P.s.after(c)}P.panes.forEach((x,j)=>x.classList.toggle("on",j===0));P.btns.forEach((b,j)=>b.classList.toggle("on",j===0))});
  PRODUCTS.forEach((P,k)=>{const sec=H("section",{class:"pd-print slide stage",id:"pdp-"+P.id,html:pdHTML(P,k+1)},stage);plainBadges(sec);sec.classList.add("play");
    /* no PDF, os links de ficha apontam para a página da ficha (#pdp-…), que o Chromium transforma em link interno */
    sec.querySelectorAll("a[data-pd]").forEach(a=>a.setAttribute("href","#pdp-"+a.dataset.pd))})}
addEventListener("beforeprint",buildPrint);
addEventListener("afterprint",()=>stage.querySelectorAll("a[data-h0]").forEach(a=>{a.setAttribute("href",a.dataset.h0);delete a.dataset.h0}));

/* --- tilt suave (cards hologram) --- */
function tilt(el){if(REDMO||!el)return;el.classList.add("tilt");el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.style.transform=`perspective(1100px) rotateX(${(0.5-py)*6}deg) rotateY(${(px-0.5)*6}deg)`});el.addEventListener("pointerleave",()=>{el.style.transform=""})}

/* boot é chamado ao final de slides.js */
function badgeText(el){const t=el.textContent.trim();if(/^(E|Evidência)$/i.test(t))return"";return t.replace(/^E\s*·\s*/,"")}
function plainBadges(root){const r=root||document,sel=root?"":"#stage > .slide ";r.querySelectorAll(sel+".ev").forEach(el=>{const x=badgeText(el);if(!x){el.remove();return}el.className="srcx";el.textContent="Fonte: "+x});
  r.querySelectorAll(sel+".hy").forEach(el=>{const x=el.textContent.trim();el.className="srcx";el.textContent=/^(H|Hipótese)$/i.test(x)?"proposta DTS":x})}
function boot(){plainBadges();fit();const h=location.hash.slice(1);if(h.startsWith("p=")){activate(ONEPAGE-1,true);openPD(h.slice(2));if(!pdOpen)history.replaceState(null,"","#"+ONEPAGE)}else{const h0=parseInt(h,10);activate(isNaN(h0)?0:clamp(h0-1,0,N-1),true)}}
