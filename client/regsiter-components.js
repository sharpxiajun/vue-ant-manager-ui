/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:05:00 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 14:40:29
 */
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import {
  ConfigProvider,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Tooltip
} from 'ant-design-vue'

const fontsUrl = require('./fonts')
import config from '@/config/index.js'
Icon.setTwoToneColor(config['primary-color'])

const AIconfont = Icon.createFromIconfontCN({
  scriptUrl: fontsUrl
})
Vue.component(AIconfont.name, AIconfont)

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Icon)
Vue.use(Tooltip)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/img/lazyload.gif',
  attempt: 1
})