const inquirer = require("inquirer");
const isIp = require("is-ip");
const _ = require("lodash");

/**
 * Prompts the user to enter a csv list of ip(v4) addresses to scan for
 * @returns JSON: returns sanitized array of ip address to be used for scanning
 */
async function prompt() {
  const questions = [
    {
      type: "input",
      name: "value",
      message:
        "Please enter ip(v4) addresses you'd like to scan (comma seperated)",
      validate: (value) => {
        if (_.lowerCase(value).includes("exit")) {
          return true;
        } else {
          let ips = _.map(_.split(value, ","), (ip) => {
            return _.trim(ip, "\"'` ");
          });
          for (let i = 0; i < ips.length; i++) {
            const ip = ips[i];
            if (!isIp(ip)) {
              value = "";
              return `ip (${ip}) is not a valid ip, please try again`;
            }
          }
          return true;
        }
      },
      filter: (answer) => {
        if (_.lowerCase(answer).includes("exit")) {
          return "exit";
        } else {
          let ips = _.map(_.split(answer, ","), (ip) => {
            return _.trim(ip, "\"'` ");
          });
          for (let i = 0; i < ips.length; i++) {
            const ip = ips[i];
            if (!isIp(ip)) {
              console.log(`${ip}`);
              return ip;
            }
          }
          return ips;
        }
      },
    },
  ];

  let answer = await inquirer.prompt(questions);
  return answer;
}

module.exports = {
  prompt,
};
