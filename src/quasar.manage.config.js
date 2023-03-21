import Vue from 'vue'

Vue.config.productionTip = false

Vue.prototype.$PUBLIC_PATH = process.env.VUE_ROUTER_BASE

// 浏览器 title
Vue.prototype.$title = ' | HC System'

// 侧边栏风格
Vue.prototype.$SildeBar = 'hHh lpR fFf' // 风格二：lHh lpR fFf

// axios 中请求基地址，如果需要请在 axios/axios-config.js 中打开，下面是跨域代理示例
Vue.prototype.$baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : '/api'
// Vue.prototype.$baseURL = '/api' // 'http://221.224.57.205:8887/api' 'http://localhost:8081'

// 请求超时时间
Vue.prototype.$timeOut = 8000

// 组件最大缓存数
Vue.prototype.$Max_KeepAlive = 10

// 侧边栏底部文字
Vue.prototype.$buttonList = [
  { text: 'Quasar', URL: 'http://www.quasarchs.com/' }
]
