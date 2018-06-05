var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    articleSummary: {
        type: String,
        required: true,
        unique: true
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);
// module.exports = Article;


//things we need for scraping
var axios = require("axios");
var cheerio = require('cheerio');

//requiring models 
var db = require('./models/comments')

module.exports = function(app) {

    app.get('/', function(req, res) {
        // res.redirect('/articles');
    });

    app.get('/scrape', function(req, res) {
        axios.get('https://www.sunset.com/').then(function (response) {
            var $ = cheerio.load(response.data);

            $(".headline").each(function(i, element) {

                var result = {};

                result.title = $(this).children("a").text().trim();

                result.link = $(this).children("a").attr("href");

                result.articleSummary = $(this).children("div.text").text().trim();
        
                Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    }).catch(function(err) {
                        return res.json(err);
                    })
                });
            }
        );
    res.redirect('/');
});
    app.get('/articles', function(req, res) {
        // console.log(Article);
        Article.find({}, function(error, doc) {
            if (error) {
                console.log(error)
            } else {
                res.render("index", {result: doc});
            }
        })
    .sort({'_id': -1});
    });

    app.get('/articles/:id', function(req, res) {
        Article.findOne({'_id': req.params.id})
        .populate('comment')
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.render('comments', {result: doc});
            }
        });
    });

    app.post('/articles/:id', function(req, res){
        db.Comment.create(req.body, function(error, doc) {
            if (error) {
                console.log(error)
            } else {
                Articles.findOneAndUpdate({
                    "_id": req.params.id
                }, {
                    $push: {
                        "comment": doc._id
                    }
                }, {
                    safe: true,
                    upsert: true,
                    new: true
                }).exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('back');
                    }
                });
            }
        });
    });
    app.delete('/articles/:id/:commentid', function(req, res) {
        db.Comment.findByIdAndRemove(req.params.commentid, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc);
                Article.findOneAndUpdate({
                    "_id": req.params.id
                  }, {
                    $pull: {
                      "comment": doc._id
                    }
                  }).exec(function (err, doc) {
                      if (err) {
                        console.log(err);
                      }
                    });
                }
              });
          });
        }