<template>
  <div class="topology-editor" :style="canvasStyle">
    <ToolbarPanel ref="toolbar"></ToolbarPanel>
    <div class="topology-editor-canvas" ref="canvas"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import ToolbarPanel from './toolbar-panel.vue'
import Toolbar from './plugins/toolbar'
import Command from './plugins/Command.js'
export default {
  name: 'act-topology-editor',
  components: {
    ToolbarPanel
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          canvasStyle: {
            width: 1800,
            height: 600
          }
        }
      }
    },
    data: {
      type: Object,
      default: () => ({
        nodes: [],
        edges: []
      })
    }
  },
  watch: {
    data: {
      handler(val) {

      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    canvasStyle() {
      console.log('props:', this.config)
      return {...this.config.canvasStyle, ...{width: `${this.config.canvasStyle.width}px`, height: `${this.config.canvasStyle.height}px`}}
    }
  },
  mounted() {
    this.initGraph()
  },
  destroyed() {
    
  },
  data() {
    return {
      cmdPlugin: null,
      graph: null
    }
  },
  methods: {
    initGraph() {
      this.cmdPlugin = new Command()
      const toolbar = new Toolbar({container:this.$refs['toolbar'].$el})
      this.graph = new G6.Graph({
        container: this.$refs['canvas'],
        height: this.config.canvasStyle.height,
        width: this.config.canvasStyle.width,
        plugins: [this.cmdPlugin, toolbar],
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: [ ],
          edit: [ 'drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
            'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign','dragPoint','brush-select'],
        },
        defaultEdge: {
          shape: 'flow-polyline-round',
        }
      })
      this.graph.data({
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
      })
      this.graph.render();
    }
  }
}
</script>
<style lang="less" scoped>
.topology-editor {
  position: relative;
  &-canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    width:100%;
    height: 100%;
    border: 3px green solid;
  }
}
</style>