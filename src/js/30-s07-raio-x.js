/* =====================================================================
   SLIDE 07 · Raio-X e caminhos · dono: posicao (V6)
   Vista 1 · Raio-X: quadro qualitativo 3 × 3 (demanda em 2026 e 2027 × direito de vencer da A&M), sem escores.
     Cada um dos 29 serviços (OLD, src/data/00-base.js: níveis dm/dv, decisão d, destino to, motivo w) vira uma etiqueta
     na célula do seu nível; o estilo da etiqueta é a decisão (manter · aprimorar com IA · fundir · sair como produto isolado).
     Spotlight por pilar (Todos · P1…P4, ou →): o pilar escolhido fica aceso e os demais se apagam; as contagens das
     decisões mostram o pilar; a leitura do pilar aparece na célula vazia (forte, mas sem procura).
     Dica de cada serviço em quatro assuntos: Demanda · Direito de vencer · Decisão · Vai para.
     Entrada: uma varredura de raio-X atravessa o quadro e revela as etiquetas (estático com movimento reduzido e na impressão).
   Vista 2 · Três caminhos: prós e contras em palavras, o que cada caminho faz com o raio-X e a recomendação.
   Ganchos: ENTER["07"] (volta à visão geral), STEP["07"] (→ P1…P4, depois a vista 2; ← de volta), PRINT (páginas extras com
   a leitura serviço a serviço, que na tela só aparece na dica). Sem números fora da política (SPEC 4) e sem siglas fora da lista
   (TMO só como nome oficial, explicado). Tudo dentro de IIFE; ids com prefixo rx.
   ===================================================================== */
