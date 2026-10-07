/* Arquivo carregado depois de engine.js, data.js, core.js e slides.js (ver build.py). */
/* =====================================================================
   FICHA DE PRODUTO (fx 03 · card hologram · hiperlink #p=<id>)
   ===================================================================== */
const pd=H("div",{id:"pd",class:"stage"},stage);let pdOpen=null,pdFrom=0;
const evb=t=>t.replace(/\s*\[E · ([^\]]+)\]/g,' <span class="srcx">Fonte: $1</span>').replace(/\s*\[E\]/g,"");
function pdHTML(P,num){const pl=PILLARS.find(x=>x.n===P.pillar);
  const steps=P.steps.map((s,i)=>`<div class="pd-step"><div class="w">${pad(i+1)}</div><div class="wl">${s[0]}</div><b>${s[1]}</b><span>${s[2]}</span></div>`).join("");
  const li=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  return `<div class="top">${brand(true)}<div class="top-title"><span>Ficha de produto · Pilar ${pl.n} · ${pl.name}</span><b>${P.code} · ${P.name}</b></div><div class="top-right"><span class="pg"><b>${pad(num)}</b> / ${pad(PRODUCTS.length)}</span></div></div>
  <div class="body"><div class="pd-wrap">
    <div class="pd-holo">
      <div class="hd"><div class="tags">${stTag(P.st)}${P.sig?'<span class="st new">★ A&amp;M Signature</span>':""}</div><span class="pulse"></span></div>
      <div class="pd-ph">Pilar ${pl.n} · ${pl.name}</div>
      <div class="pd-name">${P.name}<small>${P.tagline}</small></div>
      <div class="pd-pitch">${P.pitch}</div>
      <div class="pd-meta">${P.meta.map(m=>`<span>${m}</span>`).join("")}</div>
      <div class="pd-rel"><span class="label">Outros produtos do pilar</span><div>${PRODUCTS.filter(x=>x.pillar===P.pillar&&x.id!==P.id).map(x=>`<a href="#p=${x.id}" data-pd="${x.id}" class="plink sm dk ${x.st}">${x.code} ${x.name}</a>`).join("")}</div></div>
      <div class="pd-kpis">${P.kpis.map(k=>`<div class="pd-kpi"><b>${k[0]}</b><span>${evb(k[1])}</span></div>`).join("")}</div>
      <div class="pd-from">Nasce de: <b>${P.from}</b></div>
    </div>
    <div class="pd-right">
      <div class="pd-grid">
        <div class="pd-box"><div class="h"><i>1</i>Público-alvo</div>${li(P.who)}</div>
        <div class="pd-box"><div class="h"><i>2</i>Problema resolvido</div>${li(P.pain)}</div>
        <div class="pd-box"><div class="h"><i>3</i>Entregáveis</div>${li(P.deliv)}</div>
      </div>
      <div class="pd-sec"><div class="label"><i>4</i>Método e etapas</div><div class="pd-steps">${steps}</div></div>
      <div class="pd-grid">
        <div class="pd-box"><div class="h"><i>5</i>Ferramentas e dados</div><p><b>Ferramentas:</b> ${P.tools}</p><p style="margin-top:6px"><b>Dados:</b> ${P.data}</p></div>
        <div class="pd-box ai"><div class="h"><i>6</i>Papel da IA</div>${li(P.ai)}</div>
        <div class="pd-box"><div class="h"><i>7</i>Do serviço ao produto</div>${li(P.prodz)}</div>
      </div>
      <div class="pd-sec"><div class="label"><i>S</i>Skills aplicadas</div><div class="pd-skills">${P.skills.map(s=>`<span class="pd-skill">${s}</span>`).join("")}</div></div>
      <div class="pd-bench">${P.bench}</div>
    </div>
  </div></div>`}
function renderPD(id){const k=PRODUCTS.findIndex(x=>x.id===id);if(k<0)return false;const P=PRODUCTS[k];pd.innerHTML=pdHTML(P,k+1);
  const ft=H("div",{class:"pd-foot"},pd);H("div",{class:"rel",html:`<span>→ e ← navegam entre as 24 fichas · Esc volta à apresentação</span>`},ft);
  const nav=H("div",{class:"pd-nav"},ft);const bk=H("button",{class:"bk"},nav,"← Voltar à apresentação");bk.onclick=()=>closePD();
  const bp=H("button",null,nav,"‹ Anterior");bp.onclick=()=>pdStep(-1);const bn=H("button",null,nav,"Próxima ›");bn.onclick=()=>pdStep(1);
  const op=H("button",null,nav,"One-page");op.onclick=()=>{closePD(true);go(ONEPAGE-1,true)};
  plainBadges(pd);tilt(pd.querySelector(".pd-holo"));pd.classList.remove("play");void pd.offsetWidth;pd.classList.add("play");return true}
function openPD(id){if(!pdOpen)pdFrom=cur;if(!renderPD(id))return;pdOpen=id;pd.classList.remove("on");void pd.offsetWidth;pd.classList.add("on");history.replaceState(null,"","#p="+id);$("bPrev").disabled=false;$("bNext").disabled=false;$("cnt").textContent=`Ficha ${pad(PRODUCTS.findIndex(x=>x.id===id)+1)} / ${PRODUCTS.length}`;if(infoP.classList.contains("on"))fillInfo()}
function closePD(silent){if(!pdOpen)return;pdOpen=null;pd.classList.remove("on");if(!silent){activate(pdFrom,true)}else{$("cnt").textContent=`${pad(cur+1)} / ${pad(N)}`;$("bPrev").disabled=cur===0;$("bNext").disabled=cur===N-1;history.replaceState(null,"","#"+(cur+1))}}
function pdStep(d){const k=PRODUCTS.findIndex(x=>x.id===pdOpen);const n=(k+d+PRODUCTS.length)%PRODUCTS.length;openPD(PRODUCTS[n].id)}

