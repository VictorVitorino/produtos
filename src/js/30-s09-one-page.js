/* =====================================================================
   SLIDE 09 · One-page · dono: portfolio
   Os 24 produtos como um sistema: uma coluna por pilar (a decisão do cliente que ele responde), cartas de produto
   (o código tem a cor do status; ★ = A&M Signature; os novos com IA têm brilho), fio conector de cada pilar até a
   base comum, a "Plataforma de Dados e AI". Cada carta abre a ficha; passar o cursor acende o pilar e os produtos com
   que ela se encaixa (campo "Encaixe" das fichas). "Nome de hoje" mostra de qual serviço cada produto nasce.
   Ganchos: ENTER["09"] (desenha os conectores), STEP["09"] (→ spotlight P1…P4 e a base),
   PRINT (estado estático + páginas extras: "Nome de hoje" e a leitura de cada pilar).
   Sem números novos: contagens calculadas de PRODUCTS e OLD. As variáveis da V5 (ORG, ORGT, pillarFlow) saíram do escopo global.
   ===================================================================== */
(function(){const KEY="09",sec=SL(KEY);if(!sec||typeof PILLARS==="undefined")return;
  const PR=typeof PRODUCTS!=="undefined"?PRODUCTS:[],OL=typeof OLD!=="undefined"?OLD:[];
  const host=$("s09Host"),svg=$("s09Svg"),cols=$("s09Cols"),base=$("s09Base"),om=$("s09Mode"),sg=$("s09Seg");
  const esc2=t=>String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  const DN={"TMO":"Transformation Management Office"};const nmOf=o=>DN[o.n]||o.n;
  const live=c=>OL.filter(x=>x.to===c&&x.d!=="cut"),absd=c=>OL.filter(x=>x.to===c&&x.d==="cut");
  /* módulos dentro de um produto (decisão de 30/10/2026: a automação agêntica de processos é módulo do 2.6, não um 25º produto) */
  const MOD={"2.6":"inclui o módulo de automação agêntica de processos"};
  /* nome de hoje: de qual serviço oficial cada produto nasce */
  const orig=p=>{if(p.st==="new"){const a=absd(p.code);return MOD[p.code]?`novo · ${MOD[p.code]}`:a.length?`novo · absorve o ${a.map(nmOf).join(" e ")} como ativo interno`:"novo · produto criado com IA"}
    const os=live(p.code).sort((a,b)=>(a.d==="merge")-(b.d==="merge")),nm=o=>nmOf(o)+(o.p!==p.pillar?` (Pilar ${o.p})`:"");
    /* dois nomes com a mesma raiz ("X (Buy Side)" e "X (Sell Side)") viram "X (Buy Side e Sell Side)" */
    const m2=os.length===2&&os.map(o=>nm(o).match(/^(.*) \((.*)\)$/));
    if(m2&&m2[0]&&m2[1]&&m2[0][1]===m2[1][1])return`de ${m2[0][1]} (${m2[0][2]} e ${m2[1][2]})`;
    return os.length>2?`de ${os.slice(0,-1).map(nm).join(", ")} e ${nm(os[os.length-1])}`:`de ${os.map(nm).join(" + ")}`};
  /* encaixes descritos nas fichas (meta "Encaixe: …"): os códigos citados viram vizinhos da carta */
  const mates=p=>{const m=(p.meta||[]).find(x=>/^Encaixe:/i.test(String(x)));return m?[...new Set((String(m).match(/\b[1-4]\.[1-7]\b/g)||[]).filter(c=>c!==p.code&&PBY(c)))]:[]};
  /* a decisão do cliente que cada pilar responde (verbo do slide 04) e a leitura do pilar */
  const DEC={1:["Decidir","onde investir em tecnologia e IA"],2:["Executar","o programa no prazo e no valor"],3:["Transacionar","da assinatura à saída"],4:["Modernizar","o legado sem parar a operação"]};
  const LEIT={
    1:{d:"Onde investir em tecnologia e IA, quanto isso devolve e quem responde pelo resultado.",
       s:"; a resiliência vai para o Pilar 4",
       c:"O 1.1 diz o que decidir e abre 1.2, 1.4 e 1.5; o 1.2 vira plano e abre o 1.7; o 1.3 assume o cargo; o 1.6 transforma desenvolvimento em benefício fiscal."},
    2:{d:"Como entregar o programa crítico de tecnologia no prazo e no valor prometido.",
       s:"; o IT Business Partner passa ao 1.3",
       c:"O 2.1 escolhe o fornecedor, o 2.2 prepara a virada fiscal e do ERP, o 2.3 avisa antes do atraso, o 2.4 resgata, o 2.5 faz usar e o 2.6 leva a IA à própria TI.",
       n:"Da escolha (2.1) ao uso medido (2.5), com alerta antes do atraso (2.3) e resgate (2.4)."},
    3:{d:"O que a tecnologia muda no preço, no primeiro dia e na saída do investimento.",
       s:"; o playbook vira ativo interno do 3.5",
       c:"O 3.1 entra antes da assinatura e abre o 3.2; o 3.3 comanda o primeiro dia e a transição; o 3.4 segue até a venda; o 3.5 acompanha todas as empresas do fundo."},
    4:{d:"Que rota o legado segue e como migrar sem parar a operação.",
       s:"; a resiliência chega do Pilar 1 como 4.5",
       c:"O 4.6 e o 4.1 mostram a rota, o 4.2 e o 4.3 liberam orçamento, o 4.4 revisa a virada e o 4.5 testa a crise antes que ela chegue.",
       n:"O 4.6 e o 4.1 mostram a rota; o 4.2 e o 4.3 liberam orçamento; o 4.4 revisa a virada."}};
  /* a base comum (a construir) e a ferramenta da A&M global (a confirmar para o Brasil) */
  const BASE_NEW=["Diagnóstico padrão","Base de comparação","Radar de gastos","Biblioteca de agentes","IA generativa em ambiente seguro"];
  const PLAT=[["O que é","A base que cada produto reutiliza: diagnóstico padrão, base de comparação, radar de gastos, biblioteca de agentes e IA generativa em ambiente seguro."],
    ["Por que importa","É o que deixa o método repetível de um cliente para o outro, em vez de recomeçar a cada proposta."],
    ["O que falta","Quase tudo está a construir; o A&amp;M Assist, da A&amp;M global, depende de confirmação para uso no Brasil."]];

  const ROWS=Math.max(...PILLARS.map(pl=>PR.filter(p=>p.pillar===pl.n).length),1);
  const nst=k=>PR.filter(p=>p.st===k).length,SIG=PR.filter(p=>p.sig);
  $("s09Leg").innerHTML=["keep","ai","new"].map(k=>`<span><i class="s09-sw ${k}"></i>${STATUS[k][0]} <b>${nst(k)}</b></span>`).join("")+
    `<span class="s09-sgl"><i class="s09-st">★</i>A&amp;M Signature <b>${SIG.length}</b>: onde o direito de vencer da A&amp;M é maior</span>`;

  /* colunas por pilar: cabeçalho (decisão do cliente) + cartas; linhas livres com o encadeamento do pilar */
  PILLARS.forEach(pl=>{const ps=PR.filter(p=>p.pillar===pl.n),own=OL.filter(o=>o.p===pl.n).length,[vb,dt]=DEC[pl.n]||["",""];
    const col=H("div",{class:"s09-col",id:"s09c"+pl.n,"data-a":"up",style:`--d:${1+pl.n}`},cols);
    col.innerHTML=`<div class="s09-hd"><div class="s09-r1"><span class="s09-pn">${pl.n}</span><b class="s09-pnm">${pl.name}</b><span class="s09-cnt">${own||pl.was} → ${ps.length}</span></div>
      <span class="s09-dec"><b><span class="v1">${vb}</span><span class="v2">Hoje</span></b><span class="v1">${dt}</span><span class="v2">${pl.official}</span></span></div>`;
    const list=H("div",{class:"s09-list",style:`--rows:${ROWS}`},col);
    ps.forEach((p,k)=>{const mt=mates(p);
      const th=`<span class="tl"><b>Proposta</b>${esc2(p.tagline||"")}</span><span class="tl"><b>${p.st==="new"?"Origem":"Nasce de"}</b>${esc2(orig(p).replace(/^de /,""))}</span>`+
        `<span class="tl"><b>Status</b>${STATUS[p.st][0]}${p.sig?" · ★ A&amp;M Signature":""}</span>${mt.length?`<span class="tl"><b>Encaixa com</b>${mt.join(", ")}</span>`:""}<span class="tl">Clique para abrir a ficha.</span>`;
      const a=H("a",{href:"#p="+p.id,"data-pd":p.id,"data-pl":pl.n,"data-code":p.code,"data-mt":mt.join(" "),class:`s09-t ${p.st}${p.sig?" sig":""}${p.st==="new"?" holo":""}`,style:`--hd:${(k*.7).toFixed(1)}s`,"data-tv":`${p.code} · ${p.name}`,"data-th":th},list);
      a.innerHTML=`<span class="s09-cd">${p.code}</span><span class="s09-tt"><span class="s09-nm">${p.name}${p.sig?'<i class="s09-sg" aria-label="A&amp;M Signature">★</i>':""}</span><span class="s09-tx"><span class="v1">${p.tagline||""}</span><span class="v2">${orig(p)}</span></span></span>`});
    if(ps.length<ROWS){const L=LEIT[pl.n]||{},n=H("div",{class:"s09-note",style:`grid-row:span ${ROWS-ps.length}`},list);
      n.innerHTML=`<span class="s09-nl">Como se encadeia</span><p>${codeLink(ROWS-ps.length>1?L.c:(L.n||L.c)||"")}</p>`}});

  /* a base: Plataforma de Dados e AI */
  base.innerHTML=`<div class="s09-bt"><span class="s09-bl">A base de todos os produtos</span><b>Plataforma de Dados e AI</b></div>
    <div class="s09-bg"><span class="s09-gl">A construir</span>${BASE_NEW.map(t=>`<span class="s09-chip">${t}</span>`).join("")}</div>
    <div class="s09-bg s09-bga"><span class="s09-gl">Da A&amp;M global</span><span class="s09-chip ext">A&amp;M Assist (a confirmar no Brasil)</span></div>`;
  base.dataset.tv="Plataforma de Dados e AI";base.dataset.th=PLAT.map(([k,v])=>`<span class="tl"><b>${k}</b>${v}</span>`).join("");

  /* nomes de produto numa linha: se a fonte de reserva for mais larga, a letra desce um pouco (até 14 px) */
  const fitNames=root=>(root||cols).querySelectorAll(".s09-nm").forEach(el=>{if(!el.offsetWidth)return;el.style.fontSize="";let fs=parseFloat(getComputedStyle(el).fontSize),g=0;
    while(el.scrollWidth>el.clientWidth+1&&fs>14&&g++<12){fs-=.5;el.style.fontSize=fs+"px"}});

  /* conectores: cada coluna desce até o fio laranja, e o fio se liga à base (coordenadas de layout, sem a escala do palco) */
  const CON={};let lit=0;
  function draw(){if(!host.offsetWidth)return;svg.innerHTML="";const W=host.offsetWidth,Hh=host.offsetHeight;svg.setAttribute("viewBox",`0 0 ${W} ${Hh}`);svg.setAttribute("width",W);svg.setAttribute("height",Hh);
    const b=rel(base,host),y=Math.round(b.y-11),ln=(x0,y0,x1,y1)=>`M ${x0} ${y0} L ${x1} ${y1}`;
    S("path",{d:ln(4,y,W-4,y),class:"s09-thread",id:"s09Thread",pathLength:1},svg);
    if(!REDMO)S("path",{d:ln(4,y,W-4,y),class:"s09-comet",pathLength:1},svg);
    PILLARS.forEach((pl,i)=>{const L=$("s09c"+pl.n);if(!L)return;const r=rel(L,host),x=Math.round(r.cx),y0=r.y+r.h;
      const c=S("path",{d:ln(x,y0,x,y),class:"s09-con",id:"s09Con"+pl.n,pathLength:1},svg);c.style.setProperty("--d",i);
      const f=S("path",{d:ln(x,y0,x,y),class:"s09-flow"},svg);f.style.setProperty("--d",i);
      const dt=S("circle",{cx:x,cy:y,r:4.5,class:"s09-dot",id:"s09Dot"+pl.n},svg);CON[pl.n]={c,f,dt}});
    const bc=S("path",{d:ln(b.cx,y,b.cx,b.y),class:"s09-con s09-cb",pathLength:1},svg);bc.style.setProperty("--d",5);
    CON.base={c:bc,f:S("path",{d:ln(b.cx,y,b.cx,b.y),class:"s09-flow"},svg),dt:S("circle",{cx:b.cx,cy:y,r:5.5,class:"s09-dot s09-hub"},svg)};
    st[st.length-1].capX=Math.round((W-420)/2);st[st.length-1].capY=Math.max(0,b.y-296);
    light(lit)}
  const tog=(o,on)=>{if(o){o.c.classList.toggle("on",on);o.f.classList.toggle("on",on);o.dt.classList.toggle("on",on)}};
  function light(n){lit=n;PILLARS.forEach(pl=>{const on=n==="all"||pl.n===n;const c=$("s09c"+pl.n);if(c)c.classList.toggle("hot",on);tog(CON[pl.n],on)});tog(CON.base,n==="all")}
  const rest=()=>light(!sp||sp.cur<0?0:sp.cur<4?sp.cur+1:"all");
  /* cursor numa carta: acende o pilar e os produtos com que ela se encaixa */
  const cards=[...cols.querySelectorAll(".s09-t")];
  const unmate=()=>{cols.classList.remove("mt");cards.forEach(x=>x.classList.remove("mate","me"))};
  cols.addEventListener("pointerover",e=>{if(sp.cur>=0)return;const t=e.target.closest(".s09-t");if(!t)return;light(+t.dataset.pl);
    const m=(t.dataset.mt||"").split(" ").filter(Boolean);cards.forEach(x=>{x.classList.toggle("mate",m.includes(x.dataset.code));x.classList.toggle("me",x===t)});cols.classList.toggle("mt",m.length>0)});
  cols.addEventListener("pointerout",e=>{const t=e.target.closest(".s09-t");if(t&&!t.contains(e.relatedTarget)){unmate();rest()}});
  cols.addEventListener("click",e=>{if(e.target.closest(".s09-t"))tipEl.classList.remove("on")},true);
  base.addEventListener("pointerenter",()=>{if(sp.cur<0)light("all")});base.addEventListener("pointerleave",rest);

  /* Proposta de valor | Nome de hoje */
  const setMode=m=>{om.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.m===m));segSync(om);sec.classList.toggle("s09-org",m==="o");requestAnimationFrame(()=>fitNames())};
  om.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.m)));

  /* spotlight: um passo por pilar e um para a base */
  const st=PILLARS.map(pl=>{const ps=PR.filter(p=>p.pillar===pl.n),nw=ps.filter(p=>p.st==="new"),sg2=ps.filter(p=>p.sig),L=LEIT[pl.n]||{},own=OL.filter(o=>o.p===pl.n).length||pl.was;
    return{sel:`#s09c${pl.n}`,btn:"Pilar "+pl.n,pad:6,title:`Pilar ${pl.n} · ${pl.name}`,
      text:`<span class="sl"><b>A decisão do cliente</b>${L.d||""}</span><span class="sl"><b>De serviços a produtos</b>${own} serviços viram ${ps.length} produtos${L.s||""}.</span><span class="sl"><b>Como se encadeia</b>${L.c||""}</span>`+
        (sg2.length?`<span class="sl"><b>★ A&amp;M Signature</b>${sg2.map(p=>`${p.code} ${p.name}`).join(" · ")}</span>`:"")+(nw.length?`<span class="sl"><b>Novo com IA</b>${nw.map(p=>`${p.code} ${p.name}${MOD[p.code]?`, que ${MOD[p.code]}`:""}`).join(" · ")}</span>`:"")}});
  st.push({sel:"#s09Base",btn:"Base",pad:6,title:"Plataforma de Dados e AI",text:PLAT.map(([k,v])=>`<span class="sl"><b>${k}</b>${v}</span>`).join("")});
  const sp=Spotlight(host,st,sg,{capW:420});segSync(sg);
  /* com o spotlight num passo, o que fica na penumbra não abre dica (cobriria a legenda); o clique na ficha continua */
  const mute=()=>[...cols.querySelectorAll("[data-tv],[data-tv0]"),base].forEach(t=>{const off=sp.cur>=0&&(t===base?sp.cur<4:sp.cur>3||!t.closest("#s09c"+(sp.cur+1)));
    if(off&&t.dataset.tv){t.dataset.tv0=t.dataset.tv;delete t.dataset.tv}else if(!off&&t.dataset.tv0){t.dataset.tv=t.dataset.tv0;delete t.dataset.tv0}});
  const spot=k=>{unmate();sp.set(k);rest();mute()};
  sg.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{unmate();rest();mute()}));
  ENTER[KEY]=()=>{lit=0;fitNames();draw();spot(goLast?st.length-1:-1);segSync(sg);segSync(om)};
  if(document.fonts)document.fonts.ready.then(()=>{if(slides[cur]===sec){fitNames();draw()}});
  STEP[KEY]=d=>{if(d>0){if(sp.cur<st.length-1){spot(sp.cur+1);return true}spot(-1);return false}if(sp.cur>=0){spot(sp.cur-1);return true}return false};

  /* impressão: estado estático (sem spotlight, conectores prontos) + duas páginas extras:
     "Nome de hoje" (de qual serviço nasce cada produto) e a leitura de cada pilar (o que o spotlight mostra) */
  PRINT.push(()=>{const d0=sec.style.display;if(!sec.offsetWidth)sec.style.display="block";
    if(sp.cur>=0)spot(-1);unmate();setMode("v");lit=0;fitNames();draw();sec.style.display=d0;
    if(stage.querySelector(".s09-print"))return;
    const mk=cls=>{const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s09-print",cls,"play");c.querySelectorAll("[id]").forEach(x=>x.removeAttribute("id"));return c};
    /* página 2: nome de hoje */
    const o=mk("s09-org");const ot=o.querySelector(".tc");if(ot)ot.innerHTML="Nome de hoje: de qual serviço oficial nasce cada um dos 24 produtos";
    const os=o.querySelector(".sub");if(os)os.innerHTML="Os nomes oficiais dos serviços e dos pilares de hoje, no lugar da proposta de valor de cada carta";
    /* página 3: a leitura de cada pilar e da base */
    const r=mk("s09-lp");const rt=r.querySelector(".tc");if(rt)rt.innerHTML="Pilar a pilar: a decisão do cliente e como os produtos se encadeiam";
    const rs=r.querySelector(".sub");if(rs)rs.innerHTML="O que o spotlight mostra em cada pilar e na base comum, a Plataforma de Dados e AI";
    const g=H("div",{class:"s09-pg"});g.innerHTML=st.map(s=>`<div class="s09-pc"><b class="s09-pct">${s.title}</b>${s.text}</div>`).join("");
    const h=r.querySelector(".s09-host");if(h)h.replaceWith(g);const lg=r.querySelector(".s09-leg");if(lg)lg.remove();
    sec.after(o);o.after(r)});
})();
