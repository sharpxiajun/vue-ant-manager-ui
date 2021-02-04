/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:06:53 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 15:04:30
 */
<template>
  <div class="error-page">
    <div class="content-con">
      <img v-lazy="src" :alt="code" />
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <BackBtnGroup></BackBtnGroup>
    </div>
  </div>  
</template>
<script>
import './error.less'
import BackBtnGroup from './back-btn-group.vue'
export default {
  name: 'ErrorContent',
  components: {
    BackBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }  
}
</script>