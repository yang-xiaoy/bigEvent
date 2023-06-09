<template>
  <div class="password_container">
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>重置密码</span>
      </div>
      <el-form :model="passwordForm" status-icon :rules="passwordFormRules" ref="passwordFormRef" label-width="120px"
        class="demo-ruleForm">
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="old_pwd">
          <el-input type="password" v-model="passwordForm.old_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="new_pwd">
          <el-input type="password" v-model="passwordForm.new_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认新密码 -->
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input type="password" v-model="passwordForm.re_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">修改密码</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePwdAPI } from '@/api/index.js'
export default {
  data() {
    // 自定义校验规则函数，新密码和旧密码不能一样
    const samePwd = (rules, value, callback) => {
      // value就是校验规则所对应输入框值（也就是新密码）
      if (this.passwordForm.old_pwd === value) {
        callback(new Error('新旧密码不能相同！'))
      } else {
        callback() // 通过验证
      }
    }
    // 自定义校验规则函数，新密码和确认密码必须一致
    const rePwd = (rules, value, callback) => {
      if (this.passwordForm.new_pwd !== value) {
        callback(new Error('两次密码不一致，请重新输入！'))
      } else {
        callback() // 通过验证
      }
    }
    return {
      passwordForm: {
        old_pwd: '', // 旧密码
        new_pwd: '', // 新密码
        re_pwd: '' // 确认新密码
      },
      passwordFormRules: {
        old_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          // 自定义校验规则（samePwd函数）
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          // 自定义校验规则（rePwd函数）
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.passwordFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await updatePwdAPI(this.passwordForm)
          if (res.code !== 0) {
            return this.$message.error('更新密码失败！')
          }
          this.$message.success('更新密码成功！')
          this.$refs.passwordFormRef.resetFields()
          // 清空vuex信息
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          // 退出，跳转到登录页
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.passwordFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card {
  .title {
    text-align: left;
    font-size: 16px;
  }

  :deep .el-card__body {
    text-align: left;
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
