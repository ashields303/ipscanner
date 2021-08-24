var express = require("express");
var router = express.Router();
const curl = require("../curl");
const fuzzer = require("../fuzzer");
const path = require("path");
const parser = require("../parser");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  let data;
  // data = await curl.GetServer("173.255.228.250"); nginx/1.2.9
  // data = await curl.GetServer("18.138.191.115"); bunch of shit
  // data = await curl.GetServer("167.17.227.57"); //IIS 7.0
  data = await curl.GetServer("137.184.76.65"); //IIS 7.0
  console.log(data);
});

router.get("/fuzz", async function (req, res, next) {
  let appDir = path.dirname(require.main.filename);
  let fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(
    "54.235.195.168",
    "common.txt"
  );

  if (fuzzable !== null) {
    res.json({ ip: `fuzzalbe at: ${fuzzable}` });
  } else {
    res.json({ ip: `not fuzzable` });
  }
  //   await fuzzer.ingestLists.getLists();
  //   let list = fuzzer.ingestLists.getWordlist("directory-list-2.3-smallest.txt");
  //   console.log(list);
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

      if (server.includes("nginx/1.2.")) {
        let validServer = { ip: ip, server: server };
        //if the server has nginx/1.2.x check to see if it's fuzzable
        let fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(
          ip,
          "common.txt"
        );
        if (fuzzable !== null) {
          validServer.directoryListing = true;
        } else {
          validServer.directoryListing = false;
        }
        valid.push(validServer);
      } else if (server.includes("Microsoft-IIS/7.0")) {
        let validServer = { ip: ip, server: server };
        //if the server has nginx/1.2.x check to see if it's fuzzable
        let fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(
          ip,
          "common.txt"
        );
        if (fuzzable !== null) {
          validServer.directoryListing = true;
        } else {
          validServer.directoryListing = false;
        }
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
