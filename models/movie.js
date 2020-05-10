const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name: String,
    watched: Boolean,
})

module.exports  = mongoose.model("Movie", movieSchema);