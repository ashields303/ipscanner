var express = require("express");
const middleware = require("../middleware");
var router = express.Router();
const curl = require("../curl");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  let data;
  // data = await curl.GetServer("173.255.228.250"); nginx/1.2.9
  // data = await curl.GetServer("18.138.191.115"); bunch of shit
  data = await curl.GetServer("167.17.227.57"); //IIS 7.0
  console.log(data);
});

module.exports = router;
