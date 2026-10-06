/* =====================================================================
   NÚCLEO · chrome, navegação cinematográfica, painéis, fichas de produto
   (depende de engine.js e data.js)
   ===================================================================== */
const stage=$("stage");
const slides=[...stage.querySelectorAll(":scope > .slide")],N=slides.length;let cur=0,busy=false;
const ENTER={};          // hooks por data-t
const BRAND="A&M · DTS · PORTFÓLIO ESTRATÉGICO 2027";

/* --- chrome: cabeçalho, faixa, rodapé --- */
slides.forEach((s,i)=>{
  if(s.dataset.band){
    const top=H("div",{class:"sr-top"});const p=(s.dataset.p||"");
    top.innerHTML=`${AMDECO}${amLogo(30)}<div class="am-div"></div>${dtsLogo(30)}<div class="am-div"></div><div class="am-title"><b>${s.dataset.t}</b><span>${p}</span></div><div class="am-right"><span class="am-dot"></span>Planejamento estratégico de portfólio<span class="am-chip">${i+1} / ${N}</span></div>`;
    s.prepend(top);s.prepend(H("div",{class:"sr-dec"},null,"▸▸▸▸▸▸▸▸▸▸▸▸"));
    const band=H("div",{class:"sr-band "+(s.dataset.c||"c-navy")});band.innerHTML=`<span>›</span><span class="bt">${s.dataset.band}</span>${s.dataset.bs?`<small>${s.dataset.bs}</small>`:""}`;top.after(band);kin(band.querySelector(".bt"));
  }
  if(s.hasAttribute("data-nofoot"))return;
  const f=H("div",{class:"foot"},s);H("b",null,f,BRAND);if(s.dataset.src)H("span",{class:"s",title:s.dataset.src},f,s.dataset.src);H("span",{class:"n"},f,`${i+1} / ${N}`);
});
document.querySelectorAll(".kin").forEach(kin);

/* --- vistas dentro do mesmo slide (ex.: cliente | mercado) --- */
const PANE={};
slides.forEach(s=>{if(!s.dataset.panes)return;const panes=[...s.querySelectorAll(":scope > .pane")],band=s.querySelector(".sr-band");const sm=band.querySelector("small");if(sm)sm.remove();
  const sg=H("div",{class:"bseg"},band);const btns=s.dataset.panes.split("|").map((l,k)=>{const b=H("button",{class:k?"":"on"},sg,`${k+1} · ${l}`);b.addEventListener("click",e=>{e.stopPropagation();setPane(s,k)});return b});
  PANE[s.dataset.t]={s,panes,btns,k:0}});
function setPane(s,k){const P=PANE[s.dataset.t];if(!P)return;P.k=k;P.panes.forEach((p,j)=>p.classList.toggle("on",j===k));P.btns.forEach((b,j)=>b.classList.toggle("on",j===k));
  const pn=P.panes[k],bt=s.querySelector(".sr-band .bt");if(bt&&pn.dataset.paneBand){bt.textContent=pn.dataset.paneBand;kin(bt)}
  const fs=s.querySelector(".foot .s");if(fs&&pn.dataset.paneSrc){fs.textContent=pn.dataset.paneSrc;fs.title=pn.dataset.paneSrc}
  tipEl.classList.remove("on");if(infoP.classList.contains("on"))fillInfo()}
function paneStep(d){const P=PANE[slides[cur].dataset.t];if(!P)return false;if(d>0&&P.k<P.panes.length-1){setPane(P.s,P.k+1);return true}if(d<0&&P.k>0){setPane(P.s,P.k-1);return true}return false}

