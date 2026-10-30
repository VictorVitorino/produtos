# DTS · Planejamento Estratégico 2027 — ESPECIFICAÇÃO V6

Repositório: `/home/user/produtos` (branch `claude/pensive-fermat-fijb3d`). Saída: `DTS_Portfolio_Estrategico_2027.html` gerado por `python3 build.py` a partir de `src/`.
Modelo de layout: `scratchpad/apodi_in/apodi.html` (deck "AM - APODI - Resumo Executivo"). Capturas de referência: `scratchpad/apodi_shots/s_01.png … s_25.png`, `flip_all.png`, `sobre.png`.
Pasta de trabalho desta versão: `scratchpad/v6/` (scratchpad = `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad`).

---

## 0. O pedido do usuário (literal) e o que ele significa

> "Preciso refinar essa apresentação, primeiro colocando em um layout mais agradável (arquitetura do layout, vou deixar o modelo da APO — na questão de margem, altura, modelo etc, coloque no modelo.)
> Preciso revisar esse planejamento estratégico, e trazer de forma executiva e não genérica as informações. Precisa ter lógica. Precisa ter contexto, precisa ter valor e não estou falando de algo monetário, precisa ter peso.
> Melhore as descrições, não traga siglas que nós não sabemos, não invente números, tenha um botão para virar a página e demonstrar as fontes, o contexto detalhado (escrita mesmo).
> Vamos refinar todo o material, preciso realmente criar propostas lúdicas etc. (Personagem AM — construa um mascote com base na imagem que te passei.) Regras: revise o storytelling."

Tradução em requisitos verificáveis:
1. **Layout = modelo APODI**: palco 1600×900; moldura com cabeçalho navy (80 px), faixa da seção (50 px), corpo branco, rodapé fino; margens laterais de 12 px; barra de capítulos e botões fora do palco; capa e divisórias escuras com mascote. Medidas exatas na seção 3.
2. **Executivo e não genérico**: cada slide afirma uma conclusão (título-conclusão) e prova com um fato com fonte ou um fato estrutural do portfólio; diz o que isso significa para o cliente e para a DTS.
3. **Lógica**: a história segue Situação → Complicação → Pergunta → Resposta → Como fazer (seção 2). Cada slide prepara o seguinte.
4. **Peso (valor não monetário)**: consequência concreta (decisão, risco, prazo, quem sente) em vez de adjetivos.
5. **Sem siglas desconhecidas** (seção 5) e **sem números inventados** (seção 4).
6. **Botão "Virar a página"** em todo slide: o verso traz o contexto escrito (prosa) e as fontes com link (seção 6).
7. **Lúdico**: mascote "AM" (seção 7), páginas que viram, cartas de produto, trilha de jogo no roadmap, e **propostas lúdicas para clientes** (os "Jogos de entrada", slide 19).
8. **Storytelling revisado** (seção 2).

**REGRA NOVA E ABSOLUTA (pedido do usuário em 29/10/2026): "não é para trazer nada de pessoas da AM".** Nenhuma foto, nome, cargo, perfil ou citação de pessoas da Alvarez & Marsal em lugar nenhum do deck (slides, versos, fichas, divisórias, README): isso inclui executivos globais citados na pesquisa (ex.: quem preside ou integra o Global AI Board, diretores, sócios, criadores de ferramentas) e perfis de LinkedIn. Fale da instituição ("a Alvarez & Marsal global criou um conselho de IA"), nunca de indivíduos. As fotos em `src/assets/equipe/` NÃO são usadas (não gerar versões, não embutir, não criar lista de equipe). Pessoas de outras empresas também só entram se forem indispensáveis ao fato; prefira citar a organização.

Preferências permanentes do usuário (de rodadas anteriores — continuam valendo):
- Paleta Alvarez & Marsal; logos A&M e DTS (já em `src/assets/`).
- **Sem quebra de linha** em nomes, títulos, chips, rótulos e frases curtas; informação na horizontal, numa linha só. Nada cortado (sem reticências em texto visível). Sem áreas vazias grandes.
- **Máximo de 20 slides** (transições de capítulo e fichas não contam).
- Capa com o **Particle System** (efeitos repelir e atrair), título "Planejamento Estratégico" e subtítulo "Produtos, Serviços e Inteligência Artificial".
- Slide "DTS hoje" com **Shimmer / Holographic Sweep** e o escudo DTS, com texto de contexto e números gerais do portfólio.
- Efeitos que o usuário quer ver: Spotlight/Focus, Morphing Shapes, Shimmer/Holographic Sweep, Card Stack, Before/After Slider, Timeline Motion.
- Nome correto da base: **"Plataforma de Dados e AI"**.
- Não usar "E"/"H" ou marcadores internos; não usar nomes internos sem explicar (ex.: "PEPI", "a própria A&M").
- "Não crie coisas novas que eu não pedi": o que é novo nesta versão foi pedido (layout APODI, verso, mascote, propostas lúdicas). Fora disso, melhorar — não inventar seções.

Design system A&M (skill `anthropic-skills:alvarez-marsal-design-system`, arquivo `references/brand-book.md`): navy carrega a marca, cinza estrutura, azul apoia, **laranja só como detalhe** (fio sob título, marcador, ponto de destaque); **nunca laranja como texto sobre branco**; títulos afirmam conclusões; siglas explicadas na primeira menção; frases curtas; números com unidade e período. Onde o brand book conflita com o modelo APODI (cantos arredondados, gradientes, sombra leve, botão "Avançar" laranja), **vale o modelo APODI**, porque o usuário pediu esse modelo explicitamente.

