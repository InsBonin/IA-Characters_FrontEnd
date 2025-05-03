# Inteligência Artificial de Personagens

Desenvolvido com **React Native + Expo**, voltado para organização e extração de atributos de imagens agrupadas por personagem. O fluxo foi adaptado para uso web e mobile, mantendo a funcionalidade de importação e exportação de dados com usabilidade intuitiva.

## ✨ Funcionalidades

- Escolha do modelonde IA que deseja usar, **Convolucional** ou através de **Extração de Píxel**.
- Importação de imagens .zip agrupadas por personagem (via API).
- Interface para seleção de **3 atributos por personagem**.
- Geração de arquivo **CSV** com os dados selecionados, ou organização automática em camadas, dependendo do modelonselecionado.
- Interface para definir os parâmetros que os modelos deverão usar ( camadas, neurônios e gerações ).
- Tela para fazer upload de personagem e resultado sobre o que o modeo aprendeu ( mostrando qual personagem é ).

## 🧩 Estrutura de Componentes

- `FolderCollector`: responsável por exibir os personagens e suas respectivas imagens agrupadas.
- `FileItem`: renderiza cada imagem individual com interface para seleção de atributos.

## 📦 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)
- [react-native-fs](https://github.com/itinance/react-native-fs) - Para salvar o CSV
- [Papaparse](https://www.papaparse.com/) - Para gerar o conteúdo do CSV
- [Python] (https://www.python.org) - Para comunicação via api e backend das IAs

## 🔄 Fluxo de Uso

Testes:
1. Usuário escolhe o modelo treinado 
2. Usuário faz upload de um personagem para o modelo treinado
3. Modelo processa a imagem e diz para o usuário qual personagem é

Treinamento:
1. Usuário seleciona o modelo
2. Usuário envia .zip com imagens
3. Usuário define os atributos e parâmetros
4. Modelo é treinado
5. Modelo pronto para testes

## 🔧 Como rodar o projeto

Para configurar o backend confira - [Backend do Projeto] (https://github.com/joaovitorgraf/trabalho_ia.git)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pixelcollector-app.git
cd pixelcollector-app

# Instale as dependências
npm install

# Rode o app com o Expo
npx expo start ou npm start


