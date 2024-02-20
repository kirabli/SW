<template>
  <m-form-item :span="span" :label="label" :labelWidth="labelWidth" :prop="prop" :rules="itemRule" :required="required"
               :itemRule="autoRule">
    <el-input ref="input" v-model="modelValue" :style="{width:width,minWidth:minWidth}" :maxlength="maxlength" @input="valueInput"
              :disabled="disabled" :placeholder="placeholder" />
    <!-- <m-input v-model="formTable.quantities" prop="quantities" label="数量 :" isNumber :decimal="[6,0,1]" required
                   validateMsg='西药数量只能为正整数' /> -->
    <slot />
  </m-form-item>
</template>
<script>
export default ({
  name: 'MRow',
  props: {
    value: {
      type: String,
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
      type: String
    },
    labelWidth: {
      type: [String]
    },
    span: {
      type: Number
    },
    prop: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false,
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
    maxlength: {
      type: Number
    },
    itemRule: {
      type: Array
    },
    required: {
      type: Boolean
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    decimal: {
      type: Array,
      default: () => []
    },
    negative: {
      type: Boolean,
      default: false
    },
    itemRule: {
      type: Array,
      default: () => null
    },
    trigger: {
      type: String,
      default: 'blur'
    },
    validateMsg: {
      type: String,
      default: '输入有误'
    },
  },
  data() {
    return {
      modelValue: null,
      validateQuantity: (rule, value, callback, { rules, row, column, rowIndex, columnIndex }) => {
        //  整数位a:  -1不限制   
        //  小数位b:  -1不限制 0无小数 
        //  正负c:  -1限制负数 0不限制 1限制正数  
        let [a, b = 0, c = 0] = this.decimal
        if (a == 0 || a < -1 || b < -1 || c < -1) return
        console.log(a, b, c)
        console.log('/^' + (c == 0 ? '-?' : c == -1 ? '-' : c == 1 ? '' : '')
          + '('
          + (a == -1 ? '[\\d]+' : '[\\d]{1,' + a + '}')
          + (b == 0 ? '' : ('|' + (a == -1 ? '[\\d]+' : '[\\d]{1,' + a + '}') + '\\.' + (b == -1 ? '[\\d]+' : '[\\d]{1,' + b + '}')))
          + ')'
          + '$/') ///^([\d]+
        let parttern = eval('/^' + (c == 0 ? '-?' : c == -1 ? '-' : c == 1 ? '' : '')
          + '('
          + (a == -1 ? '[\\d]+' : '[\\d]{1,' + a + '}')
          + (b == 0 ? '' : ('|' + (a == -1 ? '[\\d]+' : '[\\d]{1,' + a + '}') + '\\.' + (b == -1 ? '[\\d]+' : '[\\d]{1,' + b + '}')))
          + ')'
          + '$/')
        console.log(parttern)
        //#region结构参考
        // let reg0 = eval(c == 0 ? '-?' : c == -1 ? '-' : c == 1 ? '' : '')
        // let reg1 = eval(a == -1 ? '[\\d]+' : '[\\d]{1,' + a + '}')
        // let reg2 = eval('\\.' + (b == -1 ? '[\\d]+' : '[\\d]{1,' + b + '}'))
        // let parttern = eval('/^' + reg0 + '(' +reg1+ (b == 0 ? '' : ('|' + reg1 + reg2))+ ')' + '$/')
        //#endregion
        if (!parttern.test(value)) callback(new Error(this.validateMsg));
      }
    }

  },
  watch: {
    value: {
      handler(newValue) {
        this.modelValue = newValue
      },
      immediate: true,
    },
  },
  computed: {
    autoRule() {
      if (this.itemRule) return this.itemRule
      else {
        let res = [{
          required: this.required,
          message: '请输入' + this.label,
          trigger: this.trigger,
        }]
        if (this.isNumber && this.decimal.length > 0) res.push({
          trigger: this.trigger,
          validator: this.validateQuantity
        })
        return res

      }
    }
  },

  methods: {
    valueInput(val) {
      if (this.isNumber) {
        this.modelValue = val.toString().replace(/^\.+|[^\d.-]/g, '')
      }
      else this.modelValue = val
      this.$emit('input', this.modelValue)
    },
    setFocus() {
      this.$refs.input.focus()
    }
  },
})
</script>
