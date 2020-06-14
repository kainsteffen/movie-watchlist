const router = require("express").Router(),
  watchlistController = require("../controllers/watchlistController");
  movieController = require("../controllers/movieController");

router.get("/", watchlistController.index, watchlistController.indexView);
router.get("/new", watchlistController.new);
router.post("/create", watchlistController.createWatchlist, watchlistController.redirectView);
router.get("/:id/edit", watchlistController.edit);
router.put("/:id/update", watchlistController.update, watchlistController.redirectView);
router.delete("/:id/delete", watchlistController.delete, watchlistController.redirectView);
router.get("/:id", watchlistController.show, watchlistController.showView);
router.get("/:id/movie/:movie", (req, res) => movieController.getMovie(req, res, dataBase));
router.post("/:id/search-movie", watchlistController.searchMovie);
router.post("/:id/add-movie", watchlistController.addMovie, watchlistController.redirectView);

module.exports = router;
