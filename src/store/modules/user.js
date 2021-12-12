import { login } from '@/api/user'
const state = {
  user: null
}
const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}
const actions = {
  async login(contenxt, paylody) {
    console.log('发送请求')
    const res = await login(paylody)
    console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

