/* =====================================================================
   SLIDE 04 · Portfólio atual · dono: slide 04 (partida) · SLIDE DE REFERÊNCIA DA V6
   O portfólio oficial (4 pilares, 29 serviços, dados de PILLARS e OLD em src/data/00-base.js) em colunas
   no estilo APODI, com Spotlight por pilar. A legenda do spotlight separa a leitura em quatro assuntos:
   Quando o cliente nos chama · O que entregamos · Onde somos fortes · Onde há sobreposição.
   As linhas livres das colunas mostram o que o nome dos serviços diz (a oferta fala a língua de serviços).
   Ganchos: ENTER["04"] (volta à visão geral), STEP["04"] (→ percorre P1…P4), PRINT (página extra com a leitura).
   Sem siglas fora da lista da SPEC 5 (TMO aparece só como nome oficial do serviço, explicado) e sem números novos.
   ===================================================================== */
(function(){const sec=SL("04");if(!sec||typeof PILLARS==="undefined"||typeof OLD==="undefined")return;
  const host=$("pfHost"),grid=$("pfGrid"),seg=$("pfSeg");
  /* o momento da vida do cliente em que cada pilar entra (verbo do subtítulo + gatilho curto) */
  const MOM={1:["Decidir","direção ou custo da TI em xeque"],2:["Executar","programa crítico em andamento"],3:["Transacionar","compra, venda ou separação"],4:["Modernizar","legado e infraestrutura"]};
  /* leitura executiva de cada pilar, separada por assunto (fatos estruturais do portfólio oficial + leitura DTS, a calibrar com os sócios) */
  const TOP={
    1:{q:"O custo de TI pesa no resultado, a liderança de tecnologia saiu ou o conselho cobra uma nova direção para a TI.",
       o:"Diagnóstico, estratégia, liderança interina, modelo operacional, continuidade, redução de custo e tributos de TI.",
       f:"Liderança interina e redução de custo de TI: o cliente recebe quem assume a cadeira e responde pelo número.",
       s:"Três ofertas de liderança disputam o mesmo comprador; dois serviços tratam de impostos e incentivos de tecnologia."},
    2:{q:"Um programa crítico de TI (troca de ERP, Reforma Tributária, novo fornecedor) começa ou sai do prazo e do orçamento.",
       o:"Escolha de fornecedor, prontidão de ERP, escritório de transformação, governança, mudança e resgate.",
       f:"Resgate de projetos que saíram do trilho: a lógica do turnaround, prática da A&amp;M, aplicada a um programa de TI.",
       s:"O <span class=\"nw\">Modelo de Implantação e Governança</span> e o escritório de transformação têm o mesmo comprador e o mesmo método; o IT Business Partner encosta na liderança do pilar 1."},
    3:{q:"Um fundo ou uma empresa vai comprar, vender ou separar um negócio, com data marcada para o fechamento.",
       o:"Diligência de compra e de venda, planejamento de integração e separação, escritórios de transição e sinergias.",
       f:"Separações de negócio e captura de sinergias, perto do trabalho da A&amp;M com fundos de private equity.",
       s:"Seis dos oito serviços formam três pares com o mesmo método: as duas diligências (compra e venda), os dois planejamentos e os dois escritórios."},
    4:{q:"O legado ficou caro ou arriscado, a infraestrutura precisa de uma nova rota ou uma migração não pode falhar.",
       o:"Arquitetura, estratégia de aplicações, gestão de infraestrutura e apoio a migrações complexas.",
       f:"Migrações complexas, em que a A&amp;M pode atuar como revisão independente do trabalho do integrador.",
       s:"Nenhuma: cada serviço cobre uma camada diferente, da arquitetura e das aplicações à infraestrutura e à migração."}};
  const TT=[["q","Quando o cliente nos chama"],["o","O que entregamos"],["f","Onde somos fortes"],["s","Onde há sobreposição"]];
  /* linhas livres das colunas (pilares com menos serviços): o que o nome dos serviços diz, e o nome oficial quando sobra espaço */
  const NOTE={
    2:[["O que o nome diz","A atividade (seleção, prontidão, escritório), não o programa entregue no prazo e no valor."]],
    3:[["O que o nome diz","A fase da transação, não o valor que o comprador quer proteger até a saída."]],
    4:[["O que o nome diz","A área (arquitetura, aplicações, infraestrutura), não a entrega."],
       ["O que o cliente quer","Uma rota para o legado e uma migração que não para a operação."]]};
  /* nome oficial que é sigla fora da lista da SPEC 5: mostrado com a explicação */
  const DN={"TMO":"TMO (escritório de transformação)"};
  const ROWS=Math.max(...PILLARS.map(pl=>OLD.filter(o=>o.p===pl.n).length));
  const esc2=t=>String(t).replace(/"/g,"&quot;");
  PILLARS.forEach(pl=>{const own=OLD.filter(o=>o.p===pl.n),grp={};own.forEach(o=>(grp[o.to]=grp[o.to]||[]).push(o));
    const col=H("div",{class:"pf-col",id:"pfc"+pl.n,"data-a":"up",style:`--d:${2+pl.n}`,role:"button",tabindex:"0","aria-label":`Focar o pilar ${pl.n}`},grid);
    const [verb,trig]=MOM[pl.n];
    col.innerHTML=`<div class="pf-hd"><div class="pf-r1"><span class="pf-n">Pilar ${pl.n}</span><span class="pf-cnt">${own.length} serviços</span></div>
      <b class="pf-nm"${pl.official!==pl.name?` data-tv="Nome oficial" data-tl="${esc2(pl.official)}"`:""}>${pl.name}</b>
      <span class="pf-mo"><b>${verb}</b>${trig}</span></div>`;
    const list=H("div",{class:"pf-list",style:`--rows:${ROWS}`},col);
    own.forEach(o=>{const mates=grp[o.to].filter(x=>x!==o),ov=mates.length>0,nm=DN[o.n]||o.n;
      const d=H("div",{class:"pf-svc"+(ov?" ov":"")},list);
      d.innerHTML=`<i></i><span>${nm}</span>${ov?'<b class="pf-ovk" aria-hidden="true"></b>':""}`;
      /* dica: um serviço por linha (nome inteiro, sem quebra) */
      if(ov){d.dataset.tv=nm;d.dataset.th=`<span class="tl"><b>Sobrepõe-se a</b></span>${mates.map(x=>`<span class="tl" style="white-space:nowrap">${DN[x.n]||x.n}</span>`).join("")}`}});
    /* linhas livres da coluna: o que o nome diz (a oferta fala a língua de serviços) */
    const free=ROWS-own.length;
    if(free>0){const n=H("div",{class:"pf-note",style:`grid-row:span ${free}`},list);
      n.innerHTML=(NOTE[pl.n]||[]).map(([l,t])=>`<span class="pf-nl">${l}</span><p>${t}</p>`).join('<span class="pf-arr" aria-hidden="true"></span>')}});
  /* spotlight: um passo por pilar */
  const steps=PILLARS.map(pl=>({sel:"#pfc"+pl.n,btn:"Pilar "+pl.n,pad:5,title:`Pilar ${pl.n} · ${pl.name}`,
    text:`${pl.official!==pl.name?`<span class="pf-off">Nome oficial: ${pl.official}</span>`:""}${TT.map(([k,l])=>`<span class="sl"><b>${l}</b>${TOP[pl.n][k]}</span>`).join("")}`}));
  const sp=Spotlight(host,steps,seg,{capW:420,onSet:k=>{grid.querySelectorAll(".pf-col").forEach((c,j)=>c.classList.toggle("on",j===k))}});
  segSync(seg);
  grid.querySelectorAll(".pf-col").forEach((c,j)=>{const pick=e=>{e.stopPropagation();sp.set(sp.cur===j?-1:j)};c.addEventListener("click",pick);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}})});
  host.addEventListener("click",e=>{if(sp.cur>=0&&!e.target.closest(".pf-col"))sp.set(-1)});
  ENTER["04"]=()=>{sp.set(goLast?steps.length-1:-1);segSync(seg)};
  STEP["04"]=d=>{if(d>0){if(sp.cur<steps.length-1){sp.set(sp.cur+1);return true}sp.set(-1);return false}if(sp.cur>=0){sp.set(sp.cur-1);return true}return false};
  /* impressão: sem penumbra na página principal e uma página extra com a leitura dos quatro pilares (o que o spotlight mostra) */
  PRINT.push(()=>{sp.set(-1);if(stage.querySelector(".pf-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","pf-print","play");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    const sub=c.querySelector(".sub");if(sub)sub.textContent="Quando o cliente nos chama, o que entregamos, onde somos fortes e onde há sobreposição, pilar a pilar";
    const g=H("div",{class:"pf-pgrid"});PILLARS.forEach(pl=>{const [verb,trig]=MOM[pl.n];H("div",{class:"pf-pcol",html:`<div class="pf-hd"><div class="pf-r1"><span class="pf-n">Pilar ${pl.n}</span><span class="pf-cnt">${OLD.filter(o=>o.p===pl.n).length} serviços</span></div><b class="pf-nm">${pl.name}</b><span class="pf-mo"><b>${verb}</b>${trig}</span></div>${pl.official!==pl.name?`<div class="pf-poff">Nome oficial: ${pl.official}</div>`:""}${TT.map(([k,l])=>`<div class="pf-pt"><b>${l}</b><p>${TOP[pl.n][k]}</p></div>`).join("")}`},g)});
    const h=c.querySelector(".pf-host");if(h)h.replaceWith(g);const r=c.querySelector(".head-r");if(r)r.remove();sec.after(c)});
})();
