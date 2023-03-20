
import { login, getUserInfo } from '@/api/login'
import { queryPermissionsByUser } from '@/api/api'
import { LocalStorage } from 'quasar'
// import { login } from '@/api/UserApi'
const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    avatar: '',
    permissionList: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname }) => {
      state.username = username
      state.realname = realname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response) {
            localStorage.setItem('access_token', response.token)
            commit('SET_TOKEN', response.toke)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetCustomerInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response.code === 200) {
            LocalStorage.set('customer_Info', response.data)
            commit('SET_INFO', response.data)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetPermissionList ({ commit }) {
      return new Promise((resolve, reject) => {
        const token = ''
        const params = { token: token }
        queryPermissionsByUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('LOGOUT')
        window.location.href = '/'
        window.sessionStorage.clear()
        // logout().then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // })
      })
    }
  }
}

export default user
