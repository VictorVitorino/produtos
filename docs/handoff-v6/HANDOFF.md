# Passagem de bastão · DTS Planejamento Estratégico 2027 (versão V6)

Escrito em 30/10/2026, às 00h10, durante a sessão do Claude Code; seções 2, 3, 7 e 9 atualizadas às 03h30, na integração final da V6; seções 2, 3, 7, 9, 10 e 11 atualizadas às 04h25, no fechamento depois das correções. Quem continuar (outra IA ou pessoa) deve ler este arquivo,
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
- O entregável é a **V6**, em `DTS_Portfolio_Estrategico_2027.html` e `.pdf`. Os dois foram gerados em 30/10, às 04h20 (fechamento depois das correções), por `python3 build.py --final` e `tools/pdf.js --ordem`: 20 slides, 20 versos, 9 capas e 24 fichas; o PDF tem 84 páginas. A V5, com PDF de 56 páginas, fica só no histórico do git.
- `python3 build.py --out caminho.html` gera o HTML a partir de `src/`. O build **recusa rodar sem `--out`**; `python3 build.py --final` é o único que sobrescreve o arquivo principal (usar só na integração).
- `src/`: `slides/NN-*.html` (um por slide), `versos/NN-*.html` (verso de cada slide), `css/` e `js/` (um módulo `30-sNN-*` por slide, mais `02-componentes.css`, `25-pilares.*` para os pilares, `40-fichas.*`, `07-verso.*`, `06-mascote.*`, `07-monograma.*`), `data/` (`00-base.js` pilares e 29 serviços, `05-fontes.js` registro de fontes e fatos, `06-fatos-<dono>.js` fatos que cada autor verificou, `11…14-produtos-pN.js` as 24 fichas, `20-timelines.js`, `30-jogos.js`, `01-capitulos.js`), `core.js`/`engine.js`/`styles.css` (moldura, navegação, impressão), `assets/` (logos A&M e DTS, fontes Barlow Condensed).
- Também no repositório, sem relação com o deck: `prototipo-ciclo-agentico/` (protótipo em Python de um ciclo com agente, 32 testes) e `pesquisa/` (4 relatórios de pesquisa de mercado, com URLs e datas).

## 3. Histórico em poucas linhas

1. Pedido inicial: revisar os 29 serviços, pesquisar o mercado brasileiro e as consultorias (nomes, IA, ferramentas), separar evidência de hipótese, propor o novo portfólio e uma one-page com ficha por produto; usar a paleta A&M, logos A&M e DTS, os efeitos do guia de design DTS e storytelling, em no máximo 20 slides.
2. V1 a V4: capa com Particle System (repelir e atrair), slide com Shimmer/Holographic Sweep e escudo DTS, spotlight por pilar, forças, benchmark, raio-X, três caminhos, 29→24, one-page, pilares (Morphing, antes e depois), fábrica (Card Stack), roadmap (Timeline Motion). Várias rodadas de feedback: sem quebra de linha em rótulos, sem texto cortado, sem espaços vazios, textos executivos e lúdicos.
3. V5: o usuário mostrou o deck "DTS Tech M&A" (referência) e 4 telas favoritas; o deck foi refeito nesse padrão, com revisão adversarial (100 correções). Entregue em HTML e PDF.
4. Análise paralela: o usuário enviou uma proposta de terceiros de automação agêntica de um ciclo de custos e perguntou se a A&M entrega isso e se é viável com Claude. Resposta dada: a A&M não tem esse produto; entraria como **2.7 Agentic Process Automation** (25º produto, no Pilar 2) ou dentro do 2.6; viável tecnicamente (cerca de 35% do esforço é código; o resto é acesso, regras, aprovações e adoção); um protótipo sintético foi construído em `prototipo-ciclo-agentico/`. **Decisão do usuário (tomada na V6):** o 2.7 é **módulo do 2.6** (AI-Native IT Productivity), "Automação agêntica de processos", e não um 25º produto. O portfólio continua com 24 produtos (5 · 15 · 4). O módulo aparece na one-page (09), no slide 13 e na ficha 2.6.
5. **V6 (pronta em 30/10, às 03h30, no commit `c3aecff`; correções do fechamento às 04h25, a versionar)**: o usuário enviou o deck da **APODI** como modelo de layout (margens, alturas, moldura) e pediu para refinar toda a apresentação (detalhes na seção 4).

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

