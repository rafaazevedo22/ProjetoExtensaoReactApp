# Projeto React Native com Expo: Manipulação de Arquivos Excel

Este projeto é uma aplicação móvel desenvolvida com React Native e Expo, que tem como objetivo fornecer uma solução para empresas que precisam acessar e manipular dados armazenados em arquivos Excel diretamente de seus dispositivos móveis. Utilizando as bibliotecas `xlsx`, `expo-file-system` e `expo-document-picker`, o aplicativo permite aos usuários selecionar e ler arquivos Excel, além de exibir as informações de forma organizada.

## Funcionalidades

- **Selecionar Arquivos Excel**: O usuário pode escolher arquivos Excel armazenados no dispositivo.
- **Ler Arquivos Excel**: O conteúdo do arquivo é lido e convertido em formato JSON para facilitar a manipulação e exibição dos dados.
- **Exibição de Dados**: Os dados do arquivo Excel são exibidos na tela em formato JSON, permitindo uma visualização simples e organizada.

## Pré-requisitos

Antes de rodar o projeto, é necessário ter as seguintes ferramentas instaladas:

- **Node.js**: O Node.js é necessário para executar o gerenciador de pacotes `npm` e iniciar o projeto.
- **Expo CLI**: O Expo CLI facilita a criação e execução de projetos React Native.
- **Expo Go** (dispositivo móvel): O aplicativo Expo Go, disponível na Play Store e App Store, é utilizado para visualizar o aplicativo em um dispositivo físico.

## Instalação

Siga os passos abaixo para configurar o projeto em seu ambiente de desenvolvimento.

### 1. Instalar o Node.js

Se ainda não tem o Node.js instalado, baixe e instale a versão mais recente do Node.js através do site oficial.

### 2. Instalar o Create Expo App

Instale o `create-expo-app` globalmente para facilitar a criação de novos projetos Expo.

### 3. Criar o Projeto

Crie um novo projeto utilizando o `npx create-expo-app` seguido do nome que deseja dar ao seu projeto.

### 4. Navegar para o Diretório do Projeto

Após criar o projeto, navegue até o diretório recém-criado para começar a trabalhar nele.

### 5. Instalar Dependências

Dentro do diretório do projeto, instale as dependências necessárias para manipulação de arquivos Excel, como `xlsx`, `expo-file-system` e `expo-document-picker`.

### 6. Iniciar o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento e utilize o Expo Go para escanear o QR Code que será gerado, permitindo a visualização do aplicativo em seu dispositivo móvel.

## Estrutura de Diretórios

A estrutura do seu projeto será semelhante a:
 ├── App.js ├── node_modules/ ├── package.json ├── assets/ ├── components/ 
