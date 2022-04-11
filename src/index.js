require("dotenv").config();
const readline = require('readline-sync');
const robots = {
    text: require('./robots/text'),
}

const run = {
    content: {
        maximumSentences: 9,
    },
    //DONE: Add a function for include term to searchTerm
    _askAndReturnSearchTerm(){
        return readline.question("Type a Wikipedia search term:");
    },
    //DONE: Add a function to ask and return prefix term
    _askAndReturnPrefixTerm(){
        const prefixes = ["Who is", "What is", "The history of"];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, "Choose one option");
        return prefixes[selectedPrefixIndex];
    },
    init(){
        run.content.searchTerm = run._askAndReturnSearchTerm();
        run.content.prefix = run._askAndReturnPrefixTerm();
        robots.text(run.content)
    }
}

run.init();