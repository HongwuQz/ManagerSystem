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
            :default-checked-keys="roleForm.menus"
            :expand-on-click-node="isExtendedable"
            ref="menuTree"
            node-key="id"
            :check-strictly="true"
            :check-on-click-node="true"
            >
            </el-tree>
            <el-checkbox v-model="isExtendedable">列表伸缩</el-checkbox>
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
              <el-button type="primary" @click="doSubmit('roleForm')">立即{{type}}</el-button>
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
            menuList: [],
            isExtendedable:false,
            defaultProps:{
                label:"title",
                children:"children"
            },
            rules: {
                rolename: [
                    { required: true, message: '请输入角色名称', trigger: 'blur'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                ],
            },
            roleForm: {
                rolename: '',
                menus:[],
                status:false,
            }
        }
    },
    mounted(){
        if(this.$route.params.id){
            this.type = '编辑'
            this.getRoleInfo()
        }
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
            this.roleForm.menus = this.$refs['menuTree'].getCheckedKeys()
            this.$refs[formName].validate( valid => {
                if(valid){
                    let url = '/api/roleadd'
                    let id = this.$route.params.id
                    if(id) {
                        url = '/api/roleedit'
                    }
                    let params = this.roleForm
                    params['id'] = id
                    this.$axios.post(url,params)
                    .then( (res,rej) => {
                        if(res.data.code == 200) {
                            this.Notification('success',`${this.type}成功`)
                            this.$router.go(-1)
                        }else{
                            rej(res)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        getRoleInfo() {
            let params = this.$route.params
            this.$axios('/api/roleinfo',{params})
            .then(res => {
                this.roleForm = res.data.list
                this.roleForm.menus = res.data.list.menus.split(',')
            }).catch(err => {
                console.log(err)
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