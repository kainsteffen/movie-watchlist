
const mongoose = require("mongoose"),
    feedbackSchema = mongoose.Schema({
        decision: Boolean
    });

module.exports = mongoose.model("Feedback", feedbackSchema);