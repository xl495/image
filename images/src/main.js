import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Http from "./util/http"; // axios 封装 js
Vue.prototype.$http = Http;
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import VueClipboard from 'vue-clipboard2'
Vue.use(ElementUI);
Vue.use(VueClipboard);
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
