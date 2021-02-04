const WrapperView = {render: c => c('router-view')}
const adusAdd = _ => import('@/views/adus/add.vue')
const adusSearch = _ => import('@/views/adus/search.vue')
const adusSearchForDetail = _ => import('@/views/adus/searchForDetail.vue')

export default {
  path: '/adus',
  name: 'adus',
  meta: {
    name: '增删改查',
    icon: 'icon-yibiaoban1',
    active: 'shadow-orange'
  },
  component: WrapperView,
  children: [
    {
      path: '/adus/search',
      name: 'search',
      meta: {
        name: '查询操作',
        icon: 'icon-yibiaoban1',
        active: 'shadow-orange'
      },
      component: adusSearch
    },
    {
      path: '/adus/add',
      name: 'add',
      meta: {
        name: '新增操作',
        icon: 'icon-yibiaoban1',
        active: 'shadow-orange'
      },
      component: adusAdd
    },
    {
      path: '/adus/searchForDetail',
      name: 'searchForDetail',
      meta: {
        name: '列表详情',
        icon: 'icon-yibiaoban1',
        active: 'shadow-orange'
      },
      component: adusSearchForDetail
    }
  ]
}
