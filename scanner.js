const curl = require("./curl");
const fuzzer = require("./fuzzer");

async function scan(ip) {
  let valid = [];
  let invalid = [];

  //   console.log(ip);
  let server;
  try {
    server = await curl.GetServer(ip);
    // console.log(server);

    //if the server is nginx
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
      return validServer;

      //if the server is IIS
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
      return validServer;

      //otherwise
    } else {
      return {
        ip: ip,
        reason: "Server value did not match whitelisted servers",
      };
    }
  } catch (error) {
    console.log(`ERROR: ${server.message}`);
    return { ip: ip, reason: server.message };
  }
}

module.exports = {
  scan,
};
