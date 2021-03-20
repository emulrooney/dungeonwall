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
            markdown: ""
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
    <b-modal id="editorModal" size="xl" title="New Panel">
        <textarea class="w-50" v-model="markdown"></textarea>
        <VueShowdown class="w-50 float-right pl-4" :markdown="renderedMarkdown" />
    </b-modal>
</template>