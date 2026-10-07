/* =====================================================================
   SLIDES · conteúdo renderizado e ganchos de entrada
   ===================================================================== */
const ONEPAGE=slides.findIndex(s=>s.dataset.t==="One-page · novo portfólio")+1;
const PBY=c=>PRODUCTS.find(p=>p.code===c);
const plink=(c,cls)=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="plink ${cls||""} ${p.st}" title="Abrir ficha: ${p.name}">${p.code} ${p.name}</a>`:""};
const strip=h=>h.replace(/<[^>]+>/g,"");
/* chip só com o código (onde falta espaço): o nome completo vai na dica e o clique abre a ficha */
const pcode=(c,cls)=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="plink ${cls||""} ${p.st}" data-tv="${p.code} · ${p.name}" data-tl="Clique para abrir a ficha.">${p.code}</a>`:""};
const ICO={spark:'<path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>',doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>',deal:'<path d="M3 12l4-4 4 3 3-3 7 6"/><path d="M3 18h18"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.6-.9-1.5-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.9 0 2.8 5 1.5 5 4.2 0 1.2-1.1 2-2.5 2-1.1 0-2.1-.4-2.7-1.3M12 6.5v1.8M12 16.4v1.6"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',people:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 14.5c3 0 6 2 6 5.5"/>'};
const ico=(k,c)=>`<svg class="i24" viewBox="0 0 24 24" style="color:${c||"currentColor"}">${ICO[k]}</svg>`;

/* ---------- morph scene (capa e capas de pilar) ---------- */
function MorphScene(svg,cfg){const W=640,cx=320,cy=300,R=170;svg.innerHTML="";const id="g"+Math.random().toString(36).slice(2,7);
  const df=S("defs",null,svg),lg=S("linearGradient",{id,x1:0,y1:0,x2:1,y2:1},df);S("stop",{offset:0,"stop-color":"#4A6FA5"},lg);S("stop",{offset:.6,"stop-color":"#13315C"},lg);S("stop",{offset:1,"stop-color":"#071A33"},lg);
  const rg=S("radialGradient",{id:id+"r"},df);S("stop",{offset:0,"stop-color":"rgba(242,107,33,.35)"},rg);S("stop",{offset:1,"stop-color":"rgba(242,107,33,0)"},rg);
  S("circle",{cx,cy,r:285,fill:`url(#${id}r)`,opacity:.55},svg);
  S("circle",{cx,cy,r:250,fill:"none",stroke:"rgba(255,255,255,.08)","stroke-width":1,"stroke-dasharray":"2 7"},svg);
  const outer=S("path",{fill:`url(#${id})`,stroke:"rgba(163,184,214,.65)","stroke-width":2,opacity:.95},svg);
  const inner=S("path",{fill:"none",stroke:"rgba(255,138,76,.8)","stroke-width":2,"stroke-dasharray":"5 6"},svg);
  const mx=Math.max(...cfg.states.map(s=>s.dots));const dots=[];for(let k=0;k<mx;k++){const c=S("circle",{cx:0,cy:0,r:7,fill:"#A3B8D6"},svg);c.style.transition="transform 1.1s cubic-bezier(.65,0,.35,1),fill .6s,opacity .6s";dots.push(c)}
  const g=S("g",{style:"transition:opacity .35s"},svg);const t1=T(g,cx,cy-6,"",{"text-anchor":"middle",fill:"#fff",style:"font:800 70px var(--fb);letter-spacing:-.04em"});const t2=T(g,cx,cy+30,"",{"text-anchor":"middle",fill:"#FF8A4C",style:"font:500 12px var(--fm);letter-spacing:.2em"});const t3=T(g,cx,cy+52,"",{"text-anchor":"middle",fill:"#C9D6E8",style:"font:500 13px var(--fb)"});
  const rnd=k=>{const a=Math.sin(k*12.9898)*43758.5453;return a-Math.floor(a)};
  const shapes=cfg.states.map(s=>({pts:s.shape==="blob"?SHAPES.blob(cx,cy,R,.6):s.shape==="hex"?SHAPES.hex(cx,cy,R*1.08):s.shape==="square"?SHAPES.square(cx,cy,R*1.75,26):SHAPES.circle(cx,cy,R)}));
  const innerPts=cfg.states.map(s=>s.shape==="blob"?SHAPES.blob(cx,cy,R*.72,2.2):s.shape==="hex"?SHAPES.hex(cx,cy,R*.74):s.shape==="square"?SHAPES.square(cx,cy,R*1.2,18):SHAPES.circle(cx,cy,R*.74));
  const btns=cfg.btnHost?cfg.states.map((s,k)=>{const b=H("button",{class:"pill"},cfg.btnHost,s.btn);b.onclick=()=>mp.go(k,true);return b}):[];
  function place(k){const st=cfg.states[k];dots.forEach((d,j)=>{let x,y,op=1,fill="#A3B8D6";if(j>=st.dots){op=0;x=cx;y=cy}else if(st.shape==="blob"){const a=rnd(j+1)*Math.PI*2,rr=205+rnd(j+7)*70;x=cx+rr*Math.cos(a);y=cy+rr*Math.sin(a);fill="#6E8FBF"}else{const a=-Math.PI/2+j*2*Math.PI/st.dots;x=cx+245*Math.cos(a);y=cy+245*Math.sin(a);fill=st.ai&&j<st.ai?"#F26B21":"#fff";if(st.ai&&j>=st.ai)fill="#A3B8D6"}
      d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=op;d.setAttribute("fill",fill)});
    g.style.opacity=0;setTimeout(()=>{t1.textContent=st.big;t2.textContent=st.lab;t3.textContent=st.sub||"";g.style.opacity=1},350);
    btns.forEach((b,j)=>b.classList.toggle("on",j===k))}
  const mp=Morpher({path:outer,states:shapes,dwell:cfg.dwell||2400,onState:(k)=>{place(k);morphTo(inner,readPts(inner),innerPts[k],1150)}});
  function readPts(p){const d=p.getAttribute("d");if(!d)return innerPts[0];return d.slice(1,-1).split("L").map(s=>s.split(" ").map(Number))}
  inner.setAttribute("d",toD(innerPts[0]));place(0);return mp}

/* ---------- capa · Particle System ---------- */
(function(){const sec=slides.find(x=>x.dataset.t==="Capa"),root=$("ps"),cv=root.querySelector(".ps__cv"),title=root.querySelector(".ps__title");
  $("cvLogos").innerHTML=`${amLogo(26)}<span class="brand-div" style="height:30px;background:rgba(163,184,214,.3)"></span>${dtsLogo(28)}`;
  const nOut=root.querySelector("[data-n]"),linksOut=root.querySelector("[data-links]"),fpsOut=root.querySelector("[data-fps]");
  const W=1600,H=900,dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  let ctx=cv.getContext("2d",{alpha:true});if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);
  const P=[],pulses=[];let count=90,mode="repel",cursor=null,idle=0,lost=false,links=0,fpsAcc=0,fpsN=0,running=false,raf=0,last=0;
  const SPEED=REDMO?.07:.28,LINK=()=>Math.min(130,70+3600/count),CUR=150;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const spawn=()=>{const hub=Math.random()<.07;return{x:rnd(0,W),y:rnd(0,H),vx:rnd(-1,1)*SPEED,vy:rnd(-1,1)*SPEED,r:hub?rnd(2.8,3.6):rnd(1.2,2.2),hub}};
  const setCount=n=>{count=REDMO?Math.min(n,60):n;while(P.length<count)P.push(spawn());P.length=count;nOut.textContent=String(count)};
  setCount(count);
  cv.addEventListener("contextlost",ev=>{ev.preventDefault();lost=true});cv.addEventListener("contextrestored",()=>{ctx=cv.getContext("2d");if(ctx){ctx.setTransform(dpr,0,0,dpr,0,0);lost=false}});
  const toLocal=ev=>{const r=cv.getBoundingClientRect(),sc=r.width/W;return{x:(ev.clientX-r.left)/sc,y:(ev.clientY-r.top)/sc}};
  root.addEventListener("pointermove",ev=>{cursor=toLocal(ev);idle=0});root.addEventListener("pointerleave",()=>{cursor=null});
  root.addEventListener("pointerdown",ev=>{if(ev.target.closest("button"))return;const c=toLocal(ev);pulses.push({x:c.x,y:c.y,r:0,a:1})});
  root.querySelector("[data-pulse]").addEventListener("click",()=>pulses.push({x:W*.66,y:H*.5,r:0,a:1}));
  root.querySelectorAll("[data-density]").forEach(b=>b.addEventListener("click",()=>{root.querySelectorAll("[data-density]").forEach(x=>x.classList.toggle("is-on",x===b));setCount(parseInt(b.dataset.density,10))}));
  root.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{root.querySelectorAll("[data-mode]").forEach(x=>x.classList.toggle("is-on",x===b));mode=b.dataset.mode}));
  function frame(t){if(!running)return;const dt=Math.min(64,t-last);last=t;
    if(ctx&&!lost){const k=dt/16.7,L=LINK(),L2=L*L;
      for(let i=0;i<P.length;i++){const p=P[i];
        if(cursor){const dx=p.x-cursor.x,dy=p.y-cursor.y,d2=dx*dx+dy*dy;if(d2<CUR*CUR&&d2>1){const d=Math.sqrt(d2),g=REDMO?.3:1;if(mode==="repel"){const f=(1-d/CUR)*.9*g*k;p.vx+=dx/d*f;p.vy+=dy/d*f}else{const f=((d-62)/CUR)*1.1*g*k,sw=(1-d/CUR)*.3*g*k;p.vx+=-dx/d*f-dy/d*sw;p.vy+=-dy/d*f+dx/d*sw}}}
        for(let q=0;q<pulses.length;q++){const u=pulses[q],dx=p.x-u.x,dy=p.y-u.y,d=Math.sqrt(dx*dx+dy*dy);if(d>2&&Math.abs(d-u.r)<22){const f=(REDMO?.4:1.4)*k*u.a;p.vx+=dx/d*f;p.vy+=dy/d*f}}
        p.vx*=.975;p.vy*=.975;const sp=Math.sqrt(p.vx*p.vx+p.vy*p.vy),max=REDMO?1.2:3.2;if(sp>max){p.vx*=max/sp;p.vy*=max/sp}
        if(sp<SPEED*.6){p.vx+=rnd(-.02,.02)*k;p.vy+=rnd(-.02,.02)*k}
        p.x+=p.vx*k;p.y+=p.vy*k;if(p.x<0){p.x=0;p.vx=Math.abs(p.vx)}else if(p.x>W){p.x=W;p.vx=-Math.abs(p.vx)}if(p.y<0){p.y=0;p.vy=Math.abs(p.vy)}else if(p.y>H){p.y=H;p.vy=-Math.abs(p.vy)}}
      for(let q=pulses.length-1;q>=0;q--){const u=pulses[q];u.r+=(REDMO?3:6)*k;u.a-=.018*k;if(u.a<=0)pulses.splice(q,1)}
      idle+=dt;const cf=cursor?Math.max(0,Math.min(1,1-(idle-400)/600)):0;
      ctx.clearRect(0,0,W,H);links=0;ctx.lineWidth=1;
      for(let i=0;i<P.length;i++){const a=P[i];for(let j=i+1;j<P.length;j++){const b=P[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<L2){const al=(1-Math.sqrt(d2)/L)*.55;ctx.strokeStyle=`rgba(163,184,214,${al.toFixed(3)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();links++}}}
      if(cursor&&cf>0){for(let i=0;i<P.length;i++){const p=P[i],dx=p.x-cursor.x,dy=p.y-cursor.y,d=Math.sqrt(dx*dx+dy*dy);if(d<CUR){ctx.strokeStyle=`rgba(255,138,76,${((1-d/CUR)*.5*cf).toFixed(3)})`;ctx.beginPath();ctx.moveTo(cursor.x,cursor.y);ctx.lineTo(p.x,p.y);ctx.stroke()}}ctx.strokeStyle=`rgba(255,138,76,${(.3*cf).toFixed(3)})`;ctx.beginPath();ctx.arc(cursor.x,cursor.y,CUR,0,Math.PI*2);ctx.stroke()}
      for(let q=0;q<pulses.length;q++){const u=pulses[q];ctx.strokeStyle=`rgba(255,255,255,${(u.a*.5).toFixed(3)})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(u.x,u.y,u.r,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1}
      for(let i=0;i<P.length;i++){const p=P[i];ctx.fillStyle=p.hub?"#FF8A4C":"#C9D6E8";if(p.hub){ctx.shadowColor="rgba(255,138,76,.9)";ctx.shadowBlur=10}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
      fpsAcc+=dt;fpsN++;if(fpsN>=20){fpsOut.textContent=String(Math.round(1000/(fpsAcc/fpsN)));linksOut.textContent=String(links);fpsAcc=0;fpsN=0}}
    raf=requestAnimationFrame(frame)}
  function start(){if(running)return;running=true;last=performance.now();raf=requestAnimationFrame(frame)}
  function stop(){running=false;cancelAnimationFrame(raf)}
  new MutationObserver(()=>{if(!sec.classList.contains("active"))stop()}).observe(sec,{attributes:true,attributeFilter:["class"]});
  ENTER["Capa"]=()=>{start();title.style.transition="none";title.style.opacity=0;title.style.transform="translateY(14px)";void title.offsetWidth;title.style.transition=REDMO?"none":"opacity .7s cubic-bezier(.22,.61,.36,1) .15s,transform .7s cubic-bezier(.22,.61,.36,1) .15s";title.style.opacity=1;title.style.transform="none"};
  PRINT.push(()=>{title.style.opacity=1;title.style.transform="none";if(!running){start();setTimeout(stop,400)}})})();

/* ---------- contexto · Shimmer / Holographic Sweep ---------- */
(function(){const root=$("sh"),vals=[...root.querySelectorAll(".sh__val")],kpis=[...root.querySelectorAll("[data-kpi]")],rows=[...root.querySelectorAll("[data-w]")],badge=root.querySelector("[data-badge]"),btn=root.querySelector("[data-load]"),status=root.querySelector("[data-status]");
  const fmt=(v,dec)=>v.toLocaleString("pt-BR",{minimumFractionDigits:dec,maximumFractionDigits:dec}),AUTO=REDMO?500:1000;let loaded=false,timers=[],rafs=[],t0=0,tick=0,mode="periodic";
  const clearAll=()=>{timers.forEach(clearTimeout);timers=[];rafs.forEach(cancelAnimationFrame);rafs=[];clearInterval(tick)};
  const clock=()=>{const left=Math.max(0,AUTO-(performance.now()-t0));status.textContent="carregando em "+(left/1000).toFixed(1).replace(".",",")+" s…"};
  const tween=(out,v,dec,dur)=>{const s0=performance.now();const st=t=>{const k=Math.min(1,(t-s0)/dur),e=k===1?1:1-Math.pow(2,-10*k);out.textContent=fmt(v*e,dec);if(k<1)rafs.push(requestAnimationFrame(st))};rafs.push(requestAnimationFrame(st))};
  function load(){if(loaded)return;loaded=true;clearAll();const took=((performance.now()-t0)/1000).toFixed(1).replace(".",",");root.classList.add("is-loaded");btn.textContent="↻ Recarregar";status.textContent="conteúdo real · "+took+" s";
    vals.forEach((el,i)=>timers.push(setTimeout(()=>el.classList.add("is-in"),120+i*45)));
    rows.forEach((r,i)=>timers.push(setTimeout(()=>{r.querySelector(".sh__bar i").style.width=r.dataset.w+"%"},420+i*90)));
    kpis.forEach((k,i)=>{const out=k.querySelector("[data-out]"),v=parseFloat(k.dataset.value),dec=parseInt(k.dataset.dec,10)||0;timers.push(setTimeout(()=>tween(out,v,dec,REDMO?1:900),300+i*120))})}
  function reset(){clearAll();loaded=false;root.classList.remove("is-loaded");btn.textContent="Carregar dados";vals.forEach(el=>el.classList.remove("is-in"));
    rows.forEach(r=>{const b=r.querySelector(".sh__bar i");b.style.transition="none";b.style.width="0";void b.offsetWidth;b.style.transition=""});
    kpis.forEach(k=>{k.querySelector("[data-out]").textContent=fmt(0,parseInt(k.dataset.dec,10)||0)});t0=performance.now();clock();tick=setInterval(clock,100);timers.push(setTimeout(load,AUTO))}
  btn.addEventListener("click",()=>loaded?reset():load());
  const applyMode=()=>{badge.classList.toggle("is-periodic",mode==="periodic");root.querySelectorAll("[data-mode]").forEach(b=>b.classList.toggle("is-on",b.dataset.mode===mode))};
  root.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;badge.classList.remove("is-once");applyMode()}));
  badge.addEventListener("pointerenter",()=>{badge.classList.remove("is-periodic","is-once");void badge.offsetWidth;badge.classList.add("is-once")});
  badge.addEventListener("animationend",ev=>{if(ev.target!==badge.querySelector(".sh__sweep")||!badge.classList.contains("is-once"))return;badge.classList.remove("is-once");applyMode()});
  /* por pilar: quantos serviços de hoje se sobrepõem (grupos com o mesmo produto de destino, dados de OLD); "Quando nos contratam" fica no slide 3 */
  const OVD={1:"3 ofertas de liderança; impostos e incentivos",2:"TMO e Modelo de Implantação e Governança",3:"DD de compra e venda, integração e separação, IMO e SMO",4:""};
  PILLARS.forEach(pl=>{const own=OLD.filter(o=>o.p===pl.n),g={};own.forEach(o=>(g[o.to]=g[o.to]||[]).push(o));const gs=Object.values(g).filter(x=>x.length>1),k=gs.reduce((a,x)=>a+x.length,0);
    const txt=k?`${k} de ${own.length} serviços em ${gs.length} ${pl.n===3?"pares":gs.length>1?"grupos":"grupo"}: ${OVD[pl.n]}`:`nenhuma; 3 dos ${own.length} nomes não dizem o que entregam`;
    const d=H("div",{class:"sh__p4"},$("shPillars"));d.innerHTML=`<div class="sh__slot"><b class="sh__val n">Pilar ${pl.n} · ${pl.name}</b><i class="sh__sk" style="width:80%"></i></div><div class="sh__slot"><span class="sh__val w"><em>Sobreposição</em>${txt}</span><i class="sh__sk"></i></div>`});
  vals.push(...root.querySelectorAll("#shPillars .sh__val"));
  applyMode();reset();clearAll();
  /* impressão: conteúdo final na hora (sem contagem nem barras em animação) */
  ENTER["DTS hoje"]=reset;PRINT.push(()=>{clearAll();loaded=false;load();clearAll();vals.forEach(el=>el.classList.add("is-in"));
    rows.forEach(r=>{const b=r.querySelector(".sh__bar i");b.style.transition="none";b.style.width=r.dataset.w+"%"});
    kpis.forEach(k=>{k.querySelector("[data-out]").textContent=fmt(parseFloat(k.dataset.value),parseInt(k.dataset.dec,10)||0)})})})();

