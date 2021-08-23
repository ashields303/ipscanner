async function validateIpAddresses(req, res, next) {
  try {
    // check request body
    //cosnt ipAddresses =  req.body.
    next();
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = validateIpAddresses;
