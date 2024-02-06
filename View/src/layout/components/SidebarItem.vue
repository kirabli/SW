<template>
  <div>
    <template v-if="hasOneShowingChild(item.children,item) && (onlyOneChild.noShowingChildren)&&!item.alwaysShow">

      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- <app-link :to="resolvePath(child.path)" v-for="child in item.children" :key="child.path">
        <el-menu-item :index="resolvePath(child.path)" :class="{'submenu-title-noDropdown':!isNest}">

          <item :icon="child.meta.icon||(child.meta&&child.meta.icon)" :title="child.meta.title" />
        </el-menu-item>
      </app-link> -->
      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import path from 'path'
import Item from './Item'
import AppLink from './Link'
export default {
  name: 'SidebarItem',
  components: { Item, AppLink, SidebarItem },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {},
  methods: {
    myroutePath(routePath) {
      var deptId = undefined
      var routePathNew = routePath
      if (this.queryUrl('DeptId') !== false) {
        deptId = Number(this.queryUrl('DeptId'))
        routePathNew = routePath + '?DeptId=' + deptId
      }
      return routePathNew
    },
    hasOneShowingChild(children = [], parent) {
      console.log('hasOneShowingChild', children, parent)
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      console.log(this.onlyOneChild, showingChildren)
      // 是否只用一个的时候自动隐藏
      // if (showingChildren.length === 1) {
      //   return true
      // }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        console.log(this.onlyOneChild, parent)
        return true
      }
      if (showingChildren.length === 1) {
        this.onlyOneChild = { ...parent, noShowingChildren: true }
        this.onlyOneChild.meta = showingChildren[0].meta
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>
