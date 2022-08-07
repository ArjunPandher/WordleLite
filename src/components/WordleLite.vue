<template>
  <div>
    {{ this.msg }}
  </div>

  <div 
    id="game"
  >
    <template v-for="row in board" :key="row">
      <div class="row">
        <template v-for="tile in row" :key="tile">
          <div class="tile">{{ tile.letter }}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>

import Tile from './Tile.js';

export default {
  name: 'WordleLite',
  props: {
    msg: String,
    guessesAllowed: Number,
    wordLength: Number,
  },
  methods: {
    onKeyPress: function(key) {
      if (/^[A-z]$/.test(key) && this.rowIndex <= this.guessesAllowed-1) { 
        // [this.tileIndex].letter = key;
        
        for (let tile of this.currentRow()) {
          if (!tile.letter) {
            tile.fill(key);
            break;
          }
        }

        if (this.tileIndex === this.wordLength-1) {
          this.rowIndex++;
          this.tileIndex = 0;
        } else {
          this.tileIndex++;
        }
      }
    },
    currentRow: function() {
      return this.board[this.rowIndex];
    }
  },
  data() {
    return {
      board: [],
      rowIndex: 0,
      tileIndex: 0,
    }
  },
  mounted() {
    this.board = Array.from({ length: this.guessesAllowed }, () => 
        Array.from({ length: this.wordLength }, () => new Tile('', 'INCORRECT'))
      );

    document.addEventListener('keyup', (e) => {
      this.onKeyPress(e.key);
    })
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
