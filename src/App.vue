<template>
  <div id="app">
    <nav class="menu">
      <router-link :to="key" v-for="(item, key) in menu" :key="key">{{ item }}</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menu: {
          'animated-slider': 'Animated Slider'
        }
      }
    }
  }
</script>

<style lang="less">
  body {
    margin: 0;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  }
  a {
    text-decoration: none;
  }
  .menu {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 999;
    border-bottom: 1px solid lightgray;
  }
</style>
