const AzureTextAnalyticsCredentials={ 
    key:process.env.AZURE_TEXT_ANALYTICS_KEY,
    endpoint:process.env.AZURE_TEXT_ANALYTICS_ENDPOINT,
}

const BingSearchCredentials={
    key:process.env.BING_SEARCH_KEY,
    endpoint:process.env.BING_SEARCH_ENDPOINT,
}

module.exports = {
    AzureTextAnalyticsCredentials,
    BingSearchCredentials,
};