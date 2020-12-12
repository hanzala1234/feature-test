const models = require('./models');
const api = require('./api/routes');
const events = require('./events');
const jobs = require('./jobs');
/**
 * @type {import('../../shared/typescript').FeatureInitFunction}
 */
module.exports = () => {
  models();
  api();
  events();
  jobs.start();
};
