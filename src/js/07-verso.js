/* =====================================================================
   VIRAR A PÁGINA · o verso de cada slide (SPEC V6 §6) · fundação
   - window.flipPage(force): o palco (#flip) gira em 3D (rotateY 180°, perspectiva, ~0,76 s; instantâneo com
     movimento reduzido) e mostra o verso do slide atual. force: true vira · false desvira · sem argumento alterna.
   - window.unflipPage(): desvira na hora (o núcleo chama ao navegar: go/next/prev/índice/abas/ficha).
   - O verso tem a mesma moldura dos slides: cabeçalho (.sr-top com o título da seção), faixa
     "› VERSO · CONTEXTO E FONTES" (tom c-steel, dica "V ou Esc para voltar"), corpo branco em duas colunas
     (contexto em prosa à esquerda, ~60 %; fontes numeradas à direita, ~40 %, e a caixa "Leitura do AM" com o
     mascote, pose livro) e rodapé "Verso · n / 20".
   - Conteúdo: src/versos/NN-slug.html → <article class="verso" data-for="NN"> com .v-ctx, ol.v-src e .v-am
     (o build guarda tudo em #versos[hidden]; este módulo clona na hora de virar).
   - Fontes automáticas: <li data-f="id-da-fonte"></li> (vazio) é preenchido a partir de FONTES (05-fontes.js);
     id desconhecido aparece em vermelho ("fonte não encontrada: id").
   - Fatos: <span data-fato="id-do-fato"></span> em qualquer lugar (slides, versos, fichas) mostra FATOS[id].num
     (ou .txt com data-modo="txt"); id desconhecido aparece em vermelho. refFill(raiz) refaz o preenchimento
     (use depois de desenhar conteúdo novo com data-fato).
   - Ajuste ao espaço: o texto começa em Inter 15px/1,55 e desce em degraus até 13px se não couber;
     se nem assim couber, console.warn("[verso] …").
   - Impressão: VERSO.page(slide) devolve a página estática do verso (core.js/buildPrint a põe logo depois da frente).
   Globais: VERSO, refFill. Depende de core.js (stage, flipEl, fitT, frameTopHTML, bandHTML, footHTML, partLine…)
   e de 02-helpers.js (FATO, FONTE, fatoSrc). Funciona sem FONTES/FATOS/AMMasc (sem erro).
   ===================================================================== */
