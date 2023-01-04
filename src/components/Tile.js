export default class Tile {
  constructor(letter, status) {
    this.letter = letter;
    this.status = status; // one of absent, present, correct, default, empty
  }

  validate(currentGuess, theWord) {
    // TODO: Handle duplicate letters
    this.status = theWord.includes(this.letter) ? 'present' : 'absent';
    if (currentGuess.indexOf(this.letter) == theWord.indexOf(this.letter)) {
      this.status = 'correct';
    }
  }

  fill(key) {
    this.letter = key.toLowerCase();
    this.status = 'default';
  }

  empty() {
    this.letter = '';
    this.status = 'empty';
  }
}

