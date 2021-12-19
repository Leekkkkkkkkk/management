<template>
  <div>
    <el-card class="box-card">
      <el-alert
        title="注意:只允许为第三级分类设置相关参数!"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="block" style="margin:15px 0">
        <span>选择商品分类: </span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ label:'cat_name',value:'cat_id', }"
          @change="handleChange"
        />
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="tableData.length===0 ? true : false" type="primary" size="mini" style="margin-bottom:15px" @click="motionShow=true">动态参数</el-button>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              width="50"
              type="expand"
            >
              <template slot-scope="{row}">
                <el-tag
                  v-for="(item,index) in row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(item,row)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  size="small"
                  style="width:100px"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="#"
              type="index"
              width="60"
            />
            <el-table-column
              prop="attr_name"
              label="参数名称"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="{row}">
                <el-button type="primary" icon="el-icon-edit" @click="onEdit(row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="ondele(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button :disabled="tableData.length===0 ? true : false" type="primary" size="mini" @click="motionShow=true">静态属性</el-button>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              width="50"
              type="expand"
            >
              <template slot-scope="">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  123
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  size="small"
                  style="width:100px"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="#"
              type="index"
              width="60"
            />
            <el-table-column
              prop="attr_name"
              label="参数名称"
            />
            <el-table-column
              label="操作"
            />
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        :title="activeName=== 'many' ? '添加动态参数' : '添加静态参数'"
        :visible.sync="motionShow"
        width="50%"
      >
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item :label="activeName=== 'many' ? '动态参数' : '静态参数'" prop="attr_name">
            <el-input v-model="form.attr_name" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="motionShow = false">取 消</el-button>
          <el-button type="primary" @click="onSave">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesList, CategoriesList, addCategoriesAttributes, deleteCategories, editCategories } from '@/api/ProductCategories'
export default {
  name: 'Params',
  data() {
    return {
      value: '',
      activeName: 'many',
      options: [],
      tableData: [],
      inputVisible: false,
      inputValue: '',
      attributes: {
        id: '',
        sel: 'many'
      },
      motionShow: false,
      form: {
        attr_name: ''
      },
      rules: {
        attr_name: [
          { required: true, message: '请输入动态参数', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      tags: [],
      obj: {}
    }
  },
  watch: {
    activeName(val) {
      console.log(val)
      this.attributes.sel = val
    }
  },
  created() {
    this.getCategoriesListData()
  },

  methods: {
    handleChange(val) {
      const id = val[2]
      this.attributes.id = id
      this.handleClick()
    },
    async handleClick() {
      if (this.attributes.id === '') return
      const res = await CategoriesList(this.attributes.id, this.attributes.sel)
      this.tableData = res
      this.tableData.forEach(item => {
        if (item.attr_vals !== '') {
          item.attr_vals = item.attr_vals.split(' ')
        }
      })
    },
    async getCategoriesListData() {
      const res = await getCategoriesList()
      this.options = res
    },
    // 删除tags
    async handleClose(inx, obj) {
      await editCategories({
        id: obj.cat_id,
        attrid: obj.attr_id,
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.attr_vals.join('').replace(inx, '')
      })
      this.handleClick()
    },
    showInput(obj) {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      this.obj = obj
    },
    // 添加tags
    async  handleInputConfirm() {
      console.log(this.obj)
      const inputValue = this.inputValue
      await editCategories({
        id: this.obj.cat_id,
        attrid: this.obj.attr_id,
        attr_name: this.obj.attr_name,
        attr_sel: this.obj.attr_sel,
        attr_vals: this.obj.attr_vals + '' + inputValue
      })
      this.handleClick()
      this.inputVisible = false
      this.inputValue = ''
    },
    async onSave() {
      if (this.form.attr_id) {
        editCategories({
          id: this.form.cat_id,
          attrid: this.form.attr_id,
          attr_name: this.form.attr_name,
          attr_sel: this.attributes.sel,
          attr_vals: this.form.attr_vals
        })
      } else {
        await addCategoriesAttributes({
          id: this.attributes.id,
          attr_name: this.form.attr_name,
          attr_sel: this.attributes.sel
        })
      }
      this.motionShow = false
    },
    onEdit(obj) {
      console.log(obj)
      this.motionShow = true
      this.form = { ...obj }
    },
    ondele(obj) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteCategories(obj.cat_id, obj.attr_id)
        this.handleClick()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>

</style>
