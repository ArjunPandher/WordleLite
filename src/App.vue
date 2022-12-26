<template>
  <WordleLite 
    :guesses-allowed=5
  />
</template>

<script>
import WordleLite from './components/WordleLite.vue'

export default {
  name: 'App',
  components: {
    WordleLite
  }
}
</script>

<style>

html, body {
  background-color: #101010;
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  place-items: center;
  display: grid;
}
</style>
