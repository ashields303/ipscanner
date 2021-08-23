const _ = require("lodash");

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

module.exports = {
  ParseServerHeaders,
};
