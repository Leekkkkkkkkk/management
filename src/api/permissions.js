import request from '@/utils/request'

/**
 *菜单权限
 * @returns {data} {id,authName,children}
 */
export function getMenus() {
  return request({
    url: 'menus',
    method: 'GET'
  })
}
/**
 *所有权限列表
 * @param {} type {tree树形,list列表}
 * @returns
 */
export function listPermissions(type) {
  return request({
    url: 'rights/' + type,
    method: 'GET'
  })
}
