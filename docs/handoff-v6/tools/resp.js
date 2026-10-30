// resp.js · responsividade da moldura: palco escalado, barra inferior sem sobrepor o palco, sem rolagem horizontal
// uso: node resp.js <deck.html> <saida.txt> [pasta_capturas] [larguraxaltura ...]
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const [, , deck, outTxt, shotDir, ...vps] = process.argv;
const VPS = (vps.length ? vps : ["1280x720", "1366x768", "1440x900", "1536x864", "1600x900", "1920x1080", "2560x1440"]).map(v => v.split("x").map(Number));
const R = [], errs = [];
const ok = (n, c, x) => { R.push(`${c ? "ok   " : "FALHA"} ${n}${x !== undefined ? " · " + JSON.stringify(x) : ""}`); return c };
(async () => {
  let b; try { b = await chromium.launch() } catch (e) { b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }) }
  for (const [W, Hh] of VPS) {
    const p = await b.newPage({ viewport: { width: W, height: Hh }, deviceScaleFactor: 1 });
    p.on("pageerror", e => errs.push(`[${W}x${Hh}] ${e}`)); p.on("console", m => { if (m.type() === "error") errs.push(`[${W}x${Hh}] ${m.text()}`) });
    await p.goto("file://" + path.resolve(deck) + "#4", { waitUntil: "load" }); await p.evaluate(() => document.fonts && document.fonts.ready); await p.waitForTimeout(1200);
    const m = async () => p.evaluate(() => {
      const r = el => { if (!el) return null; const q = el.getBoundingClientRect(); return { l: +q.left.toFixed(1), t: +q.top.toFixed(1), r: +q.right.toFixed(1), b: +q.bottom.toFixed(1), w: +q.width.toFixed(1), h: +q.height.toFixed(1) } };
      const st = r(document.getElementById("stage")), ct = r(document.getElementById("controls")), dt = r(document.getElementById("dots"));
      const dv = getComputedStyle(document.getElementById("dots")).display !== "none";
      const btns = [...document.querySelectorAll("#controls > *")].map(r), tabs = [...document.querySelectorAll("#dots button")].map(r);
      /* sobreposição entre quaisquer dois itens da barra */
      const items = [...btns, ...(dv ? tabs : [])]; let clash = 0;
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) { const a = items[i], c = items[j]; if (a.l < c.r - .5 && c.l < a.r - .5 && a.t < c.b - .5 && c.t < a.b - .5) clash++ }
      const wrapped = [...document.querySelectorAll("#controls button,#controls .c,#dots button span:first-child")].filter(e => { const rs = [...e.getClientRects()]; return e.getBoundingClientRect().height > 44 }).length;
      return { vw: innerWidth, vh: innerHeight, st, ct, dt, dotsVisible: dv, clash, wrapped, sx: document.documentElement.scrollWidth, sy: document.documentElement.scrollHeight, bsx: document.body.scrollWidth,
        prog: r(document.getElementById("progress")), scale: +(st.w / 1600).toFixed(4) };
    });
    const g = await m();
    const exp = Math.min((W - 20) / 1600, (Hh - 10 - 62) / 900);
    ok(`${W}×${Hh}: palco escala ${g.scale} (esperado ${exp.toFixed(4)}) e fica centrado`, Math.abs(g.scale - exp) < .002 && Math.abs((g.st.l + g.st.r) / 2 - W / 2) < 1, { st: g.st });
    ok(`${W}×${Hh}: controles abaixo do palco (folga ${(g.ct.t - g.st.b).toFixed(1)} px)`, g.ct.t >= g.st.b + 2, { palcoFim: g.st.b, controlesTopo: g.ct.t });
    if (g.dotsVisible) ok(`${W}×${Hh}: abas abaixo do palco (folga ${(g.dt.t - g.st.b).toFixed(1)} px)`, g.dt.t >= g.st.b + 2, { palcoFim: g.st.b, abasTopo: g.dt.t });
    ok(`${W}×${Hh}: itens da barra não se sobrepõem (abas ${g.dotsVisible ? "visíveis" : "ocultas"}; vão abas→botões ${g.dotsVisible ? (g.ct.l - g.dt.r).toFixed(1) + " px" : "—"})`, g.clash === 0 && (!g.dotsVisible || g.dt.r <= g.ct.l - 8), { clash: g.clash, abasFim: g.dt && g.dt.r, botoesInicio: g.ct.l });
    ok(`${W}×${Hh}: botões numa linha (nenhum quebrado)`, g.wrapped === 0, g.wrapped);
    ok(`${W}×${Hh}: sem rolagem horizontal nem vertical`, g.sx <= W && g.sy <= Hh && g.bsx <= W, { scrollW: g.sx, scrollH: g.sy });
    ok(`${W}×${Hh}: barra inferior dentro da janela`, g.ct.r <= W && g.ct.b <= Hh && g.ct.l >= 0, g.ct);
    /* painéis (índice e fichas) cabem na janela */
    for (const [k, id] of [["g", "idxP"], ["p", "pdxP"]]) {
      await p.keyboard.press(k); await p.waitForTimeout(350);
      const pr = await p.evaluate(id => { const q = document.getElementById(id).getBoundingClientRect(); return { l: q.left, t: q.top, r: q.right, b: q.bottom } }, id);
      ok(`${W}×${Hh}: painel ${id} dentro da janela`, pr.l >= 0 && pr.t >= 0 && pr.r <= W + .5 && pr.b <= Hh + .5, pr);
      if (shotDir && id === "pdxP" && (W === 1280 || W === 2560)) await p.screenshot({ path: path.join(shotDir, `f3_resp_${W}x${Hh}_fichas.png`) });
      await p.keyboard.press("Escape"); await p.waitForTimeout(250);
    }
    /* modo ficha: rótulos mais longos ("Ficha anterior", "Próxima ficha", "Ficha 16 / 24") */
    await p.evaluate(() => DECK.ficha(PRODUCTS[15].id)); await p.waitForTimeout(500);
    const gf = await m();
    ok(`${W}×${Hh}: com ficha aberta, itens da barra não se sobrepõem (abas ${gf.dotsVisible ? "visíveis" : "ocultas"}; compacta: ${await p.evaluate(() => document.body.classList.contains("bar-tight"))})`, gf.clash === 0 && (!gf.dotsVisible || gf.dt.r <= gf.ct.l - 8) && gf.ct.t >= gf.st.b + 2 && gf.ct.l >= 0, { clash: gf.clash, abasFim: gf.dt && gf.dt.r, botoesInicio: gf.ct.l });
    if (shotDir && (W === 1280 || W === 1366)) await p.screenshot({ path: path.join(shotDir, `f3_resp_${W}x${Hh}_ficha.png`) });
    await p.keyboard.press("Escape"); await p.waitForTimeout(400);
    const g2 = await m();
    ok(`${W}×${Hh}: depois de fechar a ficha a barra volta ao normal`, g2.clash === 0 && g2.dotsVisible === g.dotsVisible, { dots: g2.dotsVisible });
    /* verso no mesmo lugar do palco, também depois de redimensionar */
    await p.keyboard.press("v"); await p.waitForTimeout(1100);
    const vf = await p.evaluate(() => { const a = document.getElementById("vface").getBoundingClientRect(), s = document.getElementById("stage").getBoundingClientRect(); return { d: Math.max(Math.abs(a.left - s.left), Math.abs(a.top - s.top), Math.abs(a.width - s.width)) } });
    ok(`${W}×${Hh}: verso ocupa exatamente o palco`, vf.d < 1, vf);
    if (shotDir) await p.screenshot({ path: path.join(shotDir, `f3_resp_${W}x${Hh}_verso.png`) });
    await p.keyboard.press("v"); await p.waitForTimeout(1000);
    if (shotDir) await p.screenshot({ path: path.join(shotDir, `f3_resp_${W}x${Hh}.png`) });
    await p.close();
  }
  /* janela redimensionada ao vivo (1600×900 → 1280×720 → 2560×1440) */
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } }); await p.goto("file://" + path.resolve(deck) + "#7", { waitUntil: "load" }); await p.waitForTimeout(900);
  for (const [W, Hh] of [[1280, 720], [2560, 1440], [1366, 768]]) { await p.setViewportSize({ width: W, height: Hh }); await p.waitForTimeout(300);
    const sc = await p.evaluate(() => document.getElementById("stage").getBoundingClientRect().width / 1600); const exp = Math.min((W - 20) / 1600, (Hh - 72) / 900);
    ok(`redimensionar ao vivo para ${W}×${Hh} reescala o palco`, Math.abs(sc - exp) < .002, { sc, exp }) }
  await p.close();
  fs.writeFileSync(outTxt, R.join("\n") + "\n" + (errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE") + "\n");
  console.log(R.join("\n")); console.log(errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE");
  console.log(`resumo: ${R.filter(x => x.startsWith("ok")).length} ok · ${R.filter(x => x.startsWith("FALHA")).length} falhas`);
  await b.close();
})();
