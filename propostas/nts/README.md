# Enjourney · Proposta NTS — agentes de IA no ciclo de custos de transporte

Redesenho da proposta "Do mapeamento à ferramenta" com a identidade da Enjourney (azul `#03426F` e amarelo `#FECC32`, Montserrat e Inter) e o logo do cliente NTS.

| Arquivo | O que é |
|---|---|
| `Enjourney_NTS_Proposta_Agentes_IA.html` | A apresentação: um único arquivo que abre offline (fontes, logos e scripts embutidos). |
| `src/` | Fontes: `deck.html` (marcação dos slides), `deck.css` (sistema visual), `core.js` (motor), `cover.js` (capa), `diagrams.js` (pools e raias), `slides.js` (componentes), `boot.js`. |
| `src/assets/` | Fontes woff2, logo da NTS com fundo transparente e os pássaros do logo da Enjourney vetorizados (`birds.json`). |
| `build.py` | Gera o HTML único: `python3 build.py`. |

## Como apresentar

- `→`, `espaço` ou o botão Avançar avançam; `←` volta; `F` tela cheia; `G` ou o contador abrem a lista de slides; `L` alterna o modo leitura.
- Em telas estreitas (celular, tablet em pé) o modo leitura entra sozinho: os slides viram uma página rolável e as grades se reorganizam em coluna. Diagramas largos rolam na horizontal.
- `Ctrl+P` imprime um slide por página (1920 × 1080).

## Linguagem visual (v2)

Segue a estrutura de páginas do modelo TMG, com a paleta da Enjourney:

- Palco 1920 × 1080 (mais largura para fluxos e tabelas).
- Cada página tem barra de cabeçalho escura (logo Enjourney, título, capítulo, logo NTS e página), faixa de seção colorida, painel de conteúdo e rodapé com a fonte.
- Capas de capítulo são slides próprios (número grande ao fundo, sem sobreposição).
- Títulos em Barlow Condensed, texto em Inter. Azul e amarelo Enjourney como marca, neutros como base e coral como acento de leitura.
- Os diagramas dos slides 5 e 10 guardam a geometria de caixas e setas, e o teste confere que nenhuma seta atravessa uma caixa e que nenhum texto se sobrepõe.
- A matriz "Quem decide o quê" é editável: clique troca o papel (D, P, E, C, I, vazio), botão direito volta, o nome da decisão é editável, dá para adicionar e remover decisões, o status avisa quando falta um D ou há mais de um, e "Restaurar proposta" volta ao original. As mudanças ficam salvas no navegador.

## Roteiro (28 páginas: 23 slides e 5 capas de capítulo)

A numeração abaixo é a dos 23 slides de conteúdo; na apresentação, as capas de capítulo entram antes dos slides 4, 7, 12, 18 e 22.

| # | Slide | O que mudou |
|---|---|---|
| 1 | Capa | Bando de pássaros Enjourney em voo; a chave discreta "reunir o bando", abaixo do logo, leva cada um ao logo (três pousam nas posições exatas do símbolo, os outros se fundem). Desligar solta o bando de novo. |
| 2 | Resumo executivo | Quatro números de destaque, três mensagens e o pedido. |
| 3 | Por que agora | SCQA em sequência com conectores. |
| 4 | O processo mapeado | Pool com cinco raias e quatro fases; conectores ortogonais sem cruzamentos, início e fim, pontos de dor marcados. |
| 5 | Jornada do analista | Os dez aplicativos de hoje contra uma interface com cinco ações. |
| 6 | Onde o tempo vai | Antigos slides 6 e 7 num só: o seletor Opção 1 / Opção 2 anima a cascata e mostra a outra opção em tracejado. |
| 7 | Padrão de trabalho | Flow line animada ligando os cinco passos; cada card vira e mostra Vê / Faz. |
| 8 | Sistema e fronteiras | Pools (Externos, Perímetro NTS, Homologação, Provedor) e raias (Estação, Serviços, Nuvem); fluxos numerados, clique para destacar. |
| 9 | Web ou desktop | Três opções com fatos comparáveis no pé de cada uma. |
| 10 | Quem fala com quem | Flip cards por zona: frente com o conteúdo, verso com os fluxos permitidos e negados. |
| 11 | O que muda | Mantido / Removido / Acrescentado, com o caso Citibank como alerta. |
| 12 | As duas modalidades | Leitura de preço: R$ 165 mil × R$ 225 mil, composição, o que os R$ 60 mil compram e a chance de rotina. |
| 13 | Roteiro de 12 semanas | Gantt com fases, marcos, pagamentos e detalhe por barra; o seletor de opção apaga a raia de pesquisa na opção 1. |
| 14 | Pesquisa de campo | Linha do tempo de 12 semanas com cinco estações; o detalhe aparece um de cada vez. |
| 15–17 | Quem decide, por que a Antrópica, quem somos | Matriz com colunas destacáveis, comparação e perfis. |
| 18–21 | Caso de negócio, medição, investimento, riscos | Tabelas com filtro por tipo de número, regra de parada, fluxo de pagamento e matriz de risco clicável. |
| 22–23 | Decisão e premissas | Três decisões marcáveis, o que acontece depois do sim e as premissas com fonte. |

O texto da proposta original foi mantido; mudaram a identidade, a organização e a interação.
