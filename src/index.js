require("dotenv").config();

const robots = {
    text: require('./robots/text'),
    input: require('./robots/input'),
    state: require('./robots/state'),
    image: require('./robots/image'),
    video: require('./robots/video'),
}

const run = {
    async init(){
        robots.input.exec();
        await robots.text();
        await robots.image();
        await robots.video();
        const content = robots.state.load();
        console.dir(content, {depth: null});
    }
}

run.init();