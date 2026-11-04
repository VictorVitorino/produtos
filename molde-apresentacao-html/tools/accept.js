// Teste de aceite do molde: geometria, conteúdo dentro da área útil e comportamentos.
// uso: node tools/accept.js dist/<deck>.html [outdir] [--shots] [--only 3,4,5]
// Sai com JSON (resumo + falhas). --shots grava um PNG por página a 1600×900 em outdir.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const file = path.resolve(process.argv[2]);
const outdir = path.resolve(process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : path.join(path.dirname(file), 'accept'));
const SHOTS = process.argv.includes('--shots');
const onlyArg = process.argv.indexOf('--only');
const ONLY = onlyArg > 0 ? process.argv[onlyArg + 1].split(',').map(Number) : null;
fs.mkdirSync(outdir, { recursive: true });

const TOL = 1.01; // px de tolerância (coordenadas do quadro 1600×900)
const fails = [], warns = [], info = {};
const fail = (k, m) => fails.push(`[${k}] ${m}`);
const warn = (k, m) => warns.push(`[${k}] ${m}`);
const near = (a, b, t = TOL) => Math.abs(a - b) <= t;

(async () => {
  const browser = await chromium.launch();

  // ------------------------------------------------------------------ 1. geometria por resolução
  for (const [W, H] of [[1366, 768], [1600, 900], [1920, 1080], [1000, 700], [700, 560]]) {
    const tag = `${W}x${H}`;
    const p = await browser.newPage({ viewport: { width: W, height: H }, reducedMotion: 'reduce' });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto('file://' + file + '#2'); await p.waitForTimeout(900);
    const g = await p.evaluate(() => {
      const st = document.getElementById('stage'), r = st.getBoundingClientRect(), sc = r.width / 1600;
      const cs = getComputedStyle(st);
      const rel = el => { if (!el) return null; const q = el.getBoundingClientRect(); return { l: (q.left - r.left) / sc, t: (q.top - r.top) / sc, r: (r.right - q.right) / sc, b: (r.bottom - q.bottom) / sc, w: q.width / sc, h: q.height / sc }; };
      const s = document.querySelector('.slide.active');
      const ctl = document.getElementById('controls'), rail = document.getElementById('rail');
      const btns = [...ctl.children].filter(e => getComputedStyle(e).display !== 'none').map(e => e.getBoundingClientRect());
      const gaps = btns.slice(1).map((q, i) => +(q.left - btns[i].right).toFixed(1));
      const cr = ctl.getBoundingClientRect(), rr = rail && rail.getBoundingClientRect();
      return {
        sc, W: innerWidth, H: innerHeight, stage: { l: r.left, t: r.top, w: r.width, h: r.height, radius: cs.borderTopLeftRadius, overflow: cs.overflow },
        top: rel(s.querySelector('.sr-top')), topRadius: s.querySelector('.sr-top') && getComputedStyle(s.querySelector('.sr-top')).borderRadius,
        band: rel(s.querySelector('.sr-band')), bandRadius: s.querySelector('.sr-band') && getComputedStyle(s.querySelector('.sr-band')).borderRadius,
        body: rel(s.querySelector('.body')), bodyRadius: s.querySelector('.body') && getComputedStyle(s.querySelector('.body')).borderRadius,
        bodyPad: s.querySelector('.body') && getComputedStyle(s.querySelector('.body')).padding,
        foot: rel(s.querySelector('.foot')),
        ctl: { right: innerWidth - cr.right, bottom: innerHeight - cr.bottom, h: btns.map(q => Math.round(q.height)), gaps },
        rail: rail && getComputedStyle(rail).display !== 'none' ? { left: rr.left, bottom: innerHeight - rr.bottom, right: rr.right } : null,
        scroll: { x: document.documentElement.scrollWidth - innerWidth, y: document.documentElement.scrollHeight - innerHeight, bodyOverflow: getComputedStyle(document.body).overflow },
      };
    });
    info[tag] = g;
    // escala e enquadramento (mesma fórmula da fit())
    const compact = W < 760, pad = compact ? 6 : 10, bar = compact ? 54 : 62;
    const sc = Math.min((W - pad * 2) / 1600, (H - pad - bar) / 900);
    if (!near(g.sc, sc, 0.002)) fail(tag, `escala ${g.sc.toFixed(4)} ≠ fit() ${sc.toFixed(4)}`);
    if (!near(g.stage.w / g.stage.h, 16 / 9, 0.01)) fail(tag, `proporção ${(g.stage.w / g.stage.h).toFixed(4)} ≠ 16:9`);
    if (!near(g.stage.l + g.stage.w / 2, W / 2, 1)) fail(tag, 'quadro não centralizado na horizontal');
    if (!near(g.stage.t + g.stage.h / 2, pad + (H - pad - bar) / 2, 1)) fail(tag, 'quadro não centralizado na área acima da navegação');
    if (g.stage.radius !== '14px') fail(tag, `raio do quadro ${g.stage.radius}`);
    if (g.stage.overflow !== 'hidden') fail(tag, `overflow do quadro ${g.stage.overflow}`);
    // chrome (em px do quadro)
    const T = g.top, B = g.band, Bo = g.body, F = g.foot;
    if (!T || !near(T.l, 12) || !near(T.r, 12) || !near(T.t, 16) || !near(T.h, 80)) fail(tag, `cabeçalho ${JSON.stringify(T)}`);
    if (g.topRadius !== '14px') fail(tag, `raio do cabeçalho ${g.topRadius}`);
    if (!B || !near(B.l, 12) || !near(B.r, 12) || !near(B.t, 106) || !near(B.h, 50)) fail(tag, `faixa ${JSON.stringify(B)}`);
    if (g.bandRadius !== '14px 14px 0px 0px') fail(tag, `raio da faixa ${g.bandRadius}`);
    if (!Bo || !near(Bo.l, 12) || !near(Bo.r, 12) || !near(Bo.t, 156) || !near(Bo.b, 40)) fail(tag, `corpo ${JSON.stringify(Bo)}`);
    if (g.bodyRadius !== '0px 0px 14px 14px') fail(tag, `raio do corpo ${g.bodyRadius}`);
    if (!/^12px 16px/.test(g.bodyPad || '')) fail(tag, `padding do corpo ${g.bodyPad}`);
    if (!F || !near(F.l, 32) || !near(F.r, 32) || !near(F.b, 11)) fail(tag, `rodapé ${JSON.stringify(F)}`);
    // controles
    const hExp = compact ? 36 : 40;
    if (g.ctl.h.some(h => h !== hExp)) fail(tag, `altura dos controles ${g.ctl.h} (esperado ${hExp})`);
    if (g.ctl.gaps.some(x => !near(x, 8, 1))) fail(tag, `distância entre controles ${g.ctl.gaps}`);
    if (!compact && (!near(g.ctl.right, 22, 1) || !near(g.ctl.bottom, 12, 1))) fail(tag, `grupo de controles right ${g.ctl.right} bottom ${g.ctl.bottom}`);
    if (W < 1100 && g.rail) fail(tag, 'trilha visível abaixo de 1100 px');
    if (W >= 1100) {
      if (!g.rail) fail(tag, 'trilha ausente');
      else {
        if (!near(g.rail.left, 22, 1) || !near(g.rail.bottom, 12, 1)) fail(tag, `trilha left ${g.rail.left} bottom ${g.rail.bottom}`);
        const ctlLeft = W - g.ctl.right - 0; // borda direita do grupo
        const cl = await p.evaluate(() => document.getElementById('controls').getBoundingClientRect().left);
        if (g.rail.right > cl - 4) fail(tag, `trilha (até ${Math.round(g.rail.right)}) invade os controles (de ${Math.round(cl)})`);
      }
    }
    if (g.scroll.x > 0 || g.scroll.y > 0) fail(tag, `rolagem na página principal ${JSON.stringify(g.scroll)}`);
    // o quadro não invade a navegação
    const navTop = await p.evaluate(() => Math.min(...[...document.getElementById('controls').children].map(e => e.getBoundingClientRect().top)));
    if (g.stage.t + g.stage.h > navTop + 0.5) fail(tag, `quadro (até ${Math.round(g.stage.t + g.stage.h)}) invade a navegação (${Math.round(navTop)})`);
    if (errs.length) fail(tag, 'erros no console: ' + errs.slice(0, 3).join(' | '));
    await p.close();
  }

  // ------------------------------------------------------------------ 2. páginas: conteúdo dentro da área útil
  const p = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + file + '#1'); await p.waitForTimeout(800);
  const N = await p.evaluate(() => document.querySelectorAll('.slide').length);
  info.N = N;
  const pages = [];
  for (let n = 1; n <= N; n++) {
    if (ONLY && !ONLY.includes(n)) continue;
    await p.goto('file://' + file + '#' + n); await p.reload(); await p.waitForTimeout(1300);
    const r = await p.evaluate(() => {
      const st = document.getElementById('stage'), R = st.getBoundingClientRect(), sc = R.width / 1600;
      const s = document.querySelector('.slide.active');
      const out = { t: s.dataset.t, p: s.dataset.p || '', issues: [] };
      const box = el => { const q = el.getBoundingClientRect(); return { l: (q.left - R.left) / sc, t: (q.top - R.top) / sc, r: (q.right - R.left) / sc, b: (q.bottom - R.top) / sc, w: q.width / sc, h: q.height / sc }; };
      const vis = el => { const c = getComputedStyle(el); return c.display !== 'none' && c.visibility !== 'hidden' && +c.opacity > 0.02; };
      const name = el => (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' «' + (el.textContent || '').trim().slice(0, 40) + '»';
      // faixa: título cabe e não encosta no subtítulo
      const band = s.querySelector('.sr-band');
      if (band) {
        const bt = band.querySelector('.bt'), sm = band.querySelector('small'), bb = box(band);
        if (bt) { const q = box(bt); if (q.r > bb.r - 20) out.issues.push(`faixa: título passa da faixa (${Math.round(q.r)} > ${Math.round(bb.r - 20)})`); if (sm) { const m = box(sm); if (q.r > m.l - 12) out.issues.push(`faixa: título encosta no subtítulo (${Math.round(q.r)} vs ${Math.round(m.l)})`); } if (bt.scrollHeight > band.clientHeight) out.issues.push('faixa: título quebra linha'); }
      }
      const tt = s.querySelector('.am-title b'); if (tt) { const q = box(tt), rt = s.querySelector('.am-right'); if (rt && q.r > box(rt).l - 10) out.issues.push('cabeçalho: título encosta no grupo da direita'); }
      const body = s.querySelector('.body') || s, B = box(body);
      const limitB = s.querySelector('.body') ? B.b + 0.5 : 900 - 30;
      // elementos fora da área útil / texto cortado
      let k = 0;
      body.querySelectorAll('*').forEach(el => {
        if (k > 25 || !vis(el) || el.closest('svg') && el.tagName !== 'svg' || el.closest('[data-ok-overflow]')) return;
        const q = box(el); if (q.w < 1 || q.h < 1) return;
        const hasText = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
        if (!s.querySelector('.body') && !hasText) return; // capa: camadas de fundo ocupam o quadro inteiro de propósito
        if (q.b > limitB + 1 || q.r > (s.querySelector('.body') ? B.r : 1600) + 1 || q.l < (s.querySelector('.body') ? B.l : 0) - 1 || q.t < (s.querySelector('.body') ? B.t : 0) - 1) {
          // só reporta se o ancestral com overflow:hidden não recorta (ou seja, se aparece)
          let clipped = false; for (let a = el.parentElement; a && a !== body; a = a.parentElement) { const c = getComputedStyle(a); if (c.overflow !== 'visible') { const qa = box(a); if (q.b <= qa.b + 1 && q.r <= qa.r + 1) clipped = true; else { clipped = 'hidden'; } break; } }
          if (clipped !== true) { out.issues.push(`fora da área útil: ${name(el)} [${Math.round(q.l)},${Math.round(q.t)}–${Math.round(q.r)},${Math.round(q.b)}]` + (clipped === 'hidden' ? ' (recortado: texto pode estar cortado)' : '')); k++; }
        }
        if (hasText) {
          const c = getComputedStyle(el);
          if ((c.overflow !== 'visible' || c.textOverflow === 'ellipsis') && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2)) { out.issues.push(`texto cortado: ${name(el)} (${el.scrollWidth}×${el.scrollHeight} em ${el.clientWidth}×${el.clientHeight})`); k++; }
          const fs = parseFloat(c.fontSize); if (fs < 10) { out.small = (out.small || 0) + 1; }
        }
      });
      // rodapé: fonte cabe (reticências são do original, mas avisamos)
      const fs = s.querySelector('.foot .s'); if (fs && fs.scrollWidth > fs.clientWidth + 1) out.footEllipsis = true;
      out.desc = !!(s.dataset.desc || (window.DECK.desc || {})[s.dataset.t]);
      return out;
    });
    pages.push(Object.assign({ n }, r));
    r.issues.forEach(m => fail('p' + n, m));
    if (!r.desc) warn('p' + n, '“Sobre este slide” usa a descrição padrão (sem texto específico)');
    if (r.footEllipsis) warn('p' + n, 'fonte do rodapé cortada com reticências (texto completo só na dica)');
    if (SHOTS) await p.screenshot({ path: `${outdir}/p-${String(n).padStart(2, '0')}.png` });
  }
  info.pages = pages.map(x => ({ n: x.n, t: x.t, p: x.p, small: x.small || 0 }));

  // ------------------------------------------------------------------ 3. comportamentos
  if (!ONLY) {
    await p.goto('file://' + file + '#1'); await p.reload(); await p.waitForTimeout(700);
    const st = () => p.evaluate(() => ({ cur: +document.getElementById('cnt').textContent.split('/')[0], cnt: document.getElementById('cnt').textContent.trim(), prev: document.getElementById('bPrev').disabled, next: document.getElementById('bNext').disabled, hash: location.hash, prog: document.getElementById('progress').style.width, about: document.getElementById('infoP').classList.contains('on'), idx: document.getElementById('idxP').classList.contains('on'), fz: !!document.querySelector('#fzm.on'), chap: document.getElementById('chap').classList.contains('on') }));
    let s = await st();
    if (s.cur !== 1 || !s.prev || s.next) fail('nav', `página inicial: ${JSON.stringify(s)}`);
    if (s.cnt !== `1 / ${N}`) fail('nav', `contador ${s.cnt}`);
    await p.click('#bNext'); await p.waitForTimeout(400); s = await st();
    if (s.cur !== 2 || s.hash !== '#2') fail('nav', `Avançar: ${JSON.stringify(s)}`);
    if (Math.abs(parseFloat(s.prog) - 2 / N * 100) > 0.6) fail('nav', `progresso ${s.prog}`);
    await p.click('#bPrev'); await p.waitForTimeout(400); s = await st(); if (s.cur !== 1) fail('nav', 'Voltar não voltou');
    for (const [key, exp] of [['ArrowRight', 2], ['PageDown', 3], [' ', 4], ['ArrowLeft', 3], ['PageUp', 2], ['End', N], ['Home', 1]]) {
      await p.keyboard.press(key === ' ' ? 'Space' : key); await p.waitForTimeout(350); s = await st();
      if (s.cur !== exp) fail('teclas', `${key} → ${s.cur} (esperado ${exp})`);
    }
    await p.keyboard.press('End'); await p.waitForTimeout(350); s = await st(); if (!s.next || s.prev) fail('nav', 'na última página Avançar deveria estar desabilitado');
    await p.keyboard.press('Home'); await p.waitForTimeout(350);
    // índice
    await p.click('#cnt'); await p.waitForTimeout(250); s = await st(); if (!s.idx) fail('índice', 'clique no contador não abriu o índice');
    const ix = await p.evaluate(() => ({ groups: [...document.querySelectorAll('#idxP .xg')].map(e => e.textContent), items: document.querySelectorAll('#idxP .xi').length, cur: [...document.querySelectorAll('#idxP .xi')].findIndex(e => e.classList.contains('cur')), w: document.getElementById('idxP').getBoundingClientRect().width, radius: getComputedStyle(document.getElementById('idxP')).borderRadius }));
    info.index = ix;
    if (ix.items !== N) fail('índice', `itens ${ix.items} ≠ ${N}`);
    if (ix.cur !== 0) fail('índice', 'página atual não destacada');
    if (!near(ix.w, 400, 1)) fail('índice', `largura ${ix.w}`); if (ix.radius !== '12px') fail('índice', `raio ${ix.radius}`);
    const target = Math.min(N, 4);
    await p.click(`#idxP .xi >> nth=${target - 1}`); await p.waitForTimeout(500); s = await st();
    if (s.cur !== target || s.idx) fail('índice', `navegação direta foi para ${s.cur}`);
    await p.keyboard.press('g'); await p.waitForTimeout(200); s = await st(); if (!s.idx) fail('índice', 'tecla G não abriu');
    await p.keyboard.press('Escape'); await p.waitForTimeout(200); s = await st(); if (s.idx) fail('índice', 'Esc não fechou');
    // sobre este slide
    await p.click('#bInfo'); await p.waitForTimeout(250);
    const ab = await p.evaluate(() => ({ on: document.getElementById('infoP').classList.contains('on'), t: document.querySelector('#infoP .it').textContent, d: document.querySelector('#infoP .id').textContent, w: document.getElementById('infoP').getBoundingClientRect().width, radius: getComputedStyle(document.getElementById('infoP')).borderRadius, cur: document.querySelector('.slide.active').dataset.t }));
    if (!ab.on || ab.t !== ab.cur || !ab.d) fail('sobre', JSON.stringify(ab));
    if (!near(ab.w, 440, 1)) fail('sobre', `largura ${ab.w}`); if (ab.radius !== '12px') fail('sobre', `raio ${ab.radius}`);
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400);
    const ab2 = await p.evaluate(() => ({ t: document.querySelector('#infoP .it').textContent, cur: document.querySelector('.slide.active').dataset.t }));
    if (ab2.t !== ab2.cur) fail('sobre', 'painel não acompanha a página atual');
    await p.keyboard.press('i'); await p.waitForTimeout(200); s = await st(); if (s.about) fail('sobre', 'tecla I não fechou');
    // ampliação
    const zoomIds = await p.evaluate(() => (window.DECK.zoom || []).filter(id => document.getElementById(id)));
    info.zoom = zoomIds;
    for (const id of zoomIds) {
      const n = await p.evaluate(id => [...document.querySelectorAll('.slide')].indexOf(document.getElementById(id).closest('.slide')) + 1, id);
      await p.goto('file://' + file + '#' + n); await p.reload(); await p.waitForTimeout(900);
      await p.dblclick('#' + id, { force: true }); await p.waitForTimeout(400); s = await st();
      if (!s.fz) { fail('ampliação', `#${id} (p${n}): duplo clique não abriu`); continue; }
      const bx = await p.evaluate(() => { const b = document.querySelector('#fzm .box'), st = document.getElementById('stage').getBoundingClientRect(), sc = st.width / 1600, q = b.getBoundingClientRect(); return { w: q.width / sc, h: q.height / sc, radius: getComputedStyle(b).borderRadius, inside: q.left >= st.left - 1 && q.right <= st.right + 1 && q.top >= st.top - 1 && q.bottom <= st.bottom + 1 }; });
      if (bx.w > 1541 || bx.h > 851 || !bx.inside || bx.radius !== '16px') fail('ampliação', `#${id}: caixa ${JSON.stringify(bx)}`);
      await p.keyboard.press('Escape'); await p.waitForTimeout(250); s = await st(); if (s.fz) fail('ampliação', `#${id}: Esc não fechou`);
      await p.dblclick('#' + id, { force: true }); await p.waitForTimeout(350);
      { const pt = await p.evaluate(() => { const o = document.getElementById('fzm').getBoundingClientRect(), b = document.querySelector('#fzm .box').getBoundingClientRect(); return b.top - o.top > 8 ? { x: o.left + o.width / 2, y: o.top + 4 } : { x: o.left + 4, y: o.top + o.height / 2 }; }); await p.mouse.click(pt.x, pt.y); }
      await p.waitForTimeout(250); s = await st(); if (s.fz) fail('ampliação', `#${id}: clique fora (na área escurecida) não fechou`);
      await p.dblclick('#' + id, { force: true }); await p.waitForTimeout(350);
      await p.click('#fzm .cl'); await p.waitForTimeout(250); s = await st(); if (s.fz) fail('ampliação', `#${id}: botão × não fechou`);
      // ícone de ampliar aparece ao passar o mouse
      await p.hover('#' + id, { force: true }); await p.waitForTimeout(250);
      const op = await p.evaluate(() => getComputedStyle(document.querySelector('.fzb')).opacity);
      if (+op < 0.5) fail('ampliação', `#${id}: ícone ⤢ não aparece no hover`);
    }
    // trilha
    const rl = await p.evaluate(() => [...document.querySelectorAll('#rail .seg2')].map(d => d.title));
    info.rail = rl;
    if (rl.length) {
      await p.goto('file://' + file + '#1'); await p.reload(); await p.waitForTimeout(600);
      const k = Math.min(2, rl.length - 1); const first = +rl[k].match(/(\d+)–/)[1];
      await p.click(`#rail .seg2 >> nth=${k}`); await p.waitForTimeout(600);
      for (let i = 0; i < 6; i++) { if (await p.evaluate(() => document.getElementById('chap').classList.contains('on'))) { await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500); } }
      s = await st(); if (s.cur !== first) fail('trilha', `segmento ${k} foi para ${s.cur} (esperado ${first})`);
    }
    // endereço #n
    await p.goto('file://' + file + '#' + Math.min(N, 5)); await p.reload(); await p.waitForTimeout(600); s = await st();
    if (s.cur !== Math.min(N, 5)) fail('hash', `abrir #${Math.min(N, 5)} levou a ${s.cur}`);
  }
  // transição animada (sem movimento reduzido): capítulo + wipe sem erros
  const q = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const e2 = []; q.on('pageerror', e => e2.push(e.message));
  await q.goto('file://' + file + '#1'); await q.waitForTimeout(800);
  for (let i = 0; i < Math.min(N - 1, 6); i++) { await q.keyboard.press('ArrowRight'); await q.waitForTimeout(1300); }
  if (e2.length) fail('animação', e2.slice(0, 3).join(' | '));
  if (errs.length) fail('console', errs.slice(0, 5).join(' | '));
  await browser.close();
  const res = { file, N, ok: fails.length === 0, fails, warns, info };
  fs.writeFileSync(path.join(outdir, 'accept.json'), JSON.stringify(res, null, 1));
  console.log(JSON.stringify({ N, ok: res.ok, fails: fails.length, warns: warns.length }, null, 0));
  fails.slice(0, 60).forEach(f => console.log('FALHA ' + f));
  warns.slice(0, 15).forEach(f => console.log('aviso ' + f));
})();
