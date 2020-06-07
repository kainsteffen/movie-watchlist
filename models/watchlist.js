const mongoose = require("mongoose");

const watchlistSchema = mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
