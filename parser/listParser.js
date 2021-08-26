/**
 * Checks a line from a wordlist while being parsed to see if it can be added to the wordlist array
 * @param {string} line current line of the file
 * @returns boolean: true if the line being read is a valid word, false if not
 */
function isLineValid(line) {
  //check to see if the string starts with a comment
  if (!line.startsWith("#")) {
    //check to see if the line is blank
    if (line !== "") {
      //return the value
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

module.exports = {
  isLineValid,
};
