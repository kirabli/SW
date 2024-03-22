<template>
  <el-col :span="span">
    <el-form-item :label="label" :label-width="autoWidth" :prop="prop" :rules="autoRule">
      <template slot="label" v-if="validatenull(label)" class="mlabel">
        <slot name="label"></slot>
      </template>
      <slot />
    </el-form-item>

  </el-col>
</template>
<script>
export default ({
  name: 'MFormItem',
  props: {
    span: {
      type: [Number],
      default: 8
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    customWidth: {
      type: String,
      default: '0',
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false,
    },
    itemRule: {
      type: Array,
      default: () => null
    },
    trigger: {
      type: [String, Array],
      default: 'blur',
    },
  },
  computed: {
    autoWidth() {
      return this.validatenull(this.label) ? this.customWidth : this.labelWidth
    },
    autoRule() {
      if (this.itemRule) return this.itemRule
      else {
        if (this.required) return [{
          required: this.required,
          message: '请输入' + this.label,
          trigger: this.trigger,
        }]

      }
    }
  },
  data() {
    return {
    }
  }
})
</script>
<style scoped>
</style>
