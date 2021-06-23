<script>
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
          this.$root.$emit('edit-panel', [panelId]);
        },
        showDeletePrompt: function() {
          this.$root.$emit("delete-panel", []);
        }

    }
}
</script>

<template>
    <b-modal button-size="lg" id="panelModal" :title="panelData.title">
      <template #modal-header>
        <h5 class="modal-title">{{panelData.title}} {{panelData.subtitle.length > 0 ? "-" : ""}} {{panelData.subtitle}}</h5>
        <b-button aria-label="Delete Panel" variant="outline-light" v-on:click="showDeletePrompt()">
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