/**
 * Bússola DTS 2027 · base de respostas no Google Planilhas
 * -----------------------------------------------------------------------
 * Recebe cada bússola concluída (uma linha por pessoa, atualizada se a pessoa
 * reenviar) e devolve as linhas para o painel da facilitação.
 *
 * Como usar: veja o LEIAME.md ao lado. Resumo:
 *   1. Planilha nova > Extensões > Apps Script > cole este arquivo inteiro.
 *   2. Troque o TOKEN abaixo por uma senha sua (letras e números).
 *   3. Implantar > Nova implantação > App da Web > Executar como "Eu" >
 *      Quem pode acessar "Qualquer pessoa" > copie o link que termina em /exec.
 *   4. Cole o link em sheetsEndpoint e o TOKEN em painelToken no HTML da bússola.
 */

var TOKEN = 'troque-por-uma-senha';   // o painel só lê as respostas com este token
var ABA = 'Respostas';
var COLUNAS = [
  'sessionId', 'nome', 'email', 'versao', 'iniciadoEm', 'concluidoEm', 'duracaoSeg', 'atualizadoEm',
  'arquetipo', 'aderencia', 'angulo', 'x', 'y', 'conviccao', 'velocidadeMed', 'hesitacoes', 'coerencia',
  'PORTA', 'FOCO', 'RECEITA', 'PRODUTO', 'IA', 'FABRICA', 'ANCORAS', 'PILARES', 'CONSOL', 'PESSOAS',
  'rota', 'mesaP1', 'mesaP2', 'mesaP3', 'mesaP4', 'mesaP5', 'nucleo', 'atendeu', 'caixaPostal', 'contrato', 'ia',
  'prioridade', 'produtos2027', 'contratacoes', 'espelho', 'frase',
  'r1', 'r1_ms', 'r2', 'r2_ms', 'r3', 'r3_ms', 'r4', 'r4_ms', 'r5', 'r5_ms', 'r6', 'r6_ms', 'r7', 'r7_ms', 'r8', 'r8_ms',
  'temposPorTela', 'estado'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var linha = payload.linha || {};
    if (!linha.sessionId) return json_({ sucesso: false, erro: 'linha sem sessionId' });
    linha.atualizadoEm = new Date().toISOString();
    var sh = aba_();
    var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    // colunas novas (campos que não estavam na lista) entram no fim, sem perder nada
    Object.keys(linha).forEach(function (k) { if (header.indexOf(k) < 0) { header.push(k); sh.getRange(1, header.length).setValue(k); } });
    var values = header.map(function (k) { var v = linha[k]; return v === undefined || v === null ? '' : (typeof v === 'object' ? JSON.stringify(v) : v); });
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
    var idx = ids.indexOf(String(linha.sessionId));
    var row = idx >= 0 ? idx + 2 : sh.getLastRow() + 1;
    sh.getRange(row, 1, 1, values.length).setValues([values]);
    resumo_();
    return json_({ sucesso: true, linha: row, novo: idx < 0 });
  } catch (err) {
    return json_({ sucesso: false, erro: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.painel === '1') {
    if (!TOKEN || p.token !== TOKEN) return json_({ erro: 'token inválido' });
    var sh = aba_();
    if (sh.getLastRow() < 2) return json_({ linhas: [] });
    var data = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    var header = data.shift();
    var linhas = data.filter(function (r) { return r[0]; }).map(function (r) {
      var o = {}; header.forEach(function (k, i) { if (k) o[k] = r[i]; }); return o;
    });
    return json_({ linhas: linhas, geradoEm: new Date().toISOString() });
  }
  return ContentService.createTextOutput('Bússola DTS 2027 · base de respostas ativa').setMimeType(ContentService.MimeType.TEXT);
}

function aba_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA, 0);
    sh.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

