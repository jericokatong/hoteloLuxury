var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var pelangganRouter = require("./app/Pelanggan/router.js");
var kamarRouter = require("./app/Kamar/router.js");
var reservasiRouter = require("./app/Reservasi/router.js");
var adminRouter = require("./app/Admin/router.js");
var historyReservasiRouter = require("./app/History_Reservasi/router.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/", pelangganRouter);
app.use("/", kamarRouter);
app.use("/", reservasiRouter);
app.use("/", adminRouter);
app.use("/", historyReservasiRouter);

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
