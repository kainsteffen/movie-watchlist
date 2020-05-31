const mongoose = require("mongoose"),
  { Schema } = mongoose,
  watchlistSchema = new Schema(
    {
      watchlist: {
        name: {
          type: String,
          trim: true,
          required: true
        },
        genre: {
          type: String,
          trim: true,
          required: true
        },
        intendedAudience: {
          type: Number,
          required: true
        }
      }
    }
  );

module.exports = mongoose.model("Watchlist", watchlistSchema);
