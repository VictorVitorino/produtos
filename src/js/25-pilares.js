/* =====================================================================
   PILARES · motor compartilhado dos slides 10–17 (fundação)
   Lê o conteúdo de cada pilar em PCFG[n] (registrado pelos módulos 30-s10 … 30-s17) só no boot
   (BOOT.push), nunca na carga: os módulos dos slides carregam depois deste arquivo.
   · Cliente e mercado (10, 12, 14, 16): personas (.persona), tabela do mercado (table.mk), espaço livre (.ws),
     jornada comercial (.jr-wrap) e posicionamento (.pos), com data-pillar / data-mk / data-pos = n
   · Produtos (11, 13, 15, 17): vista 1 · grafo que muda de forma (.pp) + cartas · vista 2 · antes e depois (.bap)
   · Abertura de cada pilar (divisória com morphing e os números do pilar): CHAPX
   Formatos de PCFG: ver CONTRACT.md · Ganchos ENTER/STEP dos slides de produtos registrados na carga (busca preguiçosa).
   ===================================================================== */
const pcfgC=n=>(PCFG[n]&&PCFG[n].cliente)||{};
const pcfgP=n=>(PCFG[n]&&PCFG[n].produtos)||{};
/* "O que muda" (4 frases curtas, produtos citados pelo código) e motivo da sobreposição por produto de destino */
const pillarNotes=n=>pcfgP(n).notes||[];
const ovlOf=(n,code)=>(pcfgP(n).ovl||{})[code];

