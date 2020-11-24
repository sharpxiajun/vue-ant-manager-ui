const WrapperView = {render: c => c('router-view')}
const adusAdd = _ => import('@/views/adus/add.vue')
const adusSearch = _ => import('@/views/adus/search.vue')
const adusSearchForDetail = _ => import('@/views/adus/searchForDetail.vue')

export default {
  path: '/adus',
  name: 'adus',
  meta: {
    name: '增删改查'
  },
  component: WrapperView,
  children: [
    {
      path: '/adus/add',
      name: 'add',
      meta: {
        name: '新增操作'
      },
      component: adusAdd
    },
    {
      path: '/adus/search',
      name: 'search',
      meta: {
        name: '查询操作'
      },
      component: adusSearch
    },
    {
      path: '/adus/searchForDetail',
      name: 'searchForDetail',
      meta: {
        name: '列表详情'
      },
      component: adusSearchForDetail
    }
  ]
}
