/* =========================================================================
   Diagramas em SVG com coordenadas fixas: pool e raias, conectores
   ortogonais com cantos arredondados. Cada caixa e cada seta guardam a
   própria geometria (data-r, data-pts) para a verificação automática de
   que nenhuma seta atravessa uma caixa.
   ========================================================================= */
const D = {
  text(p, x, y, lines, o = {}) {
    const t = sv("text", {
      x, y, "font-family": o.head ? "Barlow Condensed" : "Inter", "font-size": o.size || 12, "font-weight": o.weight || 400,
      fill: o.fill || "#10263B", "text-anchor": o.anchor || "start", "letter-spacing": o.ls || null,
    }, p);
    [].concat(lines).forEach((ln, i) => sv("tspan", { x, dy: i ? (o.lh || (o.size || 12) * 1.3) : 0 }, t, ln));
    return t;
  },
  rect(p, x, y, w, h, o = {}) {
    return sv("rect", { x, y, width: w, height: h, rx: o.rx ?? 10, fill: o.fill || "#fff", stroke: o.stroke || "none", "stroke-width": o.sw || 1, "stroke-dasharray": o.dash || null, opacity: o.op ?? null }, p);
  },
  path(pts, r = 9) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1);
      if (!l1 || !l2) continue;
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
      <marker id="${id}-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#C2453B"/></marker>
    </defs>`);
  },
  edge(g, pts, o = {}) {
    return sv("path", {
      class: "edge", "data-f": o.f || null, "data-pts": JSON.stringify(pts), d: D.path(pts), fill: "none",
      stroke: o.deny ? "#C2453B" : "#03426F", "stroke-width": o.w || 1.8, "stroke-dasharray": o.deny ? "6 5" : o.dash || null,
      "marker-end": `url(#${o.id}-${o.deny ? "ar" : "a"})`,
    }, g);
  },
};

