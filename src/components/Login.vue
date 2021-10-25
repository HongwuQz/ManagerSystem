<template>
  <div class="login">
    <el-card class="loginForm">
      <h1>登录</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="60px" size="medium" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
      </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'login',
    data(){
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['getLoginInfo']),
      submitForm(formName){
        this.$refs[formName].validate( valid => {
          if(valid) {
            this.getLoginInfo(this.loginForm)
            .then( res => {
              if(res.data.code === 200) {
                let target = this.$route.query.redirect
                this.$router.push(target)
              }
            })
          }
        })
      },
    }
}
</script>

<style>
  .login {
    background-image: linear-gradient(to right, #35D2F8,#1C77F5);
    width: 100%;
    height: 100%;
  }
  .el-form{
    width: 100%;
  }
  .loginForm{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-65%);
    width: 400px;
    height: 250px;
  }
  .loginForm h1{
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>