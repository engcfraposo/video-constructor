# video-constructor
Projeto open source para fazer vídeos automatizados com Api do Wikipédia, Azure Language Analytics Key Phrases, Bing.

# Pré requisitos

- Git (https://git-scm.com/)
- Node (https://nodejs.org)
- Azure (https://azure.microsoft.com/)
- Yarn (https://yarnpkg.com/)

## Clonando o Repositório ##
Com o Git e o Node.js instalado na sua maquina e a **URL** do projeto em mãos, cria em algum lugar do seu pc uma pasta para criarmos uma copia do repositório, dentro dela abra o **cmd** ou **powershell** e digite os comandos abaixo:
```
git clone https://github.com/engcfraposo/video-constructor.git
cd video-maker
yarn
```
## Api: Wikipédia ##
É necessário criar a sua chave de acesso para poder testar os robôs, pra isso você precisa acessar o site do [Wikipédia](/https://www.wikipedia.org/), aqui não tem muito segredo.

- Pagina services/wikipedia.js
```js
const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://en.wikipedia.org/w/',
});
```
-Pagina robots/text.js
```js
const wikipedia = require('../services/wikipedia');
const robot ={
async _fetchContentFromWikipedia(content){
        try {
            const response = await wikipedia.get(`api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${content.searchTerm}`);
            let extract = ""; 
            Object.keys(response.data.query.pages).forEach(pageId => {
                extract = response.data.query.pages[pageId].extract;
            });
            content.sourceContentOriginal = extract;
        } catch (error) {
            console.log(error);
        }
    },
};
```