const VERSO=(()=>{
  const vface=H("div",{id:"vface",class:"vsheet",role:"region","aria-label":"Verso da página: contexto e fontes","aria-hidden":"true"},flipEl);
  vface.inert=true;
  /* degraus de ajuste: [fonte, entrelinha] do contexto e das fontes (o primeiro é o padrão) */
  const LV_L=[[15,1.55],[14.5,1.55],[14,1.52],[13.5,1.5],[13,1.48]];
  const LV_R=[[13,1.45],[12.5,1.44],[12,1.42],[11.5,1.4],[11,1.38]];
  const FIT={};   /* nn → {l, r, over} (degraus escolhidos) */
  const TIPO={"primária":"fonte primária","primaria":"fonte primária","oficial":"fonte oficial","empresa":"fonte da empresa","imprensa":"imprensa","documento interno":"dado nosso"};
  const warned=new Set();
  const warn=(k,msg)=>{if(warned.has(k))return;warned.add(k);console.warn(msg)};

  /* ---------- preenchimento de fontes e fatos ---------- */
  function fonteHTML(id){const s=FONTE(id);
    if(!s){warn("f:"+id,`[fontes] fonte não encontrada no registro (FONTES): ${id}`);return `<span class="ref-miss">fonte não encontrada: ${esc(id)}</span>`}
    const tipo=TIPO[String(s.tipo||"").toLowerCase()]||s.tipo||"";
    return `<b>${esc(s.org||"")}</b> — ${esc(s.titulo||"")}${s.data?` (${esc(s.data)})`:""}${tipo?` · <span class="v-tp">${esc(tipo)}</span>`:""}${s.url?` · <a href="${esc(s.url)}" target="_blank" rel="noopener">abrir fonte ↗</a>`:""}`}
  function refFill(root){const r=root||document;
    r.querySelectorAll("[data-fato]").forEach(el=>{const id=el.dataset.fato,f=FATO(id);
      if(!f){el.classList.add("ref-miss");el.textContent=`fato não encontrado: ${id}`;warn("x:"+id,`[fatos] fato não encontrado no registro (FATOS): ${id}`);return}
      const t=el.dataset.modo==="txt"?f.txt:(f.num||f.txt);el.textContent=t==null?"":String(t);el.classList.remove("ref-miss");
      const src=fatoSrc(id);if(src&&!el.title)el.title="Fonte: "+src;
      if(f.status&&f.status!=="verificado")warn("s:"+id,`[fatos] ${id} está com status "${f.status}" no registro: confira antes de usar como número`)});
    r.querySelectorAll(".v-src li[data-f]").forEach(li=>{if(li.dataset.auto!=="1"&&li.textContent.trim())return;li.dataset.auto="1";li.innerHTML=fonteHTML(li.dataset.f)})}

  /* ---------- conteúdo do verso de um slide ---------- */
  const artOf=nn=>{const all=[...document.querySelectorAll("#versos article.verso")];return all.find(a=>a.dataset.for===nn)||all.find(a=>pad(+a.dataset.for)===nn)||null};
  /* [1] · [2, 3] · [1–3] no texto viram marcas ligadas à lista de fontes */
  function refs(html){return html.split(/(<[^>]+>)/).map(x=>x.startsWith("<")?x:x.replace(/\[(\d{1,2}(?:\s*[,–-]\s*\d{1,2})*)\]/g,(m,g)=>{const ns=[];g.split(/\s*,\s*/).forEach(p=>{const ab=p.split(/\s*[–-]\s*/).map(Number);if(ab.length===2&&ab[1]>=ab[0]&&ab[1]-ab[0]<20){for(let k=ab[0];k<=ab[1];k++)ns.push(k)}else ns.push(ab[0])});return `<a class="v-ref" href="#" data-r="${ns.join(",")}" tabindex="-1">${m}</a>`})).join("")}
  function parts(nn){const a=artOf(nn);
    if(!a){warn("a:"+nn,`[verso] slide ${nn}: não há <article class="verso" data-for="${nn}"> em src/versos/`);
      return{ctx:`<h4>Verso em preparação</h4><p>O contexto escrito e as fontes desta página estão sendo redigidos.</p>`,src:"",am:""}}
    let ctx="",src="",am="";
    [...a.children].forEach(el=>{if(el.matches("ol.v-src,ul.v-src")){src+=el.innerHTML}else if(el.matches(".v-am")){am+=el.innerHTML.trim()}else if(el.matches(".v-ctx")){ctx+=el.innerHTML}else ctx+=el.outerHTML});
    return{ctx:refs(ctx),src,am}}
  function sheetHTML(sec,inPrint){const nn=keyOf(sec),i=slides.indexOf(sec),t=sec.dataset.t||"",p=parts(nn);
    const nSrc=(p.src.match(/<li\b/g)||[]).length;
    return `${frameTopHTML(esc(t),partLine(sec.dataset.p))}${bandHTML("Verso · Contexto e fontes","c-steel",inPrint?"":"V ou Esc para voltar")}
    <div class="body vbody"><div class="v-cols">
      <div class="v-l"><div class="v-ctx">${p.ctx}</div></div>
      <div class="v-r"><div class="v-rh"><h4>Fontes</h4>${nSrc?`<span>${nSrc} ${nSrc===1?"referência":"referências"}</span>`:""}</div>
        ${nSrc?`<ol class="v-src">${p.src}</ol>`:`<p class="v-nosrc">As fontes desta página entram com o texto do verso.</p>`}
        ${p.am?`<div class="v-amb"><div class="am-masc" data-pose="livro"></div><div class="v-amt"><span class="eye">Leitura do AM</span><p>${p.am}</p></div></div>`:""}</div>
    </div></div>${footHTML(`Contexto escrito e fontes completas · ${esc(t)}`,`Verso · ${i+1} / ${N}`)}`}
  /* numera as fontes (para as marcas [n]) */
  function number(root){root.querySelectorAll(".v-src > li").forEach((li,k)=>li.dataset.n=k+1)}

  /* ---------- ajuste ao espaço (o mais folgado que cabe, por coluna) ---------- */
  const over=el=>!!el&&el.scrollHeight>el.clientHeight+1;
  function setL(sh,k){const c=sh.querySelector(".v-l");if(c){c.style.setProperty("--vf",LV_L[k][0]+"px");c.style.setProperty("--vlh",LV_L[k][1])}}
  function setR(sh,k){const c=sh.querySelector(".v-r");if(c){c.style.setProperty("--vs",LV_R[k][0]+"px");c.style.setProperty("--vslh",LV_R[k][1])}}
  function fitSheet(sh,nn){const L=sh.querySelector(".v-l"),R=sh.querySelector(".v-r");if(!L||!L.offsetHeight)return FIT[nn]||null;
    let l=0,r=0;setL(sh,0);setR(sh,0);
    while(over(L)&&l<LV_L.length-1)setL(sh,++l);
    while(over(R)&&r<LV_R.length-1)setR(sh,++r);
    const ov=over(L)||over(R);sh.classList.toggle("v-over",ov);
    if(ov)warn("o:"+nn,`[verso] slide ${nn}: o texto do verso não cabe na página nem no menor degrau (${over(L)?"contexto":"fontes"}). Encurte o texto ou a lista de fontes.`);
    else if(l>0)console.info(`[verso] slide ${nn}: contexto ajustado para ${LV_L[l][0]}px para caber (padrão 15px)`);
    return FIT[nn]={l,r,over:ov}}
  function applyFit(sh,f){if(!f)return;setL(sh,f.l);setR(sh,f.r);sh.classList.toggle("v-over",!!f.over)}

  /* ---------- verso na tela ---------- */
  function render(){const sec=slides[cur];if(!sec)return false;const nn=keyOf(sec);
    vface.innerHTML=sheetHTML(sec,false);vface.dataset.vfor=nn;number(vface);refFill(vface);deckMasc(vface);fitSheet(vface,nn);return true}
  /* marca [n] → acende a fonte n na lista */
  const hl=(a,on)=>{(a.dataset.r||"").split(",").forEach(n=>{const li=vface.querySelector(`.v-src > li[data-n="${n}"]`);if(li)li.classList.toggle("hl",on)})};
  vface.addEventListener("pointerover",e=>{const a=e.target.closest&&e.target.closest(".v-ref");if(a)hl(a,true)});
  vface.addEventListener("pointerout",e=>{const a=e.target.closest&&e.target.closest(".v-ref");if(a)hl(a,false)});
  vface.addEventListener("click",e=>{const a=e.target.closest(".v-ref");if(!a)return;e.preventDefault();const n=(a.dataset.r||"").split(",")[0];const li=vface.querySelector(`.v-src > li[data-n="${n}"]`);if(li){li.classList.remove("pulse");void li.offsetWidth;li.classList.add("pulse")}});

  /* ---------- o giro ---------- */
  let anim=null;
  function settle(on){flipEl.classList.remove("fl3d");flipEl.classList.toggle("vback",on);stage.inert=on;vface.inert=!on;vface.setAttribute("aria-hidden",on?"false":"true")}
  function flipTo(on,animate){
    if(anim){anim.onfinish=null;anim.cancel();anim=null}
    if(on){if(pdOpen||busy)return false;if(chapOn)hideChapter(true);tipEl.classList.remove("on");closePanels(null)}
    stage.classList.toggle("flipped",on);
    if(!animate||REDMO){settle(on);if(on)render();return true}
    /* contexto 3D só durante o giro: frente e verso com a face de trás oculta; o verso nasce girado 180° */
    flipEl.classList.remove("vback");flipEl.classList.add("fl3d");stage.inert=true;vface.inert=true;
    if(on)render();
    /* a página gira pela borda direita (vem na direção de quem olha e passa para a esquerda), com um leve recuo no meio */
    const a0=on?0:-180,a1=on?-180:0,P="perspective(3600px)";
    anim=flipEl.animate([{transform:`${fitT} ${P} rotateY(${a0}deg) scale(1)`},{transform:`${fitT} ${P} rotateY(${(a0+a1)/2}deg) scale(.84)`},{transform:`${fitT} ${P} rotateY(${a1}deg) scale(1)`}],
      {duration:760,easing:"cubic-bezier(.45,.05,.2,1)"});
    anim.onfinish=()=>{anim=null;settle(on)};
    return true}
  window.flipPage=force=>{const on=force==null?!isFlipped():!!force;if(on===isFlipped()&&!anim)return false;return flipTo(on,true)};
  window.unflipPage=()=>{if(!isFlipped()&&!anim)return;flipTo(false,false)};

  /* ---------- impressão: página estática do verso, logo depois da frente ---------- */
  function page(sec){const nn=keyOf(sec);
    const m=H("div",{class:"vsheet vmeasure","aria-hidden":"true"},stage);m.innerHTML=sheetHTML(sec,true);number(m);refFill(m);
    const f=fitSheet(m,nn);const html=m.innerHTML;m.remove();
    const pg=H("section",{class:"slide vpage vsheet","data-vfor":nn,html});applyFit(pg,f);return pg}

  /* fatos e fontes: preenche tudo no boot e de novo ao entrar num slide (conteúdo desenhado pelo ENTER) */
  BOOT.push(()=>{refFill(stage);refFill($("versos"))});
  document.addEventListener("deck:activate",e=>{const s=e.detail&&e.detail.slide;if(s)setTimeout(()=>refFill(s),160)});
  return{render,page,fit:fitSheet,FIT,refFill,flip:flipTo};
})();
function refFill(root){return VERSO.refFill(root)}
