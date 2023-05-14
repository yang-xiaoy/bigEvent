<template>
  <div class="side_container">
    <el-aside width="200px" class="el-menu">
      <el-avatar :size="80" :src="circleUrl"></el-avatar>
      <div class="sub-title">欢迎，admin</div>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  height: 100vh;
  color: #fff;

  .el-avatar {
    margin: 30px 0 0 0;
  }
}
</style>
