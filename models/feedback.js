const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
        decision: Boolean
    });

module.exports = mongoose.model("Feedback", feedbackSchema);
