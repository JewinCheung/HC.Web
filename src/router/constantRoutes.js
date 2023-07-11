
// 商城页面路由
const mallChildRoutesChildren = [
  {
    path: '/commodity',
    name: 'commodity',
    meta: {
      title: '订货商城',
      keepAlive: true
    },
    component: () => import('../pages/mall/Commodity')
  },
  {
    path: '/ordering',
    name: 'ordering',
    meta: {
      title: '我的订货单',
      keepAlive: true
    },
    component: () => import('../pages/mall/MineOrdering')
  },
  {
    path: '/adjust',
    name: 'adjust',
    meta: {
      title: '订货单调整',
      keepAlive: true
    },
    component: () => import('../pages/mall/OrderingAdjust')
  },
  {
    path: '/delivery',
    name: 'delivery',
    meta: {
      title: '新增发货单',
      keepAlive: true
    },
    component: () => import('../pages/mall/OrderDelivery')
  },
  {
    path: '/delivery-list',
    name: 'delivery-list',
    meta: {
      title: '新增发货单',
      keepAlive: true
    },
    component: () => import('../pages/mall/OrderDeliveryList')
  },
  {
    path: '/my-account',
    name: 'my-account',
    meta: {
      title: '我的账户',
      keepAlive: true
    },
    component: () => import('../pages/mall/MyAccount')
  }
]

/**
 * constantRoutes : Users do not need to log in to access account
 */
const constantRoutes = [
  // 商城路由
  {
    path: '/mall',
    name: 'mall',
    redirect: '/commodity',
    component: () => import('../layouts/MallLayout'),
    children: mallChildRoutesChildren
  },
  {
    path: '/logon',
    name: 'logon',
    meta: {
      title: '登录'
    },
    component: () => import('../pages/logon/logon.vue')
  },
  {
    path: '/sso/login',
    name: 'sso',
    meta: {
      title: '加载'
    },
    component: () => import('../pages/logon/AutoLogin.vue')
  },
  {
    path: '/NoFound404',
    name: 'NoFound404',
    meta: {
      roles: ['admin', 'editor'],
      title: '404',
      icon: 'sentiment_dissatisfied',
      isHidden: true
    },
    component: () => import('../components/404/NoFound404')
  }
]

export default constantRoutes
