import { login } from '@/api/user'
import { setToken, getToken, removeToken, setTokenTime } from '@/utils/auth'
const state = {
  user: getToken(),
  userData: {}
}
const mutations = {
  setUser(state, payload) {
    state.user = payload
    setToken(payload)
  },
  setUserData(state, payload) {
    state.userData = payload
  },
  removeUser(state, payload) {
    state.user = null
    removeToken()
  }
}
const actions = {
  async login(contenxt, paylody) {
    try {
      const res = await login(paylody)
      setTokenTime()
      contenxt.commit('setUser', res.token)
      contenxt.commit('setUserData', res)
    } catch (error) {
      console.dir(error)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