/* ================================================== 4 · processo em pool --- */
function buildProcessPool() {
  const host = $("#poolProc");
  const W = 1750, H = 690;
  const svg = sv("svg", { viewBox: `0 0 ${W} ${H}` }, host);
  D.defs(svg, "pp");
  const POOLW = 40, LANEW = 232, X0 = POOLW + LANEW, CX0 = X0 + 42, CX1 = W - 64;
  const COLS = 7, CW = (CX1 - CX0) / COLS, BW = CW - 46, BH = 76;
  const TOP = 74, LH = 101, LANES = 5;
  const colX = (c) => CX0 + c * CW + (CW - BW) / 2;
  const laneY = (l) => TOP + l * LH;
  const boxY = (l) => laneY(l) + (LH - BH) / 2;

  D.rect(svg, 0, TOP, W, LH * LANES, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 1.5 });
  sv("path", { d: `M14 ${TOP}h${POOLW - 14}v${LH * LANES}h-${POOLW - 14}a14 14 0 0 1-14-14v-${LH * LANES - 28}a14 14 0 0 1 14-14z`, fill: "#0B2740" }, svg);
  const pt = D.text(svg, 0, 0, "POOL · CICLO MENSAL DE CUSTOS DE TRANSPORTE · NTS", { head: 1, size: 14, weight: 600, fill: "#cfe0f0", anchor: "middle", ls: ".16em" });
  pt.setAttribute("transform", `translate(${POOLW / 2 + 5} ${TOP + (LH * LANES) / 2}) rotate(-90)`);

  // fases
  [
    { c0: 0, c1: 2, t: "1 · Levantamento", s: "até o 2º dia útil" },
    { c0: 2, c1: 5, t: "2 · Entrada de cálculo", s: "a grande junção: medições, contratos, preços e custos" },
    { c0: 5, c1: 6, t: "3 · Alinhamento", s: "3º dia útil" },
    { c0: 6, c1: 7, t: "4 · Revisão e fechamento", s: "cobrança 7º d.u. · pagamento dia 21" },
  ].forEach((p, k) => {
    const x = CX0 + p.c0 * CW + 3, w = (p.c1 - p.c0) * CW - 6;
    D.rect(svg, x, 2, w, 60, { rx: 10, fill: k === 1 ? "#33475B" : "#EEF2F6" });
    D.text(svg, x + 14, 27, p.t, { head: 1, size: 18, weight: 600, fill: k === 1 ? "#fff" : "#03426F" });
    D.text(svg, x + 14, 47, p.s, { size: 12, fill: k === 1 ? "#f6c7b1" : "#66788A" });
    if (k) sv("line", { x1: CX0 + p.c0 * CW, x2: CX0 + p.c0 * CW, y1: TOP, y2: TOP + LH * LANES, stroke: "#C9D3DD", "stroke-dasharray": "3 6" }, svg);
  });

  // raias: 0 op. comerciais, 1 medição, 2 faturamento, 3 suprimento, 4 externos
  [
    ["Operações comerciais", "NTS · programação e fechamento"],
    ["Medição e centro de controle", "NTS"],
    ["Faturamento e controladoria", "NTS · fiscal e regulatório"],
    ["Suprimento de gás e energia", "NTS"],
    ["Externos", "carregadores, TAG, fornecedor"],
  ].forEach(([t, s], l) => {
    const y = laneY(l);
    if (l) sv("line", { x1: POOLW, x2: W, y1: y, y2: y, stroke: "#DDE3EA" }, svg);
    if (l % 2) D.rect(svg, POOLW + 1, y + 0.5, LANEW - 1, LH - 1, { rx: 0, fill: "#F6F8FA" });
    D.text(svg, POOLW + 18, y + LH / 2 - 3, t, { head: 1, size: 18, weight: 600, fill: "#0B2740" });
    D.text(svg, POOLW + 18, y + LH / 2 + 16, s, { size: 12, fill: "#66788A" });
  });
  sv("line", { x1: X0, x2: X0, y1: TOP, y2: TOP + LH * LANES, stroke: "#C9D3DD" }, svg);

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
    const g = sv("g", { class: "node", "data-r": JSON.stringify([x, y, BW, BH]) }, gBoxes);
    D.rect(g, x, y, BW, BH, { rx: 10, fill: pain ? "#FDF1EA" : "#fff", stroke: pain ? "#D2643A" : "#AFC3D6", sw: pain ? 1.6 : 1.3 });
    const h = t.length * 17 + s.length * 14 + (s.length ? 3 : 0);
    const ty = y + (BH - h) / 2 + 13;
    D.text(g, x + 12, ty, t, { head: 1, size: 16, weight: 600, fill: "#0B2740", lh: 17 });
    if (s.length) D.text(g, x + 12, ty + t.length * 17 + 1, s, { size: 11.5, fill: "#66788A", lh: 14 });
    if (pain) {
      sv("circle", { cx: x + BW - 2, cy: y + 2, r: 9, fill: "#D2643A", stroke: "#fff", "stroke-width": 2 }, g);
      D.text(g, x + BW - 2, y + 6.5, "!", { head: 1, size: 13, weight: 700, fill: "#fff", anchor: "middle" });
    }
  });
  const R = (b) => [b.x + b.w, b.cy], L = (b) => [b.x, b.cy], Tp = (b) => [b.cx, b.y], Bt = (b) => [b.cx, b.y + b.h];
  const gapX = (c, off = 0) => CX0 + c * CW + off;
  const edge = (pts, o = {}) => D.edge(gEdges, pts, { id: "pp", ...o });
  const b = box;
  sv("circle", { cx: CX0 - 20, cy: b.A.cy, r: 10, fill: "#fff", stroke: "#03426F", "stroke-width": 2 }, svg);
  edge([[CX0 - 10, b.A.cy], L(b.A)]);
  edge([Bt(b.A), Tp(b.E)]);
  edge([R(b.A), [gapX(1), b.A.cy], [gapX(1), b.C.cy], L(b.C)]);
  edge([Tp(b.B), Bt(b.Dd)]);
  const jx = gapX(2, -8);
  edge([R(b.C), [jx, b.C.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.E), [jx, b.E.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.Dd), [jx, b.Dd.cy], [jx, b.F.cy], L(b.F)]);
  edge([R(b.B), [gapX(2, 8), b.B.cy], [gapX(2, 8), b.H.cy], L(b.H)]);
  edge([Tp(b.G), Bt(b.F)], { dash: "5 4" });
  edge([R(b.F), L(b.I)]);
  edge([R(b.H), [gapX(3), b.H.cy], [gapX(3), b.I.cy], L(b.I)]);
  edge([R(b.I), L(b.J)]);
  edge([R(b.J), L(b.K)]);
  edge([Bt(b.J), [b.J.cx, b.M.cy], L(b.M)]);
  edge([[b.J.cx, b.M.cy], [b.J.cx, b.L.cy], L(b.L)]);
  const rx = gapX(6);
  edge([R(b.M), [rx, b.M.cy], [rx, b.N.cy], L(b.N)]);
  edge([R(b.L), [rx, b.L.cy], [rx, b.N.cy], L(b.N)]);
  edge([R(b.K), L(b.N)]);
  edge([Bt(b.N), Tp(b.O)]);
  edge([Bt(b.O), Tp(b.P)]);
  const ex = CX1 + 30;
  edge([R(b.P), [ex - 13, b.P.cy]]);
  sv("circle", { cx: ex, cy: b.P.cy, r: 11, fill: "#fff", stroke: "#03426F", "stroke-width": 3.5 }, svg);

  // sistemas
  const SY = TOP + LH * LANES + 20;
  D.text(svg, 0, SY + 19, "SISTEMAS", { head: 1, size: 15, weight: 600, fill: "#66788A", ls: ".16em" });
  let sx = 100;
  ["ConnectGas", "SAP", "SCADA e BAMQGAS", "Power BI", "Covenants", "Excel", "Outlook", "Teams", "PDF", "Portal ANP", "Portal de capacidade", "Índices: Brent e câmbio"].forEach((n) => {
    const w = n.length * 7.2 + 26;
    D.rect(svg, sx, SY, w, 28, { rx: 14, fill: "#F6F8FA", stroke: "#DDE3EA" });
    D.text(svg, sx + w / 2, SY + 19, n, { size: 12.5, weight: 500, fill: "#3A4E62", anchor: "middle" });
    sx += w + 8;
  });
  const LY2 = SY + 60, lg = sv("g", {}, svg);
  sv("circle", { cx: 9, cy: LY2 - 5, r: 8, fill: "#D2643A" }, lg);
  D.text(lg, 9, LY2 - 0.5, "!", { head: 1, size: 12, weight: 700, anchor: "middle", fill: "#fff" });
  D.text(lg, 24, LY2, "ponto de dor", { size: 13, fill: "#3A4E62" });
  sv("path", { d: `M140 ${LY2 - 5}h36`, stroke: "#03426F", "stroke-width": 1.8, "marker-end": "url(#pp-a)" }, lg);
  D.text(lg, 186, LY2, "fluxo de sequência", { size: 13, fill: "#3A4E62" });
  sv("path", { d: `M330 ${LY2 - 5}h36`, stroke: "#03426F", "stroke-width": 1.8, "stroke-dasharray": "5 4", "marker-end": "url(#pp-a)" }, lg);
  D.text(lg, 376, LY2, "retroativo", { size: 13, fill: "#3A4E62" });
  sv("circle", { cx: 480, cy: LY2 - 5, r: 8, fill: "#fff", stroke: "#03426F", "stroke-width": 3 }, lg);
  D.text(lg, 496, LY2, "fim: fora do prazo de contestação, a diferença passa ao ciclo seguinte, por nota de crédito", { size: 13, fill: "#3A4E62" });
  D.text(lg, W, LY2, "hipótese de trabalho · o mapeamento da Enjourney substitui este desenho", { size: 13, fill: "#95A3B1", anchor: "end" });
}

