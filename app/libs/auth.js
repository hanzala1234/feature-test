const axios = require('axios');
const qs = require('querystring');

const { ApiError } = require('../../shared/helpers');
const config = require('../../config');

const {
  auth: {
    clientId, clientSecret, authUrl, audience,
  },
} = config;
const refreshToken = async (email, password) => {
  const body = {
    audience,
    grant_type: 'password',
    username: email,
    password,
    client_id: clientId,
    client_secret: clientSecret,
  };

  const { data } = await axios
    .post(
      `https://${authUrl}/oauth/token`,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )
    .catch((err) => {
      throw new ApiError(403, err.response.data.error_description);
    });
  return data;
};

module.exports = {
  refreshToken,
};
