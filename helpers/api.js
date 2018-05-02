const axios = require('axios');
const config = require('../config.js');
// require('dotenv').config()
;
let key = config.KEY

module.exports = {
  getTopStories: () => {
    const encodedURI = window.encodeURI(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`)
    return axios.get(encodedURI)
      .then(response => {
        console.log('response ', response.data.articles)
        return response.data.articles;
      })
  }
}


