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
 router.get("/myWatchlist.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/myWatchlist.html", res);
 });
 // router.get("/contact.html", (req, res) => {
 // res.writeHead(httpStatus.OK, contentTypes.html);
 // utils.getFile("views/contact.html", res);
 // });
 // router.post("/", (req, res) => {
 // res.writeHead(httpStatus.OK, contentTypes.html);
 // utils.getFile("views/thanks.html", res);
 // });
 router.get("/Witcher.jpg", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.jpg);
 utils.getFile("public/images/Witcher.jpg", res);
 });
 router.get("/LotR.jpg", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.jpg);
 utils.getFile("public/images/LotR.jpg", res);
 });
 router.get("/warcraft.jpg", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.jpg);
 utils.getFile("public/images/warcraft.jpg", res);
 });
 router.get("/watchlist.css", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.css);
 utils.getFile("public/css/watchlist.css", res);
 });
 router.get("/bootstrap.css", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.css);
 utils.getFile("public/css/bootstrap.css", res);
 });
 router.get("/watchlist.js", (req, res) => {
 res.writeHead(httpStatus.OK, contentTypes.js);
 utils.getFile("public/js/watchlist.js", res);
 });
 http.createServer(router.handle).listen(port);
 console.log(`The server is listening on
 ➥ port number: ${port}`);
