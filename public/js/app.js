$(document).ready(function() {
    $('.parallax').parallax();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('input#input_text, textarea#textarea1').characterCounter();
    newArt();
});

$(document).on("click", "#button", function() {
    $.get("/scrape", function(data) {

    }).done(function() {

    })
});

function newArt() {
    // Grab the articles as json
    $.getJSON("/articles", function(data) {
        $("#article_list").empty();
        // For loop for data to go into divs 
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (!data[i].saved) {

                // var li = $("<li>"); 
                // build out html with jquery div additions 
                // adding our scraped data here with the below items. 
                divh.html(icon + data[i].title);
                span.append(data[i].body);
                atag.text(data[i].link);
                atag.attr('href', data[i].link);
                $("#article_list").append(li);
            }
        }
    });
}