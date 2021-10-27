<template>
  <div class="layout">
    <el-container>
        <el-aside width="200px">
            <nav-menu></nav-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-dropdown>
                    <span class="el-dropdown-link">
                    {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu>
                    <el-dropdown-item>
                        <!-- el-dropdown-item标签无法绑定事件 -->
                        <span @click="logout">退出登录</span>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <img class="avatar" src="../assets/logo.jpg" :alt="userInfo.username">
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import navMenu from '../components/views/NavMenu.vue'
export default {
    name: 'layout',
    methods: {
        ...mapMutations(['userLogout']),
        logout () {
            this.userLogout()
            this.$router.push('/login')
        },
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components:{navMenu}
}
</script>

<style>
.el-aside{
    overflow: hidden;
}

.layout,.el-container{
    height: 100%;
}

.el-main{
    background-color: #f8f8f8;
}

.avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px #eee;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
}

.el-dropdown{
    float: right;
    line-height: 60px;
}
</style>