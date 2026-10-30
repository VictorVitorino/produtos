/* =====================================================================
   SLIDE 02 · Sumário · dono: abertura
   As cinco partes (lista à esquerda) e as cinco paradas da trilha (direita) têm data-go: o núcleo leva ao
   primeiro slide de cada parte. Aqui só ficam:
   · o tempo de cada parada (--t): ela acende quando o fio laranja (máscara de 1,9 s, a partir de 0,45 s) chega nela;
   · o destaque cruzado: cursor ou foco numa parte acende a parada e o rótulo dela, e vice-versa (data-hk no slide).
   O mascote (div.am-masc, pose aponta) é montado e animado por src/js/06-mascote.js.
   ===================================================================== */
(function(){const sec=SL("02");if(!sec)return;
  const DRAW0=.45,DRAW=1.9;
  const stops=[...sec.querySelectorAll(".s02-stop")],tags=[...sec.querySelectorAll(".s02-tag")],items=[...sec.querySelectorAll(".ag-item[data-k]")];

  /* momento em que o fio chega a cada parada (fração do comprimento da trilha; a curva de tempo da máscara é quase linear no meio) */
  function timing(){
    const segs=[...sec.querySelectorAll(".s02-road path:not(.s02-prog)")].slice(0,5);let L=[];
    try{L=segs.map(p=>p.getTotalLength())}catch(e){L=[]}
    const tot=L.reduce((a,b)=>a+b,0);let acc=0;
    stops.forEach((g,i)=>{acc+=L[i]||0;const f=tot>0?acc/tot:(i+1)/stops.length;
      const t=(DRAW0+DRAW*Math.min(1,f*.96+.02)).toFixed(2)+"s";
      [g,...tags.filter(x=>x.dataset.k===g.dataset.k)].forEach(el=>el.style.setProperty("--t",t));
      g.querySelectorAll(".s02-dot,.s02-ring").forEach(el=>el.style.setProperty("--t",t))})}
  timing();

  /* destaque cruzado lista ↔ trilha */
  const hk=k=>{if(k)sec.dataset.hk=k;else delete sec.dataset.hk;items.forEach(b=>b.classList.toggle("hk",!!k&&b.dataset.k===k))};
  items.forEach(b=>{b.addEventListener("pointerenter",()=>hk(b.dataset.k));b.addEventListener("pointerleave",()=>hk(null));
    b.addEventListener("focus",()=>hk(b.dataset.k));b.addEventListener("blur",()=>hk(null))});
  stops.forEach(g=>{g.addEventListener("pointerenter",()=>hk(g.dataset.k));g.addEventListener("pointerleave",()=>hk(null))});
  ENTER["02"]=()=>hk(null);
  PRINT.push(()=>hk(null));
})();
