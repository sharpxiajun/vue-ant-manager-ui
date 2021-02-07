<template>
  <section class="graph-basic" ref="graphBasic">
    <SearchHead title="基础关系图" ref="searchHead">
      <a-radio-group v-model="status" default-value="basic" button-style="solid" @change="changeSample">
        <a-radio-button v-for="r in radioList" :key="r.value" :value="r.value">
          {{r.label}}
        </a-radio-button>
      </a-radio-group>
    </SearchHead>
    <div class="graph-canvas" ref="graphCanvas"></div>
  </section>  
</template>

<script>
import SearchHead from '@c/search-head'
import G6 from '@antv/g6'
export default {
  name: 'graph-basic',
  components: {
    SearchHead
  },
  mounted() {
    this.getCanvasStyle()
    this.$nextTick(() => this.draw())
  },
  data() {
    return {
      canvasStyle: {
        width: 0,
        height: 0
      },
      data: null,
      graph: null,
      status: 'basic',
      radioList: [
        {label: '快速入门', value: 'basic'},
        {label: '复杂实例', value: 'tutorial'},
        {label: '图上动画', value: 'animation'},
        {label: 'Combo实例', value: 'combo'}
      ]
    }
  },
  methods: {
    getCanvasStyle() {
      const containerStyle = window.getComputedStyle(this.$refs.graphBasic.parentNode),
          headStyle = window.getComputedStyle(this.$refs.searchHead.$el)
      const cHeight = parseFloat(containerStyle.height), 
        cPadTop = parseFloat(containerStyle.paddingTop), 
        cPadBottom = parseFloat(containerStyle.paddingBottom),
        headHeight = parseFloat(headStyle.height)
      const cWidth = parseFloat(containerStyle.width), 
        cPadLeft = parseFloat(containerStyle.paddingLeft), 
        cPadRight = parseFloat(containerStyle.paddingRight)
      this.canvasStyle.width = parseFloat(cWidth - cPadLeft - cPadRight)
      this.canvasStyle.height = parseFloat(cHeight - cPadTop - cPadBottom - headHeight)
      this.$refs.graphBasic.style.height = `${parseFloat(cHeight - cPadTop - cPadBottom)}px`
      this.$refs.graphCanvas.style.height = `${this.canvasStyle.height}px`
    },
    async draw() {
      this.destroyGraph()
      switch(this.status) {
        case 'basic':
          this.drawBasic()
          break
        case 'tutorial':
          await this.drawTutorial()
          break
        case 'animation':
          this.drawAnimation()
          break
        case 'combo':
          this.drawCombo()
          break
      }
      this.render()
    },
    destroyGraph() {
      if (this.graph) {
        this.graph.clear()
        this.graph.destroy()
        this.graph = null
        this.data = null
      }
    },
    drawAnimation() {
      const Util = G6.Util
      this.data = {
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 100,
            type: 'circle-animate',
            size: 20,
            label: 'Scale Animation',
            labelCfg: {
              position: 'top'
            }
          },
          {
            id: 'node2',
            x: 410,
            y: 100,
            type: 'background-animate',
            color: '#40a9ff',
            size: 20,
            label: 'Background Animation',
            labelCfg: {
              position: 'left',
              offset: 10
            }
          },
          {
            id: 'node3',
            x: 700,
            y: 600,
            size: [40, 40],
            type: 'inner-animate',
            img:
              'data:image/webp;base64,UklGRq4FAABXRUJQVlA4IKIFAABwHwCdASo8ADwAPiEMhEGhhv6rQAYAgS2NHsdCq/4D8AOoA64OEUAj/XPxVwyvRGvyO/gGxN/t3oK/1X6zesX3L/p/RP/2HCgKAB9AGeAbCB+AGwAbQBtA/8c/m/4PYHTonm+SzRH6B9sv2i/rOZC+G/ln9l/ML/GdoD7APcA/TD+09QDzAfrX+vHYM9AD+Uf0zrAPQA/bH0vv2t+CH9qf2R+A39e6X098/I7IAcLcs8Gjmc/9T7gPbX9H+wJ+rPVV9En9ZmBI5oUiYhkYHIVjRr9hzCTPcV5Rs/wjjIHkxPgtr/3ALZSuUm146HHwqQVA23hnnqH/4aJ/k4v4hU6RBZ0AAAD+//8ARPyL9yWIlAbWBAD0oKSqlYWreuRa3Oj02u+TvSQS8iwMYewUYTWLDNp9wOlFJaWnqE+za35UwUXuDAT6T0I4fwY+u+qrRVhl+S1ir4X7BQiNswug5AX+MjQcXEeUwfSIEUT+DFPCr+BUiwTbFxLni7fv61vRbmXoauLz4tiqOFTzEGP8tNXP5+H7mZVGfNjIxapT3FGUtqBdp/SD5cTOYOkn2fawkpqpCSqf2+CfiGWtIF673fEzlk/hIbWDhQ81C/ddxLn609d/5efckbdZ8HZbhhVmM82/Uat7CFmw1SH5xCxRxEEhjpf1EP1Xn5q9VZfm1+OFTab/MN67Xha8K//5oVBlMgZALE653X0fas/+2xMqiyCu5Wa7PHsCwbBwqROfNmzi4LPOTjkFPHVKDD1Nfj4/sul6cANdF68rf2jszlyZsUUoLTP7H3swSroc3ssNXSRVAcYd7+iBZpfoAYWvKgnr+Hv62fHZX5ZbjYbYzVjq6fsXkubto858NuUx4+ILb5y7dP6W3/IYVeUSF0yZseKIZhOMs9BBf5uB2Y3Ott//+1OG7hYINzcqigrzWAOJbSmVw3G0ULywkobx+rvfk8VmZFzQGgP/+4T74mp/vsZyM1NLguiTO2gNO05tcpXwveq5mrcweXrJ/bRZDmU2KBrnXhkXq+735c+UHTFq4h4jMOPm5shKioB6XaqhUf3DJlMg8937g/SKjrgD0H5sNm0/k4FfilBbcrsjc3dd6cwEYJo3CNhe3SpNJ2geNXyV4/hq/BZXZ1kiVknjmf5cUx7Tv/9Sb+fQ/DgAsRNSz1wiVodiLjP7aVrkxbWx5gJ8U/j0o1Ipm/nyDZRPrQXmbPAcy1eDDejxTDBKe42ElHpC2QlFdhOedsp4i9QVjt8EqWGy1YzPaGqZhCVg/LWt8/+4BmiCzNGtpR21MGJf4kI/n/1sbe36e1QBCBAx4EVfTM82ZM2lh0P189e7eY0A3NzXWVrUek8SEn+DYYCQeEaC5hDHGreFHT1baY6KyrFx3G9oMm3fLrCqmNjFRnZa3LB/5m8FgCpq9B/1OCLRE5GzVTZnVzj/4V38PgCIpX16Kznijf01+MkDeS9oCF2hEXQ9tr+mPLrjGy4Cg5fyLgyCj1fUq33nMf79Svli2h83m3gqkoxJcXvBetFQP8V/gRjBNGmFXK5TfwLhbolWEjDqUGK3n+hxzQLif9zreYO88EIRTUNbzE1/Sn7rBEtjB0uawNje5OubWsB62SOlMZoZpxrDbMb4UvQrODPhSafmhcYe9zm/dHxssMfUthhDKjyMhoRhngPjbzfGXmIV2Omgrn/zbefK/PawUGSH6x4Qk4HCN4/X8S+XCf51JJtOQeHST/yfwg69uMkE07SONnhGUrL6j5oQn6JI+zkaH/H/P/Ti/pfOTfAWxQNiMvWX08mqbuUweFSQ/G5YUP/uCvZAXutf1+Nhl2jj/n4/fPOihPjwvfFnnjOaQvs9PSpF33d+396LASZ3IID/4UP4pf9eOMXw82ccoUUUHX6MfBWyBDvARCrdPmerUwKwW+lBIAe1dsAAAA==',
            label: 'Image Rotate',
            labelCfg: {
              position: 'right'
            }
          },
          {
            id: 'node4',
            x: 1400,
            y: 500,
            type: 'rect',
            label: 'No Animation',
            labelCfg: {
              position: 'bottom'
            }
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2'
          },
          {
            source: 'node3',
            target: 'node2'
          },
          {
            source: 'node2',
            target: 'node4'
          }
        ]        
      }

      G6.registerNode(
        'circle-animate',
        {
          afterDraw (cfg, group) {
            const shape = group.get('children')[0]
            shape.animate(
              (ratio) => {
                const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10
                return {
                  r: cfg.size / 2 + diff
                }
              },
              {
                repeat: true,
                duration: 3000,
                easing: 'easeCubic'
              }
            )
          }          
        },
        'circle'
      )

      G6.registerNode(
        'background-animate',
        {
           afterDraw (cfg, group) {
            const r = cfg.size / 2
            const back1 = group.addShape('circle', {
              zIndex: -3,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: cfg.color,
                opacity: 0.6
              },
              name: 'back1-shape'
            })
            const back2 = group.addShape('circle', {
              zIndex: -2,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: cfg.color,
                opacity: 0.6
              },
              name: 'back2-shape'
            })
            const back3 = group.addShape('circle', {
              zIndex: -1,
              attrs: {
                x: 0,
                y: 0,
                r,
                fill: cfg.color,
                opacity: 0.6
              },
              name: 'back3-shape'
            })
            group.sort() // Sort according to the zIndex
            back1.animate(
              {
                // Magnifying and disappearing
                r: r + 10,
                opacity: 0.1
              },
              {
                duration: 3000,
                easing: 'easeCubic',
                delay: 0,
                repeat: true // repeat
              }
            )// no delay
            back2.animate(
              {
                // Magnifying and disappearing
                r: r + 10,
                opacity: 0.1
              },
              {
                duration: 3000,
                easing: 'easeCubic',
                delay: 1000,
                repeat: true // repeat
              }
            ) // 1s delay
            back3.animate(
              {
                // Magnifying and disappearing
                r: r + 10,
                opacity: 0.1
              },
              {
                duration: 3000,
                easing: 'easeCubic',
                delay: 2000,
                repeat: true // repeat
              }
            ) // 3s delay
          }         
        },
        'circle'
      )

      G6.registerNode(
        'inner-animate',
        {
          afterDraw (cfg, group) {
            const size = cfg.size
            const width = size[0] - 12
            const height = size[1] - 12
            const image = group.addShape('image', {
              attrs: {
                x: -width / 2,
                y: -height / 2,
                width,
                height,
                img: cfg.img
              },
              name: 'image-shape'
            })
            image.animate(
              (ratio) => {
                const toMatrix = Util.transform(
                  [1, 0, 0, 0, 1, 0, 0, 0, 1],
                  [['r', ratio * Math.PI * 2]]
                )
                return {
                  matrix: toMatrix
                }
              },
              {
                repeat: true,
                duration: 1000,
                easing: 'easeCubic'
              }
            )
          }
        },
        'rect'
      )

      this.graph = new G6.Graph({
        container: this.$refs.graphCanvas,
        width: this.canvasStyle.width,
        height: this.canvasStyle.height,
        defaultNode: {
          style: {
            fill: '#DEE9FF',
            stroke: '#5B8FF9'
          }
        },
        defaultEdge: {
          style: {
            lineWidth: 1,
            stroke: '#b5b5b5'
          }
        }
      })
    },
    drawBasic() {
      this.data = {
        nodes: [
          {id: 'node1', label: 'BJ', x: 100, y: 60},
          {id: 'node2', label: 'WH', x: 650, y: 300}
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            label: '我是连线'
          }
        ]
      }
      const grid = new G6.Grid()
      this.graph = new G6.Graph({
        container: this.$refs.graphCanvas,
        width: this.canvasStyle.width,
        height: this.canvasStyle.height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        },
        plugins: [grid],
        fitCenter: true,
        linkCenter: true,
        defaultNode: {
          shape: 'circle',
          size: [50],
          color: '#5B8FF9',
          style: {
            fill: '#9EC9FF',
            lineWidth: 3
          },
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 20
            }
          }
        },
        defaultEdge: {
          style: {
            stroke: '#e2e2e2'
          }
        }        
      })
    },
    async drawTutorial() {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
      )
      this.data = await response.json()

      const { nodes, edges } = this.data
      nodes.forEach((node) => {
        if (!node.style) {
          node.style = {}
        }
        node.style.lineWidth = 1
        node.style.stroke = '#666'
        node.style.fill = 'steelblue'
        switch (node.class) {
          case 'c0': {
            node.type = 'circle'
            break
          }
          case 'c1': {
            node.type = 'rect'
            node.size = [35, 20]
            break
          }
          case 'c2': {
            node.type = 'ellipse'
            node.size = [35, 20]
            break
          }
        }
      })
      edges.forEach((edge) => {
        if (!edge.style) {
          edge.style = {}
        }
        edge.style.lineWidth = edge.weight
        edge.style.opacity = 0.6
        edge.style.stroke = 'grey'
      })      
  
      // 实例化 minimap 插件
      const minimap = new G6.Minimap({
        size: [150, 200],
        className: 'minimap-pos',
        type: 'delegate'
      })
      const grid = new G6.Grid()

      this.graph = new G6.Graph({
        container: this.$refs.graphCanvas,
        width: this.canvasStyle.width,
        height: this.canvasStyle.height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', {
            type: 'tooltip', // 提示框
            formatText (model) {
              // 提示框文本内容
              const text = 'label: ' + model.label + '<br/> class: ' + model.class
              return text
            }
          }, {
            type: 'edge-tooltip', // 边提示框
            formatText (model) {
              // 边提示框文本内容
              const text =
                'source: ' +
                model.source +
                '<br/> target: ' +
                model.target +
                '<br/> weight: ' +
                model.weight
              return text
            }
          }]
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 200,
          nodeStrength: -30,
          edgeStrength: 0.1
        },
        defaultNode: {
          size: 30,
          labelCfg: {
            style: {
              fill: '#fff'
            }
          }
        },
        plugins: [minimap, grid],
        // 节点不同状态下的样式集合
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue'
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 3
          }
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: 'steelblue'
          }
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true
          }
        }
      })

      // 监听鼠标进入节点
      this.graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item
        // 设置目标节点的 hover 状态 为 true
        this.graph.setItemState(nodeItem, 'hover', true)
      })
      // 监听鼠标离开节点
      this.graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item
        // 设置目标节点的 hover 状态 false
        this.graph.setItemState(nodeItem, 'hover', false)
      })
      // 监听鼠标点击节点
      this.graph.on('node:click', (e) => {
        // 先将所有当前有 click 状态的节点的 click 状态置为 false
        const clickNodes = this.graph.findAllByState('node', 'click')
        clickNodes.forEach((cn) => {
          this.graph.setItemState(cn, 'click', false)
        })
        const nodeItem = e.item
        // 设置目标节点的 click 状态 为 true
        this.graph.setItemState(nodeItem, 'click', true)
      })
      // 监听鼠标点击节点
      this.graph.on('edge:click', (e) => {
        // 先将所有当前有 click 状态的边的 click 状态置为 false
        const clickEdges = this.graph.findAllByState('edge', 'click')
        clickEdges.forEach((ce) => {
          this.graph.setItemState(ce, 'click', false)
        })
        const edgeItem = e.item
        // 设置目标边的 click 状态 为 true
        this.graph.setItemState(edgeItem, 'click', true)
      })
    },
    drawCombo() {
      const collapseIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
        ]
      }, expandIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
          ['M', x - r + r, y - r + 4],
          ['L', x, y + r - 4],
        ];
      }
      G6.registerCombo(
        'cCircle',
        {
          drawShape: function draw(cfg, group) {
            const self = this;
            // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
            const style = self.getShapeStyle(cfg);
            // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
            const circle = group.addShape('circle', {
              attrs: {
                ...style,
                x: 0,
                y: 0,
                r: style.r,
              },
              draggable: true,
              name: 'combo-keyShape',
            });
            // Add the marker on the bottom
            const marker = group.addShape('marker', {
              attrs: {
                ...style,
                fill: '#fff',
                opacity: 1,
                x: 0,
                y: style.r,
                r: 10,
                symbol: collapseIcon,
              },
              draggable: true,
              name: 'combo-marker-shape',
            });

            return circle;
          },
          // Define the updating logic for the marker
          afterUpdate: function afterUpdate(cfg, combo) {
            const self = this;
            // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
            const style = self.getShapeStyle(cfg);
            const group = combo.get('group');
            // Find the marker shape in the graphics group of the Combo
            const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
            // Update the marker shape
            marker.attr({
              x: 0,
              y: style.r,
              // The property 'collapsed' in the combo data represents the collapsing state of the Combo
              // Update the symbol according to 'collapsed'
              symbol: cfg.collapsed ? expandIcon : collapseIcon,
            });
          }
        },
        'circle'
      )
      this.data = {
        nodes: [
          { id: 'node1', x: 250, y: 200, comboId: 'combo1' },
          { id: 'node2', x: 300, y: 200, comboId: 'combo1' },
          { id: 'node3', x: 100, y: 200, comboId: 'combo3' },
        ],
        combos: [
          { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
          { id: 'combo2', label: 'Combo 2' },
          { id: 'combo3', label: 'Combo 3', collapsed: true },
        ],
      }
      const grid = new G6.Grid()
      this.graph = new G6.Graph({
        container: this.$refs.graphCanvas,
        width: this.canvasStyle.width,
        height: this.canvasStyle.height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'drag-combo']
        },
        plugins: [grid],
        groupByTypes: false,
        defaultCombo: {
          type: 'cCircle',
          labelCfg: {
            refY: 2,
          }
        }
      })
      this.graph.on('combo:click', (e) => {
        if (e.target.get('name') === 'combo-marker-shape') {
          this.graph.collapseExpandCombo(e.item);
          if (this.graph.get('layout')) this.graph.layout();
          else this.graph.refreshPositions();
        }
      })
    },
    render() {
      console.log('this.graph:', this.graph)
      this.graph.data(this.data)
      this.graph.render()
    },
    changeSample() {
      this.draw()
    }
  }
}
</script>

<style lang="less" scoped>
.graph-basic {
  width: 100%;
  .graph-canvas {
    width: 100%;
    /deep/.g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
    /deep/ .minimap-pos {
      position: absolute;
      border: 2px solid #e2e2e2;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>