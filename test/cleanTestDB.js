const MONGO_URL_USE_TEST = 'mongodb://localhost:27017/movie_watchlist_db'
const mongodbURI = MONGO_URL_USE_TEST
const mongoose = require('mongoose')
mongoose.connect(mongodbURI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('connected to mongoose: ' + mongodbURI))
  .catch(error => console.log('error creating connection to: ' + mongodbURI + error))

const Watchlist = require('../models/watchlist')

async function cleanDB () {
  await Watchlist.deleteMany({})
  console.log('all Watchlits Deleted')
}
cleanDB().then(() => { console.log('done.') })
console.log('main script ended')
