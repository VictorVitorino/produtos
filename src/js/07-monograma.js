/* A&M — monograma 3D (o "A" com o "M" da Alvarez & Marsal) reconstruído em SVG a partir do render de referência.
   Sem imagem raster: faces, chanfros, a fita torcida e a luz são vetor, gradiente e (só na tela) desfoque leve.
   Geometria no espaço 1199 x 1312 da referência (piso em y = 1281).

   API: window.AMMono = { svg(opts), mount(el, opts), play(el), stop(el) }
     opts: w (largura em px, 820) · anim (true) · theme ("navy" | "light") · reflexo (true quando w >= 260)
           fundo (true: halo e linha do piso) · bokeh (true no navy) · parallax (false; true = segue o cursor)
     svg(opts)       devolve o SVG completo numa string (prefixo de id único a cada chamada)
     mount(el, opts) injeta em el um <span class="amm-wrap"> com o objeto (svg.ammono) e a camada de efeitos
                     (svg.ammono-fx) e anima; idempotente (mesmas opções = mesmo nó). Depois da montagem o objeto
                     fica estático: os laços de luz redesenham só a camada leve e a paralaxe desloca os dois SVG
                     por transform (GPU), sem refazer os filtros.
     play(el)        repete a montagem · stop(el) para os laços de luz (saída do slide) e deixa o estado final
   Camadas: [data-layer=piso|fita|faces|brilho]. "faces" e "fita" se entrelaçam e devem mover juntas.
   Paralaxe externa: gravar --amm-x e --amm-y (-1..1) no .amm-wrap.
   Auto-montagem: elementos .am-mono (data-w, data-anim, data-theme, data-reflexo, data-fundo, data-parallax).
   Manutenção: svg({ debug: true }) desenha os contornos de construção sobre o objeto. */
