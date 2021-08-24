const curl = require("./curl");
const fuzzer = require("./fuzzer");

async function scan(ip, wordlist) {
  let valid = [];
  let invalid = [];

  let server;
  try {
    let server;
    try {
      console.log(`SCANNING IP (${ip}) FOR SERVER VERSION`);
      server = await curl.GetServer(ip);
    } catch (error) {
      console.error(error);
    }
    // console.log(server);

    //if the server is nginx
    if (server.includes("nginx/1.2.")) {
      console.log(`${ip} RUNNING MATCHING WEBSERVER (${server})`);
      let validServer = { ip: ip, server: server };
      //if the server has nginx/1.2.x check to see if it's fuzzable
      console.log(`FUZZING FOR DIRECTORY TRAVERSAL`);
      let fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(
        ip,
        wordlist
      );
      if (fuzzable !== null) {
        validServer.directoryListing = true;
      } else {
        validServer.directoryListing = false;
      }
      return validServer;

      //if the server is IIS
    } else if (server.includes("Microsoft-IIS/7.0")) {
      console.log(`${ip} RUNNING MATCHING WEBSERVER (${server})`);
      let validServer = { ip: ip, server: server };
      //if the server has nginx/1.2.x check to see if it's fuzzable
      console.log(`FUZZING FOR DIRECTORY TRAVERSAL`);
      let fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(
        ip,
        wordlist
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
        server: server,
        reason: "Server value did not match whitelisted servers",
      };
    }
  } catch (error) {
    console.log(error);
    console.log(`ERROR: ${server.message}`);
    return { ip: ip, reason: server.message };
  }
}

module.exports = {
  scan,
};
