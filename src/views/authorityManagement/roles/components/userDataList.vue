<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column type="expand">
      <template slot-scope="{row}">
        <el-row v-for="item in row.children" :key="item.id" type="flex" class="row-bg" justify="space-between">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-tag>{{ item.authName }}</el-tag>
            </div></el-col>
          <el-col class="elCol">
            <div v-for="item in item.children" :key="item.id" style="height:50px;width:100%;" class="grid-content bg-purple bg-flex">
              <el-tag type="success">{{ item.authName }}</el-tag>
              <el-tag v-for="item in item.children" :key="item.id" closable type="warning" @close="onDelete(row.id,item)">{{ item.authName }}</el-tag>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type="index"
      width="50"
    />
    <el-table-column
      label="角色名称"
      prop="roleName"
    />
    <el-table-column
      label="角色描述"
      prop="roleDesc"
    />
    <operation-edit @onSett="$emit('onSett',$event)" />
  </el-table>
</template>

<script>
import OperationEdit from '@/views/userManagement/components/OperationEdit.vue'
import { deleteroleAuthorization } from '@/api/role'
export default {
  components: { OperationEdit },
  props: {
    tableData: {
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
    onDelete(id, ite) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteroleAuthorization(id, ite.id)
        this.$emit('on-success')
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
