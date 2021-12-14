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

/**
 *用户数据列表
 * @param {*} params {query,pagenum,pagesize}
 * @returns
 */
export function getUsers(params) {
  return request({
    url: 'users',
    method: 'GET',
    params
  })
}

/**
 *添加用户
 * @param {*} data {username,password,email,mobile}
 * @returns
 */
export function addUser(data) {
  return request({
    url: 'users',
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
