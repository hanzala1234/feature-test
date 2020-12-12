const joi = require('joi');

const someEndpointSchemas = {
  reqBody: joi.object({
    some_value: joi.string().required().example('1595984').description('Some value'),
    another_value: joi.number().optional().example(Date.now()).description('Another value'),
  }),
  resBody: joi.object({
    some_res_value: joi.bool().required().example(true).description('Some res value'),
    another_res_value: joi.date().allow(null).example(new Date()).description('Another res value'),
  }),
};

module.exports = {
  someEndpointSchemas,
};
