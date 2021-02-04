/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 11:33:49 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2021-02-04 11:33:49 
 */
import storage from '@/libs/storage'

export default {
  setUserinfo(state, payload) {
    state.userinfo = payload
  },
  setMenus(state, payload) {
    state.menus = payload
  } 
}