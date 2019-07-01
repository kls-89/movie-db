const express = require('express');
const rp = require('request-promise');

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.render("search");
})

app.get("/results", (req, res, next) => {
   const movie = req.query.movieName;
   const url = `http://www.omdbapi.com/?s=${movie}&apikey=thewdb`;
    rp(url)
    .then(body => {
        let movieData = JSON.parse(body);
        let results = movieData.Search;
        res.render("home", {results: results})
        })
    .catch(err => {
        console.log("ERROR!", err);
    });
});

app.get("/results/:id", (req, res, next) => {
    const movieId = req.params.id;
    const url = `http://www.omdbapi.com/?i=${movieId}&apikey=thewdb`;
    
    rp(url)
    .then(body => {
        let movieDetail = JSON.parse(body);
        res.render("detail", {movieDetail: movieDetail});
    })
    .catch(err => {
        console.log("ERROR!", err);
    })
});

app.listen(3000, () => {
    console.log("Server running...");
});

