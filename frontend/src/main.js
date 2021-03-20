import Vue from 'vue'
import App from './App.vue'
import VueShowdown from 'vue-showdown'

//Bootstrap Vue stuff
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./style/style.css";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueShowdown)

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')