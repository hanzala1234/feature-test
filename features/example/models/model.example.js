/**
 * @param {import('sequelize/types').Sequelize} sequelize
 * @param {typeof import('sequelize').DataTypes} dataTypes
 */
module.exports = (sequelize, dataTypes) => sequelize.define('some_table', {
  id: {
    type: dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  some_field: { type: dataTypes.CHAR(64) },
  another_field: { type: dataTypes.INTEGER() },
});
