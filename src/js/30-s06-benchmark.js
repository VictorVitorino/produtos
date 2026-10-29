/* =====================================================================
   SLIDE 06 · Benchmark 2026 (Timeline Motion) · dono: slide 06
   Ganchos pela chave data-s: ENTER["06"] (ao entrar), STEP["06"] (→/← internos), PRINT.push(f) (impressão).
   ===================================================================== */
/* ---------- benchmark · timeline 2026 ---------- */
(function(){const host=$("tlMarket");let tl=null;
  const T4=[["Plataforma própria + agentes","Zora AI, agent OS, EY.ai, Workbench e Lilli, com NVIDIA, Microsoft, Google e laboratórios de IA.","A A&M não precisa competir em plataforma: pode ser neutra e orquestradora."],["Preço por resultado e por ativo","McKinsey cobra ~25% por resultado; Deloitte vende agentes por assinatura; IBM fala em consultoria baseada em ativos.","O DNA de honorário por resultado da A&M vira vantagem."],["Diligência e PE sob pressão","DD com agentes por ~US$ 50 mil; laboratórios de IA entram nas investidas dos fundos (Ode); Bain replica o software do alvo.","O valor migra para o que vem depois do signing: Dia 1, TSA e sinergias."],["Pares compram capacidade","AlixPartners adquire a Artium; Falconi investe R$&nbsp;100&nbsp;mi; CI&T monetiza IA pela plataforma Flow.","produtizar o DNA de operador com IA, antes dos pares."]];
  T4.forEach(([t,x,h],i)=>{const d=H("div",{class:"card"+(i===3?" am":""),"data-a":"up",style:`--d:${8+i}`},$("benchTake"));d.innerHTML=`<span class="label">Sinal ${i+1} de 4</span><h4>${t}</h4><p>${x}</p><p class="so">→ ${i===3?"Para a A&amp;M: ":""}${h}</p>`});
  /* a linha fica embaixo da área disponível e o card logo acima (a altura vem do layout do slide) */
  const mk=()=>{if(!tl){const hh=host.offsetHeight||320,y=Math.max(232,hh-78);tl=Timeline(host,TL_2026,{w:host.offsetWidth||1076,y,cardY:Math.max(8,Math.round((y-30-190)/2)),x0:70,x1:(host.offsetWidth||1076)-70,dwell:2400})}return tl};
  ENTER["06"]=()=>mk().play();
  $("tlPlay").onclick=()=>mk().play();
  /* impressão: todos os marcos acesos com o card da A&M, e uma página extra com os 7 eventos completos */
  PRINT.push(()=>{const sec=SL("06"),d0=sec.style.display;if(!host.offsetWidth)sec.style.display="block";
    const t=mk();t.stopAuto();t.set(2);host.classList.add("tl-lit");const tr=host.querySelector(".tl-track"),pg=host.querySelector(".tl-prog");if(tr&&pg)pg.style.width=tr.style.width;sec.style.display=d0;
    if(stage.querySelector(".tl7-page"))return;const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","tl7-page","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));const ce=c.querySelector(".hd .eyebrow");if(ce)ce.textContent="Linha do tempo 2026 em detalhe · os sete eventos com fonte";
    const g=H("div",{class:"main tl7"});TL_2026.forEach(it=>{H("div",{class:"tl7-i"+(it.tag==="Alvarez & Marsal"?" am":""),html:`<div class="d">${it.d} · ${it.tag}</div><h4>${it.t}</h4><p>${it.x}</p><div class="src">Fonte: ${it.src}</div>`},g)});
    /* 8ª célula: a leitura do slide (os quatro sinais) fecha a grade */
    H("div",{class:"tl7-i rd",html:`<div class="d">Leitura · os quatro sinais</div><ol>${T4.map(([t],i)=>`<li><i>${i+1}</i>${t}</li>`).join("")}</ol><p class="so"><b>Para a A&amp;M:</b> ${T4[3][2]}</p>`},g);
    const cm=c.querySelector(".main");if(cm)cm.replaceWith(g);sec.after(c)})})();
