//things we need for scraping
var request = require('request');
var cheerio = require('cheerio');

//requiring models 
var Comments = ('../models/comments.js');
var Articles = ('../models/articles.js');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.redirect('/articles');
    });

    app.get('/scrape', function(req, res) {
        request('https://www.sunset.com/travel', function (error, response, html) {
            var $ = cheerio.load(html);
            $(".post-excerpt")
        }
    }
}