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
