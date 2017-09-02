var game = {
	numOfQuestionsCorrectlyAnswered: 0,
	numOfQuestionsIncorrectlyAnswered: 0,
	numOfQuestionsUnanswered: 0,
	chosenQuestion: 0,
	totalNumberOfQuestionsAnswered: 0,
	questionsAlreadyAnsweredIndices: [],
	answerString: "",
	questions: [
		"Which quarterback has won 4 Superbowl Titles?" ,
		"What is Steph Curry's record for most made 3-pointers in a season?",
		"Who is the longest tenured Sharks player in franchise history?"
	],
	answers: [
		["Joe Montana.cor" , "Steve Young" , "Colin Kaepernick" , "Jeff Garcia"],
		["272" , "324" , "402.cor" , "410"],
		["Patrick Marleau.cor" , "Joe Thorton" , "Joe Pavelski" , "Marc-Edouard Vlasic"]
	],
	gifs: [
		"joeM.gif", 
		"stephC.gif", 
		"patrickM.gif"
	],
	randomNumGenerator: function(max , min) {
		return Math.floor(Math.random() * (max - min) + min);
	},
	uniqueIndex: function(){
		var throwAway = this.randomNumGenerator(this.questions.length, 0);
		if (this.questionsAlreadyAnsweredIndices.indexOf(throwAway) === -1){
			return throwAway;
		}
		else {
			return this.uniqueIndex();
		}
	},
	chosenQuestionFx: function() {
		this.chosenQuestion = this.uniqueIndex();
		this.questionsAlreadyAnsweredIndices.push(this.chosenQuestion);
	},
	correctAnswerExtPopOff: function(correctAnswer) {
		return correctAnswer.slice(0, correctAnswer.lastIndexOf("."));
	},
	questionAnsweredTimer: function() {

	},
	reset: function() {
		game.numOfQuestionsCorrectlyAnswered = 0;
		game.numOfQuestionsIncorrectlyAnswered = 0;
		game.numOfQuestionsUnanswered = 0;
		game.chosenQuestion = 0;
		game.totalNumberOfQuestionsAnswered = 0;
		game.questionsAlreadyAnsweredIndices = [];
	},
	intervalId: 0,
	//prevents the clock from being sped up unnecessarily
	clockRunning: false,
	//  Our stopwatch object.
	stopwatch: {
	  time: 5,
	  reset: function() {
	    game.stopwatch.time = 5;
	    //  TODO: Change the "display" div to "00:00."
	  },
	  start: function() {
	      //  TODO: Use setInterval to start the count here and set the clock to running.
	      if (!game.clockRunning) {
	        game.intervalId = setInterval(function() {
	        game.clockRunning = true;
	        game.stopwatch.count();
	        }, 1000);
	      }
	  },
	  stop: function() {
	    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
	    clearInterval(game.intervalId);
	    game.clockRunning = false;
	  },
	  count: function() {
	    //  TODO: increment time by 1, remember we cant use "this" here.
	    game.stopwatch.time--;

	    //Must find a way to move this to Dom Manipulation
	    $("div.timer").html("Time Remaining: " + game.stopwatch.time + " Seconds");
	    if (game.stopwatch.time === 0){
	    	ui.questionAnswered({});
	    };
	  }
	}
}

//Dom Manipulation Object

var ui = {
	//Page Start
	newQuestion: function(){
		$(".mainContent").empty();
		game.chosenQuestionFx();
		game.stopwatch.reset();
		game.stopwatch.start();
		this.otherDiv("div", "Time Remaining: " + game.stopwatch.time + " Seconds", "timer mainBodyDiv", ".mainContent");
		this.otherDiv("div", game.questions[game.chosenQuestion], "currentQuestion mainBodyDiv", ".mainContent");
		$("<div>")
			.addClass("answersBox")
			.appendTo(".mainContent");
		for (var i = 0; i < 4; i++) {
			this.answerDiv("div", game.answers[game.chosenQuestion][i],"answer mainBodyDiv", ".answersBox");
		};
		game.totalNumberOfQuestionsAnswered++;
		game.answerString = $(".correctAnswer").text();
	},
	otherDiv: function(elementType, htmlText, classesAdded, parentElement) {
		$("<" + elementType + ">")
			.html(htmlText)
			.addClass(classesAdded)
			.appendTo(parentElement)
	},
	answerDiv: function(elementType, htmlText, classesAdded, parentElement) {
		if (htmlText.indexOf(".cor") !== -1){
			htmlText = game.correctAnswerExtPopOff(htmlText);
			classesAdded = classesAdded + " correctAnswer";
		};
		$("<" + elementType + ">")
			.html(htmlText)
			.addClass(classesAdded)
			.appendTo(parentElement)
			.on("click", function() {
				ui.questionAnswered(this);
			});
	},
	questionAnswered: function(object) {
		$(".answersBox").empty();
		game.stopwatch.stop();
		if ($(object).hasClass("correctAnswer")){
			$(".currentQuestion")
				.html("Correct");
			game.numOfQuestionsCorrectlyAnswered++;
		}
		else {
			$("<div>")
				.html("The correct answer was: " + game.answerString)
				.appendTo(".answersBox");
			if ($(object).hasClass("answer")) {
				$(".currentQuestion")
					.html("Nope");
				game.numOfQuestionsIncorrectlyAnswered++;
			}
			else {
				$(".currentQuestion")
					.html("Ran Out Of Time");
				game.numOfQuestionsUnanswered++;
			}
		};
		$("<img>")
			.attr("src" , "assets/images/" + game.gifs[game.chosenQuestion])
			.appendTo(".answersBox");
		if (game.totalNumberOfQuestionsAnswered === 3) {
	        setTimeout(function() {
	        	ui.gameOver();
	        }, 5000);

		}
		else {
	        setTimeout(function() {
	        	ui.newQuestion();
	        }, 5000);
    	}
	},
	gameOver: function(){
		$(".answersBox").empty();
		$(".currentQuestion")
			.html("Alright! Here is how you did!");
		$("<div>")
			.html("Correct Answers: " + game.numOfQuestionsCorrectlyAnswered)
			.appendTo(".answersBox");
		$("<div>")
			.html("Incorrect Answers: " + game.numOfQuestionsIncorrectlyAnswered)
			.appendTo(".answersBox");
		$("<div>")
			.html("Unanswered: " + game.numOfQuestionsUnanswered)
			.appendTo(".answersBox");
		$("<div>")
			.html("Start Over")
			.addClass("startBtn")
			.appendTo(".answersBox")
			.on("click" , function(){
				game.reset();
				ui.newQuestion();
			});
	}
}


$(document).ready(function(){
	//Start Button
	$(".startBtn").on("click", function(){
		ui.newQuestion();
	});
});