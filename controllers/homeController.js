exports.showMyWatchlist = (req, res) => {
 res.render("myWatchlist");
};


exports.showWatchlistSavedPage = (req, res) => {
 res.render("watchlistSaved");
};
exports.showCreateNewWatchlist = (req, res) => {
 res.render("createNewWatchlist");
};


exports.showSignUp = (req, res) => {
 res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
 res.render("thanks");
};
