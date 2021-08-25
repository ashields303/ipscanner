const Curl = require("../curl");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const parser = require("../parser");
const utils = require("../utils");
const _ = require("lodash");

async function hasDirectoryTraversal(address, list, type) {
  let wordList = [];
  wordList = await populateWordlist(list, wordList);
  const bar = new utils.progress.Bar(wordList.length);
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    let test;
    try {
      bar.increment();
      test = await Curl.TestDirectory(address, word);
      if (test.statusCode === 200) {
        // valid status code, check server for html title
        let hasTitle = await tryParseTitle(test.data, type);
        if (hasTitle) {
          bar.stopBar();
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return false;
}

async function tryParseTitle(html, type) {
  if (type === "nginx") {
    // if nginx, try parsing the title out
    try {
      let title = await parser.curlParser.nginxParseHTML(html);
      if (title.toLowerCase().includes("index of")) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  } else if (type === "iis") {
    // if iis, try parsing the parent directory out
    try {
      let title = await parser.curlParser.iisParseHTML(html);
      if (title.toLowerCase().includes("[to parent directory]")) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return false;
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
    }
  }
  return wordList;
}

module.exports = {
  hasDirectoryTraversal,
};
