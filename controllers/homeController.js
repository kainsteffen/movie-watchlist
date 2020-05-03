exports.getHomePage = (req, res, db) => {
    res.render("home", { watchlists: db.watchlists })
}