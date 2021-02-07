const WrapperView = {render: c => c('router-view')}

const g6Basic = _ => import('@/views/antv-g6/basic.vue')
const g6Tree = _ => import('@/views/antv-g6/tree.vue')
const topologyEditor = _ => import('@/views/antv-g6/topology-demo.vue')

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
      path: '/antvG6/g6basic',
      name: 'g6basic',
      meta: {
        name: '基础关系图',
        icon: 'icon-shujuji',
        active: 'shadow-purple'
      },
      component: g6Basic      
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
    },
    {
      path: 'antvG6/topologyEditor',
      name: 'topologyEditor',
      meta: {
        name: '开发拓扑图',
        icon: 'icon-shujuji',
        active: 'shadow-purple'
      },
      component: topologyEditor
    }
  ]
}