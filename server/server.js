const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});


let randomNumber;

let guessHistory = [];

let count = 0;

let winnerGuesser='';


function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function generateNumberForGuess() {
  randomNumber = randomNumberGenerator(1, 25);
}

generateNumberForGuess();
console.log(randomNumber);


app.post ('/guess', (req, res) => {
  console.log('in POST /guess', req.body);
  let finalGuess = req.body;
  // console.log(finalGuess.guessKay);
  let thisGuess = new Guess(finalGuess.guessKay, finalGuess.guessJames, finalGuess.guessDez);
  // let thisGuess = []
  // console.log(thisGuess);
  guessHistory.push(thisGuess);
  // console.log(guessHistory);
  count ++;
  if (thisGuess.resultKay === 'correct') {
    winnerGuesser = 'Kay';
  } else if (thisGuess.resultJames === 'correct') {
    alert(`Congrats ${winner}`);
  } else if (thisGuess.resultDez === 'correct') {
    alert(`Congrats ${winner}`);
  }
  // guessHistory.push(re)
  res.sendStatus(201);
})

function Guess(kay, james, dez) {
  this.guessKay = kay;
  this.resultKay = compareGuess(kay);
  this.guessJames = james;
  this.resultJames = compareGuess(james);
  this.guessDez = dez;
  this.resultDez = compareGuess(dez);
  
};

function compareGuess(guess) {
  if (guess>randomNumber) {
    return 'high';
  } else if (guess<randomNumber){ 
    return 'low';
  } else {
    return 'correct';

  }
}


app.get('/guess-history', (req, res) => {
  console.log('in GET /guess-history');
  let objectToSend = {
    history: guessHistory,
    round: count,
    winner: winnerGuesser,
  }
  
  res.send(objectToSend);

  if (objectToSend.winner !== '') {
    count = 0;
    guessHistory = [];
    winnerGuesser = '';
    generateNumberForGuess();
    console.log(randomNumber);
  }
})