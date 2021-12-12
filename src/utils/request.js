import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/'
})
// 铺货发送请求
request.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer '
  return config
})
// 捕获返回值
request.interceptors.response.use((res) => {
  return res.data.data
})

export default request
