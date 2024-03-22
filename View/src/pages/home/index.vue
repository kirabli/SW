<template>
  <div>
    <m-form>
      <m-row>
        <el-col :span="3"> &nbsp;</el-col>
        <MInput v-model="xlog.log" /><el-button @click="save">添加</el-button>
        <el-button @click="toManage">管理</el-button>
      </m-row>
    </m-form>
    <div class="listp">
      <p v-for="(item,index) in list" :key="index">{{item.log}}</p>
    </div>
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
      }, list: []
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    save() {
      CreateXlog(this.xlog).then(res => {
        this.search()
      }).catch(e => { console.log(e) })
    },
    search() {
      var param = {
        SkipCount: 0,
        MaxResultCount: 1000
      }
      GetAllListXlog(param).then(res => {
        console.log(res)
        this.list = res.items
      }).catch(e => { console.log(e) })
    },
    toManage() {
      this.$router.push('/dashboard')
    }
  },
  created() {
    this.search()
  }
}

</script>

<style scoped lang="scss">
.listp {
  text-align: center;
  & p {
    // display: inline-block;
  }
}
</style>