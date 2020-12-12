const j2s = require('joi-to-swagger');
const joi = require('joi');

const describeEndpoint = (methodsDescriptions) => {
  const result = {};

  Object.entries(methodsDescriptions).forEach(([method, description]) => {
    result[method] = {
      summary: description.summary,
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(description.schemas.reqBody || joi.object({})).swagger,
          },
        },
      },
      responses: {
        [description.successCode || '200']: {
          content: {
            'application/json': {
              schema: j2s(description.schemas.resBody || joi.object({})).swagger,
            },
          },
        },
      },
    };
  });

  return result;
};

const describeSection = (sectionName, route, endpointsDescriptions) => {
  const result = {};

  Object.entries(endpointsDescriptions).forEach(([path, epDescription]) => {
    Object.values(epDescription).forEach((methodDescription) => {
      // eslint-disable-next-line no-param-reassign
      methodDescription.tags = [sectionName];
    });
    result[route + path] = epDescription;
  });

  return result;
};

const describeApi = (apiInfo, endpointsDescriptions) => ({
  openapi: '3.0.0',
  consumes: ['application/json'],
  produces: ['application/json'],
  schemes: ['http', 'https'],
  info: {
    title: apiInfo.name,
    description: apiInfo.description,
    version: apiInfo.version,
  },
  servers: [{ url: apiInfo.url }],
  paths: endpointsDescriptions,
});

module.exports = {
  endpoint: describeEndpoint,
  section: describeSection,
  api: describeApi,
};
