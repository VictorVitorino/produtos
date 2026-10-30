// audit.js · auditoria de layout do deck V6 (viewport 1600×900, movimento reduzido para medir o estado final)
// uso: node audit.js <arquivo.html> <pasta_saida> [fichas] [sem-versos] [offline]
// Para cada slide e cada vista (data-panes):
//   overflow  · elemento que passa da caixa do .body (ou do palco, nos slides sem moldura)
//   clipped   · texto cortado por um contêiner com overflow escondido
//   ellipsis  · texto com reticências (text-overflow: ellipsis) que de fato foi truncado
//   wraps     · rótulo curto (título, subtítulo, faixa, chip, pílula, etiqueta, título de card…) quebrado em 2+ linhas
//   bottomGap · vazio no fim do .body maior que 60 px
//   foot      · fonte do rodapé truncada
// Também: fontes efetivamente carregadas, erros e avisos de console ([verso], [fontes], [fatos], [ficha]).
// Parte 3 da fundação (verificador): letra abaixo de 11 px (SPEC 3: notas ≥ 11 px, inclui texto SVG escalado) e texto laranja
//   sobre fundo claro (marca A&M) contam como apontamento; siglas fora da lista da SPEC 5 e números com unidade (%, R$, prazo,
//   faixa, ≥, ×) fora de [data-fato] e texto corrido abaixo de 13 px (SPEC 3: corpo ≥ 13 px) aparecem como "? … a conferir"
//   (heurística: não contam como apontamento). "offline" bloqueia o Google Fonts (deck numa máquina sem internet).
// VERSO de cada slide (parte 2 da fundação; desligue com "sem-versos"): vira a página e confere se o texto cabe
// (degrau de letra usado: 15 px é o padrão), palavras do contexto (250–450), fontes listadas, fontes/fatos que não
// existem no registro (vermelho) e marcas [n] sem fonte correspondente. Com "fichas", audita também as 24 fichas.
// Saída: <pasta>/audit.json e <pasta>/audit.txt (o resumo também vai para o stdout).
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const WRAP_SEL = [".tc", ".sub", ".stmt2", ".h2", ".hd .h2", ".sr-band>span:nth-child(2)", ".sr-band small", ".am-title b", ".am-title span", ".foot b", ".foot .n",
  ".chip", ".pill", ".st", ".label", ".ttl", ".lbl", ".eye", ".eyebrow", ".legend>span", ".seg button", ".plink", ".btn-play", ".spot-cap b.tt",
  "h3", "h4", ".card h3", ".card h4", ".tl-card h4", ".tl-date", ".sowhat .k", ".kpi-t .v", ".big", ".ag-t", ".cv-s1", ".cv-s2", ".ch-chip",
  ".pf-nm", ".pf-mo", ".pf-svc span", ".pf-nl", ".pf-n", ".pf-cnt", ".pp-nm", ".sy-nm", ".tb-nm", ".jr-i b", ".pers .r", ".fm-tx b", ".fm-dt b", ".op-hd h3",
  ".svc", ".asis-chip", ".heat", ".pc-pills a", ".jg-nm", ".jg-pl", ".cs-card h3", ".anat-i", ".path3 h3", ".rx-row .nm", ".sh__name", ".sh__title",
  ".pd-nm", ".pd-lb", ".pd-chip", ".pd-jn", ".pd-kv dt", ".pd-s b", ".pd-k>b", ".vsheet h4", ".v-rh span"].join(",");

