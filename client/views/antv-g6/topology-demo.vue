<template>
  <section class="topology-demo">
    网管拓扑图实例
    <Editor></Editor>
  </section>
</template>
<script>
import Editor from '@c/topology'
export default {
  name: 'topology-demo',
  components: {
    Editor
  }
}
</script>
<style lang="less" scoped>
.topology-demo {
  width: 100%;
}
</style>