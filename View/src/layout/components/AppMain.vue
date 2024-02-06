<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">

      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script>

export default {
  name: 'AppMain',
  data() {
    return {}
  },
  computed: {
    key() { return this.$route.path }
  }
}
</script>
<style scoped>
.app-main {
  height: 100vh;
  display: block;
  overflow: hidden;
  /* background-color: #e1e1e1; */
}
</style>