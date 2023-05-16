<template>
  <div class="header_container">
    <el-header>
      <div class="titleInfo">
        <h3 class="title">后台管理系统</h3>
        <span class="icnMenu"><i class="el-icon-menu"></i></span>
      </div>
      <div class="userInfo">
        <!-- avatar图像 -->
        <el-avatar :size="40" v-if="user_pic" :src="user_pic"></el-avatar>
        <el-avatar :size="40" v-else :src="circleUrl"></el-avatar>

        <!-- 个人中心 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-tickets">基本资料</el-dropdown-item>
            <el-dropdown-item icon="el-icon-picture-outline">更换头像</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">重置密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 退出登录 -->
        <span class="loginOut" @click="loginOutHandel()"><i class="el-icon-switch-button"></i>退出</span>
      </div>
    </el-header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    loginOutHandel() {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出登录，清除token和用户信息
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        return false
      })
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  user-select: none;

  .titleInfo {
    line-height: 60px;

    h3 {
      display: inline-block;
      margin: 0 45px 0 0;
    }

    .icnMenu {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .userInfo {
    display: flex;
    justify-content: space-between;

    // ::v-deep el-avatar--circle {}
    .el-avatar {
      margin: 10px 10px 0 0;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
      font-size: 16px;
    }

    .el-icon-arrow-down {
      font-size: 16px;
    }

    .loginOut {
      margin: 0 20px 0 30px;
      cursor: pointer;

      i {
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>
