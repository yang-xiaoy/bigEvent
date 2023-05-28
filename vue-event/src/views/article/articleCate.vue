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
    <!--
      编辑文章分类和添加文章分类使用的是同一个dialog框。
      Bug：el-form和el-dialog和数据回显，同时使用，就会出现Bug。
        1. Bug复现：开发（先进行数据添加，不会出现任何问题），测试（新进行数据修改，再添加，发现输入框里面有值）
        2. 原因：点击修改后，关闭对话框的时候，置空失效（置空输入框失效）。
        3. 具体分析：主人公resetFilelds有问题。
        4. 线索支持：
          1）. Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认值slot不会被渲染到DOM上，第二次后续只是做css的显示和隐藏。
          2）. vue 数据改变（先执行所有同步）再去更新DOM（异步代码）。
        5. 无问题：第一次打开网页，先点击新增按钮 ——> dialog出现 ——> el-form组件第一次挂载（关联addForm对象属性值为空字符串）
           el-form组件内绑定了初始值，所以后续调用resetFileds的时候，它可以用到空字符串值来初始值来重置。
        6. 有问题：第一次打开网页，先点击修改按钮 ——> 虽然dialog值为 true 了，但是同步代码把 addForm 对象里赋值了（默认值）——>
           DOM更新异步 ——> dialog出现 ——> el-form组件第一次挂载（使用addForm内置做回显，然后第一次el-form内绑定了初始值（有值的））
           ——> 以后做的重置，它就用绑定的带值的做的重置。
      解决方案：
        1. 让数据回显慢点执行。

        让el-dialog第一次挂载el-form时，先用addForm空字符串初始值绑定到内部，后续用作 resetFileds 重置。
        所以让真实的DOM先创建并在内部绑定好"复制"好初始值

        接着我们真实DOM更新好后绑定好了，咱们再给数据做回显。

        注意：我们给v-model对象赋值只是影响当前显示的值，不会影响到resetFileds复制的初始值

        this.$nextTick(() => {
        // 数据回显（回填）
        this.addCateForm.cate_name = obj.cate_name
        this.addCateForm.cate_alias = obj.cate_alias
      })
      -->
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
          { required: true, message: '请添加文章分类', trigger: 'blur' },
          { pattren: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符串', trigger: 'bulr' }
        ],
        cate_alias: [
          { required: true, message: '请添加分类别名', trigger: 'blur' },
          { pattren: /^[a-zA-Z0-9]{1,15}$/, message: '分类名必须是1-15位的字母数字', trigger: 'bulr' }
        ]
      },
      /**
       * 经验：如果用同一个按钮，想要做状态区分
       *  1. 定义一个标记变量isEdit（true：编辑，false：新增），还要定义本次要编辑的数据唯一id值，editId。
       *  2. 在点击修改的时候，isEdit改为true，editId保存要求改的数据id。
       *  3. 在点击新增按钮的时候，isEdit改为false，editId置空。
       *  4. 在点击保存按钮时（确定按钮时），就可以用isEdit变量做区分了。
       */
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
