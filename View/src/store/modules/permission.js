import router, { asyncRoutes, constantRoutes } from '@/router'
import { GetAllRoute } from '@/api/sysRoute'
// import lazyLoading from '@/utils/lazyLoading'
import Layout from '@/views/layout/index.vue'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
// const dynamicImport = async (moduleName) => {
//   const module = await import(`../../views/${moduleName}.vue`);
//   return module;
// }
function formatRoute(routes) {
  // var lazyLoading = (url) => Promise.resolve(require(`@/views/${url}.vue`))
  let rous = []
  routes.forEach(row => {
    let rou = JSON.parse(JSON.stringify(row))
    if (rou.component == 'Layout') rou.component = Layout
    // { path: '*', redirect: '/404', hidden: true }
    else {
      // console.log(dynamicImport)
      // rou.component = dynamicImport(row.component)
      if (row.type == 0) {
        rou.component = (resolve) => require([`../../pages/${row.component}.vue`], resolve)// lazyLoading(row.component)
      }
      else {
        rou.component = (resolve) => require([`../../views/${row.component}.vue`], resolve)// lazyLoading(row.component)
      }

      //rou.component = require.ensure([], (resolve) => require(`../../views/${row.component}.vue`))
      // console.log(rou.component())
    }
    if (rou.children && rou.children.length > 0) rou.children = formatRoute(rou.children)
    rous.push(rou)
  })
  return rous
  // Routmessage.forEach(row => {

  //   row.component = lazyLoading(row.component)
  //   row.children.forEach(rowChildren => {
  //     rowChildren.component = lazyLoading(rowChildren.component)
  //   });

  //   RoutList.push(row)
  // });
  return routes
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {

    return new Promise((resolve, reject) => {
      GetAllRoute().then(res => {
        let rou = formatRoute(res)
        rou = filterAsyncRoutes(rou, roles) || []
        commit('SET_ROUTES', rou)
        resolve(rou)
      }).catch(e => {
        reject(e)
      })

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
