const readline = require('readline-sync');
const state = require("./state");

const robot = {
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
  async exec(){
    robot.content.searchTerm = robot._askAndReturnSearchTerm();
    robot.content.prefix = robot._askAndReturnPrefixTerm();
    state.save(robot.content);
  }
}

module.exports = {exec:robot.exec, content:robot.content};