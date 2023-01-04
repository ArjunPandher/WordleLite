<template>
  <div id="title">
    Welcome to WordleLite!
  </div>

  <div 
    id="game"
  >
    <template v-for="(row, index) in board" :key="row">
      <div class="row" :class="{current: index==this.rowIndex}">
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
        Array.from({ length: this.theWord.length }, () => new Tile('', 'empty'))
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
<!-- <style scoped>
.row {
  display: flex;
  justify-content: center;
}

.row.current .tile:empty:first-of-type {
  animation: fade 2s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}

@keyframes fade {
  50% {
      background: rgba(255, 255, 255, .05)
  }
}

.tile {
  outline: 1px solid rgba(73, 110, 158, 0.1);
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: 600;
  text-transform: uppercase;
  color: #496e9e;
}

.row.invalid .tile, .tile.invalid {
  color: var(--invalid-color);
  text-shadow: 0 0 12px rgba(246, 38, 38, 0.42);
}

.tile.correct {
  color: var(--correct-color);
  text-shadow: 0 0 12px rgba(38, 246, 110, 0.42);
}

.tile.present {
  color: var(--present-color);
  text-shadow: 0 0 12px rgba(246, 171, 38, 0.42);
}

#keyboard {
  margin-top: 2rem;
}

.key.correct {
  background: var(--correct-color);
}

.key.present {
  background: var(--present-color);
}

.key.absent {
  background: var(--absent-color);
}

.key {
  background: #c5c5c5;
  border: 0;
  margin: 2px;
  height: 50px;
  min-width: 40px;
  border-radius: 4px;
}

header {
  position: relative;
}

output {
  display: block;
  font-weight: 500;
  font-style: italic;
  font-size: 17px;
  margin-top: 1rem;
  position: absolute;
  top: 0;
  right: -1.5rem;
  width: 150px;
}

output:empty {
  display: none;
  color: #496e9e;
}

#title {
  font-size: 1.3rem;
  color: whitesmoke;
  margin-bottom: 1rem;
}

</style> -->
