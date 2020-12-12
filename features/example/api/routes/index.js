/* eslint-disable global-require */
const swaggerUi = require('swagger-ui-express');

const info = require('../../info.json');
const swaggerDoc = require('../docs');
const { featuresResources } = require('../../../../shared/config');

const { router } = featuresResources[info.id];

module.exports = () => router
  .use('/some_section', require('./route.example'))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
