<template>
    <div class="addForm" v-cloak>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs' }">规格管理</el-breadcrumb-item>
            <el-breadcrumb-item style="margin-bottom:10px">规格{{type}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加/修改表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="规格名称" prop="specsname">
                <el-input v-model="ruleForm.specsname"></el-input>
            </el-form-item>
            <el-form-item label="规格属性" prop="attrs">
              <template :slot-scope="attrs">
                <div v-for="(item,i) in attrs" :key="i">
                <el-input
                style="width:80%"
                v-model="item.value"
                ></el-input>
                <el-button
                class="delBt"
                icon="el-icon-delete"
                circle
                @click="attrs.pop()"></el-button>
              </div>
              </template>

              <el-button @click="attrs.push({value:''})">添加规格</el-button>
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
export default {
  data() {
    return {
      ruleForm: {
        specsname: '',
        status: false    // 状态
      },
      attrs: [{value:''}],
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
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  mounted(){
    let id = this.$route.params.id
    if(id){
      this.type = '编辑'
      this.getSpecsInfo(id)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        let str = JSON.stringify(this.ruleForm)
        let params = JSON.parse(str)
        let url = '/api/specsadd'
        if(this.type == '编辑') {
            url = '/api/specsedit'
            params.id = this.$route.params.id
        }
        params.attrs = this.attrs.map(item => item.value).toString()
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
    // 获取单条菜单信息
    getSpecsInfo(id){
      this.$axios
        .get('/api/specsinfo',{params:{id}})
        .then((res) => {
          this.ruleForm = res.data.list[0]
          res.data.list[0].attrs.map(item => {
            this.attrs.push({value:item})
          })
          console.log(this.attrs);
        }).catch(err => {
          this.$message({
          type: 'error',
          message: err,
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
    .delBt{
      margin-left: 10px;
      border: none;
      color: red;
      display: inline-block;
    }
</style>