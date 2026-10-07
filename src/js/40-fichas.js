/* Arquivo carregado depois de engine.js, data.js, core.js, slides.js e 05-icons.js (ver build.py). */
/* =====================================================================
   FICHA DE PRODUTO · modelo "Tech M&A Playbook" da apresentação DTS Tech M&A
   (fx 03 · Hologram 3D Cards · hiperlink #p=<id>)
   À esquerda: card hologram (status + pulso, rótulo mono, nome, subtítulo laranja,
   frase, público, formato, origem) e a caixa "Por que A&M".
   À direita: o problema, o que o cliente recebe, como funciona (ponto correndo),
   o produto em números, papel da IA, como vira produto, ferramentas e dados,
   skills e a fonte da ficha. Rodapé: links para os outros produtos do pilar.
   Densidade: pdFit escolhe, por coluna, o tamanho mais folgado que cabe no palco
   (o resultado fica em PDFIT; a impressão mede as 24 fichas antes de gerar as páginas).
   ===================================================================== */
const pd=H("div",{id:"pd",class:"stage"},stage);let pdOpen=null,pdFrom=0;
const evb=t=>t.replace(/\s*\[E · ([^\]]+)\]/g,' <span class="srcx">Fonte: $1</span>').replace(/\s*\[E\]/g,"");

/* ícones de linha com pathLength embutido: desenham na tela e saem inteiros na impressão */
const pdIco=(n,d)=>icoSvg(n,d).replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\b/g,'<$1 pathLength="1"');
/* ícone por palavra-chave (só ilustração; o texto é o do data.js) */
const PDKW=[
  [/scorecard|índice|score|maturidade|health|rating|prontidão|readiness/i,"gauge"],
  [/roadmap|plano|cronograma|trilha|jornada|ondas|rollout|transição|sucessão|passar o bastão/i,"route"],
  [/painel|dashboard|radar|telemetria|medição|benchmark|comparaç|alavanca/i,"chart"],
  [/contrato|cláusula|tsa|rfp|term sheet|negocia|fornecedor|sourcing/i,"contract"],
  [/risco|segurança|cyber|resili|continuidade|crise|red flag|alerta|guardrail|assurance|fiscaliza|defesa|bia\b|dr\b/i,"shield"],
  [/r\$|economia|custo|sinergia|business case|preço|caixa|incentivo|benefício|valor em jogo|capex|tco|finops|captura|valuation|equity/i,"coin"],
  [/decis|go\/no-go|aprova|recomenda|top-\d|prioriz|classifica|certifica|comitê|go-live/i,"check"],
  [/mapa|arquitetura|inventário|repositório|catálogo|modelo operacional|organograma|desenho|blueprint|taxonomia|cubo|disposição|fit-gap/i,"layers"],
  [/\bia\b|agente|copiloto|llm|genai|automati|pilotos/i,"ai"],
  [/time|pessoas|equipe|capacita|trilhas|talento|lideran|executivo|campeões|personas|entrevista|workshop|match|fluency|conselho/i,"people"],
  [/dados|data room|vdr|coleta|ingest|base(line)?\b|linha de base|onboarding/i,"db"],
  [/código|software|aplicaç|sistema|erp|integra|migra|cutover|refactor/i,"code"],
  [/nuvem|cloud|infra|vmware|capacidade/i,"cloud"],
  [/relatório|dossiê|parecer|playbook|kit|política|documenta|regras/i,"doc"],
  [/dia 1|dia 100|100 dias|semana|prazo|mensal|anual|trimestral|ciclo|marco/i,"calendar"],
  [/diagnóstico|análise|avalia|raio-x|forense|varredura|triagem|descobr|lacunas|escopo|necessidade|mercado|oportunidades|cenários/i,"search"],
  [/escala|estabiliza|lança|ativação|entregar|operar|operação|comandar|transformar/i,"rocket"],
  [/meta|alvo|tese|ambição|princípios|estratégia|enquadramento/i,"target"]
];
/* escolhe o ícone pelo texto (nome antes da descrição), sem repetir na mesma linha */
const pdKw=(texts,i,def,used)=>{const hits=[];texts.forEach(t=>{const s=strip(String(t));PDKW.forEach(([re,n])=>{if(re.test(s)&&!hits.includes(n))hits.push(n)})});
  const n=hits.find(x=>!used.has(x))||def.map((_,k)=>def[(i+k)%def.length]).find(x=>!used.has(x))||hits[0]||def[i%def.length];used.add(n);return n};
