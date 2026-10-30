# Briefs por dono de slide (fase 3)

Cada dono lê: SPEC.md (inteira, em especial §0 regra absoluta sobre pessoas, §2 o seu slide, §4 números, §5 siglas, §6 verso, §7 mascote, §9 pronto), CONTRACT.md (como escrever slide e verso), `auditoria.md` (problemas do slide na versão anterior), `fontes_index.md` e `fatos_verificados.md` (só fatos "verificado"), e o slide atual no repositório.

## abertura — slides 01 Capa e 02 Sumário
- Capa: herói = o monograma A&M (o "A com M"). **ATUALIZAÇÃO 29/10 23:45 — o usuário reprovou a reconstrução fiel em 3D ("ficou péssima; precisamos desconstruir e criar uma compatível, com cores etc., adaptada ao contexto da apresentação").** Uma frente de design está criando um **monograma desconstruído**, na paleta A&M e na linguagem do deck (partículas, linhas finas, planos). Ele entra pela MESMA API: `window.AMMono.mount(el, opts)`, `play(el)`, `stop(el)` (src/js/07-monograma.js). Monte a capa com um contêiner à direita (≈ 820×900, `class="am-mono"`), chame `mount/play` na entrada e `stop` na saída, e **não dependa da aparência atual** (nada de halo, bokeh ou fundo afinado para o 3D violeta). Particle System mantido (repelir e atrair); título com Animated Typography; logos A&M e DTS embaixo à esquerda; sem mascote na capa; impressão com estado final estático.
- Sumário: como o "Súmario Executivo" da APODI (painel navy, título, cinco partes numeradas clicáveis). À direita, a trilha (tabuleiro com cinco paradas) com a estreia do mascote, pose aponta, e o balão "Eu sou o AM. Cinco paradas, uma pergunta: como vender o que o cliente passou a comprar?". As paradas acendem em sequência na entrada.
- Versos: capa (o que é o documento, para quem, regra da casa: todo número tem fonte; o que é proposta nossa aparece em palavras); sumário (método da pesquisa: quatro frentes em 06/10/2026, tipos de fonte, o que é fato e o que é leitura nossa, limitações; a verificação de fatos feita nesta versão).

## capas — todas as divisórias de capítulo (Partes 1–5 e aberturas dos 4 pilares)
- SPEC §2.1: nenhuma "bola"/blob. Família visual da divisória da APODI + um efeito do Guia DTS por capa: Parte 1 fx 32 Floating Elements; Parte 2 fx 40 Animated Shader / Hero + fx 19 Pulse / Beacon; Parte 3 fx 14 Heatmap Animation; Parte 4 fx 03 Hologram 3D Cards + fx 12 Counter Animation; Pilares fx 01 Motion Graphics + fx 02 Icon Motion + fx 12 Counter Animation (serviços cinza → cartões de produto por status; 10 → 7, 7 → 6, 8 → 5, 4 → 6); Parte 5 fx 17 BPMN Flow Motion.
- Referência de implementação: o próprio Guia DTS (`scratchpad/786c3fa0.stripped.html`, procure `fx-floating-elements`, `fx-animated-shader-hero`, `fx-pulse-beacon`, `fx-heatmap-animation`, `fx-hologram-3d-cards`, `fx-counter-animation`, `fx-motion-graphics`, `fx-icon-motion`, `fx-bpmn-flow-motion`) — adapte o código e o visual para a marca A&M e para o conteúdo.
- Dono do código de renderização das transições de capítulo (onde a fundação o colocou) + `src/js/28-capas.js` e `src/css/28-capas.css`.
- Impressão: cada capa pode virar página própria só se a fundação já imprime as divisórias; senão, não imprimir capas (as transições não contam como slide).

## partida — slides 03 DTS hoje e 04 Portfólio atual
- 03: Shimmer/Holographic Sweep + escudo DTS (manter o efeito que o usuário pediu). Números estruturais do portfólio oficial. Cadeia de valor da A&M (áreas do portfólio oficial). Barra "E daí?". Sem pessoas.
- 04: já tem implementação de referência da fundação; lapidar o texto do spotlight (quatro assuntos por pilar) e o TC/Sub.
- Versos de ambos.

## mercado-forcas — slide 05 Seis forças
- Rede de nós com passo a passo (→ percorre as seis forças). Para cada força: o que mudou (fato verificado), o que o cliente passa a exigir, por que pesa para a DTS. Sem nomes de produtos novos. Sem os números gerais que o usuário mandou tirar. Painel legível, sem texto desalinhado, sem excesso de links.
- Impressão: página extra com as seis forças completas (se precisar), ou tudo visível na própria página.
- Verso.

## mercado-benchmark — slide 06 Benchmark 2026
- Linha do tempo só de 2026 (Timeline Motion), um evento por mês com fato verificado; texto de contexto; quatro sinais com "o que isso significa para nós" sem nomes de produtos DTS; movimentos da A&M global escritos como instituição (sem nomes de pessoas).
- Verso.

