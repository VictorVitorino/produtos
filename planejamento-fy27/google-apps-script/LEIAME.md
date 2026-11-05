# Bússola DTS 2027 · como ligar a base de respostas e rodar a dinâmica

## 1. Ligar a planilha (uns 5 minutos, uma vez)

1. Abra a planilha no Google Planilhas (conta Google pessoal ou uma que permita acesso "Qualquer pessoa"; contas corporativas às vezes bloqueiam isso).
2. Menu **Extensões → Apps Script**. Apague o que aparece e cole o `Codigo.gs` inteiro. Na linha `var TOKEN = ...` coloque uma senha sua (é a senha do painel; só você a usa).
3. Salve (disquete). No menu de funções escolha **testeLocal** e clique **Executar**. O Google pede autorização: *Revisar permissões → sua conta → Avançado → Acessar (não seguro) → Permitir*. As abas `Respostas` e `Resumo` aparecem com uma linha "Teste"; apague essa linha depois.
4. **Implantar → Nova implantação → ⚙ App da Web**. *Executar como:* **Eu**. *Quem pode acessar:* **Qualquer pessoa**. Implantar e copiar o link que termina em **/exec**.
5. No arquivo `bussola-dts-2027.html`, num editor de texto (Bloco de Notas, não o Word), no bloco do início, cole o link em `sheetsEndpoint: ''` entre as aspas. **Deixe `painelToken` vazio**: este arquivo vai para os diretores, e a senha do painel não pode ir junto.
6. **Teste como um diretor:** salve o arquivo no computador, abra com duplo clique (assim ele chega à planilha igual a quem o baixou), vá a `?painel` no fim do endereço e clique **Testar o envio**. Deve aparecer "✔ A planilha respondeu". Se aparecer ✘, a mensagem diz a causa mais provável.

Se mudar o `Codigo.gs` depois de implantado: **Implantar → Gerenciar implantações → editar → Nova versão** (o link continua o mesmo).

> **Sem nome:** a bússola não pede nome nem e-mail. Cada aparelho recebe um código ("Comandante A1B2") que aparece na planilha e no painel; quem recomeça no mesmo aparelho mantém o código. O cargo (opcional) é a única informação de identificação.

## 2. O que garante que nenhuma resposta se perde

- **Tempo real:** a linha da pessoa aparece na planilha assim que ela preenche o nome e é atualizada a cada resposta (em até 1 segundo). Fica com `status` "em andamento" até concluir; aí vira "concluída". O painel mostra quem está respondendo agora e só analisa as concluídas, e o Resumo também.
- O arquivo, aberto de qualquer lugar (link ou baixado), envia a resposta à planilha ao terminar. A tela só diz "enviada" quando a planilha confirma.
- Sem internet, ou se a planilha recusar, a resposta fica guardada no navegador e é reenviada sozinha; a tela pede para manter a página aberta.
- Plano B: na tela final aparecem **Copiar minhas respostas** e **Baixar arquivo**. A pessoa manda o texto ou o arquivo para você, e no painel você usa **Abrir arquivos de resposta** (ou cola o texto) para incluí-las.
- Quem recomeça e responde de novo: vale a resposta mais recente; a antiga fica na planilha marcada como "substituída" e não entra no Resumo nem no painel.

## A lógica do diagnóstico: 4 frentes

A carta de cada diretor e o mostrador do time usam o mesmo motor. Cada frente responde em cinco passos: o que foi respondido, o que isso quer dizer, como se compara ao planejamento, o que levar para a conversa e as ações sugeridas. As ações são sugestões; o time decide estas e outras.

