/* =====================================================================
   Mascote "AM" · versão final (V6) · window.AMMasc
   ---------------------------------------------------------------------
   O personagem é o monograma A&M em 3D da imagem de referência: um "A" de
   perna esquerda diagonal e perna direita vertical, com as duas pontas do
   "M" em azul (o pilar dentro do vão do A e a cunha à direita da perna
   vertical), faces frontais brancas, laterais índigo e a fita laranja
   luminosa que abraça o conjunto (com a torção índigo à esquerda, como na
   referência). Rosto na face branca; braços, luvas e sapatos pequenos.

   Uso:   <div class="am-masc" data-pose="aceno" style="--s:280px"></div>
          largura = --s (pode vir de um ancestral); altura proporcional (320 × 312, os pés no rodapé)
   Balão: <div class="am-fala">texto</div>  (estilos em 06-mascote.css)

   Contrato (SPEC §7; a fundação depende dele):
     AMMasc.POSES          as 10 poses
     AMMasc.svg(pose)      string SVG completa (viewBox fixo 0 0 320 312, sem dependências
                           externas, ids de degradê/filtro/recorte únicos por chamada)
     AMMasc.mount(root)    monta todo .am-masc dentro de root (document se omitido; aceita o
                           próprio .am-masc); idempotente; devolve a lista de elementos
     AMMasc.pose(el,nome)  troca a pose de um .am-masc (nome inválido mantém a pose atual)
     AMMasc.play(el)       entrada: aceno acena, comemora pula e solta confete, as demais dão
                           um pulinho; retoma o movimento contínuo depois de um stop()
     AMMasc.stop(el)       interrompe a entrada e deixa o mascote parado (estático)

   Automático: monta no DOMContentLoaded e em todo .am-masc inserido depois (inclusive
   cópias feitas com cloneNode, que ganham ids novos); toca a entrada nos eventos
   "deck:activate" e "deck:chapter" da fundação e no clique (desligue com data-play="off").
   Detalhe por tamanho: o CSS usa container queries (≤ 219 px e ≤ 119 px) para engrossar
   contornos e esconder o que vira ruído abaixo de 1 px. Movimento contínuo: flutuar,
   piscar, brilho correndo na fita e um gesto discreto por pose. Tudo estático em
   prefers-reduced-motion e na impressão. Não espelhe o mascote: o "A" invertido deixa
   de ser o monograma da marca.
   ===================================================================== */
