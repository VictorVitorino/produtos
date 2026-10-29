/* =====================================================================
   AJUDANTES COMPARTILHADOS (fundação) · carregado depois de core.js e antes dos slides
   PBY · plink · pcode · strip · codeLink · ICO/ico · MorphScene
   Registros compartilhados: PCFG (conteúdo dos pilares), BAS (antes/depois ativos)
   ===================================================================== */
/* número (1–20) do slide One-page: as fichas voltam para ele */
const ONEPAGE=(()=>{const s=SL("09");return s?slides.indexOf(s)+1:1})();
const PBY=c=>typeof PRODUCTS!=="undefined"?PRODUCTS.find(p=>p.code===c):undefined;
const strip=h=>String(h==null?"":h).replace(/<[^>]+>/g,"");
/* link de produto: "1.1 Nome" (abre a ficha) */
const plink=(c,cls)=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="plink ${cls||""} ${p.st}" title="Abrir ficha: ${p.name}">${p.code} ${p.name}</a>`:""};
/* chip só com o código (onde falta espaço): o nome completo vai na dica e o clique abre a ficha */
const pcode=(c,cls)=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="plink ${cls||""} ${p.st}" data-tv="${p.code} · ${p.name}" data-tl="Clique para abrir a ficha.">${p.code}</a>`:""};
/* código de produto dentro de um texto (1.1 … 4.7) → link para a ficha, com o nome completo na dica */
const codeLink=x=>String(x).replace(/\b([1-4]\.[1-7])\b/g,(m,c)=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="xr" data-tv="${p.code} · ${p.name}" data-tl="Clique para abrir a ficha.">${c}</a>`:m});
const ICO={spark:'<path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>',doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>',deal:'<path d="M3 12l4-4 4 3 3-3 7 6"/><path d="M3 18h18"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.6-.9-1.5-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.9 0 2.8 5 1.5 5 4.2 0 1.2-1.1 2-2.5 2-1.1 0-2.1-.4-2.7-1.3M12 6.5v1.8M12 16.4v1.6"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',people:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 14.5c3 0 6 2 6 5.5"/>'};
const ico=(k,c)=>`<svg class="i24" viewBox="0 0 24 24" style="color:${c||"currentColor"}">${ICO[k]||ICO.spark}</svg>`;

/* registro de fontes e fatos (src/data/05-fontes.js, do time de conteúdo): leitura segura, sem erro se o arquivo faltar
   FATO(id) → {txt,num,fontes,status,…} · FONTE(id) → {org,titulo,data,url,tipo} · fatoSrc(id) → "Org (data) · Org (data)" */
const FATO=id=>(typeof FATOS!=="undefined"&&FATOS[id])||null;
const FONTE=id=>(typeof FONTES!=="undefined"&&FONTES[id])||null;
const fatoSrc=id=>{const f=FATO(id);return f?(f.fontes||[]).map(k=>{const s=FONTE(k);return s?`${s.org} (${s.data})`:""}).filter(Boolean).join(" · "):""};

/* conteúdo dos pilares, registrado pelos módulos dos slides 10–17 e lido por 25-pilares.js no boot:
   PCFG[n].cliente  = {pers,mk,heat,ws,jr,pos}        (slides 10, 12, 14, 16)
   PCFG[n].produtos = {notes,ovl,cap}                (slides 11, 13, 15, 17)  · ver CONTRACT.md */
const PCFG={1:{},2:{},3:{},4:{}};
/* antes/depois (BeforeAfter) ativos, por chave: "hb" (slide 8) e 1–4 (vista 2 dos pilares) */
const BAS={};

/* ---------- morph scene (aberturas de pilar) ---------- */
function MorphScene(svg,cfg){const W=640,cx=320,cy=300,R=170;svg.innerHTML="";const id="g"+Math.random().toString(36).slice(2,7);
  const df=S("defs",null,svg),lg=S("linearGradient",{id,x1:0,y1:0,x2:1,y2:1},df);S("stop",{offset:0,"stop-color":"#5E8AB4"},lg);S("stop",{offset:.6,"stop-color":"#1F3263"},lg);S("stop",{offset:1,"stop-color":"#0E1C39"},lg);
  const rg=S("radialGradient",{id:id+"r"},df);S("stop",{offset:0,"stop-color":"rgba(247,140,22,.35)"},rg);S("stop",{offset:1,"stop-color":"rgba(247,140,22,0)"},rg);
  S("circle",{cx,cy,r:285,fill:`url(#${id}r)`,opacity:.55},svg);
  S("circle",{cx,cy,r:250,fill:"none",stroke:"rgba(255,255,255,.08)","stroke-width":1,"stroke-dasharray":"2 7"},svg);
  const outer=S("path",{fill:`url(#${id})`,stroke:"rgba(157,187,217,.65)","stroke-width":2,opacity:.95},svg);
  const inner=S("path",{fill:"none",stroke:"rgba(249,166,74,.8)","stroke-width":2,"stroke-dasharray":"5 6"},svg);
  const mx=Math.max(...cfg.states.map(s=>s.dots));const dots=[];for(let k=0;k<mx;k++){const c=S("circle",{cx:0,cy:0,r:7,fill:"#9DBBD9"},svg);c.style.transition="transform 1.1s cubic-bezier(.65,0,.35,1),fill .6s,opacity .6s";dots.push(c)}
  const g=S("g",{style:"transition:opacity .35s"},svg);const t1=T(g,cx,cy-2,"",{"text-anchor":"middle",fill:"#fff",style:"font:800 84px var(--fh);letter-spacing:-.01em"});const t2=T(g,cx,cy+32,"",{"text-anchor":"middle",fill:"#F9A64A",style:"font:700 12px var(--fb);letter-spacing:.2em"});const t3=T(g,cx,cy+54,"",{"text-anchor":"middle",fill:"#C8DBEB",style:"font:500 13px var(--fb)"});
  const rnd=k=>{const a=Math.sin(k*12.9898)*43758.5453;return a-Math.floor(a)};
  const shapes=cfg.states.map(s=>({pts:s.shape==="blob"?SHAPES.blob(cx,cy,R,.6):s.shape==="hex"?SHAPES.hex(cx,cy,R*1.08):s.shape==="square"?SHAPES.square(cx,cy,R*1.75,26):SHAPES.circle(cx,cy,R)}));
  const innerPts=cfg.states.map(s=>s.shape==="blob"?SHAPES.blob(cx,cy,R*.72,2.2):s.shape==="hex"?SHAPES.hex(cx,cy,R*.74):s.shape==="square"?SHAPES.square(cx,cy,R*1.2,18):SHAPES.circle(cx,cy,R*.74));
  const btns=cfg.btnHost?cfg.states.map((s,k)=>{const b=H("button",{class:"pill",type:"button"},cfg.btnHost,s.btn);b.onclick=e=>{e.stopPropagation();mp.go(k,true)};return b}):[];
  function place(k){const st=cfg.states[k];dots.forEach((d,j)=>{let x,y,op=1,fill="#9DBBD9";if(j>=st.dots){op=0;x=cx;y=cy}else if(st.shape==="blob"){const a=rnd(j+1)*Math.PI*2,rr=205+rnd(j+7)*70;x=cx+rr*Math.cos(a);y=cy+rr*Math.sin(a);fill="#7EA1C3"}else{const a=-Math.PI/2+j*2*Math.PI/st.dots;x=cx+245*Math.cos(a);y=cy+245*Math.sin(a);fill=st.ai&&j<st.ai?"#F78C16":"#fff";if(st.ai&&j>=st.ai)fill="#9DBBD9"}
      d.style.transform=`translate(${x}px,${y}px)`;d.style.opacity=op;d.setAttribute("fill",fill)});
    g.style.opacity=0;setTimeout(()=>{t1.textContent=st.big;t2.textContent=st.lab;t3.textContent=st.sub||"";g.style.opacity=1},350);
    btns.forEach((b,j)=>b.classList.toggle("on",j===k))}
  const mp=Morpher({path:outer,states:shapes,dwell:cfg.dwell||2400,onState:(k)=>{place(k);morphTo(inner,readPts(inner),innerPts[k],1150)}});
  function readPts(p){const d=p.getAttribute("d");if(!d)return innerPts[0];return d.slice(1,-1).split("L").map(s=>s.split(" ").map(Number))}
  inner.setAttribute("d",toD(innerPts[0]));place(0);return mp}
