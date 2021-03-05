module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'react-app',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'jsx-a11y', 'unused-imports'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      module: true,
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
