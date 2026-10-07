/* Arquivo carregado depois de engine.js, data.js, core.js e slides.js (ver build.py). */
/* =====================================================================
   PILAR N · PRODUTOS (slides 11, 13, 15, 17) · duas vistas por slide
   1 · Produtos (fx 29 · Morphing Shapes): grafo serviço → produto em três
       estados (Hoje · Produtos · Com IA), cards dos produtos e "O que muda"
   2 · Antes e depois (fx 37 · Before / After): comparação linha a linha
   ===================================================================== */
function pillarNotes(n){return{1:["3 ofertas de liderança viram 1 (Interim & Embedded)","Tax + incentivos viram 1 produto com A&M Tax","Resiliência migra para o Pilar 4","Novo: AI Value & Governance Office"],
 2:["TMO + Modelo de Implantação viram o Predictive Transformation Office","ERP Readiness incorpora a Reforma Tributária","IT Business Partner sai (vai para 1.3)","Novo: AI-Native IT Productivity"],
 3:["8 fases viram 4 produtos + 1 assinatura","DD buy + sell = 1 produto, 3 níveis","IMO + SMO = 1 escritório","Playbook vira motor do PE Tech Value Radar"],
 4:["Nomes pelo que entregam (‘Strategy Application’ → Portfolio Rationalization)","Infra deixa de soar como serviço gerenciado","Resiliência chega do Pilar 1","Novo: Legacy X-Ray & AI Modernization"]}[n]}

