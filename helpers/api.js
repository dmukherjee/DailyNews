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
        // console.log('response ', response.data.articles)
        return response.data.articles;
      })
  },
  getNewsBySource: (source) => {
    const encodedURI = window.encodeURI(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${key}`)
    return axios.get(encodedURI)
      .then(response => {
        // console.log('response ', response.data.articles)
        return response.data.articles;
      })
  }
}


// https://newsapi.org/v2/top-headlines?sources=espn&apiKey=5b1b47ae42c243468180468d766f8331