const fs = require('fs');
const contentFilePath = './content.json';
const scriptFilePath = './content/after-effects-script.js';

const state = {
    save(content){
        const contentAsString = JSON.stringify(content);
        return fs.writeFileSync(contentFilePath, contentAsString);
  },
    saveAsScript(content){
        const contentAsString = JSON.stringify(content);
        const scriptAsString = `var content = ${contentAsString};`;
        return fs.writeFileSync(scriptFilePath, scriptAsString);
    },
    load(){
        const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
        return JSON.parse(fileBuffer);
    }
}

module.exports = state;