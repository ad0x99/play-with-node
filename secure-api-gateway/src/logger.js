const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.json(),
  statusLevels: true,
  meta: false, // control whether you want to log the meta data about the request
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: true, // Use the default Express/morgan request formatting
  ignoreRoute() {
    // allows to skip some log messages based on request and/or response
    return false;
  },
});

module.exports = { logger };
