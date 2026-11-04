// Compara o enquadramento de duas apresentações na mesma janela: quadro, cabeçalho, faixa, corpo, rodapé, controles e trilha.
// uso: node tools/framing.js referencia.html molde.html outdir [paginaRef paginaMolde]
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [A, B, out, pa = '2', pb = '3'] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const br = await chromium.launch(); const rows = [];
  for (const [W, H] of [[1366, 768], [1600, 900], [1920, 1080]]) {
    const m = {};
    for (const [tag, f, pg] of [['ref', A, pa], ['molde', B, pb]]) {
      const p = await br.newPage({ viewport: { width: W, height: H }, reducedMotion: 'reduce' });
      await p.goto('file://' + f + '#' + pg); await p.reload(); await p.waitForTimeout(1200);
      m[tag] = await p.evaluate(() => { const R = e => { if (!e) return null; const q = e.getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map(v => +v.toFixed(2)); };
        const s = document.querySelector('.slide.active'); const c = [...document.getElementById('controls').children];
        return { stage: R(document.getElementById('stage')), top: R(s.querySelector('.sr-top')), band: R(s.querySelector('.sr-band')), body: R(s.querySelector('.body')), foot: R(s.querySelector('.foot')),
          controls: R(document.getElementById('controls')), ctlH: c.map(e => Math.round(e.getBoundingClientRect().height)), rail: R(document.getElementById('rail')), progressTop: R(document.getElementById('progress')) }; });
      await p.screenshot({ path: `${out}/${tag}-${W}x${H}.png` }); await p.close();
    }
    const diffs = [];
    for (const k of ['stage', 'top', 'band', 'body', 'foot']) { const a = m.ref[k], b = m.molde[k]; const d = a.map((v, i) => Math.abs(v - b[i])); if (Math.max(...d) > 0.5) diffs.push(`${k}: ref ${a} × molde ${b}`); }
    if (m.ref.controls[1] !== m.molde.controls[1] || m.ref.controls[3] !== m.molde.controls[3]) diffs.push(`controles: ref ${m.ref.controls} × molde ${m.molde.controls}`);
    rows.push({ janela: `${W}×${H}`, quadro: m.molde.stage, iguais: diffs.length === 0, diferencas: diffs, controlesRef: m.ref.controls, controlesMolde: m.molde.controls, trilhaRef: m.ref.rail, trilhaMolde: m.molde.rail });
  }
  await br.close(); fs.writeFileSync(`${out}/framing.json`, JSON.stringify(rows, null, 1)); console.log(JSON.stringify(rows, null, 1));
})();
