module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended' // Add Prettier recommended configuration
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'], // Add Prettier plugin
  rules: {
    'react/prop-types': 'warn', // Warn if PropTypes are not used
    'no-unused-vars': 'warn', // Warn for unused variables
    'react/react-in-jsx-scope': 'off', // React 17 and higher does not require React in scope
    'prettier/prettier': 'error' // Add Prettier errors as ESLint errors
  },
  settings: {
    react: {
      version: 'detect', // Detect the installed version of React
    },
  },
};
