exports.getWatchlist = (req, res, db) => {
    let watchlist = db.watchlists[req.params.watchlist];
    res.render("watchlist", { watchlist: watchlist });
};