/* =====================================================================
   CAPAS DE CAPÍTULO (divisórias) · V6 · dono: capas · estilo em src/css/28-capas.css
   A moldura de cada capa (fundo navy, grade de pontos, diagonais, "PARTE N", título, filete, subtítulo,
   pílulas clicáveis, logos e dica) vem de showChapter (core.js) com os textos de src/data/01-capitulos.js.
   Aqui mora o efeito do Guia DTS de cada capa, registrado em CHAPX["NN"] (recebe #chap, devolve a limpeza):
     03 · Parte 1  fx 32 Floating Elements    escudo DTS e os 4 pilares em órbita suave; o cursor pausa e revela o momento
     05 · Parte 2  fx 40 Animated Shader/Hero  ondas vivas em navy e um fio laranja atrás do título
                   + fx 19 Pulse/Beacon        seis faróis, um por força de mercado (só o nome)
     07 · Parte 3  fx 14 Heatmap Animation     29 serviços × decisão, do frio ao quente, com varredura de raio-X
     08 · Parte 4  fx 03 Hologram 3D Cards     leque das 24 cartas de produto que responde ao cursor
                   + fx 12 Counter Animation   29 serviços → 24 produtos
     10/12/14/16   fx 01 Motion Graphics + fx 02 Icon Motion + fx 12 Counter: o ícone do pilar se desenha e os
                   serviços de hoje (cinza) se reorganizam nos cartões dos produtos, com a cor do status
     18 · Parte 5  fx 17 BPMN Flow Motion      um marcador percorre fábrica → jogos → ondas → decisão do comitê
   Regras: nenhuma "bola"/blob, nenhum mascote, só contagens estruturais (vêm de PILLARS, OLD e PRODUCTS),
   uma linha por título e rótulo. Movimento reduzido: estado final, sem animação.
   Impressão: as divisórias não imprimem (#chap some no @media print; a fundação não imprime capas).
   ===================================================================== */
