/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 18:27:11 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2021-02-03 18:27:11 
 */
import {
  errCb,
  asyncTo,
  sleep,
  simpleAsyncTo,
  encodeBase64,
  // debounce,
  // throttle,
  resetOtherFields,
  loop,
  open,
  highlightKeyword
} from './util'

import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

export default {
  install(Vue) {
    Vue.prototype.$errCb = errCb
    Vue.prototype.$asyncTo = asyncTo
    Vue.prototype.$sleep = sleep
    Vue.prototype.$encodeBase64 = encodeBase64
    Vue.prototype.$simpleAsyncTo = simpleAsyncTo
    Vue.prototype.$debounce = debounce
    Vue.prototype.$throttle = throttle
    Vue.prototype.$resetOtherFields = resetOtherFields
    Vue.prototype.$loop = loop
    Vue.prototype.$open = open
    Vue.prototype.$highlightKeyword = highlightKeyword
  }
}