var game = {
	numOfQuestionsCorrectlyAnswered: 0,
	numOfQuestionsIncorrectlyAnswered: 0,
	chosenQuestion: 1,
	questionsAlreadyAnsweredIndices: [],
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
	chosenQuestionFx: function() {
		this.chosenQuestion = this.randomNumGenerator(this.questions.length, 0);
	},
	correctAnswerExtPopOff: function(correctAnswer) {
		return correctAnswer.slice(0, correctAnswer.lastIndexOf("."));
	},
	questionAnsweredTimer: function() {

	},
	intervalId: 0,
	//prevents the clock from being sped up unnecessarily
	clockRunning: false,
	//  Our stopwatch object.
	stopwatch: {
	  time: 5,
	  reset: function() {
	  	console.log("I have restarted.");
	    game.stopwatch.time = 5;
	    console.log(game.clockRunning);
	    //  TODO: Change the "display" div to "00:00."
	  },
	  start: function() {
	  		console.log("The clock has started.");
	  		console.log(game.clockRunning);
	      //  TODO: Use setInterval to start the count here and set the clock to running.
	      if (!game.clockRunning) {
	      	console.log("This has been entered.");
	        game.intervalId = setInterval(function() {
	        game.stopwatch.count();
	        game.clockRunning = true;
	        console.log(game.clockRunning);
	        }, 1000);
	      }
	  },
	  stop: function() {
	    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
	    console.log("The clock has stopped.");
	    clearInterval(game.intervalId);
	    game.clockRunning = false;
	    console.log(game.clockRunning);
	  },
	  count: function() {
	  	console.log("Tick.");
	  	console.log(game.clockRunning);
	    //  TODO: increment time by 1, remember we cant use "this" here.
	    game.stopwatch.time--;

	    //Must find a way to move this to Dom Manipulation
	    $("div.timer").html("Time Remaining: " + game.stopwatch.time + " Seconds");
	    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
	    //        and save the result in a variable.
	    // var currentTime = game.stopwatch.timeConverter(game.stopwatch.time);
	    //  TODO: Use the variable you just created to show the converted time in the "display" div.
	    // $("#display").text(currentTime);
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
		}
		else {
			$(".currentQuestion")
				.html("Nope");
		}
        setTimeout(function() {
        	ui.newQuestion();
        }, 5000);

	}
}


$(document).ready(function(){
	//Start Button
	$(".startBtn").on("click", function(){
		ui.newQuestion();
	});
});