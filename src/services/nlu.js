const { AzureTextAnalyticsCredentials } = require('../credentials');
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

module.exports = new TextAnalyticsClient(
    AzureTextAnalyticsCredentials.endpoint, 
    new AzureKeyCredential(AzureTextAnalyticsCredentials.key)
);