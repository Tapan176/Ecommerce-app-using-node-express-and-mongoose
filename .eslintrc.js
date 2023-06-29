module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
    {
      files: ['.eslintrc.js', '.eslintrc.cjs'],
      env: {
        node: true
      },
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'warn',
    'no-alert': 'error',
    'no-unused-vars': 'error',

    'no-restricted-properties': [
      'error',
      {
        object: 'document',
        property: 'cookie',
        message: 'Access to document.cookie is not allowed.'
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name="document"][callee.property.name="write"]',
        message: 'Use of document.write() is not allowed.'
      }
    ],
    'no-eval': 'error',
    'no-implied-eval': 'error'
  }
}
