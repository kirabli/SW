<template>
  <m-form-item :span="span" :label="label" :labelWidth="labelWidth">
    <el-select :style="{width:width}" @change="valueChange" :value="value" :prop="prop" :label-width="labelWidth"
               :placeholder="placeholder" :clearable="clearable" v-dom-focus="{valid:vFocus}" v-el-bluer="{valid:vBlur}">
      <el-option v-for="(item,index) in options" :key="item[valueField]" :label="item[labelField]"
                 :value="item[valueField]"></el-option>
    </el-select>
  </m-form-item>
</template>
<script>
export default ({
  name: 'MRow',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [String],
      default: undefined
    },
    span: {
      type: Number,
    },
    prop: {
      type: String,
      default: ''
    },
    options: {
      typeof: Array,
      default: () => []
    },
    valueField: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    vFocus: {
      type: Boolean,
      default: false
    },
    vBlur: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    valueChange(val) {
      this.$emit('input', val)
    }
  }
})
</script>
