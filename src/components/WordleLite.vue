<template>
  <div>
    Welcome to WordleLite!
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

  <output>
    {{ this.message }}
  </output>
</template>

<script>

import Tile from './Tile.js';

export default {
  name: 'WordleLite',
  props: {
    name: String,
    guessesAllowed: Number,
    wordLength: Number,
  },
  
  data() {
    return {
      board: [],
      rowIndex: 0,
      tileIndex: 0,
      theWord: "bird",
      gameState: "active", // active, complete
      message: "",
    }
  },

  methods: {

    onKeyPress: function(key) {
      if (/^[A-z]$/.test(key) && this.rowIndex <= this.guessesAllowed-1) { 
        this.fillTile(key);
      } else if (key == "Enter") {
        this.submitGuess();
      }
    },

    fillTile: function(key) {
      this.currentTile.fill(key);
    },

    submitGuess: function() {
      let guess = this.currentGuess;

      if (guess.length < this.wordLength) {
        return
      }

      if (guess == this.theWord) {
        this.message = "You Win!";
      } else if (this.rowIndex == this.guessesAllowed-1) {
        this.message = "Game Over.";
        this.gameState = "complete";
      } else {
        this.message = "Incorrect!";
        this.rowIndex++;
      }
    },

  },

  computed: {
    currentRow() {
      return this.board[this.rowIndex];
    },

    currentTile() {
      for (let tile of this.currentRow) {
        if (!tile.letter) {
          return tile;
        }
      }
      return "No current tile"
    },

    currentGuess() {
      return this.currentRow.map(tile => tile.letter).join("");
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