/* --- transição de capítulo (capa do pilar sem ocupar um slide) --- */
const CHAPTERS={};const chapEl=H("div",{id:"chap"},stage);let chapOn=null;
function showChapter(p,done){chapEl.innerHTML="";chapEl.classList.remove("play");chapEl.classList.add("on");void chapEl.offsetWidth;chapEl.classList.add("play");const cleanup=CHAPTERS[p](chapEl)||(()=>{});chapOn={done,cleanup}}
function hideChapter(run){if(!chapOn)return;const c=chapOn;chapOn=null;const a=chapEl.animate([{opacity:1},{opacity:0}],{duration:REDMO?1:380});a.onfinish=()=>{if(chapOn)return;chapEl.classList.remove("on","play");chapEl.innerHTML="";c.cleanup()};if(run)c.done();else c.cleanup()}
chapEl.addEventListener("click",e=>{if(e.target.closest("button"))return;hideChapter(true)});

/* --- controles --- */
const ctr=H("div",{id:"controls"},document.body);
ctr.innerHTML=`<button class="k" id="bProd" title="Fichas de produto (P)">▦ <span class="lb">Fichas de produto</span></button><button class="g" id="bInfo" title="Sobre este slide (I)">ⓘ <span class="lb">Sobre este slide</span></button><button class="g" id="bPrev">← <span class="lb">Voltar</span></button><span class="c" id="cnt" title="Índice"></span><button class="p" id="bNext"><span class="lb">Avançar</span> →</button>`;
H("div",{id:"progress"},document.body);
const tipEl=H("div",{id:"tip",html:"<b></b><span></span>"},document.body);
const infoP=H("div",{class:"panel",id:"infoP",html:`<button class="px" aria-label="Fechar">×</button><div class="ie">Sobre este slide</div><div class="it"></div><div class="id"></div>`},document.body);
const idxP=H("div",{class:"panel",id:"idxP",html:`<div class="xh">Roteiro da apresentação<button class="px" style="position:static" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const pdxP=H("div",{class:"panel",id:"pdxP",html:`<div class="xh">Fichas de produto · novo portfólio<button class="px" style="position:static" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const panels=[infoP,idxP,pdxP];
function closePanels(except){panels.forEach(p=>{if(p!==except)p.classList.remove("on")});$("bInfo").classList.toggle("on",except===infoP&&infoP.classList.contains("on"));$("cnt").classList.toggle("on",except===idxP&&idxP.classList.contains("on"));$("bProd").classList.toggle("on",except===pdxP&&pdxP.classList.contains("on"))}
function togglePanel(p){p.classList.toggle("on");closePanels(p)}
panels.forEach(p=>p.querySelector(".px").onclick=()=>{p.classList.remove("on");closePanels(null)});
$("bInfo").onclick=()=>{fillInfo();togglePanel(infoP)};$("cnt").onclick=()=>{fillIdx();togglePanel(idxP)};$("bProd").onclick=()=>{fillPdx();togglePanel(pdxP)};
function fillInfo(){const s=pdOpen?null:slides[cur];const P=pdOpen?PRODUCTS.find(x=>x.id===pdOpen):null;
  infoP.querySelector(".it").textContent=P?P.name:s.dataset.t;
  infoP.querySelector(".id").innerHTML=P?`<p>Ficha de produto do novo portfólio DTS. Status: <b>${STATUS[P.st][0]}</b>. Origem: ${P.from}.</p><p>${P.ev||""}</p><p>Legenda: ${ev()} dado com fonte · ${hy()} proposta/hipótese a validar.</p>`:(s.querySelector("template.info")?s.querySelector("template.info").innerHTML:(s.dataset.src||""))}
function fillIdx(){const xl=idxP.querySelector(".xl");xl.innerHTML="";let last="";slides.forEach((s,i)=>{const g=s.dataset.p||"Abertura";if(g!==last){H("div",{class:"xg"},xl,g);last=g}const b=H("button",{class:"xi"+(i===cur&&!pdOpen?" cur":"")},xl);H("b",null,b,String(i+1).padStart(2,"0"));H("span",null,b,s.dataset.t);b.onclick=()=>{idxP.classList.remove("on");closePanels(null);closePD(true);go(i)}})}
function fillPdx(){const xl=pdxP.querySelector(".xl");xl.innerHTML="";PILLARS.forEach(pl=>{H("div",{class:"xg"},xl,`Pilar ${pl.n} · ${pl.name}`);PRODUCTS.filter(p=>p.pillar===pl.n).forEach(p=>{const b=H("button",{class:"xi"+(pdOpen===p.id?" cur":"")},xl);H("b",null,b,p.code);H("span",null,b,p.name);H("span",{html:stTag(p.st)},b);b.onclick=()=>{pdxP.classList.remove("on");closePanels(null);openPD(p.id)}})})}

/* --- trilha narrativa --- */
const PARTS=[...new Set(slides.map(s=>s.dataset.p||"Abertura"))];
const rail=H("div",{id:"rail"},document.body);
const RAIL=PARTS.map(n=>{const idx=slides.map((s,i)=>(s.dataset.p||"Abertura")===n?i:-1).filter(i=>i>=0);const d=H("div",{class:"seg2",style:`width:${Math.max(70,idx.length*20)}px`},rail);H("span",null,d,n.replace(/^Pilar (\d) · .*/,"Pilar $1").replace("Novo portfólio","Portfólio"));const bar=H("i",null,d);const b=H("b",null,bar);d.onclick=()=>{closePD(true);go(idx[0])};d.title=n;return{idx,d,b}});

/* --- escala do palco --- */
function fit(){const vw=innerWidth,vh=innerHeight,sm=vw<760,pad=sm?8:22,bar=sm?54:64,sc=Math.min((vw-pad*2)/1600,(vh-pad-bar)/900);stage.style.left=vw/2+"px";stage.style.top=(pad+(vh-pad-bar)/2)+"px";stage.style.transform=`translate(-50%,-50%) scale(${sc})`}
addEventListener("resize",fit);

/* --- ativação --- */
function activate(i,inst,back,noEnter){tipEl.classList.remove("on");const n=slides[i];if(PANE[n.dataset.t])setPane(n,back?PANE[n.dataset.t].panes.length-1:0);slides.forEach((s,k)=>{if(k!==i)s.classList.remove("active","entering","play","back")});n.classList.remove("play","entering","back");void n.offsetWidth;n.classList.add("active","play");if(!inst){n.classList.add("entering");if(back)n.classList.add("back")}cur=i;
  $("cnt").textContent=`${i+1} / ${N}`;$("progress").style.width=((i+1)/N*100)+"%";$("bPrev").disabled=i===0;$("bNext").disabled=i===N-1;
  if(!pdOpen)history.replaceState(null,"","#"+(i+1));
  RAIL.forEach(r=>{const k=r.idx.indexOf(i),on=k>=0;r.d.classList.toggle("on",on);r.b.style.width=on?((k+1)/r.idx.length*100)+"%":(r.idx[0]<i?"100%":"0")});
  n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));
  if(infoP.classList.contains("on"))fillInfo();
  if(noEnter)return;const fn=ENTER[n.dataset.t];if(fn)setTimeout(fn,inst?0:60)}