## 7. Estado atual (30/10, 04h25): V6 pronta; integração no commit c3aecff, correções do fechamento a versionar

**Tudo pronto.** Nesta sessão foram reescritos:
- os 20 slides e os 20 versos;
- as 9 capas de capítulo;
- o monograma da capa, agora em constelação;
- as 24 fichas.

Cada parte foi feita por um dono e conferida por um revisor independente. Depois vieram cinco lentes sobre o deck inteiro (sócio, fatos, design, funcional e conteúdo), cinco corretores e a integração final. Nenhum verso está "Em construção".

**Correções do fechamento (depois de `c3aecff`, revisão do diff `3f00239..c3aecff`)**
- Verso (`07-verso.css` e `07-verso.js`): a caixa "Leitura do AM" cresce quando o vão medido entre a lista de fontes e a caixa passa de 60 px (antes: quando havia até 6 fontes). Em coluna, com o mascote grande (`.v-few`), se couber; senão em linha, centralizada (`.v-grow`).
- Slide 09: margem menor no bloco das colunas do rodapé (`.s09-pc .sl`).
- Slide 11: subtítulo "os serviços fiscais se juntam"; no antes e depois do 1.3, "a mesma rede de executivos".
- Slide 20: a decisão 1 diz "5 manter, 15 aprimorar e 4 criar com IA; os 4 A&M Signature à frente e os nomes dos pilares".
- Ficha 3.1: fontes com a página do A&M Assist (`pilar3-am-assist-ma`). Ficha 4.4: "dos grandes contratos de serviços de TI".

**Entregáveis gerados no fechamento (04h15 o HTML, 04h20 o PDF)**
- `DTS_Portfolio_Estrategico_2027.html` (`build.py --final`): 1.355.866 bytes, 48 scripts e 4 ativos. É o próprio arquivo auditado.
- `DTS_Portfolio_Estrategico_2027.pdf` (`tools/pdf.js --ordem`): 84 páginas de 1600 × 900, com 16.833.207 bytes (cerca de 16 MB).
  - Composição: 20 frentes, 9 segundas vistas (07 e 10 a 17), 20 versos, 11 páginas de detalhe e 24 fichas.
  - Cada verso vem logo depois da sua frente.
  - As 10 fontes vão embutidas.
  - Nenhuma página em branco e nenhuma com o corpo vazio.
- `README.md` reescrito para a V6.

**Testes do fechamento (deck auditado = arquivo final)**
- `audit.js` com fichas, com rede e `offline` (mesmo resultado nos dois):
  - **0 apontamentos** em 73 vistas: 20 slides, 9 segundas vistas, 20 versos e 24 fichas.
  - Zero erros e zero avisos de console.
  - Versos com 334 a 379 palavras, todos na letra padrão de 15 px.
  - 19 avisos "? a conferir", que não contam como apontamento:
    - nomes de tributos: CBS, IBS, PIS, ICMS e ISS;
    - nomes de empresas e organizações: TOTVS, CI&T, BRF, IG4, HFS, CISPE, C&M Software e Diário do Grande ABC;
    - nomes técnicos: ECC, .NET, COBOL e EBITDA;
    - "AM", o nome do mascote;
    - "[1–11]", a faixa de fontes citada no verso 06.

    Os donos conferiram e mantiveram esses avisos. CBS, IBS, ECC e EBITDA são explicados na primeira menção (SPEC §5).
- `nav.js`: 70 de 70.
- `resp.js`: 87 de 87.
- `fichas.js`: 17 ok e 0 falhas.
- `buildcheck.py`: ok (só o Google Fonts fica externo; sem fotos de pessoas).
- `pdf.js --ordem` e `pdf.js --ctrlp`: 84 páginas nos dois, na mesma sequência, com as 10 fontes embutidas, sem página em branco, sem corpo vazio e sem erro de console. `pdfcheck.py` à parte, no PDF final: o mesmo resultado.
- Na integração (03h24), as capturas das 9 capas, da capa, do sumário e dos slides 09, 18, 19 e 20 saíram sem erro de console.

