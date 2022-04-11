const download = require('image-downloader')
const state = require("./state");
const bing = require("../services/bing");
const path = require("path");
const gm = require('gm');

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
    //DONE Add a function to download all images
    async _downloadAllImages(content){
        content.downloadedImages = [];

        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            const images = content.sentences[sentenceIndex].images

            for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
                const imageUrl = images[imageIndex];
               
                try {
                    if(content.downloadedImages.includes(imageUrl)){
                        throw new Error("Image already downloaded");
                    }
                    
                   await robot._downloadAndSave(imageUrl, `${sentenceIndex}-original.png`);
                   content.downloadedImages.push(imageUrl);
                   console.log('Image downloaded: '+imageUrl);
                   break
               } catch (error) {
                    console.log('error: '+error);
               }
            }

        }
    },
    //DONE: Add a function to download an image
    async _downloadAndSave(imageUrl, filename){
        return download.image({
            url: imageUrl,
            dest: path.join(__dirname, `../../content/${filename}`)
        })
    },
    async exec(){
        const content = state.load();
        await robot._fetchImagesOfAllSentences(content);
        await robot._downloadAllImages(content);
        state.save(content);
    } 
}

module.exports = robot.exec;