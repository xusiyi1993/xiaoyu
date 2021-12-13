import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElTreeSelect from 'el-tree-select';
import '../src/style/base.css'
import './plugin/filters'
import less from 'less'

import router from './router'
import App from './App.vue'
import Mixins from './mixins/index'
import Request from './utils/axios'
import store from './store/index'
// // 导入格式化时间的插件
// import moment from 'moment';
// // 定义全局过滤器
// Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
//   return moment(dataStr).format(pattern);
// })

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Mixins);
Vue.use(less);
Vue.use(ElTreeSelect);

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

new Vue({
  axios: Request,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
