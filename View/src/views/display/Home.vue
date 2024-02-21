<template>
  <div>
    <m-form>
      <m-row>
        <el-col :span="3"> &nbsp;</el-col>
        <MInput v-model="xlog.log" /><el-button @click="Search">Home1</el-button>
        <el-button @click="toManage">Manage</el-button>
      </m-row>
    </m-form>
    <div style="text-align: center;">
      <p v-for="(item,index) in list" :key="index">{{item.log}}</p>
    </div>
  </div>
</template>

<script>
import { GetAllListXlog, CreateXlog } from '@/api/xlog.js'
import MRow from '../../components/form/MRow.vue'
export default {
  name: 'Board',
  data() {
    return {
      xlog: {
        log: ''
      }, list: []
    }
  },
  components: {
    MRow
  },
  computed: {
  },
  methods: {
    Search() {
      CreateXlog(this.xlog).then(res => {
        console.log(res)
        var param = {
          SkipCount: 0,
          MaxResultCount: 1000
        }
        GetAllListXlog(param).then(res => {
          console.log(res)
          this.list = res.items
        }).catch(e => { console.log(e) })
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
