const _ = require("lodash");
const htmlParser = require("node-html-parser");

/**
 * Reads through the JSON object from a successful cURL response, and extracts the server value if present
 * @param {JSON} headers Headers from a cURL response
 * @returns string: the value for the server if it is present, null if not present
 */
async function ParseServerHeaders(headers) {
  //check to see if headers are not empty
  let server = null;
  if (!_.isEmpty(headers)) {
    // check through each header array to see
    _.each(headers, (header) => {
      //if the Server header is in the headers, return it
      if (_.has(header, "Server")) {
        server = header.Server;
      }
    });
    return server;
  } else {
    // return that this doesn't contain any headers
    return null;
  }
}

/**
 * Reads through an HTML response and checks for the <title> tag from an nginx server
 * @param {string} content HTML to parse through
 * @returns string: textContent from the querySelector
 */
async function nginxParseHTML(content) {
  const root = htmlParser.parse(content);
  return root.querySelector("title").textContent;
}

/**
 * Reads through an HTML response and checks for the <pre><a> tag from an iis server
 * @param {string} content HTML to parse through
 * @returns string: textContent from the querySelector
 */
async function iisParseHTML(content) {
  const root = htmlParser.parse(content);
  return root.querySelector("pre a").textContent;
}

module.exports = {
  ParseServerHeaders,
  nginxParseHTML,
  iisParseHTML,
};
