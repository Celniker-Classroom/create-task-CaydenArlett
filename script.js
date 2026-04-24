//gets set at the start of each game and is used to track the current word being guessed
var randomWord = "";

//resets each game and decreases on a wrong guess, the player loses when it reaches 0
var lives = 6;

//tracks what the player knows about the word, resets each game
var revealedWord = ["_", "_", "_", "_", "_"];

//Filles with incorrect guesses, resets each game
var failedGuesses = [];

//Variables for tracking stats across games
var wins = 0;
var losses = 0;
var guesses = 0;
var correctGuesses = 0;
var totalGuesses = 0;
var averageGuesses = 0;
var guessAcuracy = 0;
var wrongGuesses = 0;

//helper function to get element by id
function getE(selectedId){
    var selectedElement = document.getElementById(selectedId);
    return selectedElement;
}

//resets the game and updates stats
function resetGame() {
    getE("startBtn").disabled = false;
    getE("customGameBtn").disabled = false;
    getE("customWordInput").disabled = false;
    getE("guessBtn").disabled = true;
    if (guesses > 0) {
        if (wins > 1) {
            averageGuesses = ((averageGuesses * (wins - 1)) + guesses) / wins;
        }
        else averageGuesses = guesses;
    }
    getE("hard").checked = true;
}

//start game
function startGame(difficulty) {
    //enables/dissables buttons
    getE("startBtn").disabled = true;
    getE("customGameBtn").disabled = true;
    getE("customWordInput").disabled = true;
    getE("guessBtn").disabled = false;
    //resets lives
    lives = 6;
    lives += difficulty;
    getE("lives").textContent = "Lives: " + lives;
    guesses = 0;
    wrongGuesses = 0;
    //resets hangman image
    getE("hangmanImage").src = "image/hangman0.svg";
    //resets message
    getE("message").textContent = "please enter a letter or word to guess";
    //resets revealed word and failed guesses
    revealedWord = new Array(5).fill("_");
    getE("wordDisplay").textContent = revealedWord.join(" ");
    failedGuesses = [];
    getE("failedGuesses").textContent = "Guesses: " + failedGuesses.join(", ");
    //generates a random word based on the difficulty selected
    var easyWordBank = ["apple", "beach", "bread", "brush", "chair", "chest", "cloud", "dance", "dream", "drink", "earth", "field", "floor", "fruit", "glass", "grape", "green", "heart", "horse", "house", "juice", "light", "lunch", "money", "month", "music", "night", "ocean", "party", "phone", "piano", "pilot", "plant", "plate", "point", "power", "radio", "river", "scene", "shirt", "sleep", "smile", "sound", "space", "spoon", "table", "train", "truck", "water", "world"];
    var mediumWordBank = ["abode", "ample", "birch", "blimp", "bosch", "brave", "brick", "brisk", "chasm", "chime", "chunk", "cliff", "clout", "crane", "crisp", "dwelt", "elbow", "fancy", "fjord", "flask", "flick", "frank", "frost", "gland", "glyph", "gnarl", "gourd", "graft", "grasp", "hound", "joint", "knelt", "knock", "lynch", "morph", "night", "oxide", "phial", "prowl", "quake", "scalp", "snarl", "spelt", "spout", "squat", "thump", "twirl", "vague", "wharf", "wrest"];
    var hardWordBank = ["abyss", "askew", "azure", "bagel", "banjo", "bayou", "basil", "blitz", "crypt", "cycle", "dizzy", "duchy", "dwarf", "equip", "fazed", "fjord", "fluff", "frizz", "funny", "gawky", "glyph", "gumbo", "haiku", "hertz", "hyena", "ivory", "jazzy", "jelly", "jiffy", "joker", "jumbo", "kayak", "kazoo", "klutz", "knack", "lymph", "mummy", "nymph", "pixel", "pizazz", "pneum", "polka", "quartz", "queue", "quips", "rhino", "rhythm", "vixen"];
    var wordBank = [easyWordBank, mediumWordBank, hardWordBank];
    randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
    console.log(randomWord);
}

//start custom game with user-provided word
function startCustomGame(difficulty) {
    //enables/dissables buttons
    getE("startBtn").disabled = true;
    getE("customGameBtn").disabled = true;    
    getE("customWordInput").disabled = true;    
    getE("guessBtn").disabled = false;
    //resets lives
    lives = 6;
    lives += difficulty;
    getE("lives").textContent = "Lives: " + lives;
    guesses = 0;
    wrongGuesses = 0;
    //resets hangman image
    getE("hangmanImage").src = "image/hangman0.svg";
    //resets message
    getE("message").textContent = "please enter a letter or word to guess";
    //gets custom word from input
    randomWord = getE("customWordInput").value.toLowerCase();
    //clears the custom word input field
    getE("customWordInput").value = "";
    //!/^[a-z]+$/.test searched on google how to check if a string only contains lower case letters
    if (randomWord.length < 5|| !/^[a-z]+$/.test(randomWord) || randomWord.length > 5) {
        getE("message").textContent = "Please enter a valid 5 letter word (letters only)";
        getE("startBtn").disabled = false;
        getE("customGameBtn").disabled = false;
        getE("guessBtn").disabled = true;
        return;
    }
    //resets revealed word and failed guesses
    revealedWord = new Array(5).fill("_");
    failedGuesses = [];
    getE("failedGuesses").textContent = "Guesses: " + failedGuesses.join(", ");
    getE("wordDisplay").textContent = revealedWord.join(" ");
}

