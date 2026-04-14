var randomWord = "";
var lives = 6;
var revealedWord = ["_", "_", "_", "_", "_"];
var wins = 0;
var losses = 0;
var guesses = 0;
var failedGuesses = [];
var correctGuesses = 0;
var totalGuesses = 0;
var averageGuesses = 0;
var guessAcuracy = 0;

//helper function to get element by id
function getE(selectedId){
    var selectedElement = document.getElementById(selectedId);
    return selectedElement;
}
//resets the game and updates stats
function resetGame() {
    getE("startBtn").disabled = false;
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
    getE("guessBtn").disabled = false;
    //resets lives and message
    lives = 6;
    lives += difficulty;
    getE("lives").textContent = "Lives: " + lives;
    guesses = 0;
    getE("message").textContent = "please enter a letter or word to guess";
    revealedWord = ["_", "_", "_", "_", "_"];
    failedGuesses = [];
    getE("failedGuesses").textContent = "Guesses: " + failedGuesses.join(", ");
    getE("wordDisplay").textContent = "_ _ _ _ _";
    //generates a random word based on the difficulty selected
    var easyWordBank = ["apple", "beach", "bread", "brush", "chair", "chest", "cloud", "dance", "dream", "drink", "earth", "field", "floor", "fruit", "glass", "grape", "green", "heart", "horse", "house", "juice", "light", "lunch", "money", "month", "music", "night", "ocean", "party", "phone", "piano", "pilot", "plant", "plate", "point", "power", "radio", "river", "scene", "shirt", "sleep", "smile", "sound", "space", "spoon", "table", "train", "truck", "water", "world"];
    var mediumWordBank = ["abode", "ample", "birch", "blimp", "bosch", "brave", "brick", "brisk", "chasm", "chime", "chunk", "cliff", "clout", "crane", "crisp", "dwelt", "elbow", "fancy", "fjord", "flask", "flick", "frank", "frost", "gland", "glyph", "gnarl", "gourd", "graft", "grasp", "hound", "joint", "knelt", "knock", "lynch", "morph", "night", "oxide", "phial", "prowl", "quake", "scalp", "snarl", "spelt", "spout", "squat", "thump", "twirl", "vague", "wharf", "wrest"];
    var hardWordBank = ["abyss", "askew", "azure", "bagel", "banjo", "bayou", "basil", "blitz", "crypt", "cycle", "dizzy", "duchy", "dwarf", "equip", "fazed", "fjord", "fluff", "frizz", "funny", "gawky", "glyph", "gumbo", "haiku", "hertz", "hyena", "ivory", "jazzy", "jelly", "jiffy", "joker", "jumbo", "kayak", "kazoo", "kinky", "klutz", "knack", "lymph", "mummy", "nymph", "ovary", "pixel", "pizazz", "pneum", "polka", "quartz", "queue", "quips", "rhino", "rhythm", "vixen"];
    var wordBank = [easyWordBank, mediumWordBank, hardWordBank];
    randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
    console.log(randomWord);
}
//evaluates the user's guess and updates the game state accordingly
function guessLetter() {
    guesses++;
    totalGuesses++;
    var guess = getE("guessInput").value.toLowerCase();
    var message = getE("message");
    if (guess.length == 1 && guess >= "a" && guess <= "z") {
        // checks if the guess is a letter and is in the random word
        if (randomWord.includes(guess)) {
            //updates the revealed word with the correctly guessed letter
            for (var i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === guess) {
                    revealedWord[i] = guess.toUpperCase();
                }
            }
            getE("wordDisplay").textContent = revealedWord.join(" ");
            message.textContent = " Correct! " + guess.toUpperCase() + " is in the word.";
            correctGuesses++;
        } else {
            message.textContent = "Incorrect! " + guess.toUpperCase() + " is not in the word.";
            lives--;
            getE("lives").textContent = "Lives: " + lives;
            failedGuesses.push(guess.toUpperCase());
            getE("failedGuesses").textContent = "Guesses: " + failedGuesses.join(", ");
        }
    } else {
        // checks if the guess is the correct word
        if (randomWord === guess) {
            wins++;
            message.textContent = "Correct! " + guess.toUpperCase() + " is the correct answer.";
            //reveals the entire word
            for (var i = 0; i < randomWord.length; i++) {
                revealedWord[i] = randomWord[i].toUpperCase();
            }
            getE("wordDisplay").textContent = revealedWord.join(" ");
            resetGame();
            correctGuesses++;
        } else {
            message.textContent = "Incorrect! " + guess.toUpperCase() + " is not the correct answer.";
            lives--;
            getE("lives").textContent = "Lives: " + lives;
        }
    }
    if (lives <= 0) {
        //resets the game and displays the correct word when the player runs out of lives
        message.textContent = "Game Over! The correct word was '" + randomWord.toUpperCase() + "'.";
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
getE("guessBtn").addEventListener("click", function() {
    var guess = getE("guessInput").value.toLowerCase();
    if (guess !== "" && guess.length <= 5 && guess.length >= 1 && typeof guess === "string") {
        guessLetter();
    }
    else {
        getE("message").textContent = "Please enter a valid guess (1-5 letter word or single letter).";
    }
    getE("guessInput").value = "";
});