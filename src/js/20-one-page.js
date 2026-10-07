/* Arquivo carregado depois de engine.js, data.js, core.js e slides.js (ver build.py). */
/* ---------- origem de cada produto (nome de hoje): gerada de OLD, com os nomes oficiais do portfólio atual ---------- */
const ORG={},ORGT={};PRODUCTS.forEach(p=>{const rk=o=>o.d==="cut"?2:o.d==="merge"?1:0,os=OLD.filter(o=>o.to===p.code).sort((a,b)=>rk(a)-rk(b));
  const nm=o=>o.n+(o.p!==p.pillar?` (Pilar ${o.p})`:"");
  ORG[p.code]=p.st==="new"?(os.length?`novo · absorve o ${os.map(o=>o.n).join(" + ")}`:"novo · produto com IA"):`de ${os.map(nm).join(" + ")}`;
  /* no tile: cada nome inteiro numa linha; com mais de 2 serviços, o primeiro nome + a contagem (a dica traz a lista completa) */
  const nw=s=>`<span class="nwr">${s}</span>`;
  ORGT[p.code]=p.st==="new"?(os.length?`novo · absorve o ${nw(os[0].n)}`:"novo · produto com IA"):os.length>2?`de ${nw(nm(os[0]))} + ${os.length-1} serviços`:`de ${os.map(o=>nw(nm(o))).join(" + ")}`});
/* frase "serviços → produtos" por pilar, calculada dos dados (quem fica, quem chega de outro pilar, quantos são novos) */
const pillarFlow=pl=>{const n=pl.n,own=OLD.filter(o=>o.p===n),stay=own.filter(o=>PBY(o.to).pillar===n).length,inn=OLD.filter(o=>o.p!==n&&o.d!=="cut"&&PBY(o.to).pillar===n),nw=PRODUCTS.filter(p=>p.pillar===n&&p.st==="new").length;
  return`${stay===own.length?`Os ${own.length} serviços de hoje`:`${stay} dos ${own.length} serviços de hoje`}${inn.length?`, mais ${inn.length} vindo do Pilar ${inn[0].p},`:""}${nw?` e ${nw} novo`:""} formam ${pl.now} produtos`};

/* ---------- one-page TO-BE · sistema de produtos (fx 18 · Connector / Flow Line) + spotlight ----------
   Colunas por pilar → conector de cada coluna → fio laranja → Plataforma de Dados e IA.
   Os conectores se desenham na entrada e passam a fluir; o mouse num produto acende a linha do pilar. */
