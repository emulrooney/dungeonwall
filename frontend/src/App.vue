<script>
import { bus } from './main';
import Wall from './components/Wall.vue'
import TopUI from './components/TopUI.vue'
import PanelEditor from './components/PanelEditor.vue'

import axios from "axios"

export default {
  name: 'App',
  components: {
    TopUI,
    Wall,
    PanelEditor
  },
  mounted: async function() {
    this.loaded = await this.loadWall(0);
  },
  data: function() {
    return {
      loaded: [],
      activePanel: {
        id: -1,
        title: "",
        subtitle: "",
        body: "Loading...",
        bottomText: ""
      }
    }
  },
  methods: {
    loadWall: function(wallIndex) {
      console.log("Loading wall #" + wallIndex);
      let wallData = axios.get("http://localhost:3000/debug")
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        console.log(error);
        return {data: []};
      });

      return wallData;
    },
    newPanel: function() {
      bus.$emit('add-panel', []);
    },
    editPanel: function(panelId) {
      bus.$emit('edit-panel', [panelId]);
    }
  },
  created: function() {
    const vm = this;
    bus.$on('panel-opened', (panelId) => {
      vm.$bvModal.hide('editorModal');
      vm.$bvModal.show('panelModal');
      this.activePanel = this.loaded.data[panelId];
    });

    bus.$on('add-panel', () => {
      console.log("Got add panel event");

      vm.$bvModal.hide('panelModal');
      vm.$bvModal.show('editorModal');      
    });
    
    bus.$on('edit-panel', () => {
      vm.$bvModal.hide('panelModal');
      vm.$bvModal.show('editorModal');
    });
  }
}

</script>

<template>
  <div id="app">
    <TopUI />
    <Wall v-if="this.loaded.data != undefined && this.loaded.data.length > 0" :wallData="this.loaded.data" wallTitle="Slippers, Human Monk Level 5" :isEditMode="true" />
    <div v-else>
      <p>Loading...</p>
    </div>

    <b-modal id="panelModal" :title="activePanel.title">
      {{activePanel.body}}
    </b-modal>

    <PanelEditor :panelData="activePanel" />

  </div>

</template>