/* ========================================= 8 · sistema: pools e raias --- */
const SYS_FLOWS = [
  { id: "1", t: "Externos → Estação", s: "Só leitura, lista de sites; a pessoa entra no portal, o agente lê o arquivo." },
  { id: "2", t: "Estação → Serviços NTS", s: "Login único (SSO Entra ID), perfis distintos; o Outlook devolve rascunho." },
  { id: "3", t: "Serviços NTS → Nuvem NTS", s: "Só leitura de ConnectGas, SAP e M365; OT só por exportação, nunca SCADA." },
  { id: "4", t: "Estação → Nuvem NTS", s: "Só pelo gateway, com registro de cada ciclo." },
  { id: "5", t: "Nuvem NTS → Provedor", s: "O gateway é a única saída: conteúdo mínimo, sem dado pessoal, log de cada chamada." },
  { id: "6", t: "Enjourney e Antrópica → Homologação", s: "Regras e validação com dados mascarados, por canal aprovado; sem dado real." },
];
const SYS_DENY = [
  ["✕2", "Externos → Serviços NTS", "sem acesso de entrada"],
  ["✕3", "Provedor → Nuvem NTS", "sem chamada de volta"],
  ["", "Estação → Provedor", "nunca direto"],
  ["", "Nuvem NTS → Externos", "nunca envia; a pessoa envia"],
];
function buildSystemPool() {
  const host = $("#poolSys");
  const W = 1410, H = 700;
  const svg = sv("svg", { viewBox: `0 0 ${W} ${H}` }, host);
  D.defs(svg, "sp");
  const gPools = sv("g", {}, svg), gEdges = sv("g", {}, svg), gBox = sv("g", {}, svg), gBadge = sv("g", {}, svg);
  const P0 = 74, P1 = 640;
  const tag = (p, x, y, txt, kind) => {
    const col = { u: ["#EEF1F4", "#66788A"], t: ["#DDF0E8", "#1d6a50"], r: ["#33475B", "#ffffff"], a: ["#FBE7DC", "#B4502A"] }[kind];
    const w = txt.length * 6.6 + 18;
    D.rect(p, x, y, w, 20, { rx: 10, fill: col[0] });
    D.text(p, x + w / 2, y + 14.5, txt, { head: 1, size: 12, weight: 600, fill: col[1], anchor: "middle", ls: ".08em" });
    return w;
  };
  const node = (x, y, w, t, s, o = {}) => {
    const h = s ? 54 : 38;
    const g = sv("g", { class: "node", "data-r": JSON.stringify([x, y, w, h]) }, gBox);
    D.rect(g, x, y, w, h, { rx: 9, fill: o.fill || "#fff", stroke: o.stroke || "#C9D3DD", sw: o.sw || 1.2 });
    D.text(g, x + 12, y + (s ? 22 : 25), t, { head: 1, size: 16.5, weight: 600, fill: "#0B2740" });
    if (s) D.text(g, x + 12, y + 41, s, { size: 11.5, fill: "#66788A" });
    if (o.badge) tag(g, x + w - 30, y + 8, o.badge, "a");
    return { x, y, w, h, cx: x + w / 2, cy: y + h / 2, r: x + w, b: y + h };
  };

  // atores
  const actors = [
    { x: 290, w: 186, t: "Analistas NTS", s: "operam pela estação" },
    { x: 549, w: 186, t: "TI e dados NTS", s: "acessos e identidade" },
    { x: 808, w: 186, t: "Gestores NTS", s: "aprovam pelo app ou pelo web" },
    { x: 1196, w: 104, t: "Enjourney", s: "validação" },
    { x: 1306, w: 104, t: "Antrópica", s: "dev. remoto" },
  ];
  actors.forEach((a, k) => {
    D.rect(gPools, a.x, 0, a.w, 48, { rx: 10, fill: "#F6F8FA", stroke: "#DDE3EA" });
    sv("circle", { cx: a.x + 19, cy: 24, r: 11, fill: "#E3ECF5" }, gPools);
    sv("path", { d: `M${a.x + 19} 20.5a3.2 3.2 0 1 0 .01 0M${a.x + 13} 30.5c0-3.2 2.7-4.8 6-4.8s6 1.6 6 4.8`, fill: "none", stroke: "#03426F", "stroke-width": 1.6 }, gPools);
    D.text(gPools, a.x + 36, 21, a.t, { head: 1, size: 15.5, weight: 600, fill: "#0B2740" });
    D.text(gPools, a.x + 36, 37, a.s, { size: 11, fill: "#66788A" });
    if (k < 3) sv("line", { x1: a.x + a.w / 2, x2: a.x + a.w / 2, y1: 48, y2: P0, stroke: "#95A3B1", "stroke-dasharray": "2 3" }, gPools);
  });

  // pool Externos
  D.rect(gPools, 0, P0, 210, P1 - P0, { rx: 14, fill: "#F3F5F7", stroke: "#A9B6C3", dash: "5 4", sw: 1.4 });
  D.text(gPools, 16, P0 + 30, "Externos", { head: 1, size: 20, weight: 600, fill: "#3A4E62" });
  tag(gPools, 16, P0 + 42, "NÃO CONFIÁVEL", "u");
  ["Portal ANP", "Portais de parceiros", "Fontes de índices", "E-mails de terceiros"].forEach((t, i) => node(14, 190 + i * 56, 182, t, null, { stroke: "#DDE3EA" }));

  // pool Perímetro NTS com 3 raias
  const PX = 254, PW = 776, LW = PW / 3;
  D.rect(gPools, PX, P0, PW, P1 - P0, { rx: 14, fill: "#fff", stroke: "#03426F", sw: 2 });
  sv("path", { d: `M${PX + 14} ${P0}h${PW - 28}a14 14 0 0 1 14 14v24h-${PW}v-24a14 14 0 0 1 14-14z`, fill: "#0B2740" }, gPools);
  D.text(gPools, PX + 16, P0 + 26, "Perímetro NTS", { head: 1, size: 20, weight: 600, fill: "#fff" });
  D.text(gPools, PX + 136, P0 + 25, "rede, identidade e dado", { size: 12.5, fill: "#AFC3D6" });
  tag(gPools, PX + PW - 96, P0 + 9, "RESTRITA", "r");
  [
    { t: "Estação do analista", tags: [["CONFIÁVEL", "t"], ["OPÇÃO A · DESKTOP", "a"]] },
    { t: "Serviços internos", tags: [["CONFIÁVEL", "t"]] },
    { t: "Nuvem NTS (Azure)", tags: [["CONFIÁVEL", "t"], ["OPÇÃO B · WEB", "a"]] },
  ].forEach((ln, i) => {
    const x = PX + i * LW;
    if (i) sv("line", { x1: x, x2: x, y1: P0 + 38, y2: P1, stroke: "#AFC3D6", "stroke-dasharray": "4 4" }, gPools);
    if (i === 1) D.rect(gPools, x + 1, P0 + 38, LW - 2, P1 - P0 - 39, { rx: 0, fill: "#F6F8FA" });
    D.text(gPools, x + 18, P0 + 70, ln.t, { head: 1, size: 18, weight: 600, fill: "#0B2740" });
    let tx = x + 18;
    ln.tags.forEach(([t, k]) => { tx += tag(gPools, tx, P0 + 80, t, k) + 6; });
  });
  const LX = (i) => PX + i * LW + 18, NW = LW - 36;
  const st = {
    nav: node(LX(0), 190, NW, "Navegador", "portais sem API, lista de sites"),
    out: node(LX(0), 258, NW, "Outlook e Teams", "lê caixas nomeadas; nunca envia"),
    xls: node(LX(0), 326, NW, "Excel e PowerPoint", "planilha gerada e versionada"),
    app: node(LX(0), 500, NW, "App desktop", "agente na estação", { badge: "A", stroke: "#03426F", sw: 1.8 }),
  };
  const svc = {
    id: node(LX(1), 190, NW, "Entra ID (identidade)", "SSO, acesso condicional"),
    m365: node(LX(1), 258, NW, "Microsoft 365 e SharePoint", "caixas e site nomeados"),
    sap: node(LX(1), 326, NW, "SAP (ERP)", null),
    cg: node(LX(1), 378, NW, "ConnectGas", "lê e devolve, não refaz"),
    ot: node(LX(1), 470, NW, "Medição e simulador (OT)", "só exportações, nunca escrita"),
  };
  sv("line", { x1: LX(1), x2: LX(1) + NW, y1: 452, y2: 452, stroke: "#95A3B1", "stroke-dasharray": "6 4" }, gPools);
  D.text(gPools, LX(1) + NW, 446, "fronteira TI/OT", { size: 11, fill: "#66788A", anchor: "end" });
  const cl = {
    web: node(LX(2), 190, NW, "Web app", "na assinatura Azure da NTS", { badge: "B" }),
    db: node(LX(2), 326, NW, "Banco da ferramenta", "registro de cada ciclo"),
    gw: node(LX(2), 500, NW, "Gateway de IA", "conteúdo mínimo, log de chamadas", { stroke: "#D2643A", sw: 2, fill: "#FDF1EA" }),
  };
  // Homologação e Provedor
  const CX = 1074, CW2 = W - CX;
  D.rect(gPools, CX, P0, CW2, 244, { rx: 14, fill: "#fff", stroke: "#33475B", sw: 2 });
  D.text(gPools, CX + 16, P0 + 30, "Homologação", { head: 1, size: 20, weight: 600, fill: "#0B2740" });
  tag(gPools, CX + 16, P0 + 42, "RESTRITA", "r");
  const hom = node(CX + 16, 190, CW2 - 32, "Ambiente de teste", "dados mascarados, sem dado real");
  D.rect(gPools, CX, 362, CW2, P1 - 362, { rx: 14, fill: "#fff", stroke: "#33475B", sw: 2 });
  D.text(gPools, CX + 16, 392, "Provedor de modelo", { head: 1, size: 20, weight: 600, fill: "#0B2740" });
  tag(gPools, CX + 16, 404, "RESTRITA", "r");
  const api = node(CX + 16, 500, CW2 - 32, "API do modelo", "sem treino; retenção zero a contratar");

  // conectores
  const edge = (f, pts, o = {}) => D.edge(gEdges, pts, { id: "sp", f, ...o });
  const badge = (fid, x, y, deny) => {
    const g = sv("g", { class: "ebadge", "data-f": fid, "data-c": JSON.stringify([x, y]), style: "cursor:pointer" }, gBadge);
    sv("circle", { cx: x, cy: y, r: 12, fill: deny ? "#C2453B" : "#03426F", stroke: "#fff", "stroke-width": 2.5 }, g);
    D.text(g, x, y + 5, deny ? "✕" : fid, { head: 1, size: 15, weight: 600, fill: "#fff", anchor: "middle" });
    g.addEventListener("click", () => highlight(fid));
  };
  edge("1", [[210, st.nav.cy], [st.nav.x, st.nav.cy]]); badge("1", 232, st.nav.cy - 20);
  const c1 = PX + LW;
  edge("2", [[st.nav.r, st.nav.cy], [svc.id.x, svc.id.cy]]);
  edge("2", [[st.out.r, st.out.cy], [svc.m365.x, svc.m365.cy]]);
  badge("2", c1, (st.nav.cy + st.out.cy) / 2);
  const c2 = PX + 2 * LW;
  [svc.m365, svc.sap, svc.cg].forEach((n) => edge("3", [[n.r, n.cy], [c2, n.cy], [c2, cl.db.cy], [cl.db.x, cl.db.cy]]));
  edge("3", [[svc.ot.r, svc.ot.cy], [c2, svc.ot.cy], [c2, cl.db.cy], [cl.db.x, cl.db.cy]], { dash: "4 3" });
  badge("3", c2, 466);
  edge("3", [[cl.web.cx, cl.web.b], [cl.web.cx, cl.db.y]], { dash: "4 3" });
  const busY = 598;
  edge("4", [[st.app.cx, st.app.b], [st.app.cx, busY], [cl.gw.cx, busY], [cl.gw.cx, cl.gw.b]]);
  badge("4", (st.app.cx + cl.gw.cx) / 2, busY);
  edge("5", [[cl.gw.r, cl.gw.cy], [api.x, api.cy]]); badge("5", (PX + PW + CX) / 2, cl.gw.cy - 22);
  edge("6", [[1248, 48], [1248, hom.y]]); edge("6", [[1358, 48], [1358, hom.y]]);
  badge("6", 1303, 150);
  edge("✕2", [[210, 446], [PX - 6, 446]], { deny: 1 }); badge("✕2", 230, 446, 1);
  edge("✕3", [[api.x + 30, api.b], [api.x + 30, 590], [PX + PW + 6, 590]], { deny: 1 }); badge("✕3", (PX + PW + CX) / 2, 590, 1);

  // legenda
  const ly = H - 14, lg = sv("g", {}, svg);
  sv("path", { d: `M0 ${ly - 5}h34`, stroke: "#03426F", "stroke-width": 1.8, "marker-end": "url(#sp-a)" }, lg);
  D.text(lg, 44, ly, "permitido", { size: 13, fill: "#3A4E62" });
  sv("path", { d: `M128 ${ly - 5}h34`, stroke: "#C2453B", "stroke-width": 1.8, "stroke-dasharray": "6 5", "marker-end": "url(#sp-ar)" }, lg);
  D.text(lg, 172, ly, "negado", { size: 13, fill: "#3A4E62" });
  sv("path", { d: `M244 ${ly - 5}h34`, stroke: "#03426F", "stroke-width": 1.8, "stroke-dasharray": "4 3", "marker-end": "url(#sp-a)" }, lg);
  D.text(lg, 288, ly, "exportação / opção B", { size: 13, fill: "#3A4E62" });
  D.text(lg, W, ly, "No 1º release o agente não entra em portal com login pessoal: uma pessoa busca, a ferramenta lê e guarda o arquivo.", { size: 13, fill: "#66788A", anchor: "end" });

  // painel
  const panel = $("#sysPanel");
  el("div", { class: "eyebrow", style: "margin-bottom:2px" }, panel, "Fluxos entre zonas");
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
    svg.classList.toggle("hl-dim", !!cur);
    $$("[data-f]", svg).forEach((n) => n.classList.toggle("hl", n.dataset.f === cur));
    $$(".flowitem,.dn", panel).forEach((n) => n.classList.toggle("on", n.dataset.f === cur));
  }
}
