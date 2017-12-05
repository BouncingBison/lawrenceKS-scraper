// Dependencies
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var path = require('path');
// Requiring our model
var Article = require("./models/Article.js");
// scraping packages
var cheerio = require("cheerio");
var request = require("request");
// Set mongoose to use built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// alternatively you could use something such as "bluebird" to work around mongoose promise deprecation

// Initialize Express
var app = express();

var router = express.Router();
app.use('/scrape', router);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, '/views/')));

// Serve Static Content
// app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars View engine 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//================================ Routes =====================================

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_lbd656jb:5ri1nd10rpi4i6of37mfu2q6fc@ds121896.mlab.com:21896/heroku_lbd656jb" || "mongodb://localhost/lawrenceKS-scraper");
// mongoose.connect("mongodb://localhost/lawrenceKS-scraper");
var db = mongoose.connection;

var PORT = process.env.PORT || 3015;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Listen on port 3015
app.listen(PORT, function() {
    console.log("App running on:", PORT);
});