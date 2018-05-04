const request = require('request');
const config = require('../config.js');
// require('dotenv').config()
;
let key = config.KEY

module.exports = {
  getTopStories: (callback) => {
    const options = {
      url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`,
      headers: {
        'User-Agent': 'request',
      }
    };
    request.get(options, (err, res, body) => {
      err? console.log('err') : callback(body);
    });
  },

  getNewsBySource: (source, callback) => {
    const options = {
      url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${key}`,
      headers: {
        'User-Agent': 'request',
      }
    };
    request.get(options, (err, res, body) => {
      err? console.log('err') : callback(body);
    });
  }
}
