<template>
  <div class="edit">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
        <el-breadcrumb-item style="margin-bottom:10px">角色{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单 -->
    <el-form
    :model="roleForm"
    ref="roleForm"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm">
        <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="roleForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="menus">
            <el-tree
            :default-expand-all="true"
            :props="defaultProps"
            :show-checkbox="true"
            :data="menuList"
            ref="menuTree"
            node-key="id"
            :check-strictly="true"
            :check-on-click-node="true"
            >
            </el-tree>
        </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch
              v-model="roleForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="green"
              inactive-color="red"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doSubmit('roleForm')">立即{{confirmContent}}</el-button>
              <el-button @click="resetForm('roleForm')">取消</el-button>
            </el-form-item>
    </el-form>


  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'edit',
    data(){
        return {
            type:'添加',
            confirmContent:'添加',
            menuList: [],
            defaultProps:{
                label:"title",
                children:"children"
            },
            rules: {
                rolename: [
                    { required: true, message: '请输入角色名称', trigger: 'blur'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                ]
            },
            roleForm: {
                rolename: '',
                menus:'',
                status:false,
            }
        }
    },
    mounted(){
        this.getMenuList({istree:1})
        .then(res => {
            this.menuList = res.data.list
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        ...mapActions(['getMenuList']),
        // 提交并添加用户
        doSubmit (formName) {
            this.menus = this.$refs['menuTree'].getCheckedKeys().toString()
            this.$refs[formName].validate( valid => {
                if(valid){
                    let params = this.roleForm
                    this.$axios.post('/api/roleadd',params)
                    .then( res => {
                        if(res.data.code == 200) {
                            this.Notification('success','添加成功')
                            this.$router.go(-1)
                        }
                    })
                }
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
        }
    }
}
</script>

<style>

</style>