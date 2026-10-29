/* =====================================================================
   SLIDE 20 · Roadmap e decisões (Timeline Motion como trilha) · dono: slide 20
   Ganchos pela chave data-s: ENTER["20"] (ao entrar), STEP["20"] (→/← internos), PRINT.push(f) (impressão).
   ===================================================================== */
/* ---------- roadmap + decisões ---------- */
(function(){let tl=null;const mk=()=>{if(!tl)tl=Timeline($("tlLaunch"),TL_LAUNCH,{w:1520,y:198,cardY:2,x0:110,x1:1410,dwell:2400});return tl};
  ENTER["20"]=()=>{const t=mk();if(goLast){t.stopAuto();t.set(TL_LAUNCH.length-1)}else t.play()};$("tl2Play").onclick=()=>mk().play();
  /* → abre a próxima onda (interrompe a reprodução) antes de sair do slide; ← volta */
  STEP["20"]=d=>{if(!tl)return false;return d>0?tl.next():tl.prev()};
  /* impressão: as 5 ondas lado a lado, com todos os marcos acesos */
  PRINT.push(()=>{const t=mk();t.stopAuto();t.set(TL_LAUNCH.length-1);const h=$("tlLaunch");h.classList.add("tl-all");
    if(!h.querySelector(".tl-print"))H("div",{class:"tl-print",html:TL_LAUNCH.map(it=>`<div><div class="d">${it.d} · ${it.s}</div><h4>${it.t}</h4><p>${it.x}</p><span class="tg">${it.tag}</span></div>`).join("")},h)});
  ["<b>Aprovar o portfólio de 24 produtos</b> (5 manter · 15 aprimorar · 4 criar), os 4 A&amp;M Signature e os novos nomes dos pilares.","<b>Nomear donos de produto</b> (1 por pilar + 1 de IA) e instituir o comitê trimestral de portfólio.","<b>Investir na plataforma DTS</b>: LLM corporativo seguro, Spend Radar, benchmark DTS Brasil, biblioteca de agentes.","<b>Atacar as janelas de 2027</b>: Reforma Tributária (CBS em 01/01/2027) e orçamento/custo de tecnologia.","<b>Validar os 4 produtos novos</b> com 3–5 clientes-piloto cada, incluindo 1–2 fundos de PE.","<b>Alinhar fronteiras</b> com A&amp;M Tax, Data &amp; IA, PEPI e o Global AI Board (reuso de A&amp;M Assist e DiligenceGPT)."].forEach(x=>H("li",{html:x},$("decisions")));
  [["Pessoas","4 donos de produto (1 por pilar) + 1 de IA; 2–3 engenheiros de IA/dados; trilha de skills para o time"],["Ferramentas","LLM corporativo seguro; Power BI/Fabric; análise de código para DD e legado; repositório de agentes e prompts"],["Parcerias","1 hyperscaler e 1 laboratório de IA; ferramentas de análise de código e FinOps; A&M Tax e PEPI internamente"],["Dados","Benchmark DTS Brasil (gasto, maturidade, preços unitários), alimentado por cada projeto, anonimizado"]].forEach(([t,x],i)=>{const d=H("div",{class:"cap-i","data-a":"up",style:`--d:${10+i}`},$("caps"));d.innerHTML=`<b>${t}</b><p>${x}</p>`});
  [["≥30%","da receita DTS de produtos com IA no método em 2027"],["≥10%","de receita recorrente (radares e escritórios)"],["−30%","no tempo de entrega de diagnósticos e DDs"],["≥40%","de conversão sprint → execução"]].forEach(([v,l])=>{const d=H("div",null,$("kpisOK"));d.innerHTML=`<b>${v}</b><span>${l}</span>`})})();
