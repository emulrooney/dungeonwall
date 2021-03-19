<script>
import Muuri from 'muuri'
// eslint-disable-next-line no-unused-vars
import Panel from './Panel.vue'

export default {
  name: 'Wall',
  components: {
    Panel
  },
  props: {
    wallData: Array,
    wallTitle: String,
    isEditMode: Boolean
  },
  mounted: function() {
    this.$nextTick(function() {
      new Muuri('.js--muurify', {
        dragEnabled: this.isEditMode
      });
    });
  }
}
</script> 

<template>
  <div>
    <h1 class="text-center">{{ wallTitle }}</h1>
    <div class="wall js--muurify">
      <Panel v-for="panel in wallData" :key="panel.id" :width="panel.panelWidth" :height="panel.panelHeight" :panelData="panel" :panelId="panel.id" />
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
