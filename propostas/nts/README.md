# Enjourney · Proposta NTS — agentes de IA no ciclo de custos de transporte

Redesenho da proposta "Do mapeamento à ferramenta" com a identidade da Enjourney (azul `#03426F` e amarelo `#FECC32`, Montserrat e Inter) e o logo do cliente NTS.

| Arquivo | O que é |
|---|---|
| `Enjourney_NTS_Proposta_Agentes_IA.html` | A apresentação: um único arquivo que abre offline (fontes, logos e scripts embutidos). |
| `src/` | Fontes: `deck.html` (marcação dos slides), `deck.css` (sistema visual), `core.js` (motor), `cover.js` (capa), `diagrams.js` (pools e raias), `slides.js` (componentes), `boot.js`. |
| `src/assets/` | Fontes woff2, logo da NTS com fundo transparente e os pássaros do logo da Enjourney vetorizados (`birds.json`). |
| `build.py` | Gera o HTML único: `python3 build.py`. |

## Como apresentar

- `→`, `espaço` ou o botão amarelo avançam; `←` volta; `F` tela cheia; `G` ou o contador abrem a lista de slides; `L` alterna o modo leitura.
- Em telas estreitas (celular, tablet em pé) o modo leitura entra sozinho: os slides viram uma página rolável e as grades se reorganizam em coluna. Diagramas largos rolam na horizontal.
- `Ctrl+P` imprime um slide por página (1920 × 1080).

## Ajustes v1.1

- Palco 1920 × 1080 com moldura no estilo do modelo TMG: margem lateral em volta da página, cabeçalho e painel de conteúdo com bordas; mais largura para fluxos e tabelas.
- Menos amarelo e azul (destaques em texto, cards claros); sem animações de entrada em cascata nem fundos ondulados nos slides de conteúdo.
- Capa: chave discreta "reunir o bando". Capítulos: o texto da transição sai antes do slide aparecer, sem sobreposição.
- Slides 4 e 8: fluxos redesenhados com mais espaço; um teste confere que nenhuma seta atravessa caixa e nenhum texto se sobrepõe.
- Slide 14: o "Faz" de cada etapa traz itens da própria proposta, com o slide de origem.
- Slide 15: matriz RASCI editável (clique troca o papel, botão direito volta, nome editável, adicionar e remover decisões, status por decisão, restaurar proposta).

## Roteiro (23 slides, 6 capítulos)

| # | Slide | O que mudou |
|---|---|---|
| 1 | Capa | Bando de pássaros Enjourney em voo; o botão "Unir o bando à Enjourney" leva cada um ao logo (três pousam nas posições exatas do símbolo, os outros se fundem). Desligar solta o bando de novo. |
| 2 | Resumo executivo | Faixa de números no estilo "Enjourney em números" e o pedido em destaque. |
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
