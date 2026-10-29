/* =====================================================================
   BOOT (fundação) · último script: roda os registros BOOT (conteúdo que depende de todos os módulos,
   ex.: pilares a partir de PCFG), monta o mascote se o módulo existir e ativa o slide do endereço.
   Endereço: #N vai ao slide N; #p=<id> abre a ficha do produto.
   ===================================================================== */
BOOT.forEach(f=>safe(f));
deckMasc(document);   /* mascote AM (só se src/js/06-mascote.js existir) */
addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(h.startsWith("p=")){if(h.slice(2)!==pdOpen){openPD(h.slice(2));if(!pdOpen)try{history.replaceState(null,"","#"+(cur+1))}catch(e){}}return}
  const n=parseInt(h,10);if(!isNaN(n)&&String(n)===h){closePD(true);if(n-1!==cur)go(clamp(n-1,0,N-1),true);else try{history.replaceState(null,"","#"+(cur+1))}catch(e){}}});
boot();
