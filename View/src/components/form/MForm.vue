<template>
  <el-form :model="model" ref="formRef" label-width="labelWidth">
    <slot />
  </el-form>
</template>
<script>
export default ({
  name: 'MForm',
  props: {
    model: {
      type: Object,
      default: () => { }
    },
    formRef: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {}
  }
})
</script>
