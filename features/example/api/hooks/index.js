/* eslint-disable global-require */
const { Router } = require('express');
const { ApiError } = require('../../helpers');

const eventHandlers = {
  'some-event': require('./hook.example'),
};

const someServiceWebhookHandler = async (req, res) => {
  const { event, key, params } = req.body;

  if (key !== '<Some secret key>') {
    throw new ApiError(401, 'You are not a service -__-');
  }

  const handler = eventHandlers[event];
  if (handler) {
    await handler(params);
  }

  res.send();
};

const router = Router();
router.use('/some_service_webhook', someServiceWebhookHandler);
module.exports = router;
