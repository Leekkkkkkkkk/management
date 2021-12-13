import Layout from '@/layout'
export default {
  path: '/userManagement',
  component: Layout,
  redirect: '/userManagement/users',
  name: 'UserManagement',
  meta: {
    title: '用户管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/userManagement/users/index'),
      name: 'users',
      meta: {
        title: '用户列表',
        icon: 'nested'
      }
    },
    {
      path: ''
    }
  ]
}
