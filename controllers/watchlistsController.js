// exports.getWatchlist = (req, res, db) => {
//     let watchlist = db.watchlists[req.params.watchlist];
//     res.render("watchlist", { watchlistID: req.params.watchlist, watchlist: watchlist });
// };
const Watchlist = require("../models/watchlist");
const Movie = require("../models/movie");

module.exports = {
  getWatchlist: (req, res) => {
    Watchlist.findOne({ name: req.params.watchlist }).exec((error, data) => {
        if (data) {
            console.log(data);
            res.render("watchlist", { watchlist: data, movies: data.movies });
        }
    })
  },
  createWatchlist: (req, res) => {
    let newWatchlist = new Watchlist({
        name: req.body.name,
        genre: req.body.genre,
        intendedAudience: req.body.intendedAudience,
    });

    newWatchlist.save().then(() => {
        res.render("add-confirmation");
    }).catch(error => {
        res.send(error);
     });
  },
  addMovie: (req, res) => {
    Watchlist.findOne({ name: req.params.watchlist }).exec((error, data) => {
        if (data) {
            console.log(data);
            data.movies.push(new Movie({
                name: req.body.name,
                watched: true,
            }));
            data.save().then(() => {
                res.render("add-confirmation");
            }).catch(error => {
                res.send(error);
            });
        }
    })
  }
};
