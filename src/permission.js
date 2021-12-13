import router from '@/router'
import store from '@/store'
import { getTokenTime } from './utils/auth'
const timeOut = 2 * 60 * 60 * 1000
router.beforeEach((to, from, next) => {
  const token = store.state.user.user
  const toTrue = ['/login', '/404']
  const pathTrue = toTrue.includes(to.path)
  if (token) {
    if (to.path === '/login') return next('/')
    if (store.state.user.user) {
      if (isTimeOut()) {
        store.commit('user/removeUser')
        router.push('/login')
        return Promise.reject(new Error('登录已失效'))
      }
      next()
    }
  } else {
    if (pathTrue) {
      next()
    } else {
      next('/login')
    }
  }
})
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const time = currentTime - tokenTime
  return time >= timeOut
}

