const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newsdesk');

let newsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  publishedat: Date,
  url: String,
  urltoimage: String,
  author: String,
  clickCount: Number,
  likeCount: Number
})

let News = mongoose.model('News', newsSchema);

let save = (newsArr) => {
  console.log('newsArr.length', newsArr[0]);
  if(newsArr.length) {
    news = newsArr[0];
    let data = {
      id: news.title,
      description: news.description,
      publishedat: news.publishedAt,
      url: news.url,
      urltoimage: news.urlToImage,
      authpr: news.author
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
    )
  }
}

module.exports.save = save;
module.exports.News = News;