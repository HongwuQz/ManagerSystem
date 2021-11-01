<template>
  <div class="ms-user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/user/add')" style="margin:10px">添加</el-button>
    <el-table
    :data="userData.filter(data => !search || data.rolename.includes(search) || data.username.toLowerCase().includes(search.toLowerCase()))"
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
      prop="username">
    </el-table-column>
    <el-table-column
      label="角色"
      prop="rolename">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status"
      :filter-method="dataFilter"
      :filters="[ {text: '启用', value: '1'},{text: '禁用', value: '0'}]"
      >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status == '1'?'success':'danger'">
          {{scope.row.status == '1'?'启用':'禁用'}}
        </el-tag>
      </template>
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
          @click="handleEdit(scope.row.uid)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="dialogVisible = true;id = scope.row.id">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ms-user',
  data(){
    return {
      userData:[],
      search:'',
      dialogVisible: false,
      id:''
    }
  },
  mounted(){
    this.getUserList({size:10, page:1})
      .then((res,rej) => {
        if(res.data.code == 200) {
          this.userData = res.data.list
        }else{
          rej(res)
        }
      }).catch(err => {
        console.log(err)
      })
  },
  methods:{
    // 更换为使用Vuex的Store保存内容
    ...mapActions(['getUserList']),
    // getMenuList(){
    //   this.$axios
    //   .get('/api/menulist',{params:{istree:1}})
    //   .then((res) => {
    //     this.menuData = res.data.list
    //   }).catch(err => {
    //     this.$message({
    //       type: 'error',
    //       message: '服务器出错啦',
    //       showClose: true,
    //       center: true
    //     })
    //   })
    // },
    handleEdit(index){
      this.$router.push('/user/' + index)
    },
    handleDelete(){
      this.dialogVisible = false
      this.$axios
        .post('/api/userdelete',{id:this.id})
        .then(res => {
          this.getUserList()
          if (res.data.code == 200) {
            this.Notification('success',`删除成功`)
            this.getUserList({size:10, page:1})
            .then((res,rej) => {
              if(res.data.code == 200) {
                this.userData = res.data.list
              }else{
                rej(res)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
    },
    // 右侧弹出提示框
    Notification (type,title) {
      this.$notify({
        title: title,
        type: type,
        offset: 100,
        showClose: false,
        duration: 1500
      });
    },
    dataFilter(val,row) {
      return row.status == val
    }
  }
}
</script>

<style>

</style>