// FIXME make it work
module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: '@angular-eslint/template-parser',
  plugins: ['@angular-eslint/eslint-plugin-template'],
  rules: {
    '@angular-eslint/template/banana-in-box': 'error',
    '@angular-eslint/template/eqeqeq': 'error',
    '@angular-eslint/template/no-negated-async': 'error'
  }
};
