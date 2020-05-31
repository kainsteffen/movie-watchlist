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
  indexView: (req, res) => {
    res.render("watchlists/index");
  },
  new: (req, res) => {
    res.render("watchlists/new");
  },
  create: (req, res, next) => {
    let watchlistParams = {
      name: req.body.name,
      genre: req.body.genre,
      intendedAudience: req.body.intendedAudience,
    };
    Watchlist.create(watchlistParams)
      .then(watchlist => {
        res.locals.redirect = "/watchlists";
        res.locals.watchlist = watchlist;
        next();
      })
      .catch(error => {
        console.log(`Error saving watchlist: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let watchlistId = req.params.id;
    Watchlist.findById(watchlistId)
    .then(watchlist => {
      res.locals.watchlist = watchlist;
      next();
    })
    .catch(error => {
      console.log(`Error fetching watchlist by ID: ${error.message}`);
      next(error);
    });
  },
  showView: (req, res) => {
    res.render("watchlists/show");
  },
  edit: (req, res, next) => {
    let watchlistsId = req.params.id;
    Watchlist.findById(watchlistId)
      .then(watchlist => {
        res.render("watchlists/edit", {
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
      userParams = {
        name: req.body.name,
        genre: req.body.genre,
        intendedAudience: req.body.intendedAudience,
      };
    Watchlist.findByIdAndUpdate(watchlistId, {
      $set: watchlistParams
    })
      .then(watchlist => {
        res.locals.redirect = `/watchlists/${watchlistId}`;
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
        res.locals.redirect = "/watchlists";
        next();
      })
      .catch(error => {
        console.log(`Error deleting watchlist by ID: ${error.message}`);
        next();
      });
  }
};
