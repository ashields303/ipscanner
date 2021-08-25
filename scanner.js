const curl = require("./curl");
const fuzzer = require("./fuzzer");

async function scan(ip, wordlist) {
  let server;
  try {
    console.log(`SCANNING IP (${ip}) FOR SERVER VERSION`);
    server = await curl.GetServer(ip);
  } catch (error) {
    console.error(error);
  }

  //check to see if the server response is valid
  if (server.status === 200) {
    //get the server type
    let serverType;
    try {
      serverType = await checkServerType(server.server);
    } catch (error) {
      console.error(error);
    }

    // server is valid, scan for directory traversal
    if (serverType !== "other") {
      console.log(`${ip} RUNNING MATCHING WEBSERVER (${server.server})`);
      let traversable;
      try {
        console.log(
          `FUZZING FOR DIRECTORY TRAVERSAL USING WORDLIST [${wordlist}]`
        );
        traversable = await checkDirectoryTraversal(ip, wordlist, serverType);

        if (traversable) {
          console.log(
            `DIRECTORY LISTING WAS DISCOVERED ON ${ip} USING [${wordlist}]`
          );
        } else {
          console.log(`${ip} WAS NOT FUZZABLE USING [${wordlist}]`);
        }
        return {
          valid: true,
          ip: ip,
          server: server.server,
          directoryListing: traversable,
        };
      } catch (error) {
        console.error(error);
      }
    } else {
      return {
        valid: false,
        ip: ip,
        server: server.server,
        reason: "Unmatched server whitelist",
      };
    }
  } else {
    return {
      valid: false,
      ip: ip,
      server: "unknown",
      reason: server.message,
    };
  }
}

async function checkServerType(server) {
  if (server.includes("nginx/1.2.") || server.includes("nginx/1.18.")) {
    return "nginx";
  }
  if (server.includes("Microsoft-IIS/7.0")) {
    return "iis";
  }
  return "other";
}

async function checkDirectoryTraversal(ip, wordlist, type) {
  let fuzzable;
  try {
    fuzzable = await fuzzer.htmlFuzzer.hasDirectoryTraversal(
      ip,
      wordlist,
      type
    );
    return fuzzable;
  } catch (error) {
    console.error(error);
  }
  //   if (type === "nginx") {
  //   } else {
  //     try {
  //       //SWAP THIS WITH THE OTHER FUZZER
  //       fuzzable = await fuzzer.nginxFuzzer.hasDirectoryTraversal(ip, wordlist);
  //       if (fuzzable !== null) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
}

module.exports = {
  scan,
};
