module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  env: {
    mocha: true,
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      rules: {
        'node/no-unpublished-require': [
          2,
          {
            allowModules: ['chai', 'sinon'],
          },
        ],
      },
    },
  ],
};
