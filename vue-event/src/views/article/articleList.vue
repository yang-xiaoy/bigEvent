<template>
  <div class="artList_container">
    <!-- 文章列表展示 el-form -->
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="q" class="demo-form-inline">
        <!-- 文章分类 -->
        <el-form-item label="文章分类">
          <el-select v-model="q.cate_id" placeholder="请选择分类">
            <!-- 循环渲染分类可选项 -->
            <el-option v-for="obj in cateList" :label="obj.cate_name" :value="obj.cate_id" :key="obj.cate_id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 发布状态 -->
        <el-form-item label="发布状态">
          <el-select v-model="q.state" placeholder="请选择状态">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <!-- 查询/重置 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="resetSubmit">重置</el-button>
        </el-form-item>
        <!-- 发布文章 -->
        <el-form-item>
          <el-button type="primary" class="add" @click="showPubDialogFn">发布文章</el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <!-- 发布文章 dialog -->
    <el-dialog title="发布文章" :visible.sync="pubDialogVisible" fullscreen :before-close="handleColse">
      <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef">
        <!-- 文章名称 -->
        <el-form-item label="文章标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="pubForm.title" placeholder="请输入文章标题" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 文章分类 -->
        <el-form-item label="文章分类" prop="cate_id" :label-width="formLabelWidth">
          <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width:100%">
            <!-- 循环渲染分类可选项 -->
            <el-option v-for="obj in cateList" :label="obj.cate_name" :value="obj.cate_id" :key="obj.cate_id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容" prop="content" :label-width="formLabelWidth">
          <quill-editor v-model="pubForm.content" style="width:100%">
          </quill-editor>
        </el-form-item>
        <!-- 文章封面 -->
        <el-form-item label="文章封面" prop="cover_img" :label-width="formLabelWidth">
          <!-- 显示封面图片 -->
          <img src="../../assets/images/cover.jpg" class="cover_img" ref="imgRef" />
          <!-- 文件选框，默认被隐藏 -->
          <input type="file" style="display: none;" accept="image/*" ref="iptFileRef" @change="changeCoverFn($event)">
          <br />
          <!-- 选择封面按钮 -->
          <div class="chooseBut">
            <el-button type="text" @click="selCoverFn()">+选择封面</el-button>
          </div>
        </el-form-item>
        <!-- 发布文章/存为草稿 -->
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="pubArticleFn('已发布')">发布文章</el-button>
          <el-button @click="pubArticleFn('草稿')">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '@/assets/images/cover.jpg'
import { getArtCateListAPI } from '@/api/index.js'
export default {
  data() {
    return {
      // 文章列表---查询参数的对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      // 文章分类列表
      cateList: [],
      // 发布文章---表单数据对象
      pubForm: {
        title: '', // 文章标题
        cate_id: '', // 文章分类
        content: '', // 文章内容
        cover_img: '', // 文章封面图片（保存是个文件）
        state: '' // 发布状态（值：已发布或草稿）
      },
      // 表单数据对象校验规则
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      isEdit: false, // true为编辑状态，false为新增状态
      editId: '', // 保存正在要编辑的数据id值
      formLabelWidth: '120px',
      pubDialogVisible: false // 控制发布文章的对话框显示与隐藏
    }
  },
  created() {
    // 初始化文章列表
    this.initCateList()
  },
  methods: {
    /**
     * 文章列表页面--->查询事件
     */
    onSubmit() {
      console.log('submit!')
    },
    /**
     * 文章列表页面--->重置事件
     */
    resetSubmit() {
      console.log('reset')
    },
    // 发布文章按钮--->点击事件
    showPubDialogFn() {
      // 点击右上角，发布文章事件，让发布文章的弹框显示
      this.pubDialogVisible = true
    },
    // 发布文章--->对话框关闭前的回调
    // 注意：dialog自带的点右上角的X，和按下esc，和点击半透明蒙层关闭才会走这里，以及你自己设置的点击visible对应变量为false，都会导致关闭前的回调触发
    async handleColse(done) { // done的作用：调用就会关闭的对话框
      // $confirm内部虽然是一个确认的提示框，但是它借用了Promise语法来管理，点击确定它的状态为兑现成功状态返回'confirm',如果用户点击取消按钮，
      // 此Promise对象状态为拒绝状态，返回'calcel'字符串。
      const confirmResult = await this.$confirm('此操作将导致文章丢失，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 取消了关闭，阻止住，什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
      // 知识点回顾：
      // 1. await 只能用在被 async 修饰的函数内。async修饰：就是在当前函数名左边加async关键字，如果没有函数名，就在形参的左边加 async 关键字。
      // 原因：因为async修饰的函数就是异步函数，如果此函数被调用，总是返回一个全新的Promise对象，而且本次函数调用因为是异步函数，
      // 所以外面的同步代码继续执行，而且await暂停代码只能暂停async函数内的,等待await后面异步结果。

      // 2. await只能拿到成功的结果并放心往下走，如果失败内部会向浏览器控制台抛出错误并不会让await往下走代码。
      // 3. await后面的Promise的对象的拒绝状态（错误）如何捕获呢？
      //  方法一：使用 try{} catch{err}
      //  方法二：使用 promise 的链式调用，而且在catch里return的非Promise拒绝状态对象值，都会当作成功的结果返回给原地新的Promise对象结果。
    },
    /**
     * 获取文章分类
     */
    async initCateList() {
      const { data: res } = await getArtCateListAPI()
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    /**
     * 选择封面按钮--->点击事件--->让窗口出来
     */
    selCoverFn() {
      this.$refs.iptFileRef.click()
    },
    /**
     * 封面选择改变事件
     * @param {*} e 原生事件对象
     */
    changeCoverFn(e) {
      const files = e.target.files
      if (files.length === 0) {
        // 如果files.length等于0，那么就将pubForm表单对象中的cover_img设置为null
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    /**
     * 发布文章/存为草稿--->点击事件
     * @param {*} str
     */
    pubArticleFn(str) {
      // str接收的是一个字符串，"已发布"或"草稿"（后端要求的参数值）
      this.pubForm.state = str
    }
  }

}
</script>

<style lang="less" scoped>
.artList_container {
  .box-card {
    .title {
      text-align: left;
      font-size: 16px;
    }

    .el-form {
      text-align: left;
      clear: both;

      :deep .el-form-item__label {
        font-size: 16px;
      }

      :deep .el-input__inner {
        font-size: 16px;
      }

      .el-button {
        font-size: 16px;
      }

      .el-form-item:last-child {
        float: right;
      }
    }
  }

  // ::v-deep 外面不能套父级选择器
  ::v-deep .ql-editor {
    min-height: 300px;
    font-size: 16px;
  }

  .el-button {
    font-size: 16px;
  }

  :deep .el-form-item__content {
    text-align: left;
  }

  .el-form-item {
    text-align: center;

    :deep .el-input__inner,
    :deep .el-form-item__label {
      font-size: 16px;
    }

    .cover_img {
      width: 400px;
      height: 400px;
      object-fit: cover;
    }

    .chooseBut {
      float: left;
    }
  }

  .dialog-footer {
    float: left;
  }
}
</style>
