/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:05:00 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 22:42:03
 */
import Vue from 'vue'
import {
  ConfigProvider,
  Layout,
  Menu,
  Breadcrumb,
  Spin,
  Icon
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
Vue.use(Spin)