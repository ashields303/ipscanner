var path = require("path");
let scanner = require("./scanner");
let prompts = require("./prompts");

async function main() {
  let signal = 0;
  while (signal != -1) {
    let mainPrompt = await prompts.mainPrompt.prompt();
    // start the loop while the main prompt isn't the exit option
    switch (mainPrompt.selection) {
      case "scan":
        let scanPrompt = await prompts.scanPrompt.prompt();
        console.log(scanPrompt);
        if (scanPrompt.value !== "exit") {
          for (let i = 0; i < scanPrompt.value.length; i++) {
            const ip = scanPrompt.value[i];
            let result = await scanner.scan(ip);
            console.log(result);
          }
        }

        break;
      case "help":
        await prompts.helpPrompt.prompt();
        break;
      case "options":
        console.log("options");
        break;
      case "exit":
        console.log("Thanks");
        process.exit(0);
      default:
        break;
    }
  }

  //prompt again
  //mainPrompt = await prompts.mainPrompt.prompt();
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
