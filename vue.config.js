const {
  styleVars
} = require('./build/')

const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './node_modules/ant-design-vue/es/style/themes/default.less')
        // path.resolve(__dirname, './src/assets/css/mixins.less')
      ]
    }
  }
}
