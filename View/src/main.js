import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import GlobalFun from '@/utils/GlobalFun.js'
import '@/style/index.scss' // global css
Vue.use(ElementUI);
Vue.use(GlobalFun);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
