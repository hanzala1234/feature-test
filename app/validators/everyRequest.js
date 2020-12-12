const joi = require('joi');

/**
 * @type {import('../../shared/typescript').ValidationSchemasBundle}
 */
module.exports = {
  reqQuery: joi.object({
    service_id: joi.string().uuid().required()
      .example('< service id >')
      .description('Current service id'),
    space_id: joi.string().uuid().required()
      .example('< space id >')
      .description('Service\'s space id'),
  }).unknown(true),
};
