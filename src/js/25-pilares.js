/* =====================================================================
   PILARES · motor compartilhado dos slides 10–17 · dono: pilar-1 (V6, fase 3)
   Lê o conteúdo de cada pilar em PCFG[n] (registrado pelos módulos 30-s10 … 30-s17) só no BOOT, nunca na carga.
   ---------------------------------------------------------------------
   COMO USAR (donos dos pilares 2–4) · marcação no slide + conteúdo em PCFG[n]; tudo é opcional, salvo a marcação da peça
   ▸ Vista "O que o cliente vive" (10, 12, 14, 16)
     <div class="main quem" data-pillar="n" data-steps></div>
        Matriz Quem decide · A pergunta · O gatilho · A prova · Quem responde (3 a 5 linhas). data-steps: → acende um
        decisor por vez (foco) antes de trocar de vista; ← volta; o cursor também acende. Sem foco na impressão.
        PCFG[n].cliente.quem=[{r:"Papel",d:"o que decide (curto)",q:"pergunta na voz do cliente",g:"gatilho",
          f:"id-do-fato" (número grande, de FATOS), ft:"texto do fato sem o número", fq:"menos de" (antes do número),
          p:["1.1","1.7"]}, …]
   ▸ Vista "O que o mercado faz"
     <table class="tbl mk" data-mk="n"></table>   PCFG[n].cliente.mk=[{f:"Firma",ia:"o que já faz com IA (HTML; número só
        com <span data-fato>)",l:"o que isso muda para a DTS",p:["1.2"] (coluna "Disputa com")}, …]. Linhas V5 em lista
        [firma, oferta, IA, leitura] ainda funcionam; heat (V5) vira a coluna "Sobreposição" só sem p.
     <div class="ws" data-pillar="n"></div>        PCFG[n].cliente.ws={it:[["Título","texto (HTML)","1.3"],…],th:"ameaça (HTML)"}
     <div class="pos" data-pos="n"></div>          PCFG[n].cliente.pos="posicionamento proposto (HTML)"
     V5, ainda aceitos: .persona[data-pillar] (pers), .jr-wrap[data-pillar] (jr) e os estilos de .fdii/.kpi-row/.ctx/.mkb.
   ▸ Slide de produtos (11, 13, 15, 17) · vista 1 · Hoje → Produtos → Com IA
     <div class="pp-ctl" data-pillar="n"></div>    na .head-r: seletor Hoje · Produtos · Com IA + legenda (sem ele, a barra
                                                    vai no topo da vista)
     <div class="main pp" data-pillar="n"></div>   à esquerda os serviços de hoje (ordem do portfólio oficial); à direita as
        cartas dos produtos, viradas para baixo em "Hoje"; em "Produtos" cada serviço desliza até a carta que ele vira e as
        cartas desviram; em "Com IA" acendem a IA no método e as ligações dos produtos com IA. Serviço que sai do pilar ganha
        uma linha "→ vai para o Pilar N"; serviço que chega de outro pilar aparece em "Produtos".
   ▸ Vista 2 · Antes e depois, linha a linha
     <div class="ba-ctl" data-pillar="n"></div>    na .head-r: seletor Hoje · Lado a lado · Proposta (sem ele, vai no topo)
     <div class="main bap" data-pillar="n"></div>  uma linha por produto (+ linhas de serviço que muda de pilar). Em repouso
        (divisor no meio): à esquerda o que se vende hoje e por que muda; à direita o produto e o que muda. Arrastar para
        "Hoje" mostra a decisão do raio-X e o destino; para "Proposta", o que o cliente leva e a IA no método.
   ▸ PCFG[n].produtos (todos opcionais)
       ba:{"1.1":["Hoje: por que muda (≤ 95 caracteres)","Proposta: o que muda (≤ 95)"], …}   linha de um serviço que sai
          do pilar = chave com o código do destino ("4.5"). Padrão: OLD[].w (hoje) e PRODUCTS[].tagline (proposta)
       why:{"a1":"motivo, na dica do serviço"}      padrão: OLD[].w
       ia:{"1.1":"papel da IA na carta"}            padrão: PRODUCTS[].ai[0]
       cap:["frase Hoje","frase Produtos","frase Com IA"]   só onde houver <p class="pp-cap" data-pillar="n"></p>
       notes:["…","…"] (códigos 1.1… viram link)         só onde houver <div class="pp-notes" data-pillar="n"></div>
   Ganchos: ENTER/STEP dos slides de produtos são deste motor (→: Hoje → Produtos → Com IA → vista 2, com o divisor que
   desliza de "Hoje" até o meio). Para somar comportamento: const b=ENTER["13"];ENTER["13"]=()=>{b&&b();…} no BOOT.
   API: PPG[n] = {to(estado), focus(código), cur, …} · BAPX[n] = {ba, set(x)} · PILARX (interno).
   Impressão: produtos em "Com IA" (cartas abertas, ligações desenhadas); antes e depois com o divisor no meio; matriz sem foco.
   Movimento reduzido: estados trocam sem animação. Letras: corpo ≥ 13 px, rótulos ≥ 11 px. Textos corridos sem viúva (o motor
   liga as duas últimas palavras). Exemplo completo, no formato V6 (.head/.tc/.sub + .sowhat): slides 10 e 11 (src/slides/10-p1-cliente.html,
   11-p1-produtos.html; src/js/30-s10-p1-cliente.js, 30-s11-p1-produtos.js). O antigo .pp-lead (V5) ainda recebe PILLARS[n].def.
   ===================================================================== */
