const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://en.wikipedia.org/w/',
});