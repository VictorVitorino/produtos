// pdf.js · PDF do deck V6 pelo caminho de impressão (DECK.print() = buildPrint)
// uso: node pdf.js <arquivo.html> <saida.pdf> [--sem-fontes-leves] [--ordem]
// Ordem das páginas (fundação, parte 2): para cada slide, a frente (vista 1 + demais vistas), logo depois o VERSO
// (contexto e fontes), depois as páginas extras de detalhe criadas pelos ganchos PRINT; no fim, as 24 fichas.
// Por padrão injeta Inter e JetBrains Mono estáticas (scratchpad/fonts/pdf-fonts.css) para um PDF menor;
// a Barlow Condensed já vai embutida no próprio HTML. Imprime o total de páginas, a contagem por tipo
// (frentes, vistas, versos, extras, fichas), a sequência (com --ordem) e os erros e avisos de console.
// Parte 3: confere também as fontes embutidas (pdffonts) e páginas em branco (pdfcheck.py → <saida>_check/folha.png).
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path"), fs = require("fs");
(async () => {
  const args = process.argv.slice(2), flags = args.filter(a => a.startsWith("--")), [file, out] = args.filter(a => !a.startsWith("--"));
  if (!file || !out) { console.log("uso: node pdf.js <arquivo.html> <saida.pdf> [--sem-fontes-leves] [--ordem]"); process.exit(1); }
  let browser; try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errs = [], warns = []; page.on("pageerror", e => errs.push(String(e))); page.on("console", m => { if (m.type() === "error") errs.push(m.text()); if (m.type() === "warning") warns.push(m.text()) });
  await page.goto("file://" + path.resolve(file), { waitUntil: "load" });
  await page.waitForTimeout(1200);
  const lite = path.join(__dirname, "..", "..", "fonts", "pdf-fonts.css");
  if (!flags.includes("--sem-fontes-leves") && fs.existsSync(lite)) await page.addStyleTag({ content: fs.readFileSync(lite, "utf8") });
  await page.evaluate(() => document.fonts && document.fonts.ready); await page.waitForTimeout(800);
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => window.DECK.print()); await page.waitForTimeout(1500);
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  await page.pdf({ path: out, width: "1600px", height: "900px", printBackground: true, preferCSSPageSize: true });
  const info = await page.$$eval("#stage > section", xs => xs.map(s => s.classList.contains("pd-print") ? "ficha" : s.classList.contains("vpage") ? "V" + s.dataset.vfor
    : s.classList.contains("pane-view") ? "v" + s.dataset.s : s.classList.contains("pane-print") ? "x" + (s.dataset.s || "") : "F" + (s.dataset.s || "")));
  const n = k => info.filter(x => x.startsWith(k)).length;
  const fichas = info.filter(x => x === "ficha").length;
  console.log(`ok ${out} · ${info.length} páginas · ${(fs.statSync(out).size / 1048576).toFixed(1)} MB`);
  console.log(`  frentes ${n("F")} · vistas extras ${n("v")} · versos ${n("V")} · páginas de detalhe ${n("x")} · fichas ${fichas}`);
  /* conferência da ordem: cada verso logo depois da frente (e das vistas) do mesmo slide */
  const bad = []; info.forEach((x, i) => { if (x[0] !== "V") return; const nn = x.slice(1); let j = i - 1; while (j >= 0 && info[j] === "v" + nn) j--; if (info[j] !== "F" + nn) bad.push(x) });
  console.log(bad.length ? `  ORDEM: verso fora do lugar: ${bad.join(", ")}` : "  ordem: cada verso vem logo depois da sua frente");
  if (flags.includes("--ordem")) console.log("  sequência: " + info.map(x => x === "ficha" ? "f" : x).join(" "));
  /* parte 3 da fundação: fontes embutidas (pdffonts) e páginas em branco (pdfcheck.py, que também gera <saida>_check/folha.png) */
  const { spawnSync } = require("child_process");
  const pf = spawnSync("pdffonts", [out], { encoding: "utf8" });
  if (pf.status === 0) { const rows = pf.stdout.split("\n").slice(2).filter(r => r.trim()); const ne = rows.filter(r => { const c = r.trim().split(/\s+/); return c[c.length - 5] !== "yes" });
    console.log(ne.length ? `  FONTES NÃO EMBUTIDAS (${ne.length}):\n    ` + ne.join("\n    ") : `  fontes: todas embutidas (${new Set(rows.map(r => r.trim().split(/\s+/)[0].replace(/^[A-Z]{6}\+/, ""))).size} fontes)`) }
  else console.log("  (pdffonts indisponível: fontes embutidas não conferidas)");
  const chk = path.join(path.dirname(path.resolve(out)), path.basename(out, ".pdf") + "_check");
  const pc = spawnSync("python3", ["-I", path.join(__dirname, "pdfcheck.py"), out, chk, info.map(x => x === "ficha" ? "f" : x).join(" ")], { encoding: "utf8" });
  if (pc.status === 0) { const bl = (pc.stdout.match(/páginas em branco ou quase: (.*)/) || [])[1] || "?"; console.log(bl === "nenhuma" ? `  páginas em branco: nenhuma · folha de contato: ${chk}/folha.png` : `  PÁGINAS EM BRANCO OU QUASE: ${bl}`) }
  else console.log("  (pdfcheck.py não rodou: páginas em branco não conferidas) " + (pc.stderr || "").split("\n").slice(-2).join(" "));
  console.log(warns.length ? "AVISOS:\n  " + [...new Set(warns)].join("\n  ") : "sem avisos");
  console.log(errs.length ? "ERROS DE CONSOLE:\n" + errs.join("\n") : "SEM ERROS DE CONSOLE");
  await browser.close();
})();
