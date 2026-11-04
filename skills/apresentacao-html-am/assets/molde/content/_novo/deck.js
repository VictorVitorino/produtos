/* CONFIGURAÇÃO DO DECK — tudo o que é específico do cliente e do conteúdo, fora das páginas. */
window.DECK = {
  brandSub: "Cliente · Projeto",            // linha abaixo de "Alvarez & Marsal" no cabeçalho
  rightLabel: "Proposta · Tema",            // rótulo à direita do cabeçalho (aceita &amp;)
  client: { name: "Cliente" },              // marca do cliente em texto, ou { logo: "cliente", alt: "Cliente" } com ASSET.cliente em assets.js
  footLabel: "CLIENTE · PROJETO · TEMA",    // rótulo fixo do rodapé (texto puro: use & e não &amp;)

  /* textos da interface; para deck em inglês, troque pelos valores do comentário */
  ui: {
    part: "Parte", partCaps: "PARTE", pages: "telas", page: "tela", chapterSkip: "clique ou → para continuar",
    zoomHint: "⤢ amplia gráficos", zoomBtn: "Ampliar (duplo clique também amplia)",
    close: "Fechar", closeHint: "Esc ou clique fora para fechar",
    about: "Sobre este slide", aboutKey: "Sobre este slide (tecla I)",
    index: "Índice", indexKey: "Índice · escolha a página (tecla G)",
    prev: "Voltar", next: "Avançar", defaultPart: "Capa", brand: "Alvarez &amp; Marsal",
    // EN: part:"Part", partCaps:"PART", pages:"pages", page:"page", chapterSkip:"click or → to continue", zoomHint:"⤢ zoom charts",
    //     zoomBtn:"Zoom (double-click also zooms)", close:"Close", closeHint:"Esc or click outside to close",
    //     about:"About this slide", aboutKey:"About this slide (key I)", index:"Index", indexKey:"Index · choose a page (key G)",
    //     prev:"Back", next:"Next", defaultPart:"Cover"
  },

  /* seções: [rótulo da trilha, chave = data-p das páginas, descrição (agenda), cor (agenda), rótulo curto (trilha estreita)] */
  parts: [
    ["Capa", "Capa", "", "", "▸"],
    ["Seção", "1 · Nome da seção", "Uma linha sobre o que a seção cobre.", "#002B49", "1"],
    ["Encerramento", "2 · Encerramento", "", "", "2"],
  ],
  /* cartão de capítulo ao entrar numa seção (avançando): [número, título, texto curto] */
  chapters: {
    "1 · Nome da seção": ["01", "Nome da seção", "Uma ou duas frases que preparam o leitor para a seção."],
  },
  zoom: [],                                  // ids de gráficos/blocos ampliáveis (ou DECK.zoom.push("id") nas cenas)
  descDefault: "Página da apresentação.",   // "Sobre este slide" quando a página não tem data-desc
  desc: {},
};
