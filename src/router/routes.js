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
        meta: {},
        component: Home
      }
    ]
  }
]