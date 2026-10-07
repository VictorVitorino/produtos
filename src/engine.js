"use strict";
/* =====================================================================
   MOTOR DE APRESENTAÇÃO · A&M DTS
   helpers · chrome · navegação · painéis · efeitos
   ===================================================================== */
const NS="http://www.w3.org/2000/svg",$=id=>document.getElementById(id);
function S(t,a,p){const e=document.createElementNS(NS,t);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function H(t,a,p,x){const e=document.createElement(t);if(a)for(const k in a){if(k==="class")e.className=a[k];else if(k==="style")e.style.cssText=a[k];else if(k==="html")e.innerHTML=a[k];else e.setAttribute(k,a[k])}if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e}
function T(p,x,y,s,a){const t=S("text",Object.assign({x,y},a||{}),p);t.textContent=s;return t}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const REDMO=matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease={inOut:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,out:t=>1-Math.pow(1-t,3)};
const STATUS={keep:["Manter","keep"],ai:["Aprimorar com IA","ai"],new:["Criar com IA","new"],cut:["Retirar","cut"],merge:["Fundir","merge"]};
const SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>';
const stTag=k=>`<span class="st ${STATUS[k][1]}">${k==="ai"||k==="new"?SPARK:""}${STATUS[k][0]}</span>`;
const ev=t=>`<span class="ev" title="Evidência com fonte">${t||"Evidência"}</span>`;
const hy=t=>`<span class="hy" title="Hipótese / inferência a validar">${t||"Hipótese"}</span>`;
function tip(el,v,l){el.setAttribute("data-tv",v);el.setAttribute("data-tl",l||"")}

/* logo A&M com shimmer holográfico (máscara pela própria marca) */
const amLogo=(h)=>`<span class="am-logo" style="height:${h}px;width:${Math.round(h*227/36)}px" role="img" aria-label="Alvarez &amp; Marsal Performance"></span>`;
const dtsLogo=(h,dark)=>`<img class="dts-logo" src="${dark===false?LOGO_DTS_NAVY:LOGO_DTS}" alt="DTS · Digital &amp; Technology Services" style="height:${h}px;width:auto">`;

/* kinetic type */
function kin(el){let k=0;const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/),f=document.createDocumentFragment();parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return}const w=document.createElement("span");w.className="kw";const i=document.createElement("span");i.style.setProperty("--k",k++);i.textContent=p;w.appendChild(i);f.appendChild(w)});c.replaceWith(f)}else if(c.nodeType===1&&!c.classList.contains("kw"))walk(c)})};walk(el)}
function count(el,from,to,suf,dur){if(REDMO){el.textContent=fmt(to)+suf;return}const t0=performance.now(),d=dur||1100;const st=t=>{const k=clamp((t-t0)/d,0,1);el.textContent=fmt(from+(to-from)*ease.out(k))+suf;if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}
const fmt=v=>{const r=Math.round(v*10)/10;return (r%1?r.toFixed(1):String(Math.round(r))).replace(".",",")};

/* =====================================================================
   EFEITO · MORPHING SHAPES (interpolação ponto a ponto, 120 âncoras)
   ===================================================================== */
const MORPH_N=120;
function resample(poly,N){const P=poly.slice();P.push(P[0]);const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const tot=L[L.length-1],out=[];let j=1;for(let k=0;k<N;k++){const d=tot*k/N;while(L[j]<d)j++;const t=(d-L[j-1])/((L[j]-L[j-1])||1);out.push([P[j-1][0]+(P[j][0]-P[j-1][0])*t,P[j-1][1]+(P[j][1]-P[j-1][1])*t])}return out}
function polyFromVerts(v,cx,cy){/* começa no topo-centro e segue horário */const top=[cx,Math.min(...v.map(p=>p[1]))];return startTop(densify(v),cx)}
function densify(v){const o=[];for(let i=0;i<v.length;i++){const a=v[i],b=v[(i+1)%v.length];for(let k=0;k<40;k++)o.push([a[0]+(b[0]-a[0])*k/40,a[1]+(b[1]-a[1])*k/40])}return o}
function startTop(pts,cx){let bi=0,bv=1e9;pts.forEach((p,i)=>{const s=p[1]*1000+Math.abs(p[0]-cx);if(Math.abs(p[0]-cx)<6&&p[1]<bv){bv=p[1];bi=i}});if(bv===1e9){pts.forEach((p,i)=>{if(p[1]<bv){bv=p[1];bi=i}})}return pts.slice(bi).concat(pts.slice(0,bi))}
const SHAPES={
  circle:(cx,cy,r)=>{const o=[];for(let k=0;k<MORPH_N;k++){const a=-Math.PI/2+2*Math.PI*k/MORPH_N;o.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}return o},
  blob:(cx,cy,r,ph)=>{const o=[];for(let k=0;k<MORPH_N;k++){const a=-Math.PI/2+2*Math.PI*k/MORPH_N;const rr=r*(1+.13*Math.sin(3*a+(ph||0))+.07*Math.sin(5*a+1.7+(ph||0)));o.push([cx+rr*Math.cos(a),cy+rr*Math.sin(a)])}return o},
  hex:(cx,cy,r)=>{const v=[];for(let k=0;k<6;k++){const a=-Math.PI/2+k*Math.PI/3;v.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}return resample(startTop(densify(v),cx),MORPH_N)},
  square:(cx,cy,s,rad)=>{const h=s/2,r=rad||s*.12,o=[];const arc=(x,y,a0)=>{for(let k=0;k<=10;k++){const a=a0+k*(Math.PI/2)/10;o.push([x+r*Math.cos(a),y+r*Math.sin(a)])}};
    o.push([cx,cy-h]);arc(cx+h-r,cy-h+r,-Math.PI/2);arc(cx+h-r,cy+h-r,0);arc(cx-h+r,cy+h-r,Math.PI/2);arc(cx-h+r,cy-h+r,Math.PI);return resample(o,MORPH_N)},
  diamond:(cx,cy,r)=>resample(startTop(densify([[cx,cy-r],[cx+r,cy],[cx,cy+r],[cx-r,cy]]),cx),MORPH_N)
};
const toD=pts=>"M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")+"Z";
function morphTo(path,from,to,dur,done){if(REDMO){path.setAttribute("d",toD(to));done&&done();return()=>{}}let raf;const t0=performance.now();const st=t=>{const k=clamp((t-t0)/dur,0,1),e=ease.inOut(k);path.setAttribute("d",toD(from.map((p,i)=>[p[0]+(to[i][0]-p[0])*e,p[1]+(to[i][1]-p[1])*e])));if(k<1)raf=requestAnimationFrame(st);else done&&done()};raf=requestAnimationFrame(st);return()=>cancelAnimationFrame(raf)}
/* morph cíclico entre estados · clique fixa */
function Morpher(cfg){const{path,states,onState,dwell=2600,dur=1150}=cfg;let i=0,cur=states[0].pts,stop=()=>{},timer=0,fixed=false;path.setAttribute("d",toD(cur));
  function go(k,manual){k=(k+states.length)%states.length;stop();clearTimeout(timer);const from=readD();i=k;onState&&onState(k,states[k]);stop=morphTo(path,from,states[k].pts,dur,()=>{cur=states[k].pts;if(!fixed)timer=setTimeout(()=>go(i+1),dwell)});if(manual)fixed=true}
  function readD(){const d=path.getAttribute("d").slice(1,-1).split("L").map(s=>s.split(" ").map(Number));return d.length===MORPH_N?d:cur}
  return{go,play(){fixed=false;clearTimeout(timer);go(0)},pause(){clearTimeout(timer);stop()},get i(){return i}}}