## posicao — slide 07 Raio-X e caminhos (dois painéis)
- Painel 1: quadro qualitativo dos 29 serviços sem escores; spotlight por pilar (clicar P1 apaga os demais); dica por serviço em quatro assuntos (Demanda · Direito de vencer · Decisão · Vai para); contagens 4 · 13 · 10 · 2. Mascote pequeno pose lupa.
- Painel 2: três caminhos com prós e contras em palavras e a recomendação.
- Dados: `OLD` em src/data/00-base.js tem escores numéricos (x, y) da versão anterior; NÃO mostrar números; se precisar posicionar, use níveis qualitativos (alto/médio/baixo) que você justificar no verso — pode reclassificar e registrar o critério.
- Verso.

## portfolio — slides 08 Ponte e 09 One-page
- 08: Before/After slider 50/50 (29 → 24), "o que muda de nome" (exemplos claros, sem siglas), definição de produto.
- 09: sistema de 24 produtos por pilar, fio conector, base "Plataforma de Dados e AI", status (Manter · Aprimorar com IA · Criar com IA) e ★ A&M Signature explicado; clique abre a ficha; modo "Nome de hoje". Cartas de produto com toque lúdico (carta colecionável), sem poluir.
- Versos.

## pilar-1 / pilar-2 / pilar-3 / pilar-4 — slides 10–17
- Cliente e mercado (dois painéis: O que o cliente vive | O que o mercado faz) e Produtos (dois painéis: grafo Hoje → Produtos → Com IA + cartas | Antes e depois).
- Fatos só verificados; concorrentes citados por organização; sem pessoas da A&M.
- Pode ajustar as fichas do seu pilar (src/data/1N-produtos-pN.js) para manter coerência com os slides.
- Versos dos dois slides.

## execucao-fabrica — slides 18 Fábrica e 19 Jogos de entrada
- 18: Card Stack dos sete portões; mascote pose capacete pequeno; prazo e preço calibrados nos pilotos (sem número).
- 19: quatro cartas que viram (como os cartões do slide 3 da APODI), conteúdo de `src/data/30-jogos.js`; mascote pose apresentador com balão "Primeiro o cliente joga. Depois ele compra."; botão "virar todas".
- Versos (o do 19 cita os métodos: pré-mortem, exercícios de mesa, jogos de guerra/Dia 1, jogos de decisão).

## execucao-roadmap — slide 20 Roadmap e decisões
- Trilha de tabuleiro com quatro ondas (Timeline Motion: as casas acendem; o mascote pose bandeira anda na trilha); janelas de 2027 com fonte; "Decisões para o comitê" como cartas na mesa; "O chamado" (fechamento, como o último slide da APODI). Sem metas numéricas inventadas.
- Verso.


## Ajustes depois do conteúdo-base (valem para todos)
- Nomes de produto exatamente como em `src/data/1N-produtos-pN.js`. O 3.5 passou a se chamar **"Private Equity Tech Value Radar"** (id continua `pe-tech-value-radar`); o 3.3 é **"Integration & Separation Office"** (sem sigla).
- Fatos: só `verificado` vira número (com `<span data-fato="id">`), `fraco` só em texto com a ressalva, `a verificar` e `divergente` não entram. Correções da auditoria a respeitar: 274 negócios de TI são do 1º semestre de 2025; sinergias MBRF são R$ 805 mi/ano; 23% dos pilotos escalados é Brasil (25% é mundo); 53% da KPMG é talento para transformação digital; PwC–ToltIQ não é exclusiva; a empresa de serviços de IA dos fundos com a Anthropic foi anunciada em 04/05/2026; a DiligenceSquared faz diligência comercial, não de tecnologia.
- Ponte 29 → 24 em palavras (auditoria): 14 serviços seguem um a um, 13 se fundem em 6 produtos, 2 deixam de ser vendidos sozinhos e 4 nascem (14 + 6 + 4 = 24).
- `src/data/00-base.js` (textos `OLD[].w` e níveis do raio-X; definições `PILLARS`) passa a ser do dono **posicao** na fase 3; os textos `OLD[].w` também aparecem nas vistas "Antes e depois" dos pilares, então precisam valer nos dois lugares (sem números não verificados, sem siglas).
- `src/js/25-pilares.js` + `src/css/25-pilares.css` (motor compartilhado dos pilares) passam a ser do dono **pilar-1**; os donos dos pilares 2–4 pedem mudanças no motor por nota.
- `src/data/01-capitulos.js`, a função das divisórias em `src/core.js` e a seção 6 de `src/styles.css` passam a ser do dono **capas** (de preferência, sobrescreva em `src/css/28-capas.css` e `src/js/28-capas.js`).
- `src/data/20-timelines.js` (TL_LAUNCH e afins) passa a ser do dono **roadmap**; TL_2026 do dono **benchmark** (combine: benchmark edita só TL_2026, roadmap só TL_LAUNCH).
- `src/data/30-jogos.js` passa a ser do dono **fabrica-jogos**.
- Feedback anterior do usuário que continua valendo por slide: `scratchpad/user_msgs.txt` (mensagens 4 e 7: forças com muito texto e links; benchmark só 2026, com contexto e sem siglas; raio-X com dica quebrada por assunto e filtro que apaga os outros pilares; spotlight do portfólio executivo e separado por assunto; bordas das categorias mais visíveis; nada de quebra de linha; sem vazios grandes).
