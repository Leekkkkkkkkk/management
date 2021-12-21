<template>
  <div>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        :closable="false"
        center
        style="margin-bottom:15px"
      />
      <!-- 步骤条 -->
      <el-steps :active="active" align-center finish-status="success">
        <el-step description="基本信息" />
        <el-step description="商品参数" />
        <el-step description="商品属性" />
        <el-step description="商品图片" />
        <el-step description="商品内容" />
        <el-step description="完成" />
      </el-steps>
      <!-- 切换框 -->
      <el-tabs v-model="activeName" :tab-position="tabPosition">
        <el-tab-pane label="基本参数" name="first">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" :label-position="labelPosition" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name" />
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price" />
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight" />
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number" />
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="ruleForm.goods_cat"
                :options="options"
                :props="{label:'cat_name',value:'cat_id'}"
                @change="handleChange"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">
          <div v-for="item in GoodsProperty" :key="item.attr_id">
            <p>{{ item.attr_name }}</p>
            <el-checkbox v-for="(obj,index) in item.attr_vals" :key="index" v-model="checked" :label="obj" border />
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <div v-for="item in goodsattribute" :key="item.attr_id">
            <p>{{ item.attr_name }}</p>
            <el-input v-model="item.attr_vals" :value="item.attr_vals" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">
          <el-upload
            class="upload-demo"
            action="https://www.liulongbin.top:8888/api/private/v1/upload"
            :headers="obj"
            list-type="picture"
            :on-success="onSaveUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="five">
          <Tinymce ref="tiny" v-model="ruleForm.goods_introduce" :height="300" />
          <el-button type="primary" @click.native="onSave">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesList, CategoriesList, addGoods } from '@/api/ProductCategories'
import Tinymce from '@/views/Tinymce/index.vue'
export default {
  name: 'Add',
  components: { Tinymce },
  data() {
    return {
      active: 0,
      activeName: 'first',
      tabPosition: 'left',
      ruleForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        goods_introduce: [
          { required: true, message: '请输入商品介绍', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      labelPosition: 'top',
      options: [],
      // 商品参数
      GoodsProperty: [],
      // 商品属性:[]
      goodsattribute: [],
      checked: true,
      input: '',
      // 图片上传
      obj: {
        Authorization: this.$store.state.user.user
      },
      content: ''
    }
  },
  // 监听tabs变化
  watch: {
    activeName(val) {
      if (val === 'second') {
        this.GoodsParameter()
        this.active = 1
      } else if (val === 'third') {
        this.goodsattributes()
        this.active = 2
      } else if (val === 'fourth') {
        this.active = 3
      } else if (val === 'five') {
        this.active = 4
      }
    }
  },
  created() {
    this.CategoriesList()
  },

  methods: {
    // 分类数据
    async CategoriesList() {
      const res = await getCategoriesList()
      console.log(res)
      this.options = res
    },
    // 商品参数
    async GoodsParameter() {
      if (this.ruleForm.goods_cat.length !== 3) return
      const Id = this.ruleForm.goods_cat[2]
      const res = await CategoriesList(Id, 'many')
      console.log(res)
      this.GoodsProperty = res
      this.GoodsProperty.forEach(item => {
        if (item.attr_vals !== '') {
          item.attr_vals = item.attr_vals.split(' ')
        }
      })
    },
    // 商品属性
    async goodsattributes() {
      if (this.ruleForm.goods_cat.length !== 3) return
      const Id = this.ruleForm.goods_cat[2]
      const res = await CategoriesList(Id, 'only')
      console.log(res)
      this.goodsattribute = res
    },
    // 分类属性
    handleChange() {},
    // 图片上传方法
    onSaveUpload(response, file, fileList) {
      this.ruleForm.pics.push({ pic: response.data.tmp_path })
      console.log(response.data)
    },
    // 发布商品
    async onSave() {
      // await this.ruleForm.goods_cat.join()
      // return
      await addGoods({
        goods_name: this.ruleForm.goods_name,
        goods_cat: this.ruleForm.goods_cat.join(),
        goods_price: this.ruleForm.goods_price,
        goods_number: this.ruleForm.goods_number,
        goods_weight: this.ruleForm.goods_weight,
        goods_introduce: this.ruleForm.goods_introduce,
        pics: this.ruleForm.pics,
        attrs: this.ruleForm.attrs
      })
      this.active = 6
      this.$router.push('goods')
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-step.is-center .el-step__description{
  margin: 15px;
  font-weight: 700;
}
</style>
