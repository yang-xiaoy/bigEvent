<template>
  <div class="home_container">
    <el-container direction="vertical">
      <!-- 引用header组件 -->
      <TopHeader></TopHeader>
      <el-container>
        <!-- 引用Aside组件 -->
        <LeftAside></LeftAside>
        <el-container direction="vertical">
          <el-main>
            <router-view />
          </el-main>
          <!-- 引用footer组件 -->
          <ButtomFooter></ButtomFooter>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopHeader from '@/components/header/TopHeader.vue'
import LeftAside from '@/components/aside/LeftAside.vue'
import ButtomFooter from '@/components/footer/ButtomFooter.vue'
export default {
  name: 'index',
  components: {
    TopHeader,
    LeftAside,
    ButtomFooter
  }
}
</script>

<style lang="less" scoped>
.home_container {
  color: #f2f2f2;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  height: 100%;
}
</style>
