const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        imdbId: { type: String, required: true },
        data: {
            type: mongoose.Schema
                .Types.Mixed, required: true
        },
        watched: { type: Boolean, required: true },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Movie", movieSchema);