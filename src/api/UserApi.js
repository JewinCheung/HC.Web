import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getUserRouter () {
  return _axios({
    url: Vue.prototype.$PUBLIC_PATH + 'data/asyncRouterDemo',
    method: 'get',
    responseType: 'text'
  })
}

export function login () {
  return _axios({
    url: Vue.prototype.$PUBLIC_PATH + 'data/Login',
    method: 'get',
    responseType: 'text'
  })
}

export function getMaterialClass () {
  return _axios({
    url: Vue.prototype.$PUBLIC_PATH + 'data/order_material_class',
    method: 'get',
    responseType: 'text'
  })
}
