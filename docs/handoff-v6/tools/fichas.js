// fichas.js · verificação das 24 fichas e da tolerância a campos novos (SPEC 10.2) e antigos (V5)
// uso: node fichas.js <deck.html> <saida.txt> [pasta_capturas]
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const [, , deck, outTxt, shotDir] = process.argv;
const R = [], errs = [], warns = [];
const N = s => String(s || "").replace(/\s+/g, " ").trim(); /* normaliza espaços (inclui o não separável que os textos ganham) */
const ok = (n, c, x) => { R.push(`${c ? "ok   " : "FALHA"} ${n}${x !== undefined ? " · " + (typeof x === "string" ? x : JSON.stringify(x)) : ""}`); return c };
(async () => {
  let b; try { b = await chromium.launch() } catch (e) { b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }) }
  const p = await b.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  p.on("pageerror", e => errs.push(String(e))); p.on("console", m => { if (m.type() === "error") errs.push(m.text()); if (m.type() === "warning") warns.push(m.text()) });
  await p.goto("file://" + path.resolve(deck), { waitUntil: "load" }); await p.evaluate(() => document.fonts && document.fonts.ready); await p.waitForTimeout(2500);
  /* ---- as 24 fichas atuais ---- */
  const all = await p.evaluate(async () => {
    const out = []; const sleep = ms => new Promise(r => setTimeout(r, ms));
    for (const P of PRODUCTS) {
      DECK.ficha(P.id); await sleep(120);
      const pd = document.getElementById("pd"), body = pd.querySelector(".pd-body"), wrap = pd.querySelector(".pd-wrap");
      const st = document.getElementById("stage").getBoundingClientRect(), sc = st.width / 1600;
      /* texto cortado: qualquer nó de texto visível fora da caixa de um ancestral com overflow escondido */
      let cut = 0; const hid = [...pd.querySelectorAll("*")].filter(e => /(hidden|clip)/.test(getComputedStyle(e).overflowX + getComputedStyle(e).overflowY) && !e.matches(".pd-art"));
      for (const h of hid) { const hr = h.getBoundingClientRect(); const tw = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); let n;
        while ((n = tw.nextNode())) { if (!n.textContent.trim() || !n.parentElement.checkVisibility()) continue; const rg = document.createRange(); rg.selectNodeContents(n);
          for (const q of rg.getClientRects()) if (q.width > 1 && (q.bottom - hr.bottom > 2 * sc || q.right - hr.right > 2 * sc)) { cut++; break } } }
      const nm = pd.querySelector(".pd-nm"), nmLines = nm ? Math.round(nm.getBoundingClientRect().height / (parseFloat(getComputedStyle(nm).lineHeight) * sc)) : 0;
      out.push({ id: P.id, code: P.code, on: pd.classList.contains("on"), lv: [...wrap.classList].find(c => /^lv\d$/.test(c)), over: pdOverflow(pd), scroll: body.scrollHeight > body.clientHeight + 1 || pd.scrollHeight > pd.clientHeight + 1,
        cut, nmLines, band: pd.querySelector(".sr-band span:nth-child(2)").textContent, top: pd.querySelector(".am-title b").textContent, foot: pd.querySelector(".foot .n").textContent,
        steps: [...pd.querySelectorAll(".pd-s b em")].map(e => e.textContent).join(""), stepsBad: [...pd.querySelectorAll(".pd-s b")].some(e => /S\d|M\d|D\d/.test(e.textContent)),
        get: pd.querySelectorAll(".pd-g").length, jogo: !!pd.querySelector(".pd-jogo"), fontes: pd.querySelectorAll(".pd-fon li").length + (pd.querySelector(".pd-fon .pd-ev") ? 1 : 0), ev: /class="(ev|hy)"/.test(pd.innerHTML) || /\[E ·|\[E\]|\[H\]/.test(pd.textContent) });
    }
    closePD(true); return { out, level: PDX.st.level, over: PDX.st.over };
  });
  const bad = all.out.filter(f => !f.on || f.over || f.scroll || f.cut || f.nmLines > 1 || f.stepsBad || f.ev);
  ok(`24 fichas abrem (${all.out.length})`, all.out.length === 24 && all.out.every(f => f.on), all.out.filter(f => !f.on).map(f => f.code));
  ok(`todas no mesmo degrau de densidade (${all.level}) e nenhuma fora (PDX.st.over vazio)`, new Set(all.out.map(f => f.lv)).size === 1 && !all.over.length, { niveis: [...new Set(all.out.map(f => f.lv))], over: all.over });
  ok("nenhuma passa do corpo, rola, corta texto, quebra o nome, mostra rótulo de prazo (S1–2) ou marca E/H", !bad.length, bad.map(f => ({ code: f.code, over: f.over, scroll: f.scroll, cut: f.cut, nm: f.nmLines, stepsBad: f.stepsBad, ev: f.ev })));
  ok("faixa 'Ficha N.N · Nome', cabeçalho 'Ficha de produto N.N', rodapé 'Ficha n / 24'", all.out.every((f, i) => f.band.startsWith(`Ficha ${f.code} · `) && f.top === `Ficha de produto ${f.code}` && f.foot === `Ficha ${i + 1} / 24`), all.out.slice(0, 2).map(f => [f.band, f.top, f.foot]));
  ok("etapas numeradas pela posição (1, 2, 3…)", all.out.every(f => f.steps === "12345678".slice(0, f.steps.length)), all.out.map(f => f.steps).slice(0, 6));
  ok("todas têm jogo de entrada e a caixa Fontes preenchida (lista do registro ou a nota ev)", all.out.every(f => f.jogo && f.fontes > 0), all.out.filter(f => !f.jogo || !f.fontes).map(f => f.code));

  /* ---- tolerância: produto no formato NOVO (SPEC 10.2), com JOGOS presente ---- */
  const novo = await p.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const fid = Object.keys(FATOS).find(k => FATOS[k].status === "verificado" && FATOS[k].num), fon = Object.keys(FONTES).filter(k => FONTES[k].url).slice(0, 2);
    const fidBad = Object.keys(FATOS).find(k => FATOS[k].status !== "verificado");
    const created = typeof JOGOS === "undefined"; if (created) window.JOGOS = { "mesa-do-conselho": { nome: "Mesa do Conselho", pilar: 1, promessa: "Executivos escolhem investimentos com orçamento limitado e descobrem onde a TI gera valor.", passos: ["a", "b", "c"], quem: "x", leva: "y", produtos: ["1.1", "1.5", "1.7"], fontes: [] } };
    const backup = PRODUCTS[0];
    PRODUCTS[0] = { id: backup.id, code: "1.1", pillar: 1, st: "ai", sig: true, name: "Tech & AI Value Diagnostic", from: "Tech Maturity & Value Assessment + C-Level Tech Enablement",
      tagline: "Onde a tecnologia devolve valor e onde não devolve, numa linha concreta.", pitch: "Diagnóstico de escopo fechado que termina numa lista de decisões com dono, para o conselho e o CFO.",
      meta: ["Formato: diagnóstico de escopo fechado", "Comprador: CEO, CFO e conselho", "Modelo comercial: preço fixo, calibrado no piloto", "Encaixe: porta de entrada para 1.2 e 1.5"],
      kpis: [["", "", fid], ["99%", "fato que não está verificado", fidBad || "nao-existe"]],
      who: ["CEO e CFO que questionam o retorno da tecnologia", "CIO recém-chegado", "Conselhos"], pain: ["A TI custa caro e não se compara com o mercado", "Pilotos de IA sem retorno medido"],
      deliv: ["Mapa de valor por alavanca", "Lista de decisões com dono", "Índice de prontidão para IA", "Painel comparativo"], skills: ["Finanças de TI", "Arquitetura", "IA aplicada", "Facilitação executiva"],
      steps: [["1", "Coleta", "IA lê contratos, faturas e inventários"], ["2", "Entrevistas", "conversas curtas com os executivos"], ["3", "Comparação", "referências de mercado"], ["4", "Decisões", "oficina com o comitê"]],
      tools: "Ambiente de diagnóstico da DTS e modelo de IA generativa em ambiente seguro", data: "Contratos, faturas e inventário de aplicações", ai: ["Lê e classifica documentos", "Gera o rascunho do relatório"], prodz: ["Escopo fechado", "Kit replicável"],
      bench: "As grandes firmas vendem avaliação de maturidade; a A&M entrega decisão com dono, com o olhar de operador.", jogo: "mesa-do-conselho", fontes: fon, ev: "Prazo e preço calibrados no piloto (proposta DTS)." };
    pdMeasureAll(true); DECK.ficha(backup.id); await sleep(150);
    const pd = document.getElementById("pd");
    const r = { fid, fidBad, fon, sig: !!pd.querySelector(".st.sig"), st: (pd.querySelector(".pd-tags .st") || {}).textContent, kp: [...pd.querySelectorAll(".pd-k")].map(k => k.textContent.replace(/\s+/g, " ").trim()),
      jogo: (pd.querySelector(".pd-jogo p") || {}).textContent, prom: (typeof JOGOS !== "undefined" && JOGOS["mesa-do-conselho"] || {}).promessa || "", fontes: [...pd.querySelectorAll(".pd-fon li")].map(l => ({ t: l.textContent.trim(), href: (l.querySelector("a") || {}).href || "", tgt: (l.querySelector("a") || {}).target || "" })),
      ev: (pd.querySelector(".pd-ev") || {}).textContent, from: (pd.querySelector(".pd-from dd") || {}).textContent, meta: [...pd.querySelectorAll(".pd-kv>div:not(.pd-who):not(.pd-from) dt")].map(d => d.textContent),
      steps: [...pd.querySelectorAll(".pd-s b")].map(e => e.textContent), over: pdOverflow(pd), level: PDX.st.level };
    PRODUCTS[0] = backup; if (created) delete window.JOGOS; pdMeasureAll(true); closePD(true); return r;
  });
  if (shotDir) { /* captura da ficha no formato novo */ }
  ok("formato novo: ★ A&M Signature e etiqueta 'Aprimorar com IA'", novo.sig && /Aprimorar com IA/.test(novo.st), { sig: novo.sig, st: novo.st });
  ok("formato novo: kpi com id de FATOS verificado aparece com a fonte; fato não verificado é omitido", novo.kp.length === 1 && /Fonte|\(|\d{4}/.test(novo.kp[0]), novo.kp);
  ok("formato novo: jogo de entrada com nome e promessa de JOGOS", N(novo.jogo).includes("Mesa do Conselho") && !!N(novo.prom) && N(novo.jogo).includes(N(novo.prom)), { jogo: novo.jogo, promessa: novo.prom });
  ok("formato novo: fontes do registro com link ↗ em nova aba (+ fonte do fato do kpi)", novo.fontes.length >= 2 && novo.fontes.filter(f => f.href).every(f => /^https?:/.test(f.href) && f.tgt === "_blank"), novo.fontes);
  ok("formato novo: nota ev, origem 'Evolui de A + B', meta Chave: valor, etapas sem prazo", /calibrados no piloto/.test(novo.ev || "") && /Evolui de Tech Maturity/.test(novo.from || "") && novo.meta.join("|") === "Formato|Comprador|Modelo comercial|Encaixe" && novo.steps.every(s => !/sem\.|S\d/.test(s)), { ev: novo.ev, from: novo.from, meta: novo.meta, steps: novo.steps });
  ok("formato novo: cabe no corpo", !novo.over, { level: novo.level });

  /* ---- tolerância: formato ANTIGO (V5) e campos ausentes ---- */
  const velho = await p.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const backup = PRODUCTS[1];
    PRODUCTS[1] = { id: backup.id, code: backup.code, pillar: 1, st: "new", name: "Produto Antigo de Teste", from: "Novo · produto com IA",
      tagline: `Em 3 semanas ${'<span class="ev" title="Evidência com fonte">E · Gartner 2025</span>'}`, pitch: `Texto com ${'<span class="hy" title="Hipótese">H</span>'} marca [E · PwC 2026] e [H].`,
      meta: ["Preço fixo por porte", "Duração: 3 semanas"], kpis: [["40%", "texto com fonte antiga [E · Gartner (jun/2025)]"], ["3 sem.", "sem fonte nenhuma"]],
      who: ["Quem compra"], pain: ["Dor principal sem ponto final"], deliv: ["Entrega 1", "Entrega 2"], steps: [["S1–2", "Coleta", "o que acontece"], ["M1", "Ciclo", "x"], ["Mensal", "Revisão", "y"]],
      tools: "Ferramenta", data: "Dados", ai: ["IA"], prodz: ["Produto"], bench: "Mercado" /* sem sig, jogo, fontes, skills, ev */ };
    DECK.ficha(backup.id); await sleep(150);
    const pd = document.getElementById("pd");
    const r = { txt: pd.querySelector(".pd-card").textContent.replace(/\s+/g, " "), fn: [...pd.querySelectorAll(".pd-fn")].map(e => e.textContent), kp: [...pd.querySelectorAll(".pd-k")].map(k => k.textContent.replace(/\s+/g, " ").trim()),
      steps: [...pd.querySelectorAll(".pd-s b")].map(e => e.textContent.replace(/\s+/g, " ").trim()), from: (pd.querySelector(".pd-from dd") || {}).textContent, jogo: (pd.querySelector(".pd-jogo .pd-jn") || {}).textContent,
      fontes: [...pd.querySelectorAll(".pd-fon li")].map(l => l.textContent.trim()), skills: pd.querySelectorAll(".pd-chip").length, meta: [...pd.querySelectorAll(".pd-kv>div:not(.pd-who):not(.pd-from)")].map(d => d.textContent.replace(/\s+/g, " ").trim()),
      marks: /\[E ·|\[E\]|\[H\]|class="(ev|hy)"/.test(pd.innerHTML), over: pdOverflow(pd) };
    PRODUCTS[1] = backup; closePD(true); return r;
  });
  ok("formato antigo: E()/Hy() e [E · …]/[H] viram '(fonte: …)' ou somem", !velho.marks && velho.fn.some(t => /fonte: Gartner 2025/.test(t)) && velho.fn.some(t => /fonte: PwC 2026/.test(t)), { fn: velho.fn });
  ok("formato antigo: kpi de 2 elementos só com marca de fonte; número sem fonte omitido", velho.kp.length === 1 && /40%/.test(velho.kp[0]) && /Gartner/.test(velho.kp[0]), velho.kp);
  ok("formato antigo: etapas S1–2/M1 sem prazo (número = posição) e palavra 'Mensal' vira etiqueta", velho.steps[0].startsWith("1Coleta") && velho.steps[1].startsWith("2Ciclo") && /Revisão.*Mensal/.test(velho.steps[2]), velho.steps);
  ok("formato antigo: sem sig/jogo/fontes/skills não quebra (jogo do pilar, fontes internas, 'Produto novo com IA')", N(velho.jogo) === "Mesa do Conselho" && velho.fontes.length >= 1 && /Produto novo com IA/.test(velho.from || "") && !velho.over, { jogo: velho.jogo, fontes: velho.fontes, from: velho.from, over: velho.over });
  ok("formato antigo: meta sem chave entra em 'Formato'", velho.meta.some(m => /^Formato\s*Preço fixo por porte/.test(m)), velho.meta);
  if (shotDir) { await p.evaluate(() => DECK.ficha(PRODUCTS[12].id)); await p.waitForTimeout(400); await p.screenshot({ path: path.join(shotDir, "f3_ficha_" + (await p.evaluate(() => PRODUCTS[12].code)).replace(".", "_") + ".png") }); }
  const unexpected = warns.filter(w => !/^\[ficha\] \d\.\d: número sem fato/.test(w) && !/\[fatos\]|\[verso\]/.test(w)
    && !(novo.fidBad && w.startsWith(`[ficha] 1.1: fato ${novo.fidBad} `))); /* o fato não verificado que o teste do formato novo injeta de propósito */
  fs.writeFileSync(outTxt, R.join("\n") + "\n" + (errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE") + "\navisos de console (fora os de número omitido): " + JSON.stringify([...new Set(unexpected)]) + "\n");
  console.log(R.join("\n")); console.log(errs.length ? "ERROS DE CONSOLE:\n  " + errs.join("\n  ") : "SEM ERROS DE CONSOLE"); console.log("avisos (fora número omitido): " + JSON.stringify([...new Set(unexpected)]));
  console.log(`resumo: ${R.filter(x => x.startsWith("ok")).length} ok · ${R.filter(x => x.startsWith("FALHA")).length} falhas`);
  await b.close();
})();
