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
  mostrarAderencia: false
};
```

Sem o link, a bússola funciona do mesmo jeito, mas guarda a resposta só no navegador de quem respondeu.

Teste: abra o HTML, responda com um nome de teste e veja a linha chegar na aba `Respostas`. Se a última tela disser "Enviado à facilitação", está ligado. Apague a linha de teste depois.

Se mudar o `Codigo.gs` depois de implantado, faça **Implantar → Gerenciar implantações → editar → Nova versão**; o link `/exec` continua o mesmo.

## 3. Publicar o link para os diretores

A bússola é um arquivo HTML só. Opções:

- **GitHub Pages** (este repositório): Settings → Pages → Branch → a pasta `planejamento-fy27`. O link fica `https://<usuario>.github.io/produtos/planejamento-fy27/bussola-dts-2027.html`. Atenção: o repositório é público; o link não aparece em busca, mas qualquer pessoa com ele abre.
- Qualquer hospedagem estática da A&M (SharePoint não executa o script; usar um site estático interno).
- Enviar o arquivo por e-mail funciona, mas o celular pode não abrir bem; prefira um link.

Funciona em celular e computador. Cada pessoa deve responder de uma vez só; se fechar, ao reabrir continua de onde parou.

## 4. Dois jeitos de rodar

**Antes do encontro (assíncrono).** Mande o link com um prazo. As respostas chegam na planilha; na véspera, abra o painel e monte os slides de resultado.

**Ao vivo, na abertura do dia (recomendado para a "dinâmica inicial").**
1. Projete o link ou um QR code. Todos respondem no celular: 7 minutos.
2. Enquanto respondem, abra no projetor `bussola-dts-2027.html?painel` e clique em **Ler a planilha ao vivo**. O painel atualiza sozinho a cada 30 segundos; as agulhas vão aparecendo.
3. O painel tem sete páginas, no mesmo enquadramento da dinâmica. Navegue pelas abas da barra de baixo ou pelas setas do teclado. Leitura sugerida (10 minutos):
   - *Direção*: para onde o time aponta. A seta laranja é o planejamento; as azuis, cada diretor; a tracejada, a média.
   - *Dilema*: o dilema CFO × CIO. Mostra quem está de cada lado e o que cada um respondeu no farol, quando pensou com calma.
   - *Pautas*: o painel escreve onde o time diverge do plano e onde hesitou. É a pauta da plenária.
   - *Mesa*: o porão (onde o esforço comercial vai) e os mostradores (receita, entrega, IA, fábrica e o restante), ao lado do plano.
   - *Reflexos* e *Garrafas*: quem o time atende primeiro no rádio, a velocidade, as hesitações e as mensagens na garrafa.
4. **Copiar resumo** cola um texto com todos os números. **Imprimir / PDF** gera uma página por tela, para levar ao PPT.

## 5. O que o painel mede

| Medida | O que é |
|---|---|
| Eixo esquerda–direita | Porta de entrada: 0 = o CFO chama quando a TI falhou; 100 = o CIO chama para não falhar. O planejamento está em 40 (entrar pela dor que o CIO já tem e ficar). |
| Eixo norte–sul | Foco do portfólio: 100 = núcleo forte, 0 = abrir frentes. Planejamento em 80. |
| Mostradores | Receita (hora × resultado), entrega (relatório × produto), IA (prática própria × dentro dos produtos com Data & IA), fábrica × parceiros, âncoras, consolidação, pessoas. |
| Mesa de investimento (o porão) | 100 caixas distribuídas pelos pilares, contra 25 · 35 · 25 · 10 · 5 do plano. |
| Aderência | Distância média ponderada entre as respostas e a posição do plano (0–100). Serve para abrir a conversa, não para dar nota. Por padrão o participante não vê. |
| Reflexo | Mediana do tempo nas 8 decisões de 6 segundos. Hesitação = o relógio zerou. |
| Coerência | Quanto o instinto (reflexos) e a reflexão (carta náutica, farol, sonar de IA) apontam para o mesmo lado. |
| Convicção | Metade reflexo, metade coerência. Define o tamanho da agulha de cada pessoa. |

As posições do planejamento estão no início do script do HTML (`DIMS` e `PLAN_MESA`). Se o plano mudar, é ali que se ajusta.

## 6. Privacidade

A resposta individual fica na planilha (nome, respostas, tempos). O painel mostra iniciais na bússola e nomes na tabela. Combine com o grupo o que será projetado: a sugestão é mostrar a bússola e as pautas, e deixar a tabela por pessoa para a facilitação.
