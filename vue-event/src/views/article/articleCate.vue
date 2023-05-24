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
          <!-- 作用域插槽 scope对象：{row:行对象}，通过这个对象可以拿到当前删除的行 -->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateCateFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deletaCateFn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类的对话框 -->
    <el-dialog :title="isEdit ? '编辑文章分类' : '添加文章分类'" :visible.sync="dialogFormVisible" @close="dialogCloseFn">
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateForm">
        <el-form-item label="分类名称" prop="cate_name" :label-width="formLabelWidth">
          <el-input v-model="addCateForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias" :label-width="formLabelWidth">
          <el-input v-model="addCateForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="commitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, deleteArtCateAPI } from '@/api/index.js'
export default {
  data() {
    return {
      artCateDate: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      // 表单数据对象
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
      editId: '' // 保存正在要编辑的数据id值
    }
  },
  methods: {
    // 获取文章分类
    async getArtCateList() {
      const res = await getArtCateListAPI()
      // console.log(res)
      this.artCateDate = res.data.data
    },
    // 新增文章份额里
    addCateDialogShowFn() {
      this.dialogFormVisible = true
      this.isEdit = false
      this.editId = ''
    },
    // 取消添加文章分类事件
    cancelFn() {
      this.dialogFormVisible = false
    },
    // 提交添加文章分类事件
    commitFn() {
      this.$refs.addCateForm.validate(async valid => {
        if (valid) {
          if (this.editId) {
            // 1. 修改文章分类
            // 向表单数据对象中添加一个id属性
            this.addCateForm.id = this.editId
            const { data: res } = await updateArtCateAPI(this.addCateForm)
            if (res.code !== 0) {
              return this.$message.error('更新文章分类失败！')
            }
            this.$message.success('更新文章分类成功！')
          } else {
            // 2. 添加文章分类
            const { data: res } = await addArtCateAPI(this.addCateForm)
            if (res.code !== 0) {
              return this.$message.error('添加文章分类失败！')
            }
            this.$message.success('添加文章分类成功！')
          }
          // 1. 添加文章分类成功后，页面不刷新，表格中的文章分类列表是不会刷新的
          // 2. 函数写在 created 生命周期函数中，不会挂载到this身上，无法写this.created
          // 3. 这个位置需要重新请求一次文章分类的数据，确保文章分类添加后不用刷新，文章分类数据就展示在文章分类的列表中
          this.getArtCateList()
          this.$refs.addCateForm.resetFields()
        } else {
          return false
        }
      })

      this.dialogFormVisible = false
    },
    // 关闭弹窗，重置表单
    dialogCloseFn() {
      this.$refs.addCateForm.resetFields()
    },
    // 修改文章分类
    updateCateFn(obj) {
      // console.log(obj)=>{cate_alias: "html" cate_name: "HTML" id: 40841}
      this.isEdit = true
      this.editId = obj.id
      this.dialogFormVisible = true

      this.$nextTick(() => {
        // 数据回显（回填）
        this.addCateForm.cate_name = obj.cate_name
        this.addCateForm.cate_alias = obj.cate_alias
      })
    },
    // 删除文章分类
    async deletaCateFn(id) {
      // console.log(obj)
      const { data: res } = await deleteArtCateAPI(id)
      if (res.code !== 0) {
        return this.$message.error('删除文章分类失败！')
      }
      this.$message.success('删除文章分类成功！')
      this.getArtCateList()
    }
  },
  created() {
    this.getArtCateList()
  }
}

/**
 * BUG复现：
 *  1.
 */
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
