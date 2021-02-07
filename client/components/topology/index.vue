<template>
  <div class="topology-editor" :style="config.style">
    xiajun
  </div>
</template>
<script>
export default {
  name: 'act-topology-editor',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          style: {
            width: '1000px',
            height: '400px'
          }
        }
      }
    }
  },
}
</script>
<style lang="less" scoped>
.topology-editor {
  border: 2px greenyellow dashed;
}
</style>