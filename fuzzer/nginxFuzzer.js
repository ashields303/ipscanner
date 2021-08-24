const Curl = require("../curl");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const parser = require("../parser");
const _ = require("lodash");

//Runs the validato

async function getFolderFiles(dirname) {
  return fs.readdirSync(dirname, function (err, filenames) {
    if (err) {
      console.log(err);
      //onError(err);
      return filenames;
    }
  });
}

async function hasDirectoryTraversal(address, list) {
  let wordList = [];
  wordList = await populateWordlist(list, wordList);

  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    let test = await Curl.TestDirectory(address, word);
    if (test.statusCode === 200) {
      let title = await parser.curlParser.ParseHTMLTitle(test.data);
      if (title.toLowerCase().includes("index of")) {
        return `${address}/${word}/`;
      }
    }
  }
  return null;
}

async function populateWordlist(listName, wordList) {
  let listsDir = path.join(path.dirname(__dirname), `resources`, `lists`);
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(listsDir, listName)),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (parser.listParser.isLineValid(line)) {
      wordList.push(line);
      // console.log(wordList);
    }
  }
  return wordList;
}

module.exports = {
  hasDirectoryTraversal,
};
