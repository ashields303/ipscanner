const fs = require("fs");
const _ = require("lodash");

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

/**
 * Checks the filesystem for the existence of a file
 * @param {string} path path to the file to check
 * @returns boolen: true if file exists, false if not
 */
async function fileExists(path) {
  try {
    const exists = fs.existsSync(path);
    if (exists) {
      return true;
    } else {
      console.error("file no exists");
      return false;
    }
  } catch (error) {
    console.error("file no exists");
    return false;
  }
}

/**
 * Performs a write file command with no data. Emulates the touch command.
 * @param {string} path path to the file to touch
 */
async function touchFile(path) {
  try {
    await fs.writeFileSync(path, "");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Writes data to a file within the file system. If data exists data is appended after a newline.
 * @param {string} path path of the file to write data to
 * @param {string} data contents to write to the file
 */
async function writeToFile(path, data) {
  let rawFileData = await readFile(path);
  if (_.isEmpty(rawFileData)) {
    try {
      fs.writeFileSync(path, data);
    } catch (error) {
      console.error(err);
    }
  } else {
    try {
      fs.appendFileSync(path, `\n${data}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  getFolderFiles,
  readFile,
  fileExists,
  touchFile,
  writeToFile,
};
