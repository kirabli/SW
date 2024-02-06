<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu mode="vertical">
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>

import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data() {
    return {}
  },
  computed: {
    routes() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    }
  }
}
</script>
<style scoped>
</style>