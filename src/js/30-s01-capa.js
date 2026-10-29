/* =====================================================================
   SLIDE 01 · Capa (Particle System: repelir, atrair, pulso) · dono: slide 01
   Ganchos pela chave data-s: ENTER["01"] (ao entrar), STEP["01"] (→/← internos), PRINT.push(f) (impressão).
   ===================================================================== */
/* ---------- capa · Particle System ---------- */
(function(){const sec=SL("01"),root=$("ps"),cv=root.querySelector(".ps__cv"),title=root.querySelector(".ps__title");
  const lg=$("cvLogos");if(lg)lg.innerHTML=`${amLogo(44)}<i></i>${dtsLogo(36)}`;
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
  ENTER["01"]=()=>{start();title.style.transition="none";title.style.opacity=0;title.style.transform="translateY(14px)";void title.offsetWidth;title.style.transition=REDMO?"none":"opacity .7s cubic-bezier(.22,.61,.36,1) .15s,transform .7s cubic-bezier(.22,.61,.36,1) .15s";title.style.opacity=1;title.style.transform="none"};
  PRINT.push(()=>{title.style.opacity=1;title.style.transform="none";if(!running){start();setTimeout(stop,400)}})})();
