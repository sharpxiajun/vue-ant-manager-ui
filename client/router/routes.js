/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:21:00 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 14:21:27
 */
import adus from './adus'
import antvG2 from './antvG2'
import antvG6 from './antvG6'

const Layout = _ => import('@/views/layout/index.vue')
const Home = _ => import('@/views/home/index.vue')

export default [
  {
    path: '/',
    name: 'index',
    meta: {
      name: 'root'
    },
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          name: '首页',
          icon: 'icon-home1',
          active: 'shadow-blue'
        },
        component: Home
      },
      adus,
      antvG2,
      antvG6
    ]
  },
  {
    path: '/error/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: _ =>
      import(
        /* webpackChunkName: "error-page-500" */ '@/views/error-page/500.vue'
      )
  },
  {
    path: '/error/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: _ =>
      import(
        /* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'
      )
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: _ =>
      import(
        /* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'
      )
  }
]