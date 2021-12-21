import Layout from '@/layout'
export default {
  path: '/commodityManagement',
  component: Layout,
  redirect: '/commodityManagement',
  name: 'CommodityManagement',
  meta: {
    title: '商品管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'goods',
      component: () => import('@/views/commodityManagement/goods'),
      name: 'Goods',
      meta: {
        title: '商品列表',
        icon: 'nested'
      },
      children: [

      ]
    },
    {
      path: 'params',
      component: () => import('@/views/commodityManagement/params'),
      name: 'Params',
      meta: {
        title: '分类参数',
        icon: 'nested'
      }
    },
    {
      path: 'categories',
      component: () => import('@/views/commodityManagement/categories'),
      name: 'Categories',
      meta: {
        title: '商品分类',
        icon: 'nested'
      }
    },
    {
      path: 'add',
      name: 'Add',
      component: () => import('@/views/commodityManagement/goods/add')
    }
  ]
}
