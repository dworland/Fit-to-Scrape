// Required NPM Packages
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Note = require('./models/Note.js');
var Article = require('./models/Article.js')

var request = require('request');
var cheerio = require('cheerio');

var app = express();

// Public Settings
app.use(express.static("public"));
var PORT = process.env.PORT || 3000;

// Use morgan logging
app.use(logger("dev"));

// BodyParser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set up Handlebar for views
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//Routes
var routes = require("./controller/controller.js");
app.use("/", routes);

// mongoose.connect("mongodb://heroku_fn76dgkm:h1g0cufm8j317hde4olkev7cr2@ds133856.mlab.com:33856/heroku_fn76dgkm");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/news-scraper');
var db = mongoose.connection;

// Error
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Mongoose Connection 
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Port
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});