var path = require("path");
let scanner = require("./scanner");
const inquirer = require("inquirer");
let prompts = require("./prompts");
let utils = require("./utils");
const { clearScreenDown } = require("readline");

// let scanOptions = "!common.txt";
let scanOptions = "directory-list-2.3-smallest.txt";
let scanResults = {
  valid: [],
  invalid: [],
};
let ui = new inquirer.ui.BottomBar();

async function main() {
  let signal = 0;
  while (signal != -1) {
    let mainPrompt = await prompts.mainPrompt.prompt(inquirer);
    // start the loop while the main prompt isn't the exit option
    switch (mainPrompt.selection) {
      case "scan":
        let scanPrompt = await prompts.scanPrompt.prompt(inquirer);
        if (scanPrompt.value !== "exit") {
          for (let i = 0; i < scanPrompt.value.length; i++) {
            const ip = scanPrompt.value[i];
            let result = await scanner.scan(ip, scanOptions);
            if (result.valid) {
              scanResults.valid.push(result);
            } else {
              scanResults.invalid.push(result);
            }
          }
          console.log("\n");
        }
        utils.printer.printScanResults(scanResults);
        await resetScanResults();
        // console.log(scanResults);
        break;
      case "help":
        await prompts.helpPrompt.prompt(inquirer);
        break;
      case "options":
        let optionsPrompt = await prompts.optionPrompt.prompt(inquirer);
        console.log(optionsPrompt);
        //set the scan options
        scanOptions = optionsPrompt.file;
        break;
      case "exit":
        console.log("Thanks");
        process.exit(0);
      default:
        break;
    }
  }
}

async function resetScanResults() {
  scanResults = {
    valid: [],
    invalid: [],
  };
}
main();
// async function init() {
//   let ips = [
//     "137.184.76.65",
//     "167.17.227.57",
//     "18.138.191.115",
//     "173.255.228.250",
//     "34.201.197.127",
//     "199.83.135.102",
//   ];
//   for (let i = 0; i < ips.length; i++) {
//     const ip = ips[i];
//     console.log(`SCANNING: ${ip}`);
//     let result = await scanner.scan(ip);
//     console.log(result);
//   }
// }

// init();
