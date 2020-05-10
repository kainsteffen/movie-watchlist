const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name: String,
    watched: Boolean,
})

watchlistSchema = mongoose.Schema({
    name: String,
    genre: String,
    intendedAudience: Number,
    movies: [movieSchema],
})

module.exports = mongoose.model("Watchlist", watchlistSchema);