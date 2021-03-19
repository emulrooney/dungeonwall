<script>
//import { bus } from '../main';

export default {
    name: 'PanelEditor',
    props: {
        activePanelId: Number,
        panelData: Object
    }
}
</script>

<template>
    <b-modal id="editorModal" title="New Panel">
    </b-modal>
</template>