/* =====================================================================
   NÚCLEO V6 · moldura APODI, navegação, vistas (panes), capítulos, barra inferior,
   índice, fichas, invólucro do "virar a página" (#flip; o verso mora em src/js/07-verso.js) e impressão
   Depende de engine.js e src/data/*.js. Os módulos de src/js/ registram ganchos por slide,
   sempre pela chave data-s ("NN"): ENTER["05"], STEP["05"], PRINT.push(f), BOOT.push(f).
   ===================================================================== */
const stage=$("stage");
/* #flip: invólucro do palco que gira em "Virar a página" (frente = #stage, verso = #vface, criado por src/js/07-verso.js).
   fit() escala o invólucro; o build já o escreve, e este trecho só o cria se faltar. */
const flipEl=(()=>{const p=stage.parentNode;if(p&&p.id==="flip")return p;const f=document.createElement("div");f.id="flip";p.insertBefore(f,stage);f.appendChild(stage);return f})();
const slides=[...stage.querySelectorAll(":scope > .slide")],N=slides.length;let cur=0,busy=false;
const pad=n=>String(n).padStart(2,"0");
const keyOf=s=>s?(s.dataset.s||pad(slides.indexOf(s)+1)):"";
const ENTER={},STEP={},PRINT=[],CHAPX={},BOOT=[];
/* gancho do slide: data-s primeiro; data-t ainda é aceito durante a transição da V5 */
const hook=(o,s)=>s?(o[keyOf(s)]||o[s.dataset.t]||null):null;
const SL=nn=>slides.find(s=>s.dataset.s===pad(+nn))||null;
const safe=(f,...a)=>{try{return f(...a)}catch(e){console.error("[deck]",e)}};
const hlx=t=>String(t).replace(/\*(.+?)\*/g,'<span class="hl">$1</span>');
const esc=t=>String(t).replace(/&(?![#\w]+;)/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const DECK_EV=(n,d)=>{try{document.dispatchEvent(new CustomEvent(n,{detail:d}))}catch(e){}};
/* mascote AM: monta todo .am-masc dentro de r quando o módulo do mascote (src/js/06-mascote.js) existe; sem ele, nada acontece */
const deckMasc=r=>{if(window.AMMasc&&typeof window.AMMasc.mount==="function")safe(()=>window.AMMasc.mount(r||document))};
/* fichas de produto: o estado mora aqui; src/js/40-fichas.js redefine openPD/closePD/pdStep (os stubs evitam erro se o módulo faltar) */
let pdOpen=null,pdFrom=0;
function openPD(){}
function closePD(){}
function pdStep(){}

/* ---------- textos fixos da moldura ---------- */
const CFG={wm:"Planejamento Estratégico · DTS",ws:"Produtos, Serviços e Inteligência Artificial",right:"Outubro de 2026",foot:"DTS · PLANEJAMENTO ESTRATÉGICO 2027"};
const ASSETS=typeof ASSET!=="undefined"?ASSET:{};
const IMG={am:ASSETS["am-performance-white"]||"",dts:ASSETS["dts-logo-white"]||""};
const DECO='<svg class="am-deco" viewBox="0 0 520 80" preserveAspectRatio="xMaxYMid slice" aria-hidden="true"><path d="M40 80 L100 0" stroke="#F78C16" stroke-width="1.4" fill="none"/><path d="M150 80 L210 0" stroke="#5E8AB4" stroke-width="7" fill="none" opacity=".55"/><path d="M190 80 V0" stroke="#F78C16" stroke-width="1.2" opacity=".7"/><path d="M280 80 L340 0" stroke="#5E8AB4" stroke-width="16" fill="none" opacity=".45"/><path d="M350 80 V0" stroke="#5E8AB4" stroke-width="5" opacity=".45"/><path d="M420 80 L480 0" stroke="#F78C16" stroke-width="1.4" fill="none" opacity=".8"/></svg>';
/* "2 · O que o mercado vive" → "Parte 2 · O que o mercado vive" */
const partLine=p=>{if(!p)return"Abertura";const a=p.split(" · ");return a.length>1&&/^\d+$/.test(a[0])?`Parte ${a[0]} · ${a.slice(1).join(" · ")}`:p};
/* moldura em HTML (também usada pelas fichas) */
function frameTopHTML(title,line){return `<div class="sr-dec" aria-hidden="true">▸▸▸▸▸▸▸▸▸▸▸▸</div><div class="sr-top">${DECO}<img class="am-logo" src="${IMG.am}" alt="Alvarez &amp; Marsal | Performance"><i class="am-bd"></i><img class="dts-logo" src="${IMG.dts}" alt="DTS · Digital &amp; Technology Services"><div class="am-wm"><span class="am-a">${CFG.wm}</span><span class="am-s">${CFG.ws}</span></div><div class="am-div"></div><div class="am-title"><b>${title}</b><span>${line}</span></div><div class="am-right"><span class="am-dot"></span>${CFG.right}</div></div>`}
function bandHTML(txt,tone,hint){const L=String(txt).replace(/<[^>]+>/g,"").length,fs=L>95?(L>140?"17px":"19px"):"";
  return `<div class="sr-band ${tone||"c-navy"}"${fs?` style="font-size:${fs};line-height:1.08"`:""}><span>›</span><span>${txt}</span>${hint?`<small>${hint}</small>`:""}</div>`}
function footHTML(src,n){return `<div class="foot"><b>${CFG.foot}</b>${src?`<span class="s" title="${esc(src)}">${src}</span>`:""}<span class="n">${n}</span></div>`}

/* ---------- moldura automática: cabeçalho, faixa e rodapé a partir de data-* ---------- */
slides.forEach((s,i)=>{
  if(!s.dataset.s)s.dataset.s=pad(i+1);
  if(s.hasAttribute("data-bare"))return;
  s.insertAdjacentHTML("afterbegin",frameTopHTML(s.dataset.t||"",partLine(s.dataset.p))+(s.dataset.band?bandHTML(s.dataset.band,s.dataset.c,s.dataset.panes?"":s.dataset.bs):""));
  if(!s.dataset.band)s.classList.add("noband");
  if(!s.hasAttribute("data-nofoot"))s.insertAdjacentHTML("beforeend",footHTML(s.dataset.src||"",`${i+1} / ${N}`));
});
document.querySelectorAll("#stage .kin").forEach(kin);

/* ---------- duas vistas no mesmo slide (data-panes="Vista 1|Vista 2"): seletor na ponta da faixa ---------- */
const PANE={};
slides.forEach(s=>{if(!s.dataset.panes)return;const panes=[...s.querySelectorAll(":scope > .body.pane")];if(!panes.length)return;
  if(!panes.some(p=>p.classList.contains("on")))panes[0].classList.add("on");
  const band=s.querySelector(":scope > .sr-band");const sg=H("div",{class:"seg pseg"},band||s);
  const btns=s.dataset.panes.split("|").map((l,k)=>{const b=H("button",{type:"button",class:k?"":"on"},sg,`${k+1} · ${l}`);b.addEventListener("click",e=>{e.stopPropagation();setPane(s,k)});return b});
  PANE[keyOf(s)]={s,panes,btns,sg,k:0}});
const paneOf=s=>s?PANE[keyOf(s)]:null;
function setPane(s,k){const P=paneOf(s);if(!P)return;k=clamp(k,0,P.panes.length-1);P.k=k;P.panes.forEach((p,j)=>p.classList.toggle("on",j===k));P.btns.forEach((b,j)=>b.classList.toggle("on",j===k));segSync(P.sg);
  const pn=P.panes[k],fs=s.querySelector(":scope > .foot .s"),src=pn.dataset.paneSrc||s.dataset.src||"";if(fs){fs.textContent=src;fs.title=src}
  tipEl.classList.remove("on");DECK_EV("deck:pane",{key:keyOf(s),k})}
function paneStep(d){const P=paneOf(slides[cur]);if(!P)return false;if(d>0&&P.k<P.panes.length-1){setPane(P.s,P.k+1);return true}if(d<0&&P.k>0){setPane(P.s,P.k-1);return true}return false}

/* ---------- capítulos: divisória "Parte N" antes do primeiro slide de cada parte (src/data/01-capitulos.js) ---------- */
const CAP=typeof CAPITULOS!=="undefined"?CAPITULOS:{};
const chapEl=H("div",{id:"chap"},stage);let chapOn=null;
const logosHTML=()=>`<img src="${IMG.am}" alt="Alvarez &amp; Marsal | Performance" style="height:40px"><i></i><img src="${IMG.dts}" alt="DTS" style="height:34px">`;
function showChapter(k,done){const m=CAP[k]||{};chapEl.className="";
  const pl=m.pilar&&typeof PILLARS!=="undefined"?PILLARS[m.pilar-1]:null;
  const t=m.t||(pl?pl.name:""),d=m.d||(pl?pl.def:"");
  const chips=(m.chips||[]).map(([nn,l],j)=>`<button class="ch-chip" type="button" data-go-ch="${+nn}"><b>${j+1}</b>${l}</button>`).join("");
  chapEl.innerHTML=`<div class="ch-bg"></div><div class="ch-grid" aria-hidden="true"></div>
    <svg class="ch-slash" viewBox="0 0 1600 900" aria-hidden="true"><path d="M1010 -20 L720 920" stroke="#5E8AB4" stroke-width="46" opacity=".11" fill="none" pathLength="1000" style="--d:0"/><path d="M1064 -20 L774 920" stroke="#5E8AB4" stroke-width="7" opacity=".3" fill="none" pathLength="1000" style="--d:1"/><path d="M1044 -20 L754 920" stroke="#F78C16" stroke-width="1.6" opacity=".85" fill="none" pathLength="1000" style="--d:2"/></svg>
    <div class="ch-floor" aria-hidden="true"></div>
    ${m.pose?`<div class="ch-m" aria-hidden="true"><div class="am-masc" data-pose="${m.pose}"></div></div>`:""}
    <div class="ch-txt"><span class="ch-eye">${m.eye||""}</span><b class="ch-h"><span class="ch-rv">${hlx(t)}</span></b><i class="ch-bar" aria-hidden="true"></i><span class="ch-sub">${d}</span>${chips?`<div class="ch-chips">${chips}</div>`:""}</div>
    <div class="cv-logos">${logosHTML()}</div><div class="ch-tag"><i></i>→ ou clique para continuar</div>`;
  chapEl.classList.toggle("pil",!!m.pilar);chapEl.classList.add("on");void chapEl.offsetWidth;chapEl.classList.add("play");
  const cl=CHAPX[k]?safe(CHAPX[k],chapEl):null;chapOn={k,done,cleanup:typeof cl==="function"?cl:()=>{}};
  /* título numa linha que não cruza as faixas diagonais: até ~770 px de largura (desce de 4 em 4 px, mínimo 76 px) */
  const hh=chapEl.querySelector(".ch-h");if(hh){let fs=parseFloat(getComputedStyle(hh).fontSize)||120;while(hh.offsetWidth>770&&fs>76){fs-=4;hh.style.fontSize=fs+"px"}}
  deckMasc(chapEl);DECK_EV("deck:chapter",{key:k})}
/* a limpeza do efeito (CHAPX) roda sempre, mesmo se outra divisória já entrou durante o esmaecimento (ela só para o próprio efeito) */
function hideChapter(run){if(!chapOn)return;const c=chapOn;chapOn=null;const a=chapEl.animate([{opacity:1},{opacity:0}],{duration:REDMO?1:380});a.onfinish=()=>{safe(c.cleanup);if(chapOn)return;chapEl.className="";chapEl.innerHTML=""};if(run)safe(c.done)}
chapEl.addEventListener("click",e=>{const ch=e.target.closest("[data-go-ch]");if(ch){e.stopPropagation();const i=+ch.dataset.goCh-1;hideChapter(true);if(i!==cur)go(i,true);return}if(e.target.closest("button,a"))return;hideChapter(true)});

/* ---------- barra inferior: abas de capítulo (#dots) e controles ---------- */
const IC={grid:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
  flip:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h7.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4z"/><path d="M20 5.5h-3.5"/><path d="M17.5 3l-2.5 2.5L17.5 8"/><path d="M20 9.5V18h-4.5"/></svg>'};
const ctr=H("div",{id:"controls"},document.body);
ctr.innerHTML=`<button class="g" id="bProd" type="button" title="Fichas de produto (P)">${IC.grid}<span class="lb">Fichas de produto</span></button><button class="g" id="bFlip" type="button" title="Virar a página: contexto e fontes (V)">${IC.flip}<span class="lb">Virar a página</span></button><button class="g" id="bPrev" type="button"><span class="ar">➜</span><span class="lb">Voltar</span></button><span class="c" id="cnt" role="button" tabindex="0" title="Índice · escolha a página (G)">1 / ${N}</span><button class="p" id="bNext" type="button"><span class="lb">Avançar</span><span class="ar">➜</span></button>`;
H("div",{id:"progress"},document.body);H("div",{id:"rotate"},document.body,"Gire o aparelho para ver a apresentação inteira");
const dotsEl=H("div",{id:"dots"},document.body);
const idxOf=nn=>{const s=SL(nn);return s?slides.indexOf(s):-1};
const TABS=(typeof ABAS!=="undefined"?ABAS:[["Abertura","01",pad(N)]]).map(([n,a,b])=>({n,a:idxOf(a),b:idxOf(b)})).filter(t=>t.a>=0&&t.b>=t.a);
TABS.forEach(t=>{const b=H("button",{type:"button",title:`${t.n} · slides ${t.a+1}–${t.b+1}`},dotsEl);b.innerHTML=`<span>${t.n}</span><span class="nb"><i></i></span>`;b.onclick=e=>{e.stopPropagation();closePD(true);go(t.a)};t.el=b});
/* i = slide ativo; pil = pilar da ficha aberta (acende a aba dos pilares) */
function navIdx(i,pil){TABS.forEach(t=>{let on=i>=t.a&&i<=t.b,done=i>t.b;if(pil){const ps=SL(pad(9+pil*2-1));on=!!ps&&t.a<=slides.indexOf(ps)&&slides.indexOf(ps)<=t.b;done=false}
  t.el.classList.toggle("on",on);t.el.classList.toggle("done",done);t.el.setAttribute("aria-current",on?"step":"false");
  t.el.querySelector("i").style.setProperty("--f",on?(pil?"100%":Math.round((i-t.a+1)/(t.b-t.a+1)*100)+"%"):done?"100%":"0%")})}
const tipEl=H("div",{id:"tip",html:"<b></b><span></span>"},document.body);
const idxP=H("div",{class:"pop",id:"idxP",html:`<div class="xh">Roteiro da apresentação<button class="ix" type="button" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const pdxP=H("div",{class:"pop",id:"pdxP",html:`<div class="xh">Fichas de produto · novo portfólio<button class="ix" type="button" aria-label="Fechar">×</button></div><div class="xl"></div>`},document.body);
const panels=[idxP,pdxP];
function closePanels(except){panels.forEach(p=>{if(p!==except)p.classList.remove("on")});$("cnt").classList.toggle("on",idxP.classList.contains("on"));$("bProd").classList.toggle("on",pdxP.classList.contains("on"))}
function togglePanel(p){p.classList.toggle("on");closePanels(p)}
panels.forEach(p=>{p.querySelector(".ix").onclick=()=>{p.classList.remove("on");closePanels(null)};p.addEventListener("click",e=>e.stopPropagation())});
addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#controls"))return;if(panels.some(p=>p.classList.contains("on")))closePanels(null)});
$("cnt").onclick=e=>{e.stopPropagation();fillIdx();togglePanel(idxP)};
$("cnt").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.stopPropagation();fillIdx();togglePanel(idxP)}};
$("bProd").onclick=e=>{e.stopPropagation();fillPdx();togglePanel(pdxP)};
function fillIdx(){const xl=idxP.querySelector(".xl");xl.innerHTML="";let last=null;slides.forEach((s,i)=>{const g=s.dataset.p?partLine(s.dataset.p):"Abertura";if(g!==last){H("div",{class:"xg"},xl,g);last=g}
    const b=H("button",{type:"button",class:"xi"+(i===cur&&!pdOpen?" cur":"")},xl);H("b",null,b,pad(i+1));H("span",null,b,s.dataset.t||"");b.onclick=()=>{idxP.classList.remove("on");closePanels(null);closePD(true);go(i,true)}});
  requestAnimationFrame(()=>{const c=xl.querySelector(".xi.cur");if(c)c.scrollIntoView({block:"nearest"})})}
function fillPdx(){const xl=pdxP.querySelector(".xl");xl.innerHTML="";if(typeof PILLARS==="undefined"||typeof PRODUCTS==="undefined")return;
  PILLARS.forEach(pl=>{H("div",{class:"xg"},xl,`Pilar ${pl.n} · ${pl.name}`);PRODUCTS.filter(p=>p.pillar===pl.n).forEach(p=>{const b=H("button",{type:"button",class:"xi"+(pdOpen===p.id?" cur":"")},xl);H("b",null,b,p.code);H("span",null,b,p.name);H("span",{class:"xst",title:STATUS[p.st]?STATUS[p.st][0]:"",html:STATUS[p.st]?stTag(p.st):""},b);b.onclick=()=>{pdxP.classList.remove("on");closePanels(null);openPD(p.id)}})})}
/* controles no modo ficha: os botões de baixo navegam entre fichas e dizem isso */
function ctlMode(pdm){$("bPrev").querySelector(".lb").textContent=pdm?"Ficha anterior":"Voltar";$("bNext").querySelector(".lb").textContent=pdm?"Próxima ficha":"Avançar"}

/* ---------- "Virar a página" (contexto e fontes) ----------
   src/js/07-verso.js define window.flipPage(force) (true = vira, false = desvira com animação, sem argumento = alterna)
   e window.unflipPage() (desvira na hora; usado ao navegar). O estado é a classe "flipped" no #stage.
   Sem o módulo, o botão não faz nada (nenhum erro). */
if(typeof window.flipPage!=="function")window.flipPage=()=>{};
if(typeof window.unflipPage!=="function")window.unflipPage=()=>{stage.classList.remove("flipped")};
const isFlipped=()=>stage.classList.contains("flipped");
$("bFlip").onclick=e=>{e.stopPropagation();safe(()=>window.flipPage())};
const flipSync=()=>{const on=isFlipped();$("bFlip").classList.toggle("on",on);$("bFlip").querySelector(".lb").textContent=on?"Desvirar":"Virar a página";$("bFlip").title=on?"Desvirar: volta à frente da página (V ou Esc)":"Virar a página: contexto e fontes (V)"};
new MutationObserver(flipSync).observe(stage,{attributes:true,attributeFilter:["class"]});

/* ---------- escala do palco (fit da APODI: deixa ~62 px para a barra inferior) ----------
   A escala vai no invólucro #flip (o giro do verso compõe rotateY sobre fitT). */
let fitT="translate(-50%,-50%) scale(1)";
function fit(){const vw=innerWidth,vh=innerHeight,sm=vw<760,land=vh<=480&&vw>vh,pd0=land?4:(sm?6:10),bar=land?14:(sm?54:62);
  const sc=Math.min((vw-pd0*2)/1600,(vh-pd0-bar)/900);fitT=`translate(-50%,-50%) scale(${sc})`;
  flipEl.style.left=vw/2+"px";flipEl.style.top=(pd0+(vh-pd0-bar)/2)+"px";flipEl.style.transform=fitT;barQ()}
addEventListener("resize",fit);
/* barra inferior: as abas de capítulo (#dots) e os botões dividem a largura da janela. Se encostarem (janela estreita, como
   1280 px, ou rótulos mais longos, como "Ficha anterior" / "Próxima ficha" e "Ficha 16 / 24"), a barra fica compacta
   (classe bar-tight no <body>: menos folga, mesmo desenho); se nem assim couber, as abas saem (o índice G continua).
   Refeito ao redimensionar (fit) e sempre que um rótulo ou o contador dos botões muda. */
function barFit(){const B=document.body;B.classList.remove("bar-tight","bar-nodots");if(getComputedStyle(dotsEl).display==="none")return;
  const room=()=>ctr.getBoundingClientRect().left-dotsEl.getBoundingClientRect().right;
  if(room()<24){B.classList.add("bar-tight");if(room()<16)B.classList.add("bar-nodots")}}
let barRaf=0;function barQ(){cancelAnimationFrame(barRaf);barRaf=requestAnimationFrame(barFit)}
new MutationObserver(barQ).observe(ctr,{subtree:true,childList:true,characterData:true});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(barQ);

/* ---------- ativação e navegação ---------- */
function activate(i,inst,back,noEnter,last){tipEl.classList.remove("on");if(isFlipped())safe(()=>window.unflipPage());const n=slides[i];const P=paneOf(n);if(P)setPane(n,last?P.panes.length-1:0);
  slides.forEach((s,k)=>{if(k!==i)s.classList.remove("active","entering","play","back")});n.classList.remove("play","entering","back");void n.offsetWidth;n.classList.add("active","play");if(!inst){n.classList.add("entering");if(back)n.classList.add("back")}
  const from=cur;cur=i;
  $("cnt").textContent=`${i+1} / ${N}`;$("progress").style.width=((i+1)/N*100)+"%";$("bPrev").disabled=i===0;$("bNext").disabled=i===N-1;
  if(!pdOpen)try{history.replaceState(null,"","#"+(i+1))}catch(e){}
  navIdx(i);if(P)segSync(P.sg);
  n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));
  deckMasc(n);DECK_EV("deck:activate",{i,from,key:keyOf(n),slide:n});
  if(noEnter)return;const fn=hook(ENTER,n);if(fn)setTimeout(()=>safe(fn),inst?0:60)}
/* goLast: o slide foi aberto pelo ← (prev): abre na última vista ou passo. Abas, índice e links abrem no início */
let goLast=false;
function go(i,inst,opt){if(isFlipped())safe(()=>window.unflipPage());i=clamp(i,0,N-1);if(i===cur&&!inst)return;if(busy)return;const back=i<cur,last=!!(opt&&opt.last)&&back;goLast=last;if(chapOn)hideChapter(false);
  const k=keyOf(slides[i]),chap=!back&&!inst&&i!==cur&&CAP[k]?k:null;
  if(!chap||REDMO){activate(i,!!inst,back,false,last);if(chap)showChapter(chap,()=>{});return}
  /* entrada de capítulo: barras cobrem o palco, o slide é ativado por baixo e a divisória aparece */
  busy=true;const w=$("wipe");w.style.visibility="visible";const bars=[...w.querySelectorAll("i")];
  bars.forEach((b,j)=>b.animate([{transform:"translateX(-110%) skewX(-10deg)"},{transform:"translateX(0) skewX(-10deg)"}],{duration:380,delay:j*60,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));
  setTimeout(()=>{activate(i,true,back,true);const n=slides[i];n.classList.remove("play");
    showChapter(chap,()=>{void n.offsetWidth;n.classList.add("play");const P=paneOf(n);if(P)segSync(P.sg);n.querySelectorAll("[data-count]").forEach(el=>count(el,0,+el.dataset.count,el.dataset.suf||"",1200));const fn=hook(ENTER,n);if(fn)setTimeout(()=>safe(fn),60)});
    bars.forEach((b,j)=>b.animate([{transform:"translateX(0) skewX(-10deg)"},{transform:"translateX(110%) skewX(-10deg)"}],{duration:420,delay:(2-j)*60,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));
    setTimeout(()=>{w.style.visibility="hidden";busy=false},600)},500)}
/* passos internos: o slide consome o "avançar" (spotlight, linha do tempo, cartas…) antes de trocar de vista ou de slide */
function stepHook(d){const f=hook(STEP,slides[cur]);if(!f)return false;return !!safe(f,d)}
/* com a página virada, ← / → vão direto ao slide vizinho (a ativação desvira) */
function next(){tipEl.classList.remove("on");if(pdOpen){pdStep(1);return}if(chapOn){hideChapter(true);return}if(isFlipped()){go(cur+1);return}if(stepHook(1))return;if(paneStep(1))return;go(cur+1)}
function prev(){tipEl.classList.remove("on");if(pdOpen){pdStep(-1);return}if(chapOn){hideChapter(false);slides[cur].classList.add("play");go(cur-1,false,{last:true});return}if(isFlipped()){go(cur-1);return}if(stepHook(-1))return;if(paneStep(-1))return;go(cur-1,false,{last:true})}
$("bNext").onclick=e=>{e.stopPropagation();next()};$("bPrev").onclick=e=>{e.stopPropagation();prev()};
addEventListener("keydown",e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.isContentEditable||e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;
  if((k===" "||k==="Enter")&&e.target.closest&&e.target.closest("button,[role=button],a"))return;
  if(k==="Escape"){if(chapOn){hideChapter(true);return}if(panels.some(p=>p.classList.contains("on"))){closePanels(null);return}if(isFlipped()){safe(()=>window.flipPage(false));return}if(pdOpen)closePD();return}
  if(["ArrowRight","PageDown"," "].includes(k)){e.preventDefault();next()}else if(["ArrowLeft","PageUp"].includes(k)){e.preventDefault();prev()}
  else if(k==="Home"){closePD(true);go(0)}else if(k==="End"){closePD(true);go(N-1)}
  else if(k==="f"||k==="F"){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}
  else if(k==="v"||k==="V"){if(chapOn)hideChapter(true);safe(()=>window.flipPage())}
  else if(k==="p"||k==="P"){$("bProd").click()}else if(k==="g"||k==="G"){$("cnt").click()}});
let tx=null;addEventListener("touchstart",e=>{tx=e.target.closest&&e.target.closest(".ba-handle,.cs-scene,[data-noswipe]")?null:e.touches[0].clientX},{passive:true});addEventListener("touchend",e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60)dx<0?next():prev();tx=null},{passive:true});
/* dica flutuante: qualquer elemento com data-tv (título), data-tl (texto) ou data-th (HTML) */
addEventListener("pointermove",e=>{const el=e.target.closest&&e.target.closest("[data-tv]");if(el){tipEl.querySelector("b").textContent=el.dataset.tv;if(el.dataset.th)tipEl.querySelector("span").innerHTML=el.dataset.th;else tipEl.querySelector("span").textContent=el.dataset.tl||"";tipEl.classList.add("on");tipEl.style.left=Math.min(e.clientX+14,innerWidth-360)+"px";tipEl.style.top=Math.max(8,Math.min(e.clientY+14,innerHeight-tipEl.offsetHeight-8))+"px"}else tipEl.classList.remove("on")});
/* clique com ondulação */
document.addEventListener("pointerdown",e=>{if(REDMO)return;const el=e.target.closest&&e.target.closest(".prod,.clk,#controls button");if(!el)return;if(getComputedStyle(el).position==="static")el.style.position="relative";const r=el.getBoundingClientRect(),sc=stage.contains(el)?stage.getBoundingClientRect().width/1600:1,x=(e.clientX-r.left)/sc,y=(e.clientY-r.top)/sc,size=Math.max(r.width,r.height)/sc*1.1;const sp=H("span",{class:"rp",style:`width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`},el);setTimeout(()=>sp.remove(),650)});
/* links internos: [data-pd] abre a ficha; [data-go="N"] vai ao slide N (1–20) */
stage.addEventListener("click",e=>{const a=e.target.closest("[data-pd]");if(!a||!stage.contains(a))return;e.preventDefault();if(chapOn)hideChapter(true);openPD(a.dataset.pd)});
stage.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();e.stopPropagation();closePD(true);go(+a.dataset.go-1)});

/* ---------- impressão (PDF) ----------
   Ordem das páginas: para cada slide, a frente (vista 1 e as demais vistas, clonadas aqui com a classe "pane-view"),
   logo depois o VERSO (contexto e fontes, página estática gerada por VERSO.page) e então as páginas extras de detalhe
   criadas pelos ganchos PRINT dos slides (sec.after(clone)); no fim, as 24 fichas de produto.
   Idempotente: os ganchos PRINT rodam a cada chamada; as páginas só são criadas uma vez. */
function buildPrint(){if(isFlipped())safe(()=>window.unflipPage());if(chapOn)hideChapter(false);if(pdOpen)closePD(true);
  PRINT.forEach(f=>safe(f));
  stage.querySelectorAll(":scope > .slide:not(.pd-print) a[data-pd]").forEach(a=>{if(a.dataset.h0==null)a.dataset.h0=a.getAttribute("href")||"";a.setAttribute("href","#pdp-"+a.dataset.pd)});
  if(stage.querySelector(":scope > .pd-print,:scope > .vpage"))return;
  /* vistas extras: cada vista depois da primeira vira uma página logo após o slide */
  Object.values(PANE).forEach(P=>{for(let k=P.panes.length-1;k>=1;k--){const c=P.s.cloneNode(true);c.classList.add("pane-print","pane-view");c.classList.remove("active","entering","back");[...c.querySelectorAll(":scope > .body.pane")].forEach((x,j)=>{if(j!==k)x.remove();else x.classList.add("on")});
      const pn=P.panes[k],fs=c.querySelector(":scope > .foot .s");if(fs&&pn.dataset.paneSrc)fs.textContent=pn.dataset.paneSrc;c.querySelectorAll(".pseg button").forEach((b,j)=>b.classList.toggle("on",j===k));P.s.after(c)}
    P.panes.forEach((x,j)=>x.classList.toggle("on",j===0));P.btns.forEach((b,j)=>b.classList.toggle("on",j===0));
    const fs0=P.s.querySelector(":scope > .foot .s"),src0=P.panes[0].dataset.paneSrc||P.s.dataset.src||"";if(fs0){fs0.textContent=src0;fs0.title=src0}});
  /* verso de cada slide, logo depois da frente (e das vistas dela) */
  if(typeof VERSO!=="undefined"&&VERSO&&typeof VERSO.page==="function")slides.forEach(s=>{let at=s;while(at.nextElementSibling&&at.nextElementSibling.classList.contains("pane-view")&&at.nextElementSibling.dataset.s===s.dataset.s)at=at.nextElementSibling;
    const v=safe(()=>VERSO.page(s));if(v)at.after(v)});
  /* fichas de produto */
  if(typeof PRODUCTS!=="undefined"&&typeof pdHTML==="function")PRODUCTS.forEach((P,k)=>{const sec=H("section",{class:"pd-print slide",id:"pdp-"+P.id,html:safe(()=>pdHTML(P,k+1))||""},stage);plainBadges(sec);sec.classList.add("play");
    sec.querySelectorAll("a[data-pd]").forEach(a=>a.setAttribute("href","#pdp-"+a.dataset.pd))});
  if(typeof refFill==="function")safe(()=>refFill(stage));deckMasc(stage)}
addEventListener("beforeprint",buildPrint);
addEventListener("afterprint",()=>stage.querySelectorAll("a[data-h0]").forEach(a=>{a.setAttribute("href",a.dataset.h0);delete a.dataset.h0}));

/* --- tilt suave (cards hologram) --- */
function tilt(el){if(REDMO||!el)return;el.classList.add("tilt");el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.style.transform=`perspective(1100px) rotateX(${(0.5-py)*6}deg) rotateY(${(px-0.5)*6}deg)`});el.addEventListener("pointerleave",()=>{el.style.transform=""})}

/* marcas antigas de evidência ([E]/[H]) viram texto simples ("Fonte: …" / "proposta DTS") */
function badgeText(el){const t=el.textContent.trim();if(/^(E|Evidência)$/i.test(t))return"";return t.replace(/^E\s*·\s*/,"")}
function plainBadges(root){const r=root||document,sel=root?"":"#stage > .slide ";r.querySelectorAll(sel+".ev").forEach(el=>{const x=badgeText(el);if(!x){el.remove();return}el.className="srcx";el.textContent="Fonte: "+x});
  r.querySelectorAll(sel+".hy").forEach(el=>{const x=el.textContent.trim();el.className="srcx";el.textContent=/^(H|Hipótese)$/i.test(x)?"proposta DTS":x})}

/* ---------- API para ferramentas (shot.js, audit.js) e para a parte 2 da fundação ---------- */
window.DECK={slides,get cur(){return cur},go:(i,inst)=>go(i,inst),next,prev,setPane,SL,keyOf,
  slide:nn=>{const s=SL(nn);if(s){closePD(true);if(chapOn)hideChapter(false);go(slides.indexOf(s),true)}return s},
  pane:k=>{const s=slides[cur];setPane(s,k);return !!paneOf(s)},
  step:k=>{let n=0;for(let j=0;j<k;j++){if(stepHook(1)||paneStep(1))n++;else break}return n},
  chap:nn=>{const s=SL(nn);if(!s)return false;closePD(true);if(chapOn)hideChapter(false);activate(slides.indexOf(s),true,false,true);s.classList.remove("play");showChapter(keyOf(s),()=>{s.classList.add("play");const fn=hook(ENTER,s);if(fn)safe(fn)});return true},
  ficha:id=>{openPD(id);return pdOpen},
  /* flip(): alterna · flip(true): vira · flip(false): desvira · flipped: estado atual */
  flip:on=>safe(()=>window.flipPage(on)),get flipped(){return isFlipped()},print:buildPrint};

function boot(){plainBadges();fit();const h=location.hash.slice(1),op=typeof ONEPAGE!=="undefined"&&ONEPAGE>0?ONEPAGE:1;
  if(h.startsWith("p=")){activate(op-1,true);openPD(h.slice(2));if(!pdOpen)try{history.replaceState(null,"","#"+op)}catch(e){}}
  else{const h0=parseInt(h,10);activate(isNaN(h0)?0:clamp(h0-1,0,N-1),true)}}
