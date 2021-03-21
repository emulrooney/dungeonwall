<script>
import { bus } from '../main';

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
        }
    }
}
</script>

<template>
    <b-modal button-size="lg" id="panelModal" :title="panelData.title">
      <VueShowdown :markdown="panelBody" />
      <template #modal-footer="{ ok }">
        <b-button size="lg" variant="success" @click="ok()">
          OK
        </b-button>
        <b-button size="lg" v-on:click="editPanel(panelData.id)">
          Edit
        </b-button>
      </template>
    </b-modal>
</template>