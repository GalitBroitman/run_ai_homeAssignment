<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/tabsWrapper"></router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
    };
  },
  methods: {
  
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
