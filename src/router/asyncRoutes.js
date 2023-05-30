// import Layout from '../components/Layout/Layout'

/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'editor', 'test', 'SuperAdmin'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('../pages/home/home.vue')
  },
  // {
  //   path: '/workplace',
  //   name: 'Workplace',
  //   meta: {
  //     roles: ['admin', 'editor', 'test', 'SuperAdmin'],
  //     title: '个人中心',
  //     icon: 'person',
  //     keepAlive: true
  //   },
  //   component: () => import('../pages/home/Workplace.vue')
  // },
  // {
  //   path: '/account',
  //   name: 'account',
  //   meta: {
  //     roles: ['admin', 'editor', 'test', 'SuperAdmin'],
  //     title: '账户中心',
  //     icon: 'account_balance_wallet',
  //     keepAlive: true
  //   },
  //   component: () => import('../pages/home/Account.vue')
  // },
  // {
  //   path: '/system',
  //   name: 'system',
  //   meta: {
  //     roles: ['SuperAdmin'],
  //     title: '系统管理',
  //     icon: 'fas fa-laptop-medical',
  //     keepAlive: true
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'UserList',
  //       meta: {
  //         roles: ['SuperAdmin'],
  //         title: '用户管理'
  //       },
  //       component: () => import('../pages/system/UserList')
  //     },
  //     {
  //       path: 'permission',
  //       name: 'PermissionList',
  //       meta: {
  //         roles: ['SuperAdmin'],
  //         title: '菜单管理'
  //       },
  //       component: () => import('../pages/system/PermissionList')
  //     },
  //     {
  //       path: 'role',
  //       name: 'RoleList',
  //       meta: {
  //         roles: ['SuperAdmin'],
  //         title: '角色管理'
  //       },
  //       component: () => import('../pages/system/RoleList')
  //     },
  //     {
  //       path: 'dict',
  //       name: 'DictList',
  //       meta: {
  //         roles: ['SuperAdmin'],
  //         title: '数据字典'
  //       },
  //       component: () => import('../pages/system/DictList')
  //     }
  //   ]
  // },

  // {
  //   path: 'async-router',
  //   name: 'asyncRouter',
  //   meta: {
  //     roles: ['admin', 'editor'],
  //     title: '动态路由1',
  //     icon: 'all_inclusive',
  //     // itemLabel: 'ROUTER',
  //     keepAlive: true
  //   },
  //   component: () => import('pages/router/asyncRouter')
  // },
  // {
  //   path: 'async-router-impl',
  //   name: 'asyncRouterImpl',
  //   meta: {
  //     roles: ['admin', 'editor'],
  //     title: '动态路由实现思路',
  //     icon: 'all_inclusive',
  //     keepAlive: true
  //   },
  //   component: () => import('pages/router/asyncRouterImpl')
  // },
  {
    path: 'http://www.quasarchs.com/vue-components/button',
    name: 'external-link',
    meta: {
      roles: ['adminsss', 'editor'],
      title: '外部链接/更多组件',
      icon: 'send'
    }
  },
  {
    path: '/tableDetail',
    name: 'tableDetail',
    meta: {
      roles: ['SuperAdmin', 'editor'],
      title: 'Treats 详情',
      icon: 'blur_linear',
      isHidden: true
    },
    component: () => import('../pages/home/tableDetail')
  },
  {
    path: '*', // 此处需置于最底部
    redirect: '/NoFound404',
    meta: {
      roles: ['SuperAdmin', 'test'],
      isHidden: true
    }
  }
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('../layouts/MainLayout'),
    children: asyncRoutesChildren
  }
]

export default asyncRoutes

export { asyncRoutesChildren }
