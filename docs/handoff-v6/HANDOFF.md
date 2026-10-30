# Passagem de bastão · DTS Planejamento Estratégico 2027 (versão V6)

Escrito em 30/10/2026, às 00h10, durante a sessão do Claude Code. Quem continuar (outra IA ou pessoa) deve ler este arquivo,
depois `SPEC.md` (o que dizer e como o deck deve ser) e `CONTRACT.md` (como montar cada slide). Os pedidos originais do usuário,
na ordem em que foram feitos, estão em `pedidos_do_usuario.txt`.

> Caminhos do tipo `/tmp/claude-0/.../scratchpad/v6/...` que aparecem nos arquivos desta pasta valem hoje como `docs/handoff-v6/...`
> (e `$V/tools` = `docs/handoff-v6/tools`). A pasta de trabalho original some quando a sessão acaba.
> As ferramentas usam Node + Playwright (`require("/opt/node22/lib/node_modules/playwright")` e Chromium em `/opt/pw-browsers/chromium`);
> ajuste esses dois caminhos se o ambiente for outro.

## 1. O que é

Apresentação executiva em HTML único (e PDF) da área **DTS (Digital & Technology Services) da Alvarez & Marsal Brasil**:
revisão do portfólio de **29 serviços atuais, em 4 pilares**, que vira **24 produtos** (5 manter · 15 aprimorar com IA · 4 criar com IA),
com pesquisa de mercado, benchmark de consultorias, raio-X do portfólio, fichas dos 24 produtos, roadmap e decisões para o comitê.
O usuário é líder da DTS, fala português do Brasil e quer linguagem executiva, concreta e com lógica.

## 2. Onde está o código

- GitHub: `VictorVitorino/produtos`, branch **`claude/pensive-fermat-fijb3d`** (não abrir PR sem o usuário pedir).
- O entregável antigo, **V5**, continua em `DTS_Portfolio_Estrategico_2027.html` e `.pdf` (20 slides; PDF de 56 páginas). **Ele ainda não foi substituído pela V6.**
- `python3 build.py --out caminho.html` gera o HTML a partir de `src/`. O build **recusa rodar sem `--out`**; `python3 build.py --final` é o único que sobrescreve o arquivo principal (usar só na integração).
- `src/`: `slides/NN-*.html` (um por slide), `versos/NN-*.html` (verso de cada slide), `css/` e `js/` (um módulo `30-sNN-*` por slide, mais `02-componentes.css`, `25-pilares.*` para os pilares, `40-fichas.*`, `07-verso.*`, `06-mascote.*`, `07-monograma.*`), `data/` (`00-base.js` pilares e 29 serviços, `05-fontes.js` registro de fontes e fatos, `06-fatos-<dono>.js` fatos que cada autor verificou, `11…14-produtos-pN.js` as 24 fichas, `20-timelines.js`, `30-jogos.js`, `01-capitulos.js`), `core.js`/`engine.js`/`styles.css` (moldura, navegação, impressão), `assets/` (logos A&M e DTS, fontes Barlow Condensed).
- Também no repositório, sem relação com o deck: `prototipo-ciclo-agentico/` (protótipo em Python de um ciclo com agente, 32 testes) e `pesquisa/` (4 relatórios de pesquisa de mercado, com URLs e datas).

## 3. Histórico em poucas linhas

