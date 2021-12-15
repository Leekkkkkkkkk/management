<template>
  <el-dialog
    title="添加用户"
    :visible="value"
    width="50%"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" disabled />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button type="primary" @click="SendInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { InquireUser, editUserSubmit } from '@/api/user'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        mobile: ''
      },
      id: ''
    }
  },

  created() {
    this.getInquireUser()
  },

  methods: {
    async SendInfo() {
      try {
        const { meta } = await editUserSubmit(this.id, this.form)
        this.$message.success(meta.msg)
        this.$emit('input', false)
      } catch (error) {
        console.dir(error)
      }
    },
    handleClose() {
      this.$emit('input', false)
    },
    async getInquireUser() {
      try {
        const id = this.userInfo.id
        const res = await InquireUser(id)
        console.log(res)
        const { data, meta } = res
        this.id = data.id
        this.form.username = data.username
        this.form.mobile = data.mobile
        this.form.email = data.email
        this.$message.success(meta.msg)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
