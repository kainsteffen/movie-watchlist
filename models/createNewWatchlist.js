const mongoose = require("mongoose"),
  createNewWatchlistSchema = mongoose.Schema({
    name: String,
    genre: String,
    intendedAudience: Number
  });

module.exports = mongoose.model("Watchlist", createNewWatchlistSchema);
