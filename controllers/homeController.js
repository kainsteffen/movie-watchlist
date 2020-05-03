exports.getHomePage = (req, res, db) => {
    res.render("index", { watchlists: db.watchlists })
}