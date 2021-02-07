<template>
  <section class="topology-demo" ref="topologyDemo">
    <Editor :config="config"></Editor>
  </section>
</template>
<script>
import Editor from '@c/topology'
export default {
  name: 'topology-demo',
  components: {
    Editor
  },
  data() {
    return {
      config: {
        canvasStyle: {
          width: 0,
          height: 0
        }
      }
    }
  },
  mounted() {
    this.getCanvasStyle()
  },
  methods: {
    getCanvasStyle() {
      const editorStyle = window.getComputedStyle(this.$refs.topologyDemo.parentNode)
      const width = parseFloat(editorStyle.width),
        padLeft = parseFloat(editorStyle.paddingLeft),
        padRight = parseFloat(editorStyle.paddingRight)
      const height = parseFloat(editorStyle.height),
        padTop = parseFloat(editorStyle.paddingTop),
        padBottom = parseFloat(editorStyle.paddingBottom)
      this.config.canvasStyle.width = width - padLeft - padRight
      this.config.canvasStyle.height = height - padTop - padBottom
    }
  }
}
</script>
<style lang="less" scoped>
.topology-demo {
  width: 100%;
}
</style>