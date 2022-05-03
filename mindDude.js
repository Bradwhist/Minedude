/* TO DO:  Make an interface for this.
   HOW TO USE:
      1 - Start by guessing [1, 1, 2, 2]
      2 - Input the result in score history.
         Example:  You guess [1, 1, 2, 2] and the score is 1 black pin and 2 white pines.  the score history input should now read:
                     var scoreHistory = [[1, 2]];
                 The output will read:  
                    [1, 2, 1, 1]
      3 - This is your next guess
      4 - Add your result to score history
          Example:  You guess [1, 2, 1, 1] and the score is 2 black pins and 2 white pins.  The score history input should now read:
                       var scoreHistory = [[1, 2],[2, 2]];
                  The output will read:
                    [2, 1, 1, 1]
      5 - Repeat as necessary
*/
var scoreHistory = [[1, 2],[2, 2]];

var colorN = 6;
var pinN = 4;

var guessHistory = [];


////////////////////////////////////////
var scoreGuess = (guessArr, solutionArr) => {
  var score = [0, 0];
  var checkGuess = guessArr.slice();
  var checkSolution = solutionArr.slice();
  // black guesses
  for (var i = 0; i < checkGuess.length; i++) {
    if (checkGuess[i] == checkSolution[i]) {
     
      checkGuess[i] = 0;
      checkSolution[i] = 0;
      score[0]++;
    } 
  }

  // white guesses
    for (var i = 0; i < checkGuess.length; i++) {
     if (checkGuess[i]) {
        for(var j = 0; j < guessArr.length; j++) {
          if (checkGuess[i] == checkSolution[j]) {
            checkGuess[i] = 0;
            checkSolution[j] = 0;
            score[1]++;
            j += checkGuess.length;
          }
        }
      }
    } 
    return score;
  }
////////////////////////

var suggestGuess = (scoreHistory) => {
    if(!scoreHistory.length) {
      return [1, 1, 2, 2];
    }
    guessHistory.push([1, 1, 2, 2]);
    var possibleAnswers = [];
    var returnPossible = [];
    var addArr = [];
      for (var i = 0; i < colorN ** pinN; i++ ) {
        var k = 0;
        k += i;
        addArr = [];
        for (var j = 0; j < pinN; j++) {
         addArr.unshift((k % colorN) + 1);
         k-= (k % colorN);
         k /= colorN;
       }
      possibleAnswers.push(addArr);
};
    for (var i = 0; i < scoreHistory.length; i++){
      returnPossible = [];
      for (var j = 0; j < possibleAnswers.length; j++) {
        if(scoreGuess(guessHistory[i], possibleAnswers[j])[0] == scoreHistory[i][0] && scoreGuess(guessHistory[i], possibleAnswers[j])[1] == scoreHistory[i][1]){
          returnPossible.push(possibleAnswers[j]);
        }
      }
      possibleAnswers = returnPossible.slice();
      guessHistory.push(possibleAnswers[0]);
    }
    return possibleAnswers[0];
}

console.log(suggestGuess(scoreHistory));

