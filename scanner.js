const curl = require("./curl");
const fuzzer = require("./fuzzer");
const chalk = require("chalk");

/**
 * Performs scan of an individual ip address to check for IIS7 or nginx 1.2.x servers. If servers are found with those versions, a Directory Traversal scan is performed using a wordlist of directories to attempt to fuzz
 * @param {string} ip ip address to use for scanning
 * @param {string} wordlist file name of the wordlist to use for Directory Traversal scan
 * @returns JSON: returns results from a scan of the ip address.
 */
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

/**
 * Checks the server from a cURL HEAD response to determine if the server is of type 'nginx' or 'iis' based on the targeted versions
 * @param {string} server server name from a cURL HEAD response
 * @returns string: 'nginx' if server name matches 'nginx/1.2.', 'iis' if server name matches 'Microsoft-IIS/7.0'
 */
async function checkServerType(server) {
  if (server.includes("nginx/1.2.")) {
    return "nginx";
  }
  if (server.includes("Microsoft-IIS/7.0")) {
    return "iis";
  }
  return "other";
}

/**
 * Performs scan of an ip address using a wordlist and server type to check for the existance of Directory Traversal
 * @param {string} ip ip address to fuzz
 * @param {array} wordlist array of directories to scan
 * @param {string} type server type 'iis' or 'nginx'
 * @returns boolean: true if directory traversal was detected, false if not
 */
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
}

module.exports = {
  scan,
};
