/* Arquivo carregado depois de engine.js, data.js, core.js e slides.js (ver build.py). */
/* ---------- before / after por pilar ---------- */

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
  ENTER[host.closest(".slide").dataset.t]=()=>{segSync(sg);ba.demo();setTimeout(()=>segSync(sg),2700)}});

PRINT.push(()=>Object.entries(BAS).forEach(([k,b])=>b.set(k==="hb"?50:38.5)));
function pillarNotes(n){return{1:["3 ofertas de liderança viram 1 (Interim & Embedded)","Tax + incentivos viram 1 produto com A&M Tax","Resiliência migra para o Pilar 4","Novo: AI Value & Governance Office"],
 2:["TMO + Modelo de Implantação viram o Predictive Transformation Office","ERP Readiness incorpora a Reforma Tributária","IT Business Partner sai (vai para 1.3)","Novo: AI-Native IT Productivity"],
 3:["8 fases viram 4 produtos + 1 assinatura","DD buy + sell = 1 produto, 3 níveis","IMO + SMO = 1 escritório","Playbook vira motor do PE Tech Value Radar"],
 4:["Nomes pelo que entregam (‘Strategy Application’ → Portfolio Rationalization)","Infra deixa de soar como serviço gerenciado","Resiliência chega do Pilar 1","Novo: Legacy X-Ray & AI Modernization"]}[n]}

