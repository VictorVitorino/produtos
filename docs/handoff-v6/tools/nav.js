// nav.js · verificação independente da navegação (fundação, parte 3) · ~3 min
// uso: node nav.js <deck.html> <saida.txt> [pasta_capturas]
// A · caminhada completa com → do slide 1 ao 20 (divisórias, passos, vistas) e volta com ←
// B · índice (G) · C · abas de capítulo · D · fichas (P, ← →, Esc, One-page, Voltar) · E · Esc
// F · endereço #p=<id>, #N (carga nova e hashchange) · G · virar a página com V em 5 slides (inclui capa) e navegação que desvira
// H · movimento reduzido (giro instantâneo) · erros de console em tudo
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const [, , deck, outTxt, shotDir] = process.argv;
const file = "file://" + path.resolve(deck);
const R = [], errs = [];
const ok = (name, cond, extra) => { R.push(`${cond ? "ok   " : "FALHA"} ${name}${extra !== undefined ? " · " + (typeof extra === "string" ? extra : JSON.stringify(extra)) : ""}`); return cond };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function launch() { try { return await chromium.launch() } catch (e) { return await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }) } }
async function newPage(b, opt, tag) {
  const p = await b.newPage(Object.assign({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 }, opt || {}));
  p.on("pageerror", e => errs.push(`[${tag}] pageerror ${e}`));
  p.on("console", m => { if (m.type() === "error") errs.push(`[${tag}] console.error ${m.text()}`) });
  return p;
}
const S = p => p.evaluate(() => {
  const P = typeof PANE !== "undefined" ? PANE[DECK.keyOf(DECK.slides[DECK.cur])] : null;
  const chap = document.getElementById("chap"), pd = document.getElementById("pd"), fl = document.getElementById("flip");
  return { cur: DECK.cur + 1, pane: P ? P.k : null, chap: chap.classList.contains("on"), busy: typeof busy !== "undefined" ? busy : null,
    flipped: DECK.flipped, vback: fl.classList.contains("vback"), anim: fl.getAnimations().length, pd: typeof pdOpen !== "undefined" ? pdOpen : null, pdOn: pd ? pd.classList.contains("on") : false,
    idx: document.getElementById("idxP").classList.contains("on"), pdx: document.getElementById("pdxP").classList.contains("on"),
    lbl: document.querySelector("#bFlip .lb").textContent, flipDis: document.getElementById("bFlip").disabled, cnt: document.getElementById("cnt").textContent, hash: location.hash };
});
async function idle(p, max) { const t0 = Date.now(); for (;;) { const s = await S(p); if (!s.busy && !s.anim) return s; if (Date.now() - t0 > (max || 4000)) return s; await sleep(80) } }
async function key(p, k, wait) { await p.keyboard.press(k); await sleep(wait == null ? 650 : wait); return await idle(p) }

