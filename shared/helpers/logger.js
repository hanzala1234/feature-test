const { debug } = require('../config');

/* eslint-disable no-console */
module.exports = {
  debug: debug ? (...logs) => console.debug(...logs) : () => {},
  info: (...logs) => console.info(...logs),
  warn: (...logs) => console.warn(...logs),
  err: (...logs) => console.error(...logs),
};
