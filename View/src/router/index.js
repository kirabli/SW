import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutManage from '@/layout/manage'
import LayoutDisplay from '@/layout/display'
import Board from '@/views/manage/Board.vue'
import Home from '@/views/display/Home.vue'
Vue.use(VueRouter)
 
// 配置路由
const routes = [
  {
      path: '/',
      name:'Home',
      redirect:'/home',
      // alwaysShow:true,//仅一个子菜单时保留主菜单
      component: LayoutDisplay,
      children:[
        {
          path: 'home',
          meta:{
            title:'Home',
            icon:''
          },
          component:Home,
          children:[]
        }
      ]
  },
  {
      path: '/manage',
      name:'manage',
      redirect:'/manage/board',
      // alwaysShow:true,//仅一个子菜单时保留主菜单
      component: LayoutManage,
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
      path: '/manage/drugstore',
      name:'drugstore',
      meta:{
        title:'药房管理',
        icon:''
      },
      component: LayoutManage,
       children:[
          {
              path: 'prescription',
              meta:{
                title:'处方打印',
                icon:''
              },
              component: ()=>import('@/views/manage/drugstore/Prescription.vue'),
              children:[] 
            },{
              // 路径
                path: 'advice',
                meta:{
                  title:'医嘱打印',
                  icon:''
                },
                component:()=> import('@/views/manage/drugstore/Advice.vue'),
                children:[]
              },
        ]
    },
    {
      path: '/manage/demo',
      name:'demo',
      meta:{
        title:'Demo',
        icon:''
      },
      component: LayoutManage,
       children:[
          {
              path: 'flex',
              meta:{
                title:'Flex',
                icon:''
              },
              component: ()=>import('@/views/manage/demo/Flex.vue'),
              children:[]
            },{
              // 路径
                path: 'theme',
                meta:{
                  title:'Theme',
                  icon:''
                },
                component:()=> import('@/views/manage/demo/Theme.vue'),
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