function go(i,inst){i=clamp(i,0,N-1);if(i===cur&&!inst)return;if(busy)return;const back=i<cur;if(chapOn)hideChapter(false);
  const np=slides[i].dataset.p,chap=!back&&np!==slides[cur].dataset.p&&CHAPTERS[np];
  if(inst||REDMO){activate(i,true,back);if(chap&&!inst)showChapter(np,()=>{});return}
  busy=true;const w=$("wipe");w.style.visibility="visible";const bars=[...w.querySelectorAll("i")],dir=back?-1:1;
  bars.forEach((b,k)=>b.animate([{transform:`translateX(${-110*dir}%) skewX(-12deg)`},{transform:"translateX(0) skewX(-12deg)"}],{duration:420,delay:k*70,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));
  setTimeout(()=>{if(chap){activate(i,true,back,true);const n=slides[i];n.classList.remove("play");showChapter(np,()=>{void n.offsetWidth;n.classList.add("play");n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));const fn=ENTER[n.dataset.t];if(fn)setTimeout(fn,60)})}else activate(i,false,back);bars.forEach((b,k)=>b.animate([{transform:"translateX(0) skewX(-12deg)"},{transform:`translateX(${110*dir}%) skewX(-12deg)`}],{duration:460,delay:(2-k)*70,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));setTimeout(()=>{w.style.visibility="hidden";busy=false},640)},560)}
