const state = () => ({
  menu: [],
  hotPlace: []
})
const mutations = {
  setMenu(state, menu) {
    state.menu = menu
  },
  setHotPlace(state, place) {
    state.hotPlace = place
  }
}
const actions = {
  setMenu({ commit }, menu) {
    commit("setMenu", menu)
  },
  setHotPlace({ commit }, place) {
    commit("setHotPlace", place)
  }
}
export default { namespaced: true, state, mutations, actions }
