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

const store = new Vuex.Store({
  state: {
    elementUpdates: { "ui": 0, "wall": 0.1 },
    wallTitle: "Untitled Wall",
    wallColor: "#363636",
    panels: {},
    panelOrder: [],
    dirtyContent: {}
  },
  mutations: {
    updateActiveWall(state, wallData) {
      state.wallTitle = wallData.title ?? state.wallTitle
      state.panels = wallData.panels ?? state.panels
      state.panelOrder = wallData.panelOrder ?? state.panelOrder
    },
    updateDirtyContent(state, dirtyData) {
      if (dirtyData.panelOrder) {
        state.panelOrder = dirtyData.panelOrder;
      }

      for (const [key, value] of Object.entries(dirtyData)) {
        state.dirtyContent[key] = value;
        state.elementUpdates["ui"]++; //Force update for sake of 'Save Changes' button.
      }
    },
    clearDirtyContent(state) {
      state.dirtyContent = {};
    },
    async saveWallContent(state) {
      let that = this;
      await axios.put("http://localhost:3000/wall/605e874fee94445c5d577bd1", state.dirtyContent)
        .then(function () {
          that.commit("clearDirtyContent");
          Vue.$toast.success("Wall successfully updated.");
        }).catch(function () {
          Vue.$toast.error("Couldn't update wall.");
        });
    },
    deletePanel(state, panelId) {
      let panelIndex = state.panels.map(function (p) { return p.id; }).indexOf(panelId);
      state.panels.splice(panelIndex, 1);
      state.elementUpdates["wall"]++;
    },
    forceComponentUpdate(state, components) {
      components.forEach((key) => {
        if (key in state.elementUpdates)
          state.elementUpdates[key]++;
      });
    }
  }
});

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')