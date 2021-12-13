import Cookies from 'js-cookie'

const TokenKey = 'back_token'
// 设置token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 设置时间戳的
export function getTokenTime() {
  return Cookies.get('token_timer', Date.now())
}
export function removeTokenTime() {
  return Cookies.remove(TokenKey)
}
