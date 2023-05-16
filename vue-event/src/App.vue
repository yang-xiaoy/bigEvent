<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { getUserInfoAPI } from '@/api/index.js'

export default {
  created() {
    // getUserInfoAPI().then(res => {
    //   console.log(res)
    // })
    // this.$store.dispatch('getUserInfoAction')
  }
}
</script>
<style lang="less">
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #1890ff;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