/* =====================================================================
   EFEITO · SPOTLIGHT / FOCUS
   ===================================================================== */
function Spotlight(host,steps,segHost){const spot=H("div",{class:"spot"},host),cap=H("div",{class:"spot-cap"},host);let cur=-1;
  function rectOf(st){if(st.rect)return st.rect;const els=st.sel.split(",").map(s=>host.querySelector(s.trim())).filter(Boolean);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const hr=host.getBoundingClientRect(),sc=hr.width/host.offsetWidth||1;els.forEach(el=>{const r=el.getBoundingClientRect();x0=Math.min(x0,(r.left-hr.left)/sc);y0=Math.min(y0,(r.top-hr.top)/sc);x1=Math.max(x1,(r.right-hr.left)/sc);y1=Math.max(y1,(r.bottom-hr.top)/sc)});const p=st.pad==null?6:st.pad;return{x:x0-p,y:y0-p,w:x1-x0+2*p,h:y1-y0+2*p}}
  function set(k){cur=k;const btns=segHost?[...segHost.querySelectorAll("button")]:[];btns.forEach((b,j)=>b.classList.toggle("on",j===k+1));segSync(segHost);
    if(k<0){spot.classList.remove("on");cap.classList.remove("on");return}const st=steps[k],r=rectOf(st);Object.assign(spot.style,{left:r.x+"px",top:r.y+"px",width:r.w+"px",height:r.h+"px"});spot.classList.add("on");
    cap.innerHTML=`<b class="tt">${st.title}</b>${st.text}`;const cw=380;let cx=st.capX!=null?st.capX:(r.x+r.w+16+cw<host.offsetWidth?r.x+r.w+16:r.x-cw-16);if(cx<0)cx=Math.min(host.offsetWidth-cw,r.x+20);const cy=st.capY!=null?st.capY:Math.max(0,Math.min(host.offsetHeight-140,r.y+20));cap.style.left=cx+"px";cap.style.top=cy+"px";cap.classList.add("on")}
  if(segHost){const all=H("button",{class:"on"},segHost,"Visão geral");all.onclick=()=>set(-1);steps.forEach((s,k)=>{const b=H("button",null,segHost,s.btn||s.title);b.onclick=()=>set(cur===k?-1:k)})}
  return{set,get cur(){return cur},next(){if(cur<steps.length-1){set(cur+1);return true}set(-1);return false}}}
