<script>
import Muuri from 'muuri'

export default {
  name: 'Wall',
  props: {
    wallTitle: String,
    isEditMode: Boolean
  },
  mounted: function() {
    this.$nextTick(function() {
      //Default options here.
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
      <slot></slot>
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
