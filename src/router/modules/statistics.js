import Layout from '@/layout'
export default {
  path: '/statistics',
  component: Layout,
  redirect: '/statistics',
  name: 'Statistics',
  meta: {
    title: '数据统计',
    icon: 'nested'
  },
  children: [
    {
      path: 'reports',
      component: () => import('@/views/statistics/reports'),
      name: 'Reports',
      meta: {
        title: '数据报表',
        icon: 'nested'
      }
    },
    {
      path: ''
    }
  ]
}
