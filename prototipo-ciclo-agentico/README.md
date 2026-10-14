# Protótipo: ciclo agêntico de custos de transporte

Protótipo pequeno e honesto do padrão central de uma proposta recebida de terceiros: **o agente reúne e parametriza → o código calcula → o agente explica as diferenças → a pessoa aprova**. As faixas de tolerância decidem o que passa com regra registrada. Acima da faixa, uma pessoa com nome permite cada exceção, com motivo e data, e tudo fica registrado no ciclo.

Tudo aqui é **sintético**: a "Transportadora Exemplo", os carregadores Alfa, Beta, Gama e Delta, a fornecedora, as pessoas, os volumes, as tarifas e os preços. Nenhum dado, nome ou número vem do cliente nem da proposta.

## Resposta curta: é simples?

**O núcleo é simples e cabe num protótipo funcional.** São 2.316 linhas de Python (468 delas de testes), que rodam o ciclo inteiro do começo ao fim: fontes faltantes por responsável, parâmetros lidos de e-mail livre, cálculo versionado, diferenças decompostas e classificadas, explicação, permissão nominal, fechamento bloqueado e relatório. A primeira versão levou cerca de 20 minutos. Duas verificações independentes acharam 17 falhas no total, todas corrigidas em mais cerca de 1 hora e 5 minutos. Nenhuma alterava os valores apurados no cenário do demo. A mais séria da segunda verificação era de controle, não de conta: um e-mail novo, avisando uma tarifa acima da materialidade, podia ficar fora do fechamento. Hoje o cálculo e o fechamento exigem uma coleta que tenha visto todos os arquivos do mês.

