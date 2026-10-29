/* =====================================================================
   SLIDE 03 · DTS hoje (Shimmer / Holographic Sweep + escudo DTS) · dono: slide 03 (partida)
   - Shimmer: ao entrar, o painel mostra o esqueleto (blocos com brilho correndo) por um instante; depois o conteúdo
     real pousa em cascata, os números contam e as barras crescem. Sem controles de demonstração.
   - Holographic Sweep: o escudo DTS recebe uma faixa de luz periódica (CSS) e uma passada extra quando o cursor entra;
     inclinação leve com o cursor (tilt, da fundação).
   - Movimento reduzido, volta pelo ← e impressão: estado final direto.
   Números: estruturais do portfólio oficial (4 pilares, 29 serviços, 10 · 7 · 8 · 4). Sem pessoas (SPEC §0).
   Ganchos: ENTER["03"], PRINT.
   ===================================================================== */
(function(){const sec=SL("03");if(!sec)return;
  const panel=sec.querySelector(".s03-panel"),badge=sec.querySelector(".s03-badge");if(!panel||!badge)return;
  const vals=[...panel.querySelectorAll(".s03-v")],bars=[...panel.querySelectorAll(".s03-bar i")],nums=[...panel.querySelectorAll("[data-n]")];
  let timers=[],rafs=[];
  const clear=()=>{timers.forEach(clearTimeout);timers=[];rafs.forEach(cancelAnimationFrame);rafs=[]};
  const later=(f,ms)=>timers.push(setTimeout(f,ms));
  /* contador: de 0 ao valor, com desaceleração */
  const tween=(el,to,dur)=>{const t0=performance.now();const st=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=String(Math.round(to*e));if(k<1)rafs.push(requestAnimationFrame(st))};rafs.push(requestAnimationFrame(st))};
  const setBar=(b,w,anim)=>{b.style.transition=anim?"":"none";b.style.width=w};
  /* estado final (impressão, movimento reduzido, volta pelo ←) */
  function final(){clear();vals.forEach(v=>v.classList.add("is-in"));bars.forEach(b=>setBar(b,b.dataset.w+"%",false));nums.forEach(n=>{n.textContent=n.dataset.n})}
  /* esqueleto: valores escondidos, barras vazias, contadores zerados */
  function reset(){clear();vals.forEach(v=>v.classList.remove("is-in"));bars.forEach(b=>setBar(b,"0",false));nums.forEach(n=>{n.textContent="0"})}
  /* o conteúdo real pousa: cascata dos valores (cada bloco do esqueleto some com o seu valor), contagem e barras */
  function load(){
    vals.forEach((v,i)=>later(()=>v.classList.add("is-in"),60+i*34));
    nums.forEach((n,i)=>later(()=>tween(n,+n.dataset.n,850),220+i*80));
    bars.forEach((b,i)=>later(()=>{void b.offsetWidth;setBar(b,b.dataset.w+"%",true)},420+i*90))}
  ENTER["03"]=()=>{if(REDMO||goLast){final();return}reset();void panel.offsetWidth;later(load,850)};
  /* escudo: uma passada extra da faixa holográfica quando o cursor entra; depois volta ao ritmo periódico */
  const sweep=badge.querySelector(".s03-sweep");
  badge.addEventListener("pointerenter",()=>{if(REDMO)return;badge.classList.remove("is-once");void badge.offsetWidth;badge.classList.add("is-once")});
  if(sweep)sweep.addEventListener("animationend",()=>badge.classList.remove("is-once"));
  if(typeof tilt==="function")tilt(badge);
  /* impressão: tudo no estado final, sem esqueleto nem varredura */
  PRINT.push(()=>{final();badge.classList.remove("is-once");badge.style.transform=""});
  final();
})();
