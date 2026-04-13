var randomWord = "";
function getE(selectedId){
    var selectedElement = document.getElementById(selectedId);
    return selectedElement;
}
//start game
function startGame() {
    //enables/dissables buttons
    getE("startBtn").disabled = true;
    getE("guessBtn").disabled = false;
    //generates a random word based on the difficulty selected
    var easyWordBank = ["apple", "beach", "bread", "brush", "chair", "chest", "cloud", "dance", "dream", "drink", "earth", "field", "floor", "fruit", "glass", "grape", "green", "heart", "horse", "house", "juice", "light", "lunch", "money", "month", "music", "night", "ocean", "party", "phone", "piano", "pilot", "plant", "plate", "point", "power", "radio", "river", "scene", "shirt", "sleep", "smile", "sound", "space", "spoon", "table", "train", "truck", "water", "world"];
    var mediumWordBank = ["abode", "ample", "birch", "blimp", "bosch", "brave", "brick", "brisk", "chasm", "chime", "chunk", "cliff", "clout", "crane", "crisp", "dwelt", "elbow", "fancy", "fjord", "flask", "flick", "frank", "frost", "gland", "glyph", "gnarl", "gourd", "graft", "grasp", "hound", "joint", "knelt", "knock", "lynch", "morph", "night", "oxide", "phial", "prowl", "quake", "scalp", "snarl", "spelt", "spout", "squat", "thump", "twirl", "vague", "wharf", "wrest"];
    var hardWordBank = ["abyss", "askew", "azure", "bagel", "banjo", "bayou", "blitz", "buxom", "crypt", "cycle", "dizzy", "duchy", "dwarf", "equip", "fazed", "fjord", "fluff", "frizz", "funny", "gawky", "glyph", "gumbo", "haiku", "hertz", "hyena", "ivory", "jazzy", "jelly", "jiffy", "joker", "jumbo", "kayak", "kazoo", "kinky", "klutz", "knack", "lymph", "mummy", "nymph", "ovary", "pixel", "pizazz", "pneum", "polka", "quartz", "queue", "quips", "rhino", "rhythm", "vixen"];
    var wordBank = [easyWordBank, mediumWordBank, hardWordBank];
    var difficulty = getE("difficulty").value;
    if (difficulty == "easy") {
        randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
    } else if (difficulty == "medium") {
        randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
    } else if (difficulty == "hard") {
        randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
    }
    console.log(randomWord);
}

getE("startBtn").addEventListener("click", startGame);