1. Pedido inicial: revisar os 29 serviços, pesquisar o mercado brasileiro e as consultorias (nomes, IA, ferramentas), separar evidência de hipótese, propor o novo portfólio e uma one-page com ficha por produto; usar a paleta A&M, logos A&M e DTS, os efeitos do guia de design DTS e storytelling, em no máximo 20 slides.
2. V1 a V4: capa com Particle System (repelir e atrair), slide com Shimmer/Holographic Sweep e escudo DTS, spotlight por pilar, forças, benchmark, raio-X, três caminhos, 29→24, one-page, pilares (Morphing, antes e depois), fábrica (Card Stack), roadmap (Timeline Motion). Várias rodadas de feedback: sem quebra de linha em rótulos, sem texto cortado, sem espaços vazios, textos executivos e lúdicos.
3. V5: o usuário mostrou o deck "DTS Tech M&A" (referência) e 4 telas favoritas; o deck foi refeito nesse padrão, com revisão adversarial (100 correções). Entregue em HTML e PDF.
4. Análise paralela: o usuário enviou uma proposta de terceiros de automação agêntica de um ciclo de custos e perguntou se a A&M entrega isso e se é viável com Claude. Resposta dada: a A&M não tem esse produto; entraria como **2.7 Agentic Process Automation** (25º produto, no Pilar 2) ou dentro do 2.6; viável tecnicamente (cerca de 35% do esforço é código; o resto é acesso, regras, aprovações e adoção); um protótipo sintético foi construído em `prototipo-ciclo-agentico/`. **Decisão pendente do usuário:** 2.7 como 25º produto ou dentro do 2.6.
5. **V6 (em andamento)**: o usuário enviou o deck da **APODI** como modelo de layout (margens, alturas, moldura) e pediu para refinar toda a apresentação (detalhes na seção 4).

## 4. O pedido atual (V6), nas palavras do usuário, e o que significa

> "Preciso melhorar essa apresentação… primeiro colocando em um layout mais agradável (arquitetura do layout, vou deixar o modelo da APODI… na questão de margem, altura, modelo etc.).
> Preciso revisar esse planejamento estratégico e trazer de forma executiva e não genérica as informações. Precisa ter lógica, precisa ter contexto, precisa ter valor e não estou falando de algo monetário, precisa ter peso.
> Melhore as descrições, não traga siglas que nós não sabemos, não invente números, tenha um botão para virar a página e demonstrar as fontes, o contexto detalhado (escrita mesmo).
> Vamos refinar todo o material, preciso realmente criar propostas lúdicas etc. (Personagem AM… construa um mascote com base na imagem.) Revise o storytelling."

Pedidos adicionados depois, ainda na V6:
- "Não é para trazer nada de pessoas da AM" → **nenhuma foto, nome, cargo ou perfil de pessoas da A&M em lugar nenhum** (as fotos que o usuário subiu em `src/assets/equipe/` ficam fora do deck).
- "É basicamente para melhorar e deixar no padrão a apresentação de gestão de portfólio." → não refazer a estratégia; manter 29→24, 4 pilares, fichas.
- "Precisamos mudar quase todas as capas; essa bola ficou horrível; melhore as capas em geral; traga outros modelos de efeitos compatíveis com o contexto." → capas de capítulo novas, sem o blob do Morphing.
- "Na capa principal precisamos ter o LOGO grande AM ou criar um mascote para AM com base nessa imagem… é um A com M, de Alvarez and Marsal… reconstrua a imagem e não coloque a imagem cravada." → monograma A&M grande na capa, em vetor.
- "Ficou péssima a imagem. Precisamos desconstruir ela e criar uma que é compatível, com cores etc. Adapte ao contexto da apresentação." → a reconstrução 3D fiel (violeta) foi **reprovada**; está sendo redesenhada.
- "Pq está demorando tanto?" → ver seção 8.

## 5. Regras permanentes do usuário (valem para tudo)