(function () {
  "use strict";

  var POSES = ["aceno", "aponta", "pensa", "lupa", "lanterna", "capacete", "apresentador", "bandeira", "livro", "comemora"];
  var ROTULO = {
    aceno: "acenando", aponta: "apontando", pensa: "pensando", lupa: "com uma lupa", lanterna: "com uma lanterna",
    capacete: "de capacete", apresentador: "com cartas na mão", bandeira: "com uma bandeira", livro: "lendo um livro",
    comemora: "comemorando"
  };
  var VBW = 320, VBH = 312;                 // viewBox fixo (todas as poses, mesmas proporções)
  var E = { x: -15, y: -8 };                 // extrusão: vemos a lateral esquerda e o topo
  var LUZ = norm({ x: -0.32, y: -0.95 });   // luz das laterais (de cima, um pouco da esquerda)
  var INK = "#0E1C39";                       // contorno navy

  /* ---------------- utilidades ---------------- */
  function norm(v) { var l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; }
  function f(n) { return Math.round(n * 10) / 10; }
  function pt(p) { return f(p.x) + " " + f(p.y); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function mixc(c1, c2, t) {
    var a = hex(c1), b = hex(c2);
    return "#" + [0, 1, 2].map(function (i) { var v = Math.round(lerp(a[i], b[i], t)); return (v < 16 ? "0" : "") + v.toString(16); }).join("");
  }
  function ramp(stops, t) {
    t = Math.max(stops[0][0], Math.min(stops[stops.length - 1][0], t));
    for (var i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
      var a = stops[i - 1], b = stops[i]; return mixc(a[1], b[1], (t - a[0]) / (b[0] - a[0] || 1));
    }
    return stops[stops.length - 1][1];
  }
  function area(poly) { var a = 0; for (var i = 0; i < poly.length; i++) { var p = poly[i], q = poly[(i + 1) % poly.length]; a += p.x * q.y - q.x * p.y; } return a / 2; }
  function P(x, y) { return { x: x, y: y }; }

  /* polígono de cantos arredondados: "d" com curvas Q + polilinha amostrada (para a extrusão) */
  function rounded(pts, radii, k) {
    k = k || 6;
    var n = pts.length, A = [], B = [], d, poly = [], i;
    for (i = 0; i < n; i++) {
      var p = pts[i], pp = pts[(i - 1 + n) % n], pn = pts[(i + 1) % n];
      var r = typeof radii === "number" ? radii : radii[i];
      var dp = Math.hypot(pp.x - p.x, pp.y - p.y), dn = Math.hypot(pn.x - p.x, pn.y - p.y);
      r = Math.min(r, dp / 2.05, dn / 2.05);
      A[i] = { x: p.x + (pp.x - p.x) / dp * r, y: p.y + (pp.y - p.y) / dp * r };
      B[i] = { x: p.x + (pn.x - p.x) / dn * r, y: p.y + (pn.y - p.y) / dn * r };
    }
    d = "M" + pt(B[0]);
    for (i = 1; i <= n; i++) { var j = i % n; d += "L" + pt(A[j]) + "Q" + pt(pts[j]) + " " + pt(B[j]); }
    d += "Z";
    for (i = 0; i < n; i++) for (var s = 0; s <= k; s++) {
      var t = s / k, u = 1 - t;
      poly.push({ x: u * u * A[i].x + 2 * u * t * pts[i].x + t * t * B[i].x, y: u * u * A[i].y + 2 * u * t * pts[i].y + t * t * B[i].y });
    }
    return { d: d, poly: poly };
  }

  /* extrusão: só as faces laterais visíveis (normal · E > 0), agrupadas por tom de luz */
  var LADO = [[0, "#14214A"], [0.35, "#1A2B61"], [0.55, "#22377C"], [0.72, "#2B4594"], [0.86, "#3858B0"], [1, "#4F73C8"]];
  function extrude(poly, e, bins) {
    bins = bins || 8;
    var sgn = area(poly) > 0 ? 1 : -1, groups = {}, all = "", rim = [];
    for (var i = 0; i < poly.length; i++) {
      var p = poly[i], q = poly[(i + 1) % poly.length];
      var dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy);
      if (len < 0.05) continue;
      var nx = sgn * dy / len, ny = -sgn * dx / len;
      if (nx * e.x + ny * e.y <= 0.05) continue;
      var k = 0.5 + 0.5 * (nx * LUZ.x + ny * LUZ.y), b = Math.round(k * (bins - 1));
      var p2 = { x: p.x + e.x, y: p.y + e.y }, q2 = { x: q.x + e.x, y: q.y + e.y };
      var quad = [p, q, q2, p2];
      if (area(quad) < 0) quad = [p, p2, q2, q];        // orientação única: união sem buracos
      var sp = "M" + quad.map(pt).join("L") + "Z";
      groups[b] = (groups[b] || "") + sp; all += sp;
      rim.push({ a: p2, b: q2, nx: nx, ny: ny });
    }
    var facets = Object.keys(groups).sort(function (a, b) { return a - b; }).map(function (b) {
      return { d: groups[b], c: ramp(LADO, b / (bins - 1)) };
    });
    return { facets: facets, union: all, rim: rim };
  }

  /* ---------------- geometria fixa (calculada uma vez) ---------------- */
  var G = (function () {
    // "A" da A&M: perna diagonal à esquerda, perna vertical à direita, topo reto, vão triangular
    var A = rounded([P(168, 64), P(238, 64), P(238, 290), P(190, 290), P(190, 176), P(133, 290), P(62, 290)],
      [12, 12, 7, 5, 5, 5, 7], 7);
    var aSide = extrude(A.poly, E, 9);
    // ponta esquerda do "M": pilar triangular dentro do vão; o topo encosta na parede interna da perna vertical
    var IP = rounded([P(150, 289), P(182, 200), P(182, 289)], [2.5, 3, 2], 4);
    var ipSide = extrude(IP.poly, { x: E.x * 0.7, y: E.y * 0.7 }, 6);
    // ponta direita do "M": cunha encostada na perna vertical, descendo para a direita até o chão
    var RP = rounded([P(246, 168), P(294, 290), P(246, 290)], [4, 4, 3], 5);
    var rpSide = extrude(RP.poly, E, 7);
    // aro de luz na borda traseira de cima e da diagonal
    var rim = aSide.rim.filter(function (r) { return r.ny < -0.25 || (r.nx < -0.6 && r.a.y < 280); });
    return { A: A, aSide: aSide, IP: IP, ipSide: ipSide, RP: RP, rpSide: rpSide, rim: rim };
  })();

  /* ---------------- fita: laço inclinado em volta do corpo ---------------- */
  var RIB = { cx: 168, cy: 201, rx: 131, ry: 27, rot: -11 * Math.PI / 180 };
  function ribPoint(t, off) {
    var x = RIB.rx * Math.cos(t), y = RIB.ry * Math.sin(t) + off, c = Math.cos(RIB.rot), s = Math.sin(RIB.rot);
    return { x: RIB.cx + x * c - y * s, y: RIB.cy + x * s + y * c };
  }
  /* largura ao longo da fita (u: 0 → 1); pk desloca o ponto mais largo (0,5 = no meio) */
  function width(u, wMax, wMin, pk) {
    pk = pk || 0.5;
    var v = u < pk ? 0.5 * u / pk : 0.5 + 0.5 * (u - pk) / (1 - pk);
    return wMin + (wMax - wMin) * Math.pow(Math.sin(Math.PI * v), 0.75);
  }
  /* faixa entre dois deslocamentos (frações da largura local: -0,5 = borda de cima, +0,5 = de baixo) */
  function ribBand(t0, t1, wMax, wMin, pk, a, b, n) {
    n = n || 36; var top = [], bot = [];
    for (var i = 0; i <= n; i++) {
      var u = i / n, t = lerp(t0, t1, u), w = width(u, wMax, wMin, pk);
      top.push(ribPoint(t, w * a)); bot.push(ribPoint(t, w * b));
    }
    return "M" + top.map(pt).join("L") + "L" + bot.reverse().map(pt).join("L") + "Z";
  }
  function ribLine(t0, t1, wMax, wMin, pk, a, u0, u1, n) {
    n = n || 30; var pts = [];
    for (var i = 0; i <= n; i++) {
      var u = lerp(u0, u1, i / n), t = lerp(t0, t1, u);
      pts.push(ribPoint(t, width(u, wMax, wMin, pk) * a));
    }
    return "M" + pts.map(pt).join("L");
  }
  var F0 = 0.03, F1 = Math.PI - 0.03, WF = 17.5, WFm = 2.6, PKF = 0.6;     // frente (arco de baixo), mais larga à esquerda
  var B0 = Math.PI + 0.03, B1 = 2 * Math.PI - 0.03, WB = 11, WBm = 2.2;  // fundo (arco de cima)
  var RF = {
    front: ribBand(F0, F1, WF, WFm, PKF, -0.5, 0.5),
    frontLit: ribBand(F0, F1, WF, WFm, PKF, -0.5, -0.04),
    frontHi: ribLine(F0, F1, WF, WFm, PKF, -0.3, 0.06, 0.8),
    frontLo: ribLine(F0, F1, WF, WFm, PKF, 0.4, 0.1, 0.84),
    back: ribBand(B0, B1, WB, WBm, 0.5, -0.5, 0.5),
    shadow: ribBand(F0 + 0.28, F1 - 0.22, WF, WFm, PKF, 0.1, 0.95),
    backEdge: ribLine(B0, B1, WB, WBm, 0.5, 0.36, 0.08, 0.92)
  };
  /* torção da fita: a ponta esquerda da frente mostra o avesso índigo (como na referência) */
  var TW = { x0: ribPoint(F1, 0).x - 4, x1: ribPoint(F0, 0).x + 4 };

  /* ---------------- defs por instância (ids únicos) ---------------- */
  function stops(list) {
    return list.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : "") + "/>"; }).join("");
  }
  function lin(id, x1, y1, x2, y2, st, user) {
    return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' +
      (user ? ' gradientUnits="userSpaceOnUse"' : "") + ">" + stops(st) + "</linearGradient>";
  }
  function defs(u, extra) {
    var tx = function (x) { return f(lerp(TW.x0, TW.x1, x)); };
    return "<defs>" +
      lin(u + "fr", 0.9, 0, 0.1, 1, [[0, "#FFFFFF"], [0.5, "#F3F6FA"], [1, "#DDE5F0"]]) +
      lin(u + "bv", 0, 0, 1, 1, [[0, "#FFFFFF"], [0.45, "#FFFFFF", 0.6], [0.7, "#C6D2E4", 0.6], [1, "#AEBDD6"]]) +
      lin(u + "ao", 0, 0, 0, 1, [[0, "#FFFFFF", 0.12], [0.5, INK, 0], [1, INK, 0.4]]) +
      lin(u + "rp", 0, 0, 0.8, 1, [[0, "#B3CDEF"], [0.38, "#7AA2D6"], [1, "#2B4A9E"]]) +
      lin(u + "ip", 0, 0, 0.45, 1, [[0, "#C2DAF7"], [0.45, "#7FA6E0"], [1, "#3B5CB5"]]) +
      // fita (frente): avesso índigo na ponta esquerda, aresta clara na torção, laranja luminoso no resto
      lin(u + "rb", tx(0), 0, tx(1), 0, [[0, "#22377C"], [0.075, "#3456B0"], [0.112, "#9DB4E6"], [0.135, "#FFE3C2"],
        [0.165, "#F08A1A"], [0.3, "#E97C0E"], [0.58, "#F78C16"], [0.82, "#F9A64A"], [1, "#EC8212"]], true) +
      lin(u + "rl", tx(0), 0, tx(1), 0, [[0, "#FFFFFF", 0], [0.13, "#FFFFFF", 0], [0.2, "#FFC07A", 0.55], [0.55, "#FFC07A", 0.95],
        [0.82, "#FFD7A6"], [1, "#FFC07A", 0.6]], true) +
      lin(u + "rh", tx(0), 0, tx(1), 0, [[0, "#F78C16", 0], [0.14, "#F78C16", 0], [0.24, "#F78C16"], [1, "#F78C16"]], true) +
      lin(u + "rd", tx(0), 0, tx(1), 0, [[0, "#9DBDF0", 0.75], [0.12, "#9DBDF0", 0.75], [0.17, "#FFF1DE", 0.95], [1, "#FFF1DE", 0.95]], true) +
      lin(u + "rk", 0, 0, 1, 0, [[0, "#4466C0"], [0.45, "#1F3263"], [1, "#2E4C9F"]]) +
      lin(u + "sh", 0, 0, 1, 0, [[0, "#FFFFFF", 0], [0.5, "#FFFDF7", 0.9], [1, "#FFFFFF", 0]]) +
      '<radialGradient id="' + u + 'gd" cx=".5" cy=".5" r=".5">' + stops([[0, INK, 0.3], [0.55, INK, 0.12], [1, INK, 0]]) + "</radialGradient>" +
      '<radialGradient id="' + u + 'ck" cx=".5" cy=".5" r=".5">' + stops([[0, "#FCD1A2"], [0.65, "#FCD1A2", 0.6], [1, "#FCD1A2", 0]]) + "</radialGradient>" +
      lin(u + "arm", 0, 0, 1, 1, [[0, "#4466C0"], [1, "#1F3263"]]) +
      '<radialGradient id="' + u + 'hd" cx=".36" cy=".3" r=".8">' + stops([[0, "#FFFFFF"], [0.55, "#F2F5FA"], [1, "#BFCCE0"]]) + "</radialGradient>" +
      lin(u + "ft", 0, 0, 0, 1, [[0, "#4A6CC4"], [0.55, "#22377C"], [1, "#14214A"]]) +
      '<filter id="' + u + 'gw" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3.4"/></filter>' +
      '<filter id="' + u + 'sb" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>' +
      // formas grandes definidas uma vez por instância e reaproveitadas com <use>
      '<path id="' + u + 'A" d="' + G.A.d + '"/><path id="' + u + 'As" d="' + G.aSide.union + '"/>' +
      '<path id="' + u + 'R" d="' + G.RP.d + '"/><path id="' + u + 'Rs" d="' + G.rpSide.union + '"/>' +
      '<clipPath id="' + u + 'cf"><use href="#' + u + 'A"/></clipPath>' +
      '<clipPath id="' + u + 'cr"><path d="' + RF.front + '"/></clipPath>' +
      (extra || "") + "</defs>";
  }

  /* ---------------- partes do corpo ---------------- */
  function use(ref, attrs) { return '<use href="#' + ref + '"' + (attrs || "") + "/>"; }
  /* laterais: base, facetas por tom de luz e sombra de contato embaixo; ref = id da união já definida em <defs> */
  function sides(S, u, overlay, base, ref) {
    var s = ref ? use(ref, ' fill="' + (base || "#22377C") + '"') : '<path d="' + S.union + '" fill="' + (base || "#22377C") + '"/>';
    S.facets.forEach(function (fc) { s += '<path d="' + fc.d + '" fill="' + fc.c + '"/>'; });
    if (overlay) s += ref ? use(ref, ' fill="url(#' + u + 'ao)"') : '<path d="' + S.union + '" fill="url(#' + u + 'ao)"/>';
    return s;
  }
  /* contorno navy da silhueta: a mesma forma, preenchida e com traço grosso, por baixo das faces */
  function underlay(ref) { return use(ref, ' class="am-ol" fill="' + INK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"'); }
  function innerPillar(u) {
    return '<g class="am-pilar-in">' + sides(G.ipSide, u, false, "#2B4594") +
      '<path d="' + G.IP.d + '" fill="url(#' + u + 'ip)"/>' +
      '<path class="am-det" d="M156 281L180.5 212" stroke="#DCE8FA" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>' +
      '<path d="' + G.IP.d + '" fill="none" stroke="' + INK + '" stroke-opacity=".45" stroke-width="1.3"/></g>';
  }
  function bodySides(u) {
    var rimD = G.rim.map(function (r) { return "M" + pt(r.a) + "L" + pt(r.b); }).join("");
    return '<g class="am-lado">' + underlay(u + "A") + underlay(u + "As") + sides(G.aSide, u, true, null, u + "As") +
      '<path class="am-det" d="' + rimD + '" fill="none" stroke="#9DBDF0" stroke-width="1.7" stroke-linecap="round" opacity=".8"/></g>';
  }
  function bodyFront(u) {
    return '<g class="am-frente">' +
      use(u + "A", ' fill="url(#' + u + 'fr)"') +
      use(u + "A", ' fill="none" stroke="url(#' + u + 'bv)" stroke-width="8" clip-path="url(#' + u + 'cf)"') +
      // sombra suave da fita sobre a face branca
      '<g class="am-blur" clip-path="url(#' + u + 'cf)"><path d="' + RF.shadow + '" fill="#1F3263" opacity=".16" filter="url(#' + u + 'sb)"/></g>' +
      use(u + "A", ' class="am-fl-ol" fill="none" stroke="#14214A" stroke-opacity=".6" stroke-width="2" stroke-linejoin="round"') +
      "</g>";
  }
  function rightPillar(u) {
    return '<g class="am-pilar">' + underlay(u + "R") + underlay(u + "Rs") + sides(G.rpSide, u, true, null, u + "Rs") +
      use(u + "R", ' fill="url(#' + u + 'rp)"') +
      '<path class="am-det" d="M250.5 180L287.5 281" stroke="#EAF2FC" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>' +
      use(u + "R", ' fill="none" stroke="#14214A" stroke-opacity=".55" stroke-width="1.8" stroke-linejoin="round"') + "</g>";
  }
  function shoe(u, x, y, w) {
    var h = 15;
    return '<path class="am-sapato" d="M' + f(x - w) + " " + f(y + 4) + "Q" + f(x - w) + " " + f(y - h) + " " + f(x) + " " + f(y - h) + "Q" + f(x + w) + " " + f(y - h) + " " + f(x + w) + " " + f(y + 4) +
      "Q" + f(x + w) + " " + f(y + 10) + " " + f(x + w - 7) + " " + f(y + 10) + "L" + f(x - w + 7) + " " + f(y + 10) + "Q" + f(x - w) + " " + f(y + 10) + " " + f(x - w) + " " + f(y + 4) +
      'Z" fill="url(#' + u + 'ft)" stroke="#5E8AB4" stroke-opacity=".8" stroke-width="1.6"/>' +
      '<ellipse class="am-det" cx="' + f(x - w * 0.3) + '" cy="' + f(y - 5) + '" rx="' + f(w * 0.42) + '" ry="3" fill="#fff" opacity=".24"/>';
  }
  function feet(u) { return '<g class="am-pes">' + shoe(u, 96, 293, 26) + shoe(u, 215, 293, 24) + "</g>"; }

  function ribbonBack(u) {
    return '<g class="am-fita-fundo"><path d="' + RF.back + '" fill="url(#' + u + 'rk)"/>' +
      '<path d="' + RF.backEdge + '" fill="none" stroke="#F78C16" stroke-width="1.8" stroke-linecap="round" opacity=".9"/></g>';
  }
  function ribbonFront(u) {
    return '<g class="am-fita">' +
      '<path class="am-halo am-blur" d="' + RF.front + '" fill="url(#' + u + 'rh)" filter="url(#' + u + 'gw)" opacity=".6"/>' +
      '<path d="' + RF.front + '" fill="url(#' + u + 'rb)"/>' +
      '<path d="' + RF.frontLit + '" fill="url(#' + u + 'rl)"/>' +
      '<path class="am-det" d="' + RF.frontHi + '" fill="none" stroke="url(#' + u + 'rd)" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path class="am-det" d="' + RF.frontLo + '" fill="none" stroke="#A65204" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>' +
      '<g clip-path="url(#' + u + 'cr)"><rect class="am-shine" x="-64" y="150" width="46" height="110" fill="url(#' + u + 'sh)"/></g>' +
      '<path class="am-fita-ol" d="' + RF.front + '" fill="none" stroke="#8A4503" stroke-opacity=".35" stroke-width="1"/>' +
      "</g>";
  }

  /* ---------------- rosto ---------------- */
  var FACE = { lx: 172, rx: 211, ey: 113, my: 140, mx: 191.5 };
  function eyeAt(x, y) {
    return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="9.8" ry="12.6" fill="' + INK + '"/>' +
      '<circle cx="' + f(x + 3.5) + '" cy="' + f(y - 4.7) + '" r="3.8" fill="#fff"/>' +
      '<circle class="am-det" cx="' + f(x - 3.4) + '" cy="' + f(y + 4.6) + '" r="1.8" fill="#fff" opacity=".9"/>';
  }
  function face(u, ex) {
    var s = '<g class="am-rosto">', lk = ex.look || [0, 0], br = ex.brows || [0, 0], m = ex.mouth || "sorriso", mx = FACE.mx, my = FACE.my;
    s += '<g class="am-bochechas"><ellipse cx="156" cy="132" rx="10.5" ry="7" fill="url(#' + u + 'ck)"/><ellipse cx="226" cy="132" rx="9.5" ry="7" fill="url(#' + u + 'ck)"/></g>';
    s += '<g class="am-sobr" fill="none" stroke="' + INK + '" stroke-width="2.7" stroke-linecap="round">' +
      '<path d="M' + (FACE.lx - 9) + " " + f(96 - br[0]) + "Q" + FACE.lx + " " + f(90.5 - br[0] * 1.5) + " " + (FACE.lx + 8) + " " + f(95 - br[0]) + '"/>' +
      '<path d="M' + (FACE.rx - 8) + " " + f(95 - br[1]) + "Q" + FACE.rx + " " + f(90.5 - br[1] * 1.5) + " " + (FACE.rx + 9) + " " + f(96 - br[1]) + '"/></g>';
    if (ex.eyes === "feliz") {
      s += '<g class="am-olhos-felizes" fill="none" stroke="' + INK + '" stroke-width="3.8" stroke-linecap="round">' +
        '<path d="M' + (FACE.lx - 9) + " " + (FACE.ey + 4) + "Q" + FACE.lx + " " + (FACE.ey - 10) + " " + (FACE.lx + 9) + " " + (FACE.ey + 4) + '"/>' +
        '<path d="M' + (FACE.rx - 9) + " " + (FACE.ey + 4) + "Q" + FACE.rx + " " + (FACE.ey - 10) + " " + (FACE.rx + 9) + " " + (FACE.ey + 4) + '"/></g>';
    } else {
      s += '<g class="am-ler"><g class="am-olhos">' + eyeAt(FACE.lx + lk[0], FACE.ey + lk[1]) + eyeAt(FACE.rx + lk[0], FACE.ey + lk[1]) + "</g></g>";
    }
    if (m === "aberta") {
      s += '<path class="am-boca" d="M' + (mx - 11) + " " + (my - 3) + "Q" + mx + " " + (my - 0.5) + " " + (mx + 11) + " " + (my - 3) + "Q" + (mx + 9.5) + " " + (my + 12) + " " + mx + " " + (my + 12) +
        "Q" + (mx - 9.5) + " " + (my + 12) + " " + (mx - 11) + " " + (my - 3) + 'Z" fill="' + INK + '"/>' +
        '<path d="M' + (mx - 5.5) + " " + (my + 9.6) + "Q" + mx + " " + (my + 3.8) + " " + (mx + 5.5) + " " + (my + 9.6) + "Q" + mx + " " + (my + 12.2) + " " + (mx - 5.5) + " " + (my + 9.6) + 'Z" fill="#F08A7A"/>';
    } else if (m === "hum") {
      s += '<path class="am-boca-l" d="M' + (mx - 8) + " " + (my + 2) + "Q" + (mx - 1) + " " + (my - 1.5) + " " + (mx + 8) + " " + (my + 0.5) + '" fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>';
    } else if (m === "o") {
      s += '<ellipse cx="' + mx + '" cy="' + (my + 3) + '" rx="4.6" ry="5.6" fill="' + INK + '"/>';
    } else {
      s += '<path class="am-boca-l" d="M' + (mx - 9) + " " + (my - 1) + "Q" + mx + " " + (my + 9) + " " + (mx + 9) + " " + (my - 1) + '" fill="none" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round"/>';
    }
    return s + "</g>";
  }

  /* ---------------- braços e mãos ---------------- */
  var SH = { l: P(104, 196), r: P(232, 194) };
  function quadAt(S, C, H, t) { var u = 1 - t; return { x: u * u * S.x + 2 * u * t * C.x + t * t * H.x, y: u * u * S.y + 2 * u * t * C.y + t * t * H.y }; }
  /* braço como tubo afinando do ombro ao punho, com ombro arredondado (sem emenda visível) */
  function tube(S, C, H, w0, w1) {
    var n = 14, L = [], R = [], cap = [], d0 = null;
    for (var i = 0; i <= n; i++) {
      var t = i / n, p = quadAt(S, C, H, t), q = quadAt(S, C, H, Math.min(1, t + 0.01)), p0 = quadAt(S, C, H, Math.max(0, t - 0.01));
      var d = norm({ x: q.x - p0.x, y: q.y - p0.y }), w = lerp(w0, w1, t);
      if (!d0) d0 = d;
      L.push({ x: p.x - d.y * w, y: p.y + d.x * w }); R.push({ x: p.x + d.y * w, y: p.y - d.x * w });
    }
    for (var k = 1; k < 8; k++) {
      var th = Math.PI * k / 8, c = Math.cos(th), sn = Math.sin(th);
      cap.push({ x: S.x + w0 * (c * d0.y - sn * d0.x), y: S.y + w0 * (-c * d0.x - sn * d0.y) });
    }
    return "M" + L.map(pt).join("L") + "L" + R.reverse().map(pt).join("L") + "L" + cap.map(pt).join("L") + "Z";
  }
  /* mão no fim do braço, girada na direção do antebraço (ou no ângulo dado) */
  function handOf(u, side, a) {
    var H = P(a.h[0], a.h[1]), C = P(a.c[0], a.c[1]);
    var ang = a.ang !== undefined ? a.ang : Math.atan2(H.y - C.y, H.x - C.x) * 180 / Math.PI + 90;
    return hand(u, H, a.hand || "punho", ang, side);
  }
  function arm(u, side, a) {
    var S = SH[side], H = P(a.h[0], a.h[1]), C = P(a.c[0], a.c[1]);
    var d = tube(S, C, H, 7.4, 5.8), hi = "M" + pt(quadAt(S, C, H, 0.18)) + "Q" + pt(quadAt(S, C, H, 0.55)) + " " + pt(quadAt(S, C, H, 0.86));
    var org = a.cls ? ' style="transform-origin:' + S.x + "px " + S.y + 'px"' : "";
    return '<g class="am-braco am-braco-' + side + (a.cls ? " " + a.cls : "") + '"' + org + ">" +
      '<path class="am-braco-ol" d="' + d + '" fill="url(#' + u + 'arm)" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path class="am-det" d="' + hi + '" fill="none" stroke="#9DBDF0" stroke-width="2.2" stroke-linecap="round" opacity=".6" transform="translate(' + (side === "l" ? "1.5 -2.2" : "-1.5 -2.2") + ')"/>' +
      (a.grip ? "" : handOf(u, side, a)) + "</g>";
  }
  function hand(u, H, kind, ang, side) {
    var m = side === "l" ? -1 : 1, g = '<g transform="translate(' + f(H.x) + " " + f(H.y) + ") rotate(" + f(ang) + ")" + (m < 0 ? " scale(-1 1)" : "") + '"><g class="am-mao">';
    var stroke = ' stroke="' + INK + '" stroke-width="2"', fill = ' fill="url(#' + u + 'hd)"';
    if (kind === "aberta") {
      g += '<ellipse cx="-9" cy="2" rx="4.4" ry="6.8"' + fill + stroke + ' transform="rotate(-38 -9 2)"/>' +
        '<rect x="-9.5" y="-14" width="19" height="24" rx="9.5"' + fill + stroke + "/>" +
        '<path class="am-det" d="M-3.2 -12.5V-6M3.2 -12.5V-6" stroke="#9AAACB" stroke-width="1.4" stroke-linecap="round"/>' +
        '<ellipse class="am-det" cx="-3" cy="-6" rx="3" ry="4" fill="#fff" opacity=".8"/>';
    } else if (kind === "dedo") {
      g += '<rect x="-3.9" y="-24" width="7.8" height="18" rx="3.9"' + fill + stroke + "/>" +
        '<circle cx="0" cy="0" r="10.2"' + fill + stroke + "/>" +
        '<path class="am-det" d="M-6 -4Q-1 -8 5 -5" fill="none" stroke="#9AAACB" stroke-width="1.4" stroke-linecap="round"/>' +
        '<circle class="am-det" cx="-3.4" cy="2.5" r="2.6" fill="#fff" opacity=".8"/>';
    } else { // punho / segura
      g += '<circle cx="0" cy="0" r="10.2"' + fill + stroke + "/>" +
        '<path class="am-det" d="M-6.5 -2.5Q-1 -7.5 6 -4" fill="none" stroke="#9AAACB" stroke-width="1.4" stroke-linecap="round"/>' +
        '<circle class="am-det" cx="-3.2" cy="2.8" r="2.6" fill="#fff" opacity=".8"/>';
    }
    return g + "</g></g>";
  }

  /* ---------------- poses (braços, rosto) ---------------- */
  var REST_L = { h: [48, 254], c: [68, 224] }, REST_R = { h: [276, 250], c: [266, 220] };
  var POSE = {
    aceno: { ex: { mouth: "aberta", brows: [1, 1] }, l: REST_L, r: { h: [289, 124], c: [292, 188], hand: "aberta", cls: "am-aceno" } },
    aponta: { ex: { look: [-3.5, 0] }, l: { h: [40, 180], c: [74, 196], hand: "dedo", cls: "am-aponta" }, r: REST_R },
    pensa: { ex: { look: [-2.6, -3.6], mouth: "hum", brows: [0, 4] }, l: REST_L, r: { h: [206, 160], c: [262, 190], front: true } },
    lupa: { ex: { brows: [2.5, 0], mouth: "o" }, l: REST_L, r: { h: [258, 158], c: [270, 192], grip: true } },
    lanterna: { ex: { look: [-3.6, -2.4], brows: [2, 1] }, l: { h: [66, 170], c: [64, 206], grip: true }, r: REST_R },
    capacete: { ex: { mouth: "aberta", brows: [1, 1] }, l: REST_L, r: { h: [280, 156], c: [284, 196], grip: true } },
    apresentador: { ex: { mouth: "aberta", look: [-1.6, 0] }, l: { h: [72, 166], c: [80, 200], grip: true }, r: { h: [290, 212], c: [266, 204], hand: "aberta", ang: 64 } },
    bandeira: { ex: { mouth: "aberta", brows: [1, 1] }, l: REST_L, r: { h: [264, 170], c: [262, 202], grip: true } },
    livro: { ex: { look: [0, 3.4], brows: [1, 1] }, l: { h: [150, 200], c: [118, 216], front: true, grip: true }, r: { h: [234, 200], c: [246, 214], front: true, grip: true } },
    comemora: { ex: { eyes: "feliz", mouth: "aberta", brows: [3, 3] }, l: { h: [58, 114], c: [66, 178], hand: "aberta", cls: "am-festa-l" }, r: { h: [284, 106], c: [280, 172], hand: "aberta", cls: "am-festa-r" } }
  };

  /* ---------------- acessórios: navy, azul e branco; laranja só como detalhe ---------------- */
  var LENTE = { x: 213, y: 114, r: 23 };
  var CUPULA = "M151 63C149 32 171 15 198 15C225 15 247 32 245 63Z";   // cúpula do capacete
  var ACC = {
    lupa: function (u) {
      var c = LENTE;
      return '<g class="am-acc am-lupa" style="transform-origin:258px 158px">' +
        '<path d="M' + (c.x + 16) + " " + (c.y + 16) + 'L255 154" stroke="' + INK + '" stroke-width="11" stroke-linecap="round"/>' +
        '<path d="M' + (c.x + 16) + " " + (c.y + 16) + 'L255 154" stroke="#2C4796" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M' + (c.x + 18.5) + " " + (c.y + 18.5) + "L" + (c.x + 22.5) + " " + (c.y + 22.5) + '" stroke="#F78C16" stroke-width="9.5"/>' +
        '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + c.r + '" fill="#E6EEF7" fill-opacity=".6"/>' +
        '<g clip-path="url(#' + u + 'lc)"><g transform="translate(' + c.x + " " + c.y + ") scale(1.34) translate(" + (-FACE.rx) + " " + (-FACE.ey) + ')"><g class="am-olhos">' +
        eyeAt(FACE.rx, FACE.ey) + "</g></g></g>" +
        '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + c.r + '" fill="none" stroke="' + INK + '" stroke-width="8"/>' +
        '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + c.r + '" fill="none" stroke="#2C4796" stroke-width="4.6"/>' +
        '<circle class="am-det" cx="' + c.x + '" cy="' + c.y + '" r="' + (c.r + 0.6) + '" fill="none" stroke="#9DBDF0" stroke-width="1.2" stroke-dasharray="20 200" stroke-dashoffset="-40" opacity=".9"/>' +
        '<path d="M' + (c.x - 15) + " " + (c.y - 5) + "A16 16 0 0 1 " + (c.x - 5) + " " + (c.y - 15) + '" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" opacity=".95"/>' +
        "</g>";
    },
    lanterna: function (u) {
      // lanterna erguida na mão esquerda, facho para cima e à esquerda (ilumina o conteúdo acima do mascote)
      var tr = "translate(66 170) rotate(-104)";
      return '<g class="am-acc am-lanterna" style="transform-origin:66px 170px">' +
        '<g class="am-feixe"><path d="M43 -13L150 -34L150 34L43 13Z" fill="url(#' + u + 'bm)" transform="' + tr + '"/></g>' +
        '<g transform="' + tr + '">' +
        '<rect x="-12" y="-9" width="40" height="18" rx="6" fill="#1F3263" stroke="' + INK + '" stroke-width="2"/>' +
        '<rect class="am-det" x="-7" y="-6" width="30" height="3.2" rx="1.6" fill="#9DBDF0" opacity=".6"/>' +
        '<path d="M27 -9L40 -14L40 14L27 9Z" fill="#6F98CF" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<rect x="38" y="-15.5" width="6.5" height="31" rx="2.4" fill="#FFF6E3" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<rect x="14" y="-12.5" width="7" height="4.5" rx="1.6" fill="#F78C16" stroke="' + INK + '" stroke-width="1"/>' +
        "</g></g>";
    },
    capacete: function (u) {
      // capacete de obra branco: cúpula com crista, faixa laranja (detalhe) e aba; chave inglesa na mão direita
      return '<g class="am-acc am-capacete" transform="rotate(-5 198 64)">' +
        '<path d="' + CUPULA + '" fill="url(#' + u + 'hh)" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<g clip-path="url(#' + u + 'hc)"><path d="M140 50Q198 58 256 50L256 64L140 64Z" fill="#F78C16"/></g>' +
        '<path d="M190 16.6Q188 40 190 61L206 61Q208 40 206 16.6Q198 14.9 190 16.6Z" fill="#E3EAF5" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>' +
        '<path class="am-det" d="M163 38C167 29 174 24 182 22" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".95"/>' +
        '<path d="M141 59.5Q198 70 255 59.5Q263.5 58.5 264 65Q264.5 71.5 256 72.5Q198 83 140 72.5Q131.5 71.5 132 65Q132.5 58.5 141 59.5Z" fill="url(#' + u + 'hb)" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<path class="am-det" d="M146 64.5Q198 74 250 64.5" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>' +
        "</g>" +
        '<g class="am-acc am-chave" transform="rotate(24 280 156)"><g class="am-chave-g" style="transform-origin:280px 156px">' +
        '<rect x="274.5" y="106" width="11" height="56" rx="5.5" fill="#6F98CF" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M268.5 94a13.5 13.5 0 1 0 23 0l-5.6 8.6h-11.8z" fill="#6F98CF" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<rect class="am-det" x="277.5" y="112" width="3" height="40" rx="1.5" fill="#fff" opacity=".65"/></g></g>';
    },
    apresentador: function () {
      function card(rot, sym) {
        return '<g transform="rotate(' + rot + ' 72 172)"><rect x="55" y="102" width="36" height="50" rx="5.5" fill="#fff" stroke="' + INK + '" stroke-width="2.2"/>' +
          '<rect class="am-det" x="59.5" y="106.5" width="27" height="41" rx="3.5" fill="none" stroke="#C9D6E8" stroke-width="1.3"/>' + sym + "</g>";
      }
      return '<g class="am-acc am-cartas" style="transform-origin:72px 166px">' +
        card(-26, '<path d="M73 116l7.5 11-7.5 11-7.5-11z" fill="#1F3263"/>') +
        card(-7, '<circle cx="73" cy="127" r="7.5" fill="#5E8AB4"/>') +
        card(12, '<path d="M73 115.5l2.8 6.8 7.3.6-5.6 4.7 1.8 7.1-6.3-3.9-6.3 3.9 1.8-7.1-5.6-4.7 7.3-.6z" fill="#F78C16"/>') +
        "</g>";
    },
    bandeira: function (u) {
      return '<g class="am-acc am-bandeira">' +
        '<path d="M268 298L258 12" stroke="' + INK + '" stroke-width="6.5" stroke-linecap="round"/>' +
        '<path d="M268 298L258 12" stroke="#E4ECF6" stroke-width="3.2" stroke-linecap="round"/>' +
        '<path class="am-pano" d="M257 16C236 9 220 22 194 13L198 52C222 61 238 48 259 55Z" fill="url(#' + u + 'fl)" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<path class="am-det" d="M204 39C224 46 238 36 256 42" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".9"/>' +
        '<circle cx="225" cy="27" r="4.6" fill="#F78C16"/>' +
        '<circle cx="258" cy="10" r="5.2" fill="#F78C16" stroke="' + INK + '" stroke-width="1.8"/>' +
        "</g>";
    },
    livro: function () {
      return '<g class="am-acc am-livro">' +
        '<path d="M142 162L192 168L242 162L242 206L192 212L142 206Z" fill="#1F3263" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<path d="M147 157Q170 154 192 163L192 205Q170 198 147 201Z" fill="#fff" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>' +
        '<path d="M237 157Q214 154 192 163L192 205Q214 198 237 201Z" fill="#EEF3F8" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>' +
        '<g class="am-det" stroke="#8DA9CF" stroke-width="2.2" stroke-linecap="round"><path d="M155 169L184 172.5M155 177L184 180.5M155 185L177 187.5"/><path d="M200 172.5L229 169M200 180.5L229 177M200 188.5L221 186"/></g>' +
        '<path d="M196.5 207L196.5 222L200.5 218L204.5 222L204.5 207" fill="#F78C16"/>' +
        "</g>";
    },
    comemora: function () {
      function star(x, y, r, c, k) { return '<path class="am-faisca am-f' + k + '" d="M' + x + " " + (y - r) + "Q" + x + " " + y + " " + (x + r) + " " + y + "Q" + x + " " + y + " " + x + " " + (y + r) + "Q" + x + " " + y + " " + (x - r) + " " + y + "Q" + x + " " + y + " " + x + " " + (y - r) + 'Z" fill="' + c + '"/>'; }
      function chip(x, y, c, r, k) { return '<g transform="rotate(' + r + " " + x + " " + y + ')"><rect class="am-faisca am-f' + k + '" x="' + (x - 5) + '" y="' + (y - 2.4) + '" width="10" height="4.8" rx="1.4" fill="' + c + '"/></g>'; }
      return '<g class="am-acc am-confete">' +
        star(34, 70, 11, "#F78C16", 1) + star(300, 50, 9, "#5E8AB4", 2) + star(124, 34, 7, "#1F3263", 3) + star(250, 22, 6.5, "#F9A64A", 4) +
        '<circle class="am-faisca am-f2" cx="98" cy="62" r="3.6" fill="#5E8AB4"/><circle class="am-faisca am-f3" cx="306" cy="112" r="3.2" fill="#1F3263"/><circle class="am-faisca am-f4" cx="20" cy="124" r="2.8" fill="#1F3263"/>' +
        chip(155, 21, "#5E8AB4", 30, 1) + chip(70, 34, "#F9A64A", -24, 3) + chip(286, 84, "#1F3263", 18, 2) +
        "</g>";
    },
    pensa: function () {
      return '<g class="am-acc am-pensamento">' +
        '<circle class="am-bolha" cx="152" cy="46" r="4.6" fill="#EEF3F8" stroke="#5E8AB4" stroke-width="2.2"/>' +
        '<circle class="am-bolha" cx="136" cy="31" r="7" fill="#EEF3F8" stroke="#5E8AB4" stroke-width="2.2"/>' +
        '<g class="am-bolha"><circle cx="110" cy="15" r="12.5" fill="#EEF3F8" stroke="#5E8AB4" stroke-width="2.2"/>' +
        '<circle cx="103.5" cy="15" r="2.2" fill="#1F3263"/><circle cx="110" cy="15" r="2.2" fill="#1F3263"/><circle cx="116.5" cy="15" r="2.2" fill="#F78C16"/></g>' +
        "</g>";
    }
  };
  var ACC_DEFS = {
    lupa: function (u) { return '<clipPath id="' + u + 'lc"><circle cx="' + LENTE.x + '" cy="' + LENTE.y + '" r="' + (LENTE.r - 3) + '"/></clipPath>'; },
    lanterna: function (u) { return lin(u + "bm", 0, 0, 1, 0, [[0, "#E4EEFA", 0.95], [0.5, "#DCE7F5", 0.5], [1, "#EEF3F8", 0]]); },
    capacete: function (u) {
      return lin(u + "hh", 0.2, 0, 0.6, 1, [[0, "#FFFFFF"], [0.55, "#F1F5FA"], [1, "#CCD8E8"]]) +
        lin(u + "hb", 0, 0, 0, 1, [[0, "#FFFFFF"], [1, "#D9E2EE"]]) +
        '<clipPath id="' + u + 'hc"><path d="' + CUPULA + '"/></clipPath>';
    },
    bandeira: function (u) { return lin(u + "fl", 0, 0, 1, 1, [[0, "#2E4C9F"], [1, "#14214A"]]); }
  };

  /* ---------------- SVG completo da pose ---------------- */
  var seq = 0;
  function uid() { seq += 1; return "am" + seq.toString(36) + Math.random().toString(36).slice(2, 5) + "-"; }

  function svg(pose) {
    if (POSES.indexOf(pose) < 0) pose = "aceno";
    var u = uid(), Q = POSE[pose];
    var acc = ACC[pose] ? ACC[pose](u) : "", accDefs = ACC_DEFS[pose] ? ACC_DEFS[pose](u) : "";
    return '<svg class="am-svg am-p-' + pose + '" viewBox="0 0 ' + VBW + " " + VBH + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mascote AM ' + ROTULO[pose] + '" focusable="false">' +
      defs(u, accDefs) +
      '<ellipse class="am-sombra" cx="172" cy="304" rx="128" ry="8" fill="url(#' + u + 'gd)"/>' +
      '<g class="am-pula"><g class="am-flutua">' +
      ribbonBack(u) + rightPillar(u) +
      (Q.r.front ? "" : arm(u, "r", Q.r)) +                 // braço direito sai de trás da perna vertical
      feet(u) + innerPillar(u) + bodySides(u) +
      (Q.l.front ? "" : arm(u, "l", Q.l)) +                 // braço esquerdo sai da lateral índigo
      bodyFront(u) + face(u, Q.ex) + ribbonFront(u) +
      (Q.l.front ? arm(u, "l", Q.l) : "") + (Q.r.front ? arm(u, "r", Q.r) : "") +
      acc +
      (Q.l.grip ? '<g class="am-pega">' + handOf(u, "l", Q.l) + "</g>" : "") +   // mão por cima do que segura
      (Q.r.grip ? '<g class="am-pega">' + handOf(u, "r", Q.r) + "</g>" : "") +
      "</g></g></svg>";
  }

  /* ---------------- DOM: mount / pose / play / stop ---------------- */
  var RM = false;
  try {
    var mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    RM = !!(mq && mq.matches);
    if (mq) {
      var onMq = function (e) { RM = e.matches; };
      if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);
    }
  } catch (e) { RM = false; }

  function isMasc(el) { return el && el.nodeType === 1 && el.classList && el.classList.contains("am-masc"); }
  function poseOf(el) { var p = el.getAttribute("data-pose"); return POSES.indexOf(p) < 0 ? "aceno" : p; }

  function render(el, pose) {
    if (el.getAttribute("data-pose") !== pose) el.setAttribute("data-pose", pose);   // normaliza (o CSS da entrada usa o atributo)
    el.innerHTML = svg(pose);
    el.__am = { pose: pose };
    el.classList.add("am-ok");
    if (!el.style.getPropertyValue("--am-d")) el.style.setProperty("--am-d", (-Math.random() * 6).toFixed(2) + "s"); // dessincroniza piscar e flutuar
  }
  function mount(root) {
    root = root || document;
    var list = [];
    if (isMasc(root)) list.push(root);
    if (root.querySelectorAll) list = list.concat([].slice.call(root.querySelectorAll(".am-masc")));
    list.forEach(function (el) {
      var p = poseOf(el);
      // já montado e com a mesma pose: nada a fazer. Uma cópia (cloneNode) não tem o estado interno
      // e é remontada com ids novos, para não repetir os ids de degradê do original.
      if (el.__am && el.__am.pose === p && el.querySelector("svg.am-svg")) return;
      render(el, p);
    });
    return list;
  }
  function setPose(el, nome) {
    if (!isMasc(el)) return el;
    if (POSES.indexOf(nome) < 0) nome = el.__am ? el.__am.pose : poseOf(el);
    clearTimeout(el.__amT);
    el.classList.remove("am-play");
    el.setAttribute("data-pose", nome);
    render(el, nome);
    if (!RM && !el.classList.contains("am-parado")) {
      el.classList.remove("am-troca"); void el.offsetWidth; el.classList.add("am-troca");
      el.__amT = setTimeout(function () { el.classList.remove("am-troca"); }, 450);
    }
    return el;
  }
  function play(el) {
    if (!isMasc(el)) return el;
    if (!el.__am) mount(el);
    el.classList.remove("am-parado");
    if (RM) return el;
    el.classList.remove("am-play", "am-troca");
    void el.offsetWidth;
    el.classList.add("am-play");
    clearTimeout(el.__amT);
    el.__amT = setTimeout(function () { el.classList.remove("am-play"); }, 2600);
    return el;
  }
  function stop(el) {
    if (!isMasc(el)) return el;
    clearTimeout(el.__amT);
    el.classList.remove("am-play", "am-troca");
    el.classList.add("am-parado");
    return el;
  }

  /* ---------------- auto-montagem e integração com o deck ---------------- */
  function needs(n) {
    if (isMasc(n)) return !n.__am;
    if (!n.getElementsByClassName) return false;
    var l = n.getElementsByClassName("am-masc");
    for (var i = 0; i < l.length; i++) if (!l[i].__am) return true;
    return false;
  }
  function boot() {
    mount(document);
    if (window.MutationObserver && document.body) {
      new MutationObserver(function (ms) {
        for (var i = 0; i < ms.length; i++) {
          var add = ms[i].addedNodes;
          for (var j = 0; j < add.length; j++) if (add[j].nodeType === 1 && needs(add[j])) mount(add[j]);
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
    window.addEventListener("beforeprint", function () { mount(document); });
  }
  function autoPlay(list, ms) {
    setTimeout(function () {
      list.forEach(function (el) { if (el.isConnected && el.getAttribute("data-play") !== "off") play(el); });
    }, ms);
  }
  // ao entrar num slide, os mascotes dele fazem a entrada; na divisória, depois que o mascote chega
  document.addEventListener("deck:activate", function (e) {
    var s = e && e.detail && e.detail.slide;
    if (!s || !s.querySelectorAll) s = document.querySelector(".slide.active");
    if (s) autoPlay(mount(s), 260);
  });
  document.addEventListener("deck:chapter", function () {
    var c = document.getElementById("chap");
    if (c) autoPlay(mount(c), 1000);
  });
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest(".am-masc.am-ok") : null;
    if (el && el.getAttribute("data-play") !== "off") play(el);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AMMasc = { POSES: POSES.slice(), svg: svg, mount: mount, pose: setPose, play: play, stop: stop };
})();