const pcfgC=n=>(PCFG[n]&&PCFG[n].cliente)||{};
const pcfgP=n=>(PCFG[n]&&PCFG[n].produtos)||{};
/* "O que muda" (frases curtas, códigos viram link) e motivo da sobreposição por produto de destino (V5) */
const pillarNotes=n=>pcfgP(n).notes||[];
const ovlOf=(n,code)=>(pcfgP(n).ovl||{})[code];
const BAPX={},PPG={};
const HEATL={A:["Alta","#9A3B2A"],M:["Média","#33556D"],B:["Baixa","#5E8AB4"],X:["Ativo A&amp;M","#122143"]};

const PILARX=(()=>{
  const byCode=(a,b)=>String(a.code).localeCompare(String(b.code),"pt",{numeric:true});
  const DEC={keep:"Manter",ai:"Aprimorar com IA",merge:"Fundir",cut:"Deixa de ser vendido sozinho"};
  const IAL={keep:"IA de apoio",ai:"IA no método",new:"Criado com IA"};
  const tl=(k,v)=>`<span class="tl"><b>${k}</b>${v}</span>`;
  const att=s=>String(s==null?"":s).replace(/&(?![#\w]+;)/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  /* sem viúva: liga as duas últimas palavras de um texto (fora de marcação) com espaço não separável */
  const nw=t=>{t=String(t==null?"":t);const i=t.lastIndexOf(" ");if(i<0)return t;const tail=t.slice(i+1);return /[<>]/.test(tail)?t:t.slice(0,i)+"\u00a0"+tail};
  const whyOf=(n,o)=>(pcfgP(n).why||{})[o.id]||o.w||"";
  const iaOf=(n,p)=>(pcfgP(n).ia||{})[p.code]||strip((p.ai||[])[0]||"");
  /* serviços do pilar: os seus (own), os que chegam de outro pilar (inn) e os que saem (outs) */
  function svcs(n){const own=OLD.filter(o=>o.p===n),inn=OLD.filter(o=>o.p!==n&&PBY(o.to)&&PBY(o.to).pillar===n),outs=own.filter(o=>PBY(o.to).pillar!==n);
    const grp={};own.forEach(o=>(grp[o.to]=grp[o.to]||[]).push(o));
    const ord=(a,b)=>((a.d==="cut")-(b.d==="cut"))||((a.p!==n)-(b.p!==n));
    const ps=PRODUCTS.filter(p=>p.pillar===n).slice().sort(byCode);
    return{own,inn,outs,grp,ps,ord,rows:ps.map(p=>({p,L:own.concat(inn).filter(o=>o.to===p.code).sort(ord)})),ov:o=>o.p===n&&(grp[o.to]||[]).length>1}}
  /* mostra por um instante uma peça escondida (slide inativo ou vista fechada) para medir; devolve a função que desfaz.
     Tudo acontece na mesma tarefa, sem pintura no meio (usado no BOOT, na impressão e ao entrar no slide) */
  function reveal(el){const undo=[];for(let e=el;e&&e!==document.body;e=e.parentElement){if(getComputedStyle(e).display!=="none")continue;
      const v=e.style.getPropertyValue("display"),pr=e.style.getPropertyPriority("display");e.style.setProperty("display",e.classList.contains("body")?"flex":"block","important");
      undo.push(()=>{if(v)e.style.setProperty("display",v,pr);else e.style.removeProperty("display")})}
    return()=>undo.reverse().forEach(f=>f())}
  const whenFonts=f=>{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>safe(f));};
  /* seletor segmentado num lugar marcado (.pp-ctl / .ba-ctl) ou no topo da vista */
  function ctlFor(sec,host,cls,n){let c=sec.querySelector(`.${cls}[data-pillar="${n}"]`);if(c)return c;c=H("div",{class:`${cls} in`});host.prepend(c);return c}

  /* =================================================================
     VISTA 1 · serviços de hoje → cartas de produto (Hoje · Produtos · Com IA)
     ================================================================= */
  function flow(host){
    const n=+host.dataset.pillar,pl=PILLARS[n-1],sec=host.closest(".slide"),key=keyOf(sec),C=pcfgP(n);
    const{own,inn,outs,rows,ps,ov}=svcs(n);
    const xr=outs.map(o=>({o,d:PBY(o.to)}));
    const lead=sec.querySelector(".pp-lead");if(lead)lead.textContent=pl.def;   /* cabeçalho antigo (V5) */
    const fromTx=p=>{const L=own.concat(inn).filter(o=>o.to===p.code);return L.length?`Nasce de ${L.map(o=>`<span class="nwr">${o.n}${o.p!==n?` (Pilar ${o.p})`:""}</span>`).join(" + ")}`:"Produto novo, criado com IA"};
    const svHTML=o=>{const d=PBY(o.to),fo=o.p!==n,mv=d.pillar!==n;
      const dec=fo?`${DEC[o.d]} · vem do Pilar ${o.p}`:mv?(o.d==="cut"?`Deixa de ser vendido sozinho · vai para o Pilar ${d.pillar}`:`${DEC[o.d]} · muda para o Pilar ${d.pillar}`):DEC[o.d];
      const th=tl("Decisão",dec)+tl("Vira",`${d.code} ${d.name}${mv?` · Pilar ${d.pillar}`:""}`)+tl("Por quê",whyOf(n,o));
      return `<a class="pl-sv ${o.d}${fo?" in":""}${mv?" out":""}${ov(o)?" ov":""}" href="#p=${d.id}" data-pd="${d.id}" data-id="${o.id}" data-code="${d.code}" data-tv="${att(o.n)}" data-th="${att(th)}"><i class="pl-dot"></i><span class="pl-svn">${o.n}</span>${ov(o)?'<b class="pl-ovk" aria-hidden="true"></b>':""}${fo?`<em class="pl-tag">Pilar ${o.p}</em>`:mv?`<em class="pl-tag">→ Pilar ${d.pillar}</em>`:""}</a>`};
    const nsrc=p=>own.concat(inn).filter(o=>o.to===p.code).length;
    const card=(p,i)=>`<a class="pl-card st-${p.st}${p.sig?" sig":""}" href="#p=${p.id}" data-pd="${p.id}" data-code="${p.code}" style="--i:${i}" aria-label="${att(p.code+" "+p.name)}: abrir a ficha">
      <span class="pl-in">
        <span class="pl-face pl-back" aria-hidden="true"><span class="pl-bk-c">${p.code}</span><span class="pl-bk-n">${p.name}</span><span class="pl-bk-l">produto proposto</span></span>
        <span class="pl-face pl-front">
          <span class="pl-art">${picoSvg(p.code,3+i)}<span class="pl-pips" aria-hidden="true">${p.st==="new"?"<i class='nw'></i>":Array.from({length:Math.min(nsrc(p),6)},()=>"<i></i>").join("")}</span></span>
          <span class="pl-main">
            <span class="pl-h"><b class="pl-code">${p.code}</b><b class="pl-nm">${p.name}</b>${p.sig?'<span class="pl-sig">★ A&amp;M Signature</span>':""}${stTag(p.st)}</span>
            <span class="pl-tl">${p.tagline}</span>
            <span class="pl-from">${fromTx(p)}</span>
          </span>
          <span class="pl-ia"><i>${IAL[p.st]||"IA no método"}</i><span>${nw(iaOf(n,p))}</span></span>
          <span class="pl-more" aria-hidden="true">ficha ›</span>
        </span>
      </span></a>`;
    const xf=r=>`<a class="pl-xf${r.o.d==="cut"?" cut":""}" href="#p=${r.d.id}" data-pd="${r.d.id}" data-code="${r.d.code}" data-sv="${r.o.id}"><span class="pl-xa">→</span><b>${r.d.code}</b><span class="pl-xn">${r.d.name}</span><em>${r.o.d==="cut"?`absorvido no Pilar ${r.d.pillar} · ${PILLARS[r.d.pillar-1].name}`:`vai para o Pilar ${r.d.pillar} · ${PILLARS[r.d.pillar-1].name}`}</em></a>`;
    host.classList.add("pl-pp");
    host.innerHTML=`<div class="pl-flow" data-st="0"><svg class="pl-ln" aria-hidden="true"></svg><div class="pl-svs">${own.concat(inn).map(svHTML).join("")}</div><div class="pl-cards">${rows.map((r,i)=>card(r.p,i)).join("")}${xr.map(xf).join("")}</div></div>`;
    fixPaths(host);
    const hasX=outs.length||inn.length;
    const ctl=ctlFor(sec,host,"pp-ctl",n);
    ctl.innerHTML=`<div class="seg pl-seg"><button type="button" class="on" data-s="0">Hoje</button><button type="button" data-s="1">Produtos</button><button type="button" data-s="2">Com IA</button></div><div class="pl-leg"><span><b class="pl-ovk" aria-hidden="true"></b>sobreposição</span>${hasX?'<span><i class="lg-x"></i>outro pilar</span>':""}<span><i class="lg-ia"></i>IA no método</span></div>`;
    const seg=ctl.querySelector(".pl-seg"),cap=sec.querySelector(`.pp-cap[data-pillar="${n}"]`),notes=sec.querySelector(`.pp-notes[data-pillar="${n}"]`);
    if(notes)notes.innerHTML=`<span class="label">O que muda</span>${pillarNotes(n).map(x=>`<span class="pl-note">${codeLink(x)}</span>`).join("")}`;
    const fl=host.querySelector(".pl-flow"),svg=fl.querySelector(".pl-ln");
    const svs=[...fl.querySelectorAll(".pl-sv")],cards=[...fl.querySelectorAll(".pl-card")],xfs=[...fl.querySelectorAll(".pl-xf")];
    const CD={},XF={};cards.forEach(e=>CD[e.dataset.code]=e);xfs.forEach(e=>XF[e.dataset.sv]=e);
    let L=null,cur=-1;
    /* ---- disposição (medida no palco, sem escala): coluna de serviços · faixa das ligações · cartas ---- */
    function lay(){const W=fl.clientWidth,Hh=fl.clientHeight;if(W<300||Hh<160)return false;
      svs.forEach(e=>e.style.width="");let wa=0;svs.forEach(e=>wa=Math.max(wa,e.offsetWidth));
      const WA=Math.ceil(Math.min(Math.max(wa,170),W*.36));svs.forEach(e=>e.style.width=WA+"px");
      const GZ=Math.round(clamp(W*.058,60,96)),XC=WA+GZ,CW=W-XC,nP=rows.length,nX=xr.length,GAP=6,XH=36;
      let CH=(Hh-nX*(XH+GAP)-(nP-1)*GAP)/nP;fl.classList.toggle("tight",CH<64);fl.classList.toggle("roomy",CH>=92);CH=Math.min(CH,134);
      const used=nP*CH+(nP-1)*GAP+nX*(XH+GAP);let y=Math.max(0,(Hh-used)/2);
      rows.forEach(r=>{Object.assign(CD[r.p.code].style,{left:XC+"px",top:y.toFixed(1)+"px",width:CW+"px",height:CH.toFixed(1)+"px"});r.y=y;r.h=CH;y+=CH+GAP});
      xr.forEach(r=>{Object.assign(XF[r.o.id].style,{left:XC+"px",top:y.toFixed(1)+"px",height:XH+"px"});r.y=y;r.h=XH;y+=XH+GAP});
      /* Hoje: os serviços do pilar na ordem do portfólio oficial, com folga igual */
      const SH=svs.length?svs[0].offsetHeight:28,M=own.length,pitch=Math.min(SH+16,(Hh-SH)/Math.max(1,M-1)),t0=(Hh-((M-1)*pitch+SH))/2,y0={},y1={};
      own.forEach((o,k)=>y0[o.id]=t0+k*pitch);inn.forEach(o=>y0[o.id]=null);
      /* Produtos: cada serviço ao lado da carta que ele vira, sem encostar no vizinho (empurra para baixo e, se faltar, para cima) */
      const SS=SH+5,it=[];
      rows.forEach(r=>{const m=r.L.length,c=r.y+r.h/2;r.L.forEach((o,j)=>it.push({id:o.id,y:c+(j-(m-1)/2)*SS-SH/2}))});
      xr.forEach(r=>it.push({id:r.o.id,y:r.y+r.h/2-SH/2}));
      it.sort((a,b)=>a.y-b.y);for(let i=1;i<it.length;i++)it[i].y=Math.max(it[i].y,it[i-1].y+SS);
      if(it.length){const ovf=it[it.length-1].y+SH-Hh;if(ovf>0){it[it.length-1].y-=ovf;for(let i=it.length-2;i>=0;i--)it[i].y=Math.min(it[i].y,it[i+1].y-SS)}
        if(it[0].y<-1)console.warn(`[pilares] Pilar ${n}: os serviços não cabem na altura da vista`)}
      it.forEach(q=>y1[q.id]=q.y);
      /* ligações serviço → carta (pontas espalhadas na borda da carta) */
      const links=[];
      rows.forEach(r=>{const m=r.L.length,c=r.y+r.h/2,sp=Math.min(8,(r.h-18)/Math.max(1,m));r.L.forEach((o,j)=>links.push({sv:o.id,code:r.p.code,k:o.p!==n?"x":o.d==="cut"?"c":"s",ai:r.p.st!=="keep",a:[WA,y1[o.id]+SH/2],b:[XC,c+(j-(m-1)/2)*sp]}))});
      xr.forEach(r=>links.push({sv:r.o.id,code:r.d.code,k:"x",ai:false,a:[WA,y1[r.o.id]+SH/2],b:[XC,r.y+r.h/2]}));
      L={W,H:Hh,WA,XC,y0,y1,links};draw();place(true);return true}
    function draw(){svg.setAttribute("viewBox",`0 0 ${L.W} ${L.H}`);svg.setAttribute("width",L.W);svg.setAttribute("height",L.H);svg.innerHTML="";
      L.links.forEach((l,i)=>{const[x1,y1]=l.a,[x2,y2]=l.b,xm=(x1+x2)/2,d=`M${x1} ${y1.toFixed(1)}C${xm} ${y1.toFixed(1)} ${xm} ${y2.toFixed(1)} ${x2} ${y2.toFixed(1)}`;
        const g=S("g",{class:`pl-e k-${l.k}${l.ai?" ai":""}`,"data-code":l.code,"data-sv":l.sv,style:`--i:${i}`},svg);
        S("path",{d,class:"pl-eb",pathLength:1},g);if(l.ai)S("path",{d,class:"pl-ef"},g);S("circle",{cx:x2,cy:y2.toFixed(1),r:3,class:"pl-ed"},g)})}
    function place(inst){if(!L)return;const st=Math.max(0,cur);
      svs.forEach(e=>{const id=e.dataset.id,yy=st===0?L.y0[id]:L.y1[id],off=yy==null;if(inst)e.style.transition="none";
        e.style.transform=`translate(0,${(off?L.y1[id]:yy).toFixed(1)}px)`;e.classList.toggle("off",off);if(inst){void e.offsetWidth;e.style.transition=""}})}
    function ensure(){if(L&&fl.clientWidth===L.W&&fl.clientHeight===L.H)return true;if(fl.clientWidth)return lay();const undo=reveal(fl);let ok=false;try{ok=lay()}finally{undo()}return ok}
    function to(st,inst){st=clamp(st,0,2);ensure();const fast=inst||REDMO;cur=st;
      if(fast)fl.style.setProperty("--tm","0");fl.dataset.st=st;host.dataset.st=st;place(fast);
      seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",+b.dataset.s===st));segSync(seg);
      if(cap){const t=(C.cap||[])[st]||"";cap.innerHTML=t;cap.classList.toggle("on",!!t)}
      if(fast){void fl.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>fl.style.removeProperty("--tm")))}}
    /* foco: carta ↔ serviços de origem ↔ ligações */
    function focus(code){fl.classList.toggle("foc",!!code);
      cards.concat(xfs).concat(svs).forEach(e=>e.classList.toggle("hot",!!code&&e.dataset.code===code));
      svg.querySelectorAll(".pl-e").forEach(g=>g.classList.toggle("hot",!!code&&g.dataset.code===code))}
    cards.concat(xfs).concat(svs).forEach(e=>{e.addEventListener("mouseenter",()=>{if(cur>0)focus(e.dataset.code)});e.addEventListener("mouseleave",()=>focus(null))});
    seg.querySelectorAll("button").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();to(+b.dataset.s)}));
    whenFonts(()=>{L=null;if(fl.clientWidth)lay()});
    to(0,true);
    const G=PPG[n]={to,focus,seg,ensure,get cur(){return cur},stop(){},enter(){to(0,true)}};
    /* duas vistas: ENTER, passos e a demonstração do divisor quando a vista 2 aparece */
    const panes=[...sec.querySelectorAll(":scope > .body.pane")],v2=panes.find(p=>p.querySelector(".bap"));
    const demo=()=>{const B=BAPX[n];if(B)B.demo()};
    const mo=new MutationObserver(ms=>ms.forEach(m=>{const el=m.target,was=(m.oldValue||"").split(/\s+/).includes("on");if(!el.classList.contains("on")||was||!sec.classList.contains("active"))return;
      if(el===v2)demo();else{ensure();segSync(seg)}}));
    panes.forEach(p=>mo.observe(p,{attributes:true,attributeFilter:["class"],attributeOldValue:true}));
    G.onEnter=()=>{const Pn=PANE[key];ensure();if(!Pn||Pn.k===0){to(0,true);return}to(2,true);demo()};
    /* → avança Hoje → Produtos → Com IA e depois troca de vista; ← volta Com IA → Produtos → Hoje e então sai */
    G.onStep=d=>{const Pn=PANE[key];if(Pn&&Pn.panes[Pn.k]!==host.closest(".body"))return false;if(d>0&&cur<2){to(cur+1);return true}if(d<0&&cur>0){to(cur-1);return true}return false};
    return G}

  /* =================================================================
     VISTA 2 · antes e depois, linha a linha (divisor sobre duas camadas)
     camada Hoje (em cima, recortada do divisor para a direita): [o que se vende hoje + por que muda] [decisão do raio-X + destino]
     camada Proposta (embaixo):                                   [o que o cliente leva + IA]         [produto + o que muda]
     Em repouso (50%) aparecem as duas metades que importam: Hoje à esquerda, Proposta à direita.
     ================================================================= */
  function split(host){
    const n=+host.dataset.pillar,pl=PILLARS[n-1],sec=host.closest(".slide"),C=pcfgP(n),BA=C.ba||{};
    const{own,inn,outs,rows,ps}=svcs(n);
    const chip=o=>`<span class="pl-chip ${o.d}${o.p!==n?" in":""}">${o.n}${o.p!==n?`<i>Pilar ${o.p}</i>`:""}</span>`;
    const decs=L=>[...new Set(L.map(o=>o.p!==n?"Vem de outro pilar":DEC[o.d]))].map(t=>`<span class="pl-dc">${t}</span>`).join("");
    const gets=p=>(p.deliv||[]).slice(0,2).map(x=>`<span>${icoSvg("check",0)}${strip(x)}</span>`).join("");
    const R=[];
    rows.forEach(r=>{const p=r.p,b=BA[p.code]||[],prim=r.L.find(o=>o.d!=="merge"&&o.d!=="cut"&&o.p===n)||r.L[0];
      R.push({ha:`<div class="pl-chips">${r.L.length?r.L.map(chip).join(""):'<span class="pl-chip none">Não existe hoje</span>'}</div><p class="pl-why">${nw(b[0]||(prim?whyOf(n,prim):strip((p.pain||[])[0]||"")))}</p>`,
        hb:`<div class="pl-dcs">${r.L.length?decs(r.L):'<span class="pl-dc nw">Produto novo</span>'}</div><p class="pl-go">Vira <b>${p.code} ${p.name}</b></p>`,
        pa:`<div class="pl-gets">${gets(p)}</div><p class="pl-iaq"><b>${IAL[p.st]||"IA"}</b>${nw(iaOf(n,p))}</p>`,
        pb:`<a class="pl-pn" href="#p=${p.id}" data-pd="${p.id}"><b class="pl-pc">${p.code}</b><b class="pl-pnm">${p.name}</b>${p.sig?'<span class="pl-sig">★ A&amp;M Signature</span>':""}${stTag(p.st)}</a><p class="pl-chg">${nw(b[1]||p.tagline)}</p>`})});
    outs.forEach(o=>{const d=PBY(o.to),b=BA[d.code]||[],dp=PILLARS[d.pillar-1];
      R.push({x:1,ha:`<div class="pl-chips">${chip(o)}</div><p class="pl-why">${nw(b[0]||whyOf(n,o))}</p>`,
        hb:`<div class="pl-dcs"><span class="pl-dc">${o.d==="cut"?"Deixa de ser vendido sozinho":"Muda de pilar"}</span></div><p class="pl-go">Vai para <b>${d.code} ${d.name}</b> · Pilar ${d.pillar}</p>`,
        pa:`<div class="pl-gets"><span class="pl-out">Sai do Pilar ${n}</span></div><p class="pl-iaq"><b>Pilar ${d.pillar}</b>${dp.name}</p>`,
        pb:`<a class="pl-pn x" href="#p=${d.id}" data-pd="${d.id}"><span class="pl-xa">→</span><b class="pl-pc">${d.code}</b><b class="pl-pnm">${d.name}</b><span class="pl-pil">Pilar ${d.pillar}</span></a><p class="pl-chg">${b[1]||`${o.d==="cut"?"Absorvido":"Muda"} no Pilar ${d.pillar} · ${dp.name}`}</p>`})});
    const nk=ps.length,ns=own.length;
    const hd={ha:`<span class="pl-k a">Hoje</span><span class="pl-kt">${ns} serviços · o que se vende e por que muda</span>`,hb:`<span class="pl-kt">Decisão do raio-X e destino</span>`,
      pa:`<span class="pl-kt">O que o cliente leva · IA no método</span>`,pb:`<span class="pl-k b">Proposta</span><span class="pl-kt">${nk} produtos · o que muda</span>`};
    const cell=(c,k,x)=>`<div class="c ${k}${x?" x":""}"><div class="ci">${c}</div></div>`;
    const grid=(a,b)=>`<div class="pl-g"><div class="c hd ${a}"><div class="ci">${hd[a]}</div></div><div class="c hd ${b}"><div class="ci">${hd[b]}</div></div>${R.map(r=>cell(r[a],a,r.x)+cell(r[b],b,r.x)).join("")}</div>`;
    host.classList.add("pl-bap");
    host.innerHTML=`<div class="ba pl-ba"><div class="ba-layer ba-tobe pl-tobe">${grid("pa","pb")}</div><div class="ba-layer ba-asis pl-asis">${grid("ha","hb")}</div></div>`;
    fixPaths(host);
    const box=host.querySelector(".pl-ba"),ctl=ctlFor(sec,host,"ba-ctl",n);
    ctl.innerHTML=`<div class="seg pl-bseg"><button type="button" data-v="100">Hoje</button><button type="button" data-v="50" class="on">Lado a lado</button><button type="button" data-v="0">Proposta</button></div>`;
    const sg=ctl.querySelector(".pl-bseg");let lastOn="";
    const ba=BeforeAfter(box,{rest:50,l:"",r:"",onMove:x=>{box.style.setProperty("--x",x+"%");box.classList.toggle("h-on",x>74);box.classList.toggle("p-on",x<26);
      let k="";sg.querySelectorAll("button").forEach(b=>{const on=Math.abs(+b.dataset.v-x)<3;b.classList.toggle("on",on);if(on)k=b.dataset.v});if(k!==lastOn){lastOn=k;segSync(sg)}}});
    BAS[n]=ba;
    sg.querySelectorAll("button").forEach(b=>b.onclick=e=>{e.stopPropagation();ba.tween(+b.dataset.v,800)});
    /* linhas com a mesma altura nas duas camadas (a mais alta manda) e a sobra repartida, sem rolagem */
    const g1=box.querySelector(".pl-asis .pl-g"),g2=box.querySelector(".pl-tobe .pl-g");let fitK="";
    function fit(){const H0=g1.clientHeight;if(!H0)return false;const k=H0+"x"+g1.clientWidth;if(k===fitK)return true;
      [g1,g2].forEach(g=>{g.style.gridTemplateRows="";g.classList.remove("tight")});
      const nat=c=>{const cs=getComputedStyle(c);return c.firstElementChild.offsetHeight+parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom)+parseFloat(cs.borderTopWidth)+parseFloat(cs.borderBottomWidth)};
      const meas=()=>{const a=[...g1.children],b=[...g2.children],hs=[];for(let i=0;i<a.length;i+=2)hs.push(Math.ceil(Math.max(nat(a[i]),nat(a[i+1]),nat(b[i]),nat(b[i+1]))));return hs};
      let hs=meas();const gap=parseFloat(getComputedStyle(g1).rowGap)||0,pad=parseFloat(getComputedStyle(g1).paddingTop)+parseFloat(getComputedStyle(g1).paddingBottom);
      let room=H0-pad-gap*(hs.length-1)-hs.reduce((s,h)=>s+h,0);
      if(room<0){[g1,g2].forEach(g=>g.classList.add("tight"));hs=meas();room=H0-pad-gap*(hs.length-1)-hs.reduce((s,h)=>s+h,0);if(room<0)console.warn(`[pilares] Pilar ${n}: o antes e depois não cabe na altura da vista`)}
      const add=Math.max(0,room)/Math.max(1,hs.length-1),tpl=hs.map((h,i)=>(i?h+add:h).toFixed(1)+"px").join(" ");
      [g1,g2].forEach(g=>g.style.gridTemplateRows=tpl);fitK=k;return true}
    function ensure(){if(box.clientWidth)return fit();const undo=reveal(box);let ok=false;try{ok=fit()}finally{undo()}fitK="";return ok}
    whenFonts(()=>{fitK="";if(box.clientWidth)fit()});
    const B=BAPX[n]={ba,sg,ensure,set:x=>ba.set(x),demo(){fitK="";ensure();ba.demo()}};
    ensure();ba.set(50);
    return B}

  /* =================================================================
     CLIENTE · matriz "quem decide", mercado, onde a DTS ganha, posicionamento (+ peças V5)
     ================================================================= */
  function quem(h){const n=+h.dataset.pillar,Q=pcfgC(n).quem;if(!Q||!Q.length)return;
    h.classList.add("pl-quem");h.style.setProperty("--qn",Q.length);
    h.innerHTML=`<div class="pl-qh"><span>Quem decide</span><span>A pergunta que o cliente faz</span><span>O gatilho</span><span>O que mostra que a dor é real</span><span>Quem responde</span></div>`+
      Q.map((q,i)=>{const f=q.f?FATO(q.f):null;return `<div class="pl-qr" data-k="${i}">
        <div class="pl-q1"><b>${q.r}</b>${q.d?`<span>${q.d}</span>`:""}</div>
        <div class="pl-q2"><p>${nw(q.q)}</p></div>
        <div class="pl-q3">${icoSvg("pulse",0)}<p>${nw(q.g)}</p></div>
        <div class="pl-q4">${q.f?`<span class="pl-qv">${q.fq?`<small>${q.fq}</small>`:""}<span data-fato="${q.f}"></span></span><span class="pl-qt">${nw(q.ft||(f?f.txt:""))}<em>${fatoSrc(q.f)}</em></span>`:""}</div>
        <div class="pl-q5">${(q.p||[]).map(c=>plink(c,"sm")).join("")}</div></div>`}).join("");
    fixPaths(h);
    const rs=[...h.querySelectorAll(".pl-qr")];let k=-1;
    const set=j=>{k=j;h.classList.toggle("foc",j>=0);rs.forEach((r,i)=>r.classList.toggle("on",i===j))};
    rs.forEach((r,i)=>{r.addEventListener("mouseenter",()=>{if(k<0)h.classList.add("hov");r.classList.add("hv")});r.addEventListener("mouseleave",()=>{h.classList.remove("hov");r.classList.remove("hv")})});
    PRINT.push(()=>set(-1));
    if(!h.hasAttribute("data-steps"))return;
    const sec=h.closest(".slide"),key=keyOf(sec),pane=h.closest(".body");
    const mine=()=>{const P=paneOf(sec);return !P||P.panes[P.k]===pane};
    const bE=ENTER[key],bS=STEP[key];
    ENTER[key]=()=>{set(-1);if(bE)bE()};
    STEP[key]=d=>{if(bS&&bS(d))return true;if(!mine())return false;
      if(d>0){if(k<rs.length-1){set(k+1);return true}set(-1);return false}
      if(k>=0){set(k-1);return true}return false};
    document.addEventListener("deck:pane",e=>{if(e.detail&&e.detail.key===key)set(-1)})}
  function mk(t){const C=pcfgC(t.dataset.mk),rows=C.mk;if(!rows)return;const heat=C.heat||[];
    const R=rows.map(r=>Array.isArray(r)?{f:r[0],o:r[1],ia:r[2],l:r[3]}:r);
    const hasO=R.some(r=>r.o),hasP=R.some(r=>r.p&&r.p.length),hasH=!hasP&&heat.length>0;
    t.classList.add("pl-mk");
    t.innerHTML=`<thead><tr><th class="c-f">Quem</th>${hasO?"<th class=\"c-o\">Como chamam a oferta</th>":""}<th class="c-i">O que já faz com IA</th><th class="c-l">O que isso muda para a DTS</th>${hasP?'<th class="c-p">Disputa com</th>':""}${hasH?'<th class="c-h">Sobreposição</th>':""}</tr></thead>
      <tbody>${R.map((r,i)=>`<tr><td class="c-f"><b>${r.f}</b></td>${hasO?`<td class="c-o">${r.o||""}</td>`:""}<td class="c-i">${nw(r.ia)}</td><td class="c-l">${nw(r.l)}</td>${hasP?`<td class="c-p">${(r.p||[]).map(c=>pcode(c,"sm")).join("")}</td>`:""}${hasH?`<td class="c-h">${HEATL[heat[i]]?`<span class="heat" style="background:${HEATL[heat[i]][1]}">${HEATL[heat[i]][0]}</span>`:""}</td>`:""}</tr>`).join("")}</tbody>`}
  function ws(h){const w=pcfgC(h.dataset.pillar).ws;if(!w)return;const th=Array.isArray(w.th)?w.th[0]:w.th;
    h.classList.add("pl-wsw");
    h.innerHTML=`<div class="pl-ws"><div class="eye">Onde a DTS ganha</div>${(w.it||[]).map(([t,x,c],i)=>`<div class="pl-wsi"><span class="n">${i+1}</span><div class="pl-wsb"><div class="pl-wst"><b>${t}</b>${c?pcode(c,"sm dk"):""}</div><p>${nw(x)}</p></div></div>`).join("")}</div>
      ${th?`<div class="pl-th"><div class="eye">Ameaça a monitorar</div><p>${nw(th)}</p></div>`:""}`}
  function cliente(){
    document.querySelectorAll(".quem[data-pillar]").forEach(h=>safe(quem,h));
    document.querySelectorAll("table.mk[data-mk]").forEach(t=>safe(mk,t));
    document.querySelectorAll(".ws[data-pillar]").forEach(h=>safe(ws,h));
    document.querySelectorAll(".pos[data-pos]").forEach(h=>{const P=pcfgC(h.dataset.pos).pos;if(!P)return;h.innerHTML=`<div class="t">Posicionamento proposto</div><p>${P}</p>`});
    /* peças V5 (pilares ainda não reescritos) */
    document.querySelectorAll(".persona[data-pillar]").forEach(h=>{const L=pcfgC(h.dataset.pillar).pers;if(!L)return;h.innerHTML="";
      L.forEach(([r,q,ps])=>{const d=H("div",{class:"pers"},h);d.innerHTML=`<div class="r">${r}</div><div class="q">“${q}”</div><div class="pq">${(ps||[]).map(c=>plink(c,"sm")).join(" ")}</div>`})});
    document.querySelectorAll(".jr-wrap[data-pillar]").forEach(h=>{const J=pcfgC(h.dataset.pillar).jr;if(!J)return;
      h.innerHTML=`<span class="ttl">Jornada comercial do pilar · entrada → expansão → recorrência</span><div class="jr">${J.map(([k,t,ps,x],i)=>`<div class="jr-i ${i===0?"l":i===J.length-1?"r":""}"><div class="k">${k}</div><b>${t}</b><div class="jr-c">${(ps||[]).map(c=>pcode(c,"sm")).join("")}</div><p>${x}</p></div>`).join("")}</div>`})}
  return{flow,split,cliente,svcs,reveal}
})();

