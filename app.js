require("dotenv").config();
const scanner = require("./scanner");
const inquirer = require("inquirer");
const prompts = require("./prompts");
const utils = require("./utils");
const path = require("path");
const _ = require("lodash");
const DEFAULT_WORDLIST = process.env.DEFAULT_WORDLIST;
const CSV_HEADERS = ["ip", "valid", "server", "directory listing", "reason"];

/**
 * Main function for kicking off the scanner CLI
 */
async function main() {
  // setup the resultsPath for dumping data
  let resultsPath = path.join(__dirname, `results`, `results.csv`);
  if (!(await utils.fileUtils.fileExists(resultsPath))) {
    await utils.fileUtils.touchFile(resultsPath);
    //Write headers
    //write to the csv file
    await utils.fileUtils.writeToFile(
      resultsPath,
      await _.join(CSV_HEADERS, ",")
    );
  }

  let scanResults = {
    valid: [],
    invalid: [],
  };

  // Main loop to keep the CLI running
  let signal = 0;
  while (signal != -1) {
    let mainPrompt = await prompts.mainPrompt.prompt();

    // after calling the main prompt, figure out what to do based on the selection
    switch (mainPrompt.selection) {
      //If the user has selected the scan command
      case "scan":
        let scanPrompt = await prompts.scanPrompt.prompt();

        //if the user has entered exit, go back to the main prompt
        if (scanPrompt.value !== "exit") {
          //prompt the user for wordlist
          let optionsPrompt = await prompts.optionPrompt.prompt(inquirer);
          scanOptions = optionsPrompt.file;
          // otherwise start scanning through the ip addresses
          for (let i = 0; i < scanPrompt.value.length; i++) {
            const ip = scanPrompt.value[i];
            let result = await scanner.scan(
              ip,
              scanOptions || DEFAULT_WORDLIST
            );

            //setup data for writing to csv file
            let csvValues = [];
            for (const key in result) {
              if (Object.hasOwnProperty.call(result, key)) {
                const value = result[key];
                csvValues.push(value);
              }
            }

            //write to the csv file
            await utils.fileUtils.writeToFile(
              resultsPath,
              await _.join(csvValues, ",")
            );

            // buffer for logging
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
        scanResults = {
          valid: [],
          invalid: [],
        };
        break;

      //If the user has selected the help command
      case "help":
        await prompts.helpPrompt.prompt(inquirer);
        break;

      //if the user has selected the exit command
      case "exit":
        process.exit(0);
      default:
        break;
    }
  }
}

//execute the main function
main();
