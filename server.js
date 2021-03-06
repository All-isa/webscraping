//Dependencies
var express = require('express');
var exhbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require("axios");

//initialize express
var app = express();
var PORT = process.env.PORT || 3000;

//use body parser and middle ware logger morgan
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect("mongodb://localhost/mongoHeadlines");
var db = ("./models");

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//if errors console log them
// db.on("error", function(error) {
//     console.log("Mongoose error: ", error);
// });

// mongoose.connect.once("open", function() {
//     console.log("Mongoose connection success");
// });

require("./articlesController.js")(app);

app.listen(PORT, function() {
    console.log("Listening on http://localhost:"+ PORT)
});