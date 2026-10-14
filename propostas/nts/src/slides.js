/* =========================================================================
   Componentes por slide
   ========================================================================= */

/* ------------------------------------------- 5 · jornada: os 10 aplicativos */
function buildChaos() {
  const host = $("#chaos");
  const apps = [
    ["Outlook", "recebe anexos de cada fonte", "canal"],
    ["ConnectGas", "exporta memórias de cálculo e alocações", "portal"],
    ["Portal ANP", "lê dados abertos; envia o relatório", "portal"],
    ["Portais de índices", "copia câmbio e índices do mês", "portal"],
    ["Portal de capacidade", "baixa programação de TAG e TBG", "portal"],
    ["Excel", "cola em sete abas e roda a macro", "office"],
    ["Teams e WhatsApp", "pergunta o que falta", "canal"],
    ["Power BI", "confere os painéis do mês", "office"],
    ["PDF e Outlook", "exporta anexos e envia para revisão", "office"],
    ["Excel", "ajusta e refaz", "office"],
  ];
  const wire = sv("svg", { class: "wire" }, host);
  const STEP = 141, W = 168, H = 74;
  const pts = [];
  apps.forEach(([t, s, k], i) => {
    const x = i * STEP, y = i % 2 ? 112 : 6;
    const a = el("div", { class: "app", style: `left:${x}px;top:${y}px` }, host);
    a.innerHTML = `<span class="n">${i + 1}</span><b><i class="type-${k}"></i>${t}</b><span>${s}</span>`;
    pts.push([x + W / 2, y + (i % 2 ? 0 : H)]);
  });
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    d += ` C${x0 + 30} ${(y0 + y1) / 2 + (i % 2 ? 26 : -26)} ${x1 - 30} ${(y0 + y1) / 2 + (i % 2 ? -26 : 26)} ${x1} ${y1}`;
  }
  sv("path", { d, fill: "none", stroke: "#E9B415", "stroke-width": 2, "stroke-dasharray": "4 5", opacity: 0.9 }, wire);
}

/* ---------------------------- 6 · cascata: opção 1 × opção 2 num só slide */
function buildWaterfall() {
  const svg = $("#wf");
  const cats = [["Ciclo hoje", "(assumido)"], ["Agente coleta", "e parametriza"], ["Código calcula", "e consolida"], ["Agente explica", "diferenças"], ["Humano confere", "e aprova"], ["Fora do", "1º release"], ["Uso parcial"], ["Manter fontes", "e regras"], ["Rotina com", "a ferramenta"]];
  const V = { 1: [400, -84, -54, -22, 30, 65, 16, 6, 357], 2: [400, -84, -54, -27, 30, 58, 12, 6, 341] };
  const X0 = 30, X1 = 1030, Y0 = 40, Y1 = 470, MAX = 420;
  const bw = (X1 - X0) / cats.length, barW = bw * 0.58;
  const y = (v) => Y1 - (v / MAX) * (Y1 - Y0);
  sv("line", { x1: X0, x2: X1, y1: Y1, y2: Y1, stroke: "#C6D3E0" }, svg);
  [100, 200, 300, 400].forEach((v) => {
    sv("line", { x1: X0, x2: X1, y1: y(v), y2: y(v), stroke: "#EDF1F5" }, svg);
    D.text(svg, X0 - 6, y(v) + 4, String(v), { size: 10.5, fill: "#8C9BAA", anchor: "end" });
  });
  const gGhost = sv("g", {}, svg), gBars = sv("g", {}, svg), gLink = sv("g", {}, svg), gVal = sv("g", {}, svg);
  const bars = [], ghosts = [], links = [], vals = [];
  cats.forEach((c, i) => {
    const cx = X0 + bw * i + bw / 2;
    ghosts.push(sv("rect", { x: cx - barW / 2, width: barW, rx: 4, fill: "none", stroke: "#8C9BAA", "stroke-dasharray": "4 3", "stroke-width": 1.4 }, gGhost));
    const tot = i === 0 || i === cats.length - 1;
    bars.push(sv("rect", { x: cx - barW / 2, width: barW, rx: 4 }, gBars));
    vals.push(D.text(gVal, cx, 0, "", { head: 1, size: 15, weight: 700, anchor: "middle", fill: tot ? "#03426F" : "#34495E" }));
    if (i < cats.length - 1) links.push(sv("line", { stroke: "#8C9BAA", "stroke-dasharray": "2 3" }, gLink));
    D.text(svg, cx, Y1 + 22, c, { size: 12, weight: 600, fill: i === cats.length - 1 ? "#03426F" : "#34495E", anchor: "middle", lh: 15 });
  });
  const geom = (vals) => {
    let run = 0;
    return vals.map((v, i) => {
      if (i === 0 || i === vals.length - 1) { run = i === 0 ? v : run; return { a: 0, b: i === 0 ? v : vals[i], kind: "tot", v }; }
      const a = run, b = run + v; run = b;
      return { a: Math.min(a, b), b: Math.max(a, b), kind: v < 0 ? "down" : "up", v, end: b };
    });
  };
  let cur = V[2], anim = 0;
  const paint = (vs, other) => {
    const g = geom(vs), go = geom(other);
    g.forEach((s, i) => {
      bars[i].setAttribute("y", y(s.b)); bars[i].setAttribute("height", Math.max(1, y(s.a) - y(s.b)));
      bars[i].setAttribute("fill", s.kind === "tot" ? "#03426F" : s.kind === "down" ? "#FECC32" : "#A3BDD4");
      const o = go[i];
      ghosts[i].setAttribute("y", y(o.b)); ghosts[i].setAttribute("height", Math.max(1, y(o.a) - y(o.b)));
      ghosts[i].style.opacity = Math.abs(o.v - s.v) > 0.5 ? 1 : 0;
      const label = s.kind === "tot" ? Math.round(s.v) : (s.v > 0 ? "+" : "−") + Math.abs(Math.round(s.v));
      vals[i].firstChild.textContent = label;
      vals[i].setAttribute("y", y(s.b) - 9);
      if (i < links.length) {
        const lvl = s.kind === "tot" ? s.b : s.end;
        links[i].setAttribute("x1", X0 + bw * i + bw / 2 + barW / 2); links[i].setAttribute("x2", X0 + bw * (i + 1) + bw / 2 - barW / 2);
        links[i].setAttribute("y1", y(lvl)); links[i].setAttribute("y2", y(lvl));
      }
    });
  };
  const setOpt = (o, instant) => {
    const from = cur.slice(), to = V[o], other = V[o === 1 ? 2 : 1];
    cancelAnimationFrame(anim);
    const t0 = performance.now(), dur = instant ? 1 : 700;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      cur = from.map((v, i) => v + (to[i] - v) * e);
      paint(cur, other);
      if (k < 1) anim = requestAnimationFrame(tick);
    };
    anim = requestAnimationFrame(tick);
    $$("#wfSeg button").forEach((b) => b.classList.toggle("on", +b.dataset.o === o));
    $$(".s-wf .cmp .c1").forEach((b) => b.classList.toggle("on", o === 1));
    $$(".s-wf .cmp .c2").forEach((b) => b.classList.toggle("on", o === 2));
    $("#wfBig").textContent = o === 1 ? "−10%" : "−15%";
    $("#wfTitle").innerHTML = o === 1
      ? "Na opção 1, cerca de 10% em rotina: as opções diferem em <em>chegar lá e em poder provar</em>, não no desenho"
      : "Na tarefa coberta o corte é grande; no ciclo inteiro, o primeiro release devolve <em>cerca de 15% em rotina</em> na opção 2";
  };
  $$("#wfSeg button").forEach((b) => (b.onclick = () => setOpt(+b.dataset.o)));
  paint(cur, V[1]);
  setOpt(2, true);
  Deck.on("s06", () => { cur = cur.map((v, i) => (i === 0 || i === 8 ? v : 0)); setOpt(+$("#wfSeg .on").dataset.o); });
}