function segSync(sg){if(!sg)return;requestAnimationFrame(()=>{let ind=sg.querySelector(".seg-ind");if(!ind){ind=H("span",{class:"seg-ind"});sg.prepend(ind)}const on=sg.querySelector("button.on");if(on){ind.style.opacity=1;ind.style.left=on.offsetLeft+"px";ind.style.width=on.offsetWidth+"px"}else ind.style.opacity=0})}

/* =====================================================================
   EFEITO · BEFORE / AFTER SLIDER
   ===================================================================== */
function BeforeAfter(box,opts){const asis=box.querySelector(".ba-asis"),hd=H("div",{class:"ba-handle"},box);H("div",{class:"ba-knob"},hd,"⇔");const la=H("span",{class:"ba-lab l"},box,opts&&opts.l||"HOJE · AS-IS"),lb=H("span",{class:"ba-lab r"},box,opts&&opts.r||"PROPOSTA · TO-BE");
  let X=100,raf=0,drag=false;const W=()=>box.offsetWidth;
  function set(p){X=clamp(p,0,100);asis.style.clipPath=`inset(0 ${100-X}% 0 0)`;hd.style.left=X+"%";la.style.opacity=X<14?0:1;lb.style.opacity=X>86?0:1;opts&&opts.onMove&&opts.onMove(X)}
  function tween(to,d){cancelAnimationFrame(raf);if(REDMO){set(to);return}const from=X,t0=performance.now(),dd=d||900;const st=t=>{const k=clamp((t-t0)/dd,0,1);set(from+(to-from)*ease.inOut(k));if(k<1)raf=requestAnimationFrame(st)};raf=requestAnimationFrame(st)}
  const toP=e=>{const r=box.getBoundingClientRect();return (e.clientX-r.left)/r.width*100};
  hd.addEventListener("pointerdown",e=>{drag=true;hd.setPointerCapture(e.pointerId);cancelAnimationFrame(raf);e.stopPropagation()});
  hd.addEventListener("pointermove",e=>{if(drag)set(toP(e))});hd.addEventListener("pointerup",()=>drag=false);hd.addEventListener("pointercancel",()=>drag=false);
  box.addEventListener("click",e=>{if(e.target.closest(".tobe-card,.ba-handle,a,button"))return;tween(toP(e),500)});
  box.tabIndex=0;box.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){set(X-2);e.stopPropagation();e.preventDefault()}else if(e.key==="ArrowRight"){set(X+2);e.stopPropagation();e.preventDefault()}});
  set(100);return{set,tween,get x(){return X},demo(){set(100);setTimeout(()=>tween(opts&&opts.rest!=null?opts.rest:36,1600),900)}}}

/* =====================================================================
   EFEITO · CARD STACK
   ===================================================================== */
