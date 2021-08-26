var fs = require("fs");

/**
 * Gets an array of all the files for a given directory on the file system
 * @param {string} path directory path to read from
 * @returns Array: an array of filenames for a given directory
 */
async function getFolderFiles(path) {
  let fileNames;
  try {
    fileNames = fs.readdirSync(path);
  } catch (error) {
    console.error(err);
  }
  return fileNames;
}

/**
 * Gets the contents of a given file on the file system
 * @param {string} path directory path of a file to read
 * @returns string: contents of a file
 */
async function readFile(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

/* not currently used
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
*/

module.exports = {
  getFolderFiles,
  readFile,
};
