<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardEditor',
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
