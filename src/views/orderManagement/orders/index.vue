<template>
  <div>
    <el-card>
      <el-input v-model="query.query" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
        <el-button slot="append" icon="el-icon-search" @click="onSearchData" />
      </el-input>
      <el-table
        style="width: 100%"
        border
        :data="data"
      >
        <el-table-column
          label="#"
          type="index"
          width="50"
        />
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="200"
        />
        <el-table-column
          prop="order_price"
          label="订单价格"
          width="180"
        />
        <el-table-column
          prop="is_send"
          label="是否付款"
          width="180"
        />
        <el-table-column
          prop="is_send"
          label="是否发货"
        />
        <el-table-column
          prop="update_time"
          label="下单时间"
        />
        <el-table-column
          label="操作"
        >
          <el-button>编辑</el-button>
          <el-button>定位</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getOrders } from '@/api/orders'
export default {
  name: 'Orders',
  data() {
    return {
      query: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      data: []
    }
  },

  created() {
    this.getOrdersList()
  },

  methods: {
    // 获取数据
    async getOrdersList() {
      const res = await getOrders(this.query)
      this.data = res.goods
      console.log(res)
    },
    // 搜索
    onSearchData() {}
  }
}
</script>

<style scoped lang='less'>

</style>