/* ------------------------------ 7 · padrão de trabalho: flip + flow line */
function buildPattern() {
  const host = $("#patternFlips");
  const S = [
    { k: "agent", i: "search", t: "Reúne", pp: "confirma as fontes do mês", who: "O agente reúne", one: "busca nas fontes e mostra o que falta e de quem", ve: "A lista das fontes do mês: o que chegou, o que falta e de quem. Em portal com login pessoal, 2º fator ou certificado, a pessoa busca; a ferramenta lê e guarda a origem.", faz: ["confirmar fontes", "cobrar quem falta"] },
    { k: "agent", i: "sliders", t: "Parametriza", pp: "ajusta e aceita", who: "O agente parametriza", one: "propõe os parâmetros do mês a partir das regras mapeadas", ve: "Os parâmetros do mês propostos a partir das regras mapeadas, cada um com a origem e o valor do mês anterior ao lado.", faz: ["ajustar", "aceitar"] },
    { k: "code", i: "calc", t: "Calcula", pp: "espera segundos", who: "O código calcula", one: "alocação e otimização em segundos, com versão e registro", ve: "A alocação e a otimização rodam em segundos sobre dados versionados; o resultado sai na planilha de sempre, agora gerada.", faz: ["rodar de novo", "abrir no Excel"] },
    { k: "agent", i: "msg", t: "Explica", pp: "lê a explicação", who: "O agente explica", one: "cada diferença com valor, idade, causa provável e fonte", ve: "Cada diferença contra o esperado com valor, idade, causa provável e fonte; preços acima do esperado destacados, e a faixa de tolerância em que caem.", faz: ["ler", "pedir detalhe"] },
    { k: "person", i: "approve", t: "Aprova", pp: "aprova, ou permite a exceção por escrito", who: "A pessoa aprova", one: "nenhuma exceção passa por omissão", ve: "O fechamento com as diferenças listadas por faixa: dentro da tolerância passam com regra registrada; acima dela, cada uma é permitida por escrito ou devolvida.", faz: ["aprovar", "permitir exceção", "devolver"] },
  ];
  const tagName = { agent: "Agente", code: "Código", person: "Pessoa" }, tagIcon = { agent: "spark", code: "code", person: "user" };
  S.forEach((s, n) => {
    const f = el("div", { class: `flip k-${s.k}`, tabindex: 0, role: "button", "aria-label": `${s.t}: ver detalhe` }, host);
    f.innerHTML = `<div class="in">
      <div class="fc"><span class="no">0${n + 1}</span><span class="tag ${s.k}" style="align-self:flex-start">${icon(tagIcon[s.k])}${tagName[s.k]}</span>
        <div class="icon">${icon(s.i)}</div><h3>${s.t}</h3><p class="one">${s.one}</p>
        <div class="pp"><small>A pessoa</small>${s.pp}</div>
        <div class="turn">${icon("tap")}ver detalhe</div></div>
      <div class="bc"><h4>${n + 1} · ${s.who}</h4>
        <div class="lab">Vê</div><p>${s.ve}</p>
        <div class="lab">Faz</div><div class="acts">${s.faz.map((a) => `<span class="chip">${a}</span>`).join("")}</div>
        <div class="turn" style="color:var(--blue-700)">${icon("arrowL")}voltar</div></div></div>`;
    const tog = () => f.classList.toggle("on");
    f.addEventListener("click", tog);
    f.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); tog(); } });
  });
  let all = false;
  $("#patternAll").onclick = () => { all = !all; $$(".flip", host).forEach((f) => f.classList.toggle("on", all)); $("#patternAll").textContent = all ? "Desvirar todos" : "Virar todos"; };
  const line = $("#patternLine");
  const draw = () => {
    if (Deck.read) return;
    const cards = $$(".flip", host), off = host.offsetTop;
    line.innerHTML = `<defs><marker id="fl-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5 0 10z" fill="#FECC32"/></marker>
      <filter id="fl-g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>`;
    let full = "";
    cards.forEach((c, i) => {
      const cx = c.offsetLeft + c.offsetWidth / 2, y = off;
      sv("circle", { cx, cy: y - 2, r: 7, fill: "#FECC32" }, line);
      sv("circle", { cx, cy: y - 2, r: 13, fill: "none", stroke: "#FECC32", "stroke-opacity": 0.35, "stroke-width": 2 }, line);
      if (i < cards.length - 1) {
        const n = cards[i + 1], nx = n.offsetLeft + n.offsetWidth / 2;
        const d = `M${cx + 12} ${y - 8} C${cx + 70} ${y - 48} ${nx - 70} ${y - 48} ${nx - 14} ${y - 9}`;
        sv("path", { d, fill: "none", stroke: "#FECC32", "stroke-width": 2, "stroke-dasharray": "6 7", class: "dash", "marker-end": "url(#fl-a)" }, line);
        full += (full ? " " : "") + (full ? d.replace(/^M/, "L") : d);
      }
    });
    const dot = sv("circle", { r: 6, fill: "#fff", filter: "url(#fl-g)" }, line);
    const dot2 = sv("circle", { r: 3.5, fill: "#fff" }, line);
    [dot, dot2].forEach((d) => sv("animateMotion", { dur: "5s", repeatCount: "indefinite", path: full, rotate: "auto" }, d));
  };
  Deck.on("s07", () => requestAnimationFrame(draw));
  addEventListener("resize", () => requestAnimationFrame(draw));
}

