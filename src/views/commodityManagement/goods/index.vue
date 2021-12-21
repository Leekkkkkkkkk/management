<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-input v-model="query.query" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
          <el-button slot="append" icon="el-icon-search" @click="onSearchData" />
        </el-input>
        <edit-info @click.native="$router.push('add')" />
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        />
        <el-table-column
          prop="goods_name"
          label="商品名称"
          style="font-size:12px"
          width="600"
        />
        <el-table-column
          prop="goods_price"
          label="商品价格"
        />
        <el-table-column
          prop="goods_weight"
          label="商品重量"
        />
        <el-table-column
          label="创建时间"
        >
          <template slot-scope="{ row }">
            {{ row.upd_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="query.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import editInfo from '@/components/editInfo.vue'
import { goodsList } from '@/api/ProductCategories'
export default {
  components: { editInfo },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      query: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },

  created() {
    this.getGoodsList()
  },

  methods: {
    // 多少一页
    handleSizeChange(val) {
      this.query.pagesize = val
      this.getGoodsList()
    },
    // 页码
    handleCurrentChange(val) {
      this.query.pagenum = val
      this.getGoodsList()
    },
    onSearchData() {},
    // 获取商品数据列表
    async getGoodsList() {
      const res = await goodsList(this.query)
      this.tableData = res.goods
      this.total = res.total
      console.log(res)
    }
  }
}
</script>

<style  lang='scss'>
.inputwidth{
    width: 375px;
    height: 40px;
    margin: 20px 10px;
  }
  .el-table .cell{
    font-size: 12px;
  }
</style>
