import adus from './adus'
import antvG2 from './antvG2'
import antvG6 from './antvG6'

const Layout = _ => import('@/views/layout/index.vue')
const Home = _ => import('@/views/home/index.vue')

export default [
  {
    path: '/',
    name: 'index',
    meta: {},
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          name: '首页'
        },
        component: Home
      },
      adus,
      antvG2,
      antvG6
    ]
  }
]