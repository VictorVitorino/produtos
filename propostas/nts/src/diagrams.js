/* =========================================================================
   Diagramas em SVG com coordenadas fixas: pool e raias, conectores
   ortogonais com cantos arredondados e setas sempre coerentes.
   ========================================================================= */
const D = {
  text(p, x, y, lines, o = {}) {
    const t = sv("text", {
      x, y, "font-family": o.head ? "Montserrat" : "Inter", "font-size": o.size || 12, "font-weight": o.weight || 400,
      fill: o.fill || "#0C2135", "text-anchor": o.anchor || "start", "letter-spacing": o.ls || null,
    }, p);
    [].concat(lines).forEach((ln, i) => sv("tspan", { x, dy: i ? (o.lh || (o.size || 12) * 1.3) : 0 }, t, ln));
    return t;
  },
  rect(p, x, y, w, h, o = {}) {
    return sv("rect", { x, y, width: w, height: h, rx: o.rx ?? 10, fill: o.fill || "#fff", stroke: o.stroke || "none", "stroke-width": o.sw || 1, "stroke-dasharray": o.dash || null, opacity: o.op ?? null }, p);
  },
  // polilinha ortogonal com cantos arredondados
  path(pts, r = 8) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1);
      const rr = Math.min(r, l1 / 2, l2 / 2);
      const ax = x1 - ((x1 - x0) / l1) * rr, ay = y1 - ((y1 - y0) / l1) * rr;
      const bx = x1 + ((x2 - x1) / l2) * rr, by = y1 + ((y2 - y1) / l2) * rr;
      d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${x1} ${y1} ${bx.toFixed(1)} ${by.toFixed(1)}`;
    }
    const L = pts[pts.length - 1];
    return d + ` L${L[0]} ${L[1]}`;
  },
  defs(svg, id) {
    svg.insertAdjacentHTML("afterbegin", `<defs>
      <marker id="${id}-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#03426F"/></marker>
      <marker id="${id}-ay" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#E9B415"/></marker>
      <marker id="${id}-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#D2504A"/></marker>
      <marker id="${id}-ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#8C9BAA"/></marker>
    </defs>`);
  },
};

/* ================================================== 4 · processo em pool --- */
function buildProcessPool() {
  const host = $("#poolProc");
  const W = 1488, H = 612;
  const svg = sv("svg", { viewBox: `0 0 ${W} ${H}`, class: "pool-text" }, host);
  D.defs(svg, "pp");
  const POOLW = 34, LANEW = 196, X0 = POOLW + LANEW, CX0 = X0 + 34, CX1 = W - 50;
  const COLS = 7, CW = (CX1 - CX0) / COLS, BW = CW - 22, BH = 70;
  const TOP = 74, LH = 92, LANES = 5;
  const colX = (c) => CX0 + c * CW + (CW - BW) / 2;
  const laneY = (l) => TOP + l * LH;
  const boxY = (l) => laneY(l) + (LH - BH) / 2;

  // pool
  D.rect(svg, 0, TOP, W, LH * LANES, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 1.5 });
  sv("path", { d: `M14 ${TOP}h${POOLW - 14}v${LH * LANES}h-${POOLW - 14}a14 14 0 0 1-14-14v-${LH * LANES - 28}a14 14 0 0 1 14-14z`, fill: "#03426F" }, svg);
  const pt = D.text(svg, 0, 0, "POOL · CICLO MENSAL DE CUSTOS DE TRANSPORTE · NTS", { head: 1, size: 10.5, weight: 700, fill: "#FECC32", anchor: "middle", ls: ".14em" });
  pt.setAttribute("transform", `translate(${POOLW / 2 + 4} ${TOP + (LH * LANES) / 2}) rotate(-90)`);

  // fases (cabeçalho)
  const PH = [
    { c0: 0, c1: 2, t: "1 · Levantamento", s: "até o 2º dia útil" },
    { c0: 2, c1: 5, t: "2 · Entrada de cálculo", s: "a grande junção: medições, contratos, preços e custos" },
    { c0: 5, c1: 6, t: "3 · Alinhamento", s: "3º dia útil" },
    { c0: 6, c1: 7, t: "4 · Revisão e fechamento", s: "cobrança 7º d.u. · pagamento dia 21" },
  ];
  PH.forEach((p, k) => {
    const x = CX0 + p.c0 * CW + 3, w = (p.c1 - p.c0) * CW - 6;
    D.rect(svg, x, 4, w, 58, { rx: 10, fill: k === 1 ? "#03426F" : "#EDF3FA" });
    D.text(svg, x + 12, 26, p.t, { head: 1, size: 12.5, weight: 700, fill: k === 1 ? "#fff" : "#03426F" });
    D.text(svg, x + 12, 45, p.s, { size: 11, fill: k === 1 ? "#FECC32" : "#5F7387" });
    if (k) sv("line", { x1: CX0 + p.c0 * CW, x2: CX0 + p.c0 * CW, y1: TOP, y2: TOP + LH * LANES, stroke: "#C6D3E0", "stroke-dasharray": "3 5" }, svg);
  });

  // raias
  const LN = [
    ["Operações comerciais", "NTS · programação e fechamento"],
    ["Medição e centro de controle", "NTS"],
    ["Faturamento e controladoria", "NTS · fiscal e regulatório"],
    ["Suprimento de gás e energia", "NTS"],
    ["Externos", "carregadores, TAG, fornecedor"],
  ];
  LN.forEach(([t, s], l) => {
    const y = laneY(l);
    if (l) sv("line", { x1: POOLW, x2: W, y1: y, y2: y, stroke: "#DAE3ED" }, svg);
    if (l % 2) D.rect(svg, POOLW + 1, y + 0.5, LANEW - 1, LH - 1, { rx: 0, fill: "#F6F8FB" });
    D.text(svg, POOLW + 16, y + LH / 2 - 4, t, { head: 1, size: 12.5, weight: 700, fill: "#032B4E" });
    D.text(svg, POOLW + 16, y + LH / 2 + 13, s, { size: 10.5, fill: "#5F7387" });
  });
  sv("line", { x1: X0, x2: X0, y1: TOP, y2: TOP + LH * LANES, stroke: "#C6D3E0" }, svg);

  // tarefas [id, raia, coluna, título, sub, dor] · raias: 0 op. comerciais, 1 medição, 2 faturamento, 3 suprimento, 4 externos
  const T = [
    ["A", 0, 0, ["Abre o fechamento", "e pede dados"], ["e-mail, Teams e", "telefone, por fonte"], 1],
    ["E", 2, 0, ["Envia custos", "realizados"], ["do mês anterior"]],
    ["C", 1, 1, ["Envia quantidades", "provisórias"], ["certificação ainda", "aberta"]],
    ["Dd", 3, 1, ["Recebe preços e", "índices do período"], ["do fornecedor e das", "fontes públicas"]],
    ["B", 4, 1, ["Publicam preços,", "índices e programação"], ["portais, e-mails e", "relatórios"]],
    ["F", 0, 2, ["Consolida a", "planilha-mestre"], ["versões por pessoa", "e por data"], 1],
    ["G", 1, 2, ["Fecha medições", "e retificações"], ["retroativas, refeitas", "à mão"], 1],
    ["H", 3, 2, ["Confirma volumes", "contratados"], ["por carregador"]],
    ["I", 0, 3, ["Parametriza alocação", "e empacotamento"], ["regras à mão, do", "mês anterior"], 1],
    ["J", 0, 4, ["Roda o rateio e", "a otimização"], ["macro ou solver", "na planilha"]],
    ["K", 0, 5, ["Compara com", "o esperado"], ["monta a", "apresentação"]],
    ["M", 2, 5, ["Confere custo", "contra orçamento"], []],
    ["L", 3, 5, ["Alinha com", "carregadores e TAG"], ["reuniões e e-mails"], 1],
    ["N", 0, 6, ["Revisão de gestão"], ["aprova as regras de", "alocação do mês"]],
    ["O", 2, 6, ["Emite cobrança", "e provisiona"], ["diferenças ficam para", "o próximo ciclo"], 1],
    ["P", 4, 6, ["Contestam ou", "confirmam"], ["15 dias para", "contestar"]],
  ];
  const box = {};
  const gEdges = sv("g", {}, svg), gBoxes = sv("g", {}, svg);
  T.forEach(([id, l, c, t, s, pain]) => {
    const x = colX(c), y = boxY(l);
    box[id] = { x, y, w: BW, h: BH, cx: x + BW / 2, cy: y + BH / 2 };
    const g = sv("g", {}, gBoxes);
    D.rect(g, x, y, BW, BH, { rx: 10, fill: pain ? "#FFFAE8" : "#fff", stroke: pain ? "#E9B415" : "#A3BDD4", sw: pain ? 1.6 : 1.2 });
    const lines = t.length + s.length, h = t.length * 14 + s.length * 12.5 + (s.length ? 2 : 0);
    const ty = y + (BH - h) / 2 + 10;
    D.text(g, x + 10, ty, t, { head: 1, size: 11, weight: 700, fill: "#032B4E", lh: 14 });
    if (s.length) D.text(g, x + 10, ty + t.length * 14 + 1, s, { size: 10, fill: "#5F7387", lh: 12.5 });
    if (pain) {
      sv("circle", { cx: x + BW - 2, cy: y + 2, r: 9, fill: "#FECC32", stroke: "#fff", "stroke-width": 2 }, g);
      D.text(g, x + BW - 2, y + 6, "!", { head: 1, size: 12, weight: 800, fill: "#032B4E", anchor: "middle" });
    }
  });
  const R = (b) => [b.x + b.w, b.cy], L = (b) => [b.x, b.cy], Tp = (b) => [b.cx, b.y], Bt = (b) => [b.cx, b.y + b.h];
  const gapX = (c, off = 0) => CX0 + c * CW + off; // linha entre as colunas c-1 e c
  const edge = (pts, o = {}) => sv("path", { d: D.path(pts), fill: "none", stroke: o.c || "#03426F", "stroke-width": o.w || 1.6, "stroke-dasharray": o.dash || null, "marker-end": `url(#pp-${o.m || "a"})` }, gEdges);
  const b = box;
  // início
  sv("circle", { cx: CX0 - 17, cy: b.A.cy, r: 9, fill: "#fff", stroke: "#03426F", "stroke-width": 2 }, svg);
  edge([[CX0 - 8, b.A.cy], L(b.A)]);
  // levantamento
  edge([Bt(b.A), Tp(b.E)]);                                                  // pede custos realizados
  edge([R(b.A), [gapX(1), b.A.cy], [gapX(1), b.C.cy], L(b.C)]);               // pede medições
  edge([Tp(b.B), Bt(b.Dd)]);                                                  // externos publicam preços
  // a grande junção
  const jx = gapX(2, -6);
  edge([R(b.C), [jx, b.C.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.E), [jx, b.E.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.Dd), [jx, b.Dd.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.B), [gapX(2, 6), b.B.cy], [gapX(2, 6), b.H.cy], L(b.H)]);        // programação → volumes
  edge([Tp(b.G), Bt(b.F)], { dash: "5 4" });                                   // retificações
  edge([R(b.F), L(b.I)]);
  edge([R(b.H), [gapX(3), b.H.cy], [gapX(3), b.I.cy], L(b.I)]);
  edge([R(b.I), L(b.J)]);
  edge([R(b.J), L(b.K)]);
  edge([Bt(b.J), [b.J.cx, b.M.cy], L(b.M)]);                                   // resultado à controladoria
  edge([[b.J.cx, b.M.cy], [b.J.cx, b.L.cy], L(b.L)]);                          // e ao suprimento
  const rx = gapX(6);
  edge([R(b.M), [rx, b.M.cy], [rx, b.N.cy], L(b.N)]);
  edge([R(b.L), [rx, b.L.cy], [rx, b.N.cy], L(b.N)]);
  edge([R(b.K), L(b.N)]);
  edge([Bt(b.N), Tp(b.O)]);
  edge([Bt(b.O), Tp(b.P)]);
  // fim
  const ex = CX1 + 22;
  edge([R(b.P), [ex - 12, b.P.cy]]);
  sv("circle", { cx: ex, cy: b.P.cy, r: 10, fill: "#fff", stroke: "#03426F", "stroke-width": 3.5 }, svg);

  // sistemas
  const SY = TOP + LH * LANES + 18;
  D.text(svg, 0, SY + 17, "SISTEMAS", { head: 1, size: 10.5, weight: 700, fill: "#5F7387", ls: ".16em" });
  const sys = ["ConnectGas", "SAP", "SCADA e BAMQGAS", "Power BI", "Covenants", "Excel", "Outlook", "Teams", "PDF", "Portal ANP", "Portal de capacidade", "Índices: Brent e câmbio"];
  let sx = 92;
  sys.forEach((n) => {
    const w = n.length * 6.6 + 22;
    D.rect(svg, sx, SY, w, 26, { rx: 13, fill: "#EDF3FA", stroke: "#D7E5F2" });
    D.text(svg, sx + w / 2, SY + 17, n, { size: 11.2, weight: 500, fill: "#03426F", anchor: "middle" });
    sx += w + 7;
  });
  // legenda
  const LY2 = SY + 50;
  const lg = sv("g", {}, svg);
  sv("circle", { cx: 8, cy: LY2 - 4, r: 7, fill: "#FECC32" }, lg);
  D.text(lg, 8, LY2, "!", { head: 1, size: 10, weight: 800, anchor: "middle", fill: "#032B4E" });
  D.text(lg, 22, LY2, "ponto de dor", { size: 11.5, fill: "#34495E" });
  sv("path", { d: "M120 " + (LY2 - 4) + "h34", stroke: "#03426F", "stroke-width": 1.6, "marker-end": "url(#pp-a)" }, lg);
  D.text(lg, 162, LY2, "fluxo de sequência", { size: 11.5, fill: "#34495E" });
  sv("path", { d: "M290 " + (LY2 - 4) + "h34", stroke: "#03426F", "stroke-width": 1.6, "stroke-dasharray": "5 4", "marker-end": "url(#pp-a)" }, lg);
  D.text(lg, 332, LY2, "retroativo", { size: 11.5, fill: "#34495E" });
  sv("circle", { cx: 438, cy: LY2 - 4, r: 7, fill: "#fff", stroke: "#03426F", "stroke-width": 3 }, lg);
  D.text(lg, 452, LY2, "fim: fora do prazo de contestação, a diferença passa ao ciclo seguinte, por nota de crédito", { size: 11.5, fill: "#34495E" });
  D.text(lg, W, LY2, "hipótese de trabalho · o mapeamento da Enjourney substitui este desenho", { size: 11.5, fill: "#8C9BAA", anchor: "end" });
}

