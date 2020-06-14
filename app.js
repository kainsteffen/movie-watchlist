const express = require("express");
const app = express();
const router = require("./routes/index.js");

const expressValidator = require('express-validator')

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
app.use(cookieParser("passcode"));
app.use(expressSession({
    secret: "passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(connectFlash());

// Middleware for user, password authenication 
// and hashing
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// Set up user model serialization and 
// deserialization
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const morgan = require("morgan");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

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

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use(express.json());
// Configure app to use corresponding "public" folder
// and serve its content as static files. (URL addressable)
app.use(express.static("public"));

// User Express Validator to validate response at the API level
// Response must be parsed before validation i.e. this needs to be 
// after express.urlencoded and express.json
app.use(expressValidator());

// Add flashMessage, loggedIn, currentUser as local variable for every page.
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

// Add middleware from router file.
app.use("/", router);

module.exports = app
