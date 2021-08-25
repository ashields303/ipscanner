// const inquirer = require("inquirer");
const _ = require("lodash");

async function prompt(inquirer) {
  const options = ["scan", "help", "options", "exit"];
  const questions = [
    {
      type: "list",
      name: "selection",
      message: "Please select one of the options",
      choices: options,
    },
  ];

  let answer = await inquirer.prompt(questions);
  return answer;
}

module.exports = {
  prompt,
};
