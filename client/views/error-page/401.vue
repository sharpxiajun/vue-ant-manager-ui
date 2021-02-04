/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:14:42 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 15:03:23
 */
<template>
  <ErrorContent code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src" />
</template>
<script>
import error401 from '@/assets/images/error-page/401.svg'
import ErrorContent from './error-content.vue'
export default {
  name: 'error_401',
  components: {
    ErrorContent
  },
  data() {
    return {
      src: error401
    }
  } 
}
</script>