---

## 1. A ideia central (uma frase)

**O cliente de tecnologia passou a comprar resultado, com IA embutida e preço por resultado. A DTS tem o DNA certo para esse jogo (operador, liderança interina, turnaround, private equity), mas vende serviços por hora e nenhum dos 29 descreve IA no método. A proposta: reorganizar 29 serviços em 24 produtos, com IA no método, começando pelo que protege o núcleo e aproveita as janelas de 2027.**

Arco: O que temos → O que o mercado vive → Nossa posição → O novo portfólio → Como fazer acontecer.

---

## 2. Roteiro V6 — 20 slides

Convenções por slide: **TC** = título-conclusão (uma linha, ≤ 110 caracteres, Barlow Condensed); **Sub** = subtítulo (uma linha, ≤ 130 caracteres); **Faixa** = texto da faixa da seção (CAIXA ALTA, curto); **Dica** = pílula de interação na faixa; **Mascote** = pose e fala (quando houver); **Verso** = foco do contexto escrito.
Os títulos abaixo são o ponto de partida: podem ser lapidados, mas a afirmação de cada slide e a lógica da sequência não mudam. Números citados aqui são estruturais (do portfólio oficial) ou já estão na pesquisa; todo fato de mercado tem de vir do registro de fontes (seção 4).

Partes (cabeçalho mostra "Parte N · Nome"):
- Abertura: slides 1–2
- Parte 1 · O ponto de partida: 3–4
- Parte 2 · O que o mercado vive: 5–6
- Parte 3 · Nossa posição: 7
- Parte 4 · O novo portfólio: 8–17 (8 ponte, 9 one-page, 10–17 pilares)
- Parte 5 · Como fazer acontecer: 18–20

Transições de capítulo (sobreposições, não contam como slide): antes de 3 (Parte 1), 5 (Parte 2), 7 (Parte 3), 8 (Parte 4), 10/12/14/16 (abertura de cada pilar, com Morphing e os números do pilar), 18 (Parte 5). Visual de divisória APODI (fundo navy, "PARTE N", título grande em Barlow Condensed, frase de contexto, pílulas, mascote).

### 2.1 Capas de capítulo (divisórias) — redesenho pedido pelo usuário
O usuário reprovou a "bola" (o blob do Morphing nas capas dos pilares): **"precisamos mudar quase todas as capas, essa bola ficou horrível, melhore as capas em geral, traga outros modelos de efeitos, compatíveis com o contexto"**. Nenhum blob. Todas as capas seguem a família visual da divisória da APODI (`apodi_shots/s_23.png`): fundo navy profundo, rótulo "PARTE N" em mono, título grande em Barlow Condensed 800, uma frase de contexto, pílulas pequenas, e **um efeito do Guia DTS escolhido pelo assunto** ocupando o lado direito. Mascote pequeno no canto (pose da parte), opcional.
| Capa | Efeito (Guia DTS) | O que o efeito mostra |
|---|---|---|
| Parte 1 · O ponto de partida | **32 Floating Elements** | o escudo DTS no centro e os 4 pilares como cartões em órbita suave (com a quantidade de serviços de cada um); o cursor pausa e revela o rótulo |
| Parte 2 · O que o mercado vive | **40 Animated Shader / Hero** + **19 Pulse / Beacon** | ondas vivas em navy e um fio laranja serpenteando atrás do título; seis faróis pulsam, um por força de mercado (só o nome da força) |
| Parte 3 · Nossa posição | **14 Heatmap Animation** | a matriz dos 29 serviços (linhas = pilares) entra do frio ao quente e cada célula assume a cor da decisão (manter, aprimorar com IA, fundir, sair), com uma linha de varredura de raio-X; sem valores numéricos |
| Parte 4 · O novo portfólio | **03 Hologram 3D Cards** + **12 Counter Animation** | um leque de cartas de produto com profundidade, reflexo e brilho que respondem ao cursor; o contador vai de 29 serviços para 24 produtos |
| Pilares 1–4 (aberturas) | **01 Motion Graphics** + **02 Icon Motion** + **12 Counter Animation** | abertura coreografada: o ícone do pilar se desenha, os cartões cinza dos serviços de hoje se reorganizam nos cartões dos produtos (cor por status: manter, aprimorar com IA, criar com IA), e o contador mostra 10 → 7, 7 → 6, 8 → 5, 4 → 6; pílulas com o produto novo e o Signature do pilar |
| Parte 5 · Como fazer acontecer | **17 BPMN Flow Motion** | um marcador percorre o fluxo Fábrica (sete portões) → Jogos de entrada → Ondas do roadmap → Decisão do comitê, acendendo cada etapa |
Regras das capas: só números estruturais (contagens do portfólio); nenhum texto quebrado; leitura completa na impressão (estado final estático); `prefers-reduced-motion` mostra o estado final sem animação.

Abas da barra inferior (como o `#dots` da APODI): ABERTURA (1–2) · PARTIDA (3–4) · MERCADO (5–6) · POSIÇÃO (7) · PORTFÓLIO (8–9) · PILARES (10–17) · EXECUÇÃO (18–20).