const DEF_GET=["doc","check","layers","chart","route"],DEF_STEP=["search","people","chart","target","flag"];

/* densidade: as letras têm só dois degraus (PDLV), iguais em todas as fichas; o ajuste fino ao palco fica nos espaçamentos.
   Cada medida vai do valor folgado (t=0) ao compacto (t=1). pdFit escolhe, por coluna, o degrau de letra mais folgado
   em que tudo cabe e, dentro dele, o espaçamento mais folgado (nome com 38px; só encolhe se passar de 2 linhas).
   esquerda: nome, subtítulo, frase, público, caixa A&M, chips (letras) · gap, padding, respiro do card (espaços)
   direita : frase do problema, texto, valor dos números (letras) · bloco de ícone, gap mínimo, padding (espaços) */
const PDL={nm:[38,38],tg:[19,14.5],pt:[15.5,12.5],wl:[14,12],cg:[16,7],cp:[28,16],wy:[14,11.5],cf:[12.5,11.5],mg:[26,4]};
const PDR={st:[28,20],b:[14.5,12],kv:[34,24],ic:[46,36],sg:[22,8],cpd:[14,9]};
const PDFK=new Set(["nm","tg","pt","wl","wy","cf","st","b","kv"]),PDLV=[.35,1];
const PDFIT={};
const pdLerp=(T,t,tf)=>Object.entries(T).map(([k,[a,b]])=>{const u=PDFK.has(k)?tf:t;return[k,Math.round((a+(b-a)*u)*4)/4]});
function pdVars(f){const L=pdLerp(PDL,f.tl,f.fl==null?PDLV[0]:f.fl),R=pdLerp(PDR,f.tr,f.fr==null?PDLV[0]:f.fr);if(f.nm)L[0][1]=f.nm;return L.concat(R).map(([k,v])=>`--${k}:${v}px`).join(";")}

