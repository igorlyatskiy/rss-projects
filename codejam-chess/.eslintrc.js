module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    "react/jsx-one-expression-per-line": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "jsx-a11y/label-has-associated-control": [2, {
      "required": {
        "every": ["id"]
      }
    }]
  },
  ignorePatterns: ['.eslintrc.js']
};