/* ---------- portfólio atual (AS-IS) + spotlight ---------- */
(function(){const g=$("asGrid");PILLARS.forEach(pl=>{const col=H("div",{class:"op-col",id:"asc"+pl.n,"data-a":"up",style:`--d:${3+pl.n}`},g);
  col.innerHTML=`<div class="op-hd"><div class="n">PILAR ${pl.n}</div><h3>${pl.official}</h3><p>${pl.def_as}</p><span class="cnt">${pl.was} serviços</span></div>`;
  const list=H("div",{class:"op-list"},col);OLD.filter(o=>o.p===pl.n).forEach(o=>{const d=H("div",{class:"svc"},list);d.innerHTML=`<i></i><span>${o.n}</span>`});H("div",{class:"op-when",html:`<b>Quando nos contratam</b>${pl.when}`},list)});
  const st=PILLARS.map(pl=>({sel:"#asc"+pl.n,btn:"P"+pl.n,title:`Pilar ${pl.n} · ${pl.official}`,text:`<span class="sl"><b>O que fazemos</b>${pl.def_as}</span><span class="sl"><b>Serviços</b>${pl.was} no portfólio atual</span><span class="sl"><b>Quando nos contratam</b>${pl.when}</span>`}));
  st.push({sel:"#asChain",btn:"Cadeia de valor",title:"Cadeia de valor A&M",text:`<span class="sl"><b>Onde o DTS atua</b>Na frente Tech & Digital da cadeia de valor da A&M, ao lado das demais áreas funcionais.</span><span class="sl"><b>Como se conecta</b>Apoia as práticas de Transformação, Turnaround, Estratégia & M&A e Data & IA com a dimensão de tecnologia.</span>`,capY:300});
  const sp=Spotlight($("asHost"),st,$("asSeg"));segSync($("asSeg"));
  ENTER["Portfólio atual"]=()=>{sp.set(-1);segSync($("asSeg"))};
  STEP["Portfólio atual"]=d=>{if(d>0){if(sp.cur<st.length-1){sp.set(sp.cur+1);return true}sp.set(-1);return false}if(sp.cur>=0){sp.set(sp.cur-1);return true}return false}})();