- Layout no **modelo APODI**: palco 1600×900, cabeçalho navy (80 px), faixa da seção (50 px), corpo branco com margem lateral de 12 px, rodapé fino, barra de capítulos e botões fora do palco (medidas exatas em `SPEC.md` §3; a fundação já as reproduz com diferença desprezível).
- **No máximo 20 slides.** Capas de capítulo e fichas não contam.
- **Nenhuma quebra de linha** em nomes, títulos, chips e rótulos; nada cortado; sem reticências em texto visível; sem áreas vazias grandes. Corpo ≥ 13 px, notas ≥ 11 px.
- **Sem número inventado**: só fato verificado do registro (`<span data-fato="id">`) ou contagem estrutural do portfólio (4 pilares, 29 serviços, 24 produtos, 5/15/4, 4/13/10/2…). Prazos, preços, metas, escores e tamanhos de amostra viram palavras.
- **Sem sigla desconhecida**: só TI, IA, A&M, DTS, CEO, CFO, CIO, CTO, ERP, M&A, RH, SAP, LGPD; o resto por extenso (tabela em `SPEC.md` §5). Nome do produto 3.5: **Private Equity Tech Value Radar**; do 3.3: **Integration & Separation Office**. Base: **"Plataforma de Dados e AI"**.
- Paleta A&M: navy, cinza, azul, **laranja só como detalhe** (nunca texto laranja sobre fundo claro). Logos A&M e DTS em `src/assets/`.
- Títulos afirmam a conclusão (uma linha) + subtítulo (uma linha) + prova + barra "E daí?".
- Botão **"Virar a página"** em todo slide: o verso traz contexto escrito (300 a 380 palavras, quatro blocos) e as fontes com link.
- Efeitos do guia DTS que o usuário quer ver: Particle System (capa; repelir e atrair), Shimmer/Holographic Sweep (DTS hoje), Spotlight/Focus (portfólio atual), Node Network (seis forças), Timeline Motion (benchmark 2026 e roadmap), Before/After (29→24 e antes/depois dos pilares), Morphing (grafo dos pilares), Card Stack (fábrica), Flip Card (jogos). Catálogo completo de 40 efeitos no guia DTS (arquivo do usuário).
- Feedbacks antigos que continuam valendo (ver `pedidos_do_usuario.txt`, mensagens 4 e 7): seis forças sem texto desalinhado e sem excesso de links; benchmark só de 2026, com contexto e sem siglas; raio-X com dica quebrada por assunto e, ao clicar num pilar, os outros devem apagar; spotlight do portfólio executivo e separado por assunto; bordas das categorias mais visíveis.

## 6. Roteiro V6 (20 slides) e efeitos

| # | Slide | Efeito principal |
|---|---|---|
| 1 | Capa | monograma A&M grande + Particle System (repelir e atrair) + digitação animada |
| 2 | Sumário (trilha de 5 paradas; estreia do mascote) | trilha animada |
| 3 | DTS hoje | Shimmer / Holographic Sweep + escudo DTS |
| 4 | Portfólio atual | Spotlight por pilar (4 assuntos) |
| 5 | Seis forças | rede de nós, passo a passo |
| 6 | Benchmark 2026 | Timeline Motion |
| 7 | Raio-X dos 29 serviços e Três caminhos (2 painéis) | spotlight, matriz qualitativa (sem escores) |
| 8 | De serviços a produtos (29→24) | Before/After |
| 9 | One-page dos 24 produtos | conectores, spotlight, "Nome de hoje" |
| 10–17 | Pilares 1 a 4, cada um com "Cliente e mercado" e "Produtos" (2 painéis) | Morphing do grafo, cartas de produto, antes e depois |
| 18 | Fábrica de produtos (7 portões) | Card Stack |
| 19 | **Jogos de entrada** (as propostas lúdicas: Mesa do Conselho, Pré-mortem 2027, Jogo do Dia 1, Exercício de Crise) | cartas que viram |
| 20 | Roadmap e decisões (trilha de tabuleiro, 4 ondas) | Timeline Motion |

Capas de capítulo (Partes 1 a 5 e abertura de cada pilar): um efeito do guia por capa, definido em `SPEC.md` §2.1 (Floating Elements, Animated Shader + Pulse, Heatmap, Hologram 3D Cards + Counter, Motion Graphics + Icon Motion + Counter, BPMN Flow).

## 7. Estado atual (30/10, 00h10)

