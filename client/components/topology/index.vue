<template>
  <div class="topology-editor" :style="canvasStyle">
    <ToolbarPanel ref="toolbar"></ToolbarPanel>
    <ItemPanel ref="addItemPanel" :height="config.canvasStyle.height - 50"/>
    <div class="topology-editor-canvas" ref="canvas"></div>
      <DetailPanel ref="detailPanel"
                   v-if="!isView"
                   :height="height"
                   :model="selectedModel"
                   :readOnly="mode !== 'edit'"
                   :users="users"
                   :groups="groups"
                   :categorys="categorys"
                   :signalDefs="processModel.signalDefs"
                   :messageDefs="processModel.messageDefs"
                   :onChange="(key,val)=>{onItemCfgChange(key,val)}" />
  </div>
</template>
<script>
import G6 from '@antv/g6'
import { getShapeName } from './utils/clazz'
import ToolbarPanel from './components/toolbar-panel.vue'
import Toolbar from './plugins/toolbar'
import Command from './plugins/command.js'
import AddItemPanel from './plugins/addItemPanel'
import CanvasPanel from './plugins/canvasPanel'
import registerShape from './shape'
import registerBehavior from './behavior'
import ItemPanel from './components/item-panel'
import i18n from './locales'
import DetailPanel from './components/detail-panel'
registerShape(G6)
registerBehavior(G6)
export default {
  name: 'act-topology-editor',
  provide() {
    return {
      i18n: i18n[this.lang]
    }
  },  
  components: {
    ToolbarPanel, ItemPanel, DetailPanel
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
    lang: {
      type: String,
      default: "zh"
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
    },
    users: {
      type: Array,
      default: () => ([])
    },
    groups: {
      type: Array,
      default: () => ([])
    },
    categorys: {
      type: Array,
      default: () => ([])
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
    console.warn(':this.$refs[]', this.$refs['addItemPanel'], this.$refs['addItemPanel'].$el)
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
      const addItemPanel = new AddItemPanel({container:this.$refs['addItemPanel'].$el})
      const canvasPanel = new CanvasPanel({container:this.$refs['canvas']})
      this.graph = new G6.Graph({
        container: this.$refs['canvas'],
        height: this.config.canvasStyle.height,
        width: this.config.canvasStyle.width,
        plugins: [this.cmdPlugin, toolbar, addItemPanel, canvasPanel],
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
              shape: getShapeName(node.clazz),
              type: getShapeName(node.clazz),
              ...node,
            }
          }),
          edges: data.edges
        }
      }
      return data;
    },
    onItemCfgChange(key,value) {
      console.warn('this.graph:', this.graph)
      const items = this.graph.get('selectedItems')
      if(items && items.length > 0) {
        let item = this.graph.findById(items[0])
        if(!item){
          item = this.getNodeInSubProcess(items[0])
        }
        if(this.graph.executeCommand) {
          this.graph.executeCommand('update', {
            itemId: items[0],
            updateModel: {[key]: value}
          })
        } else {
          this.graph.updateItem(item, {[key]: value})
        }
        this.selectedModel = {...item.getModel()}
      } else {
        const canvasModel = { ...this.processModel, [key]: value}
        this.selectedModel = canvasModel
        this.processModel = canvasModel
      }
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
      })
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
    left: 10%;
    width:90%;
    height: 100%;
    background: #fff;
  }
}
</style>