const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    watchlistsController = require("../controllers/watchlistsController");

router.use(usersController.verifyToken);

router.get("/watchlists", watchlistsController.index, watchlistsController.respondJSON);
router.use(watchlistsController.errorJSON);

router.get("/users", usersController.index, usersController.respondJSON);
router.use(usersController.errorJSON);

module.exports = router;