<template>
  <div class="users">
    <div>
      <el-input v-model="query" placeholder="请输入内容" class="input-with-select inputwidth " clearable>
        <el-button slot="append" icon="el-icon-search" @click="onSearchData" />
      </el-input>
      <edit-info @editDialogVisible="dialogVisible=$event" />
    </div>
    <!-- 列表数据 -->
    <table-list :table-item="tableData" @onEdit="onEdit" @onSett="onSett" />
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
    <!-- //添加用户 -->
    <users-dialog v-if="dialogVisible" v-model="dialogVisible" />
    <!-- 修改用户信息 -->
    <edit-user v-if="editUserShow" v-model="editUserShow" :user-info="userInfo" />
    <!-- 分配角色弹框 -->
    <role-assignments v-if="RoleAssignmentsShow" v-model="RoleAssignmentsShow" :sett="sett" />
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import { createNamespacedHelpers } from 'vuex'
import editInfo from '@/components/editInfo.vue'
import TableList from '@/components/TableList.vue'
import UsersDialog from '../components/usersDialog.vue'
import EditUser from '../components/editUser.vue'
import RoleAssignments from '../components/RoleAssignments.vue'
const { mapState: mapStateData } = createNamespacedHelpers('user')
export default {
  name: 'Users',
  components: { editInfo, TableList, UsersDialog, EditUser, RoleAssignments },
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
      dialogVisible: false,
      editUserShow: false,
      RoleAssignmentsShow: false,
      userInfo: {},
      sett: {}
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
    },
    onSearchData() {
      this.getUsers()
      this.query = ''
    },
    onEdit(obj) {
      this.userInfo = obj
      this.editUserShow = true
    },
    EditStatus() {},
    onSett(obj) {
      this.RoleAssignmentsShow = true
      this.sett = obj
      console.log(obj)
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
