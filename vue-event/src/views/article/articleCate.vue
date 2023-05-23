<template>
  <div class="actCate_container">
    <!-- 文章分类展示 -->
    <el-card class="box-card">
      <div slot="header" class="title">
        <span>文章分类</span>
        <el-button type="success" @click="addCateDialogShowFn">添加分类</el-button>
      </div>
      <el-table :data="artCateDate" stripe style="width: 100%">
        <!-- type是table-column内置的属性，这里使用type="index"表示第一格使用索引 -->
        <el-table-column type="index" label="序号" width="300px"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" :label-width="formLabelWidth">
          <el-input v-model="form.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI } from '@/api/index.js'
export default {
  data() {
    return {
      artCateDate: [],
      dialogFormVisible: false,
      form: {
        cate_name: '',
        cate_alias: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async getArtCateList() {
      const res = await getArtCateListAPI()
      // console.log(res)
      this.artCateDate = res.data.data
    },
    addCateDialogShowFn() {
      this.dialogFormVisible = true
    }
  },
  created() {
    this.getArtCateList()
  }
}
</script>

<style lang="less" scoped>
.actCate_container {
  .box-card {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;

      .el-button {
        font-size: 16px;
      }
    }

    .el-table {
      :deep .el-table__cell {
        font-size: 16px;
      }

      .el-button {
        font-size: 16px;
      }
    }
  }

  .el-dialog {
    .el-form-item {

      :deep .el-input__inner,
      :deep .el-form-item__label {
        font-size: 16px;
      }
    }

    .el-button {
      font-size: 16px;
    }
  }
}
</style>
