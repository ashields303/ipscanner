const path = require("path");
const { curly } = require("node-libcurl");
const parser = require("../parser");

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
    };
  }

  try {
    server = await parser.curlParser.ParseServerHeaders(curlResponse.headers);
    if (server !== null) {
      return server;
    } else {
      return {
        status: 404,
        message: `ParseServerHeaders could not find a server type`,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: `ParseServerHeaders failed with error: ${error}`,
    };
  }
}

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
