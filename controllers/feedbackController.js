const Feedback = require("../models/feedback");

module.exports = {
  getFeedback: (req, res) => {
    Feedback.find({})
        .exec()
        .then((feedback) => {
            res.render("feedback", {
                feedback: feedback
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
  },
  saveFeedback: (req, res) => {
    let newFeedback = new Feedback({
        decision: req.body.decision
    });
    newFeedback.save()
        .then(() => {
            res.render("add-confirmation");
        })
        .catch(error => {
            res.send(error);
        });
  }
};
