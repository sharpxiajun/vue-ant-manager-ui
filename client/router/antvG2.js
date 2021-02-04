const WrapperView = {render: c => c('router-view')}

const antvBar = _ => import('@/views/antvG2/bar.vue')
const antvLine = _ => import('@/views/antvG2/line.vue')
const antvMap = _ => import('@/views/antvG2/map.vue')
const antvPie = _ => import('@/views/antvG2/pie.vue')

export default {
  path: '/antvG2',
  name: 'antvG2',
  meta: {
    name: '图表-AntV-G2',
    icon: 'icon-dianzibiaoge',
    active: 'shadow-green'
  },
  component: WrapperView,
  children: [
    {
      path: '/antvG2/antvBar',
      name: 'antvBar',
      meta: {
        name: '柱状图',
        icon: 'icon-dianzibiaoge',
        active: 'shadow-green'
      },
      component: antvBar
    },
    {
      path: '/antvG2/antvLine',
      name: 'antvLine',
      meta: {
        name: '折线图',
        icon: 'icon-dianzibiaoge',
        active: 'shadow-green'
      },
      component: antvLine      
    },
    {
      path: '/antvG2/antvMap',
      name: 'antvMap',
      meta: {
        name: '统计地图',
        icon: 'icon-dianzibiaoge',
        active: 'shadow-green'
      },
      component: antvMap      
    },
    {
      path: '/antvG2/antvPie',
      name: 'antvPie',
      meta: {
        name: '饼状图',
        icon: 'icon-dianzibiaoge',
        active: 'shadow-green'
      },
      component: antvPie      
    }
  ]
}