// import MForm from '@/components/MForm/MForm'
// import MFormItem from '@/components/MForm/MFormItem'
// import MRow from '@/components/MForm/MRow'
// export default{
// 	install(Vue){
// 		Vue.component('MFormItem',MFormItem)
// 		Vue.component('MRow',MRow)
// 	}

// }
import Vue from 'vue'
function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('@/components/Form', false, /\.vue$/)
export default function installComponent() {
  requireComponent.keys().forEach(fileName => {
    // 组件中信息
    let config = requireComponent(fileName)
    // console.log('config:', config,)
    // 定义组件名
    let componentName = changeStr(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    Vue.component(componentName, config.default || config)
  })
}

