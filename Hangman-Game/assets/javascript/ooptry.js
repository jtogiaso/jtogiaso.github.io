//Declaration of the game object
var game = {
	//Variable used only to initiate game with any button, then the following
	firstTimePress: true,
	//Variable to pause other keys from manipulating game while in state after win/loss
	gameState: true,
	//Sound element that will be manipulated to host and play all sounds
	audioPlayer: document.getElementById("audioPlayer"),
	//Initializaing the arrays for the guess comparisons
	incorrectGuessArray : [],
	//Creating hidden word
	hiddenWordArray: "-",
	//Declaration of counters to broadcast to user
	numberOfGuessesLeft: 0,
	numberOfLosses: 0,
	numberOfWins: 0,
	//Counter to let program know when the word has been fully guessed correctly
	numberOfCorrectGuesses: 0,
	//Initializing a word array, to which the other arrays will be compared
	hangmanWord: "randomString",
	listOfRandomWords: ["apple" , "turtle" , "buzzard" , "pseudonym" , "dog" , "cat" , "turkey" , "drink", "thanks" , "fortune" , "serfdom" , "country" , "flirt" , "snag" , "computer" , "herbivorous" , "hippopotamus" , "kinesiology" , "fraternity" , "leopard" , "zenzizenzizenzic" , "syzygy" , "synecdoche"],
	//Defining all elements from HTML page to manipulate
	failedGuessCenter: document.getElementById("failedGuessCenter"),
	hangmanPhrase: document.getElementById("hangmanPhrase"),
	instructionCenter: document.getElementById("instructionCenter"),
	winLossCenter: document.getElementById("winLossCenter"),
	numberOfGuessesLeftCenter: document.getElementById("numberOfGuessesLeftCenter"),
	hangmanState: document.getElementById("hangmanState"),
	imageHelp: document.getElementById("imageHelp"),
	helpCenter: document.getElementById("helpCenter"),
	//Specific phrasings that are being reused
	initialInstructionCenterPhrase: "Press letter keys to guess and help Aang defeat Ozai!",
	initialFailedGuessCenterPhrase: "You have no failed guesses! ... yet",
	initialHelpCenterPhrase: "Aang is energybending against Ozai. Help make sure Aang's spirit does not become corrupted!",
	//Procedural logic stored in a function for multi-platform cross ease -> basically all procedures to be processed
	//for eventhandler
	checkKeyValue: function(eventKeyCode , eventKey){
		//Initial state of webpage waiting for any keypress, then webpage will be set to game ready mode
		if (this.firstTimePress === true) {
			this.firstTimePress = false;
			this.pageReset();
		}
		else {//Other than very first button pressed
			if (this.gameState === true) {//While game is active
				if (eventKeyCode >= 65 && eventKeyCode <= 90) {//Only run if acceptable key is pressed
					this.instructionCenter.textContent = this.initialInstructionCenterPhrase;
					this.compareLetterToHiddenArray(eventKey);
				}
				else if (eventKeyCode === 27) { //user can press <esc> to quit, but will take an L
					this.updateWinLossRecord(false);
				}
				else { //If a non-letterkey is pressed during game play
					this.audioPlayer.src = "assets/images/whatRUDoing.mp3";
					this.audioPlayer.play();
					this.instructionCenter.textContent = "THAT'S NOT A LETTER KEY!";
				}
			}	
			else {//gameState === false ; Force user to press enter to retry
				if (eventKeyCode === 13) {
					this.pageReset();
				}
			}
		}
	},
	//Comparing valid guesses to the actual phrase and unveiling letters if correct or pushing to the array that is displayed
	//for incorrect guesses
	//If the letter already exist either in the hidden array (already unveiled) or in the incorrect guesses array,
	//nothing will happen, except for any relevant audio
	compareLetterToHiddenArray: function(eventKey) {
		if (this.hangmanWord.indexOf(eventKey) === -1) {
			if (this.incorrectGuessArray.indexOf(eventKey) === -1) {
				this.incorrectGuessArray.push(eventKey);
				this.incorrectGuessArray = this.incorrectGuessArray.join(" ");
				this.failedGuessCenter.textContent = this.incorrectGuessArray;
				this.incorrectGuessArray = this.incorrectGuessArray.split("");
				this.numOfGuessesLeft();
				this.hangmanStateLogic();
				this.audioPlayer.src = "assets/images/noYouIdiot.mp3";
				this.audioPlayer.play();
				if (this.numberOfGuessesLeft === 0) {
					this.updateWinLossRecord(false);
				}
			}
		}
		else {
			if (this.hiddenWordArray.indexOf(eventKey) === -1) {
				for (var i = 0; i < this.hangmanWord.length; i++) {
					if (eventKey === this.hangmanWord[i]) {
						this.hiddenWordArray = this.hiddenWordArray.split("");
						this.hiddenWordArray[i] = eventKey;
						this.hiddenWordArray = this.hiddenWordArray.join("");
						this.numberOfCorrectGuesses++;
					}
				}
				this.hangmanPhrase.textContent = this.hiddenWordArray;
				if (this.numberOfCorrectGuesses === this.hangmanWord.length) {
					this.updateWinLossRecord(true);
				}
			}	
		}
	},
	//Resets the page for new game
	pageReset: function() {
		this.newWord();
		this.resetStats();
		this.hangmanStateUpdate("assets/images/hangman1.png" , "assets/images/aangReadyHelp.gif" , this.initialHelpCenterPhrase);
		this.instructionCenter.textContent = this.initialInstructionCenterPhrase;
		this.failedGuessCenter.textContent = this.initialFailedGuessCenterPhrase;
		this.gameState = true;
	},
	//Provides random integer
	//used for grabbing random word for game
	getRandomInt: function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	//Changes hangman picture (basically the drawing of the hangman with pictures of Aang being overcome by the evil spirit)
	//depending on #of guesses left, certain images and text will be updated
	hangmanStateLogic: function() {
		if (this.numberOfGuessesLeft === 0) {
			this.updateWinLossRecord(false);
		}
		else if (this.numberOfGuessesLeft === 1) {
			this.hangmanStateUpdate("assets/images/hangman5.gif" , "assets/images/sokkaPalm.gif" , "You have one last wrong guess! Do no let Aang be corrupted!");

		}
		else if (this.numberOfGuessesLeft < ((this.hangmanWord.length * 1.5) * (1/3))) {
			this.hangmanStateUpdate("assets/images/hangman4.gif" , "assets/images/nopeKick.gif" , "Geez! You are suppose to be helping...");

		}
		else if (this.numberOfGuessesLeft < ((this.hangmanWord.length * 1.5) * (2/3))) {
			this.hangmanStateUpdate("assets/images/hangman3.png" , "assets/images/aangPalm.gif" , "It's not looking to good for Aang!");

		}
		else if (this.numberOfGuessesLeft < (this.hangmanWord.length * 1.5)) {
			this.hangmanStateUpdate("assets/images/hangman2.jpg" , "assets/images/hahahaNO.gif" , "Aang's spirit is being corrupted! Hurry and guess the right word!");
		}
	},
	//gets random word and then sets the hidden array to the length of the random word, and broadcasts the hidden array
	newWord: function() {
		this.hangmanWord = this.listOfRandomWords[this.getRandomInt(0 , this.listOfRandomWords.length - 1)];
		this.hiddenWordArray = [];
		for (var i = 0; i < this.hangmanWord.length; i++){
			this.hiddenWordArray += "-";
		}
		this.hangmanPhrase.textContent = this.hiddenWordArray;
	},
	//Resets counters, text, arrays that need to be refreshed for new game
	resetStats: function() {
		this.incorrectGuessArray = [];
		console.log("Number of guesses: " + this.numberOfGuessesLeft + ".  The math: " + this.hiddenWordArray.length * 1.5);
		this.numberOfGuessesLeft = Math.floor(this.hiddenWordArray.length * 1.5);
		this.numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + this.numberOfGuessesLeft;
		console.log("Number of reset guesses: " + this.numberOfGuessesLeft);
		this.numberOfCorrectGuesses = 0;
	},
	//Will update page elements according to win/loss
	//winOrLose boolean is sent from compareLetterToHiddenArray depending on counters
	//that track vaild wrong guesses and and correct guesses
	updateWinLossRecord: function(winOrLose) {
		if (winOrLose){
			this.numberOfWins++;
			this.hangmanStateUpdate("assets/images/aangHappy.gif" , "assets/images/celebration.gif" , "Nice!");
			this.endOfGameState("assets/images/nowCheckWin.mp3" , "You successfully helped Aang! Press Enter for another try!");

		}
		else {
			this.numberOfLosses++;
			this.numberOfGuessesLeftCenter.textContent = "You have failed all the world...";
			this.hangmanStateUpdate("assets/images/aangCorrupted.png" , "assets/images/AangDead.gif" , "Nice...")
			this.endOfGameState("assets/images/thatsRoughBuddy.mp3", "You failed! The word was: " + this.hangmanWord + ". Press Enter to try again!");
		}
	},
	//Updates specfic page elements with sources/content passed from hangmanStateLogic
	hangmanStateUpdate: function(hangmanStateSource , imageHelpSource , helpCenterContent) {
		this.hangmanState.src = hangmanStateSource;
		this.imageHelp.src = imageHelpSource;
		this.helpCenter.textContent = helpCenterContent;
	},
	//Changes game state to false , updates certain elements passed from updateWinLossRecord
	//based on win or loss
	//also updates win loss broadcasted to the screen
	endOfGameState: function(audioSrc , instructionCenterPhrase) {
		this.gameState = false;
		this.audioPlayer.src = audioSrc;
		this.audioPlayer.play();
		this.instructionCenter.textContent = instructionCenterPhrase;
		this.winLossCenter.textContent = this.numberOfWins + " - " + this.numberOfLosses;	
	},
	//Updates number of guesses left each time wrong guess is made
	numOfGuessesLeft: function() {
		this.numberOfGuessesLeft--;
		this.numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + this.numberOfGuessesLeft;
	}
}
//Event handler that sends the key of the onkeyup event to be checked by the checkKeyValue function
//Sends .keyCode for easy numeric condtion, sends key for easy push to hidden array
//keydown is used for F5ing purposes
document.onkeydown = function(event) {
	game.checkKeyValue(event.keyCode , event.key);
}