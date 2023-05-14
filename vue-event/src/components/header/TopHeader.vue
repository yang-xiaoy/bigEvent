<template>
  <div class="header_container">
    <el-header>
      <div class="titleInfo">
        <h3 class="title">后台管理系统</h3>
        <span class="icnMenu"><i class="el-icon-menu"></i></span>
      </div>
      <div class="userInfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="loginOut">退出</span>
      </div>
    </el-header>
  </div>
</template>

<script>
// import { } from '@element-plus/icons-vue'
export default {

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
      vertical-align: middle;
      cursor: pointer;
      font-size: 18px;
    }
  }

  .userInfo {
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
    }
  }
}
</style>
