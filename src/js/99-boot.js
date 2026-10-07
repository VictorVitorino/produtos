/* hash externo: #p=<id> abre a ficha; #N vai ao slide N (fechando a ficha aberta) */
addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(h.startsWith("p=")){if(h.slice(2)!==pdOpen){openPD(h.slice(2));if(!pdOpen)history.replaceState(null,"","#"+(cur+1))}return}
  const n=parseInt(h,10);if(!isNaN(n)&&String(n)===h){closePD(true);if(n-1!==cur)go(clamp(n-1,0,N-1),true);else history.replaceState(null,"","#"+(cur+1))}});
boot();
