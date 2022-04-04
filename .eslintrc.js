module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    assert: true,
    should: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "no-useless-constructor": "off",
    'array-callback-return': 'off',
    'no-redeclare': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn']
      }
    }
  ]
}
