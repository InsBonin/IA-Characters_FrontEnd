# PixelCollector App

Aplicativo mobile desenvolvido com **React Native + Expo**, voltado para organização e extração de atributos de imagens agrupadas por personagem. O fluxo foi adaptado para uso mobile, mantendo a funcionalidade de importação e exportação de dados com usabilidade intuitiva.

## ✨ Funcionalidades

- Importação de imagens agrupadas por personagem (via API).
- Interface para seleção de **3 atributos por personagem**.
- Progresso visual de preenchimento.
- Geração de arquivo **CSV** com os dados selecionados.
- **Botão de exportação só é ativado** após todos os personagens estarem completos.

## 🧩 Estrutura de Componentes

- `FolderCollector`: responsável por exibir os personagens e suas respectivas imagens agrupadas.
- `FileItem`: renderiza cada imagem individual com interface para seleção de atributos.
- `AttributeSelector`: componente interno que permite escolher os atributos de cada imagem/personagem.

## 📦 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)
- [react-native-fs](https://github.com/itinance/react-native-fs) (para salvar o CSV)
- [Papaparse](https://www.papaparse.com/) (para gerar o conteúdo do CSV)

## 🔄 Fluxo de Uso

1. **API retorna os personagens com suas imagens.**
2. Usuário seleciona **3 atributos por personagem**.
3. Uma vez que **todos os personagens forem preenchidos**, o botão **"Gerar CSV"** é ativado.
4. CSV é gerado e salvo no dispositivo ou compartilhado.

## 🔧 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pixelcollector-app.git
cd pixelcollector-app

# Instale as dependências
npm install

# Rode o app com o Expo
npx expo start ou npm start
