const { logger } = require('../../shared/helpers');

// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  logger.err('err', err);

  res
    .status(err.status || 500)
    .send({ success: false, message: err.message });
};
