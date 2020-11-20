const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 设置别名
function setResolve(config) {
  config.resolve.alias
    .set('@', resolve('../src'))
    .set('@c', resolve('../src/components'))
}

function chainWebpack(config) {
  setResolve(config)
}

module.exports = chainWebpack