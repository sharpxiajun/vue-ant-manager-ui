<template>
  <div>
    <span style="font-size: 60px;color:green;">排版布局</span>
    <transition name="fadeinLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'layout'
  }
</script>

<style lang="less" scoped>

</style>