// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Let's play some scrabble! Enter a word:");
  scorerPrompt(word);
}

const simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: function(word) {
    return word.length;
  }

};
const vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: function(word) {
    word = word.toUpperCase();
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    let score = 0;
    for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        score += 3;
      } else {
        score++;
      }
    }
    return score;
  }

};
const oldScrabbleScorerConst = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: function(word) {


    return scrabbleScore(word);
  }

};



function scrabbleScore(word) {
  word = word.toLowerCase();
  let score = 0;
  for (i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

const scoringAlgorithms = [simpleScore, vowelBonusScore, oldScrabbleScorerConst];

function scorerPrompt(word) {
  let validInput = false;
  let scoringType = "";
  while (!validInput) {
    scoringType = input.question('Which scoring algorithm would you like to use? \n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ');
    scoringType = Number(scoringType);
    if (scoringType === 0 || scoringType === 1 || scoringType === 2) {
      validInput = true;
    }
  }
  console.log(`Score for '${word}' : ${scoringAlgorithms[scoringType].scorerFunction(word)} `);
}

function transform() {
  let newPointStructure = {};
  let letter = "";
  for (score in oldPointStructure) {
    for (i = 0; i < oldPointStructure[score].length; i++) {
      letter = oldPointStructure[score][i].toLowerCase();
      newPointStructure[letter] = Number(score);
    }
  }
  newPointStructure[" "] = 0;
  return newPointStructure;

}
let newPointStructure = transform(oldPointStructure);


function runProgram() {
  initialPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

