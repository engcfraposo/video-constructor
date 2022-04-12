const cognitive = require('../credentials/cognitive.json');
const bing = require('../credentials/bing.json');

const AzureTextAnalyticsCredentials={ 
  key:cognitive.apiKey,
  endpoint:cognitive.endpoint,
}

const BingSearchCredentials={
  key:bing.apiKey,
  endpoint:bing.endpoint,
}

module.exports = {
    AzureTextAnalyticsCredentials,
    BingSearchCredentials,
};