### Abertura
**1 · Capa** (`01-capa`) — sem moldura. **Pedido do usuário: "na capa principal precisamos ter o LOGO grande AM ou criar um mascote para AM com base nessa imagem".**
- Herói da capa: o **monograma A&M (o "A com M") desconstruído e redesenhado na linguagem do deck** — o usuário reprovou a reconstrução fiel em 3D violeta ("ficou péssima; precisamos desconstruir e criar uma compatível, com cores etc., adaptada ao contexto da apresentação"). Paleta A&M (navy, azuis, gelo, branco; laranja só como detalhe), vocabulário do deck (partículas, linhas finas, planos), vetor/canvas próprio, nunca a imagem. Componente `window.AMMono` (mount/play/stop) em `src/js/07-monograma.js`.
- **fx 30 Particle System** mantido (repelir e atrair, como o usuário aprovou), atrás do título e em volta do "A".
- **fx 11 Animated Typography** no título: "Planejamento Estratégico" entra palavra a palavra, fio laranja que se desenha; subtítulo "Produtos, Serviços e Inteligência Artificial"; linha "Digital & Technology Services · Alvarez & Marsal Brasil"; "Outubro de 2026". Logos A&M e DTS embaixo à esquerda (como a APODI).
- O mascote **não** fica na capa (a capa é do "A" grande); ele estreia no Sumário.
- Verso: o que é este documento, para quem, e a regra da casa (todo número tem fonte; o que é proposta nossa aparece em palavras).

**2 · Sumário** (`02-sumario`, NOVO, modelo "Súmario Executivo" da APODI) — sem moldura, fundo navy.
- "Sumário" + cinco partes numeradas (1–5) clicáveis (vão para o primeiro slide da parte). À direita, ilustração da **trilha** (tabuleiro com 5 paradas) e o mascote pose **aponta**.
- Fala (estreia do mascote): "Eu sou o AM. Cinco paradas, uma pergunta: como vender o que o cliente passou a comprar?"
- Verso: **método** — como a pesquisa foi feita (4 frentes, data, tipos de fonte), o que é fato e o que é leitura nossa, limitações.

### Parte 1 · O ponto de partida
**3 · DTS hoje** (`03-dts-hoje`) — Shimmer/Holographic Sweep + escudo DTS.
- TC: "A DTS cobre o ciclo inteiro da tecnologia: 4 pilares e 29 serviços"
- Sub: "Do diagnóstico à modernização, apoiada pela cadeia de valor da A&M — mas nenhum serviço descreve IA no método"
- Conteúdo: escudo DTS; 4 pilares com quantidade de serviços (10 · 7 · 8 · 4) e "quando nos contratam" (resumido do portfólio oficial); as áreas da cadeia de valor A&M onde a DTS se conecta; uma barra "E daí?" com a tensão da história.
- **Sem pessoas**: nada de fotos, nomes ou cargos de pessoas da A&M neste slide (pedido do usuário).
- Verso: o que o portfólio oficial diz, como contamos, por que "sem IA no método" é a pergunta que abre a história.

**4 · Portfólio atual** (`04-portfolio-atual`) — Spotlight por pilar.
- TC: "Cada pilar entra num momento diferente da vida do cliente"
- Sub: "Decidir, executar, transacionar e modernizar: a oferta existe, mas fala a língua de serviços, não de resultados"
- Conteúdo: o portfólio oficial (29 nomes, 4 pilares). No spotlight de cada pilar, texto executivo separado por assunto: **Quando o cliente nos chama · O que entregamos · Onde somos fortes · Onde há sobreposição**.
- Mascote pequeno pose **lanterna** (opcional, combina com o spotlight).
- Verso: leitura de cada pilar e da sobreposição de serviços (fato estrutural do portfólio).

### Parte 2 · O que o mercado vive
**5 · Seis forças** (`05-forcas`) — Node Network (rede de nós; passo a passo com →).
- TC: "Seis forças mudaram a pergunta do cliente: ele quer resultado comprovado, não horas"
- Sub: "Cada força cria uma exigência nova para quem vende tecnologia — e todas apontam para o mesmo lugar"
- Conteúdo: as seis forças atuais (revisar texto), cada uma com **O que mudou** (fato com fonte), **O que o cliente passa a exigir**, **Por que pesa para a DTS**. **Não citar nomes de produtos novos aqui** (a resposta vem na Parte 4). Não repetir números gerais de mercado que o usuário mandou tirar (mercado de TI Brasil, gasto com IA, nº de transações de M&A, % de empresas que usam IA).
- Verso: o raciocínio das seis forças, de onde vem cada fato.

**6 · Benchmark 2026** (`06-benchmark`) — Timeline Motion, só 2026.
- TC: "Em 2026, as grandes consultorias transformaram IA em plataforma, produto e preço"
- Sub: "O movimento é global e já chegou ao Brasil: quem não empacota a IA no método passa a disputar hora contra software"
- Conteúdo: linha do tempo de 2026 (mês a mês, só fatos com fonte); texto de contexto; quatro sinais (plataforma própria, preço por resultado, diligência comoditizada, pares compram capacidade) com "o que isso significa para nós" — **sem** mostrar nomes de produtos DTS. Os movimentos da Alvarez & Marsal global (Global AI Board) entram como fato, escritos com clareza ("A Alvarez & Marsal global criou…"), nunca "a própria A&M".
- Verso: por que esses movimentos importam, o que é fonte primária e o que é imprensa.

