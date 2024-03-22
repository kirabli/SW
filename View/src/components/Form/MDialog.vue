<!-- https://vxetable.cn/v2/#/table/api  -->
<template>
  <el-dialog :title="title" :visible.sync="visible" @close="close" :append-to-body="appendToBody" :lock-scroll="lockScroll"
             :fullscreen="fullscreen">
    <slot />
  </el-dialog>
</template>

<script>
export default {
  name: 'MDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示',
    },
    oktitle: {
      type: String,
      default: '确 定',
    },
    width: {
      type: String,
      default: '50%',
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      visible: false
    }
  },
  watch: {
    value(val, oldVal) {
      this.visible = val
      //  this.$emit('input', this.visible)
    },
  },
  methods: {
    close() { console.log(this.visible); this.$emit('input', this.visible) }
  },
  mounted() {
    if (this.defaultTableData) {
      this.tableData = this.defaultTableData
    }
    if (this.immediate) {
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog__header {
  padding: 10px;
}

/deep/ .el-dialog__body {
  padding: 5px 15px;
}
</style>
