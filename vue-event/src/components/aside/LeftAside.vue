<template>
  <div class="side_container">
    <el-aside width="210px" class="el-menu">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#fff" text-color="#000"
        active-text-color="#409EFF" unique-opened router>
        <!-- userinfo -->
        <div class="user_info">
          <el-avatar :size="80" v-if="user_pic" :src="user_pic"></el-avatar>
          <el-avatar :size="80" v-else :src="circleUrl"></el-avatar>
          <div class="sub-title">欢迎，{{ username || nickname }}</div>
        </div>

        <!-- menu -->
        <template v-for="item in menus">
          <el-menu-item :index="item.indexPath" v-if="!item.children" :key="item.indexPath">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>

          <el-submenu :index="item.indexPath" v-else :key="item.indexPath">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group v-for="obj in item.children" :key="obj.indexPath">

              <el-menu-item :index="obj.indexPath"> <i :class="obj.icon"></i>{{ obj.title }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenuListAPI } from '@/api'
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      menus: []
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    // methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath)
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath)
    //   }
    // },
    // 获取侧边栏数据
    async getMenuListFn() {
      const res = await getMenuListAPI()
      this.menus = res.data.data
      console.log(res)
    }
  },
  created() {
    // 获取侧边栏数据
    this.getMenuListFn()
  }
}
</script>

<style lang="less" scoped>
.side_container {
  height: 100vh;
}

.el-avatar {
  margin: 30px 0 0 0;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-aside {
  height: 100vh;
  color: #333;

  .el-menu {
    height: 100vh;
    user-select: none;

    .el-menu-item,
    .el-submenu span {
      font-size: 14px;
    }
  }
}

.user_info {
  margin-bottom: 25px;
  text-align: center;
}
</style>