/* ---------- 50/50 · de serviços a produtos ---------- */
const BAS={};
(function(){const asis=$("hbAsis"),tobe=$("hbTobe");PILLARS.forEach(pl=>{const c1=H("div",{class:"op-col"},asis);c1.innerHTML=`<div class="op-hd"><div class="n">HOJE · PILAR ${pl.n}</div><h3>${pl.official}</h3><span class="cnt">${pl.was}</span></div>`;const l1=H("div",{class:"op-list"},c1);OLD.filter(o=>o.p===pl.n).forEach(o=>{H("div",{class:"svc",html:`<i></i><span>${o.n}</span>`},l1)});H("div",{class:"op-when",html:`<b>Quando nos contratam</b>${pl.when}`},l1);
    const c2=H("div",{class:"op-col"},tobe);c2.innerHTML=`<div class="op-hd"><div class="n">PROPOSTA · PILAR ${pl.n} · nome proposto</div><h3 title="Hoje: ${pl.official}">${pl.to}</h3><span class="cnt">${pl.now}</span></div>`;const l2=H("div",{class:"op-list"},c2);PRODUCTS.filter(p=>p.pillar===pl.n).forEach(p=>{const a=H("a",{href:"#p="+p.id,"data-pd":p.id,class:`prod ${p.st}`,title:"Abrir ficha: "+p.name},l2);a.innerHTML=`<span class="bar"></span><span style="min-width:0"><span class="nm">${p.code} · ${p.name}${p.sig?'<span class="sig">★</span>':""}</span></span>`});H("div",{class:"op-when",html:`<b>Como fica</b>${pl.short}, com inteligência artificial no método e preço por valor.`},l2)});
  /* ponte 29 → 24: à esquerda o que acontece com os serviços de hoje, à direita a composição dos 24 produtos */
  const nst=k=>PRODUCTS.filter(p=>p.st===k).length,nwc=PRODUCTS.filter(p=>p.st==="new").map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="plink sm dk new" data-tv="${p.code} · ${p.name}" data-tl="Produto novo com IA · clique para abrir a ficha">${p.code}</a>`).join("");
  const M=[["O que temos","29","serviços em 4 pilares, com sobreposições e sem IA no método",""],["O que fundir","13 → 6","serviços que se sobrepõem viram 6 produtos",""],["O que retirar","2","IT Business Partner e IT M&amp;A Playbook deixam de ser vendidos isolados","out"],"=",["Manter",String(nst("keep")),"produtos com a essência preservada","keep"],["Aprimorar com IA",String(nst("ai")),"produtos aprimorados com IA no método",""],["Criar com IA",String(nst("new")),`produtos novos <span class="nwc">${nwc}</span>`,"new holo"]];
  M.forEach((m,i)=>{if(m==="="){const b=H("div",{class:"bridge","data-a":"fade",style:`--d:${6+i}`},$("moves"));b.innerHTML=`<span>29 − 13 + 6 − 2 + 4</span><b>= ${PRODUCTS.length}</b><span>produtos</span>`;return}
    const [k,v,d,c]=m;const b=H("div",{class:"card "+c,"data-a":"stack",style:`--d:${6+i};--r:${(i-3)*2}deg;--sx:${(3-i)*24}px`},$("moves"));b.innerHTML=`<span class="label">${k}</span><div class="big">${v}</div><p>${d}</p>`});
  let lastOn="";const ba=BeforeAfter($("hb"),{rest:50,l:"HOJE · 29 SERVIÇOS",r:"PROPOSTA · 24 PRODUTOS",onMove:x=>{let k="";$("hbSeg").querySelectorAll("button").forEach(b=>{const on=Math.abs(+b.dataset.v-x)<3;b.classList.toggle("on",on);if(on)k=b.dataset.v});if(k!==lastOn){lastOn=k;segSync($("hbSeg"))}}});BAS.hb=ba;
  $("hbSeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{ba.tween(+b.dataset.v,800)});
  ENTER["De serviços a produtos"]=()=>{segSync($("hbSeg"));ba.demo();setTimeout(()=>segSync($("hbSeg")),2700)}})();

/* ---------- benchmark · timeline 2026 ---------- */
(function(){const host=$("tlMarket");let tl=null;
  const T4=[["Plataforma própria + agentes","Zora AI, agent OS, EY.ai, Workbench e Lilli, com NVIDIA, Microsoft, Google e laboratórios de IA.","A A&M não precisa competir em plataforma: pode ser neutra e orquestradora."],["Preço por resultado e por ativo","McKinsey cobra ~25% por resultado; Deloitte vende agentes por assinatura; IBM fala em consultoria baseada em ativos.","O DNA de honorário por resultado da A&M vira vantagem."],["Diligência e PE sob pressão","DD com agentes por ~US$ 50 mil; laboratórios de IA entram nas investidas dos fundos (Ode); Bain replica o software do alvo.","O valor migra para o que vem depois do signing: Dia 1, TSA e sinergias."],["Pares compram capacidade","AlixPartners adquire a Artium; Falconi investe R$&nbsp;100&nbsp;mi; CI&T monetiza IA pela plataforma Flow.","produtizar o DNA de operador com IA, antes dos pares."]];
  T4.forEach(([t,x,h],i)=>{const d=H("div",{class:"card"+(i===3?" am":""),"data-a":"up",style:`--d:${8+i}`},$("benchTake"));d.innerHTML=`<span class="label">Sinal ${i+1} de 4</span><h4>${t}</h4><p>${x}</p><p class="so">→ ${i===3?"Para a A&amp;M: ":""}${h}</p>`});
  /* a linha fica embaixo da área disponível e o card logo acima (a altura vem do layout do slide) */
  const mk=()=>{if(!tl){const hh=host.offsetHeight||320,y=Math.max(232,hh-78);tl=Timeline(host,TL_2026,{w:host.offsetWidth||1076,y,cardY:Math.max(8,Math.round((y-30-190)/2)),x0:70,x1:(host.offsetWidth||1076)-70,dwell:2400})}return tl};
  ENTER["Benchmark · IA nas consultorias"]=()=>mk().play();
  $("tlPlay").onclick=()=>mk().play();
  /* impressão: todos os marcos acesos com o card da A&M, e uma página extra com os 7 eventos completos */
  PRINT.push(()=>{const sec=slides.find(s=>s.dataset.t==="Benchmark · IA nas consultorias"),d0=sec.style.display;if(!host.offsetWidth)sec.style.display="block";
    const t=mk();t.stopAuto();t.set(2);host.classList.add("tl-lit");const tr=host.querySelector(".tl-track"),pg=host.querySelector(".tl-prog");if(tr&&pg)pg.style.width=tr.style.width;sec.style.display=d0;
    if(stage.querySelector(".tl7-page"))return;const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","tl7-page","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));c.querySelector(".hd .eyebrow").textContent="Linha do tempo 2026 em detalhe · os sete eventos com fonte";
    const g=H("div",{class:"main tl7"});TL_2026.forEach(it=>{H("div",{class:"tl7-i"+(it.tag==="Alvarez & Marsal"?" am":""),html:`<div class="d">${it.d} · ${it.tag}</div><h4>${it.t}</h4><p>${it.x}</p><div class="src">Fonte: ${it.src}</div>`},g)});
    /* 8ª célula: a leitura do slide (os quatro sinais) fecha a grade */
    H("div",{class:"tl7-i rd",html:`<div class="d">Leitura · os quatro sinais</div><ol>${T4.map(([t],i)=>`<li><i>${i+1}</i>${t}</li>`).join("")}</ol><p class="so"><b>Para a A&amp;M:</b> ${T4[3][2]}</p>`},g);
    c.querySelector(".main").replaceWith(g);sec.after(c)})})();

/* ---------- raio-X ---------- */
(function(){const svg=$("rxChart"),L=70,Rr=910,Tp=16,B=546,x=v=>L+(v-1.8)/(5-1.8)*(Rr-L),y=v=>B-(v-1.8)/(5-1.8)*(B-Tp);const mid=3.3;
  const q=[[x(mid),Tp,Rr-x(mid),y(mid)-Tp,"#FFF1E8","ESCALAR · NÚCLEO A&M",Rr-12,Tp+20,"end"],[L,Tp,x(mid)-L,y(mid)-Tp,"#F3F6FA","DEFENDER E PRODUTIZAR",L+12,Tp+20,"start"],[x(mid),y(mid),Rr-x(mid),B-y(mid),"#F3F6FA","DIFERENCIAR COM IA OU PARCERIA",Rr-12,B-12,"end"],[L,y(mid),x(mid)-L,B-y(mid),"#F8F9FB","CONSOLIDAR OU RETIRAR",L+12,B-12,"start"]];
  q.forEach(([a,b,w,h,f,t,tx,ty,an])=>{S("rect",{x:a,y:b,width:w,height:h,fill:f},svg);T(svg,tx,ty,t,{"text-anchor":an,fill:"#8A97A8",style:"font:500 10.5px var(--fm);letter-spacing:.14em"})});
  S("line",{x1:L,y1:B,x2:Rr,y2:B,stroke:"#CBD4E1","stroke-width":1.5},svg);S("line",{x1:L,y1:Tp,x2:L,y2:B,stroke:"#CBD4E1","stroke-width":1.5},svg);
  for(let v=2;v<=5;v++){T(svg,x(v),B+18,String(v),{"text-anchor":"middle",fill:"#8A97A8",style:"font:500 10.5px var(--fm)"});T(svg,L-10,y(v)+4,String(v),{"text-anchor":"end",fill:"#8A97A8",style:"font:500 10.5px var(--fm)"})}
  T(svg,(L+Rr)/2,B+42,"ATRATIVIDADE DE MERCADO · BRASIL 2026–27  →",{"text-anchor":"middle",fill:"#0B2545",style:"font:500 11px var(--fm);letter-spacing:.14em"});
  const yl=T(svg,22,(Tp+B)/2,"DIREITO DE VENCER DA A&M  →",{"text-anchor":"middle",fill:"#0B2545",style:"font:500 11px var(--fm);letter-spacing:.14em"});yl.setAttribute("transform",`rotate(-90 22 ${(Tp+B)/2})`);
  const DC={keep:["#1B4479","#1B4479","#fff"],ai:["#4A6FA5","#4A6FA5","#fff"],merge:["#fff","#8A97A8","#3E4C5E"],cut:["#fff","#C2614E","#9A3B2A"]};const DN={keep:"Manter",ai:"Aprimorar com IA",merge:"Fundir",cut:"Retirar"};
  const line=(k,v)=>`<span class="tl"><b>${k}</b>${v}</span>`;
  const nodes=[];NEWPOS.forEach(n=>{const p=PBY(n.c),w=S("g",{"data-a":"pop",style:`--d:${2+(p.pillar-1)*2}`},svg),gg=S("g",{class:"bubble in","data-p":p.pillar},w);S("circle",{cx:x(n.x),cy:y(n.y),r:19,fill:"rgba(242,107,33,.12)",stroke:"#F26B21","stroke-width":2,"stroke-dasharray":"4 3"},gg);T(gg,x(n.x),y(n.y)+4,n.c,{"text-anchor":"middle",fill:"#D9521A",style:"font:600 10.5px var(--fm)"});gg.setAttribute("data-tv",`✦ Novo · ${p.code} ${p.name}`);gg.setAttribute("data-th",line("Decisão","Criar com IA")+line("Pilar",PILLARS[p.pillar-1].name)+line("Por quê",strip(p.tagline)));gg.addEventListener("click",()=>openPD(p.id));nodes.push(gg)});
  OLD.forEach(o=>{const [f,s,tc]=DC[o.d],w=S("g",{"data-a":"pop",style:`--d:${2+(o.p-1)*2}`},svg),gg=S("g",{class:"bubble in","data-p":o.p},w);S("circle",{cx:x(o.x),cy:y(o.y),r:17,fill:f,stroke:s,"stroke-width":o.d==="merge"?2:2.2,"stroke-dasharray":o.d==="merge"?"4 3":"none"},gg);T(gg,x(o.x),y(o.y)+4,o.id.toUpperCase(),{"text-anchor":"middle",fill:tc,style:"font:600 10px var(--fm)"});
    const dest=PBY(o.to);gg.setAttribute("data-tv",`${o.id.toUpperCase()} · ${o.n}`);gg.setAttribute("data-th",line("Decisão",DN[o.d])+line("Destino",`${dest.code} ${dest.name}`)+line("Por quê",o.w));gg.addEventListener("click",()=>openPD(dest.id));nodes.push(gg)});
  const list=$("rxList");PILLARS.forEach(pl=>{H("div",{class:"xg"},list,`Pilar ${pl.n} · ${pl.name}`);
    OLD.filter(o=>o.p===pl.n).forEach(o=>{const dest=PBY(o.to);const r=H("div",{class:"rx-row","data-p":pl.n},list);r.innerHTML=`<b>${o.id.toUpperCase()}</b><span class="nm">${o.n}</span><span class="st ${o.d}">${DN[o.d]}</span><a href="#p=${dest.id}" data-pd="${dest.id}" class="to">→ ${dest.code}</a>`;r.setAttribute("data-tv",o.n);r.setAttribute("data-th",line("Decisão",DN[o.d])+line("Destino",`${dest.code} ${dest.name}`)+line("Por quê",o.w))})});
  const seg=$("rxSeg");["Todos","P1","P2","P3","P4"].forEach((t,k)=>{const b=H("button",{class:k?"":"on"},seg,t);b.onclick=()=>{seg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));segSync(seg);nodes.forEach(n=>n.style.opacity=!k||+n.dataset.p===k?1:.12);list.querySelectorAll(".rx-row").forEach(r=>r.style.opacity=!k||+r.dataset.p===k?1:.3)}});
  ENTER["Raio-X do portfólio atual"]=()=>segSync(seg)})();

/* ---------- três caminhos ---------- */
(function(){const P=[["Incremental","IA dentro dos serviços de hoje","Mantém os 29 serviços e nomes; IA como produtividade interna da equipe.",["Rápido e barato","Não resolve sobreposições nem nomes","Preço continua por hora: pressão de preço com a IA","<b>Receita:</b> horas e projetos sob medida"],[1,1,0],"~3 meses",false,[ev("McKinsey, nov/2025"),"Cerca de <b>25% dos honorários</b> globais da McKinsey já são por resultado."]],
  ["Transformacional","Portfólio de produtos com IA","29 → 24 produtos com escopo, método, ferramenta, dados e preço; 4 Signature; 4 novos com IA.",["Funde 13 serviços sobrepostos em 6 produtos","IA no método de 19 produtos","Plataforma DTS compartilhada","<b>Receita:</b> sprint fixo + execução com êxito + primeiras assinaturas"],[3,4,2],"6–9 meses",true,[hy(),"Arquitetura comercial em 3 camadas: <b>sprint fixo</b> → <b>execução com êxito</b> → <b>assinatura</b> (radar ou escritório). A A&amp;M tem DNA de honorário por resultado.",`Ressalva: preço puramente por resultado transfere risco (Gartner, ${hy("não verificado")}).`]],
  ["Disruptivo","DTS como plataforma","Services-as-software: radares e escritórios por assinatura, benchmark Brasil como produto de dados e agentes operando para o cliente.",["Receita recorrente e escalável","Exige engenharia, dados e parcerias (ex.: compra da Artium pela AlixPartners)","Risco de canibalizar projetos","<b>Receita:</b> assinatura por empresa, agente ou fundo"],[5,5,5],"18–24 meses",false,[ev("HFS, fev/2026"),"Mercado de <b>services-as-software</b> projetado em US$ 1,5 tri até 2035, absorvendo receita de serviços de TI e SaaS."]]];
  P.forEach(([k,h,p,li,m,t,rec,evd],i)=>{const d=H("div",{class:"path3"+(rec?" rec":""),"data-a":"up",style:`--d:${4+i*2}`},$("paths"));
    const mt=(lab,v,o)=>`<div class="mr"><span>${lab}</span><div class="meter${o?" o":""}">${[1,2,3,4,5].map(j=>`<i class="${j<=v?"on":""}"></i>`).join("")}</div></div>`;
    d.innerHTML=`${rec?'<span class="rib">✓ RECOMENDADO</span>':""}<div class="k">${k}</div><h3>${h}</h3><p>${p}</p><ul>${li.map(x=>`<li>${x}</li>`).join("")}</ul>${rec?`<div class="inc"><div>+ incubar duas apostas disruptivas desde já</div>${plink("3.5")}${plink("1.7")}</div>`:""}<div class="pev">${evd[0]}<span>${evd[1]}</span>${evd[2]?`<span class="rs">${evd[2]}</span>`:""}</div><div class="ms">${mt("Investimento",m[0])}${mt("Diferenciação",m[1],1)}${mt("Recorrência",m[2],1)}<div class="tm">Tempo até impacto: <b>${t}</b> <span class="hy">H</span></div></div>`})})();

/* ---------- capítulos dos pilares: o capítulo ganha morphing (fx 29) e os números do pilar ---------- */
PILLARS.forEach(pl=>{const n=pl.n,dp=slides.find(x=>x.dataset.t===`Pilar ${n} · Cliente e mercado`).dataset.p;
  CHAPX[dp]=host=>{const ps=PRODUCTS.filter(p=>p.pillar===n),k=ps.filter(p=>p.st!=="keep").length,nw=ps.filter(p=>p.st==="new"),sg=ps.filter(p=>p.sig);
    host.classList.add("pil");const l=host.querySelector(".chap-l"),h1=l.querySelector("h1");h1.style.fontSize=(pl.name.length>22?62:pl.name.length>14?74:88)+"px";
    l.querySelector(".cey").textContent=`CAPÍTULO ${CHMETA[dp].n} · PILAR ${n} DE 4`;
    l.insertAdjacentHTML("beforeend",`${pl.to!==pl.name?`<div class="pc-to" data-a="fade" style="--d:5">Nome proposto: <b>${pl.to}</b></div>`:""}
      <div class="pc-kpis" data-a="up" style="--d:7"><div><b>${pl.was} → ${pl.now}</b><span>serviços → produtos</span></div><div><b class="o">${k}/${pl.now}</b><span>com IA no núcleo</span></div><div><b>${nw.length}</b><span>produto novo</span></div></div>
      <div class="pc-pills" data-a="fade" style="--d:9">${nw.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="new holo" title="Produto novo com IA">✦ Novo · ${p.name}</a>`).join("")}${sg.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" title="A&M Signature">★ ${p.name}</a>`).join("")}</div>`);
    host.insertAdjacentHTML("beforeend",`<svg class="pc-morph" viewBox="0 0 640 640" aria-hidden="true"></svg><div class="pc-states"></div>`);
    const mp=MorphScene(host.querySelector(".pc-morph"),{btnHost:host.querySelector(".pc-states"),states:[
      {shape:"blob",big:String(pl.was),lab:"SERVIÇOS HOJE",sub:"fragmentados e sob medida",dots:pl.was,btn:"Hoje"},
      {shape:"hex",big:String(pl.now),lab:"PRODUTOS",sub:"escopo · método · preço",dots:pl.now,btn:"Produtos"},
      {shape:"circle",big:`${k}/${pl.now}`,lab:"COM IA NO NÚCLEO",sub:"IA no método, dados no centro",dots:pl.now,ai:k,btn:"Com IA"}]});
    mp.play();return()=>mp.pause()}});

/* ---------- personas, mercado, white space ---------- */
const PERS={1:[["CEO · Conselho","A IA está gerando resultado ou só custo? Quem lidera isso?",["1.3","1.7"]],["CFO","Quanto gastamos em tecnologia e o que dá para cortar sem risco?",["1.5","1.6"]],["CIO","Como reorganizo a área para a era dos agentes e provo valor?",["1.1","1.4"]],["Sócio de PE","Qual é a alavanca de tecnologia no EBITDA nos próximos 100 dias?",["1.3","1.5"]]],
 2:[["CFO · Head Tax","Meu ERP estará pronto para a CBS em 01/01/2027?",["2.2"]],["CIO · Compras","Qual fornecedor escolher e como contratar sem lock-in?",["2.1"]],["Sponsor · Conselho","Por que o programa atrasou e quanto custa terminar?",["2.3","2.4"]],["CHRO · CIO","Por que ninguém usa a IA que compramos?",["2.5","2.6"]]],
 3:[["Sócio de PE","Quais riscos de tecnologia mudam o preço? E depois do closing?",["3.1","3.5"]],["Corporate development","Como integramos sem parar a operação?",["3.2","3.3"]],["CFO do vendedor","Como separamos a TI e saímos da TSA no prazo?",["3.2","3.3"]],["CEO pós-deal","Onde estão as sinergias de TI prometidas no deal?",["3.4"]]],
 4:[["CIO · CTO","Por onde começo a modernizar o legado e quanto custa?",["4.1","4.6"]],["CFO","Quanto pago em virtualização, nuvem e sistemas redundantes?",["4.2","4.3"]],["CRO · COO","Aguentamos um ataque ou a falha de um terceiro?",["4.5"]],["Conselho","A migração vai dar certo? Quem garante?",["4.4"]]]};
document.querySelectorAll(".persona").forEach(h=>{PERS[h.dataset.pillar].forEach(([r,q,ps],i)=>{const d=H("div",{class:"pers"},h);d.innerHTML=`<div class="r">${r}</div><div class="q">“${q}”</div><div class="pq">${ps.map(c=>plink(c,"sm")).join(" ")}</div>`})});
const MK={1:[["Deloitte","Technology Strategy & Transformation; Technology Strategy & Architecture","Zora AI (agentes por assinatura); aliança Anthropic (470 mil profissionais); Trustworthy AI","Forte em estratégia e plataforma; CIO interino não encontrado","E"],
  ["EY","Technology Strategy & Transformation · Office of the CIO (IT Finance, Sourcing, PPM)","EY.ai Agentic Platform com NVIDIA; investimento de US$ 1,4 bi","Op model e finanças de TI robustos","E"],
  ["KPMG","CIO Advisory (TBM/Apptio); KPMG Trusted AI","Workbench multiagente; 1ª Big Four com ISO/IEC 42001","Concorrente direto em custo de TI e governança de IA","E"],
  ["PwC","Consultoria de Negócios (estratégia, digital, cloud)","agent OS; 250+ agentes com Google; AI Experience Zone em Piracicaba","Pauta via CEO Survey; IA como acelerador","E"],
  ["McKinsey · BCG · Bain","McKinsey Technology (Rewired); BCG X; Bain Vector","~25 mil agentes na McKinsey; tech e IA >40% da receita do BCG; Bain Elite Partner da OpenAI","Estratégia de IA top-down, preço premium","E"],
  ["AlixPartners","Technology Practice; CIO interino; IT cost","Comprou a Artium (engenharia agêntica, ago/2026)","Par direto no DNA de operador","E"]],
 2:[["Deloitte","Alianças de implementação (AWS até 2031; Google); Technology Center em Recife (~600 pessoas)","Zora AI integrada aos agentes SAP Joule","Escala de entrega e alianças","E"],
  ["EY","Service Delivery Center em Recife (SAP, ServiceNow, IA, RPA)","EY Beyond Tax Analytics para a Reforma","Reforma entra pelo Tax","E"],
  ["KPMG","Powered Enterprise; Consultoria Reforma Tributária","Thomson Reuters ONESOURCE; Workbench","Fiscal + tecnologia","E"],
  ["CI&T · Falconi","Entrega AI-native; hiperautomação","CI&T Flow; Falconi: R$&nbsp;100&nbsp;mi em IA, 80% dos projetos com agentes","Comprimem preço de PMO e entrega","E"],
  ["TOTVS · SAP","Jornada da Reforma Tributária; RISE / S/4HANA","Chatbot especialista em Reforma (TOTVS)","O fornecedor também ‘aconselha’: falta voz independente","E"],
  ["Capgemini · Accenture · IBM","Recife: de 250 para 1.000 pessoas até o fim de 2026 (Capgemini); Accenture compra Tenbu","IBM Enterprise Advantage: consultoria baseada em ativos","Escala e ativos proprietários","E"]],
 3:[["Deloitte","M&A Technology: Tech DD, Software/Data Diligence, Sell-side & Exit Readiness, Separation & Carve-out (ACDC)","Plataforma de agentes Zora AI","Ciclo completo do deal","E"],
  ["EY-Parthenon","Transaction Strategy & Execution · Technology (DD, PMI, carve-out, TSA, Dia 1)","CAST Highlight reduziu >75% do tempo de avaliação de código em DD","DD + TSA + Dia 1","E"],
  ["PwC","AI technology diligence; Digital deals","‘Harvey, powered by PwC’ licenciado a clientes; exclusividade com a ToltIQ (jun/2026)","IA vendida como produto","E"],
  ["Bain","Tech Due Diligence","Replica o software do alvo com Claude Code para testar defensabilidade","DD testa o risco de disrupção por IA","E"],
  ["Entrantes","DiligenceSquared; Ode with Anthropic","DD com agentes por ~US$ 50 mil; engenheiros de IA dentro das investidas dos fundos","Pressão de preço no canal de PE","E"],
  ["A&M (hoje)","Tech & product DD, PMI, carve-out, 100 dias; PEPI","A&M Assist (abr/2025); DiligenceGPT","Ativos existem; falta produtizar no Brasil","E"]],
 4:[["McKinsey","LegacyX (QuantumBlack)","SAS → Python com squads de agentes: ~90% de precisão, cronograma −80%","Plataforma própria de modernização","E"],
  ["Accenture","GenWizard; Anthropic Business Group","Gemini para mainframe; 30 mil pessoas treinadas em Claude","Escala de fábrica","E"],
  ["IBM","watsonx Code Assistant for Z; Bob; Enterprise Advantage","~45% de ganho interno com Bob (dado do fornecedor)","Dona do mainframe","E"],
  ["AWS · Microsoft · Google","AWS Transform; GitHub Copilot app modernization; Mainframe Rewrite","Migração sem custo (AWS); até 4× mais rápido em .NET","A ferramenta vira commodity","E"],
  ["Deloitte · EY","Technology Strategy & Architecture; arquitetura corporativa","Agentes em ferramentas de EA (SAP LeanIX, Ardoq)","EA tradicional ganha automação","E"],
  ["Anthropic","Claude Code","COBOL ‘em trimestres, não anos’ (fev/2026); ação da IBM caiu no anúncio","Laboratórios vão direto ao cliente","E"]]};
const HEAT={1:["M","A","A","M","M","A"],2:["M","M","A","A","M","B"],3:["A","A","A","M","A","X"],4:["M","M","M","A","M","A"]};const HL={A:["Alta","#C2614E"],M:["Média","#F26B21"],B:["Baixa","#4A6FA5"],X:["Ativo A&amp;M","#0B2545"]};
document.querySelectorAll("table.mk").forEach(t=>{const n=t.dataset.mk,rows=MK[n];t.innerHTML=`<thead><tr><th style="width:140px">Firma</th><th>Como chamam a oferta</th><th>O que fazem com IA</th><th style="width:210px">Leitura para o DTS</th><th style="width:104px;text-align:center">Sobreposição</th></tr></thead><tbody>${rows.map((r,i)=>{const h=HL[HEAT[n][i]];return`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]} <span class="ev">E</span></td><td style="text-align:center;vertical-align:middle"><span class="heat" style="background:${h[1]}">${h[0]}</span></td></tr>`}).join("")}</tbody>`});
const WS={1:{it:[["CIO / CAIO interino","Não encontrado nas Big Four; DNA histórico da A&M.","1.3","E"],["Custo com risco compartilhado","Success fee + Spend Radar contínuo.","1.5","H"],["Valor + governança de IA","Big Four focam risco; falta quem una ROI, custo e governança com accountability.","1.7","H"],["Lei do Bem com leitura técnica por IA","Corte de 10% exige dossiê técnico melhor.","1.6","H"]],th:["Diagnósticos e estratégias são os serviços mais comoditizáveis por IA: precisam virar sprint com valor em R$.","H"]},
 2:{it:[["Independência","Sem revenda de software nem de horas de fábrica.","2.1","H"],["Lado sistêmico da Reforma","Big Four entram pelo Tax; ERP, dados e cutover ficam descobertos.","2.2","H"],["Turnaround de programas","DNA A&M; >70% dos ERPs abaixo do business case (Gartner).","2.4","E"],["Adoção medida por uso","IA comprada e não usada vira custo.","2.5","H"]],th:["Concorrentes nativos em IA (CI&T, Falconi) e centros de entrega no Recife comprimem o preço de PMO e implementação.","E"]},
 3:{it:[["DD + 100 dias + execução","Um contrato do signing ao Dia 100: a DD vira porta de entrada.","3.1","H"],["Assinatura do portfólio","Radar trimestral de tecnologia e IA para fundos: não encontrado no Brasil.","3.5","H"],["Ativos de IA nas TSAs","Licenças de LLM, dados e agentes compartilhados entram na separação.","3.2","H"],["Ativos A&M existentes","A&M Assist e DiligenceGPT podem ser localizados para o Brasil.","3.1","E"]],th:["DD com agentes a ~US$ 50 mil e laboratórios de IA dentro dos fundos (Ode) pressionam preço no canal de PE.","E"]},
 4:{it:[["Raio-X neutro + business case","A&M seleciona e garante; não revende ferramenta nem fábrica.","4.6","H"],["Assurance independente","O integrador não deve avaliar o próprio trabalho.","4.4","H"],["Economia de infraestrutura","VMware, nuvem e GPU com TCO e FinOps.","4.3","E"],["Resiliência pós-incidente","Cadeia do Pix e CMN 5.274.","4.5","E"]],th:["Sem plataforma própria comparável a LegacyX ou GenWizard, vender horas de modernização é perder para ferramentas cobradas por minuto.","H"]}};
document.querySelectorAll(".ws").forEach(h=>{const w=WS[h.dataset.pillar];h.innerHTML=`<div class="card nv"><div class="eye">Onde o DTS ganha · espaço livre</div>${w.it.map(([t,x,c,e],i)=>`<div class="ws-i"><span class="n">${i+1}</span><div><b>${t}</b> ${e==="E"?'<span class="ev">E</span>':'<span class="hy">H</span>'}<p>${x}</p>${plink(c,"sm dk")}</div></div>`).join("")}</div>
  <div class="thr"><div class="eye">Ameaça a monitorar ${w.th[1]==="E"?'<span class="ev">E</span>':'<span class="hy">H</span>'}</div><p>${w.th[0]}</p></div>`});

/* ---------- casos M&A e linha regulatória ---------- */
[["MBRF","Marfrig + BRF, concluída em set/2025; sinergias anunciadas de R$&nbsp;485&nbsp;mi/ano","Integração"],["Petz + Cobasi","Cade aprovou em dez/2025, com venda de 26 lojas","Integração"],["Braskem","Controle passa à IG4 (abr/2026)","Troca de controle"],["Raízen","Separação em Energia e Combustíveis até o fim de 2027","Carve-out"],["Motiva","Venda de participações em aeroportos por R$&nbsp;5,2&nbsp;bi","Desinvestimento"]].forEach(([n,x,t])=>{const d=H("div",{class:"kpi-t"},$("p3cases"));d.innerHTML=`<span class="st ${t==="Carve-out"?"new":t==="Integração"?"ai":"keep"}">${t}</span><div class="nm">${n}</div><div class="l">${x}</div>`});
(function(){const st=[["2026","Alíquota-teste de 1% (CBS 0,9% + IBS 0,1%)"],["01/01/2027","CBS plena; PIS/Cofins extintos"],["2027","Fim da manutenção padrão do SAP ECC (extensível a 2030)"],["2029–32","ICMS/ISS recolhidos a 90% → 60% da alíquota atual"],["2033","ICMS e ISS extintos"]];const h=$("p2time");h.innerHTML=`<div class="rt">${st.map(([d,t],i)=>`<div class="rt-i${i===1?" hot":""}"><i></i><b>${d}</b><span>${t}</span></div>`).join("")}</div>`})();

/* ---------- fábrica: card stack + anatomia ---------- */
(function(){const C=[["01","Codificar o método","Etapas, entregáveis, templates e critérios de qualidade iguais em todo cliente.",["Ficha padrão (12 blocos e fontes)","Kit: data request, roteiros, modelos","Definição de ‘pronto’ por etapa"]],
  ["02","Nomear pelo que entrega","Nomes em inglês, no vocabulário que o comprador usa em RFP e compras, e que dizem o resultado, não o método.",["Mercado: CIO Advisory · Separation & Carve-out · Trusted AI","Um nome por produto; buy-side, sell-side e níveis são edições","Strategy Application → Application Portfolio Rationalization"]],
  ["03","Embarcar a IA","Agentes e prompts testados por etapa, rodando em LLM corporativo seguro.",["Biblioteca de agentes por produto","Revisão humana obrigatória (sênior assina)","Trilha de evidências: cada achado cita a fonte"]],
  ["04","Capturar dados","Cada projeto alimenta o benchmark DTS, anonimizado: a vantagem cresce a cada venda.",["Taxonomia única (TBM, maturidade, preços)","Benchmark DTS Brasil","Base para radares por assinatura"]],
  ["05","Precificar","Preço por valor, não por hora: sprint fixo, execução com êxito, assinatura.",["Faixas por porte de cliente","Success fee onde há economia mensurável","Assinatura para radares e escritórios"]],
  ["06","Equipar o time","Dono de produto, squad padrão e trilha de skills com certificação interna.",["1 dono por pilar + 1 de IA","Squad: sócio, gerente, consultores, eng. de IA/dados","Certificação interna por produto"]],
  ["07","Escalar e medir","Funil, conversão, margem e NPS por produto: o comitê trimestral acompanha e a revisão anual decide.",["Revisão anual: escalar · ajustar · aposentar","Conversão sprint → execução","Casos de sucesso viram material de venda"]]];
  const EXS=["Ex.: <b>3.1 AI-Powered Tech Due Diligence</b> · checklist padrão, modelo de custos e relatório em 3 níveis", "Ex.: <b>IT Integration Management Office + IT Separation Management Office</b> → 3.3 Integration & Separation Office (IMO/SMO)", "Ex.: <b>1.5 Tech Spend Optimization & Spend Radar</b> · agente lê contratos e faturas; o gerente valida cada achado", "Ex.: <b>3.5 PE Tech Value Radar</b> · score comparável entre investidas", "Ex.: <b>1.7 AI Value & Governance Office</b> · assinatura Essencial · Avançado · Regulado", "Ex.: <b>2.4 Tech Project Rescue</b> · squad forense pronto em 1 semana", "Ex.: <b>1.1 Tech & AI Value Diagnostic</b> → 1.4 e 1.5 · meta de conversão sprint → execução"];
  const OPM=[["Dono de produto","1 por pilar + 1 de IA: P&L, roadmap e qualidade da ficha"],["Squad padrão","Sócio · gerente · 2 consultores · engenheiro de IA/dados"],["Comitê trimestral","Acompanha receita, margem e conversão; a revisão anual decide escalar, ajustar ou aposentar"]];
  const cs=CardStack($("csScene"),C.map(([n,t,p,li],i)=>`<div class="q">${n}</div><div class="k">PASSO ${n} DE 07</div><h3>${t}</h3><p>${p}</p><ul>${li.map(x=>`<li>${x}</li>`).join("")}</ul><div class="ex">${EXS[i]}</div>`),$("csDots"));
  $("csNext").onclick=()=>cs.next();$("csPrev").onclick=()=>cs.prev();ENTER["Fábrica de produtos"]=()=>{if(goLast)cs.to(C.length-1);else cs.reset()};
  /* → percorre os 7 passos antes de sair do slide; ← volta passo a passo (entrando pelo ←, abre no passo 07) */
  STEP["Fábrica de produtos"]=d=>{if(d>0&&cs.top<C.length-1){cs.next();return true}if(d<0&&cs.top>0){cs.prev();return true}return false};
  /* impressão: a pilha vira a lista dos 7 passos e uma página extra traz os 7 cards completos */
  PRINT.push(()=>{const sec=slides.find(s=>s.dataset.t==="Fábrica de produtos");cs.reset();
    if(!sec.querySelector(".cs-print")){const l=H("ol",{class:"cs-print"});$("csScene").after(l);C.forEach(([n,t,p])=>{H("li",{html:`<i>${n}</i><b>${t}</b><span>${p}</span>`},l)})}
    if(stage.querySelector(".cs-print-page"))return;const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","cs-print-page","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));c.querySelector(".hd .eyebrow").textContent="Os sete passos em detalhe · método, exemplo e entregas";
    const g=H("div",{class:"cs-grid"});C.forEach(([n,t,p,li],i)=>{H("div",{class:"cs-g",html:`<div class="k">PASSO ${n} DE 07</div><h4>${t}</h4><p>${p}</p><ul>${li.map(x=>`<li>${x}</li>`).join("")}</ul><div class="ex">${EXS[i]}</div>`},g)});
    /* 8ª célula: o modelo operacional que sustenta os sete passos (o mesmo do slide) */
    H("div",{class:"cs-g op",html:`<div class="k">MODELO OPERACIONAL DA FÁBRICA</div>${OPM.map(([t,x])=>`<div class="om"><b>${t}</b><span>${x}</span></div>`).join("")}<div class="ex">Proposta DTS</div>`},g);
    c.querySelector(".main").replaceWith(Object.assign(g,{className:"main cs-grid"}));sec.after(c)});
  /* anatomia: os blocos da ficha real (modelo Playbook), na ordem em que aparecem */
  [["1","Para quem é"],["2","Formato e encaixe"],["3","Origem"],["4","Por que A&amp;M"],["5","O problema"],["6","O que recebe"],["7","Como funciona"],["8","Números"],["9","Papel da IA"],["10","Como vira produto"],["11","Ferramentas e dados"],["12","Skills aplicadas"]].forEach(([n,t],i)=>{const d=H("div",{class:"anat-i","data-a":"up",style:`--d:${3+i}`},$("anat"));d.innerHTML=`<i>${n}</i><span>${t}</span>`});
  [["Sprint","Diagnóstico com escopo e preço fixos <span class=\"nwr\">(1–6 semanas)</span>",["1.1","2.4","3.1","4.6"]],["Execução","Programa com fee + êxito ou marcos",["1.5","2.3","3.3","4.3"]],["Assinatura","Radar ou escritório contínuo: receita recorrente",["1.7","3.5","1.5"]]].forEach(([t,x,ps],i)=>{const d=H("div",{class:"tier","data-a":"up",style:`--d:${8+i}`},$("tiers"));d.innerHTML=`<h4>${i+1} · ${t}</h4><p>${x}</p><div class="pls">${ps.map(c=>`<a href="#p=${PBY(c).id}" data-pd="${PBY(c).id}" class="plink sm ${PBY(c).st}">${c}</a>`).join("")}</div>`});
  [["Demanda recorrente","≥ 3 clientes por ano com o mesmo problema"],["Método repetível","≥ 70% do escopo igual entre clientes"],["Dados reaproveitáveis","cada projeto melhora o benchmark e o próximo"],["IA com ganho real","≥ 30% menos esforço nas etapas automatizadas"],["Preço por valor","fixo, êxito ou assinatura, defensável pelo resultado"],["Dono e squad","responsável pelo P&L e time treinado"]].forEach(([t,x],i)=>{const d=H("div",{class:"gate-i","data-a":"up",style:`--d:${14+i}`},$("gate"));d.innerHTML=`<i>✓</i><div><b>${t}</b><p>${x}</p></div>`});
  OPM.forEach(([t,x],i)=>{const d=H("div",{"data-a":"up",style:`--d:${11+i}`},$("opm"));d.innerHTML=`<h4>${t}</h4><p>${x}</p>`})})();

/* ---------- roadmap + decisões ---------- */
(function(){let tl=null;const mk=()=>{if(!tl)tl=Timeline($("tlLaunch"),TL_LAUNCH,{w:1520,y:198,cardY:2,x0:110,x1:1410,dwell:2400});return tl};
  ENTER["Roadmap e decisões"]=()=>{const t=mk();if(goLast){t.stopAuto();t.set(TL_LAUNCH.length-1)}else t.play()};$("tl2Play").onclick=()=>mk().play();
  /* → abre a próxima onda (interrompe a reprodução) antes de sair do slide; ← volta */
  STEP["Roadmap e decisões"]=d=>{if(!tl)return false;return d>0?tl.next():tl.prev()};
  /* impressão: as 5 ondas lado a lado, com todos os marcos acesos */
  PRINT.push(()=>{const t=mk();t.stopAuto();t.set(TL_LAUNCH.length-1);const h=$("tlLaunch");h.classList.add("tl-all");
    if(!h.querySelector(".tl-print"))H("div",{class:"tl-print",html:TL_LAUNCH.map(it=>`<div><div class="d">${it.d} · ${it.s}</div><h4>${it.t}</h4><p>${it.x}</p><span class="tg">${it.tag}</span></div>`).join("")},h)});
  ["<b>Aprovar o portfólio de 24 produtos</b> (5 manter · 15 aprimorar · 4 criar), os 4 A&amp;M Signature e os novos nomes dos pilares.","<b>Nomear donos de produto</b> (1 por pilar + 1 de IA) e instituir o comitê trimestral de portfólio.","<b>Investir na plataforma DTS</b>: LLM corporativo seguro, Spend Radar, benchmark DTS Brasil, biblioteca de agentes.","<b>Atacar as janelas de 2027</b>: Reforma Tributária (CBS em 01/01/2027) e orçamento/custo de tecnologia.","<b>Validar os 4 produtos novos</b> com 3–5 clientes-piloto cada, incluindo 1–2 fundos de PE.","<b>Alinhar fronteiras</b> com A&amp;M Tax, Data &amp; IA, PEPI e o Global AI Board (reuso de A&amp;M Assist e DiligenceGPT)."].forEach(x=>H("li",{html:x},$("decisions")));
  [["Pessoas","4 donos de produto (1 por pilar) + 1 de IA; 2–3 engenheiros de IA/dados; trilha de skills para o time"],["Ferramentas","LLM corporativo seguro; Power BI/Fabric; análise de código para DD e legado; repositório de agentes e prompts"],["Parcerias","1 hyperscaler e 1 laboratório de IA; ferramentas de análise de código e FinOps; A&M Tax e PEPI internamente"],["Dados","Benchmark DTS Brasil (gasto, maturidade, preços unitários), alimentado por cada projeto, anonimizado"]].forEach(([t,x],i)=>{const d=H("div",{class:"cap-i","data-a":"up",style:`--d:${10+i}`},$("caps"));d.innerHTML=`<b>${t}</b><p>${x}</p>`});
  [["≥30%","da receita DTS de produtos com IA no método em 2027"],["≥10%","de receita recorrente (radares e escritórios)"],["−30%","no tempo de entrega de diagnósticos e DDs"],["≥40%","de conversão sprint → execução"]].forEach(([v,l])=>{const d=H("div",null,$("kpisOK"));d.innerHTML=`<b>${v}</b><span>${l}</span>`})})();

/* ---------- fontes e método ---------- */
(function(){[["1","Big Four","Deloitte, PwC, EY e KPMG: nomes de ofertas, IA e sinais no Brasil · 62 fontes"],["2","Estratégia, integradores, pares e A&M","McKinsey, BCG, Bain, Kearney, Accenture, IBM, Capgemini, NTT DATA, hyperscalers, AlixPartners, A&M"],["3","Mercado Brasil e regulação","ABES/IDC, Cetic.br, IBGE, KPMG M&A, Reforma Tributária, Lei do Bem, PL 2338, ANPD, BACEN"],["4","Ferramentas de IA e produtização","Gartner, MIT NANDA, HFS, Everest, Forrester e fornecedores (AWS, IBM, GitHub, CAST, Vertice, Flexera)"],["H","Avaliação do portfólio","Escores do Raio-X e desenho dos produtos: julgamento qualitativo DTS, a calibrar com os sócios"]].forEach(([n,t,x])=>{const d=H("div",{class:"mt-i"},$("method"));d.innerHTML=`<i class="${n==="H"?"h":""}">${n}</i><div><b>${t}</b><p>${x}</p></div>`});
  const SRC=[["Mercado de TI e IA","ABES/IDC, Mercado Brasileiro de Software (mar/2026) · IDC, gastos com IA (2026) · Cetic.br, TIC Empresas 2025 · IBGE, PINTEC Semestral (set/2025) · Gartner, gastos de TI e IA (abr–mai/2026)"],
   ["Valor de IA e projetos","PwC, 29ª CEO Survey (jan/2026) · Deloitte, State of AI 2026 · MIT NANDA, GenAI Divide (2025) · Gartner, agentic AI (jun/2025) e ERP (nov/2025) · McKinsey/Oxford, grandes projetos de TI"],
   ["M&A","KPMG, Pesquisa de Fusões e Aquisições 2025 (mar/2026) e 1S26 (ago/2026) · TTR/Aon/Datasite (2026) · imprensa: MBRF, Petz+Cobasi, Braskem, Raízen, Motiva"],
   ["Regulação","EC 132/2023 · LC 214/2025 · LC 227/2026 · Decreto 12.955/2026 · LC 224/2025 · PL 2338/2023 (MobileTime, ago/2026) · Lei 15.352/2026 (ANPD) · Res. CMN 5.274/2025"],
   ["Consultorias","Press releases de Deloitte, PwC, EY e KPMG (2025–26) · McKinsey via BI/HBR (jan/2026) · BCG (abr/2026) · Bain (jul/2026) · AlixPartners (ago/2026) · A&M (05/05/2026) e Bloomberg (04/05/2026)"],
   ["Ferramentas","AWS Transform (SiliconANGLE mai/2025; preços set/2026) · IBM WCA for Z e Bob · GitHub Copilot app modernization · CAST (caso EY) · Vertice · Flexera State of the Cloud 2026 · State of FinOps 2026"]];
  SRC.forEach(([t,x],i)=>{const d=H("div",{class:"card","data-a":"up",style:`--d:${2+i}`},$("sources"));d.innerHTML=`<span class="label">${t}</span><p>${x}</p>`});
  const g=H("div",{class:"card gap","data-a":"up",style:"--d:9"},$("sources"));g.innerHTML=`<span class="label">Lacunas a investigar antes do uso externo · pendente</span><ul>${["Posicionamento verificado de Stefanini, Sonda, NTT DATA, Compass UOL, Accenture Brasil, Bip, Visagio, Integration e ISG","Ofertas de FTI, Huron, Accordion, West Monroe e Crosslake (pares de PE) não reverificadas","Ofertas de Lei do Bem de Deloitte, PwC e EY; nomes oficiais em português das ofertas das Big Four","Status da sanção do Redata e da votação do PL 2338 após as eleições","Discrepância IDC sobre gasto com IA no Brasil (US$ 3,4 bi × US$ 4,2 bi)","Validação dos 4 produtos novos com 3–5 clientes-piloto cada"].map(x=>`<li>${x}</li>`).join("")}</ul>`})();

/* ---------- jornada comercial e posicionamento por pilar ---------- */
const JR={1:[["Gatilho","Troca de CIO · orçamento 2027 · conselho cobra IA",[],"evento que abre a conversa"],["Entrada · sprint","Diagnóstico em 3 semanas",["1.1"],"valor em jogo em R$ e 10 decisões"],["Expansão · execução","Assumir, redesenhar e cortar",["1.3","1.4","1.5"],"a A&M entra no comando"],["Recorrência","Radar e escritório contínuos",["1.5","1.7"],"assinatura que sustenta o resultado"]],
 2:[["Gatilho","CBS em 01/01/2027 · go-live em risco · IA ociosa",[],"prazo fixo e risco alto"],["Entrada · sprint","Prontidão ou diagnóstico forense",["2.2","2.4"],"2–8 semanas, preço fixo"],["Expansão · execução","Governar, recuperar, contratar",["2.3","2.1"],"entrega garantida"],["Recorrência","IA na própria TI, em ondas",["2.6","2.5"],"ganho medido trimestre a trimestre"]],
 3:[["Gatilho","Mandato de compra ou venda · carve-out anunciado",[],"relógio do deal"],["Entrada · sprint","Red flag em 1 semana",["3.1"],"DD com IA, 3 níveis"],["Expansão · execução","Dia 1, TSA e sinergias",["3.2","3.3","3.4"],"do signing ao Dia 100"],["Recorrência","Radar do portfólio do fundo",["3.5"],"assinatura anual · leitura trimestral por investida"]],
 4:[["Gatilho","Renovação VMware · incidente · legado sem dono",[],"custo ou risco explícito"],["Entrada · sprint","Raio-X do legado ou TCO",["4.6","4.3"],"4–10 semanas, fixo ou fixo + % de economia"],["Expansão · execução","Arquitetura, racionalização, assurance",["4.1","4.2","4.4"],"rota e garantia"],["Recorrência","Resiliência e arquitetura vivas",["4.5","4.1"],"exercícios anuais e repositório"]]};
document.querySelectorAll(".jr-wrap").forEach(h=>{const n=h.dataset.pillar;h.innerHTML=`<span class="ttl">Jornada comercial do pilar · entrada → expansão → recorrência · proposta DTS</span><div class="jr">${JR[n].map(([k,t,ps,x],i)=>`<div class="jr-i ${i===0?"l":i===3?"r":""}"><div class="k">${k}</div><b>${t}</b><div class="jr-c">${ps.map(c=>pcode(c,"sm")).join("")}</div><p>${x}</p></div>`).join("")}</div>`});
const POS={1:"Para <b>CEOs, CFOs, conselhos e fundos</b> que precisam de resultado de tecnologia agora, o DTS é <em>a liderança que assume o cargo e entrega valor em R$, com IA no método</em>. Diferente de Big Four e estratégia, <b>assinamos o resultado</b> e não vendemos plataforma.",
 2:"Para <b>CFOs, CIOs e sponsors</b> de programas obrigatórios e críticos, o DTS é <em>a voz independente que garante a entrega</em> (Reforma, ERP, IA). Diferente de integradores e fornecedores, <b>não vendemos software nem horas de fábrica</b>: respondemos por prazo e valor.",
 3:"Para <b>fundos de PE e compradores estratégicos</b>, o DTS é <em>o operador de tecnologia do signing à saída</em>: DD com IA em 1–3 semanas, Dia 1 sem susto e sinergias que viram EBITDA. Diferente de quem só diligencia, <b>executamos o que recomendamos</b>.",
 4:"Para <b>CIOs e CFOs</b> presos a legado caro e arriscado, o DTS é <em>quem escolhe a rota e garante a modernização</em>, usando IA para ler o legado, neutro em fornecedor. Diferente de hyperscalers e fábricas, <b>não revendemos ferramenta</b>: respondemos pelo business case."};
document.querySelectorAll(".pos").forEach(h=>{h.innerHTML=`<div class="t">Posicionamento proposto</div><p>${POS[h.dataset.pos]} <span class="hy">Hipótese</span></p>`});

