<template>
  <div class="topology-editor" :style="canvasStyle">
    <ToolbarPanel ref="toolbar"></ToolbarPanel>
    <div class="topology-editor-canvas" ref="canvas"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import { getShapeName } from './utils/clazz'
import ToolbarPanel from './toolbar-panel.vue'
import Toolbar from './plugins/toolbar'
import Command from './plugins/command.js'
import registerShape from './shape'
import registerBehavior from './behavior'
import edge from './shape/edge'
registerShape(G6)
registerBehavior(G6)
export default {
  name: 'act-topology-editor',
  components: {
    ToolbarPanel
  },
  props: {
    isView: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "edit"
    },
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
    data(oldData, newData){
      if(oldData !== newData) {
        if (this.graph) {
          this.graph.changeData(this.initShape(newData));
          this.graph.setMode(this.mode);
          this.graph.emit('canvas:click');
          if (this.cmdPlugin) {
            this.cmdPlugin.initPlugin(this.graph);
          }
          if (this.isView) {
            this.graph.fitView(5)
          }
        }
      }
    },
  },
  computed: {
    canvasStyle() {
      console.log('props:', this.config)
      return {...this.config.canvasStyle, ...{width: `${this.config.canvasStyle.width}px`, height: `${this.config.canvasStyle.height}px`}}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initGraph()
    })
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeFunc)
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })    
  },
  data() {
    return {
      resizeFunc: () => {},
      selectedModel: {},
      processModel: {
        id: '',
        name: '',
        category: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: []
      },
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
          view: [],
          edit: [ 'drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
            'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign','dragPoint','brush-select'],
        },
        defaultEdge: {
          type: 'flow-polyline-round'
        }
      })
      if(this.isView)
        this.graph.setMode('view')
      else
        this.graph.setMode(this.mode)

      this.graph.data(this.initShape(this.data))
      this.graph.render()

      if(this.isView && this.data && this.data.nodes){
        this.graph.fitView(5)
      }
      this.initEvents()

      console.group('initGraph Editor')
      console.warn('this.initShape(this.data):', this.initShape(this.data))
      console.groupEnd()
    },
    initShape(data){
      if(data && data.nodes){
        return {
          nodes: data.nodes.map(node => {
            return {
              // shape: getShapeName(node.clazz),
              type: getShapeName(node.clazz),
              ...node,
            }
          }),
          // edges: data.edges
          edges: data.edges.map(edge => {
            return {
              label: null,
              ...edge
            }
          })
        }
      }
      return data;
    },
    initEvents(){
      this.graph.on('afteritemselected',(items)=>{
        if(items && items.length > 0) {
          let item = this.graph.findById(items[0]);
          if(!item){
            item = this.getNodeInSubProcess(items[0])
          }
          this.selectedModel = {...item.getModel()};
        } else {
          this.selectedModel = this.processModel;
        }
      });
      const page = this.$refs['canvas'];
      const graph = this.graph;
      const height = this.height-1;
      this.resizeFunc = ()=>{
        graph.changeSize(page.offsetWidth,height);
      };
      window.addEventListener("resize", this.resizeFunc);
    },
    getNodeInSubProcess(itemId){
      const subProcess = this.graph.find('node', (node) => {
        if (node.get('model')) {
          const clazz = node.get('model').clazz;
          if (clazz === 'subProcess') {
            const containerGroup = node.getContainer();
            const subGroup = containerGroup.subGroup;
            const item = subGroup.findById(itemId);
            return subGroup.contain(item);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      if(subProcess) {
        const group = subProcess.getContainer();
        return group.getItem(subProcess, itemId);
      }
      return null;
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
    background: #fff;
  }
}
</style>