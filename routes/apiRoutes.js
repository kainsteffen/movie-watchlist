const router = require("express").Router(),
  watchlistController = require("../controllers/watchlistController");

router.get(
  "/watchlist",
  watchlistController.index,
  watchlistController.respondJSON
);
router.use(watchlistController.errorJSON);

module.exports = router;
