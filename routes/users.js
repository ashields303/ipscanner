var express = require("express");
const middleware = require("../middleware");
var router = express.Router();
const curl = require("../curl");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  let data;
  // data = await curl.GetServer("173.255.228.250"); NGINX 1.2.9
  // data = await curl.GetServer("18.138.191.115"); bunch of shit
  data = await curl.GetServer("167.17.227.57"); //IIS 7.0
  console.log(data);

  // const curlTest = new Curl();
  // const terminate = curlTest.close.bind(curlTest);

  // curlTest.setOpt(Curl.option.URL, "173.255.228.250");
  // curlTest.setOpt(Curl.option.HEADER, true);
  // curlTest.setOpt(Curl.option.FOLLOWLOCATION, true);

  // curlTest.on("end", function (statusCode, data, headers) {
  //   console.log(data);

  //   this.close();
  // });
  // curlTest.on("error", terminate);

  // curlTest.perform();
});

module.exports = router;
