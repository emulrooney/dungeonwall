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
            panelTypeSelect: [
                {value: "item", text: "Item Ability or Feature"},
                {value: "class", text: "Class Ability or Feature"},
                {value: "race", text: "Racial Bonus"},
                {value: "skill", text: "Skill"},
                {value: "misc", text: "Miscellaneous"},
                {value: "neutral", text: "None"},

            ],
            editTitleActive: false,
            awaitingSaveResponse: false
        }
    },
    computed: {
        editorMode: function() {
            return this.panelData.id < 0 ? "Create" : "Edit"; 
        },
        renderedMarkdown: function() {
            if (this.markdown.length > 0)
                return this.markdown;

            return "Panel body can accept any valid markdown.";
        }
    },
    methods: {
        savePanel: function() {
            this.panelData.body = this.markdown; //Manually update; required due to use of vue-showdown
            bus.$emit("save-panel", this.panelData, this.editorMode);
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
    }
}

</script>

<template>
    <b-modal id="editorModal" size="xl" :title="panelData.title" content-class="enforced-height--max" modal-class="backdrop--opaque">
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
            <b-form-select v-model="panelData.panelType" :options="panelTypeSelect"></b-form-select>
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