**Fundação e conteúdo-base** (sem mudança de estrutura desde `c4ca436`):
- moldura APODI, navegação, índice, abas, "Virar a página" e impressão intercalada;
- mascote AM (`window.AMMasc`, 10 poses);
- monograma em constelação (`window.AMMono`; a versão 3D fiel foi reprovada);
- motor dos pilares (`25-pilares.*`);
- capas (`28-capas.*`);
- fichas (`40-fichas.*`).

**Registro de fontes e fatos** (`src/data/05-fontes.js` + `src/data/06-fatos-<dono>.js`)
- **199 fontes e 229 fatos.** O verso 02 lê essa contagem do registro.
- **128 verificados**, os únicos que viram número.
- **94 "a verificar"**, que não se usam.
- **4 fracos**, só em texto e com ressalva: `genai-sem-impacto-95`, `comprar-vs-construir-67`, `alixpartners-cio-interino` e `erp-apuracao-no-erp-53`.
- **3 divergentes**, que não se usam: `agentes-investem-br-40`, `barreira-conhecimento-44` e `lei-do-bem-2024`.
- Desde o commit `182b24a` entraram 43 fatos novos, todos verificados. Em 42 deles a conferência foi só por trechos de busca (lista na §11).
- A auditoria inicial está em `fatos_verificados.md` (175 fatos, 68 verificados naquele momento). A auditoria do deck V5 está em `auditoria.md`.

**Decisões do usuário registradas**
- **2.7 Agentic Process Automation = módulo do 2.6** ("Automação agêntica de processos", dentro do AI-Native IT Productivity). Não é 25º produto; seguem 24 produtos, 5 · 15 · 4.
- **Nomes propostos dos pilares** (`PILLARS.to` em `00-base.js`) continuam como proposta da V5. O deck mostra cada um como "Nome proposto, a aprovar" no 09 (Pilares 1, 3 e 4), na carta 1 do 20 e no verso 20.
- Nenhuma pessoa da A&M; nenhum número sem fato verificado; só as siglas permitidas; uma linha por título e rótulo; 20 slides; layout APODI; monograma em constelação na capa.

**O que restou** (nada bloqueia a entrega; detalhes na §9):
- reler na fonte os 42 fatos conferidos só por busca;
- limpar as duplicatas do registro;
- PDF menor, com fontes estáticas;
- as decisões do comitê.

## 8. Por que está demorando (resposta ao usuário)

- A V6 não é uma troca de tema: são 20 slides, 20 versos de contexto, 24 fichas, 9 capas de capítulo, um mascote e um monograma novos, com layout novo.
- Cada slide passa por um autor e depois por um revisor independente (sócio, checagem de fatos e design), e cada um monta o deck, captura todas as telas e roda a auditoria. Isso leva cerca de 35 minutos por etapa.
- O computador está quase parado (carga ≈ 0,3), mas cada frente de trabalho só roda **2 agentes por vez** (limite do ambiente: processadores − 2). Com 14 etapas por frente, a fila era de 3 a 4 horas. Redistribuí o trabalho em mais frentes paralelas para cortar isso.
- A fundação e o conteúdo-base (fontes verificadas na web, fichas, mascote) precisavam ficar prontos antes dos slides: cerca de 3 horas.

## 9. Próximos passos, em ordem

Feito nesta sessão (itens antigos 1 a 7):
- slides no padrão do 04;
- os versos que faltavam;
- monograma em constelação;
- capas novas;
- revisão global;
- `build.py --final`, PDF e `README.md`;
- decisão do 2.7 (módulo do 2.6).

O que falta:

