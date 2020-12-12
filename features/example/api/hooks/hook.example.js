const { logger } = require('../../helpers');

const handleSomeEvent = async (params) => {
  logger.info('Some event happen', params);
};

module.exports = handleSomeEvent;
