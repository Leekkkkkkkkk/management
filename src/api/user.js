import request from '@/utils/request'

/**
 *登录
 * @param {*} data{ username, password }
 * @returns {} {id,rid,username,mobile,email,token}
 */
export function login(data) {
  return request({
    url: 'login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request()
}

export function logout() {
  return request()
}