**Pronto e verificado**
- **Fundação** (commit `c4ca436`): moldura APODI, navegação (teclas e botões), índice, abas de capítulo, "Virar a página" em 3D com verso, impressão com frente e verso intercalados (PDF de teste com 78 páginas), divisórias no modelo APODI, fichas de produto no novo padrão, escala responsiva (1280×720 a 2560×1440). Testes: navegação 70/70, responsividade 87/87, 24 fichas cabem sem rolagem, zero erro de console.
- **Mascote AM** (`src/js/06-mascote.js`, `src/css/06-mascote.css`): API `window.AMMasc`, 10 poses (aceno, aponta, pensa, lupa, lanterna, capacete, apresentador, bandeira, livro, comemora), baseado no monograma A&M da imagem do usuário.
- **Registro de fontes e fatos** (`src/data/05-fontes.js` + `src/data/06-fatos-<dono>.js`): hoje **186 fatos e 163 fontes**; **85 verificados** (usáveis como número), **94 "a verificar"** (não usar), **4 fracos** (só em texto, com ressalva: `genai-sem-impacto-95`, `comprar-vs-construir-67`, `alixpartners-cio-interino`, `erp-apuracao-no-erp-53`) e **3 divergentes** (não usar: `agentes-investem-br-40`, `barreira-conhecimento-44`, `lei-do-bem-2024`). Os autores dos slides acrescentam fatos que eles mesmos verificaram na web. Relatório da auditoria inicial em `fatos_verificados.md` (175 fatos, 68 verificados naquele momento).
- **24 fichas reescritas** (`src/data/11…14-produtos-pN.js`) sem siglas desconhecidas nem números sem fonte; **4 jogos de entrada** em `src/data/30-jogos.js`.
- **Auditoria do deck V5** em `auditoria.md` (296 números classificados, 283 siglas, 123 frases genéricas, 98 problemas de lógica).

**Reescrita dos slides (feita por agentes; autor + revisor independente por dono)**

| Dono | Slides | Situação em 00h10 |
|---|---|---|
| partida | 03, 04 | autor terminou; **revisão pendente** |
| forcas | 05 | autor terminou; **revisão pendente** |
| benchmark | 06 | autor reiniciado agora; falta tudo |
| posicao | 07 e textos de `src/data/00-base.js` | autor reiniciado agora; falta tudo |
| portfolio | 08, 09 | começando agora; falta tudo |
| capas | divisórias | começando agora; falta tudo |
| abertura | 01, 02 | começando agora (a capa depende do novo monograma) |
| pilar-1 (também o motor `25-pilares.*`) | 10, 11 | autor na verificação final; revisão pendente |
| pilar-2, pilar-3, pilar-4 | 12–17 | não começaram (dependem do motor do pilar 1) |
| fabrica-jogos | 18, 19 | autor terminou; **revisão pendente** |
| roadmap | 20 | autor em andamento |

Versos escritos até agora: 03, 04, 05, 10, 11, 18, 19. **Ainda "Em construção": 01, 02, 06, 07, 08, 09, 12 a 17 e 20.**

**Monograma da capa**: a versão 3D fiel (`src/js/07-monograma.js`, API `window.AMMono` com `mount/play/stop/svg`) foi **reprovada**. Três conceitos novos estão sendo criados (constelação de partículas, planos geométricos, traço técnico/blueprint); um diretor de criação escolhe, lapida e instala com a mesma API, para a capa não precisar mudar.

## 8. Por que está demorando (resposta ao usuário)

- A V6 não é uma troca de tema: são 20 slides, 20 versos de contexto, 24 fichas, 9 capas de capítulo, um mascote e um monograma novos, com layout novo.
- Cada slide passa por um autor e depois por um revisor independente (sócio, checagem de fatos e design), e cada um monta o deck, captura todas as telas e roda a auditoria. Isso leva cerca de 35 minutos por etapa.
- O computador está quase parado (carga ≈ 0,3), mas cada frente de trabalho só roda **2 agentes por vez** (limite do ambiente: processadores − 2). Com 14 etapas por frente, a fila era de 3 a 4 horas. Redistribuí o trabalho em mais frentes paralelas para cortar isso.
- A fundação e o conteúdo-base (fontes verificadas na web, fichas, mascote) precisavam ficar prontos antes dos slides: cerca de 3 horas.

## 9. Próximos passos, em ordem

