const inquirer = require("inquirer");
const isIp = require("is-ip");
const _ = require("lodash");

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
            return _.trim(ip, "\"'`");
          });
          for (let i = 0; i < ips.length; i++) {
            const ip = ips[i];
            if (!isIp(ip)) {
              return `ip (${ip}) is not a valid ip, please try again`;
            }
          }
          return true;
        }

        // ips.forEach((ip) => {
        //   console.log(ip);
        //   if (!isIp(ip)) {
        //     return `ip (${ip}) is not a valid ip, please try again`;
        //   }
        // });
        // return true;
      },
      filter: (answer) => {
        if (_.lowerCase(answer).includes("exit")) {
          return "exit";
        } else {
          let ips = _.map(_.split(answer, ","), (ip) => {
            return _.trim(ip, "\"'`");
          });
          return ips;
        }
      },
    },
  ];

  //   {
  //     type: 'input',
  //     name: 'phone',
  //     message: "What's your phone number",
  //     validate(value) {
  //       const pass = value.match(
  //         /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
  //       );
  //       if (pass) {
  //         return true;
  //       }

  //       return 'Please enter a valid phone number';
  //     },

  let answer = await inquirer.prompt(questions);
  return answer;
}

module.exports = {
  prompt,
};
