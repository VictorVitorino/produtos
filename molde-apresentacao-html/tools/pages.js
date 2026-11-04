// Lista as páginas de uma apresentação montada: número, seção (data-p), data-t e slide de origem no PPTX.
// uso: node tools/pages.js dist/<deck>.html
const fs = require('fs'); const s = fs.readFileSync(process.argv[2], 'utf8');
let n = 0; for (const m of s.matchAll(/<section class="slide[^"]*"([^>]*)>/g)) { n++; const a = m[1];
  const g = k => (a.match(new RegExp(k + '="([^"]*)"')) || [])[1] || '';
  console.log(String(n).padStart(2), '|', g('data-p').padEnd(30), '|', g('data-t').padEnd(28), '| pptx', g('data-pptx')); }
