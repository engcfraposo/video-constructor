require("dotenv").config();

const robots = {
    text: require('./robots/text'),
    input: require('./robots/input'),
    state: require('./robots/state'),
}

const run = {
    async init(){
        robots.input.exec();
        await robots.text();
        
        const content = robots.state.load();
        console.dir(content, {depth: null});
    }
}

run.init();