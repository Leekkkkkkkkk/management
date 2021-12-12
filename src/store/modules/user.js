import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  user: getToken()
}
const mutations = {
  setUser(state, payload) {
    state.user = payload
    setToken(payload)
  }
}
const actions = {
  async login(contenxt, paylody) {
    try {
      const res = await login(paylody)
      contenxt.commit('setUser', res)
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

