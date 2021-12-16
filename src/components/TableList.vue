<template>
  <div>
    <el-table
      :data="tableItem"
      border
      stripe
      style="width: 100%;padding:20px"
    >
      <el-table-column
        prop="id"
        label="#"
        width="48"
      />
      <el-table-column
        prop="username"
        label="姓名"
        width="209"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="209"
      />
      <el-table-column
        prop="mobile"
        label="电话"
        width="209"
      />
      <el-table-column
        prop="role_name"
        label="角色"
        width="209"
      />
      <el-table-column
        prop="mg_state"
        label="状态"
        width="209"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="EditStatus(scope.row,scope.row.mg_state)"
          />
        </template>
      </el-table-column>
      <operation-edit @onEdit="$emit('onEdit',$event)" @onDele="onDele" @onSett="$emit('onSett',$event)" />
      <!-- <el-table-column label="操作" width="200" /> -->
    </el-table>
  </div>
</template>

<script>
import { ModifyUserStatus, DeleteIndividualUser } from '@/api/user'
import OperationEdit from '@/views/userManagement/components/OperationEdit.vue'
export default {
  components: { OperationEdit },
  props: {
    tableItem: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    async EditStatus(row, flag) {
      try {
        const res = await ModifyUserStatus(row.id, flag)
        const { meta } = res
        this.$message.success(meta.msg)
      } catch (error) {
        console.dir(error)
      }
    },
    onDele(obj) {
      console.log(obj)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await DeleteIndividualUser(obj.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getUsers()
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
