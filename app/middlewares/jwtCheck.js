const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth: { authUrl } } = require('../../config');

module.exports = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authUrl}/.well-known/jwks.json`,
  }),
  issuer: `https://${authUrl}/`,
  algorithms: ['RS256'],
});
