module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    strict: 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
