import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'
import Board from '@/views/Board.vue'
Vue.use(VueRouter)
 
// 配置路由
const routes = [
  {
      path: '/',
      name:'Board',
      redirect:'/board',
      // alwaysShow:true,//仅一个子菜单时保留主菜单
      component: Layout,
      children:[
        {
            path: 'board',
            meta:{
              title:'Board',
              icon:''
            },
            component:Board,
            children:[]
          }
      ]
  },
  {
      path: '/drugstore',
      meta:{
        title:'药房管理',
        icon:''
      },
      component: Layout,
       children:[
          {
              path: '/prescription',
              meta:{
                title:'处方打印',
                icon:''
              },
              component: ()=>import('@/views/drugstore/Prescription.vue'),
              children:[]
            },{
              // 路径
                path: '/advice',
                meta:{
                  title:'医嘱打印',
                  icon:''
                },
                component:()=> import('@/views/drugstore/Advice.vue'),
                children:[]
              },
        ]
    }
  
  
]
 
// 创建路由器
const router = new VueRouter({
	mode: 'history',
  routes
})
 
// 导出路由器
export default router