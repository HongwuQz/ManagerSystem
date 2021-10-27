<template>
  <div class="ms-cate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/cate/add')" style="margin:10px">添加</el-button>
    <el-table
    :data="cateList.filter(data => !search || data.catename.includes(search) || data.catename.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    stripe
    :row-key="id"
    :tree-props="{children:'children'}">
    <el-table-column
      label="编号"
      prop="id"
      width="80">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="catename">
    </el-table-column>
    <el-table-column
      label="图标"
      prop="rolename">
      <template slot-scope="scoped">
          <img :src="scoped.row.img" :alt="scoped.row.catename" height="80px">
      </template>
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
          @click="handleEdit(scope.row.id)">编辑</el-button>
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
import { mapState,mapActions } from 'vuex'
export default {
  name: 'ms-cate',
  data(){
    return {
      cateList:[],
      search:'',
      dialogVisible: false,
      id:''
    }
  },
  mounted(){
    this.getCateList({istree:1})
    .then( res => {
      this.cateList = res
    }).catch(err => {
      console.log(err)
    })
  },
  methods:{
    // 转变为Vuex内的getCateList函数进行获取，并存储在State中供编辑页使用
    ...mapState(['cateList']),
    ...mapActions(['getCateList']),
    // getCateList(){
    //   this.$axios
    //   .get('/api/catelist',{params:{istree:1}})
    //   .then((res,rej) => {
    //     if (res.data.code === 200) {
    //         this.cateList = res.data.list
    //     }else{
    //         rej(res)
    //     }
    //   }).catch(err => {
    //     this.$message({
    //       type: 'error',
    //       message: err,
    //       showClose: true,
    //       center: true
    //     })
    //   })
    // },
    handleEdit(index){
      this.$router.push('/cate/' + index)
    },
    handleDelete(){
      this.dialogVisible = false
      this.$axios
        .post('/api/catedelete',{id:this.id})
        .then(res => {
          this.getCateList()
          if (res.data.code == 200) {
            this.Notification('success',`删除成功`)
            this.getCateList({istree:1})
            .then((res,rej) => {
              if(res.data.code == 200) {
                this.cateData = res.data.list
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