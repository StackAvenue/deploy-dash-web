module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
