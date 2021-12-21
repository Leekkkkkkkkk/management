import request from '@/utils/request'

/**
 *获取数据报表
 * @returns
 */
export function getReport() {
  return request({
    url: 'reports/type/1',
    method: 'GET'
  })
}
