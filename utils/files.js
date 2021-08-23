//Runs the validator
var fs = require("fs");

async function getFolderFiles(dirname) {
  return fs.readdirSync(dirname, function (err, filenames) {
    if (err) {
      console.log(err);
      //onError(err);
      return filenames;
    }
  });
}

async function readFile(directory, filename) {
  let file = `${directory}/${filename}`;
  console.log(file);
  return fs.readFileSync(file, "utf-8", function (err, content) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      return content;
    }
  });
}

module.exports = {
    getFolderFiles,
    readFile,
};