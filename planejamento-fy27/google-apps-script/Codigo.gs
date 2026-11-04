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

var TOKEN = 'troque-por-uma-senha';   // a SENHA DO PAINEL: troque por uma senha sua. Só você a digita, no painel; ela não vai dentro do arquivo dos diretores.
var SENHA_PADRAO = 'troque-por-uma-senha';   // não mexa: o painel recusa ler enquanto o TOKEN for este texto
var RESUMO_VERSAO = 'r7';                    // sobe quando o desenho do Resumo muda; aí ele é refeito uma vez
var ABA = 'Respostas';
var COLUNAS = [
  'sessionId', 'nome', 'email', 'cargo', 'versao', 'iniciadoEm', 'concluidoEm', 'duracaoSeg', 'atualizadoEm', 'ativa', 'status', 'etapa', 'progresso',
  'arquetipo', 'aderencia', 'angulo', 'x', 'y', 'opiniaoFormada', 'velocidadeMed', 'hesitacoes', 'revisoes', 'coerencia',
  'PORTA', 'FOCO', 'RECEITA', 'PRODUTO', 'IA', 'FABRICA', 'ANCORAS', 'PILARES', 'CONSOL',
  'rota', 'mesaP1', 'mesaP2', 'mesaP3', 'mesaP4', 'mesaP5', 'nucleo', 'atendeu', 'caixaPostal', 'contrato', 'ia',
  'prioridade', 'produtos2027', 'carga2027', 'cargaNova', 'ventoVenda', 'ancorasVenda',
  'hoje_front', 'hoje_qualidade', 'hoje_vender', 'hoje_expandir', 'hoje_pessoas', 'hoje_ofertas', 'hoje_burocracias',
  'ideal_front', 'ideal_qualidade', 'ideal_vender', 'ideal_expandir', 'ideal_pessoas', 'ideal_ofertas', 'ideal_burocracias',
  'casco_confianca', 'casco_conflito', 'casco_compromisso', 'casco_cobranca', 'casco_resultado',
  'chama_porta', 'chama_trilho', 'chama_proposta',
  'espelho', 'frase',
  'r1', 'r1_ms', 'r2', 'r2_ms', 'r3', 'r3_ms', 'r4', 'r4_ms', 'r5', 'r5_ms', 'r6', 'r6_ms', 'r7', 'r7_ms', 'r8', 'r8_ms',
  'temposPorTela', 'estado'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // teste de conexão (botão "Testar o envio" do painel): não cria linha, só confirma que a planilha responde
    if (payload.tipo === 'ping') {
      var sp = aba_();
      return json_({ sucesso: true, ping: true, respostas: Math.max(0, sp.getLastRow() - 1), geradoEm: new Date().toISOString() });
    }
    var linha = payload.linha || {};
    if (!linha.sessionId) return json_({ sucesso: false, erro: 'linha sem sessionId' });
    linha.atualizadoEm = new Date().toISOString();
    linha.ativa = 'sim';
    var sh = aba_();
    var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    // colunas novas (campos que não estavam na lista) entram no fim, sem perder nada
    Object.keys(linha).forEach(function (k) { if (header.indexOf(k) < 0) { header.push(k); sh.getRange(1, header.length).setValue(k); } });
    var values = header.map(function (k) { return seguro_(linha[k]); });
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
    var idx = ids.indexOf(String(linha.sessionId));
    var row = idx >= 0 ? idx + 2 : sh.getLastRow() + 1;
    sh.getRange(row, 1, 1, values.length).setValues([values]);
    recalcularAtivas_(sh);
    resumoSeNecessario_();
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
    if (!TOKEN || TOKEN === SENHA_PADRAO) return json_({ erro: 'defina o TOKEN no Codigo.gs (a senha do painel) e implante uma nova versão' });
    if (p.token !== TOKEN) return json_({ erro: 'token inválido' });
    var sh = aba_();
    if (sh.getLastRow() < 2) return json_({ linhas: [] });
    var data = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    var header = data.shift();
    var cAtiva = header.indexOf('ativa');
    // só a resposta mais recente de cada pessoa (as anteriores ficam na planilha, marcadas como "substituída")
    var linhas = data.filter(function (r) { return r[0] && (cAtiva < 0 || r[cAtiva] !== 'substituída'); }).map(function (r) {
      var o = {}; header.forEach(function (k, i) { if (k) o[k] = r[i]; }); return o;
    });
    return json_({ linhas: linhas, geradoEm: new Date().toISOString() });
  }
  return ContentService.createTextOutput('Bússola DTS 2027 · base de respostas ativa').setMimeType(ContentService.MimeType.TEXT);
}

