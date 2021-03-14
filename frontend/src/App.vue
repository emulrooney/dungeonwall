<template>
  <div id="app">
    <TopUI />
    <Wall wallTitle="Dungeon Master" :isEditMode="true">
      <Panel title="Unarmored Defense" :panelId="0" />
      <Panel title="Second Panel" :panelId="1" />
    </Wall>
  </div>
</template>

<script>
import Wall from './components/Wall.vue'
import Panel from './components/Panel.vue'
import TopUI from './components/TopUI.vue'

export default {
  name: 'App',
  components: {
    TopUI,
    Panel,
    Wall
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
