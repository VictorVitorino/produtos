/* COMPORTAMENTOS DO DECK (camada 3) — rodam depois do motor.
   <img data-asset="chave"> recebe ASSET[chave]: as imagens ficam em assets.js e o HTML continua autocontido. */
document.querySelectorAll("img[data-asset]").forEach(i=>{if(ASSET[i.dataset.asset])i.src=ASSET[i.dataset.asset]});
