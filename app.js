const createError = require("http-errors"); //Create HTTP errors for Express, Koa, Connect, etc. with ease.
const express = require("express");
var cors = require("cors");
const path = require("path"); //nodejs
const cookieParser = require("cookie-parser"); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const logger = require("morgan");
const methodOverride = require("method-override"); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

const authRouter = require("./app/auth/router");
const itemRouter = require("./app/item/router");
const balanceRouter = require("./app/balance/router");

const session = require("express-session");
const flash = require("connect-flash");
var bodyParser = require("body-parser");

const app = express();

// view engine setup
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers, *, Access-Control-Allow-Origin", "Origin, X-Requested-with, Content_Type,Accept,Authorization", "http://localhost:4200");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/adminlte", express.static(path.join(__dirname, "./node_modules/admin-lte/")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());

// app.use("/", authRouter);
app.use("/auth", authRouter);
// api
app.use("/item", itemRouter);
app.use("/balance", balanceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
