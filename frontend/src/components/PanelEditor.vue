<script>
//import { bus } from '../main';

export default {
    name: 'PanelEditor',
    props: {
        activePanelId: Number,
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
            editTitleActive: false
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
        <template #modal-header="{  }">
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
    </b-modal>
</template>