(function(){"use strict";
if(typeof CHAPX==="undefined")return;
const RM=typeof REDMO!=="undefined"&&REDMO;
const PL=()=>typeof PILLARS!=="undefined"?PILLARS:[];
const PR=()=>typeof PRODUCTS!=="undefined"?PRODUCTS:[];
const SV=()=>typeof OLD!=="undefined"?OLD:[];
const X=s=>typeof esc==="function"?esc(s):String(s);
const ICO=(n,d)=>typeof icoSvg==="function"?icoSvg(n,d):"";
const PICO=(c,d)=>typeof picoSvg==="function"?picoSvg(c,d):ICO("spark",d);
const byCode=(a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true});
const prodOf=c=>PR().find(p=>p.code===c)||null;
const ST={keep:"Manter",ai:"Aprimorar com IA",new:"Criar com IA"};
const SC={keep:"#DFE8F0",ai:"#7EA1C3",new:"#F78C16"};
const DEC={keep:"Manter",ai:"Aprimorar com IA",merge:"Fundir",cut:"Sair como produto isolado"};
const PIC=["target","gauge","split","layers"];          /* ícone de cada pilar (linha, desenha na entrada) */
const MOM=[["Decidir","direção ou custo da TI em xeque"],["Executar","programa crítico em andamento"],
           ["Transacionar","compra, venda ou separação"],["Modernizar","legado e infraestrutura"]];  /* os mesmos do slide 04 */

/* ---------- utilidades: laço com parada, temporizadores e ouvintes com limpeza, ajuste de texto numa linha ---------- */
function kit(root){const L=[];return{
  loop(fn){let on=true,id=0,t0=0,tp=0;const st=t=>{if(!on)return;if(!root.isConnected){on=false;return}if(!t0)t0=tp=t;fn((t-t0)/1000,Math.min(.05,(t-tp)/1000));tp=t;id=requestAnimationFrame(st)};id=requestAnimationFrame(st);L.push(()=>{on=false;cancelAnimationFrame(id)})},
  at(ms,fn){const id=setTimeout(()=>{if(root.isConnected)fn()},ms);L.push(()=>clearTimeout(id))},
  every(ms,fn){const id=setInterval(()=>{if(root.isConnected)fn();else clearInterval(id)},ms);L.push(()=>clearInterval(id))},
  on(el,ev,fn,o){el.addEventListener(ev,fn,o);L.push(()=>el.removeEventListener(ev,fn,o))},
  stop(){L.splice(0).forEach(f=>{try{f()}catch(e){}})}}}
/* largura natural (elemento inline-block ou nowrap) até caber em max px; desce de 0,5 em 0,5 até min */
const natW=el=>Math.max(el.scrollWidth,el.offsetWidth);
function fitW(el,max,min){if(!el)return;el.style.fontSize="";let fs=parseFloat(getComputedStyle(el).fontSize)||16,n=0;while(natW(el)>max+.5&&fs>min&&n++<80){fs-=.5;el.style.fontSize=fs+"px"}}
/* contador inteiro (fx 12): de a até b com desaceleração; sem casas decimais no meio da contagem */
function countInt(el,a,b,dur,K){if(!el)return;if(RM){el.textContent=b;return}let t0=0;const st=t=>{if(!el.isConnected)return;if(!t0)t0=t;const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=Math.round(a+(b-a)*e);if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}
function prep(host,cls){host.classList.add("cx",cls);
  const m=(typeof CAPITULOS!=="undefined"&&CAPITULOS[host.dataset.cxk])||{};
  const tag=host.querySelector(".ch-tag");if(tag)tag.innerHTML=`<i></i>${m.dica?`<b>${m.dica}</b> · `:""}→ ou clique para continuar`;
  const fx=document.createElement("div");fx.className="cx-fx "+cls+"-fx";fx.setAttribute("aria-hidden","true");
  host.insertBefore(fx,host.querySelector(".ch-txt"));return fx}
/* títulos e subtítulo da capa numa linha que não cruza o efeito à direita */
function fitText(host){const tx=host.querySelector(".ch-txt"),h=host.querySelector(".ch-h"),s=host.querySelector(".ch-sub");
  if(h){h.style.fontSize="";let fs=parseFloat(getComputedStyle(h).fontSize)||120;while(h.offsetWidth>790&&fs>64){fs-=2;h.style.fontSize=fs+"px"}}
  if(s){s.style.display="inline-block";fitW(s,790,19)}
  if(tx)tx.style.maxWidth="820px"}

const FX={};

/* =====================================================================
   03 · PARTE 1 · fx 32 Floating Elements
   O escudo DTS no centro, com os 29 serviços em órbita (um ponto por serviço, agrupados por pilar),
   e os 4 pilares como cartões que flutuam com período, amplitude e fase próprios. O cursor pausa o
   cartão (o relógio dele desacelera até parar) e revela o momento em que o cliente chama o pilar;
   um tour automático faz o mesmo a cada 2,6 s até alguém passar o cursor.
   ===================================================================== */
FX["03"]=(host,K)=>{const fx=prep(host,"cx1");const P=PL();if(!P.length)return;
  const C={x:1278,y:452},POS=[[-146,-142],[146,-142],[-146,142],[146,142]];
  const cnt=P.map(p=>SV().filter(o=>o.p===p.n).length||p.was||0),tot=cnt.reduce((a,b)=>a+b,0);
  const gap=1.7,steps=tot+gap*P.length;let k=0,dots="",di=0;
  P.forEach((p,i)=>{for(let j=0;j<cnt[i];j++)dots+=`<i class="cx1-dot" data-p="${i}" style="--a:${(((k+j)/steps)*360-90).toFixed(2)}deg;--k:${di++}"></i>`;k+=cnt[i]+gap});
  fx.innerHTML=`<svg class="cx1-links" viewBox="0 0 1600 900">${P.map((_,i)=>`<line x1="${C.x}" y1="${C.y}" x2="${C.x+POS[i][0]}" y2="${C.y+POS[i][1]}" data-i="${i}"/>`).join("")}</svg>
    <div class="cx1-orb" style="left:${C.x}px;top:${C.y}px"><div class="cx1-track"></div><div class="cx1-rot">${dots}</div>
      <div class="cx1-core"><svg viewBox="0 0 150 154" aria-hidden="true"><defs>
        <linearGradient id="cx1G" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A5A96"/><stop offset=".55" stop-color="#1F3263"/><stop offset="1" stop-color="#0E1C39"/></linearGradient>
        <linearGradient id="cx1E" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DFE8F0"/><stop offset=".45" stop-color="#9DBBD9"/><stop offset=".7" stop-color="#F9A64A"/><stop offset="1" stop-color="#7EA1C3"/></linearGradient></defs>
        <path class="cx1-hx" d="M75 -6 L144 34 V114 L75 154 L6 114 V34 Z" fill="none" stroke="#9DBBD9" stroke-width="1.2"/>
        <path d="M75 4 L135 39 V109 L75 144 L15 109 V39 Z" fill="url(#cx1G)" stroke="url(#cx1E)" stroke-width="2.4"/>
        <path d="M75 18 L122 46 V102 L75 130 L28 102 V46 Z" fill="none" stroke="rgba(255,255,255,.24)" stroke-width="1.1"/>
        <text x="75" y="84" class="cx1-st">DTS</text><rect x="58" y="94" width="34" height="3.2" rx="1.6" fill="#F78C16"/>
        <text x="75" y="115" class="cx1-ss">${tot} SERVIÇOS</text></svg></div></div>
    ${P.map((p,i)=>`<div class="cx1-card${POS[i][1]<0?" up":""}" data-i="${i}" style="left:${C.x+POS[i][0]}px;top:${C.y+POS[i][1]}px">
      <div class="cx1-cin" style="--fx:${-POS[i][0]}px;--fy:${-POS[i][1]}px;--dl:${(.45+i*.12).toFixed(2)}s">
        <span class="cx1-n"><b>${cnt[i]}</b><small>serviços</small></span>
        <span class="cx1-tx"><em>${ICO(PIC[i],4+i)}Pilar ${p.n} · ${MOM[i][0]}</em><b>${X(p.name)}</b></span></div>
      <div class="cx1-tip"><b>${MOM[i][0]}:</b> ${MOM[i][1]}</div></div>`).join("")}`;
  if(typeof fixPaths==="function")fixPaths(fx);
  /* nomes dos pilares: todos no mesmo corpo, o maior que deixa o nome mais longo numa linha dentro do cartão */
  const nms=[...fx.querySelectorAll(".cx1-tx b")];nms.forEach(b=>fitW(b,280-12-16-50-12-2,17));const mn=Math.min(...nms.map(b=>parseFloat(getComputedStyle(b).fontSize)));nms.forEach(b=>b.style.fontSize=mn+"px");
  const cards=[...fx.querySelectorAll(".cx1-card")],lines=[...fx.querySelectorAll(".cx1-links line")],dotEls=[...fx.querySelectorAll(".cx1-dot")];
  let act=-1,hover=-1,lastHover=-1e9;
  const set=i=>{act=i;cards.forEach((c,j)=>c.classList.toggle("on",j===i));lines.forEach((l,j)=>l.classList.toggle("on",j===i));dotEls.forEach(d=>d.classList.toggle("on",+d.dataset.p===i))};
  cards.forEach((c,i)=>{K.on(c,"pointerenter",()=>{hover=i;set(i)});K.on(c,"pointerleave",()=>{hover=-1;lastHover=performance.now();set(-1)})});
  if(RM)return;
  /* flutuação: senos e cossenos com período, amplitude e fase próprios; o relógio de cada cartão desacelera no hover */
  const F=cards.map((_,i)=>({ax:8+((i*5)%6),ay:10+((i*7)%5),tx:4.1+i*1.3,ty:5.3+((i*1.7)%3.2),px:i*1.9,py:i*.7,tau:0,s:1}));
  K.loop((t,dt)=>{cards.forEach((c,i)=>{const f=F[i],tg=(i===hover||i===act)?0:1;f.s+=(tg-f.s)*Math.min(1,dt*9);f.tau+=dt*f.s;
    const dx=f.ax*Math.sin(2*Math.PI*f.tau/f.tx+f.px),dy=f.ay*Math.cos(2*Math.PI*f.tau/f.ty+f.py),r=1.1*Math.sin(2*Math.PI*f.tau/(f.tx*1.6)+f.py);
    c.style.transform=`translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px) rotate(${r.toFixed(2)}deg)`;
    const l=lines[i];l.setAttribute("x2",(C.x+POS[i][0]+dx).toFixed(1));l.setAttribute("y2",(C.y+POS[i][1]+dy).toFixed(1))})});
  /* tour automático: um pilar por vez, até o cursor assumir */
  let ti=0;K.at(2400,()=>{const tour=()=>{if(hover>=0||performance.now()-lastHover<6000)return;set(ti%P.length);ti++};tour();K.every(2600,tour)})};

/* =====================================================================
   05 · PARTE 2 · fx 40 Animated Shader / Hero + fx 19 Pulse / Beacon
   Fundo vivo em canvas 2D (campos de onda em navy e steel, sem imagem) e um fio laranja que serpenteia
   atrás do título. Seis faróis, um por força de mercado (só o nome), pulsam em cadência: o olhar
   percorre as seis em sequência. O cursor num farol acelera o pulso dele.
   ===================================================================== */
const FORCAS=["IA em toda parte, retorno raro","2027 com data marcada","Fundos no centro das transações","Preço por hora na mira","Risco cibernético com regra nova","Talento e liderança escassos"];
FX["05"]=(host,K)=>{const fx=prep(host,"cx2");
  /* nomes das forças: os do slide 05 (se o slide mudar, a capa acompanha); senão, a lista acima */
  let F=FORCAS;try{const s=typeof SL==="function"&&SL("05");if(s){const n=[...new Set([...s.querySelectorAll(".s05-ft b")].map(b=>b.textContent.trim()).filter(Boolean))];if(n.length===6)F=n}}catch(e){}
  const BP=[[1062,218],[1176,306],[1052,394],[1166,482],[1042,570],[1156,658]];
  const cv=H("canvas",{class:"cx2-cv"},fx);const R=.6;cv.width=Math.round(1600*R);cv.height=Math.round(900*R);const g=cv.getContext("2d");
  fx.insertAdjacentHTML("beforeend",`<div class="cx2-hd">Seis forças · um farol para cada</div>`+F.map((f,i)=>`<div class="cx2-bc" style="left:${BP[i][0]}px;top:${BP[i][1]}px;--dl:${(.55+i*.16).toFixed(2)}s;--i:${i}"><span class="cx2-dot"><s style="--r:0"></s><s style="--r:1"></s><s style="--r:2"></s><i></i></span><span class="cx2-lb"><em>${String(i+1).padStart(2,"0")}</em><b>${X(f)}</b></span></div>`).join(""));
  fx.querySelectorAll(".cx2-bc").forEach((b,i)=>fitW(b.querySelector(".cx2-lb b"),1464-BP[i][0],13));
  if(!g)return;
  const NL=17,X0=330,XS=20;
  const gr=(a)=>{const s=g.createLinearGradient(X0,0,1100,0);s.addColorStop(0,`rgba(126,161,195,0)`);s.addColorStop(1,`rgba(126,161,195,${a})`);return s};
  const strokes=Array.from({length:NL},(_,i)=>gr(i%4===0?.30:.13));
  const band=(()=>{const s=g.createLinearGradient(X0,0,1200,0);s.addColorStop(0,"rgba(31,50,99,0)");s.addColorStop(1,"rgba(42,74,128,.30)");return s})();
  const sm=(a,b,x)=>{const k=Math.max(0,Math.min(1,(x-a)/(b-a)));return k*k*(3-2*k)};
  /* o fio passa atrás do título (altura do miolo das letras) e sobe pela direita entre os faróis */
  const thr=(x,t)=>370+70*sm(700,1100,x)-170*sm(1050,1620,x)+(9+30*sm(650,1150,x))*(.75*Math.sin(x*.0062+t*.55)+.45*Math.sin(x*.017-t*.8));
  function draw(t){g.setTransform(R,0,0,R,0,0);g.clearRect(0,0,1600,900);
    const Y=[];for(let i=0;i<NL;i++){const row=[],y0=118+i*42;for(let x=X0;x<=1620;x+=XS)row.push(y0+28*Math.sin(x*.0041+t*.33+i*.55)+16*Math.sin(x*.0102-t*.47+i*1.27)+10*Math.sin(x*.0021+t*.21+i*.9));Y.push(row)}
    for(let i=1;i<NL-1;i+=4){g.beginPath();Y[i].forEach((y,j)=>{const x=X0+j*XS;j?g.lineTo(x,y):g.moveTo(x,y)});for(let j=Y[i+1].length-1;j>=0;j--)g.lineTo(X0+j*XS,Y[i+1][j]);g.closePath();g.fillStyle=band;g.fill()}
    g.lineWidth=1.3;for(let i=0;i<NL;i++){g.beginPath();Y[i].forEach((y,j)=>{const x=X0+j*XS;j?g.lineTo(x,y):g.moveTo(x,y)});g.strokeStyle=strokes[i];g.stroke()}
    /* o fio laranja: três passadas (brilho largo, médio e o fio) */
    const pts=[];for(let x=-20;x<=1620;x+=14)pts.push([x,thr(x,t)]);
    [[11,"rgba(247,140,22,.07)"],[5,"rgba(247,140,22,.18)"],[1.8,"rgba(249,166,74,.92)"]].forEach(([w,c])=>{g.beginPath();pts.forEach(([x,y],j)=>j?g.lineTo(x,y):g.moveTo(x,y));g.lineWidth=w;g.strokeStyle=c;g.lineCap="round";g.stroke()})}
  if(RM){draw(7);return}
  K.loop(t=>draw(t+3))};

/* =====================================================================
   07 · PARTE 3 · fx 14 Heatmap Animation
   A matriz dos 29 serviços (linhas = pilares) começa fria; uma linha de varredura de raio-X passa e
   cada célula esquenta e assume a cor da decisão (manter, aprimorar com IA, fundir, sair como produto
   isolado). Sem valores numéricos nas células. O cursor mostra o serviço, a decisão e o destino;
   a legenda acende só as células de uma decisão.
   ===================================================================== */
FX["07"]=(host,K)=>{const fx=prep(host,"cx3");const P=PL(),S=SV();if(!P.length||!S.length)return;
  const cnt={};S.forEach(o=>cnt[o.d]=(cnt[o.d]||0)+1);
  const SPK='<svg viewBox="0 0 24 24"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>';
  const cell=(o,c,r)=>{const p=prodOf(o.to),dst=p?`${p.code} · ${X(p.name)}`:o.to;const t0=.7+1.7*((c*41+18)/405)-.38+r*.03;
    const th=`<span class='tl'><b>Decisão</b>${DEC[o.d]||o.d}</span><span class='tl'><b>${o.d==="cut"?"Absorvido por":"Vai para"}</b>${dst.replace(/'/g,"&#39;")}</span>`;
    return `<i class="cx3-c ${o.d}" data-d="${o.d}" style="--hd:${t0.toFixed(2)}s" data-tv="${X(o.n)}" data-th="${th.replace(/"/g,"&quot;")}">${o.d==="ai"?SPK:""}</i>`};
  fx.innerHTML=`<div class="cx3-box"><div class="cx3-hd"><span>Raio-X · ${S.length} serviços em ${P.length} pilares</span><span>uma célula por serviço</span></div>
    <div class="cx3-grid">${P.map((p,r)=>`<div class="cx3-rl" style="--r:${r}"><em>Pilar ${p.n}</em><b>${X(p.name)}</b></div><div class="cx3-row">${S.filter(o=>o.p===p.n).map((o,c)=>cell(o,c,r)).join("")}</div>`).join("")}<i class="cx3-scan"></i></div>
    <div class="cx3-lg">${["keep","ai","merge","cut"].map(d=>`<button type="button" class="${d}" data-d="${d}" style="--dc:${{keep:"#DFE8F0",ai:"#5E8AB4",merge:"#22406E",cut:"transparent"}[d]};--db:${{keep:"#DFE8F0",ai:"#7EA1C3",merge:"#3E5F8E",cut:"rgba(223,232,240,.6)"}[d]}"><i></i>${DEC[d]}<b>${cnt[d]||0}</b></button>`).join("")}</div></div>`;
  const box=fx.querySelector(".cx3-box"),cells=[...fx.querySelectorAll(".cx3-c")],btns=[...fx.querySelectorAll(".cx3-lg button")];let pin=null;
  const lite=d=>{box.classList.toggle("dim",!!d);cells.forEach(c=>c.classList.toggle("lit",c.dataset.d===d));btns.forEach(b=>b.classList.toggle("on",b.dataset.d===d))};
  btns.forEach(b=>{K.on(b,"pointerenter",()=>lite(b.dataset.d));K.on(b,"pointerleave",()=>lite(pin));K.on(b,"click",e=>{e.stopPropagation();pin=pin===b.dataset.d?null:b.dataset.d;lite(pin)})})};

/* =====================================================================
   08 · PARTE 4 · fx 03 Hologram 3D Cards + fx 12 Counter Animation
   As 24 cartas de produto em leque (uma por produto, agrupadas por pilar, faixa no topo com a cor do
   status). O leque inclina com o cursor (perspectiva), o reflexo holográfico acompanha e a carta sob o
   cursor sobe e brilha; o rodapé diz qual é. O contador vai de 29 serviços para 24 produtos.
   Clique numa carta abre a ficha do produto.
   ===================================================================== */
FX["08"]=(host,K)=>{const fx=prep(host,"cx4");const ps=PR().slice().sort(byCode);if(!ps.length)return;
  const was=SV().length||29,now=ps.length,sc={keep:0,ai:0,new:0};ps.forEach(p=>sc[p.st]=(sc[p.st]||0)+1);
  let u=0;const U=ps.map((p,i)=>{if(i&&p.pillar!==ps[i-1].pillar)u+=.8;const v=u;u+=1;return v});u-=1;const A=22;
  fx.innerHTML=`<div class="cx4-top"><div class="cx4-ct"><span class="cx4-k k0"><b>${was}</b><small>serviços hoje</small></span><span class="cx4-ar">→</span><span class="cx4-k k1"><b data-k>${RM?now:was}</b><small>produtos</small></span></div>
      <div class="cx4-lg">${["keep","ai","new"].map(s=>`<span style="--sc:${SC[s]}"><i></i><b>${sc[s]||0}</b>${s==="keep"?"manter":s==="ai"?"aprimorar com IA":"criar com IA"}</span>`).join("")}</div></div>
    <div class="cx4-fan"><div class="cx4-tilt">${ps.map((p,i)=>`<a class="cx4-card" href="#p=${p.id}" data-pd="${p.id}" data-i="${i}" aria-label="${X(p.code+" · "+p.name)}" style="--a:${(-A+2*A*U[i]/u).toFixed(2)}deg;--sc:${SC[p.st]};--dl:${(.3+i*.032).toFixed(3)}s;z-index:${i+1}"${i===ps.length-1?' data-last=""':""}>
      <span class="cx4-sh"></span><span class="cx4-cap"></span><span class="cx4-code">${p.code}</span>${p.sig?'<span class="cx4-sig" title="A&amp;M Signature">★</span>':""}<span class="cx4-ic">${PICO(p.code,6)}</span><span class="cx4-pl">Pilar ${p.pillar}</span></a>`).join("")}</div></div>
    <div class="cx4-ro" aria-live="polite"></div>`;
  if(typeof fixPaths==="function")fixPaths(fx);
  const fan=fx.querySelector(".cx4-fan"),tilt=fx.querySelector(".cx4-tilt"),cards=[...fx.querySelectorAll(".cx4-card")],ro=fx.querySelector(".cx4-ro");
  const idle=`<small>${now} cartas, uma por produto · passe o cursor numa carta</small>`;
  const show=i=>{cards.forEach((c,j)=>c.classList.toggle("up",j===i));if(i<0){ro.innerHTML=idle;return}const p=ps[i];
    ro.innerHTML=`<em>${p.code}</em><span>${X(p.name)}</span><small>· ${ST[p.st]||""}</small>${p.sig?"<small>· ★ A&amp;M Signature</small>":""}`;ro.style.fontSize="";fitW(ro,620,13)};
  let hov=false,last=-1e9;const news=ps.map((p,i)=>p.st==="new"?i:-1).filter(i=>i>=0);
  cards.forEach((c,i)=>K.on(c,"pointerenter",()=>{hov=true;show(i)}));
  K.on(fan,"pointerleave",()=>{hov=false;last=performance.now();tilt.style.transform="";show(-1)});
  if(RM){show(news[0]!=null?news[0]:0);return}
  ro.innerHTML=idle;
  K.on(fan,"pointermove",e=>{const r=fan.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    tilt.style.transform=`rotateX(${((.5-py)*7).toFixed(2)}deg) rotateY(${((px-.5)*9).toFixed(2)}deg)`;fan.style.setProperty("--mx",px.toFixed(3))});
  /* contador 29 → 24 enquanto as cartas são distribuídas */
  K.at(500,()=>countInt(fx.querySelector("[data-k]"),was,now,1300));
  /* folheio: as cartas sobem uma a uma; depois o tour mostra as quatro novas */
  const t1=Math.round((.3+ps.length*.032+.75)*1000);
  cards.forEach((c,i)=>{K.at(t1+i*45,()=>{if(!hov)c.classList.add("rf")});K.at(t1+i*45+240,()=>c.classList.remove("rf"))});
  let ti=0;K.at(t1+ps.length*45+300,()=>{const tour=()=>{if(hov||performance.now()-last<5000||!news.length)return;show(news[ti%news.length]);ti++};tour();K.every(2600,tour)})};

/* =====================================================================
   10 · 12 · 14 · 16 · ABERTURAS DOS PILARES · fx 01 Motion Graphics + fx 02 Icon Motion + fx 12 Counter
   Abertura coreografada: o anel se desenha e o marcador gira até pousar; o ícone do pilar se desenha;
   os serviços de hoje entram como cartões cinza; depois se reorganizam nos cartões dos produtos (cor
   por status: manter, aprimorar com IA, criar com IA): serviços que se fundem convergem para o mesmo
   produto, o que muda de pilar sai pela direita, o que vem de outro pilar entra, e o produto novo
   nasce por último. O contador vai de 10 → 7, 7 → 6, 8 → 5, 4 → 6. Cada cartão abre a ficha.
   ===================================================================== */
function pilar(n){return(host,K)=>{const fx=prep(host,"cxp");host.classList.add("pil");const pl=PL()[n-1];if(!pl)return;
  const ps=PR().filter(p=>p.pillar===n).sort(byCode),S=SV();if(!ps.length)return;
  const pil=c=>{const p=prodOf(c);return p?p.pillar:0};
  const own=S.filter(o=>o.p===n),inc=S.filter(o=>o.p!==n&&pil(o.to)===n);
  const was=own.length||pl.was,now=ps.length,sc={keep:0,ai:0,new:0};ps.forEach(p=>sc[p.st]=(sc[p.st]||0)+1);
  const TH=32,TG=6,PH=48,PG=Math.min(10,Math.max(6,Math.floor((410-ps.length*PH)/Math.max(1,ps.length-1)))),slot=c=>ps.findIndex(p=>p.code===c);
  const yT=i=>i*(TH+TG),yP=j=>j*(PH+PG);
  /* bloco da direita centrado na altura do texto: emblema (104) + legenda + campo (o maior entre cartões cinza e produtos) */
  const fH=Math.max(own.length*(TH+TG)-TG,ps.length*(PH+PG)-PG),top=Math.max(118,Math.round(452-(104+16+22+18+fH)/2));
  const srcOf=p=>S.filter(o=>o.to===p.code);
  fx.innerHTML=`<div class="cxp-top" style="top:${top}px"><span class="cxp-em"><svg class="cxp-ring" viewBox="0 0 104 104"><circle class="r0" cx="52" cy="52" r="47"/><circle class="r1" cx="52" cy="52" r="47" pathLength="1"/></svg><span class="cxp-mk"><i></i></span><span class="cxp-ic">${ICO(PIC[n-1],1)}</span></span>
      <span class="cxp-ct"><span class="cxp-nums"><span class="k0">${was}</span><span class="ar">→</span><b class="k1" data-k>${RM?now:was}</b></span><span class="cxp-lab">serviços hoje → produtos</span></span></div>
    <div class="cxp-lg" style="top:${top+104+16}px">${["keep","ai","new"].map(s=>sc[s]?`<span style="--sc:${SC[s]}"><i></i><b>${sc[s]}</b>${s==="keep"?"manter":s==="ai"?"aprimorar com IA":"criar com IA"}</span>`:"").join("")}</div>
    <div class="cxp-field" style="top:${top+104+16+22+18}px;height:${fH}px">
      ${RM?"":own.map((o,i)=>{const out=pil(o.to)!==n;return `<div class="cxp-tl" data-to="${o.to}"${out?` data-out="${pil(o.to)}"`:""} style="top:${yT(i)}px;--dl:${(.35+i*.06).toFixed(2)}s"><i></i>${X(o.n)}${out?`<em>vai para o Pilar ${pil(o.to)}</em>`:""}</div>`}).join("")+
        inc.map(o=>`<div class="cxp-tl in" data-to="${o.to}" data-in="${o.p}" style="top:${yP(slot(o.to))+(PH-TH)/2}px;opacity:0"><i></i>${X(o.n)}<em>vem do Pilar ${o.p}</em></div>`).join("")}
      ${ps.map((p,j)=>{const src=srcOf(p),from=src.length?src.map(o=>o.n+(o.p!==n?` (Pilar ${o.p})`:"")).join("; "):"produto novo, com IA desde o desenho";
        const th=`<span class='tl'><b>Status</b>${ST[p.st]||""}${p.sig?" · ★ A&amp;M Signature":""}</span><span class='tl'><b>Origem</b>${X(from).replace(/'/g,"&#39;")}</span>`;
        return `<a class="cxp-pc ${p.st}${p.st==="new"?" glow":""}" href="#p=${p.id}" data-pd="${p.id}" style="top:${yP(j)}px;--dl:${RM?0:(p.st==="new"?2.75:2.15+j*.07).toFixed(2)}s" data-tv="${X(p.code+" · "+p.name)}" data-th="${th.replace(/"/g,"&quot;")}">
          <span class="cd">${p.code}</span>${PICO(p.code,8+j)}<span class="nm">${X(p.name)}</span><span class="rt">${p.st==="new"?'<span class="tg">Novo</span>':`<span class="pp">${src.map(()=>"<i></i>").join("")}</span>`}${p.sig?'<span class="sg" title="A&amp;M Signature">★</span>':""}</span></a>`}).join("")}
    </div>`;
  if(typeof fixPaths==="function")fixPaths(fx);
  fx.querySelectorAll(".cxp-pc .nm").forEach(el=>{const pc=el.closest(".cxp-pc"),rt=pc.querySelector(".rt");fitW(el,540-14-8-6-38-12-21-12-12-(rt?rt.offsetWidth:0),15)});
  if(RM)return;
  /* fase 2: reorganização (WAAPI). Cada cartão cinza vai ao centro do produto de destino e some; o que sai vai para a direita */
  const tiles=[...fx.querySelectorAll(".cxp-tl")],ease2="cubic-bezier(.65,0,.35,1)";
  K.at(1500,()=>countInt(fx.querySelector("[data-k]"),was,now,1150));
  tiles.forEach((t,i)=>{const out=t.dataset.out,inn=t.dataset.in,j=slot(t.dataset.to),y0=parseFloat(t.style.top);
    if(inn){K.at(1450,()=>{t.classList.add("mv");t.animate([{opacity:0,transform:"translateX(90px)"},{opacity:1,transform:"translateX(30px)",offset:.45},{opacity:1,transform:"translateX(0)",offset:.8},{opacity:0,transform:"translateX(0)"}],{duration:1150,easing:ease2,fill:"forwards"})});return}
    if(out){K.at(1250,()=>t.classList.add("mv"));K.at(1550,()=>t.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(140px)",opacity:0}],{duration:700,easing:"cubic-bezier(.5,0,.75,0)",fill:"forwards"}));return}
    const dy=yP(j)+(PH-TH)/2-y0,dl=1600+i*45;
    K.at(dl,()=>t.animate([{transform:"translate(0,0)",opacity:1},{transform:`translate(0,${dy}px)`,opacity:1,offset:.78},{transform:`translate(0,${dy}px) scaleX(.97)`,opacity:0}],{duration:900,easing:ease2,fill:"forwards"}))})}}
[[10,1],[12,2],[14,3],[16,4]].forEach(([k,n])=>FX[String(k)]=pilar(n));

/* =====================================================================
   18 · PARTE 5 · fx 17 BPMN Flow Motion
   Um marcador (token) percorre o processo na ordem real: início → Fábrica de produtos (sete portões
   acendem um a um) → Jogos de entrada (quatro jogos) → Ondas do roadmap (quatro ondas) → troca de raia
   para o Comitê → Decisão → fim. Os conectores se desenham à frente do token; cada etapa acende ao
   chegar e fica acesa. Depois, o token segue circulando pelo fluxo. Cada etapa leva ao slide dela.
   ===================================================================== */
FX["18"]=(host,K)=>{const fx=prep(host,"cx5");
  const XT=1168,TW=292,TX=XT-TW/2,GX=1438,GY=548,EY=662,SY=262,TA=296,TB=404,TC=512,TH=72;
  const T=[{y:TA,ic:"check",b:"Fábrica de produtos",g:7,c:"dm",s:"sete portões",go:18},{y:TB,ic:"people",b:"Jogos de entrada",g:4,c:"cd",s:"um por pilar",go:19},{y:TC,ic:"route",b:"Ondas do roadmap",g:4,c:"wv",s:"fundação → recorrência",go:20}];
  const arw=(x,y,d)=>d==="d"?`M${x-5} ${y-8} L${x} ${y} L${x+5} ${y-8} Z`:`M${x-8} ${y-5} L${x} ${y} L${x-8} ${y+5} Z`;
  const CN=[[[XT,SY+15],[XT,TA-2],"d"],[[XT,TA+TH],[XT,TB-2],"d"],[[XT,TB+TH],[XT,TC-2],"d"],[[TX+TW,GY],[GX-28,GY],"r"],[[GX,GY+26],[GX,EY-17],"d"]];
  fx.innerHTML=`<div class="cx5-pool"><span class="cx5-lh" style="left:16px">Raia · DTS</span><span class="cx5-lh" style="left:338px">Raia · Comitê</span><i class="cx5-hr"></i><i class="cx5-lane" style="left:320px"></i></div>
    <svg class="cx5-svg" viewBox="0 0 1600 900">
      ${CN.map(([a,b,d],i)=>`<path class="fl" data-c="${i}" d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" pathLength="1"/><path class="ar" data-c="${i}" d="${arw(b[0],b[1]+(d==="d"?2:0),d)}"/>`).join("")}
      <circle class="ev st" cx="${XT}" cy="${SY}" r="15"/>
      <circle class="tk" r="7" cx="${XT}" cy="${SY}" opacity="0"/>
      <path class="gw" d="M${GX} ${GY-26} L${GX+26} ${GY} L${GX} ${GY+26} L${GX-26} ${GY} Z"/><text class="gq" x="${GX}" y="${GY+7}">?</text>
      <circle class="ev end" cx="${GX}" cy="${EY}" r="15"/></svg>
    ${T.map((t,i)=>`<button type="button" class="cx5-t" data-go-ch="${t.go}" style="left:${TX}px;top:${t.y}px;--dl:${(.35+i*.12).toFixed(2)}s" title="Abrir: ${t.b}"><span class="ix">${ICO(t.ic,3+i)}</span><span class="tx"><b>${t.b}</b><span class="gl">${Array.from({length:t.g},()=>`<s class="${t.c}"></s>`).join("")}<span>${t.s}</span></span></span></button>`).join("")}
    <button type="button" class="cx5-gl" data-go-ch="20" style="left:${GX}px;top:${GY-88}px;--dl:.8s" title="Abrir: Roadmap e decisões"><b>Decisão do comitê</b><span>o que pedimos hoje</span></button>`;
  if(typeof fixPaths==="function")fixPaths(fx);
  fx.querySelectorAll(".cx5-t .gl").forEach(g=>fitW(g,TW-16-14-38-12,11));
  const q=s=>fx.querySelector(s),qa=s=>[...fx.querySelectorAll(s)];
  const fl=qa("path.fl"),ar=qa("path.ar"),tk=q(".tk"),tasks=qa(".cx5-t"),gw=q(".gw"),gl=q(".cx5-gl"),st=q(".ev.st"),en=q(".ev.end");
  const lightCn=(i,p)=>{fl[i].style.setProperty("--o",String(1-p));ar[i].style.setProperty("--ao",p>.96?"1":"0")};
  const lightT=(i,p)=>{const t=tasks[i];t.classList.add("on");const s=[...t.querySelectorAll(".gl s")];s.forEach((x,k)=>x.classList.toggle("on",p>=(k+.5)/s.length||x.classList.contains("on")))};
  if(RM){fl.forEach((_,i)=>lightCn(i,1));tasks.forEach((_,i)=>lightT(i,1));gw.classList.add("on");gl.classList.add("on");st.classList.add("on");en.classList.add("on");tk.setAttribute("cx",GX);tk.setAttribute("cy",EY);tk.setAttribute("opacity","1");return}
  /* segmentos do percurso: [pontos, duração em ms, o que acende] (dentro das etapas o token passa por baixo do cartão) */
  const SEG=[[[[XT,SY],[XT,TA]],260,p=>{st.classList.add("on");lightCn(0,p)}],[[[XT,TA],[XT,TA+TH]],950,p=>lightT(0,p)],
    [[[XT,TA+TH],[XT,TB]],300,p=>lightCn(1,p)],[[[XT,TB],[XT,TB+TH]],620,p=>lightT(1,p)],
    [[[XT,TB+TH],[XT,TC]],300,p=>lightCn(2,p)],[[[XT,TC],[XT,GY],[TX+TW,GY]],620,p=>lightT(2,p)],
    [[[TX+TW,GY],[GX-26,GY]],420,p=>lightCn(3,p)],[[[GX-26,GY],[GX,GY],[GX,GY+26]],420,p=>{gw.classList.add("on");gl.classList.add("on")}],
    [[[GX,GY+26],[GX,EY]],440,p=>{lightCn(4,p);if(p>=1)en.classList.add("on")}]];
  const len=pts=>{let L=0;for(let i=1;i<pts.length;i++)L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);return L};
  const at=(pts,f)=>{let d=len(pts)*f;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],l=Math.hypot(b[0]-a[0],b[1]-a[1]);if(d<=l||i===pts.length-1){const k=l?Math.min(1,d/l):1;return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]}d-=l}return pts[pts.length-1]};
  const TOT=SEG.reduce((a,s)=>a+s[1],0),START=700,REST=1600;
  const place=m=>{let acc=0;for(const s of SEG){if(m<=acc+s[1]){const p=Math.max(0,(m-acc)/s[1]),xy=at(s[0],p);tk.setAttribute("cx",xy[0].toFixed(1));tk.setAttribute("cy",xy[1].toFixed(1));return{s,p}}acc+=s[1]}return null};
  /* 1ª volta: acende as etapas; depois o token descansa no fim e volta a circular, sem apagar nada */
  K.loop(t=>{const ms=t*1000-START;if(ms<0)return;tk.setAttribute("opacity","1");
    if(ms<TOT){const r=place(ms);if(r)r.s[2](r.p);return}
    const c=(ms-TOT)%(REST+TOT);if(c<REST){SEG.forEach(s=>s[2](1));tk.setAttribute("cx",GX);tk.setAttribute("cy",EY);return}
    place(c-REST)})};

/* ---------- registro: troca o efeito de reserva (25-pilares.js) pelo desta frente ---------- */
Object.keys(FX).forEach(k=>{CHAPX[k]=host=>{host.dataset.cxk=k;const K=kit(host.querySelector(".ch-txt")||host);
  safe(FX[k],host,K);fitText(host);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(host.dataset.cxk===k&&host.classList.contains("on"))fitText(host)});
  return()=>K.stop()}});
})();
