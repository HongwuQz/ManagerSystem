<template>
    <div class="addForm">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
            <el-breadcrumb-item style="margin-bottom:10px">菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加/修改表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="pid">
                <el-select v-model="ruleForm.pid" placeholder="请选择上级菜单">
                <el-option label="顶级菜单" :value='0'></el-option>
                <el-option
                v-for="m in menuList"
                :key="m.id"
                :label="m.title"
                :value="m.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="ruleForm.type">
                <el-radio label="1">目录</el-radio>
                <el-radio label="2">菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ruleForm.type == 1" label="菜单图标" prop="icon">
                <el-input v-model="ruleForm.icon"></el-input>
            </el-form-item>
            <el-form-item v-if="ruleForm.type == 2" label="菜单地址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
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
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
          pid: '',      // 上级菜单的pid
          title: '',    // 菜单名称
          type: '',     // 菜单类型 1：目录  2：菜单
          icon: '',     // 目录时赋值
          url: '',      // 菜单时赋值
          status: ''    // 状态
        },
        menuList:[],
        rules: {
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择上级菜单', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择菜单类型', trigger: 'change' }
          ],
          icon: [
            { required: true, message: '请填写ElemenUI的icon名称', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请填写菜单地址url', trigger: 'blur'}
          ]
        }
      };
    },
    mounted(){
        this.getMenuList()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let str = JSON.stringify(this.ruleForm)
                let params = JSON.parse(str)
                const url = '/api/menuadd'
                this.$axios.post(url,params)
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.Notification('success','添加成功')
                    }
                }).catch(err =>{
                    console.log(err)
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        // 提示框
        Notification(type,title) {
        this.$notify({
          title: title,
          type: type,
          offset: 100,
          showClose: false,
          duration: 1000
        });
      },
        getMenuList(){
            this.$axios
                .get('/api/menulist',{params:{istree:1}})
                .then((res) => {
                    this.menuList = res.data.list
                }).catch(err => {
                    console.log(err)
                })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.go(-1)
        }
    }
  }
</script>

<style>
    .demo-ruleForm{
        width: 400px;
    }
</style>