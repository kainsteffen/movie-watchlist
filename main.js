// Constants ---------------------------------
const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  createNewWatchlistController = require("./controllers/subscribersController"),
layouts = require("express-ejs-layouts");

// Mongoose stuff-------------------
  const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/myWatchlist_DB_1",
 {useNewUrlParser: true}
);

// check if connection is there
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to the database.");
});

mongoose.Promise = global.Promise
// Subscriber stuff ---------------------------------

 app.get("/subscribers", subscribersController.getAllSubscribers);
 app.get("/contact", subscribersController.getSubscriptionPage);
 app.post("/subscribe", subscribersController.saveSubscriber);

 //  Express stuff ---------------------------------

 mongoose.set("useCreateIndex", true);
 app.set("view engine", "ejs");
 app.set("port", process.env.PORT || 3000);
 app.use(
   express.urlencoded({
     extended: false
   })
 );
app.use(express.json());
// use the layout.ejs for all HTML Sites
app.use(layouts);
app.use(express.static("public"));

// Index is the default page ---------------------------------------
app.get("/", (req, res) => {
  res.render("index");
});

// Routers ------------------------------------------------
app.get("/myWatchlist", homeController.showMyWatchlist);


app.get("/createNewWatchlist", homeController.showCreateNewWatchlist);
//app.get("/myPersonalWatchlists", createNewWatchlistController.getAllPersonalWatchlists);
//app.post("/saveNewWatchlist", createNewWatchlistController.saveNewWatchlist);


app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);



// Error Handling --------------------------------
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
