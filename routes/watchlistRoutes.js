const router = require("express").Router(),
    watchlistsController = require("../controllers/watchlistsController");

router.get("/", watchlistsController.index, watchlistsController.indexView);
router.get("/new", watchlistsController.new);
router.post("/create", watchlistsController.createWatchlist, watchlistsController.redirectView);
router.get("/:id/edit", watchlistsController.edit);
router.put("/:id/update", watchlistsController.update, watchlistsController.redirectView);
router.delete("/:id/delete", watchlistsController.delete, watchlistsController.redirectView);
router.get("/:id", watchlistsController.show, watchlistsController.showView);
router.post("/:id/search-movie", watchlistsController.searchMovie);
router.post("/:id/add-movie", watchlistsController.addMovie, watchlistsController.redirectView);

module.exports = router;