/* passos internos: slides podem consumir o "avançar" (ex.: spotlight, timeline) */
const STEP={};
function next(){if(pdOpen){pdStep(1);return}if(chapOn){hideChapter(true);return}const f=STEP[slides[cur].dataset.t];if(f&&f(1))return;if(paneStep(1))return;go(cur+1)}
function prev(){if(pdOpen){pdStep(-1);return}if(chapOn){hideChapter(false);slides[cur].classList.add("play");go(cur-1);return}const f=STEP[slides[cur].dataset.t];if(f&&f(-1))return;if(paneStep(-1))return;go(cur-1)}
$("bNext").onclick=next;$("bPrev").onclick=prev;
addEventListener("keydown",e=>{if(e.target.tagName==="INPUT"||e.defaultPrevented)return;
  if(e.key==="Escape"&&chapOn){hideChapter(true);return}
  if(e.key==="Escape"){if(panels.some(p=>p.classList.contains("on"))){panels.forEach(p=>p.classList.remove("on"));closePanels(null)}else if(pdOpen)closePD();return}
  if(["ArrowRight","PageDown"," "].includes(e.key)){e.preventDefault();next()}else if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();prev()}
  else if(e.key==="Home"){closePD(true);go(0)}else if(e.key==="End"){closePD(true);go(N-1)}
  else if(e.key==="f"||e.key==="F"){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}
  else if(e.key==="i"||e.key==="I"){$("bInfo").click()}else if(e.key==="p"||e.key==="P"){$("bProd").click()}});
let tx=null;addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});addEventListener("touchend",e=>{if(tx==null||e.target.closest(".ba,.cs-scene"))return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60)dx<0?next():prev();tx=null},{passive:true});
addEventListener("pointermove",e=>{const el=e.target.closest&&e.target.closest("[data-tv]");if(el){tipEl.querySelector("b").textContent=el.dataset.tv;if(el.dataset.th)tipEl.querySelector("span").innerHTML=el.dataset.th;else tipEl.querySelector("span").textContent=el.dataset.tl;tipEl.classList.add("on");tipEl.style.left=Math.min(e.clientX+14,innerWidth-350)+"px";tipEl.style.top=Math.min(e.clientY+14,innerHeight-120)+"px"}else tipEl.classList.remove("on")});
/* ripple */
document.addEventListener("pointerdown",e=>{if(REDMO)return;const el=e.target.closest(".prod,.tobe-card,.clk,#controls button");if(!el)return;if(getComputedStyle(el).position==="static")el.style.position="relative";const r=el.getBoundingClientRect(),sc=stage.contains(el)?stage.getBoundingClientRect().width/1600:1,x=(e.clientX-r.left)/sc,y=(e.clientY-r.top)/sc,size=Math.max(r.width,r.height)/sc*1.1;const sp=H("span",{class:"rp",style:`width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`},el);setTimeout(()=>sp.remove(),650)});
/* links internos para fichas: qualquer [data-pd] */
stage.addEventListener("click",e=>{const a=e.target.closest("[data-pd]");if(!a)return;e.preventDefault();openPD(a.dataset.pd)});
stage.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();closePD(true);go(+a.dataset.go-1)});

/* =====================================================================
   FICHA DE PRODUTO (página de detalhamento · hiperlink #p=<id>)
   ===================================================================== */
