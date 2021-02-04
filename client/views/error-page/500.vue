/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:15:27 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 15:04:00
 */
<template>
  <ErrorContent code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src" />
</template>

<script>
import error500 from '@/assets/images/error-page/500.svg'

import ErrorContent from './error-content.vue'
export default {
  name: 'error_500',
  components: {
    ErrorContent
  },
  data() {
    return {
      src: error500
    }
  }
}
</script>
