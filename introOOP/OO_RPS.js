const readline = require('readline-sync');

const prompt = (message) => console.log(`=> ${message}`);

function createPlayer() {
  return {
    move: null,
    pointsCounter : 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const movements = ['lizard', 'paper', 'rock', 'scissors', 'spock'];
      let choices = [];

      for (let idx = 0; idx < movements.length; idx++) {
        let currentMove = movements[idx];
        if (RSPGame.historyAnalysis('computer', currentMove) < 60) {
          choices.push(currentMove);
        }
        choices = choices.concat(movements);
      }

      let randomIndex = Math.floor(Math.random() * choices.length);

      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('');
        prompt('Please choose rock, scissors, paper, lizard or spock:');
        choice = readline.question().toLowerCase();

        if (['rock', 'paper', 'scissors', 'lizard', 'spock'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RSPGame = {
  human: createHuman(),
  computer: createComputer(),
  history: [], //0 human, 1 computer, 2 winner (idx = round).

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Lizard and Spock!');
  },

  executeRound() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    this.history.push([humanMove, computerMove]);
    console.clear();
    console.log(`You chose: ${this.human.move}`);
    console.log(`Computer chose: ${this.computer.move}`);

    if (this.identifyWinner(humanMove, computerMove) === 'human') {
      this.human.pointsCounter += 1;
      console.log('*** You win the round! ***');
    } else if (this.identifyWinner (humanMove, computerMove) === 'computer') {
      this.computer.pointsCounter += 1;
      console.log('*** Computer wins the round! ***');
    } else {
      console.log("*** It's a tie! ***");
    }
    this.history[this.history.length - 1]
      .push(this.identifyWinner(humanMove, computerMove));
  },

  identifyWinner(humanMove, computerMove) {
    if (humanMove === computerMove) {
      return 'tie';
    } else if ((humanMove === 'rock' && (computerMove === 'scissors' || computerMove === 'lizard')) ||
              (humanMove === 'paper' && (computerMove === 'rock' || computerMove === 'spock')) ||
              (humanMove === 'scissors' && (computerMove === 'paper' || computerMove === 'lizard')) ||
              (humanMove === 'lizard' && (computerMove === 'spock' || computerMove === 'paper')) ||
              (humanMove === 'spock' && (computerMove === 'rock' || computerMove === 'scissors'))) {
      return 'human';
    } else {
      return 'computer';
    }
  },

  historyAnalysis(player, move) {
    //nº of times the player chose the movement
    let allMove = this.history.filter(round => round[1] === move).length; 
    //nº of times the player lost when chose the movement
    let lossByMove = this.history.filter(round => round[1] === move && round[2] !== player && round[2] !== 'tie').length;
    return allMove > 0 ? (lossByMove * 100) / allMove : 0;
  },

  displayHistory() {
    let roundSumUp = {};
    for (let round = 0; round < this.history.length; round++) {
      roundSumUp['Round ' + Number(round + 1)] = {you: this.history[round][0], computer: this.history[round][1] ,winner: this.history[round][2]};
    }
    if (this.history.length !== 0) {
      console.log('Former moves:');
      console.log(roundSumUp);
    }
  },

  displayPoints() {
    console.log(' ');
    prompt(`Current points: You ${this.human.pointsCounter} - Computer ${this.computer.pointsCounter}`);
    console.log(' ');
  },

  displayGameWinner() {
    console.log('\n-----------------------------------\n');
    console.log('The game has ended.');
    console.log(`${this.human.pointsCounter > this.computer.pointsCounter ? 'You are' : 'Computer is'} the winner of the game!`);
    console.log('\n-----------------------------------\n');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Lizard and Spock. Goodbye!\n');
  },

  resetGame() {
    this.history = [];
    this.human.pointsCounter = 0;
    this.computer.pointsCounter = 0;
  },

  play() {
    while (true) {
      console.clear();
      this.resetGame();
      this.displayWelcomeMessage();
      while (true) {
        this.displayHistory();
        this.human.choose();
        this.computer.choose();
        this.executeRound();
        this.displayPoints();
        if (this.human.pointsCounter >= 5 ||
            this.computer.pointsCounter >= 5) break;
      }
      this.displayGameWinner();
      
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },

  playAgain() {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question();
    while (!['yes', 'no', 'y', 'n'].includes(answer.toLowerCase())) {
      prompt('Invalid answer, please type y or n');
      answer = readline.question();
    } 
    return (answer.toLowerCase()[0] === 'y') || (answer.toLowerCase() === 'yes');
  },
};


RSPGame.play();