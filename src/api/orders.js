import request from '@/utils/request'

/**
 *订单数据列表
 * @param {*} params {query,pagenum,pagesize}
 * @returns
 */
export function getOrders(params) {
  return request({
    url: 'orders',
    method: 'GET',
    params
  })
}