### Parte 3 · Nossa posição
**7 · Raio-X e caminhos** (`07-raio-x`, dois painéis: "Raio-X" | "Três caminhos"; o atual `07-caminhos` vira o painel 2).
- Painel 1 — TC: "No raio-X, 4 serviços seguem fortes, 13 pedem IA no método e 12 se sobrepõem ou perdem sentido sozinhos"
  - Sub: "Dois critérios — demanda em 2026–27 e direito de vencer da A&M — e uma decisão para cada serviço"
  - Visual **sem escores numéricos**: quadro qualitativo (2×2 por quadrantes, ou quadro de calor por pilar) com os 29 serviços; filtro/spotlight por pilar (clicar P1 apaga os demais); dica de cada serviço quebrada por assunto: **Demanda · Direito de vencer · Decisão · Vai para**.
  - Contagens (estruturais, da avaliação DTS): manter 4 · aprimorar com IA 13 · fundir 10 · sair como produto isolado 2.
  - Mascote pose **lupa** (pequeno).
- Painel 2 — TC: "Colocar IA nos serviços de hoje não basta: o caminho é transformar serviços em produtos"
  - Três caminhos (incremental · transformacional · disruptivo) com prós e contras **em palavras** (sem barras de "investimento", sem "tempo até impacto" inventado); recomendação: transformacional, incubando duas apostas novas.
- Verso: critérios do raio-X, por que é leitura nossa (a calibrar com os sócios), fatos que sustentam demanda e direito de vencer.

### Parte 4 · O novo portfólio
**8 · De serviços a produtos** (`08-ponte`, antigo `08-servicos-a-produtos`) — Before/After slider 50/50.
- TC: "29 serviços viram 24 produtos: 5 mantidos, 15 com IA no método e 4 novos"
- Sub: "Produto é escopo fechado, método replicável, IA no método e um formato que o cliente entende"
- Conteúdo: antes (29) × depois (24) com o divisor; abaixo, "o que muda de nome" (exemplos claros) e a definição de produto.
- Verso: o que significa "produto" aqui, regras de fusão, por que alguns saem como produto isolado.

**9 · One-page** (`09-one-page`) — Connector/Flow Line + spotlight; cada produto abre a ficha.
- TC: "24 produtos, um só sistema: cada pilar responde a uma decisão do cliente"
- Sub: "Clique num produto para abrir a ficha; 'Nome de hoje' mostra de qual serviço ele nasceu"
- Base: "Plataforma de Dados e AI". Status: Manter · Aprimorar com IA · Criar com IA; "★ A&M Signature" explicado em palavras ("onde o direito de vencer é maior").
- Verso: lógica do sistema (como os pilares se conectam e o que a plataforma compartilha).

**10–17 · Pilares** (dois slides por pilar; Morphing na abertura de cada pilar)
- Slide "Cliente e mercado" (`10-p1-cliente`, `12-p2-cliente`, `14-p3-cliente`, `16-p4-cliente`), dois painéis: **O que o cliente vive** (quem decide, a dor, o gatilho) | **O que o mercado faz** (ofertas dos concorrentes, só com fonte).
- Slide "Produtos" (`11-p1-produtos`, …), dois painéis: **Produtos** (grafo Hoje → Produtos → Com IA + cartas de produto com "evolui de") | **Antes e depois** (linha a linha).
- TCs de partida:
  - P1 cliente: "O conselho quer saber quanto a tecnologia devolve — e quem responde por isso"
  - P1 produtos: "IT Advisory: 10 serviços viram 7 produtos que terminam em decisão, não em relatório"
  - P2 cliente: "2027 tem data marcada: Reforma Tributária e fim da manutenção padrão do SAP ECC não admitem atraso"
  - P2 produtos: "Technology Transformation: 7 serviços viram 6 produtos para entregar no prazo e no valor prometido"
  - P3 cliente: "A diligência de tecnologia virou commodity com IA; o valor migrou para depois da assinatura"
  - P3 produtos: "Tech M&A: 8 serviços viram 5 produtos que acompanham o negócio da assinatura à saída"
  - P4 cliente: "A IA dos provedores de nuvem barateou a migração; o valor está em escolher a rota e garantir a virada"
  - P4 produtos: "Modernization: 4 serviços viram 6 produtos para modernizar sem parar a operação"
- Os fatos de cada pilar vêm do registro de fontes. "SAP ECC" é nome de produto da SAP: explicar na primeira menção ("a versão antiga do ERP da SAP").
- Verso de cada slide: contexto do pilar, fontes, o que validar.

### Parte 5 · Como fazer acontecer
**18 · Fábrica de produtos** (`18-fabrica`) — Card Stack.
- TC: "Um serviço só vira produto depois de passar por sete portões"
- Sub: "Da dor do cliente ao piloto: escopo, método, IA, dados, formato e dono — nessa ordem"
- Os sete portões descritos em palavras. Prazo e preço de cada produto são calibrados nos pilotos (não inventar número).
- Mascote pose **capacete** (pequeno).
- Verso: por que portões (disciplina de produto), o que cada portão exige, quem decide.

**19 · Jogos de entrada** (`19-jogos`, NOVO — as **propostas lúdicas**) — cartas que viram (Flip cards, como o slide 3 da APODI).
- TC: "Antes de comprar, o cliente joga: quatro experiências que abrem a porta para os produtos"
- Sub: "Formatos curtos e práticos, um por pilar, que mostram o problema na mesa e terminam numa decisão"
- Quatro cartas (frente: nome, pilar, promessa em uma linha; verso da carta: como funciona em 3 passos · quem joga · o que o cliente leva · produtos que abre):
  1. **Mesa do Conselho** (IT Advisory): executivos recebem cartas de investimentos em tecnologia e IA e precisam escolher com orçamento limitado; a conversa revela onde a TI gera valor e quem responde por ele → 1.1, 1.5, 1.7.
  2. **Pré-mortem 2027** (Technology Transformation): o time imagina que o programa falhou em 2027 e reconstrói por quê; os riscos viram plano → 2.2, 2.3, 2.4. (Método: pré-mortem, Gary Klein, Harvard Business Review, 2007.)
  3. **Jogo do Dia 1** (Tech M&A): simulação do primeiro dia depois do fechamento do negócio — o que para (e-mail, folha, sistemas) e quem decide → 3.1, 3.2, 3.3.
  4. **Exercício de Crise** (Modernization): simulação de mesa de um ataque ou queda de sistema crítico; quem decide o quê e em quanto tempo a operação volta → 4.5, 4.6, 4.3. (Método: exercícios de mesa, guia NIST SP 800-84.)
