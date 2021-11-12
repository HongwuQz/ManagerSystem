import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [],
    roleData: [],
    userInfo: [],
    cateList: [],
    specsList: [],
    goodsList: []
  },
  mutations: {
    saveMenuList (state,menuList) {
      state.menuList = menuList
      sessionStorage.setItem("menuList",JSON.stringify(menuList))
    },
    saveRoleList (state,roleData) {
      state.roleData = roleData
    },
    saveUserList (state,userList) {
      state.userList = userList
    },
    saveUserInfo (state,userInfo) {
      state.userInfo = userInfo
      userInfo = JSON.stringify(userInfo)
      sessionStorage.setItem('USERINFO',userInfo)
    },
    saveCateList (state,cateList) {
      state.cateList = cateList
    },
    saveSpecsList (state,specsList) {
      state.specsList = specsList
    },
    saveGoodsList (state,goodsList) {
      state.goodsList = goodsList
    },
    userLogout (state) {
      sessionStorage.removeItem('USERINFO')
      sessionStorage.removeItem('menuList')
      state.userInfo = []
    }
  },
  actions: {

    // 用户登录并记录信息
    getLoginInfo ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        // 判断浏览器sessionStorage中是否存在用户信息缓存，有则优先从缓存获取
        if (sessionStorage.USERINFO) {
          let userStorage = JSON.parse(sessionStorage.USERINFO)
          commit('saveUserInfo',userStorage)
          resolve(userStorage)
        }else{
          axios.post('/api/userlogin',params)
          .then( res => {
            if (res.data.code === 200) {
              commit('saveUserInfo',res.data.list)
              resolve(res)
            }
          }).catch( err => {
            reject(err)
          })
        }
      })
    },

    // 获得菜单列表
    getMenuList ({commit},params = {} ) {
      return new Promise((resolve,reject) => {
        // // 判断浏览器sessionStorage中是否存在列表数据:会出现新增权限无法获取的bug（舍）
        // if (sessionStorage.menuList) {
        //   let menuStorage = JSON.parse(sessionStorage.menuList)
        //   commit('saveMenuList',menuStorage)
        //   resolve(menuStorage)
        // }else{
          axios.get('/api/menulist',{params})
          .then(res => {
            commit('saveMenuList',res.data.list)
            resolve(res.data.list)
            // console.log(res)
          })
          .catch(err => {
            reject(err)
          })
        // }
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
    },

    // 获取商品分类管理列表
    getCateList ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        axios.get('/api/catelist',{params})
        .then(res => {
          commit('saveCateList',res.data.list)
          resolve(res.data.list)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取商品规格管理列表
    getSpecsList ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        axios.get('/api/specslist',{params})
        .then(res => {
          if(res.data.code == 200){
            commit('saveSpecsList',res.data.list)
            resolve(res.data.list)
          }else{
            reject(res)
          }
        }).catch(err => {
          reject(err)
        });
      })
    },

    // 获取商品列表
    getGoodsList ({commit},params = {}) {
      return new Promise((resolve,reject) => {
        axios.get('/api/goodslist',{params})
        .then(res => {
          if(res.data.code == 200){
            commit('saveGoodsList',res.data.list)
            resolve(res.data.list)
          }else{
            reject(res)
          }
        }).catch(err => {
          reject(err)
        });
      })
    },
  }
})
