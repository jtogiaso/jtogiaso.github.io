//Initializaing the arrays for the guesses
var incorrectGuessArray = [];
var hiddenWordArray = "-";

//
var numberOfGuessesLeft = 10;
var numberOfLosses = 0;
var numberOfWins = 0;

//Initializing a word array, to which the other arrays will be compared
var hangmanWord = "randomString";
var listOfRandomWords = ["apple" , "turtle" , "buzzard" , "pseudonym" , "dog" , "cat" , "turkey" , "drink", "thanks" , "fortune" , "serfdom" , "country" , "flirt" , "snag" , "computer" , "herbivorous" , "hippopotamus" , "kinesiology" , "fraternity" , "leopard" , "zenzizenzizenzic" , "syzygy" , "synecdoche"];

// capturing all of the elements we want to manipulate
var failedGuessCenter = document.getElementById("failedGuessCenter");
var hangmanPhrase = document.getElementById("hangmanPhrase");
var instructionCenter = document.getElementById("instructionCenter");
var winLossCenter = document.getElementById("winLossCenter");
var numberOfGuessesLeftCenter = document.getElementById("numberOfGuessesLeftCenter");
var hangmanState = document.getElementById("hangmanState");
var imageHelp = document.getElementById("imageHelp");
var helpCenter = document.getElementById("helpCenter");

//Sounds
var audioPlayer = document.getElementById("audioPlayer");


//Any key will "Start" the game by sending the "user" to the reset() function
document.onkeydown = function(letterKey) {
	instructionCenter.textContent = "Press letter keys to guess and help Aang defeat Ozai!";
	reset();	
}

//Re-initalizes all appropriate variables. If the user were to restart the game, each variable will be re-intialized upon this function being recalled
function reset() {
	hangmanWord = listOfRandomWords[getRandomInt(0 , listOfRandomWords.length - 1)];
	hiddenWordArray = [];
	for (var i = 0; i < hangmanWord.length; i++){
		hiddenWordArray += "-";
	}
	hangmanPhrase.textContent = hiddenWordArray;
	incorrectGuessArray = [];
	failedGuessCenter.textContent = "You have no failed guesses! ... yet";
	numberOfGuessesLeft = Math.floor(hiddenWordArray.length * 1.5);
	numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + numberOfGuessesLeft;
	numberOfCorrectGuesses = 0;
	hangmanState.src = "assets/images/hangman1.png"
	helpCenter.textContent = "Aang is energybending against Ozai. Help make sure Aang's spirit does not become corrupted!";
	imageHelp.src = "assets/images/aangReadyHelp.gif";
	gameLogic();

}


//Function where the actual gaming guess logic takes place
//Also moves the onkeyup element to this function
function gameLogic () {	

	document.onkeydown = function(keyPress) {
		console.log(keyPress);

		if (hangmanWord.indexOf(keyPress.key) === -1) {
			audioPlayer.src = "assets/images/noYouIdiot.mp3";
			audioPlayer.play();
			if (incorrectGuessArray.indexOf(keyPress.key) === -1 && keyPress.keyCode >= 65 && keyPress.keyCode <= 90) {
				incorrectGuessArray.push(keyPress.key);
				incorrectGuessArray = incorrectGuessArray.join(" ");
				failedGuessCenter.textContent = incorrectGuessArray;
				incorrectGuessArray = incorrectGuessArray.split("");
				numberOfGuessesLeft--;
				numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + numberOfGuessesLeft;
				hangmanStateChange();
			}
		}
		else {
			if (hiddenWordArray.indexOf(keyPress.key) === -1) {
				for (var i = 0; i < hangmanWord.length; i++) {
					if (keyPress.key === hangmanWord[i]) {
						hiddenWordArray = hiddenWordArray.split("");
						hiddenWordArray[i] = keyPress.key;
						hiddenWordArray = hiddenWordArray.join("");
						numberOfCorrectGuesses++;
					}
				}
				hangmanPhrase.textContent = hiddenWordArray;
			}	
		}

		if (keyPress.key === "Escape" || numberOfGuessesLeft === 0) {
			numberOfGuessesLeftCenter.textContent = "You have failed all the world...";
			getOutOfOriginalOnKeyUpLose();
		}
		if (numberOfCorrectGuesses === hangmanWord.length) {
			getOutOfOriginalOnKeyUpWin();
		}
	}
}

//If user loses, this function will be called and only pressing "Enter" will return user to the game. Also, number of losses is incremeneted.
//Also moves the onkeyup element to this function in order to break 
function getOutOfOriginalOnKeyUpLose () {
	audioPlayer.src = "assets/images/thatsRoughBuddy.mp3";
	audioPlayer.play();
	instructionCenter.textContent = "You failed! The word was: " + hangmanWord + ". Press Enter to try again!";
	numberOfLosses++;
	winLossCenter.textContent = numberOfWins + " - " + numberOfLosses;
	document.onkeydown = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Press letter keys to guess and help Aang defeat Ozai!";
			reset();
		}
	}
}

//If user wins, this function will be called. Instruction center div will also display a winning message
function getOutOfOriginalOnKeyUpWin () {
	winState();
	instructionCenter.textContent = "You successfully helped Aang! Press Enter for another try!";
	numberOfWins++;
	winLossCenter.textContent = numberOfWins + " - " + numberOfLosses;
	document.onkeydown = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Press letter keys to guess and help Aang defeat Ozai!";
			reset();
		}
	}

}

//Generate random integer between the provided the paramaters
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Changes the picture based on number of guesses left
function hangmanStateChange() {
	if (numberOfGuessesLeft === 0) {
		hangmanState.src = "assets/images/aangCorrupted.png";
		imageHelp.src = "assets/images/AangDead.gif";
		helpCenter.textContent = "Nice...";
	}
	else if (numberOfGuessesLeft === 1) {
		hangmanState.src="assets/images/hangman5.gif";
		imageHelp.src = "assets/images/sokkaPalm.gif";
		helpCenter.textContent = "You have one last wrong guess! Do no let Aang be corrupted!";
	}
	else if (numberOfGuessesLeft < ((hangmanWord.length * 1.5) * (1/3))) {
		hangmanState.src="assets/images/hangman4.gif";
		imageHelp.src = "assets/images/nopeKick.gif";
		helpCenter.textContent = "Geez! You are suppose to be helping...";
	}
	else if (numberOfGuessesLeft < ((hangmanWord.length * 1.5) * (2/3))) {
		hangmanState.src="assets/images/hangman3.png";
		imageHelp.src = "assets/images/aangPalm.gif";
		helpCenter.textContent = "It's not looking to good for Aang!";
	}
	else if (numberOfGuessesLeft < (hangmanWord.length * 1.5)) {
		hangmanState.src="assets/images/hangman2.jpg";
		imageHelp.src = "assets/images/hahahaNO.gif";
		helpCenter.textContent = "Aang's spirit is being corrupted! Hurry and guess the right word!";
	}
}

function winState() {
	hangmanState.src = "assets/images/aangHappy.gif";
	imageHelp.src = "assets/images/celebration.gif";
	helpCenter.textContent = "Nice!";
	audioPlayer.src = "assets/images/nowCheckWin.mp3";
	audioPlayer.play();
}
