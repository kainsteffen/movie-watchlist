const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    watchlistRoutes = require("./watchlistRoutes"),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    apiRoutes = require("./apiRoutes"),
    authorizationPlaygroundRoutes = require('./authorizationPlaygroundRoutes');

router.use('/authorizationPlayground', authorizationPlaygroundRoutes)
router.use("/users", userRoutes);
router.use("/watchlists", watchlistRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;