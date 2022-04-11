const state = require("./state");
const path = require("path");
const im = require('imagemagick');
const rootPath = path.resolve(__dirname, '..')
const fromRoot = relPath => path.resolve(rootPath, relPath)

const robot = {
    //TODO: Add a function to covert all images
    async _convertAllImages(content){
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await robot._convertImage(sentenceIndex);
        }
    },
    async _convertImage(sentenceIndex){
        return new Promise((resolve, reject) => {
            const inputFile = path.join(__dirname, `../../content/${sentenceIndex}-original.png`)
            const outputFile = path.join(__dirname, `../../content/${sentenceIndex}-converted.png`)
            const width = 1920
            const height = 1080
            //console.log(inputFile)
            //resolve()
             
            im.resize(
                {
                  srcPath: inputFile,
                  dstPath: outputFile,
                  width: width,
                  height: height
                  
                },
                function(err, stdout, stderr) {
                  if (err) throw err;
                  console.log("sucesso");
                }
              );
        
        })
    },
    async exec(){
        const content = state.load();
        await robot._convertAllImages(content);
        state.save(content);
    } 
}

module.exports = robot.exec;