(function(){const KEY="One-page · novo portfólio",sec=slides.find(s=>s.dataset.t===KEY),host=$("opHost"),svg=$("opSvg"),g=$("opGrid"),base=$("opAI");
  const ROWS=Math.max(...PILLARS.map(pl=>PRODUCTS.filter(p=>p.pillar===pl.n).length));
  /* legenda: etiquetas de status com contagem calculada dos dados */
  const nst=k=>PRODUCTS.filter(p=>p.st===k).length;
  $("opLeg").innerHTML=`<span class="hint sy-hint">Clique no produto para abrir a ficha</span>`+["keep","ai","new"].map(k=>`<span>${stTag(k)}<em>${nst(k)}</em></span>`).join("")+`<span class="sy-sg" data-tv="★ A&amp;M Signature" data-tl="Maior direito de vencer (DNA operador).">★ A&amp;M Signature<em>${PRODUCTS.filter(p=>p.sig).length}</em></span>`;
  /* origem na dica: "Nasce de X" quando o produto vem de serviços atuais; "Origem novo · …" quando é novo */
  const orgTip=c=>{const o=ORG[c];return o.startsWith("de ")?`<b>Nasce de</b>${o.slice(3)}`:`<b>Origem</b>${o}`};
  /* colunas por pilar: cabeçalho grande + subtítulo mono; tiles com ícone, nome, frase e etiqueta */
  PILLARS.forEach(pl=>{const ps=PRODUCTS.filter(p=>p.pillar===pl.n);
    const col=H("div",{class:"sy-col",id:"opc"+pl.n,"data-a":"up",style:`--d:${pl.n*1.5}`},g);
    col.innerHTML=`<div class="sy-mo"><span class="sy-n"><span>Pilar ${pl.n}</span><i data-tv="Pilar ${pl.n} · ${pl.name}" data-tl="${pillarFlow(pl)} no novo portfólio.">${pl.was} serviços → ${pl.now} produtos</i></span><b>${pl.name}</b><span class="sy-sub"><span class="v1">${pl.short}</span><span class="v2">hoje: ${pl.official}</span></span></div>`;
    const list=H("div",{class:"sy-list",style:`--rows:${ROWS}`},col);
    ps.forEach((p,k)=>{const a=H("a",{href:"#p="+p.id,"data-pd":p.id,"data-pl":pl.n,class:`sy-t ${p.st}${p.st==="new"?" holo":""}`,style:`--hd:${(k*.7).toFixed(1)}s`,
        "data-tv":`${p.code} · ${p.name}`,"data-th":`<span class="tl"><b>Proposta</b>${p.tagline}</span><span class="tl">${orgTip(p.code)}</span><span class="tl"><b>Status</b>${STATUS[p.st][0]}${p.sig?" · ★ A&amp;M Signature":""}</span><span class="tl">Clique para abrir a ficha.</span>`},list);
      a.innerHTML=`${picoSvg(p.code,pl.n+k)}<span class="sy-nm"><em>${p.code}</em> · ${p.name}${p.sig?'<span class="sig">★</span>':""}</span><span class="sy-tx"><i class="sy-fl"></i>${stTag(p.st)}<span class="v1">${p.tagline}</span><span class="v2">${ORGT[p.code]}</span></span>`});
    /* linhas livres da coluna: sempre o mesmo bloco (a proposta do pilar); "Quando nos contratam" fica no spotlight dos 4 pilares */
    if(ps.length<ROWS){const n=H("div",{class:"sy-note",style:`grid-row:span ${ROWS-ps.length}`},list);n.innerHTML=`<span><b class="label">Proposta</b>${pl.def}</span>`}});
  fixPaths(sec);

  /* conectores: coluna → fio laranja → faixa base (coordenadas de layout, sem escala do palco) */
  const CON={};let lit=0;
  function draw(){if(!host.offsetWidth)return;svg.innerHTML="";const W=host.offsetWidth,Hh=host.offsetHeight;svg.setAttribute("viewBox",`0 0 ${W} ${Hh}`);svg.setAttribute("width",W);svg.setAttribute("height",Hh);
    const b=rel(base,host),y=Math.round(b.y-18),ln=(x0,y0,x1,y1)=>`M ${x0} ${y0} L ${x1} ${y1}`;
    S("path",{d:ln(6,y,W-6,y),class:"sy-thread",id:"opThread",pathLength:1},svg);
    if(!REDMO)S("path",{d:ln(6,y,W-6,y),class:"sy-comet",pathLength:1},svg);
    PILLARS.forEach((pl,i)=>{const r=rel($("opc"+pl.n).querySelector(".sy-list"),host),x=Math.round(r.cx),y0=r.y+r.h+2;
      const c=S("path",{d:ln(x,y0,x,y),class:"sy-con",id:"opCon"+pl.n,pathLength:1},svg);c.style.setProperty("--d",i);
      const f=S("path",{d:ln(x,y0,x,y),class:"sy-flow"},svg);f.style.setProperty("--d",i);
      const dt=S("circle",{cx:x,cy:y,r:4.5,class:"sy-dot",id:"opDot"+pl.n},svg);CON[pl.n]={c,f,dt}});
    const bc=S("path",{d:ln(b.cx,y,b.cx,b.y),class:"sy-con sy-cb",pathLength:1},svg);bc.style.setProperty("--d",5);
    const bf=S("path",{d:ln(b.cx,y,b.cx,b.y),class:"sy-flow"},svg);bf.style.setProperty("--d",5);
    CON.base={c:bc,f:bf,dt:S("circle",{cx:b.cx,cy:y,r:5.5,class:"sy-dot sy-hub"},svg)};
    st[st.length-1].capX=Math.round((W-380)/2);st[st.length-1].capY=Math.max(0,y-250);
    light(lit)}
  /* acende a linha de um pilar (hover num produto ou spotlight); "all" = a base liga todos */
  const tog=(o,on)=>{if(o){o.c.classList.toggle("on",on);o.f.classList.toggle("on",on);o.dt.classList.toggle("on",on)}};
  function light(n){lit=n;PILLARS.forEach(pl=>{const on=n==="all"||pl.n===n;$("opc"+pl.n).classList.toggle("hot",on);tog(CON[pl.n],on)});tog(CON.base,n==="all")}
  const rest=()=>light(!sp||sp.cur<0?0:sp.cur<4?sp.cur+1:"all");
  g.addEventListener("pointerover",e=>{if(sp.cur>=0)return;const t=e.target.closest(".sy-t");if(t)light(+t.dataset.pl)});
  g.addEventListener("pointerout",e=>{const t=e.target.closest(".sy-t");if(t&&!t.contains(e.relatedTarget))rest()});
  g.addEventListener("click",e=>{if(e.target.closest(".sy-t"))tipEl.classList.remove("on")},true);
  base.addEventListener("pointerenter",()=>{if(sp.cur<0)light("all")});base.addEventListener("pointerleave",rest);

  /* alternância Proposta de valor | Nome de hoje */
  const om=$("opMode"),setMode=m=>{om.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.m===m));segSync(om);g.classList.toggle("org",m==="o")};
  om.querySelectorAll("button").forEach(b=>b.onclick=()=>setMode(b.dataset.m));
  /* indicador do seletor posicionado na hora (a impressão não espera o próximo quadro) */
  const segNow=sg=>{let ind=sg.querySelector(".seg-ind");if(!ind){ind=H("span",{class:"seg-ind"});sg.prepend(ind)}const on=sg.querySelector("button.on");if(on&&on.offsetWidth){ind.style.opacity=1;ind.style.left=on.offsetLeft+"px";ind.style.width=on.offsetWidth+"px"}return ind};

  /* spotlight: passos e legendas por pilar + plataforma */
  const st=PILLARS.map(pl=>{const ps=PRODUCTS.filter(p=>p.pillar===pl.n),nw=ps.filter(p=>p.st==="new"),sg=ps.filter(p=>p.sig),ai=ps.filter(p=>p.st!=="keep").length;
    return{sel:`#opc${pl.n},#opCon${pl.n},#opDot${pl.n}`,btn:"P"+pl.n,title:`Pilar ${pl.n} · ${pl.name}`,text:`<span class="sl"><b>Serviços → produtos</b>${pillarFlow(pl)}; ${ai} deles com IA no método.</span>${sg.length?`<span class="sl"><b>Signature</b>${sg.map(p=>p.name).join(" · ")}</span>`:""}<span class="sl"><b>Novo com IA</b>${nw.map(p=>p.name).join(" · ")}</span><span class="sl"><b>Proposta</b>${pl.def}</span><span class="sl"><b>Quando nos contratam</b>${pl.when}</span>`}});
  const PLAT=[["O que é","Ativos compartilhados por todos os produtos: diagnóstico padrão, radar de gastos, benchmark Brasil, biblioteca de agentes e LLM corporativo seguro."],["Por que importa","É o que torna o serviço replicável de um cliente para o outro e sustenta a receita recorrente."]];
  st.push({sel:"#opAI,#opThread",btn:"Plataforma",title:"Plataforma de Dados e IA",text:PLAT.map(([k,v])=>`<span class="sl"><b>${k}</b>${v}</span>`).join(""),capY:330});
  base.dataset.tv="Plataforma de Dados e IA";base.dataset.th=`<span class="tl"><b>${PLAT[1][0]}</b>${PLAT[1][1]}</span>`;
  const sp=Spotlight(host,st,$("opSeg"));segSync($("opSeg"));
  /* com o spotlight num passo, o que está na penumbra não abre dica (a dica cobriria a legenda); o clique na ficha continua */
  const mute=()=>[...g.querySelectorAll("[data-tv],[data-tv0]"),base].forEach(t=>{const off=sp.cur>=0&&(t===base?sp.cur<4:sp.cur>3||t.closest(".sy-col").id!=="opc"+(sp.cur+1));
    if(off&&t.dataset.tv){t.dataset.tv0=t.dataset.tv;delete t.dataset.tv}else if(!off&&t.dataset.tv0){t.dataset.tv=t.dataset.tv0;delete t.dataset.tv0}});
  const spot=k=>{sp.set(k);rest();mute()};
  $("opSeg").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{rest();mute()}));
  ENTER[KEY]=()=>{lit=0;draw();spot(-1);segSync($("opSeg"));segSync(om)};
  if(document.fonts)document.fonts.ready.then(()=>{if(slides[cur]===sec)draw()});
  STEP[KEY]=d=>{if(d>0){if(sp.cur<st.length-1){spot(sp.cur+1);return true}spot(-1);return false}if(sp.cur>=0){spot(sp.cur-1);return true}return false};

  /* impressão: estado estático (sem spotlight, conectores prontos) + página extra com "Nome de hoje" */
  PRINT.push(()=>{const d0=sec.style.display;if(!sec.offsetWidth)sec.style.display="block";
    if(sp.cur>=0)spot(-1);setMode("v");lit=0;draw();segNow($("opSeg"));segNow(om);
    const b2=om.querySelector('button[data-m="o"]'),ind=[b2.offsetLeft,b2.offsetWidth];sec.style.display=d0;
    if(stage.querySelector(".sy-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","sy-print");
    c.querySelector(".sy-cols").classList.add("org");
    const cm=c.querySelector("#opMode");cm.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.m==="o"));const ci=cm.querySelector(".seg-ind");Object.assign(ci.style,{left:ind[0]+"px",width:ind[1]+"px",opacity:1});
    const cb=c.querySelector(".sy-chips");cb.className="sy-pt";cb.innerHTML=PLAT.map(([k,v])=>`<span><b class="label">${k}</b>${v}</span>`).join("");
    c.querySelectorAll("[id]").forEach(x=>x.removeAttribute("id"));sec.after(c)})})();
