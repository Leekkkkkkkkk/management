import request from '@/utils/request'

/**
 *角色列表
 * @returns
 */
export function getRolesList() {
  return request({
    url: 'roles',
    method: 'GET'
  })
}
