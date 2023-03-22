import Axios from 'axios'
import Vue from 'vue'
import { Notify } from 'quasar'
import qs from 'qs'
import store from '@/store'
/**
 * axios initialization
 */

const axios = Axios.create({
  // baseURL: Vue.prototype.$baseURL,
  timeout: Vue.prototype.$timeOut
})

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    config.headers.Authorization = 'Bearer ' + token

    if (!config.baseURL) {
      config.baseURL = Vue.prototype.$baseURL
    }

    if (config.type) {
      switch (config.type) {
        case 'FORM-DATA':
          config.transformRequest = [
            data => {
              return 'args=' + JSON.stringify(data)
            }
          ]
          break
        case 'FORM':
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          config.data = qs.stringify(config.data)
          break
        default:
          break
      }
    }

    if (config.method === 'put') {
      config.headers['X-HTTP-Method-Override'] = 'PUT'
      config.method = 'post'
    }
    if (config.method === 'delete') {
      config.headers['X-HTTP-Method-Override'] = 'DELETE'
      config.method = 'post'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200
    // 二进制数据则直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }
    if (code === 200) {
      return response.data
    } else {
      const defaultNotify = {
        message: '未知错误',
        icon: 'warning',
        color: 'warning',
        position: 'top',
        timeout: 3000
      }
      switch (code) {
        case 401:
          defaultNotify.message = response.data.msg// '未授权,请重新登录!'
          Notify.create(defaultNotify)
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
          break
        case 403:
          defaultNotify.message = response.data.msg// '登录已过期,请重新登录!'
          Notify.create(defaultNotify)
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 3000)
          })
          break
        case 404:
          defaultNotify.message = response.data.msg// '资源不存在(404)'
          Notify.create(defaultNotify)
          break
        case 408:
          defaultNotify.message = response.data.msg// '请求超时(408)'
          Notify.create(defaultNotify)
          break
        case 500:
          defaultNotify.message = response.data.msg// '服务器错误(500)'
          Notify.create(defaultNotify)
          return response.data
        case 501:
          defaultNotify.message = response.data.msg// '服务未实现(501)'
          Notify.create(defaultNotify)
          break
        case 502:
          defaultNotify.message = response.data.msg// '网络错误(502)'
          Notify.create(defaultNotify)
          break
        case 503:
          defaultNotify.message = response.data.msg// '服务不可用(503)'
          Notify.create(defaultNotify)
          break
        case 504:
          defaultNotify.message = response.data.msg// '网络超时(504)'
          Notify.create(defaultNotify)
          break
        case 505:
          defaultNotify.message = response.data.msg// 'HTTP版本不受支持(505)'
          Notify.create(defaultNotify)
          break
        default:
          Notify.create(defaultNotify)
          break
      }
    }
  },
  error => {
    console.log(error)
    const defaultNotify = {
      message: '未知错误',
      icon: 'warning',
      color: 'warning',
      position: 'top',
      timeout: 3000
    }
    if (
      error.code === 'ECONNABORTED' ||
      error.message.indexOf('timeout') !== -1 ||
      error.message === 'Network Error'
    ) {
      defaultNotify.message = '网络异常,连接服务器失败！'
      Notify.create(defaultNotify)
      return Promise.reject(error)
    }
    switch (error.response.status) {
      case 401:
        defaultNotify.message = '未授权,请重新登录!'
        Notify.create(defaultNotify)
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
        break
      case 403:
        defaultNotify.message = '登录已过期,请重新登录!'
        Notify.create(defaultNotify)
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        })
        break
      case 404:
        defaultNotify.message = '资源不存在(404)'
        Notify.create(defaultNotify)
        break
      case 408:
        defaultNotify.message = '请求超时(408)'
        Notify.create(defaultNotify)
        break
      case 500:
        defaultNotify.message = '服务器错误(500)'
        Notify.create(defaultNotify)
        break
      case 501:
        defaultNotify.message = '服务未实现(501)'
        Notify.create(defaultNotify)
        break
      case 502:
        defaultNotify.message = '网络错误(502)'
        Notify.create(defaultNotify)
        break
      case 503:
        defaultNotify.message = '服务不可用(503)'
        Notify.create(defaultNotify)
        break
      case 504:
        defaultNotify.message = '网络超时(504)'
        Notify.create(defaultNotify)
        break
      case 505:
        defaultNotify.message = 'HTTP版本不受支持(505)'
        Notify.create(defaultNotify)
        break
      default:
        Notify.create(defaultNotify)
        break
    }
    return Promise.reject(error)
  }
)

export default axios
