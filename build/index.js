const styleVars = require('./style-vars')
const chainWebpack = require('./chains')
const config = require('./config')
const configureWebpack = require('./configures')
const optimization = require('./optimization')

module.exports = {
  styleVars,
  config,
  chainWebpack,
  configureWebpack,
  optimization
}
