// apodi_cmp.js · mede a moldura do deck contra o modelo APODI (mesmo viewport): palco, cabeçalho, faixa, corpo, rodapé, barra inferior e fontes; gera capturas lado a lado (capa, sumário, slide com moldura)
// uso: node apodi_cmp.js <apodi.html> <deck.html> <pasta_saida> [largura] [altura]   (apodi.html: scratchpad/apodi_in/apodi.html)
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const [, , apodi, ours, outdir, vwA, vhA] = process.argv;
const VW = +(vwA || 1600), VH = +(vhA || 900);
const SEL = ["#stage", ".sr-top", ".sr-dec", ".sr-band", ".sr-band>span:nth-child(2)", ".sr-band small", ".body", ".foot", ".foot b", ".foot .n", ".am-logo", ".am-wm", ".am-a", ".am-s", ".am-div", ".am-title b", ".am-title span", ".am-right", ".am-dot", ".am-deco"];
const UI = ["#progress", "#controls", "#controls button", "#controls .c", "#controls .p", "#dots", "#dots button", "#dots .nb"];
async function measure(page, scope) {
  return await page.evaluate(([SEL, UI, scope]) => {
    const st = document.getElementById("stage"), sr = st.getBoundingClientRect(), sc = sr.width / 1600;
    const s = document.querySelector(scope);
    const R = (el, inStage) => { const r = el.getBoundingClientRect(); return inStage ? { l: +((r.left - sr.left) / sc).toFixed(1), t: +((r.top - sr.top) / sc).toFixed(1), w: +(r.width / sc).toFixed(1), h: +(r.height / sc).toFixed(1) } : { l: +r.left.toFixed(1), t: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
    const CS = el => { const c = getComputedStyle(el); return { ff: c.fontFamily.split(",")[0].replace(/"/g, ""), fw: c.fontWeight, fs: c.fontSize, lh: c.lineHeight, ls: c.letterSpacing, col: c.color, bg: c.backgroundImage !== "none" ? c.backgroundImage.slice(0, 70) : c.backgroundColor, br: c.borderRadius, tt: c.textTransform, bs: c.boxShadow.slice(0, 60), bd: c.border } };
    const out = { stage: { ...R(st, false), radius: getComputedStyle(st).borderRadius, shadow: getComputedStyle(st).boxShadow }, page: getComputedStyle(document.body).backgroundImage.slice(0, 120), frame: {}, ui: {} };
    for (const q of SEL) { const el = q === "#stage" ? st : s && s.querySelector(q); if (el) out.frame[q] = { ...R(el, true), ...CS(el) } }
    for (const q of UI) { const els = [...document.querySelectorAll(q)]; if (els.length) out.ui[q] = els.map(el => ({ ...R(el, false), ...CS(el), txt: (el.textContent || "").trim().slice(0, 30) })) }
    /* fontes realmente usadas na moldura */
    out.fontsLoaded = [...document.fonts].filter(f => f.status === "loaded").map(f => f.family.replace(/"/g, "") + " " + f.weight);
    return out;
  }, [SEL, UI, scope]);
}
(async () => {
  fs.mkdirSync(outdir, { recursive: true });
  let browser; try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
  const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const A = await ctx.newPage(), O = await ctx.newPage();
  const errs = []; O.on("pageerror", e => errs.push(String(e))); O.on("console", m => { if (m.type() === "error") errs.push(m.text()) });
  await A.goto("file://" + path.resolve(apodi), { waitUntil: "load" }); await O.goto("file://" + path.resolve(ours), { waitUntil: "load" });
  for (const p of [A, O]) { await p.evaluate(() => document.fonts && document.fonts.ready); await p.waitForTimeout(1200) }
  const pairs = [["capa", 0, 1], ["sumario", 1, 2], ["moldura", 2, 4]];
  const res = {};
  for (const [nm, ai, on] of pairs) {
    await A.evaluate(i => { window.go(i) }, ai); await O.evaluate(n => window.DECK.slide(n), on);
    await A.waitForTimeout(1500); await O.waitForTimeout(1500);
    const ma = await measure(A, ".slide.active"), mo = await measure(O, ".slide.active");
    res[nm] = { apodi: ma, nosso: mo };
    await A.screenshot({ path: path.join(outdir, `apodi_${nm}_${VW}.png`) }); await O.screenshot({ path: path.join(outdir, `nosso_${nm}_${VW}.png`) });
  }
  fs.writeFileSync(path.join(outdir, `frame_cmp_${VW}x${VH}.json`), JSON.stringify(res, null, 1));
  /* resumo da moldura (slide com moldura) */
  const a = res.moldura.apodi, o = res.moldura.nosso, L = [];
  L.push(`viewport ${VW}×${VH} · palco APODI ${JSON.stringify(a.stage)} · nosso ${JSON.stringify(o.stage)}`);
  L.push(`fundo da página igual: ${a.page === o.page}`);
  for (const q of Object.keys(a.frame)) {
    const x = a.frame[q], y = o.frame[q]; if (!y) { L.push(`${q}: FALTA no nosso`); continue }
    const geo = ["l", "t", "w", "h"].map(k => Math.abs(x[k] - y[k]) > 1.5 ? `${k} ${x[k]}→${y[k]}` : null).filter(Boolean);
    const sty = ["ff", "fw", "fs", "lh", "ls", "col", "br", "tt"].map(k => x[k] !== y[k] ? `${k} ${x[k]}→${y[k]}` : null).filter(Boolean);
    L.push(`${q}: ${geo.length || sty.length ? "DIFERE · " + [...geo, ...sty].join(" · ") : "igual"}`);
  }
  for (const q of ["#progress", "#dots", "#controls"]) { const x = a.ui[q] && a.ui[q][0], y = o.ui[q] && o.ui[q][0]; if (x && y) L.push(`${q}: APODI l${x.l} t${x.t} w${x.w} h${x.h} · nosso l${y.l} t${y.t} w${y.w} h${y.h}`) }
  for (const q of ["#controls button", "#controls .c", "#dots button"]) { const xs = (a.ui[q] || []).map(b => `${b.txt}[h${b.h} r${b.br} ${b.ff} ${b.fw} ${b.fs}]`), ys = (o.ui[q] || []).map(b => `${b.txt}[h${b.h} r${b.br} ${b.ff} ${b.fw} ${b.fs}]`); L.push(`${q}:\n   APODI ${xs.join(" | ")}\n   nosso ${ys.join(" | ")}`) }
  L.push("erros de console (nosso): " + (errs.length ? errs.join(" | ") : "nenhum"));
  fs.writeFileSync(path.join(outdir, `frame_cmp_${VW}x${VH}.txt`), L.join("\n") + "\n"); console.log(L.join("\n"));
  await browser.close();
})();
