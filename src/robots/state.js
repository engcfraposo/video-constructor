const fs = require('fs');
const contentFilePath = './content.json';

const state = {
    save(content){
        const contentAsString = JSON.stringify(content);
        return fs.writeFileSync(contentFilePath, contentAsString);
    },
    load(){
        const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
        return JSON.parse(fileBuffer);
    }
}

module.exports = state;