// Aba "Resumo": médias do time ao lado da posição do planejamento, atualizada a cada resposta.
function resumo_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Resumo') || ss.insertSheet('Resumo');
  var col = function (nome) { var i = COLUNAS.indexOf(nome); return colLetter_(i + 1); };
  var plano = { PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100, PESSOAS: 100 };
  var rows = [
    ['Bússola DTS 2027 · resumo', '', ''],
    ['Atualiza sozinho a cada resposta. A posição do planejamento vem do material FY27 (proposta DTS).', '', ''],
    ['', '', ''],
    ['Participação', 'Valor', ''],
    ['Bússolas concluídas', '=COUNTA(' + ABA + '!' + col('nome') + '2:' + col('nome') + ')', ''],
    ['Tempo médio (min)', '=IFERROR(ROUND(AVERAGE(' + ABA + '!' + col('duracaoSeg') + '2:' + col('duracaoSeg') + ')/60,1),"")', ''],
    ['Aderência média ao plano (0–100)', '=IFERROR(ROUND(AVERAGE(' + ABA + '!' + col('aderencia') + '2:' + col('aderencia') + '),0),"")', ''],
    ['Reflexo médio (s)', '=IFERROR(ROUND(AVERAGE(' + ABA + '!' + col('velocidadeMed') + '2:' + col('velocidadeMed') + '),1),"")', ''],
    ['Hesitações (total)', '=IFERROR(SUM(' + ABA + '!' + col('hesitacoes') + '2:' + col('hesitacoes') + '),"")', ''],
    ['', '', ''],
    ['Dimensão (0–100)', 'Média do time', 'Planejamento FY27']
  ];
  Object.keys(plano).forEach(function (k) {
    rows.push([k, '=IFERROR(ROUND(AVERAGE(' + ABA + '!' + col(k) + '2:' + col(k) + '),0),"")', plano[k]]);
  });
  rows.push(['', '', '']);
  rows.push(['Mesa de investimento (fichas)', 'Média do time', 'Planejamento FY27']);
  [['mesaP1', 'Reestruturação e turnaround', 25], ['mesaP2', 'Programas críticos e eficiência', 35], ['mesaP3', 'M&A', 25], ['mesaP4', 'Operações e verticais', 10], ['mesaP5', 'Apostas novas', 5]].forEach(function (m) {
    rows.push([m[1], '=IFERROR(ROUND(AVERAGE(' + ABA + '!' + col(m[0]) + '2:' + col(m[0]) + '),0),"")', m[2]]);
  });
  rows.push(['', '', '']);
  rows.push(['Espelho (votos)', '', '']);
  [['A', '…o CFO chama quando a TI falhou'], ['B', '…o CIO chama para não falhar'], ['C', '…entra pela dor que o CIO já tem e fica']].forEach(function (o) {
    rows.push([o[1], '=COUNTIF(' + ABA + '!' + col('espelho') + '2:' + col('espelho') + ',"' + o[0] + '")', '']);
  });
  rows.push(['', '', '']);
  rows.push(['Rota (votos)', '', '']);
  [['A', 'A estrada de sempre'], ['B', 'Três destinos e um desvio'], ['C', 'Mapa aberto']].forEach(function (o) {
    rows.push([o[1], '=COUNTIF(' + ABA + '!' + col('rota') + '2:' + col('rota') + ',"' + o[0] + '")', '']);
  });
  sh.clear();
  sh.getRange(1, 1, rows.length, 3).setValues(rows);
  sh.getRange(1, 1).setFontWeight('bold').setFontSize(14);
  [4, 11, 11 + Object.keys(plano).length + 2, 11 + Object.keys(plano).length + 2 + 7, 11 + Object.keys(plano).length + 2 + 7 + 5].forEach(function (r) { sh.getRange(r, 1, 1, 3).setFontWeight('bold'); });
  sh.setColumnWidth(1, 300); sh.setColumnWidth(2, 140); sh.setColumnWidth(3, 160);
}

function colLetter_(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

// Para testar dentro do editor: Executar > testeLocal (cria uma linha de exemplo).
function testeLocal() {
  var r = doPost({ postData: { contents: JSON.stringify({ tipo: 'bussola', versao: 'bussola-dts-1', linha: { sessionId: 'teste-1', nome: 'Teste', PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100, PESSOAS: 100, aderencia: 100, espelho: 'C', rota: 'B', mesaP1: 25, mesaP2: 35, mesaP3: 25, mesaP4: 10, mesaP5: 5 } }) } });
  Logger.log(r.getContent());
}
