<template>
  <div class="avatar_container">
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>更换头像</span>
      </div>
      <el-image v-if="avatar == ''" class="img" :src="url"></el-image>
      <!-- 用户图像显示 -->
      <el-image v-else class="img" :src="avatar"></el-image>
      <div class="button">
        <!-- 文件上传按钮 -->
        <input type="file" accept="image/*" style="display:none" ref="iptRef" @change="onFileChange">
        <el-button type="primary" @click="chooseImg">选择图片<i class="el-icon-plus el-icon--right"></i></el-button>
        <el-button type="success" @click="upLoadFn">上传图像<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import avatarImg from '@/assets/images/avatar.jpg'
import { updataUserAvatarAPI } from '@/api/index.js'
export default {
  data() {
    return {
      url: avatarImg, // avatarImg 是导入的默认图片
      avatar: '' // 保存图片链接/base64字符串
    }
  },
  methods: {
    // 选择图片--->点击事件--->让选择框出现（选择图片文件的框框出现）
    chooseImg() {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },
    // 选择图片确定了
    onFileChange(e) { // e原生事件对象
      const files = e.target.files // 拿到用户选择的文件数组
      if (files.length === 0) {
        // 证明刚刚文件选择窗口打开了，但是它一个文件都没有选择然后点击了确定关闭选择弹窗
        // console.log(2)
      } else {
        // console.log(1)
        // 证明它选择了文件，默认只能选一个，如果选择多个你需要给input标签加额外原生属性
        // console.log(files[0])
        // 目标：选择的图片文件，要给到img标签做纯前端的预览
        // img的src属性值只能是下面两种情况：
        // 方式一：只能是图片的"链接地址"（外链：http://开头，图片文件相对路径）
        // 方式二：或者是图片的base64字符串（而且字符串还必须是data:image/png;base64，图片转为base64字符串）

        // 解决方式1：文件转成存储在内存临时地址（这个地址只能在js里内存里不能发给后台）
        // 语法：URL.createObjectURL(files[0])
        // 返回值：内存临时地址
        // this.avatar = URL.createObjectURL(files[0])

        // 解决方式2：文件转换成base64字符串（此字符串是可以转发到后台的）
        // 1. 创建FileReader对象
        const fr = new FileReader()
        // 2. 调用readAsDataURL函数，读取文件内容
        fr.readAsDataURL(files[0])
        // onload等待把文件读成base64字符串后会触发onload事件函数
        // 3. 监听 fr 的 onload 事件
        fr.onload = (e) => {
          // 4. e.target.result的值就是读完的结果，这里是固定写法（值是字符串，base64格式的字符串）
          this.avatar = e.target.result
        }
      }
    },
    // 上传图像事件
    async upLoadFn() {
      const { data: res } = await updataUserAvatarAPI(this.avatar)
      if (res.code !== 0) {
        return this.$message.error(res.message)
      }
      // 重新让vuex获取一下最新数据
      this.$store.dispatch('getUserInfoAction')
      // 更新图像成功
      return this.$message.success(res.message)
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

  .img {
    width: 240px;
    height: 240px;
  }

  .button {
    margin: 15px 0 0 0;

    .el-button {
      font-size: 14px;
    }
  }
}
</style>
