const winston = require("winston");
// require('winston-mongodb');

module.exports.logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});
