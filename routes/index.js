const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  watchlistRoutes = require("./watchlistRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");
  apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/users", userRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
