import request from '@/utils/request'

/**
 *商品分类列表
 * @param {*} params {type,pagenum,pagesize}
 * @returns
 */
export function getCategoriesList(params) {
  return request({
    url: 'categories',
    method: 'GET',
    params
  })
}
/**
 *添加分类
 * @param {*} data
 * @returns
 */
export function addCategoriesList(data) {
  return request({
    url: 'categories',
    method: 'POST',
    data
  })
}
