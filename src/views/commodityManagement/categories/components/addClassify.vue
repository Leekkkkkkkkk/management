<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible="show"
      width="50%"
      @close="$emit('input',false)"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="分类名称">
          <el-cascader
            ref="cas"
            :options="options"
            :props="{ checkStrictly: true,label:'cat_name',value:'cat_id',children:'children',leaf:'cat_level' }"
            clearable
            @change="onChange"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoriesList, addCategoriesList } from '@/api/ProductCategories'
export default {
  model: {
    prop: 'show'
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 分类名称
      ruleForm: {
        name: ''
      },
      // 分类id
      pid: 0,
      level: '',
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },

  created() {
    this.getCategoriesList()
  },

  methods: {
    async getCategoriesList() {
      const res = await getCategoriesList({
        type: 2
      })
      this.options = res
      console.log(res)
    },
    async onChange() {
      const res = await this.$refs.cas.getCheckedNodes()
      const { data } = res[0]
      this.pid = data.cat_id
      this.level = data.cat_level
      console.log(res)
    },
    async onSend() {
      if (this.pid === 0) {
        await addCategoriesList({
          cat_name: this.ruleForm.name,
          cat_pid: this.pid,
          cat_level: this.level
        })
      } else {
        await addCategoriesList({
          cat_name: this.ruleForm.name,
          cat_pid: this.pid,
          cat_level: this.level + 1
        })
      }
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
