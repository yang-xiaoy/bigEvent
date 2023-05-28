<template>
  <div class="artList_container">
    <!-- 文章列表展示 -->
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>文章列表</span>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章分类">
          <el-select v-model="formInline.region" placeholder="请选择分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="resetSubmit">重置</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="add" @click="showPubDialogFn">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 发布文章 -->
    <el-dialog :title="isEdit ? '编辑分类' : '发布文章'" :visible.sync="pubDialogVisible" fullscreen :before-close="handleColse">
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateForm">
        <!-- <el-form-item label="分类名称" prop="cate_name" :label-width="formLabelWidth">
          <el-input v-model="addCateForm.cate_name" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="分类别名" prop="cate_alias" :label-width="formLabelWidth">
          <el-input v-model="addCateForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="commitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      addCateForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 表单数据对象校验规则
      addCateRules: {
        cate_name: [
          { required: true, message: '请添加文章分类', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请添加分类别名', trigger: 'blur' }
        ]
      },
      isEdit: false, // true为编辑状态，false为新增状态
      editId: '', // 保存正在要编辑的数据id值
      formLabelWidth: '120px',
      pubDialogVisible: false // 控制发布文章的对话框显示与隐藏
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
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
    handleColse(done) { // done的作用：调用就会关闭的对话框
      const confirmResult = this.$confirm('此操作将导致文章丢失，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 取消了关闭，阻止住，什么都不干
      if (confirmResult === 'cancel') {
        // 确认关闭
        return done()
      }
    },
    cancelFn() {
      console.log('222')
    },
    commitFn() {
      console.log('')
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
}
</style>
