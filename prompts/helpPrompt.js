const inquirer = require("inquirer");
const _ = require("lodash");
const utils = require("../utils");

async function prompt(inquirer) {
  const helpText = `Scanner help text`;
  //   let ui = new inquirer.ui.BottomBar();

  //   ui.updateBottomBar("new bottom bar content");
  console.log(helpText);
}

module.exports = {
  prompt,
};
