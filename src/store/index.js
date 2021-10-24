import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: []
  },
  mutations: {
    saveMenuList (state,menuList) {
      state.menuList = menuList
    }
  },
  actions: {
    getMenuList ({commit},params = {} ) {
      return new Promise((resolve,reject) => {
        axios.get('/api/menulist',{params})
          .then(res => {
            commit('saveMenuList',res.data.list)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  modules: {
  }
})
