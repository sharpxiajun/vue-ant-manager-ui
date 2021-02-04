/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 18:27:20 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2021-02-03 18:27:20 
 */
import Message from 'ant-design-vue/lib/message'
import config from '@/config'

export const loop = _ => { }

/* String 方法开始 */

// 线转驼峰  foo-bar => fooBar
export const lineToHump = str =>
  str.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase())

// 驼峰转线  fooBar => foo-bar
export const humpToLine = str =>
  str && str.replace(/([A-Z])/g, '-$1').toLowerCase()

// 首字母大写
export const capitalize = str =>
  str && str.charAt(0).toUpperCase() + str.slice(1)

export const getStyleVal = value =>
  typeof value === 'string' && value.indexOf('%') === -1
    ? value
    : `${parseInt(value)}px`

/**
 * [getLength 获得字符串实际长度，中文2，英文1]
 * @param  {[type]} str [要获得长度的字符串]
 * @return {[type]}     [description]
 */
export function getLength(str) {
  const len = str.length
  let realLength = 0
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

// 高亮关键字的颜色
export function highlightKeyword(val, keyword, options) {
  options = {
    // 忽略大小写
    ignore: true,
    class: 'highlight',
    style: 'color: #2253D4; font-weight: bold;',
    ...options
  }
  let normVal = val + '',
    normKeyword = keyword + ''
  if (options.ignore) {
    normVal = (val + '').toLowerCase()
    normKeyword = keyword.toLowerCase()
  }
  const index = normVal.indexOf(normKeyword)

  if (index !== -1 && keyword !== '') {
    const word = val.slice(index, index + keyword.length),
      reg = new RegExp(word, 'g')
    return val.replace(
      reg,
      `<span class="${options.class}" style="${options.style}">${word}</span>`
    )
  }
  return val
}

/**
 * 根据指定长度，以指定的分隔符分割 数据，主要用于分割数字 如果123456 =>  123,456
 * @param {Number | String} str 原字符串
 * @param {Number} length 每几位分割一次 default 3
 * @param {String} separator 分割符 default ,
 */
export function insertSeparator(str, length = 3, separator = ',') {
  if (!str) return ''
  let res = []
  // count = 0
  str
    .toString()
    .split('')
    .reverse()
    .forEach((item, index) => {
      res.push(index % length === 0 && index !== 0 ? item + separator : item)
    })
  return res.reverse().join('')
}

// 格式化数字
export function formatNum(value) {
  if (typeof value === 'number') {
    if (value < 1) {
      value = (value * 100).toFixed(3) + '%'
    } else if (value < 10000) {
      value = (value / 10000).toFixed(3) + '万'
    } else if (value < 100000000) {
      value = (value / 100000000).toFixed(3) + '亿'
    }
  }
  return value
}

// 格式化数字
/* 
  {
    decimal: Number,
    percent: Boolean,
    useThousandSeparate: Boolean
  }
*/

export function formatNumByCfg(value, cfg) {
  if (typeof value === 'number') {
    const { decimal, percent, useThousandSeparate } = cfg
    if (decimal) {
      value = fixed(Number(value), decimal)
    }
    if (useThousandSeparate) {
      value = insertSeparator(value)
    }
    if (percent) {
      value += '%'
    }
  }
  return value
}

// 格式化数字
export function formatNumByPattern(value, pattern) {
  return value
}

/**
 * 截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
export function cutstr(str, len) {
  const strLen = str.length
  let strLength = 0
  let strCut = ''

  // 如果给定字符串小于指定长度，则返回源字符串；
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i)
    strLength++
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength++
    }
    strCut = strCut.concat(a)
    if (strLength >= len) {
      strCut = strCut.concat('...')
      return strCut
    }
  }
  if (strLength < len) {
    return str
  }
}

/**
 * 生成一个指定长度的uuid
 * @param {Number} len  字符串长度
 * @param {Number} radix 进制数[8 | 10 | 16] default 10
 */
export function uuid(len = 10, radix = 16) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  const uuid = []
  let i
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// excel 列字母生成函数，n >= 1
// convertToTitle(1) => A , convertToTitle(28) => AB
export function convertToTitle(n) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res = ''
  while (n > 0) {
    n--
    const a = n % 26
    n = Math.floor(n / 26)
    res = `${str[a]}${res}`
  }
  return res
}

