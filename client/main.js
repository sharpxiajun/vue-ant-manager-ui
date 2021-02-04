/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:04:50 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 22:16:36
 */
import Vue from 'vue'
import './regsiter-components'
import router from './router'
import store from './store'

import plugins from '@/libs/plugins'
import globalMixin from '@/mixins/global'
import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import '@/assets/less/reset.less'
import '@/assets/less/auto-complete.less'
import '@/assets/less/message.less'
import '@/assets/less/transition.less'
import '@/assets/less/ant.less'
import '@/assets/less/common.less'

import config from '@/config'

Vue.use(plugins)
Vue.use(VueTouchRipple)
Vue.mixin(globalMixin)

moment.locale('zh-cn')

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render() {
    return (
      <a-config-provider 
        id="app"         
        autoInsertSpaceInButton={false}
        locale={zh_CN}
        prefixCls={config.styleVars['ant-prefix']}>
        <transition name="fadeinleft" mode="out-in">
          <router-view></router-view>
        </transition>
      </a-config-provider>
    )
  }
}).$mount('#app')