1. **Commit e push** das correções do fechamento (a integração já está no GitHub, no commit `c3aecff`; confira com `git status -sb`): `src/`, `docs/handoff-v6/`, `README.md`, `DTS_Portfolio_Estrategico_2027.html` e `.pdf`. Não versionar pastas `*_check/` geradas pelo `pdf.js`.
2. **Apresentar ao comitê as quatro decisões do slide 20** ("O chamado"):
   - aprovar os 24 produtos (5 manter, 15 aprimorar e 4 criar com IA, com os 4 A&M Signature à frente) e os nomes propostos dos pilares;
   - dono para cada produto;
   - abrir a Onda 0 (2.2 e 1.5);
   - investir na Plataforma de Dados e AI em etapas.

   Se o comitê aprovar os nomes, trocar `PILLARS.name` por `PILLARS.to` em `00-base.js`, tirar os blocos "Nome proposto, a aprovar" (09 e 20) e rodar de novo `audit.js`. Nomes mais longos podem quebrar linha nas capas, abas e cabeçalhos.
3. **Reler na fonte os fatos verificados só por busca** (lista na §11): primeiro os 18 que mostram número, depois os outros 24. Acrescentar "página lida em dd/mm/aaaa" na obs. Se algum não se confirmar, mudar o status e tirar o número do deck (`audit.js` aponta o uso de fato não verificado).
4. **Validar com sócios e pilotos** o que o deck já marca como proposta:
   - prazo, preço, metas e indicadores de cada produto e de cada onda ("a calibrar nos pilotos");
   - os níveis do raio-X;
   - o uso do A&M Assist no Brasil (3.1 e one-page);
   - o honorário ligado a marcos do 3.3;
   - se os nomes em inglês dizem o que entregam.
5. **PDF menor** (opcional): versionar `docs/fonts/pdf-fonts.css` com Inter e JetBrains Mono estáticas e gerar o PDF de novo (§11).
6. Revisão global (sócio, fatos, design) depois de qualquer mudança: `audit.js` sem apontamentos, `nav.js`, `resp.js`, `fichas.js`, `pdf.js --ordem` e `pdf.js --ctrlp` (nenhuma página com corpo vazio nos dois); depois `build.py --final` e PDF.
7. Limpeza do registro (duplicatas entre fatos verificados; não muda o que o deck mostra, mas infla a contagem do verso 02 e abre risco de divergência). Já feito na integração: o 80% da Falconi ficou só em `pilar2-falconi-agentes-80` (slide 06, ficha 2.6 e slide 12) e `benchmark-falconi-agentes-80` saiu de `06-fatos-benchmark.js`. Falta: fundir `posicao-am-cargos-interinos` com `pilar1-am-cargos-interinos`, `benchmark-alixpartners-artium` com `pilar1-alix-artium` e `benchmark-diligencia-voz` com `pilar3-diligencia-comercial-agentes` (nenhum é usado como número); no verso 07, trocar a fonte `posicao-am-interim` por `pilar1-am-interim` (mesma página da Alvarez & Marsal); e acertar o `txt` de `jogos-simulacao-aprendizado` (o id existe em `05-fontes.js`, a verificar, e em `06-fatos-fabrica-jogos.js`, verificado, com textos diferentes; o verificado cita 20% e 14%, mas o 14% tem fato próprio, `jogos-simulacao-pratica-14`).

## 10. O que acontece com os agentes em andamento

Em 30/10, às 04h25, não há agente em andamento: autores, revisores, lentes e corretores terminaram, a integração está no commit `c3aecff` (no GitHub) e o fechamento gerou de novo os entregáveis. As correções do fechamento ficam **no working tree** até o commit e push (§9, item 1); se a sessão acabar antes, elas se perdem.
Os agentes do Claude Code escrevem **direto nos arquivos** de `src/`. Numa rodada nova com vários agentes, cada dono de slide só pode editar seus próprios arquivos (tabela em `CONTRACT.md` §2), para não haver conflito. Faça commit antes de trocar de IA.

## 11. Armadilhas e lições

