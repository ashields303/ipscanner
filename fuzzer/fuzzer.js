const Curl = require("../curl");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const parser = require("../parser");
const utils = require("../utils");

/**
 * Uses a wordlist, ip address, and sever type attempt to discover the Directory Traversal vuln
 * @param {string} address ip address to use for checking for Directory Traversal vuln
 * @param {string} list the wordlist file to use for testing endpoints with
 * @param {string} type the server type (nginx,iis)
 * @returns boolean: true if directory traversal was detected, false if not detected
 */
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

/**
 * Attempts to parse out the title information from the HTML cURL response for the specific server version to determine if the Directory Traversal vuln is present
 * @param {string} html HTML to check for specific title information
 * @param {string} type server type (nginx,iis)
 * @returns boolean: true if the HTML contains value that would determine that Directory Traversal is present, false if not
 */
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

/**
 * Reads the text file for a given word list, and populates the wordlist array passed by reference
 * @param {string} listName filename of the wordlist to use
 * @param {Array} wordList array to use for populating individual words for checking
 * @returns Array of individual words that are parsed out from the wordlist file
 */
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
