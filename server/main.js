const app = require('./app');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/movie_watchlist_db",
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.listen(app.get("port"), () => {
  console.log(`The Express.js server has started and is listening
➥ on port number: ${app.get("port")}`);
});