(async () => {
  const b = await launch();
  const p = await newPage(b, {}, "principal");
  await p.goto(file, { waitUntil: "load" }); await p.evaluate(() => document.fonts && document.fonts.ready); await sleep(1200);
  let s = await S(p); ok("carga: abre no slide 1", s.cur === 1 && s.cnt === "1 / 20", s);
  const N = await p.evaluate(() => DECK.slides.length); ok("20 slides", N === 20, N);
  const CAPS = await p.evaluate(() => Object.keys(typeof CAPITULOS !== "undefined" ? CAPITULOS : {}).map(Number).sort((a, b) => a - b));

  /* ---------- A · caminhada → de 1 a 20 ---------- */
  const seen = {}, chapSeen = [], steps = {}, panesSeen = {}; let presses = 0, last = null;
  while (presses < 400) {
    s = await S(p);
    seen[s.cur] = true; if (s.pane != null) (panesSeen[s.cur] = panesSeen[s.cur] || new Set()).add(s.pane);
    if (s.chap && !chapSeen.includes(s.cur)) chapSeen.push(s.cur);
    if (s.cur === 20 && last && last.cur === 20 && !s.chap && JSON.stringify(s) === JSON.stringify(last)) break;  /* → não muda mais nada: fim */
    const before = s; last = s;
    s = await key(p, "ArrowRight", 520); presses++;
    if (!s.chap && s.cur === before.cur && s.pane === before.pane && !before.chap) steps[s.cur] = (steps[s.cur] || 0) + 1;
  }
  ok("→ percorre os 20 slides", Object.keys(seen).length === 20, Object.keys(seen).join(","));
  ok("→ mostra as divisórias de capítulo nos slides certos", JSON.stringify(chapSeen) === JSON.stringify(CAPS), { vistas: chapSeen, esperado: CAPS });
  ok("→ passa pelas duas vistas dos slides com data-panes", [7, 10, 11, 12, 13, 14, 15, 16, 17].every(n => panesSeen[n] && panesSeen[n].size === 2), Object.fromEntries(Object.entries(panesSeen).map(([k, v]) => [k, [...v]])));
  ok("→ consome os passos internos (STEP) antes de trocar de slide", Object.keys(steps).length > 0, steps);
  ok("→ termina no 20 sem erro (teclas: " + presses + ")", s.cur === 20, s);
  /* ← de volta ao 1 */
  const seenB = {}, panesB = {}; let pb = 0; last = null;
  while (pb < 400) {
    s = await S(p); seenB[s.cur] = true; if (s.pane != null) (panesB[s.cur] = panesB[s.cur] || new Set()).add(s.pane);
    if (s.cur === 1 && last && last.cur === 1 && JSON.stringify(s) === JSON.stringify(last)) break; last = s;
    s = await key(p, "ArrowLeft", 420); pb++;
  }
  ok("← volta do 20 ao 1 passando por todos", Object.keys(seenB).length === 20 && s.cur === 1, { slides: Object.keys(seenB).length, teclas: pb });
  ok("← entra nos slides de duas vistas pela última vista e passa pelas duas", [7, 10, 11, 12, 13, 14, 15, 16, 17].every(n => panesB[n] && panesB[n].size === 2), Object.fromEntries(Object.entries(panesB).map(([k, v]) => [k, [...v]])));
  ok("← não mostra divisória (só para a frente)", !s.chap, s);
  /* espaço, PageDown/PageUp, Home/End */
  s = await key(p, "End", 700); ok("End vai ao 20", s.cur === 20, s);
  s = await key(p, "Home", 700); ok("Home vai ao 1", s.cur === 1, s);
  s = await key(p, " ", 700); ok("espaço avança", s.cur === 2, s);
  s = await key(p, "PageDown", 1300); if (s.chap) s = await key(p, "ArrowRight", 600); ok("PageDown avança (com divisória da Parte 1)", s.cur === 3, s);
  s = await key(p, "PageUp", 700); ok("PageUp volta", s.cur === 2, s);

  /* ---------- B · índice (G) ---------- */
  s = await key(p, "g", 400); ok("G abre o índice", s.idx, s);
  const ix = await p.evaluate(() => ({ grupos: [...document.querySelectorAll("#idxP .xg")].map(e => e.textContent), itens: document.querySelectorAll("#idxP .xi").length, cur: (document.querySelector("#idxP .xi.cur b") || {}).textContent }));
  ok("índice: 20 itens agrupados por parte (Abertura + Partes 1–5), atual marcado", ix.itens === 20 && ix.grupos.length === 6 && ix.cur === "02", ix);
  if (shotDir) await p.screenshot({ path: path.join(shotDir, "f3_nav_indice.png") });
  s = await key(p, "Escape", 400); ok("Esc fecha o índice", !s.idx && s.cur === 2, s);
  await p.click("#cnt"); await sleep(300); s = await S(p); ok("clique em n / 20 abre o índice", s.idx, s);
  await p.evaluate(() => [...document.querySelectorAll("#idxP .xi")][14].click()); s = await idle(p); await sleep(400); s = await S(p);
  ok("item do índice navega (15) e fecha o painel, sem divisória", s.cur === 15 && !s.idx && !s.chap, s);
  await p.keyboard.press("g"); await sleep(250); await p.mouse.click(400, 300); await sleep(300); s = await S(p); ok("clique fora fecha o índice", !s.idx, s);

  /* ---------- C · abas de capítulo ---------- */
  const tabs = await p.evaluate(() => [...document.querySelectorAll("#dots button")].map(b => b.textContent.trim()));
  ok("7 abas: ABERTURA · PARTIDA · MERCADO · POSIÇÃO · PORTFÓLIO · PILARES · EXECUÇÃO", tabs.join("|").toUpperCase() === "ABERTURA|PARTIDA|MERCADO|POSIÇÃO|PORTFÓLIO|PILARES|EXECUÇÃO", tabs);
  const firsts = [1, 3, 5, 7, 8, 10, 18]; const tabRes = [];
  for (let t = 0; t < 7; t++) {
    await p.evaluate(t => document.querySelectorAll("#dots button")[t].click(), t); await sleep(700); s = await idle(p);
    if (s.chap) { s = await key(p, "ArrowRight", 600) }
    const st = await p.evaluate(t => { const bs = [...document.querySelectorAll("#dots button")]; return { on: bs.map(b => b.classList.contains("on") ? 1 : 0).join(""), aria: bs[t].getAttribute("aria-current"), f: bs[t].querySelector("i").style.getPropertyValue("--f") } }, t);
    tabRes.push({ aba: t + 1, slide: s.cur, ...st });
  }
  ok("cada aba leva ao primeiro slide do capítulo e acende só ela", tabRes.every((r, t) => r.slide === firsts[t] && r.on === "0000000".split("").map((x, k) => k === t ? 1 : 0).join("") && r.aria === "step"), tabRes);
  await p.evaluate(() => DECK.slide(13)); await sleep(500);
  const bar = await p.evaluate(() => [...document.querySelectorAll("#dots button")].map(b => b.querySelector("i").style.getPropertyValue("--f")));
  ok("barrinha de progresso das abas (slide 13: abas anteriores 100 %, PILARES parcial)", bar.slice(0, 5).every(x => x === "100%") && bar[5] === "50%" && bar[6] === "0%", bar);

  /* ---------- D · fichas (P) ---------- */
  await p.evaluate(() => DECK.slide(4)); await sleep(500);
  s = await key(p, "p", 400); ok("P abre o painel de fichas", s.pdx, s);
  const px = await p.evaluate(() => ({ grupos: [...document.querySelectorAll("#pdxP .xg")].map(e => e.textContent), itens: document.querySelectorAll("#pdxP .xi").length }));
  ok("painel: 24 fichas em 4 pilares", px.itens === 24 && px.grupos.length === 4, px);
  if (shotDir) await p.screenshot({ path: path.join(shotDir, "f3_nav_fichas_painel.png") });
  await p.evaluate(() => [...document.querySelectorAll("#pdxP .xi")][0].click()); await sleep(700); s = await S(p);
  ok("item do painel abre a ficha 1.1 (#p=, contador 'Ficha 1 / 24', botão Virar desligado)", s.pd === "tech-ai-value-diagnostic" && s.pdOn && /#p=tech-ai-value-diagnostic/.test(s.hash) && s.cnt === "Ficha 1 / 24" && s.flipDis, s);
  const lbls = await p.evaluate(() => [document.querySelector("#bPrev .lb").textContent, document.querySelector("#bNext .lb").textContent]);
  ok("botões de baixo viram 'Ficha anterior' / 'Próxima ficha'", lbls[0] === "Ficha anterior" && lbls[1] === "Próxima ficha", lbls);
  s = await key(p, "ArrowRight", 500); const id2 = s.pd; s = await key(p, "ArrowLeft", 500);
  ok("→ e ← navegam entre fichas", id2 && id2 !== "tech-ai-value-diagnostic" && s.pd === "tech-ai-value-diagnostic", { id2, volta: s.pd });
  s = await key(p, "ArrowLeft", 500); const wrap = s.pd; ok("← na primeira ficha vai à última (24)", s.cnt === "Ficha 24 / 24", { wrap, cnt: s.cnt });
  s = await key(p, "Escape", 500); ok("Esc fecha a ficha e volta ao slide 4", !s.pd && !s.pdOn && s.cur === 4 && s.hash === "#4" && !s.flipDis, s);
  await p.evaluate(() => DECK.slide(9)); await sleep(700);
  const card = await p.$(".slide.active [data-pd]");
  if (card) { await card.click(); await sleep(700); s = await S(p); ok("clique numa carta do one-page abre a ficha", !!s.pd, s) } else ok("one-page tem cartas [data-pd]", false);
  await p.evaluate(() => [...document.querySelectorAll("#pd .pd-nav button")].find(b => /Voltar/.test(b.textContent)).click()); await sleep(500); s = await S(p);
  ok("botão '✕ Voltar' da faixa fecha a ficha", !s.pd && s.cur === 9, s);
  await p.evaluate(() => DECK.slide(4)); await sleep(400); await p.evaluate(() => DECK.ficha("ai-tech-due-diligence")); await sleep(600);
  await p.evaluate(() => [...document.querySelectorAll("#pd .pd-nav button")].find(b => /One-page/.test(b.textContent)).click()); await sleep(700); s = await S(p);
  ok("botão 'One-page' da faixa fecha a ficha e vai ao slide 9", !s.pd && s.cur === 9, s);
  await p.evaluate(() => DECK.ficha("ai-tech-due-diligence")); await sleep(500);
  await p.evaluate(() => document.querySelectorAll("#dots button")[1].click()); await sleep(900); s = await idle(p); if (s.chap) s = await key(p, "ArrowRight", 500);
  ok("aba de capítulo com ficha aberta fecha a ficha e navega", !s.pd && s.cur === 3, s);

  /* ---------- E · Esc ---------- */
  await p.evaluate(() => DECK.chap(5)); await sleep(600); s = await key(p, "Escape", 600); ok("Esc fecha a divisória", !s.chap && s.cur === 5, s);
  await p.keyboard.press("p"); await sleep(300); s = await key(p, "Escape", 300); ok("Esc fecha o painel de fichas", !s.pdx, s);

  /* ---------- F · endereços ---------- */
  await p.evaluate(() => { location.hash = "#p=application-portfolio-rationalization" }); await sleep(700); s = await S(p);
  ok("hashchange #p=<id> abre a ficha", s.pd === "application-portfolio-rationalization", s);
  await p.evaluate(() => { location.hash = "#12" }); await sleep(900); s = await idle(p); ok("hashchange #12 fecha a ficha e vai ao 12", !s.pd && s.cur === 12, s);
  const fresh = async (h, tag) => { const q = await newPage(b, {}, "carga " + h); await q.goto(file + h, { waitUntil: "load" }); await q.evaluate(() => document.fonts && document.fonts.ready); await sleep(1100); const r = await S(q); return { q, r } };
  let { q, r } = await fresh("#p=tech-ai-value-diagnostic");
  ok("carga nova com #p=<id> abre a ficha (one-page por baixo)", r.pd === "tech-ai-value-diagnostic" && r.pdOn && r.cur === 9, r);
  if (shotDir) await q.screenshot({ path: path.join(shotDir, "f3_nav_deeplink_ficha.png") });
  r = await key(q, "Escape", 500); ok("… e Esc volta ao one-page (#9)", !r.pd && r.cur === 9 && r.hash === "#9", r); await q.close();
  ({ q, r } = await fresh("#p=nao-existe")); ok("carga nova com #p=<id inválido> não quebra (fica no one-page, #9)", !r.pd && r.cur === 9 && r.hash === "#9", r); await q.close();
  ({ q, r } = await fresh("#7")); ok("carga nova com #7 abre o slide 7 sem divisória", r.cur === 7 && !r.chap, r); await q.close();
  ({ q, r } = await fresh("#99")); ok("carga nova com #99 vai ao último slide", r.cur === 20, r); await q.close();

  /* ---------- G · virar a página ---------- */
  const flipCheck = async (n) => {
    await p.evaluate(n => DECK.slide(n), n); await sleep(600);
    await p.keyboard.press("v"); await sleep(330);
    const mid = await p.evaluate(() => ({ anim: document.getElementById("flip").getAnimations().length, fl3d: document.getElementById("flip").classList.contains("fl3d") }));
    await sleep(800); const st = await idle(p);
    const v = await p.evaluate(() => { const vf = document.getElementById("vface"), r = vf.getBoundingClientRect(), sr = document.getElementById("stage").getBoundingClientRect();
      return { vis: getComputedStyle(vf).display !== "none", stageHidden: getComputedStyle(document.getElementById("stage")).visibility === "hidden",
        title: (vf.querySelector(".am-title b") || {}).textContent, band: (vf.querySelector(".sr-band") || {}).textContent, foot: (vf.querySelector(".foot .n") || {}).textContent,
        same: Math.abs(r.width - sr.width) < 1 && Math.abs(r.left - sr.left) < 1 && Math.abs(r.top - sr.top) < 1, cols: vf.querySelectorAll(".v-l,.v-r").length, inertFront: document.getElementById("stage").inert } });
    const t = await p.evaluate(n => DECK.slides[n - 1].dataset.t, n);
    return { n, mid, st, v, t };
  };
  for (const n of [1, 2, 4, 9, 20]) {
    const f = await flipCheck(n);
    ok(`V vira o slide ${n} (giro 3D, verso com moldura "${f.t}", rodapé "Verso · ${n} / 20")`, f.mid.anim > 0 && f.mid.fl3d && f.st.flipped && f.st.vback && f.st.lbl === "Desvirar" && f.v.vis && f.v.stageHidden && f.v.title === f.t && /Verso · Contexto e fontes/i.test(f.v.band) && f.v.foot === `Verso · ${n} / 20` && f.v.same && f.v.cols === 2 && f.v.inertFront, f);
    if (shotDir && (n === 1 || n === 9)) await p.screenshot({ path: path.join(shotDir, `f3_nav_verso_${String(n).padStart(2, "0")}.png`) });
    s = await key(p, "v", 950); ok(`V desvira o slide ${n}`, !s.flipped && !s.vback && s.lbl === "Virar a página" && s.cur === n, s);
  }
  /* navegação desvira */
  await p.evaluate(() => DECK.slide(5)); await sleep(500); await key(p, "v", 950); s = await key(p, "ArrowRight", 700); ok("→ com a página virada vai ao 6 já de frente", s.cur === 6 && !s.flipped && !s.vback, s);
  await key(p, "v", 950); s = await key(p, "ArrowLeft", 700); ok("← com a página virada vai ao 5 já de frente", s.cur === 5 && !s.flipped, s);
  await key(p, "v", 950); await p.click("#bFlip"); await sleep(950); s = await idle(p); ok("botão 'Desvirar' desvira", !s.flipped && s.lbl === "Virar a página", s);
  await p.click("#bFlip"); await sleep(950); s = await idle(p); ok("botão 'Virar a página' vira", s.flipped && s.lbl === "Desvirar", s);
  await p.evaluate(() => document.querySelectorAll("#dots button")[6].click()); await sleep(900); s = await idle(p); if (s.chap) s = await key(p, "ArrowRight", 600);
  ok("aba com a página virada desvira e navega (18)", s.cur === 18 && !s.flipped, s);
  await key(p, "v", 950); await p.keyboard.press("g"); await sleep(300); s = await S(p); ok("G com a página virada abre o índice", s.idx, s);
  await p.evaluate(() => [...document.querySelectorAll("#idxP .xi")][2].click()); await sleep(800); s = await idle(p); ok("item do índice com a página virada desvira e navega (3)", s.cur === 3 && !s.flipped && !s.idx, s);
  await key(p, "v", 950); await p.evaluate(() => DECK.ficha("tech-spend-optimization")); await sleep(600); s = await S(p); ok("abrir ficha com a página virada desvira e desliga o botão", s.pd === "tech-spend-optimization" && !s.flipped && s.flipDis, s);
  s = await key(p, "v", 500); ok("V com ficha aberta não vira", !s.flipped, s); await key(p, "Escape", 500);
  await key(p, "v", 950); s = await key(p, "End", 800); ok("End com a página virada desvira e vai ao 20", s.cur === 20 && !s.flipped, s);
  await key(p, "v", 950); await p.evaluate(() => { location.hash = "#8" }); await sleep(900); s = await idle(p); ok("hashchange com a página virada desvira e navega (8)", s.cur === 8 && !s.flipped, s);
  await p.evaluate(() => DECK.slide(4)); await sleep(500); await key(p, "v", 950); await p.evaluate(() => DECK.chap(10)); await sleep(700); s = await S(p); ok("divisória com a página virada desvira", !s.flipped && s.chap, s);
  s = await key(p, "Escape", 600);
  /* V rápido duas vezes */
  await p.keyboard.press("v"); await sleep(120); await p.keyboard.press("v"); await sleep(1200); s = await idle(p); ok("V V rápido termina de frente, sem animação pendente", !s.flipped && !s.vback && s.anim === 0, s);

  /* ---------- H · movimento reduzido ---------- */
  const m = await newPage(b, { reducedMotion: "reduce" }, "movimento reduzido");
  await m.goto(file + "#6", { waitUntil: "load" }); await sleep(900);
  await m.keyboard.press("v"); await sleep(40);
  let rm = await m.evaluate(() => ({ flipped: DECK.flipped, vback: document.getElementById("flip").classList.contains("vback"), anim: document.getElementById("flip").getAnimations().length, fl3d: document.getElementById("flip").classList.contains("fl3d"), lbl: document.querySelector("#bFlip .lb").textContent }));
  ok("movimento reduzido: V vira na hora (sem giro)", rm.flipped && rm.vback && rm.anim === 0 && !rm.fl3d, rm);
  await m.keyboard.press("Escape"); await sleep(40);
  rm = await m.evaluate(() => ({ flipped: DECK.flipped, vback: document.getElementById("flip").classList.contains("vback"), anim: document.getElementById("flip").getAnimations().length }));
  ok("movimento reduzido: Esc desvira na hora", !rm.flipped && !rm.vback && rm.anim === 0, rm);
  await m.keyboard.press("ArrowRight"); await sleep(60);
  rm = await m.evaluate(() => ({ cur: DECK.cur + 1, chap: document.getElementById("chap").classList.contains("on"), anims: document.getAnimations().filter(a => a.playState === "running" && a.effect && a.effect.getTiming().duration > 50 && !(a.transitionProperty && /color|opacity/.test(a.transitionProperty))).map(a => (a.animationName || a.transitionProperty) + "@" + ((a.effect.target && (a.effect.target.id || a.effect.target.className)) || "")).join(" ; ") || 0 }));
  ok("movimento reduzido: → entra na Parte 3 sem barras nem animações longas", rm.cur === 7 && rm.chap && rm.anims === 0, rm);
  await m.close();

  fs.writeFileSync(outTxt, R.join("\n") + "\n" + (errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE") + "\n");
  console.log(R.join("\n")); console.log(errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE");
  console.log(`resumo: ${R.filter(x => x.startsWith("ok")).length} ok · ${R.filter(x => x.startsWith("FALHA")).length} falhas`);
  await b.close();
})();
