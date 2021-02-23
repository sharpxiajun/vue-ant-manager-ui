import editorStyle from '../utils/defaultStyle'
import { deepMix } from '@antv/util'

const netDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 26,
    height: 26,
    left: 12,
    top: 12
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke:'#FA8C16',
    cursor: 'default'    
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

export default function(G6) {
  G6.registerNode('net-base-node', {
    shapeType: 'circle',
    labelPosition: 'bottom',
    options: {
      ...netDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [50, 50]
      const width = cfg.size[0]
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...this.options.style        
      }
      if (cfg.hasOwnProperty('color')) {
        style.fill = cfg.color
      }
      return style
    },
    afterDraw(cfg, group) {
      if (cfg.active) {
        const shape = group.get('children')[0]
        shape.animate({
          repeat: true,
          onFrame(ratio) {
            const diff = ratio <=0.5 ? ratio * 10 : (1 - ratio) * 10
            let radius = cfg.size
            if (isNaN(radius)) radius = radius[0]
            return {
              r: radius / 2 + diff
            }
          }
        }, 3000, 'easeCubic')        
      }
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -6],
            ['L', 6, 0],
            ['L', -4, 6],
            ['Z']
          ],
          fill: this.options.style.stroke,
          stroke: this.options.style.stroke
        }
      })
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // left
        [0, 0.5], // bottom
      ]
    }    
  }, 'base-node')

  G6.registerNode('net-disk', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/disk.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-rack', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/rack.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-server', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/server.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-server1', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/server1.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')  

  G6.registerNode('net-netcard', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/netcard.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-disk1', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/disk-img.png')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')  

  G6.registerNode('net-rack1', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/netRack-img.png')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-server3', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/server-img.png')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')

  G6.registerNode('net-server2', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/server1-img.png')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node')  

  G6.registerNode('net-netcard1', {
    options: deepMix({}, netDefaultOptions, {icon: require('../assets/net/netcard-img.png')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) }
  }, 'net-base-node') 
}