/* -------------------------------------- 10 · quem fala com quem: zonas */
function buildZones() {
  const Z = [
    { t: "Externos", lvl: ["Não confiável", "u"], i: "globe", items: ["Portal ANP", "Portais de parceiros", "Fontes de índices", "E-mail de terceiros"], fl: [["Estação", 1, "leitura pelo navegador e pelo agente"], ["Serviços NTS", 0, "sem acesso de entrada"]] },
    { t: "Estação", lvl: ["Confiável", "t"], i: "monitor", items: ["App desktop (opção A)", "Excel e Office", "Navegador", "Login Entra ID"], fl: [["Serviços NTS", 1, "login único, perfis por função"], ["Nuvem NTS", 1, "só pelo gateway, com registro"], ["Provedor", 0, "nunca direto"]] },
    { t: "Serviços NTS", lvl: ["Confiável", "t"], i: "server", items: ["SharePoint e M365", "ConnectGas", "SAP (ERP)", "Medição e simulador (OT)", "Identidade e perfis"], fl: [["Nuvem NTS", 1, "só leitura; OT só por exportação"]] },
    { t: "Nuvem NTS", lvl: ["Confiável", "t"], i: "cloud", items: ["Web app (opção B)", "Banco da ferramenta", "Registro de cada ciclo", "Gateway de IA", "Log e auditoria"], fl: [["Provedor", 1, "conteúdo mínimo, sem dado pessoal"], ["Externos", 0, "ferramenta nunca envia; pessoa envia"]] },
    { t: "Provedor", lvl: ["Restrita", "r"], i: "cpu", items: ["API do modelo", "Sem treino", "Retenção zero (contrato)"], fl: [["Nuvem NTS", 0, "sem chamada de volta"]] },
  ];
  const host = $("#zones");
  const lvlStyle = { u: "background:#EEF1F4;color:#5F7387", t: "background:var(--green-100);color:#1b7a56", r: "background:var(--navy-900);color:var(--yellow)" };
  Z.forEach((z, n) => {
    const f = el("div", { class: "flip rv d" + (n + 1), tabindex: 0, role: "button", "aria-label": `${z.t}: ver fluxos` }, host);
    f.innerHTML = `<div class="in">
      <div class="fc"><div class="zt"><span class="zi">${icon(z.i)}</span><div><h3>${z.t}</h3><span class="tag lvl" style="${lvlStyle[z.lvl[1]]}">${z.lvl[0]}</span></div></div>
        <ul>${z.items.map((x) => `<li>${icon("check")}${x}</li>`).join("")}</ul>
        <div class="turn" style="color:var(--blue-700)">${icon("tap")}com quem fala · ${z.fl.length} fluxo${z.fl.length > 1 ? "s" : ""}</div></div>
      <div class="bc"><div class="zt"><span class="zi" style="background:#ffffff18;color:#fff">${icon(z.i)}</span><div><div class="eyebrow" style="color:var(--yellow)">De ${z.t} para</div><h3>${z.fl.length} fluxo${z.fl.length > 1 ? "s" : ""}</h3></div></div>
        <div class="fl">${z.fl.map(([to, ok, s]) => `<div class="${ok ? "" : "no"}"><b>${icon("arrowR", "ar")} ${to}<em>${ok ? "permitido" : "negado"}</em></b><span>${s}</span></div>`).join("")}</div>
        <div class="turn" style="color:#a9c2d9">${icon("arrowL")}voltar</div></div></div>`;
    const tog = () => f.classList.toggle("on");
    f.addEventListener("click", tog);
    f.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); tog(); } });
  });
  $$(".s-zones .bc .fl b svg").forEach((s) => { s.style.width = "14px"; s.style.height = "14px"; });
  let all = false;
  $("#zonesAll").onclick = () => { all = !all; $$(".flip", host).forEach((f) => f.classList.toggle("on", all)); $("#zonesAll").textContent = all ? "Desvirar todas" : "Virar todas"; };
}

/* --------------------------------------------- 12 · dinheiro: contadores */
function buildMoney() {
  const run = () => {
    $$("#s12 [data-count]").forEach((n) => {
      const to = +n.dataset.count, t0 = performance.now();
      const tick = (t) => { const k = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - k, 3); n.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(tick); };
      if (reduceMotion || Deck.read) n.textContent = to; else requestAnimationFrame(tick);
    });
    $$("#gauges i[data-w]").forEach((i) => { i.style.width = "0"; requestAnimationFrame(() => requestAnimationFrame(() => (i.style.width = i.dataset.w + "%"))); });
  };
  Deck.on("s12", run);
}

