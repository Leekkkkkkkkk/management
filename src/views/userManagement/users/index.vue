<template>
  <div class="users">
    <div>
      <el-input v-model="input" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
      <edit-info />
    </div>
    <table-list :table-item="tableData" />
    <div class="block">
      <el-pagination
        :current-page="pagenum"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import { createNamespacedHelpers } from 'vuex'
import editInfo from '@/components/editInfo.vue'
import TableList from '@/components/TableList.vue'
const { mapState: mapStateData } = createNamespacedHelpers('user')
export default {
  name: 'Users',
  components: { editInfo, TableList },
  data() {
    return {
      tableData: [],
      value: true,
      input: '',
      // 要跳转的页面
      // 当前的页面
      pagenum: 1,
      // 每条显示的数据
      pagesize: 5,
      // 还有多少条
      total: 0
    }
  },
  computed: {
    ...mapStateData(['user'])
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const res = await getUsers({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      const { users, pagenum, total } = res
      this.tableData = users
      this.total = total
      this.pagenum = pagenum
      console.log(total)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUsers()
    }
  }
}
</script>

<style  lang='scss'>
.users{
  background: #fff;
  .inputwidth{
    width: 375px;
    height: 40px;
    margin: 20px 10px;
  }
}
</style>
