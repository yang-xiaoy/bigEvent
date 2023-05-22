<template>
  <div class="userinfo_container">
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>卡片名称</span>
      </div>

      <el-form :model="userForm" status-icon :rules="userFormRules" ref="userFormRef" label-width="100px"
        class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input type="nickname" v-model="userForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="userForm.email" autocomplete="off"></el-input>
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
import { updateUserInfoAPI } from '@/api/index.js'
export default {
  data() {
    return {
      userForm: {
        username: '',
        nickname: '',
        email: ''
      },
      userFormRules: {
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
    submitForm() {
      this.$refs.userFormRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.userForm)
          this.userForm.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.userForm)
          if (res.code !== 0) {
            return this.$message.error('更新用户信息失败！')
          } else {
            this.$message.success('更新用户信息成功！')
            // 重新让vuex获取一下最新数据
            this.$store.dispatch('getUserInfoAction')
          }
          console.log(res)
        } else {
          return false
        }
      })
    },
    resetForm() {
      // this.userForm.nickname = ''
      // this.userForm.email = ''
      // el-from提供了一个重置表单（并且还能重置报错的提示）
      // resetFields()是固定的
      this.$refs.userFormRef.resetFields()
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