| Frente | Respostas que entram | Respostas possíveis | Exemplo de ação sugerida |
|---|---|---|---|
| 1 · Que tipo de consultoria DTS quer ser? | Reflexos do motor e do resgate, chamados atendidos no rádio, escolha do farol | **O resgate na crise** (CFO chama quando a TI falhou) · **Entrar na crise e ficar a bordo** (o plano) · **O prático que previne** (CIO chama para não falhar) | Oferta de continuidade depois do resgate; escolher as 3 dores de entrada; oferta recorrente ao CIO |
| 2 · Poucas coisas muito bem, ou muitas? | Rota, reflexos da pesca e do mar novo, porão (núcleo), produtos mantidos no manifesto | **Poucas coisas, muito bem feitas** · **Um núcleo forte e poucas apostas** · **Muitas frentes ao mesmo tempo**. Avisa se o discurso é de foco e o catálogo ficou cheio | Definir produtos âncora com dono; aposentar o que ficou no cais; abrir frentes com parceiros |
| 3 · Como DTS deve vender e cobrar? | Porão (onde vai o esforço), contrato e reflexo do quinhão (preço), vento comercial (1 a 5), as duas âncoras da venda | **Esforço em [pilar], com preço fixo / misto / ligado ao resultado**; quanto a venda tem método hoje; o que mais trava | Uma ação para cada âncora (horas fixas de venda, pipeline único, duplas de venda, cases com números…); rito comercial semanal; testar preço por resultado |
| 4 · O time está pronto para isso? | Divisão do tempo hoje e em 2027 (com burocracias), os cinco rebites do casco, a quem o time recorre | **Sim: casco firme** · **Quase: pontos de atenção** · **Ainda não: o casco vaza**; o que precisa sair da agenda do diretor | Uma ação para o rebite mais fraco; passar front para gerentes; cortar burocracias; formar segunda referência |

Faixas usadas: porta de entrada abaixo de 38 é crise, acima de 62 é prevenção, entre elas é "entrar e ficar"; foco acima de 62 é foco, abaixo de 38 é amplitude. Quando o farol (com calma) e os reflexos apontam para lados diferentes, o diagnóstico diz isso. No fim da carta, cada diretor pode propor outra ação; ela vai para a coluna `acaoPropria` da planilha e aparece no plano de ação do mostrador, sem nome.

### A leitura em 4 abas (carta de cada diretor e mostrador do time)

O botão do plano de ação abre a mesma leitura nos dois lugares, em 4 abas:

| Aba | O que mostra | De onde vem |
|---|---|---|
| 1 · Somos assim | Uma frase de identidade por frente ("Somos o resgate que fica a bordo…") e como ela se compara ao planejamento | Zona de cada frente: porta, foco, preço e vento, papel e casco |
| 2 · Ganhos e perdas | O que cada escolha traz e o que custa, frente a frente | Texto próprio de cada zona; os produtos que ficam no cais e o papel que perde tempo entram pelo nome |
| 3 · Forças e fraquezas | Uma SWOT interna, com números ("9 de 14 topam cobrar pelo resultado", "Cobrança mútua: 2,1 de 5") | Regras sobre as respostas: maioria, um terço, médias do casco ≥ 3,8 ou ≤ 3,2, burocracia ≥ 10% |
| 4 · Possíveis ações | Ações sugeridas por frente, em aberto. No mostrador: aprovar, descartar e acrescentar, mais as ideias dos diretores | Mapas de ação por zona, âncora da venda, ponto do casco e papel |

Na carta individual, a aba 3 fala de "suas forças" e "suas fraquezas", a partir das respostas da própria pessoa. "Copiar plano" leva as 4 partes em texto.

## Mostrador vivo (o resultado na tela, enquanto respondem)

Abra `mostrador-vivo.html` no computador do projetor e digite a senha do painel (o TOKEN do `Codigo.gs`); ela fica guardada só naquele computador. A tela lê a planilha a cada 8 segundos e mostra:

- **Manchete:** o diagnóstico do time em uma frase (o arquétipo que predomina, porta de entrada e foco contra o plano).
- **As 4 frentes:** a resposta do time em cada uma e o que ela quer dizer. Cada uma conta quem já passou por aquela pergunta, então os números sobem enquanto o time responde.
- **Plano de ação:** o botão abre as ações sugeridas por frente. Toque uma vez para aprovar, de novo para descartar; acrescente outras ações na hora; as ideias dos diretores aparecem ali. **Copiar plano** leva tudo em texto para o PPT.

Contadores no topo mostram concluídas e quem está respondendo agora. **Copiar diagnóstico** leva o texto com os números para o PPT. Para ensaiar sem respostas, abra com `?demo` no fim do endereço (dados fictícios). Não envie este arquivo aos diretores.

## 3. Publicar o link para os diretores

A bússola é um arquivo HTML só. Opções:

