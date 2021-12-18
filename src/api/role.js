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

/**
 * 角色授权权限
 * @param {*} data {id,treekey}
 * @returns
 */
export function roleAuthorization(id, rids) {
  return request({
    url: `roles/${id}/rights`,
    method: 'POST',
    data: {
      rids
    }
  })
}
/**
 *删除角色指定权限
 * @param {*} id {角色ID}
 * @param {*} rids {权限ID}
 * @returns
 */
export function deleteroleAuthorization(id, rids) {
  return request({
    url: `roles/${id}/rights/${rids}`,
    method: 'DELETE'
  })
}
