/* =========================================================================
   Capa · o bando Enjourney
   Desligado: os pássaros voam livres pelo palco.
   Ligado: cada um volta ao logo; três pousam nas posições exatas do
   símbolo e os demais se fundem a eles.
   ========================================================================= */
const Cover = (() => {
  const LX = 968, LY = 410, LS = 2.3;            // posição do logo no palco
  const SLOT = {                                  // centro e pose de cada pássaro do logo
    big:   { cx: 46, cy: 39, scale: 1.55, ang: -8 },
    mid:   { cx: 60, cy: 21, scale: 1.15, ang: -14 },
    small: { cx: 86, cy: 15, scale: 0.72, ang: 10 },
  };
  const ORDER = ["big", "mid", "small"];
  const N = 12;
  let svg, sec, btn, birds = [], logoBirds = {}, word, raf = 0, joined = false, running = false, last = 0;

  // pássaro paramétrico: corpo fixo + duas asas que batem (f: ponta, g: cotovelo)
  const BODY = "M-15 1C-9-2.4 0-3.4 8-3.6 12-3.8 15-5.4 18.6-5.2 21.4-5 22.8-3.4 26.5-2L22.6-.4C19 2.4 11 3.8 3 3.8-5 3.8-11 2.8-15 1Z";
  const TAIL = "M-13 .2-23.5-3.4-21.6 1.1-23.5 5.4-12.6 2.8Z";
  function wing(f, g, k = 1) {
    const s = f >= 0 ? 1 : -1;
    const E = [3, -25 * g * k], T = [-25, -52 * f * k], B = [E[0] - 8, E[1] * 0.78 + 2 * s];
    return `M10 -2Q${E[0] + 9} ${E[1] * 0.5 - 2} ${E[0]} ${E[1]}` +
      `Q${(E[0] + T[0]) / 2 + 3} ${(E[1] + T[1]) / 2 - 2.5 * s} ${T[0]} ${T[1]}` +
      `Q${(B[0] + T[0]) / 2 + 1} ${(B[1] + T[1]) / 2 + 4 * s} ${B[0]} ${B[1]}` +
      `Q-4 ${B[1] * 0.35} -2 -1Z`;
  }
  const rnd = (a, b) => a + Math.random() * (b - a);
  const slotPos = (k) => ({ x: LX + SLOT[k].cx * LS, y: LY + SLOT[k].cy * LS });

  function build() {
    sec = $("#s01"); svg = $(".flock", sec); btn = $(".join", sec);
    const birdsDef = BIRD_PATHS;
    svg.innerHTML = `<defs>
        <linearGradient id="gB" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#9fd0ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
        <linearGradient id="gBfar" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3d82c4"/><stop offset="1" stop-color="#8fc0ea"/></linearGradient>
        <radialGradient id="glow"><stop offset="0" stop-color="#fecc32" stop-opacity=".55"/><stop offset="1" stop-color="#fecc32" stop-opacity="0"/></radialGradient>
      </defs>
      <circle id="logoGlow" cx="${LX + 70 * LS}" cy="${LY + 34 * LS}" r="10" fill="url(#glow)" opacity="0"/>
      <g id="logoG" transform="translate(${LX} ${LY}) scale(${LS})"></g>
      <g id="flockG"></g>`;
    const logoG = $("#logoG", svg);
    ORDER.forEach((k) => {
      const g = sv("g", { class: "lb", opacity: 0.12 }, logoG);
      BIRD_GROUPS[k].forEach((i) => sv("path", { d: birdsDef[i].d, fill: "url(#gB)" }, g));
      logoBirds[k] = g;
    });
    word = sv("text", { x: 79, y: 63, textLength: 181, lengthAdjust: "spacingAndGlyphs", "font-family": "Montserrat", "font-weight": 300, "font-size": 39, fill: "#ffffff", opacity: 0.38 }, logoG, "ENJOURNEY");
    word.style.transition = "opacity 1s";
    Object.values(logoBirds).forEach((g) => (g.style.transition = "opacity .5s"));

    const fg = $("#flockG", svg);
    for (let i = 0; i < N; i++) {
      const g = sv("g", {}, fg);
      const far = sv("path", { fill: "url(#gBfar)" }, g);
      sv("path", { d: TAIL, fill: "url(#gB)" }, g);
      sv("path", { d: BODY, fill: "url(#gB)" }, g);
      const near = sv("path", { fill: "url(#gB)" }, g);
      const lead = i < 3 ? ORDER[i] : null;
      birds.push({
        g, far, near, lead,
        slot: lead || ORDER[i % 3],
        x: rnd(80, 1520), y: rnd(120, 780), vx: rnd(-2, 2), vy: rnd(-1, 1),
        tx: 0, ty: 0, max: rnd(1.6, 2.5), size: lead ? SLOT[lead].scale * 0.82 : rnd(0.55, 1.05),
        ph: rnd(0, 6.28), fs: rnd(0.16, 0.22), glide: 0, op: 1, state: "fly", ang: 0, flip: 1,
      });
    }
    birds.forEach(newTarget);
    btn.addEventListener("click", () => setJoined(!joined));
    if (reduceMotion) { setJoined(true, true); }
  }

  function newTarget(b) {
    // alvos espalhados, com preferência pelas bordas para não cobrir o título por muito tempo
    const zones = Deck.read ? [[880, 1560, 280, 700]] : [[60, 1540, 70, 170], [60, 1540, 730, 850], [880, 1540, 120, 820], [880, 1540, 120, 820]];
    const z = zones[Math.floor(Math.random() * zones.length)];
    b.tx = rnd(z[0], z[1]); b.ty = rnd(z[2], z[3]);
  }

  function setJoined(on, instant = false) {
    joined = on;
    btn.setAttribute("aria-pressed", on);
    $(".st", btn).textContent = on ? "Bando unido à Enjourney" : "Unir o bando à Enjourney";
    sec.classList.toggle("joined", on);
    if (on) {
      birds.forEach((b) => { b.state = "home"; });
      if (instant) birds.forEach(land);
    } else {
      word.setAttribute("opacity", 0.38);
      $("#logoGlow", svg).setAttribute("opacity", 0);
      birds.forEach((b) => {
        const p = slotPos(b.slot);
        if (b.state === "landed" || b.state === "merged") { b.x = p.x + rnd(-8, 8); b.y = p.y + rnd(-8, 8); }
        b.state = "fly"; b.op = 1; b.g.style.opacity = 1;
        const a = rnd(-Math.PI * 0.95, -Math.PI * 0.05);
        b.vx = Math.cos(a) * rnd(2, 3.5); b.vy = Math.sin(a) * rnd(2, 3.5);
        newTarget(b);
      });
      Object.values(logoBirds).forEach((g) => g.setAttribute("opacity", 0.12));
    }
  }

  function land(b) {
    const p = slotPos(b.slot);
    b.x = p.x; b.y = p.y;
    if (b.lead) { b.state = "landed"; logoBirds[b.lead].setAttribute("opacity", 1); }
    else b.state = "merged";
    b.g.style.opacity = 0;
    if (birds.every((x) => x.state === "landed" || x.state === "merged")) {
      word.setAttribute("opacity", 1);
      const gl = $("#logoGlow", svg);
      gl.setAttribute("r", 260); gl.setAttribute("opacity", 0.55);
    }
  }

  function step(t) {
    const dt = Math.min(2.5, (t - (last || t)) / 16.67); last = t;
    for (const b of birds) {
      if (b.state === "landed" || b.state === "merged") continue;
      let tx = b.tx, ty = b.ty, max = b.max;
      if (b.state === "home") { const p = slotPos(b.slot); tx = p.x; ty = p.y; max = b.max * 1.35; }
      const dx = tx - b.x, dy = ty - b.y, dist = Math.hypot(dx, dy) || 1;
      if (b.state === "fly" && dist < 60) newTarget(b);
      const want = b.state === "home" ? Math.min(max, Math.max(0.6, dist / 40)) : max;
      let sx = (dx / dist) * want - b.vx, sy = (dy / dist) * want - b.vy;
      // separação leve
      for (const o of birds) {
        if (o === b || o.state === "landed" || o.state === "merged") continue;
        const ox = b.x - o.x, oy = b.y - o.y, d2 = ox * ox + oy * oy;
        if (d2 < 3600 && d2 > 0.01) { sx += (ox / d2) * 18; sy += (oy / d2) * 18; }
      }
      // o bloco de texto da capa fica livre: os pássaros contornam
      if (!Deck.read && b.state === "fly" && b.x < 840 && b.y > 175 && b.y < 705) {
        const top = b.y - 175, bot = 705 - b.y, right = 840 - b.x;
        const m = Math.min(top, bot, right);
        if (m === right) sx += 0.08; else if (m === top) sy -= 0.08; else sy += 0.08;
      }
      const force = b.state === "home" ? 0.09 : !Deck.read && b.x < 840 && b.y > 175 && b.y < 705 ? 0.12 : 0.035;
      const fm = Math.hypot(sx, sy);
      if (fm > force) { sx = (sx / fm) * force; sy = (sy / fm) * force; }
      b.vx += sx * dt; b.vy += sy * dt;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > max) { b.vx = (b.vx / sp) * max; b.vy = (b.vy / sp) * max; }
      if (b.state === "home" && dist < 46) {
        // aproximação final: desliza até o ponto exato do logo, sem orbitar
        const k = Math.min(1, 0.16 * dt);
        b.vx = dx * k; b.vy = dy * k;
      }
      b.x += b.vx * dt; b.y += b.vy * dt;

      // pouso
      let scale = b.size, tilt = Math.atan2(b.vy, Math.abs(b.vx)) * 57.3, flapK = 1;
      if (b.state === "home") {
        const near = Math.max(0, Math.min(1, 1 - dist / 220));
        if (b.lead) { scale = b.size + (SLOT[b.lead].scale - b.size) * near; tilt = tilt * (1 - near) + SLOT[b.lead].ang * near; }
        else { b.op = Math.min(1, dist / 120); b.g.style.opacity = b.op; scale = b.size * (0.4 + 0.6 * Math.min(1, dist / 160)); }
        flapK = 1 - near * 0.6;
        if (dist < (b.lead ? 2.5 : 14)) { land(b); continue; }
      }
      tilt = Math.max(-38, Math.min(38, tilt));
      if (Math.abs(b.vx) > 0.25) b.flip = b.vx < 0 ? -1 : 1;

      // batida de asa: plana às vezes
      if (b.glide > 0) b.glide -= dt; else if (Math.random() < 0.004 * dt && b.state === "fly") b.glide = rnd(40, 110);
      const gl = b.glide > 0 && b.state === "fly";
      b.ph += (gl ? 0.04 : b.fs * (b.vy < -0.4 ? 1.25 : 1)) * dt;
      const f = gl ? 0.2 + Math.sin(b.ph) * 0.05 : Math.sin(b.ph) * flapK;
      const g = gl ? 0.15 : Math.sin(b.ph + 0.7) * flapK;
      b.near.setAttribute("d", wing(f, g));
      b.far.setAttribute("d", wing(f * 0.82, g * 0.82, 0.9));
      b.g.setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) scale(${(scale * b.flip).toFixed(3)} ${scale.toFixed(3)}) rotate(${tilt.toFixed(1)})`);
    }
    raf = requestAnimationFrame(step);
  }
  function frame() {
    // no modo leitura (celular) o quadro do bando recorta a região do logo
    svg.setAttribute("viewBox", Deck.read ? "870 250 730 470" : "0 0 1600 900");
    birds.forEach((b) => { if (Deck.read && b.state === "fly" && (b.x < 860 || b.y < 250)) { b.x = rnd(900, 1550); b.y = rnd(300, 680); newTarget(b); } });
  }
  function start() { frame(); if (running || reduceMotion) return; running = true; last = 0; raf = requestAnimationFrame(step); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  return {
    init() {
      build();
      Deck.on("s01", start);
      Deck.onLeave("s01", stop);
      sec.addEventListener("visible", start);
      sec.addEventListener("hidden", stop);
    },
  };
})();