async function auditView(page, mode) {
  return await page.evaluate(([WRAP_SEL, mode]) => {
    const D = window.DECK, s = D.slides[D.cur], st = document.getElementById("stage");
    const pdEl = document.getElementById("pd"), inPd = pdEl && pdEl.classList.contains("on");
    const vf = document.getElementById("vface"), inV = mode === "verso" && vf;
    const root = inV ? vf : inPd ? pdEl : s;
    const sr = st.getBoundingClientRect(), sc = sr.width / 1600;
    const R = el => { const r = el.getBoundingClientRect(); return { l: (r.left - sr.left) / sc, t: (r.top - sr.top) / sc, r: (r.right - sr.left) / sc, b: (r.bottom - sr.top) / sc, w: r.width / sc, h: r.height / sc } };
    const visible = el => el.checkVisibility ? el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : !!el.offsetParent;
    const name = el => { const c = typeof el.className === "string" ? el.className : (el.className && el.className.baseVal) || ""; return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (c.trim() ? "." + c.trim().split(/\s+/).slice(0, 3).join(".") : "") };
    const txt = el => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90);
    const out = { overflow: [], clipped: [], ellipsis: [], wraps: [], bottomGap: null, foot: null };
    const body = [...root.querySelectorAll(":scope > .body")].find(b => visible(b));
    const bare = !body;
    let box;
    if (body) { const r = R(body), cs = getComputedStyle(body); box = { l: r.l + parseFloat(cs.borderLeftWidth), r: r.r - parseFloat(cs.borderRightWidth), t: r.t, b: r.b - parseFloat(cs.borderBottomWidth), pb: parseFloat(cs.paddingBottom) } }
    else box = { l: 0, r: 1600, t: 0, b: 900, pb: 0 };
    const scope = body || root;
    const all = [...scope.querySelectorAll("*")].filter(el => !(el instanceof SVGElement && el.tagName.toLowerCase() !== "svg"));
    /* 1 · passa da caixa */
    const reported = [];
    for (const el of all) {
      if (reported.some(p => p.contains(el))) continue;
      const cs = getComputedStyle(el); if (cs.position === "fixed" || !visible(el)) continue;
      if (el.matches(".spot,.ps__cv,.cv-floor,.ps__bg,.ps__shade,.sm-art,.ag-left,#chap *")) continue;
      const r = R(el); if (r.w < 1 || r.h < 1) continue;
      const ov = Math.max(r.b - box.b, r.r - box.r, box.l - r.l, box.t - r.t);
      if (ov > 1.5) { out.overflow.push({ el: name(el), by: Math.round(ov), text: txt(el).slice(0, 60) }); reported.push(el) }
    }
    /* 2 · texto cortado por overflow escondido · 3 · reticências */
    for (const el of all) {
      const cs = getComputedStyle(el); if (!visible(el)) continue;
      const hid = /(hidden|clip)/.test(cs.overflowX + cs.overflowY);
      if (cs.textOverflow === "ellipsis" && el.scrollWidth > el.clientWidth + 1) out.ellipsis.push({ el: name(el), text: txt(el).slice(0, 70) });
      if (!hid || el.matches(".kw,.spot-clip")) continue;
      const er = el.getBoundingClientRect(); const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n, cut = null;
      while ((n = tw.nextNode())) {
        if (!n.textContent.trim()) continue; const pe = n.parentElement; if (!pe || !visible(pe)) continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        for (const q of rg.getClientRects()) { if (q.width < 1) continue; const o = Math.max(q.bottom - er.bottom, q.right - er.right, er.left - q.left, er.top - q.top) / sc; if (o > 2) { cut = { by: Math.round(o), text: n.textContent.trim().slice(0, 50) }; break } }
        if (cut) break;
      }
      if (cut && !out.clipped.some(c => c.text === cut.text)) out.clipped.push({ el: name(el), ...cut });
    }
    /* 4 · rótulos curtos quebrados */
    /* linhas = grupos de caixas de texto que se sobrepõem na vertical (um ponto ou número menor na mesma linha não conta como linha nova) */
    const lines = el => { const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const cl = []; let n;
      while ((n = tw.nextNode())) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n);
        for (const q of rg.getClientRects()) { if (q.width < 2 || q.height < 4) continue; const c = cl.find(c => Math.min(c.b, q.bottom) - Math.max(c.t, q.top) > .4 * Math.min(c.b - c.t, q.height));
          if (c) { c.t = Math.min(c.t, q.top); c.b = Math.max(c.b, q.bottom) } else cl.push({ t: q.top, b: q.bottom }) } }
      return cl.length };
    const wrapRoot = root;
    for (const el of wrapRoot.querySelectorAll(WRAP_SEL)) {
      if (!visible(el)) continue; const t = txt(el); if (!t || t.length > 90) continue;
      const n = lines(el); if (n >= 2) out.wraps.push({ el: name(el), lines: n, text: t.slice(0, 70) });
    }
    /* 5 · vazio no fim do corpo */
    if (body) {
      let maxB = box.t;
      for (const el of all) {
        if (!visible(el)) continue; const cs = getComputedStyle(el); if (cs.position === "fixed") continue;
        const r = R(el); if (r.w < 1 || r.h < 1) continue;
        const painted = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()) || /^(img|svg|canvas|video|input|button)$/i.test(el.tagName)
          || (cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) || cs.backgroundImage !== "none" || parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) > 0;
        if (painted) maxB = Math.max(maxB, Math.min(r.b, box.b));
      }
      out.bottomGap = Math.round(box.b - box.pb - maxB);
    }
    /* 6 · rodapé */
    const fs_ = root.querySelector(":scope > .foot .s");
    if (fs_ && visible(fs_) && fs_.scrollWidth > fs_.clientWidth + 1) out.foot = "fonte do rodapé truncada: " + txt(fs_).slice(0, 80);
    /* 7 · SPEC 3 e marca A&M: letra abaixo de 11 px (notas ≥ 11 px) e texto laranja sobre fundo claro ("nunca laranja como texto sobre branco") */
    const rgb = s => { const m = String(s || "").match(/rgba?\(([^)]+)\)/); if (!m) return null; const a = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return { r: a[0], g: a[1], b: a[2], a: a.length > 3 ? a[3] : 1 } };
    const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4) }; return .2126 * f(c.r) + .7152 * f(c.g) + .0722 * f(c.b) };
    const bgOf = el => { for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); const c = rgb(cs.backgroundColor); if (c && c.a > .5) return c;
        if (/gradient/.test(cs.backgroundImage || "")) { const g = rgb(cs.backgroundImage); if (g && !(g.a === 0)) return g } } return { r: 245, g: 248, b: 251, a: 1 } };
    const isOrange = c => c && c.a > .5 && c.r >= 170 && c.g >= 80 && c.g <= 190 && c.b <= 110 && c.r - c.b >= 120 && c.r - c.g >= 45;
    out.small = []; out.orange = []; out.siglas = []; out.nums = [];
    const SKIPC = ".foot,.v-src,.pd-fon,.src-note,.srcx,.pd-fn,.sr-top,.sr-dec,.pd-k small,[data-fato],.ref-miss,.pd-kp,[data-ui]";
    const seenS = new Set(), seenO = new Set();
    { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) { const t = n.textContent.trim(), el = n.parentElement; if (!t || !el || !/[\p{L}\d]/u.test(t) || !visible(el)) continue;
        const cs = getComputedStyle(el), svg = el instanceof SVGElement; let fsz = parseFloat(cs.fontSize);
        if (svg && el.getScreenCTM) { const m = el.getScreenCTM(); if (m) fsz = fsz * Math.hypot(m.a, m.b) / sc }
        const k = name(el) + "|" + fsz.toFixed(1);
        if (fsz < 10.95 && !seenS.has(k)) { seenS.add(k); out.small.push({ el: name(el), fs: +fsz.toFixed(1), text: t.slice(0, 40) }) }
        const col = rgb(svg ? cs.fill : cs.color);
        if (isOrange(col) && lum(bgOf(el)) > .6 && !seenO.has(name(el))) { seenO.add(name(el)); out.orange.push({ el: name(el), text: t.slice(0, 40) }) } } }
    /* 8 · SPEC 4 e 5 (heurística, "a conferir"): siglas fora da lista e números com unidade fora do registro */
    const ALLOW = new Set(["TI", "IA", "A&M", "DTS", "CEO", "CFO", "CIO", "CTO", "ERP", "M&A", "RH", "SAP", "LGPD", "EY", "KPMG", "BCG", "IBM", "AWS", "IDC", "PwC", "DNA"]);
    const addN = x => (String(x || "").match(/[A-Z][A-Z0-9&]+/g) || []).forEach(w => ALLOW.add(w));
    (typeof PILLARS !== "undefined" ? PILLARS : []).forEach(p => addN(p.name)); (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).forEach(p => addN(p.name));
    const ROMAN = /^(I{1,3}|IV|V|VI{0,3}|IX|X{1,3})$/;
    const NUMRE = [/[−–-]?\d+(?:[.,]\d+)?\s?%/g, /(?:R\$|US\$|€|£)\s?\d+(?:[.,]\d+)?(?:\s?(?:mil|mi|bi|tri)\b)?/g, /[≥≤<>]\s?\d+(?:[.,]\d+)?/g, /\b\d+(?:[.,]\d+)?\s?[x×](?![\p{L}])/gu,
      /\b\d+(?:\s?[–-]\s?\d+)?\s?(?:sem\.|semanas?|dias?|meses|mês|anos?|horas?)(?![\p{L}])/gu, /\b(?!20\d\d)\d{1,3}\s?[–-]\s?\d{1,3}\b(?!\s?\/)/g, /\b\d+(?:[.,]\d+)?\s?(?:mil|mi|bi|milhões|bilhões|trilhões)\b/g];
    const scope2 = inV ? (vf.querySelector(".v-ctx") || vf) : root;
    { const tw = document.createTreeWalker(scope2, NodeFilter.SHOW_TEXT); let n; const sg = new Set(), nm = new Set();
      while ((n = tw.nextNode())) { const t = n.textContent, el = n.parentElement; if (!t.trim() || !el || el.closest(SKIPC) || !visible(el)) continue;
        if (/\p{Ll}/u.test(t)) (t.match(/(?<![\p{L}\d&])[A-Z][A-Z0-9&]*[A-Z0-9](?![\p{L}\d&])/gu) || []).forEach(w => { if (w.length <= 7 && /[A-Z].*[A-Z]/.test(w) && !ALLOW.has(w) && !ROMAN.test(w) && !sg.has(w)) { sg.add(w); out.siglas.push(w) } });
        NUMRE.forEach(re => (t.match(re) || []).forEach(m => { const x = m.trim(); if (!nm.has(x)) { nm.add(x); out.nums.push(x) } })) }
      out.nums = out.nums.filter(x => !out.nums.some(y => y !== x && y.includes(x))) }
    /* 9 · SPEC 3 (heurística, "a conferir"): trecho de texto corrido (≥ 60 caracteres) abaixo de 13 px fora das notas, fontes e rótulos */
    out.body12 = []; { const NOTE = ".foot,.src-note,.srcx,.pd-fn,small,.v-src,.pd-ev,.pd-fon,.pd-k small,.sr-top,.sr-band,[data-ui],.legend,.chip,.pill,.st,.plink,.eye,.lbl,.label,.ttl"; const seenB = new Set();
      (inV ? vf : root).querySelectorAll("p,li,dd,td,span,div").forEach(el => { if (el.closest(NOTE) || !visible(el)) return; const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").trim(), all = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (own.length < 20 || all.length < 60) return; const fz = parseFloat(getComputedStyle(el).fontSize); const k = name(el) + fz; if (fz < 12.95 && !seenB.has(k)) { seenB.add(k); out.body12.push({ el: name(el), fs: fz, text: all.slice(0, 40) }) } }) }
    out.bare = bare; out.title = inV ? "verso · " + (s.dataset.t || "") : inPd ? "ficha" : (s.dataset.t || "");
    if (inV) { /* verso: degrau usado, palavras, fontes, marcas [n] e itens em vermelho */
      const ctx = vf.querySelector(".v-ctx"), L = vf.querySelector(".v-l"), Rr = vf.querySelector(".v-r");
      const words = ctx ? [...ctx.querySelectorAll("p,li")].map(e => e.textContent).join(" ").split(/\s+/).filter(w => /[\p{L}\d]/u.test(w)).length : 0;
      const nsrc = vf.querySelectorAll(".v-src > li").length;
      const refs = [...vf.querySelectorAll(".v-ref")].flatMap(a => (a.dataset.r || "").split(",").map(Number)).filter(n => n > nsrc);
      const fit = window.VERSO && VERSO.FIT[D.keyOf(s)] || {};
      out.verso = { words, nsrc, refsSemFonte: [...new Set(refs)], misses: [...vf.querySelectorAll(".ref-miss")].map(e => e.textContent.trim()), am: !!vf.querySelector(".v-amb"),
        fonte: getComputedStyle(L || vf).getPropertyValue("--vf").trim() || "15px", over: !!fit.over, vazio: /Em construção|Verso em preparação/.test(ctx ? ctx.textContent : "") };
    }
    return out;
  }, [WRAP_SEL, mode]);
}

