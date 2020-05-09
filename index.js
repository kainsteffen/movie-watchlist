const dataBase = require("./public/js/mockData").mockData,
  homeController = require("./controllers/homeController"),
  watchlistController = require("./controllers/watchlistsController"),
  movieController = require("./controllers/movieController"),
  errorController = require("./controllers/errorController"),
  feedbackController = require("./controllers/feedbackController"),
  layouts = require("express-ejs-layouts"),
  express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(
 "mongodb://localhost:27017/movie_watchlist_db",
 {useNewUrlParser: true}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to the database.");
});

mongoose.Promise = global.Promise;

// =============================================================
// Pre-Middleware
// =============================================================

// Set up global express variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
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

app.get("/", (req, res) => homeController.getHomePage(req, res, dataBase));

app.get("/watchlist/:watchlist", (req, res) => watchlistController.getWatchlist(req, res, dataBase));

app.get("/watchlist/:watchlist/movie/:movie", (req, res) => movieController.getMovie(req, res, dataBase));

app.get("/feedback", feedbackController.getFeedback);
app.get("/", feedbackController.getFeedbackpage);
app.post("/savefeedback", feedbackController.saveFeedback);

// =============================================================
// Post-Middleware
// =============================================================

// Error handling after no matching route has been found.
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening
➥ on port number: ${app.get("port")}`);
});
