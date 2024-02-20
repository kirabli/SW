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
 
const requireComponent = require.context('@/components', true, /\.vue$/)

export default function installComponent () {
  requireComponent.keys().forEach(fileName => {
    // 组件中信息
    let config = requireComponent(fileName)
    // console.log('config:', config,)
    // 定义组件名
    let componentName = fileName.split('/').pop().replace('.vue', '');
    Vue.component(componentName, config.default || config)
  })
}

