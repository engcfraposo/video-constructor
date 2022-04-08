const readline = require('readline-sync');
const robots = {
    text: require('./robots/text'),
}

const run = {
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
        const content = {};
        content.searchTerm = run._askAndReturnSearchTerm();
        content.prefix = run._askAndReturnPrefixTerm();
        robots.text(content)
    }
}

run.init();