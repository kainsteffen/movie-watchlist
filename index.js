const http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),
    fs = require("fs"),
    contentTypes = require("./constants/content-types"),

    customReadFile = (file, res) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if (errors) {
                console.log("Error reading the file...");
            }
            res.end(data);
        });
    };

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    customReadFile("views/index.html", res);
});
router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    customReadFile("views/index.html", res);
});

http.createServer(router.handle).listen(3000);