function pdHTML(P,num){const pl=PILLARS.find(x=>x.n===P.pillar);const f=PDFIT[P.id]||{tl:.5,tr:.6,nm:0};
  /* texto fora das tags: códigos de outros produtos viram link para a ficha; palavras com hífen ficam inteiras */
  const txt=(s,fn)=>String(s).split(/(<[^>]+>)/).map(x=>x.startsWith("<")?x:fn(x)).join("");
  const xref=s=>txt(s,x=>x.replace(/\b([1-4]\.[1-7])\b/g,(m,c)=>{const q=PBY(c);return q&&q.code!==P.code?`<a href="#p=${q.id}" data-pd="${q.id}" class="pd-xref" data-tv="${q.code} · ${q.name}" data-tl="Clique para abrir a ficha.">${c}</a>`:m}));
  const nohy=s=>txt(s,x=>x.replace(/([A-Za-zÀ-ÿ0-9]+(?:-[A-Za-zÀ-ÿ0-9]+)+)/g,'<span class="nwr">$1</span>'));
  const li=a=>a.map(x=>`<li>${xref(x)}</li>`).join("");
  const who2=P.who.length>=3&&Math.max(...P.who.map(x=>strip(x).length))<=30;
  /* origem: cada serviço de origem em uma peça sem quebra; a nota final entre parênteses (em minúscula, ex.: "(vem do Pilar 1)")
     vira peça própria, enquanto parênteses que fazem parte do nome, como "(Buy Side)", ficam junto do nome */
  const from=P.from.split(/\s+\+\s+/).map(x=>x.split(/\s+(?=\([a-zà-ú][^()]*\)$)/).map(y=>`<b>${y}</b>`).join(" ")).join(" <i>+</i> ");
  const fromLbl=/^Novo\b/.test(P.from)?"Origem":"Nasce de";
  const pains=P.pain.map(x=>{const t=x.trim();return nohy(/[.!?]$/.test(t)?t:t+".")});
  const ug=new Set(),us=new Set();
  const get=P.deliv.map((d,i)=>`<div style="--k:${i}"><span class="r">${pdIco(pdKw([d],i,DEF_GET,ug),i+3)}<em>${pad(i+1)}</em></span><span class="t">${xref(nohy(d))}</span></div>`).join("");
  /* ícone da etapa: o 4º item de steps fixa o ícone quando a palavra-chave escolheria mal */
  const flow=P.steps.map((s,i)=>{const ic=s[3]||pdKw([s[1],s[2]],i,DEF_STEP,us);if(s[3])us.add(s[3]);return`<div class="s" style="--k:${i}"><i>${pdIco(ic,i+5)}</i><em>${s[0]}</em><b>${s[1]}</b><span>${xref(s[2])}</span></div>`}).join("");
  const kpis=P.kpis.map((k,i)=>`<div style="--k:${i}"><b>${k[0]}</b><span>${evb(k[1])}${/\[E\b|\(meta/.test(k[1])?"":' <span class="srcx">proposta DTS</span>'}</span></div>`).join("");
  const rel=PRODUCTS.filter(x=>x.pillar===P.pillar&&x.id!==P.id).map(x=>`<a href="#p=${x.id}" data-pd="${x.id}" class="plink sm dk ${x.st}" title="Abrir ficha: ${x.name}">${x.code} ${x.name}</a>`).join("");
  return `<div class="top">${brand(true)}<div class="top-title"><span>Ficha de produto · Pilar ${pl.n} · ${pl.name}</span><b>${P.code} · ${P.name}</b></div><div class="top-right"><span class="pg"><b>${pad(num)}</b> / ${pad(PRODUCTS.length)}</span></div></div>
  <div class="body pd-body"><div class="pd-wrap" style="${pdVars(f)}">
    <div class="pd-hero">
      <div class="pd-scene" data-a="zoom" style="--d:1">
        <div class="pd-holo">
          <div class="pd-hd pz" style="--z:4"><div class="tags">${stTag(P.st)}${P.sig?'<span class="st new sig" data-tv="★ A&amp;M Signature" data-tl="Maior direito de vencer (DNA operador) · avaliação DTS a validar com os sócios.">★ A&amp;M Signature</span>':""}</div><span class="pd-ic">${pdIco(PICO[P.code]||"spark",1)}<span class="pulse"></span></span></div>
          <div class="pd-ttl pz" style="--z:9"><div class="pd-ph">Produto ${P.code} · Pilar ${pl.n} · ${pl.name}</div><div class="pd-name">${P.name}<small>${P.tagline}</small></div></div>
          <p class="pd-pitch pz" style="--z:6">${P.pitch}</p>
          <div class="pd-who pz${who2?" two":""}" style="--z:4"><span class="label">Para quem é</span><ul>${li(P.who)}</ul></div>
          <div class="pd-fmt pz" style="--z:3"><span class="label">Formato e encaixe</span><div class="chips">${P.meta.map(m=>`<span>${xref(m)}</span>`).join("")}</div></div>
          <div class="pd-from pz" style="--z:2"><span class="label">${fromLbl}</span>${from}</div>
        </div>
      </div>
      <div class="pd-why" data-a="fade" style="--d:9"><span class="label">${pdIco("hand",8)}Por que A&amp;M · mercado e diferencial</span><p>${P.bench.replace(/\s*<span class="ev">Evidência<\/span>/g,"")}</p></div>
    </div>
    <div class="pd-right">
      <section class="pd-sec pd-prob" data-a="up" style="--d:2"><span class="label">O problema</span><p class="stmt"><b>${pains[0]}</b>${pains.slice(1).map(x=>` <span>${x}</span>`).join("")}</p></section>
      <section class="pd-sec" data-a="up" style="--d:3"><span class="label">O que o cliente recebe</span><div class="pd-get">${get}</div></section>
      <section class="pd-sec" data-a="up" style="--d:5"><span class="label">Como funciona · método e etapas</span><div class="pd-flow" style="--n:${P.steps.length}"><div class="pd-track"><i></i></div>${flow}</div></section>
      <section class="pd-sec" data-a="up" style="--d:6"><span class="label">O produto em números</span><div class="pd-out">${kpis}</div></section>
      <div class="pd-trio" data-a="fade" style="--d:7">
        <section class="pd-card ai"><span class="label">${SPARK}Papel da IA</span><ul>${li(P.ai)}</ul></section>
        <section class="pd-card"><span class="label">Como vira produto</span><ul>${li(P.prodz)}</ul></section>
        <section class="pd-card tl"><span class="label">Ferramentas e dados</span><p><b>Ferramentas:</b> ${P.tools}</p><p><b>Dados:</b> ${P.data}</p></section>
      </div>
      <div class="pd-tech" data-a="mask" style="--d:9"><span class="label">Skills aplicadas</span>${P.skills.map(x=>`<span class="pd-chip">${x}</span>`).join("")}</div>
      ${P.ev?`<p class="pd-src" data-a="fade" style="--d:10"><b>FONTES E NOTAS</b>${P.ev}</p>`:""}
    </div>
  </div></div>
  <div class="pd-foot"><div class="rel"><span class="label">Outros do Pilar ${pl.n}</span>${rel}</div></div>`}

