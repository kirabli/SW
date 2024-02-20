<template>
  <div>
    <m-form>
      <MInput /><el-button @click="Search">Board</el-button>
      <el-button @click="toHome">Home</el-button>
    </m-form>
  </div>
</template>

<script>
import { GetAllListXlog } from '@/api/xlog.js'
export default {
  name: 'Board',
  components: {
  },
  computed: {
  },
  methods: {
    Search() {
      var param = {
        SkipCount: 0,
        MaxResultCount: 10
      }
      GetAllListXlog(param).then(res => {
        console.log(res)
      }).catch(e => { console.log(e) })
    },
    toHome() {
      this.$router.push('/home')
    }
  }
}

</script>

<style scoped>
</style>
