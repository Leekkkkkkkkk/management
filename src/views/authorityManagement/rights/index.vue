<template>
  <div class="rights">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        label="#"
        type="index"
        width="50"
      />
      <el-table-column
        prop="authName"
        label="权限名称"
      />
      <el-table-column
        prop="path"
        label="路径"
      />
      <el-table-column
        prop="level"
        label="标签"
        filter-placement="bottom-end"
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.level==='0'">等级一</el-tag>
          <el-tag v-else-if="row.level==='1'" type="success">等级二</el-tag>
          <el-tag v-else type="warning">等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listPermissions } from '@/api/permissions'
export default {
  name: 'Rights',
  data() {
    return {
      tableData: []
    }
  },

  created() {
    this.getListPermissions()
  },

  methods: {
    async getListPermissions() {
      try {
        const res = await listPermissions('list')
        this.tableData = res
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