/* ---------------------------------------------------- 13 · roteiro gantt */
const GANTT = [
  { id: "acc", t: "Acessos e ambiente", s: "TI e dados", c: "c-acc", rows: [
    [["Medição paga", 1, 2, "As semanas 1 e 2 medem o ciclo e as diferenças que passam; é o Marco 1, devido em qualquer caso, com regra de parada."], ["Web ou desktop", 3, 4, "Ambiente decidido com a TI da NTS até a semana 2: desktop primeiro, sem servidor novo; a nuvem entra quando houver base e gateway."]],
    [["Acessos e dados", 1, 2, "Par em TI e dados para identidade, acessos e dados; homologação com dado mascarado desde a semana 1."]],
    [["Homologação", 1, 4, "Ambiente de teste com dados mascarados: Enjourney e Antrópica desenvolvem sem dado real."]],
  ] },
  { id: "eng", t: "Engenharia", s: "Antrópica", c: "c-eng", rows: [
    [["Reúne", 1, 4, "O agente busca nas fontes, lê anexos e portais e mostra o que falta e de quem."], ["Explica e aprova", 5, 8, "Cada diferença com valor, idade, causa provável e faixa de tolerância; aprovação e exceção por escrito."], ["Entrega e repasse", 11, 12, "Código, documentação e manual entregues à NTS; repasse ao par técnico."]],
    [["Regras e cálculo", 3, 6, "Cada regra mapeada vira código, com teste sobre dado de um ciclo real; na semana 6 o cálculo reproduz um ciclo (Marco 2)."]],
  ] },
  { id: "pes", t: "Pesquisa", s: "só na opção 2", c: "c-pes", rows: [
    [["Campo no Rio", 1, 4, "Gemba Digital do ciclo: sistemas, planilhas paralelas e atalhos vistos e medidos no lugar; 6 a 12 entrevistas."], ["Workshop de regras", 5, 6, "Quem assina decide, junto, as faixas de tolerância por tipo de diferença (semana 5)."], ["Teste com usuários", 7, 10, "Duas pessoas usam a ferramenta num fechamento real, com Lunna ao lado; o que confunde muda antes da entrega."]],
  ] },
  { id: "enj", t: "Enjourney", s: "regras e validação", c: "c-enj", rows: [
    [["Regras validadas", 1, 4, "A Enjourney valida as regras do mapeamento antes de virarem código."], ["Valida resultados", 7, 10, "A Enjourney confere os resultados do piloto contra o processo mapeado."]],
  ] },
  { id: "nts", t: "NTS", s: "dono do processo e TI", c: "c-nts", rows: [
    [["Par técnico", 1, 2, "A NTS indica o par em TI e dados que herda a ferramenta."], ["Piloto em paralelo", 7, 10, "Piloto em paralelo a um fechamento real, com duas pessoas; nenhum fechamento roda só na ferramenta."], ["Assume e opera", 11, 12, "Aceite do piloto na semana 11; a NTS assume e opera, com garantia de 60 dias."]],
  ] },
];
function buildGantt() {
  const g = $("#gantt");
  g.innerHTML = `<div></div><div class="g-phase"><div class="p1">Pensar <span>medir e desenhar</span></div><div class="p2">Agir <span>construir e rodar em paralelo</span></div><div class="p3">Aprender <span>ajustar e aceitar</span></div></div>
    <div></div><div class="g-weeks">${Array.from({ length: 12 }, (_, i) => `<div>S${i + 1}</div>`).join("")}</div>`;
  const msr = el("div", { class: "g-msrow" }, g);
  msr.innerHTML = `<div class="lab">Marcos</div><div class="trk"></div>`;
  [["Seguir ou parar", 2], ["Piloto no ar", 6], ["Aceite do piloto", 10]].forEach(([t, w]) => { el("b", { style: `left:${(w / 12) * 100}%` }, $(".trk", msr)).innerHTML = `<i></i>${t}`; });
  const lanes = el("div", { class: "g-lanes" }, g);
  const RH = 41;
  GANTT.forEach((ln) => {
    const lab = el("div", { class: `g-lab lane-${ln.id}` }, lanes);
    lab.innerHTML = `<i class="${ln.c}" style="background:${{ "c-acc": "var(--blue-200)", "c-eng": "var(--navy-800)", "c-pes": "var(--yellow)", "c-enj": "var(--blue-500)", "c-nts": "var(--blue-500)" }[ln.c]}"></i><div>${ln.t}<small>${ln.s}</small></div>`;
    const row = el("div", { class: `g-row lane-${ln.id}`, style: `height:${ln.rows.length * RH + 12}px` }, lanes);
    lab.style.height = row.style.height;
    ln.rows.forEach((r, ri) => r.forEach(([t, a, b, d]) => {
      const bar = el("button", { class: `gbar ${ln.c}`, type: "button", style: `left:calc(${((a - 1) / 12) * 100}% + 3px);width:calc(${((b - a + 1) / 12) * 100}% - 6px);top:${6 + ri * RH + 4}px` }, row, t);
      bar.onclick = () => showDetail(bar, ln, t, a, b, d);
    }));
  });
  const ms = [["Seguir ou parar", 2], ["Piloto no ar", 6], ["Aceite do piloto", 10]];
  const msLayer = el("div", { style: "position:absolute;left:170px;right:0;top:0;bottom:0;pointer-events:none" }, lanes);
  ms.forEach(([t, w]) => el("div", { class: "g-ms", style: `left:${(w / 12) * 100}%` }, msLayer));
  el("div", { class: "g-paylab" }, g, "Pagamento");
  const pay = el("div", { class: "g-pay" }, g);
  [["M1 · 15%", 2], ["M2 · 25%", 6], ["M3 · 35%", 10], ["M4 · 25% rotina", 12]].forEach(([t, w]) => {
    const c = el("div", { class: "coin", style: `left:${(w / 12) * 100}%;${w === 12 ? "transform:translateX(-100%)" : ""}` }, pay);
    c.innerHTML = `<i>R$</i>${t}`;
  });
  const det = el("div", { class: "g-detail hide" }, g);
  const idle = `<div class="hint2">${icon("tap")}<span>Clique numa barra para ver o detalhe. As 12 semanas a partir de meados de outubro contêm três fechamentos, um de fim de ano: nenhum roda só na ferramenta.</span></div>`;
  det.innerHTML = idle;
  let curBar = null;
  function showDetail(bar, ln, t, a, b, d) {
    if (curBar === bar) { hide(); return; }
    curBar?.classList.remove("on"); curBar = bar; bar.classList.add("on");
    det.innerHTML = `<button class="x" type="button" aria-label="Fechar">${icon("x")}</button><div class="w">${ln.t} · semana${a === b ? "" : "s"} ${a === b ? a : a + " a " + b}</div><h4>${t}</h4><p>${d}</p>`;
    $(".x", det).onclick = hide;
    det.classList.remove("hide");
  }
  function hide() { det.classList.add("hide"); det.innerHTML = idle; curBar?.classList.remove("on"); curBar = null; }
  $$("#ganttSeg button").forEach((b) => (b.onclick = () => {
    $$("#ganttSeg button").forEach((x) => x.classList.toggle("on", x === b));
    g.classList.toggle("o1", b.dataset.o === "1");
  }));
  Deck.onLeave("s13", hide);
}

