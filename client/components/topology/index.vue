<template>
  <div class="topology-editor" :style="canvasStyle">
    <Toolbar></Toolbar>
    <div class="topology-editor-canvas" ref="canvas"></div>
  </div>
</template>
<script>
import Toolbar from './toolbar'
export default {
  name: 'act-topology-editor',
  components: {
    Toolbar
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
    
  },
  destroyed() {
    
  },
  data() {
    return {
      graph: null
    }
  },
  methods: {
    init() {

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