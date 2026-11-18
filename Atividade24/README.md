# Atividade 24 - Minha turma

Aplicativo de Pedro Henrique feito com React Native e Expo. Consulta cinco perfis brasileiros da API Random User e mostra nome, cidade e país. Possui busca, contador, botão de atualização e mensagens de carregamento, lista vazia e erro de conexão.

O código da tela e da consulta está em **App.js**. A requisição usa `fetch`, disponível no JavaScript. Não há cadastro, edição, exclusão ou banco de dados. Os perfis são fictícios e mudam ao atualizar.

## 1. Instalar os programas

1. No computador, baixe o **Node.js LTS** em [nodejs.org](https://nodejs.org/) e instale com as opções padrão. O npm já vem junto.
2. Feche e abra novamente o terminal depois da instalação. No Windows, pode usar PowerShell ou Prompt de Comando.
3. No celular, instale o **Expo Go** pela Google Play ou App Store. Use uma versão compatível com **Expo SDK 58**; consulte [expo.dev/go](https://expo.dev/go).
4. Opcionalmente, instale o [Visual Studio Code](https://code.visualstudio.com/) para ver e alterar o código.

Confira a instalação no terminal:

```sh
node --version
npm --version
```

## 2. Baixar o projeto

No repositório TAPWM, clique em **Code > Download ZIP**, extraia o arquivo e abra a pasta **Atividade24**. Dentro dela devem estar `App.js` e `package.json`.

Abra um terminal nessa pasta. No Windows, clique na barra de endereço do Explorador de Arquivos, digite `powershell` e pressione Enter.

Se preferir usar Git, instale-o em [git-scm.com](https://git-scm.com/downloads) e execute:

```sh
git clone https://github.com/pedrohenriquebernardo123/TAPWM.git
cd TAPWM/Atividade24
```

## 3. Instalar as dependências

Execute dentro de `Atividade24`:

```sh
npm ci
```

Aguarde terminar. Esse comando instala as versões registradas em `package-lock.json`. Não é necessário instalar o Expo globalmente.

## 4. Rodar no celular

1. Conecte celular e computador à mesma rede Wi-Fi.
2. No terminal, execute:

```sh
npm start
```

3. Espere aparecer o QR Code.
4. No Android, abra o Expo Go e use a opção de escanear QR Code. No iPhone, leia o QR Code com a câmera e abra no Expo Go; siga a orientação da versão instalada para entrar na conta Expo, se solicitado.
5. Mantenha o terminal aberto enquanto estiver usando o app. Na primeira abertura, aguarde a compilação.

No Windows, depois de instalar as dependências, também é possível dar dois cliques em **RODAR NO CELULAR.cmd**.

Use o campo de busca para filtrar por nome ou cidade. O botão **Atualizar** busca outra lista. É necessário ter internet para consultar a API.

## 5. Rodar no navegador do PC

```sh
npm run web
```

O Expo abrirá o navegador. Se não abrir automaticamente, acesse o endereço exibido no terminal. Para encerrar o servidor, pressione **Ctrl+C** no terminal.

## Problemas comuns

- **`npm` não encontrado:** instale o Node.js LTS e abra um terminal novo.
- **PowerShell bloqueou `npm.ps1`:** use `npm.cmd ci` e `npm.cmd start`, ou execute os comandos no Prompt de Comando.
- **QR Code não conecta:** confira se os aparelhos estão na mesma rede. Se a rede bloquear conexões entre aparelhos, tente `npx expo start --go --tunnel --port 8082` e siga a solicitação de instalação do suporte a túnel.
- **Versão incompatível do Expo Go:** confira a versão compatível com SDK 58 em [expo.dev/go](https://expo.dev/go).
- **API não carrega:** confira a internet e toque em **Tentar novamente**. A última lista continua visível se uma atualização falhar.
- **Porta 8082 ocupada:** encerre outro Expo aberto ou rode `npx expo start --go --port 8083`.
- **Erro após alterar dependências:** execute `npx expo-doctor` para conferir o projeto.

## Estrutura

```text
Atividade24/
  App.js              Tela, estados, busca e consulta à API
  index.js            Entrada do app
  app.json            Configuração do Expo
  package.json        Dependências e comandos
  package-lock.json   Versões instaladas
```

Referências: [Expo - criar projeto](https://docs.expo.dev/get-started/create-a-project/), [Expo - executar projeto](https://docs.expo.dev/get-started/start-developing/), [Random User](https://randomuser.me/documentation).
