<template>
  <div class="categories">
    <el-button type="primary" @click="addClassificationsShow=true">添加分类</el-button>
    <cate-list style="padding:20px 0" :table-data="tableData" />
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <add-classify v-if="addClassificationsShow" v-model="addClassificationsShow" />
  </div>
</template>

<script>
import { getCategoriesList } from '@/api/ProductCategories'
import CateList from './components/cateList.vue'
import AddClassify from './components/addClassify.vue'
export default {
  components: { CateList, AddClassify },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      // 第几页
      pagenum: 1,
      // 显示页数
      pagesize: 5,
      addClassificationsShow: false
    }
  },

  created() {
    this.getCategoriesList()
  },

  methods: {
    async getCategoriesList() {
      const res = await getCategoriesList({
        type: 3,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      const { total, result } = res
      this.total = total
      this.tableData = result
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].index = i + 1
      }
      // this.tableData.forEach(item => {
      //   this.$set(item,'index')
      // })
    },
    handleSizeChange(ite) {
      this.pagesize = ite
      this.getCategoriesList()
    },
    handleCurrentChange(ite) {
      this.pagenum = ite
      this.getCategoriesList()
    }
  }
}
</script>

<style  lang='scss'>
.categories{
  background-color: #fff;
  padding: 20px;
}
</style>
