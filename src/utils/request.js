import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/'
})
// 铺货发送请求
request.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + store.state.user.token
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

export default request
