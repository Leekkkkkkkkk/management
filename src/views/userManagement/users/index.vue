<template>
  <div class="users">
    <div>
      <el-input v-model="query" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
        <el-button slot="append" icon="el-icon-search" @click="onSearchData" />
      </el-input>
      <edit-info @editDialogVisible="dialogVisible=$event" />
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
    <users-dialog v-model="dialogVisible" />
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import { createNamespacedHelpers } from 'vuex'
import editInfo from '@/components/editInfo.vue'
import TableList from '@/components/TableList.vue'
import UsersDialog from '../components/usersDialog.vue'
const { mapState: mapStateData } = createNamespacedHelpers('user')
export default {
  name: 'Users',
  components: { editInfo, TableList, UsersDialog },
  data() {
    return {
      tableData: [],
      query: '',
      // 要跳转的页面
      // 当前的页面
      pagenum: 1,
      // 每条显示的数据
      pagesize: 2,
      // 还有多少条
      total: 0,
      dialogVisible: false
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
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      const { users, pagenum, total } = res.data
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
    },
    onSearchData() {
      this.getUsers()
      this.query = ''
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
