const sentenceBoundaryDetection = require('sbd');
const wikipedia = require('../services/wikipedia');
const nlu = require('../services/nlu');
const state = require('./state');
//DONE: Create a new text bot with algorithmia
const robot = {
    //DONE: fetch data on Wikipedia API
    async _fetchContentFromWikipedia(content){
        try {
            const response = await wikipedia.get(`api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${content.searchTerm}`);
            let extract = ""; 
            Object.keys(response.data.query.pages).forEach(pageId => {
                extract = response.data.query.pages[pageId].extract;
            });
            content.sourceContentOriginal = extract;
        } catch (error) {
            console.log(error);
        }
    },
    _sanitarizeContent(content){
        //DONE: Sanitize the content
        const withoutDatesInParentheses =content.sourceContentOriginal.replace(/\((?:\([^()]*\)|[^()])*\)/gm, "");
        const withoutDatesInBrackets = withoutDatesInParentheses.replace(/\[(?:\[[^[\]]*\]|[^[\]])*\]/gm, "");
        const withoutDatesInMaths = withoutDatesInBrackets.replace(/\$\$.*?\$\$/gm, "");
        const withoutDatesInMath = withoutDatesInMaths.replace(/\$.*?\$/gm, "");
        const withoutDatesInCitations = withoutDatesInMath.replace(/\[.*?\]/gm, "");
        const withoutDatesInParenthesesAndMarkdown = withoutDatesInCitations.replace(/\s\s+/g, " ");
        content.sourceContentSanitized = withoutDatesInParenthesesAndMarkdown;
    },
    //DONE: Split the content into sentences
    _breakContentIntoSentences(content){
        content.sentences =[];
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized);
        sentences.forEach(sentence => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            });
        })
    },
    //DONE: limit number of sentences
    _limitNumberOfSentences(content){
        content.sentences = content.sentences.slice(0, content.maximumSentences);
    },
    //DONE: Add a function to extract keywords from each sentence
    async _fetchAzureTextAnalyticsAndReturnKeywords(content){
        try {
            const keyPhrasesInput = content.sentences.map(sentence => {
                return sentence.text;
            })
            
            const keyPhraseResult = await nlu.extractKeyPhrases(keyPhrasesInput);
     
            keyPhraseResult.forEach((document, index) => {
                content.sentences[index].keywords = document.keyPhrases;
            });
        } catch (error) {
            console.log(error);
        }
    },
    async exec(){
        const content = state.load();

        await robot._fetchContentFromWikipedia(content)
        robot._sanitarizeContent(content)
        robot._breakContentIntoSentences(content)
        robot._limitNumberOfSentences(content)
        await robot._fetchAzureTextAnalyticsAndReturnKeywords(content)

        state.save(content);
    } 
}

module.exports = robot.exec;