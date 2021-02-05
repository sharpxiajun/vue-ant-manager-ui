/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-05 13:42:02 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2021-02-05 13:42:02 
 */
<template>
  <section class="search-head">
    <div class="search-head-left">
      <h3>{{ title }}</h3>
    </div>
    <div class="sarch-head-right flex-layout">
      <slot></slot>
    </div>
  </section>
</template>
<script>
export default {
  name: 'search-head',
  props: {
    title: String
  },
  data() {
    return {}
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
.search-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @deep-dividers;
  padding-bottom: 4px;

  .search-head-left {
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 18px;
      font-weight: bold;
      margin-right: 70px;
    }
  }
}
</style>