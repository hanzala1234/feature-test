const { ApiError } = require('../helpers');

const someAction1 = (str) => Number.isNaN(+str);

const someAction2 = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(+date)) {
    throw new ApiError(400, 'Not valid timestamp');
  }

  return date;
};

module.exports = {
  someAction1,
  someAction2,
};
