<template>
  <div class="login_container">
    <div class="login_form">
      <h3 class="title">后台管理系统</h3>
      <!-- form start -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 注册/登录 -->
        <el-form-item>
          <el-button type="primary" class="login_but" @click="loginFn()">登录</el-button>
          <el-link type="info" class="login_link" :underline="false" @click="$router.push('/register')">去注册</el-link>
        </el-form-item>
      </el-form>
      <!-- form end -->
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      // 表单数据对象
      loginForm: {
        username: '', // 用户名
        password: '' // 用户密码
      },
      // 表单规则校验对象
      loginRules: {
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
        ]
      }
    }
  },
  methods: {
    // 映射
    ...mapMutations(['updateToken']),
    //  登录事件处理函数
    async loginFn() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          //  验证通过
          // console.log(this.loginForm)
          // 1. 调用接口
          const { data: res } = await loginAPI(this.loginForm)
          if (res.code !== 0) {
            // 2. 登录失败
            return this.$message.error(res.message)
          }
          // 3. 登录成功，先存储token，保存到vuex中
          this.updateToken(res.token)
          this.$message.success(res.message)
          this.$router.push('/home')
        } else {
          // 验证不通过
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_bg.png') center;
  background-size: cover;

  .login_form {
    width: 500px;
    height: 355px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .title {
    font-size: 22px;
    // color: #5297ae;
    color: #223442;
    margin: 30px 0;
  }

  .el-form {
    padding: 0 40px;

    .login_but {
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
</style>
