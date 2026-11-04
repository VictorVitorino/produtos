/* COMPORTAMENTOS DO DECK (camada 3) — rodam depois do motor.
   1) <img data-asset="chave"> recebe ASSET[chave] (as imagens ficam em assets.js e o HTML continua autocontido).
   2) Páginas-modelo: cada .wf-dim mostra o tamanho disponível do bloco em px do quadro (apague junto com o wireframe). */
document.querySelectorAll("img[data-asset]").forEach(i=>{if(ASSET[i.dataset.asset])i.src=ASSET[i.dataset.asset]});
(function(){const dims=()=>document.querySelectorAll(".slide.active .wf-dim").forEach(d=>{const b=d.closest(".wf");d.textContent=b.offsetWidth+" × "+b.offsetHeight+" px"});
const _a=activate;activate=function(i,inst,back){_a(i,inst,back);requestAnimationFrame(dims)};requestAnimationFrame(dims)})();
