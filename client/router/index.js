/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 16:47:57 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 17:15:30
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

if (!window.VueRouter) Vue.use(Router)
Vue.use(NProgress)

const openNewWindow = path => {
  window.open(path, '', 'noopener=yes,noreferrer=yes')
  NProgress.done()
}

const getRouteMap = (routes, map) => {
  console.warn(routes, '===getRouteMap routes')
  console.warn(map, '===getRouteMap map')
  console.groupEnd()
  return routes.reduce((prev, cur) => {
    prev[cur.path] = cur
    if (cur.children) {
      getRouteMap(cur.children, prev)
    }
    return prev
  }, map)
}

console.group('getRouteMap')
const routesPathMap = getRouteMap(routes, {})
console.warn(routesPathMap, '====routesPathMap')

// 绑到vue原型上
Vue.prototype.$routesPathMap = routesPathMap

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let route = {...to}
  if (to.redirectedFrom) {
    route = routesPathMap[route.redirectedFrom]
  }
  if (route && route.meta.href && !['/', '/home'].includes(from.path)) {
    openNewWindow(route.meta.href)
    return
  }
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
  if (window) {
    window.document.title = `${to.meta.name ? to.meta.name + ' - ' : ''}${
      router.app.$config.name
    }`
    window && window.scrollTo(0, 0)
  }
})

export default router
