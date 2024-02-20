<!-- https://vxetable.cn/v2/#/table/api  -->
<template>
  <div :class="[{autoHeight:autoHeight},'mtable']">
    <div class="basetable">
      <vxe-table ref="table" border auto-resize :height="height" :data="tableData" :loading="tableLoading"
                 :checkbox-config="checkboxConfig" @cell-click="cellClick" @cell-dblclick="cellClickDb"
                 @checkbox-change="checkboxChange" @checkbox-all="checkboxAll" :expand-config="expandConfig"
                 :span-method="spanMethod" :row-class-name="rowClassName" :show-footer=" showFooter" :footer-method="footerMethod"
                 :show-overflow="showOverflow" :show-header-overflow="showHeaderOverflow" :keyboard-config="keyboardConfig"
                 :edit-config="editConfig" :edit-rules="editRules">
        <vxe-table-column v-if="showCheckbox" type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column v-if="showSeq" type="seq" title="序号" :width="50">
          <template #default="{ rowIndex }">
            <span>{{ (rowIndex+1) + (page.currentPage-1)*page.pageSize }}</span>
          </template>
        </vxe-table-column>
        <slot name="before"></slot>
        <template v-for="item in tableColumn">
          <vxe-table-column v-if="item.type=='slot'" :key="item.prop" v-bind="item">
            <template #default="{ row, rowIndex}">
              <slot :name="item.slotName" :row="row" :rowIndex="rowIndex"></slot>
            </template>
          </vxe-table-column>
          <vxe-table-column v-else-if="item.type=='tag'" :key="item.prop" v-bind="item">
            <template #default="{ row, rowIndex}">
              <el-tag :type="getFromFilter(row,item,'type')">{{getFromFilter(row,item,'name')}}</el-tag>
            </template>
          </vxe-table-column>
          <vxe-table-column v-else :key="item.field" v-bind="item" />

        </template>
      </vxe-table>

    </div>
    <vxe-pager v-if="showPager" perfect :current-page.sync="page.currentPage" :page-size.sync="page.pageSize" :total="page.total"
               :page-sizes="[10, 20, 50]" :layouts="layouts" @page-change="pageChange">

    </vxe-pager>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: '99%'//100%或auto会导致auto-resize失效
    },
    // 请求方法
    getDataAction: {
      type: Function,
      required: true
    },
    // 请求参数
    queryParams: {
      type: Object,
      default() {
        return {}
      }
    },
    tableColumn: {
      type: Array,
      required: true
    },
    // 分页参数映射
    pageMap: {
      type: Object,
      default() {
        return {
          currentPage: 'current',
          pageSize: 'size'
        }
      }
    },
    tableData: {
      type: Array,
      default: () => []
    },
    expandConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否立即请求接口
    immediate: {
      type: Boolean,
      default: false
    },
    // 是否显示序号
    showSeq: {
      type: Boolean,
      default: true
    },
    // 是否显示分页
    showPager: {
      type: Boolean,
      default: true
    },
    // 是否显示多选框
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 第一次请求成功后,是否默认选中第一条
    defaultSelectFirstRow: {
      type: Boolean,
      default: false
    },
    // 取值的方法，由于接口不同，导致‘列表数据’和‘总条数’在各个接口返回中可能字段不一样。此方法可以自定义取值字段
    getRecordsFun: {
      type: Function,
      default: (res) => {
        return {
          tableData: res.data.data.records,
          total: res.data.data.total
        }
      }
    },
    checkboxConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    spanMethod: {
      type: Function,
      default: () => { }
    }
    ,
    rowClassName: {
      type: [String, Function],
      default() {
        return ''
      }
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    footerMethod: {
      type: Function,
      default: () => { }
    },
    showOverflow: {
      type: [String, Boolean],
      default: true
    },
    showHeaderOverflow: {
      type: [String, Boolean],
      default: true
    },
    layouts: {
      type: Array,
      default: () => { return ['Total', 'PrevPage', 'Number', 'NextPage', 'Sizes', 'FullJump'] }
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    keyboardConfig: {
      type: Object
    },
    editConfig: {
      type: Object
    },
    editRules: {
      type: Object
    }
  },

  data() {
    return {
      tableLoading: false,
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      first: true
    }
  },
  methods: {
    pageChange({ currentPage, pageSize }) {
      this.page.currentPage = currentPage
      this.page.pageSize = pageSize
      this.getList()
    },
    getList() {
      this.tableLoading = true
      if (!this.showPager) {
        this.page.pageSize = 1000
      }
      const pageParams = {}
      pageParams[this.pageMap.currentPage] = this.page.currentPage
      pageParams[this.pageMap.pageSize] = this.page.pageSize
      this.getDataAction({
        ...this.queryParams,
        ...pageParams
      }).then(res => {

        // const result = res.data.data
        // this.page.total = result.total
        // this.tableData = result.records
        const { tableData, total } = this.getRecordsFun(res)
        // let _data = []; let _total = 3;
        // for (var i = 0; i < 13; i++) { _data = _data.concat(tableData); _total += total }
        // console.log(tableData, res)
        this.page.total = total
        this.$emit('update:tableData', tableData)
        this.$emit('getListSuccess', this.tableData)
        if (this.first && this.defaultSelectFirstRow) {
          this.setSelectCell(0)
          this.first = false
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 设置第几个选中
    setSelectCell(index) {
      this.$nextTick(() => {
        const tableRow = this.$refs.table.$el.querySelectorAll('.vxe-body--row')
        tableRow[index].classList.add('row--current')
        this.$emit('cellClick', this.tableData[index], index)
      })
    },
    reload() {
      this.page.currentPage = 1
      this.first = true
      this.getList()
    },
    // 切换某一行选中
    toggleCheckboxRow(row) {
      this.$refs.table.toggleCheckboxRow(row)
    },
    // 清除所有行选中
    clearCheckboxRow() {
      this.$refs.table.clearCheckboxRow()
    },
    // 清除所有行选中
    setAllCheckboxRow() {
      this.$refs.table.setAllCheckboxRow(true)
    },
    // 设置某一行选中/不选中
    setCheckboxRow(arr, value) {
      this.$refs.table.setCheckboxRow(arr, value)
    },
    // 获取选中的行
    getCheckboxRecords() {
      return this.$refs.table.getCheckboxRecords()
    },
    cellClick({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, $event }) {
      this.$emit('cellClick', row, rowIndex)
    },
    cellClickDb({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, $event }) {
      this.$emit('cellClickDb', row, rowIndex)
    },
    checkboxChange({ records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
      this.$emit('checkboxChange', { records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event })
    },
    checkboxAll({ records, reserves, indeterminates, checked, $event }) {
      this.$emit('checkboxAll', { records, reserves, indeterminates, checked, $event })
    },
    getFromFilter(row, item, aim) {
      let { options, key, name, type } = item.filter;
      var find = options.find(x => x[key] == row[item.field])
      if (!find) return ''
      return aim == 'name' ? find[name] : aim == 'type' ? find[type] : ''
    }
  },
  mounted() {
    if (this.immediate) {
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
.autoHeight {
  flex: 1;
  display: flex;
  flex-flow: column;
}
.autoHeight > .basetable {
  flex: 1;
}
/deep/ .vxe-pager {
  border: unset;
  background-color: unset;
}
.mtable {
  width: 100%;
}
.basetable {
  // min-height: 200px;
}
</style>
