<template>
  <div id="title">
    Welcome to WordleLite!
  </div>

  <div 
    id="game"
  >
    <template v-for="row in board" :key="row">
      <div class="row">
        <template v-for="tile in row" :key="tile">
          <div class="tile" :class="[tile.status]">{{ tile.letter }}</div>
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

  computed: {
    currentRow() {
      return this.board[this.rowIndex];
    },

    currentGuess() {
      return this.currentRow.map(tile => tile.letter).join("");
    },

    remainingGuesses() {
      return this.guessesAllowed - this.rowIndex - 1;
    }
  },

  mounted() {
    this.board = Array.from({ length: this.guessesAllowed }, () => 
        Array.from({ length: this.theWord.length }, () => new Tile('', 'default'))
      );

    document.addEventListener('keyup', (e) => {
      this.onKeyPress(e.key);
    })
  },

  methods: {
    onKeyPress: function(key) {
      this.message = ""

      // check if entered key is an alphanumeric
      if (/^[A-z]$/.test(key) && this.rowIndex <= this.guessesAllowed-1) { 
        this.fillTile(key);
      } else if (key == "Enter") {
        this.submitGuess();
      } else if (key == "Backspace") {
        this.emptyTile();
      }
    },

    fillTile: function(letter) {
      for (let tile of this.currentRow) {
        if (!tile.letter) {
          tile.fill(letter);
          return;
        }
      }
    },

    emptyTile: function() {
      for (let tile of [...this.currentRow].reverse()) {
        if (tile.letter) {
          tile.empty();
          return;
        }
      }
    },

    submitGuess: function() {
      if (this.currentGuess.length < this.theWord.length) {
        return
      }

      // validate each letter in the guess
      for (let tile of this.currentRow) {
        tile.validate(this.currentGuess, this.theWord);
      }

      if (this.currentGuess == this.theWord) {
        this.gameState = "complete";
        return this.message = "You Win!";
      }
      if (this.remainingGuesses == 0) {
        this.gameState = "complete";
        return this.message = "Game Over.";
      }

      this.message = "Incorrect!";
      this.rowIndex++;
    }

  },
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
  outline: 2px whitesmoke;
  outline-style: solid;
  background-color: #101010;
  color: whitesmoke;
}

.tile.absent {
  background-color: grey;
}

.tile.present {
  background-color: yellow;
  color: black;
}

.tile.correct {
  background-color: green;
}

output {
  font-size: 1.5rem;
  text-align: center;
  display: block;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: whitesmoke;
}

#title {
  font-size: 1.3rem;
  color: whitesmoke;
  margin-bottom: 1rem;
}

</style>
