/* =====================================================================
   FICHAS DE PRODUTO (24) · fundação · SPEC V6 §8 e §10.2
   Moldura igual à dos slides: cabeçalho (.sr-top "Ficha de produto 1.1 · Pilar 1 · IT Advisory"), faixa
   "› FICHA 1.1 · NOME" com a dica "← → navega entre fichas · Esc volta" e os botões One-page / Voltar,
   corpo branco e rodapé com os outros produtos do pilar.
   Corpo:  à esquerda a CARTA do produto (status, ★ A&M Signature, código e pilar, nome numa linha, proposta,
           para quem é, formato/comprador/modelo/encaixe, origem "Evolui de …") e a caixa "Por que A&M";
           à direita: o problema (+ fatos com fonte, se houver), o que o cliente recebe, como funciona (etapas
           numeradas, sem semanas), papel da IA, como vira produto, ferramentas e dados, skills, jogo de entrada
           (JOGOS, slide 19) e fontes (p.fontes → FONTES; o 3º elemento de kpis → FATOS).
   Tamanhos: um só degrau de densidade para as 24 fichas (letras iguais em todas): PDX.level é o mais folgado em
           que todas cabem (medido fora da tela depois das fontes carregarem; refeito na impressão).
   Tolera o formato antigo (V5): spans E()/Hy() e marcas [E · …], kpis com 2 elementos (só entram se tiverem
   marca de fonte; número sem fato do registro é omitido com console.warn), etapas "S1–2" (viram 1, 2, 3…),
   sem sig/jogo/fontes.
   API (core.js): openPD(id) · closePD(silent) · pdStep(±1) · pdHTML(P, num) · pdMeasureAll() (PRINT).
   Endereço #p=<id>; ← → navegam; Esc volta; [data-pd] em qualquer slide abre a ficha.
   ===================================================================== */
