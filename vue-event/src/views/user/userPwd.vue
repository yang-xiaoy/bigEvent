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
export default {
  data() {
    // 新密码和旧密码不能一样
    const samePwd = (rules, value, callback) => {
      // value就是校验规则所对应输入框值（也就是新密码）
      if (this.passwordForm.old_pwd === value) {
        callback(new Error('新旧密码不能相同！'))
      } else {
        callback() // 通过验证
      }
    }
    // 新密码和确认密码必须一致
    const rePwd = (rules, value, callback) => {
      if (this.passwordForm.new_pwd !== value) {
        callback(new Error('两次密码不一致，请重新输入！'))
      } else {
        callback() // 通过验证
      }
    }
    return {
      passwordForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
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
          // 定义校验规则
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          // 定义校验规则
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() { },
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
