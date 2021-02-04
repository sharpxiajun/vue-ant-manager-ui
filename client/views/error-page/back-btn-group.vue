/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:05:56 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 14:23:36
 */
<template>
   <div>
    <a-button size="large" type="link" @click="backHome">返回首页</a-button>
    <a-button size="large" type="link" @click="backPrev"
      >返回上一页({{ second }}s)</a-button
    >
  </div> 
</template>
<script>
import './error.less'
export default {
  name: 'BackBtnGroup',
  data() {
    return {
      second: 5,
      timer: null
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   if (this.second === 0) this.backPrev()
    //   else this.second--
    // }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: this.$config.homeName
      })
    },
    backPrev() {
      this.$router.go(-1)
    }    
  }
}
</script>