/* ---------- vista 2 · before / after por pilar ---------- */
const BAPX={};
document.querySelectorAll(".bap").forEach(host=>{const n=+host.dataset.pillar,pl=PILLARS[n-1],ps=PRODUCTS.filter(p=>p.pillar===n);
  const rows=ps.map(p=>({p,olds:OLD.filter(o=>o.to===p.code)}));const out=OLD.filter(o=>o.p===n&&!ps.some(p=>p.code===o.to));const R=rows.length+out.length;
  const DN={keep:"Manter",ai:"Remodelar",merge:"Fundir",cut:"Retirar"};
  const asisRow=r=>{if(!r.olds.length)return`<div class="c a"><div class="asis-none">não existe hoje</div></div><div class="c b"><div class="why"><b>Lacuna:</b> ${strip(r.p.pain[0])}.</div></div>`;
    const prim=r.olds.find(o=>o.d!=="merge"&&o.d!=="cut")||r.olds[0];
    return`<div class="c a">${r.olds.map(o=>`<span class="asis-chip ${o.d}">${o.n}${o.p!==n?` <i>(Pilar ${o.p})</i>`:""}</span>`).join("")}</div><div class="c b"><div class="why">${r.olds.length>1?`<b>Sobreposição:</b> ${r.olds.length} serviços para o mesmo comprador. `:""}${prim.w}</div><span class="dec">${[...new Set(r.olds.map(o=>DN[o.d]))].join(" + ")}</span></div>`};
  const tobeRow=r=>{const p=r.p;return`<div class="c a"><div class="tb-code">${p.code}</div>${stTag(p.st)}${p.sig?'<span class="sig2">★ Signature</span>':""}</div><a class="c b tb" href="#p=${p.id}" data-pd="${p.id}"><div class="tb-nm">${p.name}<span class="more">ficha ›</span></div><div class="tb-tl">${p.tagline}</div><div class="tb-ai"><b>IA</b> ${strip(p.ai[0])}</div></a>`};
  const outAsis=o=>`<div class="c a"><span class="asis-chip ${o.d}">${o.n}</span></div><div class="c b"><div class="why">${o.w}</div><span class="dec">${o.d==="cut"?"Retirar":"Transferir"}</span></div>`;
  const outTobe=o=>{const d=PBY(o.to);return`<div class="c a"><span class="st ${o.d==="cut"?"cut":"merge"}">${o.d==="cut"?"Retirado":"Transferido"}</span></div><a class="c b tb" href="#p=${d.id}" data-pd="${d.id}"><div class="tb-nm" style="font-size:13px;color:var(--steel-200)">→ ${o.d==="cut"?"Absorvido por":"Agora no Pilar "+d.pillar+":"} ${d.code} ${d.name}</div><div class="tb-tl">${o.n} ${o.d==="cut"?"deixa de ser vendido isolado.":"muda de pilar."}</div></a>`};
  const head=(a,b)=>`<div class="c hd a">${a}</div><div class="c hd b">${b}</div>`;
  const grid=`grid-template-rows:30px repeat(${R},1fr)`;
  host.innerHTML=`<div class="ba" data-a="fade" style="--d:3;height:100%">
     <div class="ba-layer ba-tobe"><div class="ba-grid" style="${grid}">${head("Status","Produto proposto · papel da IA")}${rows.map(tobeRow).join("")}${out.map(outTobe).join("")}</div></div>
     <div class="ba-layer ba-asis"><div class="ba-grid" style="${grid}">${head("Serviço atual","Diagnóstico · por que mudar")}${rows.map(asisRow).join("")}${out.map(outAsis).join("")}</div></div>
   </div>
   <div class="ba-side" data-a="right" style="--d:5">
     <div class="seg ba-seg"><button data-v="100">Hoje</button><button data-v="38.5" class="on">Lado a lado</button><button data-v="0">Proposta</button></div>
     <div class="card nv count"><span class="label">Pilar ${n} · ${pl.name}</span><div class="big">${pl.was} → ${pl.now}</div><span class="small">serviços → produtos</span></div>
     <div class="card">${["keep","ai","new"].map(k=>{const c=ps.filter(p=>p.st===k).length;return`<div class="bar-r"><span>${STATUS[k][0]}</span><i><b class="${k}" style="width:${c/ps.length*100}%"></b></i><em>${c}</em></div>`}).join("")}</div>
     <div class="card soft chg"><span class="label">O que muda</span><ul>${pillarNotes(n).map(x=>`<li>${x}</li>`).join("")}</ul></div>
     ${ps.filter(p=>p.st==="new").map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="nw holo"><span class="label">★ Novo com IA · ${p.code}</span><h4>${p.name}</h4><p>${p.kpis[0][0]} ${strip(p.kpis[0][1]).replace(/\s*\[E[^\]]*\]/g,"")}</p></a>`).join("")}
   </div>`;
  let lastOn="";const ba=BeforeAfter(host.querySelector(".ba"),{rest:38.5,onMove:x=>{let k="";host.querySelectorAll(".ba-seg button").forEach(b=>{const on=Math.abs(+b.dataset.v-x)<3;b.classList.toggle("on",on);if(on)k=b.dataset.v});if(k!==lastOn){lastOn=k;segSync(host.querySelector(".ba-seg"))}}});BAS[n]=ba;
  const sg=host.querySelector(".ba-seg");sg.querySelectorAll("button").forEach(b=>b.onclick=()=>{ba.tween(+b.dataset.v,800);sg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));segSync(sg)});
  BAPX[n]={ba,sg}});

PRINT.push(()=>Object.entries(BAS).forEach(([k,b])=>b.set(k==="hb"?50:38.5)));

/* ---------- vista 1 · grafo que muda de forma + cards de produto ---------- */
const PPG={};
/* frase-resumo por estado: Hoje · Produtos (o terceiro, Com IA, é calculado dos dados) */
const PP_CAP={
 1:["10 serviços com sobreposição: três ofertas de liderança disputam o mesmo comprador e duas tratam de impostos e incentivos.",
    "Os serviços se agrupam por produto: liderança vira 1 (Interim & Embedded), Tax + incentivos vira 1 com A&M Tax e a resiliência migra para o Pilar 4."],
 2:["7 serviços: TMO e Modelo de Implantação e Governança têm o mesmo comprador e o mesmo método, e o IT Business Partner tem baixa diferenciação.",
    "TMO + Modelo de Implantação viram o Predictive Transformation Office; o IT Business Partner é retirado e absorvido pela liderança embarcada (1.3)."],
 3:["8 serviços que são fases de um mesmo ciclo, em pares que se sobrepõem: DD buy e sell, integração e separação, IMO e SMO.",
    "Os pares viram produtos: DD buy + sell = 1 produto, IMO + SMO = 1 escritório; o IT M&A Playbook deixa de ser vendido isolado."],
 4:["4 serviços com nomes que não dizem o que entregam, e a resiliência ainda no Pilar 1.",
    "Cada serviço ganha o nome do que entrega e vira produto; a resiliência chega do Pilar 1 como IT Resilience & Recovery."]};
function ppCapAI(n){const ps=PRODUCTS.filter(p=>p.pillar===n),pl=PILLARS[n-1],a=ps.filter(p=>p.st==="ai").length,k=ps.filter(p=>p.st==="keep").length,nw=ps.filter(p=>p.st==="new");
  return`${a} produtos ganham IA no método, ${k} ${k>1?"se mantêm":"se mantém"} e ${nw.length>1?"nascem":"nasce"} ${nw.map(p=>"o "+p.name).join(" e ")}: de ${pl.was} serviços para ${pl.now} produtos.`}

document.querySelectorAll(".pp").forEach(host=>{
  const n=+host.dataset.pillar,pl=PILLARS[n-1],sec=host.closest(".slide"),t=sec.dataset.t;
  const ps=PRODUCTS.filter(p=>p.pillar===n);
  const own=OLD.filter(o=>o.p===n),inn=OLD.filter(o=>o.p!==n&&PBY(o.to)&&PBY(o.to).pillar===n),svcs=own.concat(inn);
  const outs=own.filter(o=>PBY(o.to).pillar!==n);
  const grp={};own.forEach(o=>(grp[o.to]=grp[o.to]||[]).push(o));const overl=Object.values(grp).filter(g=>g.length>1);
  const DN={keep:"Manter",ai:"Remodelar",merge:"Fundir",cut:"Retirar"};
  const CAP=[...PP_CAP[n],ppCapAI(n)];
  const lead=sec.querySelector(".pp-lead");if(lead)lead.textContent=pl.def;

  /* ---- cards de produto ---- */
  const card=(p,i)=>`<a class="pp-c ${p.st}" href="#p=${p.id}" data-pd="${p.id}" data-code="${p.code}" data-a="left" style="--d:${3+i}">
      <span class="pp-ico">${picoSvg(p.code,4+i)}</span>
      <span class="pp-tx">
        <span class="pp-h"><b class="pp-code">${p.code}</b><b class="pp-nm">${p.name}</b><span class="pp-tags">${p.sig?'<span class="sig2">★ Signature</span>':""}${stTag(p.st)}</span></span>
        <span class="pp-from">${p.st==="new"?p.from:"Evolui de "+p.from}</span>
        <span class="pp-tl">${p.tagline}</span>
        <span class="pp-ai"><b>IA:</b> ${strip(p.ai[0])}</span>
      </span></a>`;
  const leg=[["s","Serviço"],overl.length?["o","Sobreposição"]:null,["p","Produto"],["n","Com IA"],svcs.some(o=>o.d==="cut")?["c","Retirado"]:null,(outs.length||inn.length)?["t","Muda de pilar"]:null].filter(Boolean);
  const notes=pillarNotes(n);
  host.innerHTML=`<div class="pp-wrap">
      <div class="pp-panel" data-a="zoom" style="--d:2">
        <div class="pp-bar"><div class="seg pp-seg"><button class="on" data-s="0">Hoje</button><button data-s="1">Produtos</button><button data-s="2">Com IA</button></div><div class="pp-leg">${leg.map(([k,l])=>`<span><i class="lg-${k}"></i>${l}</span>`).join("")}</div></div>
        <svg class="pp-svg" aria-label="Serviços do Pilar ${n} mudando de forma: hoje, agrupados em produtos e com IA"></svg>
        <div class="pp-capw"><p class="pp-cap"></p><div class="pp-stat"><b>${pl.was} → ${pl.now}</b><span>serviços → produtos</span></div></div>
      </div>
      <div class="pp-prods n${ps.length}">${ps.map(card).join("")}</div>
    </div>
    <div class="pp-out" data-a="up" style="--d:${4+ps.length}"><span class="label">O que muda</span><div>${notes.map(x=>{const p=ps.find(q=>q.st==="new"&&x.includes(q.name));return p?`<a href="#p=${p.id}" data-pd="${p.id}">${x}</a>`:`<span>${x}</span>`}).join("")}</div></div>`;
  fixPaths(host);

  /* ---- grafo ---- */
  const VW=746,VH=490,GAP=24,PAD=16;
  const svg=host.querySelector(".pp-svg");
  const seg=host.querySelector(".pp-seg"),cap=host.querySelector(".pp-cap");
  const gE=S("g",null,svg),gN=S("g",null,svg);
  const FONT={sv:"600 11.5px Inter, sans-serif",hub:"800 15px Inter, sans-serif",h0:"800 13px Inter, sans-serif",xn:"700 11.5px Inter, sans-serif"};
  const NH={sv:26,hub:34,h0:34,xn:28};
  const NODES={};
  function node(id,kind,lab,o,tv,th,pd){const a={class:"pn "+kind};const g=S("g",a,gN);if(kind==="hub")S("circle",{class:"halo",r:26},g);const r=S("rect",{rx:kind==="sv"||kind==="xn"?8:10},g);const tx=S("text",{"text-anchor":"middle","dominant-baseline":"central"},g);tx.textContent=lab;
    g.setAttribute("data-tv",tv);g.setAttribute("data-th",th);if(pd)g.setAttribute("data-pd",pd);NODES[id]={g,r,tx,lab,kind,o,w:60,h:NH[kind],code:o?o.to:(id.split(":")[1]||"")};return NODES[id]}
  const tl=(k,v)=>`<span class="tl"><b>${k}</b>${v}</span>`;
  node("h0","h0",`Pilar ${n} · hoje`,null,`Pilar ${n} · ${pl.name} hoje`,tl("Serviços",`${own.length} no portfólio atual`)+tl("Proposta",`${pl.now} produtos`),null);
  ps.forEach(p=>node("p:"+p.code,"hub",p.code,null,`${p.code} · ${p.name}`,tl("Status",STATUS[p.st][0]+(p.sig?" · ★ Signature":""))+tl("Produto",p.tagline)+tl("Ficha","clique para abrir"),p.id));
  svcs.forEach(o=>{const d=PBY(o.to),fo=o.p!==n,mv=d.pillar!==o.p;
    const dec=fo?(o.d==="cut"?`Retirar no Pilar ${o.p} e absorver aqui`:`Transferir do Pilar ${o.p} para cá`):(d.pillar!==n?(o.d==="cut"?`Retirar · absorvido no Pilar ${d.pillar}`:`Transferir para o Pilar ${d.pillar}`):DN[o.d]);
    node("s:"+o.id,"sv",o.n+(fo?` · Pilar ${o.p}`:""),o,o.n+(fo?` (Pilar ${o.p})`:""),tl("Decisão",dec)+tl("Destino",`${d.code} ${d.name}${mv?` · Pilar ${d.pillar}`:""}`)+tl("Por quê",o.w),d.id)});
  outs.forEach(o=>{const d=PBY(o.to);if(!NODES["x:"+d.code])node("x:"+d.code,"xn",`${d.code} · Pilar ${d.pillar}`,null,`${d.code} · ${d.name}`,tl("Pilar",`${d.pillar} · ${PILLARS[d.pillar-1].name}`)+tl("Ficha","clique para abrir"),d.id)});
  const ctx=document.createElement("canvas").getContext("2d");
  function measure(){Object.values(NODES).forEach(nd=>{ctx.font=FONT[nd.kind];const w=ctx.measureText(nd.lab).width;nd.w=Math.ceil(nd.kind==="sv"?w+22:nd.kind==="hub"?Math.max(56,w+26):nd.kind==="h0"?w+30:w+24);
    nd.r.setAttribute("x",-nd.w/2);nd.r.setAttribute("y",-nd.h/2);nd.r.setAttribute("width",nd.w);nd.r.setAttribute("height",nd.h)})}
  const rnd=k=>{const a=Math.sin(k*12.9898+78.233)*43758.5453;return a-Math.floor(a)};
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  const bySt=(a,b)=>((a.d==="cut")-(b.d==="cut"))||((a.p!==n)-(b.p!==n));
  let P=[{},{},{}],E=[[],[],[]],VWz=VW,VHz=VH,X0=VW/2;
  const STK=31,HH=17,ZMAX=1.15;
  const split=(L,i)=>{if(L.length<=1)return i%2?[[],L]:[L,[]];const h=Math.ceil(L.length/2);return[L.slice(0,h),L.slice(h)]};
  function lay(){measure();const Q=[{},{},{}],F=[[],[],[]];const set=(st,id,x,y,o,s,c)=>{Q[st][id]={x,y,o,s,c}};
    const rows=ps.map(p=>({p,L:svcs.filter(o=>o.to===p.code).sort(bySt)}));if(outs.length)rows.push({out:outs});
    /* zoom: pilares com rótulos mais curtos usam a área toda (até 1,15×) */
    const sideW=L=>L.length?Math.max(...L.map(o=>NODES["s:"+o.id].w)):0;let need=0;
    rows.forEach((r,i)=>{if(r.out){r.out.forEach(o=>{need=Math.max(need,NODES["s:"+o.id].w+28+GAP+12,28+GAP+NODES["x:"+o.to].w+52)});return}
      const hw=NODES["p:"+r.p.code].w/2,[Lf,Rt]=split(r.L,i),z=i%2?-12:12;need=Math.max(need,hw+GAP+sideW(Lf)-z,hw+GAP+sideW(Rt)+z)});
    VWz=Math.max(VW/ZMAX,2*need+16);VHz=VH*VWz/VW;X0=VWz/2;svg.setAttribute("viewBox",`0 0 ${VWz.toFixed(1)} ${VHz.toFixed(1)}`);
    /* estados 1 e 2: espinha de produtos, cada serviço ao lado do produto de destino (linhas distribuídas na altura) */
    const per=r=>r.out?r.out.length:Math.max(1,Math.ceil(r.L.length/2)),half=r=>(per(r)-1)*STK/2+HH;
    const sumH=rows.reduce((a,r)=>a+2*half(r),0),gapR=(VHz-2*PAD-sumH)/Math.max(1,rows.length-1);let y=PAD;
    rows.forEach((r,i)=>{const cy=y+half(r);y+=2*half(r)+gapR;const hx=X0+(i%2?-12:12);
      const cls=o=>"sv"+(o.d==="cut"?" cut":"")+(PBY(o.to).pillar!==n?" out":"");
      const put=(o,side,j,m,hw)=>{const id="s:"+o.id,w=NODES[id].w,x=side<0?hx-hw-GAP-w/2:hx+hw+GAP+w/2,yy=cy+(j-(m-1)/2)*STK;[1,2].forEach(st=>set(st,id,x,yy,o.d==="cut"?.7:1,1,cls(o)))};
      if(r.out){r.out.forEach((o,j)=>{put(o,-1,j,r.out.length,28);const xid="x:"+o.to,xw=NODES[xid].w;[1,2].forEach(st=>set(st,xid,hx+28+GAP+xw/2+40,cy+(j-(r.out.length-1)/2)*STK,1,1,"xn"))});return}
      const p=r.p,hid="p:"+p.code,hw=NODES[hid].w/2;
      set(1,hid,hx,cy,p.st==="new"?.6:1,p.st==="new"?.9:1,p.st==="new"?"hub ghost":"hub");
      set(2,hid,hx,cy,1,1,"hub "+(p.st==="keep"?"k":"n")+(p.st==="new"?" nw":""));
      const[Lf,Rt]=split(r.L,i);Lf.forEach((o,j)=>put(o,-1,j,Lf.length,hw));Rt.forEach((o,j)=>put(o,1,j,Rt.length,hw))});
    /* estado 0: serviços de hoje espalhados e emaranhados em torno do pilar */
    const m=own.length,sd=[3,4,5,2,7].find(s=>s<m&&gcd(s,m)===1)||1;const slots=[...Array(m)].map((_,k)=>own[(k*sd)%m]);slots.splice(Math.floor(m/2),0,"H0");inn.forEach(o=>slots.push(o));
    const sh=(VHz-2*PAD)/slots.length;
    slots.forEach((o,k)=>{const cy=PAD+sh*(k+.5);if(o==="H0"){set(0,"h0",X0+(n%2?-24:24),cy,1,1,"h0");return}
      const id="s:"+o.id,w=NODES[id].w,amp=(VWz-w)/2-10,fo=o.p!==n,sg=k%2?1:-1;
      set(0,id,fo?VWz-12-w/2:X0+sg*amp*(.25+.75*rnd(k+n*11)),cy,fo?.8:1,1,"sv m"+(fo?" fx":""))});
    const h0=Q[0].h0;[1,2].forEach(st=>set(st,"h0",h0.x,h0.y,0,.6,"h0"));
    ps.forEach(p=>set(0,"p:"+p.code,h0.x,h0.y,0,.4,"hub"));
    Object.keys(NODES).filter(k=>k.startsWith("x:")).forEach(k=>set(0,k,Q[1][k].x,Q[1][k].y,0,.6,"xn"));
    /* ligações */
    own.forEach(o=>F[0].push(["h0","s:"+o.id,"m"]));
    overl.forEach(g=>{for(let a=0;a<g.length;a++)for(let b=a+1;b<g.length;b++)F[0].push(["s:"+g[a].id,"s:"+g[b].id,"o"])});
    [1,2].forEach(st=>{svcs.forEach(o=>{const d=PBY(o.to),id="s:"+o.id;if(d.pillar!==n){F[st].push([id,"x:"+d.code,"t"]);return}
        F[st].push([id,"p:"+d.code,o.d==="cut"?"c":(st===2&&d.st!=="keep"?"n":"s")])});
      for(let i=1;i<ps.length;i++)F[st].push(["p:"+ps[i-1].code,"p:"+ps[i].code,"b"])});
    P=Q;E=F}
  lay();
  const EL={},ED={};let ekeys=[];
  function edges(){const ks=new Set();E.forEach(l=>l.forEach(e=>ks.add(e.join("|"))));ks.forEach(k=>{if(EL[k])return;const[a,b,ty]=k.split("|");EL[k]=S("line",{class:"pe pe-"+ty},gE);ED[k]=0});ekeys=Object.keys(EL)}
  edges();
  const D={};Object.keys(NODES).forEach(k=>{const p=P[0][k];D[k]={x:p.x,y:p.y,o:0,s:p.s}});
  function render(){Object.keys(NODES).forEach(k=>{const d=D[k],g=NODES[k].g;g.setAttribute("transform",`translate(${d.x.toFixed(1)},${d.y.toFixed(1)}) scale(${d.s.toFixed(3)})`);g.style.opacity=d.o.toFixed(3);g.style.pointerEvents=d.o<.2?"none":""});
    ekeys.forEach(k=>{const[a,b]=k.split("|"),l=EL[k];l.setAttribute("x1",D[a].x.toFixed(1));l.setAttribute("y1",D[a].y.toFixed(1));l.setAttribute("x2",D[b].x.toFixed(1));l.setAttribute("y2",D[b].y.toFixed(1));l.style.opacity=(ED[k]*Math.min(D[a].o,D[b].o)).toFixed(3)})}
  let cur=-1,raf=0,tm=0;
  function to(st,inst){cancelAnimationFrame(raf);raf=0;const F0={},FE={};Object.keys(D).forEach(k=>F0[k]={...D[k]});ekeys.forEach(k=>FE[k]=ED[k]);
    const TE=new Set(E[st].map(e=>e.join("|")));seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",+b.dataset.s===st));segSync(seg);host.dataset.st=st;
    if(cap.textContent!==CAP[st]){cap.classList.remove("in");void cap.offsetWidth;cap.textContent=CAP[st];cap.classList.add("in")}
    const dur=inst||REDMO?1:1300,t0=performance.now();let sw=false;cur=st;
    (function step(now){const k=Math.min(1,(now-t0)/dur),e=ease.inOut(k);
      Object.keys(D).forEach(id=>{const p=P[st][id];D[id].x=F0[id].x+(p.x-F0[id].x)*e;D[id].y=F0[id].y+(p.y-F0[id].y)*e;D[id].o=F0[id].o+(p.o-F0[id].o)*e;D[id].s=F0[id].s+(p.s-F0[id].s)*e});
      ekeys.forEach(id=>{ED[id]=FE[id]+((TE.has(id)?1:0)-FE[id])*e});
      if(!sw&&k>=.5){sw=true;Object.keys(NODES).forEach(id=>NODES[id].g.setAttribute("class","pn "+P[st][id].c))}
      render();if(k<1)raf=requestAnimationFrame(step);else raf=0})(inst?t0+dur:t0)}
  /* foco: card ↔ produto no grafo */
  const cards=[...host.querySelectorAll(".pp-c")];
  function focus(code){host.classList.toggle("foc",!!code);svg.classList.toggle("focus",!!code);
    Object.entries(NODES).forEach(([id,nd])=>{const hot=!!code&&(id==="p:"+code||id==="x:"+code||(nd.o&&nd.o.to===code));if(hot)nd.g.setAttribute("data-hot","");else nd.g.removeAttribute("data-hot")});
    ekeys.forEach(k=>{const[a,b]=k.split("|");if(code&&NODES[a].g.hasAttribute("data-hot")&&NODES[b].g.hasAttribute("data-hot"))EL[k].setAttribute("data-hot","");else EL[k].removeAttribute("data-hot")});
    cards.forEach(c=>c.classList.toggle("hot",c.dataset.code===code))}
  cards.forEach(c=>{c.addEventListener("mouseenter",()=>focus(c.dataset.code));c.addEventListener("mouseleave",()=>focus(null))});
  Object.entries(NODES).forEach(([id,nd])=>{if(id==="h0")return;const code=id.startsWith("s:")?nd.o.to:id.split(":")[1];nd.g.addEventListener("mouseenter",()=>focus(code));nd.g.addEventListener("mouseleave",()=>focus(null))});
  seg.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{clearTimeout(tm);to(+b.dataset.s)}));
  to(0,true);
  /* a largura real dos rótulos depende da fonte carregada: refaz o layout quando ela chega */
  const relay=()=>{lay();edges();if(!raf&&cur>=0)to(cur,true)};
  if(document.fonts&&document.fonts.load)Promise.all(Object.values(FONT).map(f=>document.fonts.load(f))).then(relay,()=>{});
  const G=PPG[n]={to,seg,focus,get cur(){return cur},stop(){clearTimeout(tm)},
    enter(){clearTimeout(tm);if(REDMO){to(1,true);return}to(0,true);tm=setTimeout(()=>to(1),1500)}};

  /* ---- duas vistas: entrada, passos e demo do divisor quando a vista 2 aparece ---- */
  const panes=[...sec.querySelectorAll(":scope > .body.pane")],v2=panes[1],B=BAPX[n];let lastDemo=-1e9;
  /* chip de efeito no rodapé: fx 29 na vista 1, fx 37 na vista 2 (troca por CSS, vale também na impressão) */
  const fxc=sec.querySelector(".foot .fxchip");if(fxc&&fxc.firstElementChild){fxc.firstElementChild.innerHTML='<span class="fx-a">fx 29 · Morphing Shapes</span><span class="fx-b">fx 37 · Before / After Slider</span>';fxc.title="Efeitos do Guia de Design DTS: vista 1 · Morphing Shapes (fx 29) · vista 2 · Before / After Slider (fx 37) · dose moderada"}
  const demo=()=>{if(!B)return;const now=performance.now();if(now-lastDemo<700)return;lastDemo=now;segSync(B.sg);B.ba.demo();setTimeout(()=>segSync(B.sg),2700)};
  const mo=new MutationObserver(ms=>ms.forEach(m=>{const el=m.target,was=(m.oldValue||"").split(/\s+/).includes("on");if(!el.classList.contains("on")||was||!sec.classList.contains("active"))return;
    if(el===v2){G.stop();demo()}else segSync(seg)}));
  panes.forEach(p=>mo.observe(p,{attributes:true,attributeFilter:["class"],attributeOldValue:true}));
  ENTER[t]=()=>{const Pn=PANE[t];if(!Pn||Pn.k===0){G.enter();return}G.stop();G.to(2,true);demo()};
  STEP[t]=d=>{const Pn=PANE[t];if(d>0&&(!Pn||Pn.k===0)&&G.cur<2){G.stop();G.to(G.cur+1);return true}return false};
});
PRINT.push(()=>Object.values(PPG).forEach(G=>{G.stop();G.to(2,true)}));
