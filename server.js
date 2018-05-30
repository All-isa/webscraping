//Dependencies
var express = require('express');
var exhbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//initialize express
var app = express();
var Port = process.env.PORT || 3000;

mongoose.Promise = Promise;

//use body parser and middle ware logger morgan
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

mongoose.connect("INSERTHEROKULINK");
var db = mongoose.connection;

//if errors console log them
db.on("error", function(error) {
    console.log("Mongoose error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection success");
});

require("./controllers/articlesController.js")(app);

app.listen(PORT, function() {
    console.log("Listening on http://localhost:${PORT}")
}