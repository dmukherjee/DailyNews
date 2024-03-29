const request = require('request');
const config = require('../config.js');
// require('dotenv').config()
;
let key = config.KEY

module.exports = {
  getTopStories: (callback) => {
    const options = {
      url: encodeURI(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`),
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
      url: encodeURI(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${key}`),
      headers: {
        'User-Agent': 'request',
      }
    };
    request.get(options, (err, res, body) => {
      err? console.log('err') : callback(body);
    });
  },

  saveNews: (title, callback) => {
    let url = encodeURI(`https://newsapi.org/v2/everything?q=${title}&sortBy=relevancy&apiKey=${key}`);
    console.log('url: ', url);
    console.log(url);
    const options = {
      url: url,
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    request.get(options, (err, res, body) => {
      err? console.log('err') : callback(body);
    });
  },
}
