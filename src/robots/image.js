const state = require("./state");
const bing = require("../services/bing");

const robot = {
    //DONE: Add a function for include term to searchTerm and get images in the sentences
    async _fetchImagesOfAllSentences(content){
        for(const sentence of content.sentences){
            const query = `${content.searchTerm} ${sentence.keywords[0]}`;
            sentence.images = await robot._fetchBingAndReturnImageLinks(query);
        }
    },
    //DONE: Add a function to fetch images from Bing API
    async _fetchBingAndReturnImageLinks(query){
       try {
        const response = await bing.get("/search?q="+encodeURIComponent(query));
        return response.data.value.map(image => {
            return image.contentUrl;
        });
       } catch (error) {
           console.log(error);
       }
    },
    async exec(){
        const content = state.load();
        await robot._fetchImagesOfAllSentences(content);
        state.save(content);
    } 
}

module.exports = robot.exec;