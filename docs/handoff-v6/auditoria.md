# Auditoria de conteúdo da V5 para a reescrita V6

**Data:** 29/10/2026 · **Versão auditada:** V5 · commit daf0a04 (HEAD da branch claude/pensive-fermat-fijb3d) · DTS_Portfolio_Estrategico_2027.html  
**Escopo:** 20 slides (numeração da V5), 9 divisórias de capítulo e 24 fichas de produto; somente leitura.

**Entradas usadas**
- SPEC V6: /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/v6/SPEC.md (seções 2, 4, 5, 6, 7, 8, 10, 11)
- Fontes V5 via git: src/slides/*.html, src/slides.js, src/js/*.js, src/data/*.js (extraídas em /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/v5src)
- Pesquisa: pesquisa/01_big_four.md, 02_estrategia_integradores_pares_AM.md, 03_mercado_brasil_regulacao.md, 04_ferramentas_ia_produtizacao.md
- Capturas da V5: /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_01.png … c_20.png (as de 2, 4, 6, 8, 10, 12, 14, 16 e 18 mostram a divisória, não o slide)
- Capturas novas desta auditoria (slide sem divisória, estados interativos e as 24 fichas): /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_NN*.png e /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_X.Y.png
- Texto de todos os estados interativos e das fichas, extraído com Playwright: /tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/extract.json

**Como ler**

| Classe do número | Significado |
|---|---|
| fato com fonte | número de mercado com fonte e data na pesquisa; vai para o registro src/data/05-fontes.js (FATOS) e o verso cita a fonte |
| estrutural | número do nosso portfólio (4 pilares, 29 serviços, 10·7·8·4, 24 produtos, 7·6·5·6, 5·15·4, 4·13·10·2, códigos 1.1–4.6, contagens do nosso desenho em palavras) |
| desenho nosso | prazo, preço, meta, escore, tamanho de amostra ou de equipe, frequência ou quantidade inventada por nós: remover ou trocar por palavras (SPEC §4) |
| sem base | afirmação numérica ou factual sem fonte nem cálculo que a sustente |

| Status do fato | Significado |
|---|---|
| verificado | a pesquisa de 06/10/2026 leu a fonte primária ou oficial (URL e data) |
| a verificar | o número veio de imprensa ou de resumo de busca citando o estudo; conferir no original |
| fraco | dado do próprio fornecedor, fonte secundária fraca, data aproximada ou não reverificado: não pode ser número de destaque |
| divergente | a redação do deck não bate com o que a fonte diz: corrigir antes de usar |

Ações possíveis: manter · manter e citar no verso · corrigir redação · verificar antes de usar · mover para o verso · trocar por palavras · remover.  
Tipos de quebra: **quebra** (rótulo, chip, nome ou frase curta que ocupa mais de uma linha) · **viúva** (a última palavra (ou duas) cai sozinha na linha seguinte) · **palavra partida** (palavra com hífen quebrada entre linhas) · **corte** (texto cortado (reticências ou fora da caixa)) · **fonte pequena** (texto abaixo do mínimo da SPEC (corpo ≥ 13 px; notas ≥ 11 px)).  
Numeração dos slides = V5 (1–20). O destino na V6 aparece em cada seção. “s04” = slide 4 da V5; “f1.1” = ficha 1.1.

**Números desta auditoria:** 20 slides, 9 divisórias e 24 fichas; 296 números classificados (estrutural: 55, sem base: 9, fato com fonte: 136, desenho nosso: 96); 283 siglas/jargões, 123 frases genéricas e 98 problemas de lógica registrados; medição automática: 101 quebras e 95 viúvas nos estados dos slides, 290 quebras e 128 viúvas nas fichas; 75 fatos no registro sugerido.

## 1. Os 20 problemas principais

| # | Gravidade | Onde | Problema | Ação |
|---|---|---|---|---|
| 1 | alta | s07, s18, s19 | Metas e números de desenho apresentados como meta ou fato: roadmap (≥30%, ≥10%, −30%, ≥40%), portão de produto (≥3 clientes/ano, ≥70%, ≥30%), “tempo até impacto” e réguas dos três caminhos, “3–5 clientes-piloto”, “1–2 fundos”, “piloto de 10 semanas”, “2–3 engenheiros”, “1 dono por pilar + 1 de IA”, “0–90 dias”. | Remover; dizer em palavras e registrar que prazo e preço se calibram nos pilotos (T01). |
| 2 | alta | 24 fichas; s09–s17 | Prazos, preços e escalas inventados nas 24 fichas e nas jornadas comerciais: “Duração: 3 semanas”, “Em 3 semanas”, “Red flag em 1 semana, DD completa em 3”, KPIs “proposta DTS” (3 sem., 7 lentes, 100%, 0 interrupções, 1 painel), etapas S1–2/D1–30/M4+, “10–15 entrevistas”, “50–200 respondentes”, “Top-10”, “roadmap de 90 dias”. | meta sem número, kpis só do registro, etapas 1–5 (T02). |
| 3 | alta | s06 | Raio-X com escores numéricos (eixos 1–5, posições com decimais) e com os 4 produtos novos posicionados na matriz de serviços. | Quadro qualitativo dos 29 serviços, filtro por pilar, dica Demanda · Direito de vencer · Decisão · Vai para (T03). |
| 4 | alta | todos | Cerca de 60 siglas desconhecidas sem explicação (PE, DD, TSA, IMO/SMO, TMO/PMO, LLM, FinOps, TBM, CBS/IBS, ECC, EBITDA, CMN, CAIO, CDO, CHRO, CRO, P&L, ROI, KPI, RFP, SaaS, SDLC, AIOps, DORA, CMDB, SSO, SLA, TCO…). | Aplicar o glossário do Anexo A (T04). |
| 5 | alta | todos | Jargão em inglês que o comitê não usa: signing, closing, deal, carve-out, cutover, red flag, valuation, sprint, squad, fee, assurance, tabletop, right-sizing, quick wins, AS-IS/TO-BE. | Português claro do Anexo A2 (T05). |
| 6 | alta | 13 slides claros | Títulos-slogan sem conclusão nem prova e destaque em laranja sobre branco (proibido pela marca). | Títulos-conclusão da SPEC §2 em uma linha; laranja só como detalhe (T06). |
| 7 | alta | s04, s06, s07 | Produtos citados antes de o portfólio ser apresentado (forças, raio-X, caminhos): a resposta aparece antes da pergunta. | Forças e benchmark sem produtos; caminhos com “duas apostas novas” sem nome (T07). |
| 8 | alta | s02, s04, s09–s18, fichas | Promessas sem base: “Garantimos que… entreguem”, “certeza de entrega”, “Dia 1 sem susto/garantido”, “assinamos o resultado”, “migrações garantidas”, “economia certificada”, “Um produto é igual em todo cliente”. | Consequência concreta e verificável no lugar da promessa (T08). |
| 9 | alta | s05, s07, s10, s14 | Afirmações sobre a A&M sem prova: “mandato para levar produtos com IA ao Brasil”, “DNA de honorário por resultado vira vantagem”, “espaço livre no Brasil”. | Fato só com fonte; leitura nossa vai ao verso com o que falta validar (T09). |
| 10 | alta | s04, s05, s10, s12, s14, s15; fichas | Fatos com redação diferente da fonte: “deals liderados por PE” (fonte: participação de PE/VC em 50%), “37% no início da adequação” (PwC: análise inicial), “>70% dos ERPs abaixo do business case” (Gartner: previsão), “quase todas as grandes usam IA”, marco “Jan 2026” com dado de nov/2025, 53% global lido como Brasil. | Corrigir redação e status no registro (T10). |
| 11 | média | s04, s07, s16, s18; fichas | Números fracos ou do fornecedor como destaque: VMware 8–15× (duas vezes no slide 16), AWS “até 4×”, CAST “>75%”, Vertice “18%/15 dias”, IBM Bob “~45%”, FinOps “20–30%”, MIT “~67%”, Gartner “não verificado”, McKinsey/Oxford (2012). | “Dado do fornecedor” ou verso; “não verificado” sai (T11). |
| 12 | média | s10, s14, s15; fichas 2.5, 3.1, 3.5 | Números que o usuário mandou tirar continuam: US$ 67,8 bi (s10), 1.581 transações (s14), 17% das empresas usam IA (f2.5); “50% com PE/VC” virou KPI três vezes. | Remover; 50% PE/VC no máximo uma vez, com redação correta (T12). |
| 13 | média | s02, s06–s09, divisórias | Contagens que não fecham: manter 4 × 5; aprimorar 13 × 15; “13 em sobreposição” × “fundir 10” × “12” da SPEC; “com IA no núcleo” × “IA no método de 19” × “6 deles com IA”; ponte “29 − 13 + 6 − 2 + 4 = 24” opaca. | Uma regra de vocabulário e a frase de reconciliação; ponte “14 + 6 + 4 = 24” (T13). |
| 14 | média | s09 | Base com nome errado (“Plataforma de Dados e IA”; pedido: “Plataforma de Dados e AI”) e “A&M Signature” sem explicação em palavras. | Corrigir o nome; legenda “★ A&M Signature: onde o direito de vencer é maior” (T14). |
| 15 | média | s03, s08, s09, s11–s17, divisórias | Definições oficiais genéricas (“soluções”, “gerando valor”, “excelência na execução”, “sustentabilidade a longo prazo”) usadas como conteúdo executivo e repetidas 3–4 vezes. | Reescrever por assunto e usar cada frase uma vez (T15). |
| 16 | média | s05, s10, s14, s16–s18; fichas 2.6, 4.6 | Falta o “E daí?”: KPIs soltos (US$ 67,8 bi, Lei do Bem, R$ 50,4 bi dos bancos, 25 mil agentes da McKinsey), casos de M&A sem a consequência para a TI, sinais do benchmark com conclusão sem prova. | Barra “E daí?” e cada número ligado à pergunta do slide (T16). |
| 17 | média | s09, s11, s14, s18, s19; fichas | Nomes internos (PEPI, A&M Tax, Data & IA, Disputes & Investigations) e ativos ainda inexistentes (Spend Radar, Benchmark DTS Brasil, LLM corporativo seguro) tratados como conhecidos e prontos. | Explicar ou tirar; ativos propostos com “a construir” (T17). |
| 18 | média | s08, s18, s19, divisórias | Novidades não pedidas: nomes novos para os pilares (e decisão de aprová-los), “Anatomia da ficha”, onda “Revisão”, camadas comerciais com preço. | Remover; renomeação vira pergunta aberta no verso, se for o caso (T18). |
| 19 | média | todos | Quebras de linha e viúvas: 101 quebras curtas e 95 viúvas medidas nos slides, 7 a 19 quebras por ficha; rodapé de fonte em 2 linhas em 8 slides; palavras partidas no hífen (bem-sucedidas, produto-símbolo, EY-Parthenon, right-sizing). | Frases de uma linha; rodapé curto e fontes no verso (T19). |
| 20 | média | todos | Legibilidade e informação escondida: rótulos de 9,5–10,5 px; “por quê” só na dica; diagnóstico atrás do divisor; resíduos “H”, selos “proposta DTS”, chip “fx NN”, “AS-IS/TO-BE”, controles de demonstração. | Notas ≥ 11 px; razão visível; resíduos fora; contexto no verso (T20). |

## 2. Problemas transversais

### T01 · Números de desenho como meta ou fato
- **Problema:** Metas, prazos, preços, escores, tamanhos de amostra e de equipe inventados aparecem como se fossem dados: ≥30%, ≥10%, −30%, ≥40% (roadmap); ≥3 clientes/ano, ≥70%, ≥30% (portão); “tempo até impacto” ~3 / 6–9 / 18–24 meses e réguas de investimento (caminhos); 3–5 clientes-piloto, 1–2 fundos, piloto de 10 semanas, 2–3 engenheiros, 1 dono por pilar + 1 de IA, 0–90 dias.
- **Onde:** s07, s18, s19, fichas (todas)
- **Ação:** Remover. Onde a ideia importa, dizer em palavras (“piloto com clientes selecionados”, “um dono por produto”) e registrar no verso que prazo e preço são calibrados nos pilotos (slide 18 da V6).

### T02 · Prazos e escalas de produto nas fichas e jornadas
- **Problema:** Todas as 24 fichas trazem “Duração: N semanas/meses” no formato, KPIs “proposta DTS” (3 sem., 7 lentes, 100%, 0 interrupções, 1 painel, 3 cláusulas…), etapas rotuladas por semana/dia/mês (S1–2, D1–30, M4+) e números no texto (10–15 entrevistas, 50–200 respondentes, Top-10, roadmap de 90 dias). As jornadas comerciais dos slides 10/12/14/16 repetem (3 semanas, 10 decisões, 2–8 semanas, 1 semana, 4–10 semanas, % de economia).
- **Onde:** s09, s10, s11, s12, s14, s15, s16, fichas (todas)
- **Ação:** meta sem número (“Formato: diagnóstico curto, de escopo fechado”); kpis só com fatos do registro [valor, texto, idFato]; etapas “1”…“5”; jornada em palavras (entrada curta → execução → acompanhamento contínuo).

### T03 · Escores do raio-X
- **Problema:** A matriz posiciona os 29 serviços em eixos 1–5 com decimais (ex.: 3,6 × 4,7) e quadrantes; também posiciona os 4 produtos novos (1.7, 2.6, 3.5, 4.6) como bolhas tracejadas. A precisão é falsa (julgamento qualitativo) e os produtos aparecem antes do portfólio.
- **Onde:** s06
- **Ação:** Quadro qualitativo sem números (2×2 por quadrantes ou calor por pilar), só com os 29 serviços; dica por assunto: Demanda · Direito de vencer · Decisão · Vai para. Tirar as bolhas dos produtos novos.

### T04 · Siglas desconhecidas
- **Problema:** Cerca de 60 siglas fora da lista permitida aparecem sem explicação: PE, VC, DD, TSA, IMO/SMO, TMO, PMO, LLM, FinOps, TBM, ITSM, SDLC, AIOps, DORA, CMDB, SSO, SLA, KPI, ROI, RFP, SaaS, VDR, EBITDA, CBS/IBS, ECC, CMN, LC, ANPD, PL 2338, GPU, CAIO, CDO, CHRO, CRO, COO, P&L, PPM, CSC, T&M, NPS, TCO, BIA, DR, QA, EA, TOGAF, APM, PTAX, FormP&D, PD&I, MCTI, CPC/IFRS, RPA, RACI, 1S26, 4T/1T…
- **Onde:** todos os slides, todas as fichas
- **Ação:** Aplicar o glossário (Anexo A): por extenso ou português claro; sigla entre parênteses só na 1ª menção quando o nome é usado depois. Nomes de produto em inglês ficam, sem sigla entre parênteses (“Integration & Separation Office”, não “(IMO/SMO)”).

### T05 · Jargão em inglês
- **Problema:** signing, closing, deal(s), tickets, carve-out, cutover, go-live, hypercare, red flag, valuation, standalone, sprint, squad, fee, success fee, upsell, assurance, advisory, tabletop, right-sizing, shelfware, shadow AI, lock-in, quick wins, baseline, backlog, board pack, spans & layers, op model, accountability, AS-IS/TO-BE, AI-native, services-as-software, interim.
- **Onde:** todos os slides, todas as fichas
- **Ação:** Trocar pelo português do Anexo A2 (assinatura, fechamento, transação, separação, virada, entrada em operação, alerta crítico, preço da empresa, diagnóstico curto, equipe, honorário de êxito, revisão independente, simulação de mesa…).

### T06 · Títulos-slogan e laranja sobre branco
- **Problema:** Os títulos afirmam slogans, não conclusões com prova (“Um portfólio para todo desafio de tecnologia.”, “Hoje: 29 serviços em 4 pilares.”, “Onde a A&M tem direito de vencer.”, “Um produto é igual em todo cliente.”). Nos slides claros o destaque do título é texto laranja sobre branco, proibido pela marca.
- **Onde:** s02, s03, s04, s05, s06, s07, s08, s10, s12, s14, s16, s18, s20
- **Ação:** Usar os títulos-conclusão (TC) da SPEC §2, em uma linha, Barlow Condensed navy; laranja só como fio sob o título ou em fundo escuro.

### T07 · Produtos antes do portfólio
- **Problema:** Forças (“Quem responde” com 12 produtos), raio-X (bolhas 1.7/2.6/3.5/4.6 e lista “→ código”) e três caminhos (3.5 e 1.7 como apostas) citam produtos que só serão apresentados nos slides 8–9.
- **Onde:** s04, s06, s07
- **Ação:** Forças e benchmark sem nomes de produto (SPEC §2, slides 5–6); raio-X só com o destino na dica (“Vai para”); caminhos dizem “duas apostas novas” sem nome.

### T08 · Promessas sem base
- **Problema:** “Garantimos que programas críticos de tecnologia entreguem”, “certeza de entrega”, “Dia 1 garantido / sem susto”, “assinamos o resultado”, “respondemos por prazo e valor”, “migrações garantidas”, “economia certificada”, “Um produto é igual em todo cliente”, “Acelerar é obrigatório”.
- **Onde:** s02, s04, s09, s10, s12, s13, s14, s15, s16, s18, divisórias 06 e 08, fichas 1.5, 2.4, 3.2, 4.4
- **Ação:** Trocar promessa por consequência concreta e verificável (decisão, risco, prazo, quem sente): “o conselho sabe até a data da virada se o ERP chega a tempo”.

### T09 · Afirmações sobre a A&M sem prova
- **Problema:** “Para o DTS, é o mandato para levar produtos com IA ao Brasil” (a pesquisa marca como hipótese), “o DNA de honorário por resultado da A&M vira vantagem”, “A A&M tem DNA de honorário por resultado”, “espaço livre no Brasil”, “assinatura do portfólio não encontrada no Brasil” (não encontrado ≠ inexistente).
- **Onde:** s05, s07, s10, s14, fichas 1.3, 3.5
- **Ação:** Escrever como fato só o que tem fonte (“A Alvarez & Marsal global criou o Global AI Board em 05/05/2026; segundo a Bloomberg, mira metade da receita com trabalho de IA até 2028”); o resto como leitura nossa, no verso, com o que falta validar.

### T10 · Fatos com redação diferente da fonte
- **Problema:** “Deals liderados por private equity” e “PE em metade dos deals” (fonte: fundos de PE/VC participaram de 50% das transações de 2025); “37% no início da adequação” (PwC: 37% em análise inicial do impacto); “>70% dos ERPs abaixo do business case” (Gartner: previsão até 2027); “quase todas as grandes empresas usam IA” (IDC: 95% das grandes organizações pesquisadas); marco “Jan 2026” com dado de nov/2025 (honorários McKinsey); “53% das empresas sem talento” é pesquisa global, não Brasil; Lei do Bem ano-base 2024 pode ter dado mais novo; PL 2338 “votação após as eleições de out/2026” pode estar vencido.
- **Onde:** s04, s05, s06, s10, s12, s14, s15, fichas 1.4, 1.6, 1.7, 2.2, 2.4, 3.1, 3.5
- **Ação:** Corrigir a redação e registrar status no 05-fontes.js (Anexo B).

### T11 · Números fracos ou do fornecedor como destaque
- **Problema:** VMware 8–15× (Baguete, data aproximada) aparece 2 vezes no slide 16 e nas fichas 1.5 e 4.3; AWS “até 4×”; CAST “>75%” (caso do fornecedor); Vertice “18%” e “15 dias”; IBM Bob “~45%”; Ardoq “~40%”; FinOps “20–30%” (IT Forum); MIT NANDA “~67% × 1/3” (não reverificado); Gartner “preço por resultado transfere risco” (não verificado); McKinsey/Oxford 45%/56% (estudo de 2012); McKinsey 50–60% sinergias (2011).
- **Onde:** s04, s07, s16, s18, fichas 1.5, 2.1, 2.3, 3.1, 3.2, 4.1, 4.3, 4.6
- **Ação:** Fraco não vira número de destaque (SPEC §4). Dizer “dado do fornecedor” ou levar ao verso; o “não verificado” sai; estudo antigo leva o ano.

### T12 · Números que o usuário mandou tirar
- **Problema:** O usuário pediu para tirar “US$ 67,8 bi mercado de TI”, “gasto com IA”, “1.581 transações; 50% com PE/VC” e “17% das empresas usam IA” (“isso daí já sabemos”). Continuam no slide 10 (US$ 67,8 bi), no slide 14 (1.581) e na ficha 2.5 (17%); “50% com PE/VC” virou KPI no slide 15 e nas fichas 3.1 e 3.5.
- **Onde:** s10, s14, s15, fichas 2.5, 3.1, 3.5
- **Ação:** Remover os três; usar o 50% PE/VC no máximo uma vez, no contexto de Tech M&A e com a redação correta.

### T13 · Contagens que não fecham entre slides
- **Problema:** Raio-X: manter 4 · aprimorar 13 · fundir 10 · retirar 2. Ponte: manter 5 · aprimorar 15 · criar 4 e “13 → 6”. DTS hoje: “13 em sobreposição”. SPEC V6 painel 1: “12 se sobrepõem ou perdem sentido sozinhos”. Divisórias: “6/7, 5/6, 3/5, 5/6 com IA no núcleo”; caminhos: “IA no método de 19 produtos”; one-page: “6 deles com IA no método”. Ponte: “29 − 13 + 6 − 2 + 4 = 24”.
- **Onde:** s02, s06, s07, s08, s09, divisórias 05–08
- **Ação:** Uma regra de vocabulário (manter = essência preservada, com IA de apoio; aprimorar com IA; criar com IA) e uma frase de reconciliação no verso dos slides 7 e 8 (ver tabela de reconciliação). Ponte em palavras: “14 serviços seguem um a um, 13 se fundem em 6, 2 deixam de ser vendidos sozinhos e 4 nascem: 14 + 6 + 4 = 24”.

### T14 · Nome da base e “Signature”
- **Problema:** O slide 9 mostra “Plataforma de Dados e IA”; o usuário pediu “Plataforma de Dados e AI”. “★ A&M Signature” só é explicado no rodapé e na dica (“maior direito de vencer (DNA operador)”).
- **Onde:** s09, fichas (selo Signature)
- **Ação:** “Plataforma de Dados e AI” em todos os lugares; Signature explicado em palavras na legenda: “onde o direito de vencer da A&M é maior”.

### T15 · Textos oficiais genéricos como conteúdo executivo
- **Problema:** As definições do portfólio oficial (“Apoiamos líderes… gerando valor”, “garantindo implementações bem-sucedidas”, “garantindo excelência na execução… maximizar o valor da transação”, “sustentabilidade a longo prazo”) e os “Quando nos contratam” genéricos aparecem nos slides 3, 8 e 9; as definições novas dos pilares (“Apoiamos…”, “Garantimos…”, “Protegemos…”, “Modernizamos…”) se repetem 3 a 4 vezes (divisória, one-page, lead do slide de produtos, spotlight).
- **Onde:** s03, s08, s09, s11, s13, s15, s17, divisórias 05–08
- **Ação:** Reescrever por assunto (Quando o cliente nos chama · O que entregamos · Onde somos fortes · Onde há sobreposição) e usar cada frase uma vez.

### T16 · “E daí?” ausente
- **Problema:** KPIs que não ligam ao argumento (US$ 67,8 bi e 4,2 mil empresas da Lei do Bem no P1; R$ 50,4 bi dos bancos como prova do 4.6; 25 mil agentes da McKinsey na ficha 2.6); casos de M&A sem dizer o que exigem da TI; sinais do benchmark com conclusão sem prova; “Anatomia da ficha” sem consequência para o comitê.
- **Onde:** s05, s10, s14, s16, s17, s18, fichas 2.6, 4.6
- **Ação:** Cada número responde a uma pergunta do slide; cada slide fecha com uma barra “E daí?” (consequência para o cliente e para a DTS).

### T17 · Nomes internos e ativos que ainda não existem
- **Problema:** PEPI (slides 14 e 19), A&M Tax, Data & IA (prática), Disputes & Investigations, Private Equity Performance Improvement; A&M Assist e DiligenceGPT sem explicação; Spend Radar, Benchmark DTS Brasil, Diagnóstico padrão DTS, Biblioteca de agentes e “LLM corporativo seguro” apresentados como se já existissem.
- **Onde:** s09, s11, s14, s18, s19, fichas 1.3, 1.5, 1.6, 1.7, 2.4, 3.4, 4.5
- **Ação:** Nome interno só explicado (“a área tributária da A&M”); ferramenta global: “ferramentas de IA da A&M global para diligência (A&M Assist e DiligenceGPT), a confirmar para uso no Brasil”; ativos propostos com o rótulo “a construir”.

### T18 · Novidades não pedidas
- **Problema:** Nomes novos para os pilares (“IT Advisory · Strategy, Leadership & Value”, “Tech M&A & Value Creation”, “Modernization & AI-Ready Technology”) e a decisão “aprovar os novos nomes dos pilares”; “Anatomia de uma ficha de produto” (12 blocos); onda “Revisão” (5ª onda); camada “Sprint · Execução · Assinatura” com preços.
- **Onde:** s08, s18, s19, divisórias 05, 07, 08
- **Ação:** Remover (o usuário pediu para não criar o que não pediu). Se a renomeação dos pilares for desejada, vira pergunta aberta no verso do slide 20.

### T19 · Quebras de linha, viúvas e palavras partidas
- **Problema:** Medição automática: 101 quebras de textos curtos e 95 viúvas nos estados dos slides (ex.: “pronto para 2027?”, “crise.”, “vantagem.”, “plataforma.”, “adoção.”, títulos do spotlight de P3/P4, chip “Tech & Digital (DTS)”) e 290 quebras e 128 viúvas nas fichas (7 a 19 por ficha); rodapé de fonte em 2 linhas nos slides 4, 5, 6, 7, 12, 14, 16 e 18; palavras partidas no hífen: “bem-sucedidas” (s03), “produto-símbolo” (f2.4), “EY-Parthenon” (f3.2), “right-sizing” (f4.3).
- **Onde:** todos os slides, todas as fichas
- **Ação:** Frases curtas que caibam em uma linha; rodapé com fonte curta (uma linha) e lista completa no verso; nomes compostos sem quebra.

### T20 · Legibilidade, informação escondida e resíduos
- **Problema:** De 15 a 75 rótulos por slide entre 9,5 e 10,5 px (mínimo 11 px para notas); “Evolui de …” em mono minúsculo; o “por quê” de cada decisão só aparece em dica de mouse (raio-X, grafo); no “Antes e depois” a coluna do diagnóstico fica escondida atrás do divisor na posição padrão; resíduos: “H” (slide 20), selos “proposta DTS”/“Fonte:” em mono dentro dos cards, chip “fx NN · efeito” no rodapé, “HOJE · AS-IS / PROPOSTA · TO-BE”, controles de demonstração do Shimmer (“carregando em 2,6 s…”).
- **Onde:** todos os slides, todas as fichas
- **Ação:** Notas ≥ 11 px e corpo ≥ 13 px; razão principal visível no slide e completa no verso; tirar marcadores e controles de demonstração; “Hoje / Proposta”.

### T22 · “o DTS” × “a DTS”
- **Problema:** A V5 escreve “o DTS” cerca de 25 vezes no texto visível (“Para o DTS”, “Onde o DTS ganha”, “o DTS é a liderança…”, “do DTS”); a SPEC e os títulos da V6 usam “a DTS” (a área).
- **Onde:** s03, s04, s05, s10, s12, s14, s16, divisória 01, fichas 1.6, 3.5
- **Ação:** Padronizar “a DTS” em todo o texto novo.

### T21 · Itens da V6 que não existem na V5
- **Problema:** Sumário (slide 2), Jogos de entrada (slide 19), Time DTS com fotos (slide 3), barra “E daí?”, mascote AM, botão e conteúdo do verso, campo jogo nas fichas, painel 2 “Três caminhos” dentro do raio-X.
- **Onde:** V6
- **Ação:** Criar conforme SPEC; o “Sobre este slide” da V5 explica a interação, não o contexto: não serve de base para o verso.

## 3. Reconciliação das contagens (para os versos dos slides 7 e 8)

**Decisão por serviço (raio-X, 29 serviços)**

| Decisão | Nº | Serviços → destino |
|---|---|---|
| Manter | 4 | Interim CIO / CTO Leadership → 1.3; Project Remediation → 2.4; IT Synergies & Value Creation → 3.4; Complex Migrations Support → 4.4 |
| Aprimorar com IA | 13 | Tech Maturity & Value Assessment → 1.1; Digital Strategy & Roadmapping → 1.2; Operating Model Design & Tech Org Restructuring → 1.4; IT Resilience & Business Continuity Planning → 4.5 (muda de pilar); Tech Spend Optimization → 1.5; IT Sourcing (Software & Vendor) Selection → 2.1; ERP Readiness & Gap Analysis → 2.2; TMO → 2.3; Gestão de Mudanças Tech → 2.5; IT Due Diligence (Buy Side) → 3.1; Strategy Architecture → 4.1; Strategy Application → 4.2; Infrastructure Management → 4.3 |
| Fundir | 10 | C-Level Tech Enablement → 1.3; Embedded Tech Leadership → 1.3; Strategic Tech Tax / Accounting Planning → 1.6; Innovation Tax Incentives Advisory → 1.6; Modelo de Implantação e Governança → 2.3; IT Due Diligence (Sell Side) → 3.1; IT Integration & Separation Planning → 3.2; IT Separation Strategy & Design → 3.2; IT Integration Management Office → 3.3; IT Separation Management Office → 3.3 |
| Sair como produto isolado | 2 | IT Business Partner → absorvido pelo 1.3; IT M&A Playbook → vira ativo interno do 3.5 |

**Status por produto (24 produtos)**

| Status | Nº | Produtos |
|---|---|---|
| Manter | 5 | 1.3, 2.4, 3.3, 3.4, 4.4 |
| Aprimorar com IA | 15 | 1.1, 1.2, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.5, 3.1, 3.2, 4.1, 4.2, 4.3, 4.5 |
| Criar com IA | 4 | 1.7, 2.6, 3.5, 4.6 |
| ★ A&M Signature | 4 | 1.3, 1.5, 2.4, 3.1 |

- Por que 4 serviços “manter” viram 5 produtos “manter”: o 3.3 junta dois serviços (escritórios de integração e de separação) que seguem com a mesma essência.
- Por que 13 serviços “aprimorar” viram 15 produtos “aprimorar”: o 1.6 e o 3.2 nascem só de serviços “fundir” e recebem IA no método.
- Ponte em palavras: 14 serviços seguem um a um (inclui a resiliência, que muda para o pilar 4), 13 se fundem em 6 produtos, 2 deixam de ser vendidos sozinhos e 4 produtos nascem: 14 + 6 + 4 = 24.
- “13 em sobreposição” (V5, slide 2) conta os 13 serviços dos 6 grupos, incluindo o que ancora cada grupo; “12 se sobrepõem ou perdem sentido sozinhos” (SPEC, painel 1) conta fundir 10 + sair 2. Usar uma das duas e explicar a outra no verso.
- “Com IA no método”: 15 aprimorados + 4 criados = 19 produtos com IA no centro; os 5 mantidos usam IA de apoio. Escolher um termo (“IA no método”) e abandonar “IA no núcleo”.
- Por pilar (serviços → produtos): P1 10 → 7 (a resiliência sai para o P4; o IT Business Partner do P2 é absorvido pelo 1.3; nasce o 1.7); P2 7 → 6 (TMO + Modelo de Implantação → 2.3; IT Business Partner sai; nasce o 2.6); P3 8 → 5 (três pares viram 3.1, 3.2 e 3.3; o Playbook vira ativo do 3.5, que nasce); P4 4 → 6 (quatro renomeados, a resiliência chega do P1 como 4.5, nasce o 4.6).

## 4. Slides da V5 (1–20)

### Slide 1 · Capa (V5 `01-capa`) → V6 slide 1 · 01-capa

- **Título na V5:** Planejamento Estratégico · Produtos, Serviços e Inteligência Artificial
- **Fonte do conteúdo:** `src/slides/01-capa.html (+ slides.js: Particle System)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_01.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_01.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| Outubro de 2026 | linha do topo (“PLANEJAMENTO ESTRATÉGICO · DTS · OUTUBRO DE 2026”) | estrutural | data do documento |  | manter | Levar para a linha de data da capa APODI (“Outubro de 2026”). |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Densidade · Cursor · Pulso (controles) | barra de controles do Particle System | Manter só repelir e atrair (pedido do usuário); densidade e pulso são controles de demonstração. |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| O portfólio DTS revisto à luz do mercado brasileiro e do que as principais consultorias já fazem com IA: o que manter, o que aprimorar com IA e o que criar. | Tirar da capa (a V6 tem título, subtítulo, linha da área e data). Se ficar uma frase, usar a pergunta do sumário: “Como vender o que o cliente passou a comprar?”. |
| O QUE TEMOS — O QUE O MERCADO VIVE — NOSSA POSIÇÃO — O QUE MELHORAR — NOVOS PRODUTOS | Levar para o Sumário com as 5 partes da V6: O ponto de partida · O que o mercado vive · Nossa posição · O novo portfólio · Como fazer acontecer. |
| Use as setas ou o espaço para avançar · I explica cada slide · P abre as fichas de produto | “→ avança · V vira a página · P abre as fichas” (o “I” deixa de existir; o contexto vai para o verso). |

**Lógica e storytelling**

- Os cinco “momentos” da capa não coincidem com as cinco partes da V6 (“O que melhorar” e “Novos produtos” viram “O novo portfólio” e “Como fazer acontecer”). → **Capa só com título, subtítulo, área, data e mascote (aceno); a trilha das partes vai para o Sumário.**
- A capa não diz a regra da casa (todo número tem fonte; o que é proposta nossa aparece em palavras). → **Fala do mascote (“Em cada página, vire para ver de onde vêm os dados.”) e a regra no verso do slide 1.**

**Quebras e cortes**

- “…o que manter, o que aprimorar com IA / e o que criar.” — *viúva (linha curta forçada com 4 palavras)* (parágrafo da capa)
- Medição automática (todos os estados) — quebras curtas: 0 · viúvas: 0 · palavras partidas: 0 · rótulos abaixo de 11 px: 0.

**Falta para a V6**

- Mascote AM (aceno) e fala.
- Logos A&M e DTS embaixo à esquerda (modelo APODI).
- Verso: o que é o documento, para quem e a regra da casa.

### Slide 2 · DTS hoje (V5 `02-dts-hoje`) → V6 slide 3 · 03-dts-hoje

- **Título na V5:** Um portfólio para todo desafio de tecnologia.
- **Fonte do conteúdo:** `src/slides/02-dts-hoje.html (+ slides.js: Shimmer)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_02.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_02.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 4 pilares | KPI do painel | estrutural | Portfólio oficial DTS |  | manter |  |
| 29 serviços | KPI e pergunta | estrutural | Portfólio oficial DTS |  | manter |  |
| 10 · 7 · 8 · 4 | barras por pilar | estrutural | Portfólio oficial DTS |  | manter |  |
| 0 com IA no método · “nenhum com IA no método” | KPI e nota do painel | estrutural | Leitura das 29 descrições do portfólio oficial (nenhuma cita IA no método) |  | manter e citar no verso | Dizer no verso como foi contado: “nenhuma das 29 descrições oficiais menciona IA no método”. |
| 13 em sobreposição · 5 de 10 em 2 grupos · 2 de 7 em 1 grupo · 6 de 8 em 3 pares · nenhuma | nota do painel e cartões por pilar | estrutural | Análise DTS do portfólio (mesma base do raio-X) |  | mover para o slide 4 da V6 (spotlight “Onde há sobreposição”) | Não fecha com o raio-X (fundir 10) nem com a SPEC (12): se “13” ficar, dizer “13 serviços em 6 grupos com o mesmo comprador ou o mesmo método, contando o serviço que ancora cada grupo”. |
| 3 dos 4 nomes não dizem o que entregam | cartão do pilar 4 | estrutural | Leitura nossa dos nomes Strategy Architecture, Strategy Application e Infrastructure Management |  | trocar por palavras | Citar os três nomes no slide 4 da V6 (é verificável por leitura). |
| Ano-base 2026 | chip do painel | estrutural | Data do portfólio oficial |  | manter |  |
| “pronto para 2027?” | pergunta do slide | estrutural | Janela de 2027 (Reforma Tributária e SAP ECC) |  | mover para o Sumário / barra “E daí?” |  |
| “carregando em 2,6 s…” / “conteúdo real · 1,0 s” | controles do Shimmer | sem base | Texto de demonstração do efeito |  | remover | Tirar da frente os controles “Carregar dados · Reflexo do selo · Periódico / Só no hover”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TMO | cartão do pilar 2 | escritório de transformação (o nome oficial do serviço fica: “TMO — escritório de transformação”) |
| DD | cartão do pilar 3 | diligência de compra e de venda |
| IMO e SMO | cartão do pilar 3 | escritório de integração e escritório de separação |
| fx 31 · Shimmer / Holographic Sweep | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Um portfólio para todo desafio de tecnologia. | TC V6: “A DTS cobre o ciclo inteiro da tecnologia: 4 pilares e 29 serviços”. |
| O que fazemos: Diagnóstico, estratégia, liderança, execução de transformações, M&A de tecnologia e modernização. | Trocar por “quando nos contratam”, um por pilar: “o CIO saiu ou o custo de TI pesa” · “um programa crítico atrasou” · “há compra, venda ou separação com data” · “o legado ficou caro ou arriscado”. |
| Para quem: CEOs, CFOs, CIOs e conselhos; fundos de private equity e empresas em transformação, transação ou crise. | “Quem nos chama: CEO, CFO, CIO, conselhos e fundos de private equity, em transformação, transação ou crise.” (uma linha) |
| O que decidimos: Quais serviços manter, aprimorar com IA, fundir ou retirar, e quais produtos criar. | Barra “E daí?”: “Nenhum dos 29 serviços descreve IA no método — e é isso que o cliente passou a comprar.” |
| Planejamento Estratégico de Portfólio · Produtos · Serviços · Inteligência Artificial (selo) | Selo só com o escudo DTS e “Digital & Technology Services”; o resto repete a capa. |

**Lógica e storytelling**

- A pergunta do slide (“como passar de 29 serviços sob medida a um portfólio de produtos com IA?”) entrega a resposta antes da evidência de mercado (Parte 2) e do raio-X (Parte 3). → **Tensão na barra “E daí?” (sem IA no método); a pergunta vai para o Sumário: “como vender o que o cliente passou a comprar?”.**
- “29 serviços sob medida” é leitura nossa, sem prova no slide. → **Explicar no verso: o portfólio oficial não define escopo fechado, prazo nem formato padrão por serviço.**
- A cadeia de valor aqui tem 5 práticas e no slide 3 tem 10 áreas: listas diferentes para a mesma ideia. → **Uma única lista, do portfólio oficial, só no slide 3 da V6 (“onde a DTS se conecta”).**
- A sobreposição detalhada antecipa o raio-X e usa siglas (DD, IMO, SMO, TMO). → **Levar para o spotlight do slide 4 da V6 (“Onde há sobreposição”), em português.**

**Quebras e cortes**

- “…a um portfólio de produtos com IA, / pronto para 2027?” — *viúva (linha forçada); pergunta em 4 linhas* (coluna esquerda)
- “…transformação, transação ou / crise.” — *viúva* (Para quem)
- “…integração e separação, IMO e / SMO” — *viúva* (cartão do pilar 3)
- “nenhuma; 3 dos 4 nomes não dizem o que / entregam” — *viúva* (cartão do pilar 4)
- Chip “Tech & Digital (DTS)” — *quebra (chip cai para a 2ª linha)* (cadeia de valor)
- O QUE FAZEMOS · PARA QUEM · O QUE DECIDIMOS · CADEIA DE VALOR · Ano-base 2026 (18 rótulos) — *fonte pequena (10–10,5 px)*
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 3 · palavras partidas: 0 · rótulos abaixo de 11 px: 18; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Time DTS: fotos de src/assets/equipe-web/ com nome, sem cargo e sem contagem.
- “Quando nos contratam” por pilar.
- Barra “E daí?”.
- Verso: o que o portfólio oficial diz e como contamos.

### Slide 3 · Portfólio atual (V5 `03-portfolio-atual`) → V6 slide 4 · 04-portfolio-atual

- **Título na V5:** Hoje: 29 serviços em 4 pilares.
- **Fonte do conteúdo:** `src/slides/03-portfolio-atual.html (+ slides.js; dados PILLARS e OLD em src/data/00-base.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_03.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03_spot1.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03_spot2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03_spot3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03_spot4.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_03_spot5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 4 pilares · 29 serviços | título e rótulo | estrutural | Portfólio oficial DTS |  | manter |  |
| 10 · 7 · 8 · 4 serviços | contadores por pilar | estrutural | Portfólio oficial DTS |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TMO | lista do pilar 2 | “TMO (escritório de transformação)” na 1ª menção |
| CSC | chip “Administrativo & CSC” | “Administrativo e serviços compartilhados” |
| C-Level | serviço “C-Level Tech Enablement” | o nome oficial fica; no texto, “alta liderança” |
| AS-IS | texto “Sobre este slide” | “como está hoje” |
| fx 24 · Spotlight / Focus | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Hoje: 29 serviços em 4 pilares. | TC V6: “Cada pilar entra num momento diferente da vida do cliente”. |
| P1: “Apoiamos líderes na tomada de decisões estratégicas por meio de soluções de TI que integram diagnóstico, transformação e governança, acelerando resultados, mitigando riscos e gerando valor.” | Quando nos chamam: o CIO saiu, o custo de TI pesa ou o conselho cobra direção para IA. O que entregamos: diagnóstico, estratégia, liderança interina, modelo operacional e corte de custo. Onde somos fortes: liderança interina e custo. Sobreposição: três ofertas de liderança e dois serviços fiscais. |
| P2: “Apoiamos na execução de projetos estratégicos complexos, garantindo implementações bem-sucedidas e alinhamento entre tecnologia e objetivos de negócio.” | Quando nos chamam: um programa crítico (ERP, Reforma Tributária, troca de fornecedor) atrasou ou vai começar. O que entregamos: escolha de fornecedor, prontidão de ERP, escritório de transformação, mudança e resgate. Onde somos fortes: resgate de projetos. Sobreposição: escritório de transformação e modelo de implantação têm o mesmo comprador e o mesmo método. |
| P3: “Oferecemos suporte estratégico e especializado em todo o ciclo de M&A, com foco em tecnologia, garantindo excelência na execução e aproveitamento de sinergias para maximizar o valor da transação.” | Quando nos chamam: há compra, venda ou separação com data marcada. O que entregamos: diligência, planejamento e escritório de integração ou separação, sinergias. Onde somos fortes: separações e trabalho com fundos. Sobreposição: três pares que são o mesmo método em direções opostas (compra e venda, integração e separação). |
| P4: “Entregamos soluções em arquitetura de TI e governança, modernizando sistemas e infraestruturas para garantir alinhamento estratégico e sustentabilidade a longo prazo.” | Quando nos chamam: o legado ficou caro ou arriscado, a licença de virtualização subiu ou a migração não pode falhar. O que entregamos: arquitetura, racionalização de aplicações, infraestrutura e apoio a migrações. Onde somos fortes: migrações complexas. Nomes: três dos quatro descrevem a área, não a entrega. |
| Quando nos contratam (4 textos): “Empresas que enfrentam desafios…”, “…com alto risco e impacto para o negócio”, “…otimizando custos e aumentando a eficiência operacional” | Gatilho concreto por pilar (ver as reescritas acima), em uma linha. |
| Cadeia de valor: “Na frente Tech & Digital da cadeia de valor da A&M, ao lado das demais áreas funcionais.” / “Apoia as práticas de Transformação, Turnaround, Estratégia & M&A e Data & IA com a dimensão de tecnologia.” | “Onde nos conectamos: em turnaround, a DTS cuida da TI; em M&A, separa e integra sistemas; em transformação, responde pelo programa de tecnologia.” (confirmar com os sócios) |

**Lógica e storytelling**

- O spotlight repete o texto oficial que já está no cartão: não acrescenta informação. → **Spotlight por assunto, como pede a SPEC: Quando o cliente nos chama · O que entregamos · Onde somos fortes · Onde há sobreposição.**
- Falta o “E daí?”: a oferta fala a língua de serviços, não de resultados. → **Sub V6: “Decidir, executar, transacionar e modernizar: a oferta existe, mas fala a língua de serviços, não de resultados”.**
- Pilar 4 com quatro cartões altos e muito espaço vazio, ao lado de pilares com 8 a 10 itens. → **Cartões de altura fixa; o espaço do P4 recebe o texto “três nomes descrevem a área, não a entrega”.**

**Quebras e cortes**

- Definição do P1 em 4 linhas com “valor.” sozinho — *viúva* (cartão P1)
- “bem- / sucedidas” — *palavra partida* (definição do P2)
- “Pilar 3 · Technology M&A Advisory & Transformation” e “Pilar 4 · Technological Modernization & Digital Evolution” — *quebra (título do spotlight em 2 linhas)* (legenda do spotlight)
- “…impacto para o / negócio.” · “…com a dimensão de / tecnologia.” · “…eficiência / operacional.” — *viúva* (spotlight e “Quando nos contratam”)
- 17 rótulos (PILAR N, contadores, QUANDO NOS CONTRATAM, dica do spotlight) — *fonte pequena (9,5–10,5 px)*
- Medição automática (todos os estados) — quebras curtas: 2 · viúvas: 5 · palavras partidas: 1 · rótulos abaixo de 11 px: 31; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Mascote pequeno (lanterna), opcional.
- Verso: leitura de cada pilar e da sobreposição (fato estrutural).

### Slide 4 · Forças de mercado (V5 `04-forcas`) → V6 slide 5 · 05-forcas

- **Título na V5:** Cada força vira uma exigência do cliente.
- **Fonte do conteúdo:** `src/slides/04-forcas.html (+ src/js/10-forcas.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_04.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f1.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f4.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f5.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_04_f6.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 56% dos CEOs ainda sem retorno financeiro com IA | força 01 (nó e painel) | fato com fonte | PwC, 29ª CEO Survey (jan/2026), pesquisa global; lida via fonte secundária | a verificar | manter e citar no verso | Registro: ceo-sem-retorno-ia-56. Dizer “no mundo”. |
| “Quase todas as grandes empresas usam IA” | força 01 · O que mudou | fato com fonte | ABES/IDC (mar/2026): 95% das grandes organizações pesquisadas | divergente | corrigir redação | O usuário não quer % de uso de IA: “Usar IA virou regra; provar resultado no caixa, não.” |
| 01/01/27 · CBS plena | força 02 | fato com fonte | Lei Complementar 214/2025 | verificado | manter | Escrever 01/01/2027 e explicar a CBS na 1ª menção. |
| manutenção padrão do SAP ECC termina em 2027 | força 02 | fato com fonte | SAP (anúncio de 04/02/2020) via Baguete | verificado | manter | Explicar o ECC (“a versão antiga do ERP da SAP”) e dizer “extensível a 2030”. |
| 50% das transações de 2025 com fundos de PE ou VC | força 03 | fato com fonte | KPMG, Pesquisa de Fusões e Aquisições 2025 (mar/2026) | verificado | corrigir redação | Usuário pediu para tirar este card na rodada anterior. Se ficar: “fundos de private equity e venture capital participaram de metade das transações de 2025”, sem destaque. |
| “Menos transações, tickets maiores … tecnologia é o setor mais negociado” | força 03 · O que mudou | fato com fonte | KPMG 1º semestre de 2026: 610 transações (−35%), R$ 195 bi (+22,3%), TI 1º setor (274) | verificado | manter e citar no verso | “tickets” → “valor maior por transação”. |
| 8–15× alta de licenças VMware após a compra pela Broadcom | força 04 | fato com fonte | Baguete (data aproximada, “até 15x”) | fraco | verificar antes de usar | Não pode ser número de destaque enquanto for fraco; no verso: “relatos de aumento de até 15 vezes (imprensa)”. |
| TI +5,3% em 2026 | força 04 · fonte | fato com fonte | ABES/IDC (mar/2026) | verificado | manter e citar no verso |  |
| ~R$ 800 mi desviados no ataque à C&M Software (jul/2025) | força 05 | fato com fonte | Finsiders / Jornal Opção (imprensa) | a verificar | manter e citar no verso |  |
| Res. CMN 5.274/2025 | força 05 · fonte | fato com fonte | Resolução do Conselho Monetário Nacional de 18/12/2025 | verificado | manter | Escrever “Resolução 5.274 do Conselho Monetário Nacional”. |
| 53% das empresas sem o talento necessário para IA | força 06 | fato com fonte | KPMG Global Tech Report 2025/26 (pesquisa global) | a verificar | corrigir redação | Dizer “no mundo” (não é dado do Brasil). |
| FORÇA 01 DE 06 · ligações força → exigência (02 03 / 01 03 04 / 04 05 / 01 02 05 06) | painel e coluna do meio | estrutural | Nossa leitura (as ligações são proposta) |  | mover para o verso | Explicar no verso que a ligação força → exigência é leitura nossa. |
| 2025–2026 | rótulo “Seis forças · 2025–2026” | estrutural | período das forças |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| SAP ECC | força 02 | “a versão antiga do ERP da SAP (ECC)” na 1ª menção |
| CBS | força 02 | “novo tributo federal sobre consumo (CBS)” na 1ª menção |
| PE ou VC | força 03 | fundos de private equity e de venture capital |
| Deals · tickets | força 03 | transações · valor por transação |
| EBITDA | força 03 · Para o DTS | resultado operacional (EBITDA) |
| PMO | barra Leitura DTS | escritório de projetos |
| LC 214/2025 · Res. CMN 5.274/2025 | fontes | Lei Complementar 214/2025 · Resolução 5.274 do Conselho Monetário Nacional |
| P&L (dica do 1.7) | dica de produto | resultado |
| fx 39 · Node Network Motion | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Cada força vira uma exigência do cliente. | TC V6: “Seis forças mudaram a pergunta do cliente: ele quer resultado comprovado, não horas”. |
| Para o DTS: Vender valor medido e governança de IA, não estratégia genérica. | Por que pesa para a DTS: “diagnóstico de maturidade e estratégia digital, dois serviços nossos, são os mais expostos à IA” (leitura nossa, a explicar no verso). |
| Para o DTS: Produtos com prazo e preço fixos: prontidão e resgate de projetos. | O que o cliente passa a exigir: “saber quando fica pronto e quanto custa”. (Sem nome de produto.) |
| Para o DTS: Diligência rápida, Dia 1 garantido e sinergias que viram EBITDA. | “O fundo cobra a diligência em semanas e quer a tecnologia funcionando no primeiro dia depois do fechamento.” (sem “garantido”) |
| Para o DTS: Otimização de gastos com economia certificada e radar contínuo. | “O CFO quer cortar o que não se paga e saber, todo mês, se o custo voltou.” (sem “certificada”) |
| Para o DTS: Liderança interina e modelo operacional para a era dos agentes. | “Na troca de controle ou na saída do CIO, alguém precisa assumir a TI no dia seguinte.” |
| Leitura DTS: As seis forças premiam ofertas com prazo, preço e resultado definidos… Perdem força a estratégia digital genérica, o PMO sem dono e a alocação de perfis. | E daí: “Quem vende hora perde para quem vende resultado com prazo e preço conhecidos.” Leitura nossa (verso): a DTS já trabalha assim em resgate de projetos e liderança interina, mas não empacota. |

**Lógica e storytelling**

- “Quem responde” lista 12 produtos (1.7, 1.1, 2.2, 2.4, 3.1, 3.2, 3.4, 1.5, 4.3, 4.5, 1.3, 1.4) antes de o portfólio ser apresentado (slides 8–9). → **Tirar os produtos (SPEC: a resposta vem na Parte 4). Cada força: O que mudou (fato com fonte) · O que o cliente passa a exigir · Por que pesa para a DTS.**
- “Deals liderados por private equity” exagera o fato (participação de fundos em 50% das transações, não liderança). → **Título da força: “Fundos em metade das transações”.**
- Força 06 junta escassez de talento (pesquisa global) e demanda por liderança em transações (sem fonte). → **Separar o fato com fonte da leitura nossa; a leitura vai para o verso.**
- A coluna “O cliente passa a exigir” tem selo “proposta DTS” em mono: é marcador interno. → **Explicar no verso que as ligações são leitura nossa; tirar o selo.**

**Quebras e cortes**

- “…tecnologia é o setor mais / negociado.” — *viúva* (painel · força 03)
- “Resiliência, recuperação e avaliação de risco de / terceiros.” — *viúva* (painel · força 05)
- “…pedem liderança / imediata.” — *viúva* (painel · força 06)
- “CBS plena; manutenção padrão do SAP ECC termina em 2027” — *quebra (2 linhas)* (painel · força 02)
- Barra Leitura DTS com “alocação de perfis.” na 2ª linha — *viúva* (rodapé do corpo)
- Rodapé de fontes em 2 linhas — *quebra* (rodapé)
- Rótulos FORÇA 01 DE 06 · O QUE MUDOU · PARA O DTS · Fonte (17 rótulos) — *fonte pequena (10–10,5 px)*
- Medição automática (todos os estados) — quebras curtas: 8 · viúvas: 3 · palavras partidas: 0 · rótulos abaixo de 11 px: 47; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Campos por força: O que mudou · O que o cliente passa a exigir · Por que pesa para a DTS.
- Verso: raciocínio das seis forças e de onde vem cada fato.

### Slide 5 · Benchmark · IA nas consultorias (V5 `05-benchmark`) → V6 slide 6 · 06-benchmark

- **Título na V5:** A IA virou plataforma, produto e preço.
- **Fonte do conteúdo:** `src/slides/05-benchmark.html (+ slides.js; TL_2026 em src/data/20-timelines.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_05.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_05.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_05_m3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_05_m7.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| cerca de 25% dos honorários da McKinsey já são por resultado | O que mudou · sinal 2 · marco Jan 2026 | fato com fonte | Business Insider / Yahoo Finance (nov/2025) | verificado | corrigir redação | Dado de nov/2025: não colocar no marco de jan/2026 (V6 é só 2026); usar no texto de contexto. |
| 25 mil agentes ao lado de ~40 mil pessoas | marco Jan 2026 | fato com fonte | Business Insider / HBR IdeaCast (jan/2026), declaração do CEO | verificado | manter e citar no verso |  |
| Fev 2026 · OpenAI reúne McKinsey, BCG, Accenture e Capgemini | marco | fato com fonte | Fortune (23/02/2026) | verificado | manter |  |
| Global AI Board (mai/2026) · 50% da receita ligada a IA até 2028 · até 200 contratações | card A&M e marco Mai 2026 | fato com fonte | A&M (05/05/2026) e Bloomberg (04/05/2026) | verificado | manter e citar no verso | O 50% e as 200 contratações são da Bloomberg: “segundo a Bloomberg”. |
| Jun 2026 · PwC única firma da ToltIQ | marco | fato com fonte | PwC US (jun/2026) | verificado | manter |  |
| Jul 2026 · Ode with Anthropic; Bain replica o software do alvo | marco | fato com fonte | BusinessWire e Financial Times via The Decoder (jul/2026) | verificado | manter |  |
| Ago 2026 · AlixPartners compra a Artium (mais de 80 pessoas) | marco e sinal 4 | fato com fonte | AlixPartners (04/08/2026) | verificado | manter |  |
| Set 2026 · Falconi R$ 100 mi em IA; 80% dos projetos com agentes | marco e sinal 4 | fato com fonte | Jornal do Comércio (set/2026) | verificado | manter |  |
| DD com agentes por ~US$ 50 mil | sinal 3 | fato com fonte | TechCrunch (05/03/2026), preço anunciado pela startup DiligenceSquared | a verificar | manter e citar no verso | Dizer que é preço anunciado pela empresa. |
| Plataformas Zora AI, agent OS, EY.ai, Workbench, Lilli | O que mudou · sinal 1 | fato com fonte | Lançamentos de 2023 a 2025 (EY.ai em 2023; Zora AI e agent OS em mar/2025; Workbench em jun/2025) | verificado | corrigir redação | São anteriores a 2026: tratar como contexto (“desde 2023”), não como evento de 2026. |
| Sinal 1 de 4 … 4 de 4 | cards | estrutural |  |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Big Four | O que mudou | “as quatro grandes (Deloitte, PwC, EY e KPMG)” na 1ª menção |
| DD | sinal 3 | diligência |
| PE | título do sinal 3 | fundos de private equity |
| TSA | sinal 3 | contrato de serviços de transição |
| signing | sinal 3 | assinatura do contrato de compra |
| AI-native | marco Set 2026 | nativas em IA |
| fx 38 · Timeline Motion | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| A IA virou plataforma, produto e preço. | TC V6: “Em 2026, as grandes consultorias transformaram IA em plataforma, produto e preço”. |
| → A A&M não precisa competir em plataforma: pode ser neutra e orquestradora. | Para nós: “disputar plataforma com quem investe bilhões não é o nosso jogo; o espaço é escolher e combinar ferramentas sem vender licença”. |
| → O DNA de honorário por resultado da A&M vira vantagem. | Para nós: “preço por resultado exige método repetível e medição; sem produto, a DTS não consegue cobrar assim”. |
| → O valor migra para o que vem depois do signing: Dia 1, TSA e sinergias. | Para nós: “a diligência fica barata; o valor está no que vem depois da assinatura — o primeiro dia, a separação dos sistemas e as sinergias”. |
| → Para a A&M: produtizar o DNA de operador com IA, antes dos pares. | Para nós: “o par mais parecido com a A&M comprou capacidade de IA pronta; quem esperar vai competir com produto já testado”. |
| Para o DTS, é o mandato para levar produtos com IA ao Brasil, reaproveitando os ativos globais. | “A A&M global criou um conselho de IA e, segundo a Bloomberg, quer metade da receita de trabalho com IA até 2028. Hoje a DTS Brasil não tem produto que conte para essa meta.” |

**Lógica e storytelling**

- “Mandato” é inferência (a pesquisa marca como hipótese); o slide escreve como fato. → **Fato com fonte na frente; a leitura (“o que isso pede da DTS”) no verso.**
- “DNA de honorário por resultado da A&M” não é provado em nenhum slide. → **Tirar ou provar com dado interno no verso.**
- Marcos com dados de 2025 (plataformas de mar–jun/2025; honorários de nov/2025) num slide “só 2026”. → **Linha do tempo só com eventos de 2026; os de 2025 viram contexto escrito.**
- Área vazia grande ao redor do card da linha do tempo (direita e acima). → **Na V6, texto de contexto ocupa o espaço; card com largura fixa.**

**Quebras e cortes**

- “→ O DNA de honorário por resultado da A&M vira / vantagem.” — *viúva* (sinal 2)
- “→ Para a A&M: produtizar o DNA de operador com IA, antes dos pares.” — *quebra (2 linhas)* (sinal 4)
- Rodapé de fontes em 2 linhas — *quebra* (rodapé)
- Rótulos O QUE MUDOU · COMO PASSARAM A COBRAR · datas e fontes do card (12 rótulos) — *fonte pequena (10–10,5 px)*
- Medição automática (todos os estados) — quebras curtas: 2 · viúvas: 1 · palavras partidas: 0 · rótulos abaixo de 11 px: 26; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Texto de contexto e “o que isso significa para nós” por sinal, sem nomes de produto DTS.
- Verso: primária × imprensa por fato.

### Slide 6 · Raio-X do portfólio atual (V5 `06-raio-x`) → V6 slide 7 · 07-raio-x (painel 1)

- **Título na V5:** Onde a A&M tem direito de vencer.
- **Fonte do conteúdo:** `src/slides/06-raio-x.html (+ slides.js; OLD e NEWPOS em src/data/00-base.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_06.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_06.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_06_p1.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| Escala 2–5 nos eixos; posições x,y de 1 a 5 com decimais para os 29 serviços (ex.: Interim CIO 3,6 × 4,7) | matriz | desenho nosso | Julgamento qualitativo DTS (o próprio slide diz: a calibrar com os sócios) |  | remover | Quadro qualitativo sem números (SPEC §2, slide 7). |
| Bolhas 1.7 · 2.6 · 3.5 · 4.6 (“posição pretendida”) | matriz | desenho nosso | Proposta nossa |  | remover | Produtos novos não entram no raio-X dos serviços. |
| Decisões por serviço: manter 4 · aprimorar 13 · fundir 10 · retirar 2 | lista à direita (implícito) | estrutural | Avaliação DTS |  | manter | TC V6 usa as contagens; trocar “retirar” por “sair como produto isolado”. |
| Códigos A1–A10, B1–B7, C1–C8, D1–D4 | bolhas e lista | estrutural | Código interno da análise |  | remover | Usar nome do serviço e cor do pilar; código interno não diz nada ao leitor. |
| → 1.1 … → 4.4 (destino) | lista à direita e dicas | estrutural | Códigos de produto |  | mover para o verso | SPEC permite “Vai para” na dica; na lista visível, só a decisão. |
| Brasil 2026–27 | eixo e definição | desenho nosso | Critério nosso de atratividade |  | trocar por palavras | “demanda prevista para 2026 e 2027” no verso. |
| Dica A8: “TI crescendo só 5,3% em 2026” | dica | fato com fonte | ABES/IDC (mar/2026) | verificado | manter |  |
| Dica A10: “Lei do Bem: 4,2 mil empresas, corte de 10% pela LC 224” | dica | fato com fonte | MCTI via Convergência Digital; LC 224/2025 | a verificar | manter e citar no verso | Ano-base 2024; verificar dado mais novo. |
| Dica C2: “PE em 50% dos deals” | dica | fato com fonte | KPMG (mar/2026) | divergente | corrigir redação | “fundos participaram de metade das transações de 2025”. |
| Dica B2: “CBS 2027” e “fim da manutenção padrão do SAP ECC em 2027” | dica | fato com fonte | LC 214/2025; SAP via Baguete | verificado | manter |  |
| Dica A7: “CMN 5.274, ataques C&M/Sinqia” | dica | fato com fonte | CMN; imprensa | verificado | manter |  |
| Dica C8: “plano de 100 dias” | dica | desenho nosso | Termo de mercado (oferta documentada da A&M global) |  | manter | Como nome de método, não como prazo. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TMO | serviço B3 | escritório de transformação |
| PMO, accountability | dica B3 (“PMO sem accountability se comoditiza”) | “escritório de projetos sem dono do resultado vira commodity” |
| RFP | dica B1 | concorrência |
| DD, IMO/SMO, TSA, sell-side, vendor readiness | dicas C2–C7 | diligência, escritórios de integração e de separação, contrato de serviços de transição, lado vendedor, preparação do vendedor |
| PE · interim | eixo “Direito de vencer” e rodapé | fundos de private equity · liderança interina |
| GPU | dica D3 | processadores para IA |
| CMN · LC 224 · CBS · ECC | dicas | por extenso na 1ª menção |
| Copilots | dica B4 | assistentes de IA |
| Board & C-Level AI Fluency | dica A2 | programa de IA para conselho e diretoria |
| fx 35 · Interactive Matrix | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Onde a A&M tem direito de vencer. | TC V6: “No raio-X, 4 serviços seguem fortes, 13 pedem IA no método e 12 se sobrepõem ou perdem sentido sozinhos”. |
| Dica A5: “Mercado saturado (estratégia, Big Four, integradores).” | “Estratégia de IA é oferecida por McKinsey, BCG, Deloitte e EY.” Leitura nossa (verso): falta ao cliente ligar o plano a caixa e execução. |
| Dica A9: “Nicho; mais forte combinado a incentivos” | “Pouca demanda sozinho; junto com a Lei do Bem vira um só produto fiscal de tecnologia.” |
| Dica A2: “Pouco tangível isolado” | “Sozinho, o cliente não vê entrega; vira módulo da liderança interina.” |
| Dica D3: “Soa como serviço gerenciado (onde integradores dominam)” | “O nome sugere operar a infraestrutura, mercado dos integradores; o produto passa a decidir e reduzir custo.” |

**Lógica e storytelling**

- Escores com decimais sugerem uma precisão que não existe (julgamento qualitativo). → **Quadro qualitativo, com critérios escritos no verso (demanda 2026–27 e direito de vencer) e “a calibrar com os sócios”.**
- “Retirar” contradiz “absorvido” (IT Business Partner vai para o 1.3; IT M&A Playbook vira ativo do 3.5). → **“Sair como produto isolado” (V6).**
- O motivo de cada decisão só aparece na dica do mouse; a lista visível mostra só a decisão. → **Dica por assunto (Demanda · Direito de vencer · Decisão · Vai para) e os motivos principais no verso.**
- O “direito de vencer” não tem prova no slide. → **No verso: fatos que sustentam (liderança interina não encontrada nas quatro grandes; tradição em turnaround e separações).**
- Filtro por pilar apaga os demais a 12% (ok, pedido do usuário) mas a lista apaga só a 30%. → **Mesmo nível de apagamento nos dois (spotlight).**

**Quebras e cortes**

- Rodapé de fontes em 2 linhas — *quebra* (rodapé)
- 75 rótulos em mono (códigos, quadrantes, eixos, decisões) — *fonte pequena (10–10,5 px)* (matriz e lista)
- Medição automática (todos os estados) — quebras curtas: 0 · viúvas: 0 · palavras partidas: 0 · rótulos abaixo de 11 px: 75; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Mascote pequeno (lupa).
- Painel 2 “Três caminhos” no mesmo slide.
- Verso: critérios, por que é leitura nossa, fatos de demanda e direito de vencer.

### Slide 7 · Três caminhos estratégicos (V5 `07-caminhos`) → V6 slide 7 · 07-raio-x (painel 2)

- **Título na V5:** Redesenhar o portfólio como produtos.
- **Fonte do conteúdo:** `src/slides/07-caminhos.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_07.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_07.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| Réguas Investimento / Diferenciação / Recorrência (1·1·0 · 3·4·2 · 5·5·5) | três cards | desenho nosso | Proposta nossa |  | remover | Prós e contras em palavras (SPEC). |
| Tempo até impacto: ~3 meses · 6–9 meses · 18–24 meses | três cards | desenho nosso | Proposta nossa |  | remover |  |
| 29 serviços · 29 → 24 · 13 em 6 · 4 Signature · 4 novos com IA | card transformacional | estrutural | Portfólio proposto |  | manter |  |
| IA no método de 19 produtos | card transformacional | estrutural | 15 aprimorados + 4 criados |  | corrigir redação | Mesma regra de vocabulário do deck inteiro (T13). |
| Cerca de 25% dos honorários globais da McKinsey já são por resultado | evidência do card incremental | fato com fonte | Business Insider / Yahoo Finance (nov/2025) | verificado | mover para o verso | Está sob “Incremental” mas argumenta contra ele: usar como razão para não ficar no incremental. |
| US$ 1,5 tri até 2035 (services-as-software) | evidência do card disruptivo | fato com fonte | HFS Research (fev/2026), projeção global de analista | verificado | mover para o verso | Dizer “projeção”. |
| Gartner: preço puramente por resultado transfere risco | ressalva do card transformacional e rodapé | sem base | Resumo de busca não verificado (a própria nota diz) | fraco | remover |  |
| duas apostas · 3 camadas | recomendação e arquitetura comercial | estrutural | Contagens do nosso desenho |  | trocar por palavras | “duas apostas novas”; camadas sem preço e sem prazo. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| SaaS | card disruptivo | software por assinatura |
| Services-as-software | card disruptivo | serviço vendido como software, por assinatura |
| Signature | card transformacional | explicar: “onde o direito de vencer é maior” |
| sprint · execução com êxito | receita do card transformacional | diagnóstico curto · execução com honorário de êxito |
| PE (“por empresa, agente ou fundo”) | card disruptivo | fundo de private equity |
| fx 05 · Hover Elevation | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Redesenhar o portfólio como produtos. | TC V6: “Colocar IA nos serviços de hoje não basta: o caminho é transformar serviços em produtos”. |
| Incremental: “Rápido e barato” | “Muda pouco: mantém os 29 nomes e as sobreposições; a IA só reduz horas internas.” |
| Disruptivo: “Receita recorrente e escalável” | “Receita por assinatura, mas exige engenharia, dados e parcerias que a DTS ainda não tem.” |
| Transformacional: “Plataforma DTS compartilhada” | “Uma base comum (dados, modelos de IA e guias) que todos os produtos usam — a construir.” |
| “A A&M tem DNA de honorário por resultado.” | Remover ou provar; se ficar, como leitura nossa no verso. |

**Lógica e storytelling**

- Cita 3.5 PE Tech Value Radar e 1.7 AI Value & Governance Office antes do portfólio. → **“Incubar duas apostas novas” sem nome; os nomes aparecem nos slides 8–9.**
- A recomendação não se apoia no raio-X (são slides separados). → **V6 junta raio-X e caminhos no slide 7: “o raio-X mostra 12 serviços que se sobrepõem ou perdem sentido; só a transformação resolve isso”.**
- A ressalva de risco usa fonte não verificada. → **Tirar; se o risco importa, explicar com palavras nossas no verso.**

**Quebras e cortes**

- Lead em 3 linhas com “plataforma.” sozinho — *viúva* (topo à direita)
- “Cerca de 25% dos honorários globais da McKinsey já são por / resultado.” — *viúva* (card incremental)
- Parágrafo “proposta DTS” com “resultado.” na última linha — *viúva* (card transformacional)
- Cards laterais começam 40–60 px abaixo do central (vazio no topo dos cards laterais) — *área vazia* (corpo)
- Rodapé de fontes em 2 linhas — *quebra* (rodapé)
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 2 · palavras partidas: 0 · rótulos abaixo de 11 px: 19; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Ligação explícita com o raio-X (mesmo slide, painel 2).
- Verso: por que transformacional, o que fica para validar.

### Slide 8 · De serviços a produtos (V5 `08-servicos-a-produtos`) → V6 slide 8 · 08-ponte

- **Título na V5:** Menos sobreposição. IA no método.
- **Fonte do conteúdo:** `src/slides/08-servicos-a-produtos.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_08.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_08.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_08_hoje.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_08_proposta.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 29 · 24 · 10/7/8/4 · 7/6/5/6 | colunas Hoje e Proposta | estrutural | Portfólio oficial e proposto |  | manter |  |
| 13 → 6 (o que fundir) | ponte | estrutural | Mapeamento serviço → produto |  | manter e citar no verso | Explicar que conta o serviço que ancora cada grupo. |
| 2 (o que retirar) | ponte | estrutural | IT Business Partner e IT M&A Playbook |  | corrigir redação | “deixam de ser vendidos sozinhos”. |
| Manter 5 · Aprimorar com IA 15 · Criar com IA 4 | ponte | estrutural | Status dos 24 produtos |  | manter | Reconciliar com o raio-X (4 · 13 · 10 · 2) numa frase do verso. |
| 29 − 13 + 6 − 2 + 4 = 24 | ponte | estrutural | Aritmética correta, mas opaca |  | trocar por palavras | “14 serviços seguem um a um, 13 se fundem em 6, 2 deixam de ser vendidos sozinhos e 4 nascem: 14 + 6 + 4 = 24”. |
| 1.7 · 2.6 · 3.5 · 4.6 | card Criar com IA | estrutural | Códigos dos novos |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| IMO/SMO | nome do 3.3 | tirar a sigla do nome: “Integration & Separation Office” |
| TMO | coluna Hoje do pilar 2 | “TMO (escritório de transformação)” |
| deal | “Tecnologia em todo o ciclo do deal” | transação |
| HOJE · 29 SERVIÇOS / PROPOSTA · 24 PRODUTOS | rótulos do divisor | ok; sem “AS-IS/TO-BE” |
| fx 37 · Before / After Slider | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Menos sobreposição. IA no método. | TC V6: “29 serviços viram 24 produtos: 5 mantidos, 15 com IA no método e 4 novos”. |
| Como fica: “…, com inteligência artificial no método e preço por valor.” (repetido nos 4 pilares) | Uma frase por pilar com a decisão do cliente que ele atende (ex.: P2 “entregar no prazo e no valor prometido”); “preço por valor” sai (preço se calibra nos pilotos). |
| Nome proposto do pilar (ex.: “IT Advisory · Strategy, Leadership & Value”) | Remover: a V6 mantém os nomes atuais dos pilares. |

**Lógica e storytelling**

- Na posição padrão (50/50) o leitor vê os pilares 1–2 “hoje” e os pilares 3–4 “proposta”: compara coisas diferentes. → **Antes (29) × depois (24) lado a lado, mesmo pilar na mesma linha; divisor como efeito, não como única forma de ler.**
- Falta a definição de produto (o que muda de serviço para produto). → **Sub V6: “Produto é escopo fechado, método replicável, IA no método e um formato que o cliente entende”.**
- Faltam exemplos claros de “o que muda de nome”. → **Três exemplos: Strategy Application → Application Portfolio Rationalization; IMO + SMO → Integration & Separation Office; Tech Maturity & Value Assessment → Tech & AI Value Diagnostic.**
- “Manter 5” contradiz o “Manter 4” do raio-X sem explicação. → **Frase no verso: o 3.3 junta dois serviços que seguem com a mesma essência.**

**Quebras e cortes**

- “serviços em 4 pilares, com sobreposições e sem IA no / método” — *viúva* (card O que temos)
- “IT Business Partner e IT M&A Playbook deixam de ser vendidos / isolados” — *viúva* (card O que retirar)
- “produtos com a essência / preservada” · “produtos aprimorados com IA no / método” — *viúva* (cards Manter e Aprimorar)
- “Quando nos contratam” do P2 e do P3 com última palavra sozinha — *viúva* (colunas Hoje)
- 30 rótulos (PROPOSTA · PILAR N · nome proposto, COMO FICA, contadores) — *fonte pequena (9,5–10 px)*
- Medição automática (todos os estados) — quebras curtas: 10 · viúvas: 12 · palavras partidas: 0 · rótulos abaixo de 11 px: 59; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Definição de produto.
- Verso: o que significa produto aqui, regras de fusão, por que alguns saem como produto isolado.

### Slide 9 · One-page · novo portfólio (V5 `09-one-page`) → V6 slide 9 · 09-one-page

- **Título na V5:** 24 produtos, um só sistema.
- **Fonte do conteúdo:** `src/slides/09-one-page.html (+ src/js/20-one-page.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_09.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_spot1.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_spot2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_spot3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_spot4.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_spot5.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_09_nomehoje.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 24 produtos · Manter 5 · Aprimorar 15 · Criar 4 · Signature 4 | legenda | estrutural | Portfólio proposto |  | manter |  |
| 10 → 7 · 7 → 6 · 8 → 5 · 4 → 6 | cabeçalho de cada pilar | estrutural | Mapeamento |  | manter |  |
| “Em 3 semanas: onde a TI gera, perde e pode capturar valor” | tile 1.1 | desenho nosso | Prazo nosso |  | remover | “Quanto a TI custa, quanto devolve e o que decidir primeiro”. |
| “Red flag em 1 semana, DD completa em 3: …” | tile 3.1 | desenho nosso | Prazo nosso |  | remover | “Diligência de tecnologia com IA lendo o data room e o código”. |
| Spotlight: “9 dos 10 serviços … 6 deles com IA no método”, “6 dos 7 … 5 deles”, “Os 8 … 3 deles”, “Os 4 …, mais 1 vindo do Pilar 1, e 1 novo … 5 deles” | legendas do spotlight | estrutural | Calculado dos dados |  | corrigir redação | “com IA no método” aqui soma aprimorados + novo; padronizar (T13). |
| 1.1 … 4.6 | tiles | estrutural | Códigos |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Plataforma de Dados e IA | base, spotlight, “Sobre este slide” | “Plataforma de Dados e AI” (nome pedido pelo usuário) |
| LLM corporativo seguro | chip da base e spotlight | modelo de IA generativa em ambiente seguro |
| PMO | tile 2.3 | escritório de projetos |
| DD · TSAs · IMO/SMO · carve-out · cyber · Red flag | tiles 3.1–3.3 | diligência · contratos de serviços de transição · (tirar do nome) · separação · segurança cibernética · alerta crítico |
| EBITDA | tile 3.4 | resultado operacional (EBITDA) |
| P&L | tile 1.7 | resultado |
| GPU · FinOps | tile 4.3 | processadores para IA · gestão do custo de nuvem |
| CDO · CAIO | tile 1.3 | diretor de dados · diretor de IA |
| SAP ECC | tile 2.2 | versão antiga do ERP da SAP (ECC) |
| service desk | tile 2.6 | central de atendimento de TI |
| deal (“TECNOLOGIA EM TODO O CICLO DO DEAL”) | subtítulo do pilar 3 | transação |
| DNA operador (rodapé) | rodapé | “onde o direito de vencer é maior” |
| fx 18 · Connector / Flow Line | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| 24 produtos, um só sistema. | TC V6: “24 produtos, um só sistema: cada pilar responde a uma decisão do cliente”. |
| Blocos “PROPOSTA” que preenchem as linhas vazias dos pilares 2, 3 e 4 (repetem a definição do pilar: “Garantimos que…”, “Protegemos e criamos valor…”, “Modernizamos…”) | Trocar pela decisão do cliente que o pilar responde (“Decidir”, “Executar”, “Transacionar”, “Modernizar”) e uma frase concreta; sem promessa. |
| 4.2: “Menos sistemas, menos custo, mais clareza” | “Desligar o que ninguém usa e liberar orçamento para modernizar”. |
| Plataforma: “É o que torna o serviço replicável de um cliente para o outro e sustenta a receita recorrente.” | “Base comum a construir: guias, dados de comparação e modelos de IA que cada produto reutiliza.” |

**Lógica e storytelling**

- “★ A&M Signature” só é explicado no rodapé e na dica. → **Legenda visível: “★ A&M Signature: onde o direito de vencer é maior”.**
- A base lista ativos que ainda não existem (Spend Radar, Benchmark DTS Brasil, Diagnóstico padrão, Biblioteca de agentes, LLM corporativo) e ferramentas da A&M global (A&M Assist, DiligenceGPT) sem dizer isso. → **Rótulo “a construir” e “ferramentas da A&M global, a confirmar para o Brasil”.**
- No modo “Nome de hoje” o 1.3 mostra “de Interim CIO / CTO Leadership + 3 serviços” (lista completa só na dica). → **Mostrar os quatro nomes no verso; no tile, “de 4 serviços de liderança”.**

**Quebras e cortes**

- 4.4 “…que não podem dar / errado” · 2.6 “…service desk e / operações” · 4.3 “…GPU e / FinOps” — *viúva* (tiles)
- 44 rótulos de status e mono (9,5–10,5 px) — *fonte pequena* (tiles e legenda)
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 5 · palavras partidas: 0 · rótulos abaixo de 11 px: 113; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Base “Plataforma de Dados e AI”.
- Legenda de status em palavras e ★ explicado.
- Verso: lógica do sistema (como os pilares se conectam e o que a plataforma compartilha).

### Slide 10 · Pilar 1 · Cliente e mercado (V5 `10-p1-cliente-mercado`) → V6 slide 10 · 10-p1-cliente

- **Título na V5:** Vista 1: “Menos maturidade, mais caixa, risco e liderança.” · Vista 2: “A estratégia de IA lotou; o espaço é quem assume o resultado.”
- **Fonte do conteúdo:** `src/slides/10-p1-cliente-mercado.html (+ slides.js: PERS, MK, WS, JR, POS)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_10.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_10.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_10_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 53% dos executivos: IA generativa e agentes são a prioridade nº 1 | FATO | fato com fonte | ABES/IDC (mar/2026) | verificado | manter e citar no verso |  |
| 56% dos CEOs sem retorno financeiro com IA | DADO | fato com fonte | PwC, 29ª CEO Survey (jan/2026), global | a verificar | manter e citar no verso | Dizer “no mundo”. |
| 27% com governança madura | DADO | fato com fonte | Deloitte State of AI 2026 (Brasil) | verificado | manter e citar no verso | Dizer de quem é cada número (o “Fonte: PwC · Deloitte” junta dois estudos). |
| US$ 67,8 bi · mercado de TI no Brasil em 2025 (+18,5%) | KPI | fato com fonte | ABES/IDC (mar/2026) | verificado | remover | O usuário mandou tirar (“isso daí já sabemos”). |
| +5,3% crescimento projetado de TI em 2026 | KPI | fato com fonte | ABES/IDC (mar/2026) | verificado | manter e citar no verso | “orçamento sob escrutínio” é leitura nossa: dizer no verso. |
| 4,2 mil empresas usaram a Lei do Bem (ano-base 2024) | KPI | fato com fonte | MCTI via Convergência Digital | a verificar | mover para o verso | Não responde à pergunta do conselho (E daí fraco); verificar se há ano-base 2025. |
| “…nos próximos 100 dias?” (pergunta do sócio de PE) | persona | desenho nosso | Termo de mercado |  | trocar por palavras | “nos primeiros meses depois da compra”. |
| Jornada: “Diagnóstico em 3 semanas” · “valor em jogo em R$ e 10 decisões” | jornada comercial | desenho nosso | Proposta nossa |  | remover | “Diagnóstico curto que termina numa lista de decisões”. |
| Vista 2: 470 mil profissionais (Deloitte–Anthropic, 06/10/2025) | tabela | fato com fonte | Anthropic (empresa) | verificado | manter |  |
| Vista 2: US$ 1,4 bi (EY.ai) | tabela | fato com fonte | ICMIF (set/2023) | verificado | corrigir redação | Dado de 2023: dizer o ano ou tirar. |
| Vista 2: 1ª Big Four com ISO/IEC 42001 (KPMG) | tabela | fato com fonte | KPMG Brasil | verificado | manter |  |
| Vista 2: 250+ agentes com Google (PwC) | tabela | fato com fonte | PwC Global (15/10/2025) | verificado | manter |  |
| Vista 2: ~25 mil agentes (McKinsey); tech e IA >40% da receita (BCG) | tabela | fato com fonte | Business Insider (jan/2026); BCG (23/04/2026) | verificado | manter |  |
| Vista 2: Artium (ago/2026); “CIO interino” na AlixPartners | tabela | fato com fonte | AlixPartners (04/08/2026); CIO interino = fonte fraca | fraco | corrigir redação | Aquisição é fato; oferta de CIO interino vem de fonte fraca (verso). |
| Vista 2: “Corte de 10%” (Lei do Bem) | espaço livre 4 | fato com fonte | LC 224/2025 (Correio Braziliense) | verificado | manter |  |
| Vista 2: heat “Sobreposição” Alta/Média | tabela | desenho nosso | Leitura nossa |  | trocar por palavras | Dizer o critério (“mesmo comprador e mesma oferta”) ou tirar. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| PE (“Aquisição por PE”, “Sócio de PE”) | gatilhos e persona | fundo de private equity |
| FormP&D (Lei do Bem) | gatilho | formulário da Lei do Bem |
| EBITDA | persona do sócio de PE | resultado operacional (EBITDA) |
| IA/GenAI | rodapé | IA generativa |
| TBM/Apptio · PPM · ISO/IEC 42001 | vista 2 | gestão financeira de TI · gestão do portfólio de projetos · norma internacional de gestão de IA |
| Op model · top-down · IT cost · CIO interino · CAIO | vista 2 | modelo operacional · de cima para baixo · custo de TI · CIO interino · diretor de IA |
| ROI · accountability · Success fee · sprint | vista 2 (espaço livre e ameaça) | retorno · responsabilidade pelo resultado · honorário de êxito · diagnóstico curto |
| Big Four | vista 2 | as quatro grandes (Deloitte, PwC, EY e KPMG) |
| fx 26 · Microinteractions | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Menos maturidade, mais caixa, risco e liderança. | TC V6: “O conselho quer saber quanto a tecnologia devolve — e quem responde por isso”. |
| INSIGHT: “Diagnóstico de maturidade e estratégia digital genérica perdem valor; ganha quem liga tecnologia a caixa, risco e liderança.” | A dor: “Relatório de maturidade não responde ao conselho: ele quer saber quanto a TI custa, quanto devolve e quem decide.” |
| Jornada: “a A&M entra no comando” · “assinatura que sustenta o resultado” | “Depois do diagnóstico, a A&M pode assumir a TI, redesenhar a área ou cortar custo; o acompanhamento contínuo mede se o custo volta.” |
| Vista 2: “A estratégia de IA lotou; o espaço é quem assume o resultado.” | Painel “O que o mercado faz”: “Estratégia de IA todos oferecem; liderança interina de tecnologia não encontramos nas quatro grandes.” |
| Vista 2: “Op model e finanças de TI robustos” | “Forte em modelo operacional e finanças de TI” |
| Vista 2: “Pauta via CEO Survey; IA como acelerador” | “Usa a pesquisa global com CEOs para pautar o tema; vende IA como acelerador de projetos.” |
| Posicionamento: “…assinamos o resultado e não vendemos plataforma.” | “Assumimos o cargo e respondemos pelo plano de valor; não vendemos plataforma.” (no verso, como posicionamento proposto) |
| Ameaça: “…precisam virar sprint com valor em R$.” | “Diagnóstico e estratégia são o que a IA mais barateia: só vendem se terminarem em decisão com valor em reais.” |

**Lógica e storytelling**

- “Fato / Dado / Insight / Implicação”: Fato e Dado são ambos fatos; a diferença não está clara. → **V6: O que o cliente vive = quem decide · a dor · o gatilho.**
- KPIs soltos (US$ 67,8 bi; 4,2 mil empresas da Lei do Bem) não respondem à pergunta do título. → **Usar só os números que provam a dor do conselho (56%, 27%, 53%) e levar o resto ao verso.**
- “CIO interino não encontrado” nas quatro grandes é resultado de pesquisa, não prova de ausência. → **Manter a ressalva no verso (o rodapé da V5 já diz).**
- A tabela mistura escala global e Brasil sem dizer. → **Dizer “no mundo” / “no Brasil” em cada linha.**

**Quebras e cortes**

- “…para 53% dos / executivos.” — *viúva* (FATO)
- Rótulos dos KPIs com “(+18,5%)” e “2024)” sozinhos — *viúva* (KPIs)
- Perguntas das personas com “isso?”, “risco?”, “valor?” sozinhos — *viúva* (Quem compra)
- Vista 2: “…CIO interino não / encontrado” · “…TI / robustos” · “…ISO/IEC / 42001” · “…cloud)” · “McKinsey · BCG · / Bain” — *viúva* (tabela)
- 21 rótulos (FATO, DADO, Fonte, GATILHOS…) entre 9,5 e 10,5 px — *fonte pequena*
- Medição automática (todos os estados) — quebras curtas: 19 · viúvas: 14 · palavras partidas: 0 · rótulos abaixo de 11 px: 36; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Painéis “O que o cliente vive” (quem decide, a dor, o gatilho) e “O que o mercado faz” (só ofertas com fonte).
- Verso: contexto do pilar, fontes e o que validar.

### Slide 11 · Pilar 1 · Produtos (V5 `11-p1-produtos`) → V6 slide 11 · 11-p1-produtos

- **Título na V5:** Vista 1: “Liderança que assume e valor em R$.” · Vista 2: “De 10 serviços a 7 produtos, linha a linha.”
- **Fonte do conteúdo:** `src/slides/11-p1-produtos.html (+ src/js/30-pilar-produtos.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_11.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_11.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_11_g2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_11_g3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_11_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 10 → 7 · Manter 1 · Aprimorar 5 · Criar 1 | grafo, barra e cards | estrutural | Mapeamento |  | manter |  |
| “3 ofertas de liderança … e 2 de impostos e incentivos” | legenda do grafo | estrutural | Mapeamento |  | manter |  |
| “Em 3 semanas: …” (tagline do 1.1) | card e vista 2 | desenho nosso | Prazo nosso |  | remover |  |
| “briefing da 1ª semana” (IA do 1.3) | card e vista 2 | desenho nosso | Prazo nosso |  | trocar por palavras | “primeiro briefing do interino”. |
| “Lê e classifica centenas de documentos … em horas” (IA do 1.1) | card e vista 2 | sem base | Capacidade não medida |  | trocar por palavras | “Lê contratos, faturas e inventários e classifica o gasto”. |
| 56% dos CEOs sem retorno financeiro com IA | card “Novo com IA · 1.7” (vista 2) | fato com fonte | PwC, 29ª CEO Survey (jan/2026) | a verificar | manter e citar no verso |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CDO · CAIO | tagline do 1.3 | diretor de dados · diretor de IA |
| P&L | tagline do 1.7 | resultado |
| shadow AI | IA do 1.7 | uso de IA fora do controle da TI |
| commits | IA do 1.6 | registros de código |
| A&M Tax | O que muda | área tributária da A&M |
| HOJE · AS-IS / PROPOSTA · TO-BE | vista 2 | Hoje / Proposta |
| fx 29 · Morphing Shapes / fx 37 · Before / After Slider | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Liderança que assume e valor em R$. | TC V6: “IT Advisory: 10 serviços viram 7 produtos que terminam em decisão, não em relatório”. |
| Lead: “Apoiamos líderes nas decisões de tecnologia e IA que movem o resultado: …” (repete a divisória e a one-page) | Uma frase nova, só aqui: “Cada produto termina numa decisão com dono, prazo e valor em reais.” |
| 1.5: “Cortar o que não gera valor e manter o radar ligado com IA” | “Cortar contratos, licenças e nuvem que não se pagam — e impedir que o custo volte”. |
| 1.7: “Do piloto ao P&L: a torre que governa valor, risco e custo da IA” | “Do piloto ao resultado: quem decide que IA escala, que IA para e quanto ela custa”. |

**Lógica e storytelling**

- “Evolui de …” (rastro de origem) está em mono minúsculo: a informação que liga o antes ao depois é a menos legível. → **Linha “Nasce de” com corpo ≥ 13 px.**
- No “Antes e depois”, a coluna “Diagnóstico · por que mudar” fica atrás do divisor na posição padrão (38,5%). → **Mostrar o motivo de cada linha sem precisar arrastar (ou abrir em “Hoje”).**
- O 1.3 junta quatro serviços, inclusive um do pilar 2 (IT Business Partner): isso só aparece na legenda do grafo. → **Dizer na carta do 1.3 (“evolui de 4 serviços de liderança, um deles do pilar 2”).**

**Quebras e cortes**

- “Evolui de Interim CIO / CTO Leadership + Embedded Tech Leadership + C-Level Tech Enablement (+ IT Business Partner)” em 2 linhas de mono — *quebra* (card 1.3)
- “…em parceria com A&M / Tax.” — *viúva* (vista 2)
- Card “PILAR 1 · IT ADVISORY 10 → 7 SERVIÇOS → PRODUTOS” — *quebra* (vista 2, lateral)
- 27–36 rótulos entre 9,5 e 10,5 px (legenda do grafo, “Evolui de”, cabeçalhos) — *fonte pequena*
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 1 · palavras partidas: 0 · rótulos abaixo de 11 px: 63; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Cartas de produto com “evolui de” legível.
- Verso: contexto do pilar e o que validar.

### Slide 12 · Pilar 2 · Cliente e mercado (V5 `12-p2-cliente-mercado`) → V6 slide 12 · 12-p2-cliente

- **Título na V5:** Vista 1: “2027 tem data marcada: CBS e SAP ECC.” · Vista 2: “Integradores ganham escala; o DTS ganha como voz independente.”
- **Fonte do conteúdo:** `src/slides/12-p2-cliente-mercado.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_12.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_12.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_12_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| Teste em 2026 · CBS plena em 2027 · ICMS/ISS reduzidos de 2029 a 2032 · extintos em 2033 | FATO | fato com fonte | EC 132/2023 e LC 214/2025 (via Congresso em Foco) | verificado | manter |  |
| 2026 Alíquota-teste de 1% (CBS 0,9% + IBS 0,1%) | linha do tempo | fato com fonte | LC 214/2025 | verificado | manter |  |
| 01/01/2027 CBS plena; PIS/Cofins extintos | linha do tempo e gatilho | fato com fonte | LC 214/2025 | verificado | manter |  |
| 2027 Fim da manutenção padrão do SAP ECC (extensível a 2030) | linha do tempo | fato com fonte | SAP via Baguete | verificado | manter |  |
| 2029–32 ICMS/ISS recolhidos a 90% → 60% da alíquota atual · 2033 extintos | linha do tempo | fato com fonte | EC 132/2023; LC 214/2025 | verificado | manter |  |
| 37% das empresas no início da adequação | DADO | fato com fonte | PwC “Tributos no centro” (31/10/2025) | divergente | corrigir redação | PwC/imprensa: “37% ainda em análise inicial do impacto”. Alternativa mais forte: “70% apontam a TI entre as áreas mais afetadas” (a verificar). |
| >70% das iniciativas de ERP não atingirão o business case até 2027 | DADO e espaço livre 3 (vista 2) | fato com fonte | Gartner via The Register (13/11/2025) | a verificar | corrigir redação | É previsão; na vista 2 aparece como fato presente (“>70% dos ERPs abaixo do business case”). |
| Jornada: “2–8 semanas, preço fixo” · “ganho medido trimestre a trimestre” | jornada comercial | desenho nosso | Proposta nossa |  | remover | “Diagnóstico curto” · “ganho medido periodicamente”. |
| Vista 2: AWS até 2031; Recife ~600 pessoas (Deloitte) | tabela | fato com fonte | Deloitte Brasil; Consultancy.lat / Movimento Econômico | verificado | manter |  |
| Vista 2: Recife de 250 para 1.000 pessoas até o fim de 2026 (Capgemini) | tabela | fato com fonte | Diario de Pernambuco (out/2025) | verificado | manter |  |
| Vista 2: Falconi R$ 100 mi em IA, 80% dos projetos com agentes | tabela | fato com fonte | Jornal do Comércio (set/2026) | verificado | manter |  |
| Vista 2: heat Alta/Média/Baixa | tabela | desenho nosso | Leitura nossa |  | trocar por palavras | Critério escrito ou tirar (Capgemini · Accenture · IBM “Baixa” não se explica). |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CBS · IBS | título, FATO, linha do tempo | “novos tributos sobre consumo (CBS e IBS)” na 1ª menção |
| SAP ECC · S/4HANA · RISE | título, gatilho, tabela | versão antiga do ERP da SAP (ECC) · versão atual (S/4HANA) · contrato de migração para a nuvem (RISE) |
| ICMS · ISS · PIS/Cofins | FATO e linha do tempo | tributos conhecidos; escrever “tributos atuais (ICMS, ISS, PIS e Cofins)” na 1ª menção |
| PMO | INSIGHT e vista 2 | escritório de projetos |
| Head Tax · CHRO · sponsor | personas | diretor tributário · diretor de RH · patrocinador do programa |
| go-live · lock-in | gatilho e persona | entrada em operação · dependência de fornecedor |
| RPA · Tax · cutover · AI-native | vista 2 | automação robótica de processos · área tributária · virada de sistema · nativa em IA |
| EC · LC · CNBSP | rodapé | Emenda Constitucional · Lei Complementar · (nome por extenso no verso) |
| Big Four | vista 2 | as quatro grandes |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| 2027 tem data marcada: CBS e SAP ECC. | TC V6: “2027 tem data marcada: Reforma Tributária e fim da manutenção padrão do SAP ECC não admitem atraso” (explicar o ECC). |
| INSIGHT: “…a demanda é por certeza de entrega, não por mais PMO.” | A dor: “O cliente quer saber se chega a tempo; mais relatório de status não responde isso.” |
| IMPLICAÇÃO: “Produtos com prazo e preço fixos (prontidão e resgate) e governança preditiva com IA.” | (Leitura nossa, no verso) “Prontidão com escopo fechado, resgate quando atrasou e um escritório que avisa antes do atraso.” |
| Jornada: “entrega garantida” | “entrega acompanhada até a virada” |
| Vista 2: “Integradores ganham escala; o DTS ganha como voz independente.” | Painel “O que o mercado faz”: “Integradores e fornecedores entram pela implantação; as quatro grandes, pelo tributário. Ninguém responde pela virada do sistema.” (leitura nossa, verso) |
| Posicionamento: “…a voz independente que garante a entrega … respondemos por prazo e valor.” | “Revisão independente do programa, sem vender software nem horas de implantação.” |

**Lógica e storytelling**

- “Programas obrigatórios” vale para a Reforma, não para a troca de ERP (o fim do ECC é prazo do fornecedor, extensível a 2030). → **Separar: obrigação legal (CBS) × decisão de plataforma (ECC).**
- Fato/Dado de novo (ver slide 10). → **Quem decide · a dor · o gatilho.**
- “Cetic.br TIC Empresas 2025” e “reformatributaria.com (trocas de ERP)” estão no rodapé, mas nenhum número visível vem deles. → **Fontes do rodapé = fontes do que está na tela; o resto vai para o verso.**

**Quebras e cortes**

- “Fim da manutenção padrão do SAP ECC (extensível a 2030)” em 3 linhas — *quebra* (linha do tempo)
- “CBS plena; PIS/Cofins / extintos” — *viúva* (linha do tempo)
- DADO com “2027.” sozinho — *viúva* (DADO)
- Vista 2: “…ONESOURCE; / Workbench” · “…PMO e / entrega” · “…(TOTVS)” · “…ficam / descobertos.” · “…(Gartner).” · “…PMO e / implementação.” — *viúva* (tabela e espaço livre)
- Rodapé de fontes em 2 linhas (nas duas vistas) — *quebra* (rodapé)
- Medição automática (todos os estados) — quebras curtas: 14 · viúvas: 10 · palavras partidas: 0 · rótulos abaixo de 11 px: 37; vazio no fim do corpo: 16 px.

**Falta para a V6**

- “O que o cliente vive” × “O que o mercado faz” no formato da V6.
- Explicação do ECC na 1ª menção.
- Verso com fontes oficiais (lei) e o que validar.

### Slide 13 · Pilar 2 · Produtos (V5 `13-p2-produtos`) → V6 slide 13 · 13-p2-produtos

- **Título na V5:** Vista 1: “Certeza de entrega para programas obrigatórios.” · Vista 2: “TMO e implantação viram um só escritório.”
- **Fonte do conteúdo:** `src/slides/13-p2-produtos.html (+ src/js/30-pilar-produtos.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_13.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_13.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_13_g2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_13_g3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_13_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 7 → 6 · Manter 1 · Aprimorar 4 · Criar 1 | grafo, barra e cards | estrutural | Mapeamento |  | manter |  |
| “3 frentes · SDLC · service desk · operações (AIOps)” | card “Novo com IA · 2.6” (vista 2) | estrutural | Contagem do nosso desenho |  | trocar por palavras | “desenvolvimento de software, central de atendimento e operação de TI”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TMO | grafo, cards, título da vista 2 | escritório de transformação |
| PMO | tagline do 2.3 | escritório de projetos |
| backlogs · status | IA do 2.3 | filas de demandas · relatórios de andamento |
| SAP ECC | tagline do 2.2 | versão antiga do ERP da SAP (ECC) |
| service desk · SDLC · AIOps | tagline e card do 2.6 | central de atendimento · ciclo de desenvolvimento de software · operação de TI com IA |
| RFP · Copilots · accountability | diagnóstico (vista 2) | concorrência · assistentes de IA · responsabilidade pelo resultado |
| persona | IA do 2.5 | perfil de usuário |
| HOJE · AS-IS / PROPOSTA · TO-BE | vista 2 | Hoje / Proposta |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Certeza de entrega para programas obrigatórios. | TC V6: “Technology Transformation: 7 serviços viram 6 produtos para entregar no prazo e no valor prometido”. |
| Lead: “Garantimos que programas críticos de tecnologia entreguem: …” (4ª repetição) | Frase nova, sem promessa: “Cada produto responde a uma pergunta do patrocinador: escolho quem?, chego a tempo?, por que atrasou?, alguém está usando?” |
| 2.3: “Um PMO que antecipa o problema: governança de transformação com IA preditiva” | “Um escritório de transformação que avisa antes de o atraso virar crise”. |
| 2.4: “Turnaround de projetos de tecnologia em crise” | “Resgate de projetos de tecnologia em crise”. |

**Lógica e storytelling**

- IT Business Partner aparece como “retirado” e como “absorvido” no mesmo slide. → **Uma expressão: “deixa de ser vendido sozinho; vira parte do 1.3”.**
- “Programas obrigatórios” (ver slide 12). → **Separar Reforma (lei) de troca de ERP (decisão).**

**Quebras e cortes**

- Lead em 3 linhas com “adoção.” sozinho — *viúva* (topo)
- “TMO e Modelo de Implantação e Governança → / 2.3” · “ERP Readiness & Gap Analysis incorpora a / Reforma” — *viúva* (O que muda (vista 2))
- Card “PILAR 2 · TECHNOLOGY TRANSFORMATION 7 → 6 …” — *quebra* (vista 2, lateral)
- 24–32 rótulos entre 9,5 e 10,5 px — *fonte pequena*
- Medição automática (todos os estados) — quebras curtas: 3 · viúvas: 3 · palavras partidas: 0 · rótulos abaixo de 11 px: 56; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Grafo + cartas com “evolui de”.
- Verso do pilar.

### Slide 14 · Pilar 3 · Cliente e mercado (V5 `14-p3-cliente-mercado`) → V6 slide 14 · 14-p3-cliente

- **Título na V5:** Vista 1: “PE em metade dos deals: diligência rápida, Dia 1 sem susto.” · Vista 2: “Tech DD é onde a IA mais avançou: prazo e preço sob ataque.”
- **Fonte do conteúdo:** `src/slides/14-p3-cliente-mercado.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_14.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_14.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_14_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 1.581 transações em 2025 | FATO | fato com fonte | KPMG (mar/2026) | verificado | remover | O usuário mandou tirar. |
| PE/VC passou de 43% para 50% do total | FATO e título | fato com fonte | KPMG (mar/2026) | divergente | corrigir redação | “Fundos de private equity e venture capital participaram de metade das transações de 2025” (não “PE em metade dos deals”). |
| 1S26: 610 deals (−35%) e R$ 195 bi (+22,3%); TI setor nº 1 com 274 | DADO | fato com fonte | KPMG (ago/2026) | verificado | manter e citar no verso | Na frente, em palavras: “menos transações, de valor maior; TI é o setor com mais negócios”. |
| DD com agentes ~US$ 50 mil (DiligenceSquared) | INSIGHT e vista 2 | fato com fonte | TechCrunch (05/03/2026) | a verificar | manter e citar no verso | Preço anunciado pela startup. |
| MBRF: concluída em set/2025; sinergias de R$ 485 mi/ano | casos | fato com fonte | Giro News | a verificar | manter e citar no verso |  |
| Petz + Cobasi: Cade aprovou em dez/2025, venda de 26 lojas | casos | fato com fonte | Mercado Hoje (11/12/2025) | verificado | manter |  |
| Braskem: controle passa à IG4 (abr/2026) | casos | fato com fonte | IstoÉ Dinheiro | verificado | manter |  |
| Raízen: separação até o fim de 2027 | casos | fato com fonte | Forbes (mai/2026) | verificado | manter |  |
| Motiva: venda de participações em aeroportos por R$ 5,2 bi | casos | fato com fonte | KPMG 1º semestre de 2026 (segundo a pesquisa) | a verificar | manter e citar no verso | A fonte não aparece no rodapé do slide. |
| Jornada: “Red flag em 1 semana” · “DD com IA, 3 níveis” · “do signing ao Dia 100” · “assinatura anual · leitura trimestral por investida” | jornada comercial | desenho nosso | Proposta nossa |  | remover | “Diagnóstico de alertas críticos antes da assinatura” · “níveis de profundidade” · “da assinatura aos primeiros meses” · “acompanhamento contínuo por investida”. |
| Vista 2: CAST Highlight reduziu >75% do tempo (caso EY) | tabela | fato com fonte | Estudo de caso do fornecedor CAST, sem data | fraco | corrigir redação | “segundo o fornecedor”. |
| Vista 2: “DD com IA em 1–3 semanas” (posicionamento) | posicionamento | desenho nosso | Prazo nosso |  | remover |  |
| Vista 2: heat Alta/Média e “ATIVO A&M” | tabela | desenho nosso | Leitura nossa |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| PE · PE/VC · VC | título, FATO, gatilho, personas | fundos de private equity e de venture capital |
| deals · signing · closing | título, INSIGHT, personas | transações · assinatura · fechamento |
| DD · Tech DD | INSIGHT, IMPLICAÇÃO, vista 2 | diligência · diligência de tecnologia |
| TSA | IMPLICAÇÃO e persona | contrato de serviços de transição |
| 1S26 | DADO | 1º semestre de 2026 |
| Carve-out | gatilhos e casos | separação de unidade |
| Corporate development · CEO pós-deal | personas | área de fusões e aquisições da empresa · CEO depois da compra |
| PMI · ACDC · Software/Data Diligence · Sell-side & Exit Readiness | vista 2 | integração pós-fusão · (tirar) · nomes de oferta dos concorrentes, entre aspas |
| LLM (“Licenças de LLM”) | espaço livre 3 | modelos de IA generativa |
| PEPI | linha “A&M (hoje)” da tabela | nome interno: tirar ou “a área da A&M que atende fundos de private equity” |
| EBITDA · Dia 100 | posicionamento | resultado operacional · primeiros cem dias |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| PE em metade dos deals: diligência rápida, Dia 1 sem susto. | TC V6: “A diligência de tecnologia virou commodity com IA; o valor migrou para depois da assinatura”. |
| IMPLICAÇÃO: “Tech M&A como ciclo contínuo: DD com IA → Dia 1 → TSA → sinergias → radar do portfólio.” | (Leitura nossa) “O fundo compra a tecnologia uma vez e convive com ela até vender: a DTS acompanha da diligência à saída.” |
| Vista 2: “Tech DD é onde a IA mais avançou: prazo e preço sob ataque.” | “Na diligência, a IA já derrubou o preço: há oferta com agentes por cerca de US$ 50 mil.” |
| Posicionamento: “…o operador de tecnologia do signing à saída … executamos o que recomendamos.” | “Da assinatura à venda, a mesma equipe diagnostica e executa.” (verso, como proposta) |

**Lógica e storytelling**

- Os casos públicos são boa prova, mas o slide não diz o que cada um exige da TI. → **Uma linha por caso: “MBRF: dois ERPs para integrar” (a confirmar) etc., ou dizer no verso.**
- “A&M (hoje)” cita PEPI e “Ativos existem; falta produtizar no Brasil”. → **Nome interno sai; “ferramentas da A&M global (A&M Assist, DiligenceGPT), a confirmar para o Brasil”.**
- “Radar trimestral … não encontrado no Brasil” vira prova de espaço livre. → **“não encontramos” ≠ não existe (ressalva no verso).**

**Quebras e cortes**

- Casos: “Cade aprovou…”, “Separação em Energia e Combustíveis até o fim de 2027”, “Venda de participações… R$ 5,2 bi” em 3 linhas; “(abr/2026)” e “2027” sozinhos — *quebra e viúva* (casos)
- “…E depois do / closing?” — *viúva* (persona do sócio de PE)
- Vista 2: “…(ACDC)” · “…(jun/2026)” · “…canal de / PE” · “…porta de / entrada.” · “…para o / Brasil.” — *viúva* (tabela e espaço livre)
- Rodapé de fontes da vista 2 em 2 linhas — *quebra* (rodapé)
- Medição automática (todos os estados) — quebras curtas: 13 · viúvas: 9 · palavras partidas: 0 · rótulos abaixo de 11 px: 42; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Painéis da V6 (cliente × mercado).
- Verso com fontes e ressalvas.

### Slide 15 · Pilar 3 · Produtos (V5 `15-p3-produtos`) → V6 slide 15 · 15-p3-produtos

- **Título na V5:** Vista 1: “Do signing à saída, no mesmo contrato.” · Vista 2: “Oito fases, quatro produtos e uma assinatura.”
- **Fonte do conteúdo:** `src/slides/15-p3-produtos.html (+ src/js/30-pilar-produtos.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_15.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_15.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_15_g2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_15_g3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_15_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 8 → 5 · “8 fases viram 4 produtos + 1 assinatura” · Manter 2 · Aprimorar 2 · Criar 1 | grafo, O que muda, barra | estrutural | Mapeamento |  | manter |  |
| “Red flag em 1 semana, DD completa em 3” (tagline do 3.1) | card e vista 2 | desenho nosso | Prazo nosso |  | remover |  |
| “Plano de 100 dias” (entrega do 3.4) | card | desenho nosso | Termo de mercado / oferta documentada da A&M |  | manter | Como nome do método, não como prazo. |
| “Tech Health Score trimestral por investida” (entrega do 3.5) | card | desenho nosso | Frequência nossa |  | trocar por palavras | “nota de saúde de tecnologia por investida, atualizada periodicamente”. |
| 50% do M&A brasileiro com PE/VC | card “Novo com IA · 3.5” (vista 2) | fato com fonte | KPMG (mar/2026) | divergente | corrigir redação | Participação, não “M&A com PE/VC”; e o usuário pediu para tirar esse número do slide de forças. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| signing | título | assinatura |
| DD · IMO · SMO · TSA(s) | legenda do grafo e cards | diligência · escritório de integração · escritório de separação · contrato de serviços de transição |
| Red flags · valuation | entrega do 3.1 | alertas críticos · preço da empresa |
| carve-out · change of control · cutover | taglines e IA do 3.2/3.3 | separação · mudança de controle · virada |
| Baseline · EBITDA | card 3.4 | linha de base · resultado operacional |
| Tech Health Score · PE/VC | card 3.5 | nota de saúde de tecnologia · fundos de private equity e venture capital |
| HOJE · AS-IS / PROPOSTA · TO-BE | vista 2 | Hoje / Proposta |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Do signing à saída, no mesmo contrato. | TC V6: “Tech M&A: 8 serviços viram 5 produtos que acompanham o negócio da assinatura à saída” (“no mesmo contrato” é desenho, não fato). |
| 3.2: “Dia 1 sem susto: desenho de integração ou carve-out de TI, TSAs e custos” | “A TI do primeiro dia e do estado final desenhada antes da assinatura”. |
| Diagnóstico C2: “PE em 50% dos deals; concorrentes já usam IA (PwC Harvey/ToltIQ). Acelerar é obrigatório.” | “Concorrentes já fazem diligência com IA (PwC com Harvey e ToltIQ); sem IA, a nossa fica mais cara e mais lenta.” |

**Lógica e storytelling**

- Frase duplicada na vista 2: “Sobreposição: mesma disciplina em sentidos opostos (IMO × SMO). IMO e SMO são a mesma disciplina em sentidos opostos.” → **Uma vez só.**
- 3.3 é “Manter” apesar de os dois serviços de origem serem “Fundir” no raio-X. → **Explicar no verso (reconciliação).**

**Quebras e cortes**

- “…mesma disciplina em sentidos / opostos.” — *viúva* (vista 2)
- Card “PILAR 3 · TECH M&A 8 → 5 SERVIÇOS → PRODUTOS” — *quebra* (vista 2, lateral)
- 21–27 rótulos entre 9,5 e 10,5 px — *fonte pequena*
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 1 · palavras partidas: 0 · rótulos abaixo de 11 px: 48; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Cartas com “evolui de” legível.
- Verso do pilar.

### Slide 16 · Pilar 4 · Cliente e mercado (V5 `16-p4-cliente-mercado`) → V6 slide 16 · 16-p4-cliente

- **Título na V5:** Vista 1: “A pergunta virou por onde, a que custo e com que garantia.” · Vista 2: “A IA barateou a migração; o valor migrou para a decisão.”
- **Fonte do conteúdo:** `src/slides/16-p4-cliente-mercado.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_16.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_16.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_16_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| VMware até 8–15× mais caro pós-Broadcom | FATO e KPI (duas vezes no mesmo slide) | fato com fonte | Baguete (data aproximada) | fraco | verificar antes de usar | Duplicado; fraco não pode ser destaque. |
| até 40% dos insumos de TI são importados | FATO | fato com fonte | TI Inside (11/02/2025) | a verificar | manter e citar no verso |  |
| Bancos: R$ 50,4 bi em tecnologia em 2026, cloud +30% | DADO | fato com fonte | Febraban/Deloitte via Forbes (jun/2026) | a verificar | manter e citar no verso | Dizer por que importa: orçamento de migração para nuvem dos bancos cresce 30%. |
| ataques à C&M (~R$ 800 mi) e à Sinqia (R$ 710 mi) | DADO | fato com fonte | Imprensa (Finsiders, Jornal Opção, Tecnoblog) | a verificar | manter e citar no verso |  |
| R$ 3,9 bi bancos em migração para cloud em 2026 (+30%) | KPI | fato com fonte | Febraban/Deloitte via Forbes | a verificar | manter e citar no verso |  |
| até 4× mais rápido em migração .NET com AWS Transform | KPI | fato com fonte | AWS / SiliconANGLE (dado do fornecedor) | fraco | trocar por palavras | O fato útil é “a AWS oferece a migração sem custo” (Qovery/AWS, set/2026). |
| CMN 5.274 | gatilho | fato com fonte | Conselho Monetário Nacional (18/12/2025) | verificado | manter |  |
| Jornada: “4–10 semanas, fixo ou fixo + % de economia” · “exercícios anuais” | jornada comercial | desenho nosso | Proposta nossa |  | remover | “diagnóstico curto” · “exercícios periódicos”. |
| Vista 2: LegacyX ~90% de precisão, cronograma −80% | tabela | fato com fonte | McKinsey (blog, 2025) — dado da própria firma | fraco | corrigir redação | “segundo a McKinsey”. |
| Vista 2: 30 mil pessoas treinadas em Claude (Accenture) | tabela | fato com fonte | Anthropic (dez/2025) | verificado | manter |  |
| Vista 2: ~45% de ganho interno com Bob (IBM) | tabela | fato com fonte | IBM (dado do fornecedor) | fraco | mover para o verso |  |
| Vista 2: COBOL “em trimestres, não anos” (fev/2026) | tabela | fato com fonte | Gigazine / Malay Mail (24/02/2026) | verificado | manter |  |
| Vista 2: heat Alta/Média | tabela | desenho nosso | Leitura nossa |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Hyperscalers | INSIGHT | provedores de nuvem (AWS, Microsoft, Google) |
| assurance · business case | IMPLICAÇÃO e posicionamento | revisão independente · caso de negócio |
| CMN 5.274 | gatilho e espaço livre | Resolução 5.274 do Conselho Monetário Nacional |
| CRO · COO · CTO | persona | diretor de riscos · diretor de operações · CTO (permitido) |
| TCO | jornada e espaço livre | custo total |
| cyber | gatilho | ataque cibernético |
| EA · squads · FinOps · GPU | vista 2 | arquitetura corporativa · equipes · gestão do custo de nuvem · processadores para IA |
| SAS → Python · .NET · COBOL | tabela | nomes de linguagem: manter só se necessário |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| A pergunta virou por onde, a que custo e com que garantia. | TC V6: “A IA dos provedores de nuvem barateou a migração; o valor está em escolher a rota e garantir a virada”. |
| INSIGHT: “Hyperscalers dão a ferramenta quase de graça; …” | “A AWS oferece a migração sem custo; o risco passa a ser escolher a rota errada.” (fato com fonte + leitura) |
| Gatilho: “IA esbarra em dados” | “O projeto de IA parou porque os dados estão no legado”. |
| Posicionamento: “…quem escolhe a rota e garante a modernização … respondemos pelo business case.” | “Escolhemos a rota e revisamos a execução de forma independente; não revendemos ferramenta.” |

**Lógica e storytelling**

- O orçamento total dos bancos (R$ 50,4 bi) não prova a dor de modernização sem o “E daí?”. → **Ligar: migração para nuvem dos bancos cresce 30% → decisão de rota e risco de virada.**
- “Deloitte · EY: Agentes em ferramentas de EA (SAP LeanIX, Ardoq)” atribui às consultorias o que é de fornecedores de software. → **Linha própria para os fornecedores ou tirar.**

**Quebras e cortes**

- FATO com “importados.” sozinho; INSIGHT em 5 linhas com “garantia.” sozinho — *viúva* (vista 1)
- KPIs: “(+30%)” e “Transform” sozinhos — *viúva* (KPIs)
- Persona: “…sistemas / redundantes?” — *viúva* (Quem compra)
- Vista 2: 9 células da tabela com a última palavra sozinha — *viúva* (tabela)
- Rodapé de fontes em 2 linhas (nas duas vistas) — *quebra* (rodapé)
- Medição automática (todos os estados) — quebras curtas: 16 · viúvas: 15 · palavras partidas: 0 · rótulos abaixo de 11 px: 36; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Painéis da V6.
- Verso do pilar.

### Slide 17 · Pilar 4 · Produtos (V5 `17-p4-produtos`) → V6 slide 17 · 17-p4-produtos

- **Título na V5:** Vista 1: “Escolher a rota antes de migrar.” · Vista 2: “Cada serviço ganha o nome do que entrega.”
- **Fonte do conteúdo:** `src/slides/17-p4-produtos.html (+ src/js/30-pilar-produtos.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_17.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_17.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_17_g2.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_17_g3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_17_v2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 4 → 6 · Manter 1 · Aprimorar 4 · Criar 1 | grafo, barra e cards | estrutural | Mapeamento |  | manter |  |
| “3 dos 4 serviços têm nomes que não dizem o que entregam” | legenda do grafo | estrutural | Leitura nossa dos nomes |  | manter |  |
| R$ 50,4 bi orçamento de tecnologia dos bancos em 2026 | card “Novo com IA · 4.6” (vista 2) | fato com fonte | Febraban/Deloitte via Forbes | a verificar | trocar por palavras | Não prova a dor do legado; usar “Bradesco e Caixa modernizam o mainframe sem substituir” ou nada. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CMDB | IA do 4.1 | base de configuração de TI |
| SSO | IA do 4.2 | registros de acesso |
| GPU · FinOps · right-sizing | card 4.3 | processadores para IA · gestão do custo de nuvem · ajuste de capacidade |
| tabletop | IA do 4.5 | simulação de mesa |
| Infra · advisory | O que muda | infraestrutura · assessoria |
| HOJE · AS-IS / PROPOSTA · TO-BE | vista 2 | Hoje / Proposta |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Escolher a rota antes de migrar. | TC V6: “Modernization: 4 serviços viram 6 produtos para modernizar sem parar a operação”. |
| 4.2: “Menos sistemas, menos custo, mais clareza” | “Desligar o que ninguém usa e liberar orçamento para modernizar”. |
| 4.3: “Infraestrutura certa para a era da IA: nuvem, VMware, GPU e FinOps” | “Decidir onde roda cada sistema — nuvem, data center ou saída da VMware — pelo custo total”. |

**Lógica e storytelling**

- No estado “Hoje” o grafo tem 5 nós e muito vazio. → **Aproximar o grafo ou usar o espaço para a frase do pilar.**
- “não existe hoje” e “Lacuna: Sistemas que ninguém mais entende.” para o 4.6: placeholder técnico. → **“Novo: nasce da dor ‘sistemas que ninguém mais entende’”.**

**Quebras e cortes**

- “R$ 50,4 bi orçamento de tecnologia dos bancos em / 2026” — *viúva* (card Novo com IA (vista 2))
- 21–29 rótulos entre 9,5 e 10,5 px — *fonte pequena*
- Medição automática (todos os estados) — quebras curtas: 2 · viúvas: 1 · palavras partidas: 0 · rótulos abaixo de 11 px: 50; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Cartas com “evolui de”.
- Verso do pilar.

### Slide 18 · Fábrica de produtos (V5 `18-fabrica`) → V6 slide 18 · 18-fabrica

- **Título na V5:** Um produto é igual em todo cliente.
- **Fonte do conteúdo:** `src/slides/18-fabrica.html (+ slides.js: CardStack, anatomia, camadas, portão, OPM)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_18.png (divisória)` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_18.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_18_c1.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_18_c5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| Passos 01–07 | pilha de cards | estrutural | Contagem do nosso desenho |  | trocar por palavras | V6: “sete portões” com outro conteúdo (dor → escopo → método → IA → dados → formato → dono). |
| “Ficha padrão (12 blocos e fontes)” · anatomia 1–12 | card 01 e bloco Anatomia | estrutural | Estrutura da ficha |  | remover | Meta sobre o deck; não ajuda o comitê a decidir. |
| Sprint “(1–6 semanas)” | camadas comerciais | desenho nosso | Prazo nosso |  | remover |  |
| Portão: “≥ 3 clientes por ano” · “≥ 70% do escopo igual” · “≥ 30% menos esforço” | portão de produto | desenho nosso | Metas nossas |  | remover | Critério em palavras: “demanda que se repete”, “escopo que se repete”, “ganho medido no piloto”. |
| Dono de produto “1 por pilar + 1 de IA” · Squad “Sócio · gerente · 2 consultores · engenheiro de IA/dados” | modelo operacional e card 06 | desenho nosso | Desenho nosso |  | trocar por palavras | “um dono por produto; equipe padrão com engenharia de IA e dados”. |
| Comitê trimestral · revisão anual | modelo operacional e card 07 | desenho nosso | Frequência nossa |  | trocar por palavras | “comitê de portfólio; revisão periódica decide escalar, ajustar ou aposentar”. |
| Exemplos: “relatório em 3 níveis” (3.1), “squad forense pronto em 1 semana” (2.4), “assinatura Essencial · Avançado · Regulado” (1.7) | rodapé dos cards | desenho nosso | Desenho nosso |  | trocar por palavras | Tirar “1 semana”; níveis sem número. |
| MIT NANDA: soluções compradas ou com parceiros ~67% de sucesso × ~1/3 das internas | rodapé | fato com fonte | MIT NANDA via Fortune (18/08/2025); não reverificado ([E*]) | fraco | mover para o verso | Não usar como número de destaque. |
| Everest Group (2026); IBM (asset-based consulting, 2025) | rodapé | fato com fonte | Everest Group; IBM | verificado | mover para o verso |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| LLM corporativo seguro | card 03 | modelo de IA generativa em ambiente seguro |
| RFP · buy-side · sell-side | card 02 | concorrência · lado comprador · lado vendedor |
| TBM | card 04 | gestão financeira de TI |
| Success fee · fee · sprint | card 05 e camadas | honorário de êxito · honorário · diagnóstico curto |
| squad · P&L | card 06 e modelo operacional | equipe · resultado do produto |
| NPS | card 07 | satisfação do cliente |
| T&M | rodapé | cobrança por hora |
| data request · templates | card 01 | pedido de dados · modelos |
| IMO/SMO | exemplo do card 02 | tirar a sigla do nome |
| fx 33 · Card Stack | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Um produto é igual em todo cliente. | TC V6: “Um serviço só vira produto depois de passar por sete portões”. |
| “Um produto DTS é método + ferramenta + dados + preço + time” | Sub V6: “Da dor do cliente ao piloto: escopo, método, IA, dados, formato e dono — nessa ordem”. |
| Card 04: “…a vantagem cresce a cada venda.” | “Cada projeto alimenta a base de comparação; ela fica mais útil a cada cliente.” (hipótese, no verso) |
| Card 07: “Casos de sucesso viram material de venda” | Tirar (genérico). |

**Lógica e storytelling**

- Quatro blocos num slide (pilha, anatomia, camadas, portão + modelo operacional): sobrecarga. → **Um tema: os sete portões, com prazo e preço “calibrados nos pilotos” escritos.**
- Os 7 passos da V5 não coincidem com os 7 portões da V6 (ordem e conteúdo). → **Reescrever conforme SPEC (portões em palavras).**
- “Precificar” fala em faixas e êxito sem base de preço. → **Preço: “calibrado nos pilotos”.**

**Quebras e cortes**

- Camadas e portão: “…receita / recorrente”, “…mesmo / problema”, “…e o / próximo”, “…etapas / automatizadas” — *viúva* (colunas da direita)
- Rodapé de fontes em 2 linhas — *quebra* (rodapé)
- Medição automática (todos os estados) — quebras curtas: 6 · viúvas: 4 · palavras partidas: 0 · rótulos abaixo de 11 px: 7; vazio no fim do corpo: 15 px.

**Falta para a V6**

- Mascote pequeno (capacete).
- Verso: por que portões, o que cada portão exige, quem decide.

### Slide 19 · Roadmap e decisões (V5 `19-roadmap`) → V6 slide 20 · 20-roadmap

- **Título na V5:** Proteger o núcleo, capturar 2027.
- **Fonte do conteúdo:** `src/slides/19-roadmap.html (+ slides.js; TL_LAUNCH em src/data/20-timelines.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_19.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_19.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_19_m3.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_19_m5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| ≥30% da receita DTS de produtos com IA no método em 2027 | Como medir o sucesso | desenho nosso | Meta inventada |  | remover | SPEC manda remover; nomear o indicador sem número: “receita de produtos com IA no método”. |
| ≥10% de receita recorrente | Como medir o sucesso | desenho nosso | Meta inventada |  | remover | “receita recorrente (assinaturas)”. |
| −30% no tempo de entrega de diagnósticos e DDs | Como medir o sucesso | desenho nosso | Meta inventada |  | remover | “tempo de entrega de diagnósticos e diligências”. |
| ≥40% de conversão sprint → execução | Como medir o sucesso | desenho nosso | Meta inventada |  | remover | “conversão de diagnóstico em execução”. |
| 4T 2026 · 0–90 dias / 1T 2027 / 2T 2027 / 3T 2027 / 4T 2027 | ondas | desenho nosso | Calendário nosso |  | trocar por palavras | Ondas em sequência (0 → 3) sem trimestre; datas só para as janelas com fonte (CBS 01/01/2027; ECC 2027). |
| CBS em 01/01/2027 | onda 0, decisão 04, rodapé | fato com fonte | LC 214/2025 | verificado | manter |  |
| “piloto de 10 semanas” (AI-Native IT Productivity) | onda 2 | desenho nosso | Prazo nosso |  | remover |  |
| “3–5 clientes-piloto cada”, “1–2 fundos de PE”, “1–2 fundos-âncora” | onda 2, onda 3, decisão 05 | desenho nosso | Tamanhos de amostra nossos |  | remover | “piloto com clientes selecionados, incluindo fundos”. |
| “4 donos de produto (1 por pilar) + 1 de IA; 2–3 engenheiros” | Pessoas | desenho nosso | Tamanho de equipe nosso |  | remover |  |
| “1 hyperscaler e 1 laboratório de IA” | Parcerias | desenho nosso | Desenho nosso |  | trocar por palavras | “parceria com um provedor de nuvem e um laboratório de IA”. |
| 24 produtos (5 · 15 · 4), 4 A&M Signature | decisão 01 | estrutural | Portfólio proposto |  | manter |  |
| “AI-Powered Tech Due Diligence (3 níveis)” | onda 1 | estrutural | Desenho nosso (contagem) |  | trocar por palavras | “níveis de profundidade”. |
| A&M Global AI Board (mai/2026) | rodapé | fato com fonte | A&M (05/05/2026) | verificado | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| LLM corporativo seguro | onda 0, decisão 03, Ferramentas | modelo de IA generativa em ambiente seguro |
| quick wins | título da onda 0 | primeiros ganhos |
| PE · DD · DDs | decisão 05, KPIs, Ferramentas | fundos de private equity · diligência(s) |
| PEPI · A&M Tax · Data & IA | decisão 06 e Parcerias | nomes internos: explicar (“área tributária da A&M”, “prática de dados e IA da A&M”) ou tirar PEPI |
| FinOps · hyperscaler · Power BI/Fabric | Parcerias e Ferramentas | gestão do custo de nuvem · provedor de nuvem · (ferramenta; manter só se necessário) |
| sprint → execução | KPI | diagnóstico → execução |
| 4T · 1T · 2T · 3T | ondas | 4º trimestre… (ou tirar) |
| fx 38 · Timeline Motion | rodapé | remover o chip de efeito |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Proteger o núcleo, capturar 2027. | TC V6: “Começar protegendo o núcleo e aproveitando as janelas de 2027”. |
| Onda 0: “Fábrica de produtos e quick wins” | “Fundação: donos, fichas, base de dados e IA; primeiros lançamentos ligados às janelas de 2027”. |
| Decisão 01: “…os 4 A&M Signature e os novos nomes dos pilares.” | Tirar “os novos nomes dos pilares” (não pedido). |
| Revisão (4T 2027): “O comitê trimestral acompanha… a revisão anual decide…” | Tirar a 5ª onda; a revisão vira regra da fábrica (slide 18). |

**Lógica e storytelling**

- Seis decisões densas e uma lista de capacidades com números inventados. → **Decisões como cartas na mesa (curtas) e o “chamado” final como na APODI.**
- Cinco ondas (com “Revisão”) contra quatro na V6. → **Onda 0 Fundação → 1 Núcleo Signature → 2 Novos produtos com IA → 3 Recorrência.**
- Decisão 06 cita PEPI e o Global AI Board como parceiros a “alinhar fronteiras”: nome interno e pedido vago. → **“Alinhar com a A&M global o uso das ferramentas de diligência com IA e a meta de receita com IA”.**
- Área vazia grande no alto à direita, sobre a linha das ondas. → **Trilha de tabuleiro com o mascote ocupando o espaço (V6).**

**Quebras e cortes**

- “≥30% da receita DTS de produtos com IA no método em / 2027” — *viúva* (KPIs (que saem))
- Onda 0 em 4 linhas com “2027).” sozinho; onda “Revisão” com “aposentar.” sozinho — *viúva* (card da linha do tempo)
- Medição automática (todos os estados) — quebras curtas: 1 · viúvas: 3 · palavras partidas: 0 · rótulos abaixo de 11 px: 9; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Trilha de tabuleiro com mascote (bandeira).
- “O chamado” final.
- Verso: lógica das ondas, janelas com fonte, riscos e decisões.

### Slide 20 · Fontes e método (V5 `20-fontes`) → V6 sai do roteiro: método → verso do slide 2 (Sumário); fontes → verso de cada slide; lacunas → “O que ainda vamos validar”

- **Título na V5:** De onde vêm os números.
- **Fonte do conteúdo:** `src/slides/20-fontes.html (+ slides.js)`
- **Capturas:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_20.png` · `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/s_20.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| 06/10/2026 · 4 frentes | lead e método | estrutural | Data e desenho da nossa pesquisa |  | mover para o verso | Verso do slide 2. |
| 62 fontes (frente Big Four) | método | estrutural | Contagem da nossa pesquisa |  | mover para o verso |  |
| US$ 3,4 bi × US$ 4,2 bi (discrepância IDC) | lacunas | fato com fonte | IDC via EuQueroInvestir (2026) | divergente | mover para o verso | Só como ponto a validar; não usar o número. |
| “Validação dos 4 produtos novos com 3–5 clientes-piloto cada” | lacunas | desenho nosso | Tamanho de amostra nosso |  | trocar por palavras | “com clientes selecionados”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| H (marcador) | método · Avaliação do portfólio | não usar marcadores E/H |
| BACEN · ANPD · PL 2338 · EC · LC · Res. CMN | método e regulação | Banco Central · Autoridade Nacional de Proteção de Dados · projeto de lei de IA · Emenda Constitucional · Lei Complementar · Resolução do Conselho Monetário Nacional |
| WCA for Z · TTR/Aon/Datasite · State of FinOps | ferramentas e M&A | nomes de fonte: por extenso no verso |
| Big Four | método | as quatro grandes |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Como ler as marcas: Fonte · Proposta DTS · Não verificado · A alinhar | Sai: na V6 não há selos; o verso diz em prosa o que é fato, o que é leitura nossa e o que falta validar. |

**Lógica e storytelling**

- As lacunas (posicionamento de Stefanini, Sonda, NTT DATA…; ofertas de FTI, Huron…; Lei do Bem das Big Four; status do Redata e do PL 2338; discrepância IDC) são valiosas e somem com o slide. → **Levar cada uma para o “O que ainda vamos validar” do verso do slide correspondente e para o README.**
- Status do PL 2338 (“votação após as eleições”) já pode ter mudado (hoje é 29/10/2026). → **Atualizar antes de citar.**

**Quebras e cortes**

- Lead com “sócios.” sozinho; lista de regulação com “5.274/2025” sozinho; “…não / reverificadas” — *viúva*
- Medição automática (todos os estados) — quebras curtas: 0 · viúvas: 3 · palavras partidas: 0 · rótulos abaixo de 11 px: 10; vazio no fim do corpo: 16 px.

**Falta para a V6**

- Método no verso do Sumário; fontes em todos os versos.

## 5. Divisórias de capítulo (V5)

Na V5 há 9 sobreposições de capítulo (“CAPÍTULO 01…09”). Na V6 elas viram “PARTE 1…5” e as aberturas de pilar (SPEC §2).

### Capítulo 01 · Ponto de partida
- **Texto:** O ponto de partida — O que o DTS oferece hoje: 4 pilares, 29 serviços e nenhum com IA no método.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_02.png`
- Números estruturais corretos (4 · 29 · 0).
- V6: rótulo “PARTE 1”, título em Barlow Condensed, mascote e pílulas; “o DTS” → “a DTS” (a área), como na SPEC.

### Capítulo 02 · Mercado
- **Texto:** O que o mercado vive — O cliente mudou a pergunta. As consultorias mudaram a oferta.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_04.png`
- Frase boa e curta; mantém.
- Na V6 a Parte 2 tem 2 slides (forças e benchmark): a frase já anuncia os dois.

### Capítulo 03 · Nossa posição
- **Texto:** Nossa posição — Onde a A&M tem direito de vencer e o que precisa mudar no portfólio.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_06.png`
- “Direito de vencer” é jargão de estratégia: explicar uma vez (“onde a A&M ganha do concorrente por história, ativos e reputação”).

### Capítulo 04 · Novo portfólio
- **Texto:** O novo portfólio — De 29 serviços a 24 produtos, com IA no método e quatro apostas novas.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_08.png`
- Contagens corretas (29 → 24; 4 novos).

### Capítulo 05 · Pilar 1 · IT Advisory
- **Texto:** IT Advisory — Apoiamos líderes nas decisões de tecnologia e IA que movem o resultado: diagnóstico, estratégia investível, liderança interina, modelo operacional e custo. Nome proposto: IT Advisory · Strategy, Leadership & Value. 10 → 7 · 6/7 com IA no núcleo · 1 produto novo · ★ Interim & Embedded Tech Leadership · ★ Tech Spend Optimization & Spend Radar.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_10.png`
- “Nome proposto” para o pilar não foi pedido (T18): remover.
- “6/7 com IA no núcleo” mistura aprimorados e novo e usa “núcleo” (T13): “5 com IA no método e 1 novo”.
- Morph diz “fragmentados e sob medida”: leitura nossa sem prova; “escopo · método · preço” no estado Produtos promete preço.
- A definição se repete na one-page, no lead do slide 11 e no spotlight (T15).

### Capítulo 06 · Pilar 2 · Technology Transformation
- **Texto:** Technology Transformation — Garantimos que programas críticos de tecnologia entreguem: escolha de fornecedores, ERP e Reforma Tributária, governança preditiva, resgate de projetos e adoção. 7 → 6 · 5/6 com IA no núcleo · 1 produto novo.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_12.png`
- “Garantimos que… entreguem” é promessa (T08).
- “governança preditiva” é jargão: “governança que avisa antes do atraso”.
- Texto em 3 linhas com “projetos e adoção.” na última (T19).

### Capítulo 07 · Pilar 3 · Tech M&A
- **Texto:** Tech M&A — Protegemos e criamos valor de tecnologia do signing à saída: due diligence com IA, Dia 1, integração e separação, sinergias e monitoramento de portfólio. Nome proposto: Tech M&A & Value Creation. 8 → 5 · 3/5 com IA no núcleo.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_14.png`
- “signing” → “assinatura” (T05).
- “Nome proposto” não foi pedido (T18).
- “Protegemos e criamos valor” é genérico: “da assinatura à venda, a tecnologia não trava o negócio”.

### Capítulo 08 · Pilar 4 · Modernization
- **Texto:** Modernization — Modernizamos arquitetura, aplicações e infraestrutura para a era da IA, com custo sob controle, migrações garantidas e operação resiliente. Nome proposto: Modernization & AI-Ready Technology. 4 → 6 · 5/6 com IA no núcleo.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_16.png`
- “migrações garantidas” é promessa (T08).
- “para a era da IA” é genérico.
- “Nome proposto” não foi pedido (T18).

### Capítulo 09 · Execução
- **Texto:** Como fazer acontecer — A fábrica de produtos, o roadmap de lançamento e as decisões para o comitê.
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/cur_shots/c_18.png`
- Na V6 a Parte 5 inclui os Jogos de entrada: a frase precisa citar as três peças (fábrica, jogos, roadmap e decisões).
- “roadmap” → “trilha de lançamento”.

## 6. Fichas de produto (24)

**Vale para todas as fichas**

- Etapas rotuladas por semana/dia/mês (S1–2, D1–30, M4+): trocar por “1”…“5” (SPEC §8).
- “Formato e encaixe” com duração: “Formato: diagnóstico de escopo fechado” (sem prazo nem preço em número).
- KPIs marcados “proposta DTS” saem; ficam 0 a 3 fatos do registro no formato [valor, texto, idFato].
- “Por que A&M” mistura fato, selo “Fonte:” e selo “proposta DTS” em mono: escrever o mercado com fonte e o diferencial em palavras; o que é hipótese vai para o verso/notas.
- Rodapé “Fontes e notas” vira a lista de fontes (campo fontes) + nota curta (campo ev).

### Ficha 1.1 · Tech & AI Value Diagnostic (Aprimorar com IA)

- **id:** `tech-ai-value-diagnostic` · **Pilar:** 1 · **Nasce de:** Tech Maturity & Value Assessment
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.1.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Em 3 semanas” (tagline) · “Duração: 3 semanas” · “3 sem. do kick-off ao valor em jogo” | tagline, formato, KPI | desenho nosso | Prazo nosso |  | remover |  |
| “7 lentes” (KPI, entrega “Scorecard de maturidade (7 lentes)”, etapa “scoring das 7 lentes”) | KPI, entregas, etapas | desenho nosso | Desenho nosso |  | trocar por palavras | Citar os temas (estratégia, gasto, arquitetura, dados, IA, pessoas, risco) sem o número. |
| 56% dos CEOs ainda sem retorno financeiro com IA | KPI | fato com fonte | PwC, 29ª CEO Survey (jan/2026), global | a verificar | manter | kpi: [“56%”, “dos CEOs no mundo ainda sem retorno financeiro com IA”, “ceo-sem-retorno-ia-56”]. |
| “Top-10 decisões” · “Roadmap de 90 dias” | entregas e etapa | desenho nosso | Desenho nosso |  | trocar por palavras | “lista curta de decisões, com dono e prazo” · “plano dos primeiros meses”. |
| “10–15 entrevistas + survey digital com 50–200 respondentes” | etapa | desenho nosso | Tamanho de amostra nosso |  | remover | “entrevistas com a liderança e pesquisa rápida com as equipes”. |
| “CIO recém-chegado (primeiros 100 dias)” | para quem é | desenho nosso | Termo |  | trocar por palavras | “CIO recém-chegado”. |
| “Lê e classifica centenas de documentos … em horas” | papel da IA | sem base | Capacidade não medida |  | trocar por palavras |  |
| “Escopo fixo de 3 semanas e preço por faixa de receita” | como vira produto | desenho nosso | Prazo e preço nossos |  | trocar por palavras | “escopo fechado; prazo e preço calibrados nos pilotos”. |
| Porta de entrada para 1.2 · 1.4 · 1.5 | formato | estrutural | Códigos |  | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TBM / TBM/Apptio | skills e Por que A&M | gestão financeira de TI |
| ITSM | dados | chamados da central de serviços de TI |
| LLM | ferramentas | modelo de IA generativa |
| PE | comprador e para quem é | fundos de private equity |
| ROI | problema | retorno medido |
| Scorecard · benchmark · survey · kick-off · data request · workshop · roadmap | entregas e etapas | placar · comparação com o mercado · pesquisa · início · pedido de dados · oficina · plano |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Em 3 semanas: onde a TI gera, perde e pode capturar valor” | “Quanto a TI custa, quanto devolve e o que decidir primeiro”. |
| Diferencial A&M: “velocidade, valor em R$ e foco em decisão” | “Termina numa lista de decisões com valor em reais, não num relatório de maturidade.” (o pitch já diz isso bem) |

**Lógica**

- A promessa principal da V5 é velocidade (3 semanas); sem número, o valor tem de vir de “termina em decisão”. → **Reescrever tagline e pitch em torno da decisão.**
- “KPMG CIO Advisory e EY Office of the CIO fazem diagnósticos de maturidade” vem de páginas de serviço e vagas. → **Fonte no verso como “páginas de serviço (2025–26)”.**

**Quebras (medidas)**

- Quebras curtas: 13 · viúvas: 4 · rótulos abaixo de 11 px: 24 · vazio na coluna direita: 24 px.
- Exemplos: “…prazo” em “Top-10 decisões com dono e prazo” · “…citações” em “Sintetiza entrevistas e survey em temas e citações” · “…receita” em “Escopo fixo de 3 semanas e preço por faixa de receita” · “…(Miro/Mural).” em “Ferramentas: Ambiente de diagnóstico DTS (formulário + Power”

**Sugestão para a V6**

- kpis: [“56%”, “dos CEOs no mundo ainda sem retorno financeiro com IA”, “ceo-sem-retorno-ia-56”]
- meta: “Formato: diagnóstico curto, de escopo fechado” · “Comprador: CEO, CFO, CIO, conselho e fundos” · “Modelo comercial: preço fechado por porte (calibrado nos pilotos)” · “Encaixe: porta de entrada para 1.2, 1.4 e 1.5”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo abre este produto)

### Ficha 1.2 · Tech & AI Strategy Roadmap (Aprimorar com IA)

- **id:** `tech-ai-strategy-roadmap` · **Pilar:** 1 · **Nasce de:** Digital Strategy & Roadmapping
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–8 semanas” · “6–8 sem. da ambição ao plano aprovado” | formato e KPI | desenho nosso | Prazo nosso |  | remover |  |
| ~25% das empresas escalam ≥40% dos pilotos de IA | KPI | fato com fonte | Deloitte State of AI 2026 (Brasil) | verificado | manter | kpi: [“~25%”, “das empresas no Brasil escalaram 40% ou mais dos pilotos de IA”, “pilotos-ia-escalados-25”]. |
| “3 horizontes” (KPI e entrega) | KPI e entregas | desenho nosso | Desenho nosso |  | trocar por palavras | “ganhos rápidos, escala e transformação”. |
| “plano de 3–5 anos” | para quem é | desenho nosso | Prazo nosso |  | trocar por palavras | “plano de médio prazo”. |
| “Dezenas de pilotos de IA sem priorização” | problema | sem base | Sem fonte |  | trocar por palavras | “Muitos pilotos de IA, nenhum prioritário”. |
| Etapas S1–2 … S8 | como funciona | desenho nosso | Semanas |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| P&L por unidade | dados | resultado por unidade |
| LLM | ferramentas | modelo de IA generativa |
| board pack | entregas e etapas | material para o conselho |
| business case · design thinking · benchmark setorial | entregas e skills | caso de negócio · desenho com usuários · comparação setorial |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Mercado: “saturado; McKinsey/QuantumBlack, BCG X, Deloitte e EY oferecem estratégia de IA” | “Estratégia de IA é oferta comum (McKinsey, BCG, Deloitte, EY); o espaço é o plano que já nasce com caso de negócio e ordem de execução.” |
| Tagline: “Estratégia de tecnologia e IA investível: …” | “Plano de tecnologia e IA que o conselho aprova: casos de uso, ordem e retorno previsto”. |

**Lógica**

- O raio-X chama este mercado de saturado e mesmo assim o produto é “aprimorar”: falta dizer por quê. → **No verso: é a ponte natural para 1.7 e 2.3 (venda combinada).**

**Quebras (medidas)**

- Quebras curtas: 17 · viúvas: 6 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 24 px.
- Exemplos: “…risco)” em “Portfólio priorizado de casos de uso (valor × viabilidade × ” · “…nível” em “Arquitetura-alvo em alto nível” · “…setorial” em “Fábrica de casos de uso com IA: ideação assistida + benchmar” · “…execução” em “Board pack e governança de execução” · “…Roadmap” em “Fases com preço fixo: Ambição → Portfólio → Roadmap” · “…(executar)” em “Desdobra em 1.7 (governar o portfólio) e 2.3 (executar)”

**Sugestão para a V6**

- kpis: [“~25%”, “das empresas no Brasil escalaram 40% ou mais dos pilotos de IA”, “pilotos-ia-escalados-25”]
- meta: “Formato: projeto por fases, de escopo fechado” · “Comprador: CEO, CIO e conselho” · “Modelo comercial: preço fechado por fase” · “Encaixe: abre 1.7 e 2.3”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo não abre este produto; só o pilar)

### Ficha 1.3 · Interim & Embedded Tech Leadership (Manter · ★ A&M Signature)

- **id:** `interim-embedded-tech-leadership` · **Pilar:** 1 · **Nasce de:** Interim CIO / CTO Leadership + Embedded Tech Leadership + C-Level Tech Enablement (+ IT Business Partner)
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.3.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 3–12 meses” | formato | desenho nosso | Prazo nosso |  | remover | “mandato com início e fim definidos”. |
| “< 2 sem. para alocar o executivo (meta de serviço)” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “100 dias · plano de comando com marcos” · “Plano de 100 dias” · etapas D1–30 / D30–100 / M4+ | KPI, entregas, etapas | desenho nosso | Termo de mercado (oferta documentada da A&M global) |  | trocar por palavras | Pode ficar como nome do método (“plano de 100 dias da A&M”), não como prazo do produto. |
| “4 papéis CIO · CTO · CDO · Chief AI Officer” | KPI | estrutural | Contagem de papéis |  | trocar por palavras | Não é KPI; vai para “Para quem é”. |
| “briefing da 1ª semana” | papel da IA | desenho nosso | Prazo nosso |  | trocar por palavras | “primeiro briefing do interino”. |
| Nas Big Four não foi encontrada oferta de CIO interino (pesquisa DTS, 2026) | Por que A&M | fato com fonte | Pesquisa 01_big_four.md | a verificar | manter | “não encontramos” ≠ não existe. |
| AlixPartners oferece CIO interino para PE | Por que A&M | fato com fonte | AlixPartners (fonte fraca) | fraco | mover para o verso |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CDO · CAIO · Chief AI Officer | tagline e KPI | diretor de dados · diretor de IA |
| SLA de alocação | como vira produto | prazo de alocação acordado (sem número) |
| Fee mensal | formato e como vira produto | honorário mensal |
| C-level · PE | pitch e comprador | diretoria · fundos de private equity |
| Board & C-Level AI Fluency | formato e entregas | programa de IA para conselho e diretoria |
| 1.1 light · Match · onboarding | etapas | versão curta do 1.1 · escolha do executivo · integração do sucessor |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Diferencial: “espaço livre no Brasil e DNA histórico da A&M em interim management” | “Não encontramos oferta equivalente nas quatro grandes; a A&M tem tradição global em gestão interina.” |

**Lógica**

- “Manter” com quatro serviços fundidos (um do pilar 2) e copiloto de IA: o leitor estranha o status. → **Explicar: “manter” = essência preservada; a IA entra como apoio.**
- O comprador do IT Business Partner (áreas de negócio) não aparece em “Para quem é”. → **Incluir ou dizer que esse público deixa de ser atendido.**
- “Bancada de executivos pré-qualificados” e “Playbook A&M de 100 dias” são ativos que precisam existir no Brasil. → **Confirmar com os sócios; senão, “a construir”.**

**Quebras (medidas)**

- Quebras curtas: 14 · viúvas: 5 · rótulos abaixo de 11 px: 30 · vazio na coluna direita: 2 px.
- Exemplos: “…críticas” em “Estabilização e decisões críticas” · “…ferramentas” em “Playbook de 100 dias padronizado + kit de ferramentas” · “…marcos” em “Fee mensal por senioridade + variável por marcos” · “…A&M.” em “Ferramentas: Playbook A&M de 100 dias, copiloto do executivo” · “…comitês.” em “Dados: Orçamento, portfólio de projetos, contratos, organogr”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: mandato de liderança interina ou embarcada, com início e fim definidos” · “Comprador: CEO, conselho e fundos” · “Modelo comercial: honorário mensal + bônus por marcos” · “Encaixe: inclui o programa de IA para conselho e diretoria”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo não abre este produto; só o pilar)

### Ficha 1.4 · AI-Era Tech Operating Model (Aprimorar com IA)

- **id:** `ai-era-tech-operating-model` · **Pilar:** 1 · **Nasce de:** Operating Model Design & Tech Org Restructuring
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.4.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 8–10 semanas” · “8–10 sem. do diagnóstico ao modelo aprovado” | formato e KPI | desenho nosso | Prazo nosso |  | remover |  |
| 53% das empresas não têm o talento necessário para IA | KPI | fato com fonte | KPMG Global Tech Report 2025/26 (global) | a verificar | corrigir redação | kpi: [“53%”, “das empresas no mundo não têm o talento necessário”, “kpmg-talento-53”]. |
| “1 mapa · papéis humano × agente por processo de TI” | KPI | desenho nosso | Desenho nosso |  | remover |  |
| Etapas S1–2 … S9–10 | como funciona | desenho nosso | Semanas |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CHRO | comprador | diretor de RH |
| spans & layers | entregas e etapas | níveis hierárquicos e amplitude de gestão |
| sourcing | entregas e etapas | contratação de terceiros |
| AI Ops · agent owner | etapas | operação de IA · responsável por agente |
| Organization design · Workforce analytics | skills | desenho organizacional · análise da força de trabalho |
| LLM · headcount · business case · op model | ferramentas, dados e Por que A&M | modelo de IA generativa · quadro de pessoal · caso de negócio · modelo operacional |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Organização de TI para a era dos agentes: produto, plataforma e força de trabalho humano + IA” | “Como a área de TI se organiza quando parte do trabalho passa para agentes de IA”. |

**Lógica**

- O dado de talento é global; o pilar fala de Brasil. → **Dizer “no mundo” ou trocar por dado brasileiro (Brasscom, a verificar).**

**Quebras (medidas)**

- Quebras curtas: 16 · viúvas: 8 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 23 px.
- Exemplos: “…(produto/plataforma)” em “Modelo operacional-alvo (produto/plataforma)” · “…transição” em “Business case e plano de transição” · “…owner)” em “Atividade × potencial de IA; papéis novos (AI Ops, agent own” · “…sourcing” em “Spans & layers, custo-alvo, sourcing” · “…capacidade” em “Analisa tickets e demanda para dimensionar capacidade” · “…IA” em “Simula cenários de força de trabalho humano + IA”

**Sugestão para a V6**

- kpis: [“53%”, “das empresas no mundo não têm o talento necessário”, “kpmg-talento-53”]
- meta: “Formato: projeto de desenho, de escopo fechado” · “Comprador: CEO, CIO e diretor de RH” · “Modelo comercial: preço fechado + opção de implantação” · “Encaixe: combina com 2.6 e 1.5”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo não abre este produto; só o pilar)

### Ficha 1.5 · Tech Spend Optimization & Spend Radar (Aprimorar com IA · ★ A&M Signature)

- **id:** `tech-spend-optimization` · **Pilar:** 1 · **Nasce de:** Tech Spend Optimization
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 10–12 semanas + assinatura” · etapas S1–2 … S11–12 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “20–30% otimização típica de nuvem com FinOps maduro” | KPI | fato com fonte | IT Forum (sem estudo primário) | fraco | remover |  |
| “8–15× alta de licenças VMware pós-Broadcom” | KPI | fato com fonte | Baguete (data aproximada) | fraco | verificar antes de usar |  |
| “29% do gasto em nuvem é desperdiçado” | KPI | fato com fonte | Flexera State of the Cloud 2026 (global) | verificado | manter | kpi: [“29%”, “do gasto em nuvem é desperdiçado (pesquisa global)”, “flexera-desperdicio-29”]. |
| “Até 40% dos insumos de TI importados” | problema | fato com fonte | TI Inside (11/02/2025) | a verificar | manter |  |
| “Vertice: 18% de economia média em 4 mil negociações” | Por que A&M | fato com fonte | Procurement Magazine (dado do fornecedor) | fraco | corrigir redação | “segundo a própria Vertice”. |
| “economia certificada” (pitch) | pitch | sem base | Não há certificação |  | trocar por palavras | “economia validada com Finanças” (como na entrega). |
| “Radar: assinatura mensal” · “primeira receita recorrente do pilar” | formato e como vira produto | desenho nosso | Desenho nosso |  | trocar por palavras | “radar por assinatura”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| FinOps | KPI, entregas, skills | gestão do custo de nuvem |
| TBM | entregas e skills | gestão financeira de TI |
| SaaS · Shelfware | problema | software por assinatura · licença paga e sem uso |
| PE · EBITDA | comprador e para quem é | fundos de private equity · resultado operacional |
| APIs · ServiceNow SAM · billing | ferramentas e dados | conexões · gestão de ativos de software · faturas de nuvem |
| PTAX | dados | taxa de câmbio oficial (Ptax) |
| LLM | ferramentas | modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Cortar o que não gera valor e manter o radar ligado com IA” | “Cortar contratos, licenças e nuvem que não se pagam — e impedir que o custo volte”. |
| “Câmbio mais forte em 2026 abre janela para renegociar contratos em dólar” (hipótese) | No verso, com o dado da pesquisa (Ptax de R$ 5,50 em dez/2025 e cerca de R$ 5,13 em set/2026; fonte secundária, a verificar). |

**Lógica**

- Três KPIs de custo, dois fracos (VMware, FinOps); o mesmo VMware aparece no slide 16 e na ficha 4.3. → **Um fato forte por ficha; não repetir o mesmo número em 3 lugares.**
- Signature: o motivo (DNA de custo da A&M; carro-chefe no raio-X) não aparece na ficha. → **Uma linha em “Por que A&M”.**

**Quebras (medidas)**

- Quebras curtas: 17 · viúvas: 5 · rótulos abaixo de 11 px: 29 · vazio na coluna direita: 23 px.
- Exemplos: “…licenças” em “Plano de FinOps e de licenças” · “…FinOps” em “Renegociar, consolidar, cancelar, FinOps” · “…automaticamente” em “Classifica faturas na taxonomia TBM automaticamente” · “…ociosas” em “Detecta anomalias, duplicidades e licenças ociosas” · “…proprietário)” em “Benchmark de preços unitários acumulado (ativo proprietário)”

**Sugestão para a V6**

- kpis: [“29%”, “do gasto em nuvem é desperdiçado (pesquisa global)”, “flexera-desperdicio-29”]
- meta: “Formato: programa de redução de custo + radar contínuo” · “Comprador: CFO, CIO e fundos” · “Modelo comercial: parte fixa reduzida + parte sobre a economia; radar por assinatura” · “Encaixe: integra com 4.3”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo abre este produto)

### Ficha 1.6 · Tech Tax & Innovation Incentives (Aprimorar com IA)

- **id:** `tech-tax-innovation-incentives` · **Pilar:** 1 · **Nasce de:** Strategic Tech Tax / Accounting Planning + Innovation Tax Incentives Advisory
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.6.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Ciclo anual (FormP&D até set.)” | formato | fato com fonte | Prazo do formulário da Lei do Bem (2026 prorrogado até 30/09, CartaCapital) | a verificar | trocar por palavras | “ciclo anual, até o prazo do formulário da Lei do Bem”. |
| “4,2 mil empresas usaram a Lei do Bem (ano-base 2024)” | KPI | fato com fonte | MCTI via Convergência Digital | a verificar | verificar antes de usar | Busca de 29/10/2026 aponta ano-base 2025 (4.598 empresas), não verificado. |
| “R$ 51,6 bi em PD&I declarados; ~14 mil projetos” | KPI | fato com fonte | MCTI via Convergência Digital | a verificar | verificar antes de usar | A URL fala em “R$ 516 milhões”; a busca confirma R$ 51,59 bi (ano-base 2024). |
| “−10% corte linear nos incentivos desde 2026 (LC 224/2025)” | KPI e problema | fato com fonte | Correio Braziliense (12/08/2026); LC 224/2025 | verificado | manter | kpi: [“−10%”, “nos incentivos fiscais desde 2026 (Lei Complementar 224/2025)”, “lc224-corte-10”]. |
| Etapas M1 … Anual | como funciona | desenho nosso | Meses |  | trocar por palavras |  |
| “Empresas implantando data centers (Redata)” | para quem é | fato com fonte | Movimento Econômico (02/09/2026); sanção não verificada | a verificar | corrigir redação | Dizer “se o Redata for sancionado”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| FormP&D | formato e entregas | formulário da Lei do Bem |
| PD&I · P&D | KPI e etapas | pesquisa, desenvolvimento e inovação |
| MCTI | papel da IA | Ministério da Ciência, Tecnologia e Inovação |
| LC 224/2025 | KPI | Lei Complementar 224/2025 |
| CPC 04 / IFRS | skills | norma contábil de ativos intangíveis |
| A&M Tax | formato e como vira produto | área tributária da A&M |
| Redata | para quem é | regime especial para data centers (Redata) |
| commits · Cross-sell | papel da IA e como vira produto | registros de código · venda combinada |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| “boutiques especializadas dominam o modelo de êxito” (hipótese) | Verso: “há boutiques que cobram por êxito (a mapear)”. |

**Lógica**

- Depende da parceria com a área tributária da A&M, ainda “a alinhar”. → **Ponto aberto no verso.**
- “O incentivo financia parte da modernização” é afirmação sem cálculo. → **Dizer “pode financiar” e levar ao verso.**

**Quebras (medidas)**

- Quebras curtas: 13 · viúvas: 8 · rótulos abaixo de 11 px: 26 · vazio na coluna direita: 40 px.
- Exemplos: “…projetos” em “Mapa de elegibilidade de projetos” · “…(FormP&D)” em “Dossiê técnico por projeto (FormP&D)” · “…reconciliação” em “Cálculo do benefício e reconciliação” · “…projeto” em “Inovação e risco tecnológico por projeto” · “…cálculo” em “Relatórios técnicos e memória de cálculo” · “…224/2025)” em “corte linear nos incentivos desde 2026 (LC 224/2025)”

**Sugestão para a V6**

- kpis: [“−10%”, “nos incentivos fiscais desde 2026 (Lei Complementar 224/2025)”, “lc224-corte-10”]
- meta: “Formato: ciclo anual, até o prazo do formulário da Lei do Bem” · “Comprador: CFO, diretor tributário e CIO” · “Modelo comercial: parte fixa + êxito sobre o benefício” · “Encaixe: em parceria com a área tributária da A&M”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo não abre este produto; só o pilar)

### Ficha 1.7 · AI Value & Governance Office (Criar com IA)

- **id:** `ai-value-governance-office` · **Pilar:** 1 · **Nasce de:** Novo · produto com IA
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_1.7.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Setup: 8 semanas” · “Operação: 6–12 meses” · etapas S1–2 … Mensal | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| 56% dos CEOs sem retorno financeiro com IA | KPI | fato com fonte | PwC, 29ª CEO Survey (jan/2026) | a verificar | manter |  |
| 27% das empresas no Brasil com governança de IA madura | KPI | fato com fonte | Deloitte State of AI 2026 | verificado | manter |  |
| >40% dos projetos agênticos serão cancelados até 2027 | KPI | fato com fonte | Gartner (25/06/2025), previsão | verificado | corrigir redação | Dizer “previsão do Gartner”. |
| “Assinatura com 3 níveis: Essencial · Avançado · Regulado” | como vira produto | desenho nosso | Desenho nosso |  | trocar por palavras | “níveis de assinatura (do essencial ao regulado)”. |
| “MIT NANDA: 95% das organizações sem impacto mensurável em P&L com GenAI” | Por que A&M | fato com fonte | MIT NANDA via imprensa (ago/2025) | a verificar | mover para o verso |  |
| “meta global da A&M de 50% da receita ligada a IA até 2028” | Por que A&M | fato com fonte | Bloomberg (mai/2026) | verificado | corrigir redação | “segundo a Bloomberg”. |
| “PL 2338 com votação prevista após as eleições de out/2026” | notas | fato com fonte | MobileTime (24/08/2026) | a verificar | verificar antes de usar | Hoje é 29/10/2026: atualizar o status. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| P&L | tagline e Por que A&M | resultado |
| ROI | entregas e etapas | retorno |
| CRO | comprador | diretor de riscos |
| PL 2338 · ANPD | pitch, problema e notas | projeto de lei de IA (PL 2338) · Autoridade Nacional de Proteção de Dados |
| ISO/IEC 42001 · NIST AI RMF · RACI | pitch e como vira produto | norma internacional de gestão de IA · guia de risco de IA do NIST · matriz de responsabilidades |
| FinOps de IA · tokens · shadow AI · Setup | ferramentas, entregas e IA | gestão do custo de IA · uso de modelos · uso de IA fora do controle da TI · implantação |
| GenAI · KPIs · LLM | Por que A&M e etapas | IA generativa · indicadores · modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Do piloto ao P&L: a torre que governa valor, risco e custo da IA” | “Do piloto ao resultado: quem decide que IA escala, que IA para e quanto ela custa”. |
| Diferencial: “unir valor + governança + custo, com accountability de operador” | “Um só escritório responde por valor, risco e custo da IA — e presta contas ao conselho.” |

**Lógica**

- “Divisão de papéis com a frente Data & IA da A&M (a alinhar)”: nome interno e ponto aberto. → **Verso: “a confirmar com a prática de dados e IA da A&M”.**
- Três KPIs fortes (56%, 27%, >40%): bom; o 56% repete a ficha 1.1. → **Escolher onde cada número aparece.**

**Quebras (medidas)**

- Quebras curtas: 12 · viúvas: 5 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 39 px.
- Exemplos: “…nuvem)” em “Painel de valor (ROI por caso) e de custo (tokens, nuvem)” · “…responsável” em “Política e comitê de IA responsável” · “…controles” em “Classificação de risco e controles” · “…fornecedores” em “Casos de uso, modelos, agentes e fornecedores” · “…Regulado” em “Assinatura com 3 níveis: Essencial · Avançado · Regulado”

**Sugestão para a V6**

- kpis: [“27%”, “das empresas no Brasil têm governança de IA madura”, “governanca-ia-madura-27”] ; [“>40%”, “dos projetos de IA agêntica serão cancelados até o fim de 2027 (previsão)”, “agentic-cancelados-40”]
- meta: “Formato: escritório instalado e operado pela A&M, por assinatura” · “Comprador: CEO, CFO, CIO e diretor de riscos” · “Modelo comercial: assinatura por nível” · “Encaixe: nasce do 1.2; conversa com a área de dados e IA da A&M”
- steps: rótulos “1”…“5”
- jogo: `mesa-do-conselho` (o jogo abre este produto)

### Ficha 2.1 · AI-Accelerated Sourcing & Vendor Selection (Aprimorar com IA)

- **id:** `ai-sourcing-vendor-selection` · **Pilar:** 2 · **Nasce de:** IT Sourcing (Software & Vendor) Selection
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.1.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 5–8 semanas” · etapas S1 … S7–8 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “15 dias a menos no ciclo de compra com IA (Vertice)” | KPI | fato com fonte | Procurement Magazine (dado do fornecedor) | fraco | remover |  |
| “100% requisitos rastreáveis até a decisão” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “3 cláusulas câmbio · saída · reajuste sempre negociadas” | KPI | desenho nosso | Desenho nosso |  | trocar por palavras | Entrega: “contrato com proteção de câmbio, saída e reajuste”. |
| “RFPs de 3–6 meses” | problema | sem base | Sem fonte |  | trocar por palavras | “Concorrências que levam meses”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| RFP(s) | pitch, problema, entregas | concorrência |
| SLAs | etapas | níveis de serviço |
| ITSM · CRM · HCM | para quem é e como vira produto | gestão de serviços de TI · sistema de clientes · sistema de RH |
| long-list · short-list · term sheet · lock-in | entregas e problema | lista ampla · lista curta · termos principais do contrato · dependência de fornecedor |
| PE · LLM | para quem é e ferramentas | fundos de private equity · modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Mercado: “ISG e Gartner em sourcing advisory (não verificado)” | Tirar da ficha; no verso, como ponto a verificar. |

**Lógica**

- Nenhum fato de mercado sustenta a ficha (o único é do fornecedor Vertice). → **Pode ficar sem KPI (0 a 3 permitido); valor em palavras: independência de fornecedor.**

**Quebras (medidas)**

- Quebras curtas: 8 · viúvas: 4 · rótulos abaixo de 11 px: 26 · vazio na coluna direita: 2 px.
- Exemplos: “…roteirizadas” em “Respostas pontuadas e demos roteirizadas” · “…contratação” em “Recomendação e plano de contratação” · “…contrato” em “Compara cláusulas com o padrão DTS de contrato” · “…preço.” em “Dados: Processos, requisitos, propostas de fornecedores, con”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: seleção de escopo fechado, por categoria” · “Comprador: CIO, Compras e CFO” · “Modelo comercial: preço fechado por categoria + bônus pela economia negociada” · “Encaixe: abre 2.2 e 4.4”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo não abre este produto; só o pilar)

### Ficha 2.2 · ERP & Tax Reform Readiness (Aprimorar com IA)

- **id:** `erp-tax-reform-readiness` · **Pilar:** 2 · **Nasce de:** ERP Readiness & Gap Analysis
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 4–8 semanas” · etapas S1 … S7–8 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “01/01/2027 · CBS plena: virada crítica dos sistemas” | KPI | fato com fonte | LC 214/2025 | verificado | manter | kpi: [“01/01/2027”, “a CBS passa a valer plenamente (Lei Complementar 214/2025)”, “cbs-plena-2027”]. |
| “2027 · fim da manutenção padrão do SAP ECC, extensível a 2030” | KPI | fato com fonte | SAP via Baguete | verificado | manter | kpi: [“2027”, “termina a manutenção padrão da versão antiga do ERP da SAP (ECC), extensível a 2030”, “sap-ecc-2027”]. |
| “37% das empresas ainda no estágio inicial de adequação” | KPI | fato com fonte | PwC “Tributos no centro” (31/10/2025) | divergente | corrigir redação | “37% ainda em análise inicial do impacto”. |
| “Reforma Tributária (CBS/IBS, 2026–2033)” · “Dois regimes em paralelo até 2033” | pitch e problema | fato com fonte | EC 132/2023; LC 214/2025 | verificado | manter |  |
| “Janela: 4T26–2027 e 2ª onda em 2028–29 (IBS) (proposta DTS)” | como vira produto | desenho nosso | Leitura nossa |  | trocar por palavras | “janela de 2027 e segunda onda na transição do IBS”. |
| “53,5% preferem apurar no ERP” | notas | fato com fonte | Monitor Mercantil (~set/2025) | a verificar | mover para o verso |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CBS/IBS | pitch, IA, KPI | novos tributos sobre consumo (CBS e IBS) |
| SAP ECC · S/4HANA · TOTVS | tagline, pitch, para quem é | versão antiga do ERP da SAP (ECC) · versão atual (S/4HANA) · TOTVS |
| ABAP | dados | código customizado do SAP |
| fit-gap · fit-to-standard | pitch, entregas, etapas | aderência ao padrão do ERP |
| cutover | entregas e etapas | virada |
| TMO · Migration Assurance | como vira produto | escritório de transformação (2.3) · Complex Migration Assurance (4.4) |
| Head Tax · A&M Tax · LLM | comprador, formato e ferramentas | diretor tributário · área tributária da A&M · modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Diferencial: “o lado sistêmico (ERP, dados, cutover)” | “As quatro grandes entram pelo tributário; nós respondemos pelo sistema: ERP, dados e virada.” |

**Lógica**

- Bons KPIs (lei e SAP); o 37% precisa de redação correta. → **Ver fato pwc-reforma-37; alternativa: 70% citam a TI entre as áreas mais afetadas (a verificar).**

**Quebras (medidas)**

- Quebras curtas: 19 · viúvas: 7 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 39 px.
- Exemplos: “…cutover” em “Plano de adequação e de cutover” · “…fiscais” em “Entidades, operações e sistemas fiscais” · “…ERP” em “Compara processos reais (logs) ao padrão do ERP” · “…CBS/IBS” em “Gera casos de teste fiscais a partir das regras de CBS/IBS” · “…fonte” em “Responde dúvidas do time sobre as regras, com fonte” · “…porte” em “Pacote ‘Reforma Pronta’ com escopo fixo por porte”

**Sugestão para a V6**

- kpis: [“01/01/2027”, “a CBS passa a valer plenamente (Lei Complementar 214/2025)”, “cbs-plena-2027”] ; [“2027”, “termina a manutenção padrão do SAP ECC, extensível a 2030”, “sap-ecc-2027”]
- meta: “Formato: diagnóstico de prontidão, de escopo fechado” · “Comprador: CFO, CIO e diretor tributário” · “Modelo comercial: preço fechado por porte” · “Encaixe: em parceria com a área tributária da A&M; abre 2.3 e 4.4”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo abre este produto)

### Ficha 2.3 · Predictive Transformation Office (Aprimorar com IA)

- **id:** `predictive-transformation-office` · **Pilar:** 2 · **Nasce de:** TMO + Modelo de Implantação e Governança
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.3.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–24 meses” · etapas S1–2 … Fim | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “+45% estouro médio de orçamento em grandes projetos de TI” | KPI | fato com fonte | McKinsey e Oxford (2012), 5.400 projetos | verificado | corrigir redação | Dizer o ano (estudo de 2012). |
| “56% menos valor entregue que o previsto” | KPI | fato com fonte | McKinsey e Oxford (2012) | verificado | corrigir redação | Idem; não confundir com o 56% da PwC. |
| “100% das iniciativas com valor rastreado” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “Falconi (R$ 100 mi em IA)” | notas | fato com fonte | Jornal do Comércio (set/2026) | verificado | mover para o verso |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| PMO | tagline e Por que A&M | escritório de projetos |
| TMO | origem e como vira produto | escritório de transformação |
| IMO/SMO | como vira produto | escritório de integração e separação (3.3) |
| RAID logs · status reports · backlogs | dados e IA | registro de riscos e pendências · relatórios de andamento · filas de demandas |
| Jira · Azure DevOps · MS Project · ServiceNow SPM | ferramentas | nomes de ferramenta; “SPM” sem sigla |
| sponsor · LLM · Fee | comprador, ferramentas, formato | patrocinador · modelo de IA generativa · honorário |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Um PMO que antecipa o problema: governança de transformação com IA preditiva” | “Um escritório de transformação que avisa antes de o atraso virar crise”. |

**Lógica**

- “Alertar antes que o atraso vire crise” é capacidade a provar. → **No verso: o piloto mede quantas semanas de antecedência o alerta ganha (sem número inventado na ficha).**

**Quebras (medidas)**

- Quebras curtas: 8 · viúvas: 5 · rótulos abaixo de 11 px: 29 · vazio na coluna direita: 2 px.
- Exemplos: “…implantação” em “Modelo de governança e implantação” · “…valor” em “Rituais, decisões e controle de valor” · “…histórico” em “Projeta desvio de prazo e custo a partir do histórico” · “…natural” em “Responde perguntas do sponsor em linguagem natural” · “…Governança” em “Funde TMO + Modelo de Implantação e Governança”

**Sugestão para a V6**

- kpis: [“+45%”, “de estouro médio de orçamento em grandes projetos de TI (McKinsey e Oxford, 2012)”, “mckinsey-oxford-projetos”]
- meta: “Formato: escritório de transformação contínuo” · “Comprador: CEO, CIO e patrocinador do programa” · “Modelo comercial: honorário mensal por porte” · “Encaixe: ponte para 2.4 se já houver crise; base do 3.3”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo abre este produto)

### Ficha 2.4 · Tech Project Rescue (Manter · ★ A&M Signature)

- **id:** `tech-project-rescue` · **Pilar:** 2 · **Nasce de:** Project Remediation
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.4.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “diagnóstico forense em 2–3 semanas” · “Diagnóstico: 2–3 semanas” · “Recuperação: 3–9 meses” · “2–3 sem.” | pitch, formato, KPI | desenho nosso | Prazo nosso |  | remover |  |
| “>70% das iniciativas de ERP não atingirão o business case até 2027” | KPI | fato com fonte | Gartner via The Register (13/11/2025), previsão | a verificar | corrigir redação | kpi: [“>70%”, “das iniciativas recentes de ERP não devem atingir o caso de negócio até 2027 (previsão do Gartner)”, “gartner-erp-70”]. |
| “3 saídas recuperar · replanejar · encerrar” | KPI | estrutural | Contagem de opções |  | trocar por palavras | Vai para “O que o cliente recebe” (decisão entre recuperar, replanejar ou encerrar). |
| Etapas S1 · S2–3 · S3 · M1–3 · Go-live | como funciona | desenho nosso | Semanas e meses |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Go-live | etapas e problema | entrada em operação |
| re-baseline | entregas e etapas | novo plano-base |
| backlog | etapas e dados | fila de demandas |
| Disputes & Investigations da A&M | como vira produto | área de disputas da A&M (a alinhar) |
| LLM · kit forense | ferramentas | modelo de IA generativa · kit de análise forense |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Turnaround de projetos de tecnologia em crise” | “Resgate de projetos de tecnologia em crise”. |
| Mercado: “pares de turnaround e Big Four atuam em recuperação de projetos (não verificado)” | Tirar; verso como ponto a verificar. |

**Lógica**

- Signature por “DNA de turnaround”, sem um fato que mostre a história da A&M. → **Uma linha de prova (dado interno) no verso.**

**Quebras (medidas)**

- Quebras curtas: 13 · viúvas: 8 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 23 px. Palavras partidas: produto-símbolo.
- Exemplos: “…re-baseline” em “Plano de recuperação e re-baseline” · “…recuperação” em “Comando da recuperação” · “…contrato” em “Entrevistas, artefatos e contrato” · “…backlog” em “Escopo, código, testes e backlog” · “…conselho” em “Cenários e recomendação ao conselho” · “…fornecedor” em “Re-baseline, governança, fornecedor”
- Palavra partida no hífen: “produto-símbolo”.

**Sugestão para a V6**

- kpis: [“>70%”, “das iniciativas recentes de ERP não devem atingir o caso de negócio até 2027 (previsão)”, “gartner-erp-70”]
- meta: “Formato: diagnóstico forense curto e comando da recuperação” · “Comprador: CEO, CFO e conselho” · “Modelo comercial: preço fechado no diagnóstico + marcos na recuperação” · “Encaixe: sinergia com 2.2 e 4.4”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo abre este produto)

### Ficha 2.5 · AI Adoption & Change (Aprimorar com IA)

- **id:** `ai-adoption-change` · **Pilar:** 2 · **Nasce de:** Gestão de Mudanças Tech
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 8–16 semanas” · etapas S1–2 … S5–12 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “44% citam falta de conhecimento da equipe como obstáculo à IA” | KPI | fato com fonte | TI Inside (25/06/2026), dados Cetic.br | a verificar | manter | kpi: [“44%”, “das empresas que tentaram usar IA citam falta de conhecimento da equipe”, “cetic-barreira-44”]. |
| “17% das empresas (10+ empregados) usam IA” | KPI | fato com fonte | Cetic.br TIC Empresas 2025 | verificado | remover | O usuário mandou tirar % de empresas que usam IA. |
| “semanal · medição de uso real” | KPI | desenho nosso | Frequência nossa |  | remover |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| ADKAR · OCM | skills e Por que A&M | gestão de mudança |
| CHRO | comprador | diretor de RH |
| Copilot · telemetria · personas | para quem é, ferramentas, entregas | assistentes de IA · dados de uso · perfis de usuário |
| WalkMe · Whatfix · Microsoft 365 | ferramentas | nomes de ferramenta |
| LLM | ferramentas | modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Pitch: “…comprova o ganho de produtividade.” | “…mede o ganho de produtividade.” |
| Mercado: “OCM é oferta comum em Big Four e integradores (não verificado)” | Tirar; verso. |

**Lógica**

- Bônus por “meta de adoção” sem dizer qual meta. → **“bônus atrelado ao uso medido, combinado com o cliente”.**

**Quebras (medidas)**

- Quebras curtas: 14 · viúvas: 7 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 24 px.
- Exemplos: “…comunicação” em “Plano de mudança e comunicação” · “…produtividade” em “Painel de adoção e produtividade” · “…barreiras” em “Personas, impactos e barreiras” · “…comunicação” em “Ondas de adoção e comunicação” · “…cargo” em “Gera trilhas e conteúdos por persona e cargo” · “…campeões” em “Biblioteca de conteúdos e kit de campeões”

**Sugestão para a V6**

- kpis: [“44%”, “das empresas que tentaram usar IA citam falta de conhecimento da equipe”, “cetic-barreira-44”]
- meta: “Formato: programa de adoção em ondas” · “Comprador: CIO, diretor de RH e patrocinador” · “Modelo comercial: preço fechado + bônus pelo uso medido” · “Encaixe: combina com 2.6”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo não abre este produto; só o pilar)

### Ficha 2.6 · AI-Native IT Productivity (Criar com IA)

- **id:** `ai-native-it-productivity` · **Pilar:** 2 · **Nasce de:** Novo · produto com IA
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_2.6.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Piloto: 10 semanas” · “10 sem. do baseline ao piloto medido” · “Piloto padronizado de 10 semanas” · etapas S1–2 … S9–10 | formato, KPI, como vira produto, etapas | desenho nosso | Prazo nosso |  | remover | SPEC cita “piloto de 10 semanas” como proibido. |
| “Escala: ondas trimestrais” | formato | desenho nosso | Frequência nossa |  | trocar por palavras | “escala em ondas”. |
| “3 frentes · SDLC · service desk · operações (AIOps)” | KPI | estrutural | Contagem do desenho |  | trocar por palavras | Não é KPI; vai para o pitch em português. |
| “25 mil agentes de IA trabalhando ao lado de ~40 mil pessoas na McKinsey” | KPI | fato com fonte | Business Insider / HBR (jan/2026) | verificado | remover | Não prova a dor do cliente (é a força de trabalho da McKinsey): E daí fraco. |
| “11% com agentes em produção, 38% em piloto” (Deloitte Tech Trends 2026) | notas | fato com fonte | Fonte secundária (Libertify) | fraco | mover para o verso |  |
| “Agentes resolvem tickets de nível 1” | papel da IA | sem base | Capacidade a provar |  | trocar por palavras | “Agentes respondem aos chamados mais simples, com revisão humana”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| SDLC · AIOps · DORA | KPI, entregas, etapas, skills | ciclo de desenvolvimento de software · operação de TI com IA · (remover) |
| ITSM · service desk | skills e tagline | gestão de serviços de TI · central de atendimento |
| PI · guardrails | entregas e problema | propriedade intelectual · regras de proteção |
| baseline · rollout · backlog · tickets | etapas e para quem é | linha de base · expansão · fila de demandas · chamados |
| GitHub Copilot · Claude Code · Gemini Code Assist · ServiceNow · Jira Service Management | ferramentas | nomes de ferramenta (manter 2 ou 3) |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Pitch: “…liberando capacidade e reduzindo custo.” | “…e mede quanto tempo da equipe a IA libera — em custo ou em entregas.” |

**Lógica**

- Nenhum jogo de entrada da V6 abre o 2.6 (Pré-mortem abre 2.2, 2.3 e 2.4). → **Registrar no verso do slide 19 ou aceitar.**
- Sem fato que prove a dor (TI que não mede produtividade). → **Ficha pode ficar sem KPI; ou usar dado de mercado verificado.**

**Quebras (medidas)**

- Quebras curtas: 12 · viúvas: 5 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 1 px.
- Exemplos: “…tickets)” em “Linha de base de produtividade (fluxo, DORA, tickets)” · “…soluções” em “Agentes resolvem tickets de nível 1 e sugerem soluções” · “…qualidade” em “Medição automática de produtividade e qualidade” · “…fixas” em “Piloto padronizado de 10 semanas com métricas fixas” · “…medida” em “Fixo + bônus sobre capacidade liberada e medida”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: piloto com métricas combinadas e escala em ondas” · “Comprador: CIO e CTO” · “Modelo comercial: preço fechado + bônus pelo ganho medido” · “Encaixe: alimenta 1.4 e 1.5”
- steps: rótulos “1”…“5”
- jogo: `pre-mortem-2027` (o jogo não abre este produto; só o pilar)

### Ficha 3.1 · AI-Powered Tech Due Diligence (Aprimorar com IA · ★ A&M Signature)

- **id:** `ai-tech-due-diligence` · **Pilar:** 3 · **Nasce de:** IT Due Diligence (Buy Side) + IT Due Diligence (Sell Side)
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_3.1.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Red flag em 1 semana, DD completa em 3” · “Duração: 1–4 semanas por nível” · “Red flag (1 sem.) · Completa (3 sem.)” | tagline, formato, como vira produto | desenho nosso | Prazo nosso |  | remover |  |
| “50% dos deals no Brasil com PE/VC em 2025” | KPI | fato com fonte | KPMG (mar/2026) | divergente | corrigir redação | “fundos participaram de metade das transações de 2025”; o usuário pediu para tirar este número do slide de forças. |
| “274 deals de TI no 1S26: setor nº 1” | KPI | fato com fonte | KPMG (ago/2026) | verificado | manter | kpi: [“274”, “transações de empresas de TI no 1º semestre de 2026: o setor nº 1”, “kpmg-ti-setor-1”]. |
| “>75% menos tempo de avaliação de código em DD com CAST Highlight (caso EY)” | KPI | fato com fonte | Estudo de caso do fornecedor CAST, sem data | fraco | remover |  |
| “DiligenceSquared faz DD com agentes por ~US$ 50 mil” | Por que A&M | fato com fonte | TechCrunch (05/03/2026) | a verificar | manter | Atribuído a “FT/TechCrunch”: o FT é da Bain; TechCrunch é da DiligenceSquared. |
| Etapas D1–3 · D3–10 · D7–14 · D14–20 · Pós | como funciona | desenho nosso | Dias |  | trocar por palavras |  |
| “Plano de 100 dias (buy)” | entregas | desenho nosso | Termo de mercado |  | manter | Como nome do método. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| DD | tagline, pitch, IA | diligência |
| PE/VC · PE | KPI e comprador | fundos de private equity e venture capital |
| VDR | ferramentas | data room |
| buy-side · sell-side · vendor readiness · Vendor DD report | pitch e entregas | lado comprador · lado vendedor · preparação do vendedor · relatório de diligência do vendedor |
| Red flags · valuation · standalone · capex · cyber | entregas e problema | alertas críticos · preço da empresa · custo de operar sozinha · investimento · segurança cibernética |
| AI diligence · open source · Corporate development | IA e para quem é | diligência de IA · código aberto · área de fusões e aquisições |
| 1S26 | KPI | 1º semestre de 2026 |
| A&M Assist · DiligenceGPT | Por que A&M | ferramentas de IA da A&M global para diligência (a confirmar para o Brasil) |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Red flag em 1 semana, DD completa em 3: código, dados, cyber e IA no mesmo relatório” | “Diligência de tecnologia com IA lendo o data room e o código — num só relatório”. |
| Diferencial: “DD com IA virou padrão; o diferencial migra para DD + 100 dias + execução” | “Diligência com IA virou padrão; o que diferencia é seguir com o cliente depois da assinatura.” |

**Lógica**

- Os três KPIs falam de volume de transações e de um caso de fornecedor; nenhum prova a dor (prazo curto, data room enorme). → **Um fato: TI é o setor com mais transações (274 no 1º semestre de 2026).**
- Signature e “aprimorar” ao mesmo tempo: ok, mas explicar no verso.

**Quebras (medidas)**

- Quebras curtas: 12 · viúvas: 6 · rótulos abaixo de 11 px: 30 · vazio na coluna direita: 23 px.
- Exemplos: “…valuation” em “Red flags e impacto no valuation” · “…sinergias” em “Custos de standalone, capex de recuperação e sinergias” · “…arquitetura” em “Avaliação de código e arquitetura” · “…diligence)” em “Avalia a capacidade real de IA do alvo (AI diligence)” · “…gestão” em “Rascunha o relatório e as perguntas para a gestão” · “…fundos” em “Programa anual com desconto por volume para fundos”

**Sugestão para a V6**

- kpis: [“274”, “transações de empresas de TI no 1º semestre de 2026: o setor nº 1”, “kpmg-ti-setor-1”]
- meta: “Formato: diligência em níveis de profundidade, de escopo fechado” · “Comprador: fundos, área de fusões e aquisições e bancos” · “Modelo comercial: preço fechado por nível; programa contínuo para fundos” · “Encaixe: abre 3.2, 3.4 e 3.5”
- steps: rótulos “1”…“5”
- jogo: `jogo-do-dia-1` (o jogo abre este produto)

### Ficha 3.2 · Integration & Separation Blueprint (Aprimorar com IA)

- **id:** `integration-separation-blueprint` · **Pilar:** 3 · **Nasce de:** IT Integration & Separation Planning + IT Separation Strategy & Design
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_3.2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 4–8 semanas” · etapas S1 … S8 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “50–60% das iniciativas de sinergia dependem fortemente de TI” | KPI | fato com fonte | McKinsey (2011) | verificado | corrigir redação | Dizer o ano (2011) ou trocar por fato recente. |
| “100% serviços compartilhados cobertos por TSA” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “até 2027 · separação Raízen Energia × Combustíveis anunciada” | KPI | fato com fonte | Forbes (mai/2026) | verificado | manter | É caso, não indicador: kpi [“2027”, “prazo anunciado para a Raízen se separar em duas empresas”, “raizen-separacao-2027”]. |
| Casos MBRF (set/2025), Petz+Cobasi (dez/2025), Braskem (abr/2026), Raízen (2027) | notas | fato com fonte | Imprensa (ver registro) | verificado | mover para o verso |  |
| “Plano de Dia 1 e Dia 100” | entregas e etapas | desenho nosso | Termo de mercado |  | manter | Explicar Dia 1 / Dia 100 na 1ª menção. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TSA(s) | tagline, pitch, entregas | contrato de serviços de transição |
| carve-out | tagline e Por que A&M | separação |
| IMO/SMO | como vira produto | escritório de integração e separação (3.3) |
| EA · LeanIX · Ardoq | ferramentas | arquitetura corporativa · nomes de ferramenta |
| change of control · standalone · one-off · schedules | IA, entregas | mudança de controle · custo de operar sozinha · custo único · anexos |
| ACDC · TSE | Por que A&M | siglas de ofertas da Deloitte e da EY: tirar |
| PE | comprador | fundos de private equity |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Dia 1 sem susto: desenho de integração ou carve-out de TI, TSAs e custos” | “A TI do primeiro dia e do estado final, desenhada antes da assinatura”. |

**Lógica**

- Usa casos reais (MBRF, Raízen) que não são clientes da A&M: pode sugerir envolvimento. → **Escrever “exemplo público de mercado”.**

**Quebras (medidas)**

- Quebras curtas: 8 · viúvas: 4 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 23 px. Palavras partidas: EY-Parthenon.
- Exemplos: “…clonar)” em “Inventário e disposição de aplicações (manter, migrar, clona” · “…one-off” em “Custos de standalone e one-off” · “…contratos” em “Aplicações, dados, infra, contratos” · “…padrões” em “Sugere a disposição por sistema com base em padrões”
- Palavra partida no hífen: “EY-Parthenon”.

**Sugestão para a V6**

- kpis: [“2027”, “prazo anunciado para a Raízen se separar em duas empresas”, “raizen-separacao-2027”]
- meta: “Formato: desenho de escopo fechado, antes da assinatura” · “Comprador: comprador ou vendedor e fundos” · “Modelo comercial: preço fechado por complexidade” · “Encaixe: abre 3.3”
- steps: rótulos “1”…“5”
- jogo: `jogo-do-dia-1` (o jogo abre este produto)

### Ficha 3.3 · Integration & Separation Office (IMO/SMO) (Manter)

- **id:** `integration-separation-office` · **Pilar:** 3 · **Nasce de:** IT Integration Management Office + IT Separation Management Office
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_3.3.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 3–18 meses” · etapas S1–2 · Até D1 · D1–100 · M3–18 · Fim | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “0 interrupções críticas no Dia 1 (meta)” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “1 painel · marcos, riscos e sinergias” | KPI | desenho nosso | Desenho nosso |  | remover |  |
| “TSA encerrada no prazo contratado” | KPI | estrutural | Sem número |  | trocar por palavras | Vira promessa do produto em palavras (“sair dos contratos de transição no prazo”). |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| (IMO/SMO) no nome | nome do produto | tirar a sigla: “Integration & Separation Office” |
| IMO · SMO · TSA(s) | pitch, entregas, como vira produto | escritório de integração · de separação · contrato de serviços de transição |
| cutover · Hypercare · quick wins · runbooks | pitch, etapas, ferramentas | virada · acompanhamento pós-virada · primeiros ganhos · roteiros de virada |
| signing · closing · buy-and-build · PE · Fee | para quem é e formato | assinatura · fechamento · compras sucessivas · fundos · honorário |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Diferencial: “postura de operador em carve-outs complexos” | “Comandamos a separação como se fôssemos da empresa.” (com prova no verso) |

**Lógica**

- Status “Manter” para um produto que funde dois serviços “Fundir” do raio-X. → **Explicar no verso (reconciliação).**
- Sem fato de mercado. → **Pode ficar sem KPI.**

**Quebras (medidas)**

- Quebras curtas: 9 · viúvas: 7 · rótulos abaixo de 11 px: 29 · vazio na coluna direita: 24 px.
- Exemplos: “…cutover” em “Plano integrado e cutover” · “…deal” em “Relatórios ao comitê do deal” · “…integrado” em “Governança e plano integrado” · “…cutover” em “Reaproveita a predição de risco do 2.3 no cutover” · “…blueprint” em “Gera runbooks e checklists a partir do blueprint” · “…direções” em “Funde IMO + SMO: mesmo método, duas direções”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: escritório de integração ou separação, do primeiro dia à saída dos contratos de transição” · “Comprador: comprador ou vendedor e fundos” · “Modelo comercial: honorário mensal + marcos + bônus por sair dos contratos de transição no prazo” · “Encaixe: combina com 3.4; usa o painel do 2.3”
- steps: rótulos “1”…“5”
- jogo: `jogo-do-dia-1` (o jogo abre este produto)

### Ficha 3.4 · Tech Value Creation Plan (Manter)

- **id:** `tech-value-creation-plan` · **Pilar:** 3 · **Nasce de:** IT Synergies & Value Creation
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_3.4.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 4–6 semanas + acompanhamento” · etapas S1–2 … Trimestral · Saída | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “100 dias · plano de captura” | KPI | desenho nosso | Termo de mercado |  | trocar por palavras | Não é KPI. |
| “em R$ · sinergia por alavanca, com dono” | KPI | estrutural | Sem número |  | trocar por palavras | Vai para entregas. |
| “R$ 485 mi/ano · sinergias anunciadas na MBRF” | KPI | fato com fonte | Giro News (2025) | a verificar | corrigir redação | Exemplo público (não cliente da A&M): “exemplo de mercado”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| EBITDA | tagline | resultado operacional (EBITDA) |
| PE · PE value creation | comprador e Por que A&M | fundos de private equity · criação de valor em fundos |
| TBM · Baseline · equity story | skills, etapas, entregas | gestão financeira de TI · linha de base · argumento de venda da empresa |
| Private Equity Performance Improvement | Por que A&M | nome interno de prática da A&M: “a área da A&M que melhora empresas de fundos” |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Mercado: “comum em Big Four e estratégia (PE value creation) (não verificado)” | Tirar; verso. |

**Lógica**

- KPI de MBRF não prova que a A&M capture sinergias. → **Trocar pelo fato da McKinsey (TI pesa nas sinergias, 2011) ou ficar sem KPI.**

**Quebras (medidas)**

- Quebras curtas: 8 · viúvas: 2 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 24 px.
- Exemplos: “…captura” em “Acompanhamento da captura” · “…licenças” em “Encontra sobreposição de fornecedores e licenças”

**Sugestão para a V6**

- kpis: [“R$ 485 mi/ano”, “de sinergias anunciadas na fusão MBRF (exemplo de mercado)”, “mbrf-sinergias-485”]
- meta: “Formato: plano de captura de escopo fechado + acompanhamento” · “Comprador: fundos e empresas compradoras” · “Modelo comercial: preço fechado + êxito sobre a sinergia capturada” · “Encaixe: recorrência via 3.5”
- steps: rótulos “1”…“5”
- jogo: `jogo-do-dia-1` (o jogo não abre este produto; só o pilar)

### Ficha 3.5 · PE Tech Value Radar (Criar com IA)

- **id:** `pe-tech-value-radar` · **Pilar:** 3 · **Nasce de:** Novo · produto com IA (absorve o IT M&A Playbook como ativo)
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_3.5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Assinatura anual por fundo” · etapas M1 · M1–2 · Trimestral · Sob demanda · Pré-saída | formato e etapas | desenho nosso | Frequências nossas |  | trocar por palavras |  |
| “50% do M&A brasileiro com PE/VC” | KPI | fato com fonte | KPMG (mar/2026) | divergente | corrigir redação | Participação de fundos; usar no máximo uma vez no deck. |
| “trimestral · Tech Health Score por investida” | KPI | desenho nosso | Frequência nossa |  | remover |  |
| “1 tela · portfólio inteiro comparável” | KPI | desenho nosso | Desenho nosso |  | remover |  |
| “Primeiro produto 100% recorrente do DTS” | como vira produto | sem base | Afirmação sem base |  | trocar por palavras | “produto por assinatura”. |
| “hipótese a validar em 3–5 entrevistas com sócios de operações de fundos” | notas | desenho nosso | Tamanho de amostra nosso |  | trocar por palavras | “entrevistas com sócios de operações de fundos”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| PE · VC · PE/VC | nome, comprador, KPI | fundos de private equity e venture capital (o nome do produto fica) |
| Tech Health Score | KPI e entregas | nota de saúde de tecnologia |
| upsell · Exit readiness · Vendor DD | formato, entregas, etapas | venda adicional · preparação para a venda · diligência preparada pelo vendedor |
| family offices · cyber · LLM | para quem é, dados, ferramentas | family offices · segurança cibernética · modelo de IA generativa |
| DD, Value Creation, Spend, Interim | etapa Ação | nomes curtos dos produtos 3.1, 3.4, 1.5 e 1.3 |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Mercado: “não foi encontrado produto equivalente em formato de assinatura entre as Big Four no Brasil (não verificado)” | Verso: “não encontramos na pesquisa; a confirmar com fundos”. |

**Lógica**

- Nenhum jogo de entrada da V6 abre o 3.5 (Jogo do Dia 1 abre 3.1, 3.2 e 3.3). → **Aceitar ou registrar no verso do slide 19.**
- “Relacionamento contínuo com o canal mais estratégico da A&M (PE)” é afirmação interna. → **Verso.**

**Quebras (medidas)**

- Quebras curtas: 10 · viúvas: 4 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 24 px.
- Exemplos: “…A&M” em “Plano de ação e acionamento de produtos A&M” · “…Interim” em “DD, Value Creation, Spend, Interim” · “…automaticamente” em “Pontua, compara e explica variações automaticamente” · “…projetos” em “Preço por empresa monitorada + upsell de projetos”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: assinatura por fundo, com revisão periódica do portfólio” · “Comprador: sócios de operações de fundos” · “Modelo comercial: preço por empresa monitorada + venda de projetos” · “Encaixe: aciona 3.1, 3.4, 1.5 e 1.3”
- steps: rótulos “1”…“5”
- jogo: `jogo-do-dia-1` (o jogo não abre este produto; só o pilar)

### Ficha 4.1 · AI-Ready Enterprise Architecture (Aprimorar com IA)

- **id:** `ai-ready-enterprise-architecture` · **Pilar:** 4 · **Nasce de:** Strategy Architecture
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.1.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–8 semanas” · “6–8 sem. para a arquitetura-alvo” · etapas S1–2 … Contínuo | formato, KPI, etapas | desenho nosso | Prazo nosso |  | remover |  |
| “em R$ · dívida técnica quantificada” | KPI | estrutural | Sem número |  | trocar por palavras | Vai para entregas. |
| “1 repositório vivo de arquitetura” | KPI | desenho nosso | Desenho nosso |  | remover |  |
| “Ardoq diz automatizar ~40% do trabalho rotineiro” | Por que A&M | fato com fonte | Ardoq (dado do fornecedor) | fraco | corrigir redação | “segundo a Ardoq”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| CMDB | dados e IA | base de configuração de TI |
| EA | ferramentas | arquitetura corporativa |
| TOGAF | skills | método de arquitetura corporativa (TOGAF) |
| TST (EY) | Por que A&M | tirar a sigla |
| SAP LeanIX · Ardoq · Bizzdesign · AI Agent Hub | ferramentas | nomes de ferramenta |
| LLM · Cloud | ferramentas e skills | modelo de IA generativa · nuvem |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Diferencial: “arquitetura ligada a valor e IA (hipótese)” | “Arquitetura que diz quanto custa a dívida técnica e o que fazer primeiro.” |

**Lógica**

- Sem fato de mercado. → **Pode ficar sem KPI.**
- Nenhum jogo da V6 abre o 4.1 (Exercício de Crise abre 4.5, 4.6 e 4.3). → **Aceitar.**

**Quebras (medidas)**

- Quebras curtas: 11 · viúvas: 3 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 23 px.
- Exemplos: “…quantificada” em “Dívida técnica quantificada” · “…integração” em “Dívida técnica, dados, integração” · “…diagramas.” em “Ferramentas: Ferramentas de EA (ex.: SAP LeanIX, Ardoq, Bizz”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: desenho de escopo fechado; repositório mantido por assinatura (opcional)” · “Comprador: CIO, CTO e arquitetura” · “Modelo comercial: preço fechado” · “Encaixe: base para 4.2, 4.6 e 1.2”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo não abre este produto; só o pilar)

### Ficha 4.2 · Application Portfolio Rationalization (Aprimorar com IA)

- **id:** `application-portfolio-rationalization` · **Pilar:** 4 · **Nasce de:** Strategy Application
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.2.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–8 semanas” · “6–8 sem. · decisão por aplicação” · etapas S1–2 … Contínuo | formato, KPI, etapas | desenho nosso | Prazo nosso |  | remover |  |
| “TIME · tolerar · investir · migrar · eliminar” | KPI e entregas | estrutural | Método de classificação (sigla em inglês) |  | trocar por palavras | Não é KPI; “classificação tolerar, investir, migrar ou eliminar”. |
| “em R$ · economia por aplicação aposentada” | KPI | estrutural | Sem número |  | trocar por palavras |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| TIME | KPI e entregas | tolerar · investir · migrar · eliminar |
| SSO | ferramentas, dados, IA | registros de acesso |
| APM (ServiceNow APM) | ferramentas | gestão do portfólio de aplicações |
| Shadow IT | problema | sistemas contratados fora da TI |
| LLM | ferramentas | modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Menos sistemas, menos custo, mais clareza” | “Desligar o que ninguém usa e liberar orçamento para modernizar”. |
| Mercado: “oferta comum em integradores e Big Four (não verificado)” | Tirar; verso. |

**Lógica**

- Sem fato de mercado. → **Pode ficar sem KPI.**

**Quebras (medidas)**

- Quebras curtas: 9 · viúvas: 3 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 24 px.
- Exemplos: “…redundâncias” em “Classifica funcionalidades e detecta redundâncias” · “…justificativa” em “Sugere a classificação TIME com justificativa” · “…(modernização)” em “Combina com 1.5 (economia) e 4.6 (modernização)”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: racionalização de escopo fechado” · “Comprador: CIO e CFO” · “Modelo comercial: preço fechado + êxito opcional” · “Encaixe: combina com 1.5 e 4.6”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo não abre este produto; só o pilar)

### Ficha 4.3 · Cloud & AI Infrastructure Economics (Aprimorar com IA)

- **id:** `cloud-ai-infrastructure-economics` · **Pilar:** 4 · **Nasce de:** Infrastructure Management
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.3.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–10 semanas” · etapas S1–2 … S9–10 | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “8–15× alta de licenças VMware pós-Broadcom” | KPI | fato com fonte | Baguete (data aproximada) | fraco | verificar antes de usar | Repete slide 16 e ficha 1.5. |
| “R$ 3,9 bi bancos em migração para cloud em 2026, +30%” | KPI | fato com fonte | Febraban/Deloitte via Forbes (jun/2026) | a verificar | manter | kpi: [“+30%”, “no gasto dos bancos com migração para a nuvem em 2026 (R$ 3,9 bi)”, “febraban-tech-50-4”]. |
| “20–30% otimização de nuvem com FinOps maduro” | KPI | fato com fonte | IT Forum | fraco | remover |  |
| “AWS Transform faz migração sem custo e cobra US$ 0,035 por minuto de agente” | Por que A&M | fato com fonte | AWS / Qovery (set/2026) | fraco | corrigir redação | Fato útil: migração sem custo (oferta do fornecedor). |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| GPU | tagline, pitch, entregas | processadores para IA |
| FinOps | tagline, KPI, entregas | gestão do custo de nuvem |
| TCO | entregas, ferramentas | custo total |
| VMs · right-sizing · tokens · on-prem | dados, IA, entregas | máquinas virtuais · ajuste de capacidade · uso de modelos · data center próprio |
| hyperscalers · TBM · Redata | ferramentas, Por que A&M, para quem é | provedores de nuvem · gestão financeira de TI · regime especial para data centers |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Infraestrutura certa para a era da IA: nuvem, VMware, GPU e FinOps” | “Decidir onde roda cada sistema — nuvem, data center ou saída da VMware — pelo custo total”. |

**Lógica**

- Três KPIs, dois fracos e um repetido de outras fichas. → **Um fato forte (+30% bancos) e o resto em palavras.**

**Quebras (medidas)**

- Quebras curtas: 10 · viúvas: 3 · rótulos abaixo de 11 px: 28 · vazio na coluna direita: 23 px. Palavras partidas: right-sizing.
- Exemplos: “…VMware” em “Plano de saída ou renegociação de VMware” · “…GPU)” em “Projeta custo de cargas de IA (tokens e GPU)” · “…reaproveitáveis” em “Modelo de TCO e playbook VMware reaproveitáveis”
- Palavra partida no hífen: “right-sizing”.

**Sugestão para a V6**

- kpis: [“+30%”, “no gasto dos bancos com migração para a nuvem em 2026 (R$ 3,9 bi)”, “febraban-tech-50-4”]
- meta: “Formato: decisão de infraestrutura, de escopo fechado” · “Comprador: CIO, CFO e infraestrutura” · “Modelo comercial: preço fechado + parte sobre a economia” · “Encaixe: integra com 1.5”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo abre este produto)

### Ficha 4.4 · Complex Migration Assurance (Manter)

- **id:** `complex-migration-assurance` · **Pilar:** 4 · **Nasce de:** Complex Migrations Support
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.4.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “100% dos dados críticos reconciliados” | KPI | desenho nosso | Meta nossa |  | remover |  |
| “Go/No-go com critérios objetivos” | KPI | estrutural | Sem número |  | trocar por palavras | Vai para entregas. |
| “1 voz independente do integrador” | KPI | desenho nosso | Desenho nosso |  | trocar por palavras | Vai para o pitch. |
| “Duração: a da migração” · “Fee mensal por fase” | formato | estrutural | Sem número |  | manter | “honorário mensal por fase”. |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| Go/No-go | KPI e etapas | decisão de seguir ou adiar |
| QA | skills | garantia de qualidade |
| assurance | pitch e entregas | revisão independente |
| Build · Hypercare · Pré-go-live | etapas | construção · acompanhamento pós-virada · antes da entrada em operação |
| core | pitch | sistema central |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Tagline: “Garantia independente para migrações que não podem dar errado” | “Uma revisão independente para migrações que não podem falhar”. |
| Mercado: “assurance independente é nicho (não verificado)” | Tirar; verso. |

**Lógica**

- Sem fato de mercado; os 3 KPIs são desenho. → **Pode ficar sem KPI.**

**Quebras (medidas)**

- Quebras curtas: 7 · viúvas: 3 · rótulos abaixo de 11 px: 27 · vazio na coluna direita: 1 px.
- Exemplos: “…critérios” em “Plano de assurance e critérios” · “…testes” em “Revisões de qualidade e testes” · “…negócio” em “Gera casos de teste a partir de regras de negócio”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: revisão independente durante toda a migração” · “Comprador: CIO, CFO e conselho” · “Modelo comercial: honorário mensal por fase” · “Encaixe: complementa 2.2, 3.3 e 4.6”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo não abre este produto; só o pilar)

### Ficha 4.5 · IT Resilience & Recovery (Aprimorar com IA)

- **id:** `it-resilience-recovery` · **Pilar:** 4 · **Nasce de:** IT Resilience & Business Continuity Planning (vem do Pilar 1)
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.5.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Duração: 6–10 semanas” · “Exercícios anuais” · etapas S1–2 … Anual | formato e etapas | desenho nosso | Prazo e frequência nossos |  | trocar por palavras | “exercícios periódicos”. |
| “~R$ 800 mi desviados no ataque à C&M Software (jul/2025)” | KPI | fato com fonte | Jornal Opção / Finsiders | a verificar | manter | kpi: [“~R$ 800 mi”, “desviados no ataque à C&M Software (jul/2025)”, “ataque-cm-800mi”]. |
| “R$ 710 mi no ataque à Sinqia (ago/2025)” | KPI | fato com fonte | Tecnoblog | a verificar | manter |  |
| “CMN 5.274 endurece cyber e cloud no financeiro (dez/2025)” | KPI e pitch | fato com fonte | Resolução CMN 5.274 (18/12/2025) | verificado | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| BIA · DR | pitch, entregas, etapas | análise de impacto no negócio · recuperação de desastre |
| CMN 4.893 / 5.274 | pitch e KPI | Resoluções do Conselho Monetário Nacional |
| CMDB · SLA · cyber · ransomware | ferramentas, dados, IA, problema | base de configuração de TI · nível de serviço · segurança cibernética · sequestro de dados |
| CRO · COO | comprador | diretor de riscos · diretor de operações |
| tabletop | entregas e etapas | simulação de mesa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Mercado: “Big Four têm práticas fortes de cyber e resiliência (não verificado)” | Tirar; verso. |

**Lógica**

- “Ponte com as práticas de crise da A&M (a alinhar)”: ponto aberto. → **Verso.**
- É o produto central do jogo “Exercício de Crise” (V6, slide 19). → **Ligar a ficha ao jogo (campo jogo).**

**Quebras (medidas)**

- Quebras curtas: 14 · viúvas: 8 · rótulos abaixo de 11 px: 29 · vazio na coluna direita: 1 px.
- Exemplos: “…críticos” em “BIA e mapa de serviços críticos” · “…(tabletop)” em “Exercícios de crise (tabletop)” · “…incidente” em “Plano de recuperação de incidente” · “…dependências” em “Serviços críticos e dependências” · “…documentos” em “Mapeia dependências a partir de CMDB e documentos” · “…saída” em “Avalia contratos de terceiros: SLA, cyber, saída”

**Sugestão para a V6**

- kpis: [“~R$ 800 mi”, “desviados no ataque à C&M Software (jul/2025)”, “ataque-cm-800mi”] ; [“5.274”, “resolução do Conselho Monetário Nacional que endurece segurança e nuvem no setor financeiro (dez/2025)”, “cmn-5274”]
- meta: “Formato: diagnóstico de resiliência + exercícios periódicos” · “Comprador: CIO, diretor de riscos e diretor de operações” · “Modelo comercial: preço fechado + recorrência dos exercícios” · “Encaixe: muda do pilar 1 para o pilar 4”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo abre este produto)

### Ficha 4.6 · Legacy X-Ray & AI Modernization (Criar com IA)

- **id:** `legacy-xray-ai-modernization` · **Pilar:** 4 · **Nasce de:** Novo · produto com IA
- **Captura:** `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_4.6.png`

**Números**

| Número | Onde | Classe | Fonte | Status | Ação | Sugestão |
|---|---|---|---|---|---|---|
| “Raio-X: 4–6 semanas” · etapas S1 · S2–3 · S4–5 · S6 · Execução | formato e etapas | desenho nosso | Prazo nosso |  | remover |  |
| “R$ 50,4 bi orçamento de tecnologia dos bancos em 2026” | KPI | fato com fonte | Febraban/Deloitte via Forbes | a verificar | remover | Não prova a dor do legado (E daí fraco). |
| “neutro em fornecedor: seleciona e garante, não revende” | KPI | estrutural | Posicionamento, não número |  | trocar por palavras | Vai para “Por que A&M”. |
| “até 4× mais rápido em migração .NET com AWS Transform” | KPI | fato com fonte | AWS (dado do fornecedor) | fraco | remover |  |
| “Anthropic promete COBOL ‘em trimestres, não anos’ (fev/2026)” | Por que A&M | fato com fonte | Gigazine / Malay Mail (24/02/2026) | verificado | manter |  |
| “ex.: modernização contínua em Bradesco e Caixa” | para quem é | fato com fonte | Convergência Digital | verificado | manter |  |

**Siglas e jargão**

| Termo | Onde | Troca |
|---|---|---|
| COBOL · PL/SQL · Delphi · ABAP · .NET · JCL | pitch e dados | “linguagens antigas como COBOL” (tirar JCL) |
| re-host · refactor · replace | entregas | levar como está · reescrever · substituir |
| assurance | pitch, formato, etapas | revisão independente |
| LegacyX · GenWizard · watsonx Code Assistant for Z · Bob · AWS Transform · GitHub Copilot app modernization · Claude Code | Por que A&M e ferramentas | nomes demais: citar 2 ou 3 |
| business case · LLM | pitch e ferramentas | caso de negócio · modelo de IA generativa |

**Frases genéricas → reescrita concreta**

| Hoje | Reescrita |
|---|---|
| Diferencial: “a execução vira commodity; o valor migra para rota, business case e assurance independente” | “A ferramenta ficou barata; o valor está em escolher a rota e revisar a execução de forma independente.” |

**Lógica**

- Os dois KPIs não provam a dor (orçamento total dos bancos; dado de fornecedor). → **Usar o fato da Anthropic/IBM (fev/2026) e o caso Bradesco/Caixa em palavras; ou ficar sem KPI.**

**Quebras (medidas)**

- Quebras curtas: 16 · viúvas: 8 · rótulos abaixo de 11 px: 26 · vazio na coluna direita: 23 px.
- Exemplos: “…complexidade” em “Raio-X: inventário, dependências e complexidade” · “…documentadas” em “Regras de negócio documentadas” · “…documentação” em “Código, JCL, banco e documentação” · “…regras” em “IA gera mapas, documentação e regras” · “…case” em “Opção por módulo e business case” · “…funcional” em “Qualidade e equivalência funcional”

**Sugestão para a V6**

- kpis: nenhum fato forte específico — pode ficar sem KPI (0 a 3 permitidos).
- meta: “Formato: raio-X de escopo fechado + revisão independente da modernização” · “Comprador: CIO, CTO e CFO” · “Modelo comercial: preço fechado pelo volume de código + revisão mensal” · “Encaixe: alimenta 4.1, 4.2 e 4.4”
- steps: rótulos “1”…“5”
- jogo: `exercicio-de-crise` (o jogo abre este produto)

## Anexo A. Glossário de trocas

**Siglas** (permitidas sem explicação: TI, IA, A&M, DTS, CEO, CFO, CIO, CTO, ERP, M&A, RH, SAP, LGPD)

| Sigla | Usar |
|---|---|
| PE | fundos de private equity (depois, “fundos”) |
| VC | fundos de venture capital |
| PE/VC | fundos de private equity e de venture capital |
| DD / Tech DD | diligência (due diligence) / diligência de tecnologia |
| TSA | contrato de serviços de transição |
| IMO / SMO | escritório de integração / escritório de separação |
| TMO / PMO | escritório de transformação / escritório de projetos |
| OCM, ADKAR | gestão de mudança |
| ITSM | gestão de serviços de TI |
| SDLC | ciclo de desenvolvimento de software |
| AIOps | operação de TI com IA |
| DORA | remover (métricas de entrega de software) |
| FinOps | gestão do custo de nuvem |
| TBM | gestão financeira de TI (remover a sigla) |
| CMDB | base de configuração de TI |
| SSO | registros de acesso (login único) |
| SLA | nível de serviço acordado |
| KPI | indicador |
| ROI | retorno do investimento |
| LLM | modelo de IA generativa |
| RFP | concorrência / processo de escolha de fornecedor |
| SaaS | software por assinatura |
| VDR | data room |
| EBITDA | resultado operacional (EBITDA) na 1ª menção |
| CBS / IBS | novos tributos sobre consumo (CBS e IBS) na 1ª menção |
| ECC | versão antiga do ERP da SAP (ECC) na 1ª menção |
| S/4HANA | versão atual do ERP da SAP (S/4HANA) |
| RISE | contrato de migração da SAP para a nuvem (RISE) |
| ANPD | Autoridade Nacional de Proteção de Dados |
| PL 2338 | projeto de lei de IA (PL 2338) |
| MBB | McKinsey, BCG e Bain |
| GPU | processadores para IA |
| CAIO | diretor de IA |
| CDO | diretor de dados |
| CHRO | diretor de RH |
| CRO | diretor de riscos |
| COO | diretor de operações |
| P&L | resultado (receitas e custos) |
| PPM | gestão do portfólio de projetos |
| CSC | serviços compartilhados |
| T&M | cobrança por hora (tempo e material) |
| NPS | satisfação do cliente |
| TCO | custo total |
| BIA | análise de impacto no negócio |
| DR | recuperação de desastre |
| QA | garantia de qualidade |
| EA | arquitetura corporativa |
| TOGAF | método de arquitetura corporativa (TOGAF) |
| APM | gestão do portfólio de aplicações |
| TIME | classificação tolerar · investir · migrar · eliminar |
| PI | propriedade intelectual |
| RAID | registro de riscos e pendências |
| SPM | gestão de portfólio de projetos (ServiceNow) |
| ABAP | código customizado do SAP |
| JCL | remover (detalhe técnico de mainframe) |
| PTAX | taxa de câmbio oficial (Ptax) |
| CPC 04 / IFRS | norma contábil de ativos intangíveis |
| MCTI | Ministério da Ciência, Tecnologia e Inovação |
| FormP&D | formulário da Lei do Bem |
| PD&I / P&D | pesquisa, desenvolvimento e inovação |
| LC / EC | Lei Complementar / Emenda Constitucional |
| CMN | Conselho Monetário Nacional |
| BACEN / BCB | Banco Central |
| RPA | automação robótica de processos |
| CRM / HCM | sistema de clientes / sistema de RH |
| APIs | conexões entre sistemas |
| VMs | máquinas virtuais |
| SAM | gestão de ativos de software |
| 1S26 | 1º semestre de 2026 |
| 4T 2026 / 1T 2027 | 4º trimestre de 2026 / 1º trimestre de 2027 |
| ISO/IEC 42001 | norma internacional de gestão de IA (ISO/IEC 42001) |
| NIST AI RMF | guia de gestão de risco de IA do NIST (EUA) |
| RACI | matriz de responsabilidades |
| ACDC, TSE, TST | remover (siglas de ofertas de concorrentes) |
| GenAI | IA generativa |
| Big Four | as quatro grandes (Deloitte, PwC, EY e KPMG) na 1ª menção |
| C-Level | alta liderança / diretoria |
| AS-IS / TO-BE | hoje / proposta |
| E / H, [E], [H], selo “proposta DTS” | não usar; o que é proposta nossa fica em palavras e no verso |

**Jargão em inglês**

| Termo | Usar |
|---|---|
| signing / closing | assinatura / fechamento do negócio |
| deal(s) | transação(ões) |
| tickets (de M&A) | valor das transações |
| carve-out | separação de uma unidade |
| cutover | virada de sistema |
| go-live | entrada em operação |
| hypercare | acompanhamento pós-virada |
| red flag(s) | alerta(s) crítico(s) |
| valuation | preço da empresa |
| standalone / one-off | custo de operar sozinha / custo único |
| buy-side / sell-side | lado comprador / lado vendedor |
| vendor readiness / exit readiness | preparação do vendedor / preparação para a venda |
| equity story | argumento de venda da empresa |
| buy-and-build | compras sucessivas |
| sprint | diagnóstico curto |
| squad | equipe |
| fee / success fee | honorário / honorário de êxito |
| upsell / cross-sell | venda adicional / venda combinada |
| assurance | revisão independente / garantia independente |
| advisory | assessoria |
| tabletop | simulação de mesa |
| right-sizing | ajuste de capacidade |
| shelfware | licença paga e sem uso |
| shadow AI / shadow IT | uso de IA ou de sistemas fora do controle da TI |
| lock-in | dependência de fornecedor |
| quick wins | primeiros ganhos |
| baseline | linha de base |
| backlog | fila de demandas |
| board pack | material para o conselho |
| data request | pedido de dados |
| spans & layers | níveis hierárquicos e amplitude de gestão |
| op model | modelo operacional |
| accountability | responsabilidade pelo resultado |
| top-down | de cima para baixo |
| hyperscalers | provedores de nuvem (AWS, Microsoft, Google) |
| AI-native | nativa em IA |
| services-as-software | serviço vendido como software, por assinatura |
| asset-based consulting | consultoria baseada em ativos reutilizáveis |
| interim (management) | liderança interina |
| runbook / playbook | roteiro de execução / guia de execução |
| business case | caso de negócio (retorno previsto) |
| scorecard | placar |
| survey | pesquisa |
| workshop | oficina |
| kick-off | início |
| service desk | central de atendimento de TI |
| guardrails | regras de proteção |
| rollout | expansão |
| setup | implantação |
| onboarding | integração |
| Dia 1 / Dia 100 | primeiro dia / primeiros cem dias após o fechamento (explicar na 1ª menção) |

## Anexo B. Registro sugerido de fatos (para `src/data/05-fontes.js`)

Status conforme a pesquisa de 06/10/2026 e esta auditoria. “onde” usa a numeração da V5.

| id | Fato | Número | Fonte | Data | Tipo | Status | Onde | URL | Nota |
|---|---|---|---|---|---|---|---|---|---|
| `ceo-sem-retorno-ia-56` | 56% dos CEOs ainda não registram retorno financeiro com IA | 56% | PwC — 29ª CEO Survey | 01/2026 | primária | a verificar | s04, s10, s11, f1.1, f1.7 | https://www.pwc.com.br/pt/estudos/preocupacoes-ceos/ceo-survey/2026/29-ceo-survey-fs.pdf | Pesquisa global; a pesquisa leu via conversion.com.br. Dizer “no mundo”. |
| `governanca-ia-madura-27` | Só 27% das empresas no Brasil têm governança de IA madura | 27% | Deloitte — State of AI in the Enterprise 2026 (Brasil) | 2026 | primária | verificado | s10, f1.7 | https://www.deloitte.com/br/pt/about/press-room/state-of-ai-2026.html |  |
| `pilotos-ia-escalados-25` | Cerca de 25% das empresas escalaram 40% ou mais dos pilotos de IA | ~25% | Deloitte — State of AI in the Enterprise 2026 (Brasil) | 2026 | primária | verificado | f1.2 | https://www.deloitte.com/br/pt/about/press-room/state-of-ai-2026.html |  |
| `ia-prioridade-53` | IA generativa e agentes são a prioridade nº 1 de investimento para 53% dos executivos | 53% | ABES/IDC — Mercado Brasileiro de Software 2026 | 03/2026 | primária | verificado | s10 | https://abes.org.br/brasil-mantem-lideranca-em-ti-na-america-latina-cresce-acima-da-expectativa-em-2025-mas-desacelera-ritmo-de-crescimento-neste-ano-e-consolida-nova-fase-do-mercado-aponta-estudo-da-abes-2/ |  |
| `ti-cresce-5-3-2026` | O mercado de TI no Brasil deve crescer 5,3% em 2026, contra 9,7% no mundo | +5,3% | ABES/IDC — Mercado Brasileiro de Software 2026 | 03/2026 | primária | verificado | s04, s06, s10, f1.5 | https://abes.org.br/brasil-mantem-lideranca-em-ti-na-america-latina-cresce-acima-da-expectativa-em-2025-mas-desacelera-ritmo-de-crescimento-neste-ano-e-consolida-nova-fase-do-mercado-aponta-estudo-da-abes-2/ |  |
| `mercado-ti-67-8` | Mercado de TI no Brasil: US$ 67,8 bi em 2025 (+18,5%) | US$ 67,8 bi | ABES/IDC — Mercado Brasileiro de Software 2026 | 03/2026 | primária | verificado | s10 |  | O usuário pediu para tirar: não usar. |
| `cbs-plena-2027` | A CBS passa a valer plenamente em 01/01/2027; PIS e Cofins são extintos | 01/01/2027 | Presidência da República — Lei Complementar 214/2025 | 16/01/2025 | oficial | verificado | s04, s12, s19, f2.2 | https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm |  |
| `reforma-cronograma` | Teste em 2026 (CBS 0,9% + IBS 0,1%); ICMS e ISS recolhidos a 90%→60% de 2029 a 2032; extintos em 2033 | 2026–2033 | Congresso em Foco (EC 132/2023 e LC 214/2025) — Cronograma de implementação da reforma tributária | 2025 | imprensa | verificado | s12, f2.2 | https://www.congressoemfoco.com.br/noticia/115548/confira-o-cronograma-de-implementacao-da-reforma-tributaria | Citar a lei como fonte primária. |
| `sap-ecc-2027` | A manutenção padrão do SAP ECC termina em 2027 (extensível a 2030) | 2027 | Baguete (anúncio SAP de 04/02/2020) — 2027 é um ultimato para quem ainda roda SAP ECC | 2025 | imprensa | verificado | s04, s06, s12, f2.2 | https://www.baguete.com.br/noticias/2027-e-um-ultimato-para-quem-ainda-roda-sap-ecc |  |
| `pwc-reforma-37` | 37% das empresas ainda estão em análise inicial do impacto da Reforma Tributária | 37% | PwC Brasil — Tributos no centro: caminhos para reinvenção das empresas brasileiras | 31/10/2025 | primária | divergente | s12, f2.2 | https://www.pwc.com.br/pt/sala-de-imprensa/release/2025/83-porcento-das-empresas-esperam-impacto-alto-e-imediato-da-reforma-tributaria.html | O deck diz “no início da adequação”; a pesquisa e a imprensa falam em análise/fase inicial. Conferir a redação no relatório. |
| `pwc-reforma-ti-70` | 70% apontam a TI entre as áreas mais afetadas pela Reforma Tributária | 70% | PwC Brasil (via imprensa) — Tributos no centro | 10/2025 | imprensa | a verificar | sugestão para s12 da V6 | https://www.reformatributaria.com/negocios/37-das-empresas-ainda-fazem-analise-inicial-sobre-a-tributaria-diz-estudo/ | Não está no deck; resultado de busca de 29/10/2026. Pode substituir o 37% como prova do pilar 2. |
| `gartner-erp-70` | Mais de 70% das iniciativas recentes de ERP não vão atingir plenamente o business case até 2027 (previsão) | >70% | Gartner (via The Register) — ERP disaster | 13/11/2025 | imprensa | a verificar | s12, f2.4 | https://www.theregister.com/2025/11/13/erp_disaster_gartner/ | É previsão; o deck escreve como fato presente. |
| `kpmg-pe-vc-50` | Fundos de private equity e venture capital participaram de 50% das transações de 2025 (eram 43%) | 50% | KPMG — Pesquisa de Fusões e Aquisições 2025 (4º trimestre) | 03/2026 | primária | verificado | s04, s06, s14, s15, f3.1, f3.5 | https://kpmg.com/br/pt/insights/2026/03/pesquisa-fusoes-aquisicoes-2025-4-trimestre.html | O usuário pediu para tirar o card “1.581 transações; 50% com PE/VC” do slide de forças. Usar no máximo uma vez. |
| `kpmg-1581` | 1.581 transações de M&A em 2025 | 1.581 | KPMG — Pesquisa de Fusões e Aquisições 2025 | 03/2026 | primária | verificado | s14 |  | O usuário pediu para tirar: não usar. |
| `kpmg-ti-setor-1` | TI foi o setor com mais transações no 1º semestre de 2026 (274); total de 610 transações (−35%) e R$ 195 bi (+22,3%) | 274 | KPMG — Pesquisa trimestral de M&A (2º trimestre de 2026) | 08/2026 | primária | verificado | s04, s14, f3.1 | https://kpmg.com/br/pt/insights/2026/08/pesquisa-trimestral-m-a-2-trimestre-2026.html |  |
| `diligencesquared-50mil` | Diligência com agentes de IA por cerca de US$ 50 mil, contra US$ 500 mil–1 mi no modelo tradicional | ~US$ 50 mil | TechCrunch — DiligenceSquared uses AI voice agents to make M&A research affordable | 05/03/2026 | imprensa | a verificar | s05, s14, f3.1 | https://techcrunch.com/2026/03/05/diligencesquared-uses-ai-voice-agents-to-make-ma-research-affordable/ | Preço anunciado pela própria startup. |
| `vmware-ate-15x` | Licenças VMware até 8 a 15 vezes mais caras após a compra pela Broadcom | 8–15× | Baguete — Preço do VMware aumentou até 15x | 2025 (data aproximada) | imprensa | fraco | s04, s16, f1.5, f4.3 | https://www.baguete.com.br/noticias/preco-do-vmware-aumentou-ate-15x | Fonte secundária com data aproximada; não usar como destaque sem confirmar. |
| `insumos-ti-importados-40` | Até 40% dos insumos de TI do setor privado são importados | até 40% | TI Inside — Como o dólar está impactando o caixa das empresas na compra de tecnologia | 11/02/2025 | imprensa | a verificar | s16, f1.5 | https://tiinside.com.br/11/02/2025/como-o-dolar-esta-impactando-o-caixa-das-empresas-na-compra-de-tecnologia/ |  |
| `febraban-tech-50-4` | Bancos: R$ 50,4 bi em tecnologia em 2026 (+8%); R$ 3,9 bi em migração para nuvem (+30%) | R$ 50,4 bi; R$ 3,9 bi | Febraban/Deloitte (via Forbes) — Pesquisa Febraban de Tecnologia Bancária 2026 | 06/2026 | imprensa | a verificar | s16, s17, f4.3, f4.6 | https://forbes.com.br/forbes-money/2026/06/bancos-investimento-tecnologia-febraban-2026/ |  |
| `ataque-cm-800mi` | Cerca de R$ 800 mi desviados no ataque à C&M Software (jul/2025) | ~R$ 800 mi | Finsiders / Jornal Opção — Ataque hacker à C&M Software | 2025–2026 | imprensa | a verificar | s04, s16, f4.5 | https://finsidersbrasil.com.br/reportagem-exclusiva-fintechs/ataque-hacker-cm-software-1-ano-depois-o-que-mudou/ |  |
| `ataque-sinqia-710mi` | R$ 710 mi desviados no ataque à Sinqia (ago/2025) | R$ 710 mi | Tecnoblog — Ataque hacker a empresa que opera o Pix desviou R$ 710 milhões | 08/2025 | imprensa | a verificar | s16, f4.5 | https://tecnoblog.net/noticias/ataque-hacker-a-empresa-que-opera-o-pix-desviou-r-710-milhoes/ |  |
| `cmn-5274` | Resolução CMN 5.274/2025 endurece regras de segurança cibernética e de nuvem no sistema financeiro | 5.274 | Conselho Monetário Nacional (via Legisweb) — Resolução CMN 5.274 | 18/12/2025 | oficial | verificado | s04, s06, s16, f4.5 | https://www.legisweb.com.br/legislacao/?id=488277 |  |
| `kpmg-talento-53` | 53% das empresas não têm o talento necessário (pesquisa global) | 53% | KPMG — Global Tech Report 2025/26 | 2025–2026 | primária | a verificar | s04, f1.4 | https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/gated/2025/intelligent-technology.pdf | Global, não Brasil. |
| `mckinsey-25mil-agentes` | A McKinsey opera com cerca de 25 mil agentes de IA ao lado de cerca de 40 mil pessoas | 25 mil | Business Insider (CES e HBR IdeaCast) — CEO Bob Sternfels says McKinsey… | 01/2026 | imprensa | verificado | s05, s10, f2.6 | https://www.aol.com/articles/ceo-bob-sternfels-says-mckinsey-104101693.html |  |
| `mckinsey-honorarios-resultado-25` | Cerca de 25% dos honorários globais da McKinsey já são atrelados a resultado | ~25% | Yahoo Finance / Business Insider — AI reshaping how McKinsey makes money | 11/2025 | imprensa | verificado | s05, s07 | https://finance.yahoo.com/news/ai-reshaping-mckinsey-makes-money-195132745.html | Dado de nov/2025: não colocar no marco de jan/2026. |
| `am-global-ai-board` | A Alvarez & Marsal global criou o Global AI Board | 05/05/2026 | Alvarez & Marsal — A&M Announces Expansion of AI Capabilities | 05/05/2026 | empresa | verificado | s05, s19 | https://www.alvarezandmarsal.com/press-release/alvarez-marsal-announces-expansion-of-ai-capabilities |  |
| `am-meta-50-ia-2028` | Segundo a Bloomberg, a A&M mira 50% da receita vinda de trabalho com IA até 2028 (até US$ 3,5 bi) e até 200 contratações | 50% | Bloomberg — Alvarez & Marsal wants to make $3.5 billion from AI work by 2028 | 04/05/2026 | imprensa | verificado | s05, f1.7 | https://www.bloomberg.com/news/articles/2026-05-04/alvarez-marsal-wants-to-make-3-5-billion-from-ai-work-by-2028 | É reportagem, não comunicado da A&M: dizer “segundo a Bloomberg”. |
| `frontier-alliance` | OpenAI reúne McKinsey, BCG, Accenture e Capgemini numa aliança para levar agentes a clientes | 02/2026 | Fortune — OpenAI partners with McKinsey, BCG, Accenture and Capgemini | 23/02/2026 | imprensa | verificado | s05 | https://fortune.com/2026/02/23/openai-partners-with-mckinsey-bcg-accenture-and-capgemini-to-push-its-frontier-ai-agent-platform/ |  |
| `pwc-toltiq` | A PwC passa a ser a única firma de serviços profissionais da ToltIQ (diligência com IA) | 06/2026 | PwC US — Reimagining deals for the age of AI | 06/2026 | empresa | verificado | s05, s14, f3.1 | https://www.pwc.com/us/en/about-us/newsroom/press-releases/reimagining-deals-for-the-age-of-ai.html |  |
| `ode-anthropic` | Ode with Anthropic (Blackstone, Hellman & Friedman) coloca engenheiros de IA dentro das investidas dos fundos | 07/2026 | CXO Digital Pulse / BusinessWire — Anthropic, Blackstone and Hellman & Friedman launch Ode | 07/2026 | imprensa | verificado | s05, s14 | https://www.cxodigitalpulse.com/anthropic-blackstone-and-hellman-friedman-launch-enterprise-ai-services-firm-ode/ |  |
| `bain-replica-alvo` | A Bain replica o software do alvo com Claude Code para testar se ele é defensável durante a diligência | 07/2026 | The Decoder (via Financial Times) — Vibecoding is becoming a deal-breaker test for software acquisitions | 07/2026 | imprensa | verificado | s05, s14, f3.1 | https://the-decoder.com/vibecoding-is-becoming-a-deal-breaker-test-for-software-acquisitions/ |  |
| `alix-artium` | A AlixPartners compra a Artium, consultoria de engenharia com agentes de IA com mais de 80 pessoas | 04/08/2026 | AlixPartners — AlixPartners acquires Artium | 04/08/2026 | empresa | verificado | s05, s07, s10 | https://www.alixpartners.com/newsroom/alixpartners-acquires-leading-agentic-ai-consulting-firm-artium/ |  |
| `falconi-100mi` | A Falconi investe R$ 100 mi em IA; 80% dos projetos usam agentes | R$ 100 mi | Jornal do Comércio — Falconi investe R$ 100 milhões em IA | 09/2026 | imprensa | verificado | s05, s12, f2.3 | https://www.jornaldocomercio.com/colunas/mercado-digital/2026/09/1264872-falconi-investe-rs-100-milhoes-em-ia-cresce-90-vendas-em-tech.html |  |
| `lei-do-bem-2024` | Lei do Bem, ano-base 2024: 4.252 empresas, 14.877 projetos, R$ 51,59 bi em PD&I, renúncia de R$ 11,98 bi | 4,2 mil; R$ 51,6 bi | MCTI (via Convergência Digital) — Lei do Bem patrocinou 14 mil projetos de inovação | 2025–2026 | imprensa | a verificar | s06, s10, f1.6 | https://convergenciadigital.com.br/inovacao/lei-do-bem-patrocinou-14-mil-projetos-de-inovacao-com-r-516-milhoes/ | A URL fala em “R$ 516 milhões”; a busca de 29/10/2026 confirma R$ 51,59 bi e aponta dado do ano-base 2025 (R$ 65,7 bi; 4.598 empresas), não verificado. Conferir no MCTI e usar o ano-base mais recente. |
| `lc224-corte-10` | A LC 224/2025 cortou 10% dos incentivos: a exclusão da Lei do Bem cai de 60% para 54% e de 80% para 72%, desde 01/01/2026 | −10% | Correio Braziliense (blog Jus) — LC 224/2025: o corte de 10% nos benefícios fiscais | 12/08/2026 | imprensa | verificado | s06, s10, f1.6 | https://blogs.correiobraziliense.com.br/jusbraziliense/2026/08/12/lc-224-2025-o-corte-de-10-nos-beneficios-fiscais-que-sua-empresa-talvez-nem-percebeu/amp/ |  |
| `agentic-cancelados-40` | Mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027 (previsão) | >40% | Gartner — Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027 | 25/06/2025 | primária | verificado | f1.7 | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 |  |
| `mit-nanda-95` | 95% das organizações não têm impacto mensurável no resultado com IA generativa | 95% | MIT NANDA (via Virtualization Review) — The GenAI Divide | 08/2025 | imprensa | a verificar | f1.7 | https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx |  |
| `mit-nanda-67` | Soluções compradas ou feitas com parceiros dão certo em cerca de 67% dos casos, contra cerca de 1/3 das internas | ~67% | MIT NANDA (via Fortune) — The GenAI Divide | 18/08/2025 | imprensa | fraco | s18 |  | Marcado [E*] na pesquisa: não reverificado. Não usar como destaque. |
| `hfs-services-as-software` | Mercado de serviços vendidos como software projetado em US$ 1,5 tri até 2035 (projeção) | US$ 1,5 tri | HFS Research — Agents of Disruption (HFS India Summit) | 02/2026 | primária | verificado | s07 | https://www.hfsresearch.com/wp-content/uploads/pdf/HFS-India-Summit-Feb-2026-Agents-of-Disruption-Session.pdf | Projeção de analista; global. |
| `gartner-preco-resultado` | “Precificação puramente por resultado transfere risco” (Gartner) | — | Gartner (resumo de busca) —  | 2025–2026 | primária | fraco | s07 | https://www.gartner.com/en/documents/7767521 | Não verificado na pesquisa: remover. |
| `mbrf-sinergias-485` | MBRF (Marfrig + BRF) concluída em set/2025, com sinergias anunciadas de R$ 485 mi por ano | R$ 485 mi/ano | Giro News — As maiores transações de M&A de 2025 | 2025 | imprensa | a verificar | s14, f3.2, f3.4 | https://gironews.com/negocios/as-maiores-transacoes-de-ma-do-varejo-e-da-industria-em-2025/ |  |
| `petz-cobasi-cade` | Cade aprovou Petz + Cobasi em dez/2025, com venda de 26 lojas | 26 lojas | Mercado Hoje — Cobasi e Petz: próximos passos da fusão | 11/12/2025 | imprensa | verificado | s14, f3.2 | https://mercadohoje.uai.com.br/2025/12/11/cobasi-e-petz-saiba-os-proximos-passos-da-fusao/ |  |
| `braskem-ig4` | O controle da Braskem passa à IG4 | 20/04/2026 | IstoÉ Dinheiro — Novonor passa controle da Braskem para IG4 | 04/2026 | imprensa | verificado | s14, f3.2 | https://istoedinheiro.com.br/novonor-passa-controle-da-braskem-para-ig4-e-acordo-de-acionistas-sera-fechado-com-petrobras-2 |  |
| `raizen-separacao-2027` | A Raízen planeja separar-se em Raízen Energia e Raízen Combustíveis até o fim de 2027 | 2027 | Forbes Brasil — Cosan pode vender participação na Raízen | 05/2026 | imprensa | verificado | s14, f3.2 | https://forbes.com.br/forbes-money/2026/05/cosan-pode-vender-participacao-na-raizen-e-holding-deve-ser-dissolvida-diz-ceo/ |  |
| `motiva-aeroportos` | A Motiva vende participações em aeroportos por R$ 5,2 bi | R$ 5,2 bi | KPMG — Pesquisa trimestral de M&A (2º trimestre de 2026) | 08/2026 | primária | a verificar | s14 | https://kpmg.com/br/pt/insights/2026/08/pesquisa-trimestral-m-a-2-trimestre-2026.html | A fonte não aparece no rodapé do slide 14. |
| `mckinsey-oxford-projetos` | Grandes projetos de TI estouram o orçamento em 45% e entregam 56% menos valor (5.400 projetos) | 45%; 56% | McKinsey e Universidade de Oxford — Delivering large-scale IT projects on time, on budget, and on value | 2012 | primária | verificado | f2.3 | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value | Estudo de 2012: dizer o ano. |
| `mckinsey-sinergias-ti` | 50% a 60% das iniciativas de sinergia em M&A dependem fortemente de TI | 50–60% | McKinsey — Understanding the strategic value of IT in M&A | 2011 | primária | verificado | f3.2 | https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/understanding-the-strategic-value-of-it-in-m-and-38a | Estudo de 2011: dizer o ano. |
| `flexera-desperdicio-29` | 29% do gasto em nuvem é desperdiçado (pesquisa global) | 29% | Flexera — State of the Cloud 2026 | 2026 | primária | verificado | f1.5 | https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows | Pesquisa de fornecedor de software de custo; global. |
| `finops-20-30` | Práticas maduras de gestão do custo de nuvem otimizam de 20% a 30% do gasto | 20–30% | IT Forum —  | 2025 | imprensa | fraco | f1.5, f4.3 | https://itforum.com.br/?p=9556536 | Sem estudo primário identificado. |
| `vertice-18` | O agente de negociação da Vertice obteve 18% de economia média em mais de 4 mil negociações; ciclos 15 dias mais curtos | 18%; 15 dias | Procurement Magazine — Vertice launches Ana AI negotiation agent | 2025–2026 | imprensa | fraco | f1.5, f2.1 | https://procurementmag.com/news/vertice-launches-ana-ai-negotiation-agent-for-software | Dado do fornecedor. |
| `cast-ey-75` | A EY reduziu em mais de 75% o tempo de avaliação de código em diligência com o CAST Highlight | >75% | CAST — EY reduces M&A due diligence assessment time by more than 75% | sem data | empresa | fraco | s14, f3.1 | https://learn.castsoftware.com/case-studies/ey-reduces-ma-due-diligence-assessment-time-by-more-than-75-percent-with-cast-highlight | Estudo de caso do fornecedor. |
| `aws-transform` | AWS Transform: migração sem custo; até 4× mais rápido em .NET; US$ 0,035 por minuto de agente em transformações customizadas | até 4×; US$ 0,035/min | AWS (via SiliconANGLE e Qovery) — AWS Transform | 05/2025 e 09/2026 | empresa | fraco | s16, f4.3, f4.6 | https://www.qovery.com/blog/aws-transform-what-it-does-and-what-it-costs | Dado do fornecedor; a gratuidade da migração é o fato útil. |
| `cetic-ia-17` | 17% das empresas com 10 ou mais empregados usam IA | 17% | Cetic.br — TIC Empresas 2025 | 2025 | primária | verificado | f2.5 | https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf | O usuário pediu para tirar: não usar. |
| `cetic-barreira-44` | 44% das empresas que tentaram implementar IA citam falta de conhecimento da equipe como obstáculo | 44% | TI Inside (dados Cetic.br) — A IA já entrou nas empresas brasileiras | 25/06/2026 | imprensa | a verificar | f2.5 | https://tiinside.com.br/25/06/2026/a-ia-ja-entrou-nas-empresas-brasileiras-mas-ainda-de-forma-concentrada-e-padronizada/ |  |
| `deloitte-anthropic-470mil` | Aliança Deloitte–Anthropic leva Claude a 470 mil profissionais | 470 mil | Anthropic — Deloitte–Anthropic partnership | 06/10/2025 | empresa | verificado | s10 | https://www.anthropic.com/news/deloitte-anthropic-partnership |  |
| `ey-ai-1-4-bi` | A EY lançou o EY.ai após investir US$ 1,4 bi | US$ 1,4 bi | ICMIF — EY announces launch of EY.ai | 09/2023 | imprensa | verificado | s10 | https://www.icmif.org/news_story/ey-announces-launch-of-artificial-intelligence-platform-ey-ai-following-usd-1-4-billion-investment/ | Dado de 2023. |
| `kpmg-iso-42001` | KPMG: primeira das quatro grandes com certificação ISO/IEC 42001 | 1ª | KPMG Brasil — KPMG Trusted AI | 2025–2026 | empresa | verificado | s10, f1.7 | https://kpmg.com/br/pt/home/servicos/kpmg-trusted-ai.html |  |
| `pwc-250-agentes` | PwC passa de 250 agentes com o Google Cloud | 250+ | PwC Global — PwC scales global AI agent ecosystem | 15/10/2025 | empresa | verificado | s10 | https://www.pwc.com/gx/en/news-room/press-releases/2025/scales-global-ai-agent-ecosystem.html |  |
| `bcg-tech-ia-40` | Tecnologia e IA passam de 40% da receita do BCG (US$ 14,4 bi em 2025) | >40% | BCG — BCG revenue: 22nd consecutive year of growth | 23/04/2026 | empresa | verificado | s10 | https://www.bcg.com/press/23april2026-bcg-revenue-22nd-consecutive-year-growth |  |
| `capgemini-recife` | Capgemini em Recife: de 250 para 1.000 profissionais até o fim de 2026 | 1.000 | Diario de Pernambuco — Capgemini elege Recife como novo centro de formação | 10/2025 | imprensa | verificado | s12 | https://www.diariodepernambuco.com.br/economia/2025/10/11698207-investimento-em-pessoas-capgemini-elege-recife-como-novo-centro-de-formacao-no-brasil.html |  |
| `deloitte-recife-600` | Deloitte: Technology Center em Recife com cerca de 600 pessoas | ~600 | Consultancy.lat — Deloitte expands Recife team to 600 people | 2025 | imprensa | verificado | s12 | https://www.consultancy.lat/news/1510/deloitte-rapidly-expands-recife-team-in-porto-digital-to-600-people |  |
| `deloitte-aws-2031` | Deloitte Brasil e AWS: acordo de colaboração estratégica até 2031 | 2031 | Deloitte Brasil — Deloitte e AWS | 2025 | empresa | verificado | s12 | https://www.deloitte.com/br/pt/about/press-room/deloitte-aws.html |  |
| `legacyx` | McKinsey LegacyX: conversão SAS → Python com squads de agentes, ~90% de precisão e cronograma 80% menor | ~90%; −80% | McKinsey — LegacyX: rejuvenating legacy infrastructure with agentic AI | 2025 | empresa | fraco | s16 | https://www.mckinsey.com/about-us/new-at-mckinsey-blog/mckinseys-legacyx-rejuvenating-legacy-infrastructure-with-agentic-ai | Dado da própria firma. |
| `accenture-30mil-claude` | Accenture: 30 mil pessoas treinadas em Claude (Anthropic Business Group) | 30 mil | Anthropic — Anthropic–Accenture partnership | 09/12/2025 | empresa | verificado | s16 | https://www.anthropic.com/news/anthropic-accenture-partnership |  |
| `ibm-bob-45` | IBM Bob: cerca de 45% de ganho interno | ~45% | Let's Data Science — IBM launches Bob | 04/2026 | imprensa | fraco | s16 | https://letsdatascience.com/news/ibm-launches-bob-ai-development-partner-globally-20d5829f | Dado do fornecedor. |
| `anthropic-cobol` | Anthropic promete modernização de COBOL “em trimestres, não anos”; ação da IBM cai no anúncio | 02/2026 | Malay Mail / Gigazine — IBM shares hit 25-year low… | 24/02/2026 | imprensa | verificado | s16, f4.6 | https://www.malaymail.com/amp/news/money/2026/02/24/ibm-shares-hit-25-year-low-as-ai-promises-to-update-ageing-mainframe-code/210190 |  |
| `ardoq-40` | Ardoq diz que agentes automatizam cerca de 40% do trabalho rotineiro de arquitetura | ~40% | Business Wire (Ardoq) — Ardoq | 28/05/2026 | empresa | fraco | f4.1 | https://www.businesswire.com/news/home/20260528712753/en/ | Dado do fornecedor. |
| `deloitte-tech-trends` | Só 11% das organizações têm agentes em produção, 38% em piloto | 11%; 38% | Libertify (resumo do Deloitte Tech Trends 2026) — Deloitte Tech Trends 2026 | 12/2025 | imprensa | fraco | f2.6 | https://www.libertify.com/interactive-library/deloitte-tech-trends-2026-ai-physical-agentic/ | Fonte secundária. |
| `pl2338` | O PL 2338 (marco legal da IA) teria votação na Câmara depois das eleições de out/2026 | PL 2338 | MobileTime — Marco da IA: voto no fim do ano | 24/08/2026 | imprensa | a verificar | f1.7 | https://www.mobiletime.com.br/noticias/24/08/2026/marco-ia-voto-fim-do-ano/ | Data já passou (eleições de outubro de 2026): atualizar o status. |
| `anpd-agencia` | A Lei 15.352/2026 transformou a ANPD em agência reguladora | 15.352 | Teletime — Lei que torna ANPD agência é sancionada | 26/02/2026 | imprensa | verificado | f1.7 | https://teletime.com.br/26/02/2026/lei-que-torna-anpd-agencia-e-fixa-vigencia-do-eca-digital-e-sancionada/ |  |
| `redata` | Redata (incentivo a data centers) aprovado pelo Senado em 01/09/2026; sanção não verificada | — | Movimento Econômico — Senado aprova projeto que incentiva data centers | 02/09/2026 | imprensa | a verificar | f1.6, f4.3 | https://movimentoeconomico.com.br/tecnologia/2026/09/02/senado-aprova-projeto-que-incentiva-data-centers-com-isencao-de-tributos/ |  |
| `erp-apuracao-53-5` | 53,5% das empresas vão manter a apuração da Reforma no ERP | 53,5% | Monitor Mercantil — Grandes empresas aceleram busca por soluções para a Reforma | ~09/2025 | imprensa | a verificar | f2.2 | https://monitormercantil.com.br/grandes-empresas-aceleram-busca-por-solucoes-tecnologicas-para-enfrentar-a-reforma-tributaria/ |  |
| `bradesco-caixa-mainframe` | Bradesco e Caixa modernizam o mainframe de forma contínua, sem substituição | — | Convergência Digital — Bradesco e Caixa transformam o mainframe | 2025–2026 | imprensa | verificado | f4.6 | https://convergenciadigital.com.br/mercado/bradesco-e-caixa-transformam-o-mainframe-em-plataforma-orientada-a-dados-e-inteligencia/ |  |
| `idc-95-grandes` | 95% das grandes organizações pesquisadas pela IDC já usam IA | 95% | ABES/IDC — Mercado Brasileiro de Software 2026 | 03/2026 | primária | verificado | s04 (implícito) |  | Amostra de grandes empresas; é o que sustenta “quase todas as grandes empresas usam IA”. O usuário não quer % de uso de IA: preferir não usar. |
| `portfolio-dts` | Portfólio oficial DTS: 4 pilares, 29 serviços (10 · 7 · 8 · 4); nenhuma descrição cita IA no método | 4; 29 | Alvarez & Marsal Brasil — Portfólio Digital & Tech Services (documento interno) | 2026 | documento interno | verificado | s02, s03, s06, s08, s09 |  |  |

## Anexo C. Arquivos desta auditoria

- Este relatório: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/v6/auditoria.md`
- Versão para máquina: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/v6/auditoria.json` (mesmos dados; chaves `top20`, `transversais`, `reconciliacao`, `slides`, `divisorias`, `fichas`, `glossario`, `registro_sugerido_de_fatos`)
- Capturas dos slides sem divisória e dos estados interativos: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/shots/` (s_NN.png, s_NN_spotK, s_NN_fK, s_NN_mK, s_NN_gK, s_NN_v2)
- Capturas das 24 fichas: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/fichas/f_X.Y.png`
- Texto extraído de todos os estados e fichas: `/tmp/claude-0/-home-user-produtos/157ea01b-5eac-590d-ab7a-107b53a7d9c9/scratchpad/aud6_tmp/extract.json`
