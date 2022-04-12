const axios = require('axios');
const {BingSearchCredentials} = require('../credentials');

module.exports = axios.create({
    baseURL: BingSearchCredentials.endpoint,
    headers: {
        "Ocp-Apim-Subscription-Key": BingSearchCredentials.key,
    },
    params:{
        imageType: "photo",
        safeSearch: 'strict',
        count:2,
        size: 'large',
        license: 'public',
    }
});