const { Router } = require('express');
// ? const { Sequelize } = require('sequelize');

const sharedConfig = require('../../shared/config');
const { getInfoFromCore, skipIfDocs } = require('../middlewares');

/**
 * @param { import('../typescript').FeatureConfig[] } featuresConfigs
 * @param { import('express').Application } expressApp
 * @param { import('socket.io').Server } socketioServer
 * @param { import('../typescript').CoreApiTokens } coreApiTokens
 */
module.exports = (featuresConfigs, expressApp, socketioServer, coreApiTokens) => {
  featuresConfigs.forEach((featureConfig) => {
    const router = Router();
    const eventsNamespace = socketioServer.of(`/${featureConfig.route}`);
    // ? const database = new Sequelize({
    // ?   host: featureConfig.dbCredentials.server,
    // ?   database: featureConfig.dbCredentials.dbName,
    // ?   username: featureConfig.dbCredentials.user,
    // ?   password: featureConfig.dbCredentials.password,
    // ?   dialect: 'postgres',
    // ? });

    expressApp.use(
      `/${featureConfig.route}`,
      router.use(skipIfDocs(getInfoFromCore(featureConfig.id))),
    );

    sharedConfig.featuresResources[featureConfig.id] = {
      eventsNamespace,
      router,
      // ? database,
      docs: featureConfig,
      coreApiToken: coreApiTokens[featureConfig.id],
    };
  });
};
