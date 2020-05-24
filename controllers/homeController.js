const Watchlist = require("../models/watchlist");

module.exports = {
  getHomePage: (req, res, db) => {
    res.render("home", { watchlists: db.watchlists })
  },
  getAllWatchlists: (req, res) => {
    Watchlist.find({})
        .exec().then((watchlists) => {
            res.render("home", { watchlists: watchlists })
        }).catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
      }
};
