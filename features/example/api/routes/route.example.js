const { Router } = require('express');

const { someController } = require('../../controllers');
const { endpointValidators: { validationWrapper } } = require('../middlewares');
const { someSectionSchemas } = require('../validators');

const someEndpointHandler = (req, res, next) => {
  try {
    const { some_value, another_value } = req.body;
    const number = someController.someAction1(some_value);
    const date = another_value
      ? someController.someAction2(another_value)
      : null;

    res.send({
      some_res_value: number,
      another_res_value: date,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();

router
  .post('/some_endpoint', validationWrapper(someEndpointHandler, someSectionSchemas.someEndpointSchemas));

module.exports = router;
