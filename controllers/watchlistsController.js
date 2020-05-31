const Watchlist = require("../models/watchlist");
const Movie = require("../models/movie");
const https = require('https');
const url = require('url');

module.exports = {
    showWatchlists: (req, res) => {
        Watchlist.findOne({ _id: req.params.watchlist }).populate("movies").exec((error, watchlist) => {
            if (watchlist) {
                console.log(watchlist);
                res.render("watchlist", { watchlist: watchlist, movies: watchlist.movies });
            }
        })
    },
    createWatchlist: (req, res) => {
        let newWatchlist = new Watchlist({
            name: req.body.name,
        });

        newWatchlist.save().then(() => {
            res.redirect("/")
        }).catch(error => {
            res.send(error);
        });
    },
    searchMovie: (req, res) => {
        const requestUrl = url.format(
            {
                protocol: 'https',
                host: 'omdbapi.com',
                query: {
                    apikey: '1c87f900',
                    s: req.body.searchTerm,
                }
            }
        );

        https.get(requestUrl, (result) => {
            let data = '';

            // A chunk of data has been recieved.
            result.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            result.on('end', () => {
                let searchResults = JSON.parse(data);
                res.render("movie-search-results", { watchlist: req.params.watchlist, searchResults: searchResults });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
    addMovie: (req, res) => {
        const requestUrl = url.format(
            {
                protocol: 'https',
                host: 'omdbapi.com',
                query: {
                    apikey: '1c87f900',
                    i: req.body.imdbId,
                }
            }
        );

        https.get(requestUrl, (result) => {
            let data = '';

            // A chunk of data has been recieved.
            result.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            result.on('end', () => {
                Watchlist.findOne({ _id: req.params.watchlist }).exec((error, watchlist) => {
                    if (watchlist) {
                        console.log(watchlist);

                        let newMovie = new Movie({
                            imdbId: req.body.imdbId,
                            data: JSON.parse(data),
                            watched: false,
                        });

                        newMovie.save().then(() => {
                            watchlist.movies.push(newMovie._id);
                            watchlist.save().then(() => {
                                res.redirect("/watchlist/" + req.params.watchlist);
                            }).catch(error => {
                                res.send(error);
                            });
                        }).catch(error => console.log(error));
                    }
                })
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
};
