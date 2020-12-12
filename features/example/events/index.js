/* eslint-disable global-require */
const events = {
  'example-event': require('./event.example'),
};

const info = require('../info.json');
const { featuresResources } = require('../../../shared/config');

/**
 * @type {import('socket.io').Namespace} namespace
 */
const { eventsNamespace: namespace } = featuresResources[info.id];

module.exports = () => namespace.on('connection', (socket) => {
  Object
    .entries(events)
    .forEach(([eventName, eventHandler]) => {
      socket.on(eventName, eventHandler);
    });
});