(function (root) {
  'use strict';
  var VW = 1199, VH = 1312, FL = 1281, RH = 170, INTRO = 1720, seq = 0;

  /* ---------- utilitários de traçado ---------- */
  function r1(n) { return Math.round(n * 10) / 10; }
  function pt(p) { return r1(p[0]) + ',' + r1(p[1]); }
  function crv(P) { // Catmull-Rom -> Bézier cúbica
    var s = '', n = P.length;
    for (var i = 0; i < n - 1; i++) {
      var a = P[i ? i - 1 : 0], b = P[i], c = P[i + 1], d = P[i + 2 < n ? i + 2 : n - 1];
      s += 'C' + pt([b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]) + ' ' +
        pt([c[0] - (d[0] - b[0]) / 6, c[1] - (d[1] - b[1]) / 6]) + ' ' + pt(c);
    }
    return s;
  }
  function open(P) { return 'M' + pt(P[0]) + crv(P); }
  function band(A, B) { var R = B.slice().reverse(); return 'M' + pt(A[0]) + crv(A) + 'L' + pt(R[0]) + crv(R) + 'Z'; }
  function cut(P, a, b) { return P.slice(a, b); }

  /* ---------- geometria (medida na referência) ---------- */
  // fita esquerda: laço por trás da perna, varredura à frente, torção e cauda no piso
  var LP = [[600, 444], [540, 463], [450, 500], [350, 553], [300, 590], [272, 648], [254, 720], [260, 790], [290, 840], [340, 898], [406, 958], [480, 1020], [547, 1067], [613, 1102], [680, 1136], [760, 1182], [860, 1228], [950, 1257], [1014, 1270]];
  var LR = [[600, 452], [544, 471], [465, 505], [405, 535], [350, 565], [310, 595], [291, 630], [298, 668], [325, 705], [365, 750], [415, 805], [465, 842], [530, 888], [577, 927], [607, 973], [627, 1010], [643, 1047], [660, 1085], [690, 1122], [760, 1168], [860, 1215], [950, 1250], [1014, 1269]];
  // fita direita: laço atrás do pilar; volta pela frente do pilar e do M e afina até tocar a aresta do M em (694,816)
  // EO = aresta luminosa (de baixo) · EJ = divisa face escura/face clara · EK = borda do furo e topo da face escura
  var EO = [[975, 392], [995, 395], [1022, 401], [1050, 416], [1060, 428], [1068, 436], [1081, 458], [1087, 490], [1084, 522], [1072, 548], [1050, 577], [1027, 597], [1004, 612], [985, 624], [960, 641], [930, 661], [900, 680], [870, 694], [845, 709], [823, 721], [800, 736], [780, 749], [760, 761], [740, 775], [722, 789], [710, 799], [701, 808], [694, 816]];
  var EJ = [[1060, 428], [1070, 462], [1066, 488], [1056, 511], [1040, 532], [1020, 553], [1000, 569], [975, 588], [960, 599], [930, 622], [900, 644], [870, 660], [845, 679], [820, 692], [800, 703], [780, 714], [760, 729], [746, 740], [733, 752], [722, 765], [712, 779], [705, 790], [700, 800], [696, 809], [694, 816]];
  var EK = [[975, 441], [1000, 445], [1015, 453], [1023, 468], [1025, 488], [1021, 508], [1012, 525], [1000, 543], [985, 557], [960, 583], [930, 605], [900, 628], [870, 648], [845, 661], [820, 677], [800, 693], [780, 711], [760, 729]];
  var MEDGE = [[825, 510], [752, 644], [680, 777], [663, 820], [647, 860], [632, 900], [620, 940], [611, 975]];
  // face interna da fita esquerda que dobra à frente do chanfro
  var SQ = [[373, 712], [445, 788], [500, 838], [540, 876], [577, 927]];
  var SR = [[358, 724], [398, 764], [436, 804], [495, 852], [545, 893], [577, 927]];
  var IR = [[318, 700], [325, 705], [365, 750], [415, 805], [465, 842], [530, 888], [577, 927]];
  var QL = [[500, 549], [475, 557], [440, 570], [405, 586], [372, 610], [350, 640], [347, 662], [355, 688], [374, 712], [392, 722]];

  var G = {
    bevel: 'M876,94L146,1283L16,1278Q3,1277 3.5,1263L298.6,845C321.2,813 324.6,782 346.8,750L766.4,144.6Q771,138 778.3,134.7L866,95.5Q871,93.4 876,94Z',
    bevelDark: 'M876,94L146,1283L131,1274L861,85Z',
    white: 'M871.8,100.8Q876,94 883.3,97.3L971.4,135.9Q979.5,139.5 981,149L984.5,200L994.5,400L997.5,500L1004.5,650L1005.5,850L1007.5,1100L1008,1266Q1008,1271 1003,1271L879,1271L879,346L875,328L547,892C519.1,940 506.9,987 481,1035L352.3,1273.8Q349,1280 342,1280.1L152,1282.9Q146,1283 149.1,1277.9Z',
    pBevel: 'M875,328L879,346L879,1271L865,1271L865,392Z',
    counter: 'M875,320L882,330L882,1272L812,1272L812,640L640,640L650,500Z',
    // lado interno da perna / vão entre a perna e o M (sobe até o ápice do vão, sem aresta dura)
    mSide: 'M877,326L688,630L512,940L560,1075L611,990L' + pt(MEDGE[7]) + crv(MEDGE.slice().reverse()) + 'Z',
    mFacet: 'M' + pt(MEDGE[2]) + crv(cut(MEDGE, 2)) + 'L611,990L560,1075L512,1271L612,1271L695,800Z',
    mFront: 'M823,513Q825,507 827,513L826,1271L612,1271L695,800L680,777Z',
    rSide: 'M1003,677L1024,667L1040,1271L1005,1271Z',
    rFront: 'M1040,1271L1024,672Q1024,666 1026,671L1180,1271Z',
    lBand: band(LP, LR),
    loopIn: 'M' + pt(LR[0]) + crv(cut(LR, 0, 10)) + 'L430,700L600,452Z',
    lens: 'M' + pt(QL[0]) + crv(QL) + 'L430,690L520,545Z',
    eDark: 'M' + pt(EO[0]) + crv(cut(EO, 0, 5)) + crv(cut(EJ, 0, 17)) + 'L' + pt(EK[EK.length - 1]) + crv(EK.slice().reverse()) + 'Z',
    eLit: 'M' + pt(EJ[0]) + crv(EJ) + 'L' + pt(EO[EO.length - 1]) + crv(cut(EO, 4).reverse()) + 'Z',
    hole: 'M' + pt(EK[1]) + crv(cut(EK, 1, 8)) + 'L985,543L985,445Z',
    strip: band(SQ, SR),
    inner: band(SQ, IR),
    bshade: 'M' + pt(SQ[0]) + crv(cut(SQ, 0, 2)) + 'L520,700L430,640Z'
  };
  // espinhas da animação de desenho da fita (máscaras) e da cabeça de luz que conduz o traço
  var SPL = [[1014, 1270], [950, 1254], [860, 1222], [760, 1175], [680, 1128], [625, 1060], [560, 990], [470, 930], [380, 860], [300, 790], [282, 700], [312, 620], [385, 560], [475, 508], [600, 450]];
  var SPE = [[975, 418], [1030, 420], [1068, 455], [1072, 520], [1040, 565], [990, 596], [900, 650], [800, 712], [740, 760], [702, 806], [690, 826]];
  // corredor de luz: aresta luminosa do laço direito -> travessa -> aresta do M -> torção -> cauda
  var RUN = [[1081, 458], [1087, 495], [1080, 530], [1060, 563], [1027, 597], [1004, 612], [960, 641], [900, 680], [845, 709], [800, 736], [760, 761], [722, 789], [694, 816], [676, 838], [660, 862], [645, 890], [632, 920], [620, 950], [612, 978], [625, 1012], [643, 1047], [660, 1085], [690, 1122], [760, 1168], [860, 1215], [950, 1250], [1014, 1269]];

  /* ---------- temas ---------- */
  var THEMES = {
    navy: { halo: '#3E5BB8', haloO: 0.4, bokeh: 1, refl: 0.26, shadow: '#030A18', outline: 0, line: '#8FA6E0', lineO: 0.32 },
    light: { halo: '#8FA6E0', haloO: 0.26, bokeh: 0, refl: 0.16, shadow: '#1F3263', outline: 1, line: '#7F8DB8', lineO: 0.4 }
  };

  function stops(S) {
    var s = '';
    for (var i = 0; i < S.length; i++) s += '<stop offset="' + S[i][0] + '" stop-color="' + S[i][1] + '"' + (S[i][2] != null ? ' stop-opacity="' + S[i][2] + '"' : '') + '/>';
    return s;
  }
  function lg(id, x1, y1, x2, y2, S) {
    return '<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '">' + stops(S) + '</linearGradient>';
  }
  function rg(id, cx, cy, r, S, extra) {
    return '<radialGradient id="' + id + '" gradientUnits="userSpaceOnUse" cx="' + cx + '" cy="' + cy + '" r="' + r + '"' + (extra || '') + '>' + stops(S) + '</radialGradient>';
  }
  function P(d, fill, extra) { return '<path d="' + d + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function S(d, stroke, w, extra) { return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '"' + (extra || '') + '/>'; }

  /* ---------- opções ---------- */
  function norm(o) {
    o = o || {};
    var w = +o.w > 0 ? +o.w : 820;
    return {
      w: w,
      anim: o.anim !== false,
      theme: o.theme === 'light' ? 'light' : 'navy',
      reflexo: o.reflexo != null ? !!o.reflexo : w >= 260,
      fundo: o.fundo !== false,
      bokeh: o.bokeh !== false,
      parallax: !!o.parallax,
      debug: !!o.debug
    };
  }

  /* ---------- SVG ---------- */
  function svg(opts, mode) {
    var o = norm(opts), th = THEMES[o.theme], small = o.w < 260, refl = o.reflexo;
    var id = 'amm' + (++seq).toString(36) + Math.random().toString(36).slice(2, 5) + '-';
    var u = function (n) { return 'url(#' + id + n + ')'; };
    var vh = refl ? VH + RH : VH, h = Math.round(o.w * vh / VW);
    var d = '', dx = '';

    /* gradientes: chanfro, faces, M e triângulo */
    d += lg(id + 'bev', 820, 120, 40, 1270, [[0, '#3C49D3'], [0.2, '#333BC2'], [0.45, '#2A2CA6'], [0.72, '#1E1C82'], [1, '#120F55']]);
    d += lg(id + 'bd', 509, 689, 494, 680, [[0, '#0A0E3C', 0.45], [0.55, '#0A0E3C', 0.18], [1, '#0A0E3C', 0]]);
    d += lg(id + 'wht', 880, 94, 230, 1280, [[0, '#FFFFFF'], [0.22, '#F6F4FA'], [0.5, '#E1DDEC'], [0.75, '#E3DCEB'], [1, '#EADFE8']]);
    d += lg(id + 'pil', 879, 0, 1007, 0, [[0, '#C4C3E2'], [0.22, '#DCDBEE'], [0.62, '#EEEEF7'], [1, '#E7E6F3']]);
    d += lg(id + 'pilM', 0, 300, 0, 430, [[0, '#FFFFFF', 0], [1, '#FFFFFF', 1]]);
    d += lg(id + 'pilV', 0, 100, 0, 520, [[0, '#FFFFFF', 0.9], [1, '#FFFFFF', 0]]);
    d += lg(id + 'pilB', 0, 700, 0, 1271, [[0, '#A598C8', 0], [1, '#A598C8', 0.72]]);
    d += lg(id + 'pbv', 0, 340, 0, 1271, [[0, '#7468E8'], [0.4, '#5B50D0'], [0.72, '#4436A6'], [1, '#2C2474']]);
    d += lg(id + 'ctr', 0, 330, 0, 1272, [[0, '#06071F'], [1, '#04051A']]);
    d += lg(id + 'ms', 850, 380, 545, 920, [[0, '#0B0B30', 0], [0.18, '#141262', 0.85], [0.36, '#2724A8'], [0.6, '#2D29B6'], [0.8, '#231C8C'], [1, '#1A1262']]);
    d += lg(id + 'mf', 0, 510, 0, 1271, [[0, '#A8E6FF'], [0.12, '#78CCFC'], [0.2, '#80CDFC'], [0.26, '#92D3FC'], [0.31, '#86C5FC'], [0.36, '#6AA8FA'], [0.45, '#4D66E4'], [0.52, '#3940C6'], [0.58, '#2C2C9E'], [0.71, '#1E1A6C'], [1, '#130F46']]);
    d += lg(id + 'mfc', 0, 778, 0, 1271, [[0, '#F6FDFF'], [0.07, '#EAF9FF'], [0.13, '#B9E6FF'], [0.2, '#7EC0FC'], [0.33, '#6E8EF6'], [0.45, '#7A7CF6'], [0.57, '#5E62E4'], [0.67, '#2C2A8C'], [1, '#110F4C']]);
    d += lg(id + 'mfx', 610, 0, 826, 0, [[0, '#050A30', 0], [0.7, '#050A30', 0], [1, '#050A30', 0.16]]);
    d += lg(id + 'rf', 1030, 900, 1180, 860, [[0, '#4C82EC'], [0.5, '#5A9AF4'], [0.85, '#86C4FA'], [1, '#D0EFFF']]);
    d += lg(id + 'rfV', 0, 670, 0, 1271, [[0, '#B4E6FF', 0.32], [0.35, '#B4E6FF', 0], [0.7, '#0A0E40', 0.2], [1, '#0A0E40', 0.5]]);
    d += lg(id + 'rs', 0, 670, 0, 1271, [[0, '#1E1F66'], [1, '#0A0B30']]);
    /* fita esquerda */
    d += lg(id + 'lb', 300, 700, 700, 1140, [[0, '#3138B8'], [0.12, '#2A22A0'], [0.19, '#1F177E'], [0.275, '#1A1060'], [0.36, '#2A1B58'], [0.44, '#5E395E'], [0.52, '#A2615C'], [0.6, '#F0A552'], [0.67, '#FDC86C'], [0.76, '#FEF2BE'], [0.88, '#FFFCE6'], [1, '#FFFCF2']]);
    d += lg(id + 'rim', 0, 600, 0, 880, [[0, '#8EC4FF', 0.8], [0.5, '#8EC4FF', 0.7], [1, '#8EC4FF', 0]]);
    d += lg(id + 'lpe', 0, 560, 0, 880, [[0, '#ACC6FF', 0.85], [0.75, '#ACC6FF', 0.85], [1, '#ACC6FF', 0]]);
    d += lg(id + 'lpw', 0, 830, 0, 960, [[0, '#F08A4A', 0], [0.35, '#F08A4A', 0.7], [1, '#F08A4A', 0.2]]);
    d += rg(id + 'rlit', 248, 700, 110, [[0, '#C6E4FF', 0.75], [0.5, '#A6D0FF', 0.35], [1, '#A6D0FF', 0]]);
    d += lg(id + 'rhl', 0, 560, 0, 650, [[0, '#FFFFFF', 0], [1, '#FFFFFF', 0.85]]);
    d += lg(id + 'loopIn', 300, 660, 500, 500, [[0, '#26278C'], [0.35, '#1C1F6E'], [0.7, '#111448'], [1, '#090B2C']]);
    d += lg(id + 'lens', 350, 560, 470, 720, [[0, '#423F7C', 0.94], [1, '#6E6AA4', 0.94]]);
    d += lg(id + 'strip', 365, 715, 570, 900, [[0, '#8C8EC4', 0.2], [0.1, '#9295C8', 0.9], [0.55, '#B6B7DF', 0.8], [0.78, '#D4D3EC', 0.42], [1, '#ECEAF6', 0.1]]);
    d += lg(id + 'inner', 330, 700, 570, 910, [[0, '#211E7C'], [0.5, '#241B66'], [1, '#5E4C86', 0.6]]);
    d += lg(id + 'bsh', 409, 750, 452, 703, [[0, '#04061C', 0.85], [0.6, '#04061C', 0.3], [1, '#04061C', 0]]);
    /* fita direita */
    d += lg(id + 'edB', 1080, 400, 980, 560, [[0, '#2C2C92'], [1, '#1D1C68']]);
    d += lg(id + 'ed', 1000, 545, 760, 730, [[0, '#3A2574', 0.92], [0.5, '#56306E', 0.9], [1, '#7A4C9C', 0.55]]);
    d += lg(id + 'el', 1085, 470, 690, 815, [[0, '#FFFCEC'], [0.08, '#FDF5D2'], [0.2, '#FCE3A8'], [0.3, '#FBDA96'], [0.38, '#F9C88A'], [0.46, '#F4B282'], [0.54, '#E99086'], [0.62, '#E0848F'], [0.72, '#E39CC0'], [0.81, '#DDAEE8'], [0.9, '#D8C2F8'], [1, '#E6DCFB']]);
    d += lg(id + 'ejl', 1060, 0, 820, 0, [[0, '#F78C16', 0.9], [0.55, '#F78C16', 0.6], [1, '#F78C16', 0]]);
    d += lg(id + 'hole', 0, 445, 0, 545, [[0, '#05061A'], [0.4, '#2B2856'], [1, '#6A6286']]);
    d += rg(id + 'tw', 684, 814, 36, [[0, '#FFFFFF', 0.9], [0.45, '#F2FBFF', 0.5], [1, '#E4F6FF', 0]]);
    /* luz quente e ambiente */
    d += rg(id + 'warm', 520, 1060, 380, [[0, '#F7A464', 0.6], [0.45, '#F7A464', 0.22], [1, '#F7A464', 0]]);
    d += rg(id + 'warm2', 960, 1262, 160, [[0, '#F9A64A', 0.3], [1, '#F9A64A', 0]]);
    d += rg(id + 'warm3', 950, 672, 190, [[0, '#FFD3A0', 0.62], [0.5, '#FFD3A0', 0.3], [1, '#FFD3A0', 0]]);
    d += rg(id + 'psh', 1010, 505, 150, [[0, '#4B4F9C', 0.36], [1, '#4B4F9C', 0]]);
    d += lg(id + 'psh2', 940, 593, 891, 530, [[0, '#3B3F8A', 0.36], [1, '#3B3F8A', 0]]);
    d += rg(id + 'halo', 640, 700, 556, [[0, th.halo, th.haloO], [0.3, th.halo, th.haloO * 0.78], [0.6, th.halo, th.haloO * 0.34], [0.84, th.halo, th.haloO * 0.08], [1, th.halo, 0]]);
    dx += rg(id + 'flare', 628, 1066, 120, [[0, '#FFF8E4', 0.85], [0.2, '#FFE2A6', 0.52], [0.55, '#F9A64A', 0.13], [1, '#F78C16', 0]]);
    d += rg(id + 'flr', 900, FL, 380, [[0, '#F9A64A', 0.45], [0.4, '#F78C16', 0.14], [1, '#F78C16', 0]], ' gradientTransform="translate(0 ' + FL + ') scale(1 .09) translate(0 -' + FL + ')"');
    d += rg(id + 'cs', 600, FL, 640, [[0, th.shadow, 0.75], [0.7, th.shadow, 0.35], [1, th.shadow, 0]], ' gradientTransform="translate(0 ' + FL + ') scale(1 .03) translate(0 -' + FL + ')"');
    dx += '<clipPath id="' + id + 'cA"><path d="' + G.white + '"/><path d="' + G.bevel + '"/><path d="' + G.pBevel + '"/></clipPath>';
    dx += '<linearGradient id="' + id + 'sweep" x1="0" y1="0" x2="1" y2="0">' + stops([[0, '#FFFFFF', 0], [0.5, '#FFFFFF', 0.6], [1, '#FFFFFF', 0]]) + '</linearGradient>';
    d += lg(id + 'fline', -60, 0, 1260, 0, [[0, th.line, 0], [0.3, th.line, th.lineO], [0.75, th.line, th.lineO], [1, th.line, 0]]);
    d += lg(id + 'rfade', 0, FL, 0, FL + RH, [[0, '#FFFFFF', 1], [1, '#FFFFFF', 0]]);
    /* filtros (só tela; a impressão desliga) */
    if (!small) {
      d += '<filter id="' + id + 'glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>';
      d += '<filter id="' + id + 'glow2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>';
    }
    if (refl) d += '<filter id="' + id + 'rblur" x="-2%" y="-2%" width="104%" height="104%"><feGaussianBlur stdDeviation="2.2"/></filter>';
    /* recortes */
    d += '<clipPath id="' + id + 'cW"><path d="' + G.white + '"/></clipPath>';
    d += '<clipPath id="' + id + 'cB"><path d="' + G.bevel + '"/></clipPath>';
    d += '<clipPath id="' + id + 'cL"><path d="' + G.lBand + '"/></clipPath>';
    d += '<clipPath id="' + id + 'cEl"><path d="' + G.eLit + '"/></clipPath>';
    d += '<clipPath id="' + id + 'cLf"><rect x="0" y="690" width="' + VW + '" height="' + (VH - 690) + '"/></clipPath>';
    d += '<clipPath id="' + id + 'cEf"><path d="M0,520L999,520L1003.5,620L1005,' + VH + 'L0,' + VH + 'Z"/></clipPath>';
    /* máscaras: desenho da fita (traço largo com stroke-dashoffset) e degradê do reflexo */
    var full = function (k) { return '<rect class="amm-mfull amm-mf' + k + '" x="0" y="0" width="' + VW + '" height="' + VH + '" fill="#fff"/>'; };
    d += '<mask id="' + id + 'mL" maskUnits="userSpaceOnUse" x="0" y="0" width="' + VW + '" height="' + VH + '">' + full('L') + '<path class="amm-draw amm-dL" d="' + open(SPL) + '" pathLength="1" fill="none" stroke="#fff" stroke-width="250" stroke-linecap="round" stroke-linejoin="round"/></mask>';
    d += '<mask id="' + id + 'mE" maskUnits="userSpaceOnUse" x="0" y="0" width="' + VW + '" height="' + VH + '">' + full('E') + '<path class="amm-draw amm-dE" d="' + open(SPE) + '" pathLength="1" fill="none" stroke="#fff" stroke-width="170" stroke-linecap="round" stroke-linejoin="round"/></mask>';
    d += '<mask id="' + id + 'mP" maskUnits="userSpaceOnUse" x="0" y="0" width="' + VW + '" height="' + VH + '"><rect x="0" y="0" width="' + VW + '" height="' + VH + '" fill="' + u('pilM') + '"/></mask>';
    if (refl) d += '<mask id="' + id + 'mR" maskUnits="userSpaceOnUse" x="0" y="' + FL + '" width="' + VW + '" height="' + RH + '"><rect x="0" y="' + FL + '" width="' + VW + '" height="' + RH + '" fill="' + u('rfade') + '"/></mask>';

    /* ---------- camadas ---------- */
    var faces = '', fitaB = '', fitaF = '', bri = '', piso = '';
    // piso e ambiente
    if (o.fundo && !small) piso += '<rect class="amm-halo" x="0" y="0" width="' + VW + '" height="' + vh + '" fill="' + u('halo') + '"/>';
    if (o.fundo && o.bokeh && th.bokeh && !small) {
      piso += '<g class="amm-bokeh" opacity=".9">' +
        '<circle cx="88" cy="1010" r="76" fill="' + u('warm') + '" opacity=".5"/>' +
        '<circle cx="1118" cy="240" r="76" fill="' + u('warm') + '" opacity=".45"/>' +
        '<circle cx="1132" cy="980" r="58" fill="' + u('warm') + '" opacity=".35"/></g>';
    }
    piso += '%%REFL%%';
    piso += '<ellipse class="amm-cshadow" cx="600" cy="' + FL + '" rx="640" ry="18" fill="' + u('cs') + '"/>';
    if (o.fundo) piso += '<rect class="amm-floor" x="-60" y="' + (FL - 0.8) + '" width="1320" height="1.6" fill="' + u('fline') + '"/>';
    piso += '<ellipse class="amm-floorlight" cx="900" cy="' + FL + '" rx="380" ry="34" fill="' + u('flr') + '"/>';

    // fita esquerda: banda com luz de aro (reaproveitada atrás e na frente)
    var rimP = open(cut(LP, 0, 12));
    var lBandFull = P(G.lBand, u('lb')) +
      S(open(cut(LR, 3, 11)), '#140E58', 52, ' opacity=".45" clip-path="' + u('cL') + '"') +
      '<g clip-path="' + u('cL') + '" fill="none">' +
        S(rimP, u('rim'), 52, ' opacity=".12"') + S(rimP, u('rim'), 40, ' opacity=".14"') + S(rimP, u('rim'), 29, ' opacity=".18"') +
        S(rimP, u('rim'), 19, ' opacity=".24"') + S(rimP, u('rim'), 9, ' opacity=".5"') +
        '<rect x="130" y="580" width="240" height="240" fill="' + u('rlit') + '"/></g>';

    // fita (atrás)
    fitaB += '<g mask="' + u('mL') + '">' + P(G.loopIn, u('loopIn')) + P(G.lens, u('lens')) +
      S(open(cut(QL, 0, 7)), '#EDA36C', 1.6, ' stroke-opacity=".85"') + lBandFull + '</g>';
    fitaB += '<g mask="' + u('mE') + '">' + P(G.hole, u('hole')) + P(G.eDark, u('edB')) + P(G.eLit, u('el')) +
      S(open(cut(EO, 0, 6)), '#9DB4FF', 2.5, ' opacity=".8"') + '</g>';

    // faces
    var mg = 'M812,534' + crv([[812, 534], [752, 644], [680, 777], [663, 820]]);
    var mglow = S(mg, '#5658F0', 40, ' opacity=".1"') + S(mg, '#5C62F4', 24, ' opacity=".14"') + S(mg, '#6670F8', 12, ' opacity=".2"');
    // vão do A (fundo escuro e lado interno da perna): sobe com o A; o M cresce do piso por cima dele
    faces += '<g class="amm-ctr">' + P(G.counter, u('ctr')) + P(G.mSide, u('ms'), ' class="amm-mside"') + '</g>';
    faces += '<g class="amm-part amm-m">' +
      mglow +
      P(G.mFacet, u('mfc')) + P(G.mFront, u('mf')) + P(G.mFront, u('mfx')) +
      S(open(MEDGE), '#86D8FF', 10, ' stroke-linecap="round" opacity=".32"') +
      S(open(MEDGE), '#F0FCFF', 4, ' stroke-linecap="round"') +
      S('M512,1270L560,1075', '#7F8FF0', 2, ' opacity=".45"') + '</g>';
    faces += '<g class="amm-part amm-r">' + P(G.rSide, u('rs')) + P(G.rFront, u('rf')) + P(G.rFront, u('rfV')) +
      S('M1026,671L1180,1271', '#E6F7FF', 2.5, ' opacity=".9"') + '</g>';
    faces += '<g class="amm-part amm-a">' +
      '<g class="amm-bev">' + P(G.bevel, u('bev')) + '<g clip-path="' + u('cB') + '">' + P(G.bevelDark, u('bd')) + '</g>' +
        S('M3.5,1263L298.6,845C321.2,813 324.6,782 346.8,750L766.4,144.6Q771,138 778.3,134.7L866,95.5', '#A6B6FF', 3, ' stroke-linejoin="round" opacity=".85"') + '</g>' +
      P(G.pBevel, u('pbv')) + P(G.white, u('wht')) +
      '<g clip-path="' + u('cW') + '">' +
        '<rect x="879" y="100" width="130" height="1180" fill="' + u('pil') + '" opacity=".9" mask="' + u('mP') + '"/>' +
        '<rect x="-20" y="80" width="1040" height="440" fill="' + u('pilV') + '"/>' +
        '<rect x="870" y="700" width="150" height="580" fill="' + u('pilB') + '"/>' +
        '<g class="amm-warm"><circle cx="520" cy="1060" r="380" fill="' + u('warm') + '"/>' +
        '<circle cx="960" cy="1262" r="160" fill="' + u('warm2') + '"/>' +
        '<circle cx="950" cy="672" r="190" fill="' + u('warm3') + '"/></g>' +
        '<g class="amm-shade"><circle cx="1010" cy="505" r="150" fill="' + u('psh') + '"/>' +
        '<path d="M1003,547L879,644L879,528L1003,428Z" fill="' + u('psh2') + '"/></g>' +
      '</g>' +
      S('M876,94L146,1283', '#FFFFFF', 2.2, ' opacity=".9"') +
      (th.outline ? S(G.white, '#B9C3DE', 2) : '') +
      '</g>';

    // brilhos desfocados (atrás das arestas)
    var gL = small ? '' : '<g class="amm-glow" filter="' + u('glow') + '" opacity=".85">' +
      S(open(cut(LR, 14, 23)), '#F78C16', 11, ' stroke-linecap="round"') +
      S(open(cut(LP, 11, 19)), '#E8661A', 9, ' stroke-linecap="round"') + '</g>' +
      '<g class="amm-glow amm-glow2" filter="' + u('glow2') + '" opacity=".42">' + S(open(cut(LR, 15, 21)), '#F78C16', 18, ' stroke-linecap="round"') + '</g>';
    var gE = small ? '' : '<g class="amm-glow" filter="' + u('glow') + '" opacity=".85">' +
      S(open(cut(EO, 5, 23)), '#F9A64A', 10, ' stroke-linecap="round"') +
      S(open(cut(EO, 21)), '#FFE6F2', 8, ' stroke-linecap="round" opacity=".7"') + '</g>' +
      '<g class="amm-glow amm-glow2" filter="' + u('glow2') + '" opacity=".32">' + S(open(cut(EO, 6, 15)), '#F9A64A', 12, ' stroke-linecap="round"') + '</g>';

    // fita (frente)
    fitaF += '<g mask="' + u('mE') + '"><g class="amm-ign">' + gE + '</g></g><g mask="' + u('mL') + '"><g class="amm-ign">' + gL + '</g></g>';
    fitaF += '<g mask="' + u('mE') + '" clip-path="' + u('cEf') + '">' + P(G.eDark, u('ed')) + P(G.eLit, u('el'), ' fill-opacity=".96"') +
      '<g clip-path="' + u('cEl') + '" fill="none" stroke-linecap="round">' + (small ? '' :
        '<g class="amm-ign"><g class="amm-glow" filter="' + u('glow') + '">' + S(open(cut(EO, 11)), '#FFF3E4', 22, ' opacity=".55"') + '</g></g>') + '</g>' +
      S(open(cut(EJ, 0, 17)), u('ejl'), 2.2) +
      S(open(cut(EO, 11)), '#FFF6E6', 3.5, ' stroke-linecap="round"') +
      '<circle cx="684" cy="814" r="36" fill="' + u('tw') + '"/></g>';
    fitaF += '<g mask="' + u('mL') + '" clip-path="' + u('cLf') + '">' + lBandFull + '</g>';
    fitaF += '<g mask="' + u('mL') + '">' + P(G.bshade, u('bsh')) + P(G.inner, u('inner')) + P(G.strip, u('strip')) +
      S(open(cut(LP, 1, 10)), u('lpe'), 3) +
      S(open(cut(LP, 8, 12)), u('lpw'), 2.2) +
      S(open(cut(LR, 4, 15)), u('rhl'), 2.5) +
      S(open(cut(LP, 11, 19)), '#FFD592', 2.2) +
      S(open(cut(LR, 14, 23)), '#FFF1D8', 3) + '</g>';

    // efeitos animados: flare da torção, varredura nas faces, corredor de luz e cabeças de luz da montagem.
    // mount() os põe num SVG próprio por cima do objeto: os laços redesenham só essa camada leve.
    var fxF = '', fxR = '';
    bri += '<circle class="amm-flare" cx="628" cy="1066" r="120" fill="' + u('flare') + '" opacity=".8"/>';
    if (!small) {
      fxF += '<g class="amm-sweepw" clip-path="' + u('cA') + '"><rect class="amm-sweep" x="-300" y="0" width="260" height="1400" fill="' + u('sweep') + '" transform="skewX(-28)"/></g>';
      var run = open(RUN), dash = ' pathLength="1000" stroke-dasharray="80 1100" stroke-dashoffset="80"';
      fxR += '<g class="amm-runner" fill="none" stroke-linecap="round">' +
        S(run, '#FFAE5C', 40, ' class="amm-run" stroke-opacity=".26"' + dash) +
        S(run, '#FFDCA6', 19, ' class="amm-run" stroke-opacity=".6"' + dash) +
        S(run, '#FFFFFF', 7, ' class="amm-run"' + dash) + '</g>';
      var head = function (k, path) {
        var hd = ' pathLength="1" stroke-dasharray=".028 2" stroke-dashoffset=".028"';
        return '<g class="amm-head amm-h' + k + '" fill="none" stroke-linecap="round">' +
          S(path, '#FFB262', 64, ' stroke-opacity=".16"' + hd) + S(path, '#FFD9A0', 30, ' stroke-opacity=".42"' + hd) +
          S(path, '#FFF8EC', 9, hd) + '</g>';
      };
      fxR += head('L', open(SPL)) + head('E', open(SPE));
    }
    var fx = '<g data-layer="brilho" class="amm-brilho">' + bri + '</g>' +
      (fxR ? '<g data-layer="fita" class="amm-fita amm-fitaX">' + fxR + '</g>' : '') +
      (fxF ? '<g data-layer="faces" class="amm-faces amm-facesX">' + fxF + '</g>' : '');

    var reflex = refl ? '<g class="amm-refl" mask="' + u('mR') + '" opacity="' + th.refl + '"><g class="amm-reflblur" filter="' + u('rblur') + '" transform="matrix(1 0 0 -1 0 ' + 2 * FL + ')"><use href="#' + id + 'faces"/><use href="#' + id + 'fitaF"/></g></g>' : '';
    piso = piso.replace('%%REFL%%', reflex);
    var body = '<g data-layer="piso" class="amm-piso">' + piso + '</g>' +
      '<g data-layer="fita" class="amm-fita amm-fitaB">' + fitaB + '</g>' +
      '<g data-layer="faces" class="amm-faces" id="' + id + 'faces">' + faces + '</g>' +
      '<g data-layer="fita" class="amm-fita amm-fitaF" id="' + id + 'fitaF">' + fitaF + '</g>';
    var open_ = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + VW + ' ' + vh + '" width="' + o.w + '" height="' + h + '"';
    if (mode === 'fx') return open_ + ' class="ammono-fx" aria-hidden="true" focusable="false"><defs>' + dx + '</defs>' + fx + '</svg>';
    return open_ + ' class="ammono amm-' + o.theme + (small ? ' amm-small' : '') + '" role="img" aria-label="Monograma A&amp;M da Alvarez &amp; Marsal">' +
      '<defs>' + d + (mode === 'main' ? '' : dx) + '</defs>' + body + (mode === 'main' ? '' : fx) + (o.debug ? dbg() : '') + '</svg>';
  }
  function dbg() {
    var s = '<g fill="none" stroke="#00FFD0" stroke-width="1.5" opacity=".9">';
    for (var k in G) s += '<path d="' + G[k] + '"/>';
    return s + '</g>';
  }

  /* ---------- montagem, laços e paralaxe ----------
     mount() cria <span class="amm-wrap"> com dois SVG empilhados: o objeto (svg.ammono, estático depois da
     montagem) e a camada de efeitos (svg.ammono-fx). Os laços de luz só redesenham a camada leve, e a paralaxe
     desloca os dois SVG por transform (composição na GPU), sem redesenhar os filtros do objeto. */
  function still() { try { return root.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function svgOf(el) { return el && el.querySelector ? el.querySelector('svg.ammono') : null; }
  function wrapOf(el) { return el && el.querySelector ? el.querySelector('.amm-wrap') : null; }
  function key(o) { return [o.w, o.anim, o.theme, o.reflexo, o.fundo, o.bokeh].join('|'); }

  function mount(el, opts) {
    if (!el) return null;
    var o = norm(opts), k = key(o), cur = svgOf(el), st = el.__amm;
    if (!st || st.key !== k || !cur || !wrapOf(el)) {
      if (st) { clearTimeout(st.t); unbind(el); }
      el.innerHTML = '<span class="amm-wrap" style="width:' + o.w + 'px">' + svg(o, 'main') + svg(o, 'fx') + '</span>';
      cur = svgOf(el);
      st = el.__amm = { key: k, anim: o.anim, t: 0 };
      if (o.anim) play(el);
    } else if (o.anim && !still() && !wrapOf(el).classList.contains('amm-in')) {
      wrapOf(el).classList.add('amm-loop');
    }
    if (o.parallax && !still()) bind(el); else unbind(el);
    return cur;
  }
  function play(el) {
    var w = wrapOf(el), st = el && el.__amm;
    if (!w || !st) return;
    clearTimeout(st.t);
    w.classList.remove('amm-in', 'amm-loop');
    if (!st.anim || still()) return;
    void w.getBoundingClientRect();
    w.classList.add('amm-in');
    // fim da montagem: sai a classe de entrada (estado final = estilo padrão) e entram os laços de luz
    st.t = setTimeout(function () { w.classList.remove('amm-in'); w.classList.add('amm-loop'); }, INTRO);
  }
  function stop(el) {
    var w = wrapOf(el), st = el && el.__amm;
    if (!w) return;
    if (st) clearTimeout(st.t);
    w.classList.remove('amm-in', 'amm-loop');
  }
  // paralaxe: grava --amm-x/--amm-y (-1..1) no invólucro; o CSS desloca os dois SVG juntos
  function setXY(el, x, y) {
    var w = wrapOf(el);
    if (w) { w.style.setProperty('--amm-x', x.toFixed(3)); w.style.setProperty('--amm-y', y.toFixed(3)); }
  }
  function bind(el) {
    if (el.__ammPx) return;
    var raf = 0, X = 0, Y = 0;
    var mv = function (e) {
      var r = el.getBoundingClientRect();
      if (!r.width) return;
      X = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      Y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; setXY(el, X, Y); });
    };
    var lv = function () { setXY(el, 0, 0); };
    root.addEventListener('pointermove', mv, { passive: true });
    document.addEventListener('pointerleave', lv);
    el.__ammPx = function () { root.removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv); setXY(el, 0, 0); };
  }
  function unbind(el) { if (el.__ammPx) { el.__ammPx(); el.__ammPx = null; } }

  /* ---------- auto-montagem: <div class="am-mono" data-w="420" data-anim="false"> ---------- */
  function flag(v, def) { return v == null || v === '' ? def : !(v === 'false' || v === '0' || v === 'no'); }
  function auto() {
    var L = document.querySelectorAll('.am-mono');
    for (var i = 0; i < L.length; i++) {
      var e = L[i], ds = e.dataset || {};
      if (e.__amm) continue;
      mount(e, {
        w: ds.w ? +ds.w : undefined, anim: flag(ds.anim, true), theme: ds.theme,
        reflexo: ds.reflexo == null ? undefined : flag(ds.reflexo, true), fundo: flag(ds.fundo, true),
        bokeh: flag(ds.bokeh, true), parallax: flag(ds.parallax, false)
      });
    }
  }
  root.AMMono = { svg: function (opts) { return svg(opts); }, mount: mount, play: play, stop: stop };
  if (root.document) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto);
    else auto();
  }
})(window);
