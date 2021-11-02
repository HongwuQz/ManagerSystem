<template>
  <div class="ms-specs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/specs/add')" style="margin:10px">添加</el-button>
    <el-table
    :data="specsData.filter(data => !search || data.specsname.includes(search) || data.specsname.toLowerCase().includes(search.toLowerCase()))"
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
      prop="specsname"
      width="100px">
    </el-table-column>
    <el-table-column
      label="规格属性"
      prop="attrs"
      >
      <template slot-scope="scoped">
        <el-tag
        v-for="(item,key) in scoped.row.attrs"
        :key="key"
        >
          {{item}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status"
      width="100px"
      :filter-method="dataFilter"
      :filters="[{text: '启用', value: '1'},{text: '禁用', value: '0'}]"
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
import { mapActions } from 'vuex'
export default {
  name: 'ms-specs',
  data(){
    return {
      specsData: [],
      search: '',
      dialogVisible: false,
      id: ''
    }
  },
  mounted(){
    this.getSpecsList({size:10, page:1})
      .then((res) => {
        this.specsData = res
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
  },
  methods:{
    // 使用Vuex的Store保存内容
    ...mapActions(['getSpecsList']),

    handleEdit(index){
      this.$router.push('/specs/' + index)
    },
    handleDelete(){
      this.dialogVisible = false
      this.$axios
        .post('/api/specsdelete',{id:this.id})
        .then(res => {
          this.getSpecsList()
          if (res.data.code == 200) {
            this.Notification('success',`删除成功`)
            this.getSpecsList({size:10, page:1})
            .then(res => {
              this.specsData = res
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