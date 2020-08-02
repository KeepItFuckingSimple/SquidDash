import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes.js'
import VueMqtt from 'vue-mqtt';


Vue.use(VueMqtt, 'ws://broker.hivemq.com:8000', {clientId: 'WebClient-' + parseInt(Math.random() * 100000),path:"/mqtt"});
Vue.config.productionTip = false
Vue.config.runtimeCompiler = false



const router = new VueRouter({routes});


Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');