/* nomes da fundação (CONTRACT §9) */
function renderPP(host){return PILARX.flow(host)}
function renderBAP(host){return PILARX.split(host)}
function renderCliente(){return PILARX.cliente()}
/* frase do estado "Com IA" (V5; mantida para quem a usa) */
function ppCapAI(n){const ps=PRODUCTS.filter(p=>p.pillar===n),a=ps.filter(p=>p.st==="ai").length,k=ps.filter(p=>p.st==="keep"),nw=ps.filter(p=>p.st==="new");
  return`${nw.map(p=>`O novo ${p.name} (${p.code})`).join(" e ")} e ${a>1?`os ${a} produtos aprimorados`:"o produto aprimorado"} com IA acendem${k.length?`; ${k.map(p=>"o "+p.code).join(" e ")} ${k.length>1?"mantêm":"mantém"} a essência, com IA de apoio`:""}.`}

/* impressão: produtos em "Com IA"; antes e depois dos pilares com o divisor no meio; o slide 8 (chave "hb") sai na "Proposta" */
PRINT.push(()=>{Object.values(PPG).forEach(G=>safe(()=>G.to(2,true)));
  Object.entries(BAS).forEach(([k,b])=>safe(()=>{if(k==="hb"){b.set(0);return}const B=BAPX[k];if(B)B.ensure();b.set(50)}))});

