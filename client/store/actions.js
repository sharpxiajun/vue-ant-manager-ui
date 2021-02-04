import { getUserinfo } from '@/api/common'
import { simpleAsyncTo } from '@/libs/util'

export default {
  async getUserinfo({ commit, dispatch, state }, payload) {
    const res = await simpleAsyncTo(getUserinfo(payload), '获取用户信息失败')
    if (res) {
      const { data } = res || {}
      commit('setUserinfo', data)
    }
  }
}