const pd=H("div",{id:"pd"},stage);let pdOpen=null,pdFrom=0;
const evb=t=>t.replace(/\s*\[E · ([^\]]+)\]/g,' <span class="ev">E · $1</span>').replace(/\s*\[E\]/g,' <span class="ev">E</span>');
function pdHTML(P,num){const pl=PILLARS.find(x=>x.n===P.pillar);
  const steps=P.steps.map((s,i)=>`<div class="pd-step"><div class="w">${String(i+1).padStart(2,"0")} · ${s[0]}</div><b>${s[1]}</b><span>${s[2]}</span></div>`).join("");
  const li=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  return `<div class="sr-dec">▸▸▸▸▸▸▸▸▸▸▸▸</div>
  <div class="sr-top">${AMDECO}${amLogo(30)}<div class="am-div"></div>${dtsLogo(30)}<div class="am-div"></div><div class="am-title"><b>Ficha de produto · ${P.code}</b><span>Pilar ${pl.n} · ${pl.name}</span></div><div class="am-right"><span class="am-dot"></span>Página de detalhamento<span class="am-chip">${num} / ${PRODUCTS.length}</span></div></div>
  <div class="sr-band ${P.st==="new"?"c-gold":P.st==="ai"?"c-blue":"c-navy"}"><span>›</span><span class="bt">${P.name}</span><small>${P.tagline}</small></div>
  <div class="body">
    <div class="pd-top">
      <div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${stTag(P.st)}${P.sig?`<span class="st" style="background:#122143">★ A&amp;M Signature</span>`:""}<span class="small" style="font-size:11.5px">Origem: <b style="color:#002B49">${P.from}</b></span></div>
        <div class="pd-pitch">${P.pitch}</div>
        <div class="pd-meta">${P.meta.map(m=>`<span>${m}</span>`).join("")}</div></div>
      <div class="pd-kpis">${P.kpis.map(k=>`<div class="pd-kpi"><b>${k[0]}</b><span>${evb(k[1])}</span></div>`).join("")}</div>
    </div>
    <div class="pd-grid">
      <div class="pd-box"><div class="h"><i>1</i>Público-alvo</div>${li(P.who)}</div>
      <div class="pd-box"><div class="h"><i>2</i>Problema resolvido</div>${li(P.pain)}</div>
      <div class="pd-box"><div class="h"><i>3</i>Entregáveis</div>${li(P.deliv)}</div>
    </div>
    <div class="pd-box" style="margin-top:10px"><div class="h"><i>4</i>Método e etapas<span style="margin-left:auto;font:600 11px var(--fb);letter-spacing:0;text-transform:none;color:var(--muted)">Skills aplicadas: ${P.skills.map(s=>`<span class="pd-skill">${s}</span>`).join("")}</span></div><div class="pd-steps">${steps}</div></div>
    <div class="pd-grid" style="grid-template-columns:1.05fr 1fr 1.05fr">
      <div class="pd-box"><div class="h"><i>5</i>Ferramentas · sistemas · dados</div><p><b>Ferramentas:</b> ${P.tools}</p><p style="margin-top:5px"><b>Dados utilizados:</b> ${P.data}</p></div>
      <div class="pd-box ai holo" style="--hd:1.2s"><div class="h"><i>6</i>Papel da IA</div>${li(P.ai)}</div>
      <div class="pd-box prodz"><div class="h"><i>7</i>Do serviço ao produto comercializável</div>${li(P.prodz)}</div>
    </div>
    <div class="pd-bench">${P.bench}</div>
  </div>`}
function renderPD(id){const k=PRODUCTS.findIndex(x=>x.id===id);if(k<0)return false;const P=PRODUCTS[k];pd.innerHTML=pdHTML(P,k+1);
  const ft=H("div",{class:"pd-foot"},pd);const rel=H("div",{class:"rel",html:`<span>Outros produtos do pilar</span>${PRODUCTS.filter(x=>x.pillar===P.pillar&&x.id!==P.id).map(x=>`<a href="#p=${x.id}" data-pd="${x.id}" class="plink sm ${x.st}">${x.code} ${x.name}</a>`).join("")}`},ft);
  const nav=H("div",{class:"pd-nav",style:"position:static"},ft);const bk=H("button",{class:"bk"},nav,"← Voltar à apresentação");bk.onclick=()=>closePD();
  const bp=H("button",null,nav,"‹ Anterior");bp.onclick=()=>pdStep(-1);const bn=H("button",null,nav,"Próxima ›");bn.onclick=()=>pdStep(1);
  const op=H("button",null,nav,"One-page");op.onclick=()=>{closePD(true);go(ONEPAGE-1)};
  kin(pd.querySelector(".sr-band .bt"));pd.classList.remove("play");void pd.offsetWidth;pd.classList.add("play");return true}
