const router = require("express").Router(),
    homeController = require("../controllers/homeController");

router.get("/", (req, res) => homeController.showAllWatchlists(req, res));

module.exports = router;