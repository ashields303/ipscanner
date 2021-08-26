let scanner = require("./scanner");
const inquirer = require("inquirer");
let prompts = require("./prompts");
let utils = require("./utils");

let scanOptions = "directory-list-2.3-smallest.txt";
let scanResults = {
  valid: [],
  invalid: [],
};

/**
 * Main function for kicking off the scanner CLI
 */
async function main() {
  let signal = 0;

  // Main loop to keep the CLI running
  while (signal != -1) {
    let mainPrompt = await prompts.mainPrompt.prompt(inquirer);

    // after calling the main prompt, figure out what to do based on the selection
    switch (mainPrompt.selection) {
      //If the user has selected the scan command
      case "scan":
        let scanPrompt = await prompts.scanPrompt.prompt(inquirer);

        //if the user has entered exit, go back to the main prompt
        if (scanPrompt.value !== "exit") {
          // otherwise start scanning through the ip addresses
          for (let i = 0; i < scanPrompt.value.length; i++) {
            const ip = scanPrompt.value[i];
            let result = await scanner.scan(ip, scanOptions);
            console.log("\n");
            if (result.valid) {
              scanResults.valid.push(result);
            } else {
              scanResults.invalid.push(result);
            }
          }

          //print the scan results
          console.log("------ Scan Results ------");
        }
        utils.printer.printScanResults(scanResults);
        await resetScanResults();
        break;

      //If the user has selected the help command
      case "help":
        await prompts.helpPrompt.prompt(inquirer);
        break;

      //If the user has selected the options command
      case "options":
        let optionsPrompt = await prompts.optionPrompt.prompt(inquirer);
        console.log(optionsPrompt);
        scanOptions = optionsPrompt.file;
        break;

      //if the user has selected the exit command
      case "exit":
        console.log("Thanks");
        process.exit(0);
      default:
        break;
    }
  }
}

/**
 * resets the JSON object for the scan results
 */
async function resetScanResults() {
  scanResults = {
    valid: [],
    invalid: [],
  };
}
main();