(function(){const sec=SL("07");if(!sec||typeof PILLARS==="undefined"||typeof OLD==="undefined")return;
  const LVD={A:"Alta",M:"Média",B:"Baixa"},LVV={A:"Alto",M:"Médio",B:"Baixo"};
  const ORD=["keep","ai","merge","cut"];
  const DEC={keep:["Manter","a essência fica; a IA entra de apoio"],ai:["Aprimorar com IA","a IA entra no método de entrega"],
    merge:["Fundir","junta-se a outro do mesmo método"],cut:["Sair como produto isolado","vira parte de outro produto"]};
  /* por que cada nível: [demanda em 2026 e 2027, direito de vencer da A&M] (leitura DTS, a calibrar com os sócios; critério no verso) */
  const RX={
    a1:["O conselho cobra o retorno da tecnologia e da IA","Diagnóstico é oferta comum, e a IA barateia o retrato"],
    a2:["Pouco tangível: o cliente quase não compra sozinho","Usa a mesma rede de executivos da liderança interina"],
    a3:["Procura constante, sem gatilho com data","Mesma rede de executivos que assume cargos na A&M"],
    a4:["Surge na saída do líder, numa crise ou numa transação","A A&M assume o cargo; o auditor não pode onde audita"],
    a5:["Conselhos pedem um plano de IA com retorno","Plano de IA é oferta de muitas firmas grandes"],
    a6:["Cresce com os agentes de IA, mas a maioria ainda testa","Reestruturar áreas sob pressão é força da A&M"],
    a7:["Regra nova de segurança e nuvem no sistema financeiro","Segurança é terreno de firmas grandes e especialistas"],
    a8:["O mercado de TI desacelera em 2026 e o custo vira pauta","Cortar custo e responder pelo número é força da A&M"],
    a9:["Nicho: pouca procura sozinho","Depende de especialista fiscal; sozinho, pesa pouco"],
    a10:["Incentivo anual, usado por quem investe em inovação","Consultorias fiscais especializadas dominam"],
    b1:["Renovações e escolha de fornecedores de IA","A independência ajuda, mas muitas firmas fazem"],
    b2:["Reforma Tributária e fim da manutenção do ERP antigo da SAP","Integradores e firmas de auditoria disputam pelo fiscal"],
    b3:["Programas com data marcada em 2027 precisam de controle","Escritório de projetos é oferta comum"],
    b4:["Adotar IA nas equipes vira cobrança da diretoria","Gestão de mudança é oferta comum"],
    b5:["Pouca procura sozinho; sai junto com o escritório","Mesmo método do escritório de transformação"],
    b6:["Programas com prazo fixo em 2027 não admitem atraso","Resgatar o que saiu do trilho é a lógica do turnaround"],
    b7:["Alocação de perfil, comprada pelo menor preço","Pouca diferença frente a quem só aloca gente"],
    c1:["Quase ninguém compra sozinho","Guarda o método das transações da A&M"],
    c2:["Fundos ganharam espaço nas transações de 2025","Trabalho com fundos e sem conflito de auditoria"],
    c3:["Acompanha cada compra ou separação","Muitas firmas planejam integração"],
    c4:["Acompanha cada fusão até o fim da transição","Escritórios de transição são força da A&M"],
    c5:["O vendedor quer chegar pronto à diligência","Mesmo método da diligência de compra"],
    c6:["Cada venda de unidade exige separar a TI","Separar negócios sob prazo é força da A&M"],
    c7:["Vai do primeiro dia ao fim dos serviços de transição","Escritórios de transição são força da A&M"],
    c8:["Fundos querem valor capturado depois do fechamento","Perto do trabalho da A&M com fundos"],
    d1:["A arquitetura volta à pauta com a IA","Integradores e fornecedores disputam com vantagem"],
    d2:["Racionalizar aplicações corta custo","Ligado a custo, onde a A&M pesa"],
    d3:["Custo de nuvem e de licenças sob pressão","Integradores dominam a operação de infraestrutura"],
    d4:["Fim da manutenção do ERP antigo da SAP puxa migrações","Revisão independente, sem vender a migração"]};
  /* leitura de cada pilar no foco (e na página impressa) */
  const PIL={
    1:"Núcleo em custo de TI e liderança interina. Diagnóstico e plano têm procura, mas pouco diferencial; três ofertas de liderança e duas fiscais se sobrepõem.",
    2:"Resgate de projetos é o núcleo. A janela de 2027 puxa a prontidão de ERP e o escritório de transformação, que se sobrepõe ao modelo de implantação.",
    3:"Diligência de compra e sinergias são o núcleo, perto dos fundos. Seis serviços formam três pares do mesmo método em direções opostas.",
    4:"Há procura em nuvem, licenças e migração, mas o direito de vencer é médio ou baixo: o diferencial é decidir a rota e revisar o integrador."};
  /* rótulo das células dos cantos (zonas do quadro) */
  const ZONE={AA:"Núcleo da A&M · escalar",AB:"Demanda sem diferencial próprio",BB:"Pouca demanda, pouco diferencial",BA:"Forte, mas sem procura"};
  const DN={"TMO":"TMO (escritório de transformação)"};
  const nmOf=o=>DN[o.n]||o.n;
  const att=s=>String(s==null?"":s).replace(/&(?![#\w]+;)/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  const tl=(k,v)=>`<span class="tl"><b>${k}</b>${v}</span>`;
  const destOf=o=>{const p=typeof PBY==="function"?PBY(o.to):null;return p?{id:p.id,code:p.code,name:p.name,pillar:p.pillar}:{id:"",code:o.to,name:"",pillar:+String(o.to).charAt(0)}};
  const goTx=o=>{const d=destOf(o);return `${d.code}${d.name?" "+d.name:""}${d.pillar!==o.p?` · muda para o Pilar ${d.pillar}`:""}`};
  const tipOf=o=>{const r=RX[o.id]||["",""];return tl("Demanda",`${LVD[o.dm]} · ${r[0]}`)+tl("Direito de vencer",`${LVV[o.dv]} · ${r[1]}`)+tl("Decisão",`${DEC[o.d][0]} · ${o.w}`)+tl("Vai para",goTx(o))};
  const ok=o=>o&&LVD[o.dm]&&LVV[o.dv]&&DEC[o.d];
  const SV=OLD.filter(ok);
  if(SV.length!==OLD.length)console.warn("[raio-x] serviços sem nível ou decisão em OLD: "+OLD.filter(o=>!ok(o)).map(o=>o.id).join(", "));
  const cnt=(p,d)=>SV.filter(o=>(!p||o.p===p)&&o.d===d).length;

  /* ---------------- vista 1 · faixa das decisões (legenda + contagens estruturais 4 · 13 · 10 · 2) ---------------- */
  const decEl=$("rxDec"),board=$("rxBoard"),seg=$("rxSeg");
  decEl.innerHTML=ORD.map(k=>`<div class="s07-t ${k}" data-dec="${k}"><i class="s07-sw ${k}" aria-hidden="true"></i><span class="s07-nb"><b class="s07-n">${cnt(0,k)}</b><em class="s07-of"></em></span><span class="s07-tl"><b>${DEC[k][0]}</b><small>${DEC[k][1]}</small></span></div>`).join("");
  const tiles=[...decEl.querySelectorAll(".s07-t")];

  /* ---------------- vista 1 · quadro 3 × 3 ---------------- */
  const ROWS=["A","M","B"],COLS=["B","M","A"];
  const heat=(dm,dv)=>({B:0,M:1,A:2}[dm]+{B:0,M:1,A:2}[dv]);
  let h=`<span class="s07-corner"><b class="s07-pn">1</b>nº do pilar</span><div class="s07-yax" aria-hidden="true"><span>Direito de vencer da A&amp;M</span><i></i></div>`;
  COLS.forEach((c,j)=>{h+=`<div class="s07-ch" style="grid-column:${j+3}"><span>Demanda</span><b>${LVD[c].toLowerCase()}</b>${j===2?'<i class="s07-arr" aria-hidden="true"></i>':""}</div>`});
  ROWS.forEach((r,i)=>{h+=`<div class="s07-rh" style="grid-row:${i+2}"><b>${LVV[r].toLowerCase()}</b></div>`;
    COLS.forEach((c,j)=>{const z=ZONE[c+r],L=SV.filter(o=>o.dm===c&&o.dv===r);
      h+=`<div class="s07-cell hx${heat(c,r)}${c+r==="AA"?" core":""}" data-z="${c+r}" style="grid-row:${i+2};grid-column:${j+3}">${z?`<span class="s07-z">${z}</span>`:""}`
        +L.map(o=>{const d=destOf(o),tag=d.id?"a":"span";return `<${tag} class="s07-chip ${o.d}" data-p="${o.p}" data-dec="${o.d}" data-id="${o.id}"${d.id?` href="#p=${d.id}" data-pd="${d.id}"`:""} style="--x:${j};--y:${i}" data-tv="${att(nmOf(o))}" data-th="${att(tipOf(o))}"><b class="s07-pn" aria-label="Pilar ${o.p}">${o.p}</b><span>${nmOf(o)}</span></${tag}>`}).join("")
        +(L.length?"":`<span class="s07-empty">Nenhum serviço: onde a A&amp;M é forte, há procura</span>`)+`</div>`})});
  h+=`<div class="s07-cap" id="rxCap" style="grid-row:2;grid-column:3" aria-live="polite"></div><span class="s07-scan" aria-hidden="true"></span>`;
  board.innerHTML=h;
  const chips=[...board.querySelectorAll(".s07-chip")],cap=$("rxCap");

  /* ---------------- arrumação das etiquetas: em cada célula, o menor número de linhas (primeiro encaixe, das mais largas
     às mais estreitas); mede no palco, então roda ao entrar, quando as fontes carregam e na impressão ---------------- */
  function pack(){board.querySelectorAll(".s07-cell").forEach(cell=>{const cs=[...cell.querySelectorAll(".s07-chip")];if(cs.length<2)return;
      const st=getComputedStyle(cell),W=cell.clientWidth-parseFloat(st.paddingLeft)-parseFloat(st.paddingRight),G=parseFloat(st.columnGap)||5;if(W<50)return;
      const it=cs.map((c,k)=>({c,k,w:c.offsetWidth})).sort((a,b)=>b.w-a.w||a.k-b.k),L=[];
      it.forEach(x=>{let l=L.find(l=>l.u+G+x.w<=W+.5);if(!l){l={u:-G,a:[]};L.push(l)}l.u+=G+x.w;l.a.push(x)});
      L.forEach((l,i)=>l.a.forEach((x,j)=>x.c.style.order=String(1+i*20+j)))})}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>safe(pack));

  /* ---------------- spotlight por pilar + destaque por decisão ---------------- */
  let cur=-1,dHot=null;
  function paint(){const p=cur+1;board.classList.toggle("flt",p>0||!!dHot);
    chips.forEach(c=>c.classList.toggle("on",(!p||+c.dataset.p===p)&&(!dHot||c.dataset.dec===dHot)));
    tiles.forEach(t=>t.classList.toggle("hot",t.dataset.dec===dHot))}
  /* contagem inteira que corre do valor anterior ao novo (a mais recente cancela a anterior); direta com movimento reduzido */
  const tw=(el,a,b,inst)=>{el._tw=null;if(inst||REDMO||a===b){el.textContent=String(b);return}const t0=performance.now(),D=450;
    const st=t=>{if(el._tw!==st)return;const k=Math.min(1,(t-t0)/D);el.textContent=String(Math.round(a+(b-a)*ease.out(k)));if(k<1)requestAnimationFrame(st)};el._tw=st;requestAnimationFrame(st)};
  function set(k,inst){const prev=cur;cur=k;const p=k+1;
    [...seg.querySelectorAll("button")].forEach((b,j)=>b.classList.toggle("on",j===p));segSync(seg);
    tiles.forEach(t=>{const n=t.querySelector(".s07-n"),d=t.dataset.dec,to=cnt(p,d),from=cnt(prev+1,d);
      tw(n,from,to,inst);
      t.querySelector(".s07-of").textContent=p?`de ${cnt(0,d)}`:"";t.classList.toggle("zero",p>0&&to===0)});
    if(p){const pl=PILLARS[p-1];cap.innerHTML=`<b class="tt">Pilar ${p} · ${pl.name}</b><p>${PIL[p]}</p>`;cap.classList.add("on")}else cap.classList.remove("on");
    paint()}
  ["Todos","P1","P2","P3","P4"].forEach((t,k)=>{const b=H("button",{type:"button",class:k?"":"on"},seg,t);if(k){b.dataset.tv=`Pilar ${k} · ${PILLARS[k-1].name}`;b.dataset.tl="Acende os serviços deste pilar e apaga os demais"}
    b.addEventListener("click",e=>{e.stopPropagation();set(k&&cur===k-1?-1:k-1)})});
  tiles.forEach(t=>{t.addEventListener("pointerenter",()=>{dHot=t.dataset.dec;paint()});t.addEventListener("pointerleave",()=>{dHot=null;paint()})});
  board.addEventListener("click",e=>{if(cur>=0&&!e.target.closest(".s07-chip"))set(-1)});
  const paneK=()=>{const P=paneOf(sec);return P?P.k:0};
  ENTER["07"]=()=>{dHot=null;set(-1,true);pack()};
  document.addEventListener("deck:pane",e=>{if(e.detail&&e.detail.key==="07"&&e.detail.k===0)requestAnimationFrame(()=>safe(pack))});
  STEP["07"]=d=>{if(paneK()!==0){if(d<0)set(PILLARS.length-1);return false}
    if(d>0){if(cur<PILLARS.length-1){set(cur+1);return true}set(-1);return false}
    if(cur>=0){set(cur-1);return true}return false};

  /* ---------------- vista 2 · três caminhos ---------------- */
  const PATHS=[
    {k:"Caminho 1 · Incremental",h:"IA dentro dos serviços de hoje",p:"Mantém os 29 serviços e os nomes de hoje; a IA vira uma ferramenta interna da equipe.",
     pro:["Começa já, sem mexer na oferta nem no catálogo","Pede pouco investimento e traz pouco risco de execução"],
     con:["As 12 sobreposições e os nomes de serviço continuam","O preço segue por hora, e o ganho da IA volta ao cliente"],
     rx:"Não mexe nas 12 sobreposições; os 13 serviços que pedem IA no método ganham só produtividade interna.",
     ev:`Até 2027, <span data-fato="clawback-contratos-60"></span> dos grandes contratos de serviços de TI terão cláusulas que devolvem ao cliente parte dos ganhos com IA`,src:"Previsão do Gartner, citada pela ARN (2025)"},
    {k:"Caminho 2 · Transformacional",rec:true,h:"Serviços viram produtos com IA no método",p:"Reorganiza os 29 serviços em produtos de escopo fechado, com método, IA, dados e um formato que o cliente entende.",
     pro:["Funde as sobreposições e dá a cada produto um dono","A IA no método muda prazo, preço e a prova de resultado","Uma base comum de dados, modelos e guias serve a todos"],
     con:["Exige disciplina de produto: preço e prazo saem de pilotos","Muda como os sócios vendem e como a equipe entrega"],
     rx:"Fecha as 12 sobreposições, leva IA ao método dos 13 que pedem e preserva os 4 que se mantêm. E incuba desde já duas apostas novas, criadas com IA.",
     ev:`<span data-fato="ibm-consultoria-ativos" data-modo="txt"></span>`,src:"IBM (2025)"},
    {k:"Caminho 3 · Disruptivo",h:"A DTS vira plataforma por assinatura",p:"Serviços entregues por software: radares, escritórios e agentes de IA vendidos por assinatura.",
     pro:["Receita recorrente, que não depende de horas","Os dados de vários clientes viram um ativo próprio"],
     con:["Exige engenharia, dados e parcerias que a DTS ainda não tem",`Risco alto: mais de <span data-fato="agentic-cancelados-40"></span> dos projetos de agentes de IA devem ser cancelados até o fim de 2027`],
     rx:"Pula o raio-X: deixa os 29 serviços como estão enquanto constrói outro negócio ao lado.",
     ev:`Serviços entregues por software podem virar um mercado de mais de <span data-fato="servicos-como-software-15-tri"></span> até 2035; pares compram engenharia, como a AlixPartners com a Artium`,src:"HFS Research, projeção (02/2026) · AlixPartners (08/2026) · Gartner (06/2025)"}];
  const li=(L,c)=>L.map(x=>`<li class="${c}"><i class="s07-pk ${c}" aria-hidden="true"></i><span>${x}</span></li>`).join("");
  $("rxPaths").innerHTML=PATHS.map((P,i)=>`<article class="s07-path${P.rec?" rec":""}" data-a="up" style="--d:${3+i*2}">
      <header class="s07-ph">${P.rec?'<span class="s07-rib">Recomendado</span>':""}<span class="s07-pk-t">${P.k}</span><h3>${P.h}</h3></header>
      <p class="s07-pd">${P.p}</p>
      <div class="s07-pc"><span class="s07-lb">A favor</span><ul>${li(P.pro,"pro")}</ul></div>
      <div class="s07-pc"><span class="s07-lb">Contra</span><ul>${li(P.con,"con")}</ul></div>
      <div class="s07-prx"><span class="s07-lb">Com o raio-X</span><p>${P.rx}</p></div>
      <div class="s07-pev"><span class="s07-lb">Sinal de mercado</span><p>${P.ev}</p><small class="src-note">${P.src}</small></div>
    </article>`).join("");

  /* ---------------- impressão: visão geral na página principal + leitura serviço a serviço (o que a dica mostra) ---------------- */
  const PAGES=[[1],[2],[3,4]];
  PRINT.push(()=>{dHot=null;set(-1,true);safe(pack);if(stage.querySelector(".s07-print"))return;let at=sec;
    PAGES.forEach((ps,pi)=>{const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s07-print","play");
      [...c.querySelectorAll(":scope > .body.pane")].forEach((b,j)=>{if(j)b.remove();else b.classList.add("on")});
      c.querySelectorAll(".pseg button").forEach((b,j)=>b.classList.toggle("on",j===0));c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
      const tc=c.querySelector(".tc"),sb=c.querySelector(".sub");
      if(tc)tc.textContent=`Raio-X serviço a serviço · ${ps.map(p=>`Pilar ${p} · ${PILLARS[p-1].name}`).join(" e ")}`;
      if(sb)sb.textContent="O que a dica de cada serviço mostra: demanda, direito de vencer, decisão e para onde o serviço vai";
      const body=c.querySelector(":scope > .body");["s07-dec","s07-board","sowhat","s07-masc","head-r"].forEach(k=>body.querySelectorAll("."+k).forEach(e=>e.remove()));
      let rows="";ps.forEach(p=>{const L=SV.filter(o=>o.p===p);
        rows+=`<tr class="grp"><td colspan="5"><b>Pilar ${p} · ${PILLARS[p-1].name} · ${L.length} serviços</b><span>${PIL[p]}</span></td></tr>`
          +L.map(o=>{const r=RX[o.id]||["",""];return `<tr><td class="nm"><b>${nmOf(o)}</b></td><td><span class="s07-lv l${o.dm}">${LVD[o.dm]}</span>${r[0]}</td><td><span class="s07-lv l${o.dv}">${LVV[o.dv]}</span>${r[1]}</td><td><span class="s07-dt ${o.d}">${DEC[o.d][0]}</span>${o.w}</td><td class="go">${goTx(o)}</td></tr>`}).join("")});
      H("div",{class:"s07-ptw",html:`<table class="s07-ptbl"><thead><tr><th>Serviço de hoje</th><th>Demanda em 2026 e 2027</th><th>Direito de vencer da A&amp;M</th><th>Decisão e por quê</th><th>Vai para</th></tr></thead><tbody>${rows}</tbody></table>`},body);
      const fs=c.querySelector(":scope > .foot .s");if(fs)fs.textContent=`Raio-X serviço a serviço (${pi+1} de ${PAGES.length}) · níveis e decisões: leitura DTS, a calibrar com os sócios · fontes no verso`;
      at.after(c);at=c})});
})();