- Sem durações em números ("uma manhã", "meio período" pode). Mascote pose **apresentador** com as cartas. Fala: "Primeiro o cliente joga. Depois ele compra."
- Verso: por que formatos lúdicos funcionam em vendas consultivas (com fontes de método), como cada jogo leva a um produto, o que testar.

**20 · Roadmap e decisões** (`20-roadmap`) — Timeline Motion como **trilha de tabuleiro**.
- TC: "Começar protegendo o núcleo e aproveitando as janelas de 2027"
- Sub: "Quatro ondas, da fundação às assinaturas, e as decisões que pedimos ao comitê hoje"
- Ondas (sem metas numéricas inventadas; janelas com fonte: Reforma Tributária — CBS em 2027; fim da manutenção padrão do SAP ECC em 2027): Onda 0 Fundação → Onda 1 Núcleo Signature → Onda 2 Novos produtos com IA → Onda 3 Recorrência. O mascote anda na trilha conforme as ondas acendem.
- "Decisões para o comitê" (cartas na mesa) e "O chamado" (como o último slide da APODI). Remover os indicadores "≥30%, ≥10%, −30%, ≥40%" (inventados). Se quiser medir, nomear o indicador sem número ("receita de produtos com IA no método", "tempo de entrega de diagnósticos").
- Mascote pose **bandeira**. Fala: "Primeiro o núcleo, depois as apostas."
- Verso: lógica das ondas, janelas com fonte, riscos, o que o comitê decide.

O antigo slide "Fontes e método" sai do roteiro: o método vai para o verso do slide 2 e as fontes para o verso de cada slide (e para o `README.md` e `pesquisa/`).

---

## 3. Arquitetura de layout (modelo APODI)

Tokens (iguais aos da APODI, que já são a paleta A&M):
```
--navy:#002B49; --navy-d:#122143; --navy-dd:#0E1C39; --indigo:#1F3263;
--steel:#5E8AB4; --slate:#33556D; --orange:#F78C16; --orange-l:#F9A64A; --orange-d:#C96A05;
--ice:#DFE8F0; --ice2:#EEF3F8; --ink:#002B49; --ink2:#35516A; --muted:#6B7B8C;
--line:#D6DEE6; --line2:#E8EDF2; --paper:#fff; --canvas:#F5F8FB; --grid:#E9EFF4;
--fh:"Barlow Condensed","Barlow Condensed Embed","Arial Nova Cond","Arial Narrow",sans-serif;  /* títulos */
--fb:"Inter","Helvetica Neue",Arial,sans-serif;  /* texto */
--fm:"JetBrains Mono",monospace;                  /* rótulos técnicos, com parcimônia */
```
(O laranja do deck atual `#F26B21` passa a ser `#F78C16`.)

Página e palco:
- Fundo da página: `radial-gradient(1400px 900px at 50% 40%,#EEF1F5 0%,#DCE2E9 100%)`; linha de progresso no topo (4 px, gradiente `#1F3263 → #F78C16`).
- `#stage` 1600×900, `border-radius:14px`, sombra `0 18px 50px rgba(14,28,57,.28)`, escalado para caber deixando ~62 px para a barra inferior (função `fit()` da APODI).
- Slide: fundo `--canvas` com grade de 40 px (`--grid`).

Moldura (injetada por JS a partir de atributos `data-*` do `<section>`):
- `.sr-top`: `left:12px; right:12px; top:16px; height:80px; border-radius:14px;` gradiente navy `linear-gradient(100deg,#0E1C39 0%,#122143 55%,#1F3263 100%)`; à esquerda logo A&M (branco) + logo DTS; marca "Planejamento Estratégico · DTS" + linha "Produtos, Serviços e Inteligência Artificial"; divisor; **título da seção** (CAIXA ALTA, Inter 800 17px) + "Parte N · Nome"; à direita ponto laranja + "Outubro de 2026"; decoração de linhas diagonais (`am-deco`) e a régua de pontos laranja `.sr-dec` no topo direito.
- `.sr-band`: `top:106px; height:50px; border-radius:14px 14px 0 0;` gradiente por tom (`c-navy`, `c-blue`, `c-steel`, `c-gold` com parcimônia), "› TEXTO" em Barlow Condensed 700 24px CAIXA ALTA; à direita pílula da **dica de interação**.
- `.body`: `left:12px; right:12px; top:156px; bottom:40px; padding:12px 16px;` branco 96 % com borda `--line`, cantos inferiores 14 px; `display:flex; flex-direction:column; gap:12px`. Variante escura `.body.dk` (radial navy) para slides de palco escuro (one-page, produtos, roadmap).
- Primeira linha do corpo: **TC** (Barlow Condensed 700 ~26 px, navy; destaque em laranja só em fundo escuro) + **Sub** (Inter 500 ~19–20 px, `--steel`).
- `.foot`: `left:32px; right:32px; bottom:11px;` 11 px: "DTS · PLANEJAMENTO ESTRATÉGICO 2027" (navy, negrito) · fonte curta do slide (uma linha) · "n / 20". **Sem o chip "fx NN"** no slide visível.
- Barra inferior (fora do palco): à esquerda as abas de capítulo com barrinha de progresso (`#dots` da APODI); à direita: **Fichas de produto** · **Virar a página** · **Voltar** · **n / 20** (abre o índice) · **Avançar** (laranja).
- Capa, Sumário e divisórias: sem moldura, fundo navy (`.cv`), título Barlow Condensed 800 (~112 px na capa), fio laranja curto, logos.

