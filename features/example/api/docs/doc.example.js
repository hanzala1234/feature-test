const { swaggerDescribe: { section, endpoint } } = require('../../../../shared/helpers');

const {
  someSectionSchemas: { someEndpointSchemas },
} = require('../validators');

module.exports = section('Some section', '/some_section', {
  '/some_endpoint': endpoint({
    post: {
      summary: 'it does some action',
      schemas: someEndpointSchemas,
    },
  }),
});
