const Curl = require("../curl");
const Files = require("../utils");
const path = require("path");

const rootDir = `${__dirname}`;

async function getLists() {
  let listsDir = path.join(path.dirname(__dirname), `resources`, `lists`);
  let files = await Files.getFolderFiles(listsDir);
  return files;
}

async function getWordlist(file) {
  let listsDir = path.join(path.dirname(__dirname), `resources`, `lists`);
  let list = await Files.readFile(listsDir, file);
  console.log(list);
}

module.exports = {
  getLists,
  getWordlist,
};