- Todos os `<script>` dividem o mesmo escopo global: escreva o JS de cada slide dentro de uma função anônima autoexecutável.
- Mudanças de texto em `src/data/00-base.js` (`OLD[].w`, níveis do raio-X) aparecem em mais de um lugar (raio-X, "Antes e depois" dos pilares, one-page).
- O número de slides é fixo em 20; se criar um slide novo, tire outro ou funda.
- Fatos divergentes ou fracos do registro: não usar como número (lista na seção 7). Antes de usar qualquer fato "a verificar", confirme na fonte e registre com status "verificado" e a observação do que foi visto.
- Correções de fatos da V5 que os textos novos devem respeitar: 274 negócios de TI são do 1º semestre de 2025; sinergias da MBRF são R$ 805 mi/ano; 23% de pilotos escalados é Brasil (25% é mundo); 53% da KPMG é talento para transformação digital; PwC–ToltIQ não é exclusiva; a empresa de serviços de IA dos fundos com a Anthropic foi anunciada em 04/05/2026.
- O Inter (fonte do texto) não vai embutido (como no modelo APODI); sem internet cai para Helvetica/Arial.
- O PDF não é leve. No fechamento de 30/10, às 04h20, o PDF de 84 páginas saiu com 16,1 MB (16.833.207 bytes) pelo `tools/pdf.js --ordem` e com 16,0 MB (16.828.841 bytes) pelo `--ctrlp`; o Ctrl+P do navegador pode dar de 16 a 18 MB. Inter e JetBrains Mono vão embutidas como Type 3 (cerca de 100 subconjuntos). O `pdf.js` só injeta fontes estáticas se existir `docs/fonts/pdf-fonts.css`; hoje o arquivo não existe e ele avisa. Para um PDF menor, versione esse arquivo com Inter e JetBrains Mono estáticas em TTF (rasterizar as páginas fica fora).

### Fatos verificados só por busca (reler quando a rede liberar)

Os fatos novos desta sessão (30/10/2026) são 43 ids em `src/data/06-fatos-*.js` (contados contra o commit `182b24a`, desta passagem de bastão), todos com status "verificado". Em 42 deles a conferência foi feita só por trechos de resultados de busca (WebSearch), sem abrir a página, porque a rede bloqueou a leitura direta; a obs de cada fato diz o trecho visto. O único com outro método é `pilar2-prototipo-ciclo-5-passos`, conferido no código local de `prototipo-ciclo-agentico/`. Status e arquivos de dados ficam como estão. Quando a rede liberar, abra a página de cada fonte, confira o trecho citado na obs e acrescente "página lida em dd/mm/aaaa". Comece pelos 18 que mostram número no deck. Os fatos de 29/10 seguem o critério do cabeçalho de `05-fontes.js` (página lida ou trechos vistos na busca); a obs de cada um diz qual.

A lente de fatos chegou a outra contagem: 44 fatos novos, 43 conferidos por busca e 19 com número. A integração recontou às 03h30 e confirmou 43, 42 e 18:
- o 80% da Falconi tinha dois ids, e `benchmark-falconi-agentes-80` saiu;
- `pilar2-prototipo-ciclo-5-passos` foi conferido no código local.

As correções da lente de fatos estão todas aplicadas:
- ficha 2.2: "Em 2027 a CBS passa a ser cobrada";
- 80% da Falconi "dos projetos de tecnologia";
- Gartner "terão cláusula…, prevê o Gartner" no 12;
- "(previsão)" ou "prevista" nas fichas 1.5, 2.1, 4.3 e 4.4 e no 16;
- "no mundo" ou "no Brasil" nas fichas 1.4, 2.3, 2.6, 3.5 e 4.1 e no verso 13.

**Mostram número no deck (18)**: id · número · onde aparece (levantamento de 30/10, 03h)
- `benchmark-falconi-ia-100` · R$ 100 milhões · slide 06 e página de detalhe do 06
- `benchmark-am-contratacoes-200` · 200 · slide 06 (linha do tempo, mês de maio) e página de detalhe do 06
- `pilar2-cbs-decreto-2026` · 30/04/2026 · slide 12
- `pilar2-icms-iss-2033` · 2033 · slide 12
- `pilar2-kpmg-orcamento-72` · 72% · slide 12, verso 12, ficha 2.2
- `pilar2-erp-caso-negocio-70` · 70% · slides 12 e 16, versos 12 e 16
- `pilar2-falconi-agentes-80` · 80% dos projetos de tecnologia · slide 06 (linha do tempo, mês de setembro), página de detalhe do 06, slide 12, ficha 2.6
- `pilar3-ma-1s26-menos-negocios` · −35% · slide 14, verso 14
- `pilar3-pe-vc-metade-2025` · 50% · slide 14, verso 14, ficha 3.5
- `pilar3-ti-lidera-ma-1s25` · 274 · verso 14, ficha 3.1
- `pilar3-mbrf-sinergias-805` · R$ 805 mi · slide 14, verso 14, ficha 3.4
- `pilar3-raizen-duas-empresas` · 2 · slide 14, ficha 3.2
- `pilar4-vmware-europa-1500` · 1.500% · slide 16, verso 16
- `pilar4-accenture-claude-30-mil` · 30 mil · slide 16, verso 16
- `pilar4-cobol-ibm-13` · 13% · slide 16, versos 16 e 17
- `pilar4-sinqia-710` · R$ 710 mi · slide 16, ficha 4.5
- `pilar4-bancos-nuvem-30` · 30% · slide 16, verso 16, ficha 4.3
- `pilar4-nuvem-desperdicio-29` · 29% · ficha 4.3