/* ------------------------------------------- 14 · pesquisa: linha do tempo */
function buildField() {
  const S = [
    { t: "Gemba Digital", w: [1, 2], wl: "semanas 1 e 2", i: "search", ve: "O chão de fábrica digital do ciclo: sistemas, formulários, templates, planilhas paralelas e atalhos, vistos e medidos no lugar (horas, diferenças que passam).", faz: ["medir", "entrevistar"], st: [["6 a 12", "entrevistas"]] },
    { t: "Mapa de dores e atalhos", w: [3, 4], wl: "depois do Gemba", i: "map", ve: "O que o mapeamento não mostra: os atalhos, as versões paralelas, as exceções que viraram hábito e por quê.", faz: ["comparar com o mapa"], st: [] },
    { t: "Workshop de faixas", w: [5, 5], wl: "semana 5", i: "workshop", ve: "Quem assina decide, junto, as faixas de tolerância por tipo de diferença: o que passa com regra registrada, o que exige permissão e de quem.", faz: ["decidir faixas", "nomear quem assina"], st: [["1", "workshop com quem assina"]] },
    { t: "Protótipo em uso", w: [7, 10], wl: "semanas 7 a 10", i: "test", ve: "Duas pessoas usam a ferramenta num fechamento real, com Lunna ao lado; o que confunde muda antes da entrega.", faz: ["testar", "ajustar"], st: [["83%", "usaram um assistente"], ["23%", "no Excel"]], note: "Experimento do governo britânico com 20 mil pessoas, como analogia." },
    { t: "Resultado medido", w: [12, 12], wl: "semana 12", i: "chart", ve: "Diferenças com decisão e dono, horas por tarefa coberta antes e depois, quem usou o quê: só quem observou e mediu o ciclo no início pode provar o fim.", faz: ["medir", "repassar"], st: [] },
  ];
  const host = $("#field");
  const pos = (s) => (((s.w[0] + s.w[1]) / 2 - 0.5) / 12) * 100;
  host.innerHTML = `<div class="axis"><div class="line"></div><div class="fill"></div>
    <div class="ticks">${Array.from({ length: 12 }, (_, i) => `<span>S${i + 1}</span>`).join("")}</div></div>
    <div class="sumrow"><span><b>6</b> semanas de Lunna</span><span><b>2</b> idas ao Rio</span><span><b>1</b> workshop com quem assina</span><span><b>6 a 12</b> entrevistas</span><span><b>2</b> pessoas no fechamento real</span></div>
    <div class="stations-read" style="display:none;flex-wrap:wrap;gap:8px;margin-top:10px"></div>
    <div class="detail"></div>`;
  const axis = $(".axis", host), detail = $(".detail", host), sr = $(".stations-read", host);
  S.forEach((s, n) => {
    if (s.w[1] > s.w[0]) el("div", { class: "span", style: `left:${((s.w[0] - 1) / 12) * 100}%;width:${((s.w[1] - s.w[0] + 1) / 12) * 100}%` }, axis);
    const b = el("button", { class: "stn", type: "button", style: `left:${pos(s)}%` }, axis);
    b.innerHTML = `<span class="bub">${s.t}</span><span class="wk">${s.wl}</span><span class="dot">${n + 1}</span>`;
    b.onclick = () => sel(n);
    const r = el("button", { class: "chip", type: "button" }, sr, `${n + 1} · ${s.t}`);
    r.onclick = () => sel(n);
  });
  let cur = 0;
  function sel(n) {
    cur = n;
    const s = S[n];
    $$(".stn", host).forEach((b, k) => b.classList.toggle("on", k === n));
    $(".fill", host).style.width = `${pos(s)}%`;
    detail.innerHTML = `<div class="hd fade-swap"><span class="n">0${n + 1}</span><h3>${s.t}</h3><span class="wk">${s.wl}</span>
        <div class="nav"><button type="button" aria-label="Etapa anterior">${icon("arrowL")}</button><button type="button" aria-label="Próxima etapa">${icon("arrowR")}</button></div></div>
      <div class="bx fade-swap"><div class="eyebrow">${icon("eye")}Vê</div><p>${s.ve}</p></div>
      <div class="bx fade-swap"><div class="eyebrow">${icon("zap")}Faz</div><div class="acts">${s.faz.map((a) => `<span class="chip">${a}</span>`).join("")}</div>
        ${s.st.length ? `<div class="stat">${s.st.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join("")}</div>${s.note ? `<p style="font-size:12px;color:var(--ink-4);margin-top:8px">${s.note}</p>` : ""}` : `<div class="stat" style="border-top:0"></div>`}</div>`;
    const [pv, nx] = $$(".hd .nav button", detail);
    pv.onclick = () => sel((cur + S.length - 1) % S.length);
    nx.onclick = () => sel((cur + 1) % S.length);
  }
  sel(0);
  Deck.on("s14", () => { $(".fill", host).style.width = "0"; requestAnimationFrame(() => requestAnimationFrame(() => sel(cur))); });
}

