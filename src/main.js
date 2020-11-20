/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:04:50 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2020-11-20 20:04:50 
 */
import Vue from 'vue'
import './regsiter-components'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render() {
    return (
      <a-config-provider id="app">
        <transition name="fadeinLeft" mode="out-in">
          <router-view></router-view>
        </transition>
      </a-config-provider>
    )
  }
}).$mount('#app')
