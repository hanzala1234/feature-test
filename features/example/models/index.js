const { DataTypes } = require('sequelize');
const info = require('../info.json');
const { featuresResources } = require('../../../shared/config');

const { database } = featuresResources[info.id];
/* eslint-disable global-require */
module.exports = () => {
  module.exports.sequelize = database;
  module.exports.modelExample = require('./model.example')(database, DataTypes);
};
