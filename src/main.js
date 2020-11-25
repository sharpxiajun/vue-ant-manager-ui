/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:04:50 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2020-11-We 10:57:33
 */
import Vue from 'vue'
import './regsiter-components'
import router from './router'
import store from './store'

import styleVars from '../build/style-vars'

import '@/assets/less/skin-blue/theme.less'
import '@/assets/less/skin-blue/transition.less'

Vue.config.productionTip = false
Vue.prototype.$styleVars = styleVars

new Vue({
  router,
  store,
  render() {
    return (
      <a-config-provider id="app">
        <transition name="fadeinleft" mode="out-in">
          <router-view></router-view>
        </transition>
      </a-config-provider>
    )
  }
}).$mount('#app')
