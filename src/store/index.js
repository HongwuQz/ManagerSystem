import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [],
    roleData: []
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
    }
  },
  actions: {
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
