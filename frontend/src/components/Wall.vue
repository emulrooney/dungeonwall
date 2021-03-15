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
  <div class="hello">
    <h1>{{ wallTitle }}</h1>
    <div class="wall js--muurify">
      <Panel v-for="panel in wallData" :key="panel.id" :panelId="panel.id" :title="panel.title" :subtitle="panel.subtitle" :bottomText="panel.bottomText">
        {{panel.body}}
      </Panel> 
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wall {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.panel {
  position: absolute;
  width: 600px;
  height: 200px;
  margin: 32px;
  background-color: orange;

  text-align: left;
}

.panel__content {
  padding: 8px 16px;
}

.w1 {
  width: 200px;
}

.w2 {
  width: 400px;
}

.w3 {
  width: 600px;
}

.h1 {
  height: 200px;
}

.h2 {
  height: 400px;
}

.h3 {
  height: 600px;
}

.panel__full {
  display: none;
}

</style>
