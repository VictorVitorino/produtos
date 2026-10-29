/* =====================================================================
   SLIDE 04 · Portfólio atual · dono: slide 04 · SLIDE DE REFERÊNCIA DA V6
   O portfólio oficial (4 pilares, 29 serviços, dados de PILLARS e OLD em src/data/00-base.js) em colunas
   no estilo APODI, com Spotlight por pilar. A legenda do spotlight separa a leitura em quatro assuntos:
   Quando o cliente nos chama · O que entregamos · Onde somos fortes · Onde há sobreposição.
   Ganchos: ENTER["04"] (volta à visão geral), STEP["04"] (→ percorre P1…P4), PRINT (página extra com a leitura).
   Texto dos assuntos: rascunho da fundação, a revisar pelo time de conteúdo (sem siglas e sem números novos).
   ===================================================================== */
(function(){const sec=SL("04");if(!sec||typeof PILLARS==="undefined"||typeof OLD==="undefined")return;
  const host=$("pfHost"),grid=$("pfGrid"),seg=$("pfSeg");
  /* o momento da vida do cliente em que cada pilar entra (verbo do subtítulo + gatilho curto) */
  const MOM={1:["Decidir","direção ou custo da TI em xeque"],2:["Executar","programa crítico em andamento"],3:["Transacionar","compra, venda ou separação"],4:["Modernizar","legado e infraestrutura"]};
  /* leitura de cada pilar, separada por assunto (fatos estruturais do portfólio oficial + leitura DTS) */
  const TOP={
    1:{q:"Quando a direção da TI está em xeque: custo alto, troca de liderança ou um conselho que cobra resultado da tecnologia.",
       o:"Diagnóstico, estratégia e roadmap, liderança interina, modelo operacional, redução de custos e planejamento tributário de tecnologia.",
       f:"Liderança interina de tecnologia e redução de custos de TI: é onde o DNA de operador da A&amp;M pesa mais.",
       s:"Três ofertas de liderança disputam o mesmo comprador, e dois serviços tratam de impostos e incentivos."},
    2:{q:"Quando um programa crítico de tecnologia está em execução, com prazo apertado e risco alto para o negócio.",
       o:"Escolha de fornecedores, prontidão de ERP, escritório de transformação, gestão de mudanças, governança de implantação e resgate de projetos.",
       f:"Resgate de projetos em crise: recuperar programas que saíram do trilho é DNA da A&amp;M.",
       s:"O escritório de transformação (TMO) e o Modelo de Implantação e Governança têm o mesmo comprador e o mesmo método."},
    3:{q:"Quando há compra, venda ou separação de negócio, para fundos de investimento e empresas, da estratégia da transação à transição.",
       o:"Diligência de compra e de venda, planejamento e escritórios de integração e de separação, sinergias e criação de valor.",
       f:"Separações de negócio e captura de sinergias, alinhadas à prática de private equity da A&amp;M.",
       s:"Os oito serviços são fases do mesmo ciclo, em pares: diligência de compra e de venda, integração e separação, e os dois escritórios."},
    4:{q:"Quando arquitetura e infraestrutura precisam ser revistas e modernizadas, com custo e eficiência sob pressão.",
       o:"Arquitetura, estratégia de aplicações, gestão de infraestrutura e apoio a migrações complexas.",
       f:"Migrações complexas, em que a A&amp;M pode atuar como garantia independente do integrador.",
       s:"Nenhuma entre os quatro, mas três nomes (Strategy Architecture, Strategy Application e Infrastructure Management) não dizem o que entregam."}};
  const TT=[["q","Quando o cliente nos chama"],["o","O que entregamos"],["f","Onde somos fortes"],["s","Onde há sobreposição"]];
  const ROWS=Math.max(...PILLARS.map(pl=>OLD.filter(o=>o.p===pl.n).length));
  const esc2=t=>String(t).replace(/"/g,"&quot;");
  PILLARS.forEach(pl=>{const own=OLD.filter(o=>o.p===pl.n),grp={};own.forEach(o=>(grp[o.to]=grp[o.to]||[]).push(o));
    const col=H("div",{class:"pf-col",id:"pfc"+pl.n,"data-a":"up",style:`--d:${2+pl.n}`,role:"button",tabindex:"0","aria-label":`Focar o pilar ${pl.n}`},grid);
    const [verb,trig]=MOM[pl.n];
    col.innerHTML=`<div class="pf-hd"><div class="pf-r1"><span class="pf-n">Pilar ${pl.n}</span><span class="pf-cnt">${own.length} serviços</span></div>
      <b class="pf-nm"${pl.official!==pl.name?` data-tv="Nome oficial" data-tl="${esc2(pl.official)}"`:""}>${pl.name}</b>
      <span class="pf-mo"><b>${verb}</b>${trig}</span></div>`;
    const list=H("div",{class:"pf-list",style:`--rows:${ROWS}`},col);
    own.forEach(o=>{const mates=grp[o.to].filter(x=>x!==o),ov=mates.length>0;
      const d=H("div",{class:"pf-svc"+(ov?" ov":"")},list);
      d.innerHTML=`<i></i><span>${o.n}</span>${ov?'<b class="pf-ovk" aria-hidden="true"></b>':""}`;
      if(ov){d.dataset.tv=o.n;d.dataset.th=`<span class="tl"><b>Sobrepõe-se a</b>${mates.map(x=>x.n).join(" · ")}</span>`}});
    /* linhas livres da coluna: o texto oficial de "quando nos contratam" (e, se sobrar espaço, a definição do pilar) */
    const free=ROWS-own.length;
    if(free>0){const n=H("div",{class:"pf-note",style:`grid-row:span ${free}`},list);
      n.innerHTML=`<span class="pf-nl">Quando nos contratam</span><p>${pl.when}</p>${free>=5?`<span class="pf-nl">O que o portfólio diz</span><p>${pl.def_as}</p>`:""}`}});
  /* spotlight: um passo por pilar */
  const steps=PILLARS.map(pl=>({sel:"#pfc"+pl.n,btn:"Pilar "+pl.n,pad:5,title:`Pilar ${pl.n} · ${pl.name}`,
    text:`${pl.official!==pl.name?`<span class="pf-off">Nome oficial: ${pl.official}</span>`:""}${TT.map(([k,l])=>`<span class="sl"><b>${l}</b>${TOP[pl.n][k]}</span>`).join("")}`}));
  const sp=Spotlight(host,steps,seg,{capW:420,onSet:k=>{grid.querySelectorAll(".pf-col").forEach((c,j)=>c.classList.toggle("on",j===k))}});
  segSync(seg);
  grid.querySelectorAll(".pf-col").forEach((c,j)=>{const pick=e=>{e.stopPropagation();sp.set(sp.cur===j?-1:j)};c.addEventListener("click",pick);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}})});
  host.addEventListener("click",e=>{if(sp.cur>=0&&!e.target.closest(".pf-col"))sp.set(-1)});
  ENTER["04"]=()=>{sp.set(goLast?steps.length-1:-1);segSync(seg)};
  STEP["04"]=d=>{if(d>0){if(sp.cur<steps.length-1){sp.set(sp.cur+1);return true}sp.set(-1);return false}if(sp.cur>=0){sp.set(sp.cur-1);return true}return false};
  /* impressão: sem penumbra na página principal e uma página extra com a leitura dos quatro pilares */
  PRINT.push(()=>{sp.set(-1);if(stage.querySelector(".pf-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","pf-print","play");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    const sub=c.querySelector(".sub");if(sub)sub.textContent="A leitura de cada pilar: quando o cliente nos chama, o que entregamos, onde somos fortes e onde há sobreposição";
    const g=H("div",{class:"pf-pgrid"});PILLARS.forEach(pl=>{const [verb,trig]=MOM[pl.n];H("div",{class:"pf-pcol",html:`<div class="pf-hd"><div class="pf-r1"><span class="pf-n">Pilar ${pl.n}</span></div><b class="pf-nm">${pl.name}</b><span class="pf-mo"><b>${verb}</b>${trig}</span></div>${TT.map(([k,l])=>`<div class="pf-pt"><b>${l}</b><p>${TOP[pl.n][k]}</p></div>`).join("")}`},g)});
    const h=c.querySelector(".pf-host");if(h)h.replaceWith(g);const r=c.querySelector(".head-r");if(r)r.remove();sec.after(c)});
})();
