export default class Tile {
  constructor(letter, status, index) {
    this.letter = letter;
    this.status = status; // one of absent, present, correct, default, empty
    this.index = index; // index of tile in row
  }

  // validate entire row of tiles
  static validateRow(row, theWord) {
    for (let tile of row) {
      tile.validate(theWord);
    }

    row.filter((tile) => {
      return tile.status == 'present' && row.some(
        (t) => t.letter == tile.letter && t.status == "correct"
      )
    }).forEach((tile) => tile.status = "absent");
  }

  validate(theWord) {
    if (!theWord.includes(this.letter)) return this.status = 'absent';

    if (this.letter == theWord[this.index]) {
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

