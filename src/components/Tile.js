export default class Tile {
    constructor(letter, status) {
      this.letter = letter;
      this.status = status; // one of CORRECT, PRESENT, INCORRECT
    }
  
    fill(key) {
      this.letter = key.toLowerCase();
    }
  
    empty() {
      this.letter = '';
    }
  }