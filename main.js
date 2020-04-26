const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

  router.get("/", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.htm);
   utils.getFile("views/index.html", res);
  });

  router.get("/watchlist_detail.html", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.html);
   utils.getFile("views/watchlist_detail.html", res);
  });

  router.get("/movie_watchlist.css", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.css);
   utils.getFile("public/css/movie_watchlist.css", res);
  });

  router.get("/bootstrap.css", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.css);
   utils.getFile("public/css/bootstrap.css", res);
  });

  router.get("/movieWatchlist.js", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.js);
   utils.getFile("public/js/movieWatchlist.js", res);
  });

  /*
  router.post("/", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.html);
   utils.getFile("views/thanks.html", res);
  });
  router.get("/graph.png", (req, res) => {
   res.writeHead(httpStatus.OK, contentTypes.png);
   utils.getFile("public/images/graph.png", res);
  });
  */

  http.createServer(router.handle).listen(port);
  console.log(`The server is listening on
  ➥ port number: ${port}`);
