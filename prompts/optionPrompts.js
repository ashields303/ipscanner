const inquirer = require("inquirer");
const _ = require("lodash");
const path = require("path");
const fileUtils = require("../utils");

async function prompt() {
  let listsDir = path.join(path.dirname(__dirname), `resources`, `lists`);
  const options = await fileUtils.getFolderFiles(listsDir);
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
