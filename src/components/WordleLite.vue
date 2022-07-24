<template>
  <div>
    {{ this.msg }}
  </div>

  <div id="board">
    <template v-for="tileRow in guessesAllowed" :key="tileRow">
      <div class="row">
        <template v-for="tileTile in wordLength" :key="tileTile">
          <div class="tile"></div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'WordleLite',
  props: {
    msg: String,
    guessesAllowed: Number,
    wordLength: Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}

.tile {
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 2px black;
  outline-style: solid;
  background-color: rebeccapurple;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
