/* =====================================================================
   SLIDE 01 · Capa · dono: abertura
   fx 30 Particle System (repelir e atrair; clique = pulso) em canvas de 1600 × 900, atrás do título e em volta
   do monograma A&M desconstruído (window.AMMono, src/js/07-monograma.js) à direita.
   ENTER["01"]: liga o campo e toca a entrada do monograma (≈ 2,3 s, depois laços leves e paralaxe suave).
   Ao sair: para o campo e deixa o monograma no estado final, sem laços nem paralaxe.
   PRINT: o campo sai como imagem estática (cópia PNG do canvas, .s01-print) e o monograma no estado final.
   ===================================================================== */
(function(){const sec=SL("01");if(!sec)return;
  const root=sec.querySelector(".ps"),cv=root&&root.querySelector(".ps__cv"),mono=sec.querySelector(".s01-mono");if(!root||!cv)return;
  const lg=sec.querySelector(".cv-logos");if(lg)lg.innerHTML=`${amLogo(44)}<i></i>${dtsLogo(36)}`;

  /* ---------- monograma ---------- */
  const MO={w:820,anim:true,theme:"navy",fundo:true,reflexo:false,parallax:true};
  const monoIn=()=>{if(!window.AMMono||!mono)return;AMMono.mount(mono,MO);AMMono.play(mono)};
  const monoOut=()=>{if(!window.AMMono||!mono)return;AMMono.mount(mono,Object.assign({},MO,{parallax:false}));AMMono.stop(mono)};

  /* ---------- campo de partículas ---------- */
  const W=1600,H=900,dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  let ctx=cv.getContext("2d",{alpha:true});if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);
  const P=[],pulses=[],COUNT=REDMO?60:90;let mode="repel",cursor=null,idle=0,lost=false,running=false,raf=0,last=0;
  const SPEED=REDMO?.07:.28,LINK=Math.min(130,70+3600/COUNT),L2=LINK*LINK,CUR=150;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  for(let i=0;i<COUNT;i++){const hub=Math.random()<.07;P.push({x:rnd(0,W),y:rnd(0,H),vx:rnd(-1,1)*SPEED,vy:rnd(-1,1)*SPEED,r:hub?rnd(2.8,3.6):rnd(1.2,2.2),hub})}
  cv.addEventListener("contextlost",ev=>{ev.preventDefault();lost=true});
  cv.addEventListener("contextrestored",()=>{ctx=cv.getContext("2d");if(ctx){ctx.setTransform(dpr,0,0,dpr,0,0);lost=false}});
  const toLocal=ev=>{const r=cv.getBoundingClientRect(),sc=r.width/W||1;return{x:(ev.clientX-r.left)/sc,y:(ev.clientY-r.top)/sc}};
  root.addEventListener("pointermove",ev=>{cursor=toLocal(ev);idle=0});
  root.addEventListener("pointerleave",()=>{cursor=null});
  root.addEventListener("pointerdown",ev=>{if(ev.target.closest("button"))return;const c=toLocal(ev);pulses.push({x:c.x,y:c.y,r:0,a:1})});
  const tgs=[...root.querySelectorAll("[data-mode]")];
  tgs.forEach(b=>b.addEventListener("click",ev=>{ev.stopPropagation();mode=b.dataset.mode;tgs.forEach(x=>{const on=x===b;x.classList.toggle("is-on",on);x.setAttribute("aria-pressed",on?"true":"false")})}));

  function step(k){
    for(let i=0;i<P.length;i++){const p=P[i];
      if(cursor){const dx=p.x-cursor.x,dy=p.y-cursor.y,d2=dx*dx+dy*dy;
        if(d2<CUR*CUR&&d2>1){const d=Math.sqrt(d2),g=REDMO?.3:1;
          if(mode==="repel"){const f=(1-d/CUR)*.9*g*k;p.vx+=dx/d*f;p.vy+=dy/d*f}
          else{const f=((d-62)/CUR)*1.1*g*k,sw=(1-d/CUR)*.3*g*k;p.vx+=-dx/d*f-dy/d*sw;p.vy+=-dy/d*f+dx/d*sw}}}
      for(let q=0;q<pulses.length;q++){const u=pulses[q],dx=p.x-u.x,dy=p.y-u.y,d=Math.sqrt(dx*dx+dy*dy);if(d>2&&Math.abs(d-u.r)<22){const f=(REDMO?.4:1.4)*k*u.a;p.vx+=dx/d*f;p.vy+=dy/d*f}}
      p.vx*=.975;p.vy*=.975;const sp=Math.sqrt(p.vx*p.vx+p.vy*p.vy),max=REDMO?1.2:3.2;if(sp>max){p.vx*=max/sp;p.vy*=max/sp}
      if(sp<SPEED*.6){p.vx+=rnd(-.02,.02)*k;p.vy+=rnd(-.02,.02)*k}
      p.x+=p.vx*k;p.y+=p.vy*k;
      if(p.x<0){p.x=0;p.vx=Math.abs(p.vx)}else if(p.x>W){p.x=W;p.vx=-Math.abs(p.vx)}
      if(p.y<0){p.y=0;p.vy=Math.abs(p.vy)}else if(p.y>H){p.y=H;p.vy=-Math.abs(p.vy)}}
    for(let q=pulses.length-1;q>=0;q--){const u=pulses[q];u.r+=(REDMO?3:6)*k;u.a-=.018*k;if(u.a<=0)pulses.splice(q,1)}}
  function draw(cf){if(!ctx||lost)return;
    ctx.clearRect(0,0,W,H);ctx.lineWidth=1;
    for(let i=0;i<P.length;i++){const a=P[i];for(let j=i+1;j<P.length;j++){const b=P[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;
      if(d2<L2){const al=(1-Math.sqrt(d2)/LINK)*.55;ctx.strokeStyle=`rgba(163,184,214,${al.toFixed(3)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}
    if(cursor&&cf>0){for(let i=0;i<P.length;i++){const p=P[i],dx=p.x-cursor.x,dy=p.y-cursor.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<CUR){ctx.strokeStyle=`rgba(255,138,76,${((1-d/CUR)*.5*cf).toFixed(3)})`;ctx.beginPath();ctx.moveTo(cursor.x,cursor.y);ctx.lineTo(p.x,p.y);ctx.stroke()}}
      ctx.strokeStyle=`rgba(255,138,76,${(.3*cf).toFixed(3)})`;ctx.beginPath();ctx.arc(cursor.x,cursor.y,CUR,0,Math.PI*2);ctx.stroke()}
    for(let q=0;q<pulses.length;q++){const u=pulses[q];ctx.strokeStyle=`rgba(255,255,255,${(u.a*.5).toFixed(3)})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(u.x,u.y,u.r,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1}
    for(let i=0;i<P.length;i++){const p=P[i];ctx.fillStyle=p.hub?"#FF8A4C":"#C9D6E8";if(p.hub){ctx.shadowColor="rgba(255,138,76,.9)";ctx.shadowBlur=10}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}}
  function frame(t){if(!running)return;const dt=Math.min(64,t-last);last=t;
    step(dt/16.7);idle+=dt;draw(cursor?Math.max(0,Math.min(1,1-(idle-400)/600)):0);
    raf=requestAnimationFrame(frame)}
  function start(){if(running)return;running=true;last=performance.now();raf=requestAnimationFrame(frame)}
  function stop(){running=false;cancelAnimationFrame(raf)}
  draw(0);   /* primeiro quadro estático: a capa nunca aparece vazia (nem antes do ENTER, nem na impressão) */
  /* impressão: o Chromium imprime o canvas como imagem opaca (branca onde é transparente); a cópia em PNG entra no lugar dele */
  const pim=sec.querySelector(".s01-print");
  const snap=()=>{if(!pim||lost)return;try{pim.src=cv.toDataURL("image/png")}catch(e){}};
  setTimeout(snap,1200);

  /* saída do slide: para o campo, monograma no estado final */
  new MutationObserver(()=>{if(!sec.classList.contains("active")){stop();monoOut()}}).observe(sec,{attributes:true,attributeFilter:["class"]});
  ENTER["01"]=()=>{start();monoIn()};
  PRINT.push(()=>{cursor=null;pulses.length=0;if(!running)draw(0);if(pim&&!pim.getAttribute("src"))snap();monoOut()});
})();
