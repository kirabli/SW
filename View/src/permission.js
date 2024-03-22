import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setUserId, getUserId } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      console.log('trans:', 1)
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        console.log('trans:', 2)
        next()
      } else {
        try {
          console.log('trans:', 3)
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roleNames } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roleNames)
          console.log('accessRoutes', accessRoutes)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
          //通过$router.options访问的所有属性和方法都是router构造函数中存在的属性和方法，也就是在router对象通过new Router () 初始化时可以访问到的属性和方法
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.log('trans:', 4, error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log('trans:', 5)
    /* has no token*/
    if (to.meta && to.meta.type == 0) {
      console.log('trans:', 6)
      // in the free login whitelist, go directly
      next()
    }
    else if (whiteList.indexOf(to.path) !== -1) {
      console.log('trans:', 7)
      // in the free login whitelist, go directly
      next()
    } else {
      console.log('trans:', 8)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