/* --- ajuste ao palco: o valor mais folgado que cabe, por coluna (busca binária em t) --- */
function pdOver(box){if(!box)return false;const lim=box.clientHeight-parseFloat(getComputedStyle(box).paddingBottom)+1;let m=0;for(const c of box.children){if(getComputedStyle(c).position==="absolute")continue;m=Math.max(m,c.offsetTop+c.offsetHeight)}return m>lim}
function pdLines(nm){const t=nm&&nm.firstChild;if(!t||t.nodeType!==3)return 1;const rg=document.createRange();rg.selectNodeContents(t);const tops=[];[...rg.getClientRects()].forEach(r=>{if(r.width>0&&!tops.some(y=>Math.abs(y-r.top)<4))tops.push(r.top)});return tops.length||1}
function pdFit(root){const w=root.querySelector(".pd-wrap");if(!w||!w.offsetHeight)return null;
  const hero=w.querySelector(".pd-hero"),card=w.querySelector(".pd-holo"),R=w.querySelector(".pd-right"),nm=w.querySelector(".pd-name");const f={tl:0,tr:0,fl:PDLV[0],fr:PDLV[0],nm:0};
  const ok={tl:()=>!pdOver(card)&&!pdOver(hero),tr:()=>!pdOver(R)};
  const fitName=()=>{let n=parseFloat(getComputedStyle(w).getPropertyValue("--nm"));
    if(pdLines(nm)>2){let lo=26,hi=n;while(hi-lo>.5){const m=Math.round(lo+hi)/2;w.style.setProperty("--nm",m+"px");if(pdLines(nm)>2)hi=m;else lo=m}n=lo;w.style.setProperty("--nm",n+"px")}return n};
  const apply=()=>{f.nm=f.nmc||0;w.style.cssText=pdVars(f);f.nm=fitName();w.style.cssText=pdVars(f)};
  /* por coluna: o degrau de letra mais folgado que cabe com algum espaçamento; dentro dele, o espaçamento mais folgado */
  const col=(tk,fk)=>{for(let j=0;j<PDLV.length;j++){f[fk]=PDLV[j];f[tk]=0;apply();if(ok[tk]())return;f[tk]=1;apply();
      if(ok[tk]()||j===PDLV.length-1){let lo=0,hi=1;if(ok[tk]())for(let k=0;k<6;k++){const m=(lo+hi)/2;f[tk]=m;apply();if(ok[tk]())hi=m;else lo=m}f[tk]=hi;apply();return}}};
  col("tl","fl");
  /* último recurso (nome longo em 2 linhas numa coluna cheia): o nome desce até caber, nunca abaixo de 30px */
  for(let n=37;!ok.tl()&&n>=30;n--){f.nmc=n;apply()}
  col("tr","fr");apply();return {tl:f.tl,tr:f.tr,fl:f.fl,fr:f.fr,nm:f.nm}}
/* impressão: mede as 24 fichas fora da tela antes de buildPrint gerar as páginas */
/* (idempotente: com as páginas já criadas não mede nada; fichas já medidas com as fontes carregadas ficam no cache) */
function pdMeasureAll(){if(stage.querySelector(".pd-print"))return;
  const ok=document.fonts&&document.fonts.status==="loaded";const todo=PRODUCTS.filter(P=>!(ok&&PDFIT[P.id]&&PDFIT[P.id].v===1));if(!todo.length)return;
  const box=H("div",{class:"stage pd-measure"},stage);
  todo.forEach(P=>{box.innerHTML=pdHTML(P,PRODUCTS.indexOf(P)+1);plainBadges(box);const f=pdFit(box);if(f)PDFIT[P.id]=ok?Object.assign(f,{v:1}):f});box.remove()}
PRINT.push(pdMeasureAll);

/* --- card hologram: inclinação 3D com brilho e paralaxe que seguem o cursor (fx 03) --- */
function pdHolo(el,max){max=max||8;if(REDMO||!el)return;
  el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.classList.remove("out");el.classList.add("hover");
    el.style.transform=`rotateX(${(.5-py)*max}deg) rotateY(${(px-.5)*max}deg)`;el.style.setProperty("--mx",px*100+"%");el.style.setProperty("--my",py*100+"%");el.style.setProperty("--px",(px-.5).toFixed(3));el.style.setProperty("--py",(py-.5).toFixed(3))});
  el.addEventListener("pointerleave",()=>{el.classList.add("out");el.classList.remove("hover");el.style.transform="";el.style.setProperty("--px",0);el.style.setProperty("--py",0)})}

