var express = require("express");
const middleware = require("../middleware");
var router = express.Router();
const curl = require("../curl");
const _ = require("lodash");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  let data;
  // data = await curl.GetServer("173.255.228.250"); nginx/1.2.9
  // data = await curl.GetServer("18.138.191.115"); bunch of shit
  // data = await curl.GetServer("167.17.227.57"); //IIS 7.0
  data = await curl.GetServer("137.184.76.65"); //IIS 7.0
  console.log(data);
});

router.post("/", async function (req, res, next) {
  let valid = [];
  let invalid = [];
  const ipAddresses = req.body.ips;
  console.log(ipAddresses);
  for (let i = 0; i < ipAddresses.length; i++) {
    const ip = ipAddresses[i];
    console.log(ip);
    let server;
    try {
      server = await curl.GetServer(ip);
      console.log(server);
      if (
        server.includes("nginx/1.2.") ||
        server.includes("Microsoft-IIS/7.0")
      ) {
        let validServer = { ip: ip, server: server };
        valid.push(validServer);
      } else {
        invalid.push({
          ip: ip,
          reason: "Server value did not match whitelisted servers",
        });
      }
    } catch (error) {
      console.log(`ERROR: ${server.message}`);
      invalid.push({ ip: ip, reason: server.message });
    }
  }

  //bundle and save
  let result = { valid: valid, invalid: invalid };
  res.json(result);
});

module.exports = router;
