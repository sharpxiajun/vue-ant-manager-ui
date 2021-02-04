/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 14:48:47 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 17:22:25
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const chalk = require('chalk')
const fontpath = path.resolve(__dirname, '../client/fonts.js')

const isFile = _path => {
  try {
    const stat = fs.statSync(_path)
    return stat.isFile()
  } catch (error) {
    console.error(error)
    return false
  }
}

const isDirectory = _path => {
  try {
    const stat = fs.statSync(_path)
    return stat.isDirectory()
  } catch (error) {
    console.error(error)
    return false
  }
}

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 生产环境打包事，下载iconfont，并更新fonts.js为本地地址，实现离线iconfont
async function loadFonts() {
  const fontsUrl = require(fontpath), index = fontsUrl.indexOf('font_')

  if (index > -1 && fontsUrl.startsWith('http://at.alicdn.com/t/')) {
    const filename = fontsUrl.slice(index),
      jsDir = path.resolve(__dirname, '../public/js/'),
      writeStream = fs.createWriteStream(
        path.resolve(__dirname, '../public/js/', filename)
      )
    console.log(chalk.green(jsDir))
    const files = fs.readdirSync(jsDir)
    if (files.length) {
      files.forEach(file => {
        console.log(file, filename, 'filename')
        if (file !== filename) {
          chalk.red(file, '删除成功')
          fs.unlinkSync(jsDir + '/' + file)
        }
      })
    }
    return new Promise((resolve, reject) => {
      request(fontsUrl)
        .pipe(writeStream)
        .on('close', _ => {
          console.log(chalk.green('图标字体更新成功'))
          const str = `// module.exports = '${fontsUrl}' \nmodule.exports = '/js/${filename}'`
          fs.writeFileSync(fontpath, str)
          resolve()
        })
    })
  }
}

const recoverFonturl = () => {
  const str = fs.readFileSync(fontpath).toString(),
    // 这里只是简单匹配一下
    reg = /\/\/[\s]?(module.exports[\s]?=[\s]?[\'\"]http:\/\/[\w\:\/\.]+[\'\"])/,
    match = str.match(reg)
  if (match) {
    fs.writeFileSync(fontpath, match[1])
  }
}

// loadFonts()

exports.isFile = isFile
exports.isDirectory = isDirectory
exports.resolve = resolve
exports.loadFonts = loadFonts
exports.recoverFonturl = recoverFonturl