const bool = require('yn');

module.exports = {
  debug: bool(process.env.DEBUG),
  coreApi: {
    url: process.env.CORE_API_URL,
  },

  /**
  * @type {Record<string, import('../typescript').FeatureResources}
  */
  featuresResources: {},
};
