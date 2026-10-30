/* A&M — monograma desconstruído (o "A" com o "M" da Alvarez & Marsal) como CONSTELAÇÃO de partículas.
   Conceito escolhido entre três (constelação, planos translúcidos, blueprint): as partículas soltas da capa
   convergem e se organizam no monograma, na mesma linguagem do Particle System (pontos, fios de ligação,
   um hub laranja). Vetor puro, sem imagem, sem filtro de desfoque: leve na tela e na impressão.

   Geometria plana medida na reconstrução 3D anterior (faces frontais) e conferida com o símbolo do logotipo
   A&M (src/assets/am-performance-*.png): perna diagonal + pilar vertical com corte inclinado no topo (o "A"),
   e as duas pontas do "M" (cunha dentro do vão, subindo para o pilar; cunha à direita, descendo do pilar).
   Unidades da geometria: piso em y = 1000, ápice em y = 0. Caixa do SVG: 820 x 900 (lado direito da capa),
   monograma com 620 de altura, piso em y = 770 e centro horizontal em x = 410.

   API (inalterada): window.AMMono = { svg(opts), mount(el, opts), play(el), stop(el) }
     opts: w (largura em px, 820; altura = w * 900 / 820) · anim (true) · theme ("navy" | "light")
           fundo (true: brilho suave atrás e fio do piso) · reflexo (false: eco do contorno abaixo do piso)
           parallax (false; true = segue o cursor) · bokeh (aceito e ignorado: não existe mais) · debug (false)
     svg(opts)       devolve o SVG completo numa string, no estado final (ids únicos a cada chamada)
     mount(el, opts) injeta em el um <span class="amm-wrap"> com o svg.ammono e, se anim, toca a entrada;
                     idempotente (mesmas opções = mesmo nó); devolve o <svg>
     play(el)        (re)toca a entrada (~2,3 s) e depois os laços leves (corredor de luz no contorno, pulso
                     do hub, cintilar de alguns pontos) · stop(el) para tudo e deixa o estado final
   Estado final = sem classe no .amm-wrap (amm-in = entrada, amm-loop = laços). Movimento reduzido e impressão:
   estado final estático (07-monograma.css). Camadas: [data-layer=fundo|planos|malha|contorno|pontos|brilho].
   Paralaxe externa: gravar --amm-x e --amm-y (-1..1) no .amm-wrap.
   Auto-montagem: elementos .am-mono (data-w, data-anim, data-theme, data-fundo, data-reflexo, data-parallax).
   Manutenção: svg({ debug: true }) desenha os polígonos da geometria por cima. */
