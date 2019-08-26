const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, config.get("JWT_KEY"));
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
};
