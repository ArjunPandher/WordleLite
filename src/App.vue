<template>
  <WordleLite 
    msg="Welcome to WordleLite"
    :guesses-allowed=5
    :word-length=4
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
