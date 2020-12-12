const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { everyRequestSchemas } = require('../validators');
const { validation: { reqQueryValidator } } = require('../../shared/middlewares');

const {
  jwtCheck,
  apiErrorHandler,
  skipIfDocs,
} = require('../middlewares');

module.exports = express()
  .use(cors())
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(skipIfDocs(reqQueryValidator(everyRequestSchemas.reqQuery)))
  .use(skipIfDocs(express.json()))
  .use(skipIfDocs(jwtCheck))
  .use(apiErrorHandler);