//evaluates the user's guess and updates the game state accordingly
function guessLetter(guess, randomWord1) {
    guesses++;
    totalGuesses++;
    var message = getE("message");
    if (guess.length == 1 && guess >= "a" && guess <= "z") {
        // checks if the guess is a letter and is in the random word
        if (randomWord1.includes(guess)) {
            //updates the revealed word with the correctly guessed letter
            var foundLetters = 0;
            for (var i = 0; i < randomWord1.length; i++) {
                if (randomWord1[i] === guess) {
                    revealedWord[i] = guess.toUpperCase();
                }
                if (revealedWord[i] !== "_") {
                    foundLetters++;
                }
            }
            getE("wordDisplay").textContent = revealedWord.join(" ");
            message.textContent = " Correct! " + guess.toUpperCase() + " is in the word.";
            correctGuesses++;
            //checks if the player knows the entire word and resets the game if they do
            if (foundLetters === 5) {
                wins++;
                message.textContent = "Congratulations! You've guessed the word '" + randomWord1.toUpperCase() + "'!";
                resetGame();
            }
        } else {
            //updates lives, hangman image, stats on a failed guess
            message.textContent = "Incorrect! " + guess.toUpperCase() + " is not in the word.";
            lives--;
            wrongGuesses++;
            getE("hangmanImage").src = "image/hangman" + Math.min(wrongGuesses, 8) + ".svg";
            getE("lives").textContent = "Lives: " + lives;
            failedGuesses.push(guess.toUpperCase());
            getE("failedGuesses").textContent = "Guesses: " + failedGuesses.join(", ");
        }
    } else {
        // checks if the guess is the correct word
        if (randomWord1 === guess) {
            //updates stats and reveals the entire word on a correct guess
            wins++;
            message.textContent = "Correct! " + randomWord1.toUpperCase() + " is the correct answer.";
            for (var i = 0; i < randomWord1.length; i++) {
                revealedWord[i] = randomWord1[i].toUpperCase();
            }
            getE("wordDisplay").textContent = revealedWord.join(" ");
            resetGame();
            correctGuesses++;
        } else {
            //updates lives, hangman image, stats on a failed guess
            message.textContent = "Incorrect! " + guess.toUpperCase() + " is not the correct answer.";
            lives--;
            wrongGuesses++;
            getE("hangmanImage").src = "image/hangman" + Math.min(wrongGuesses, 8) + ".svg";
            getE("lives").textContent = "Lives: " + lives;
        }
    }
    if (lives <= 0) {
        //resets the game and displays the correct word when the player runs out of lives
        message.textContent = "Game Over! The correct word was '" + randomWord1.toUpperCase() + "'.";
        guesses = 0;
        losses++;
        resetGame();
    }
    //updates the stats display
    getE("wins").textContent = "Wins: " + wins;
    getE("losses").textContent = "Losses: " + losses;
    getE("averageGuesses").textContent = "Average Guesses For Wins: " + averageGuesses.toFixed(2);
    guessAcuracy = correctGuesses / totalGuesses * 100;
    getE("guessAcuracy").textContent = "Guess Accuracy: " + guessAcuracy.toFixed(2) + "%";
}



getE("startBtn").addEventListener("click", function() {
    
    //turns the selected difficulty into a number to be used in the startGame function
    var selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    var difficulty = 0;
    if (selectedDifficulty) {
        if (selectedDifficulty.value === "easy") {
            difficulty = 0;
        } else if (selectedDifficulty.value === "medium") {
            difficulty = 1;
        } else if (selectedDifficulty.value === "hard") {
            difficulty = 2;
        }
    }
    startGame(difficulty);
});

getE("customGameBtn").addEventListener("click",  function() {
    
    //turns the selected difficulty into a number to be used in the startGame function
    var selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    var difficulty = 0;
    if (selectedDifficulty) {
        if (selectedDifficulty.value === "easy") {
            difficulty = 0;
        } else if (selectedDifficulty.value === "medium") {
            difficulty = 1;
        } else if (selectedDifficulty.value === "hard") {
            difficulty = 2;
        }
    }
    startCustomGame(difficulty);
});

getE("guessBtn").addEventListener("click", function() {
    //gets the user's guess and validates it before passing it to the guessLetter function
    var guess = getE("guessInput").value.toLowerCase();
    //!/^[a-z]+$/.test searched on google how to check if a string only contains lower case letters
    if (guess.length === 5 || guess.length === 1 && typeof guess === "string" && /^[a-z]+$/.test(guess)) {
        if (guess.length === 1 && (failedGuesses.includes(guess.toUpperCase()) || revealedWord.includes(guess.toUpperCase()))) {
            getE("message").textContent = "You already guessed " + guess.toUpperCase() + "! Try a different letter.";
            getE("guessInput").value = "";
            return;
        }
        guessLetter(guess, randomWord);
    }
    else {
        getE("message").textContent = "Please enter a valid guess (5 letter word or single letter).";
    }
    getE("guessInput").value = "";
});