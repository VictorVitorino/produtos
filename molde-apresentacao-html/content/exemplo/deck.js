/* CONFIGURAÇÃO DO DECK — tudo o que é específico do cliente e do conteúdo, fora das páginas.
   As páginas ficam em slides/*.html; o motor (shell/nav.js) lê este objeto. */
window.DECK = {
  /* cabeçalho de cada página: subtítulo da marca, rótulo à direita e marca do cliente */
  brandSub: "Cliente · Projeto",
  rightLabel: "Proposta · Tema",
  client: { name: "Cliente" },              // ou { logo: "cliente", alt: "Cliente" } com ASSET.cliente em assets.js
  /* rodapé: rótulo fixo à esquerda (texto puro) */
  footLabel: "CLIENTE · PROJETO · TEMA",

  /* textos da interface (os omitidos usam o padrão em português da referência) */
  ui: {
    part: "Parte", partCaps: "PARTE", pages: "telas", chapterSkip: "clique ou → para continuar",
    zoomHint: "⤢ amplia gráficos", zoomBtn: "Ampliar (duplo clique também amplia)",
    close: "Fechar", closeHint: "Esc ou clique fora para fechar",
    about: "Sobre este slide", aboutKey: "Sobre este slide (tecla I)",
    index: "Índice", indexKey: "Índice · escolha a página (tecla G)",
    prev: "Voltar", next: "Avançar", defaultPart: "Capa", brand: "Alvarez &amp; Marsal",
  },

  /* seções → trilha de seções, índice, agenda automática e capítulos.
     [rótulo da trilha, chave = data-p das páginas, descrição (agenda), cor (agenda), rótulo curto (trilha estreita)] */
  parts: [
    ["Capa", "Capa", "", "", "▸"],
    ["Abertura", "1 · Abertura", "Agenda e página de conteúdo padrão.", "#002B49", "1"],
    ["Layouts", "2 · Layouts", "Duas e três colunas, gráfico ampliável.", "#5E8AB4", "2"],
    ["Variações", "3 · Variações", "Corpo escuro e conteúdo dividido em duas páginas.", "#F78C16", "3"],
    ["Encerramento", "4 · Encerramento", "Página de fecho com composição própria.", "#33556D", "4"],
  ],
  /* cartão de capítulo exibido ao entrar numa seção (avançando): [número, título, texto] */
  chapters: {
    "1 · Abertura": ["01", "Abertura", "Agenda gerada a partir das seções. Página de conteúdo padrão."],
    "2 · Layouts": ["02", "Layouts", "Grades de duas e três colunas. Gráfico com ampliação."],
    "3 · Variações": ["03", "Variações", "Corpo escuro. Conteúdo que não cabe vira duas páginas."],
  },

  /* ids dos elementos que podem ser ampliados (ícone ⤢ e duplo clique) */
  zoom: ["exGrafico", "exQuadro"],

  /* texto de "Sobre este slide": use data-desc em cada <section>; este é o padrão quando faltar */
  descDefault: "Página do molde de apresentação.",
  desc: {},
};
