<template>
  <div>
    <div class="">
      <div>

      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
// import { Navbar, AppMain,Sidebar } from './components'
export default {
  name: 'Display',
  components: {
    Navbar,
    AppMain,
    Sidebar
  },
  computed: {
  },
  methods: {

  },
}
</script>
