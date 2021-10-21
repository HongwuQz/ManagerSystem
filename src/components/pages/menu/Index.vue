<template>
  <div class="ms-menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/menu/add')" style="margin:10px">添加</el-button>
    <el-table
    :data="menuData.filter(data => !search || data.title.includes(search) || data.icon.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    stripe
    row-key="id"
    :tree-props="{children:'children'}">
    <el-table-column
      label="编号"
      prop="id"
      width="80">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="title">
    </el-table-column>
    <el-table-column
      label="图标"
      prop="icon">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status == '1'?'success':'danger'">
          {{scope.row.status == '1'?'启用':'禁用'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      prop="url">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push('/menu/edit')">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'ms-menu',
    data(){
      return {
        menuData:[],
        search:''
      }
    },
    mounted(){
      this.getMenuList()
    },
    methods:{
      getMenuList(){
        this.$axios
        .get('/api/menulist',{params:{istree:1}})
        .then((res) => {
          this.menuData = res.data.list
          // console.log(this.menuData)
        }).catch(err => {
          console.log(err)
        })
      },
      handleEdit(index,row){
        console.log(index,row)
      }
    }
}
</script>

<style>

</style>