const curl = require("./curl");
const fuzzer = require("./fuzzer");
const chalk = require("chalk");

async function scan(ip, wordlist) {
  let server;
  try {
    console.log(`${chalk.blue(ip)} being scanned for server version`);
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
      console.log(
        `${chalk.blue(ip)} running matched server: ${chalk.green(
          server.server
        )}`
      );
      let traversable;
      try {
        console.log(
          `${chalk.blue(
            ip
          )} being fuzzed for directory with simple scan using: ${chalk.magenta(
            wordlist
          )}`
        );
        traversable = await checkDirectoryTraversal(ip, wordlist, serverType);

        if (traversable) {
          console.log(
            `${chalk.blue(ip)} directory listing status: ${chalk.green(
              "detected"
            )}`
          );
        } else {
          console.log(
            `${chalk.blue(ip)} directory listing status: ${chalk.red(
              "not detected"
            )}`
          );
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
      console.log(
        `${chalk.blue(ip)} running on non whitelisted server ${chalk.magenta(
          server.server
        )}`
      );
      return {
        valid: false,
        ip: ip,
        server: server.server,
        reason: "Unmatched server whitelist",
      };
    }
  } else {
    console.log(
      `${chalk.blue(ip)} server could not be determined: ${chalk.magenta(
        server.message
      )}`
    );
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
