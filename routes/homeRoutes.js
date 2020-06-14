const router = require("express").Router(),
  homeController = require("../controllers/homeController");

  router.post("/", (req, res) => {
      console.log(req.body);
      console.log(req.query);
      res.send("POST Successful!");
  });
  
  router.get("/", (req, res) => homeController.showAllWatchlists(req, res));

module.exports = router;
