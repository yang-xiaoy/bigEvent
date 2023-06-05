const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 影响打包时，index.html引入其它资源的前缀地址
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
