/* hash externo (#p=...) */
addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(h.startsWith("p=")&&h.slice(2)!==pdOpen)openPD(h.slice(2))});
boot();
