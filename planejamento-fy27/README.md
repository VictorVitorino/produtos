# Planejamento FY27 · Bússola DTS 2027

Diagnóstico de engajamento para os diretores executivos de DTS. É uma travessia de uns 12 minutos, em sete atos e vinte e duas manobras, feita no celular ou no notebook. Mede três coisas: para onde cada diretor quer levar DTS (estratégia), como a tripulação trabalha junta (papel, integridade e referências) e como DTS vende (onde pôr o esforço, a força do vento comercial e o que segura a venda). Cada pessoa sai com a própria bússola; na agenda presencial, todas entram no mesmo mostrador, ao lado da rota que o planejamento propõe.

| Ato | O que acontece | Manobras |
|---|---|---|
| I · O porto | Abertura. Não pede nome nem e-mail: cada aparelho recebe um código ("Comandante A1B2"); o cargo é opcional. | — |
| II · A tempestade | Oito escolhas de “isto ou aquilo”, até 30 segundos cada (dá tempo de ler antes de escolher), contadas com histórias do mar (o reboque ou a revisão do motor, a rede ou o anzol, o próprio estaleiro ou os parceiros). Mede instinto, velocidade e hesitação. | 1 a 8 |
| III · A navegação | Carta náutica (rota), porão (100 caixas por pilar), rádio de bordo (quem atender) e contrato (fixo × resultado: os valores da parte fixa, da parte variável e da faixa que o frete pode render mudam enquanto a pessoa arrasta). | 9 a 12 |
| IV · Águas profundas | Sonar (IA), diário de bordo (pelo que ser lembrado), manifesto de carga (quais dos 33 produtos de hoje embarcam em 2027; cada um vira um contêiner no convés, e dá para embarcar até três cargas novas) e os ventos da venda (a força do vento comercial de DTS hoje, de calmaria a vento de popa, e as duas âncoras que mais seguram a venda: tempo, oferta clara, ferramentas, treinamento, coach, go-to-market com os MDs, cases ou gente que vende). | 13 a 16 |
| V · O casco | Quarto de serviço (como o tempo do diretor se divide hoje e em 2027), os cinco rebites da integridade do time e o apito de bordo (a quem cada um recorre). | 17 a 20 |
| VI · O farol | O dilema central, com calma: o resgate na tempestade (a consultoria que o CFO chama quando a TI falhou) ou o prático do canal (a que o CIO chama para não falhar). | 21 |
| VII · O amanhecer | Mensagem na garrafa e a carta do comandante: a bússola calibrada e, numa página, o arquétipo em uma frase com o desafio (rebocador de salvamento, prático de confiança, guarda costeira, estaleiro da frota ou resgate que fica a bordo), quatro leituras com veredito (rumo, carga, papel e venda, casco), o instinto na tempestade e uma pergunta para levar à mesa. | 22 |

Cada troca de ato abre com o vídeo do ato, que espera a pessoa clicar em "Seguir viagem". Isso vale também ao voltar, pelo botão Voltar ou pelos nomes dos atos na barra de baixo. O botão Recomeçar, na mesma barra, pede confirmação, apaga as respostas daquele navegador e recomeça do porto, com os vídeos de novo.

| Arquivo | O que é |
|---|---|
| `bussola-dts-2027.html` | A dinâmica (participante) e, com `?painel` no fim do link, o painel da facilitação em onze páginas. Arquivo único, sem dependências além das fontes do Google. |
| `mostrador-vivo.html` | O resultado ao vivo, para projetar no encontro. Arquivo separado, ligado à mesma planilha: se atualiza sozinho a cada 8 segundos e responde quatro perguntas (que consultoria DTS quer ser, onde concentrar o esforço, o que segura a venda, se a tripulação está pronta), com a manchete do diagnóstico e três decisões para a plenária. Pede a senha do painel; `?demo` no fim do link mostra uma simulação para ensaio. |
| `google-apps-script/Codigo.gs` | Script da planilha que recebe as respostas e devolve ao painel. |
| `google-apps-script/LEIAME.md` | Passo a passo: ligar a planilha, publicar o link, rodar ao vivo ou antes do encontro, ler o painel. |

## Enquadramento de tela

O palco é um quadro 16:9 centralizado, com o fundo externo visível e a navegação logo abaixo. É o mesmo enquadramento do Caderno de Nivelamento. Tudo dentro do palco é dimensionado pela altura do próprio palco (unidades de contêiner) e por pontos de quebra de largura e altura, sem zoom e sem `scale()`.

Foi testado a 100% de zoom em 1280×720, 1366×768, 1440×900, 1536×864 (Full HD com escala de 125%), 1600×900, 1680×1050, 1920×1080 e 2560×1440: nenhuma tela corta ou rola. No celular e no tablet em pé, o palco ocupa a tela inteira e rola por dentro.

O que a bússola mede e de onde vêm as posições do planejamento está descrito no LEIAME (seção 5) e no início do script do HTML (`DIMS`, `PLAN_MESA`). O catálogo de hoje, usado no manifesto de carga, está em `CATALOGO` (slide 15 do Planejamento FY27).
