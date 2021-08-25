const chalk = require("chalk");
const _ = require("lodash");
const { Table } = require("console-table-printer");

async function printScanResults(scanResults) {
  let results;
  const valid = new Table();
  const invalid = new Table();
  if (_.isEmpty(scanResults.valid) && _.isEmpty(scanResults.invalid)) {
    console.log(chalk.red("No Results"));
  } else {
    if (!_.isEmpty(scanResults.valid)) {
      console.log(chalk.green("Valid Scan Results:\n"));
      scanResults.valid.forEach((scan) => {
        valid.addRow(scan);
      });
      valid.printTable();
    }
    if (!_.isEmpty(scanResults.invalid)) {
      console.log(chalk.red("Invalid Scan Results:\n"));
      scanResults.invalid.forEach((scan) => {
        invalid.addRow(scan);
      });
      invalid.printTable();
    }
  }
}

module.exports = {
  printScanResults,
};
