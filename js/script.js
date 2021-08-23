const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];


//Adding placeholders
const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");

      wordInProgress.innerText = placeholderLetters.join("");
    }
};

placeholder(word);

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
let playerInput = function (input) {
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
const makeGuess = function(guess) {
  guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter. Guess again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
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

//Function to see if the player won


const checkPlayerWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};