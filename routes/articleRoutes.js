var Article = require("./models/Article.js");


module.exports = function(app) {



    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/scrape", function(req, res) {
        // grab the body of the html with request
        request("http://www.ljworld.com/", function(error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            //console.log(html);
            // grab all "object" tagged items
            $("object").each(function(i, element) {

                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties result object
                result.title = $(this).children("h3").text();
                result.link = $(this).children("h3").children("a").attr("href");

                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                var entry = new Article(result);

                // save that entry to the db
                entry.save(function(err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        console.log(doc);
                    }
                });
            });
            // browser done scraping 
            res.send("Scrape Completed");
        });

    });



    // grab the articles we scraped from the mongoDB
    app.get("/articles", function(req, res) {
        // Grab every doc in the Articles array
        Article.find({}, function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
    });




    // Commenting Routes 



};