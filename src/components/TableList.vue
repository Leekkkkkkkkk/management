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
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <operation-edit />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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

  }
}
</script>

<style scoped lang='less'>

</style>
