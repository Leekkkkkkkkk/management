import Layout from '@/layout'
export default {
  path: '/authorityManagement',
  component: Layout,
  redirect: '/authorityManagement',
  name: 'AuthorityManagement',
  meta: {
    title: '权限管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'roles',
      component: () => import('@/views/authorityManagement/roles/index'),
      name: 'Roles',
      meta: {
        title: '角色列表',
        icon: 'nested'
      }
    },
    {
      path: 'rights',
      component: () => import('@/views/authorityManagement/rights/index'),
      meta: {
        title: '权限列表',
        icon: 'nested'
      }
    }
  ]
}
