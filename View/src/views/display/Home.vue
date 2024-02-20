<template>
  <div>
    <m-form>
      <MInput v-model="xlog.log" /><el-button @click="Search">Home</el-button>
      <el-button @click="toManage">Manage</el-button>

    </m-form>
  </div>
</template>

<script>
import { GetAllListXlog, CreateXlog } from '@/api/xlog.js'
export default {
  name: 'Board',
  data() {
    return {
      xlog: {
        log: ''
      }
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    Search() {
      CreateXlog(this.xlog).then(res => {
        console.log(res)
      }).catch(e => { console.log(e) })
    },
    toManage() {
      this.$router.push('/manage')
    }
  }
}

</script>

<style scoped>
</style>
