const inquirer = require("inquirer");
/**
 * Prompts the user to select one of the main options for the tool.
 * @returns JSON: response from which selection was made from the inquirer command prompt
 */
async function prompt() {
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
