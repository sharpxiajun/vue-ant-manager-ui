module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-useless-escape': 'off',
    'object-curly-spacing': 'off',
    'one-var': 'off',
    'new-parens': 'off',
    'no-new-func': 'off',
    'no-new': 'off',
    'no-template-curly-in-string': 'off',
    'no-callback-literal': 'off',
    camelcase: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  }
}