(async () => {
  const [, , file, outdir, opt] = process.argv;
  if (!file || !outdir) { console.log("uso: node audit.js <arquivo.html> <pasta_saida> [fichas]"); process.exit(1); }
  fs.mkdirSync(outdir, { recursive: true });
  let browser; try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const errs = [], warns = []; let where = "carga";
  page.on("pageerror", e => errs.push(`[${where}] ${e}`)); page.on("console", m => { if (m.type() === "error" && !(process.argv.slice(4).includes("offline") && /Failed to load resource/.test(m.text()))) errs.push(`[${where}] ${m.text()}`); if (m.type() === "warning") warns.push(m.text()) });
  /* "offline": bloqueia o Google Fonts para auditar o deck como numa máquina sem internet (Barlow embutida; Inter cai para Helvetica/Arial) */
  if (process.argv.slice(4).includes("offline")) await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto("file://" + path.resolve(file), { waitUntil: "load" });
  await page.evaluate(() => document.fonts && document.fonts.ready); await page.waitForTimeout(1500);
  const N = await page.evaluate(() => window.DECK.slides.length);
  const views = [];
  for (let n = 1; n <= N; n++) {
    where = `slide ${n}`; await page.evaluate(n => window.DECK.slide(n), n); await page.waitForTimeout(900);
    const panes = await page.evaluate(() => { const s = window.DECK.slides[window.DECK.cur]; return s.querySelectorAll(":scope > .body.pane").length || 1 });
    for (let k = 1; k <= panes; k++) {
      if (panes > 1) { where = `slide ${n} vista ${k}`; await page.evaluate(k => window.DECK.pane(k - 1), k); await page.waitForTimeout(700) }
      const r = await auditView(page); views.push({ slide: String(n).padStart(2, "0"), pane: panes > 1 ? k : null, ...r });
    }
    if (process.argv.slice(4).includes("sem-versos")) continue;
    where = `slide ${n} verso`; const ok = await page.evaluate(() => { window.DECK.flip(true); return window.DECK.flipped }); await page.waitForTimeout(500);
    if (ok) { const r = await auditView(page, "verso"); views.push({ slide: String(n).padStart(2, "0"), pane: "verso", ...r }); await page.evaluate(() => window.DECK.flip(false)); await page.waitForTimeout(200) }
  }
  if (process.argv.slice(4).includes("fichas")) {
    const ids = await page.evaluate(() => (typeof PRODUCTS !== "undefined" ? PRODUCTS.map(p => p.id) : []));
    for (const id of ids) { where = `ficha ${id}`; await page.evaluate(id => window.DECK.ficha(id), id); await page.waitForTimeout(700); const r = await auditView(page); views.push({ slide: "ficha:" + id, pane: null, ...r }) }
    await page.evaluate(() => { if (typeof closePD === "function") closePD(true) });
  }
  const fonts = await page.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === "loaded").map(f => `${f.family.replace(/"/g, "")} ${f.weight}${f.style !== "normal" ? " " + f.style : ""}`))].sort());
  const probes = await page.evaluate(() => ["700 28px 'Barlow Condensed'", "700 28px 'Barlow Condensed Embed'", "600 14px Inter", "500 12px 'JetBrains Mono'"].map(f => [f, document.fonts.check(f)]));
  const report = { file: path.resolve(file), date: new Date().toISOString(), fonts, fontChecks: probes, consoleErrors: errs, consoleWarnings: [...new Set(warns)], views };
  fs.writeFileSync(path.join(outdir, "audit.json"), JSON.stringify(report, null, 1));
  const L = []; L.push(`AUDITORIA · ${path.basename(file)} · ${views.length} vistas`);
  L.push(`Fontes carregadas: ${fonts.join(" · ") || "(nenhuma)"}`);
  L.push(`Checagem de fontes: ${probes.map(([f, ok]) => `${f} ${ok ? "ok" : "FALTA"}`).join(" · ")}`);
  L.push(`Erros de console: ${errs.length ? "\n  " + errs.join("\n  ") : "nenhum"}`);
  const uw = [...new Set(warns)]; L.push(`Avisos de console: ${uw.length ? uw.length + "\n  " + uw.slice(0, 40).join("\n  ") + (uw.length > 40 ? `\n  … +${uw.length - 40}` : "") : "nenhum"}`);
  let issues = 0, avisos = 0;
  for (const v of views) {
    const tag = `${v.slide}${v.pane === "verso" ? "/verso" : v.pane ? "/v" + v.pane : ""} ${v.title}`; const P = [];
    if (v.verso) { const w = v.verso;
      if (w.vazio) P.push("verso ainda em construção");
      else { if (w.words < 250 || w.words > 450) P.push(`verso com ${w.words} palavras (meta 250–450)`); if (!w.nsrc) P.push("verso sem fontes"); if (!w.am) P.push("verso sem a frase do AM (.v-am)") }
      if (w.over) P.push("o texto do verso não cabe nem no menor degrau");
      if (w.misses.length) P.push(`fonte/fato fora do registro: ${w.misses.join("; ")}`);
      if (w.refsSemFonte.length) P.push(`marcas sem fonte na lista: [${w.refsSemFonte.join("], [")}]`); }
    if (v.overflow.length) P.push(`passa do corpo: ${v.overflow.slice(0, 6).map(o => `${o.el} (+${o.by}px${o.text ? ` «${o.text}»` : ""})`).join("; ")}${v.overflow.length > 6 ? ` … +${v.overflow.length - 6}` : ""}`);
    if (v.clipped.length) P.push(`texto cortado: ${v.clipped.slice(0, 5).map(o => `${o.el} «${o.text}» (${o.by}px)`).join("; ")}${v.clipped.length > 5 ? ` … +${v.clipped.length - 5}` : ""}`);
    if (v.ellipsis.length) P.push(`reticências: ${v.ellipsis.slice(0, 5).map(o => `${o.el} «${o.text}»`).join("; ")}${v.ellipsis.length > 5 ? ` … +${v.ellipsis.length - 5}` : ""}`);
    if (v.wraps.length) P.push(`quebra de linha: ${v.wraps.slice(0, 6).map(o => `${o.el} (${o.lines}) «${o.text}»`).join("; ")}${v.wraps.length > 6 ? ` … +${v.wraps.length - 6}` : ""}`);
    if (!v.verso && v.bottomGap != null && v.bottomGap > 60) P.push(`vazio no fim do corpo: ${v.bottomGap}px`);
    if (v.foot) P.push(v.foot);
    if (v.small && v.small.length) P.push(`letra abaixo de 11 px (SPEC 3): ${v.small.slice(0, 5).map(o => `${o.el} ${o.fs}px «${o.text}»`).join("; ")}${v.small.length > 5 ? ` … +${v.small.length - 5}` : ""}`);
    if (v.orange && v.orange.length) P.push(`texto laranja sobre fundo claro (marca A&M): ${v.orange.slice(0, 4).map(o => `${o.el} «${o.text}»`).join("; ")}${v.orange.length > 4 ? ` … +${v.orange.length - 4}` : ""}`);
    const A = []; if (!(v.verso && v.verso.vazio)) {
      if (v.siglas && v.siglas.length) A.push(`siglas fora da lista (SPEC 5): ${v.siglas.slice(0, 12).join(", ")}${v.siglas.length > 12 ? ` … +${v.siglas.length - 12}` : ""}`);
      if (v.body12 && v.body12.length) A.push(`texto corrido abaixo de 13 px (SPEC 3: corpo ≥ 13 px): ${v.body12.slice(0, 4).map(o => `${o.el} ${o.fs}px «${o.text}»`).join("; ")}${v.body12.length > 4 ? ` … +${v.body12.length - 4}` : ""}`);
      if (v.nums && v.nums.length) A.push(`números com unidade fora do registro (SPEC 4): ${v.nums.slice(0, 10).join(" · ")}${v.nums.length > 10 ? ` … +${v.nums.length - 10}` : ""}`) }
    avisos += A.length;
    const vinfo = v.verso ? ` · ${v.verso.words} palavras · ${v.verso.nsrc} fontes · texto ${v.verso.fonte}` : "";
    issues += P.length; L.push(`${P.length ? "✗" : "✓"} ${tag}${v.verso ? vinfo : v.bottomGap != null ? ` · vazio ${v.bottomGap}px` : ""}`); P.forEach(p => L.push("    · " + p)); A.forEach(a => L.push("    ? " + a + " · a conferir"));
  }
  L.push(`Total de apontamentos: ${issues}`);
  L.push(`Avisos de conteúdo a conferir (siglas e números, heurística · SPEC 4 e 5; não contam como apontamento): ${avisos}`);
  fs.writeFileSync(path.join(outdir, "audit.txt"), L.join("\n") + "\n"); console.log(L.join("\n"));
  await browser.close();
})();
