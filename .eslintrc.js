module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb-base', 'prettier'],
  env: {
    mocha: true,
  },
  rules: {
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['**/*.spec.js'],
      },
    ],
  },
};
