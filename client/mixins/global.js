/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 18:32:44 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 16:22:33
 */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      antPrefix: this.$config.styleVars['ant-prefix']
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
  }
}