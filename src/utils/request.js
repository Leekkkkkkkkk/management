import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from './auth'
const timeOut = 2 * 60 * 60 * 1000
// const timeOut = 5 * 1000
const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/'
})
// 捕获发送请求
request.interceptors.request.use((config) => {
  if (store.state.user.token) {
    if (isTimeOut) {
      store.commit('user/removeUser')
      router.push('/login')
      return Promise.reject(new Error('登录已失效'))
    }
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})
// 捕获返回值
request.interceptors.response.use((res) => {
  const { data, meta } = res.data
  if (meta.status === 200 || meta.status === 204) {
    return data
  } else {
    Message.error(meta.msg)
    return Promise.reject(new Error(meta.msg))
  }
}, (err) => {
  console.log(11)
  console.dir(err)
  Message.error('服务器异常')
  return Promise.reject(err)
})
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getToken()
  const time = currentTime - tokenTime
  return time >= timeOut
}
export default request
