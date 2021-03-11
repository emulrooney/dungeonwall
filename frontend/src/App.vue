<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Wall wallTitle="Dungeon Master"/>
  </div>
</template>

<script>
import Wall from './components/Wall.vue'

export default {
  name: 'App',
  components: {
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
