require('dotenv').config();
const bool = require('yn');

const featureNames = require('./featuresRoutes.json');

/**
 * @type {import('../app/typescript').FeatureConfig[]}
 */
const featuresConfigs = featureNames.map(
  // eslint-disable-next-line global-require, import/no-dynamic-require
  (featureName) => require(`../features/${featureName}/info.json`),
);

// DATABASES = 'feature_id%username:password@34.122.12.127/some-feature;...'
// ? process.env.DATABASES.split(';').forEach((dbCredsStr) => {
// ?   const parsed = dbCredsStr.match(/(.+)%(.+):(.+)@(.+)\/(.+)/);

// ?   featuresConfigs
// ?     .find((featureConfig) => featureConfig.id === parsed[1])
// ?     .dbCredentials = {
// ?       user: parsed[2],
// ?       password: parsed[3],
// ?       server: parsed[4],
// ?       dbName: parsed[5],
// ?     };
// ? });

// CORE_API_CREDENTIALS = 'feature_id%username:password;...'
process.env.CORE_API_CREDENTIALS.split(';').forEach((coreCredsStr) => {
  const parsed = coreCredsStr.match(/(.+)%(.+):(.+)/);

  featuresConfigs.find((featureConfig) => featureConfig.id === parsed[1])
    .coreApiCredentials = {
      user: parsed[2],
      password: parsed[3],
    };
});

module.exports = {
  featuresConfigs,
  debug: bool(process.env.DEBUG),
  server: {
    port: process.env.PORT,
  },
  coreApi: {
    url: process.env.CORE_API_URL,
  },
  auth: {
    authUrl: process.env.AUTH_API_URL,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    audience: process.env.AUTH_AUDIENCE,
  },
};
