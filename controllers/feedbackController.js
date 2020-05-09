const Feedback = require("../models/feedback");

exports.getFeedback = (req, res) => {
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
};

exports.getFeedbackpage = (req, res) => {
  res.render("home");
};

exports.saveFeedback = (req, res) => {
  let newFeedback = new Feedback( {
    decision: req.body.decision
  });
  newFeedback.save()
  .then( () => {
    res.render("thanks");
  })
  .catch(error => {
    res.send(error);
  });
};
