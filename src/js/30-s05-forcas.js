/* =====================================================================
   SLIDE 05 · Seis forças · dono: mercado-forcas (V6)
   fx 39 · Node Network Motion, em versão calma: as seis forças ficam em duas colunas alinhadas e cada uma se liga
   por um fio ao centro, onde está a pergunta do cliente. Na visão geral um sinal corre por todos os fios até o centro
   (as seis forças apontam para o mesmo lugar); ao escolher uma força, o fio dela acende em laranja, o resto recua e o
   centro mostra o detalhe em três assuntos: o que mudou (fato verificado, sempre por data-fato) · o que o cliente passa
   a exigir · por que pesa para a DTS. Sem nomes de produtos novos (a resposta vem na Parte 4). A ligação força →
   exigência é leitura nossa (o verso explica).
   Estados: visão geral (−1) → força 01 … 06. → / ← percorrem; clique numa força ou no seletor escolhe; clique na força
   escolhida volta à visão geral.
   Ganchos: ENTER["05"] (visão geral; força 06 quando vem pelo ←), STEP["05"] (passos), PRINT (visão geral estática e
   uma página extra com as seis forças em detalhe, depois do verso).
   ===================================================================== */
(function(){const sec=SL("05");if(!sec)return;
  const net=$("s05Net"),svg=$("s05Svg"),colL=$("s05L"),colR=$("s05R"),hub=$("s05Hub"),seg=$("s05Seg");
  if(!net||!svg||!colL||!colR||!hub)return;
  const nn=i=>pad(i+1),fato=id=>`<span data-fato="${id}"></span>`;
  /* as seis forças
     ic ícone · t nome (uma linha) · fx o que mudou, versão do cartão · ex o que o cliente exige, versão do cartão
     tok fato com o número de destaque ("" = sem número) · mud o que mudou, frase do centro (continua o número) · src fonte curta
     req o que o cliente passa a exigir · dts por que pesa para a DTS (leitura nossa) */
  const F=[
    {ic:"ai",t:"IA na agenda, retorno por provar",
     fx:`${fato("ceo-sem-retorno-ia-56")} dos CEOs no mundo ainda não viram a IA aumentar a receita nem reduzir custos`,
     ex:"ganho medido no resultado",
     tok:"ceo-sem-retorno-ia-56",mud:"dos CEOs no mundo ainda não viram a IA aumentar a receita nem reduzir custos.",src:"PwC, pesquisa global com CEOs (jan/2026)",
     req:"Ver o ganho na receita ou no custo antes de ampliar o investimento em IA.",
     dts:"Nenhum dos 29 serviços descreve IA no método; diagnóstico e estratégia que não medem o ganho viram disputa de preço."},
    {ic:"calendar",t:"2027 com data marcada",
     fx:"Começa a cobrança do novo tributo federal e acaba a manutenção padrão do ERP antigo da SAP",
     ex:"prazo e custo conhecidos até 2027",
     tok:"forcas-cbs-2027",mud:"é o ano em que começa a cobrança da CBS, novo tributo federal sobre consumo, e termina a manutenção padrão do ECC, a versão antiga do ERP da SAP.",src:"Agência Senado (dez/2024) · SAP (fev/2020)",
     req:"Chegar a 2027 com fiscal e ERP prontos, com prazo e custo conhecidos antes de começar.",
     dts:"Prontidão de ERP e resgate de projetos já estão no portfólio; com data fixa, o cliente compra quem responde pela data."},
    {ic:"hand",t:"Fundos no centro das transações",
     fx:"No Brasil, fundos ganharam espaço nas transações de 2025, com a tecnologia entre seus maiores interesses",
     ex:"custo antes de assinar, sinergia depois",
     tok:"",mud:"Os fundos de private equity e de venture capital ganharam espaço nas fusões e aquisições de 2025 no Brasil, e a tecnologia está entre as áreas de maior interesse deles.",src:"KPMG, pesquisa de fusões e aquisições de 2025 (mar/2026)",
     req:"Saber, antes de assinar, quanto custa integrar ou separar a tecnologia, e ver a sinergia no resultado depois.",
     dts:"Os oito serviços de Tech M&A são fases do mesmo ciclo, vendidas em separado; o fundo quer um só responsável, da diligência ao valor."},
    {ic:"coin",t:"Preço por hora na mira",
     fx:`Gartner prevê cláusula que devolve parte do ganho da IA em ${fato("clawback-contratos-60")} dos grandes contratos de serviços de TI`,
     ex:"preço por entrega, não por hora",
     tok:"clawback-contratos-60",mud:"dos grandes contratos de serviços de TI terão, até 2027, cláusulas que devolvem ao cliente parte dos ganhos com IA.",src:"previsão do Gartner (out/2025), noticiada pela imprensa",
     req:"Pagar por entrega ou por resultado, não por pessoa alocada, e ver no preço a eficiência que a IA traz.",
     dts:"Os 29 serviços são vendidos por esforço; se a IA corta horas e o cliente cobra esse ganho no preço, quem fatura por hora fatura menos."},
    {ic:"shield",t:"Risco cibernético com regra nova",
     fx:"O regulador exige das instituições financeiras teste de intrusão anual e controle da nuvem",
     ex:"resiliência provada em teste",
     tok:"forcas-cmn-5274",mud:"foi o prazo para as instituições financeiras cumprirem a regra nova de segurança cibernética e de nuvem, com teste de intrusão ao menos uma vez por ano.",src:"Resolução 5.274 do Conselho Monetário Nacional (dez/2025)",
     req:"Provar em teste que a operação resiste e volta, inclusive nos fornecedores de tecnologia e de nuvem.",
     dts:"Continuidade de negócios ainda é vendida como plano; o cliente regulado quer recuperação testada e terceiros sob controle."},
    {ic:"people",t:"Falta talento para executar",
     fx:`${fato("talento-transformacao-53")} das empresas no mundo ainda não têm o talento para executar seus planos de transformação digital`,
     ex:"liderança que assume e entrega",
     tok:"talento-transformacao-53",mud:"das empresas no mundo ainda não têm o talento necessário para tirar do papel seus planos de transformação digital.",src:"KPMG, pesquisa global com executivos (jan/2026)",
     req:"Alguém que assuma a tecnologia já, com mandato e metas, e deixe a equipe pronta para seguir.",
     dts:"Liderança interina é DNA de operador da A&amp;M e já está no portfólio; o cliente quer comando com resultado, não alocação de perfis."}];

  /* nomes das forças no próprio <section> (data-forcas="nome|nome|…"): a capa da Parte 2 pode ler daqui, sem repetir os textos */
  sec.dataset.forcas=F.map(f=>strip(f.t).replace(/&amp;/g,"&")).join("|");

  /* ---------- cartões das forças (01–03 à esquerda, 04–06 à direita) ---------- */
  let k=-1;
  const cards=F.map((f,i)=>{const b=H("button",{class:"s05-f",type:"button","data-k":i,"data-a":i<3?"left":"right",style:`--d:${2+i}`,"aria-pressed":"false","aria-label":`Força ${nn(i)}: ${strip(f.t)}`},i<3?colL:colR);
    b.innerHTML=`<span class="s05-ic">${icoSvg(f.ic,3+i)}</span><span class="s05-tx"><span class="s05-ft"><i>${nn(i)}</i><b>${f.t}</b></span><span class="s05-fx">${f.fx}</span><span class="s05-fd"><em>Exigência</em><span>${f.ex}</span></span></span>`;
    b.addEventListener("click",e=>{e.stopPropagation();show(k===i?-1:i)});
    b.addEventListener("pointerenter",()=>hov(i,true));b.addEventListener("pointerleave",()=>hov(i,false));return b});
  fixPaths(net);

  /* ---------- seletor (visão geral · 01 … 06) ---------- */
  if(seg)[["Visão geral",-1]].concat(F.map((f,i)=>[nn(i),i])).forEach(([l,i])=>{const b=H("button",{type:"button",title:i<0?"Visão geral das seis forças":`Força ${nn(i)} · ${strip(F[i].t)}`},seg,l);b.addEventListener("click",e=>{e.stopPropagation();show(i)})});

  /* ---------- centro: a pergunta do cliente (visão geral) ou o detalhe da força ---------- */
  /* visão geral; na entrada do slide (ent) a pergunta antiga é riscada antes de a nova aparecer */
  const HUB0=ent=>`<div class="s05-hv${ent?" s05-ent":""}">
      <span class="s05-eye">A pergunta do cliente mudou</span>
      <div class="s05-qs"><div class="s05-q s05-q0"><span class="s05-ql">Antes</span><p>Qual é a nossa estratégia digital?</p></div>
      <div class="s05-q s05-q1"><span class="s05-ql">Agora</span><p>Quanto a tecnologia devolve, em que prazo e quem responde por isso?</p></div></div>
      <p class="s05-con"><b>Seis forças, uma exigência:</b> <em>resultado comprovado</em>, com prazo, preço e dono.</p></div>`;
  const HUB=i=>{const f=F[i];return `<div class="s05-hd">
      <div class="s05-hh"><span class="s05-hic">${icoSvg(f.ic)}</span><span class="s05-eye">Força ${nn(i)} de ${nn(F.length-1)}</span></div>
      <h3 class="s05-ht">${f.t}</h3>
      <div class="s05-ss">
        <div class="s05-sec s05-mud"><span class="s05-sl">O que mudou</span>${f.tok?`<b class="s05-tok">${fato(f.tok)}</b>`:""}<p>${f.mud}</p><span class="s05-src src-note">Fonte: ${f.src}</span></div>
        <div class="s05-sec"><span class="s05-sl">O que o cliente passa a exigir</span><p>${f.req}</p></div>
        <div class="s05-sec"><span class="s05-sl">Por que pesa para a DTS</span><p>${f.dts}</p></div>
      </div></div>`};
  function show(i,inst,ent){k=clamp(i,-1,F.length-1);apply();hub.innerHTML=k<0?HUB0(!!ent):HUB(k);fixPaths(hub);if(typeof refFill==="function")refFill(hub);
    if(!inst&&!REDMO){const v=hub.firstElementChild;if(v&&v.animate)v.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:340,easing:"cubic-bezier(.22,.61,.36,1)"})}}
  function apply(){net.classList.toggle("sel",k>=0);
    cards.forEach((c,j)=>{c.classList.toggle("on",j===k);c.setAttribute("aria-pressed",String(j===k))});
    svg.querySelectorAll(".s05-sp").forEach(g=>{const on=+g.dataset.k===k;g.classList.toggle("on",on);if(on)svg.appendChild(g)});
    if(seg){seg.querySelectorAll("button").forEach((b,j)=>b.classList.toggle("on",j===k+1));segSync(seg)}}
  function hov(i,on){const g=svg.querySelector(`.s05-sp[data-k="${i}"]`);if(g)g.classList.toggle("hv",on)}

  /* ---------- fios: da borda interna de cada cartão até a borda do centro (três pontos de chegada por lado) ---------- */
  function draw(){const W=net.offsetWidth,Hh=net.offsetHeight;if(!W||!Hh)return false;
    svg.setAttribute("viewBox",`0 0 ${W} ${Hh}`);svg.setAttribute("width",W);svg.setAttribute("height",Hh);svg.innerHTML="";
    const hb=rel(hub,net),dy=Math.min(64,hb.h*.12);
    cards.forEach((c,i)=>{const r=rel(c,net),L=i<3,row=i%3;
      const x1=L?r.x+r.w:r.x,y1=r.cy,x2=L?hb.x:hb.x+hb.w,y2=hb.cy+(row-1)*dy,mx=(x1+x2)/2;
      const d=`M${x1.toFixed(1)} ${y1.toFixed(1)} C${mx.toFixed(1)} ${y1.toFixed(1)} ${mx.toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      const g=S("g",{class:"s05-sp","data-k":i,style:`--d:${8+i}`},svg);
      S("path",{d,class:"s05-ln dr",pathLength:1},g);
      S("path",{d,class:"s05-fl",id:"s05p"+i},g);
      /* halo do nó ativo (guia DTS, Node Network: o nó escolhido pulsa em laranja) */
      S("circle",{cx:x1,cy:y1,r:6,class:"s05-ha"},g);
      S("circle",{cx:x1,cy:y1,r:5.5,class:"s05-n0"},g);
      S("circle",{cx:x2,cy:y2,r:4.5,class:"s05-n1"},g);
      /* sinal que corre até o centro (sem movimento reduzido; some na impressão) */
      if(!REDMO){const p=S("circle",{r:4,class:"s05-pu"},g);const a=S("animateMotion",{dur:"2.6s",repeatCount:"indefinite",begin:`${(i*.43).toFixed(2)}s`},p);S("mpath",{href:"#s05p"+i},a)}});
    apply();return true}

  show(-1,true);   /* estado inicial (o ENTER refaz com a animação de entrada) */

  /* ---------- ganchos ---------- */
  ENTER["05"]=()=>{show(goLast?F.length-1:-1,true,true);requestAnimationFrame(()=>draw())};
  STEP["05"]=d=>{const n=k+d;if(n<-1||n>=F.length)return false;show(n);return true};
  /* fontes da web chegam depois do primeiro desenho: redesenha se o slide estiver na tela */
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(sec.classList.contains("active"))draw()});

  /* ---------- impressão: visão geral estática na página da frente e uma página extra com as seis forças em detalhe ---------- */
  PRINT.push(()=>{const was=sec.style.display;sec.style.display="block";show(-1,true);draw();sec.style.display=was;
    if(stage.querySelector(".s05-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s05-print","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    const sub=c.querySelector(".sub");if(sub)sub.textContent="As seis forças em detalhe: o que mudou, o que o cliente passa a exigir e por que pesa para a DTS";
    const g=H("div",{class:"s05-pgrid"});
    F.forEach((f,i)=>H("div",{class:"s05-pc",html:`<div class="s05-ph"><span class="s05-ic">${icoSvg(f.ic)}</span><i>${nn(i)}</i><b>${f.t}</b></div>
      <div class="s05-ps"><span class="s05-pl">O que mudou</span><p>${f.tok?fato(f.tok)+" ":""}${f.mud}</p><span class="s05-psrc src-note">Fonte: ${f.src}</span></div>
      <div class="s05-ps"><span class="s05-pl">O que o cliente passa a exigir</span><p>${f.req}</p></div>
      <div class="s05-ps"><span class="s05-pl">Por que pesa para a DTS</span><p>${f.dts}</p></div>`},g));
    const n=c.querySelector(".s05-net");if(n)n.replaceWith(g);
    const r=c.querySelector(".head-r");if(r)r.remove();
    const w=c.querySelector(".sowhat");if(w)w.remove();
    fixPaths(c);sec.after(c)});
})();
