import Layout from '@/layout'
export default {
  path: '/orderManagement',
  component: Layout,
  redirect: '/orderManagement',
  name: 'OrderManagement',
  meta: {
    title: '订单列表',
    icon: 'nested'
  },
  children: [
    {
      path: 'orders',
      component: () => import('@/views/orderManagement/orders'),
      name: 'Orders',
      meta: {
        title: '订单列表',
        icon: 'nested'
      }
    },
    {
      path: ''
    }
  ]
}
