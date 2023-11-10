import axios from '../axios/AxiosConfig'
import Vue from 'vue'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    baseURL: Vue.prototype.$baseURL + 'sys',
    url: '/login',
    method: 'post',
    data: parameter
  })
}

export function getCustomerInfo () {
  return axios({
    url: 'order/customer/getInfo',
    method: 'get'
  })
}

export function getUserInfo () {
  return axios({
    baseURL: Vue.prototype.$baseURL + 'sys',
    url: '/getInfo',
    method: 'get'
  })
}

export function logout () {
  return axios({
    baseURL: Vue.prototype.$baseURL + 'sys',
    url: '/logout',
    method: 'post'
  })
}

export function getSubSys () {
  return axios({
    baseURL: Vue.prototype.$baseURL + 'sys',
    url: '/getSubSys',
    method: 'get'
  })
}

export function getInfoByQRCode (parameter) {
  return axios({
    baseURL: Vue.prototype.$baseURL + 'tms',
    url: '/wx/appoint/getInfoByQRCode',
    method: 'post',
    data: parameter
  })
}
