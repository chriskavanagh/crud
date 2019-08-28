const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.get("JWT_KEY"));
    req.user = decoded;
    if (!req.user.isAdmin) return res.status(403).send("Access Denied");
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};
