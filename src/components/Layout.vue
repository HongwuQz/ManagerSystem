<template>
  <div class="layout">
    <el-container>
        <el-aside width="200px">
            <nav-menu></nav-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import navMenu from '../components/views/NavMenu.vue'
export default {
    name: 'layout',
    components:{navMenu}
}
</script>

<style>
.layout,.el-container{
    height: 100%;
}

.el-main{
    background-color: #f8f8f8;
}
</style>