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

/**
 *添加动态参数或者静态属性
 * @param {*} data
 * @returns
 */
export function addCategoriesAttributes(data) {
  return request({
    url: `categories/${data.id}/attributes`,
    method: 'POST',
    data
  })
}
/**
 *参数列表
 * @param {*} params
 * @returns
 */
export function CategoriesList(id, sel) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'GET',
    params: {
      sel
    }
  })
}

/**
 *删除参数
 * @param {*} id 分类id 参数id
 * @param {*} attrid
 * @returns
 */
export function deleteCategories(id, attrid) {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'DELETE'
  })
}

/**
 *编辑参数
 * @param {*} data
 * @returns
 */
export function editCategories(data) {
  return request({
    url: `categories/${data.id}/attributes/${data.attrid}`,
    method: 'PUT',
    data
  })
}

/**
 *商品数据列表
 * @param {Object} params {query,pagenum,pagesize}
 * @returns
 */
export function goodsList(params) {
  return request({
    url: `goods`,
    method: 'GET',
    params
  })
}

/**
 *添加商品
 * @param {Object} data
 * @returns
 */
export function addGoods(data) {
  return request({
    url: `goods`,
    method: 'POST',
    data
  })
}
