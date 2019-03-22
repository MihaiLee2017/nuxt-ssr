import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo'
Vue.use(Vuex)
// export const state = () => ({
//   counter: 0
// })

// export const mutations = {
//   increment(state) {
//     state.counter++
//   }
// }
import geo from './modules/geo'
import home from './modules/home'
Vue.use(Vuex)
const store = () => {
  return new Vuex.Store({
    modules: {
      geo,
      home
    },
    actions: {
      async nuxtServerInit({
        dispatch, commit
      }, { req, app }) {
        let positionData = await app.$axios('/api/geo/getPosition')
        await commit("geo/setPosition", positionData.data.data)
        let menuData = await app.$axios('/api/geo/getMenu')
        await commit("home/setMenu", menuData.data.data.menu)
      }
    }
  })
}
export default store
