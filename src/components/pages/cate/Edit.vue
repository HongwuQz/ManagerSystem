<template>
    <div class="addForm">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">分类管理</el-breadcrumb-item>
            <el-breadcrumb-item style="margin-bottom:10px">分类{{type}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加/修改表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="catename">
                <el-input v-model="ruleForm.catename"></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="pid">
              <el-select v-model="ruleForm.pid" placeholder="请选择上级分类">
              <el-option label="顶级分类" :value='0'></el-option>
              <!-- 过滤掉自身（顶级分类） -->
              <el-option
              v-for="m in cateList.filter(item => item.catename != ruleForm.catename)"
              :key="m.id"
              :label="m.catename"
              :value="m.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                class="img-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleImgSuccess"
                :before-upload="beforeImgUpload">
                    <img v-if="ruleForm.img" :src="ruleForm.img" class="img">
                    <i v-else class="el-icon-plus img-uploader-icon"></i>
                </el-upload>
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
        pid: '',        // 上级分类编号
        catename: '',   // 商品分类名称
        img: '',        // 图片(文件，一般用于二级分类)
        status: ''      // 状态
      },
      type:'添加',
      // menuList:[],
      rules: {
        catename: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请选择上级菜单', trigger: 'change' }
        ],
        img: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ]
      }
    };
  },
  mounted(){
    let id = this.$route.params.id
    if(id){
      this.type = '编辑'
      this.getCateInfo(id)
    }
    console.log(this.cateList)
  },
  computed: {
    ...mapState(['cateList'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        let str = JSON.stringify(this.ruleForm)
        let params = JSON.parse(str)
        let url = '/api/cateadd'
        if(this.type == '编辑'){
            url = '/api/cateedit'
            params.id = this.$route.params.id
        }
        console.log(url,params)
        this.$axios.post(url,{params})
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
      } else {
        console.log('error submit!!');
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
    getCateInfo(id){
      this.$axios.get('/api/cateinfo',{params:{id}})
        .then((res) => {
            console.log(res)
            this.ruleForm = res.data.list
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
    },
    
    // 图片获取相关函数
    handleImgSuccess(res, file) {
        console.log(res,file)
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
        }
  },
}
</script>

<style>
.demo-ruleForm{
    width: 400px;
}

.img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.img-uploader .el-upload:hover {
    border-color: #409EFF;
}
.img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.img {
    width: 178px;
    height: 178px;
    display: block;
}
</style>