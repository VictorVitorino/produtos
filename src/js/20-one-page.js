/* Arquivo carregado depois de engine.js, data.js, core.js e slides.js (ver build.py). */
/* ---------- origem de cada produto (nome de hoje) ---------- */
const ORG={"1.1":"de Tech Maturity & Value Assessment","1.2":"de Digital Strategy & Roadmapping","1.3":"de Interim CIO/CTO + Embedded Leadership + C-Level","1.4":"de Operating Model Design & Tech Org Restructuring","1.5":"de Tech Spend Optimization","1.6":"de Strategic Tech Tax + Innovation Tax Incentives","1.7":"novo · produto com IA",
 "2.1":"de IT Sourcing (Software & Vendor) Selection","2.2":"de ERP Readiness & Gap Analysis","2.3":"de TMO + Modelo de Implantação e Governança","2.4":"de Project Remediation","2.5":"de Gestão de Mudanças Tech","2.6":"novo · produto com IA",
 "3.1":"de IT Due Diligence (Buy Side + Sell Side)","3.2":"de Integration & Separation Planning + Separation Design","3.3":"de IT Integration MO + IT Separation MO","3.4":"de IT Synergies & Value Creation","3.5":"novo · absorve o IT M&A Playbook",
 "4.1":"de Strategy Architecture","4.2":"de Strategy Application","4.3":"de Infrastructure Management","4.4":"de Complex Migrations Support","4.5":"de IT Resilience & BCP (vem do Pilar 1)","4.6":"novo · produto com IA"};

/* ---------- one-page TO-BE + spotlight ---------- */
(function(){const g=$("opGrid");PILLARS.forEach(pl=>{const col=H("div",{class:"op-col",id:"opc"+pl.n,"data-a":"up",style:`--d:${3+pl.n}`},g);
  col.innerHTML=`<div class="op-hd"><div class="n">PILAR ${pl.n}</div><h3>${pl.name}</h3><p>${pl.short}</p><span class="cnt">${pl.was} → ${pl.now}</span></div>`;
  const list=H("div",{class:"op-list"},col);PRODUCTS.filter(p=>p.pillar===pl.n).forEach((p,k)=>{const a=H("a",{href:"#p="+p.id,"data-pd":p.id,class:`prod ${p.st}${p.st==="new"?" holo":""}`,title:"Abrir ficha: "+p.name,style:`--hd:${(k*.6).toFixed(1)}s`},list);
    a.innerHTML=`<span class="bar"></span><span style="min-width:0"><span class="nm">${p.code} · ${p.name}${p.sig?'<span class="sig" title="A&M Signature">★</span>':""}</span><span class="ds"><span class="v1">${p.tagline}</span><span class="v2">${ORG[p.code]}</span></span></span><span class="go">›</span>`});
  col.querySelector(".op-hd p").innerHTML=`<span class="v1">${pl.short}</span><span class="v2">hoje: ${pl.official}</span>`});
  const om=$("opMode");om.querySelectorAll("button").forEach(b=>b.onclick=()=>{om.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));segSync(om);$("opGrid").classList.toggle("org",b.dataset.m==="o")});
  const st=PILLARS.map(pl=>{const ps=PRODUCTS.filter(p=>p.pillar===pl.n),nw=ps.filter(p=>p.st==="new"),sg=ps.filter(p=>p.sig),ai=ps.filter(p=>p.st!=="keep").length;
    return{sel:"#opc"+pl.n,btn:"P"+pl.n,title:`Pilar ${pl.n} · ${pl.name}`,text:`<span class="sl"><b>Serviços → produtos</b>${pl.was} serviços de hoje viram ${pl.now} produtos; ${ai} deles com IA no método.</span>${sg.length?`<span class="sl"><b>Signature</b>${sg.map(p=>p.name).join(" · ")}</span>`:""}<span class="sl"><b>Novo com IA</b>${nw.map(p=>p.name).join(" · ")}</span><span class="sl"><b>Proposta</b>${pl.def}</span>`}});
  st.push({sel:"#opAI",btn:"Plataforma",title:"Plataforma de Dados e AI",text:`<span class="sl"><b>O que é</b>Ativos compartilhados por todos os produtos: diagnóstico padrão, radar de gastos, benchmark Brasil, biblioteca de agentes e LLM corporativo seguro.</span><span class="sl"><b>Por que importa</b>É o que torna o serviço replicável de um cliente para o outro e sustenta a receita recorrente.</span>`,capY:330});
  const sp=Spotlight($("opHost"),st,$("opSeg"));segSync($("opSeg"));
  ENTER["One-page · novo portfólio"]=()=>{sp.set(-1);segSync($("opSeg"));segSync($("opMode"))};
  STEP["One-page · novo portfólio"]=d=>{if(d>0){if(sp.cur<st.length-1){sp.set(sp.cur+1);return true}sp.set(-1);return false}if(sp.cur>=0){sp.set(sp.cur-1);return true}return false}})();

