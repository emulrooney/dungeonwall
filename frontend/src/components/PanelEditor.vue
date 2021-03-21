<script>
import { bus } from '../main';
import axios from "axios"

export default {
    name: 'PanelEditor',
    props: {
        panelData: Object
    },
    data: function() {
        return {
            markdown: "",
            panelSizeSelect: [
                {value: "small", text: "Small"},
                {value: "medium", text: "Medium"},
                {value: "large", text: "Large"}
            ],
            editTitleActive: false,
            awaitingSaveResponse: false
        }
    },
    methods: {
        savePanel: function() {
            this.panelData.body = this.markdown; //Manually update; required due to use of vue-showdown
            bus.$emit("save-panel", this.panelData);
        },
        submitPanelUpdate: async function() {
            this.awaitingSaveResponse = true;
            await axios.post("http://localhost:3000/wall/0/" + this.panelData.id, this.panelData).then((result) => {
                console.log("Success");
                console.log(result);
            }).catch(() => {
                console.log("Couldn't submit... try again later."); //TODO Need error posting system
            });
            this.awaitingSaveResponse = false;
        }
    },
    computed: {
        renderedMarkdown: function() {
            if (this.markdown.length > 0)
                return this.markdown;

            return "Panel body can accept any valid markdown.";
        }
    }
}

</script>

<template>
    <b-modal id="editorModal" size="xl" :title="panelData.title">
        <template #modal-header>
            <h5 v-if="!editTitleActive" class="modal-title">{{panelData.title}}</h5>
            <b-form-input class="w-50" v-if="editTitleActive" v-model="panelData.title" placeholder="Panel Title"></b-form-input>
            <b-button v-on:click="editTitleActive = !editTitleActive" :pressed="editTitleActive">
                {{editTitleActive ? "Save" : "Edit"}}    
            </b-button>
        </template>

        <textarea class="w-50" v-model="markdown"></textarea>
        <VueShowdown class="w-50 float-right pl-4" :markdown="renderedMarkdown" />
        <!-- <div class="w-100"> -->
            <b-form-select v-model="panelData.panelWidth" :options="panelSizeSelect"></b-form-select>
            <b-form-select v-model="panelData.panelHeight" :options="panelSizeSelect"></b-form-select>
        <!-- </div> -->
        <template #modal-footer={close}>
            <b-button @click="close()">
                Cancel
            </b-button>
            <b-button v-on:click="savePanel()" :pressed="awaitingSaveResponse" :disabled="awaitingSaveResponse">
                Save
            </b-button>
        </template>
    </b-modal>
</template>