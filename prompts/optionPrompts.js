const inquirer = require("inquirer");
const _ = require("lodash");
const path = require("path");
const utils = require("../utils");

/**
 * Prompts the user to select from one of the wordlist files in the /resources/lists directory to use for scanning for Directory Traversal
 * @returns JSON: returns the options with the wordlist file to use when parsing
 */
async function prompt() {
  let listsDir = path.join(path.dirname(__dirname), `resources`, `lists`);
  const options = await utils.fileUtils.getFolderFiles(listsDir);
  // const options = ["scan", "help", "options", "exit"];
  const questions = [
    {
      type: "list",
      name: "file",
      message: "Please select a wordlist to use for scanning",
      loop: false,
      choices: options,
      default: options[0],
    },
  ];

  let answer = await inquirer.prompt(questions);
  return answer;
}

module.exports = {
  prompt,
};
