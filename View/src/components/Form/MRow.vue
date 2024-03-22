<template>
  <el-row :gutter="gutter" class="mrow">
    <slot />
  </el-row>
</template>
<script>
export default ({
  name: 'MRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {}
  }
})
</script>
<style scoped>
.el-row {
  margin-bottom: 0 !important;
}
</style>