/* ========================================= 8 · sistema: pools e raias --- */
const SYS_FLOWS = [
  { id: "1", t: "Externos → Estação", s: "Só leitura, lista de sites; a pessoa entra no portal, o agente lê o arquivo e guarda a origem." },
  { id: "2", t: "Estação → Serviços NTS", s: "Login único (SSO Entra ID), perfis distintos; o Outlook lê caixas nomeadas e devolve rascunho." },
  { id: "3", t: "Serviços NTS → Nuvem NTS", s: "Só leitura de ConnectGas, SAP e M365; OT só por exportação, nunca SCADA." },
  { id: "4", t: "Estação → Nuvem NTS", s: "Só pelo gateway, com registro de cada ciclo." },
  { id: "5", t: "Nuvem NTS → Provedor", s: "O gateway é a única saída: conteúdo mínimo, sem dado pessoal, log de cada chamada." },
  { id: "6", t: "Enjourney e Antrópica → Homologação", s: "Regras e validação com dados mascarados, por canal aprovado; sem dado real." },
];
const SYS_DENY = [
  ["✕2", "Externos → Serviços NTS", "sem acesso de entrada"],
  ["✕3", "Provedor → Nuvem NTS", "sem chamada de volta"],
  ["", "Estação → Provedor", "nunca direto"],
  ["", "Nuvem NTS → Externos", "a ferramenta nunca envia; a pessoa envia"],
];
function buildSystemPool() {
  const host = $("#poolSys");
  const W = 1110, H = 610;
  const svg = sv("svg", { viewBox: `0 0 ${W} ${H}`, class: "pool-text" }, host);
  host.style.height = "100%";
  D.defs(svg, "sp");
  const gPools = sv("g", {}, svg), gEdges = sv("g", {}, svg), gBox = sv("g", {}, svg), gBadge = sv("g", {}, svg);
  const P0 = 74, P1 = 572;   // topo e base dos pools
  const tag = (p, x, y, txt, kind) => {
    const col = { u: ["#EEF1F4", "#5F7387"], t: ["#DDF3EA", "#1b7a56"], r: ["#032B4E", "#FECC32"], a: ["#FECC32", "#032B4E"] }[kind];
    const w = txt.length * 6.4 + 16;
    D.rect(p, x, y, w, 19, { rx: 9.5, fill: col[0] });
    D.text(p, x + w / 2, y + 13, txt, { head: 1, size: 9.2, weight: 700, fill: col[1], anchor: "middle", ls: ".08em" });
    return w;
  };
  const node = (x, y, w, t, s, o = {}) => {
    const h = s ? 50 : 34;
    D.rect(gBox, x, y, w, h, { rx: 9, fill: o.fill || "#fff", stroke: o.stroke || "#C6D3E0", sw: o.sw || 1 });
    D.text(gBox, x + 10, y + (s ? 18 : 21), t, { head: 1, size: 11.6, weight: 700, fill: "#032B4E" });
    if (s) D.text(gBox, x + 10, y + 34, s, { size: 9.8, fill: "#5F7387" });
    if (o.badge) tag(gBox, x + w - o.badge.length * 6.4 - 24, y + 7, o.badge, "a");
    return { x, y, w, h, cx: x + w / 2, cy: y + h / 2, r: x + w, b: y + h };
  };

  // atores
  const actors = [
    { x: 236, t: "Analistas NTS", s: "operam pela estação" },
    { x: 446, t: "TI e dados NTS", s: "acessos e identidade" },
    { x: 656, t: "Gestores NTS", s: "aprovam pelo app ou pelo web" },
    { x: 876, t: "Enjourney", s: "valida regras" },
    { x: 996, t: "Antrópica", s: "dev. remoto" },
  ];
  actors.forEach((a, k) => {
    const w = k > 2 ? 114 : 190;
    D.rect(gPools, a.x, 0, w, 44, { rx: 10, fill: "#F6F8FB", stroke: "#DAE3ED" });
    sv("circle", { cx: a.x + 18, cy: 22, r: 10, fill: "#D7E5F2" }, gPools);
    sv("path", { d: `M${a.x + 18} 18.5a3 3 0 1 0 0.01 0M${a.x + 12.5} 28c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5`, fill: "none", stroke: "#03426F", "stroke-width": 1.6 }, gPools);
    D.text(gPools, a.x + 34, 19, a.t, { head: 1, size: 11, weight: 700, fill: "#032B4E" });
    D.text(gPools, a.x + 34, 33, a.s, { size: 9.4, fill: "#5F7387" });
    sv("line", { x1: a.x + w / 2, x2: a.x + w / 2, y1: 44, y2: P0, stroke: "#8C9BAA", "stroke-dasharray": "2 3" }, gPools);
  });

  // pool Externos
  D.rect(gPools, 0, P0, 176, P1 - P0, { rx: 14, fill: "#F3F5F7", stroke: "#A9B6C3", dash: "5 4", sw: 1.4 });
  D.text(gPools, 14, P0 + 24, "Externos", { head: 1, size: 13.5, weight: 700, fill: "#34495E" });
  tag(gPools, 14, P0 + 34, "NÃO CONFIÁVEL", "u");
  const ext = ["Portal ANP", "Portais de parceiros", "Fontes de índices", "E-mails de terceiros"].map((t, i) => node(12, P0 + 70 + i * 44, 152, t, null, { fill: "#fff", stroke: "#DAE3ED" }));

  // pool Perímetro NTS com 3 raias
  const PX = 204, PW = 640, LW = PW / 3;
  D.rect(gPools, PX, P0, PW, P1 - P0, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 2 });
  sv("path", { d: `M${PX + 14} ${P0}h${PW - 28}a14 14 0 0 1 14 14v22h-${PW}v-22a14 14 0 0 1 14-14z`, fill: "#03426F" }, gPools);
  D.text(gPools, PX + 14, P0 + 23, "Perímetro NTS", { head: 1, size: 13.5, weight: 700, fill: "#fff" });
  D.text(gPools, PX + 120, P0 + 23, "rede, identidade e dado", { size: 11, fill: "#A3BDD4" });
  tag(gPools, PX + PW - 84, P0 + 9, "RESTRITA", "r");
  const lanes = [
    { t: "Estação do analista", tags: [["CONFIÁVEL", "t"], ["OPÇÃO A · DESKTOP", "a"]] },
    { t: "Serviços internos", tags: [["CONFIÁVEL", "t"]] },
    { t: "Nuvem NTS (Azure)", tags: [["CONFIÁVEL", "t"], ["OPÇÃO B · WEB", "a"]] },
  ];
  lanes.forEach((ln, i) => {
    const x = PX + i * LW;
    if (i) sv("line", { x1: x, x2: x, y1: P0 + 36, y2: P1, stroke: "#A3BDD4", "stroke-dasharray": "4 4" }, gPools);
    if (i === 1) D.rect(gPools, x + 1, P0 + 36, LW - 2, P1 - P0 - 37, { rx: 0, fill: "#F6F8FB" });
    D.text(gPools, x + 12, P0 + 58, ln.t, { head: 1, size: 12.5, weight: 700, fill: "#032B4E" });
    let tx = x + 12;
    ln.tags.forEach(([t, k]) => { tx += tag(gPools, tx, P0 + 66, t, k) + 6; });
  });
  const LX = (i) => PX + i * LW + 12, NW = LW - 24;
  const st = {
    nav: node(LX(0), P0 + 100, NW, "Navegador", "portais sem API, lista de sites"),
    out: node(LX(0), P0 + 160, NW, "Outlook e Teams", "lê caixas nomeadas; nunca envia"),
    xls: node(LX(0), P0 + 220, NW, "Excel e PowerPoint", "planilha gerada e versionada"),
    app: node(LX(0), P0 + 380, NW, "App desktop", "agente na estação", { badge: "A", stroke: "#03426F", sw: 1.6 }),
  };
  const svc = {
    id: node(LX(1), P0 + 100, NW, "Entra ID (identidade)", "SSO, acesso condicional"),
    m365: node(LX(1), P0 + 160, NW, "Microsoft 365 e SharePoint", "caixas e site nomeados"),
    sap: node(LX(1), P0 + 220, NW, "SAP (ERP)", null),
    cg: node(LX(1), P0 + 264, NW, "ConnectGas", "lê e devolve, não refaz"),
    ot: node(LX(1), P0 + 360, NW, "Medição e simulador (OT)", "só exportações, nunca escrita"),
  };
  sv("line", { x1: LX(1) - 6, x2: LX(1) + NW + 6, y1: P0 + 340, y2: P0 + 340, stroke: "#8C9BAA", "stroke-dasharray": "6 4" }, gPools);
  D.text(gPools, LX(1) + NW, P0 + 334, "fronteira TI/OT", { size: 9.6, fill: "#5F7387", anchor: "end" });
  const cl = {
    web: node(LX(2), P0 + 100, NW, "Web app", "na assinatura Azure da NTS", { badge: "B" }),
    db: node(LX(2), P0 + 220, NW, "Banco da ferramenta", "registro de cada ciclo"),
    gw: node(LX(2), P0 + 380, NW, "Gateway de IA", "conteúdo mínimo, log de chamadas", { stroke: "#E9B415", sw: 2, fill: "#FFFAE8" }),
  };
  // pools Homologação e Provedor
  const CX = 872, CW2 = 238;
  D.rect(gPools, CX, P0, CW2, 186, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 2 });
  D.text(gPools, CX + 14, P0 + 24, "Homologação", { head: 1, size: 13.5, weight: 700, fill: "#032B4E" });
  tag(gPools, CX + CW2 - 84, P0 + 10, "RESTRITA", "r");
  const hom = node(CX + 14, P0 + 100, CW2 - 28, "Ambiente de teste", "dados mascarados, sem dado real");
  D.rect(gPools, CX, P0 + 290, CW2, P1 - P0 - 290, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 2 });
  D.text(gPools, CX + 14, P0 + 314, "Provedor de modelo", { head: 1, size: 13.5, weight: 700, fill: "#032B4E" });
  tag(gPools, CX + 14, P0 + 324, "RESTRITA", "r");
  const api = node(CX + 14, P0 + 380, CW2 - 28, "API do modelo", "sem treino; retenção zero a contratar");

  // conectores
  const E = [];
  const edge = (fid, pts, o = {}) => {
    const p = sv("path", { class: "edge", "data-f": fid, d: D.path(pts), fill: "none", stroke: o.deny ? "#D2504A" : "#03426F", "stroke-width": o.deny ? 1.6 : 1.8, "stroke-dasharray": o.deny ? "5 4" : o.dash || null, "marker-end": `url(#sp-${o.deny ? "ar" : "a"})` }, gEdges);
    E.push(p); return p;
  };
  const badge = (fid, x, y, deny) => {
    const g = sv("g", { class: "ebadge", "data-f": fid, style: "cursor:pointer" }, gBadge);
    sv("circle", { cx: x, cy: y, r: 11, fill: deny ? "#D2504A" : "#03426F", stroke: "#fff", "stroke-width": 2.5 }, g);
    D.text(g, x, y + 4, deny ? "✕" : fid, { head: 1, size: 11, weight: 700, fill: "#fff", anchor: "middle" });
    g.addEventListener("click", () => highlight(fid));
  };
  // 1 Externos → Navegador
  edge("1", [[176, st.nav.cy], [st.nav.x, st.nav.cy]]); badge("1", 190, st.nav.cy - 16);
  // 2 Estação → Serviços (SSO e caixas nomeadas)
  const g2 = PX + LW;
  edge("2", [[st.out.r, st.out.cy], [svc.m365.x, svc.m365.cy]]);
  edge("2", [[st.nav.r, st.nav.cy], [svc.id.x, svc.id.cy]]);
  badge("2", g2, st.out.cy - 14);
  // 3 Serviços → Banco (só leitura) — barramento
  const g3 = PX + 2 * LW;
  [svc.m365, svc.sap, svc.cg].forEach((n) => edge("3", [[n.r, n.cy], [g3, n.cy], [g3, cl.db.cy], [cl.db.x, cl.db.cy]]));
  edge("3", [[svc.ot.r, svc.ot.cy], [g3, svc.ot.cy], [g3, cl.db.cy + 0.01], [cl.db.x, cl.db.cy]], { dash: "4 3" });
  badge("3", g3, svc.cg.cy + 26);
  // 4 App desktop → Gateway, por baixo da raia de serviços
  const busY = P1 - 30;
  edge("4", [[st.app.cx, st.app.b], [st.app.cx, busY], [cl.gw.cx, busY], [cl.gw.cx, cl.gw.b]]);
  badge("4", (st.app.cx + cl.gw.cx) / 2, busY);
  edge("4", [[cl.web.cx, cl.web.b], [cl.web.cx, cl.db.y]], { dash: "4 3" });
  // 5 Gateway → API
  edge("5", [[cl.gw.r, cl.gw.cy], [api.x, api.cy]]); badge("5", (cl.gw.r + api.x) / 2, cl.gw.cy - 16);
  // 6 Enjourney/Antrópica → Homologação
  edge("6", [[933, 44], [933, hom.y]]); edge("6", [[1053, 44], [1053, hom.y]]);
  badge("6", 993, P0 + 72);
  // negados
  edge("✕2", [[176, svc.ot.cy - 20], [PX + 22, svc.ot.cy - 20]], { deny: 1 }); badge("✕2", 190, svc.ot.cy - 20, 1);
  edge("✕3", [[api.x, api.cy + 16], [cl.gw.r + 6, api.cy + 16]], { deny: 1 }); badge("✕3", (cl.gw.r + api.x) / 2, api.cy + 32, 1);

  // legenda
  const ly = H - 14, lg = sv("g", {}, svg);
  sv("path", { d: `M0 ${ly - 4}h30`, stroke: "#03426F", "stroke-width": 1.8, "marker-end": "url(#sp-a)" }, lg);
  D.text(lg, 38, ly, "permitido", { size: 11, fill: "#34495E" });
  sv("path", { d: `M110 ${ly - 4}h30`, stroke: "#D2504A", "stroke-width": 1.6, "stroke-dasharray": "5 4", "marker-end": "url(#sp-ar)" }, lg);
  D.text(lg, 148, ly, "negado", { size: 11, fill: "#34495E" });
  sv("path", { d: `M210 ${ly - 4}h30`, stroke: "#03426F", "stroke-width": 1.6, "stroke-dasharray": "4 3", "marker-end": "url(#sp-a)" }, lg);
  D.text(lg, 248, ly, "exportação / opção B", { size: 11, fill: "#34495E" });
  D.text(lg, 410, ly, "No 1º release o agente não entra em portal com login pessoal: uma pessoa busca, a ferramenta lê e guarda o arquivo de origem.", { size: 11, fill: "#5F7387" });

  // painel
  const panel = $("#sysPanel");
  el("div", { class: "eyebrow", style: "margin-bottom:2px" }, panel, "Fluxos entre zonas · clique para destacar");
  SYS_FLOWS.forEach((f) => {
    const b = el("button", { class: "flowitem", type: "button", "data-f": f.id }, panel);
    b.innerHTML = `<span class="fi-n">${f.id}</span><div><b>${f.t}</b><span>${f.s}</span></div>`;
    b.onclick = () => highlight(f.id);
  });
  const dn = el("div", { class: "denybox" }, panel);
  dn.innerHTML = `<div class="eyebrow" style="color:var(--red)">Negados</div>` + SYS_DENY.map(([id, t, s]) => `<button type="button" class="dn" data-f="${id || "-"}"><span>✕</span><b>${t}</b><em>${s}</em></button>`).join("");
  $$(".dn", dn).forEach((b) => (b.onclick = () => b.dataset.f !== "-" && highlight(b.dataset.f)));
  let cur = null;
  function highlight(fid) {
    cur = cur === fid ? null : fid;
    gEdges.parentNode.classList.toggle("hl-dim", !!cur);
    $$("[data-f]", svg).forEach((n) => n.classList.toggle("hl", n.dataset.f === cur));
    $$(".flowitem,.dn", panel).forEach((n) => n.classList.toggle("on", n.dataset.f === cur));
  }
}
