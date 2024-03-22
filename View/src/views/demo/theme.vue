<template>
  <div>
    <div id='content'>
      <p @click="changeTheme('')">default</p>
      <p @click="changeTheme('theme1')">theme1</p>
      <p @click="changeTheme('theme2')">theme2</p>
      <p @click="changeTheme('theme3')">theme3</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  components: {
  },
  computed: {
  },
  methods: {
    changeTheme(theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    },
  }
}

</script>
