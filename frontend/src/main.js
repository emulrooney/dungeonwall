import Vue from 'vue'
import App from './App.vue'

//VueX
import Vuex from 'vuex'
Vue.use(Vuex)

//Axios
import axios from "axios";

//Bootstrap Vue stuff
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./style/style.css";
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Vue Showdown
import VueShowdown from 'vue-showdown'
Vue.use(VueShowdown)

Vue.config.productionTip = false

export const bus = new Vue(); //TODO dump this

const store = new Vuex.Store({
  state: {
    wallTitle: "Untitled Wall",
    panels: {},
    dirtyContent: {}
  },
  mutations: {
    updateActiveWall(state, wallData) {
      state.wallTitle = wallData.title ?? state.wallTitle
      state.panels = wallData.panels ?? state.panels
    },
    updateDirtyContent(state, dirtyData) {
      console.log(dirtyData);
      for (const [key, value] of Object.entries(dirtyData)) {
        state.dirtyContent[key] = value;
        console.log(state.dirtyContent);
      }
    },
    clearDirtyContent(state) {
      console.log("Clearing...");
      state.dirtyContent = {};
    },
    async saveWallContent(state) {
      let that = this;
      console.log("Saving...")
      await axios.put("http://localhost:3000/wall/605e874fee94445c5d577bd1", state.dirtyContent)
        .then(function () {
          that.commit("clearDirtyContent");
        }).catch(function (err) {
          console.log(err);
        });
    }
  }
});

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')