- **GitHub Pages** (este repositório): Settings → Pages → Branch → a pasta `planejamento-fy27`. O link fica `https://<usuario>.github.io/produtos/planejamento-fy27/bussola-dts-2027.html`. Atenção: o repositório é público; o link não aparece em busca, mas qualquer pessoa com ele abre.
- Qualquer hospedagem estática da A&M (SharePoint não executa o script; usar um site estático interno).
- Enviar o arquivo por e-mail funciona, mas o celular pode não abrir bem; prefira um link.

Funciona em celular e computador. Cada pessoa deve responder de uma vez só; se fechar, ao reabrir continua de onde parou.

## 4. Dois jeitos de rodar

**Antes do encontro (assíncrono).** Mande o link com um prazo. As respostas chegam na planilha; na véspera, abra o painel e monte os slides de resultado.

**Ao vivo, na abertura do dia (recomendado para a "dinâmica inicial").**
1. Projete o link ou um QR code. Todos respondem no celular ou no notebook: uns 12 minutos. Cada troca de ato abre com o vídeo do ato, que espera a pessoa clicar em "Seguir viagem"; isso vale também ao voltar (botão Voltar ou nomes dos atos na barra de baixo, que levam a qualquer ato já visitado). O botão Recomeçar pede confirmação, apaga as respostas daquele navegador e recomeça do porto, com os vídeos de novo. Se alguém recomeçar e responder outra vez, o painel considera só a bússola mais recente de cada nome.
2. Enquanto respondem, abra no projetor `bussola-dts-2027.html?painel` e clique em **Ler a planilha ao vivo**. O painel atualiza sozinho a cada 30 segundos; as agulhas vão aparecendo.
3. O painel tem onze páginas, no mesmo enquadramento da dinâmica, e o botão "Voltar à Bússola" leva de volta à dinâmica. Navegue pelas abas da barra de baixo ou pelas setas do teclado. Leitura sugerida (15 minutos):
   - *Direção*: para onde o time aponta. A seta laranja é o planejamento; as azuis, cada diretor; a tracejada, a média.
   - *Dilema*: o dilema CFO × CIO. Mostra quem está de cada lado e o que cada um respondeu no farol, quando pensou com calma.
   - *Papéis*: como o tempo do diretor se divide hoje e como o time quer que se divida em 2027 (front do projeto, gate de qualidade, vender, expandir contas, desenvolver o time, construir ofertas, burocracias). Mostra onde não há consenso e, com o cargo preenchido, o que cada cargo espera.
   - *Casco*: os cinco rebites da integridade do time (confiança, conflito produtivo, compromisso, cobrança mútua, resultado coletivo) e o índice de 0 a 100.
   - *Chamados*: a quem o time recorre para abrir a porta de um CFO, segurar um projeto que sai do trilho e fechar uma proposta difícil. Os nomes ficam ocultos por padrão; o botão "Mostrar nomes" é para a facilitação.
   - *Pautas*: o painel escreve onde o time diverge do plano, onde hesitou, que rebite vaza e onde há dependência ou lacuna de referência. É a pauta da plenária.
   - *Mesa*: o porão (onde o esforço comercial vai) e os mostradores (receita, entrega, IA, fábrica e o restante), ao lado do plano.
   - *Carga*: o manifesto de carga. Para cada um dos 33 produtos de hoje, quantos diretores o embarcam em 2027 (em negrito, o que 3 de cada 4 embarcam; riscado, o que fica no cais), as cargas novas sugeridas (grafias parecidas somam juntas), a força média do vento comercial e o que mais segura a venda.
   - *Reflexos* e *Garrafas*: quem o time atende primeiro no rádio, a velocidade, as hesitações e as mensagens na garrafa.
4. **Copiar resumo** cola um texto com todos os números. **Imprimir / PDF** gera uma página por tela, para levar ao PPT.

## 5. O que o painel mede

