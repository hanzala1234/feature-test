const joi = require('joi');
const { DEBUG } = require('../config');
const { ApiError } = require('../helpers');

const anySchema = joi.any();

const reqQueryValidator = (schema = anySchema) => (req, _res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.query);

  if (validationError) {
    return next(
      new ApiError(400, validationError.message),
    );
  }

  req.query = validValue;
  return next();
};

const reqBodyValidator = (schema = anySchema) => (req, _res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.body);

  if (validationError) {
    return next(
      new ApiError(400, validationError.message),
    );
  }

  req.body = validValue;
  return next();
};

const resBodyValidator = (schema = anySchema) => (_req, res) => {
  const resBody = {
    success: true,
    data: res.body,
  };

  if (DEBUG) {
    const { error: validationError } = schema.validate(res.body, { abortEarly: false });
    // eslint-disable-next-line no-underscore-dangle
    resBody.__res_errors = !validationError
      ? null
      : validationError.details.map(
        (ed) => ({ message: ed.message, path: ed.path }),
      );
  }

  res.send(resBody);
};

/**
 * @param {import('../typescript').FeatureEndpointHandler} endpointHandler
 * @param {import('../typescript').ValidationSchemasBundle} schemas
 */
const validationWrapper = (endpointHandler, schemas = {}) => {
  const thisReqQueryValidator = schemas.reqQuery ? this.reqQueryValidator(schemas.reqQuery) : null;
  const thisReqBodyValidator = schemas.reqBody ? reqBodyValidator(schemas.reqBody) : null;
  const thisResBodyValidator = resBodyValidator(schemas.resBody || anySchema);

  return async (req, res, next) => {
    if (thisReqQueryValidator) {
      const errOnQueryValidation = await new Promise(
        (resolve) => thisReqQueryValidator(req, res, resolve),
      ).catch((error) => error);

      if (errOnQueryValidation instanceof Error) {
        return next(errOnQueryValidation);
      }
    }

    if (thisReqBodyValidator) {
      const errOnBodyValidation = await new Promise(
        (resolve) => thisReqBodyValidator(req, res, resolve),
      ).catch((error) => error);

      if (errOnBodyValidation instanceof Error) {
        return next(errOnBodyValidation);
      }
    }

    const originSend = res.send;

    const endpointResponse = await new Promise((resolve) => {
      res.send = resolve;
      endpointHandler(req, res, resolve);
    });

    res.send = originSend;

    if (endpointResponse instanceof Error) {
      return next(endpointResponse);
    }

    res.body = endpointResponse;
    return thisResBodyValidator(req, res, next);
  };
};

module.exports = {
  reqQueryValidator,
  reqBodyValidator,
  resBodyValidator,
  validationWrapper,
};
