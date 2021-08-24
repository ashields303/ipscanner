//Runs the validator
var fs = require("fs");
let path = require("path");

async function getFolderFiles(path) {
  let fileNames;
  try {
    fileNames = fs.readdirSync(path);
  } catch (error) {
    console.error(err);
  }
  return fileNames;
}

async function readFile(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function writeToFile(path, data) {
  let rawFileData = await readFile(directory, filename);
  let fileData = JSON.parse(rawFileData);
  if (_.isEmpty(fileData)) {
    try {
      fs.writeFileSync(path.join(directory, filename), JSON.stringify(data));
    } catch (error) {
      console.error(err);
    }
  } else {
    try {
      fs.appendFileSync(path.join(directory, filename), JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  getFolderFiles,
  readFile,
};
