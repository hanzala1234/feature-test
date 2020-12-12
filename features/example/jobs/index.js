/* eslint-disable global-require */
module.exports = {
  exampleJob: require('./job.example'),
};

const jobs = Object.values(module.exports);

module.exports.start = () => jobs.forEach((j) => j.start());
module.exports.stop = () => jobs.forEach((j) => j.stop());
