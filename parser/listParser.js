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