function renderPD(id){const k=PRODUCTS.findIndex(x=>x.id===id);if(k<0)return false;const P=PRODUCTS[k];
  pd.classList.remove("play");pd.innerHTML=pdHTML(P,k+1);
  const KB=`→ e ← navegam entre as ${PRODUCTS.length} fichas · Esc volta à apresentação`;
  const nav=H("div",{class:"pd-nav","data-tv":"Navegação","data-tl":KB});pd.querySelector(".top-right").prepend(nav);
  const bk=H("button",{class:"bk","data-tv":"Voltar à apresentação · Esc","data-tl":"Fecha a ficha e volta ao slide de onde ela foi aberta."},nav,"← Voltar à apresentação");bk.onclick=()=>closePD();
  const bp=H("button",{"data-tv":"Ficha anterior · ←","data-tl":KB},nav,"‹ Anterior");bp.onclick=()=>pdStep(-1);
  const bn=H("button",{"data-tv":"Próxima ficha · →","data-tl":KB},nav,"Próxima ›");bn.onclick=()=>pdStep(1);
  const op=H("button",{"data-tv":"One-page","data-tl":"Volta ao mapa do novo portfólio (One-page)."},nav,"One-page");op.onclick=()=>{closePD(true);go(ONEPAGE-1,true)};
  /* dica de teclado no topo, ao lado do contador: sempre visível, em todas as fichas */
  pd.querySelector(".top-right .pg").before(H("span",{class:"pd-kbd short","data-tv":"Navegação","data-tl":KB,html:`<b>←</b><b>→</b><span class="sh">fichas</span><i>·</i><b>Esc</b><span class="sh">volta</span>`}));
  plainBadges(pd);fixPaths(pd);return true}
/* versão longa da dica se couber ao lado dos links do pilar, curta se não, oculta se nem a curta couber (os links nunca são cortados) */
function pdKbd(){}
function openPD(id){tipEl.classList.remove("on");if(!PRODUCTS.some(x=>x.id===id))return;if(chapOn)hideChapter(true);if(!pdOpen)pdFrom=cur;if(!renderPD(id))return;pdOpen=id;railSync(cur,PRODUCTS.find(x=>x.id===id).pillar);ctlMode(true);pd.classList.remove("on");void pd.offsetWidth;pd.classList.add("on");
  const ok=document.fonts&&document.fonts.status==="loaded",c=PDFIT[id];
  const cached=ok&&c&&c.v===1&&!pdOver(pd.querySelector(".pd-holo"))&&!pdOver(pd.querySelector(".pd-hero"))&&!pdOver(pd.querySelector(".pd-right"));
  if(!cached){const f=pdFit(pd);if(ok){if(f)PDFIT[id]=Object.assign(f,{v:1})}
    else if(document.fonts)document.fonts.ready.then(()=>{if(pdOpen===id){const g=pdFit(pd);if(g)PDFIT[id]=Object.assign(g,{v:1});pdKbd()}})}
  pdKbd();pdHolo(pd.querySelector(".pd-holo"));void pd.offsetWidth;pd.classList.add("play");
  history.replaceState(null,"","#p="+id);$("bPrev").disabled=false;$("bNext").disabled=false;$("cnt").textContent=`Ficha ${pad(PRODUCTS.findIndex(x=>x.id===id)+1)} / ${PRODUCTS.length}`;if(infoP.classList.contains("on"))fillInfo()}
function closePD(silent){if(!pdOpen)return;pdOpen=null;pd.classList.remove("on");ctlMode(false);railSync(cur);if(!silent&&pdFrom!==cur){activate(pdFrom,true)}else{$("cnt").textContent=`${pad(cur+1)} / ${pad(N)}`;$("bPrev").disabled=cur===0;$("bNext").disabled=cur===N-1;history.replaceState(null,"","#"+(cur+1));if(infoP.classList.contains("on"))fillInfo()}}
function pdStep(d){const k=PRODUCTS.findIndex(x=>x.id===pdOpen);const n=(k+d+PRODUCTS.length)%PRODUCTS.length;openPD(PRODUCTS[n].id)}
