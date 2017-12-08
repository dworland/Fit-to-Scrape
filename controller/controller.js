const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

// Database configuration
const databaseUrl = "news-scraper";
const collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

const url = "http://www.nytimes.com/";

// Default route renders the index handlebars view
router.get("/", function(req, res) {
  res.render("index");
});

// A GET request to scrape the nytimes website
router.get("/scrape", function(req, res) {
	request(url, function(error, response, html) {
		// load that into cheerio and save it to $ for a shorthand selector
		const $ = cheerio.load(html);
		var results = [];
		$("article h2").each(function(i, element) {
			const title = $(element).find("a").text();
			console.log(title);
			const link = $(element).find("a").attr("href");
			console.log(link);
			const summary = $(element).find(".summary").text();
			console.log(summary);

			results.push({
				title: title,
				link: link,
				summary: summary
			});

			console.log(results);

		});


	});
});

// Export routes for server.js
module.exports = router;