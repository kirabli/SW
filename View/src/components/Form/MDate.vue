<template>
  <m-form-item :span="span" :label="label" :labelWidth="labelWidth">
    <el-date-picker ref="picker" v-model="modelValue" :style="{width:width,minWidth:minWidth}" :type="type" @change="valueChange"
                    :disabled="disabled" :format="format" :value-format="valueformat" :picker-options="pickerOptions"
                    :placeholder="placeholder" @blur="blur">
    </el-date-picker>
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
    minWidth: {
      type: String
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
      type: Number
    },
    prop: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    valueformat: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    placeholder: {
      type: String,
      default: ''
    },
    vFocus: {
      type: Boolean,
      default: false
    },
    vBlur: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      modelValue: null
    }
  },
  watch: {
    value(newvalue, oldvalue) {
      this.modelValue = newvalue
    },
  },
  methods: {
    valueChange(val) {
      this.$emit('input', val)
    },
    blur() {
      this.$emit('blur')
    },
    setFocus() {
      this.$refs.picker.focus()
    }
  },
  mounted() {
    this.modelValue = this.value
  }
})
</script>
