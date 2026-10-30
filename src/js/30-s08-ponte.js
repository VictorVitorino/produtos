/* =====================================================================
   SLIDE 08 · De serviços a produtos (Before / After 29 → 24) · dono: portfolio
   Before / After 50/50 com o MESMO pilar na MESMA linha: à esquerda os 29 serviços de hoje (com o produto de destino),
   à direita os 24 produtos (cor do código = status; ★ = A&M Signature). Nas pontas do divisor:
   "Hoje" mostra por que cada pilar muda; "Proposta" mostra o que muda, pilar a pilar.
   Embaixo, a ponte em palavras (14 seguem um a um · 13 se fundem em 6 · 2 deixam de ser vendidos sozinhos · 4 nascem:
   14 + 6 + 4 = 24), exemplos de "o que muda de nome" e o que "produto" quer dizer.
   Tudo é calculado de OLD (destino de cada serviço) e PRODUCTS (status, Signature), sem número novo.
   Ganchos: ENTER["08"] (divisor de Hoje para 50/50), STEP["08"] (→ percorre os quatro movimentos da ponte),
   PRINT (50/50 estático + página extra com "por que muda" e "o que muda" de cada pilar).
   ===================================================================== */
(function(){const sec=SL("08");if(!sec||typeof PILLARS==="undefined"||typeof OLD==="undefined")return;
  const PR=typeof PRODUCTS!=="undefined"?PRODUCTS:[];
  const box=$("s08Ba"),gA=$("s08Asis"),gT=$("s08Tobe"),pl=$("s08Pl"),seg=$("s08Seg");
  const esc2=t=>String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  /* nome oficial que é sigla fora da lista da SPEC 5: por extenso */
  const DN={"TMO":"Transformation Management Office"};const nmOf=o=>DN[o.n]||o.n;
  const PIDX=c=>{const i=PR.findIndex(p=>p.code===c);return i<0?99:i};
  /* destino de cada serviço: segue um a um (one), se funde com outros no mesmo produto (merge) ou deixa de ser vendido sozinho (cut) */
  const live=c=>OLD.filter(x=>x.to===c&&x.d!=="cut");
  const fateS=o=>o.d==="cut"?"cut":live(o.to).length>1?"merge":"one";
  /* origem de cada produto: um serviço (one), vários (merge) ou nenhum (new); "abs" = absorve um serviço que deixa de ser vendido sozinho */
  const fateP=p=>p.st==="new"?"new":live(p.code).length>1?"merge":"one";
  const absOf=p=>OLD.filter(x=>x.to===p.code&&x.d==="cut");
  const SIG=PR.filter(p=>p.sig).length;
  /* contagens da ponte (estruturais, calculadas dos dados) */
  const nS=k=>OLD.filter(o=>fateS(o)===k).length,nP=k=>PR.filter(p=>fateP(p)===k).length;
  const CNT={one:nS("one"),mS:nS("merge"),mP:nP("merge"),cut:nS("cut"),nw:nP("new")};

  /* por que muda (Hoje) e o que muda (Proposta), pilar a pilar: leitura DTS sobre o portfólio oficial e a proposta 2027 */
  const WHY={1:"Três ofertas de liderança disputam o mesmo comprador, dois serviços cuidam de impostos de tecnologia e a resiliência, decisão de arquitetura, está fora do lugar.",
    2:"O escritório de transformação e o modelo de implantação têm o mesmo comprador e o mesmo método; o IT Business Partner aloca uma pessoa sem entrega definida.",
    3:"Seis dos oito serviços formam três pares com o mesmo método: as duas diligências, os dois planejamentos e os dois escritórios; o playbook quase não se vende sozinho.",
    4:"Os nomes descrevem a área (arquitetura, aplicações, infraestrutura), não a entrega; ninguém responde pela rota do legado nem pela resiliência testada."};
  const WHAT={1:"As ofertas de liderança viram o 1.3, as duas fiscais viram o 1.6, a resiliência vai para o Pilar 4 e nasce o 1.7, que governa valor, risco e custo da IA.",
    2:"O escritório e o modelo de implantação viram o 2.3, que avisa antes do atraso; o IT Business Partner passa ao 1.3; nasce o 2.6, com o módulo de automação agêntica.",
    3:"Os três pares viram 3.1, 3.2 e 3.3; o 3.4 mantém a essência; o playbook vira ativo interno do 3.5, que lê a tecnologia de todas as empresas do fundo.",
    4:"Os quatro serviços passam a dizer a entrega, a resiliência chega do Pilar 1 como 4.5 e nasce o 4.6, o raio-X do legado com IA antes do primeiro gasto."};

  /* ordem dos serviços no pilar: pelo produto de destino (os que saem do pilar e os que deixam de ser vendidos sozinhos no fim) */
  const rk=o=>o.d==="cut"?2:((PBY(o.to)||{}).pillar!==o.p?1:0);
  const svcOf=n=>OLD.filter(o=>o.p===n).sort((a,b)=>rk(a)-rk(b)||PIDX(a.to)-PIDX(b.to)||(a.d==="merge")-(b.d==="merge"));
  const prdOf=n=>PR.filter(p=>p.pillar===n);
  const LN=n=>[Math.ceil(svcOf(n).length/2),Math.ceil(prdOf(n).length/2)];
  const W8=PILLARS.map(p=>Math.max(...LN(p.n),2));
  const rows=`26px ${W8.map(w=>w+"fr").join(" ")}`;
  [gA,gT,pl].forEach(g=>g.style.gridTemplateRows=rows);

  /* dica de um serviço: destino em palavras + por que muda (OLD.w) */
  const sTip=o=>{const d=PBY(o.to),f=fateS(o),dn=d?`${d.code} ${d.name}`:o.to,mates=live(o.to).filter(x=>x!==o).map(nmOf);
    const dest=f==="cut"?(d&&d.st==="new"?`Deixa de ser vendido sozinho: vira ativo interno do ${dn}`:`Deixa de ser vendido sozinho: o papel passa ao ${dn}`)
      :f==="merge"?`Junta-se a ${mates.join(" e ")} no ${dn}`:`Segue um a um como ${dn}${d&&d.pillar!==o.p?`, no Pilar ${d.pillar}`:""}`;
    return`<span class="tl"><b>Destino</b>${esc2(dest)}</span>${o.w?`<span class="tl"><b>Por que muda</b>${esc2(o.w)}</span>`:""}`};
  /* dica de um produto: de onde nasce + status */
  const pTip=p=>{const os=live(p.code),ab=absOf(p);
    const org=p.st==="new"?`Produto novo com IA${ab.length?`; absorve o ${ab.map(nmOf).join(" e ")} como ativo interno`:""}`:`${os.map(o=>nmOf(o)+(o.p!==p.pillar?` (Pilar ${o.p})`:"")).join(" + ")}${ab.length?`; absorve o papel do ${ab.map(nmOf).join(" e ")}`:""}`;
    return`<span class="tl"><b>${p.st==="new"?"Origem":"Nasce de"}</b>${esc2(org)}</span><span class="tl"><b>Status</b>${STATUS[p.st][0]}${p.sig?" · ★ A&amp;M Signature":""}</span><span class="tl">Clique para abrir a ficha.</span>`};

  /* camadas do Before / After: linha 1 = cabeçalhos; uma linha por pilar */
  const hd=(c,html)=>`<div class="s08-c0 s08-hd ${c}">${html}</div>`;
  let A=hd("ha",`<span class="s08-k a">Hoje</span><span class="s08-kt">${OLD.length} serviços do portfólio oficial · → produto de destino</span>`)+hd("hb",`<span class="s08-kt">Por que muda, pilar a pilar</span>`);
  let T=hd("pa",`<span class="s08-kt">O que muda, pilar a pilar</span>`)+hd("pb",`<span class="s08-k b">Proposta</span><span class="s08-kt">${PR.length} produtos · clique para abrir a ficha</span>`);
  let L=`<div class="s08-plh">Pilar</div>`;
  PILLARS.forEach(P=>{const n=P.n,ss=svcOf(n),ps=prdOf(n),[ls,lp]=LN(n);
    A+=`<div class="s08-c0 ha" style="--ln:${ls}"><div class="s08-ch">${ss.map(o=>{const f=fateS(o),d=PBY(o.to);
        return`<span class="s08-c s08-s ${f}" data-f="${f}" data-to="${o.to}" data-tv="${esc2(nmOf(o))}" data-th="${esc2(sTip(o))}"><i></i><span class="s08-sn">${nmOf(o)}</span><em>→ ${d?d.code:o.to}</em></span>`}).join("")}</div></div>`;
    A+=`<div class="s08-c0 hb"><p class="s08-tx">${WHY[n]||""}</p></div>`;
    T+=`<div class="s08-c0 pa"><p class="s08-tx">${codeLink(WHAT[n]||"")}</p></div>`;
    T+=`<div class="s08-c0 pb" style="--ln:${lp}"><div class="s08-ch">${ps.map(p=>{const f=fateP(p),ab=absOf(p).length;
        return`<a class="s08-c s08-p ${p.st}${p.st==="new"?" holo":""}" href="#p=${p.id}" data-pd="${p.id}" data-f="${f}"${ab?' data-abs="1"':""} data-code="${p.code}" data-tv="${p.code} · ${esc2(p.name)}" data-th="${esc2(pTip(p))}"><b class="s08-pc">${p.code}</b><span class="s08-pn">${p.name}</span>${p.sig?'<i class="s08-sig" aria-label="A&amp;M Signature">★</i>':""}</a>`}).join("")}</div></div>`;
    L+=`<div class="s08-pli"><span class="s08-pln">Pilar ${n}</span><b>${P.name}</b><span class="s08-plc">${ss.length} serviços → ${ps.length} produtos</span></div>`});
  gA.innerHTML=A;gT.innerHTML=T;pl.innerHTML=L;

  /* legenda: a cor do código é o status; ★ = Signature (contagens calculadas) */
  const nst=k=>PR.filter(p=>p.st===k).length;
  $("s08Leg").innerHTML=["keep","ai","new"].map(k=>`<span><i class="s08-sw ${k}"></i>${STATUS[k][0]} <b>${nst(k)}</b></span>`).join("")+`<span><i class="s08-st">★</i>A&amp;M Signature <b>${SIG}</b></span>`;

  /* a ponte, em palavras: quatro movimentos clicáveis (→ percorre) e a soma */
  const MV=[["one",`${CNT.one}`,"seguem um a um, com nome de entrega"],["merge",`${CNT.mS}<i>→</i>${CNT.mP}`,"se fundem: mesmo comprador e mesmo método"],
    ["cut",`${CNT.cut}`,"deixam de ser vendidos sozinhos"],["new",`${CNT.nw}`,"nascem como produtos novos com IA"]];
  $("s08Ponte").innerHTML=`<span class="s08-bl">A ponte, em palavras</span><div class="s08-pw"><div class="s08-mv">${MV.map(([k,v,t],i)=>`<button type="button" class="s08-m" data-k="${i}" data-f="${k}"><b>${v}</b><span>${t}</span></button>`).join("")}</div>
    <div class="s08-eq"><span>${CNT.one} + ${CNT.mP} + ${CNT.nw}</span><b>= ${CNT.one+CNT.mP+CNT.nw}</b><span>produtos</span></div></div>`;

  /* o que muda de nome: exemplos (nome oficial de hoje → produto) */
  const NOMES=[["d2","4.2"],["a1","1.1"],["c2","3.1"],["d3","4.3"]];
  $("s08Nomes").innerHTML=`<span class="s08-bl">O que muda de nome</span><ul class="s08-nl">${NOMES.map(([sid,c])=>{const o=OLD.find(x=>x.id===sid),p=PBY(c);if(!o||!p)return"";
      const both=sid==="c2"?OLD.filter(x=>x.to===c&&x.d!=="cut").map(nmOf):[nmOf(o)];
      const hoje=both.length>1?both[0].replace(/\s*\(.*\)$/,"")+" (Buy Side e Sell Side)":both[0];
      return`<li><span class="s08-nh">${hoje}</span><i aria-hidden="true">→</i><a href="#p=${p.id}" data-pd="${p.id}" class="s08-np" data-tv="${p.code} · ${esc2(p.name)}" data-tl="${esc2(p.tagline||"")}">${p.name}</a></li>`}).join("")}</ul>`;

  /* Before / After (engine.js): Hoje 100 · Lado a lado 50 · Proposta 0 */
  let lastOn="";
  const ba=BeforeAfter(box,{rest:50,l:"",r:"",onMove:x=>{box.classList.toggle("h-on",x>74);box.classList.toggle("p-on",x<26);
    let k="";seg.querySelectorAll("button").forEach(b=>{const on=Math.abs(+b.dataset.v-x)<3;b.classList.toggle("on",on);if(on)k=b.dataset.v});if(k!==lastOn){lastOn=k;segSync(seg)}}});
  seg.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>ba.tween(+b.dataset.v,800)));

  /* passos da ponte: acende os serviços e produtos de cada movimento (os demais ficam esmaecidos) */
  const FX=["one","merge","cut","new"];let cur=-1;
  const btns=[...$("s08Ponte").querySelectorAll(".s08-m")];
  function step(k){cur=k;FX.forEach((f,i)=>box.classList.toggle("fx-"+f,i===k));box.classList.toggle("fx",k>=0);
    btns.forEach((b,i)=>b.classList.toggle("on",i===k));$("s08Ponte").classList.toggle("on",k>=0);
    if(k>=0&&(ba.x<40||ba.x>60))ba.tween(50,600)}
  btns.forEach((b,i)=>b.addEventListener("click",e=>{e.stopPropagation();step(cur===i?-1:i)}));

  /* passar o cursor num serviço acende o produto de destino (e os outros serviços que vão para ele); num produto, a origem */
  const chips=[...box.querySelectorAll(".s08-c")];
  const keyOfC=c=>c.dataset.to||c.dataset.code;
  box.addEventListener("pointerover",e=>{if(cur>=0)return;const c=e.target.closest(".s08-c");if(!c)return;const k=keyOfC(c);
    chips.forEach(x=>x.classList.toggle("lk",keyOfC(x)===k));box.classList.add("hv")});
  box.addEventListener("pointerout",e=>{const c=e.target.closest(".s08-c");if(c&&!c.contains(e.relatedTarget)&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest(".s08-c"))){box.classList.remove("hv");chips.forEach(x=>x.classList.remove("lk"))}});

  ENTER["08"]=()=>{step(goLast?FX.length-1:-1);box.classList.remove("hv");segSync(seg);
    if(goLast){ba.set(50);return}ba.demo();setTimeout(()=>segSync(seg),2700)};
  STEP["08"]=d=>{if(d>0){if(cur<FX.length-1){step(cur+1);return true}step(-1);return false}if(cur>=0){step(cur-1);return true}return false};

  /* impressão: 50/50 com a linha do divisor e uma página extra com "por que muda" e "o que muda" de cada pilar */
  PRINT.push(()=>{step(-1);box.classList.remove("hv");ba.set(50);if(stage.querySelector(".s08-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s08-print","play");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    const tc=c.querySelector(".tc");if(tc)tc.innerHTML="Pilar a pilar: por que cada serviço muda e o que muda na proposta";
    const sub=c.querySelector(".sub");if(sub)sub.innerHTML="Os dois lados escondidos do divisor: o diagnóstico de hoje e a mudança proposta para cada pilar";
    const g=H("div",{class:"s08-pg"});g.innerHTML=`<div class="s08-pgh"></div><div class="s08-pgh"><span class="s08-k a">Hoje</span>Por que muda</div><div class="s08-pgh"><span class="s08-k b">Proposta</span>O que muda</div>`+
      PILLARS.map(P=>`<div class="s08-pli"><span class="s08-pln">Pilar ${P.n}</span><b>${P.name}</b><span class="s08-plc">${svcOf(P.n).length} serviços → ${prdOf(P.n).length} produtos</span></div><div class="s08-pgc"><p>${WHY[P.n]}</p></div><div class="s08-pgc"><p>${codeLink(WHAT[P.n])}</p></div>`).join("");
    const m=c.querySelector(".s08-main");if(m)m.replaceWith(g);const r=c.querySelector(".head-r");if(r)r.remove();sec.after(c)});
})();
