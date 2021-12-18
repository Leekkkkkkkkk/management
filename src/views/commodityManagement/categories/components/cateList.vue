<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
    >
      <el-table-column
        label="#"
        type="index"
        width="60"
      />
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="275"
      />
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="275"
      >
        <template slot-scope="">
          <i class="el-icon-success" style="color:green" />
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="排序"
        width="275"
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.cat_level === 0">等级一</el-tag>
          <el-tag v-else-if="row.cat_level === 1" type="success">等级二</el-tag>
          <el-tag v-else type="warning">等级三</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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

  }
}
</script>

<style scoped lang='less'>

</style>