function CardStack(scene,cards,dotsHost,onChange){let order=cards.map((_,i)=>i);const els=cards.map((c,i)=>{const el=H("div",{class:"cs-card",html:c},scene);return el});
  const dots=dotsHost?cards.map(()=>H("i",null,dotsHost)):[];
  function layout(){order.forEach((ci,pos)=>{const el=els[ci];el.style.zIndex=100-pos;el.style.transform=`translateY(${-pos*16}px) scale(${1-pos*.05})`;el.style.opacity=pos>3?0:1;el.style.pointerEvents=pos===0?"auto":"none"});dots.forEach((d,k)=>d.classList.toggle("on",k===order[0]));onChange&&onChange(order[0])}
  function next(){const top=els[order[0]];top.style.transition="transform .32s ease-in,opacity .32s";top.style.transform="translate(115%,-20px) rotate(14deg)";top.style.opacity=0;setTimeout(()=>{top.style.transition="";order.push(order.shift());layout()},320)}
  function prev(){order.unshift(order.pop());const el=els[order[0]];el.style.transition="none";el.style.transform="translate(-115%,-20px) rotate(-14deg)";el.style.opacity=0;void el.offsetWidth;el.style.transition="";layout()}
  els.forEach(el=>{let sx=0,dx=0,dn=false;el.addEventListener("pointerdown",e=>{if(el.style.pointerEvents==="none")return;dn=true;sx=e.clientX;dx=0;el.setPointerCapture(e.pointerId);el.style.transition="none"});
    el.addEventListener("pointermove",e=>{if(!dn)return;dx=(e.clientX-sx)/(scene.getBoundingClientRect().width/scene.offsetWidth);el.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`});
    el.addEventListener("pointerup",()=>{if(!dn)return;dn=false;el.style.transition="";if(Math.abs(dx)>80||Math.abs(dx)<4)next();else layout()})});
  layout();return{next,prev,reset(){order=cards.map((_,i)=>i);layout()}}}

/* =====================================================================
   EFEITO · TIMELINE MOTION
   ===================================================================== */
function Timeline(host,items,o){const W=host.offsetWidth||o.w,y=o.y||250,x0=o.x0||60,x1=(o.x1||W-60);const xs=items.map((_,i)=>x0+(x1-x0)*(items.length===1?0:i/(items.length-1)));
  const track=H("div",{class:"tl-track",style:`left:${x0}px;width:${x1-x0}px;top:${y}px`},host),prog=H("div",{class:"tl-prog",style:`left:${x0}px;top:${y}px`},host);
  const dots=items.map((it,i)=>{const d=H("button",{class:"tl-dot",style:`left:${xs[i]}px;top:${y+2}px`,"aria-label":it.t},host);d.onclick=()=>{stopAuto();set(i)};return d});
  const dates=items.map((it,i)=>H("div",{class:"tl-date",style:`left:${xs[i]}px;top:${y+22}px`},host,it.d));
  const labs=items.map((it,i)=>H("div",{class:"tl-lab",style:`left:${xs[i]}px;top:${y+40}px`},host,it.s||""));
  const card=H("div",{class:"tl-card",style:`top:${o.cardY!=null?o.cardY:y-200}px;opacity:0`},host);let cur=-1,auto=0;
  function set(i){cur=i;prog.style.width=(i<0?0:xs[i]-x0)+"px";dots.forEach((d,k)=>{d.classList.toggle("done",k<i);d.classList.toggle("cur",k===i)});dates.forEach((d,k)=>d.classList.toggle("on",k<=i));labs.forEach((d,k)=>d.classList.toggle("on",k<=i));
    if(i<0){card.style.opacity=0;return}const it=items[i];card.innerHTML=`<div class="d">${it.d}${it.tag?" · "+it.tag:""}</div><h4>${it.t}</h4><p>${it.x}</p>${it.src?`<div class="src">${it.src}</div>`:""}`;const cw=card.offsetWidth||420;card.style.left=clamp(xs[i]-cw/2,0,W-cw)+"px";card.style.opacity=1;o.onSet&&o.onSet(i)}
  function stopAuto(){clearInterval(auto);auto=0;o.onAuto&&o.onAuto(false)}
  function play(){stopAuto();set(-1);let k=-1;const step=()=>{k++;if(k>=items.length){stopAuto();return}set(k)};setTimeout(step,500);auto=setInterval(step,o.dwell||2600);o.onAuto&&o.onAuto(true)}
  return{set,play,stopAuto,next(){stopAuto();if(cur<items.length-1){set(cur+1);return true}return false},prev(){stopAuto();if(cur>0){set(cur-1);return true}return false},get cur(){return cur},get auto(){return !!auto}}}
