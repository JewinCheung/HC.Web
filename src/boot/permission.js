import { setBreadcrumbs } from 'components/Breadcrumbs/BreadcrumbsUtils'
import LoadingBar from '../components/LoadingBar/LoadingBar'
import constantRoutes from '../router/constantRoutes'
import { addTagView, setTagView } from 'components/TagView/TagViewUtils'
// import { LocalStorage } from 'quasar'
/**
 * Navigation guard and permission verification
 * @param app
 * @param router
 * @param Vue
 * @param store
 * @returns {Promise<void>}
 */
export default async ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // 成功登录后处理TAGVIEW和breadcrumbs
    handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, Vue)
    // 获得token
    const token = localStorage.getItem('access_token')
    // console.log(token)
    // const token = sessionStorage.getItem('access_token')
    // const userRole = sessionStorage.getItem('user_role')
    // 有一个标记表明您已经登录
    if (token) {
      // 登录后无法进入登录界面
      if (to.path === '/login') {
        next({ path: '/' })
      }
      // 有用户权限，且路径不空，那就放行
      if (store.getters.getRoutes.length) {
        next()
      } else {
        // 用户权限不存在的情况，获取用户权限
        // const userRole = LocalStorage.getItem('user_role')
        // console.log(userRole)
        // 并根据权限设置相应的路由 admin
        store.commit('SET_ROLES_AND_ROUTES', 'SuperAdmin')
        // 如果系统提示已弃用addresses，则使用spread操作符完成该操作
        // router.addRoute(...store.getters.getRoutes)
        router.addRoutes(store.getters.getRoutes)
        // 如果address没有完成，守卫将再次执行它
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        }
      }
    } else {
      // 选择不需要授权的路由
      if (constantRoutes.some((item) => { return item.path === to.path })) {
        next()
      } else {
        next({ path: '/logon', query: { redirect: to.fullPath } })
        // next({ path: '/scanQRCodes', query: { redirect: to.fullPath } })
      }
    }
  })
  router.afterEach(() => {
    // 使用多个stop()确保动态添加路由后正确关闭LoadingBar
    LoadingBar.stop()
    LoadingBar.stop()
  })
}

/**
 * 处理tagView和breadcrumbs
 * @param to
 */
function handleTagViewAndBreadcrumbsAndKeepAlive (from, to, store, Vue) {
  // console.log('当前页面路由：' + to.path)
  if (to.path === '/commodity') {
    store.commit('SET_IS_HOME', true)
  } else {
    store.commit('SET_IS_HOME', false)
  }
  if (to.name != null) {
    document.title = to.meta.title + Vue.prototype.$title
    LoadingBar.start()
    // 是公共路由 ?
    for (let i = 0; i < constantRoutes.length; i++) {
      if (constantRoutes[i].path === to.path) {
        return
      }
    }
    // 确定它是否是一个刷新操作,
    // 如果是一个刷新操作，则从sessionStorage获取保存的tagView信息
    let tagViewOnSS = []
    JSON.parse(window.sessionStorage.getItem('tagView')) === null ? window.sessionStorage.setItem('tagView', '[]') : tagViewOnSS = JSON.parse(window.sessionStorage.getItem('tagView'))
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      setTagView(tagViewOnSS)
      store.commit('SET_KEEPALIVE_LIST', tagViewOnSS)
    } else if (from.fullPath !== to.fullPath) {
      addTagView(to)
    }
    setBreadcrumbs(to.matched, to.query)
    handleKeepAlive(to)
  }
}

/**
 * 处理冗余布局:router-view，并保持当前组件在第一层索引<router-view>下
 * 此方法不能过滤用于嵌套路由的按需加载<layout>
 * @param to
 */
function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

/**
 * This method can filter on-demand loading <layout> used for nested routing
 * @param to
 */
// async function handleKeepAlive (to) {
//   if (to.matched && to.matched.length > 2) {
//     for (let i = 0; i < to.matched.length; i++) {
//       const element = to.matched[i]
//       if (element.components.default.name === 'Layout') {
//         to.matched.splice(i, 1)
//         await handleKeepAlive(to)
//       }
//       if (typeof element.components.default === 'function') {
//         await element.components.default()
//         await handleKeepAlive(to)
//       }
//     }
//   }
// }
