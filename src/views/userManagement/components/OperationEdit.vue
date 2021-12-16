<template>
  <el-table-column label="操作" width="200">
    <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="$emit('onEdit', scope.row)" />
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="$emit('onDele', scope.row)" />
      <el-button type="warning" icon="el-icon-setting" size="mini" @click="$emit('onSett',scope.row)" />
    </template>
  </el-table-column>
</template>

<script>
export default {
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