// excel 列字母生成函数
export function numToString(num) {
  const stringArray = []
  const numToStringAction = function (num) {
    num -= 1
    const a = parseInt(num / 26)
    const b = num % 26
    stringArray.push(String.fromCharCode(64 + parseInt(b + 1)))
    if (a > 0) {
      numToStringAction(a)
    }
  }
  numToStringAction(num)
  return stringArray.reverse().join('')
}

// excel 列字母转数字函数
export function stringToNum(a) {
  const str = a.toLowerCase().split('')
  const al = str.length
  const getCharNumber = char => char.charCodeAt() - 96
  let numout = 0
  let charnum = 0
  for (let i = 0; i < al; i++) {
    charnum = getCharNumber(str[i])
    numout += charnum * Math.pow(26, al - i - 1)
  }
  return numout
}

// base64编码  btoa
export function encodeBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1)
    })
  )
}

// base64解码 atob
export function decodeBase64(str) {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

// 将对象转成url参数字符串，并base64编码与encodeURIComponent
export function encodeBase64ObjectToURLParam(obj) {
  var urlParam = []
  for (var key in obj) {
    urlParam.push(
      encodeURIComponent(encodeBase64(key)) +
      '=' +
      encodeURIComponent(encodeBase64(obj[key]))
    )
  }
  return urlParam.join('&')
}

// 将decodeURIComponent与base64编码的url参数字符串转成对象
export function decodeBase64URLParamToObj(str) {
  var arr = str.split('&')
  var obj = {}
  arr.forEach(item => {
    var l = item.split('=')
    var key = decodeBase64(decodeURIComponent(l[0]))
    var value = decodeBase64(decodeURIComponent(l[1]))
    obj[key] = value
  })
  return obj
}

export function getType(data) {
  const type = Object.prototype.toString.call(data)
  return type.substring(8, type.length - 1)
}

/* String 方法结束 */

/* Date 方法开始 */

export function isDate(date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  if (Array.isArray(date)) return false // deal with `new Date([ new Date() ]) -> new Date()`
  return true
}

/**
 * 根据日期获取 星期几
 * @param {date} src
 */
export function getWeekNumber(src) {
  if (!isDate(src)) return null
  const date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  // January 4 is always in week 1.
  const week = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return (
    1 +
    Math.round(
      ((date.getTime() - week.getTime()) / 86400000 -
        3 +
        ((week.getDay() + 6) % 7)) /
      7
    )
  )
}

/**
 * 格式化时间
 * @param {Date} date
 * @param {String} fmt
 */
export function dateFormat(date, fmt = 'YYYY-MM-dd') {
  const o = {
    'YYYY+': date.getFullYear(), // 月份
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// js时间转化为几天前,几小时前，几分钟前
export function getDateDiff(date) {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  // const halfamonth = day * 15
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - new Date(date).getTime()
  if (diffValue < 0) { return }
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  let result
  if (monthC >= 1) {
    result = parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

// 格式化一个时间戳的时间段
export function formatTimeGap(start, end) {
  const timestamp = new Date(end).getTime() - new Date(start).getTime(),
    day = parseInt(timestamp / (24 * 60 * 60 * 1000)),
    hour = parseInt(timestamp / (60 * 60 * 1000)),
    minute = parseInt((timestamp / (60 * 1000)) % 60),
    second = parseInt((timestamp / 1000) % 60)
  let str = ''
  if (day > 0) {
    str += `${day}天`
  }
  if (hour > 0 || str) {
    str += `${hour}时`
  }
  if (minute > 0 || str) {
    str += `${minute}分`
  }
  str += `${second}秒`
  return str
}

/**
 * 获取从num开始的一个星期的时间
 * @param {Number} num
 * @param {String} format 时间格式
 */
export function get7Days(num, format) {
  num = num || 0
  if (typeof num === 'string') {
    format = num
    num = 0
  } else {
    format = format || 'yyyy/MM/dd'
  }

  const arr = []
  for (let i = num * 7 + 1; i < (num + 1) * 7 + 1; i++) {
    const currDate = new Date()
    arr.push(
      dateFormat(new Date(currDate.getTime() - i * 1000 * 60 * 60 * 24), format)
    )
  }
  arr.reverse()
  return arr
}

/**
 * 获取从time时间开始前num天的时间
 * @param {Number} num
 * @param {String} format 时间格式
 */
export function get30Days(time, num, format) {
  num = num || 30
  if (typeof num === 'string') {
    format = num
    num = 30
  } else {
    format = format || 'yyyy-MM-dd'
  }
  time = time || new Date()
  const arr = []
  for (let i = num; i > 0; i--) {
    const currDate = new Date(time)
    arr.push(
      dateFormat(
        new Date(currDate.getTime() - (i - 1) * 1000 * 60 * 60 * 24),
        format
      )
    )
  }
  // arr.reverse()
  return arr
}

/* Date 方法结束 */

/* Number 方法开始 */

export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/* Number 方法结束 */

/* Array | Object 方法开始 */

export const pickOne = data => {
  return data[Math.floor(Math.random() * data.length)]
}

export function copyArray(source, array) {
  let index = -1
  const length = source.length

  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

// 合并相同索引的数组
export function mergeEqualIndexArray(arr) {
  const result = []
  arr.forEach(item => {
    item.forEach((d, i) => {
      const a = (result[i] = result[i] || [])
      a.push(d)
    })
  })
  return result
}

// 相同索引的数组相加
export function equalIndexValueSum(arr) {
  const result = []
  arr.forEach(item => {
    item.forEach((d, i) => {
      result[i] = result[i] ? result[i] + d : d
    })
  })
  return result
}

// 随机排列
export function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

/*
  管道函数，返回一个函数
  pipe(fn1, fn2, fn3)(args)从左至右执行
  args作为参数传给fn1函数，先执行fn1,fn1执行的结果作为fn2的参数，依次类推
*/
export function pipe(...fns) {
  return function (...x) {
    return fns.reduce((args, fn) => fn(args), x)
  }
}

/*
  组合函数，返回一个函数
  compose(fn1, fn2, fn3)(args)从右至左执行
  args作为参数传给fn3函数，先执行fn3,fn3执行的结果作为fn2的参数，依次类推
*/
export function compose(...fns) {
  return function (...x) {
    return fns.reduceRight((args, fn) => fn(args), x)
  }
}

// https://juejin.im/post/5d2299faf265da1bb67a3b65
// https://juejin.im/post/5b8350246fb9a019c372d26d
// 函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术
export function curry(fn, ...args) {
  // 获取函数形参的个数
  const length = fn.length
  return function (...params) {
    const newArgs = [...args, ...params]
    if (newArgs.length >= length) {
      return fn.apply(this, newArgs)
    } else {
      return curry.call(this, fn, ...newArgs)
    }
  }
}

/**
 * 深度克隆
 * @param {Array | Object} source
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * [getLabelByValue 将字典对应的code转换成name]
 * @param  {[Array]}            list  [字典]
 * @param  {[String / Array]}   value [对应的code]
 * @return {[String]}           [description]
 */
export function getLabelByValue(list, value) {
  let label

  if (value instanceof Array) {
    label = []
    list.forEach(item => {
      value.forEach(v => {
        if (item.options) {
          item.options.some(option => {
            if (v === option.value) {
              label.push(option.label)
              return true
            }
          })
        } else if (v === item.value) {
          label.push(item.label)
        }
      })
    })
    label = label.join('，')
  } else {
    list.some(item => {
      if (item.options) {
        item.options.some(option => {
          if (value === option.value) {
            label = option.label
            return true
          }
        })
      } else if (value === item.value) {
        label = item.label
        return true
      }
    })
  }
  return label
}

// 将数组对象的key转换为label 与 value的select类型的label与value对象
export function reverseDataToSelectList(list, labelKey, valueKey) {
  const l = []
  list.forEach(item => {
    l.push({
      label: item[labelKey],
      value: valueKey ? item[valueKey] : item[labelKey]
    })
  })
  return l
}

// 将数组中的值赋值，
// 如source = {a: 1, b: 2} target = [{value: '', label: 'A', key: 'a'}, {value: '', label: 'B', key: 'b'}]
//  => [{value: 1, label: 'A', key: 'a'}, {value: 2, label: 'B', key: 'b'}]
export function addValueToList(source, target) {
  const _target = [...target]
  for (const key in source) {
    _target.some(item => {
      if (item.key === key) {
        item.value = source[key]
        return true
      }
    })
  }
  return _target
}

/* Array | Object 方法结束 */

/* Function 扩展 开始 */

/**
 * async/await catch 错误
 * @param {Promise} promise
 * @param {String} errTxt
 * @return {Promise}
 */
export function asyncTo(promise, errTxt) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      err = errTxt || '请求失败'
      return [err, undefined]
    })
}

export function simpleAsyncTo(promise, errTxt) {
  return promise
    .then(data => {
      // 如果没有
      const { key, success, msgKey } = config.markStatus
      if (!data) return
      if (data[key] === success) {
        return data
      } else {
        errCb(data[msgKey] || errTxt)
        return null
      }
    })
    .catch(err => {
      process.env.NODE_ENV === 'development' && console.error(err)
      errCb(err[config.markStatus.msgKey] || '请求失败')
      return null
    })
}
/**
 * 睡眠函数
 * @param {number} time
 */
export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

/**
 * 处理报错
 * @param {string} msg
 */
export const errCb = msg => {
  process.env.NODE_ENV === 'development' && console.error(msg)
  Message.error(msg)
}

// 防抖函数
// 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
export function debounce(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(_ => {
      fn.apply(context, arguments)
    }, delay)
  }
}

// 节流函数：当持续触发事件时，保证一定时间段内只调用一次事件处理函数
export function throttle(fn, delay = 1000) {
  let timer = null
  let start = Date.now()
  return function () {
    const cur = Date.now()
    const wait = delay - (cur - start)
    const context = this
    clearTimeout(timer)
    if (wait <= 0) {
      fn.aplly(context, arguments)
      start = Date.now()
    } else {
      timer = setTimeout(_ => {
        fn.apply(context, arguments)
      }, delay)
    }
  }
}

/**
 * @export
 * @param {*} formName el-form的 ref 与 v-model 此处为要保证一致
 * @param {*} arr 属性组成的数组, 默认为空数组
 * @param {*} flag true 表示清空表单中arr里面的属性， false 清空arr之外的其他表单属性
 * 如果只传formName 则相当于清空表单的功能
 */
export function resetOtherFields(formName, arr = [], flag) {
  const $filter = this.$refs[formName]
  const clearFilters = []
  for (const key in this[formName]) {
    if (flag) {
      if (arr.includes(key)) {
        this[formName][key] = ''
        clearFilters.push(key)
      }
    } else if (!arr.includes(key)) {
      this[formName][key] = ''
      clearFilters.push(key)
    }
  }
  setTimeout(_ => {
    $filter && $filter.clearValidate(clearFilters)
  }, 10)
}

export function getMiddleValue(max, min, value) {
  return value > max ? max : value < min ? min : value
}

/* Function 扩展 结束 */

/* Mock 数据方法开始 */
export function sortData(length) {
  return Array.from(
    {
      length
    },
    item => randomInRange(500, 6000)
  ).sort((a, b) => {
    return a > b
  })
}

export function genData(length) {
  return Array.from(
    {
      length
    },
    item => randomInRange(500, 6000)
  )
}

export function seriesData(arrData) {
  const arr = []
  arrData.forEach((item, index) => {
    arr.push({
      name: item,
      value: randomInRange(500, 6000)
    })
  })
  return arr
}

export function randomDateDate(size = 7) {
  const data = []
  const prefix = '2017-' + randomInRange(1, 12) + '-'
  const num = randomInRange(1, 10)

  for (let i = 0; i < size; i++) {
    data.push({
      date: prefix + (num + i),
      value: randomInRange(1000, 10000)
    })
  }
  return data
}
/* Mock 数据方法结束 */

/* Math 常用算法 开始 */
/**
 * 获取椭圆上的点，亦可获取圆上的点，圆上的点弧长是等分的，椭圆的点不是等分的
 * @param {Number} rx x轴半径
 * @param {Number} ry y轴半径
 * @param {Number} cx 圆心x
 * @param {Number} cy 圆心y
 * @param {Number} count 等分的数量
 * @param {Object} options
 * counterclockwise: true 返回的数据是顺时针还是逆时针 true 逆时针
 * startAngle: 0 起始角度，从正下方开始计算
 */
export function getEllipsePoints(rx, ry, cx, cy, count, options) {
  options = {
    startAngle: 0,
    counterclockwise: true,
    ...options
  }

  const radian = Math.PI / 180,
    radians = radian * Math.round(360 / count), // 弧度
    { counterclockwise, startAngle } = options,
    startRadians = !counterclockwise
      ? -(radian * startAngle - radians)
      : radian * startAngle,
    points = []
  for (let i = 0; i < count; i++) {
    const x = cx + rx * Math.sin(radians * i + startRadians),
      y = cy + ry * Math.cos(radians * i + startRadians)
    if (!counterclockwise) {
      points.unshift({ x, y }) // 顺时针
    } else {
      points.push({ x, y }) // 逆时针
    }
  }
  return points
}

export function getCircleDividePoints(radius, cx, cy, count, options = {}) {
  return getEllipsePoints(radius, radius, cx, cy, count, options)
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}
/**
 * 计算椭圆上N个等分点的坐标
 * @param {Number} radius 半径
 * @param {Number} cx 圆心x
 * @param {Number} cy 圆心y
 * @param {Number} count 等分的数量
 * @param {Object} options
 * counterclockwise: true 返回的数据是顺时针还是逆时针 true为逆时针
 * startAngle: 0 起始角度，从正下方开始计算
 * precision：0.001 精度，值越小算出来等分点的长度越接近，但也会消耗更多的性能
 */
export function getEllipseDividePoints(rx, ry, cx, cy, count, options) {
  options = {
    precision: 0.001, // 值越小算出来等分点的长度越接近，但也会消耗更多的性能
    counterclockwise: true,
    startAngle: 0,
    ...options
  }
  const q = rx + ry,
    h = ((rx - ry) / (rx + ry)) ** 2,
    m = 22 / (7 * Math.PI) - 1,
    n = Math.pow((rx - ry) / rx, 33.697),
    // 椭圆周长
    l = Math.PI * q * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))) * (1 + m * n),
    points = [],
    onelength = l / count,
    radian = Math.PI / 180,
    { precision, counterclockwise, startAngle } = options,
    startRadians = !counterclockwise
      ? -radian * startAngle
      : radian * startAngle

  let angle = 0,
    x0 = rx,
    y0 = 0
  for (let i = 0; i < count; i++) {
    let dist = 0,
      x = 0,
      y = 0
    while (dist < onelength) {
      angle += precision
      x = rx * Math.sin(radian * angle + startRadians)
      y = ry * Math.cos(radian * angle + startRadians)
      dist += distance(x0, y0, x, y)
      x0 = x
      y0 = y
    }
    const p = { x: x + cx, y: y + cy }
    if (!counterclockwise) {
      points.unshift(p) // 顺时针
    } else {
      points.push(p) // 逆时针
    }
  }
  if (!counterclockwise) {
    points.unshift(points.pop())
  }
  return points
}

/* Math 常用算法 结束 */

// 对象转换成vue props的格式
export function transferConfig(config) {
  const obj = Object.create(null)
  Object.entries(config).forEach(([key, value]) => {
    const type = getType(value)

    obj[key] = {
      // eslint-disable-next-line
      type: eval(type)
    }
    if (type === 'Array' || type === 'Object') {
      obj[key].default = () => value
    } else {
      obj[key].default = value
    }
  })
  return obj
}

export function open(url) {
  window.open(url, '', 'noopener=yes,noreferrer=yes')
}

// 上传图片文件转成base64
export function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}