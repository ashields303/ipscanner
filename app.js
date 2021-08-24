var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let scanner = require("./scanner");

// async function init() {
//   let ips = [
//     "137.184.76.65",
//     "167.17.227.57",
//     "18.138.191.115",
//     "173.255.228.250",
//     "34.201.197.127",
//     "199.83.135.102",
//   ];
//   for (let i = 0; i < ips.length; i++) {
//     const ip = ips[i];
//     console.log(`SCANNING: ${ip}`);
//     let result = await scanner.scan(ip);
//     console.log(result);
//   }
// }

// init();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var scannersRouter = require("./routes/scanner");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/scanner", scannersRouter);

module.exports = app;
