const cron = require('cron');

const { logger } = require('../../../shared/helpers');

const jobFunction = () => {
  logger.info('Example job started');
};

module.exports = new cron.CronJob(
  '* * * * *',
  jobFunction,
);
