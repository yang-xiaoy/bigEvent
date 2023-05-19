<template>
  <div class="userinfo_container">
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>卡片名称</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input type="username" :v-model="username" :value="username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item label="昵称" prop="usernike">
          <el-input type="usernike" v-model="ruleForm.usernike" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        usernike: '',
        email: ''
      },
      rules: {
        usernike: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(store)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    this.username = store.state.userInfo.username
  }
}
</script>

<style lang="less" scoped>
.box-card {
  .title {
    text-align: left;
    font-size: 16px;
  }

  .el-form-item {
    font-size: 16px;
  }

  :deep .el-form-item__label {
    font-size: 16px;
  }

  :deep .el-input__inner {
    font-size: 16px;
  }

  .el-button {
    font-size: 16px;
  }
}
</style>
