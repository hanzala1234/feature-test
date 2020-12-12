/* eslint-disable global-require */
const { swaggerDescribe: { api } } = require('../../../../shared/helpers');

const featureInfo = require('../../info.json');

module.exports = api(featureInfo, {
  ...require('./doc.example'),
});
