/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 14:15:59 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 15:03:41
 */
<template>
  <ErrorContent code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script>
import error404 from '@/assets/images/error-page/404.svg'
import ErrorContent from './error-content.vue'
export default {
  name: 'error_404',
  components: {
    ErrorContent
  },
  data() {
    return {
      src: error404
    }
  }
}
</script>