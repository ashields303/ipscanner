const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const terminate = curlTest.close.bind(curlTest);

const CurlCommands = {};
async function CurlTest(ip) {
  const curlTest = new Curl();

  curlTest.setOpt(Curl.option.URL, ip);
  curlTest.setOpt(Curl.option.GET, true);
  curlTest.setOpt(Curl.option.HEADER, true);
  curlTest.setOpt(Curl.option.FOLLOWLOCATION, true);

  curlTest.on("end", function (statusCode, data, headers) {
    console.info("Status code " + statusCode);
    console.info("***");
    console.info("Our response: " + data);
    console.info("***");
    console.info("Length: " + data.length);
    console.info("***");
    console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

    this.close();
  });
  curlTest.on("error", terminate);

  curlTest.perform();
}
CurlCommands.test = CurlTest;
module.exports = CurlCommands;
