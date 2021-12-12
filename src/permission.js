import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  const token = store.state.user.user
  const toTrue = ['/login', '/404']
  const pathTrue = toTrue.includes(to.path)
  if (token) {
    if (to.path === '/login') return next('/')
    // store.dispatch('user/login')
    next()
  } else {
    if (pathTrue) {
      next()
    } else {
      next('/login')
    }
  }
})

