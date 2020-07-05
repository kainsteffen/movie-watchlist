const Watchlist = require("../models/watchlist");
const User = require("../models/user");

module.exports = {
  showAllWatchlists: async (req, res) => {
    if (req.user) {
      Watchlist.find({ owner: req.user._id })
        .exec().then((watchlists) => {
          res.render("home", { watchlists: watchlists })
        }).catch((error) => {
          console.log(error.message);
          return [];
        })
        .then(() => {
          console.log("promise complete");
        });
    } else {
      res.render("home", { watchlists: [] })
    }
  }
};
