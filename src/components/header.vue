<template>
  <el-header>
    <div class="logo">
      <img src="../assets/logo.b5a855ee.png" alt="">
      <span>杭州24期后台管理系统</span>
    </div>
    <el-button size="medium" @click="onRemoveToken">退出</el-button>
  </el-header>
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
    onRemoveToken() {
      this.$store.commit('user/removeUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='scss'>
//login css

  .el-header{
    display: flex;
    background-color: #373d41;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
  }
  .el-aside{
    background-color: #373d41;
    text-align: left;
    .toggleMenu{
      width: 100%;
      line-height: 40px;
      text-align: center;
      background-color: #666;
      letter-spacing: 5px;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
  }
  .el-main{
    background-color: #eaedf1;
    width: 100%;
    overflow-x: hidden;
  }
  .logo{
    display: flex;
    align-items: center;
    span{
      font-size: 25px;
      color: #fff;
      margin-left: 10px;
    }
  }
</style>
