<template>
  <div :style="{width:getHeight(width),height:getHeight(height)}" class="mbox">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Mbox',
  props: {
    height: {
      type: [String, Number],
      default: '100%'
    },
    width: {
      type: [String, Number],
      default: '100%'
    }
  },
  methods: {
    getHeight(val) {
      console.log(typeof val)
      if (typeof val == 'number') return val + 'px'
      else return val
    }
  },
}
</script>
<style scoped>
.mbox {
  border: 1px solid;
  background-color: white;
}
</style>