Componentes base disponíveis para os slides: `.stmt2` (afirmação), `.stmt3` (apoio), `.h2`, `.eye` (rótulo), `.lbl`, `.card`, `.pnl` (painel navy), `.glass`, `.kt` (KPI), `.tbl` (tabela), `.chip-dim`, `.legend`, `.src-note`, barra "E daí?" (`.sowhat`: faixa navy com ícone + uma frase), animações de entrada `[data-a]` com `--d`, `.lift`.

Tipografia mínima legível no palco: corpo ≥ 13 px, notas ≥ 11 px.

---

## 4. Política de números — "não invente números"

Permitido:
1. **Fatos de mercado do registro de fontes** (`src/data/05-fontes.js`, objetos `FONTES` e `FATOS`): cada número visível tem um fato com fonte, data e link; o verso cita a fonte.
2. **Números estruturais do nosso portfólio**: 4 pilares; 29 serviços (10 · 7 · 8 · 4); 24 produtos (7 · 6 · 5 · 6); 5 manter · 15 aprimorar · 4 criar; decisões do raio-X (4 · 13 · 10 · 2); códigos de produto (1.1 … 4.6); contagens do nosso próprio desenho (ex.: "sete portões", "quatro jogos", "quatro ondas").
3. Datas de eventos documentados (com fonte).

Proibido:
- Percentuais, metas, escores, preços, prazos, tamanhos de amostra ou equipes que não estejam no registro: ex.: "≥30% da receita", "−30% no tempo", "em 3 semanas", "10–15 entrevistas", "3–5 clientes-piloto", "piloto de 10 semanas", "roadmap de 90 dias", "7 lentes" (troque por palavras), escores de raio-X (3,6 · 4,2), barras de "investimento/diferenciação", "tempo até impacto".
- Número de pesquisa que não esteja no registro, ou cuja fonte seja fraca/não verificada, como fato. Se a fonte é imprensa citando estudo, diga isso no verso.

Onde o deck antigo tinha número de desenho (prazo, preço, quantidade), use palavras: "diagnóstico curto, de escopo fechado", "programa contínuo, por assinatura", "piloto com clientes selecionados". Prazo e preço de cada produto são calibrados na Fábrica (slide 18), e o deck diz isso.

---

## 5. Política de siglas e de linguagem

Siglas permitidas sem explicação (o público conhece): TI, IA, A&M, DTS, CEO, CFO, CIO, CTO, ERP, M&A, RH, SAP, LGPD.
Todas as outras: escrever por extenso ou trocar por português claro, por exemplo:
| Evitar | Usar |
|---|---|
| PE | fundos de private equity (pode usar "fundos" depois da primeira menção) |
| DD | due diligence / diligência |
| TSA | contrato de serviços de transição |
| IMO / SMO | escritório de integração / de separação |
| TMO / PMO | escritório de transformação / de projetos |
| OCM, ADKAR | gestão de mudança |
| ITSM | gestão de serviços de TI |
| SDLC | ciclo de desenvolvimento de software |
| AIOps | operação de TI com IA |
| DORA | (remover) |
| FinOps | gestão do custo de nuvem |
| TBM, CMDB, SSO, SLA, KPI, ROI | por extenso ou remover |
| LLM | modelo de IA generativa |
| RFP | concorrência / processo de escolha de fornecedor |
| SaaS | software por assinatura |
| VDR | data room |
| EBITDA | resultado operacional (EBITDA) na 1ª menção |
| CBS / IBS | novos tributos sobre consumo (CBS e IBS) na 1ª menção |
| ECC | versão antiga do ERP da SAP (ECC) na 1ª menção |
| ANPD, PL 2338 | Autoridade Nacional de Proteção de Dados; projeto de lei de IA (PL 2338) |
| MBB | McKinsey, BCG e Bain |
| GCC | centro global de entrega |
| GPU | processadores para IA |
| E / H, [E], [H] | não usar |
Nomes de produto em inglês continuam (são nomes de mercado), mas **sem sigla entre parênteses** (ex.: "Integration & Separation Office", não "(IMO/SMO)").

Linguagem:
- Português formal e direto, frases curtas, verbos de ação. Uma ideia por frase.
- Proibido o genérico: "soluções inovadoras", "agregar valor", "alavancar", "transformação digital" sem objeto, "end-to-end", "holístico", "robusto", "sinergias" sem dizer quais.
- Cada slide responde **E daí?**: consequência para o cliente (decisão, risco, prazo) e para a DTS.
- Peso = concretude: quem decide, que risco evita, que prazo protege, o que muda na segunda-feira.
- Texto curto em uma linha; nada de quebrar a última palavra numa segunda linha.

---

## 6. "Virar a página" — o verso de cada slide