**O difícil não é o código.** É o que está na tabela [Protótipo → Produção](#protótipo--produção):

- acesso de leitura ao ERP e à exportação da OT;
- identidade corporativa (SSO);
- as regras reais mapeadas, com o solver e as retificações retroativas;
- faixas de tolerância assinadas pela controladoria;
- revisão de segurança e contrato com o provedor do modelo;
- adoção pela equipe.

Isso confirma a leitura da própria proposta: os maiores riscos são regras que divergem da prática e um time que não adota a ferramenta, não a tecnologia.

## Como ver sem rodar nada

Abra a pasta `exemplo/`, gerada pelo `demo`:

| Arquivo | O que mostra |
|---|---|
| `exemplo/relatorio_2026-09.html` | Relatório do ciclo em uma página só: fontes, parâmetros, totais, diferenças por faixa, permissões e trilha de auditoria |
| `exemplo/ciclo_2026-09.xlsx` | A mesma informação em planilha, com as abas Totais, Linhas calculadas, Diferenças, Permissões, Fontes e Trilha |
| `exemplo/gateway_log.jsonl` | Cada chamada ao "modelo", com o conteúdo já redigido: o que sairia do perímetro |
| `exemplo/demo_console.txt` | A saída do terminal do `demo`, passo a passo |

O `demo` roda com o relógio fixo em 07/10/2026 09:00. Assim, a pasta `exemplo/` sai idêntica byte a byte a cada execução e não gera ruído no git.

## Como rodar

Requisitos: Python 3.13 e `openpyxl`. O SDK `anthropic` é opcional.

```bash
cd prototipo-ciclo-agentico
python3 ciclo.py demo                               # ciclo inteiro roteirizado em saida/demo/; atualiza exemplo/
python3 -m unittest discover -s testes -v           # 32 testes (1 pulado sem o SDK anthropic)
python3 gerar_dados.py                              # (opcional) regenera dados/ de forma determinística
python3 ciclo.py --help                             # ajuda em português
```

Passo a passo manual. O estado fica em `saida/ciclo.sqlite`, separado do `demo`, que usa `saida/demo/`. Os comandos abaixo funcionam logo depois do `demo`. Para repetir o passo a passo depois de fechar o ciclo, apague o estado antes: `rm -rf saida` (ou use outra pasta com `--saida`). A ordem é obrigatória. `calcular` e `fechar` recusam sem `coletar`, ou se algum arquivo do mês chegou, mudou ou sumiu depois da última coleta (um e-mail novo, por exemplo). `aprovar` e `fechar` recusam item acima da faixa que ainda não foi explicado no último cálculo.

```bash
python3 ciclo.py coletar                            # fontes do mês + parâmetros propostos (pendentes)
python3 ciclo.py parametros --aceitar 1 2 --por "Bruno Costa"   # sem decidir os parâmetros, o ciclo não fecha
python3 ciclo.py calcular                           # cálculo, comparação e faixas; imprime versão e diferenças
python3 ciclo.py explicar                           # explicação das diferenças acima da faixa
python3 ciclo.py fechar --por "Paula Ramos"         # recusado: D01 acima da materialidade sem permissão
python3 ciclo.py aprovar D01 --por "Paula Ramos" --papel Controladoria --motivo "Aditivo conferido"
python3 ciclo.py aprovar D04 --por "Carlos Mendes" --papel "Analista sênior" --motivo "Pedir o arquivo do portal" --devolver
python3 ciclo.py fechar --por "Paula Ramos"
python3 ciclo.py relatorio                          # saida/relatorio_2026-09.html e saida/ciclo_2026-09.xlsx
```

### Modo online (Claude) e modo OFFLINE

O gateway decide o modo a cada chamada. O padrão (`CICLO_MODO=auto`) só fica online quando o SDK está instalado **e** existe uma credencial que o SDK encontraria. A busca segue a ordem do SDK: `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_PROFILE`, as variáveis de federação de identidade (WIF) e, por último, o perfil gravado por `ant auth login` (em `~/.config/anthropic/credentials/` ou `$ANTHROPIC_CONFIG_DIR`). Se a credencial vier de outro lugar, `CICLO_MODO=online` força a tentativa e deixa a autenticação com o SDK.

```bash
pip install anthropic
export ANTHROPIC_API_KEY=...                        # ou ANTHROPIC_AUTH_TOKEN, ou `ant auth login`
export CICLO_MODELO=claude-opus-5-5                 # padrão; qualquer modelo Claude
export CICLO_ESFORCO=low                            # low | medium | high (padrão low: extração e textos curtos)
export CICLO_MODO=auto                              # auto | online | offline
```

Sem SDK ou sem credencial, tudo roda em modo **OFFLINE**: a extração usa expressões regulares e as explicações usam modelos de texto fixos, marcados com `[offline]`. O substituto offline recebe **o mesmo texto já redigido** que o modelo receberia.

A chamada online usa `client.beta.messages.create` com:

- saída estruturada em JSON Schema (`output_config.format`) na extração;
- `fallbacks: "default"` (beta `server-side-fallback-2026-07-01`) para recusas;
- tratamento de `stop_reason` e de erros da API.

Qualquer falha volta ao offline, e o motivo fica no log.

## O cenário sintético de setembro de 2026

O gerador `gerar_dados.py` planta problemas realistas para a ferramenta encontrar:

| Problema plantado | O que a ferramenta mostra |
|---|---|
| Aditivo muda a tarifa de movimentação do Beta, avisado só por e-mail; o ERP não foi atualizado | O agente propõe a nova tarifa (pendente até aceite). Com ela aceita, aparece uma **diferença de cálculo de R$ 254 mil**, acima da materialidade, que **bloqueia o fechamento** até a Controladoria permitir |
| A fornecedora informa por e-mail um preço do gás de uso do sistema 1,56% acima do índice público | **Preço acima do esperado**: R$ 82 mil no mês, acima da faixa, permitido com motivo |
| A capacidade do Delta caiu no contrato a partir de setembro; o ERP ainda cobra a antiga | Diferença de cálculo de −R$ 60,5 mil, acima da faixa. No demo fica **sem decisão**, de propósito: o release 1 deixa fechar, mas sinaliza e leva o item ao próximo ciclo |
| O ERP cobra capacidade extraordinária do Gama, mas o arquivo do portal não foi baixado | **Fonte faltante** (responsável: Operações Comerciais), em aberto há 1 ciclo; devolvida |
| Erro de R$ 0,37 na aritmética do ERP (Alfa), recorrente desde junho | Dentro da faixa: passa com regra registrada; idade de 3 ciclos |
| O ERP faturou sobre a medição provisória; a final certificada chegou depois (falta a do Delta) | 7 itens **ajuste provisória→final**, classe própria que nunca bloqueia. O Delta aparece com "base provisória" |
| E-mails com nome, e-mail, CPF, CNPJ e telefone (fictícios); o da fornecedora vem em texto + HTML, como sai do Outlook | O gateway corta esses dados antes de enviar, e o log prova. A redação cobre os formatos testados, não qualquer texto livre (ver Limitações) |

As diferenças entre a ferramenta e o ERP somam **exatamente** a diferença líquida entre os totais (R$ 143.090,49), e há um teste para isso.

## Módulos × os passos da proposta

| Passo da proposta | Módulo | O que faz |
|---|---|---|
| 1. O agente reúne | `ciclo_agentico/coletor.py` (`verificar_fontes`) + `operacoes.coletar` | Confere o manifesto `dados/manifesto_fontes.json`: recebida, parcial (o que falta) ou faltante, e de quem cobrar. Grava o status antes de ler qualquer arquivo, para não quebrar quando a fonte falta. Lê e-mails em texto, em texto + HTML ou só em HTML, sem a conversa citada |
| 2. O agente parametriza | `coletor.py` (`propor_parametros`) + `gateway.py` | Lê o e-mail livre e **propõe** um parâmetro com valor, vigência e trecho de origem. Confere se o valor e a data de vigência aparecem no texto. Fica pendente até `parametros --aceitar` ou `--rejeitar`. Um e-mail acima do limite do gateway fica como "não processado" e não para os demais |
| 3. O código calcula | `calculo.py` + `comparacao.py` | Recusa o cálculo sem coleta no ciclo, ou se algum arquivo do mês (e-mail inclusive) chegou, mudou ou sumiu desde a coleta: manda rodar `coletar`. Recusa também, dizendo o arquivo e o responsável, se faltar medição provisória, consumo, contratos ou índice. Calcula capacidade, movimentação e rateio do gás de uso do sistema em `Decimal`. Compara com o ERP (efeitos de quantidade, de tarifa e de aritmética) e com o esperado. Sem a pré-fatura, gera um único item "fonte faltante" em vez de linhas sem par. Classifica pelas faixas de `regras/faixas.json` e calcula a idade pelo histórico. A versão é o hash das entradas do mês, das referências (histórico, manifesto, contatos), das regras, do código de cálculo e dos parâmetros aceitos |
| 4. O agente explica | `explicador.py` + `gateway.py` | Escreve o texto curto em pt-BR de cada item acima da faixa e de cada anomalia. Todo número do texto, com separadores, "%", "mil" ou "milhão", precisa aparecer inteiro na evidência; senão, o texto é descartado |
| 5. A pessoa aprova | `operacoes.py` (`aprovar`, `fechar`) + `registro.py` | Permite ou devolve um item já explicado, com nome, papel autorizado, motivo e data (válida e não futura). A permissão vale para aquele valor. O fechamento é recusado em cinco casos: sem coleta ou com arquivo novo desde ela; parâmetro proposto sem decisão; entradas, referências ou código alterados desde o cálculo; item acima da faixa sem explicação no último cálculo; item bloqueante sem permissão. Com o ciclo fechado, só a consulta funciona (`parametros` sem argumentos, `relatorio`) |
| Registro e relatório | `registro.py`, `relatorio.py` | Guarda em SQLite entradas, versão, parâmetros, saídas, explicações, decisões e eventos, sem apagar nem sobrescrever: explicar de novo grava uma linha nova. Gera o relatório HTML autocontido e a planilha XLSX |
| CLI | `ciclo.py` | `coletar`, `parametros`, `calcular`, `explicar`, `aprovar`, `fechar`, `relatorio` e `demo` |

Regras de bloqueio (`regras/faixas.json`):

- `modo: release1`, como na proposta: sinaliza e registra tudo, e só bloqueia acima da linha de materialidade (R$ 150 mil).
- O ajuste provisória→final nunca bloqueia. Acima de 2% sobre a provisória (`alerta_pct`), ele sai sinalizado como anomalia para conferir a medição final, por exemplo um erro de digitação de 10x.
- `modo: estrito`: bloqueia também tudo o que estiver acima da faixa sem permissão.
- Quem pode permitir depende da faixa: acima da materialidade, só a Controladoria.

## O que é real e o que é simulado

**Real, funcionando:**

- Cálculo determinístico em `Decimal`: as mesmas entradas dão a mesma versão e as mesmas saídas (testado).
- Decomposição das diferenças, classes, faixas, idade, bloqueio e permissão vinculada ao valor.
- Registro SQLite e versionamento por hash.
- Redação de dado pessoal nos formatos testados e log de cada chamada, inclusive das recusas. O log diz também se a chamada passou por padrões + nomes (e-mail de terceiros) ou só por padrões (evidência montada pelo código).
- Relatório HTML e XLSX.
- O código da chamada ao Claude, validado contra o SDK `anthropic` 1.13.0 com um servidor local falso, também nesta rodada. Um teste confere modelo, `output_config`, `fallbacks`, cabeçalho beta e ausência de dado pessoal no corpo. Esse teste é pulado quando o SDK não está instalado.

**Simulado:**

- Todos os dados.
- ERP, OT, contratos e portal como arquivos CSV, XLSX e EML; não há conectores.
- A caixa de e-mail é uma pasta.
- O "agente" rodou em modo **offline** (regex e modelos de texto): **nenhuma chamada real ao modelo foi feita**, porque não havia chave de API.
- As pessoas são nomes digitados, sem identidade.
- As regras de negócio são uma versão simplificada: três componentes, sem solver de alocação, sem retificações retroativas, sem vigência no meio do mês, sem tributos.

## Protótipo → Produção

| Tema | Neste protótipo | O que a produção precisa |
|---|---|---|
| Identidade e aprovação | Nome e papel digitados na CLI | SSO com Entra ID e perfis por função; a aprovação vinculada ao usuário autenticado |
| Onde roda | Python local | Pacote desktop com instalador aprovado pela TI, ou web app na nuvem do cliente (Azure), conforme a decisão com a TI |
| ERP (SAP) | CSV exportado | Conector de leitura (extração agendada ou OData/RFC), só leitura, com conferência de layout |
| Medição (OT) | CSV | Rotina de exportação da OT que respeite a fronteira TI/OT, sem acesso ao SCADA |
| E-mail | Pasta de `.eml` | Leitura de caixas nomeadas via Microsoft Graph com permissão mínima; a ferramenta só gera rascunho, nunca envia |
| Portais com login pessoal | Arquivo faltante, a pessoa baixa | Igual no release 1; automação de navegador só onde não há login pessoal nem 2º fator |
| Gateway de IA | Classe Python e log JSONL local | Serviço único na rede do cliente, log imutável com retenção, chave em cofre, limites e monitoramento |
| Provedor do modelo | Chamada direta via SDK | Contrato com retenção zero e sem treino, região de processamento, DPA e LGPD; avaliação da extração com e-mails reais mascarados |
| Redação de dado pessoal | Regex para os formatos testados, nomes conhecidos (sem diferenciar maiúsculas nem acentos), o nome da linha de assinatura e uma lista de termos de negócio que não são cortados sozinhos | DLP ou biblioteca dedicada com reconhecimento de nomes, lista de contatos vinda do cadastro, testes com casos reais e revisão do encarregado de dados |
| Regras de cálculo | 3 componentes simplificados | As regras mapeadas reais (alocação, empacotamento, otimização, retificações de 45 e 60 dias), cada uma testada contra um ciclo real |
| Faixas de tolerância | JSON com valores inventados | Faixas decididas e assinadas por quem responde por elas, versionadas, com trilha de mudança |
| Registro | SQLite local | Banco gerenciado, só de inclusão, com backup e retenção |
| Relatório | HTML e XLSX gerados | O formato de planilha que a equipe já usa, relatório mensal de exceções e painel, se for o padrão da casa |
| Segurança | Nenhuma revisão | Modelagem de ameaças, revisão de segurança e homologação com dados mascarados |
| Adoção | Nenhuma | Teste com usuários num fechamento real em paralelo, treino, manual e repasse à TI |
| Operação | — | Suporte, monitoramento e gestão de mudança de regras |

## Esforço e tamanho

- **Tempo:** cerca de 20 minutos de trabalho do Claude na primeira versão, da leitura da proposta aos testes passando. Depois vieram duas rodadas de correção, cada uma após uma verificação independente:
  - 1ª rodada, cerca de 40 minutos: 12 falhas (1 alta, 7 médias e 4 baixas).
  - 2ª rodada, cerca de 25 minutos: 5 falhas (1 alta, 1 média e 3 baixas). A alta: o fechamento não exigia coleta nem percebia e-mail novo. A média: formatos de telefone ("(21) 9 9876-5432", "(021) 3456-7890") passavam sem corte. As baixas: tabela cortada no relatório a 1.280 px, nome de carregador cortado na explicação e acabamentos da CLI.

  Todas foram corrigidas. As de comportamento ganharam teste próprio; as de layout e acabamento foram conferidas rodando a CLI e medindo o relatório no navegador.
- **Linhas:** 2.316 de Python, mais 30 de regras em JSON. O pacote `ciclo_agentico/` tem 1.458 linhas. Os testes têm 468. A CLI, `ciclo.py`, tem 227. O gerador de dados, `gerar_dados.py`, tem 163. O total passou do alvo inicial de 600 a 1.500 linhas: as duas rodadas de correção acrescentaram 653, das quais 236 são testes.
- **Dependências:** biblioteca padrão e `openpyxl`. O `anthropic` é opcional.

Esse número mede só o protótipo. Ele não estima o projeto: o custo da produção está nos acessos, nas regras reais, na segurança e na adoção.

## Limitações conhecidas

- A redação de dado pessoal cobre os formatos testados: e-mail; CPF e CNPJ com pontos, espaços ou sem separador; telefone com ou sem parênteses, +55, DDD com ou sem 0 e celular com o "9" separado; nomes cadastrados; e o nome na linha logo após "Atenciosamente", "Att." e afins. Um nome solto no meio do texto, que não esteja no cadastro nem no remetente, passa. Uma parte de nome igual a termo de negócio (um contato "Luísa da Gama", por exemplo) só é cortada dentro do nome completo, para não apagar "Carregador Gama". Em produção, isso exige DLP.
- A evidência enviada ao explicador é montada pelo código e passa só pelos padrões (e-mail, CPF, CNPJ, telefone), sem a lista de nomes. Se um dia ela carregar texto livre de terceiros, a lista de nomes precisa voltar.
- A comparação com a última coleta é por arquivo. Se um e-mail já lido for apagado da pasta, a proposta dele continua no registro, com a decisão que tiver recebido.
- A guarda de números do explicador não reconhece números por extenso ("duzentos mil reais"). A alternativa mais forte, para produção, é pedir saída estruturada (causa e o que conferir) e montar o texto com os valores da evidência.
- `papel` e `por` são texto livre; a identidade real vem do SSO em produção.
- O modo `auto` procura credencial onde o SDK procuraria. Se a credencial vier de outro mecanismo, use `CICLO_MODO=online`.
- A extração offline só reconhece frases como "passa de R$ X para R$ Y … a partir de dd/mm/aaaa" ou "preço … R$ Y … a partir de …". Um e-mail fora desse padrão precisa do modo online, e mesmo assim a pessoa aceita ou rejeita cada proposta.
- Uma vigência no meio do mês aplica o valor ao mês inteiro, sem pró-rata.
- O rateio do gás de uso do sistema arredonda cada cota em 3 casas, e a sobra de arredondamento não é redistribuída.
- O histórico de diferenças em aberto é um CSV de entrada; o "segue ao próximo ciclo" fica só no registro e não é gravado de volta.