/* pdOpen e pdFrom moram em core.js */
const pd=H("div",{id:"pd",role:"dialog","aria-label":"Ficha de produto"},stage);
const PDX=(()=>{
  const warned=new Set();const warn=(k,m)=>{if(warned.has(k))return;warned.add(k);console.warn(m)};
  /* degraus de densidade (iguais para todas as fichas): letras do corpo nunca abaixo de 13 px */
  const LEVELS=["lv0","lv1","lv2","lv3"];
  const st={level:null,fontsOk:false,over:[]};
  /* jogo de entrada: JOGOS (src/data/30-jogos.js); sem o arquivo, os nomes do roteiro (SPEC §2, slide 19) */
  const JFALL={1:{id:"mesa-do-conselho",nome:"Mesa do Conselho"},2:{id:"pre-mortem-2027",nome:"Pré-mortem 2027"},3:{id:"jogo-do-dia-1",nome:"Jogo do Dia 1"},4:{id:"exercicio-de-crise",nome:"Exercício de Crise"}};
  function jogoOf(P){const J=typeof JOGOS!=="undefined"&&JOGOS?JOGOS:null;
    if(J&&P.jogo&&J[P.jogo])return J[P.jogo];
    if(J){const k=Object.keys(J).find(k=>+J[k].pilar===+P.pillar);if(k)return J[k]}
    return JFALL[P.pillar]||null}
  /* textos antigos: E()/Hy() e [E · …] viram nota "(fonte: …)" ou somem */
  function clean(s){return String(s==null?"":s)
    .replace(/<span class="hy"[^>]*>[^<]*<\/span>/g,"")
    .replace(/<span class="ev"[^>]*>([^<]*)<\/span>/g,(m,t)=>{t=t.trim().replace(/^E\s*·\s*/,"");return !t||/^(E|Evidência)$/i.test(t)?"":` <span class="pd-fn">(fonte: ${t})</span>`})
    .replace(/\s*\[E · ([^\]]+)\]/g,' <span class="pd-fn">(fonte: $1)</span>').replace(/\s*\[(?:E|H)\]/g,"")
    .replace(/ +([.,;:!?])(?=\s|$|<)/g,"$1").trim()}
  /* dentro do texto (fora das tags): códigos de produto viram link; palavras com hífen não quebram */
  const tx=(s,fn)=>String(s).split(/(<[^>]+>)/).map(x=>x.startsWith("<")?x:fn(x)).join("");
  const xref=(s,me)=>tx(s,x=>x.replace(/\b([1-4]\.[1-7])\b/g,(m,c)=>{const q=PBY(c);return q&&q.code!==me?`<a href="#p=${q.id}" data-pd="${q.id}" class="pd-xref" data-tv="${q.code} · ${q.name}" data-tl="Clique para abrir a ficha.">${c}</a>`:m}));
  const nohy=s=>tx(s,x=>x.replace(/([A-Za-zÀ-ÿ0-9]+(?:-[A-Za-zÀ-ÿ0-9]+)+)/g,'<span class="nwr">$1</span>'));
  const T=(s,me)=>xref(nohy(clean(s)),me);
  /* fatos com fonte (kpis): [valor, texto, idFato]; só fatos "verificado" do registro */
  function kpisOf(P){const out=[];(P.kpis||[]).forEach(k=>{if(!Array.isArray(k)||!k.length)return;
      if(k[2]){const f=FATO(k[2]);if(!f){warn("kf"+P.code+k[2],`[ficha] ${P.code}: fato ${k[2]} não existe no registro (FATOS); número omitido`);return}
        if(f.status&&f.status!=="verificado"){warn("ks"+P.code+k[2],`[ficha] ${P.code}: fato ${k[2]} com status "${f.status}"; número omitido até conferir`);return}
        out.push({v:k[0]||f.num||"",t:k[1]||f.txt||"",src:fatoSrc(k[2]),fid:k[2]});return}
      const m=String(k[1]||"").match(/\[E · ([^\]]+)\]/);
      if(m)out.push({v:k[0],t:String(k[1]).replace(/\s*\[E · [^\]]+\]/,""),src:m[1]});
      else warn("kn"+P.code+k[0],`[ficha] ${P.code}: número sem fato do registro omitido ("${k[0]} ${strip(k[1])}") · SPEC §4`)});
    return out.slice(0,3)}
  function fontesOf(P,kp){const ids=[];const add=id=>{if(id&&!ids.includes(id))ids.push(id)};
    (P.fontes||[]).forEach(add);kp.forEach(k=>{const f=k.fid&&FATO(k.fid);if(f)(f.fontes||[]).forEach(add)});
    if(!ids.length&&!P.ev)["portfolio-dts","proposta-dts-2027"].forEach(id=>{if(FONTE(id))add(id)});
    return ids.map(id=>{const s=FONTE(id);if(!s){warn("pf"+id,`[ficha] ${P.code}: fonte ${id} não existe no registro (FONTES)`);return `<li><span class="ref-miss">fonte não encontrada: ${esc(id)}</span></li>`}
      const lab=`${esc(s.org||"")}${s.data?` <i>${esc(s.data)}</i>`:""}`;
      return `<li title="${esc(s.titulo||"")}">${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${lab}<span class="ar">↗</span></a>`:`<span>${lab}</span>`}</li>`})}
  /* meta "Chave: valor" → linhas da carta; itens sem chave entram como "Formato" */
  function metaRows(P){const rows=[],loose=[];(P.meta||[]).forEach(m=>{const s=clean(m),i=s.indexOf(":");if(i>0&&i<26)rows.push([s.slice(0,i).trim(),s.slice(i+1).trim()]);else loose.push(s)});
    if(loose.length){const r=rows.find(r=>/^formato$/i.test(r[0]));if(r)r[1]+=" · "+loose.join(" · ");else rows.unshift(["Formato",loose.join(" · ")])}
    return rows}
  function fromHTML(P){const f=clean(P.from||"");
    if(/^Novo\b/i.test(f)){const rest=f.replace(/^Novo\s*·?\s*/i,"").replace(/^produto (novo )?com IA\s*/i,"").trim();return `<b>Produto novo com IA</b>${rest?` <span>${rest}</span>`:""}`}
    return `Evolui de ${f.split(/\s+\+\s+/).map(x=>`<b>${x}</b>`).join(" <i>+</i> ")}`}
  /* etapas: o número mostra a posição (1, 2, 3…); rótulos antigos com prazo ("S1–2", "M1", "D30–100": semana, mês,
     dia) somem (SPEC §4: sem prazos inventados) e uma palavra sem número (ex.: "Mensal") vira etiqueta ao lado do título */
  const stepTag=s=>{const l=String(s||"").trim();return !l||/\d/.test(l)||/semana|mês|dias?\b/i.test(l)?"":clean(l)};
  return{st,LEVELS,warn,jogoOf,clean,xref,nohy,T,kpisOf,fontesOf,metaRows,fromHTML,stepTag};
})();

/* ícones de linha com pathLength embutido: desenham na tela e saem inteiros na impressão */
const pdIco=(n,d)=>icoSvg(n,d).replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\b/g,'<$1 pathLength="1"');
/* ícone por palavra-chave do entregável (só ilustração) */
const PDKW=[
  [/scorecard|índice|score|maturidade|rating|prontidão/i,"gauge"],[/roadmap|plano|cronograma|trilha|jornada|ondas|transição|sucessão/i,"route"],
  [/painel|radar|telemetria|medição|benchmark|comparaç|alavanca/i,"chart"],[/contrato|cláusula|negocia|fornecedor|concorrência/i,"contract"],
  [/risco|segurança|resili|continuidade|crise|alerta|defesa/i,"shield"],[/economia|custo|preço|caixa|incentivo|benefício|valor em jogo|captura|valuation/i,"coin"],
  [/decis|aprova|recomenda|prioriz|classifica|certifica|comitê/i,"check"],[/mapa|arquitetura|inventário|catálogo|modelo operacional|organograma|desenho|taxonomia/i,"layers"],
  [/\bia\b|agente|copiloto|automati|pilotos/i,"ai"],[/time|pessoas|equipe|capacita|talento|lideran|executivo|conselho/i,"people"],
  [/dados|data room|coleta|linha de base/i,"db"],[/código|software|aplicaç|sistema|erp|integra|migra/i,"code"],[/nuvem|infra|capacidade/i,"cloud"],
  [/relatório|dossiê|parecer|playbook|kit|política|documenta|regras/i,"doc"],[/dia 1|dia 100|prazo|mensal|anual|trimestral|ciclo|marco/i,"calendar"],
  [/diagnóstico|análise|avalia|raio-x|varredura|triagem|lacunas|escopo/i,"search"],[/escala|estabiliza|lança|ativação|operar|operação/i,"rocket"],[/meta|alvo|tese|ambição|estratégia/i,"target"]];
const DEF_GET=["doc","check","layers","chart","route"];
const pdKw=(t,i,used)=>{const s=strip(String(t));const hit=PDKW.map(([re,n])=>re.test(s)?n:null).filter(Boolean).find(n=>!used.has(n));const n=hit||DEF_GET.map((_,k)=>DEF_GET[(i+k)%DEF_GET.length]).find(x=>!used.has(x))||DEF_GET[i%DEF_GET.length];used.add(n);return n};

function pdHTML(P,num){const X=PDX,me=P.code,pl=(typeof PILLARS!=="undefined"&&PILLARS.find(x=>x.n===P.pillar))||{n:P.pillar,name:""};
  const li=(a,cls)=>(a||[]).map(x=>`<li${cls?` class="${cls}"`:""}>${X.T(x,me)}</li>`).join("");
  const pains=(P.pain||[]).map(x=>{const t=X.clean(x).trim();return X.nohy(/[.!?]$/.test(t)?t:t+".")});
  const kp=X.kpisOf(P),fon=X.fontesOf(P,kp),jg=X.jogoOf(P),rows=X.metaRows(P),used=new Set();
  const get=(P.deliv||[]).map((d,i)=>`<li class="pd-g" style="--k:${i}">${pdIco(pdKw(d,i,used),i+3)}<span class="t">${X.T(d,me)}</span></li>`).join("");
  const steps=(P.steps||[]).map((s,i)=>{const tag=X.stepTag(s[0]);return `<div class="pd-s" style="--k:${i}"><i class="pd-dot" aria-hidden="true"></i><b><em>${i+1}</em>${X.clean(s[1])}${tag?` <small>${tag}</small>`:""}</b><span>${X.T(s[2],me)}</span></div>`}).join("");
  const sig=P.sig?`<span class="st new sig" data-tv="★ A&amp;M Signature" data-tl="Produto em que o direito de vencer da A&amp;M é maior: nasce do DNA de operador, liderança interina, turnaround e private equity.">★ A&amp;M Signature</span>`:"";
  const rel=(typeof PRODUCTS!=="undefined"?PRODUCTS:[]).filter(x=>x.pillar===P.pillar&&x.id!==P.id).map(x=>`<a href="#p=${x.id}" data-pd="${x.id}" class="plink sm ${x.st}" data-tv="${x.code} · ${x.name}" data-tl="Clique para abrir a ficha.">${x.code}</a>`).join("");
  const total=typeof PRODUCTS!=="undefined"?PRODUCTS.length:24;
  const lv=X.st.level||"lv0";
  /* coluna dos fatos pelo número de fatos (as letras não mudam): 1 → 300 px · 2 → 340 px · 3 → 380 px. A última linha (skills · jogo ·
     fontes) é flex com base no conteúdo (40-fichas.css): cada caixa recebe largura na proporção do próprio texto, sem ficar abaixo
     do seu item mais largo; assim nenhuma fica alta e apertada ao lado de outra vazia */
  const kw=kp.length>=3?380:kp.length===2?340:300;
  return `${frameTopHTML(`Ficha de produto ${P.code}`,`Pilar ${pl.n} · ${pl.name}`)}${bandHTML(`Ficha ${P.code} · ${P.name}`,"c-navy","← → navega entre fichas · Esc volta")}
  <div class="body pd-body"><div class="pd-wrap ${lv}">
    <div class="pd-l">
      <article class="pd-card dk" data-a="zoom" style="--d:1">
        <div class="pd-c1"><div class="pd-tags">${STATUS[P.st]?stTag(P.st):""}${sig}</div><span class="pd-cd" title="Produto ${P.code} · Pilar ${pl.n} · ${esc(pl.name)}"><b>${P.code}</b><span class="pd-ic">${pdIco((typeof PICO!=="undefined"&&PICO[P.code])||"spark",1)}</span></span></div>
        <h3 class="pd-nm">${P.name}</h3>
        <p class="pd-tg">${X.clean(P.tagline)}</p>
        <p class="pd-pt">${X.T(P.pitch,me)}</p>
        <div class="pd-art" aria-hidden="true"><span>${pdIco((typeof PICO!=="undefined"&&PICO[P.code])||"spark",2)}</span></div>
        <dl class="pd-kv">
          <div class="pd-who"><dt>Para quem é</dt><dd><ul${(P.who||[]).length>=3&&Math.max(...P.who.map(x=>strip(x).length))<=34?' class="two"':""}>${li(P.who)}</ul></dd></div>
          ${rows.map(([k,v])=>`<div><dt>${k}</dt><dd>${X.xref(v,me)}</dd></div>`).join("")}
          <div class="pd-from"><dt>Origem</dt><dd>${X.fromHTML(P)}</dd></div>
        </dl>
      </article>
      <section class="pd-why" data-a="fade" style="--d:6"><p><span class="pd-lb">${pdIco("hand",6)}Por que A&amp;M</span>${X.T(P.bench,me)}</p></section>
    </div>
    <div class="pd-r">
      <div class="pd-top${kp.length?"":" solo"}" style="--kw:${kw}px">
        <div class="pd-tl">
          <section class="pd-prob" data-a="up" style="--d:2"><span class="pd-lb">O problema</span><p class="pd-stm"><b>${pains[0]||""}</b>${pains.slice(1).map(x=>` <span>${x}</span>`).join("")}</p></section>
          <section class="pd-sec" data-a="up" style="--d:3"><span class="pd-lb">O que o cliente recebe</span><ol class="pd-get">${get}</ol></section>
        </div>
        ${kp.length?`<section class="pd-num" data-a="left" style="--d:3"><span class="pd-lb">O que pesa · fatos com fonte</span><div class="pd-kp">${kp.map(k=>`<div class="pd-k"><b>${k.v}</b><div><span>${X.clean(k.t)}</span>${k.src?`<small>${esc(k.src)}</small>`:""}</div></div>`).join("")}</div></section>`:""}
      </div>
      <section class="pd-sec" data-a="up" style="--d:4"><span class="pd-lb">Como funciona · etapas</span><div class="pd-flow" style="--n:${(P.steps||[]).length||1}"><i class="pd-trk" aria-hidden="true"></i>${steps}</div></section>
      <div class="pd-trio" data-a="up" style="--d:5">
        <section class="pd-box ai"><span class="pd-lb">${SPARK}Papel da IA</span><ul>${li(P.ai)}</ul></section>
        <section class="pd-box"><span class="pd-lb">Como vira produto</span><ul>${li(P.prodz)}</ul></section>
        <section class="pd-box"><span class="pd-lb">Ferramentas e dados</span><p><b>Ferramentas</b> ${X.T(P.tools,me)}</p><p><b>Dados</b> ${X.T(P.data,me)}</p></section>
      </div>
      <div class="pd-row5${jg?"":" solo"}" data-a="up" style="--d:6">
        <section class="pd-skl"><span class="pd-lb">Skills</span><p class="pd-sk">${(P.skills||[]).map((x,i,a)=>`<span class="nwr">${X.clean(x)}${i<a.length-1?`<i aria-hidden="true"> ·</i>`:""}</span>`).join(" ")}</p></section>
        ${jg?`<section class="pd-jogo" title="Jogo de entrada do Pilar ${pl.n}"><div class="pd-jh"><span class="pd-lb">${pdIco("target",7)}Jogo de entrada</span></div><p><b class="pd-jn">${jg.nome||""}</b>${jg.promessa?` ${X.clean(jg.promessa)}`:""} <a href="#19" data-go="19" class="pd-jl" data-tv="Jogos de entrada" data-tl="As quatro experiências lúdicas que abrem a porta para os produtos (slide 19).">ver os jogos ›</a></p></section>`:""}
        <section class="pd-fon"><span class="pd-lb">Fontes</span>${fon.length?`<ol>${fon.join("")}</ol>`:""}${P.ev?`<p class="pd-ev">${X.clean(P.ev)}</p>`:""}</section>
      </div>
    </div>
  </div></div>
  <div class="foot pd-foot"><b>${CFG.foot}</b><span class="rel"><span class="lbl">Outros do Pilar ${pl.n}</span>${rel}</span><span class="n">Ficha ${num} / ${total}</span></div>`}

/* --- medida: o degrau mais folgado em que as 24 fichas cabem (mesmas letras em todas) ---
   conta só filhos no fluxo e a posição de layout (offsetTop), sem efeito das animações de entrada nem dos enfeites */
const pdInOver=el=>{if(!el||!el.offsetHeight)return false;const lim=el.clientHeight-parseFloat(getComputedStyle(el).paddingBottom)+1;let m=0;
  for(const c of el.children){const ps=getComputedStyle(c).position;if(ps==="absolute"||ps==="fixed")continue;m=Math.max(m,c.offsetTop+c.offsetHeight)}return m>lim};
const pdOverflow=root=>[".pd-l",".pd-r",".pd-card",".pd-box",".pd-why",".pd-jogo",".pd-fon"].some(q=>[...root.querySelectorAll(q)].some(pdInOver));
function pdMeasureAll(force){if(typeof PRODUCTS==="undefined"||!PRODUCTS.length)return PDX.st.level;
  const ok=!document.fonts||document.fonts.status==="loaded";if(PDX.st.level&&PDX.st.fontsOk&&!force)return PDX.st.level;
  /* o degrau só sobe: cada ficha começa no degrau que as anteriores já exigiram (≈ 24 desenhos em vez de 24 × degraus) */
  const box=H("div",{class:"pd-measure","aria-hidden":"true"},stage),LV=PDX.LEVELS;let k=0;const bad=[];
  for(const P of PRODUCTS){for(;;){PDX.st.level=LV[k];box.innerHTML=safe(()=>pdHTML(P,1))||"";if(!pdOverflow(box))break;if(k===LV.length-1){bad.push(P.code);break}k++}}
  const lv=LV[k];box.remove();PDX.st.level=lv;PDX.st.fontsOk=ok;PDX.st.over=bad;
  if(bad.length)console.warn(`[ficha] não cabem nem no degrau mais compacto: ${bad.join(", ")} (encurte os textos dessas fichas)`);
  return lv}
PRINT.push(()=>pdMeasureAll(true));
/* mede depois que as fontes carregarem, num momento ocioso, sem atrasar a abertura da primeira ficha;
   se uma ficha já estiver aberta e o degrau mudar, ela é redesenhada no degrau novo */
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{const run=()=>{if(PDX.st.fontsOk)return;const lv0=PDX.st.level;safe(()=>pdMeasureAll(true));if(pdOpen&&PDX.st.level!==lv0)safe(()=>renderPD(pdOpen,true))};
  if("requestIdleCallback" in window)requestIdleCallback(run,{timeout:3000});else setTimeout(run,800)});

/* --- carta: inclinação 3D com brilho que segue o cursor (lúdico; desligada com movimento reduzido) --- */
function pdHolo(el,max){max=max||7;if(REDMO||!el)return;
  el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.classList.add("hover");
    el.style.transform=`perspective(1200px) rotateX(${(.5-py)*max}deg) rotateY(${(px-.5)*max}deg)`;el.style.setProperty("--mx",px*100+"%");el.style.setProperty("--my",py*100+"%")});
  el.addEventListener("pointerleave",()=>{el.classList.remove("hover");el.style.transform=""})}

function renderPD(id,keep){const k=PRODUCTS.findIndex(x=>x.id===id);if(k<0)return false;const P=PRODUCTS[k];
  if(!PDX.st.level)safe(()=>pdMeasureAll());
  pd.classList.toggle("play",!!keep);pd.innerHTML=pdHTML(P,k+1);
  const band=pd.querySelector(".sr-band");if(band){const nav=H("div",{class:"pd-nav"},band);
    const op=H("button",{type:"button","data-tv":"One-page","data-tl":"Volta ao mapa do novo portfólio (slide 9)."},nav,"One-page");op.onclick=e=>{e.stopPropagation();closePD(true);go(ONEPAGE-1,true)};
    const bk=H("button",{type:"button",class:"bk","data-tv":"Voltar à apresentação · Esc","data-tl":"Fecha a ficha e volta ao slide de onde ela foi aberta."},nav,"✕ Voltar");bk.onclick=e=>{e.stopPropagation();closePD()}}
  plainBadges(pd);fixPaths(pd);refFill(pd);deckMasc(pd);pdHolo(pd.querySelector(".pd-card"));return true}
function openPD(id){if(typeof PRODUCTS==="undefined"||!PRODUCTS.some(x=>x.id===id))return;tipEl.classList.remove("on");
  if(isFlipped())safe(()=>window.unflipPage());if(chapOn)hideChapter(true);if(!pdOpen)pdFrom=cur;if(!renderPD(id))return;
  pdOpen=id;navIdx(cur,PRODUCTS.find(x=>x.id===id).pillar);ctlMode(true);$("bFlip").disabled=true;
  pd.classList.remove("on");void pd.offsetWidth;pd.classList.add("on");void pd.offsetWidth;pd.classList.add("play");
  try{history.replaceState(null,"","#p="+id)}catch(e){}$("bPrev").disabled=false;$("bNext").disabled=false;
  $("cnt").textContent=`Ficha ${PRODUCTS.findIndex(x=>x.id===id)+1} / ${PRODUCTS.length}`;DECK_EV("deck:ficha",{id})}
function closePD(silent){if(!pdOpen)return;pdOpen=null;pd.classList.remove("on","play");ctlMode(false);navIdx(cur);$("bFlip").disabled=false;
  if(!silent&&pdFrom!==cur){activate(pdFrom,true)}else{$("cnt").textContent=`${cur+1} / ${N}`;$("bPrev").disabled=cur===0;$("bNext").disabled=cur===N-1;try{history.replaceState(null,"","#"+(cur+1))}catch(e){}}}
function pdStep(d){const k=PRODUCTS.findIndex(x=>x.id===pdOpen);const n=(k+d+PRODUCTS.length)%PRODUCTS.length;openPD(PRODUCTS[n].id)}