- Botão **Virar a página** na barra inferior (e tecla `V`): o palco gira em 3D (rotateY, ~700 ms, perspectiva) e mostra o verso; de novo `V`, `Esc` ou o botão **Desvirar** volta à frente. Navegar para outro slide desvira automaticamente.
- O verso usa a mesma moldura (cabeçalho e rodapé), faixa "› VERSO · CONTEXTO E FONTES" (tom `c-steel`) e corpo branco em duas colunas:
  - **Esquerda (~60 %) — Contexto**, em prosa, com subtítulos curtos:
    1. *O que esta página afirma* — a conclusão em uma frase e o que a sustenta.
    2. *Por que isso pesa* — consequência para o cliente e para a DTS.
    3. *Como chegamos aqui* — método, critérios, raciocínio.
    4. *O que ainda vamos validar* — pontos abertos, com honestidade.
    - 250 a 450 palavras no total; referências como [1], [2] ligadas à lista de fontes.
  - **Direita (~40 %) — Fontes**: lista numerada; cada item: **Organização** — título (data) · tipo (fonte primária / imprensa / dado nosso) · link "abrir fonte ↗" (URL completa do registro). Fatos estruturais citam "Portfólio oficial DTS (Digital & Tech Services)".
  - Rodapé do verso: caixa **"Leitura do AM"** com o mascote (pose **livro**) e uma frase de síntese.
- Arquivo do verso: `src/versos/NN-slug.html` contendo `<article class="verso" data-for="NN">…</article>`. O texto tem de caber sem rolagem.
- Impressão/PDF: cada slide é seguido do seu verso (página de trás).

---

## 7. Mascote "AM"

**Correção do usuário (29/10/2026): "é um A com M, de Alvarez and Marsal".** A imagem de referência (`/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/images/9.webp`) é o **monograma A&M em 3D**: um "A" cuja perna direita é vertical e se emenda num **"M"** — os dois triângulos azuis menores (um dentro do vão do A, outro à direita da perna vertical) formam as pontas do M. Faces frontais brancas, laterais azul-índigo e uma **fita laranja luminosa** que abraça o conjunto. O mascote tem de preservar **o A e o M** juntos (silhueta do monograma), não só uma letra A. Rosto na face branca do A; o M é parte do corpo (pode virar ombro/braço ou "irmão menor" encostado, sem perder a leitura do monograma); a fita laranja vira o traço de personalidade (cachecol, faixa, halo). Estilo: simpático e premium como o mascote da APODI, sem virar infantil.
- Cores: face `#FFFFFF → #E9EEF5`; laterais índigo/navy (`#1F3263`, `#2B3F8F`, `#3E5BB8`, azul `#5E8AB4`), fita `#F78C16 → #F9A64A` com brilho; contorno sutil navy. Sem roxo da marca Apodi.
- Rosto na face branca: dois olhos com brilho, sorriso pequeno, bochechas `#FCD1A2` com opacidade baixa. Piscar periódico.
- Poses (mesmo SVG, acessórios trocados por classe): **aceno**, **aponta**, **pensa**, **lupa**, **lanterna**, **capacete**, **apresentador** (segura cartas), **bandeira**, **livro**, **comemora**.
- Animações: flutuação suave, piscar, brilho correndo na fita, aceno no `enter`; tudo desligado em `prefers-reduced-motion` e estático na impressão.
- API: `<div class="am-masc" data-pose="aceno" style="--s:280px"></div>` (o JS injeta o SVG); balão: `<div class="am-fala">texto</div>` (branco, texto navy, fio laranja à esquerda).
- Arquivos: `src/js/06-mascote.js`, `src/css/06-mascote.css`.
- Contrato JS (obrigatório, a fundação depende dele):
  ```js
  window.AMMasc = {
    POSES: ["aceno","aponta","pensa","lupa","lanterna","capacete","apresentador","bandeira","livro","comemora"],
    svg(pose),          // string SVG completa da pose (viewBox fixo, sem dependências externas)
    mount(root),        // monta todo .am-masc dentro de root (document se omitido); idempotente
    pose(el, nome),     // troca a pose de um .am-masc já montado
    play(el), stop(el)  // animação de entrada / parada (aceno, comemora…)
  };
  ```
  Auto-monta no `DOMContentLoaded`. IDs internos de gradiente/filtro únicos por instância. Tamanho pelo `--s` (largura); altura proporcional. Estático em `@media print` e em `prefers-reduced-motion`.
- Onde aparece: capa (grande), sumário, divisórias de parte, raio-X (pequeno), fábrica (pequeno), jogos (apresentador), roadmap (bandeira, andando na trilha), e no verso de todas as páginas (pequeno, "livro"). Não colocar em todo slide.

---

## 8. Fichas de produto (24)

- Abrem pelo one-page, pelas cartas de produto e por `#p=<id>`; navegação ← → entre fichas; `Esc` volta.
- Visual no modelo APODI: cabeçalho igual ao dos slides; faixa "› FICHA 1.1 · TECH & AI VALUE DIAGNOSTIC" com dica; corpo com a carta do produto à esquerda (status, nome, proposta, público, formato, encaixe, origem, "Por que A&M") e, à direita, problema, o que o cliente recebe, como funciona (etapas sem semanas), papel da IA, como vira produto, ferramentas e dados, skills, **jogo de entrada** do pilar e fontes.
- Conteúdo: reescrever sem siglas desconhecidas e sem números inventados. `kpis` só com fatos do registro (`[valor, texto, idFato]`). `meta` sem prazo/preço numéricos ("Formato: diagnóstico de escopo fechado"). `steps` com rótulo "1", "2"… em vez de "S1–2".
- Dados por pilar em `src/data/11-produtos-p1.js` … `14-produtos-p4.js`.

