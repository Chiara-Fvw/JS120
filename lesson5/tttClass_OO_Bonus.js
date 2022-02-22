let readline = require("readline-sync");
class Square {
  static UNUSUED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSUED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSUED_SQUARE;
  }
}

class Board {
  constructor() {
   this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  hotRow(adversary, player) {
    console.log(Square.UNUSUED_SQUARE);
    return TTTGame.POSSIBLE_WINNING_ROWS.filter(row => this.countMarkersFor(adversary, row) === 2 &&
                                                        this.countMarkersFor(player, row) === 0);
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    
    while (true) {
      this.playOneGame();
      if (!this.playAgain()) break;

      console.log("Let's play again!");
    };

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.board.reset();
    this.board.display();

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResults();    
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question("Play again (y/n)? ").toLowerCase();

      if (["y", "n"].includes(answer)) break;

      console.log("Sorry, that's not a valid choice. ");
      console.log("");
    }

    console.clear();
    return answer === "y";
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to Tic Tac Toe!`);
    console.log("");
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that is not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    
    let potentialRow = this.board.hotRow(this.computer, this.human);
    let dangerousRow = this.board.hotRow(this.human, this.computer);
    
    if (potentialRow.length > 0) {
      choice = potentialRow[0].filter(square => validChoices.includes(square))[0];
    } else if (dangerousRow.length > 0) {
      choice = dangerousRow[0].filter(square => validChoices.includes(square))[0];
    } else if (validChoices.includes('5')) {
      choice = '5'; 
    } else {
      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }
    
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratualtions!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won, I won! Take that human!");
    } else {
      console.log("A tie game... how boring.");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Tic Tac Toe! Goodbye!`);
  }

  static joinOr(validChoices, joint1 = ', ', joint2 = 'or') {
    if (validChoices.length === 1) {
      return validChoices[0];
    } else if (validChoices.length === 2) {
      return validChoices[0] + ' ' + joint2 + ' ' + validChoices[1];
    } else if (validChoices.length > 2) {
      let firstPart = validChoices.slice(0, - 1);
      let secondPart = validChoices[validChoices.length - 1];

      return `${firstPart.join(joint1)} ${joint2} ${secondPart}`;
    }
  }
}

let game = new TTTGame(); 
game.play();


/* 
-   If any square is a potential winner
    -   Pick that square.
-   Else if any square is at risk, pick that square.
    -   Pick that square.
-   Else:
    -   Pick a random square.


*/