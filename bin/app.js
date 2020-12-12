#!/usr/bin/env node
/* eslint-disable no-console */
const http = require('http');
const debug = require('debug')('server:server');

const config = require('../config');
const { expressApp, initFeatureServer } = require('../app/init');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(config.server.port);
expressApp.set('port', port);

const server = http.createServer(expressApp);

initFeatureServer(
  server,
  config.featuresConfigs,
);

server
  .listen(port, () => console.log(`Server is Runnig on Port: ${port}`))
  .on('listening', () => {
    const addr = server.address();

    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;

    debug(`Listening on ${bind}`);
  })
  .on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
