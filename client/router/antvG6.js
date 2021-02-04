const WrapperView = {render: c => c('router-view')}

const g6Simple = _ => import('@/views/antvG6/simple.vue')
const g6Tree = _ => import('@/views/antvG6/tree.vue')

export default {
  path: '/antvG6',
  name: 'antvG6',
  meta: {
    name: 'Graph-AntV-G6',
    icon: 'icon-shujuji',
    active: 'shadow-purple'
  },
  component: WrapperView,
  children: [
    {
      path: '/antvG6/g6Simple',
      name: 'g6Simple',
      meta: {
        name: '一般关系图',
        icon: 'icon-shujuji',
        active: 'shadow-purple'
      },
      component: g6Simple      
    },
    {
      path: '/antvG6/g6Tree',
      name: 'g6Tree',
      meta: {
        name: 'Tree图',
        icon: 'icon-shujuji',
        active: 'shadow-purple'
      },
      component: g6Tree         
    }
  ]
}