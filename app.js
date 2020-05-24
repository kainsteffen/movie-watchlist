const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const watchlistController = require("./controllers/watchlistsController");
const movieController = require("./controllers/movieController");
const errorController = require("./controllers/errorController");
const feedbackController = require("./controllers/feedbackController");
const usersController = require("./controllers/usersController");
const morgan = require("morgan");
const layouts = require("express-ejs-layouts");

// Set up global express variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")

//
app.use(morgan("combined"));
// Configure app to use layouts modules.
app.use(layouts);
// Configure app to parse URL-encoded requests in JSON format
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
// Configure app to use corresponding "public" folder
// and serve its content as static files. (URL addressable)
app.use(express.static("public"))


// =============================================================
// Routes
// =============================================================

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});

app.get("/", (req, res) => homeController.getAllWatchlists(req, res));

app.get("/users", usersController.index, usersController.indexView)

app.get("/watchlist/:watchlist", watchlistController.getWatchlist);

app.get("/watchlist/:watchlist/movie/:movie", (req, res) => movieController.getMovie(req, res, dataBase));

app.get("/feedback", feedbackController.getFeedback);

app.post("/savefeedback", feedbackController.saveFeedback);

app.post("/add-watchlist", watchlistController.createWatchlist)

app.post("/watchlist/:watchlist/add-movie", watchlistController.addMovie)

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

module.exports = app