---

## 9. Definição de pronto (para cada slide)

- Moldura APODI correta; TC e Sub numa linha cada; nada cortado; nenhuma quebra de linha em rótulos, chips, nomes e títulos curtos; sem área vazia maior que ~60 px no fim do corpo.
- Nenhum número fora da política; nenhuma sigla fora da lista.
- Responde "E daí?"; liga com o slide anterior e o seguinte.
- Verso escrito, com 250–450 palavras e fontes completas com link; cabe sem rolagem.
- Interações funcionando (passos com →, painéis, spotlight, cartas que viram, link para fichas), sem erro no console; impressão com todas as informações (frente e verso).

---

## 10. Esquemas de dados (V6)

### 10.1 Registro de fontes e fatos — `src/data/05-fontes.js`
```js
/* Registro de fontes e fatos. Todo número de mercado visível no deck existe aqui. */
const FONTES={
  "gartner-agentic-2025":{org:"Gartner",titulo:"Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027",data:"25/06/2025",url:"https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",tipo:"primária"},
  "portfolio-dts":{org:"Alvarez & Marsal Brasil",titulo:"Portfólio Digital & Tech Services (documento interno)",data:"2026",url:"",tipo:"documento interno"},
  /* tipo: "primária" (quem produziu o dado) · "oficial" (governo, lei, regulador) · "empresa" (comunicado da própria empresa) · "imprensa" (veículo citando terceiros) · "documento interno" */
};
const FATOS={
  "agentic-cancelados-40":{txt:"Mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027",num:"40%",fontes:["gartner-agentic-2025"],status:"verificado",nota:"Previsão do Gartner, não medição."},
  /* status: "verificado" (conferido na fonte) · "a verificar" · "divergente" (não usar até corrigir) · "fraco" (fonte secundária fraca: não usar como número de destaque) */
};
```
IDs legíveis (minúsculas, hífens). Datas no formato dd/mm/aaaa ou mm/aaaa quando só há mês.

### 10.2 Produtos — `src/data/1N-produtos-pN.js` (um arquivo por pilar, `PRODUCTS.push({...},...)`)
```js
{id:"tech-ai-value-diagnostic", code:"1.1", pillar:1, st:"ai"|"keep"|"new", sig:true|false /* A&M Signature */,
 name:"Tech & AI Value Diagnostic", from:"Tech Maturity & Value Assessment" /* ou "Novo · produto com IA" */,
 tagline:"uma linha, concreta",
 pitch:"1–2 frases: o que resolve e para quem, sem adjetivos vazios",
 meta:["Formato: …","Comprador: …","Modelo comercial: …","Encaixe: …"],   /* sem prazo nem preço em número */
 kpis:[["56%","dos CEOs ainda sem retorno financeiro com IA","ceo-sem-retorno-ia-56"]], /* 0–3 itens; 3º elemento = id em FATOS */
 who:[...], pain:[...], deliv:[...], skills:[...],
 steps:[["1","Título curto","o que acontece"],...],  /* sem "S1–2", sem semanas */
 tools:"…", data:"…", ai:[...], prodz:[...],
 bench:"o que o mercado faz (com fonte no campo fontes) e o diferencial A&M em palavras",
 jogo:"mesa-do-conselho"|"pre-mortem-2027"|"jogo-do-dia-1"|"exercicio-de-crise",
 fontes:["id-fonte",...],
 ev:"nota curta opcional sobre o que é proposta nossa" }
```
Sem `E()`/`Hy()` nos textos novos (o renderizador deve tolerar strings antigas durante a transição).

### 10.3 Jogos de entrada — `src/data/30-jogos.js`
```js
const JOGOS={
  "mesa-do-conselho":{nome:"Mesa do Conselho",pilar:1,promessa:"uma linha",passos:["…","…","…"],quem:"…",leva:"…",produtos:["1.1","1.5","1.7"],fontes:["…"]},
  "pre-mortem-2027":{…pilar:2…}, "jogo-do-dia-1":{…pilar:3…}, "exercicio-de-crise":{…pilar:4…}
};
```

## 11. Arquivos e responsabilidades (para trabalho em paralelo)

- Fundação (moldura, navegação, virar a página, impressão, divisórias, renderizador de fichas, ferramentas): `build.py`, `src/styles.css`, `src/core.js`, `src/engine.js`, `src/js/0*.js` exceto `06-mascote.js`, `src/js/40-fichas.js`, `src/js/99-boot.js`, `src/css/0*.css` exceto `06-mascote.css`, `src/css/40-fichas.css`, `src/data/01-*.js` (configuração de capítulos, se precisar).
- Conteúdo-base: `src/data/05-fontes.js`, `src/data/1N-produtos-pN.js`, `src/data/30-jogos.js`, `src/js/06-mascote.js`, `src/css/06-mascote.css`.
- Slides (fase 3): cada slide NN é dono de `src/slides/NN-*.html`, `src/versos/NN-*.html`, `src/css/30-sNN-*.css`, `src/js/30-sNN-*.js` (e da configuração do seu pilar quando for slide de pilar).
- Ninguém edita arquivo de outro dono. Pedido de mudança em arquivo compartilhado vai como nota no resultado do agente.
- Cada agente gera o HTML numa saída própria: `python3 build.py --out <scratchpad>/v6/build/<agente>.html`. Nunca sobrescrever `DTS_Portfolio_Estrategico_2027.html` durante o trabalho paralelo.
- Ninguém faz `git commit`/`push`.