/* ---------- ganchos dos slides de produtos (registrados na carga; a vista nasce no boot) ---------- */
document.querySelectorAll(".pp[data-pillar]").forEach(host=>{const n=+host.dataset.pillar,k=keyOf(host.closest(".slide"));
  ENTER[k]=()=>{const G=PPG[n];if(G&&G.onEnter)G.onEnter()};
  STEP[k]=d=>{const G=PPG[n];return G&&G.onStep?G.onStep(d):false}});

/* ---------- boot: tudo o que depende de PCFG ----------
   Dados de produto ausentes ou incompletos (src/data/1N-produtos-pN.js falta ou está em edição): aviso discreto no lugar da vista */
const ppData=n=>typeof PRODUCTS!=="undefined"&&PRODUCTS.some(p=>p.pillar===n)&&(typeof OLD==="undefined"||OLD.filter(o=>o.p===n).every(o=>PBY(o.to)));
function ppMissing(host,n){host.innerHTML=`<div class="pp-miss">Produtos do Pilar ${n} em atualização · dados em src/data/1${n}-produtos-p${n}.js</div>`;
  console.warn(`[pilares] Pilar ${n}: produtos ausentes ou incompletos no registro (src/data/1${n}-produtos-p${n}.js); a vista foi desenhada sem eles`)}