function openPD(id){if(!pdOpen)pdFrom=cur;if(!renderPD(id))return;pdOpen=id;pd.classList.remove("on");void pd.offsetWidth;pd.classList.add("on");history.replaceState(null,"","#p="+id);$("bPrev").disabled=false;$("bNext").disabled=false;$("cnt").textContent=`Ficha ${PRODUCTS.findIndex(x=>x.id===id)+1}/${PRODUCTS.length}`;if(infoP.classList.contains("on"))fillInfo()}
function closePD(silent){if(!pdOpen)return;pdOpen=null;pd.classList.remove("on");if(!silent){activate(pdFrom,true)}else{$("cnt").textContent=`${cur+1} / ${N}`;$("bPrev").disabled=cur===0;$("bNext").disabled=cur===N-1;history.replaceState(null,"","#"+(cur+1))}}
function pdStep(d){const k=PRODUCTS.findIndex(x=>x.id===pdOpen);const n=(k+d+PRODUCTS.length)%PRODUCTS.length;openPD(PRODUCTS[n].id)}
/* versão de impressão: fichas como páginas ao final */
const PRINT=[];
function buildPrint(){PRINT.forEach(f=>{try{f()}catch(e){}});if(stage.querySelector(".pd-print"))return;
  /* vistas extras dos slides com duas vistas viram páginas próprias no PDF */
  Object.values(PANE).forEach(P=>{for(let k=P.panes.length-1;k>=1;k--){const c=P.s.cloneNode(true);c.classList.add("pane-print");c.classList.remove("active");const ps=[...c.querySelectorAll(":scope > .pane")];ps.forEach((x,j)=>{if(j!==k)x.remove();else x.classList.add("on")});const pn=P.panes[k];const bt=c.querySelector(".sr-band .bt");if(bt)bt.textContent=pn.dataset.paneBand;const fs=c.querySelector(".foot .s");if(fs)fs.textContent=pn.dataset.paneSrc;c.querySelectorAll(".bseg button").forEach((b,j)=>b.classList.toggle("on",j===k));P.s.after(c)}P.panes.forEach((x,j)=>x.classList.toggle("on",j===0));P.btns.forEach((b,j)=>b.classList.toggle("on",j===0))});PRODUCTS.forEach((P,k)=>{const sec=H("section",{class:"pd-print slide",html:pdHTML(P,k+1)},stage);sec.classList.add("play")})}
addEventListener("beforeprint",buildPrint);

/* --- tilt suave em cards marcados --- */
function tilt(el){if(REDMO)return;el.classList.add("tilt");el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.style.transform=`perspective(900px) rotateX(${(0.5-py)*5}deg) rotateY(${(px-0.5)*5}deg) translateZ(4px)`});el.addEventListener("pointerleave",()=>{el.style.transform=""})}

/* boot é chamado ao final de slides.js */
function plainBadges(){document.querySelectorAll("#stage > .slide .ev").forEach(el=>{const t=el.textContent.trim().replace(/^E(\s*·\s*)?/,"");if(!t){el.remove();return}el.className="srcx";el.textContent="Fonte: "+t});
  document.querySelectorAll("#stage > .slide .hy").forEach(el=>{const t=el.textContent.trim();el.className="srcx";if(/^(H|Hipótese)$/i.test(t))el.textContent="proposta DTS"})}
function boot(){plainBadges();fit();const h=location.hash.slice(1);if(h.startsWith("p=")){activate(ONEPAGE-1,true);openPD(h.slice(2))}else{const h0=parseInt(h,10);activate(isNaN(h0)?0:clamp(h0-1,0,N-1),true)}}