**Sem número no deck (24)**: texto qualitativo, fonte do verso ou fato registrado sem uso
- Benchmark: `benchmark-alixpartners-artium`, `benchmark-diligencia-voz`, `benchmark-accenture-preco`.
- Fábrica e jogos: `compra-orcamento-limitado-metodo`.
- Pilar 1 e posição: `pilar1-am-cargos-interinos`, `posicao-am-cargos-interinos`.
- Pilar 2: `pilar2-apuracao-assistida`, `pilar2-ey-beyondtax`, `pilar2-totvs-assistente-reforma`, `pilar2-cit-flow`, `pilar2-nfe-sem-rejeicao` (a data 31/07/2026 está no registro, sem uso no deck).
- Pilar 3: `pilar3-ma-1s26-megadeals` (85% no registro, sem uso no deck), `pilar3-braskem-ig4`, `pilar3-diligencia-comercial-agentes`, `pilar3-ode-investidas`, `pilar3-deloitte-dia1-separacao`, `pilar3-am-assist`, `pilar3-sinergias-ti-mais-metade` ("mais da metade", em palavras no verso 15).
- Pilar 4: `pilar4-aws-migracao-sem-custo`, `pilar4-copilot-modernizacao`, `pilar4-mckinsey-legacyx`, `pilar4-ibm-cobol-java`, `pilar4-ataques-pix-terceiros`, `pilar4-bradesco-mainframe`.

## 12. Arquivos que o usuário precisa levar para a outra IA (não estão no repositório)

- O deck modelo da **APODI** (`AM - APODI - Resumo Executivo.html`) e o **guia de design de efeitos DTS** (`DTS - Guia de Design para apresentações.html`), que servem de referência de layout e de código dos efeitos.
- A imagem do monograma A&M 3D (referência para a capa e o mascote).
- O deck de referência "DTS Tech M&A" e a apresentação TMG (opcionais: o V5 já incorporou o padrão).

## 13. Prompt sugerido para colar na outra IA

> Você vai continuar a versão V6 da apresentação "Planejamento Estratégico · Produtos, Serviços e Inteligência Artificial" da DTS (Alvarez & Marsal Brasil). Repositório: github.com/VictorVitorino/produtos, branch `claude/pensive-fermat-fijb3d`. Leia, nesta ordem, `docs/handoff-v6/HANDOFF.md`, `SPEC.md` e `CONTRACT.md`. Use `python3 build.py --out /tmp/x.html` para gerar o deck e as ferramentas de `docs/handoff-v6/tools/` para capturar telas e auditar. Regras que não podem ser quebradas: nada de pessoas da A&M; nenhum número sem fato verificado; só as siglas permitidas; uma linha por título e rótulo, sem corte nem vazio grande; no máximo 20 slides; layout no modelo da APODI. A V6 está pronta (seção 7): os 20 slides, os 20 versos, as 9 capas e as 24 fichas estão no padrão e passam em todos os testes. O 2.7 é módulo do 2.6 (decisão tomada). Siga a seção 9: commit e push, as decisões do comitê, reler na fonte os fatos verificados só por busca e a limpeza do registro. Depois de qualquer mudança, refaça a revisão global, `python3 build.py --final` e o PDF.
