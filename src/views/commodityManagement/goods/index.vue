<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-input v-model="query" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
          <el-button slot="append" icon="el-icon-search" @click="onSearchData" />
        </el-input>
        <edit-info />
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
      <div class="block">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import editInfo from '@/components/editInfo.vue'
export default {
  components: { editInfo },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1,
      query: ''
    }
  },

  created() {

  },

  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    onSearchData() {}
  }
}
</script>

<style scoped lang='scss'>
.inputwidth{
    width: 375px;
    height: 40px;
    margin: 20px 10px;
  }
</style>
