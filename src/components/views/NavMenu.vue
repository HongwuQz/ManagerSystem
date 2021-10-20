<template>
  <div class="navmenu">
      <el-menu
      default-active="/home"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="logo">
          <img src="../../assets/logo.jpg">
          源农鲜生
      </div>
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首 页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/menu">
          <i class="el-icon-location"></i>
          <span>菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/role">
          <i class="el-icon-location"></i>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/admin">
          <i class="el-icon-location"></i>
          <span>管理员管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
    name: 'navmenu',
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style>
.logo{
    height: 70px;
    color: #fff;
    font-size: 20px;
    line-height: 70px;
    text-align: center;
}

.logo img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

.navmenu,.el-menu{
    height: 100%;
    width: 200px;
    border: none;
}
</style>