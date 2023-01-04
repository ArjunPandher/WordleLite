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

<!-- <style>

:root {
    --correct-color: #47d747;
    --present-color: #f7f749;
    --absent-color: #888;
    --invalid-color: #ff3f3f;
}

html, body {
    height: 100%;
}

body {
    display: grid;
    place-items: center;
    background-color: #0e1626;
    color: white;
    margin: 0;
    font-family: Poppins, sans-serif;
}

h1 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
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

#app:before {
    content: '';
    display: block;
    position: absolute;
    inset: -7px;
    background-image: linear-gradient(138deg, #6ba0e2 -20%, #131e32 105%);
    z-index: -1;
    border-radius: 25px;
}

</style> -->
