const { curly } = require("node-libcurl");
const parser = require("../parser");
const _ = require("lodash");

/**
 * Attempts to use the cURL module to get a server version.
 * @param {string} ip ip address
 * @returns JSON object with {status, message} for ip addresses that return !200, {status, server} for ips that return a valid server value
 */
async function GetServer(ip) {
  let curlResponse;
  let server;
  //set up head request using curly
  //   console.log(typeof ip);
  try {
    curlResponse = await curly.head(ip, { HEADER: true, FOLLOWLOCATION: true });
  } catch (error) {
    return {
      status: 500,
      message: `Curl response failed with error: ${error}`,
      server: null,
    };
  }

  try {
    server = await parser.curlParser.ParseServerHeaders(curlResponse.headers);
    if (server !== null) {
      if (_.split(server, ",").length > 1) {
        return {
          status: 200,
          message: null,
          server: "honeypot",
        };
      } else {
        return {
          status: 200,
          message: null,
          server: server,
        };
      }
    } else {
      return {
        status: 404,
        message: `server type not detectible`,
        server: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
      server: null,
    };
  }
}

/**
 * Uses cURL to attempt to hit an ip endpoint and return the HTML upon success, ie: 192.168.1.0/images/
 * @param {string} ip base ip address to use
 * @param {string} dir endpoint (directory) on the site to ping
 * @returns returns the cURL response on success, returns JSON {status, message} on error for handling
 */
async function TestDirectory(ip, dir) {
  let uri = `${ip}/${dir}/`;
  //   console.log(`testing ${uri}`);
  let curlResponse;
  try {
    curlResponse = await curly.get(uri);
  } catch (error) {
    return {
      status: 500,
      message: `Curl response failed with error: ${error}`,
    };
  }
  return curlResponse;
}

module.exports = {
  GetServer,
  TestDirectory,
};