BOOT.push(()=>{document.querySelectorAll(".bap[data-pillar]").forEach(h=>{const n=+h.dataset.pillar;if(!ppData(n))return ppMissing(h,n);safe(renderBAP,h)});
  document.querySelectorAll(".pp[data-pillar]").forEach(h=>{const n=+h.dataset.pillar;if(!ppData(n))return ppMissing(h,n);safe(renderPP,h)});
  safe(renderCliente)});

/* ---------- abertura de pilar (divisória): os números do pilar ----------
   A frente "capas" (src/js/28-capas.js) redesenha as divisórias e pode trocar CHAPX[nn]; esta versão fica como reserva,
   sem a "bola" (forma fluida) e sem nome novo de pilar (SPEC §2.1 e auditoria T18) */
Object.entries(typeof CAPITULOS!=="undefined"?CAPITULOS:{}).forEach(([k,m])=>{if(!m.pilar)return;const n=m.pilar;
  CHAPX[k]=host=>{const pl=PILLARS[n-1],ps=PRODUCTS.filter(p=>p.pillar===n),ai=ps.filter(p=>p.st!=="keep").length,nw=ps.filter(p=>p.st==="new"),sg=ps.filter(p=>p.sig);
    host.classList.add("pil");const tx=host.querySelector(".ch-txt");if(!tx)return;const h=tx.querySelector(".ch-h");if(h)h.style.fontSize=(pl.name.length>22?72:pl.name.length>14?88:100)+"px";
    tx.insertAdjacentHTML("beforeend",`<div class="pc-kpis" data-a="up" style="--d:7"><div><b>${pl.was} → ${pl.now}</b><span>serviços → produtos</span></div><div><b class="o">${ai}/${pl.now}</b><span>com IA no método</span></div><div><b>${nw.length}</b><span>produto novo</span></div></div>
      <div class="pc-pills" data-a="fade" style="--d:9">${nw.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" class="new holo" title="Produto novo com IA">✦ Novo · ${p.name}</a>`).join("")}${sg.map(p=>`<a href="#p=${p.id}" data-pd="${p.id}" title="A&amp;M Signature">★ ${p.name}</a>`).join("")}</div>`);
    host.insertAdjacentHTML("beforeend",`<svg class="pc-morph" viewBox="0 0 640 640" aria-hidden="true"></svg><div class="pc-states"></div>`);
    const mp=MorphScene(host.querySelector(".pc-morph"),{btnHost:host.querySelector(".pc-states"),states:[
      {shape:"square",big:String(pl.was),lab:"SERVIÇOS HOJE",sub:"vendidos um a um, sob medida",dots:pl.was,btn:"Hoje"},
      {shape:"hex",big:String(pl.now),lab:"PRODUTOS",sub:"escopo, método e formato",dots:pl.now,btn:"Produtos"},
      {shape:"circle",big:`${ai}/${pl.now}`,lab:"COM IA NO MÉTODO",sub:"IA no método, dados no centro",dots:pl.now,ai,btn:"Com IA"}]});
    mp.play();return()=>mp.pause()}});