// Texto que começa com = + - @ viraria fórmula na planilha (qualquer pessoa com o link consegue enviar texto): entra como texto puro.
function seguro_(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'object') v = JSON.stringify(v);
  if (typeof v === 'string' && /^[=+\-@]/.test(v)) return "'" + v;
  return v;
}

// Uma resposta "ativa" por pessoa: se alguém recomeça e responde de novo, a mais recente vale e a anterior fica como "substituída".
function chaveNome_(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim(); }
function ts_(v) { if (v instanceof Date) return v.getTime(); var t = Date.parse(v); return isNaN(t) ? 0 : t; }
function recalcularAtivas_(sh) {
  var n = sh.getLastRow() - 1; if (n < 1) return;
  var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var cN = header.indexOf('nome') + 1, cI = header.indexOf('iniciadoEm') + 1, cA = header.indexOf('atualizadoEm') + 1, cV = header.indexOf('ativa') + 1;
  if (!cN || !cV) return;
  var nomes = sh.getRange(2, cN, n, 1).getValues(), atv = sh.getRange(2, cV, n, 1).getValues();
  var ini = cI ? sh.getRange(2, cI, n, 1).getValues() : [], att = cA ? sh.getRange(2, cA, n, 1).getValues() : [];
  var melhor = {};
  for (var i = 0; i < n; i++) {
    var k = chaveNome_(nomes[i][0]); if (!k) continue;
    var t = ts_(ini[i] && ini[i][0]) || ts_(att[i] && att[i][0]);
    if (!(k in melhor) || t >= melhor[k].t) melhor[k] = { i: i, t: t };
  }
  var mudou = false;
  for (var j = 0; j < n; j++) {
    var k2 = chaveNome_(nomes[j][0]);
    var novo = !k2 || melhor[k2].i === j ? 'sim' : 'substituída';
    if (atv[j][0] !== novo) { atv[j][0] = novo; mudou = true; }
  }
  if (mudou) sh.getRange(2, cV, n, 1).setValues(atv);
}

