// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Note = require('./models/Note.js');
var Article = require('./models/Article.js')

var request = require('request');
var cheerio = require('cheerio');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

var routes = require("./controller/controller.js");
app.use("/", routes);

// mongoose.connect("mongodb://heroku_fn76dgkm:h1g0cufm8j317hde4olkev7cr2@ds133856.mlab.com:33856/heroku_fn76dgkm");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/news-scraper');
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});