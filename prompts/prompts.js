"use strict";
const inquirer = require("inquirer");
const _ = require("lodash");

async function mainPrompt() {
  const options = ["scan", "help"];
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

async function ValidateTransaction(transaction, raw) {
  await PrettyPrintTransaction(transaction, raw);
  const questions = [
    {
      type: "confirm",
      name: "validTransaction",
      message: "Does this transaction look valid?",
      default: false,
    },
  ];
  let answer = await inquirer.prompt(questions);
  return answer;
}

module.exports = {
  mainPrompt,
};
