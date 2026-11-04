# Bússola DTS 2027 · como ligar a base de respostas e rodar a dinâmica

## 1. Criar a planilha (5 minutos, uma vez)

1. Crie uma planilha nova no Google Drive (ex.: `Bússola DTS 2027 · Respostas`).
2. Menu **Extensões → Apps Script**. Apague o conteúdo que aparece e cole o arquivo `Codigo.gs` inteiro.
3. Na primeira linha útil, troque `TOKEN = 'troque-por-uma-senha'` por uma senha sua (letras e números, sem espaço).
4. Salve (ícone de disquete). Opcional: menu **Executar → testeLocal** para criar uma linha de exemplo e conferir que as abas `Respostas` e `Resumo` aparecem na planilha. Na primeira execução o Google pede autorização: aceite.
5. **Implantar → Nova implantação → tipo "App da Web"**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Clique em Implantar e copie o link que termina em `/exec`.

## 2. Ligar a bússola à planilha

Abra `bussola-dts-2027.html` num editor de texto e preencha o bloco do início:

```js
window.BUSSOLA_CONFIG = {
  sheetsEndpoint: 'https://script.google.com/macros/s/.../exec',  // o link copiado
  painelToken: 'a-senha-que-voce-colocou-no-TOKEN',
  mostrarAderencia: false,
  tripulacao: ['Nome 1', 'Nome 2']   // opcional: os diretores que respondem
};
```

Sem o link, a bússola funciona do mesmo jeito, mas guarda a resposta só no navegador de quem respondeu.

`tripulacao` é opcional. Com a lista de nomes, a pergunta "quem você chama quando…" mostra botões com os nomes, e as indicações chegam escritas do mesmo jeito. Sem a lista, cada pessoa digita os nomes, e o painel junta as grafias parecidas (acentos e maiúsculas não contam).

Teste: abra o HTML, responda com um nome de teste e veja a linha chegar na aba `Respostas`. Se a última tela disser "Enviado à facilitação", está ligado. Apague a linha de teste depois.

Se mudar o `Codigo.gs` depois de implantado, faça **Implantar → Gerenciar implantações → editar → Nova versão**; o link `/exec` continua o mesmo. Se a aba `Respostas` já existir de um teste anterior, não é preciso apagá-la: colunas novas (como `carga2027` e `cargaNova`) entram no fim sozinhas, e o `Resumo` lê os títulos reais da aba.

## 3. Publicar o link para os diretores

A bússola é um arquivo HTML só. Opções:

- **GitHub Pages** (este repositório): Settings → Pages → Branch → a pasta `planejamento-fy27`. O link fica `https://<usuario>.github.io/produtos/planejamento-fy27/bussola-dts-2027.html`. Atenção: o repositório é público; o link não aparece em busca, mas qualquer pessoa com ele abre.
- Qualquer hospedagem estática da A&M (SharePoint não executa o script; usar um site estático interno).
- Enviar o arquivo por e-mail funciona, mas o celular pode não abrir bem; prefira um link.

Funciona em celular e computador. Cada pessoa deve responder de uma vez só; se fechar, ao reabrir continua de onde parou.

## 4. Dois jeitos de rodar

**Antes do encontro (assíncrono).** Mande o link com um prazo. As respostas chegam na planilha; na véspera, abra o painel e monte os slides de resultado.

**Ao vivo, na abertura do dia (recomendado para a "dinâmica inicial").**
1. Projete o link ou um QR code. Todos respondem no celular ou no notebook: uns 12 minutos. Cada ato abre com uma cartela que espera a pessoa clicar em "Seguir viagem", e os nomes dos atos na barra de baixo (Porto, Tempestade…) levam de volta a qualquer ato já visitado.
2. Enquanto respondem, abra no projetor `bussola-dts-2027.html?painel` e clique em **Ler a planilha ao vivo**. O painel atualiza sozinho a cada 30 segundos; as agulhas vão aparecendo.
3. O painel tem onze páginas, no mesmo enquadramento da dinâmica, e o botão "Voltar à Bússola" leva de volta à dinâmica. Navegue pelas abas da barra de baixo ou pelas setas do teclado. Leitura sugerida (15 minutos):
   - *Direção*: para onde o time aponta. A seta laranja é o planejamento; as azuis, cada diretor; a tracejada, a média.
   - *Dilema*: o dilema CFO × CIO. Mostra quem está de cada lado e o que cada um respondeu no farol, quando pensou com calma.
   - *Papéis*: como o tempo do diretor se divide hoje e como o time quer que se divida em 2027 (front do projeto, gate de qualidade, vender, expandir contas, desenvolver o time, construir ofertas). Mostra onde não há consenso e, com o cargo preenchido, o que cada cargo espera.
   - *Casco*: os cinco rebites da integridade do time (confiança, conflito produtivo, compromisso, cobrança mútua, resultado coletivo) e o índice de 0 a 100.
   - *Chamados*: a quem o time recorre para abrir a porta de um CFO, segurar um projeto que sai do trilho e fechar uma proposta difícil. Os nomes ficam ocultos por padrão; o botão "Mostrar nomes" é para a facilitação.
   - *Pautas*: o painel escreve onde o time diverge do plano, onde hesitou, que rebite vaza e onde há dependência ou lacuna de referência. É a pauta da plenária.
   - *Mesa*: o porão (onde o esforço comercial vai) e os mostradores (receita, entrega, IA, fábrica e o restante), ao lado do plano.
   - *Carga*: o manifesto de carga. Para cada um dos 33 produtos de hoje, quantos diretores o embarcam em 2027 (em negrito, o que 3 de cada 4 embarcam; riscado, o que fica no cais), as cargas novas sugeridas (grafias parecidas somam juntas) e quem o time contrata.
   - *Reflexos* e *Garrafas*: quem o time atende primeiro no rádio, a velocidade, as hesitações e as mensagens na garrafa.
4. **Copiar resumo** cola um texto com todos os números. **Imprimir / PDF** gera uma página por tela, para levar ao PPT.

## 5. O que o painel mede

| Medida | O que é |
|---|---|
| Eixo esquerda–direita | Porta de entrada: 0 = o CFO chama quando a TI falhou; 100 = o CIO chama para não falhar. O planejamento está em 40 (entrar pela dor que o CIO já tem e ficar). |
| Eixo norte–sul | Foco do portfólio: 100 = núcleo forte, 0 = abrir frentes. Planejamento em 80. |
| Mostradores | Receita (hora × resultado), entrega (relatório × produto), IA (prática própria × dentro dos produtos com Data & IA), fábrica × parceiros, âncoras, consolidação, pessoas. |
| Mesa de investimento (o porão) | 100 caixas distribuídas pelos pilares, contra 25 · 35 · 25 · 10 · 5 do plano. |
| Contrato | Posição de 0 (tudo fixo, R$ 1,0 mi garantido) a 100 (R$ 0,6 mi fixo + 25% da economia, até R$ 1,8 mi). A tela mostra a parte fixa, a variável e a faixa do frete para cada posição. Alimenta o mostrador de receita. |
| Manifesto de carga | Quais dos 33 produtos de hoje (slide 15 do planejamento) cada diretor embarca em 2027, mais até três cargas novas. Colunas `carga2027` (nomes separados por ponto e vírgula), `cargaNova` e `produtos2027` (total a bordo). O total alimenta foco e consolidação (plano: 23). |
| Tripulação | As duas contratações sênior (coluna `contratacoes`). Cada perfil mostra o que faz e a frente que fortalece. |
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
