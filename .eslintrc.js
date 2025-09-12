module.exports = {
parser: '@typescript-eslint/parser',
plugins: ['@typescript-eslint'],
extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
env: { node: true, es6: true, jasmine: true },
rules: { 'no-console': 'off' }
};