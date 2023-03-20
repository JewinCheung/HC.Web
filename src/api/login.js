import axios from '../axios/AxiosConfig'

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
    url: '/login',
    method: 'post',
    data: parameter
  })
}

export function getUserInfo () {
  return axios({
    url: 'order/customer/getInfo',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: '/api/logout',
    method: 'post'
  })
}
