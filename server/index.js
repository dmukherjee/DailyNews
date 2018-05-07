const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/getnews');
const request = require('request');
const database = require('../database/index')

// var items = require('../database-mongo');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/topstories', function (req, res) {
  console.log('topstories..........');
  helper.getTopStories(data => {
    parsedData = JSON.parse(data);
    res.send(parsedData.articles);
  })
});

app.get('/newsbysource', function (req, res) {
  let publisher = req.url.split('=')[1];
  helper.getNewsBySource(publisher, data => {    
    parsedData = JSON.parse(data);
    res.send(parsedData.articles);
  })
});

app.get('/news', function(req, res) {
  let title = `Circle Rolls Out Crypto Investment App in 46 US States`;
  helper.saveNews(title, data => {
    // console.log('title!!!!!!!!!!!!!', title);
    let parsedData = JSON.parse(data);
    let articles = parsedData.articles;
    console.log('item', articles.length);
    database.save(articles);
    let query = database.News.find({}).limit(20).sort({clickCount: -1});
    query.exec(function(err, data) {
      res.send(data);
    });
  }) 
})

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});