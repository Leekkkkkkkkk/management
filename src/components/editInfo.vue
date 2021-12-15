<template>
  <el-button type="primary" @click="onEditInfo">添加用户</el-button>
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
    onEditInfo() {
      this.$emit('editDialogVisible', true)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
