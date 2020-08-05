import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes.js'
Vue.config.productionTip = false
Vue.config.runtimeCompiler = false



const router = new VueRouter({routes});


Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

