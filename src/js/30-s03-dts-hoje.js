/* =====================================================================
   SLIDE 03 · DTS hoje (Shimmer / Holographic Sweep + escudo DTS) · dono: slide 03
   Ganchos pela chave data-s: ENTER["03"] (ao entrar), STEP["03"] (→/← internos), PRINT.push(f) (impressão).
   Sem pessoas (regra do usuário, SPEC V6 §0).
   ===================================================================== */
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
  ENTER["03"]=reset;PRINT.push(()=>{clearAll();loaded=false;load();clearAll();vals.forEach(el=>el.classList.add("is-in"));
    rows.forEach(r=>{const b=r.querySelector(".sh__bar i");b.style.transition="none";b.style.width=r.dataset.w+"%"});
    kpis.forEach(k=>{k.querySelector("[data-out]").textContent=fmt(parseFloat(k.dataset.value),parseInt(k.dataset.dec,10)||0)})})})();
