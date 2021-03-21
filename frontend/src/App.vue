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
      wallUpdates: 0,
      loaded: {},
      activePanel: {
        id: -1,
        title: "New Panel",
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
    },
    resetActivePanel: function() {
      this.activePanel = {
        id: -1,
        title: "New Panel",
        subtitle: "",
        body: "",
        bottomText: ""
      };
    },
    updatePanel: function(panelData) {
      let updated = this.loaded.data.find(panel => panel.id == panelData.id);

      if (updated != null) {
        this.loaded.data[panelData.id] = panelData;
      } else {
        console.log("Couldn't update panel. :( ");
      }
    },
    rerenderWall: function() {
      this.wallUpdates++;
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
      this.resetActivePanel();
      vm.$bvModal.hide('panelModal');
      vm.$bvModal.show('editorModal');      
    });
    
    bus.$on('edit-panel', () => {
      vm.$bvModal.hide('panelModal');
      vm.$bvModal.show('editorModal');
    });

    bus.$on('save-panel', (panelData) => {
      this.updatePanel(panelData);
      this.rerenderWall();
    });
  }
}

</script>

<template>
  <div id="app">
    <TopUI />
    <Wall v-if="this.loaded.data != undefined && this.loaded.data.length > 0" :wallData="this.loaded.data" wallTitle="Slippers, Human Monk Level 5" :isEditMode="true" :key="wallUpdates" />
    <div v-else>
      <p>Loading...</p>
    </div>

    <b-modal button-size="lg" id="panelModal" :title="activePanel.title">
      <VueShowdown :markdown="activePanel.body" />
      <template #modal-footer="{ ok }">
        <b-button size="lg" variant="success" @click="ok()">
          OK
        </b-button>
        <b-button size="lg" v-on:click="editPanel(activePanel.id)">
          Edit
        </b-button>
      </template>
    </b-modal>

    <PanelEditor :panelData="activePanel" />

  </div>

</template>