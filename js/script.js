const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
let form = document.querySelector(".form-element");
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;



//Add Async Function
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};
 
// Call function/Test game
getWord();


//Adding placeholders
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      //console.log(letter);
      placeholderLetters.push("●");
    }

      wordInProgress.innerText = placeholderLetters.join("");
  };


//Guess Button Element
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; // Empty message
    const guess = textInput.value;
    const singleLetterGuess = playerInput(guess);
    if(singleLetterGuess) {
      makeGuess(guess);
    }

    textInput.value = "";

});

//Accept & Validate Player Guesses
const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) { //Check if input is empty
        message.innerText = "Please enter a letter.";
      } else if (input.length > 1) { // Check if more than one letter is typed.
        message.innerText = "Please enter a single letter.";
      } else if (!input.match(acceptedLetter)) {//check for matched letter.
        message.innerText = "Please enter a letter from A to Z.";
      } else {
        return input;
      }
};

//Capture Input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter. Guess again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      updateGuessesRemaining(guess);
      showGuessedLetters();
      updateWordInProgress(guessedLetters);
    }
};

//Show guessed letters
const showGuessedLetters = function() {
  guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

//Update the word in progress to replace circle symbols
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        showWord.push(letter.toUpperCase());
      } else {
        showWord.push("●");
      }
    }

    wordInProgress.innerText = showWord.join("");
    checkPlayerWin();
};

//console.log(showWord);

//Count Guesses Remaining
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
      message.innerText = `Aww! This word doen't have any ${guess}s.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Nice! The letter ${guess} is in the word. Keep it going!`;
    }

    if (remainingGuesses === 0) {
      message.innerHTML = `GAME OVER. The word was <span class="highlight">${word}</span>`;
      startOver();
    } else if (remainingGuesses === 1) {
    remainingGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Function to see if the player won
const checkPlayerWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    //Add Confeti Animation

    let duration = 5 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
    startOver();
  }


};

//Reset Game
const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {

  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  //stopConfetti();

  // Grab a new word
  getWord();

  // show reset elements
  guessButton.classList.remove("hide");
  playAgain.classList.add("hide");
  remaining.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});