1. Esperar ou refazer os agentes em andamento (ver seção 10) e colocar os slides restantes no padrão do slide 04 (`src/slides/04-portfolio-atual.html`, `src/css/30-s04-…`, `src/js/30-s04-…`), seguindo `CONTRACT.md`.
2. Escrever os 13 versos que faltam (`CONTRACT.md` §13) com fontes `<li data-f="id">` do registro; verificar fatos novos na web antes de usar (registrar em `src/data/06-fatos-<dono>.js`).
3. Instalar o monograma desconstruído na capa (`window.AMMono`) e conferir a capa com Particle System.
4. Capas de capítulo novas (`SPEC.md` §2.1), sem o blob.
5. Revisão global (sócio, fatos, design) nos 20 slides, nas duas vistas, nos versos e nas 24 fichas: `audit.js` sem apontamentos, `nav.js`, `resp.js`, `fichas.js`, `pdf.js --ordem`.
6. `python3 build.py --final`, gerar o PDF (`tools/pdf.js`), atualizar `README.md` (ainda descreve a V5), commit e push.
7. Perguntar ao usuário a decisão pendente do 2.7 (25º produto ou dentro do 2.6).

## 10. O que acontece com os agentes em andamento

Os agentes do Claude Code escrevem **direto nos arquivos** de `src/`. Se a sessão acabar, o que não foi commitado se perde. Por isso, antes de trocar de IA, convém fazer um commit e push do estado atual (feito junto com este documento). O que está pela metade (versos "Em construção", slides ainda no formato V5 dentro da moldura nova) funciona e não quebra o build, mas ainda mostra texto da V5. Cada dono de slide só pode editar seus próprios arquivos (tabela em `CONTRACT.md` §2), para não haver conflito.

## 11. Armadilhas e lições

- Todos os `<script>` dividem o mesmo escopo global: escreva o JS de cada slide dentro de uma função anônima autoexecutável.
- Mudanças de texto em `src/data/00-base.js` (`OLD[].w`, níveis do raio-X) aparecem em mais de um lugar (raio-X, "Antes e depois" dos pilares, one-page).
- O número de slides é fixo em 20; se criar um slide novo, tire outro ou funda.
- Fatos divergentes ou fracos do registro: não usar como número (lista na seção 7). Antes de usar qualquer fato "a verificar", confirme na fonte e registre com status "verificado" e a observação do que foi visto.
- Correções de fatos da V5 que os textos novos devem respeitar: 274 negócios de TI são do 1º semestre de 2025; sinergias da MBRF são R$ 805 mi/ano; 23% de pilotos escalados é Brasil (25% é mundo); 53% da KPMG é talento para transformação digital; PwC–ToltIQ não é exclusiva; a empresa de serviços de IA dos fundos com a Anthropic foi anunciada em 04/05/2026.
- O Inter (fonte do texto) não vai embutido (como no modelo APODI); sem internet cai para Helvetica/Arial.
- O PDF fica leve se imprimir sem sombras e desfoques (`tools/pdf.js` já faz isso).

## 12. Arquivos que o usuário precisa levar para a outra IA (não estão no repositório)

- O deck modelo da **APODI** (`AM - APODI - Resumo Executivo.html`) e o **guia de design de efeitos DTS** (`DTS - Guia de Design para apresentações.html`), que servem de referência de layout e de código dos efeitos.
- A imagem do monograma A&M 3D (referência para a capa e o mascote).
- O deck de referência "DTS Tech M&A" e a apresentação TMG (opcionais: o V5 já incorporou o padrão).

## 13. Prompt sugerido para colar na outra IA

> Você vai continuar a versão V6 da apresentação "Planejamento Estratégico · Produtos, Serviços e Inteligência Artificial" da DTS (Alvarez & Marsal Brasil). Repositório: github.com/VictorVitorino/produtos, branch `claude/pensive-fermat-fijb3d`. Leia, nesta ordem, `docs/handoff-v6/HANDOFF.md`, `SPEC.md` e `CONTRACT.md`. Use `python3 build.py --out /tmp/x.html` para gerar o deck e as ferramentas de `docs/handoff-v6/tools/` para capturar telas e auditar. Regras que não podem ser quebradas: nada de pessoas da A&M; nenhum número sem fato verificado; só as siglas permitidas; uma linha por título e rótulo, sem corte nem vazio grande; no máximo 20 slides; layout no modelo da APODI. Comece pelos slides que ainda estão no formato antigo e pelos versos "Em construção", copiando o padrão do slide 04, e termine com revisão global, `python3 build.py --final`, PDF e README.
