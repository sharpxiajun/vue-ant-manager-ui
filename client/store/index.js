import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE !== 'production'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  modules: {},
  plugins: debug ? [createLogger()] : []
})

if (module.hot) {
  module.hot.accept(['./state', './actions', './getters', './mutations'], _ => {
    const newState = require('./state').default
    const newActions = require('./actions').default
    const newGetters = require('./getters').default
    const newMutations = require('./mutations').default

    store.hotUpdate({
      state: newState,
      actions: newActions,
      getters: newGetters,
      mutations: newMutations,
      mudules: {}
    })
  })
}

export default store
