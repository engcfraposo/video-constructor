const state = require("./state");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const os = require("os");
const spawn = require('child_process').spawn;
const rootPath = path.resolve(__dirname, '..')
const fromRoot = relPath => path.resolve(rootPath, relPath)

const robot = {
    //DONE: Add a function to covert all images
     async _convertAllImages(content){
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await robot._convertImage(sentenceIndex);
        }
    },
    async _convertImage(sentenceIndex){
            const inputFile = path.join(__dirname, `../../content/${sentenceIndex}-original.png`)
            const blurFile = path.join(__dirname, `../../content/${sentenceIndex}-output.png`)
            const width = 1920
            const height = 1080
             try {
               await sharp(inputFile)
                .resize(width, height)
                .blur(10)
                .grayscale()
                .composite([{input: inputFile, gravity: 'center', }])
                .toFile(blurFile)
                console.log(`> [video-robot] Image converted: ${blurFile}`)
             } catch (error) {
                await sharp(inputFile)
                .extend(width, height)
                .grayscale()
                .composite([{input: inputFile, gravity: 'center', }])
                .toFile(blurFile)
                console.log(`> [video-robot] Image converted: ${blurFile}`)
             }
    },
    async _createAllSentenceImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
          await robot._createSentenceImage(sentenceIndex, content.sentences[sentenceIndex].text)
        }
    },
    async _createSentenceImage(sentenceIndex, sentenceText) {
        const outputFile = path.join(__dirname, `../../content/${sentenceIndex}-sentence.png`)
        const width = 1920
        const height = 1080
        const svgImage = `
            <svg width="${width}" height="${height}">
            <style>
            .title { fill: #fff; font-size: 25px; font-weight: bold; width: 1280px; text-align: center; }
            </style>
                    <text x="50%" y="50%" text-anchor="middle" class="title">${sentenceText}</text>
            </svg>
        `;
        const svgBuffer = Buffer.from(svgImage);
        await sharp(svgBuffer)
            .toFile(outputFile);
        console.log(`> [video-robot] Sentence created: ${outputFile}`)
    },
    async _createYouTubeThumbnail() {
        const inputFile = path.join(__dirname, `../../content/0-output.png`)
        const outputFile = path.join(__dirname, `../../content/youtube-thumbnail.jpg`)
        await sharp(inputFile)
            .toFile(outputFile);
    },
    async _createAfterEffectsScript(content) {
        await state.saveAsScript(content);
    },
    async _renderVideoWithAfterEffects(){
        return new Promise((resolve, reject) => {
            const systemPlatform= os.platform;

            let aerenderFilePath="";
            if(systemPlatform === 'darwin'){
                aerenderFilePath = '/Applications/Adobe After Effects CC 2019/aerender'
            } else if(systemPlatform === 'win32'){
                aerenderFilePath = '%programfiles%\Adobe\Adobe After Effects CC\Arquivos de suporte\aerender.exe'
            } else {
                return reject()
            }

            const templateFilePath = path.join(__dirname, `../../templates/1/template.aep`)
            const destinationFilePath = path.join(__dirname, `../../content/output.mov`)

            console.log('> [video-robot] Starting After Effects')

            const aerender = spawn(aerenderFilePath, [
                '-comp', 'main',
                '-project', templateFilePath,
                '-output', destinationFilePath
            ])

            aerender.stdout.on('data', (data) => {
                process.stdout.write(data)
            })

            aerender.on('close', () => {
                console.log('> [video-robot] After Effects closed')
                resolve()
            })
        })
    },
    async exec(){
        console.log('> [video-robot] Starting...')
        const content = state.load();
        await robot._convertAllImages(content);
        await robot._createAllSentenceImages(content);
        await robot._createYouTubeThumbnail();
        await robot._createAfterEffectsScript(content);
        await robot._renderVideoWithAfterEffects();
        state.save(content);
    } 
}

module.exports = robot.exec;