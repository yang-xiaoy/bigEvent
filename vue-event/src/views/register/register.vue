<template>
  <div class="register_container">
    <div class="register_form">
      <h3 class="title">后台管理系统</h3>
      <!-- form start -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input placeholder="请再次确认密码" type="password" v-model="form.repassword"></el-input>
        </el-form-item>
        <!-- 注册/登录 -->
        <el-form-item>
          <el-button type="primary" class="register_but" @click="registerFn()">注册</el-button>
          <el-link type="info" class="login_link" :underline="false" @click="$router.push('/login')">去登陆</el-link>
        </el-form-item>
      </el-form>
      <!-- form end -->
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index.js'
export default {
  name: 'index',
  data() {
    // 注意：必须在data里面定义此箭头函数，才能确保this.form的使用
    const samePwdFn = (rule, value, callkack) => {
      if (value !== this.form.password) {
        // 如果验证失败，则调用回调函数，指定一个错误对象
        callkack(new Error('两次输入的密码不一致'))
      } else {
        // 如果验证成功，则直接调用callback回调函数即可
        callkack()
      }
    }
    return {
      // 表单数据对象
      form: {
        username: '', // 用户名
        password: '', // 用户密码
        repassword: ''// 确认密码
      },
      // 表单规则校验对象
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/, // 正则表达式
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 注册事件处理函数
     */
    async registerFn() {
      // console.log(this.$refs)
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 校验通过，拿到绑定的数据 console.log(this.form)
          // 1. 调用接口
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 2. 注册失败
          if (res.code !== 0) {
            return this.$message.error(res.message)
          }
          // 3. 注册成功，提示用户
          this.$message.success(res.message)
          // 4. 跳转页面
          this.$router.push('/login')
        } else {
          // 阻止默认提交行为（表单下面的红色提示会自动出现）
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register_container {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_bg.png') center;
  background-size: cover;

  .register_form {
    width: 500px;
    height: 355px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .title {
      font-size: 22px;
      // color: #5297ae;
      color: #223442;
      margin: 20px 0;
    }

    .el-form {
      padding: 0 40px;

      .register_but {
        width: 100%;
      }

      .login_link {
        float: left;
        color: #409EFF;
      }

      :deep .el-input__inner {
        font-size: 16px;
      }

    }
  }
}
</style>