(function (root) {
  'use strict';
  var VW = 820, VH = 900, INTRO = 2400, seq = 0;

  /* ---------- geometria (unidades: piso y = 1000) ---------- */
  var U = {
    A:    [[0, 1000], [613, 0], [722, 57], [722, 1000], [619, 1000], [619, 200], [172, 1000]],
    mIn:  [[392, 1000], [573, 353], [574, 1000]],
    mOut: [[743, 487], [743, 1000], [875, 1000]]
  };
  var APEX = [613, 0], SC = 0.62, OX = 139, OY = 150, FLOOR = OY + SC * 1000;
  function px(p) { return [OX + SC * p[0], OY + SC * p[1]]; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function pd(P) { return 'M' + P.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join('L') + 'Z'; }
  function rng(seed) {
    return function () {
      seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function inside(P, x, y) {
    var c = false;
    for (var i = 0, j = P.length - 1; i < P.length; j = i++) {
      var a = P[i], b = P[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  }
  function edgeDist(P, x, y) {
    var m = 1e9;
    for (var i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length], vx = b[0] - a[0], vy = b[1] - a[1];
      var t = Math.max(0, Math.min(1, ((x - a[0]) * vx + (y - a[1]) * vy) / (vx * vx + vy * vy)));
      m = Math.min(m, Math.hypot(x - a[0] - t * vx, y - a[1] - t * vy));
    }
    return m;
  }
  // pontos nas arestas (vértices marcados) e malha interna triangular levemente irregular
  function sampleEdges(P, sp) {
    var out = [];
    for (var i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / sp));
      for (var k = 0; k < n; k++) out.push({ x: a[0] + (b[0] - a[0]) * k / n, y: a[1] + (b[1] - a[1]) * k / n, v: k === 0 });
    }
    return out;
  }
  function lattice(P, sp, margin, R) {
    var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var out = [], h = sp * 0.866, row = 0;
    for (var y = y0 + h / 2; y < y1; y += h, row++) {
      for (var x = x0 + (row % 2 ? sp / 2 : 0); x < x1; x += sp) {
        var jx = x + (R() - 0.5) * sp * 0.42, jy = y + (R() - 0.5) * sp * 0.42;
        if (inside(P, jx, jy) && edgeDist(P, jx, jy) > margin) out.push({ x: jx, y: jy, i: true });
      }
    }
    return out;
  }

  /* ---------- temas ---------- */
  var THEMES = {
    navy: {
      a: { edge: '#F2F6FA', edgeO: 0.86, dot: '#FFFFFF', dot2: '#C9D6E8', mesh: '163,184,214', fill: '#DFE8F0', fillO: [0.12, 0.035] },
      m: { edge: '#9DBBD9', edgeO: 0.82, dot: '#9DBBD9', dot2: '#7EA1C3', mesh: '126,161,195', fill: '#5E8AB4', fillO: [0.16, 0.05] },
      hub: '#FF8A4C', glow: '#1B4479', glowO: 0.34, line: '#A3B8D6', lineO: 0.34, run: '#FFFFFF'
    },
    light: {
      a: { edge: '#002B49', edgeO: 0.85, dot: '#002B49', dot2: '#33556D', mesh: '51,85,109', fill: '#002B49', fillO: [0.07, 0.02] },
      m: { edge: '#5E8AB4', edgeO: 0.9, dot: '#5E8AB4', dot2: '#7EA1C3', mesh: '94,138,180', fill: '#5E8AB4', fillO: [0.12, 0.04] },
      hub: '#F78C16', glow: '#DFE8F0', glowO: 0.6, line: '#7F8DB8', lineO: 0.4, run: '#5E8AB4'
    }
  };

  /* ---------- opções ---------- */
  function norm(o) {
    o = o || {};
    var w = +o.w > 0 ? +o.w : 820;
    return {
      w: w,
      anim: o.anim !== false,
      theme: o.theme === 'light' ? 'light' : 'navy',
      fundo: o.fundo !== false,
      reflexo: !!o.reflexo,
      parallax: !!o.parallax,
      debug: !!o.debug
    };
  }

  /* ---------- pontos e malha (determinísticos: a mesma constelação na tela e no papel) ---------- */
  var CACHE = {};
  function build(k) {
    var ck = k.toFixed(2);
    if (CACHE[ck]) return CACHE[ck];
    var R = rng(31), sp = 15 * Math.pow(k, 0.75), fsp = 30 * Math.pow(k, 0.75);
    var shapes = [['a', U.A], ['m', U.mIn], ['m', U.mOut]].map(function (s) {
      var P = s[1].map(px), E = sampleEdges(P, sp), I = lattice(P, fsp, 9 * Math.pow(k, 0.5), R), all = E.concat(I);
      var L = fsp * 1.45, segs = {};
      for (var i = 0; i < all.length; i++) for (var j = i + 1; j < all.length; j++) {
        var a = all[i], b = all[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd > L || dd < 4 || (!a.i && !b.i)) continue;          // aresta com aresta já é o contorno
        var ok = true;
        for (var t = 0.25; t < 1; t += 0.25) {
          var x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
          if (!inside(P, x, y) && edgeDist(P, x, y) > 1.5) { ok = false; break; }
        }
        if (!ok) continue;
        var al = (Math.round(((1 - dd / L) * 0.5 + 0.08) * 20) / 20).toFixed(2); // faixas de .05: poucos <path>
        (segs[al] = segs[al] || []).push('M' + r1(a.x) + ',' + r1(a.y) + 'L' + r1(b.x) + ',' + r1(b.y));
      }
      // partida de cada ponto: espalhada pelo campo de partículas (inclusive fora da caixa); ordem de baixo para cima
      all.forEach(function (p) {
        p.sx = -260 + R() * 1340; p.sy = -60 + R() * 1020;
        p.d = 0.05 + R() * 0.42 + (1 - (p.y - OY) / 620) * 0.18;
      });
      return { kind: s[0], P: P, pts: all, segs: segs };
    });
    // alguns pontos internos cintilam nos laços
    shapes.forEach(function (s) { s.pts.forEach(function (p) { if (p.i && R() < 0.07) p.tw = (R() * 5).toFixed(2); }); });
    return (CACHE[ck] = shapes);
  }

  /* ---------- SVG ---------- */
  function svg(opts) {
    var o = norm(opts), th = THEMES[o.theme], k = Math.max(1, VW / o.w);
    var id = 'amm' + (++seq).toString(36) + Math.random().toString(36).slice(2, 5) + '-';
    var u = function (n) { return 'url(#' + id + n + ')'; };
    var h = Math.round(o.w * VH / VW), shapes = build(k);
    var rk = Math.pow(k, 0.6), wk = Math.pow(k, 0.7);
    var defs = '', fundo = '', planos = '', malha = '', contorno = '', pontos = '', brilho = '', refl = '';

    var gr = function (n, c, o0, o1) {
      return '<linearGradient id="' + id + n + '" gradientUnits="userSpaceOnUse" x1="0" y1="' + OY + '" x2="0" y2="' + FLOOR + '">' +
        '<stop offset="0" stop-color="' + c + '" stop-opacity="' + o0 + '"/><stop offset="1" stop-color="' + c + '" stop-opacity="' + o1 + '"/></linearGradient>';
    };
    defs += gr('fa', th.a.fill, th.a.fillO[0], th.a.fillO[1]) + gr('fm', th.m.fill, th.m.fillO[0], th.m.fillO[1]);
    defs += '<radialGradient id="' + id + 'hub"><stop offset="0" stop-color="' + th.hub + '" stop-opacity=".55"/><stop offset="1" stop-color="' + th.hub + '" stop-opacity="0"/></radialGradient>';

    if (o.fundo) {
      defs += '<radialGradient id="' + id + 'glow" gradientUnits="userSpaceOnUse" cx="420" cy="500" r="440">' +
        '<stop offset="0" stop-color="' + th.glow + '" stop-opacity="' + th.glowO + '"/><stop offset=".55" stop-color="' + th.glow + '" stop-opacity="' + (th.glowO * 0.4).toFixed(3) + '"/>' +
        '<stop offset="1" stop-color="' + th.glow + '" stop-opacity="0"/></radialGradient>';
      defs += '<linearGradient id="' + id + 'fl" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="780" y2="0">' +
        '<stop offset="0" stop-color="' + th.line + '" stop-opacity="0"/><stop offset=".22" stop-color="' + th.line + '" stop-opacity="' + th.lineO + '"/>' +
        '<stop offset=".78" stop-color="' + th.line + '" stop-opacity="' + th.lineO + '"/><stop offset="1" stop-color="' + th.line + '" stop-opacity="0"/></linearGradient>';
      fundo += '<rect class="amm-glow" x="-20" y="40" width="860" height="860" fill="' + u('glow') + '"/>';
      fundo += '<rect class="amm-floor" x="40" y="' + (FLOOR - 0.5 * wk) + '" width="740" height="' + r1(wk) + '" fill="' + u('fl') + '"/>';
    }

    shapes.forEach(function (s, si) {
      var c = s.kind === 'a' ? th.a : th.m;
      planos += '<path class="amm-plane" d="' + pd(s.P) + '" fill="' + u(s.kind === 'a' ? 'fa' : 'fm') + '"/>';
      for (var al in s.segs) {
        malha += '<path class="amm-mesh" d="' + s.segs[al].join('') + '" fill="none" stroke="rgba(' + c.mesh + ',' + al + ')" stroke-width="' + r1(0.8 * wk) + '" style="--d:' + (1.15 + si * 0.1).toFixed(2) + 's"/>';
      }
      contorno += '<path class="amm-edge" d="' + pd(s.P) + '" pathLength="1" fill="none" stroke="' + c.edge + '" stroke-opacity="' + c.edgeO +
        '" stroke-width="' + r1((s.kind === 'a' ? 1.3 : 1.1) * wk) + '" stroke-linejoin="round" style="--d:' + (0.95 + si * 0.1).toFixed(2) + 's"/>';
      s.pts.forEach(function (p) {
        var rr = (p.i ? 1.3 : (p.v ? 2.6 : 1.9)) * rk, col = p.i ? c.dot2 : c.dot;
        pontos += '<circle class="amm-dot' + (p.tw ? ' amm-tw' : '') + '" cx="' + r1(p.x) + '" cy="' + r1(p.y) + '" r="' + r1(rr) + '" fill="' + col + '"' +
          (p.i ? ' fill-opacity=".85"' : '') + ' style="--dx:' + r1(p.sx - p.x) + 'px;--dy:' + r1(p.sy - p.y) + 'px;--d:' + p.d.toFixed(2) + 's' +
          (p.tw ? ';--t:' + p.tw + 's' : '') + '"/>';
      });
      if (o.reflexo) refl += '<path d="' + pd(s.P) + '" fill="none" stroke="' + c.edge + '" stroke-width="' + r1(wk) + '"/>';
    });

    // corredor de luz (laço): um traço curto percorre o contorno do "A"
    var aD = pd(U.A.map(px));
    brilho += '<g class="amm-runner" fill="none" stroke-linecap="round">' +
      '<path class="amm-run" d="' + aD + '" pathLength="1" stroke="' + th.run + '" stroke-opacity=".22" stroke-width="' + r1(6 * wk) + '"/>' +
      '<path class="amm-run" d="' + aD + '" pathLength="1" stroke="' + th.run + '" stroke-width="' + r1(2 * wk) + '"/></g>';
    // hub laranja no ápice (o único laranja do desenho)
    var ap = px(APEX);
    brilho += '<circle class="amm-halo" cx="' + ap[0] + '" cy="' + ap[1] + '" r="' + r1(26 * rk) + '" fill="' + u('hub') + '"/>' +
      '<circle class="amm-ring" cx="' + ap[0] + '" cy="' + ap[1] + '" r="' + r1(12 * rk) + '" fill="none" stroke="' + th.hub + '" stroke-width="' + r1(1.2 * wk) + '"/>' +
      '<circle class="amm-hub" cx="' + ap[0] + '" cy="' + ap[1] + '" r="' + r1(4.2 * rk) + '" fill="' + th.hub + '"/>';

    if (o.reflexo) {
      defs += '<linearGradient id="' + id + 'rf" gradientUnits="userSpaceOnUse" x1="0" y1="' + FLOOR + '" x2="0" y2="' + (FLOOR + 120) + '"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>';
      defs += '<mask id="' + id + 'mr" maskUnits="userSpaceOnUse" x="0" y="' + FLOOR + '" width="' + VW + '" height="130"><rect x="0" y="' + FLOOR + '" width="' + VW + '" height="130" fill="' + u('rf') + '"/></mask>';
      refl = '<g class="amm-refl" mask="' + u('mr') + '" opacity=".16"><g transform="matrix(1 0 0 -1 0 ' + 2 * FLOOR + ')">' + refl + '</g></g>';
    }
    var dbg = '';
    if (o.debug) { dbg = '<g fill="none" stroke="#00FFD0" stroke-width="1">'; for (var n in U) dbg += '<path d="' + pd(U[n].map(px)) + '"/>'; dbg += '</g>'; }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + VW + ' ' + VH + '" width="' + o.w + '" height="' + h + '" class="ammono amm-' + o.theme + '"' +
      ' role="img" aria-label="Monograma A&amp;M da Alvarez &amp; Marsal"><defs>' + defs + '</defs>' +
      '<g data-layer="fundo" class="amm-fundo">' + fundo + refl + '</g>' +
      '<g data-layer="planos" class="amm-planos">' + planos + '</g>' +
      '<g data-layer="malha" class="amm-malha">' + malha + '</g>' +
      '<g data-layer="contorno" class="amm-contorno">' + contorno + '</g>' +
      '<g data-layer="pontos" class="amm-pontos">' + pontos + '</g>' +
      '<g data-layer="brilho" class="amm-brilho">' + brilho + '</g>' + dbg + '</svg>';
  }

  /* ---------- montagem, entrada, laços e paralaxe ---------- */
  function still() { try { return root.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function svgOf(el) { return el && el.querySelector ? el.querySelector('svg.ammono') : null; }
  function wrapOf(el) { return el && el.querySelector ? el.querySelector('.amm-wrap') : null; }
  function key(o) { return [o.w, o.anim, o.theme, o.fundo, o.reflexo, o.debug].join('|'); }

  function mount(el, opts) {
    if (!el) return null;
    var o = norm(opts), k = key(o), cur = svgOf(el), st = el.__amm;
    if (!st || st.key !== k || !cur || !wrapOf(el)) {
      if (st) { clearTimeout(st.t); unbind(el); }
      el.innerHTML = '<span class="amm-wrap" style="width:' + o.w + 'px">' + svg(o) + '</span>';
      cur = svgOf(el);
      st = el.__amm = { key: k, anim: o.anim, t: 0 };
      if (o.anim) play(el);
    } else if (o.anim && !still() && !wrapOf(el).classList.contains('amm-in')) {
      wrapOf(el).classList.add('amm-loop');
    }
    if (o.parallax && !still()) bind(el); else unbind(el);
    return cur;
  }
  function play(el) {
    var w = wrapOf(el), st = el && el.__amm;
    if (!w || !st) return;
    clearTimeout(st.t);
    w.classList.remove('amm-in', 'amm-loop');
    if (!st.anim || still()) return;
    void w.getBoundingClientRect();
    w.classList.add('amm-in');
    // fim da entrada: sai a classe (estado final = estilo padrão) e entram os laços leves
    st.t = setTimeout(function () { w.classList.remove('amm-in'); w.classList.add('amm-loop'); }, INTRO);
  }
  function stop(el) {
    var w = wrapOf(el), st = el && el.__amm;
    if (!w) return;
    if (st) clearTimeout(st.t);
    w.classList.remove('amm-in', 'amm-loop');
  }
  function setXY(el, x, y) {
    var w = wrapOf(el);
    if (w) { w.style.setProperty('--amm-x', x.toFixed(3)); w.style.setProperty('--amm-y', y.toFixed(3)); }
  }
  function bind(el) {
    if (el.__ammPx) return;
    var raf = 0, X = 0, Y = 0;
    var mv = function (e) {
      var r = el.getBoundingClientRect();
      if (!r.width) return;
      X = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      Y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; setXY(el, X, Y); });
    };
    var lv = function () { setXY(el, 0, 0); };
    root.addEventListener('pointermove', mv, { passive: true });
    document.addEventListener('pointerleave', lv);
    el.__ammPx = function () { root.removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv); setXY(el, 0, 0); };
  }
  function unbind(el) { if (el.__ammPx) { el.__ammPx(); el.__ammPx = null; } }

  /* ---------- auto-montagem: <div class="am-mono" data-w="420" data-anim="false"> ---------- */
  function flag(v, def) { return v == null || v === '' ? def : !(v === 'false' || v === '0' || v === 'no'); }
  function auto() {
    var L = document.querySelectorAll('.am-mono');
    for (var i = 0; i < L.length; i++) {
      var e = L[i], ds = e.dataset || {};
      if (e.__amm) continue;
      mount(e, {
        w: ds.w ? +ds.w : undefined, anim: flag(ds.anim, true), theme: ds.theme,
        fundo: flag(ds.fundo, true), reflexo: flag(ds.reflexo, false), parallax: flag(ds.parallax, false)
      });
    }
  }
  root.AMMono = { svg: function (opts) { return svg(opts); }, mount: mount, play: play, stop: stop };
  if (root.document) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto);
    else auto();
  }
})(window);
