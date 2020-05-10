const Watchlist = require("../models/createNewWatchlist");

exports.getAllPersonalWatchlists = (req, res) => {
  Watchlist.find({})
  .exec()
  .then((myPersonalWatchlists) => {
    res.render("myPersonalWatchlists", {
      myPersonalWatchlists: myPersonalWatchlists
    });
  })
  .catch((error) => {
    console.log(error.message);
    return [];
  })
  .then(() => {
    console.log("promise complete");
  });
};

exports.getNewWatchlistPage = (req, res) => {
  res.render("createNewWatchlist");
};

exports.saveNewWatchlist = (req, res) => {
  let newWatchlist = new Watchlist( {
    name: req.body.watchlistName,
    genre: req.body.genre,
    intendedAudience: req.body.intendedAudience

  });
  newWatchlist.save()
  .then( () => {
    res.render("watchlistSaved");
  })
  .catch(error => {
    res.send(error);
  });
};
