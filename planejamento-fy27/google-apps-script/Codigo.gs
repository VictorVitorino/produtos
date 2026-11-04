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
  'sessionId', 'nome', 'email', 'cargo', 'versao', 'iniciadoEm', 'concluidoEm', 'duracaoSeg', 'atualizadoEm',
  'arquetipo', 'aderencia', 'angulo', 'x', 'y', 'opiniaoFormada', 'velocidadeMed', 'hesitacoes', 'revisoes', 'coerencia',
  'PORTA', 'FOCO', 'RECEITA', 'PRODUTO', 'IA', 'FABRICA', 'ANCORAS', 'PILARES', 'CONSOL', 'PESSOAS',
  'rota', 'mesaP1', 'mesaP2', 'mesaP3', 'mesaP4', 'mesaP5', 'nucleo', 'atendeu', 'caixaPostal', 'contrato', 'ia',
  'prioridade', 'produtos2027', 'contratacoes',
  'hoje_front', 'hoje_qualidade', 'hoje_vender', 'hoje_expandir', 'hoje_pessoas', 'hoje_ofertas',
  'ideal_front', 'ideal_qualidade', 'ideal_vender', 'ideal_expandir', 'ideal_pessoas', 'ideal_ofertas',
  'casco_confianca', 'casco_conflito', 'casco_compromisso', 'casco_cobranca', 'casco_resultado',
  'chama_porta', 'chama_trilho', 'chama_proposta',
  'espelho', 'frase',
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
var PAPEIS_ = [['front', 'Front do projeto'], ['qualidade', 'Gate de qualidade'], ['vender', 'Vender e abrir portas'], ['expandir', 'Expandir contas'], ['pessoas', 'Desenvolver o time'], ['ofertas', 'Construir ofertas']];
var CASCO_ = [['confianca', 'Confiança'], ['conflito', 'Conflito produtivo'], ['compromisso', 'Compromisso'], ['cobranca', 'Cobrança mútua'], ['resultado', 'Resultado coletivo']];
function resumo_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Resumo') || ss.insertSheet('Resumo');
  var col = function (nome) { var i = COLUNAS.indexOf(nome); return colLetter_(i + 1); };
  var faixa = function (k) { return ABA + '!' + col(k) + '2:' + col(k); };
  var media = function (k, casas) { return '=IFERROR(ROUND(AVERAGE(' + faixa(k) + '),' + (casas || 0) + '),"")'; };
  var plano = { PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100, PESSOAS: 100 };
  var rows = [], negrito = [];
  var linha = function (a, b, c) { rows.push([a, b === undefined ? '' : b, c === undefined ? '' : c]); };
  var titulo = function (a, b, c) { linha(a, b, c); negrito.push(rows.length); };
  titulo('Bússola DTS 2027 · resumo');
  linha('Atualiza sozinho a cada resposta. A posição do planejamento vem do material FY27 (proposta DTS).');
  linha('');
  titulo('Participação', 'Valor');
  linha('Bússolas concluídas', '=COUNTA(' + faixa('nome') + ')');
  linha('Tempo médio (min)', '=IFERROR(ROUND(AVERAGE(' + faixa('duracaoSeg') + ')/60,1),"")');
  linha('Aderência média ao plano (0–100)', media('aderencia'));
  linha('Reflexo médio (s)', media('velocidadeMed', 1));
  linha('Hesitações (total)', '=IFERROR(SUM(' + faixa('hesitacoes') + '),"")');
  linha('');
  titulo('Dimensão (0–100)', 'Média do time', 'Planejamento FY27');
  Object.keys(plano).forEach(function (k) { linha(k, media(k), plano[k]); });
  linha('');
  titulo('Porão: caixas por pilar', 'Média do time', 'Planejamento FY27');
  [['mesaP1', 'Reestruturação e turnaround de TI', 25], ['mesaP2', 'Programas críticos e eficiência do gasto', 35], ['mesaP3', 'M&A', 25], ['mesaP4', 'Operações e verticais', 10], ['mesaP5', 'Apostas novas', 5]].forEach(function (m) { linha(m[1], media(m[0]), m[2]); });
  linha('');
  titulo('Papel do diretor (% do tempo)', 'Hoje', '2027');
  PAPEIS_.forEach(function (p) { linha(p[1], media('hoje_' + p[0]), media('ideal_' + p[0])); });
  linha('');
  titulo('Casco (1 a 5)', 'Média do time');
  CASCO_.forEach(function (c) { linha(c[1], media('casco_' + c[0], 1)); });
  linha('');
  titulo('Farol (votos)');
  [['A', '…o CFO chama quando a TI falhou'], ['B', '…o CIO chama para não falhar'], ['C', '…entra pela dor que o CIO já tem e fica']].forEach(function (o) { linha(o[1], '=COUNTIF(' + faixa('espelho') + ',"' + o[0] + '")'); });
  linha('');
  titulo('Carta náutica (votos)');
  [['A', 'A estrada de sempre'], ['B', 'Três destinos e um desvio'], ['C', 'Mapa aberto']].forEach(function (o) { linha(o[1], '=COUNTIF(' + faixa('rota') + ',"' + o[0] + '")'); });
  sh.clear();
  sh.getRange(1, 1, rows.length, 3).setValues(rows);
  negrito.forEach(function (r) { sh.getRange(r, 1, 1, 3).setFontWeight('bold'); });
  sh.getRange(1, 1).setFontSize(14);
  sh.setColumnWidth(1, 320); sh.setColumnWidth(2, 140); sh.setColumnWidth(3, 160);
}

function colLetter_(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

// Para testar dentro do editor: Executar > testeLocal (cria uma linha de exemplo).
function testeLocal() {
  var r = doPost({ postData: { contents: JSON.stringify({ tipo: 'bussola', versao: 'bussola-dts-2', linha: { sessionId: 'teste-1', nome: 'Teste', cargo: 'Senior Director', hoje_front: 40, ideal_front: 25, casco_confianca: 4, chama_porta: 'Nome A', PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100, PESSOAS: 100, aderencia: 100, espelho: 'C', rota: 'B', mesaP1: 25, mesaP2: 35, mesaP3: 25, mesaP4: 10, mesaP5: 5 } }) } });
  Logger.log(r.getContent());
}
