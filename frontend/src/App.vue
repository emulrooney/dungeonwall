<script>
import { bus } from './main';
import Wall from './components/Wall.vue'
// import TopUI from './components/TopUI.vue'
import PanelEditor from './components/PanelEditor.vue'
import PanelViewer from './components/PanelViewer.vue'

import axios from "axios"

export default {
  name: 'App',
  components: {
    // TopUI,
    Wall,
    PanelViewer,
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
      },
      maxPanels: 25
    }
  },
  computed: {
    currentIdList: function() {
      return this.loaded.data.map(panel => panel.id);
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
    addPanel: function(panelData) {
      //TODO Validate.
      for (let i = 0; i < this.maxPanels; i++) {
        if (!this.currentIdList.includes(i)) {
          panelData.id = i;

          this.loaded.data.push(panelData);
          this.rerenderWall();
          return;
        }
      }

      console.log("Couldn't add panel... too many on the wall.");
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

    bus.$on('save-panel', (panelData, editorMode) => {
      if (editorMode == "Create") {
        this.addPanel(panelData);
      } else if (editorMode == "Edit") {
        this.updatePanel(panelData);
      }
      //TODO Error handling - show a msg, but don't close the modal.
      vm.$bvModal.hide('editorModal'); 
      this.rerenderWall();
    });

    bus.$on('create-panel', (panelData) => {
      this.newPanel(panelData);
    });
  }
}

</script>

<template>
  <div id="app">
    <!-- <TopUI /> -->
    <Wall v-if="this.loaded.data != undefined && this.loaded.data.length > 0" :wallData="this.loaded.data" wallTitle="Slippers, Human Monk Level 5" :isEditMode="true" :key="wallUpdates" />
    <div v-else>
      <p>Loading...</p>
    </div>

    <PanelViewer :panelData="activePanel" /> 
    <PanelEditor :panelData="activePanel" />

  </div>

</template>