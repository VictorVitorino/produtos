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
    part: "Parte", partCaps: "PARTE", pages: "telas", page: "tela", chapterSkip: "clique ou → para continuar",
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
    ["Conteúdo", "2 · Exemplos de conteúdo", "Três páginas preenchidas: texto e números, painel e cartões, fases e tabela.", "#F78C16", "2"],
    ["Layouts", "3 · Layouts", "Duas e três colunas, gráfico ampliável.", "#5E8AB4", "3"],
    ["Variações", "4 · Variações", "Corpo escuro e conteúdo dividido em duas páginas.", "#1F3263", "4"],
    ["Encerramento", "5 · Encerramento", "Página de fecho com composição própria.", "#33556D", "5"],
  ],
  /* cartão de capítulo exibido ao entrar numa seção (avançando): [número, título, texto] */
  chapters: {
    "1 · Abertura": ["01", "Abertura", "Agenda gerada a partir das seções. Página de conteúdo padrão."],
    "2 · Exemplos de conteúdo": ["02", "Exemplos de conteúdo", "Páginas preenchidas mostram a estrutura de uma tela com conteúdo. Troque os textos e mantenha a estrutura."],
    "3 · Layouts": ["03", "Layouts", "Grades de duas e três colunas. Gráfico com ampliação."],
    "4 · Variações": ["04", "Variações", "Corpo escuro. Conteúdo que não cabe vira duas páginas."],
  },

  /* ids dos elementos que podem ser ampliados (ícone ⤢ e duplo clique) */
  zoom: ["exGrafico", "exQuadro", "exNumeros", "exFases"],

  /* texto de "Sobre este slide": use data-desc em cada <section>; este é o padrão quando faltar */
  descDefault: "Página do molde de apresentação.",
  desc: {},
};
