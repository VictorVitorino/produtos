// shot.js · capturas do deck V6 (viewport 1600×900)
// uso: node shot.js <arquivo.html> <prefixo_saida> "<itens>" [espera_ms=2500]
// itens separados por ';':
//   N            slide N (1–20)                      → <prefixo>NN.png
//   N:pane=K     slide N na vista K (1 ou 2)          → <prefixo>NN_pane2.png
//   N:step=K     slide N depois de K passos internos  → <prefixo>NN_step3.png   (→ sem sair do slide)
//   N:verso      slide N com a página virada          → <prefixo>NN_verso.png   (window.flipPage)
//   N:giro       slide N no meio do giro 3D (~300 ms) → <prefixo>NN_giro.png    (depois desvira)
//   ficha:<id>   ficha do produto <id>                → <prefixo>ficha_<id>.png
//   chap:N       divisória de capítulo do slide N     → <prefixo>chap_NN.png
//   js:<código>  executa o código na página           → <prefixo>js_<k>.png   (o código pode ter ";")
//   all          atalho para 1;2;…;20
// Exemplo: node shot.js build/fd1.html fundacao/f1_ "all;7:pane=2;chap:5;ficha:tech-ai-value-diagnostic"
// Imprime os erros de console (pageerror e console.error) com o item em que apareceram.
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
const pad = n => String(n).padStart(2, "0");
(async () => {
  const [, , file, out, list, waitArg] = process.argv;
  if (!file || !out || !list) { console.log("uso: node shot.js <arquivo.html> <prefixo_saida> \"<itens>\" [espera_ms]"); process.exit(1); }
  const wait = +(waitArg || 2500);
  let browser;
  try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  const errs = []; let where = "carga";
  page.on("pageerror", e => errs.push(`[${where}] ${e}`));
  page.on("console", m => { if (m.type() === "error") errs.push(`[${where}] ${m.text()}`); });
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  await page.goto("file://" + path.resolve(file), { waitUntil: "load" });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(900);
  /* separa só antes de um item reconhecido: o código de um item js: pode conter ";" */
  const items = list.split(/;(?=\s*(?:\d|js:|ficha:|chap:|all\b))/).map(s => s.trim()).filter(Boolean).flatMap(s => s === "all" ? Array.from({ length: 20 }, (_, i) => String(i + 1)) : [s]);
  let k = 0;
  for (const it of items) {
    k++; where = it; let name;
    if (it.startsWith("js:")) {
      await page.evaluate(it.slice(3)); name = `js_${k}`;
    } else if (it.startsWith("ficha:")) {
      const id = it.slice(6); await page.evaluate(id => window.DECK.ficha(id), id); name = `ficha_${id}`;
    } else if (it.startsWith("chap:")) {
      const n = +it.slice(5); await page.evaluate(n => window.DECK.chap(n), n); name = `chap_${pad(n)}`;
    } else {
      const [ns, opt] = it.split(":"); const n = +ns;
      await page.evaluate(n => window.DECK.slide(n), n); name = pad(n);
      if (opt && opt.startsWith("pane=")) { await page.waitForTimeout(400); const v = +opt.slice(5); await page.evaluate(v => window.DECK.pane(v - 1), v); name += `_pane${v}`; }
      else if (opt && opt.startsWith("step=")) { await page.waitForTimeout(1200); const v = +opt.slice(5); const done = await page.evaluate(v => window.DECK.step(v), v); name += `_step${v}`; if (done < v) console.log(`  aviso: ${it}: só ${done} passo(s) disponível(is)`); }
      else if (opt === "verso") { await page.waitForTimeout(500); await page.evaluate(() => window.DECK.flip(true)); name += "_verso"; }
      else if (opt === "giro") { await page.waitForTimeout(1200); await page.evaluate(() => window.DECK.flip(true)); await page.waitForTimeout(300); name += "_giro";
        const f = `${out}${name}.png`; await page.screenshot({ path: f }); console.log("ok", f); await page.waitForTimeout(900); await page.evaluate(() => window.DECK.flip(false)); await page.waitForTimeout(900); continue; }
    }
    await page.waitForTimeout(wait);
    const f = `${out}${name}.png`; await page.screenshot({ path: f }); console.log("ok", f);
  }
  console.log(errs.length ? "ERROS DE CONSOLE:\n" + errs.join("\n") : "SEM ERROS DE CONSOLE");
  await browser.close();
  process.exit(errs.length ? 2 : 0);
})();
