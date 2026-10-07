/* Arquivo carregado depois de engine.js, data.js, core.js, slides.js e 05-icons.js (ver build.py). */
/* ---------- forças de mercado · fx 39 Node Network Motion ----------
   Rede: forças (esquerda) → exigências do cliente (meio) → painel navy (direita).
   Passar o mouse escolhe a força (com pequena espera de intenção); clicar ou usar → fixa a escolha,
   e daí a passagem do mouse só pré-visualiza as ligações de outra força, sem trocar o painel
   (como na referência), até um novo clique ou até o mouse sair da rede.
   As ligações força → exigência são leitura DTS a partir do que mudou e da implicação de cada força. */
(function(){
  const sl=document.querySelector('.slide[data-t="Forças de mercado"]');if(!sl)return;
  const map=$("fmMap"),svg=$("fmSvg"),L=$("fmLeft"),M=$("fmMid"),P=$("fmPanel");
  /* seis forças: ícone, título, o que mudou, número, rótulo, fonte, "Para o DTS", exigências (proposta DTS), produtos que respondem */
  const F=[
   {ic:"ai",t:"IA: uso amplo, retorno raro",x:"Quase todas as grandes empresas usam IA, mas poucas saem do piloto e provam resultado no caixa.",v:"56%",vl:"dos CEOs ainda sem retorno financeiro com IA",src:"PwC, 29ª CEO Survey · jan/2026",imp:"Vender valor medido e governança de IA, não estratégia genérica.",ask:["res","cmd"],p:["1.7","1.1"]},
   {ic:"doc",t:"Reforma Tributária e fim do SAP ECC",x:"Dois prazos com data marcada obrigam a mexer em ERP, fiscal e dados ao mesmo tempo.",v:"01/01/27",vl:"CBS plena; manutenção padrão do SAP ECC termina em 2027",src:"LC 214/2025 · Baguete",imp:"Produtos com prazo e preço fixos: prontidão e resgate de projetos.",ask:["prazo","cmd"],p:["2.2","2.4"]},
   {ic:"hand",t:"Deals liderados por private equity",x:"Menos transações, tickets maiores e fundos em metade dos deals; tecnologia é o setor mais negociado.",v:"50%",vl:"das transações de 2025 com fundos de PE ou VC",src:"KPMG, Fusões e Aquisições 2025 · mar/2026",imp:"Diligência rápida, Dia 1 garantido e sinergias que viram EBITDA.",ask:["prazo","res"],p:["3.1","3.2","3.4"]},
   {ic:"coin",t:"Custo de tecnologia sob escrutínio",x:"O orçamento de TI desacelera, licenças sobem e contratos em dólar pesam no caixa.",v:"8–15×",vl:"alta de licenças VMware após a compra pela Broadcom",src:"Baguete · ABES/IDC (TI +5,3% em 2026)",imp:"Otimização de gastos com economia certificada e radar contínuo.",ask:["res","ind"],p:["1.5","4.3"]},
   {ic:"shield",t:"Risco operacional e regulação",x:"Ataques à cadeia do Pix e novas regras do Banco Central elevam a exigência sobre terceiros de TI.",v:"R$ 800 mi",vl:"desviados no ataque à C&M Software (jul/2025)",src:"Finsiders · Res. CMN 5.274/2025",imp:"Resiliência, recuperação e avaliação de risco de terceiros.",ask:["ind","cmd"],p:["4.5"]},
   {ic:"people",t:"Talento e liderança escassos",x:"Metade das empresas não tem o talento necessário para IA; transações e reestruturações pedem liderança imediata.",v:"53%",vl:"das empresas sem o talento necessário para IA",src:"KPMG Global Tech Report 2026",imp:"Liderança interina e modelo operacional para a era dos agentes.",ask:["cmd"],p:["1.3","1.4"]}];
  /* o que o cliente passa a exigir: critérios da Leitura DTS (prazo, preço e resultado definidos; independência de fornecedor; capacidade de assumir o comando) */
  const A={prazo:["calendar","Prazo e preço fixos"],res:["chart","Resultado medido em R$"],ind:["split","Independência de fornecedor"],cmd:["flag","Capacidade de assumir o comando"]};
  const K=Object.keys(A),nn=i=>pad(i+1);

  /* nós das forças */
  const nodes=F.map((f,i)=>{const w=H("div",{class:"fm-w","data-a":"left",style:`--d:${3+i*.8}`},L);
    const b=H("button",{class:"fm-node",type:"button","aria-label":`Força ${nn(i)}: ${f.t}`},w);
    b.innerHTML=`<span class="fm-ic">${icoSvg(f.ic,4+i)}</span><span class="fm-tx"><b><i>${nn(i)}</i>${f.t}</b><span class="fm-k"><em>${f.v}</em>${f.vl}</span></span>`;
    b.addEventListener("pointerenter",()=>{clearTimeout(hv);if(lock){pv=i;apply();return}hv=setTimeout(()=>sel(i),120)});
    b.addEventListener("pointerleave",()=>{clearTimeout(hv);if(pv===i){pv=-1;apply()}});
    const pick=()=>{clearTimeout(hv);lock=true;pv=-1;sel(i)};b.addEventListener("click",pick);b.addEventListener("focus",pick);return b});
  /* nós das exigências */
  const DL=H("div",{class:"fm-dl"},M),dems={};K.forEach((k,j)=>{const w=H("div",{class:"fm-w","data-a":"right",style:`--d:${5+j}`},DL);
    const fs=F.map((f,i)=>f.ask.includes(k)?i:-1).filter(i=>i>=0);
    const d=H("div",{class:"fm-dem","data-k":k,"data-tv":A[k][1],"data-th":`Puxada por ${fs.length===1?"1 força":fs.length+" forças"}:<br>${fs.map(i=>`${nn(i)} · ${F[i].t}`).join("<br>")}<span class="tl"><i>Ligação: leitura DTS (proposta) a partir do que mudou e da implicação de cada força.</i></span>`},w);
    d.innerHTML=`${icoSvg(A[k][0],6+j)}<span class="fm-dt"><b>${A[k][1]}</b><span class="fm-tags"><span class="lb">${fs.length===1?"força":"forças"}</span>${fs.map(i=>`<i data-f="${i}">${nn(i)}</i>`).join("")}</span></span>`;
    d.addEventListener("pointerenter",()=>{hk=k;apply()});d.addEventListener("pointerleave",()=>{hk=null;apply()});dems[k]=d});
  fixPaths(sl);

  /* painel navy: força selecionada */
  P.innerHTML=`<div class="fm-pin">
    <div class="fm-g"><div class="fm-ptop"><span class="fm-pic" id="fmIc"></span><span class="label" id="fmK"></span><span class="fm-dots" id="fmDots"></span></div>
      <h3 class="fm-pt" id="fmT"></h3>
      <div class="fm-sec"><span class="fm-sh">O que mudou</span><p id="fmX"></p></div></div>
    <div class="fm-g fm-big"><b id="fmV"></b><span id="fmVl"></span><span class="fm-src" id="fmS"></span></div>
    <div class="fm-g"><div class="fm-sec fm-imp"><span class="fm-sh">Para o DTS</span><p id="fmI"></p></div>
      <div class="fm-sec fm-prod"><span class="fm-sh">Quem responde</span><div id="fmP"></div></div></div></div>`;
  const dots=F.map((f,i)=>{const b=H("button",{type:"button","aria-label":`Força ${nn(i)}`,title:f.t},$("fmDots"));b.addEventListener("click",()=>{lock=true;pv=-1;sel(i)});return b});

  let edges=[],cur=0,hk=null,lock=false,pv=-1,hv=0,vTok=0;
  /* sair da rede solta a trava do clique */
  map.addEventListener("pointerleave",()=>{clearTimeout(hv);lock=false;if(pv>=0){pv=-1;apply()}});
  function draw(){const W=map.offsetWidth,Hh=map.offsetHeight;if(!W||!Hh)return;svg.setAttribute("viewBox",`0 0 ${W} ${Hh}`);svg.setAttribute("width",W);svg.setAttribute("height",Hh);svg.innerHTML="";edges=[];
    F.forEach((f,i)=>{const a=rel(nodes[i],map);f.ask.forEach(k=>{const b=rel(dems[k],map);const x1=a.x+a.w,y1=a.cy,x2=b.x,y2=b.cy,mx=(x1+x2)/2;
      const p=S("path",{d:`M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,class:"fm-edge"},svg);p.dataset.f=i;p.dataset.k=k;edges.push(p)})});apply()}
  /* hk = exigência sob o mouse (mostra as forças que a puxam); pv = força pré-visualizada com a escolha travada */
  function apply(){const f=F[cur],q=!hk&&pv>=0&&pv!==cur?pv:-1;map.classList.add("focus");map.classList.toggle("dem",!!hk);
    nodes.forEach((n,i)=>{n.classList.toggle("on",!hk&&i===cur);n.classList.toggle("lit",!!hk&&F[i].ask.includes(hk))});
    K.forEach(k=>{dems[k].classList.toggle("on",hk?hk===k:f.ask.includes(k));dems[k].querySelectorAll(".fm-tags i").forEach(t=>t.classList.toggle("on",hk?hk===k:+t.dataset.f===cur))});
    edges.forEach(e=>{const on=hk?e.dataset.k===hk:+e.dataset.f===cur;e.classList.toggle("on",on);e.classList.toggle("pv",!on&&+e.dataset.f===q);if(on)svg.appendChild(e)});
    dots.forEach((d,i)=>d.classList.toggle("on",i===cur))}
  function fill(still){const f=F[cur];$("fmK").textContent=`Força ${nn(cur)} de ${nn(F.length-1)}`;$("fmIc").innerHTML=icoSvg(f.ic);fixPaths($("fmIc"));$("fmT").textContent=f.t;
    $("fmX").textContent=f.x;const v=$("fmV"),m=/^(\d+)%$/.exec(f.v);if(m&&!still&&!REDMO)cnt(v,+m[1],"%");else{vTok++;v.textContent=f.v}$("fmVl").textContent=f.vl;
    $("fmS").textContent="Fonte: "+f.src;$("fmI").textContent=f.imp;
    $("fmP").innerHTML=f.p.map(c=>{const q=PBY(c);return q?`<a href="#p=${q.id}" data-pd="${q.id}" class="fm-pchip" data-tv="${q.code} · ${q.name}" data-tl="${strip(q.tagline).replace(/"/g,"&quot;")}">${picoSvg(c)}<b>${q.code}</b><span>${q.name}</span><i>→</i></a>`:""}).join("");fixPaths($("fmP"));
    if(!still&&!REDMO)P.querySelector(".fm-pin").animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:340,easing:"cubic-bezier(.22,.61,.36,1)"})}
  /* contador local que pode ser cancelado: trocar de força antes do fim nunca deixa o número de outra força */
  function cnt(el,to,suf){const t=++vTok,t0=performance.now();el.textContent="0"+suf;
    const st=n=>{if(t!==vTok)return;const k=clamp((n-t0)/700,0,1);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}
  function sel(i,still){const ch=i!==cur||!$("fmT").textContent;cur=i;if(ch||still)fill(still);apply()}
  fill(true);apply();

  /* ao voltar do slide seguinte (←), abre na última força, como as vistas dos outros slides */
  ENTER["Forças de mercado"]=()=>{hk=null;pv=-1;lock=false;clearTimeout(hv);const i=sl.classList.contains("back")?F.length-1:0;requestAnimationFrame(()=>{draw();sel(i)})};
  STEP["Forças de mercado"]=d=>{const n=cur+d;if(n<0||n>=F.length)return false;hk=null;pv=-1;lock=true;clearTimeout(hv);sel(n);return true};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(sl.classList.contains("active"))draw()});

  /* impressão: rede estática com a força 1 e uma página extra com as seis forças completas */
  PRINT.push(()=>{const was=sl.style.display;sl.style.display="block";hk=null;pv=-1;lock=false;clearTimeout(hv);cur=0;draw();sel(0,true);sl.style.display=was;
    if(stage.querySelector(".fm-print"))return;
    const c=sl.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","fm-print","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    c.querySelector(".hd .eyebrow").textContent="Seis forças em detalhe · número, fonte e leitura para o DTS";
    const g=H("div",{class:"forces2"});
    F.forEach((f,i)=>{const d=H("div",{class:"f2"},g);d.innerHTML=`<div class="hd"><div class="ic">${icoSvg(f.ic)}</div><h4><i>${nn(i)}</i>${f.t}</h4></div><div class="th">${f.x}</div><div class="v">${f.v}<small>${f.vl}</small></div><div class="src">Fonte: ${f.src}</div><div class="imp"><b>Para o DTS</b>${f.imp}</div><div class="fm-who"><b>Quem responde</b>${f.p.map(cd=>plink(cd)).join("")}</div>`});
    c.querySelector(".fm-map").replaceWith(g);const sb=c.querySelector(".sumbar");if(sb)sb.remove();fixPaths(c);sl.after(c)});
})();
