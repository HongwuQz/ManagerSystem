<template>
    <div class="addForm">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item style="margin-bottom:10px">管理员{{type}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加/修改表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="所属角色" prop="roleid">
              <el-select v-model="ruleForm.roleid" placeholder="请选择角色">
              <!-- 过滤掉自身（顶级菜单） -->
              <el-option
              v-for="r in roleList.filter(item => item.rolename != ruleForm.rolename)"
              :key="r.id"
              :label="r.rolename"
              :value="r.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch
              v-model="ruleForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="green"
              inactive-color="red"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即{{type}}</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        roleid: '',
        password: '',
        status: false    // 状态
      },
      roleList: [],
      type:'添加',
      rules: {
        username: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roldid: [
          { required: true, message: '请选择所属角色', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  mounted(){
    let id = this.$route.params.id
    // console.log(id)
    if(id){
      this.type = '编辑'
      this.getUserInfo(id)
    }
    this.getRoleList()
    // console.log(this.roleList)
    // console.log(this.menuList)
  },
  computed: {
    ...mapState(['menuList'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        let str = JSON.stringify(this.ruleForm)
        let params = JSON.parse(str)
        let url = '/api/useradd'
        if(this.type == '编辑') {
            url = '/api/useredit'
            params.uid = this.$route.params.id
        }
        // console.log(params)
        this.$axios.post(url,params)
        .then(res => {
          if (res.data.code == 200) {
            this.Notification('success',`${this.type}成功`)
          }
          this.$router.go(-1)
        }).catch(err =>{
          console.log(err)
        })
      } else {
        this.$message({
            type: 'error',
            message: '提交内容有误请检查！！',
            duration: 1500
        })
        return false;
      }
      });
    },
    // 提示框
    Notification (type,title) {
      this.$notify({
        title: title,
        type: type,
        offset: 100,
        showClose: false,
        duration: 1500
      });
    },
    getRoleList () {
        this.$axios.get('/api/rolelist')
        .then( res => {
            this.roleList = res.data.list
        }).catch( err => {
            console.log(err)
        })
    },
    // 获取单条菜单信息
    getUserInfo(id){
      this.$axios
        .get('/api/userinfo',{params:{uid:id}})
        .then((res) => {
          this.ruleForm = res.data.list
        }).catch(err => {
          this.$message({
          type: 'error',
          message: `服务器出错啦
          错误码：${err}`,
          showClose: true,
          center: true
          })
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    }
  },
}
</script>

<style>
    .demo-ruleForm{
      width: 400px;
    }
</style>