// O Resumo é feito de fórmulas, que se atualizam sozinhas: só é refeito quando a versão do desenho muda.
function resumoSeNecessario_() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Resumo');
  if (!sh || sh.getRange(1, 5).getValue() !== RESUMO_VERSAO) resumo_();
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
var PAPEIS_ = [['front', 'Front do projeto'], ['qualidade', 'Gate de qualidade'], ['vender', 'Vender e abrir portas'], ['expandir', 'Expandir contas'], ['pessoas', 'Desenvolver o time'], ['ofertas', 'Construir ofertas'], ['burocracias', 'Burocracias']];
var ANCORAS_ = ['Tempo para vender', 'Oferta clara', 'Ferramentas de venda', 'Treinamento comercial', 'Coach de venda', 'Go-to-market com os MDs', 'Cases e referências', 'Gente que vende'];
var CASCO_ = [['confianca', 'Confiança'], ['conflito', 'Conflito produtivo'], ['compromisso', 'Compromisso'], ['cobranca', 'Cobrança mútua'], ['resultado', 'Resultado coletivo']];
function resumo_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Resumo') || ss.insertSheet('Resumo');
  var resp = aba_(), hdr = resp.getRange(1, 1, 1, Math.max(1, resp.getLastColumn())).getValues()[0];
  var col = function (nome) { var i = hdr.indexOf(nome); if (i < 0) i = COLUNAS.indexOf(nome); return colLetter_(i + 1); }; // pela linha de títulos real da aba
  var faixa = function (k) { return ABA + '!' + col(k) + '2:' + col(k); };
  var ATV = ',' + faixa('ativa') + ',"<>substituída",' + faixa('status') + ',"concluída"';   // só a resposta mais recente de cada pessoa, já concluída
  var media = function (k, casas) { return '=IFERROR(ROUND(AVERAGEIFS(' + faixa(k) + ATV + '),' + (casas || 0) + '),"")'; };
  var votos = function (k, texto) { return '=COUNTIFS(' + faixa(k) + ',"' + texto + '"' + ATV + ')'; };
  var plano = { PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100 };
  var rows = [], negrito = [];
  var linha = function (a, b, c) { rows.push([a, b === undefined ? '' : b, c === undefined ? '' : c]); };
  var titulo = function (a, b, c) { linha(a, b, c); negrito.push(rows.length); };
  titulo('Bússola DTS 2027 · resumo');
  linha('Atualiza sozinho a cada resposta. A posição do planejamento vem do material FY27 (proposta DTS).');
  linha('');
  titulo('Participação', 'Valor');
  linha('Bússolas concluídas', '=COUNTIFS(' + faixa('nome') + ',"<>"' + ATV + ')');
  linha('Respondendo agora', '=COUNTIFS(' + faixa('nome') + ',"<>",' + faixa('ativa') + ',"<>substituída",' + faixa('status') + ',"em andamento")');
  linha('Tempo médio (min)', '=IFERROR(ROUND(AVERAGEIFS(' + faixa('duracaoSeg') + ATV + ')/60,1),"")');
  linha('Aderência média ao plano (0–100)', media('aderencia'));
  linha('Reflexo médio (s)', media('velocidadeMed', 1));
  linha('Hesitações (total)', '=IFERROR(SUMIFS(' + faixa('hesitacoes') + ATV + '),"")');
  linha('');
  titulo('Dimensão (0–100)', 'Média do time', 'Planejamento FY27');
  Object.keys(plano).forEach(function (k) { linha(k, media(k), plano[k]); });
  linha('');
  titulo('Porão: caixas por pilar', 'Média do time', 'Planejamento FY27');
  [['mesaP1', 'Reestruturação e turnaround de TI', 25], ['mesaP2', 'Programas críticos e eficiência do gasto', 35], ['mesaP3', 'M&A', 25], ['mesaP4', 'Operações e verticais', 10], ['mesaP5', 'Apostas novas', 5]].forEach(function (m) { linha(m[1], media(m[0]), m[2]); });
  linha('');
  titulo('Manifesto de carga', 'Média do time', 'Hoje');
  linha('Produtos no catálogo de 2027', media('produtos2027'), 33);
  linha('');
  titulo('Ventos da venda', 'Média ou votos');
  linha('Força do vento comercial (1 = calmaria, 5 = vento de popa)', media('ventoVenda', 1));
  ANCORAS_.forEach(function (a) { linha('Falta: ' + a, votos('ancorasVenda', '*' + a + '*')); });
  linha('');
  titulo('Papel do diretor (% do tempo)', 'Hoje', '2027');
  PAPEIS_.forEach(function (p) { linha(p[1], media('hoje_' + p[0]), media('ideal_' + p[0])); });
  linha('');
  titulo('Casco (1 a 5)', 'Média do time');
  CASCO_.forEach(function (c) { linha(c[1], media('casco_' + c[0], 1)); });
  linha('');
  titulo('Farol (votos)');
  [['A', '…o CFO chama quando a TI falhou'], ['B', '…o CIO chama para não falhar'], ['C', '…entra pela dor que o CIO já tem e fica']].forEach(function (o) { linha(o[1], votos('espelho', o[0])); });
  linha('');
  titulo('Carta náutica (votos)');
  [['A', 'A estrada de sempre'], ['B', 'Três destinos e um desvio'], ['C', 'Mapa aberto']].forEach(function (o) { linha(o[1], votos('rota', o[0])); });
  sh.clear();
  sh.getRange(1, 1, rows.length, 3).setValues(rows);
  negrito.forEach(function (r) { sh.getRange(r, 1, 1, 3).setFontWeight('bold'); });
  sh.getRange(1, 1).setFontSize(14);
  sh.setColumnWidth(1, 320); sh.setColumnWidth(2, 140); sh.setColumnWidth(3, 160);
  sh.getRange(1, 5).setValue(RESUMO_VERSAO).setFontColor('#B0B7BE');   // marca da versão do desenho
}

function colLetter_(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

// Para testar dentro do editor: Executar > testeLocal. Na primeira vez o Google pede autorização (aceite).
// Cria as abas Respostas e Resumo e uma linha de exemplo ("Teste"), que você pode apagar depois.
function testeLocal() {
  var ping = JSON.parse(doPost({ postData: { contents: JSON.stringify({ tipo: 'ping' }) } }).getContent());
  var r = doPost({ postData: { contents: JSON.stringify({ tipo: 'bussola', versao: 'bussola-dts-2', linha: { sessionId: 'teste-1', nome: 'Teste', status: 'concluída', cargo: 'Senior Director', iniciadoEm: new Date().toISOString(), hoje_front: 40, ideal_front: 25, casco_confianca: 4, chama_porta: 'Nome A', PORTA: 40, FOCO: 80, RECEITA: 80, PRODUTO: 85, IA: 90, FABRICA: 85, ANCORAS: 100, PILARES: 100, CONSOL: 100, ventoVenda: 2, ancorasVenda: 'Tempo para vender; Ferramentas de venda', aderencia: 100, espelho: 'C', rota: 'B', mesaP1: 25, mesaP2: 35, mesaP3: 25, mesaP4: 10, mesaP5: 5 } }) } });
  Logger.log('ping: ' + ping.sucesso + ' · linha de teste: ' + r.getContent());
  Logger.log(TOKEN === SENHA_PADRAO ? 'ATENÇÃO: troque o TOKEN (a senha do painel) no início do arquivo.' : 'TOKEN definido.');
}