/* ---------- vista 2 · before / after por pilar ---------- */
const BAPX={};
function renderBAP(host){const n=+host.dataset.pillar,pl=PILLARS[n-1],ps=PRODUCTS.filter(p=>p.pillar===n);
  const rows=ps.map(p=>({p,olds:OLD.filter(o=>o.to===p.code)}));const out=OLD.filter(o=>o.p===n&&!ps.some(p=>p.code===o.to));const R=rows.length+out.length;
  const DN={keep:"Manter",ai:"Aprimorar com IA",merge:"Fundir",cut:"Retirar"};
  /* terceira coluna (só na impressão): o produto proposto da linha, para a página ler "hoje · diagnóstico · proposta" sem o divisor */
  const prop=p=>`<div class="c p"><span class="tb-code">${p.code}</span><b>${p.name}</b>${stTag(p.st)}</div>`;
  const asisRow=r=>{if(!r.olds.length)return`<div class="c a"><div class="asis-none">não existe hoje</div></div><div class="c b"><div class="why"><b>Lacuna:</b> ${strip(r.p.pain[0])}.</div></div>${prop(r.p)}`;
    const prim=r.olds.find(o=>o.d!=="merge"&&o.d!=="cut")||r.olds[0],own=r.olds.filter(o=>o.p===n&&o.d!=="cut");
    return`<div class="c a">${r.olds.map(o=>`<span class="asis-chip ${o.d}">${o.n}${o.p!==n?` <i>(Pilar ${o.p})</i>`:""}</span>`).join("")}</div><div class="c b"><div class="why">${own.length>1&&ovlOf(n,r.p.code)?`<b>Sobreposição:</b> ${ovlOf(n,r.p.code)}. `:""}${prim.w}</div><span class="dec">${[...new Set(r.olds.map(o=>DN[o.d]))].join(" + ")}${r.olds.some(o=>o.p!==n&&o.d!=="cut")?` · vem do Pilar ${r.olds.find(o=>o.p!==n).p}`:""}</span></div>${prop(r.p)}`};
  const tobeRow=r=>{const p=r.p;return`<div class="c a"><div class="tb-code">${p.code}</div>${stTag(p.st)}${p.sig?'<span class="sig2">★ Signature</span>':""}</div><a class="c b tb" href="#p=${p.id}" data-pd="${p.id}"><div class="tb-nm">${p.name}<span class="more">ficha ›</span></div><div class="tb-tl">${p.tagline}</div><div class="tb-ai"><b>IA</b> ${strip(p.ai[0])}</div></a>`};
  const outAsis=o=>{const d=PBY(o.to);return`<div class="c a"><span class="asis-chip ${o.d}">${o.n}</span></div><div class="c b"><div class="why">${o.w}</div><span class="dec">${o.d==="cut"?"Retirar":`${DN[o.d]} · muda para o Pilar ${d.pillar}`}</span></div><div class="c p"><span class="tb-code">${d.code}</span><b>${d.name}</b><i>${o.d==="cut"?"absorvido":"Pilar "+d.pillar}</i></div>`};
  const outTobe=o=>{const d=PBY(o.to);return`<div class="c a"><span class="st ${o.d==="cut"?"cut":"merge"}">${o.d==="cut"?"Retirar":"Muda de pilar"}</span></div><a class="c b tb" href="#p=${d.id}" data-pd="${d.id}"><div class="tb-nm" style="font-size:13px;color:var(--steel-200)">→ ${o.d==="cut"?"Absorvido por":"Agora no Pilar "+d.pillar+":"} ${d.code} ${d.name}</div><div class="tb-tl">${o.n} ${o.d==="cut"?"deixa de ser vendido isolado.":"muda de pilar."}</div></a>`};
  const head=(a,b,c)=>`<div class="c hd a">${a}</div><div class="c hd b">${b}</div>${c?`<div class="c hd p">${c}</div>`:""}`;
  const grid=`grid-template-rows:30px repeat(${R},1fr)`;
  host.innerHTML=`<div class="ba" data-a="fade" style="--d:3;height:100%">
     <div class="ba-layer ba-tobe"><div class="ba-grid" style="${grid}">${head("Status","Produto proposto · papel da IA")}${rows.map(tobeRow).join("")}${out.map(outTobe).join("")}</div></div>
     <div class="ba-layer ba-asis"><div class="ba-grid" style="${grid}">${head("Serviço atual","Diagnóstico · por que mudar","Produto proposto")}${rows.map(asisRow).join("")}${out.map(outAsis).join("")}</div></div>
   </div>
   <div class="ba-side" data-a="right" style="--d:5">
     <div class="seg ba-seg"><button data-v="100">Hoje</button><button data-v="38.5" class="on">Lado a lado</button><button data-v="0">Proposta</button></div>
     <div class="card nv count"><span class="label">Pilar ${n} · ${pl.name}</span><div class="big">${pl.was} → ${pl.now}</div><span class="small">serviços → produtos</span></div>
     <div class="card">${["keep","ai","new"].map(k=>{const c=ps.filter(p=>p.st===k).length;return`<div class="bar-r"><span>${STATUS[k][0]}</span><i><b class="${k}" style="width:${c/ps.length*100}%"></b></i><em>${c}</em></div>`}).join("")}</div>
     <div class="card soft chg"><span class="label">O que muda</span><ul>${pillarNotes(n).map(x=>`<li>${codeLink(x)}</li>`).join("")}</ul></div>
     ${ps.filter(p=>p.st==="new").map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="nw holo"><span class="label">✦ Novo com IA · ${p.code}</span><h4>${p.name}</h4><p>${p.kpis&&p.kpis[0]?`${p.kpis[0][0]} ${strip(p.kpis[0][1]).replace(/\s*\[E[^\]]*\]/g,"")}`:strip(p.tagline)}</p></a>`).join("")}
   </div>`;
  let lastOn="";const ba=BeforeAfter(host.querySelector(".ba"),{rest:38.5,onMove:x=>{let k="";host.querySelectorAll(".ba-seg button").forEach(b=>{const on=Math.abs(+b.dataset.v-x)<3;b.classList.toggle("on",on);if(on)k=b.dataset.v});if(k!==lastOn){lastOn=k;segSync(host.querySelector(".ba-seg"))}}});BAS[n]=ba;
  const sg=host.querySelector(".ba-seg");sg.querySelectorAll("button").forEach(b=>b.onclick=()=>{ba.tween(+b.dataset.v,800);sg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));segSync(sg)});
  BAPX[n]={ba,sg}}

/* impressão: o antes/depois dos pilares vira uma tabela "serviço · diagnóstico · produto proposto" (camada "Hoje" sem divisor,
   com a coluna de produto que só aparece no papel); o slide 8 sai na "Proposta" (o "Hoje" completo está no slide 3).
   A camada que não aparece sai do papel, para o texto do PDF não misturar as duas */
PRINT.push(()=>Object.entries(BAS).forEach(([k,b])=>b.set(k==="hb"?0:100)));

/* ---------- vista 1 · grafo que muda de forma + cards de produto ---------- */
const PPG={};
/* estado Com IA: narra o que acende no grafo; os produtos "Manter" também têm IA de apoio no método (p.ai) */
function ppCapAI(n){const ps=PRODUCTS.filter(p=>p.pillar===n),a=ps.filter(p=>p.st==="ai").length,k=ps.filter(p=>p.st==="keep"),nw=ps.filter(p=>p.st==="new");
  const ks=k.map(p=>"o "+p.code).join(" e ");
  return`${nw.map(p=>`O novo <span class="nw">${p.name} (${p.code})</span>`).join(" e ")} e ${a>1?`os ${a} produtos aprimorados`:"o produto aprimorado"} com IA acendem em laranja${k.length?`; ${ks} ${k.length>1?"se mantêm":"se mantém"}, com IA de apoio no método`:""}.`}

function renderPP(host){
  const n=+host.dataset.pillar,pl=PILLARS[n-1],sec=host.closest(".slide"),t=keyOf(sec);
  const ps=PRODUCTS.filter(p=>p.pillar===n);
  const own=OLD.filter(o=>o.p===n),inn=OLD.filter(o=>o.p!==n&&PBY(o.to)&&PBY(o.to).pillar===n),svcs=own.concat(inn);
  const outs=own.filter(o=>PBY(o.to).pillar!==n);
  const grp={};own.forEach(o=>(grp[o.to]=grp[o.to]||[]).push(o));const overl=Object.values(grp).filter(g=>g.length>1);
  const DN={keep:"Manter",ai:"Aprimorar com IA",merge:"Fundir",cut:"Retirar"};
  const CAP=[...[0,1].map(j=>((pcfgP(n).cap||[])[j]||"")),ppCapAI(n)];
  const lead=sec.querySelector(".pp-lead");if(lead)lead.textContent=pl.def;

  /* ---- cards de produto ---- */
  const card=(p,i)=>`<a class="pp-c ${p.st}" href="#p=${p.id}" data-pd="${p.id}" data-code="${p.code}" data-a="left" style="--d:${3+i}">
      <span class="pp-ico">${picoSvg(p.code,4+i)}</span>
      <span class="pp-tx">
        <span class="pp-h"><b class="pp-code">${p.code}</b><b class="pp-nm">${p.name}</b><span class="pp-tags">${p.sig?'<span class="sig2">★ Signature</span>':""}${stTag(p.st)}</span></span>
        <span class="pp-from">${p.st==="new"?p.from:"Evolui de "+p.from.split(" + ").map(x=>`<span class="nwr">${x}</span>`).join(" + ")}</span>
        <span class="pp-tl">${p.tagline}</span>
        ${ps.length<=5?`<span class="pp-get" aria-label="Entregas"></span>`:""}
        <span class="pp-ai"><b>IA:</b> ${strip(p.ai[0])}</span>
      </span></a>`;
  /* legenda em grade de 2 linhas: coluna 1 = serviços, 2 = produtos, 3 = mudanças (cada item em uma linha) */
  const leg=[[["s","Serviço"],overl.length?["o","Sobreposição"]:null],[["p","Produto"],["n","Aprimorar / criar com IA"]],[svcs.some(o=>o.d==="cut")?["c","Retirado"]:null,(outs.length||inn.length)?["t","Muda de pilar"]:null]].map(c=>c.filter(Boolean)).filter(c=>c.length);
  const notes=pillarNotes(n);
  host.innerHTML=`<div class="pp-wrap">
      <div class="pp-panel" data-a="zoom" style="--d:2">
        <div class="pp-bar"><div class="seg pp-seg"><button class="on" data-s="0">Hoje</button><button data-s="1">Produtos</button><button data-s="2">Com IA</button></div><div class="pp-leg">${leg.map((c,ci)=>c.map(([k,l],ri)=>`<span style="grid-area:${ri+1}/${ci+1}"><i class="lg-${k}"></i>${l}</span>`).join("")).join("")}</div></div>
        <svg class="pp-svg" aria-label="Serviços do Pilar ${n} mudando de forma: hoje, agrupados em produtos e com IA"></svg>
        <div class="pp-capw"><p class="pp-cap"></p><div class="pp-stat"><b>${pl.was} → ${pl.now}</b><span>serviços → produtos</span></div></div>
      </div>
      <div class="pp-prods n${ps.length}">${ps.map(card).join("")}</div>
    </div>
    <div class="pp-out" data-a="up" style="--d:${4+ps.length}"><span class="label">O que muda</span><div>${notes.map(x=>{const p=ps.find(q=>q.st==="new"&&x.includes(q.name));return p?`<a href="#p=${p.id}" data-pd="${p.id}">${x}</a>`:`<span>${codeLink(x)}</span>`}).join("")}</div></div>`;
  fixPaths(host);

  /* ---- grafo ---- */
  const VW=746,VH=490,GAP=24,PAD=16;
  const svg=host.querySelector(".pp-svg");
  const seg=host.querySelector(".pp-seg"),cap=host.querySelector(".pp-cap");
  const gE=S("g",null,svg),gN=S("g",null,svg);
  const FONT={sv:"600 11.5px Inter, sans-serif",hub:"800 15px Inter, sans-serif",h0:"800 13px Inter, sans-serif",xn:"700 11.5px Inter, sans-serif"};
  const NH={sv:26,hub:34,h0:34,xn:28};
  const NODES={};
  function node(id,kind,lab,o,tv,th,pd){const a={class:"pn "+kind};const g=S("g",a,gN);const r=S("rect",{rx:kind==="sv"||kind==="xn"?8:10},g);const tx=S("text",{"text-anchor":"middle","dominant-baseline":"central"},g);tx.textContent=lab;
    /* halo do produto novo: anel externo (fica fora da caixa, por isso pode vir depois do rótulo) */
    const hl=kind==="hub"?S("rect",{class:"halo",rx:14},g):null;
    g.setAttribute("data-tv",tv);g.setAttribute("data-th",th);if(pd)g.setAttribute("data-pd",pd);NODES[id]={g,r,hl,tx,lab,kind,o,w:60,h:NH[kind],code:o?o.to:(id.split(":")[1]||"")};return NODES[id]}
  const tl=(k,v)=>`<span class="tl"><b>${k}</b>${v}</span>`;
  node("h0","h0",`Pilar ${n} · hoje`,null,`Pilar ${n} · ${pl.name} · hoje`,tl("Serviços",`${own.length} no portfólio atual`)+tl("Proposta",`${pl.now} produtos`),null);
  ps.forEach(p=>node("p:"+p.code,"hub",p.code,null,`${p.code} · ${p.name}`,tl("Status",STATUS[p.st][0]+(p.sig?" · ★ Signature":""))+tl("Produto",p.tagline)+tl("IA",strip(p.ai[0]))+tl("Ficha","clique para abrir"),p.id));
  svcs.forEach(o=>{const d=PBY(o.to),fo=o.p!==n,mv=d.pillar!==o.p;
    const dec=fo?(o.d==="cut"?`Retirar no Pilar ${o.p} e absorver aqui`:`${DN[o.d]} · vem do Pilar ${o.p}`):(d.pillar!==n?(o.d==="cut"?`Retirar · absorvido no Pilar ${d.pillar}`:`${DN[o.d]} · muda para o Pilar ${d.pillar}`):DN[o.d]);
    node("s:"+o.id,"sv",o.n+(fo?` · Pilar ${o.p}`:""),o,o.n+(fo?` (Pilar ${o.p})`:""),tl("Decisão",dec)+tl("Destino",`${d.code} ${d.name}${mv?` · Pilar ${d.pillar}`:""}`)+tl("Por quê",o.w),d.id)});
  outs.forEach(o=>{const d=PBY(o.to);if(!NODES["x:"+d.code])node("x:"+d.code,"xn",`${d.code} · Pilar ${d.pillar}`,null,`${d.code} · ${d.name}`,tl("Pilar",`${d.pillar} · ${PILLARS[d.pillar-1].name}`)+tl("Ficha","clique para abrir"),d.id)});
  const ctx=document.createElement("canvas").getContext("2d");
  function measure(){Object.values(NODES).forEach(nd=>{ctx.font=FONT[nd.kind];const w=ctx.measureText(nd.lab).width;nd.w=Math.ceil(nd.kind==="sv"?w+22:nd.kind==="hub"?Math.max(56,w+26):nd.kind==="h0"?w+30:w+24);
    nd.r.setAttribute("x",-nd.w/2);nd.r.setAttribute("y",-nd.h/2);nd.r.setAttribute("width",nd.w);nd.r.setAttribute("height",nd.h);
    /* halo do produto novo: contorno arredondado com 6px de folga em volta do nó (nunca atravessa a caixa) */
    if(nd.hl){nd.hl.setAttribute("x",-nd.w/2-6);nd.hl.setAttribute("y",-nd.h/2-6);nd.hl.setAttribute("width",nd.w+12);nd.hl.setAttribute("height",nd.h+12)}})}
  /* entregas dos cards (pilar com 5 produtos): as 2 primeiras de p.deliv que cabem em uma linha da coluna */
  const GETF="600 11.5px Inter, sans-serif";
  function fillGet(){host.querySelectorAll(".pp-get").forEach((el,i)=>{const p=PBY(el.closest(".pp-c").dataset.code);ctx.font=GETF;
    const max=((el.clientWidth||624)-6)/2-42,pick=p.deliv.map(x=>strip(x)).filter(x=>ctx.measureText(x).width<=max).slice(0,2),key=pick.join("|");
    if(el.dataset.k===key)return;el.dataset.k=key;el.innerHTML=pick.map(x=>`<span>${icoSvg("check",5+i)}${x}</span>`).join("");fixPaths(el)})}
  fillGet();
  const rnd=k=>{const a=Math.sin(k*12.9898+78.233)*43758.5453;return a-Math.floor(a)};
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  const bySt=(a,b)=>((a.d==="cut")-(b.d==="cut"))||((a.p!==n)-(b.p!==n));
  let P=[{},{},{}],E=[[],[],[]],VWz=VW,VHz=VH,X0=VW/2;
  const STK=31,HH=17,ZMAX=1.15;
  const split=(L,f)=>{if(L.length<=1)return f?[[],L]:[L,[]];const h=Math.ceil(L.length/2);return[L.slice(0,h),L.slice(h)]};
  /* segmento × retângulo (Liang–Barsky): a ligação passa por baixo deste nó? */
  const segHit=(x1,y1,x2,y2,r)=>{if((x1<x2?x2:x1)<r[0]||(x1<x2?x1:x2)>r[2]||(y1<y2?y2:y1)<r[1]||(y1<y2?y1:y2)>r[3])return false;
    let t0=0,t1=1;const dx=x2-x1,dy=y2-y1;
    for(let k=0;k<4;k++){const pk=k===0?-dx:k===1?dx:k===2?-dy:dy,qk=k===0?x1-r[0]:k===1?r[2]-x1:k===2?y1-r[1]:r[3]-y1;
      if(pk===0){if(qk<0)return false;continue}const u=qk/pk;if(pk<0){if(u>t1)return false;if(u>t0)t0=u}else{if(u<t0)return false;if(u<t1)t1=u}}return t0<t1};
  let ph=0;
  /* full: busca completa do estado Hoje (roda uma vez, ociosa, com as fontes carregadas); sem full, só a disposição inicial */
  function lay(full){measure();const Q=[{},{},{}],F=[[],[],[]];const set=(st,id,x,y,o,s,c)=>{Q[st][id]={x,y,o,s,c}};
    const rows=ps.map(p=>({p,L:svcs.filter(o=>o.to===p.code).sort(bySt)}));if(outs.length)rows.push({out:outs});
    const sideW=L=>L.length?Math.max(...L.map(o=>NODES["s:"+o.id].w)):0;
    /* largura ocupada à esquerda e à direita da espinha; f = lado do serviço único da linha (alterna) e deslocamento do nó do produto */
    const needs=ph0=>{let nL=0,nR=0;rows.forEach((r,i)=>{const f=(i+ph0)%2,z=f?-12:12;
        if(r.out){r.out.forEach(o=>{nL=Math.max(nL,NODES["s:"+o.id].w+28+GAP-z);nR=Math.max(nR,28+GAP+NODES["x:"+o.to].w+40+z)});return}
        const hw=NODES["p:"+r.p.code].w/2,[Lf,Rt]=split(r.L,f);nL=Math.max(nL,hw-z+(Lf.length?GAP+sideW(Lf):0));nR=Math.max(nR,hw+z+(Rt.length?GAP+sideW(Rt):0))});return[nL,nR]};
    /* zoom: pilares com rótulos mais curtos usam a área toda (até 1,15×). A espinha não fica presa ao centro:
       a nuvem é centralizada pela soma dos dois lados; se ainda faltar espaço, testa a alternância invertida */
    let[nL,nR]=needs(0);ph=0;const alt=needs(1);if(nL+nR+16>VW/ZMAX&&alt[0]+alt[1]<nL+nR){[nL,nR]=alt;ph=1}
    VWz=Math.max(VW/ZMAX,nL+nR+16);VHz=VH*VWz/VW;X0=VWz/2;const X1=(VWz-nL-nR)/2+nL;svg.setAttribute("viewBox",`0 0 ${VWz.toFixed(1)} ${VHz.toFixed(1)}`);
    /* estados 1 e 2: espinha de produtos, cada serviço ao lado do produto de destino (linhas distribuídas na altura) */
    const per=r=>r.out?r.out.length:Math.max(1,Math.ceil(r.L.length/2)),half=r=>(per(r)-1)*STK/2+HH;
    const sumH=rows.reduce((a,r)=>a+2*half(r),0),gapR=(VHz-2*PAD-sumH)/Math.max(1,rows.length-1);let y=PAD;
    rows.forEach((r,i)=>{const cy=y+half(r);y+=2*half(r)+gapR;const f=(i+ph)%2,hx=X1+(f?-12:12);
      /* "in": chega de outro pilar; "out": sai para outro pilar (ambos com borda laranja tracejada, como na legenda) */
      const cls=o=>"sv"+(o.d==="cut"?" cut":"")+(PBY(o.to).pillar!==n?" out":"")+(o.p!==n?" in":"");
      const put=(o,side,j,m,hw)=>{const id="s:"+o.id,w=NODES[id].w,x=side<0?hx-hw-GAP-w/2:hx+hw+GAP+w/2,yy=cy+(j-(m-1)/2)*STK;[1,2].forEach(st=>set(st,id,x,yy,o.d==="cut"?.7:1,1,cls(o)))};
      if(r.out){r.out.forEach((o,j)=>{put(o,-1,j,r.out.length,28);const xid="x:"+o.to,xw=NODES[xid].w;[1,2].forEach(st=>set(st,xid,hx+28+GAP+xw/2+40,cy+(j-(r.out.length-1)/2)*STK,1,1,"xn"))});return}
      const p=r.p,hid="p:"+p.code,hw=NODES[hid].w/2;
      set(1,hid,hx,cy,p.st==="new"?.6:1,p.st==="new"?.9:1,p.st==="new"?"hub ghost":"hub");
      set(2,hid,hx,cy,1,1,"hub "+(p.st==="keep"?"k":"n")+(p.st==="new"?" nw":""));
      const[Lf,Rt]=split(r.L,f);Lf.forEach((o,j)=>put(o,-1,j,Lf.length,hw));Rt.forEach((o,j)=>put(o,1,j,Rt.length,hw))});
    /* estado 0: serviços de hoje espalhados e emaranhados em torno do pilar */
    const m=own.length,sd=[3,4,5,2,7].find(s=>s<m&&gcd(s,m)===1)||1;const slots=[...Array(m)].map((_,k)=>own[(k*sd)%m]);slots.splice(Math.floor(m/2),0,"H0");inn.forEach(o=>slots.push(o));
    /* caixa da nuvem de hoje: com poucos serviços (P4) fica mais compacta e centrada, sem quadrantes vazios */
    const sm=svcs.length<=5,BW=VWz*(sm?.66:1),BX=(VWz-BW)/2,BH=(VHz-2*PAD)*(sm?.8:1),BY=(VHz-BH)/2,sh=BH/slots.length;
    slots.forEach((o,k)=>{const cy=BY+sh*(k+.5);if(o==="H0"){set(0,"h0",X0+(n%2?-24:24),cy,1,1,"h0");return}
      const id="s:"+o.id,w=NODES[id].w,amp=(BW-w)/2-10,fo=o.p!==n,sg=k%2?1:-1;
      set(0,id,fo?BX+BW-12-w/2:X0+sg*amp*(.25+.75*rnd(k+n*11)),cy,fo?.8:1,1,"sv m"+(fo?" fx":""))});
    /* nenhuma ligação passa por baixo de um nó sem relação com ela (sugeriria vínculo que não existe).
       Busca local determinística: desliza cada serviço na horizontal e troca nós de linha enquanto reduzir os cruzamentos;
       várias partidas (sementes) para escapar de mínimos locais. Cruzar um nó do mesmo grupo de sobreposição pesa menos. */
    const ids0=slots.filter(o=>o!=="H0").map(o=>"s:"+o.id).concat("h0");
    const L0=own.map(o=>["h0","s:"+o.id]);overl.forEach(g=>{for(let a=0;a<g.length;a++)for(let b=a+1;b<g.length;b++)L0.push(["s:"+g[a].id,"s:"+g[b].id])});
    const gOf={};overl.forEach(g=>g.forEach(o=>gOf["s:"+o.id]=o.to));
    const box=id=>{const q=Q[0][id],nd=NODES[id];return[q.x-nd.w/2-6,q.y-nd.h/2-4,q.x+nd.w/2+6,q.y+nd.h/2+4]};
    const cost=()=>{const BB=ids0.map(box);let c=0;for(const[a,b]of L0){const A=Q[0][a],B=Q[0][b];for(let j=0;j<ids0.length;j++){const id=ids0[j];if(id!==a&&id!==b&&segHit(A.x,A.y,B.x,B.y,BB[j]))c+=gOf[id]&&gOf[id]===gOf[b]?2:3}}return c};
    const lim=id=>{const w=NODES[id].w;return[BX+w/2+10,BX+BW-w/2-10]};
    const SW=own.map(o=>"s:"+o.id).concat("h0"),snap=()=>SW.map(id=>[Q[0][id].x,Q[0][id].y]);
    const midOK=y=>y>VHz*.3&&y<VHz*.7;
    let bestC=1e9,bestS=null;
    for(let seed=0;full&&seed<24&&bestC>0;seed++){
      if(seed){const ys=own.map(o=>Q[0]["s:"+o.id].y);for(let j=ys.length-1;j>0;j--){const r=Math.floor(rnd(j*5+seed*17+n)*(j+1)),t=ys[j];ys[j]=ys[r];ys[r]=t}
        own.forEach((o,j)=>{const q=Q[0]["s:"+o.id],[lo,hi]=lim("s:"+o.id);q.y=ys[j];q.x=lo+(hi-lo)*rnd(j*7+seed*13+n)})}
      let c0=cost();
      for(let pass=0;pass<10&&c0>0;pass++){const before=c0;
        own.forEach(o=>{const id="s:"+o.id,q=Q[0][id],[lo,hi]=lim(id);let best=q.x;
          for(let j=0;j<=16;j++){q.x=lo+(hi-lo)*j/16;const c=cost();if(c<c0){c0=c;best=q.x}}q.x=best});
        for(let a=0;a<SW.length&&c0>0;a++)for(let b=a+1;b<SW.length&&c0>0;b++){const ia=SW[a],ib=SW[b],A=Q[0][ia],B=Q[0][ib],ya=A.y,yb=B.y,xa=A.x,xb=B.x;
          if(ib==="h0"&&!midOK(ya))continue;
          A.y=yb;B.y=ya;if(ib!=="h0"){A.x=clamp(xb,...lim(ia));B.x=clamp(xa,...lim(ib))}const c=cost();
          if(c<c0)c0=c;else{A.y=ya;B.y=yb;A.x=xa;B.x=xb}}
        if(c0>=before)break}
      if(c0<bestC){bestC=c0;bestS=snap()}}
    if(bestS)SW.forEach((id,j)=>{Q[0][id].x=bestS[j][0];Q[0][id].y=bestS[j][1]});
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
    if(cap.dataset.s!==String(st)){cap.classList.remove("in");void cap.offsetWidth;cap.innerHTML=`<span>${CAP[st]}</span>`;cap.dataset.s=st;cap.classList.add("in")}
    const dur=inst||REDMO?1:1300,t0=performance.now();let sw=false;cur=st;
    (function step(now){const k=Math.min(1,(now-t0)/dur),e=ease.inOut(k);
      Object.keys(D).forEach(id=>{const p=P[st][id];D[id].x=F0[id].x+(p.x-F0[id].x)*e;D[id].y=F0[id].y+(p.y-F0[id].y)*e;D[id].o=F0[id].o+(p.o-F0[id].o)*e;D[id].s=F0[id].s+(p.s-F0[id].s)*e});
      ekeys.forEach(id=>{ED[id]=FE[id]+((TE.has(id)?1:0)-FE[id])*e});
      if(!sw&&k>=.5){sw=true;Object.keys(NODES).forEach(id=>NODES[id].g.setAttribute("class","pn "+P[st][id].c))}
      render();if(k<1)raf=requestAnimationFrame(step);else raf=0})(inst?t0+dur:t0)}
  /* foco: card ↔ produto no grafo */
  const cards=[...host.querySelectorAll(".pp-c")];
  function focus(code){host.classList.toggle("foc",!!code&&cards.some(c=>c.dataset.code===code));svg.classList.toggle("focus",!!code);
    Object.entries(NODES).forEach(([id,nd])=>{const hot=!!code&&(id==="p:"+code||id==="x:"+code||(nd.o&&nd.o.to===code));if(hot)nd.g.setAttribute("data-hot","");else nd.g.removeAttribute("data-hot")});
    ekeys.forEach(k=>{const[a,b]=k.split("|");if(code&&NODES[a].g.hasAttribute("data-hot")&&NODES[b].g.hasAttribute("data-hot"))EL[k].setAttribute("data-hot","");else EL[k].removeAttribute("data-hot")});
    cards.forEach(c=>c.classList.toggle("hot",c.dataset.code===code))}
  cards.forEach(c=>{c.addEventListener("mouseenter",()=>focus(c.dataset.code));c.addEventListener("mouseleave",()=>focus(null))});
  Object.entries(NODES).forEach(([id,nd])=>{if(id==="h0")return;const code=id.startsWith("s:")?nd.o.to:id.split(":")[1];nd.g.addEventListener("mouseenter",()=>focus(code));nd.g.addEventListener("mouseleave",()=>focus(null))});
  seg.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{clearTimeout(tm);to(+b.dataset.s)}));
  to(0,true);
  /* a largura real dos rótulos depende da fonte carregada: refaz o layout quando ela chega */
  /* a busca completa roda uma vez, fora do carregamento (ocioso), com as larguras finais; só se repete se alguma largura mudar */
  const wk=()=>Object.values(NODES).map(nd=>nd.w).join();let fullK="";
  const relay=()=>{fillGet();measure();const k=wk();if(k===fullK)return;fullK=k;lay(true);edges();if(!raf&&cur>=0)to(cur,true)};
  const idle=f=>window.requestIdleCallback?requestIdleCallback(f,{timeout:1500}):setTimeout(f,120);
  (document.fonts&&document.fonts.load?Promise.all(Object.values(FONT).concat(GETF).map(f=>document.fonts.load(f))):Promise.resolve()).then(()=>idle(relay),()=>idle(relay));
  const G=PPG[n]={to,seg,focus,fill:fillGet,get cur(){return cur},stop(){clearTimeout(tm)},
    enter(){clearTimeout(tm);fillGet();to(0,true)}};

  /* ---- duas vistas: entrada, passos e demo do divisor quando a vista 2 aparece ---- */
  const panes=[...sec.querySelectorAll(":scope > .body.pane")],v2=panes[1],B=BAPX[n];let lastDemo=-1e9;
  const demo=()=>{if(!B)return;const now=performance.now();if(now-lastDemo<700)return;lastDemo=now;segSync(B.sg);B.ba.demo();setTimeout(()=>segSync(B.sg),2700)};
  const mo=new MutationObserver(ms=>{ms.forEach(m=>{const el=m.target,was=(m.oldValue||"").split(/\s+/).includes("on");if(!el.classList.contains("on")||was||!sec.classList.contains("active"))return;
    if(el===v2){G.stop();demo()}else segSync(seg)})});
  panes.forEach(p=>mo.observe(p,{attributes:true,attributeFilter:["class"],attributeOldValue:true}));
  G.onEnter=()=>{const Pn=PANE[t];if(!Pn||Pn.k===0){G.enter();return}G.stop();G.to(2,true);demo()};
  /* → avança Hoje → Produtos → Com IA e depois troca de vista; ← na vista 1 volta Com IA → Produtos → Hoje e então sai */
  G.onStep=d=>{const Pn=PANE[t];if(Pn&&Pn.k!==0)return false;if(d>0&&G.cur<2){G.stop();G.to(G.cur+1);return true}if(d<0&&G.cur>0){G.stop();G.to(G.cur-1);return true}return false};
}
PRINT.push(()=>Object.values(PPG).forEach(G=>{G.stop();G.to(2,true)}));


/* ---------- ganchos dos slides de produtos (registrados na carga; o grafo nasce no boot) ---------- */
document.querySelectorAll(".pp[data-pillar]").forEach(host=>{const n=+host.dataset.pillar,k=keyOf(host.closest(".slide"));
  ENTER[k]=()=>{const G=PPG[n];if(G&&G.onEnter)G.onEnter()};
  STEP[k]=d=>{const G=PPG[n];return G&&G.onStep?G.onStep(d):false}});

/* ---------- cliente e mercado: personas, mercado, espaço livre, jornada e posicionamento ---------- */
const HEATL={A:["Alta","#C2614E"],M:["Média","#C96A05"],B:["Baixa","#5E8AB4"],X:["Ativo A&amp;M","#122143"]};
function renderCliente(){
  document.querySelectorAll(".persona[data-pillar]").forEach(h=>{const L=pcfgC(h.dataset.pillar).pers;if(!L)return;h.innerHTML="";
    L.forEach(([r,q,ps])=>{const d=H("div",{class:"pers"},h);d.innerHTML=`<div class="r">${r}</div><div class="q">“${q}”</div><div class="pq">${(ps||[]).map(c=>plink(c,"sm")).join(" ")}</div>`})});
  document.querySelectorAll("table.mk[data-mk]").forEach(t=>{const C=pcfgC(t.dataset.mk),rows=C.mk;if(!rows)return;const heat=C.heat||[];
    t.innerHTML=`<thead><tr><th style="width:140px">Firma</th><th>Como chamam a oferta</th><th>O que fazem com IA</th><th style="width:210px">Leitura para a DTS</th><th style="width:104px;text-align:center">Sobreposição</th></tr></thead><tbody>${rows.map((r,i)=>{const hl=HEATL[heat[i]];return`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}${r[4]==="E"?' <span class="ev">E</span>':""}</td><td style="text-align:center;vertical-align:middle">${hl?`<span class="heat" style="background:${hl[1]}">${hl[0]}</span>`:""}</td></tr>`}).join("")}</tbody>`});
  document.querySelectorAll(".ws[data-pillar]").forEach(h=>{const w=pcfgC(h.dataset.pillar).ws;if(!w)return;
    h.innerHTML=`<div class="card nv"><div class="eye">Onde a DTS ganha · espaço livre</div>${(w.it||[]).map(([t,x,c,e],i)=>`<div class="ws-i"><span class="n">${i+1}</span><div><b>${t}</b> ${e==="E"?'<span class="ev">E</span>':'<span class="hy">H</span>'}<p>${x}</p>${plink(c,"sm dk")}</div></div>`).join("")}</div>
      ${w.th?`<div class="thr"><div class="eye">Ameaça a monitorar ${w.th[1]==="E"?'<span class="ev">E</span>':'<span class="hy">H</span>'}</div><p>${w.th[0]}</p></div>`:""}`});
  document.querySelectorAll(".jr-wrap[data-pillar]").forEach(h=>{const J=pcfgC(h.dataset.pillar).jr;if(!J)return;
    h.innerHTML=`<span class="ttl">Jornada comercial do pilar · entrada → expansão → recorrência · proposta DTS</span><div class="jr">${J.map(([k,t,ps,x],i)=>`<div class="jr-i ${i===0?"l":i===J.length-1?"r":""}"><div class="k">${k}</div><b>${t}</b><div class="jr-c">${(ps||[]).map(c=>pcode(c,"sm")).join("")}</div><p>${x}</p></div>`).join("")}</div>`});
  document.querySelectorAll(".pos[data-pos]").forEach(h=>{const P=pcfgC(h.dataset.pos).pos;if(!P)return;h.innerHTML=`<div class="t">Posicionamento proposto</div><p>${P} <span class="hy">Hipótese</span></p>`})}

/* ---------- boot: tudo o que depende de PCFG ----------
   Dados de produto ausentes ou incompletos (src/data/1N-produtos-pN.js falta ou está sendo editado por outro time): a vista mostra um aviso
   discreto em vez de quebrar; os demais pilares e a navegação seguem normais. */
const ppData=n=>typeof PRODUCTS!=="undefined"&&PRODUCTS.some(p=>p.pillar===n)&&(typeof OLD==="undefined"||OLD.filter(o=>o.p===n).every(o=>PBY(o.to)));
function ppMissing(host,n){host.innerHTML=`<div class="pp-miss">Produtos do Pilar ${n} em atualização · dados em src/data/1${n}-produtos-p${n}.js</div>`;
  console.warn(`[pilares] Pilar ${n}: produtos ausentes ou incompletos no registro (src/data/1${n}-produtos-p${n}.js); a vista foi desenhada sem eles`)}
BOOT.push(()=>{document.querySelectorAll(".bap[data-pillar]").forEach(h=>{const n=+h.dataset.pillar;if(!ppData(n))return ppMissing(h,n);safe(renderBAP,h)});
  document.querySelectorAll(".pp[data-pillar]").forEach(h=>{const n=+h.dataset.pillar;if(!ppData(n))return ppMissing(h,n);safe(renderPP,h)});
  safe(renderCliente)});

/* ---------- abertura de pilar (divisória): morphing Hoje → Produtos → Com IA e os números do pilar ---------- */
Object.entries(typeof CAPITULOS!=="undefined"?CAPITULOS:{}).forEach(([k,m])=>{if(!m.pilar)return;const n=m.pilar;
  CHAPX[k]=host=>{const pl=PILLARS[n-1],ps=PRODUCTS.filter(p=>p.pillar===n),ai=ps.filter(p=>p.st!=="keep").length,nw=ps.filter(p=>p.st==="new"),sg=ps.filter(p=>p.sig);
    host.classList.add("pil");const tx=host.querySelector(".ch-txt");if(!tx)return;const h=tx.querySelector(".ch-h");if(h)h.style.fontSize=(pl.name.length>22?72:pl.name.length>14?88:100)+"px";
    tx.insertAdjacentHTML("beforeend",`${pl.to!==pl.name?`<div class="pc-to" data-a="fade" style="--d:5">Nome proposto: <b>${pl.to}</b></div>`:""}
      <div class="pc-kpis" data-a="up" style="--d:7"><div><b>${pl.was} → ${pl.now}</b><span>serviços → produtos</span></div><div><b class="o">${ai}/${pl.now}</b><span>com IA no método</span></div><div><b>${nw.length}</b><span>produto novo</span></div></div>
      <div class="pc-pills" data-a="fade" style="--d:9">${nw.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="new holo" title="Produto novo com IA">✦ Novo · ${p.name}</a>`).join("")}${sg.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" title="A&amp;M Signature">★ ${p.name}</a>`).join("")}</div>`);
    host.insertAdjacentHTML("beforeend",`<svg class="pc-morph" viewBox="0 0 640 640" aria-hidden="true"></svg><div class="pc-states"></div>`);
    const mp=MorphScene(host.querySelector(".pc-morph"),{btnHost:host.querySelector(".pc-states"),states:[
      {shape:"blob",big:String(pl.was),lab:"SERVIÇOS HOJE",sub:"fragmentados e sob medida",dots:pl.was,btn:"Hoje"},
      {shape:"hex",big:String(pl.now),lab:"PRODUTOS",sub:"escopo, método e formato",dots:pl.now,btn:"Produtos"},
      {shape:"circle",big:`${ai}/${pl.now}`,lab:"COM IA NO MÉTODO",sub:"IA no método, dados no centro",dots:pl.now,ai,btn:"Com IA"}]});
    mp.play();return()=>mp.pause()}});
