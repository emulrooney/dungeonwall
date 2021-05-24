<script>
import { bus } from '../main';
import axios from "axios";


export default {
    name: "PanelViewer",
    props: {
        panelData: Object
    },
    computed: {
        panelBody: function() {
            if (this.panelData.body.length > 0)
                return this.panelData.body;

            return "<em>(This panel has no body.)</em>";
        }
    },
    methods: {
        editPanel: function(panelId) {
          bus.$emit('edit-panel', [panelId]);
        },
        showDeletePrompt: function(panelId) {
          console.log("Prompt to delete" + panelId);
          bus.$emit("delete-panel", []);
        },
        deletePanel: async function(panelId) {
          if (!panelId) {
            console.log("Need panel ID;")
            return;
          }

          await axios.delete("http://localhost:3000/wall/605e874fee94445c5d577bd1" + panelId)
            .then(function (result) {
              console.log("Deleted " + panelId);
              console.log(result);
          });

          //Axios.delete for this panel.

          //Remove panel from panel order
          //Remove panel from panel data
        }

    }
}
</script>

<template>
    <b-modal button-size="lg" id="panelModal" :title="panelData.title">
      <template #modal-header>
        <h5 class="modal-title">{{panelData.title}} {{panelData.subtitle.length > 0 ? "-" : ""}} {{panelData.subtitle}}</h5>
        <b-button aria-label="Delete Panel" variant="outline-light" v-on:click="showDeletePrompt(panelData.id)">
          <i class="fas fa-trash-alt"></i>          
        </b-button>
      </template>
      <VueShowdown :markdown="panelBody" />
      <template #modal-footer="{ ok }">
        <b-button size="lg" variant="success" @click="ok()">
          OK
        </b-button>
        <b-button size="lg" v-on:click="editPanel(panelData.id)">
          Edit
        </b-button>
        <h5 class="position-absolute right--0 mr-3" v-if="panelData.bottomText.length > 0">{{panelData.bottomText}}</h5>
      </template>
    </b-modal>
</template>