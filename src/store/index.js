import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [],
    roleData: [],
    userInfo: []
  },
  mutations: {
    saveMenuList (state,menuList) {
      state.menuList = menuList
    },
    saveRoleList (state,roleData) {
      state.roleData = roleData
    },
    saveUserList (state,userList) {
      state.userList = userList
    },
    saveUserInfo (state,userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {

    // 用户登录并记录信息
    getLoginInfo ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        axios.post('/api/userlogin',params)
        .then( res => {
          if (res.data.code === 200) {
            commit('saveUserInfo',res.data.list)
            resolve(res)
          }
        }).catch( err => {
          reject(err)
        })
      })
    },

    // 获得菜单列表
    getMenuList ({commit},params = {} ) {
      return new Promise((resolve,reject) => {
        axios.get('/api/menulist',{params})
          .then(res => {
            commit('saveMenuList',res.data.list)
            resolve(res)
            // console.log(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    // 获取角色列表
    getRoleList ({commit},params = {} ) {
      return new Promise((reslove,reject) => {
        axios.get('/api/rolelist',{params})
        .then(res => {
          commit('saveRoleList',res.data.list)
          reslove(res)
          // console.log(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    
    // 获取用户列表
    getUserList ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        axios.get('/api/userlist',{params})
        .then(res => {
          commit('saveUserList',res.data.list)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
