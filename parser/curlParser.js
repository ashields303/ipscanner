const _ = require("lodash");
const htmlParser = require("node-html-parser");

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

async function ParseHTMLTitle(content) {
  const root = htmlParser.parse(content);
  return root.querySelector("title").textContent;
}

module.exports = {
  ParseServerHeaders,
  ParseHTMLTitle,
};
