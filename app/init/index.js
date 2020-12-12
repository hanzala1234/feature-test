const expressApp = require('./expressApp');
const assignFeaturesResources = require('./assignFeaturesResources');
const initSocketioServer = require('./socketioServer');
const tokenRefresher = require('./tokenRefresher');

/**
 * @param { import('http').Server } server
 * @param { import('../typescript').FeatureConfig[] } featureConfigs
 */
const initFeatureServer = (server, featureConfigs) => {
  const socketioServer = initSocketioServer(server, featureConfigs);
  const coreApiTokens = tokenRefresher(featureConfigs);

  assignFeaturesResources(
    featureConfigs,
    expressApp,
    socketioServer,
    coreApiTokens,
  );

  featureConfigs.forEach(({ route }) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`../../features/${route}`)();
  });
};

module.exports = {
  expressApp,
  initFeatureServer,
};
