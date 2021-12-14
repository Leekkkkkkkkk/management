<template>
  <div>
    <h1>用户管理</h1>
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateData } = createNamespacedHelpers('user')
export default {
  name: 'Users',
  data() {
    return {
      pagenum: 1,
      pagesize: 4
    }
  },
  computed: {
    ...mapStateData(['user'])
  },
  created() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      const res = await getUsers({
        query: '',
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
