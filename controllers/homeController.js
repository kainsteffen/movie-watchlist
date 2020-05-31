const Watchlist = require("../models/watchlist");

module.exports = {
  showAllWatchlists: (req, res) => {
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
