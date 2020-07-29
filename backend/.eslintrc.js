module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-return-await': 0,
    'consistent-return': 0,
  },
};
