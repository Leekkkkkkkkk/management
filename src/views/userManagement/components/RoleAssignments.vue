<template>
  <el-dialog
    title="提示"
    :visible="value"
    width="50%"
    @close="$emit('input',false)"
  >
    <p>当前用户名:{{ sett.username }}</p>
    <p>当前的角色:{{ sett.role_name }}</p>
    <span>分配新角色:  </span>
    <el-select v-model="Default" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.roleName"
        :value="item.id"
      />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button type="primary" @click="onSava">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesList } from '@/api/role'
import { AssignUserRoles } from '@/api/user'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    sett: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [],
      Default: ''
    }
  },

  created() {
    this.getRolesList()
  },

  methods: {
    async getRolesList() {
      try {
        const res = await getRolesList()
        this.options = res
        console.log(res)
      } catch (error) {
        console.dir(error)
      }
    },
    async onSava() {
      try {
        await AssignUserRoles(this.sett.id, this.Default)
        this.$emit('input', false)
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
