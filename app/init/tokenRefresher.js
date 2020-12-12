const cron = require('cron');

const { auth: { refreshToken } } = require('../libs');
const { logger } = require('../../shared/helpers');

/**
 * @param {import('../typescript').FeatureConfig[]} featureConfigs
 * @param {import('../typescript').CoreApiTokens} coreApiTokens
 */
const createRefresher = (featureConfigs, coreApiTokens) => () => {
  logger.info('Token refresher started');
  featureConfigs.forEach(({ id, coreApiCredentials: { user, password } }) => {
    refreshToken(user, password).then(({ access_token }) => {
      // eslint-disable-next-line no-param-reassign
      coreApiTokens[id].value = access_token;
    });
  });
};

/**
 * @param {import('../typescript').FeatureConfig[]} featureConfigs
 * @returns {import('../typescript').CoreApiTokens}
 */
module.exports = (featureConfigs) => {
  const coreApiTokens = {};

  featureConfigs.forEach((featureConfig) => {
    coreApiTokens[featureConfig.id] = { value: '' };
  });

  const refreshCoreApiTokens = createRefresher(featureConfigs, coreApiTokens);
  new cron.CronJob('0 0 * * *', refreshCoreApiTokens).start();
  refreshCoreApiTokens();

  return coreApiTokens;
};