| Medida | O que é |
|---|---|
| Eixo esquerda–direita | Porta de entrada: 0 = o CFO chama quando a TI falhou; 100 = o CIO chama para não falhar. O planejamento está em 40 (entrar pela dor que o CIO já tem e ficar). |
| Eixo norte–sul | Foco do portfólio: 100 = núcleo forte, 0 = abrir frentes. Planejamento em 80. |
| Arquétipo | Vem dos dois eixos. Porta entre 38 e 62 e foco a partir de 38 = resgate que fica a bordo (é onde está o plano). Fora dessa faixa, vale o quadrante: CFO e núcleo = rebocador de salvamento; CIO e núcleo = prático de confiança; CFO e frentes = guarda costeira; CIO e frentes = estaleiro da frota. |
| Carta do comandante | A tela final do participante. Traz o arquétipo em uma frase, com o desafio, e quatro leituras com veredito: rumo (porta e foco), carga (maior aposta do porão, tamanho do catálogo e preço), papel e venda (o que muda no papel em 2027, a força do vento comercial e o que falta para vender) e casco (índice e rebite que mais vaza). Fecha com o instinto na tempestade e uma pergunta para levar à mesa. Não mostra aderência nem opinião formada; a aderência só aparece com `mostrarAderencia: true`, junto da marca do plano nas réguas. |
| Mostradores | Receita (hora × resultado), entrega (relatório × produto), IA (prática própria × dentro dos produtos com Data & IA), fábrica × parceiros, âncoras e consolidação. |
| Mesa de investimento (o porão) | 100 caixas distribuídas pelos pilares, contra 25 · 35 · 25 · 10 · 5 do plano. |
| Contrato | Posição de 0 (tudo fixo, R$ 1,0 mi garantido) a 100 (R$ 0,6 mi fixo + 25% da economia, até R$ 1,8 mi). A tela mostra a parte fixa, a variável e a faixa do frete para cada posição. Alimenta o mostrador de receita. |
| Manifesto de carga | Quais dos 33 produtos de hoje (slide 15 do planejamento) cada diretor embarca em 2027, mais até três cargas novas. Colunas `carga2027` (nomes separados por ponto e vírgula), `cargaNova` e `produtos2027` (total a bordo). O total alimenta foco e consolidação (plano: 23). |
| Ventos da venda | A força do vento comercial de DTS hoje, de 1 (calmaria: esperamos o cliente ligar) a 5 (vento de popa: máquina de venda, com metas, rituais e MDs juntos), na coluna `ventoVenda`. E as duas âncoras que mais seguram a venda, na coluna `ancorasVenda`, entre oito: tempo para vender, oferta clara, ferramentas de venda, treinamento comercial, coach de venda, go-to-market com os MDs, cases e referências, gente que vende. |
| Aderência | Distância média ponderada entre as respostas e a posição do plano (0–100). Serve para abrir a conversa, não para dar nota. Por padrão o participante não vê. |
| Reflexo | Mediana do tempo nas 8 decisões de até 30 segundos. Hesitação = o relógio zerou. |
| Revisões | Quantos reflexos a pessoa trocou depois de usar o botão Voltar. A primeira resposta fica guardada no estado da linha (coluna `estado`); se o relógio zerar numa pergunta revisitada, vale a resposta anterior. |
| Coerência | Quanto o instinto (reflexos) e a reflexão (carta náutica, farol, sonar de IA) apontam para o mesmo lado. |
| Opinião formada | Metade reflexo, metade coerência. Define o tamanho da agulha de cada pessoa no painel. Resposta rápida indica opinião já formada sobre o tema, não competência nem qualidade de decisão: é assunto de conversa, e o participante não vê esse número. |
| Papel do diretor | Divisão do tempo, em blocos de 10%, hoje e em 2027, entre front do projeto, gate de qualidade, vender, expandir contas, desenvolver o time e construir ofertas. |
| Casco | Concordância de 1 a 5 com uma frase para cada rebite (confiança, conflito produtivo, compromisso, cobrança mútua, resultado coletivo). O índice do casco é a média, em 0–100. |
| Chamados | Até duas pessoas por pergunta (ou "ninguém em especial"). Mostra referências concentradas (dependência) e perguntas sem referência (lacuna). |

As posições do planejamento estão no início do script do HTML (`DIMS` e `PLAN_MESA`), e o catálogo de hoje está em `CATALOGO`. Se o plano ou o catálogo mudarem, é ali que se ajusta.

## 6. Privacidade

A resposta individual fica na planilha (nome, respostas, tempos e as indicações de colegas). As indicações são o dado mais sensível: o painel mostra o mapa sem nomes por padrão, e a sugestão é não projetar a versão com nomes. O painel mostra iniciais na bússola e nomes na tabela. Combine com o grupo o que será projetado: a sugestão é mostrar a bússola e as pautas, e deixar a tabela por pessoa para a facilitação.
