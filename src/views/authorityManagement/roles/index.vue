<template>
  <div class="Roles">
    <edit-info />
    <user-data-list :table-data="tableData" @onSett="onSett" />
    <permission-list v-if="PermissionListShow" :id="treeId" v-model="PermissionListShow" :new-arr="newArr" />
  </div>
</template>
<script>
import { getRolesList } from '@/api/role'
import EditInfo from '@/components/editInfo.vue'
import UserDataList from './components/userDataList.vue'
import PermissionList from './components/PermissionList.vue'
export default {
  name: 'Roles',
  components: { EditInfo, UserDataList, PermissionList },
  data() {
    return {
      tableData: [],
      PermissionListShow: false,
      newArr: [],
      treeId: null
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      try {
        const res = await getRolesList()
        const { data, meta } = res
        this.tableData = data
        this.$message.success(meta.msg)
      } catch (error) {
        console.dir(error)
      }
    },
    onSett(obj) {
      // 拿到当前选中的权限
      const list = obj.children.map(item => {
        const arr = []
        item.children.map(item => {
          item.children.map(item => {
            arr.push(item.id)
          })
        })
        return arr
      })
      if (this.newArr) {
        this.newArr = []
      }
      list.forEach(item => {
        this.newArr.push(...item)
      })
      this.treeId = obj.id
      this.PermissionListShow = true
    }
  }
}
</script>

<style lang="scss">
.Roles{
  background: #fff;
  padding: 20px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;

    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-table{
    margin: 15px 0;
  }
  .el-card__body{
    padding: 20px;
  }
  .bg-purple{
    border-bottom: 1px solid #ccc;

  }
  .elCol{
    display: flex;
    flex-direction: column;
  }
  .bg-flex{
    display: flex;
    justify-content: space-between;
  }
</style>
