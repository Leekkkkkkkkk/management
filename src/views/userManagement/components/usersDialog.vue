<template>
  <el-dialog
    title="添加用户"
    :visible="value"
    width="50%"
    @close="handleClose"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
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
import { addUser } from '@/api/user'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2到7个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\d{2,7}$/, message: '长度在2到7个数字', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }
    }
  },

  created() {

  },

  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    async SendInfo() {
      try {
        await addUser(this.form)
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
