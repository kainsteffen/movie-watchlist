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
    index: (req, res, next) => {
      Watchlist.find()
        .then(watchlist => {
          res.locals.watchlist = watchlist;
          next();
        })
        .catch(error => {
          console.log(`Error fetching watchlist: ${error.message}`);
          next(error);
        });
    },
    indexView: (req, res) => {
      res.render("watchlist/index");
    },
    new: (req, res) => {
      res.render("watchlist/new");
    },
    show: (req, res, next) => {
      let watchlistId = req.params.id;
      Watchlist.findById(watchlistId)
      .populate("movies").exec()
      .then(watchlist => {
        res.locals.watchlist = watchlist;
        res.locals.movies = watchlist.movies;
        next();
      })
      .catch(error => {
        console.log(`Error fetching watchlist by ID: ${error.message}`);
        next(error);
      });
    },
    showView: (req, res) => {
      res.render("watchlist/show");
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
                res.render("movie-search-results", { watchlist: req.params.id, searchResults: searchResults });
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
                Watchlist.findOne({ _id: req.params.id }).exec((error, watchlist) => {
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
                                res.redirect("/watchlist/" + req.params.id);
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
    },
    edit: (req, res, next) => {
      let watchlistId = req.params.id;
      Watchlist.findById(watchlistId)
        .then(watchlist => {
          res.render("watchlist/edit", {
            watchlist: watchlist
          });
        })
        .catch(error => {
          console.log(`Error fetching watchlist by ID: ${error.message}`);
          next(error);
        });
    },
    update: (req, res, next) => {
      let watchlistId = req.params.id,
        watchlistParams = {
          name: req.body.name
        };
      Watchlist.findByIdAndUpdate(watchlistId, {
        $set: watchlistParams
      })
        .then(watchlist => {
          res.locals.redirect = `/watchlist/${watchlistId}`;
          res.locals.watchlist = watchlist;
          next();
        })
        .catch(error => {
          console.log(`Error updating watchlist by ID: ${error.message}`);
          next(error);
        });
    },
    delete: (req, res, next) => {
      let watchlistId = req.params.id;
      Watchlist.findByIdAndRemove(watchlistId)
        .then(() => {
          res.locals.redirect = "/watchlist";
          next();
        })
        .catch(error => {
          console.log(`Error deleting watchlist by ID: ${error.message}`);
          next();
        });
    },
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath) res.redirect(redirectPath);
      else next();
    }
};
