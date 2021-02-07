<template>
  <div class="topology-editor-toolbar">
  toolbar
  </div>
</template>
<script>
export default {
  name: 'topology-demo-toolbar'
}
</script>
<style lang="less" scoped>
@topologt-prefix: topology-editor;
.@{topologt-prefix}-toolbar {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100%;
  border: 3px red dashed;
  z-index: 9999;
}
</style>