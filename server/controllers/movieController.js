exports.getMovie = (req, res, db) => {
    let movie = db.watchlists[req.params.watchlist].movies[req.params.movie];
    res.render("movie", { movie: movie });
};