<template>
  <el-dialog
    title="分配权限"
    :visible="show"
    width="60%"
    @close="$emit('input',false)"
  >
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
      @check="onNodeTree"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button type="primary" @click="onSend">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listPermissions } from '@/api/permissions'
import { roleAuthorization } from '@/api/role'
export default {
  model: {
    prop: 'show'
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    newArr: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      treeKeyId: [],
      arr: []
    }
  },
  created() {
    this.getlistPermissions()
  },
  methods: {
    async getlistPermissions() {
      const res = await listPermissions('tree')
      this.data = res
      console.log(res)
      if (this.newArr.length !== 0) {
        this.setCheckedNodes()
      }
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedKeys(this.newArr)
    },
    onNodeTree(ite, inx) {
      console.log(inx)
      // 拿到父节点全部数据解构出父节点
      const { halfCheckedKeys, checkedNodes } = inx
      this.arr.push(...halfCheckedKeys)
      this.arr.push(ite.id)
      const res = new Set(this.arr)
      if (checkedNodes.length === 0) {
        this.treeKeyId = []
        return
      }
      this.treeKeyId = [...res]
    },
    async onSend() {
      try {
        await roleAuthorization(this.id, this.treeKeyId.join())
        this.$emit('input', false)
        this.getlistPermissions()
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