/* ------------------------------------------------------ 15 · quem decide */
function buildRaci() {
  const cols = [["Enjourney", ""], ["Antrópica", "engenharia"], ["Antrópica", "design"], ["NTS", "dono do processo"], ["NTS", "TI e dados"], ["NTS", "gestão"]];
  const rows = [
    ["Regras de negócio do ciclo", "PCCDII"], ["Ambiente: web, desktop ou híbrido", "CPICDI"], ["Acessos, identidade e dados mascarados", "IPICDI"],
    ["Prioridade das automações", "PCCDII"], ["Padrões e exceções permitidas", "CEPDIC"], ["Aceite do piloto (primeiro ciclo)", "PECCID"],
    ["Virada para operação", "PEICCD"], ["Mudança de escopo", "DPCCII"], ["Modalidade e investimento", "DPPIIC"],
  ];
  const host = $("#raci");
  const tb = el("div", { class: "raci-t" }, host);
  tb.innerHTML = `<table><thead><tr><th>Decisão</th>${cols.map(([a, b], i) => `<th data-c="${i}" style="cursor:pointer">${a}<small>${b || "&nbsp;"}</small></th>`).join("")}</tr></thead>
    <tbody>${rows.map(([t, r]) => `<tr><td>${t}</td>${[...r].map((x, i) => `<td data-c="${i}"><span class="rl ${x}">${x}</span></td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const side = el("div", { class: "key" }, host);
  side.innerHTML = [["D", "Decide", "tem a palavra final"], ["P", "Propõe", "leva a proposta"], ["E", "Executa", "faz o trabalho"], ["C", "É consultado", "opina antes"], ["I", "É informado", "sabe depois"]]
    .map(([k, t, s]) => `<div class="kk"><span class="rl ${k}">${k}</span><div><b>${t}</b><span>${s}</span></div></div>`).join("") +
    `<div class="who"><p><b>NTS</b> decide regras e padrões; <b>TI</b> decide ambiente e acessos.</p><p><b>Enjourney</b> decide escopo e preço.</p><p><b>Antrópica</b> propõe e executa.</p><p style="color:#a9c2d9;font-size:12px">Clique no nome de um papel para destacar a coluna.</p></div>`;
  let cur = null;
  $$("th[data-c]", tb).forEach((th) => (th.onclick = () => {
    cur = cur === th.dataset.c ? null : th.dataset.c;
    $$("td[data-c]", tb).forEach((td) => (td.style.opacity = cur == null || td.dataset.c === cur ? 1 : 0.18));
    $$("th[data-c]", tb).forEach((h) => (h.style.color = h.dataset.c === cur ? "var(--navy-900)" : ""));
  }));
}

/* ------------------------------------------- tabelas com filtro de tipo */
const TYPE = { obs: ["Observado", "medido, com registro"], calc: ["Calculado", "derivado de outros números"], ass: ["Assumido", "dado como certo, ainda não conferido"], meta: ["Meta", "um objetivo que a gestão define"] };
function typeFilter(host, table, rows) {
  const box = el("div", { class: "tf" }, host);
  el("div", { class: "lbl" }, box, "Filtrar por tipo");
  let cur = null;
  Object.entries(TYPE).forEach(([k, [t, s]]) => {
    const n = rows.filter((r) => r[2] === k).length;
    if (!n) return;
    const b = el("button", { type: "button", "data-k": k }, box);
    b.innerHTML = `<b>${n}</b><span><span class="ty ${k}">${t}</span><br>${s}</span>`;
    b.onclick = () => {
      cur = cur === k ? null : k;
      $$("button", box).forEach((x) => x.classList.toggle("on", x.dataset.k === cur));
      $$("tbody tr", table).forEach((tr) => tr.classList.toggle("dim", !!cur && tr.dataset.k !== cur));
    };
  });
  return box;
}
function buildCase() {
  const rows = [
    ["Diferenças levadas ao ciclo seguinte sem decisão registrada: contagem, valor em R$ e idade", "a medir, sem. 1-2", "meta", "planilhas de fechamento dos últimos 12 ciclos; meta fixada após a medição"],
    ["Escala de uma apuração mensal da NTS (Conta Regulatória, 2026): cada 0,1% equivale a R$ 20 a 53 mil por mês", "R$ 20 a 53 mi/mês", "obs", "ntsbrasil.com, Conta Regulatória até ago/26; hipótese: se o ciclo tocar estes valores"],
    ["Escala do gás de uso do sistema: custo mensal estimado em 2026, volume médio; repassado, não retido", "R$ 8 a 14 mi/mês", "calc", "editais da NTS (fórmula, volumes); Brent FRED e câmbio BCB; se o ciclo for este"],
    ["Tempo de toque nas tarefas cobertas (coleta de arquivos e exportações, operação da planilha)", "−50% a −80%", "ass", "hipótese; precedente Ares, 15 para 2 min; medido por tarefa na semana 2"],
    ["Potencial do ciclo inteiro, coberto e em uso", "≈ 30% (20 a 45%)", "ass", "simulação; três reconstruções independentes; ledger §2"],
    ["Ritmo de rotina, se a ferramenta virar o caminho normal: opção 1 / opção 2", "≈ 10% / ≈ 15%", "calc", "simulação, mediana; P10 a P90: 2 a 22% / 5 a 26%"],
    ["Chance de a ferramenta ser a rotina no 6º mês: opção 1 / opção 2", "≈ 50% / ≈ 70%", "ass", "julgamento de três revisores; coerente com a faixa da literatura; não medido"],
    ["Média dos 12 primeiros ciclos, com fechamentos em paralelo e a chance de não uso", "≈ 4% / ≈ 9%", "calc", "simulação, média; P10 a P90: −2 a 12% / −1 a 19%"],
    ["Capacidade devolvida em rotina, por analista; não é redução de orçamento", "≈ 7 / 9 h por mês", "calc", "ritmo de rotina × 400 h ÷ 6 analistas"],
    ["Lado da NTS: horas do time no projeto, 2 a 3 fechamentos em paralelo, 2 a 4 mudanças de regra por ano", "a dimensionar", "ass", "medido na fase de medição; operação R$ 1 a 5 mil por mês; ledger §5"],
  ];
  const host = $("#caseGrid");
  const wrap = el("div", { class: "tbl-wrap" }, host);
  const t = el("table", { class: "tbl" }, wrap);
  t.innerHTML = `<thead><tr><th style="width:44%">Número</th><th>Valor</th><th>Tipo</th><th>Fonte</th></tr></thead><tbody>${rows.map(([a, v, k, s]) => `<tr data-k="${k}"><td class="m" style="font-weight:500">${a}</td><td class="v">${v}</td><td><span class="ty ${k}">${TYPE[k][0]}</span></td><td class="s">${s}</td></tr>`).join("")}</tbody>`;
  const side = el("div", { class: "side" }, host);
  side.innerHTML = `<div class="scale"><div class="v">R$ 20 a 53 mil</div><div class="l">por mês a cada 0,1% de uma apuração mensal da NTS: é onde o controle das diferenças vale mais do que horas.</div></div>`;
  typeFilter(side, t, rows);
}
function buildMeasure() {
  const rows = [
    ["Diferenças levadas adiante: quantas, quanto, idade", "leitura dos 12 últimos fechamentos", "planilhas de fechamento", "12"],
    ["Dias entre a emissão das taxas e a aprovação", "datas nos arquivos e nos e-mails", "planilhas e Outlook", "12"],
    ["Reprocessamentos por ciclo", "versões salvas e refeitas", "SharePoint e planilhas", "12"],
    ["Rastros sem conteúdo: salvamentos, reuniões, e-mails", "metadados, agenda e volume de e-mail", "Microsoft 365, sem ler o conteúdo", "12"],
    ["Inventário de fontes e tarefas", "quem faz, como chega, quanto por ciclo", "entrevistas curtas", "12"],
    ["Tempo por tarefa, à mão e pela ferramenta", "cronometrado numa fatia do ciclo", "cronômetro e protótipo", "12"],
    ["Amostragem do trabalho num ciclo inteiro", "observação no local", "Lunna no Rio", "2"],
  ];
  const host = $("#measGrid");
  const wrap = el("div", { class: "tbl-wrap" }, host);
  const t = el("table", { class: "tbl" }, wrap);
  t.innerHTML = `<thead><tr><th>Medida</th><th>Como</th><th>Fonte</th><th>Opção</th></tr></thead><tbody>${rows.map(([a, b, c, o]) => `<tr><td class="m">${a}</td><td>${b}</td><td class="s">${c}</td><td><span class="opt-badge"><i class="${o.includes("1") ? "" : "off"}">1</i><i>2</i></span></td></tr>`).join("")}</tbody>`;
  t.querySelectorAll("tbody td").forEach((td) => (td.style.padding = "15px 14px"));
  const side = el("div", { class: "stop" }, host);
  side.innerHTML = `<div class="eyebrow" style="color:var(--yellow)">Regra de parada · proposta, a combinar</div>
    <h4>Ao fim da semana 2, seguir ou parar com base no medido</h4>
    <div class="cond"><b>≈ R$ 100 mil/ano</b>valor de controle da ordem de</div>
    <div class="or">OU</div>
    <div class="cond"><b>≥ 40%</b>das horas medidas em coleta + planilha</div>
    <div class="commit" style="margin-top:auto"><b>Compromisso após a medição</b>por tarefa, no limite inferior do medido; contrato a partir da semana 3.</div>`;
}
function buildInvest() {
  const host = $("#invGrid");
  const wrap = el("div", { class: "tbl-wrap" }, host);
  const t = el("table", { class: "tbl" }, wrap);
  const R = (a, o1, o2, b, cls = "") => `<tr class="${cls}"><td class="m">${a}</td><td class="o1">${o1}</td><td class="o2">${o2}</td><td class="s">${b}</td></tr>`;
  t.innerHTML = `<thead><tr><th>Item</th><th>Opção 1 · top-down</th><th class="o2">Opção 2 · bottom-up</th><th>Base</th></tr></thead><tbody>
    ${R("Engenharia: sócio-engenheiro em dedicação parcial", "R$ 165 mil", "R$ 165 mil", "12 semanas; preço fixo por resultado, com marcos")}
    ${R("Pesquisa e desenho: sócia-designer, 6 semanas", "—", "R$ 60 mil", "Gemba Digital, workshop das faixas, teste em uso")}
    ${R("Viagens ao Rio (2 de Lunna, 1 de Eduardo)", "—", "até R$ 12 mil, ao custo", "reembolsadas ao custo, por fora do preço")}
    ${R("Total à Enjourney, tributos vigentes na data", "R$ 165 mil", "R$ 225 mil", "preço fechado por resultado; benchmark externo", "total")}
    <tr class="grp"><td colspan="4">Marcos de pagamento</td></tr>
    ${R("Marco 1 · assinatura: semanas 1 e 2, medição", "R$ 25 mil", "R$ 35 mil", "15%; devidos em qualquer caso; regra de parada")}
    ${R("Marco 2 · semana 6: cálculo reproduz um ciclo", "R$ 41 mil", "R$ 55 mil", "25%; um ciclo fechado, sobre entradas reais")}
    ${R("Marco 3 · semana 10: entregue para aceite na NTS", "R$ 58 mil", "R$ 80 mil", "35%; no ambiente da NTS")}
    ${R("Marco 4 · rotina, ou 30 dias após a entrega", "R$ 41 mil", "R$ 55 mil", "25%; o que vier primeiro")}
    <tr class="grp"><td colspan="4">Condições</td></tr>
    ${R("Pagamento", "15 dias da fatura", "15 dias da fatura", "ou 5 dias úteis após a NTS pagar, até 45 dias")}
    ${R("Pago pela NTS à parte: modelo e hospedagem", "R$ 1 a 5 mil/mês", "R$ 1 a 5 mil/mês", "10 a 25 usuários; sem suporte")}
    ${R("Garantia: 60 dias após a entrega", "até 40 horas", "até 50 horas", "defeitos contra o conjunto de testes aceito")}
    ${R("Suporte depois da garantia", "R$ 500/h, sob demanda", "R$ 500/h, sob demanda", "sem mínimo mensal; decidido após a medição")}
  </tbody>`;
  const side = el("div", { class: "ms" }, host);
  side.innerHTML = `<div class="eyebrow">Fluxo de pagamento por marco</div>
    <div class="bar"><div style="flex:15">M1<small>15%</small></div><div style="flex:25">M2<small>25%</small></div><div style="flex:35">M3<small>35%</small></div><div style="flex:25">M4<small>25%</small></div></div>
    ${[["M1", "semanas 1 e 2 · medição", "R$ 25 / 35 mil"], ["M2", "semana 6 · reproduz um ciclo", "R$ 41 / 55 mil"], ["M3", "semana 10 · entregue para aceite", "R$ 58 / 80 mil"], ["M4", "rotina ou 30 dias após a entrega", "R$ 41 / 55 mil"]]
      .map(([k, t, v]) => `<div class="row"><i>${k}</i><span>${t}</span><b>${v}</b></div>`).join("")}
    <div style="font-size:11.5px;color:var(--ink-4)">valores opção 1 / opção 2</div>
    <div class="risk" style="margin-top:auto"><b>≈ 15%</b>é o que o comprador arrisca até a medição: o Marco 1 é devido em qualquer caso, e a regra de parada decide o resto.</div>`;
}
function buildRisk() {
  const R = [
    ["R1", "Regras mapeadas divergem da prática", "Testar cada regra com dado de um ciclo real antes de codificar; o campo acha atalhos.", "Enjourney e dono do processo", 4, 4],
    ["R2", "Acesso de TI e dados atrasa", "Homologação com dado mascarado na semana 1; o app desktop é o caminho sem servidor novo.", "NTS TI e dados", 4, 3],
    ["R3", "A planilha continua ao lado", "Pesquisa com usuários, bons padrões, piloto com duas pessoas; sobe na opção 1.", "Antrópica Design", 3, 5],
    ["R4", "Dado sensível enviado ao modelo", "Gateway com corte de dado; retenção zero contratada com o provedor; log de cada chamada.", "Antrópica Engenharia", 2, 5],
    ["R5", "Escopo cresce além do ciclo", "Lista fechada de automações por fase; mudança passa pelo portão e tem preço.", "Enjourney", 3, 3],
    ["R6", "Dependência de uma pessoa meio período", "Código, documentação e manual a cada sprint; par técnico na NTS desde a semana 1.", "Antrópica", 2, 3],
    ["R7", "Ariba e anuência para subcontratar", "Semana 0: a Antrópica entra no Ariba e na qualificação (Linkana)? Anuência escrita da NTS.", "Enjourney", 3, 3],
    ["R8", "Exceções continuam passando", "Exceção exige permissão escrita de quem pode; relatório mensal de exceções permitidas.", "NTS, dono do processo", 2, 4],
  ];
  const band = (s) => (s >= 16 ? ["crit", "Crítico"] : s >= 10 ? ["high", "Alto"] : s >= 5 ? ["med", "Médio"] : ["low", "Baixo"]);
  const host = $("#riskGrid");
  const left = el("div", {}, host);
  const hm = el("div", { class: "hm", style: "height:calc(100% - 30px)" }, left);
  el("div", { class: "yl" }, hm, "PROBABILIDADE →");
  const grid = el("div", { class: "grid" }, hm);
  for (let p = 5; p >= 1; p--) for (let i = 1; i <= 5; i++) {
    const s = p * i, b = band(s)[0];
    const c = el("div", { class: `cell b-${b === "crit" ? "crit" : b === "high" ? "high" : b === "med" ? "med" : "low"}`, "data-p": p, "data-i": i }, grid);
    el("span", { class: "ax" }, c, String(s));
  }
  el("div", { class: "xl" }, hm, "IMPACTO →");
  el("div", { class: "hm-key" }, left).innerHTML = `<span><i class="b-low"></i>Baixo 1 a 4</span><span><i class="b-med"></i>Médio 5 a 9</span><span><i class="b-high"></i>Alto 10 a 15</span><span><i class="b-crit"></i>Crítico 16 a 25</span><span style="color:var(--ink-4)">pontos = probabilidade × impacto</span>`;
  const list = el("div", { class: "list" }, host);
  R.forEach(([id, t, m, o, p, i]) => {
    const s = p * i, [bk, bl] = band(s);
    const mk = el("button", { class: "rk", type: "button", "data-r": id }, $(`.cell[data-p="${p}"][data-i="${i}"]`, grid), id);
    const row = el("button", { class: "rrow", type: "button", "data-r": id }, list);
    row.innerHTML = `<span class="id">${id}</span><div><b>${t}</b><span>${m}</span></div><span class="ow">${o}</span><span class="score"><b>${s}</b><em class="${bk}">${bl}</em></span>`;
    [mk, row].forEach((n) => (n.onclick = () => pick(id)));
  });
  let cur = null;
  function pick(id) {
    cur = cur === id ? null : id;
    $$("[data-r]", host).forEach((n) => n.classList.toggle("on", n.dataset.r === cur));
  }
}
function buildAssumptions() {
  const rows = [
    ["Pessoas no ciclo e dedicação", "6 analistas × 40% do mês", "ass", "hipótese; ledger v3 §1.1; medido nas semanas 1-2"],
    ["Horas da equipe por ciclo", "≈ 400 h (170 a 800)", "calc", "ledger v3 §1.4: 6 × 168 h × 40%"],
    ["Potencial do ciclo inteiro, coberto e em uso", "≈ 30% (20% a 45%)", "ass", "ledger v3 §2.2; 261013-time-model.md"],
    ["Ritmo de rotina, se virar o caminho normal", "≈ 10% op. 1 · ≈ 15% op. 2", "calc", "ledger v3 §2.3; simulação, mediana"],
    ["Chance de ser a rotina no 6º mês", "≈ 1 em 2 op. 1 · ≈ 2 em 3 op. 2", "ass", "três revisores; coerente com a literatura; a medir"],
    ["Média dos 12 primeiros ciclos", "≈ 4% op. 1 · ≈ 9% op. 2", "calc", "ledger v3 §2.5; paralelos e não uso incluídos"],
    ["Tempo de toque na tarefa coberta", "−50% a −80%", "ass", "ledger v3 §2.1; Ares (15 para 2 min); MGI 2017"],
    ["Capacidade devolvida, valorada a custo", "≈ R$ 70 / 90 mil por ano; não é caixa", "calc", "ledger v3 §2.7: 40 e 55 h por ciclo × 12 × R$ 140"],
    ["Custo da hora, carregado, por nível", "R$ 140 base; R$ 113 (analista) a R$ 322", "calc", "relatório da administração da NTS 2025; ledger §1.5"],
    ["Preço à Enjourney", "R$ 165 mil op. 1 · R$ 225 mil op. 2", "meta", "benchmark externo; 261013-pricing.md; ledger v3 §4"],
    ["Custo mensal do gás de uso do sistema, 2026", "R$ 8 a 14 milhões por mês, volume médio", "calc", "ledger v3 §3.6 a 3.12; editais da NTS, FRED, BCB"],
    ["Escala de uma apuração mensal da NTS", "R$ 20 a 53 milhões por mês (2026)", "obs", "ledger v3 §3.1; ntsbrasil.com, 2026-10-13"],
  ];
  const host = $("#assump");
  host.style.cssText = "display:grid;grid-template-columns:1fr 250px;gap:20px;height:100%;padding-bottom:14px";
  const wrap = el("div", { class: "tbl-wrap" }, host);
  const t = el("table", { class: "tbl" }, wrap);
  t.innerHTML = `<thead><tr><th>Premissa</th><th>Valor</th><th>Tipo</th><th>Fonte</th></tr></thead><tbody>${rows.map(([a, v, k, s]) => `<tr data-k="${k}"><td class="m">${a}</td><td class="v" style="white-space:normal">${v}</td><td><span class="ty ${k}">${TYPE[k][0]}</span></td><td class="s">${s}</td></tr>`).join("")}</tbody>`;
  const side = el("div", { style: "display:flex;flex-direction:column;gap:10px" }, host);
  typeFilter(side, t, rows);
  el("div", { style: "margin-top:auto;border-radius:14px;background:var(--navy-800);color:#d2e2f0;padding:16px;font-size:13px;line-height:1.5" }, side).innerHTML =
    `<b style="color:var(--yellow);font:700 15px/1.3 Montserrat">Os assumidos viram medidos</b><br>na pesquisa de campo ou no piloto; cada número tem uma segunda assinatura no ledger.`;
}

/* --------------------------------------------- 22 · decisões marcáveis */
function buildDecision() {
  $$("#s22 .dec .card").forEach((c) => $(".check", c).addEventListener("click", () => c.classList.toggle("done")));
}
