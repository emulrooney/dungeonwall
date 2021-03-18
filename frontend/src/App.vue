<script>
import { bus } from './main';
import Wall from './components/Wall.vue'
import TopUI from './components/TopUI.vue'
import axios from "axios"

export default {
  name: 'App',
  components: {
    TopUI,
    Wall
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
    }
  },
  created: function() {
    bus.$on('panel-opened', (panelId) => {
      console.log("Panel opened! " + panelId);
    });
  }
}
</script>

<template>
  <div id="app">
    <TopUI />
    <Wall v-if="this.loaded.data != undefined && this.loaded.data.length > 0" :wallData="this.loaded.data" wallTitle="Player Wall" :isEditMode="true" />
    <div v-else>
      <p>Loading...</p>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>