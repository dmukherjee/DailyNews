const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newsdesk');

let newsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  publishedAt: String,
  url: String,
  urlToImage: String,
  author: String,
  clickCount: { type: Number, default: 1 },
  likeCount: Number
})

let News = mongoose.model('News', newsSchema);

let save = (newsArr, cb) => {
  console.log('newsArr.length', newsArr[0]);
  if(newsArr.length) {
    news = newsArr[0];
    let data = {
      id: news.title,
      title: news.title,
      description: news.description,
      publishedAt: news.publishedAt,
      url: news.url,
      urlToImage: news.urlToImage,
      author: news.author
    };
    News.findOneAndUpdate(
      { id: data.id }, 
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, success) => {
        if (err) {
          console.log(err);
        } else {
          console.log('updated');
        }
      }
    ).then (
    News.findOneAndUpdate(
      { id: data.id }, 
      {$inc : { clickCount : 1 }},
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, success) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, true);
        }
      }
    ))
  }
}

module.exports.save = save;
module.exports.News = News;