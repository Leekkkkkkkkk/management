<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录杭州24期后台管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenus } from '@/api/permissions'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateData } = createNamespacedHelpers('user')
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapStateData(['user'])
  },
  created() {
    this.getMenusData()
  },
  methods: {
    async getMenusData() {
      const res = await getMenus()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
